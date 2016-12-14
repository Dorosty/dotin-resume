component = require '../../utils/component'
style = require './style'
list = require './list'
{toPersian, textIsInSearch, defer} = require '../../utils'

module.exports = component 'dropdown', ({dom, events, returnObject}, {getId, getTitle, english, items, selectedIndex}) ->
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
  filteredItems = []

  setInputValue = (value) ->
    if english
      setStyle input, englishValue: value
    else
      setStyle input, value: value

  getFilteredItems = ->
    items.filter (item) -> textIsInSearch getTitle(item), input.value()

  onSelect = (item) ->
    setInputValue getTitle item
    itemsList.hide()
    itemsList.update getFilteredItems()
    changeListeners.forEach (x) -> x()

  dropdown = E style.dropdown,
    input = E 'input', style.input
    arrow = E 'i', style.arrow
    itemsList = E list, {getTitle, onSelect}

  clear = ->
    setInputValue items[selectedIndex]
    itemsList.update getFilteredItems()
    itemsList.set items[selectedIndex]
  if selectedIndex
    clear()

  onEvent [input, arrow], 'mouseover', ->
    setStyle arrow, style.arrowHover

  onEvent [input, arrow], 'mouseout', ->
    setStyle arrow, style.arrow

  onEvent arrow, 'click', ->
    input.focus()

  onEvent input, 'focus', ->
    input.select()
    itemsList.update items
    itemsList.show()

  onEvent input, 'blur', ->
    defer(1000) ->
      itemsList.hide()

  onEvent input, 'keydown', (e) ->
    code = e.keyCode or e.which
    switch code
      when 40
        e.preventDefault()
        itemsList.goDown()
      when 38
        e.preventDefault()
        itemsList.goUp()

  onEnter input, ->
    itemsList.select()
    input.blur()

  prevInputValue = ''
  onEvent input, 'input', ->
    unless english
      setStyle input, value: input.value()
    if getFilteredItems().length
      prevInputValue = input.value()
    else
      setStyle input, englishValue: prevInputValue
    itemsList.update getFilteredItems(), true
    itemsList.show()

  returnObject
    onChange: (listener) -> changeListeners.push listener
    value: itemsList.value
    input: input
    clear: ->
      if selectedIndex
        clear()
      else
        setStyle input, value: ''
        itemsList.update getFilteredItems(), true

  dropdown