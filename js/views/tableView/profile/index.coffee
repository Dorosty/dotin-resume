component = require '../../../utils/component'
style = require './style'
tab0 = require './tab0'
tab1 = require './tab1'
tab2 = require './tab2'
tab3 = require './tab3'
tab4 = require './tab4'
tab5 = require './tab5'
actionButton = require '../../../components/actionButton'
{extend} = require '../../../utils'

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
  {E, text, setStyle, append, destroy, empty} = dom
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
    fn = (i) ->
      item = actionButtonInstance.items()[i - 1]
      if applicant.applicantsHRStatus.filter(({status}) -> status is i).length
        setStyle item, color: '#c5c5c5'
      else if applicant.applicantsManagerStatus.filter(({managerId, status}) -> status is i && managerId is user.userId).length
        setStyle item, color: 'green'
      else
        setStyle item, color: 'black'
    fn 1
    fn 2
    fn 3
    empty statusPlaceholder
    append statusPlaceholder, [
      E style.statusSegment,
        E style.statusCircle
        E extend {class: 'fa fa-check'}, style.statusIcon
        t1 = E style.statusText, 'ثبت'
      E style.statusConnector
      E style.statusSegment,
        E style.statusCircle
        E extend {class: 'fa fa-check'}, style.statusIcon
        t2 = E style.statusText, 'مصاحبه تلفنی'
      E style.statusConnectorActive
      E style.statusSegment,
        E style.statusCircleActive
        E extend {class: 'fa fa-question'}, style.statusIcon
        t3 = E style.statusTextActive, 'در انتظار تکمیل اطلاعات'
    ]
    setTimeout ->
      [t1, t2, t3].forEach (t) ->
        setStyle t, marginRight: -t.fn.element.offsetWidth / 2 + 15

  actionButtonInstance.onSelect (value) ->
    i = ['درخواست مصاحبه تلفنی', 'درخواست مصاحبه فنی', 'درخواست مصاحبه عمومی'].indexOf(value) + 1
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