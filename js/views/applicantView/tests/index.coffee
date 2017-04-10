component = require '../../../utils/component'
style = require './style'
firstPage = require './firstPage'
secondPage = require './secondPage'

module.exports = component 'applicantTests', ({dom}) ->
  {E, setStyle} = dom

  gotoTest = ->
    setStyle firstPageInstance, opacity: 0, visibility: 'hidden'
    setStyle secondPageInstance, opacity: 1, visibility: 'visible'
    secondPageInstance.gotoQuestion 0
  
  E position: 'relative', width: '100%',
    firstPageInstance = E firstPage, gotoTest
    secondPageInstance = E secondPage
