component = require '../../../utils/component'
style = require './style'
tab0 = require './tab0'
tab1 = require './tab1'
tab2 = require './tab2'
tab3 = require './tab3'
tab4 = require './tab4'
tab5 = require './tab5'
actionButton = require '../../../components/actionButton'
loadbar = require '../../../components/loadbar'
changeStatus = require './changeStatus'
viewStatus = require './viewStatus'
{extend} = require '../../../utils'
logic = require '../../../utils/logic'

tabNames = [
  'اطلاعات اولیه'
  'اطلاعات تکمیلی'
  'آزمون'
  'یادداشت'
  'سوابق'
  'نتایج مصاحبه'
]

tabContents = [
  tab0
  tab1
  tab2
  tab3
  tab4
  tab5
]

module.exports = component 'profile', ({dom, events, state, service}, {applicant, gotoIndex}) ->
  {E, text, setStyle, append, destroy, empty, hide} = dom
  {onEvent} = events

  content = undefined
  currentTabIndex = 0

  view = E 'span', null,
    loadbarInstance = E loadbar, style.loadbar
    indexLink = E 'a', style.indexLink, 'رزومه‌ها'
    E 'span', style.profileBreadCrumb, ' › پروفایل'
    actionButtonPlaceholder = E style.action,
      actionLegendButton = E style.actionLegendButton
      actionLegend = E style.actionLegend,
        E style.actionLegendArrow
        E style.actionLegendRow,
          E extend {backgroundColor: 'green'}, style.actionLegendCircle
          text 'ثبت شده'
        E style.actionLegendRow,
          E extend {backgroundColor: '#c5c5c5'}, style.actionLegendCircle
          text 'قفل شده'
        E style.actionLegendRow,
          E extend {backgroundColor: 'black'}, style.actionLegendCircle
          text 'فعال'
      actionButtonInstance = E actionButton, noButtonFunctionality: true, placeholder: 'ارسال درخواست', items: actionButtonItemTexts = ['درخواست مصاحبه تلفنی', 'درخواست مصاحبه فنی', 'درخواست مصاحبه عمومی']
    statusPlaceholder = E style.status
    E style.tabs,
      tabs = tabNames.map (tabName, index) ->
        if index is 0          
          tab = E style.tabUser,
            E class: 'fa fa-user-o', marginLeft: 5
            text "#{applicant.firstName} #{applicant.lastName}"
        else
          tab = E style.tab, tabName
        onEvent tab, 'click', ->
          changeTabIndex index
        onEvent tab, 'mouseover', ->
          setStyle tab, style.tabActive
        onEvent tab, 'mouseout', ->
          unless currentTabIndex is index
            if index is 0
              setStyle tab, style.tabUser
            else
              setStyle tab, style.tab
        tab
    contents = E style.contents

  ######################
  state.user.on once: true, (user) ->
    if user.userType isnt 1
      hide actionButtonPlaceholder
  ######################

  state.all ['applicants', 'user'], ([applicants, user]) ->
    [applicant] = applicants.filter ({userId}) -> userId is applicant.userId
    actionButtonItemTexts.forEach (s, i) ->
      item = actionButtonInstance.items()[i]
      setStyle item, color: 'black'
      if applicant.applicantsHRStatus.some(({status}) -> logic.statuses[status] in ['در انتظار مصاحبه فنی', 'در انتظار مصاحبه عمومی'])
        setStyle item, color: '#c5c5c5'
      if s is 'درخواست مصاحبه تلفنی' && (applicant.applicantsHRStatus.some(({status}) -> logic.statuses[status] is 'مصاحبه تلفنی انجام دش'))
        setStyle item, color: '#c5c5c5'
      if applicant.applicantsManagerStatus.some(({managerId}) -> managerId is user.userId)
        setStyle item, color: '#c5c5c5'
      if applicant.applicantsManagerStatus.some(({managerId, status}) -> logic.statuses[status] is s && managerId is user.userId)
        setStyle item, color: 'green'
    ts = []
    editStatusButton = undefined
    empty statusPlaceholder
    append statusPlaceholder, 
      E style.statusSegment,
        E style.statusCircle
        E extend {class: 'fa fa-check'}, style.statusIcon
        do ->
          t = E style.statusText, 'ثبت'
          ts.push t
          t

    applicantsHRStatus = applicant.applicantsHRStatus.filter ({status}) -> logic.statuses[status] in ['مصاحبه تلفنی انجام شد', 'در انتظار مصاحبه عمومی', 'در انتظار مصاحبه فنی']
    append statusPlaceholder,
      applicantsHRStatus.map (status, i, arr) ->
        [
          E style.statusConnector
          do ->
            x = E style.statusSegment,
              E if i is arr.length - 1 then style.statusCircleActive else style.statusCircle
              E extend {class: if i is arr.length - 1 then 'fa fa-question' else 'fa fa-check'}, style.statusIcon
              do ->
                t = logic.statuses[status.status]
                t = switch t
                  when 'مصاحبه تلفنی انجام شد'
                    'مصاحبه تلفنی'
                  when 'در انتظار مصاحبه عمومی'
                    'مصاحبه عمومی'
                  when 'در انتظار مصاحبه فنی'
                    'مصاحبه فنی'
                t = E (if i is arr.length - 1 then style.statusTextActive else style.statusText), t
                ts.push t
                t
            if i is arr.length - 1
              editStatusButton = x
            else
              onEvent x, 'click', ->
                viewStatus applicant, status
            x
        ]

    state.user.on once: true, (user) ->
      if user.userType is 2
        append statusPlaceholder, [
          E style.statusConnectorActive
          changeStatusButton = E style.statusSegment,
            E style.statusCirclePlus
            E style.statusIconPlus
            do ->
              t = E style.statusText, 'ایجاد وضعیت'
              ts.push t
              t
          ]
        onEvent changeStatusButton, 'click', -> changeStatus loadbarInstance, applicant
        if editStatusButton
          onEvent editStatusButton, 'click', -> changeStatus loadbarInstance, applicant, applicantsHRStatus[applicantsHRStatus.length - 1]
    setTimeout ->
      ts.forEach (t) ->
        setStyle t, marginRight: -t.fn.element.offsetWidth / 2 + 15

  actionButtonInstance.onSelect (value) ->
    state.user.on once: true, (user) ->
      return if applicant.applicantsHRStatus.some(({status}) -> logic.statuses[status] in ['در انتظار مصاحبه فنی', 'در انتظار مصاحبه عمومی'])
      return if value is 'درخواست مصاحبه تلفنی' && (applicant.applicantsHRStatus.some(({status}) -> logic.statuses[status] is 'مصاحبه تلفنی انجام دشه'))
      return if applicant.applicantsManagerStatus.some(({managerId}) -> managerId is user.userId)
      return unless confirm 'بعد از ثبت امکان حذف یا ویرایش وجود ندارد. آیا از درخواست مصاحبه تلفنی اطمینان دارید؟'
      loadbarInstance.set()
      service.changeManagerStatus applicant.userId, logic.statuses.indexOf value
      .then loadbarInstance.reset


  actionLegendVisible = false
  onEvent actionLegendButton, 'click', ->
    actionLegendVisible = !actionLegendVisible
    if actionLegendVisible
      setStyle actionLegend, style.actionLegendVisible
    else
      setStyle actionLegend, style.actionLegend


  changeTabIndex = (index) ->
    if content
      destroy content
    if currentTabIndex is 0
      setStyle tabs[currentTabIndex], style.tabUser
    else
      setStyle tabs[currentTabIndex], style.tab
    currentTabIndex = index
    append contents, content = E tabContents[currentTabIndex], {applicant}
    setStyle tabs[currentTabIndex], style.tabActive

  changeTabIndex 0

  onEvent indexLink, 'click', gotoIndex

  view