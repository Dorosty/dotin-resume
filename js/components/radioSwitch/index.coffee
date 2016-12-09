component = require '../../utils/component'
style = require './style'

module.exports = component 'radioSwitch', ({dom, events, returnObject}, {items, getTitle, selectedIndex}) ->
  {E, append, empty, setStyle} = dom
  {onEvent} = events

  getTitle ?= (x) -> x
  selectedIndex ?= 0

  options = undefined
  changeListeners = []
  selectedItem = items[selectedIndex]

  view = E null,
    options = items.map (item, i) ->
      option = if i is 0
        E style.rightOption, getTitle item
      else if i is items.length - 1
        E style.leftOption, getTitle item
      else
        E style.option, getTitle item
      if i is selectedIndex
        setStyle option, style.optionActive
      onEvent option, 'click', ->
        selectedItem = item
        setStyle options, style.option
        setStyle option, style.optionActive
        changeListeners.forEach (x) -> x()
      option

  returnObject
    value: -> selectedItem
    onChange: (listener) -> changeListeners.push listener
  view