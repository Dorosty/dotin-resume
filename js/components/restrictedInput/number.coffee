component = require '../../utils/component'
restrictedInput = require '.'

module.exports = component 'numberInput', ({dom}, isInteger) ->
  dom.E restrictedInput if isInteger then /^[0-9]*$/ else /^([0-9]*|[0-9]*\.[0-9]*)$/