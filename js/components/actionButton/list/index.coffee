component = require '../../../utils/component'
style = require './style'

module.exports = component 'dropdownList', ({dom, events, returnObject}, {onSelect, getTitle}) ->
  {E, empty, append, setStyle} = dom
  {onEvent} = events

  list = E style.list

  entities = items = highlightIndex = value = undefined
  highlightCurrentItem = ->
    unless items?.length
      return
    setStyle items, style.item
    if highlightIndex?
      setStyle items[highlightIndex], style.highlightedItem

  show = ->
    setStyle list, style.visibleList
  hide = ->
    setStyle list, style.list

  select = ->
    value = entities[highlightIndex]
    onSelect value
    hide()

  returnObject
    value: -> value
    set: (x) -> value = x
    reset: -> value = null
    update: (_entities) ->
      highlightIndex = 0
      empty list
      entities = _entities
      append list, items = entities.map (entity, i) ->
        item = E englishText: getTitle entity
        onEvent item, 'mousemove', ->
          highlightIndex = i
          highlightCurrentItem()
        onEvent item, 'mouseout', ->
          setStyle item, style.item
        onEvent item, 'mousedown', (e) ->
          e.preventDefault()
        onEvent item, 'click', select
        item
      highlightCurrentItem()
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