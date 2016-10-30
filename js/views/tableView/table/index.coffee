component = require '../../../utils/component'
style = require './style'
_functions = require './functions'
{extend} = require '../../../utils'

module.exports = component 'table', ({dom, events, returnObject}, {headers, entityId, isEqual, sort, styleRow, properties = {}, handlers = {}}) ->
  {E, text, setStyle, show, hide} = dom
  {onEvent} = events

  entityId ?= 'id'

  isEqual ?= (a, b) ->
    a[entityId] is b[entityId]

  variables =
    entityId: entityId
    headers: []
    descriptors: null
    sort: sort or {
      header: headers[0]
      direction: 'up'
    }

  components = {}

  allSelected = false
  prevHandleUpdate = handlers.update
  styleSelectAll = ->
    setStyle selectAll, style.checkbox
    if allSelected
      setStyle selectAll, style.checkboxSelected
  handlers.update = (descriptors) ->
    prevHandleUpdate? descriptors
    allSelected = descriptors.every ({selected}) -> selected
    styleSelectAll()

  functions = _functions.create {headers, properties, handlers, variables, components, dom, events}
  extend functions, {isEqual, styleRow}

  table = E position: 'relative',
    components.noData = E null, 'در حال بارگذاری...'
    hide components.yesData = E null,
      E 'table', null,
        E 'thead', null,
          E 'tr', style.headerRow,
            if properties.multiSelect
              selectAllTd = E 'th', width: 20, cursor: 'pointer',
                selectAll = E style.checkbox
            headers.map (header) ->
              th = E 'th', extend({width: header.width, cursor: if header.key or header.getValue then 'pointer' else 'default'}, style.th),
                header.arrowUp = E style.arrowUp
                header.arrowDown = E style.arrowDown
                text header.name
              if header.key or header.getValue
                onEvent th, 'click', ->
                  functions.setSort header
              th
        components.body = E 'tbody', null

  onEvent selectAllTd, 'click', ->
    functions.setSelectedRows (descriptors) -> if allSelected then [] else descriptors
    styleSelectAll()

  variables.sort.direction = switch variables.sort.direction
    when 'up'
      'down'
    when 'down'
      'up'
  functions.setSort variables.sort.header

  returnObject
    setData: functions.setData
    setSelectedRows: functions.setSelectedRows

  table
