component = require '../../../../utils/component'
tooltip = require '../../../../components/tooltip'
style = require './style'
dropdown = require '../../../../components/dropdown'
{remove} = require '../../../../utils'

module.exports = component 'applicantFormEnglish', ({dom, events, setOff}, {setData, setError}) ->
  {E, setStyle} = dom
  {onEvent} = events

  hideTooltips = []
  setOff ->
    hideTooltips.forEach (hideTooltip) -> hideTooltip()

  E null,
    ['مکالمه', 'نوشتن', 'خواندن'].map (labelText) ->
      f = E dropdown, items: ['قوی', 'متوسط', 'ضعیف']
      setStyle f, style.dropdownPlaceholder
      setStyle f.input, style.input

      f.onChange ->
        setData label, f.value()

      column = E style.column,
        label = E style.label, labelText
        field = f

      input = field.input
      error = hideTooltip = undefined
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
          else
            setError labelText, error = null
        ), 100

      column

    E style.clearfix