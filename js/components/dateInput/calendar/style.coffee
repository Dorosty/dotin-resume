{extend} = require '../../../utils'

exports.cell =
  width: 30
  height: 30
  lineHeight: 30
  margin: 10
  borderRadius: 100
  textAlign: 'center'
  display: 'inline-block'
  border: '1px solid transparent'
  marginLeft: -1
  marginBottom: -1
  backgroundColor: '#eee'
  color: '#555'
  cursor: 'pointer'
  fontSize: 13

exports.dayCell = extend {}, exports.cell,
  cursor: 'default'
  fontSize: 16
  fontWeight: 'bold'

exports.grayCell = extend {}, exports.cell,
  color: '#ccc'

exports.todayCell = extend {}, exports.cell,
  backgroundColor: '#d71d24'
  color: 'white'

exports.calendar =
  position: 'absolute'
  borderRadius: 5
  backgroundColor: '#eee'
  fontSize: 20
  width: 7 * (exports.cell.width + exports.cell.margin) + 6
  height: 8 * (exports.cell.width + exports.cell.margin) + 17
  border: '1px solid transparent'
  cursor: 'default'

chevron =
  position: 'absolute'
  cursor: 'pointer'
  top: 10
  color: '#449e73'
  height: 30
  lineHeight: 30
  fontSize: 25
  fontWeight: 'bold'

exports.nextYear = extend {}, chevron,
  left: 30
  textAlign: 'left'

exports.nextMonth = extend {}, chevron,
  left: 60
  textAlign: 'left'

exports.headerText =
  marginTop: 10
  width: '100%'
  height: 30
  lineHeight: 30
  fontSize: 16
  fontWeight: 'bold'
  textAlign: 'center'
  color: '#555'

exports.prevMonth = extend {}, chevron,
  right: 60
  textAlign: 'right'

exports.prevYear = extend {}, chevron,
  right: 30
  textAlign: 'right'
