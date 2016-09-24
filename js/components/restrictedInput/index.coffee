component = require '../../utils/component'
{toEnglish} = require '../../utils'

module.exports = component 'restrictedInput', ({dom, events}, regex) ->  
  {E, setStyle} = dom
  {onEvent} = events

  input = E 'input'

  prevValue = ''

  onEvent input, 'input', ->
    value = toEnglish input.value()
    if regex.test value
      prevValue = value
    else
      value = prevValue
    setStyle input, {value}
  
  input