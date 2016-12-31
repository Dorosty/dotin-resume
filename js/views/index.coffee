component = require '../utils/component'
apply = require './apply'
login = require './login'
hrView = require './hrView'
managerView = require './managerView'
applicantView = require './applicantView'
printView = require './printView'

module.exports = component 'views', ({dom, state}) ->
  {E, append, empty} = dom

  wrapper = E()

  currentPage = undefined
  if ~location.hash.indexOf '#print_'
    append wrapper, E printView, +location.hash.slice '#print_'.length
  else
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
      append wrapper, E currentPage


  wrapper