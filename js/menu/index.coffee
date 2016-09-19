component = require '../utils/component'
style = require './style'
{extend} = require '../utils'

module.exports = component 'login', ({dom, events, state, service}) ->

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
      login = E style.login, 'ورود'
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

  onEvent login, 'click', ->
    state.isInLoginPage.set true
  onEvent logout, 'click', ->
    setStyle cover, visibility: 'visible', opacity: 0.5
    service.logout().then ->
      setStyle cover, visibility: 'hidden', opacity: 0
      state.user.set null
    .done()

  state.all allowNull: true, ['user', 'isInLoginPage'], ([user, isInLoginPage]) ->
    if user
      hide login
      show username
      show logout
      setStyle username, text: user.name
    else
      hide username
      hide logout
      if isInLoginPage
        hide login
      else
        show login

  return menu