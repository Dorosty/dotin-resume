log = (x) ->
  console.log x

getFullName = (component) ->
  name = ''
  while component
    name = "#{component.name}>#{name}"
    component = component.parent
  name.substr 0, name.length - 1

exports.component =
  create: (part, component) ->
    log "#{part}:create:#{getFullName component}"

exports.dom =
  E0: (thisComponent) ->
    part = 0
    (component) -> log "#{part++}:dom.E:#{if component then getFullName component else 'UnknownComponent'}|#{thisComponent.name}"

  E1: (thisComponent, tagName, style, children) ->
    logText = "dom.E:#{getFullName {name: tagName, parent: thisComponent}}"
    if Object.keys(style).length
      logText += ':' + JSON.stringify style
    if children.length
      logText += ':HasChildren' 
    logText += "|#{getFullName thisComponent}"
    part = 0
    -> log "#{part++}:#{logText}"

  append: (thisComponent, parent, component) ->
    part = 0
    -> log "#{part++}:dom.append:#{getFullName parent}--->#{getFullName component}|#{getFullName thisComponent}"

  destroy: (thisComponent, component) ->
    part = 0
    -> log "#{part++}:dom.destroy:#{getFullName component}|#{getFullName thisComponent}"

  empty: (thisComponent, component) ->
    part = 0
    -> log "#{part++}:dom.empty:#{getFullName component}|#{getFullName thisComponent}"

  setStyle: (thisComponent, component, style) ->
    logText = "dom.setStyle:#{getFullName component}"
    if Object.keys(style).length
      logText += ':' + JSON.stringify style
    logText += "|#{getFullName thisComponent}"
    part = 0
    -> log "#{part++}:#{logText}"

  addClass: (thisComponent, component, klass) ->
    part = 0
    -> log "#{part++}:dom.addClass:#{getFullName component}:#{klass}|#{getFullName thisComponent}"

  removeClass: (thisComponent, component, klass) ->
    part = 0
    -> log "#{part++}:dom.removeClass:#{getFullName component}:#{klass}|#{getFullName thisComponent}"

  show: (thisComponent, component) ->
    part = 0
    -> log "#{part++}:dom.show:#{getFullName component}|#{getFullName thisComponent}"

  hide: (thisComponent, component) ->
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
    (partIndex) -> log "#{partIndex}:#{parts[partIndex]++}:events.onLoad|#{getFullName thisComponent}"

  onResize: (thisComponent, callback) ->
    parts = [0, 0, 0]
    (partIndex) -> log "#{partIndex}:#{parts[partIndex]++}:events.onResize|#{getFullName thisComponent}"

  onMouseover: (thisComponent, component, callback) ->
    parts = [0, 0, 0]
    (partIndex) -> log "#{partIndex}:#{parts[partIndex]++}:events.onMouseover:#{getFullName component}|#{getFullName thisComponent}"

  onMouseout: (thisComponent, component, callback) ->
    parts = [0, 0, 0]
    (partIndex) -> log "#{partIndex}:#{parts[partIndex]++}:events.onMouseout:#{getFullName component}|#{getFullName thisComponent}"

  onMouseup: (thisComponent, callback) ->
    parts = [0, 0, 0]
    (partIndex) -> log "#{partIndex}:#{parts[partIndex]++}:events.onMouseup|#{getFullName thisComponent}"

  onEnter: (thisComponent, component, callback) ->
    parts = [0, 0, 0]
    (partIndex) -> log "#{partIndex}:#{parts[partIndex]++}:events.onEnter:#{getFullName component}|#{getFullName thisComponent}"

exports.state =
  pubsub: (thisComponent, name, options, callback) ->
    parts = [0, 0, 0, 0]
    (partIndex) -> log "#{partIndex}:#{parts[partIndex]++}:state.pubsub:#{name}:#{JSON.stringify options}|#{getFullName thisComponent}"

  all: (thisComponent, options, keys, callback) ->
    parts = [0, 0, 0]
    (partIndex, data) -> log "#{partIndex}:#{parts[partIndex]++}:state.all:#{JSON.stringify keys}:#{JSON.stringify options}#{if data then ':' + JSON.stringify data else ''}|#{getFullName thisComponent}"

exports.service =
  get: (thisComponent, url, params) ->
    (data) -> log "service.get:#{url}:#{JSON.stringify params}#{if data then ':' + JSON.stringify data else ''}|#{getFullName thisComponent}"

  post: (thisComponent, url, params) ->
    (data) -> log "service.post:#{url}:#{JSON.stringify params}#{if data then ':' + JSON.stringify data else ''}|#{getFullName thisComponent}"

  logout: (thisComponent) ->
    log "service.logout|#{getFullName thisComponent}"