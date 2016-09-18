state = require './state'
service = require './service'
dom = require './dom'
events = require './events'
log = require('./log').component

module.exports = (componentName, create) -> ->
  component =
    name: componentName
    off: ->
  
  log.create 0, component

  c = create
    dom: dom.instance component
    events: events.instance component
    state: state.instance component
    service: service.instance component

  if c?.element
    component.element = c.element

  log.create 1, component

  component