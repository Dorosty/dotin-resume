component = require '../../../utils/component'
overview = require './overview'
scrollViewer = require '../../../components/scrollViewer'
personalInfo = require './personalInfo'

module.exports = component 'applicantForm', ({dom}) ->
  {E} = dom

  E null,
    E overview
    scroll = E scrollViewer
    E personalInfo