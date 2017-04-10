component = require '../../../../utils/component'
style = require './style'

module.exports = component 'applicantTestsFirstPage', ({dom, events}, gotoTest) ->
  {E, setStyle} = dom
  {onEvent} = events

  items = [
    'MBTI یک مقیاس است نه یک امتحان'
    'دومین آیتم'
  ]

  view = E style.view,
    items.map (itemText) ->
      E style.item,
        E style.bullet
        E style.itemText, itemText
    enterButton = E style.enterButton, 'شروع آزمون'

  onEvent enterButton, 'mousemove', ->
    setStyle enterButton, style.enterButtonHover
  onEvent enterButton, 'mouseout', ->
    setStyle enterButton, style.enterButton

  onEvent enterButton, 'click', gotoTest

  view