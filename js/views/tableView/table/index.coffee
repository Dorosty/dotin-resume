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
    sort: sort || {
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
    allSelected = descriptors.length && descriptors.every ({selected}) -> selected
    styleSelectAll()

  functions = _functions.create {headers, properties, handlers, variables, components, dom, events}
  extend functions, {isEqual, styleRow}

  table = E position: 'relative',
    components.noData = E null, 'در حال بارگذاری...'
    hide components.yesData = E null,
      E 'table', width: '100%',
        E 'thead', null,
          E 'tr', style.headerRow,
            if properties.multiSelect
              selectAllTd = E 'th', width: 20, cursor: 'pointer',
                selectAll = E style.checkbox
            headers.map (header) ->
              th = E 'th', extend({cursor: if header.key || header.getValue then 'pointer' else 'default'}, style.th),
                if header.key || header.getValue
                  [
                    header.arrowUp = E style.arrowUp
                    header.arrowDown = E style.arrowDown
                  ]
                text header.name
              if header.width
                setStyle th, width: header.width
              if header.key || header.getValue
                onEvent th, 'click', ->
                  functions.setSort header
                onEvent th, 'mouseover', ->
                  setStyle th, style.thHover
                onEvent th, 'mouseout', ->
                  setStyle th, style.thOut
              th
        components.body = E 'tbody', style.tbody
      E style.pagination,
        components.paginationNumbers = E style.paginationNumbers
        components.paginationSelect = E 'select', null,
          E 'option', englishValue: 10, '10'
          E 'option', englishValue: 20, '20'
          E 'option', englishValue: 30, '30'
          E 'option', englishValue: 40, '40'
          E 'option', englishValue: 50, '50'

  # onEvent selectAllTd, 'mouseover', ->
  #   setStyle selectAllTd, style.thHover
  # onEvent selectAllTd, 'mouseout', ->
  #   setStyle selectAllTd, style.thOut
  onEvent selectAllTd, 'click', ->
    functions.setSelectedRows (descriptors) -> if allSelected then [] else descriptors
    styleSelectAll()

  onEvent components.paginationSelect, 'change', functions.update

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
