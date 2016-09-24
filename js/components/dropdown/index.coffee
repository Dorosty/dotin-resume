component = require '../../utils/component'
style = require './style'
list = require './list'
_functions = require './functions'
_eventHandlers = require './eventHandlers'
{extend, toPersian} = require '../../utils'

module.exports = component 'dropdown', ({dom, events, returnObject}, args = {}) ->
  {E} = dom

  {getId = ((x) -> x), getTitle = ((x) -> x), persian} = args
  getTitle = do (getTitle) ->
    (x) ->
      if x is -1
        ''
      else if persian
        toPersian getTitle x
      else
        getTitle x
  
  variables =
    persian: persian
    items: []
    showEmpty: false
    selectedId: null
    manuallySelected: false

  components = {}
  components.dropdown = E style.dropdown,
    components.input = E 'input', style.input
    components.arrow = E 'i', style.arrow
    components.itemsList = E list, getTitle

  functions = _functions.create {variables, components, dom}
  extend functions, {getId, getTitle}
  _eventHandlers.do {components, variables, functions, dom, events}

  returnObject
    reset: ->
      variables.selectedId = null
      variables.manuallySelected = false
      functions.setIndex()
    unDirty: ->
      variables.manuallySelected = false
    setSelectedId: (x) ->
      unless manuallySelected
        variables.selectedId = String x
        functions.setIndex()
    showEmpty: (showEmpty) ->
      variables.showEmpty = showEmpty
      functions.updateDropdown()
    update: (items) ->
      variables.items = items
      functions.updateDropdown()
    value: ->
      components.itemsList.value()

  components.dropdown