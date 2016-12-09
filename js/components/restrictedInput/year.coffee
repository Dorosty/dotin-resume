component = require '../../utils/component'
restrictedInput = require '.'
{toEnglish} = require '../../utils'

module.exports = component 'yearInput', ({dom, returnObject}) ->
  input = dom.E restrictedInput, /^(1?|13[0-9]?[0-9]?)$/

  returnObject
    value: -> input.value()
    valid: -> /^13[0-9][0-9]$/.test toEnglish input.value()

  input