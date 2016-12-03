component = require '../../../../utils/component'
style = require './style'

module.exports = component 'applicantFormReputation', ({dom}, setData) ->
  {E} = dom

  E null, 'reputation'