component = require '../../../utils/component'
style = require './style'

module.exports = component 'sidebar', ({dom, state, events, service}) ->
  {E, setStyle} = dom
  {onEvent, onResize} = events
  
  view = E style.sidebar,
    E style.profile,
      profileImg = E 'img', style.profileImg
    name = E style.name
    position = E style.title
    logout = E style.logout
    E style.settings
    E style.notifications
    E style.divider
    E style.links
      E style.linkActive, 'رزومه‌ها'
      E style.link, 'تقویم'
      E style.link, 'فرصت‌های شغلی'
      E style.link, 'بایگانی'

  resize = ->
    body = document.body
    html = document.documentElement
    height = Math.max body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight
    setStyle view, {height}
  onResize resize
  setTimeout resize

  onEvent profileImg, 'load', ->
    {width, height} = profileImg.fn.element
    right = top = 0
    isPortriat = height > width
    if isPortriat
      height *= 150 / width
      width = 150
      top = -(height - 150) / 2
    else
      width *= 150 / height
      height = 150
      right = -(width - 150) / 2
    top -= 5
    right -= 5
    setStyle profileImg, {width, height, top, right}

  onEvent logout, 'click', ->
    service.logout()

  state.user.on (user) ->
    setStyle profileImg, src: if user.personalPic then '/webApi/image?address=' + user.personalPic else 'assets/img/default-avatar.png'
    setStyle name, text: user.name
    setStyle position, text: switch user.type
      when 1
        user.position
      when 2
        'کارشناس واحد منابع انسانی'

  view