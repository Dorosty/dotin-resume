component = require '../../utils/component'
style = require './style'
{defer} = require '../../utils'
{body} = require '../../utils/dom'

module.exports = (element) ->
  alert = shade = undefined
  do component 'alert', ({dom, events}) ->
    {E, append, destroy, setStyle} = dom
    {onEvent} = events
    defer(5) ->
      append E(body), [
        shade = E style.shade
        alert = E style.alert,
          E style.header
          E style.contents, element
      ]
      onEvent shade, 'click', close
      setTimeout ->
        setStyle shade, style.shadeActive
        setStyle alert, style.alertActive
    close = ->
      setStyle shade, style.shade
      setStyle alert, style.alert
      setTimeout (-> destroy [shade, alert]), 500


    close