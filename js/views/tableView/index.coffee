component = require '../../utils/component'
sidebar = require './sidebar'
search = require './search'

module.exports = component 'tableView', ({dom}) ->
  {E} = dom

  E 'span', null,
    E sidebar
    E marginRight: 350, marginTop: 50,
      E search