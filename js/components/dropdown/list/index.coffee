component = require '../../../utils/component'
style = require './style'

module.exports = component 'dropdownList', ({dom, events, returnObject}, {functions}) ->
  {E, empty, append, setStyle} = dom
  {onEvent} = events

  list = E style.list

  entities = items = highlightIndex = selectedIndex = undefined
  highlightCurrentItem = ->
    unless items?.length
      return
    setStyle items, style.item
    setStyle items[highlightIndex], style.highlightedItem

  show = ->
    setStyle list, style.visibleList
  hide = ->
    setStyle list, style.list

  select = ->
    selectedIndex = highlightIndex
    functions.select entities[selectedIndex]
    hide()

  returnObject
    set: (_entities) ->
      highlightIndex = selectedIndex = 0
      empty list
      entities = _entities.sort (a, b) ->
        functions.sortCompare functions.getTitle(a), functions.getTitle(b)
      append list, items = entities.map (entity, i) ->
        item = E englishText: functions.getTitle entity
        onEvent item, 'mouseover', ->
          highlightIndex = i
          highlightCurrentItem()
        onEvent item, 'mouseout', ->
          setStyle item, style.item
        onEvent item, 'click', select
        item
      highlightCurrentItem()
    value: ->
      if entities? and selectedIndex?
        entities[selectedIndex]
    goUp: ->
      highlightIndex--
      if highlightIndex < 0
        highlightIndex = 0
      highlightCurrentItem()
    goDown: ->
      highlightIndex++
      if highlightIndex >= entities.length
        highlightIndex = entities.length - 1
      highlightCurrentItem()
    select: select
    show: show
    hide: hide

  list