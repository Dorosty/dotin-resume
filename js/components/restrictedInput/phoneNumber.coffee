component = require '../../utils/component'
restrictedInput = require '.'
{toEnglish} = require '../../utils'

module.exports = component 'phoneNumberInput', ({dom, returnObject}) ->
  input = dom.E restrictedInput, /^(0?|09[0-9]{0,9})$/

  returnObject
    value: -> input.value()
    valid: -> /^09[0-9]{9}$/.test toEnglish input.value()

  input