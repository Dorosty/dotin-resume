component = require './utils/component'
views = require './views'
{body} = require './utils/dom'

module.exports = component 'page', ({dom}) ->
  {E, append} = dom

  append E(body), E views

###
  alert = require './components/alert'
  modal = require './components/modal'
  sheet = require './components/sheet'
  singletonAlert = require './singletons/alert'
  singletonModal = require './singletons/modal'
  singletonSheet = require './singletons/sheet'

  append E(body), alertE = E alert
  append E(body), modalE = E modal

  singletonAlert.set alertE
  singletonModal.set modalE
  singletonSheet.set E sheet
###