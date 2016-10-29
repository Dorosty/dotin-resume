component = require '../../../utils/component'
style = require './style'

module.exports = component 'sidebar', ({dom, events}) ->
  {E, setStyle} = dom
  {onEvent, onResize} = events
  
  view = E style.sidebar,
    E style.profile,
      profileImg = E 'img', src: 'assets/img/profile.jpg'
    E style.name, 'نام و نام خانوادگی'
    E style.title, 'سمت اداری'
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

  view