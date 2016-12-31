component = require '../../../../../utils/component'
radioSwitch = require '../../../../../components/radioSwitch'
style = require './style'
{extend, remove} = require '../../../../../utils'

module.exports = component 'applicantFormOthersPart2', ({dom, events}, {setData, registerErrorField, setError}) ->
  {E, setStyle, show, hide} = dom
  {onEvent} = events

  fields = {}

  view = E null,
    E style.label, 'آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید؟'
    x0 = fields['آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید'] = E radioSwitch, items: ['بلی', 'خیر'], selectedIndex: 1
    hide y0 = E 'input', extend {placeholder: 'نوع آن را ذکر نمایید.'}, style.input
    E style.clearfix
    E style.label, 'آیا دخانیات مصرف می‌کنید؟'
    fields['آیا دخانیات مصرف می‌کنید'] = E radioSwitch, items: ['بلی', 'خیر'], selectedIndex: 1
    E style.clearfix
    E style.label, 'آیا سابقه محکومیت کیفری دارید؟'
    x1 = fields['آیا سابقه محکومیت کیفری دارید'] = E radioSwitch, items: ['بلی', 'خیر'], selectedIndex: 1
    hide y1 = E 'input', extend {placeholder: 'تاریخ، دلایل و مدت آن را توضیح دهید.'}, style.input
    E style.clearfix

  Object.keys(fields).forEach (fieldName) ->
    field = fields[fieldName]
    setData fieldName, field.value()
    field.onChange ->
      setData fieldName, field.value()

  y0Error = registerErrorField y0, y0
  y1Error = registerErrorField y1, y1

  handleY0 = (hidden) ->
    setData 'نوع آن را ذکر نمایید.', y0.value()
    if y0.value().trim()
      setError y0Error, null
    else
      setError y0Error, 'تکمیل این فیلد الزامیست.', hidden

  x0.onChange ->
    if x0.value() is 'بلی'
      show y0
      handleY0 true
    else
      hide y0
      setError y0Error, null

  onEvent y0, 'input', ->
    handleY0 true

  onEvent y0, 'blur', ->
    handleY0 false

  handleY1 = (hidden) ->
    setData 'تاریخ، دلایل و مدت آن را توضیح دهید.', y1.value()
    if y1.value().trim()
      setError y1Error, null
    else
      setError y1Error, 'تکمیل این فیلد الزامیست.', hidden

  x1.onChange ->
    if x1.value() is 'بلی'
      show y1
      handleY1 true
    else
      hide y1
      setError y1Error, null

  onEvent y1, 'input', ->
    handleY1 true

  onEvent y1, 'blur', ->
    handleY1 false

  view