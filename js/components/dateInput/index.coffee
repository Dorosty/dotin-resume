component = require '../../utils/component'
style = require './style'
{toEnglish} = require '../../utils'

module.exports = component 'restrictedInput', ({dom, events, returnObject}) ->  
  {E, setStyle} = dom
  {onEvent} = events

  changeListener = undefined

  view = E style.view,
    input = E 'input', style.input
    E 'i', style.calendar

  prevValue = ''

  onEvent input, 'input', ->
    value = toEnglish input.value()
    parts = value.split '/'
    valid = switch parts.length
      when 1
        /^(1?|13[0-9]?[0-9]?)$/.test parts[0]
      when 2
        /^13[0-9][0-9]$/.test(parts[0]) and /^([1-9]?|1[0-2])$/.test parts[1]
      when 3
        /^13[0-9][0-9]$/.test(parts[0]) and /^([1-9]|1[0-2])$/.test(parts[1]) and /^([1-9]?|[1-2][0-9]|3[0-1])$/.test parts[2]
    if valid
      prevValue = value
      if /^13[0-9][0-9]\/([1-9]|1[0-2])\/([1-9]|[1-2][0-9]|3[0-1])/.test value
        changeListener?()
    else
      value = prevValue
    setStyle input, {value}

  onEvent input, 'focus', ->
    input.select()

  returnObject
    input: input
    onChange: (listener) -> changeListener = listener
  
  view