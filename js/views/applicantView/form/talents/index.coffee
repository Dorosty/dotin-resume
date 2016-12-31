component = require '../../../../utils/component'
style = require './style'
dropdown = require '../../../../components/dropdown'
yearInput = require '../../../../components/restrictedInput/year'
{remove} = require '../../../../utils'

module.exports = component 'applicantFormTalents', ({dom, events}, {setData, registerErrorField, setError}) ->
  {E, setStyle, append, destroy} = dom
  {onEvent} = events



  table0 = do ->

    entries = []
    rows = []
    removeButtons = []

    view = E 'span', null,
      E 'table', null,
        E 'thead', null,
          E 'tr', null,
            E 'th', style.th, 'شایستگی / مهارت'
            E 'th', style.th, 'علاقه به کار در این حوزه'
            E 'th', style.th, 'دانش و مهارت در این حوزه'
            E 'th', style.th
        body = E 'tbody', null
      E null,
        add = E style.add

    createRow = ->
      entries.push entry = {}
      rows.push row = E 'tr', null,
        E 'td', style.td, 
        i0 = E 'input', style.input
        E 'td', style.td,
          i1 = do ->
            i1 = E dropdown, items: ['کم', 'زیاد']
            setStyle i1.input, style.input
            i1
        E 'td', style.td,
          i2 = do ->
            i2 = E dropdown, items: ['کم', 'متوسط', 'زیاد']
            setStyle i2.input, style.input
            i2
        E 'td', style.td, do ->
          removeButtons.push removeButton = E style.remove
          onEvent removeButton, 'click', ->
            remove rows, row
            remove entries, entry
            setData 'مهارت‌ها', entries
            destroy row
            offErrors.forEach (x) -> x()
          removeButton
      append body, row

      offErrors = []
      Object.keys fields =
        'شایستگی / مهارت': i0
        'علاقه به کار در این حوزه': i1
        'دانش و مهارت در این حوزه': i2
      .forEach (fieldName) ->
        field = fields[fieldName]
        error = registerErrorField field, field
        offErrors.push error.off
        setError error, 'تکمیل این فیلد الزامیست.', true
        if field.onChange
          field.onChange ->
            entry[fieldName] = field.value()
            setData 'مهارت‌ها', entries
          onEvent field.input, 'input', ->
            setError error, 'تکمیل این فیلد الزامیست.', true
          onEvent field.input, 'blur', ->
            setTimeout ->
              if !field.value()?
                setError error, 'تکمیل این فیلد الزامیست.'
              else
                setError error, null
        else
          input = field.input || field
          onEvent input, 'input', ->
            entry[fieldName] = field.value()
            setData 'مهارت‌ها', entries
          handleChange = (hidden) -> ->
            if !field.value().trim()
              setError error, 'تکمیل این فیلد الزامیست.', hidden
            else if field.valid? && !field.valid()
              setError error, 'مقدار وارد شده قابل قبول نیست.', hidden
            else
              setError error, null
          onEvent input, 'input', handleChange true
          onEvent input, 'blur', handleChange false

    onEvent add, 'click', createRow

    view

  table1 = do ->

    entries = []
    rows = []
    removeButtons = []

    view = E 'span', null,
      E 'table', null,
        E 'thead', null,
          E 'tr', null,
            E 'th', style.th, 'دوره'
            E 'th', style.th, 'برگزار کننده'
            E 'th', style.th, 'سال'
            E 'th', style.th
        body = E 'tbody', null
      E null,
        add = E style.add

    createRow = ->
      entries.push entry = {}
      rows.push row = E 'tr', null,
        E 'td', style.td,
          i0 = E 'input', style.input
        E 'td', style.td,
          i1 = E 'input', style.input
        E 'td', style.td,
          i2 = do ->
            i2 = E yearInput
            setStyle i2, style.input
            i2
        E 'td', style.td, do ->
          removeButtons.push removeButton = E style.remove
          onEvent removeButton, 'click', ->
            remove rows, row
            remove entries, entry
            setData 'دوره‌ها', entries
            destroy row
            offErrors.forEach (x) -> x()
          removeButton
      append body, row

      offErrors = []
      Object.keys fields =
        'دوره': i0
        'برگزار کننده': i1
        'سال': i2
      .forEach (fieldName) ->
        field = fields[fieldName]
        error = registerErrorField field, field
        offErrors.push error.off
        setError error, 'تکمیل این فیلد الزامیست.', true
        if field.onChange
          field.onChange ->
            entry[fieldName] = field.value()
            setData 'دوره‌ها', entries
          onEvent field.input, 'input', ->
            setError error, 'تکمیل این فیلد الزامیست.', true
          onEvent field.input, 'blur', ->
            setTimeout ->
              if !field.value()?
                setError error, 'تکمیل این فیلد الزامیست.'
              else
                setError error, null
        else
          input = field.input || field
          onEvent input, 'input', ->
            entry[fieldName] = field.value()
            setData 'دوره‌ها', entries
          handleChange = (hidden) -> ->
            if !field.value().trim()
              setError error, 'تکمیل این فیلد الزامیست.', hidden
            else if field.valid? && !field.valid()
              setError error, 'مقدار وارد شده قابل قبول نیست.', hidden
            else
              setError error, null
          onEvent input, 'input', handleChange true
          onEvent input, 'blur', handleChange false

    onEvent add, 'click', createRow

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