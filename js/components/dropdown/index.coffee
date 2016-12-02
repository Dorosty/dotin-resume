component = require '../../utils/component'
style = require './style'
list = require './list'
_functions = require './functions'
_eventHandlers = require './eventHandlers'
{extend} = require '../../utils'

module.exports = component 'dropdown', ({dom, events, returnObject}, args = {}) ->
  {E, setStyle} = dom

  variables =
    english: args.english
    items: []
    allItems: []
    showEmpty: false
    selectedId: null
    manuallySelected: false
  
  components = {}
  functions = {}

  components.dropdown = E style.dropdown,
    components.input = E 'input', style.input
    components.arrow = E 'i', style.arrow
    components.itemsList = E list, {functions}

  extend functions, _functions.create {variables, components, dom, args}

  _eventHandlers.do {components, variables, functions, dom, events}

  {reset, undirty, setSelectedId, showEmpty, update, value} = functions
  returnObject {reset, undirty, setSelectedId, showEmpty, update, value, input: components.input}

  components.dropdown