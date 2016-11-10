{extend} = require '../../../utils'

exports.searchbox =
  placeholder: 'جستجوی رزومه مورد نظر شما'
  border: '1px solid #bdd1e5'
  outline: 'none'
  width: 400
  borderRadius: 3
  padding: 7
  paddingLeft: 50
  height: 30
  lineHeight: 30
  float: 'right'
  transition: '0.2s'
  backgroundColor: '#ecedee'
  color: 'black'

exports.searchboxFocus =
  backgroundColor: '#c1c1c1'
  color: '#555'

exports.settings =
  class: 'fa fa-cog'
  display: 'inline-block'
  width: 28
  height: 28
  fontSize: 20
  lineHeight: 20
  padding: '4px 5px'
  marginRight: -29
  marginTop: 1
  borderRadius: '3px 0 0 3px'
  color: '#555'
  float: 'right'
  cursor: 'pointer'
  transition: '0.2s'
  backgroundColor: '#ddd'

exports.settingsActive =
  backgroundColor: '#c1c1c1'

exports.divider =
  clear: 'both'
  height: 20

exports.panel =
  marginBottom: 20
  width: '100%'
  backgroundColor: '#f6f6f6'
  border: '1px solid #ccc'
  color: '#555'
  position: 'relative'
  transition: '0.2s'
  opacity: 0
  height: 0

exports.panelActive =
  opacity: 1
  height: 200

exports.arrow =
  position: 'absolute'
  width: 0
  height: 0
  borderStyle: 'solid'
  borderColor: 'transparent'
  right: 375
  top: -13
  borderWidth: '0 13px 13px'
  borderBottomColor: '#f6f6f6'
  transition: '0.2s'
  opacity: 0

exports.arrowBorder = extend {}, exports.arrow,
  right: 374
  top: -14
  borderWidth: '0 14px 14px'
  borderBottomColor: '#ccc'

exports.arrowActive =
  opacity: 1