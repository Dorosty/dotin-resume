component = require '../../utils/component'
header = require '../header'

tabNames = [
  'تکمیل اطلاعات',
  'آزمون‌های شخصیت‌شناسی'
]

module.exports = component 'applicantView', ({dom, events}) ->
  {E, addClass, removeClass, append, destroy} = dom
  {onEvent} = events

  try
    tabContents = [
      E null, 'a'
      E null, 'b'
    ]

    content = undefined
    currentTabIndex = 0

    view = E null,
      E header, 'حساب کاربری'
      contents = E width: 1500, margin: '0 auto', overflow: 'hidden',
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
      append contents, content = tabContents[currentTabIndex]
      addClass tabs[currentTabIndex], 'active'

    changeTabIndex 0

    return view
  catch e
    console.log e