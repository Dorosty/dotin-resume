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

exports.td =
  height: 30
  padding: 7
  color: '#5c5555'

exports.th = extend {}, exports.td,
  position: 'relative'
  paddingLeft: 15

row = 
  borderBottom: '1px solid #c1c1c1'

exports.headerRow =
  borderBottom: '3px solid #c1c1c1'

exports.row = extend {}, row

exports.rowOdd = extend {}, row,
  backgroundColor: '#f6f6f6'

exports.checkbox =
  class: 'fa fa-check'
  position: 'relative'
  top: 3
  margin: 4
  width: 15
  height: 15
  borderRadius: 2
  backgroundColor: '#ddd'
  color: '#ddd'

exports.checkboxSelected =
  color: '#555'