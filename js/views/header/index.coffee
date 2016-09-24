component = require '../../utils/component'
style = require './style'
{extend} = require '../../utils'

module.exports = component 'header', ({dom}, title) ->
  {E} = dom

  E style.header,
    E 'img', style.img
    E style.wrapper,
      E style.title, title
      E style.breadcrumbs,
        E 'a', extend({href: 'Home'}, style.breadcrumbsLink), 'خانه > '
        E 'a', extend({href: '#'}, style.breadcrumbsLinkActive), title