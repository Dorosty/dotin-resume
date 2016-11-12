component = require '../../../../utils/component'
style = require './style'

module.exports = component 'search', ({dom, events, returnObject}) ->
  {E} = dom

  E margin: 20,
    E 'input', style.input
