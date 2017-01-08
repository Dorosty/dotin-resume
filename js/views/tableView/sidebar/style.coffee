{extend} = require '../../../utils'

exports.sidebar =
  backgroundColor: '#2b2e33'
  position: 'absolute'
  top: 0
  right: 0
  width: 200

exports.profile =
  overflow: 'hidden'
  borderRadius: 100
  width: 150
  height: 150
  marginTop: 20
  marginRight: 20
  border: '5px solid #1c1e21'
  position: 'relative'

exports.profileImg =
  position: 'absolute'

exports.name =
  fontSize: 14
  textAlign: 'center'
  color: 'white'
  marginTop: 30

exports.title =
  fontSize: 14
  textAlign: 'center'
  color: '#505d63'
  marginTop: 10

exports.icon =
  color: 'white'
  float: 'right'
  cursor: 'pointer'
  margin: 10
  padding: 10
  fontSize: 20
  borderRadius: 100
  transition: '0.2s'
  backgroundColor: '#2b2e33'
  position: 'relative'

exports.iconActive =
  backgroundColor: 'black'

exports.badge =
  position: 'absolute'
  top: 5
  left: 5
  width: 15
  height: 15
  fontSize: 10
  lineHeight: 15
  borderRadius: 100
  textAlign: 'center'
  transition: '0.2s'
  backgroundColor: 'transparent'

exports.badgeActive =
  backgroundColor: 'red'

exports.divider =
  marginTop: 100
  height: 2
  backgroundColor: '#1c1e21'

exports.links =
  marginTop: 20

exports.link =
  cursor: 'pointer'
  height: 65
  lineHeight: 65
  color: 'white'
  paddingRight: 10
  transition: '0.2s'
  borderLeft: '0px solid #449e73'
  backgroundColor: '#2b2e33'

exports.linkIcon =
  fontSize: 20
  margin: '0 10px'
  position: 'relative'
  top: 3
  
exports.linkHover =
  borderLeftWidth: 10

exports.linkActive =
  backgroundColor: '#449e73'

exports.notifications =
  position: 'absolute'
  top: 0
  bottom: 0
  right: 200
  zIndex: 1000
  backgroundColor: 'white'
  boxShadow: '-10px 0px 15px 0px #aaa'
  overflowX: 'hidden'
  transition: '0.2s'
  opacity: 0
  width: 0

exports.notificationsActive =
  opacity: 1
  width: 350

exports.notificationsHeader =
  height: 30
  backgroundColor: '#ddd'
  textAlign: 'left'

exports.clearAllNotifications =
  backgroundColor: 'red'
  color: 'white'
  fontSize: 10
  padding: 3
  margin: 5
  borderRadius: 3
  display: 'inline-block'
  cursor: 'pointer'

exports.notification =
  height: 80
  position: 'relative'
  cursor: 'pointer'
  borderBottom: '1px solid #eee'
  transition: '0.2s'
  backgroundColor: 'white'

exports.notificationNotModifiable =
  opacity: 0.5

exports.notificationHover =
  backgroundColor: '#eee'

exports.notificationPersonalPic =
  position: 'absolute'
  top: 10
  right: 10
  width: 30
  height: 30
  borderRadius: 100

exports.notificationUserName =
  position: 'absolute'
  top: 10
  right: 50

exports.notificationAction =
  position: 'absolute'
  top: 45
  right: 50

exports.notificationTime =
  position: 'absolute'
  top: 10
  left: 10
  fontSize: 10
  direction: 'ltr'

exports.notificationResume =
  position: 'absolute'
  top: 45
  left: 10
  fontSize: 10
  color: '#449e73'

exports.notificationIcon =
  class: 'fa fa-user'
  marginLeft: 5