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
      actionButtonInstance = E actionButton, noButtonFunctionality: true, items: actionButtonItemTexts = ['درخواست مصاحبه تلفنی', 'درخواست مصاحبه فنی', 'درخواست مصاحبه عمومی']
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
      s = logic.statuses.indexOf s
      item = actionButtonInstance.items()[i]
      if applicant.applicantsHRStatus.filter(({status}) -> status is s).length
        setStyle item, color: '#c5c5c5'
      else if applicant.applicantsManagerStatus.filter(({managerId, status}) -> status is s && managerId is user.userId).length
        setStyle item, color: 'green'
      else
        setStyle item, color: 'black'
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
    telephoniSeen = omoomiSeen = fanniLast = false
    applicantsHRStatus = []
    applicant.applicantsHRStatus.forEach (status, i, arr) ->
      switch logic.statuses[status.status]
        when 'در انتظار مصاحبه تلفنی'
          fanniLast = false
          if telephoniSeen
            return
          telephoniSeen = true
        when 'در انتظار مصاحبه عمومی'
          fanniLast = false
          if omoomiSeen
            return
          omoomiSeen = true
        when 'در انتظار مصاحبه فنی'
          if fanniLast
            return
          fanniLast = true
        else
          return
      applicantsHRStatus.push status

    append statusPlaceholder,
      applicantsHRStatus.map (status, i, arr) ->
        [
          E style.statusConnector
          do ->
            x = E (if i is arr.length - 1 then extend({cursor: 'pointer'}, style.statusSegment) else style.statusSegment),
              E if i is arr.length - 1 then style.statusCircleActive else style.statusCircle
              E extend {class: if i is arr.length - 1 then 'fa fa-question' else 'fa fa-check'}, style.statusIcon
              do ->
                t = logic.statuses[status.status]
                if t.indexOf 'در انتظار ' is 0
                  t = t.substr 'در انتظار '.length
                t = E (if i is arr.length - 1 then style.statusTextActive else style.statusText), t
                ts.push t
                t
            if i is arr.length - 1
              editStatusButton = x
            x
        ]

    state.user.on once: true, (user) ->
      if user.userType is 2
        append statusPlaceholder, [
          E style.statusConnectorActive
          changeStatusButton = E extend({cursor: 'pointer'}, style.statusSegment),
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
    i = logic.statuses.indexOf value
    state.user.on once: true, (user) ->
      return unless confirm 'بعد از ثبت امکان حذف یا ویرایش وجود ندارد. آیا از درخواست مصاحبه تلفنی اطمینان دارید؟'
      unless applicant.applicantsHRStatus.filter(({status}) -> status is i).length || applicant.applicantsManagerStatus.filter(({managerId, status}) -> status is i && managerId is user.userId).length
        loadbarInstance.set()
        service.changeManagerStatus applicant.userId, i
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