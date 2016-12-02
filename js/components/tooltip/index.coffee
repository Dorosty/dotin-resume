component = require '../../utils/component'
style = require './style'
{extend} = require '../../utils'
{body} = require '../../utils/dom'

module.exports = (element, text) ->
  destroyFn = tooltip = undefined
  do component 'tooltip', ({dom}) ->
    {E, append, destroy, setStyle} = dom
    setTimeout -> setTimeout -> setTimeout -> setTimeout -> setTimeout ->

      element = element.fn.element
      {offsetWidth: width, offsetHeight: height} = element
      top = left = 0
      loop
        top += element.offsetTop || 0
        left += element.offsetLeft || 0
        element = element.offsetParent
        break unless element

      append E(body), tooltip = E extend({top: top + height + 7, left: left + (width - 150) / 2}, style.tooltip),
        E style.arrow
        dom.text text
      setTimeout ->
        setStyle tooltip, style.tooltipActive
    destroyFn = ->
      setStyle tooltip, style.tooltip
      setTimeout (-> destroy tooltip), 500
  destroyFn