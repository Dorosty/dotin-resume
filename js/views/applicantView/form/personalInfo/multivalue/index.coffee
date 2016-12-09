component = require '../../../../../utils/component'
style = require './style'
{extend, remove} = require '../../../../../utils'

module.exports = component 'personalInfoMultivalue', ({dom, events, returnObject}, input) ->
  {E, setStyle, append, destroy} = dom
  {onEvent} = events

  changeListeners = []
  data = []
  items = []

  view = E style.view,
    itemsPlaceholder = E()
    addPanel = E style.addPanel,
      input
      add = E style.add

  setStyle input, style.input

  setViewHeight = ->
    setStyle view, height: (items.length + 1) * 30

  onEvent add, 'click', ->
    append itemsPlaceholder, newItem = E style.item,
      E extend {englishText: input.value()}, style.itemText
      removeItem = E style.remove
    data.push input.value()
    items.push newItem
    setViewHeight()
    setStyle input, value: ''
    changeListeners.forEach (x) -> x()
    onEvent removeItem, 'click', ->
      destroy newItem
      data.splice items.indexOf(newItem), 1
      remove items, newItem
      setViewHeight()
      changeListeners.forEach (x) -> x()

  returnObject
    onChange: (listener) -> changeListeners.push listener
    value: -> data

  view