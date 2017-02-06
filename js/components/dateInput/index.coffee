component = require '../../utils/component'
style = require './style'
calendar = require './calendar'
jalali = require '../../jalali'
{toEnglish} = require '../../utils'
{body} = require '../../utils/dom'

module.exports = component 'dateInput', ({dom, events, returnObject}) ->  
  {E, setStyle} = dom
  {onEvent} = events

  view = E style.view,
    input = E 'input', style.input
    calendarIcon = E 'i', style.calendarIcon
    calendarPlaceholder = E style.calendarPlaceholder,
      E style.calendarArrow
      calendarInstance = E calendar, input

  onEvent calendarIcon, 'click', ->
    setStyle calendarPlaceholder, style.calendarPlaceholderVisible
  onEvent E(body), 'click', view, ->
    setStyle calendarPlaceholder, style.calendarPlaceholder

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
          calendarInstance.gotoDate parts.map((x) -> +x)..., true
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