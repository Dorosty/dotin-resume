component = require '../../../../../utils/component'
style = require './style'

module.exports = component 'personalInfoMultivalue', ({dom, events}, input) ->
  {E, setStyle, append, destroy} = dom
  {onEvent} = events

  items = []

  view = E style.view,
    itemsPlaceholder = E()
    add = E style.add
    input
    submit = E style.submit

  setStyle input, style.input

  onEvent add, 'click', ->
    setStyle [input, submit], style.visible

  onEvent submit, 'click', ->
    newItem = E style.item,
      E style.itemText, input.value()
      remove = E style.remove
    append itemsPlaceholder, newItem
    items.push newItem
    onEvent remove, 'click', ->
      destroy newItem

  view