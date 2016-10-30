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
    setStyle profileImg, marginRight: -(profileImg.fn.element.offsetWidth - 200) / 2

  state.user.on (user) ->
    setStyle profileImg, src: user.picture
    setStyle name, text: user.name
    setStyle position, text: switch user.type
      when 'hr'
        'کارشناس واحد منابع انسانی'
      when 'manager'
        user.position

  view