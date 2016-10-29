component = require '../../../utils/component'
style = require './style'

module.exports = component 'tableView', ({dom}) ->
  {E} = dom

  E 'span', null,
    E 'input', style.searchbox
    E style.settings