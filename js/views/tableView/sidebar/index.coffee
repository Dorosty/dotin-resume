component = require '../../../utils/component'
style = require './style'

module.exports = component 'sidebar', ({dom, state, events}) ->
  {E, setStyle} = dom
  {onEvent, onResize} = events
  
  view = E style.sidebar,
    E style.profile,
      profileImg = E 'img'
    name = E style.name
    position = E style.title
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
    marginRight = marginTop = 0
    isPortriat = height > width
    if isPortriat
      height *= 150 / width
      width = 150
      marginTop = -(height - 150) / 2
    else
      width *= 150 / height
      height = 150
      marginRight = -(width - 150) / 2
    setStyle profileImg, {width, height, marginTop, marginRight}

  state.user.on (user) ->
    setStyle profileImg, src: '/webApi/image?address=' + user.personalPic
    setStyle name, text: user.name
    setStyle position, text: switch user.type
      when 1
        user.position
      when 2
        'کارشناس واحد منابع انسانی'

  view