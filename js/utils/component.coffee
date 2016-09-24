state = require './state'
service = require './service'
dom = require './dom'
events = require './events'
log = require('./log').component
{extend} = require '.'

module.exports = (componentName, create) -> (args...) ->
  component = {}
  component.fn =
    name: componentName
    off: ->
  
  log.create 0, component

  c = create {
    dom: dom.instance component
    events: events.instance component
    state: state.instance component
    service: service.instance component
    returnObject: (returnObject) -> extend component, returnObject
    setOff: (x) -> component.fn.off = x
  }, args...

  if c?.fn?.element
    component.fn.element = c.fn.element

  log.create 1, component

  component