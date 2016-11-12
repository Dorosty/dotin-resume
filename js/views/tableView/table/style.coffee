{extend} = require '../../../utils'

arrow =
  color: '#ddd'
  cursor: 'pointer'
  position: 'absolute'
  left: 5

exports.arrowUp = extend {}, arrow,
  class: 'fa fa-caret-up'
  top: 8

exports.arrowDown = extend {}, arrow,
  class: 'fa fa-caret-down'
  top: 17

exports.arrowActive =
  color: '#555'

exports.tbody =
  borderBottom: '1px solid #c1c1c1'  

exports.td =
  height: 30
  padding: 7
  color: '#5c5555'

exports.th = extend {}, exports.td,
  position: 'relative'
  paddingLeft: 15
  transition: '0.2s'

exports.thHover =
  backgroundColor: '#ececec'

exports.thOut =
  backgroundColor: 'white'

row =
  transition: '0.2s'
  backgroundColor: 'white'

exports.headerRow =
  borderBottom: '2px solid #c1c1c1'

exports.row = extend {}, row

exports.rowOdd = extend {}, row,
  backgroundColor: '#f6f6f6'

exports.rowHover =
  backgroundColor: '#e7e7e7'

exports.rowSelected =
  backgroundColor: '#d3e4dc'

exports.checkbox =
  class: 'fa fa-check'
  margin: 4
  width: 15
  height: 15
  borderRadius: 2
  transition: '0.2s'
  backgroundColor: '#ddd'
  color: '#ddd'

exports.checkboxSelected =
  backgroundColor: '#449e73'
  color: 'white'