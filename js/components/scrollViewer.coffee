component = require '../utils/component'
{window} = require '../utils/dom'

module.exports = component 'scrollViewer', ({dom, events, returnObject}) ->
  {E, setStyle} = dom
  {onEvent} = events

  w = E window

  elements = []
  prevScrollY = prevInnerHeight = undefined

  returnObject
    subscribe: (element) ->
      elements.push element
      elements = elements.sort ({offsetTop: a}, {offsetTop: b}) -> a - b

      if elements.length is 1
        onEvent w, ['scroll', 'resize'], ->

          {scrollY, innerHeight} = w.fn.element
          return if scrollY is prevScrollY and innerHeight is prevInnerHeight
          prevScrollY = scrollY
          prevInnerHeight = innerHeight

          wTop = scrollY
          wBottom = scrollY + innerHeight

          viewState = (element) ->
            {offsetTop, offsetHeight} = element.fn.element
            top = offsetTop
            bottom = offsetTop + offsetHeight
            if bottom <= wTop
              return -1
            if top >= wBottom
              return 1
            return 0

          a = 0
          b = elements.length - 1
          pa = pb = pi = undefined
          while a <= b
            i = Math.floor (a + b) / 2
            state = viewState element = elements[i]
            if state is -1
              a = i + 1
            else if state is 1
              b = i - 1
            else
              break if i is 0 or viewState(elements[i - 1]) isnt 0
              b = i

          setStyle elements, opacity: 0.5
          setStyle element, opacity: 1

      element