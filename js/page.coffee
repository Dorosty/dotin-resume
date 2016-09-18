component = require './utils/component'
login = require './login'
{body} = require './utils/dom'

module.exports = component 'page', ({dom}) ->
  {E, append} = dom
  append E(body), E(login)