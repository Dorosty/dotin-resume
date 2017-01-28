component = require '../../../utils/component'
style = require './style'
tab0 = require './tab0'
tab1 = require './tab1'
tab2 = require './tab2'
tab3 = require './tab3'
tab4 = require './tab4'
tab5 = require './tab5'
actionButton = require '../../../components/actionButton'
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
      actionButtonInstance = E actionButton, items: ['درخواست مصاحبه تلفنی', 'درخواست مصاحبه فنی', 'درخواست مصاحبه عمومی']
    statusPlaceholder = E style.status
    E style.tabs,
      tabs = tabNames.map (tabName, index) ->
        tab = E style.tab, tabName
        onEvent tab, 'click', ->
          changeTabIndex index
        onEvent tab, 'mouseover', ->
          setStyle tab, style.tabActive
        onEvent tab, 'mouseout', ->
          unless currentTabIndex is index
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
    fn = (i, s) ->
      item = actionButtonInstance.items()[i - 1]
      if applicant.applicantsHRStatus.filter(({status}) -> status is s).length
        setStyle item, color: '#c5c5c5'
      else if applicant.applicantsManagerStatus.filter(({managerId, status}) -> status is s && managerId is user.userId).length
        setStyle item, color: 'green'
      else
        setStyle item, color: 'black'
    fn 1, 1
    fn 2, 5
    fn 3, 4
    ts = []
    editStatusButton = undefined
    telephoniSeen = omoomiSeen = fanniLast = false
    empty statusPlaceholder
    append statusPlaceholder, 
      E style.statusSegment,
        E style.statusCircle
        E extend {class: 'fa fa-check'}, style.statusIcon
        do ->
          t = E style.statusText, 'ثبت'
          ts.push t
          t
    append statusPlaceholder,
      applicant.applicantsHRStatus.map ({status}, i, arr) ->
        switch logicText = logic.hrStatusToText status
          when 'مصاحبه تلفنی'
            fanniLast = false
            if telephoniSeen
              return
            telephoniSeen = true
          when 'مصاحبه عمومی'
            fanniLast = false
            if omoomiSeen
              return
            omoomiSeen = true
          when 'مصاحبه فنی'
            if fanniLast
              return
            fanniLast = true
        [
          E style.statusConnector
          do ->
            x = E (if i is arr.length - 1 then extend({cursor: 'pointer'}, style.statusSegment) else style.statusSegment),
              E if i is arr.length - 1 then style.statusCircleActive else style.statusCircle
              E extend {class: if i is arr.length - 1 then 'fa fa-question' else 'fa fa-check'}, style.statusIcon
              do ->
                t = E style.statusText, logicText
                ts.push t
                t
            if i is arr.length - 1
              editStatusButton = x
            x
        ]
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
    onEvent changeStatusButton, 'click', -> changeStatus applicant
    # onEvent editStatusButton, 'click', -> changeStatus applicant, applicant.applicantsHRStatus[applicant.applicantsHRStatus.length - 1]
    setTimeout ->
      ts.forEach (t) ->
        setStyle t, marginRight: -t.fn.element.offsetWidth / 2 + 15

  actionButtonInstance.onSelect (value) ->
    i = ['درخواست مصاحبه تلفنی', 'درخواست مصاحبه فنی', 'درخواست مصاحبه عمومی'].indexOf(value) + 1
    i = [1, 5, 4][i]
    state.user.on once: true, (user) ->
      unless applicant.applicantsHRStatus.filter(({status}) -> status is i).length || applicant.applicantsManagerStatus.filter(({managerId, status}) -> status is i && managerId is user.userId).length
        service.changeManagerStatus applicant.userId, i

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
    setStyle tabs[currentTabIndex], style.tab
    currentTabIndex = index
    append contents, content = E tabContents[currentTabIndex], {applicant}
    setStyle tabs[currentTabIndex], style.tabActive

  changeTabIndex 0

  onEvent indexLink, 'click', gotoIndex

  view