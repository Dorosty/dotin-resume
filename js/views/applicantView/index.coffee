component = require '../../utils/component'
header = require '../header'
form = require './form'
tests = require './tests'

tabNames = [
  'تکمیل اطلاعات',
  'آزمون‌های شخصیت‌شناسی'
]

tabContents = [
  form
  tests
]

module.exports = component 'applicantView', ({dom, events}) ->
  {E, addClass, removeClass, append, destroy} = dom
  {onEvent} = events

  content = undefined
  currentTabIndex = 0

  view = E null,
    E header, 'حساب کاربری'
    contents = E width: 1500, margin: '0 auto', padding: '0 30px', overflow: 'hidden',
      E 'ul', class: 'nav nav-tabs', marginBottom: 20,
        tabs = tabNames.map (tabName, index) ->
          tab = E 'li', null,
            E 'a', cursor: 'pointer', tabName
          onEvent tab, 'click', ->
            changeTabIndex index
          tab

  changeTabIndex = (index) ->
    if content
      destroy content
    removeClass tabs[currentTabIndex], 'active'
    currentTabIndex = index
    append contents, content = E tabContents[currentTabIndex]
    addClass tabs[currentTabIndex], 'active'

  changeTabIndex 0

  view