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
    loop
      element = elements[i]
      return unless element
      {offsetTop, offsetHeight} = element
      top = offsetTop
      bottom = offsetTop + offsetHeight
      if top <= y <= bottom
        setStyle element[i], opacity: 0.5
      else if y > bottom
        break if i is elements.length - 1
        i = Math.floor (i + elements.length) / 2
      else # y < top

  returnObject
    subscribe: (element) ->
      elements.push element
      elements = elements.sort ({offsetTop: a}, {offsetTop: b}) -> a - b