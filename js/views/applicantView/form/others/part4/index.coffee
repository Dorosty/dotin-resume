component = require '../../../../../utils/component'
style = require './style'

module.exports = component 'applicantFormOthersPart2', ({dom, events}, {setData}) ->
  {E, text} = dom
  {onEvent} = events

  view = E null,
    E style.column,
      E style.label,
        text 'ورزش‌های مورد علاقه'
        E style.optional, '(اختیاری)'
      t0 = E 'textarea', style.textarea
    E style.column,
      E style.label,
        text 'زمینه‌های هنری مورد علاقه'
        E style.optional, '(اختیاری)'
      t1 = E 'textarea', style.textarea
    E style.clearfix

  onEvent t0, 'input', ->
    setData 'ورزش‌های مورد علاقه', t0.value()

  onEvent t1, 'input', ->
    setData 'زمینه‌های هنری مورد علاقه', t0.value()

  view