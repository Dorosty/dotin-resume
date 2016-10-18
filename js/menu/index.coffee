component = require '../utils/component'
style = require './style'
{extend} = require '../utils'

module.exports = component 'menu', ({dom, events, state, service}, handlers) ->

  {E, text, setStyle, show, hide} = dom
  {onEvent, onMouseover, onMouseout, onResize} = events

  menu = E style.menu,
    cover = E style.cover
    E 'a', style.logo,
      E 'img', style.logoImg
      text 'شرکت نرم‌افزاری داتیس آرین قشم'
    E 'a', style.en, 'EN'
    E 'a', style.contact, 'تماس با ما'
    username = E style.username
    logout = E style.logout, 'خروج'
    linksPlaceholder = E style.links,
      links = [
        {href: '', text: 'خانه'}
        {href: 'about', text: 'درباره ما'}
        {href: 'solutions', text: 'راهکارها'}
        {href: 'products', text: 'محصولات'}
        {href: 'services', text: 'خدمات'}
        {href: 'apply', text: 'دعوت به همکاری'}
      ].map ({href, text}) ->
        E 'a', extend({href: "Home##{href}"}, style.link), text

  do resize = ->
    width = window.innerWidth
    if width > 1010
      setStyle menu, style.menu1
      setStyle linksPlaceholder, style.links1
    else # if width > 590
      setStyle menu, style.menu2
      setStyle linksPlaceholder, style.links2
  onResize resize

  links.forEach (link, i) ->
    onMouseover link, ->
      setStyle link, style.linkHover
    onMouseout link, ->
      setStyle link, style.link
    onEvent link, 'click', ->
      handlers.click i

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