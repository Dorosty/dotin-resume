component = require '../utils/component'
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
      switch user.type
        when 'hr'
          hrView
        when 'manager'
          managerView
        when 'applicant'
          applicantView
    else
      login

    append wrapper, E currentPage

  wrapper