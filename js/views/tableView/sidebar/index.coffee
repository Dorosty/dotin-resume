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
    setStyle view, height: document.body.scrollHeight
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
    setStyle profileImg, src: user.picture
    setStyle name, text: user.name
    setStyle position, text: switch user.type
      when 'hr'
        'کارشناس واحد منابع انسانی'
      when 'manager'
        user.position

  view