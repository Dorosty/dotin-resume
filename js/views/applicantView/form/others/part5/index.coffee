component = require '../../../../../utils/component'
tooltip = require '../../../../../components/tooltip'
radioSwitch = require '../../../../../components/radioSwitch'
style = require './style'
{extend, remove} = require '../../../../../utils'

module.exports = component 'applicantFormOthersPart2', ({dom, events, setOff}, {setData, setError}) ->
  {E, setStyle, show, hide} = dom
  {onEvent} = events

  hideTooltips = []
  setOff ->
    hideTooltips.forEach (hideTooltip) -> hideTooltip()

  fields = {}

  view = E null,
    E style.label, 'آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید؟'
    x0 = fields['آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید؟'] = E radioSwitch, items: ['بلی', 'خیر'], selectedIndex: 1
    hide y0 = E 'input', extend {placeholder: 'نوع آن را ذکر نمایید.'}, style.input
    E style.clearfix
    E style.label, 'آیا دخانیات مصرف می‌کنید؟'
    fields['آیا دخانیات مصرف می‌کنید؟'] = E radioSwitch, items: ['بلی', 'خیر'], selectedIndex: 1
    E style.clearfix
    E style.label, 'آیا سابقه محکومیت کیفری دارید؟'
    x1 = fields['آیا سابقه محکومیت کیفری دارید؟'] = E radioSwitch, items: ['بلی', 'خیر'], selectedIndex: 1
    hide y1 = E 'input', extend {placeholder: 'تاریخ، دلایل و مدت آن را توضیح دهید.'}, style.input
    E style.clearfix

  handleY0 = ->
    setData 'نوع آن را ذکر نمایید.', y0.value()
    if y0.value().trim()
      setError 'نوع آن را ذکر نمایید.', null
    else
      setError 'نوع آن را ذکر نمایید.', 'تکمیل این فیلد الزامیست.'

  x0.onChange ->
    if x0.value() is 'بلی'
      show y0
      handleY0()
    else
      hide y0
      setError 'نوع آن را ذکر نمایید.', null

  onEvent y0, 'input', handleY0

  handleY1 = ->
    setData 'تاریخ، دلایل و مدت آن را توضیح دهید.', y1.value()
    if y1.value().trim()
      setError 'تاریخ، دلایل و مدت آن را توضیح دهید.', null
    else
      setError 'تاریخ، دلایل و مدت آن را توضیح دهید.', 'تکمیل این فیلد الزامیست.'

  x1.onChange ->
    if x1.value() is 'بلی'
      show y1
      handleY1()
    else
      hide y1
      setError 'تاریخ، دلایل و مدت آن را توضیح دهید.', null

  onEvent y1, 'input', handleY1

  [y0, y1].forEach (y) ->
    error = hideTooltip = undefined
    onEvent y, 'focus', ->
      if error
        h = tooltip y, error
        hideTooltips.push hideTooltip = ->
          h()
          remove hideTooltips, hideTooltip
    onEvent y, ['input', 'pInput'], ->
      setStyle y, style.valid
      hideTooltip?()
    onEvent y, 'blur', ->
      setTimeout (->
        hideTooltip?()
        if !y.value().trim()
          setStyle y, style.invalid
          error = 'تکمیل این فیلد الزامیست.'
        else
          error = null
      ), 100

  view