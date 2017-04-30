{extend} = require '../../utils'

exports.view =
  width: 1000
  margin: '0 auto'

exports.logout =
  float: 'left'
  position: 'relative'
  left: 20
  cursor: 'pointer'
  color: '#5c5555'

exports.logoutIcon =
  class: 'fa fa-power-off'
  position: 'absolute'
  top: 4
  left: -20

exports.status =
  marginTop: 20
  height: 100

exports.statusSegment =
  cursor: 'pointer'
  position: 'relative'
  display: 'inline-block'
  width: 30

exports.statusCircle =
  width: 30
  height: 30
  borderRadius: 100
  position: 'relative'
  backgroundColor: '#449e73'

exports.statusIcon =
  position: 'absolute'
  color: 'white'
  top: 7
  left: 7
  fontSize: 16
  width: 16
  height: 16
  lineHeight: 16
  textAlign: 'center'

exports.statusText =
  position: 'absolute'
  display: 'inline-block'
  color: '#ccc'
  top: 30
  fontSize: 13
  marginTop: 2
  textAlign: 'center'
  whiteSpace: 'nowrap'
  overflow: 'hidden'
  color: '#449e73'

exports.statusConnector =
  display: 'inline-block'
  position: 'relative'
  top: -13
  width: 100
  height: 4
  backgroundColor: '#449e73'


exports.tabs =
  borderBottom: '1px solid #ccc'

exports.tab =
  display: 'inline-block'
  cursor: 'pointer'
  marginLeft: 20
  padding: 5
  transition: '0.2s'
  color: '#5c5555'
  borderBottom: '3px solid white'

exports.tabActive =
  color: '#449e73'
  borderColor: '#449e73'

exports.contents =
  marginTop: 30