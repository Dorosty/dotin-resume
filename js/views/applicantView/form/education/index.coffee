component = require '../../../../utils/component'
style = require './style'
tooltip = require '../../../../components/tooltip'
dropdown = require '../../../../components/dropdown'
yearInput = require '../../../../components/restrictedInput/year'
gradeInput = require '../../../../components/restrictedInput/grade'
checkbox = require '../../../../components/checkbox'
{extend, remove} = require '../../../../utils'

module.exports = component 'applicantFormEducation', ({dom, events, setOff}, {setData, setError}) ->
  {E, setStyle, empty, append, show, hide} = dom
  {onEvent} = events

  hideTooltips = []
  setOff ->
    hideTooltips.forEach (hideTooltip) -> hideTooltip()

  table = do ->

    rows = []

    i0 = f = E dropdown, items: ['دیپلم', 'کاردانی', 'کارشناسی', 'کارشناسی ارشد', 'دکتری']
    setStyle f.input, extend {}, style.input, width: 150

    lastLine = E 'tr', null,
      E 'td', style.td,
        i0
      E 'td', style.td,
        i1 = E 'input', style.input
      E 'td', style.td,
        i2 = E 'input', extend {}, style.input, width: 150
      E 'td', style.td,
        i3 = do ->
          i3 = E yearInput
          setStyle i3, style.input
          i3
      E 'td', style.td,
        i4 = do ->
          i4 = E yearInput
          setStyle i4, style.input
          i4
      E 'td', style.td,
        i5 = do ->
          i5 = E gradeInput
          setStyle i5, style.input
          i5
      E 'td', style.td,
        i6 = E 'input', extend {}, style.input, width: 150
      E 'td', style.td,
        add = E style.add

    view = E 'table', null,
      E 'thead', null,
        E 'tr', null,
          E 'th', style.th, 'مقطع'
          E 'th', style.th, 'رشته تحصیلی'
          E 'th', style.th, 'نام دانشگاه و شهر محل تحصیل'
          E 'th', style.th, 'سال ورود'
          E 'th', style.th, 'سال اخذ مدرک'
          E 'th', style.th, 'معدل'
          E 'th', style.th, 'عنوان پایان‌نامه'
          E 'th', style.th
      body = E 'tbody', null,
        lastLine

    do update = ->    
      empty body
      append body, rows.map (row) ->
        [v0, v1, v2, v3, v4, v5, v6] = row
        E 'tr', null,
          E 'td', style.td, v0
          E 'td', style.td, v1
          E 'td', style.td, v2
          E 'td', style.td, v3
          E 'td', style.td, v4
          E 'td', style.td, v5
          E 'td', style.td, v6
          E 'td', style.td, do ->
            removeRow = E style.remove
            onEvent removeRow, 'click', ->
              remove rows, row
              update()
            removeRow
      append body, lastLine
      setData 'جدول', rows
      if rows.length
        setError 'جدول', null
      else
        setError 'جدول', 'تکمیل این فیلد الزامیست.'

    onAdds = []
    [i0, i1, i2, i3, i4, i5, i6].forEach (field, i) ->
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
      canAdd = [i0, i1, i2, i3, i4, i5, i6].every (i) -> !((!i.value()? || (typeof(i.value()) is 'string' && !i.value().trim())) || (i.valid? && !i.valid()))
      unless canAdd
        onAdds.forEach (x) -> x()
        return
      rows.push [i0, i1, i2, i3, i4, i5, i6].map (i) -> i.value()
      update()
      setStyle [i1, i2, i3, i4, i5, i6], value: ''
      i0.clear()

    view

  view = E null,
    table
    E style.column,
      checkbox0 = E checkbox, 'آیا مایل به ادامه تحصیل در سال‌های آینده هستید؟'
      textarea0 = hide E 'textarea', extend {placeholder: 'مقطع و رشته‌ای را که ادامه می‌دهید ذکر کنید.'}, style.textarea
    E style.clearfix

  handleTextarea = ->
    setData 'مقطع و رشته‌ای که ادامه می‌دهید', textarea0.value()
    if textarea0.value().trim()
      setError 'مقطع و رشته‌ای که ادامه می‌دهید', null
    else
      setError 'مقطع و رشته‌ای که ادامه می‌دهید', 'تکمیل این فیلد الزامیست.'

  checkbox0.onChange ->
    if checkbox0.value()
      show textarea0
      handleTextarea()
    else
      hide textarea0
      setError 'مقطع و رشته‌ای که ادامه می‌دهید', null

  onEvent textarea0, 'input', handleTextarea

  do ->
    error = hideTooltip = undefined
    onEvent textarea0, 'focus', ->
      if error
        h = tooltip textarea0, error
        hideTooltips.push hideTooltip = ->
          h()
          remove hideTooltips, hideTooltip
    onEvent textarea0, ['input', 'pInput'], ->
      setStyle textarea0, style.valid
      hideTooltip?()
    onEvent textarea0, 'blur', ->
      setTimeout (->
        hideTooltip?()
        if !textarea0.value().trim()
          setStyle textarea0, style.invalid
          error = 'تکمیل این فیلد الزامیست.'
        else
          error = null
      ), 100

  view