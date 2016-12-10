component = require '../../../../utils/component'
style = require './style'

module.exports = component 'applicantFormOthers', ({dom}, {setData, setError}) ->
  {E} = dom

  E null, 'به زودی...'