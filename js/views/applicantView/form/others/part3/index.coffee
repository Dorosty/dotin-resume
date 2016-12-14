component = require '../../../../../utils/component'
style = require './style'
tooltip = require '../../../../../components/tooltip'
numberInput = require '../../../../../components/restrictedInput/number'
{extend, remove} = require '../../../../../utils'

module.exports = component 'applicantFormOthersPart2', ({dom, events, setOff}, {setData}) ->
  {E, text, setStyle, append, empty} = dom
  {onEvent} = events

  hideTooltips = []
  setOff ->
    hideTooltips.forEach (hideTooltip) -> hideTooltip()

  rows = []

  lastLine = E 'tr', null,
    E 'td', style.td,
      i0 = E 'input', style.input
    E 'td', style.td,
      i1 = E 'input', style.input
    E 'td', style.td,
      i2 = E 'input', extend {}, style.input, width: 250
    E 'td', style.td,
      i3 = E 'input', style.input
    E 'td', style.td,
      i4 = do ->
        i4 = E numberInput
        setStyle i4, style.input
        i4
    E 'td', style.td,
      add = E style.add

  view = E null,
    E style.mainLabel,
      text 'در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید:'
      E style.optional, '(اختیاری)'
    E 'table', null,
      E 'thead', null,
        E 'tr', null,
          E 'th', style.th, 'نام و نام خانوادگی'
          E 'th', style.th, 'سمت'
          E 'th', style.th, 'نام محل کار'
          E 'th', style.th, 'نسبت با شما'
          E 'th', style.th, 'شماره تماس'
          E 'th', style.th
      body = E 'tbody', null,
        lastLine

  do update = ->    
    empty body
    append body, rows.map (row) ->
      [v0, v1, v2, v3, v4] = row
      E 'tr', null,
        E 'td', style.td, v0
        E 'td', style.td, v1
        E 'td', style.td, v2
        E 'td', style.td, v3
        E 'td', style.td, v4
        E 'td', style.td, do ->
          removeRow = E style.remove
          onEvent removeRow, 'click', ->
            remove rows, row
            update()
          removeRow
    append body, lastLine
    setData 'جدول2', rows

  onAdds = []
  [i0, i1, i2, i3, i4].forEach (field, i) ->
    error = hideTooltip = undefined
    input = field.input || field
    onEvent input, 'focus', ->
      if error
        h = tooltip input, error
        hideTooltips.push hideTooltip = ->
          h()
          remove hideTooltips, hideTooltip
    onEvent input, ['input', 'pInput'], ->
      setStyle input, style.valid
      hideTooltip?()
    onAdds.push ->
      if !field.value()? || (typeof(field.value()) is 'string' && !field.value().trim())
        setStyle input, style.invalid
        error = 'تکمیل این فیلد الزامیست.'
      else if field.valid? && !field.valid()
        setStyle input, style.invalid
        error = 'مقدار وارد شده قابل قبول نیست.'
    onEvent input, 'blur', ->
      hideTooltip?()

  onEvent add, 'click', ->
    canAdd = [i0, i1, i2, i3, i4].every (i) -> !((!i.value()? || (typeof(i.value()) is 'string' && !i.value().trim())) || (i.valid? && !i.valid()))
    unless canAdd
      onAdds.forEach (x) -> x()
      return
    rows.push [i0, i1, i2, i3, i4].map (i) -> i.value()
    update()
    setStyle [i0, i1, i2, i3, i4], value: ''

  view