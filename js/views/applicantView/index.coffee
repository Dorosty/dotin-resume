component = require '../../utils/component'
style = require './style'
viewStatus = require '../tableView/profile/viewStatus'
form = require './form'
tests = require './tests'
logic = require '../../utils/logic'
{extend} = require '../../utils'

tabNames = [
  'اطلاعات تکمیلی'
  'آزمون MBTI'
]

module.exports = component 'applicantView', ({dom, events, state, service}) ->
  {E, text, setStyle, show, hide, append, empty} = dom
  {onEvent} = events

  tabContents = [
    E form
    E tests
  ]

  content = undefined
  currentTabIndex = 0

  view = E style.view,
    logout = E style.logout,
      E style.logoutIcon
      text 'خروج'
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
    E style.contents, tabContents

  state.user.on (user) ->
    ts = []
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
      user.applicantsHRStatus.filter ({status}) -> logic.statuses[status] in ['مصاحبه تلفنی انجام شد', 'در انتظار مصاحبه عمومی', 'در انتظار مصاحبه فنی', 'بایگانی', 'بازیابی']
      .map (status, i, arr) ->
        [
          E style.statusConnector
          do ->
            x = E style.statusSegment,
              E style.statusCircle
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
                  when 'بایگانی'
                    'بایگانی'
                  when 'بازیابی'
                    'بازیابی'
                t = E style.statusText, t
                ts.push t
                t
            onEvent x, 'click', ->
              viewStatus user, status
            x
        ]

    setTimeout ->
      ts.forEach (t) ->
        setStyle t, marginRight: -t.fn.element.offsetWidth / 2 + 15

  onEvent logout, 'click', ->
    service.logout()

  changeTabIndex = (index) ->
    if content
      hide content
    setStyle tabs[currentTabIndex], style.tab
    currentTabIndex = index
    show content = tabContents[currentTabIndex]
    setStyle tabs[currentTabIndex], style.tabActive

  changeTabIndex 0

  view