component = require '../../../../../utils/component'
style = require './style'
tooltip = require '../../../../../components/tooltip'
dropdown = require '../../../../../components/dropdown'
dateInput = require '../../../../../components/dateInput'
numberInput = require '../../../../../components/restrictedInput/number'
{extend, remove} = require '../../../../../utils'

module.exports = component 'applicantFormOthersPart0', ({dom, events, setOff}, {setData, setError}) ->
  {E, text, setStyle, show, hide} = dom
  {onEvent} = events

  labels = {}
  fields = {}

  fields['متقاضه چه نوع همکاری هستید؟'] = f = E dropdown, items: ['تمام وقت', 'پاره وقت', 'مشاوره‌ای - ساعتی', 'پیمانکاری']
  setStyle f, style.dropdownPlaceholder
  setStyle f.input, style.dropdown

  f0 = E null, do ->
    fields['از چه طریقی از فرصت شغلی در داتین مطلع شدید؟'] = x = E dropdown, items: ['نمایشگاه/همایش/کنفرانس', 'آگهی', 'سایت داتین', 'دوستان و همکاران', 'سایر']
    setStyle x, style.dropdownPlaceholder
    setStyle x.input, style.dropdown
    hide y = E 'input', extend {placeholder: 'توضیحات...'}, style.descriptionInput
    x.onChange ->
      if x.value() is 'سایر'
        show y
      else
        hide y
    [x, y]

  fields['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید؟'] = f = E dateInput
  setStyle f, style.dateInputPlaceholder
  setStyle f.input, style.dateInput

  f1 = E null, do ->
    fields['میزان دستمزد'] = x = E dropdown, items: ['طبق قانون کار', 'قابل مذاکره', 'مقدار مشخص']
    setStyle x, style.dropdownPlaceholder
    setStyle x.input, style.dropdown
    hide y = fields['مقدار دستمزد'] = E numberInput
    setStyle y, style.descriptionInput
    hide z = labels['مقدار دستمزد'] = E style.inlineLabel, 'ریال'
    x.onChange ->
      if x.value() is 'مقدار مشخص'
        show [y, z]
        setData 'مقدار دستمزد', y.value()
        unless y.value()
          setError 'مقدار دستمزد', 'تکمیل این فیلد الزامیست.'
      else
        hide [y, z]
        setData 'مقدار دستمزد', null
        setError 'مقدار دستمزد', null
    [x, y, z]

  view = E null,
    E style.column,
      labels['متقاضه چه نوع همکاری هستید؟'] = E style.label, 'متقاضه چه نوع همکاری هستید؟'
      fields['متقاضه چه نوع همکاری هستید؟']
      labels['از چه طریقی از فرصت شغلی در داتین مطلع شدید؟'] = E style.label, 'از چه طریقی از فرصت شغلی در داتین مطلع شدید؟'
      f0
      labels['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید؟'] = E style.label, 'از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید؟'
      fields['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید؟']
    E style.column,
      E style.label,
        labels['نوع بیمه‌ای که تا‌به‌حال داشته‌اید؟'] = E 'span', null, 'نوع بیمه‌ای که تا‌به‌حال داشته‌اید؟'
        E style.optional, '(اختیاری)'
      fields['نوع بیمه‌ای که تا‌به‌حال داشته‌اید؟'] = E 'input', style.input
      E style.label,
        labels['مدت زمانی که بیمه بوده‌اید؟'] = E 'span', null, 'مدت زمانی که بیمه بوده‌اید؟'
        E style.optional, '(اختیاری)'
      fields['مدت زمانی که بیمه بوده‌اید؟'] = E 'input', style.input
      labels['میزان دستمزد'] = E style.label,
        text 'میزان دستمزد '
        E style.underline, 'خالص'
        text ' درخواستی شما چقدر است؟'
      f1
    E style.clearfix

  hideTooltips = []
  Object.keys(fields).forEach (labelText) ->
    if labelText in ['نوع بیمه‌ای که تا‌به‌حال داشته‌اید؟', 'مدت زمانی که بیمه بوده‌اید؟']
      return
    field = fields[labelText]
    label = labels[labelText]
    input = field.input || field
    error = hideTooltip = undefined
    unless labelText is 'مقدار دستمزد'
      setError labelText, 'تکمیل این فیلد الزامیست.'
    onEvent input, 'focus', ->
      if error
        h = tooltip input, error
        hideTooltips.push hideTooltip = ->
          h()
          remove hideTooltips, hideTooltip
    onEvent input, ['input', 'pInput'], ->
      setStyle [label, input], style.valid
      hideTooltip?()
    onEvent input, 'blur', ->
      setTimeout (->
        hideTooltip?()
        if !field.value()? || (typeof(field.value()) is 'string' && !field.value().trim())
          setStyle [label, input], style.invalid
          setError labelText, error = 'تکمیل این فیلد الزامیست.'
        else if field.valid? && !field.valid()
          setStyle [label, input], style.invalid
          setError labelText, error = 'مقدار وارد شده قابل قبول نیست.'
        else
          setError labelText, error = null
      ), 100
  setOff ->
    hideTooltips.forEach (hideTooltip) -> hideTooltip()

  view