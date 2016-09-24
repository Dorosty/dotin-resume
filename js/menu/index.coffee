component = require '../utils/component'
style = require './style'
{extend} = require '../utils'

module.exports = component 'menu', ({dom, events, state, service}) ->

  {E, text, setStyle, show, hide} = dom
  {onEvent, onMouseover, onMouseout} = events

  menu = E style.menu,
    cover = E style.cover
    E style.wrapper,
      E 'a', style.logo,
        E 'img', style.logoImg
        text 'شرکت نرم‌افزاری داتیس آرین قشم'
      E 'a', style.en, 'EN'
      E 'a', style.contact, 'تماس با ما'
      username = E style.username
      logout = E style.logout, 'خروج'
      E style.links,
        links = [
          {href: '', text: 'خانه'}
          {href: 'about', text: 'درباره ما'}
          {href: 'solutions', text: 'راهکارها'}
          {href: 'products', text: 'محصولات'}
          {href: 'services', text: 'خدمات'}
          {href: 'apply', text: 'دعوت به همکاری'}
        ].map ({href, text}) ->
          E 'a', extend({href: "Home##{href}"}, style.link), text

  links.forEach (link) ->
    onMouseover link, ->
      setStyle link, style.linkHover
    onMouseout link, ->
      setStyle link, style.link

  onEvent logout, 'click', ->
    setStyle cover, visibility: 'visible', opacity: 0.5
    service.logout().fin ->
      setStyle cover, visibility: 'hidden', opacity: 0
    .done()

  state.user.on allowNull: true, (user) ->
    if user
      show username
      show logout
      setStyle username, text: user.name
    else
      hide username
      hide logout

  return menu