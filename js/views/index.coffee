component = require '../utils/component'
apply = require './apply'
login = require './login'
hrView = require './hrView'
managerView = require './managerView'
applicantView = require './applicantView'

module.exports = component 'views', ({dom, state}) ->
  {E, append, empty} = dom

  wrapper = E()

  currentPage = undefined
  state.user.on allowNull: true, (user) ->
    
    empty wrapper

    currentPage = if user
      switch user.userType
        when 3
          applicantView
        when 1
          managerView
        when 2
          hrView
    else
      login
    # currentPage = apply

    append wrapper, E currentPage

  wrapper