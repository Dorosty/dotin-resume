log = require('./log').dom
{toPersian, uppercaseFirst, extend} = require '.'

exports.window = ->
  name: 'window'
  element: window
  off: ->

exports.document = ->
  name: 'document'
  element: document
  off: ->

exports.body = ->
  name: 'body'
  element: document.body
  off: ->

exports.head = ->
  name: 'head'
  element: document.head
  off: ->

exports.addPageCSS = (url) ->
  cssNode = document.createElement 'link'
  cssNode.setAttribute 'rel', 'stylesheet'
  cssNode.setAttribute 'href', "/assets/#{url}"
  document.head.appendChild cssNode

exports.addPageStyle = (code) ->
  styleNode = document.createElement 'style'
  styleNode.type = 'text/css'
  styleNode.textContent = code
  document.head.appendChild styleNode

exports.generateId = do ->
  i = 0
  -> i++

exports.instance = (thisComponent) ->
  exports = {}

  exports.E = do ->
    e = (tagName, style, children) ->
      element = document.createElement tagName
      component =
        name: tagName
        element: element
        off: ->
      exports.setStyle component, style
      do appendChildren = (children) ->
        children.forEach (x) ->
          if (typeof x) in ['string', 'number']
            exports.setStyle component, text: x
          else if Array.isArray x
            appendChildren x
          else
            exports.append component, x
      component

    ->
      firstArg = arguments[0]
      if typeof firstArg is 'function'
        l = log.E0 thisComponent
        l()
        component = firstArg()
        component.parent = thisComponent
        l component
      else
        if typeof firstArg is 'string'
          tagName = firstArg
          style = arguments[1] or {}
          children = arguments[2] or []
        else if typeof firstArg is 'object' and not Array.isArray firstArg
          tagName = 'div'
          style = firstArg
          children = arguments[1] or []
        else
          tagName = 'div'
          style = {}
          children = firstArg or []
        l = log.E1 thisComponent, tagName, style, children, parent
        l()
        component = e tagName, style, children
        component.parent = thisComponent
        l()

      prevOff = thisComponent.off
      thisComponent.off = ->
        prevOff()
        component.off()

      component

  exports.append = (parent, component) ->
    if Array.isArray component
      return component.forEach (component) -> exports.append parent, component
    l = log.append thisComponent, parent, component
    l()
    parent.element.appendChild component.element
    l()

  exports.destroy = (component) ->
    if Array.isArray component
      return component.map (component) -> exports.destroy component
    {element} = component
    l = log.destroy thisComponent, component
    l()
    element.parentNode.removeChild element
    component.off()
    l()

  exports.empty = (component) ->
    if Array.isArray component
      return component.map (component) -> exports.empty elemcomponentent
    {element} = component
    l = log.empty thisComponent, component
    l()
    while element.children?.length
      exports.destroy element: element.children[0]
    l()

  exports.setStyle = (component, style = {}) ->
    if Array.isArray component
      return component.map (component) -> exports.setStyle component, style
    {element} = component
    l = log.setStyle thisComponent, component, style, thisComponent
    l()
    Object.keys(style).forEach (key) ->
      value = style[key]
      switch key
        when 'text'
          element.textContent = element.innerText = toPersian value
        when 'englishText'
          element.textContent = element.innerText = value ? ''
        when 'value'
          element.value = toPersian value
        when 'englishValue'
          element.value = value ? ''
        when 'checked'
          element.checked = value
        when 'placeholder'
          element.setAttribute key, toPersian value
        when 'class', 'type', 'id', 'for', 'src', 'href', 'target'
          element.setAttribute key, value
        else
          if (typeof value is 'number') and not (key in ['opacity', 'zIndex'])
            value = Math.floor(value) + 'px'
          if (key is 'float')
            key = 'cssFloat'
          element.style[key] = value
    l()
    component

  exports.addClass = (component, klass) ->
    if Array.isArray component
      return component.map (component) -> exports.addClass component, klass
    if Array.isArray klass
      klass.forEach (klass) -> exports.addClass component, klass
      return component
    exports.removeClass component, klass
    {element} = component
    l = log.addClass thisComponent, component, klass
    l()
    element.setAttribute 'class', ((element.getAttribute('class') ? '') + ' ' + klass).replace(/\ +/g, ' ').trim()
    l()
    component

  exports.removeClass = (component, klass) ->
    if Array.isArray component
      return component.map (component) -> exports.removeClass component, klass
    if Array.isArray klass
      klass.forEach (klass) -> exports.removeClass component, klass
      return component
    {element} = component
    l = log.removeClass thisComponent, component, klass
    l()
    previousClass = (element.getAttribute 'class') ? ''
    classIndex = previousClass.indexOf klass
    if ~classIndex
      element.setAttribute 'class', ((previousClass.substr 0, classIndex) + (previousClass.substr classIndex + klass.length)).replace(/\ +/g, ' ').trim()
    l()
    component

  exports.show = (component) ->
    l = log.show thisComponent, component
    l()
    exports.removeClass component, 'hidden'
    l()

  exports.hide = (component) ->
    l = log.hide thisComponent, component
    l()
    exports.addClass component, 'hidden'
    l()

  exports