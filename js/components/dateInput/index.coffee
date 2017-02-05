component = require '../../utils/component'
style = require './style'
calendar = require './calendar'
{toEnglish} = require '../../utils'

module.exports = component 'dateInput', ({dom, events, returnObject}) ->  
  {E, setStyle} = dom
  {onEvent} = events

  view = E style.view,
    input = E 'input', style.input
    E 'i', style.calendar
    E calendar, input

  prevValue = ''

  onEvent input, 'input', ->
    value = toEnglish input.value()
    parts = value.split '/'
    valid = switch parts.length
      when 1
        /^(1?|13[0-9]?[0-9]?)$/.test parts[0]
      when 2
        /^13[0-9][0-9]$/.test(parts[0]) && /^([1-9]?|1[0-2])$/.test parts[1]
      when 3
        /^13[0-9][0-9]$/.test(parts[0]) && /^([1-9]|1[0-2])$/.test(parts[1]) && /^([1-9]?|[1-2][0-9]|3[0-1])$/.test parts[2]
    if valid
      if /^13[0-9][0-9]\/([1-9]|1[0-2])\/([1-9]|[1-2][0-9]|3[0-1])$/.test value
        [y, m, d] = value.split '/'
        [y, m, d] = [+y, +m, +d]
        if jalali.isValidJalaaliDate y, m, d
          prevValue = value
        else
          value = prevValue
      else    
        prevValue = value
    else
      value = prevValue
    setStyle input, {value}

  returnObject
    input: input
    value: -> input.value()
    valid: -> /^13[0-9][0-9]\/([1-9]|1[0-2])\/([1-9]|[1-2][0-9]|3[0-1])$/.test toEnglish input.value()
  
  view