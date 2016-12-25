component = require '../../../../utils/component'
style = require './style'
tooltip = require '../../../../components/tooltip'
dropdown = require '../../../../components/dropdown'
yearInput = require '../../../../components/restrictedInput/year'
{remove} = require '../../../../utils'

module.exports = component 'applicantFormTalents', ({dom, events, setOff}, {setData}) ->
  {E, setStyle, empty, append} = dom
  {onEvent} = events

  hideTooltips = []
  setOff ->
    hideTooltips.forEach (hideTooltip) -> hideTooltip()

  table0 = do ->

    rows = []

    dropdowns = [0 .. 1].map (i) ->
      f = E dropdown, items: if i then ['کم', 'متوسط', 'زیاد'] else ['کم', 'زیاد']
      setStyle f.input, style.input
      f

    lastLine = E 'tr', null,
      E 'td', style.td,
        i0 = E 'input', style.input
      E 'td', style.td,
        i1 = dropdowns[0]
      E 'td', style.td,
        i2 = dropdowns[1]
      E 'td', style.td,
        add = E style.add

    view = E 'table', null,
      E 'thead', null,
        E 'tr', null,
          E 'th', style.th, 'شایستگی / مهارت'
          E 'th', style.th, 'علاقه به کار در این حوزه'
          E 'th', style.th, 'دانش و مهارت در این حوزه'
          E 'th', style.th
      body = E 'tbody', null,
        lastLine

    update = ->    
      empty body
      append body, rows.map (row) ->
        [v0, v1, v2] = row
        E 'tr', null,
          E 'td', style.td, v0
          E 'td', style.td, v1
          E 'td', style.td, v2
          E 'td', style.td, do ->
            removeRow = E style.remove
            onEvent removeRow, 'click', ->
              remove rows, row
              update()
            removeRow
      append body, lastLine
      setData 'جدول', rows

    onAdds = []
    [i0, i1, i2].forEach (field, i) ->
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
      canAdd = [i0, i1, i2].every (i) -> !((!i.value()? || (typeof(i.value()) is 'string' && !i.value().trim())) || (i.valid? && !i.valid()))
      unless canAdd
        onAdds.forEach (x) -> x()
        return
      rows.push [i0, i1, i2].map (i) -> i.value()
      update()
      setStyle [i0, i1.input, i2.input], value: ''

    view

  table1 = do ->

    rows = []

    lastLine = E 'tr', null,
      E 'td', style.td,
        i0 = E 'input', style.input
      E 'td', style.td,
        i1 = E 'input', style.input
      E 'td', style.td,
        i2 = do ->
          i2 = E yearInput
          setStyle i2, style.input
          i2
      E 'td', style.td,
        add = E style.add

    view = E 'table', null,
      E 'thead', null,
        E 'tr', null,
          E 'th', style.th, 'دوره'
          E 'th', style.th, 'برگزار کننده'
          E 'th', style.th, 'سال'
          E 'th', style.th
      body = E 'tbody', null,
        lastLine

    update = ->    
      empty body
      append body, rows.map (row) ->
        [v0, v1, v2] = row
        E 'tr', null,
          E 'td', style.td, v0
          E 'td', style.td, v1
          E 'td', style.td, v2
          E 'td', style.td, do ->
            removeRow = E style.remove
            onEvent removeRow, 'click', ->
              remove rows, row
              update()
            removeRow
      append body, lastLine
      setData 'جدول 2', rows

    onAdds = []
    [i0, i1, i2].forEach (field, i) ->
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
      canAdd = [i0, i1, i2].every (i) -> !((!i.value()? || (typeof(i.value()) is 'string' && !i.value().trim())) || (i.valid? && !i.valid()))
      unless canAdd
        onAdds.forEach (x) -> x()
        return
      rows.push [i0, i1, i2].map (i) -> i.value()
      update()
      setStyle [i0, i1, i2], value: ''

    view

  view = E null,
    table0
    table1
    E style.column,
      label0 = E style.label, 'نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده:'
      textarea0 = E 'textarea', style.textarea
    E style.column,
      label1 = E style.label, 'آثار علمی و عضویت در انجمن‌ها:'
      textarea1 = E 'textarea', style.textarea
    E style.clearfix

  [{
    text: 'نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده'
    label: label0
    field: textarea0
  }, {
    text: 'آثار علمی و عضویت در انجمن‌ها'
    label: label1
    field: textarea1
  }].forEach ({text, label, field}) ->
    onEvent field, 'input', ->
      setData text, field.value()

  view