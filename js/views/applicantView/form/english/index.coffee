component = require '../../../../utils/component'
style = require './style'
dropdown = require '../../../../components/dropdown'

module.exports = component 'applicantFormEnglish', ({dom, events}, {setData, registerErrorField, setError}) ->
  {E, setStyle} = dom
  {onEvent} = events

  E null,
    ['مکالمه', 'نوشتن', 'خواندن'].map (labelText) ->
      field = E dropdown, items: ['عالی', 'خوب', 'متوسط', 'ضعیف']
      setStyle field, style.dropdownPlaceholder
      setStyle field.input, style.input

      field.onChange ->
        setData labelText, field.value()

      column = E style.column,
        label = E style.label, labelText
        field

      error = registerErrorField label, field

      setError error, 'تکمیل این فیلد الزامیست.', true
      onEvent field.input, 'input', ->
        setError error, 'تکمیل این فیلد الزامیست.', true
      onEvent field.input, 'blur', ->
        setTimeout ->
          unless field.value()
            setError error, 'تکمیل این فیلد الزامیست.'
          else
            setError error, null

      column

    E style.clearfix