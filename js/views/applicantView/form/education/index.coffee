component = require '../../../../utils/component'
style = require './style'
dropdown = require '../../../../components/dropdown'
numberInput = require '../../../../components/restrictedInput/number'
gradeInput = require '../../../../components/restrictedInput/grade'
checkbox = require '../../../../components/checkbox'
{extend, remove} = require '../../../../utils'

module.exports = component 'applicantFormEducation', ({dom, events}, setData) ->
  {E, setStyle, empty, append, show, hide} = dom
  {onEvent} = events

  table = do ->

    rows = []

    dropdown0 = f = E dropdown
    f.update ['دیپلم', 'لیسانس', 'فوق لیسانس']
    f.showEmpty true
    setStyle f.input, style.input
    f

    lastLine = E 'tr', null,
      E 'td', style.td,
        i0 = dropdown0
      E 'td', style.td,
        i1 = E 'input', style.input
      E 'td', style.td,
        i2 = E 'input', extend {}, style.input, width: 150
      E 'td', style.td,
        i3 = do ->
          i3 = E numberInput
          setStyle i3, style.input
          i3
      E 'td', style.td,
        i4 = do ->
          i4 = E numberInput
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

    update = ->    
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
    onEvent add, 'click', ->
      rows.push [i0, i1, i2, i3, i4, i5, i6].map (i) -> i.value()
      update()
      setStyle [i0.input, i1, i2, i3, i4, i5, i6], value: ''

    view

  view = E null,
    table
    E style.column,
      checkbox0 = E checkbox, 'آیا مایل به ادامه تحصیل در سال‌های آینده هستید؟'
      textarea = hide E 'textarea', extend {placeholder: 'مقطع و رشته‌ای را که ادامه می‌دهید ذکر کنید.'}, style.textarea
    E style.clearfix

  checkbox0.onChange ->
    if checkbox0.value()
      show textarea
    else
      hide textarea

  view