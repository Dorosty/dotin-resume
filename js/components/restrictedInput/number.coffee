component = require '../../utils/component'
restrictedInput = require '.'
{toEnglish} = require '../../utils'

module.exports = component 'numberInput', ({dom, returnObject}, isFraction) ->
  input = dom.E restrictedInput, if isFraction then /^([0-9]*|[0-9]*\.[0-9]*)$/ else /^[0-9]*$/

  returnObject
    value: -> input.value()
    valid: -> (if isFraction then /^([0-9]+|[0-9]*\.[0-9]+)$/ else /^[0-9]+$/).test toEnglish input.value()

  input