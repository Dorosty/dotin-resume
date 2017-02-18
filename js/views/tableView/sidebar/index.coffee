component = require '../../../utils/component'
style = require './style'
{extend, toDate, toTime} = require '../../../utils'
{statuses, actionModifiable} = require '../../../utils/logic'
{window} = require '../../../utils/dom'

module.exports = component 'sidebar', ({dom, state, events, service}, {gotoIndex, gotoApplicant}) ->
  {E, text, setStyle, empty, append} = dom
  {onEvent, onResize} = events
  
  view = E style.sidebar,
    notificationsPlaceholder = E style.notifications,
      E style.notificationsHeader,
        clearAllNotifications = E style.clearAllNotifications, 'پاک شدن همه'
      notificationsPanel = E()
    E style.profile,
      profileImg = E 'img', style.profileImg
    name = E style.name
    position = E style.title
    logout = E extend {class: 'fa fa-power-off'}, style.icon, marginRight: 30
    E extend {class: 'fa fa-sliders'}, style.icon
    notificationsIcon = E extend({class: 'fa fa-bell-o'}, style.icon),
      notificationsBadge = E style.badge
    E style.divider
    E style.links
      links = [
        E style.link,
          E extend {class: 'fa fa-file-text-o'}, style.linkIcon
          text 'رزومه‌ها'
        E style.link,
          E extend {class: 'fa fa-calendar'}, style.linkIcon
          text 'تقویم'
        E style.link,
          E extend {class: 'fa fa-database'}, style.linkIcon
          text 'فرصت‌های شغلی'
        E style.link,
          E extend {class: 'fa fa-folder'}, style.linkIcon
          text 'بایگانی'
      ]

  linkIndex = 0
  links.forEach (link, i) ->
    if linkIndex is i
      setStyle link, style.linkActive
    onEvent link, 'click', ->
      if i is 0
        gotoIndex()
      linkIndex = i
      setStyle links, style.link
      setStyle link, style.linkActive
    onEvent link, 'mouseover', ->
      unless linkIndex is i
        setStyle link, style.linkHover
    onEvent link, 'mouseout', ->
      unless linkIndex is i
        setStyle link, style.link

  resize = ->
    body = document.body
    html = document.documentElement
    height = Math.max body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight
    setStyle view, {height}
  onResize resize
  setTimeout resize
  onEvent E(window), 'scroll', resize

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

  notificationsActive = false
  
  state.all ['notifications', 'applicants'], ([notifications, applicants]) ->
    if notifications?.length
      setStyle notificationsBadge, style.badgeActive
      setStyle notificationsBadge, text: notifications.length
    else
      setStyle notificationsBadge, style.badge
      setStyle notificationsBadge, text: ''
    empty notificationsPanel
    append notificationsPanel, notifications.map (notification) ->
      [applicant] = applicants.filter ({userId}) -> notification.applicantId is userId
      notificationElement = E style.notification,
        E 'img', extend {src: if notification.userPersonalPic then '/webApi/image?address=' + notification.userPersonalPic else 'assets/img/default-avatar-small.png'}, style.notificationPersonalPic
        E style.notificationUserName, notification.userName
        E style.notificationAction, statuses[notification.status]
        E style.notificationTime, "#{toDate notification.time} #{toTime notification.time}"
        E 'a', extend({href: '/webApi/resume?address=' + applicant.resume}, style.notificationResume),
          E style.notificationIcon
          text applicant.firstName + ' ' + applicant.lastName
      onEvent notificationElement, 'mouseover', ->
        setStyle notificationElement, style.notificationHover
      onEvent notificationElement, 'mouseout', ->
        setStyle notificationElement, style.notification
      # unless actionModifiable notification.action
      #   setStyle notificationElement, style.notificationNotModifiable
      onEvent notificationElement, 'click', ->
        gotoApplicant applicant
        notificationsActive = false
        setStyle notificationsIcon, style.icon
        setStyle notificationsPlaceholder, style.notifications
      notificationElement

  onEvent notificationsIcon, 'click', ->
    notificationsActive = !notificationsActive
    if notificationsActive
      setStyle notificationsIcon, style.iconActive
      setStyle notificationsPlaceholder, style.notificationsActive
    else
      setStyle notificationsIcon, style.icon
      setStyle notificationsPlaceholder, style.notifications

  onEvent clearAllNotifications, 'click', ->
    state.notifications.set []
    service.clearAllNotifications()

  view