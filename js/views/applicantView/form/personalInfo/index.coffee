component = require '../../../../utils/component'
style = require './style'
tooltip = require '../../../../components/tooltip'
radioSwitch = require '../../../../components/radioSwitch'
dateInput = require '../../../../components/dateInput'
dropdown = require '../../../../components/dropdown'
numberInput = require '../../../../components/restrictedInput/number'
phoneNumberInput = require '../../../../components/restrictedInput/phoneNumber'
checkbox = require '../../../../components/checkbox'
multivalue = require './multivalue'
{extend, remove} = require '../../../../utils'

module.exports = component 'applicantFormPersonalInfo', ({dom, events, setOff}, {setData}) ->
  {E, setStyle, show, hide} = dom
  {onEvent} = events

  fieldCollections = [0 .. 2].map -> {}

  addTextField = (column, label, extraStyle = {}) ->
    fieldCollections[column][label] = f = E 'input', extend extraStyle, style.input
    onEvent f, ['input', 'pInput'], do (f) -> ->
      setData label, f.value()

  fieldCollections[0]['جنسیت'] = f = E radioSwitch, getTitle: (x) ->
    switch x
      when 0
        'مرد'
      when 1
        'زن'
  f.update [0 .. 1]
  f.onChange do (f) -> ->
    setData 'جنسیت', f.value()

  addTextField 0, 'نام پدر'
  addTextField 0, 'شماره شناسنامه'
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

  fieldCollections[1]['وضعیت نظام وظیفه'] = f = E dropdown, getTitle: (x) ->
    switch x
      when 0
        'اتمام'
      when 1
        'مشمول'
      when 2
        'معاف'
  f.update [0 .. 2]
  f.showEmpty true
  setStyle f, style.dropdownPlaceholder
  setStyle f.input, style.specialInput
  onEvent f.input, ['input', 'pInput'], do (f) -> ->
    setData 'وضعیت نظام وظیفه', f.value()

  fieldCollections[1]['نوع معافیت'] = f = E dropdown, getTitle: (x) ->
    switch x
      when 0
        'پزشکی'
      when 1
        'سایر'
  f.update [0 .. 1]
  f.showEmpty true
  setStyle f, style.dropdownPlaceholder
  setStyle f.input, style.specialInput
  onEvent f.input, ['input', 'pInput'], do (f) -> ->
    setData 'نوع معافیت', f.value()

  addTextField 1, 'دلیل معافیت'

  fieldCollections[1]['وضعیت تاهل'] = f = E radioSwitch, getTitle: (x) ->
    switch x
      when 0
        'مجرد'
      when 1
        'متاهل'
      when 2
        'سایر'
  f.update [0 .. 2]
  f.setSelectedId 2
  f.onChange do (f) -> ->
    setData 'وضعیت تاهل', f.value()

  fieldCollections[1]['تعداد فرزندان'] = f = E numberInput
  setStyle f, style.numberInput
  onEvent f, ['input', 'pInput'], do (f) -> ->
    setData 'تعداد فرزندان', f.value()

  fieldCollections[1]['تعداد افراد تحت تکلف'] = f = E numberInput
  setStyle f, style.numberInput
  onEvent f, ['input', 'pInput'], do (f) -> ->
    setData 'تعداد افراد تحت تکلف', f.value()

  addTextField 1, 'نام معرف', placeholder: 'اختیاری'

  fieldCollections[2]['ایمیل'] = f = E multivalue, E 'input', style.input
  f.onChange do (f) -> ->
    setData 'ایمیل', f.value()

  f = E phoneNumberInput
  setStyle f, style.input
  fieldCollections[2]['تلفن همراه'] = f = E multivalue, f
  f.onChange do (f) -> ->
    setData 'تلفن همراه', f.value()

  groupArrays = []
  labelArrays = []
  fieldArrays = []
  fieldCollections.forEach (fieldCollection) ->
    groupArrays.push groupArray = []
    labelArrays.push labelArray = []
    fieldArrays.push fieldArray = []
    Object.keys(fieldCollection).forEach (labelText) ->
      group = E style.group,
        label = E style.label, labelText + ':'
        field = fieldCollection[labelText]
        E style.clearfix
      groupArray.push group
      labelArray.push label
      fieldArray.push field

  hideTooltips = []
  fieldArrays.forEach (fieldArray, i) ->
    labelArray = labelArrays[i]
    fieldArray.forEach (field, j) ->
      if i is 1 and j is 6
        return
      if field.input
        input = field.input
      else
        input = field
      hideTooltip = timeout = undefined
      label = labelArray[j]
      onEvent input, ['focus', 'input', 'pInput'], ->
        setStyle [label, input], style.valid
        if timeout and !(!field.value()? || field.value() is -1 || (typeof(field.value()) is 'string' && !field.value().trim()))
          clearTimeout timeout
        else
          hideTooltip?()
      onEvent input, 'blur', ->
        if !field.value()? || field.value() is -1 || (typeof(field.value()) is 'string' && !field.value().trim())
          timeout = setTimeout (->
            setStyle [label, input], style.invalid
            h = tooltip input, 'تکمیل این فیلد الزامیست...'
            hideTooltips.push hideTooltip = ->
              h()
              remove hideTooltips, hideTooltip
          ), 100

  do hideMoaf = ->
    hide groupArrays[1][1]
    hide groupArrays[1][2]
  onEvent fieldCollections[1]['وضعیت نظام وظیفه'].input, ['input', 'pInput'], ->
    if fieldCollections[1]['وضعیت نظام وظیفه'].value() is 2
      show groupArrays[1][1]
      show groupArrays[1][2]
    else
      hideMoaf()

  setOff ->
    hideTooltips.forEach (hideTooltip) -> hideTooltip()

  view = E null,
    groupArrays.map (groupArray) ->
      E style.column,
        groupArray
    E style.clearfix
    E margin: '20px 0',
      E style.bigLabel, 'مشخصات محل سکونت دائم:'
      E 'input', extend {placeholder: 'آدرس پستی'}, style.address
      E 'input', extend {placeholder: 'تلفن تماس - 0218558555'}, style.phoneNumber
    E margin: '20px 0',
      checkbox2 = E checkbox, 'محل سکونت فعلی‌ام با محل سکونت دائم فوق متفاوت است.'
      hide address2 = E 'input', extend {placeholder: 'آدرس پستی محل سکونت'}, style.address
      hide phone2 = E 'input', extend {placeholder: 'تلفن تماس محل سکونت'}, style.phoneNumber

  checkbox2.onChange ->
    if checkbox2.value()
      show [address2, phone2]
    else
      hide [address2, phone2]

  view