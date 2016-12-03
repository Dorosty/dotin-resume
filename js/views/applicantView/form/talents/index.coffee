component = require '../../../../utils/component'
style = require './style'

module.exports = component 'applicantFormTalents', ({dom}, setData) ->
  {E} = dom

  E 'table', null,
    E 'thead', null,
      E 'tr', null,
        E 'th', null, 'شایستگی / مهارت'
        E 'th', null, 'علاقه به کار در این حوزه'
        E 'th', null, 'دانش و مهارت در این حوزه'
        E 'th'
    E 'tbody', null,
      E 'tr', null,
        E 'td', null,
          E 'input'
        E 'td', null,
          E 'input'
        E 'td', null,
          E 'input'