component = require '../../utils/component'
style = require './style'
{extend} = require '../../utils'

module.exports = component 'radioSwitch', ({dom, events, returnObject}, {getTitle, getId}) ->
  {E, append, empty, setStyle} = dom
  {onEvent} = events

  getTitle ?= (x) -> x
  getId ?= (x) -> x

  view = E()

  entities = options = undefined
  selectedId = -1
  idsToOptions = {}

  returnObject
    update: (_entities) ->
      entities = _entities
      idsToOptions = {}
      empty view
      append view, options = entities.map (entity, i) ->
        option = if i is 0
          E extend({}, style.rightOption, style.optionActive), getTitle entity
        else if i is entities.length - 1
          E style.leftOption, getTitle entity
        else
          E style.option, getTitle entity
        onEvent option, 'click', ->
          setStyle options, style.option
          setStyle option, style.optionActive
        idsToOptions[String getId entity] = option
        option
    clear: ->
      setStyle options, style.option
    setSelectedId: (id) ->
      selectedId = String id      
      setStyle options, style.option
      setStyle idsToOptions[selectedId], style.optionActive
    value: ->
      if setSelectedId is -1
        return -1
      entities.filter((entity) -> selectedId is String getId entity)[0]
  view