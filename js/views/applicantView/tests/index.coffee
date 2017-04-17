component = require '../../../utils/component'
style = require './style'
firstPage = require './firstPage'
secondPage = require './secondPage'
results = require './results'

module.exports = component 'applicantTests', ({dom, state}) ->
  {E, setStyle} = dom

  gotoTest = ->
    setStyle firstPageInstance, opacity: 0, visibility: 'hidden'
    setStyle secondPageInstance, opacity: 1, visibility: 'visible'
    secondPageInstance.gotoQuestion 0

  gotoResults = ->
    setStyle [firstPageInstance, secondPageInstance], opacity: 0, visibility: 'hidden'
    setStyle resultsInstance, opacity: 1, visibility: 'visible'

  state.user.on (user) ->
    if user.applicantTestResults
      setTimeout ->
        setStyle [firstPageInstance, secondPageInstance, resultsInstance], transition: 'none'
        gotoResults()

  E position: 'relative', width: '100%',
    firstPageInstance = E firstPage, gotoTest
    secondPageInstance = E secondPage, gotoResults
    resultsInstance = E results
