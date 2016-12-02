component = require '../../utils/component'
restrictedInput = require '.'

module.exports = component 'gradeInput', ({dom, returnObject}) ->
  input = dom.E restrictedInput, /^([0-9]|[0-9]\.[0-9]?[0-9]?|1[0-9]|1[0-9]\.[0-9]?[0-9]?|20|20\.0?0?)?$/

  returnObject
    value: -> input.value()

  input