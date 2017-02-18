component = require '../../utils/component'
style = require './style'
list = require './list'
{toPersian} = require '../../utils'
{window} = require '../../utils/dom'

module.exports = component 'actionButton', ({dom, events, returnObject}, {getId, getTitle, english, items, selectedIndex, noButtonFunctionality, placeholder}) ->
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
    unless placeholder
      setStyle button, englishText: getTitle item
    selectListeners.forEach (x) -> x item
    itemsList.hide()

  actionButton = E style.actionButton,
    button = E style.button
    arrow = E 'i', style.arrow
    itemsList = E list, {getTitle, onSelect}

  if placeholder
    setStyle button, englishText: placeholder
  else
    setStyle button, englishText: getTitle items[selectedIndex]

  itemsList.update items

  onEvent arrow, 'mouseover', ->
    setStyle arrow, style.hover

  onEvent arrow, 'mouseout', ->
    setStyle arrow, style.arrow
  itemsList.update items

  onEvent button, 'mouseover', ->
    setStyle button, style.hover

  onEvent button, 'mouseout', ->
    setStyle button, style.button

  onEvent (if noButtonFunctionality then [arrow, button] else arrow), 'click', ->
    if itemsList.hidden()
      itemsList.show()
    else
      itemsList.hide()

  unless noButtonFunctionality
    onEvent button, 'click', ->
      itemsList.hide()
      selectListeners.forEach (x) -> x itemsList.value() || items[selectedIndex]

  onEvent E(window), 'click', actionButton, ->
    itemsList.hide()

  returnObject
    onSelect: (listener) -> selectListeners.push listener
    items: itemsList.items

  actionButton