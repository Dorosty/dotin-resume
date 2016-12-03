component = require '../../utils/component'
style = require './style'
{extend} = require '../../utils'

module.exports = component 'checkbox', ({dom, events, returnObject}, text) ->
  {E, setStyle} = dom
  {onEvent} = events

  changeListener = undefined
  checked = false

  view = E style.view,
    checkbox = E style.checkbox
    E style.text, text

  onEvent view, 'click', ->
    checked = !checked
    if checked
      setStyle checkbox, style.checkboxChecked
    else
      setStyle checkbox, style.checkbox
    changeListener?()

  returnObject
    value: ->
      checked
    onChange: (listener) ->
      changeListener = listener
  view