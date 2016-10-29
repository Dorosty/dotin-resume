{extend} = require '../../../utils'

exports.sidebar =
  backgroundColor: '#2b2e33'
  position: 'absolute'
  top: 0
  right: 0
  width: 300

exports.profile =
  overflow: 'hidden'
  borderRadius: 100
  width: 200
  height: 200
  marginTop: 45
  marginRight: 45
  border: '5px solid #1c1e21'

exports.name =
  fontSize: 16
  textAlign: 'center'
  color: 'white'
  marginTop: 30

exports.title =
  fontSize: 16
  textAlign: 'center'
  color: '#505d63'
  marginTop: 10

icon =
  color: 'white'
  float: 'right'
  cursor: 'pointer'
  margin: 20
  fontSize: 25

exports.settings = extend {}, icon,
  class: 'fa fa-sliders'
  marginRight: 110

exports.notifications = extend {}, icon,
  class: 'fa fa-bell-o'

exports.divider =
  marginTop: 80
  height: 2
  backgroundColor: '#1c1e21'

exports.links =
  marginTop: 20

exports.link =
  cursor: 'pointer'
  height: 80
  lineHeight: 80
  textAlign: 'center'
  color: 'white'

exports.linkActive = extend {}, exports.link,
  backgroundColor: '#449e73'