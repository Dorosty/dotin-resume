component = require './utils/component'
login = require './login'
{body} = require './utils/dom'

module.exports = component 'page', ({dom, state}) ->
  {E, append, setStyle} = dom

  append E(body), E 'div', null,
    username = E 'div'
    E(login)

  state.user.on allowNull: true, (user) ->
    setStyle username, text: user?.name ? ''