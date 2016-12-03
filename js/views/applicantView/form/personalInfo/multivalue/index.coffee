component = require '../../../../../utils/component'
style = require './style'
{extend, remove} = require '../../../../../utils'

module.exports = component 'personalInfoMultivalue', ({dom, events, returnObject}, input) ->
  {E, setStyle, append, destroy} = dom
  {onEvent} = events

  changeListener = undefined
  isAdding = false
  data = []
  items = []

  view = E style.view,
    itemsPlaceholder = E()
    E style.addIconDiv,
      add = E style.add
    addPanel = E style.addPanel,
      input
      submit = E style.submit

  setStyle input, style.input

  setViewHeight = ->
    setStyle view, height: (items.length + 1) * 30 #+ 27

  onEvent add, 'click', ->
    isAdding = true
    setStyle add, style.addHidden
    setStyle addPanel, style.addPanelActive
    setViewHeight()

  onEvent submit, 'click', ->
    isAdding = false
    setStyle add, style.add
    setStyle addPanel, style.addPanel
    newItem = E style.item,
      E extend {englishText: input.value()}, style.itemText
      removeItem = E style.remove
    append itemsPlaceholder, newItem
    data.push input.value()
    items.push newItem
    setViewHeight()
    setStyle input, value: ''
    changeListener?()
    onEvent removeItem, 'click', ->
      destroy newItem
      data.splice items.indexOf(newItem), 1
      remove items, newItem
      setViewHeight()
      changeListener?()

  returnObject
    onChange: (listener) ->
      changeListener = listener
    value: -> data

  view