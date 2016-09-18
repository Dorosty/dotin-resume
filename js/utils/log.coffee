log = (x) ->
  console.log x

getFullName = (component) ->
  {name} = component
  return unless component.parent
  while component
    component = component.parent
    name = "#{component.name}>#{name}"

exports.component =
  create: (part, component) ->
    log "#{part}:create:#{getFullName component}"

exports.dom =
  E0: (thisComponent) ->
    part = 0
    (component) -> log "#{part++}:dom.E:#{if component then getFullName component else 'UnknownComponent'}|#{thisComponent.name}"

  E1: (thisComponent, tagName, style, children) ->
    logText = "dom.E:#{tagName}"
    if Object.keys(style).length
      logText += ':' + JSON.stringify style
    if children.length
      console.log += ':HasChildren' 
    logText += "|#{getFullName thisComponent}"
    part = 0
    -> log "#{part++}:#{logText}"

  append: (part, parent, component, thisComponent) ->
    part = 0
    -> log "#{part++}:dom.append:#{getFullName parent}--->#{getFullName component}|#{getFullName thisComponent}"

  destroy: (part, component, thisComponent) ->
    part = 0
    -> log "#{part++}:dom.destroy:#{getFullName component}|#{getFullName thisComponent}"

  empty: (part, component, thisComponent) ->
    part = 0
    -> log "#{part++}:dom.empty:#{getFullName component}|#{getFullName thisComponent}"

  setStyle: (part, component, style, thisComponent) ->
    logText = "dom.setStyle:#{getFullName component}"
    if Object.keys(style).length
      logText += ':' + JSON.stringify style
    logText += "|#{getFullName thisComponent}"
    part = 0
    -> log "#{part++}:#{logText}"

  addClass: (part, component, klass, thisComponent) ->
    part = 0
    -> log "#{part++}:dom.addClass:#{getFullName component}:#{klass}|#{getFullName thisComponent}"

  removeClass: (part, component, klass, thisComponent) ->
    part = 0
    -> log "#{part++}:dom.removeClass:#{getFullName component}:#{klass}|#{getFullName thisComponent}"

  show: (part, component, thisComponent) ->
    part = 0
    -> log "#{part++}:dom.show:#{getFullName component}|#{getFullName thisComponent}"

  hide: (part, component, thisComponent) ->
    part = 0
    -> log "#{part++}:dom.hide:#{getFullName component}|#{getFullName thisComponent}"

exports.events =
  onEvent: (thisComponent, component, event, ignores, callback) ->
    logText = "events.onEvent:#{getFullName component}:#{event}"
    if ignores
      logText += ":ignore:#{JSON.stringify ignores.map (component) -> getFullName component}"
    logText += "|#{thisComponent.name}"
    parts = [0, 0, 0]
    l = (partIndex, e) -> log "#{partIndex}:#{parts[partIndex]++}#{if e then ':' + JSON.stringify e else ''}:#{logText}"
    l.ignore = (ignoredComponent, e) -> log "ignore #{getFullName ignoredComponent}#{if e then ':' + JSON.stringify e else ''}:#{logText}"
    l

  onLoad: (thisComponent, callback) ->
    parts = [0, 0, 0]
    -> log "#{part++}:events.onLoad|#{getFullName thisComponent}"

  onResize: (thisComponent, callback) ->
    parts = [0, 0, 0]
    -> log "#{part++}:events.onResize|#{getFullName thisComponent}"

  onMouseover: (thisComponent, component, callback) ->
    parts = [0, 0, 0]
    -> log "#{part++}:events.onMouseover:#{getFullName component}|#{getFullName thisComponent}"

  onMouseout: (thisComponent, component, callback) ->
    parts = [0, 0, 0]
    -> log "#{part++}:events.onMouseout:#{getFullName component}|#{getFullName thisComponent}"

  onMouseup: (thisComponent, callback) ->
    parts = [0, 0, 0]
    -> log "#{part++}:events.onMouseup|#{getFullName thisComponent}"

  onEnter: (thisComponent, component, callback) ->
    parts = [0, 0, 0]
    -> log "#{part++}:events.onEnter:#{getFullName component}|#{getFullName thisComponent}"

exports.state =
  pubsub: (thisComponent, name, options, callback) ->
    part = 0
    -> log "#{part++}:state.pubsub:#{name}:#{JSON.stringify options}|#{getFullName thisComponent}"

  all: (thisComponent, options, keys, callback) ->
    part = 0
    (data) -> log "#{part++}:state.all:#{JSON.stringify keys}:#{JSON.stringify options}#{if data then ':' + JSON.stringify data else ''}|#{getFullName thisComponent}"

exports.service =
  get: (thisComponent, url, params) ->
    (data) -> log "service.get:#{url}:#{JSON.stringify params}#{if data then ':' + JSON.stringify data else ''}|#{getFullName thisComponent}"

  post: (thisComponent, url, params) ->
    (data) -> log "service.post:#{url}:#{JSON.stringify params}#{if data then ':' + JSON.stringify data else ''}|#{getFullName thisComponent}"

  logout: (thisComponent) ->
    log "service.logout|#{getFullName thisComponent}"