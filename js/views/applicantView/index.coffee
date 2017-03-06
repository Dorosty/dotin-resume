component = require '../../utils/component'
style = require './style'
form = require './form'
tests = require './tests'
{extend} = require '../../utils'

tabNames = [
  'اطلاعات تکمیلی'
  # 'آزمون'
]

tabContents = [
  form
  # tests
]

module.exports = component 'applicantView', ({dom, events, service}) ->
  {E, text, setStyle, append, destroy} = dom
  {onEvent} = events

  content = undefined
  currentTabIndex = 0

  view = E style.view,
    logout = E style.logout,
      E style.logoutIcon
      text 'خروج'
    E style.status,
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

  onEvent logout, 'click', ->
    service.logout()

  setTimeout ->
    [t1, t2, t3].forEach (t) ->
      setStyle t, marginRight: -t.fn.element.offsetWidth / 2 + 15

  changeTabIndex = (index) ->
    if content
      destroy content
    setStyle tabs[currentTabIndex], style.tab
    currentTabIndex = index
    append contents, content = E tabContents[currentTabIndex]
    setStyle tabs[currentTabIndex], style.tabActive

  changeTabIndex 0

  view