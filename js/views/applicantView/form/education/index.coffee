component = require '../../../../utils/component'
style = require './style'
dropdown = require '../../../../components/dropdown'
yearInput = require '../../../../components/restrictedInput/year'
gradeInput = require '../../../../components/restrictedInput/grade'
checkbox = require '../../../../components/checkbox'
{extend, remove} = require '../../../../utils'

module.exports = component 'applicantFormEducation', ({dom, events}, {setData, registerErrorField, setError}) ->
  {E, setStyle, append, destroy, show, hide} = dom
  {onEvent} = events

  table = do ->

    entries = []
    rows = []
    removeButtons = []

    view = E 'span', null,
      E 'table', null,
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
        body = E 'tbody', null
      E null,
        add = E style.add

    do createRow = ->
      entries.push entry = {}
      rows.push row = E 'tr', null,
        E 'td', style.td, 
          i0 = do ->
            i0 = f = E dropdown, items: ['دیپلم', 'کاردانی', 'کارشناسی', 'کارشناسی ارشد', 'دکتری']
            setStyle f.input, extend {}, style.input, width: 150
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
        E 'td', style.td, do ->
          removeButtons.push removeButton = E style.remove
          onEvent removeButton, 'click', ->
            remove rows, row
            remove entries, entry
            setData 'سوابق تحصیلی', entries
            destroy row
            showHideRemoveButtons()
            offErrors.forEach (x) -> x()
          removeButton
      do showHideRemoveButtons = ->
        if entries.length > 1
          show removeButtons
        else
          hide removeButtons
      append body, row

      offErrors = []
      Object.keys fields =
        'مقطع': i0
        'رشته تحصیلی': i1
        'نام دانشگاه و شهر محل تحصیل': i2
        'سال ورود': i3
        'سال اخذ مدرک': i4
        'معدل': i5
        'عنوان پایان‌نامه': i6
      .forEach (fieldName) ->
        field = fields[fieldName]
        error = registerErrorField field, field
        offErrors.push error.off
        setError error, 'تکمیل این فیلد الزامیست.', true
        if field.onChange
          field.onChange ->
            entry[fieldName] = field.value()
            setData 'سوابق تحصیلی', entries
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
            setData 'سوابق تحصیلی', entries
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
    table
    E style.column,
      checkbox0 = E checkbox, 'آیا مایل به ادامه تحصیل در سال‌های آینده هستید؟'
      textarea0 = hide E 'textarea', extend {placeholder: 'مقطع و رشته‌ای را که ادامه می‌دهید ذکر کنید.'}, style.textarea
    E style.clearfix

  textareaError = registerErrorField textarea0, textarea0

  handleTextarea = (hidden) ->
    setData 'مقطع و رشته‌ای که ادامه می‌دهید', textarea0.value()
    if textarea0.value().trim()
      setError textareaError, null
    else
      setError textareaError, 'تکمیل این فیلد الزامیست.', hidden

  checkbox0.onChange ->
    if checkbox0.value()
      show textarea0
      handleTextarea true
    else
      hide textarea0
      setData 'مقطع و رشته‌ای که ادامه می‌دهید', null
      setError textareaError, null

  onEvent textarea0, 'input', ->
    handleTextarea true

  onEvent textarea0, 'blur', ->
    handleTextarea false

  view