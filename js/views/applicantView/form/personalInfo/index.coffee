component = require '../../../../utils/component'
style = require './style'
radioSwitch = require '../../../../components/radioSwitch'
dropdown = require '../../../../components/dropdown'
numberInput = require '../../../../components/restrictedInput/number'
emailInput = require '../../../../components/restrictedInput/email'
phoneNumberInput = require '../../../../components/restrictedInput/phoneNumber'
checkbox = require '../../../../components/checkbox'
multivalue = require './multivalue'
{extend, remove, defer, toPersian} = require '../../../../utils'

module.exports = component 'applicantFormPersonalInfo', ({dom, events, state}, {setData, registerErrorField, setError}) ->
  {E, text, setStyle, show, hide} = dom
  {onEvent} = events

  fieldCollections = [0 .. 2].map -> {}

  addTextField = (column, label) ->
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
  addTextField 0, 'مذهب'

  fieldCollections[1]['وضعیت نظام وظیفه'] = f = E dropdown, items: ['انجام شده', 'در حال انجام', 'معاف']
  setStyle f, style.dropdownPlaceholder
  setStyle f.input, style.specialInput
  f.onChange do (f) -> ->
    setData 'وضعیت نظام وظیفه', f.value()

  fieldCollections[1]['نوع معافیت'] = f = E dropdown, items: ['خرید خدمت', 'معافیت تحصیلی', 'معافیت کفالت', 'معافیت پزشکی']
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

  addTextField 1, 'نام معرف'

  handleMultivalue = (fieldName, label, f) ->
    error = registerErrorField label, f, true
    onEvent f.input, 'input', ->
      setError error, null
    f.onChange (adding) ->
      if adding
        if !f.input.value()
          setError error, 'تکمیل این فیلد الزامیست.'
          return false
        if !f.input.valid()
          setError error, 'مقدار وارد شده قابل قبول نیست.'
          return false
      setTimeout ->
        setData fieldName, f.value()

  f = E emailInput
  setStyle f, style.input
  state.user.on once: true, (user) ->
    fieldCollections[2]['ایمیل'] = f = E multivalue, input: f, initialItems: [user.email]
    do (f) -> setTimeout ->
      handleMultivalue 'ایمیل', labelArrays[2][0], f

  f = E phoneNumberInput
  setStyle f, style.input
  state.user.on once: true, (user) ->
    fieldCollections[2]['تلفن همراه'] = f = E multivalue, input: f, initialItems: [toPersian user.phoneNumber]
    do (f) -> setTimeout ->
      handleMultivalue 'تلفن همراه', labelArrays[2][1], f

  textArrays = []
  groupArrays = []
  labelArrays = []
  fieldArrays = []
  fieldCollections.forEach (fieldCollection, i) ->
    textArrays.push textArray = []
    groupArrays.push groupArray = []
    labelArrays.push labelArray = []
    fieldArrays.push fieldArray = []
    Object.keys(fieldCollection).forEach (labelText, j) ->
      group = E style.group,
        label = E style.label,
          text labelText
          if i is 1 && j is 6
            E style.optional, '(اختیاری)'
          text ':'
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

  onEvent address, 'input', ->
    setData 'آدرس محل سکونت دائم', address.value()
  onEvent phone, 'input', ->
    setData 'تلفن ثابت محل سکونت دائم', phone.value()
  onEvent address2, 'input', ->
    setData 'آدرس محل سکونت فعلی', address2.value()
  onEvent phone2, 'input', ->
    setData 'تلفن ثابت محل سکونت فعلی', phone2.value()

  setStyle phone, extend {placeholder: 'تلفن تماس - 02185585558'}, style.phoneNumber
  setStyle phone2, extend {placeholder: 'تلفن تماس محل سکونت'}, style.phoneNumber

  textArrays.push ['آدرس محل سکونت دائم', 'تلفن ثابت محل سکونت دائم', 'آدرس محل سکونت فعلی', 'تلفن ثابت محل سکونت فعلی']
  labelArrays.push [address, phone, address2, phone2]
  fieldArrays.push [address, phone, address2, phone2]

  errors = {}
  fieldArrays.forEach (fieldArray, i) ->
    textArray = textArrays[i]
    labelArray = labelArrays[i]
    fieldArray.forEach (field, j) ->
      if i is 0 && j in [0, 8]
        return
      if i is 1 && j in [3, 5, 6]
        return
      if i is 2
        return
      labelText = textArray[j]
      label = labelArray[j]
      error = registerErrorField label, field
      unless (i is 1 && j in [1, 2]) || (i is 3 && j in [2, 3])
        setError error, 'تکمیل این فیلد الزامیست.', true
      if i is 1
        if j is 0
          errors['وضعیت نظام وظیفه'] = error
        if j is 1
          errors['نوع معافیت'] = error
        if j is 2
          errors['دلیل معافیت'] = error
        if j is 4
          errors['تعداد فرزندان'] = error
      if i is 3
        if j is 2
          errors['آدرس محل سکونت فعلی'] = error
        if j is 3
          errors['تلفن ثابت محل سکونت فعلی'] = error
      if field.onChange
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
        handleChange = (hidden) -> ->
          if !field.value().trim()
            setError error, 'تکمیل این فیلد الزامیست.', hidden
          else if field.valid? && !field.valid()
            setError error, 'مقدار وارد شده قابل قبول نیست.', hidden
          else
            setError error, null
        onEvent input, ['input', 'pInput'], handleChange true
        onEvent input, 'blur', handleChange false

  address2Checkbox.onChange ->
    if address2Checkbox.value()
      show [address2, phone2]
      setData 'آدرس محل سکونت فعلی', address2.value()
      setData 'تلفن ثابت محل سکونت فعلی', phone2.value()
      unless address2.value()
        setError errors['آدرس محل سکونت فعلی'], 'تکمیل این فیلد الزامیست.', true
      unless phone2.value()
        setError errors['تلفن ثابت محل سکونت فعلی'], 'تکمیل این فیلد الزامیست.', true
    else
      hide [address2, phone2]
      setData 'آدرس محل سکونت فعلی', null
      setData 'تلفن ثابت محل سکونت فعلی', null
      setError errors['آدرس محل سکونت فعلی'], null
      setError errors['تلفن ثابت محل سکونت فعلی'], null

  fieldCollections[1]['وضعیت تاهل'].onChange ->
    if fieldCollections[1]['وضعیت تاهل'].value() isnt 'مجرد'
      show groupArrays[1][4]
      setData 'تعداد فرزندان', fieldCollections[1]['تعداد فرزندان'].value()
      unless fieldCollections[1]['تعداد فرزندان'].value()
        setError errors['تعداد فرزندان'], 'تکمیل این فیلد الزامیست.', true
    else
      hide groupArrays[1][4]
      setData 'تعداد فرزندان', null
      setError errors['تعداد فرزندان'], null

  fieldCollections[0]['جنسیت'].onChange ->
    if fieldCollections[0]['جنسیت'].value() is 'مرد'
      show groupArrays[1][0]
      setData 'وضعیت نظام وظیفه', fieldCollections[1]['وضعیت نظام وظیفه'].value()
      unless fieldCollections[1]['وضعیت نظام وظیفه'].value()
        setError errors['وضعیت نظام وظیفه'], 'تکمیل این فیلد الزامیست.', true
      manageMoaf()
    else
      hide groupArrays[1][0]
      hide groupArrays[1][1]
      hide groupArrays[1][2]
      setData 'وضعیت نظام وظیفه', null
      setData 'نوع معافیت', null
      setData 'دلیل معافیت', null
      setError errors['وضعیت نظام وظیفه'], null
      setError errors['نوع معافیت'], null
      setError errors['دلیل معافیت'], null

  do manageMoaf = ->
    if fieldCollections[1]['وضعیت نظام وظیفه'].value() is 'معاف'
      show groupArrays[1][1]
      setData 'نوع معافیت', fieldCollections[1]['نوع معافیت'].value()
      unless fieldCollections[1]['نوع معافیت'].value()
        setError errors['نوع معافیت'], 'تکمیل این فیلد الزامیست.', true
      manageDalil()
    else
      hide groupArrays[1][1]
      hide groupArrays[1][2]
      setData 'نوع معافیت', null
      setData 'دلیل معافیت', null
      setError errors['نوع معافیت'], null
      setError errors['دلیل معافیت'], null

  manageDalil = ->
    if fieldCollections[1]['نوع معافیت'].value() is 'معافیت پزشکی'
      show groupArrays[1][2]
      setData 'دلیل معافیت', fieldCollections[1]['دلیل معافیت'].value()
      unless fieldCollections[1]['دلیل معافیت'].value()
        setError errors['دلیل معافیت'], 'تکمیل این فیلد الزامیست.', true
    else
      hide groupArrays[1][2]
      setData 'دلیل معافیت', null
      setError errors['دلیل معافیت'], null

  fieldCollections[1]['وضعیت نظام وظیفه'].onChange manageMoaf
  fieldCollections[1]['نوع معافیت'].onChange manageDalil

  view = E null,
    groupArrays.map (groupArray) ->
      E style.column,
        groupArray
    E style.clearfix
    addresses

  view