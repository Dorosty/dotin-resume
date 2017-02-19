{extend} = require '../../../utils'

exports.loadbar =
  width: '100%'
  height: 10

exports.indexLink =
  color: '#449e73'
  cursor: 'pointer'

exports.profileBreadCrumb = {}

exports.action =
  position: 'absolute'
  top: 0
  left: 0

exports.actionLegendButton =
  position: 'absolute'
  top: 7
  left: 217
  width: 20
  height: 20
  borderRadius: 100
  backgroundColor: '#c5c5c5'
  cursor: 'pointer'
  class: 'fa fa-info'
  color: 'white'
  textAlign: 'center'
  lineHeight: 20

exports.actionLegend =
  boxShadow: '0px 0px 15px 0px #aaa'
  position: 'absolute'
  left: 250
  width: 150
  height: 100
  backgroundColor: '#c5c5c5'
  borderRadius: 3
  transition: '0.2s'
  opacity: 0
  visibility: 'hidden'

exports.actionLegendVisible =
  opacity: 1
  visibility: 'visible'

exports.actionLegendArrow =
  position: 'absolute'
  width: 0
  height: 0
  borderStyle: 'solid'
  borderColor: 'transparent'
  left: -7
  top: 10
  borderWidth: '7px 7px 7px 0'
  borderRightColor: '#c5c5c5'

exports.actionLegendRow =
  paddingTop: 13
  paddingRight: 58
  height: 30
  position: 'relative'

exports.actionLegendCircle =
  position: 'absolute'
  top: 15
  right: 15
  width: 15
  height: 15
  borderRadius: 100
  border: '1px solid white'

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
  backgroundColor: '#ccc'
  position: 'relative'

exports.statusCircleActive = extend {}, exports.statusCircle,
  backgroundColor: '#449e73'

exports.statusCirclePlus = extend {}, exports.statusCircle,
  backgroundColor: 'white'
  border: '4px solid #449e73'

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

exports.statusIconPlus = extend {}, exports.statusIcon,
  class: 'fa fa-plus'
  color: '#ccc'

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

exports.statusTextActive = extend {}, exports.statusText,
  color: '#449e73'

exports.statusConnector =
  display: 'inline-block'
  position: 'relative'
  top: -13
  width: 100
  height: 4
  backgroundColor: '#ccc'

exports.statusConnectorActive = extend {}, exports.statusConnector,
  backgroundColor: '#449e73'

exports.tabs =
  borderBottom: '1px solid #ccc'

exports.tab =
  display: 'inline-block'
  cursor: 'pointer'
  marginLeft: 20
  padding: '5px 20px'
  transition: '0.2s'
  color: '#5c5555'
  borderBottom: '3px solid white'

exports.tabUser = extend {}, exports.tab,
  backgroundColor: '#eee'
  borderBottom: '3px solid #eee'

exports.tabActive =
  color: '#449e73'
  borderColor: '#449e73'

exports.contents =
  marginTop: 30