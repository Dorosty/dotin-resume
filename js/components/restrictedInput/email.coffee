component = require '../../utils/component'
{emailIsValid} = require '../../utils'

module.exports = component 'emailInput', ({dom, returnObject}) ->
  input = dom.E 'input'

  returnObject
    value: -> input.value()
    valid: -> emailIsValid input.value()

  input