component = require '../../utils/component'
style = require './style'
list = require './list'
{toPersian} = require '../../utils'

module.exports = component 'actionButton', ({dom, events, returnObject}, {getId, getTitle, english, items, selectedIndex}) ->
  {E, setStyle} = dom
  {onEvent} = events

  getId ?= (x) -> x
  getTitle ?= (x) -> x
  getTitle = do (getTitle) -> (x) ->
    if english
      getTitle x
    else
      toPersian getTitle x

  selectedIndex ?= 0
  selectListeners = []

  onSelect = (item) ->
    setStyle button, englishText: getTitle item
    selectListeners.forEach (x) -> x item
    itemsList.hide()

  actionButton = E style.actionButton,
    button = E style.button
    arrow = E 'i', style.arrow
    itemsList = E list, {getTitle, onSelect}

  itemsList.update items

  setStyle button, englishText: getTitle items[selectedIndex]

  onEvent arrow, 'mouseover', ->
    setStyle arrow, style.hover

  onEvent arrow, 'mouseout', ->
    setStyle arrow, style.arrow
  itemsList.update items

  onEvent button, 'mouseover', ->
    setStyle button, style.hover

  onEvent button, 'mouseout', ->
    setStyle button, style.button

  onEvent arrow, 'click', ->
    itemsList.show()

  onEvent button, 'click', ->
    selectListeners.forEach (x) -> x itemsList.value() || items[selectedIndex]

  returnObject
    onSelect: (listener) -> selectListeners.push listener

  actionButton