component = require '../../../../utils/component'
style = require './style'
tooltip = require '../../../../components/tooltip'
radioSwitch = require '../../../../components/radioSwitch'
dateInput = require '../../../../components/dateInput'
dropdown = require '../../../../components/dropdown'
numberInput = require '../../../../components/restrictedInput/number'
emailInput = require '../../../../components/restrictedInput/email'
phoneNumberInput = require '../../../../components/restrictedInput/phoneNumber'
checkbox = require '../../../../components/checkbox'
multivalue = require './multivalue'
{extend, remove, defer} = require '../../../../utils'

module.exports = component 'applicantFormPersonalInfo', ({dom, events, state, setOff}, {setData, setError}) ->
  {E, setStyle, show, hide} = dom
  {onEvent} = events

  fieldCollections = [0 .. 2].map -> {}

  addTextField = (column, label, isOptional) ->
    fieldCollections[column][label] = f = E 'input', style.input
    onEvent f, 'input', do (f) -> ->
      setData label, f.value()

  fieldCollections[0]['جنسیت'] = f = E radioSwitch, items: ['مرد', 'زن']
  setData 'جنسیت', f.value()
  f.onChange do (f) -> ->
    setData 'جنسیت', f.value()

  addTextField 0, 'نام پدر'

  fieldCollections[0]['شماره شناسنامه'] = f = E numberInput
  setStyle f, style.input
  onEvent f, ['input', 'pInput'], do (f) -> ->
    setData 'شماره شناسنامه', f.value()

  addTextField 0, 'محل تولد'
  addTextField 0, 'محل صدور'
  addTextField 0, 'ملیت'
  addTextField 0, 'تابعیت'
  addTextField 0, 'دین'

  fieldCollections[0]['تاریخ تولد'] = f = E dateInput
  setStyle f, style.dateInputPlaceholder
  setStyle f.input, style.specialInput
  onEvent f, ['input', 'pInput'], do (f) -> ->
    setData 'تاریخ تولد', f.value()

  fieldCollections[1]['وضعیت نظام وظیفه'] = f = E dropdown, items: ['انجام شده', 'در حال انجام', 'معاف']
  setStyle f, style.dropdownPlaceholder
  setStyle f.input, style.specialInput
  f.onChange do (f) -> ->
    setData 'وضعیت نظام وظیفه', f.value()

  fieldCollections[1]['نوع معافیت'] = f = E dropdown, items: ['خرید خدمت', 'معافیت تخصیلی', 'معافیت کفالت', 'معافیت پزشکی']
  setStyle f, style.dropdownPlaceholder
  setStyle f.input, style.specialInput
  f.onChange do (f) -> ->
    setData 'نوع معافیت', f.value()

  addTextField 1, 'دلیل معافیت'

  fieldCollections[1]['وضعیت تاهل'] = f = E radioSwitch, items: ['مجرد', 'متاهل', 'سایر'], selectedIndex: 2
  setData 'وضعیت تاهل', f.value()
  f.onChange do (f) -> ->
    setData 'وضعیت تاهل', f.value()

  fieldCollections[1]['تعداد فرزندان'] = f = E numberInput
  setStyle f, style.numberInput
  onEvent f, ['input', 'pInput'], do (f) -> ->
    setData 'تعداد فرزندان', f.value()

  fieldCollections[1]['تعداد افراد تحت تکفل'] = f = E numberInput
  setStyle f, style.numberInput
  onEvent f, ['input', 'pInput'], do (f) -> ->
    setData 'تعداد افراد تحت تکفل', f.value()

  addTextField 1, 'نام معرف', true

  f = E emailInput
  setStyle f, style.input
  fieldCollections[2]['ایمیل'] = f = E multivalue, f
  state.user.on once: true, (user) ->
    f.add user.email
  do (f) -> setTimeout ->
    label = labelArrays[2][0]
    input = f.input
    error = hideTooltip = undefined
    onEvent input, 'focus', ->
      if error
        h = tooltip input, error
        hideTooltips.push hideTooltip = ->
          h()
          remove hideTooltips, hideTooltip
    onEvent input, ['input', 'pInput'], ->
      setStyle [label, input], style.valid
      error = null
      hideTooltip?()
    f.onChange (adding) ->
      unless adding
        return
      if !input.value()
        error = 'تکمیل این فیلد الزامیست.'
        setStyle [input, label], style.invalid
        return false
      if !input.valid()
        error = 'مقدار وارد شده قابل قبول نیست.'
        setStyle [input, label], style.invalid
        return false
      setData 'ایمیل', f.value()

  f = E phoneNumberInput
  setStyle f, style.input
  fieldCollections[2]['تلفن همراه'] = f = E multivalue, f
  do (f) -> setTimeout ->
    label = labelArrays[2][1]
    input = f.input
    error = hideTooltip = undefined
    onEvent input, 'focus', ->
      if error
        h = tooltip input, error
        hideTooltips.push hideTooltip = ->
          h()
          remove hideTooltips, hideTooltip
    onEvent input, ['input', 'pInput'], ->
      setStyle [label, input], style.valid
      error = null
      hideTooltip?()
    f.onChange (adding) ->
      unless adding
        return
      if !input.value()
        error = 'تکمیل این فیلد الزامیست.'
        setStyle [input, label], style.invalid
        return false
      if !input.valid()
        error = 'مقدار وارد شده قابل قبول نیست.'
        setStyle [input, label], style.invalid
        return false
      setData 'تلفن همراه', f.value()

  textArrays = []
  groupArrays = []
  labelArrays = []
  fieldArrays = []
  fieldCollections.forEach (fieldCollection) ->
    textArrays.push textArray = []
    groupArrays.push groupArray = []
    labelArrays.push labelArray = []
    fieldArrays.push fieldArray = []
    Object.keys(fieldCollection).forEach (labelText) ->
      group = E style.group,
        label = E style.label, labelText + ':'
        field = fieldCollection[labelText]
        E style.clearfix
      textArray.push labelText
      groupArray.push group
      labelArray.push label
      fieldArray.push field

  addresses = [
    E margin: '20px 0',
      addressLabel = E style.bigLabel, 'مشخصات محل سکونت دائم:'
      address = E 'input', extend {placeholder: 'آدرس پستی'}, style.address
      phone = E numberInput
    E margin: '20px 0',
      address2Checkbox = E checkbox, 'محل سکونت فعلی‌ام با محل سکونت دائم فوق متفاوت است.'
      hide address2 = E 'input', extend {placeholder: 'آدرس پستی محل سکونت'}, style.address
      hide phone2 = E numberInput
  ]

  setStyle phone, extend {placeholder: 'تلفن تماس - 0218558555'}, style.phoneNumber
  setStyle phone2, extend {placeholder: 'تلفن تماس محل سکونت'}, style.phoneNumber

  textArrays.push ['آدرس', 'تلفن ثابت', 'آدرس 2', 'تلفن ثابت 2']
  labelArrays.push [E(), E(), E(), E()]
  fieldArrays.push [address, phone, address2, phone2]

  address2Checkbox.onChange ->
    if address2Checkbox.value()
      show [address2, phone2]
      setData 'آدرس 2', address2.value()
      setData 'تلفن ثابت 2', phone2.value()
      unless address2.value()
        setError 'آدرس 2', 'تکمیل این فیلد الزامیست.'
      unless phone2.value()
        setError 'تلفن ثابت 2', 'تکمیل این فیلد الزامیست.'
    else
      hide [address2, phone2]
      setData 'آدرس 2', null
      setData 'تلفن ثابت 2', null
      setError 'آدرس 2', null
      setError 'تلفن ثابت 2', null

  hideTooltips = []
  fieldArrays.forEach (fieldArray, i) ->
    textArray = textArrays[i]
    labelArray = labelArrays[i]
    fieldArray.forEach (field, j) ->
      if i is 0 && j is 0
        return
      if i is 1 && j in [3, 6]
        return
      if i is 2
        return
      text = textArray[j]
      label = labelArray[j]
      input = field.input || field
      error = hideTooltip = undefined
      unless (i is 1 && j in [1, 2]) || (i is 3 && j in [2, 3])
        setError text, 'تکمیل این فیلد الزامیست.'
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
            setError text, error = 'تکمیل این فیلد الزامیست.'
          else if field.valid? && !field.valid()
            setStyle [label, input], style.invalid
            setError text, error = 'مقدار وارد شده قابل قبول نیست.'
          else
            setError text, error = null
        ), 100
  setOff ->
    hideTooltips.forEach (hideTooltip) -> hideTooltip()

  do hideMoaf = ->
    hide groupArrays[1][1]
    hide groupArrays[1][2]
    setData 'نوع معافیت', null
    setData 'دلیل معافیت', null
    setError 'نوع معافیت', null
    setError 'دلیل معافیت', null
  fieldCollections[1]['وضعیت نظام وظیفه'].onChange ->
    if fieldCollections[1]['وضعیت نظام وظیفه'].value() is 'معاف'
      show groupArrays[1][1]
      show groupArrays[1][2]
      setData 'نوع معافیت', fieldCollections[1]['نوع معافیت'].value()
      setData 'دلیل معافیت', fieldCollections[1]['دلیل معافیت'].value()
      unless fieldCollections[1]['نوع معافیت'].value()
        setError 'نوع معافیت', 'تکمیل این فیلد الزامیست.'
      unless fieldCollections[1]['دلیل معافیت'].value()
        setError 'دلیل معافیت', 'تکمیل این فیلد الزامیست.'
    else
      hideMoaf()

  view = E null,
    groupArrays.map (groupArray) ->
      E style.column,
        groupArray
    E style.clearfix
    addresses

  view