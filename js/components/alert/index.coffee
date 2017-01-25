component = require '../../utils/component'
style = require './style'
{defer} = require '../../utils'
{body} = require '../../utils/dom'

module.exports = (header, elements...) ->
  alert = shade = undefined
  do component 'alert', ({dom, events, returnObject}) ->
    {E, text, append, destroy, setStyle} = dom
    {onEvent} = events
    defer(5) ->
      append E(body), [
        shade = E style.shade
        alert = E style.alert,
          E style.header,
            closeButton = E style.close
            text header
          E style.contents, elements
      ]
      onEvent [shade, closeButton], 'click', close
      setTimeout ->
        setStyle shade, style.shadeActive
        setStyle alert, style.alertActive
    close = ->
      setStyle shade, style.shade
      setStyle alert, style.alert
      setTimeout (-> destroy [shade, alert]), 500

    returnObject {close}