component = require '../../utils/component'
restrictedInput = require '.'

module.exports = component 'phoneNumberInput', ({dom, returnObject}) ->
  input = dom.E restrictedInput, /^(0?|09[0-9]{0,9})$/

  returnObject
    value: -> input.value()

  input