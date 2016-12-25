component = require '../../utils/component'
style = require './style'
list = require './list'

module.exports = component 'actionButton', ({dom, events, returnObject}, {getId, getTitle, english, items, selectedIndex}) ->
  {E, setStyle} = dom
  {onEvent, onEnter} = events

  getId ?= (x) -> x
  getTitle ?= (x) -> x
  getTitle = do (getTitle) -> (x) ->
    if english
      getTitle x
    else
      toPersian getTitle x

  changeListeners = []
  selectListeners = []

  onSelect = (item) ->

  actionButton = E style.actionButton,
    # input = E 'input', style.input
    arrow = E 'i', style.arrow
    itemsList = E list, {getTitle, onSelect}

  itemsList.update items

  onEvent [input, arrow], 'mouseover', ->
    setStyle arrow, style.arrowHover

  onEvent [input, arrow], 'mouseout', ->
    setStyle arrow, style.arrow

  onEvent arrow, 'click', ->
    itemsList.show()

  onEvent actionButton, 'blur', ->
    itemsList.hide()

  onEnter actionButton, ->

  returnObject
    onChange: (listener) -> changeListeners.push listener
    onSelect: (listener) -> selectListeners.push listener

  actionButton