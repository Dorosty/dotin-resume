component = require './utils/component'
menu = require './menu'
login = require './login'
mainView = require './mainView'
{body} = require './utils/dom'

module.exports = component 'page', ({dom, state}) ->
  {E, append, destroy} = dom

  append E(body), E(menu)

  currentPage = undefined
  state.user.on allowNull: true, (user) ->
    if currentPage
      destroy currentPage
    if user
      currentPage = E(mainView)
      state.isInLoginPage.set false
    else
      currentPage = E(login)
      state.isInLoginPage.set true
    append E(body), currentPage