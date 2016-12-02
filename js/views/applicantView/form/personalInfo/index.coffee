component = require '../../../../utils/component'
style = require './style'
tooltip = require '../../../../components/tooltip'
radioSwitch = require '../../../../components/radioSwitch'
dateInput = require '../../../../components/dateInput'
dropdown = require '../../../../components/dropdown'
numberInput = require '../../../../components/restrictedInput/number'
phoneNumberInput = require '../../../../components/restrictedInput/phoneNumber'
multivalue = require './multivalue'
{extend, remove} = require '../../../../utils'

module.exports = component 'personalInfo', ({dom, events, setOff}) ->
  {E, setStyle, show, hide} = dom
  {onEvent} = events

  fieldCollections = [0 .. 2].map -> {}

  addTextField = (column, label, extraStyle = {}) ->
    fieldCollections[column][label] = E 'input', extend extraStyle, style.input

  fieldCollections[0]['جنسیت'] = f = E radioSwitch, getTitle: (x) ->
    switch x
      when 0
        'مرد'
      when 1
        'زن'
  f.update [0 .. 1]

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

  fieldCollections[1]['تعداد فرزندان'] = f = E numberInput
  setStyle f, style.numberInput

  fieldCollections[1]['تعداد افراد تحت تکلف'] = f = E numberInput
  setStyle f, style.numberInput

  addTextField 1, 'نام معرف', placeholder: 'اختیاری'

  fieldCollections[2]['ایمیل'] = f = E multivalue, E 'input', style.input
  f = E phoneNumberInput
  setStyle f, style.input
  fieldCollections[2]['تلفن همراه'] = f = E multivalue, f

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
      hideTooltip = undefined
      label = labelArray[j]
      onEvent input, ['focus', 'input', 'pInput'], ->
        setStyle [label, input], style.valid
        hideTooltip?()
      onEvent input, 'blur', ->
        if !field.value() || field.value() is -1 || !field.value().trim()
          setStyle [label, input], style.invalid
          h = tooltip input, 'تکمیل این فیلد الزامیست...'
          hideTooltips.push hideTooltip = ->
            h()
            remove hideTooltips, hideTooltip

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

  E null,
    E style.header, 'مشخصات فردی'
    groupArrays.map (groupArray) ->
      E style.column,
        groupArray