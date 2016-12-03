component = require '../../../../utils/component'
style = require './style'
dropdown = require '../../../../components/dropdown'
{extend} = require '../../../../utils'

module.exports = component 'applicantFormEnglish', ({dom}, setData) ->
  {E, setStyle} = dom

  E null,
    ['مکالمه', 'نوشتن', 'خواندن'].map (label) ->
      f = E dropdown, getTitle: (x) ->
        switch x
          when 0
            'قوی'
          when 1
            'متوسط'
          when 2
            'ضعیف'
      f.update [0 .. 2]
      f.showEmpty true
      setStyle f, style.dropdownPlaceholder
      setStyle f.input, style.input
      E style.column,
        E style.label, label
        f
    E style.clearfix