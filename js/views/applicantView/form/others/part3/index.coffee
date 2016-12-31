component = require '../../../../../utils/component'
style = require './style'
numberInput = require '../../../../../components/restrictedInput/number'
{extend, remove} = require '../../../../../utils'

module.exports = component 'applicantFormOthersPart2', ({dom, events}, {setData, registerErrorField, setError}) ->
  {E, setStyle, append, destroy} = dom
  {onEvent} = events

  entries = []
  rows = []
  removeButtons = []

  view = E 'span', null,
    E style.mainLabel, 'در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید:'
    E 'table', null,
      E 'thead', null,
        E 'tr', null,
          E 'th', style.th, 'نام و نام خانوادگی'
          E 'th', style.th, 'سمت'
          E 'th', style.th, 'نام محل کار'
          E 'th', style.th, 'نسبت با شما'
          E 'th', style.th, 'شماره تماس'
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
        i2 = E 'input', extend {}, style.input, width: 250
      E 'td', style.td,
        i3 = E 'input', style.input
      E 'td', style.td,
        i4 = do ->
          i4 = E numberInput
          setStyle i4, style.input
          i4
      E 'td', style.td, do ->
        removeButtons.push removeButton = E style.remove
        onEvent removeButton, 'click', ->
          remove rows, row
          remove entries, entry
          setData 'در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید', entries
          destroy row
          offErrors.forEach (x) -> x()
        removeButton
    append body, row

    offErrors = []
    Object.keys fields =
      'نام و نام خانوادگی': i0
      'سمت': i1
      'نام محل کار': i2
      'نسبت با شما': i3
      'شماره تماس': i4
    .forEach (fieldName) ->
      field = fields[fieldName]
      error = registerErrorField field, field
      offErrors.push error.off
      setError error, 'تکمیل این فیلد الزامیست.', true
      if field.onChange
        field.onChange ->
          entry[fieldName] = field.value()
          setData 'در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید', entries
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
          setData 'در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید', entries
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