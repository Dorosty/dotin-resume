component = require '../../../../utils/component'
style = require './style'

module.exports = component 'applicantFormEducation', ({dom}, setData) ->
  {E} = dom

  E null, 'education'