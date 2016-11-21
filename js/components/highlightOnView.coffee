component = require '../utils/component'
{window} = require '../utils/dom'

module.exports = component 'highlightOnView', ({dom, events, returnObject}) ->
  {E, setStyle} = dom
  {onEvent} = events

  w = E window

  elements = []

  onEvent w, 'scroll', ->
    y = w.fn.element.scrollY
    i = Math.floor elements.length / 2
    do check = (i) ->
      element = elements[i]
      return unless element
      {offsetTop, offsetHeight} = element
      top = offsetTop
      bottom = offsetTop + offsetHeight
      if top <= y <= bottom
        setStyle element[i], opacity: 0.5
      else if top > y
      else if y > bottom

  returnObject
    subscribe: (element) ->
      elements.push element
      elements = elements.sort ({offsetTop: a}, {offsetTop: b}) -> a - b