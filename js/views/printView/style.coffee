{extend} = require '../../utils'

exports.view =
  fontFamily: 'B Nazanin,Bold'
  width: 1201
  lineHeight: 50
  margin: '100px auto'

box =
  display: 'inline-block'
  borderLeft: '1px solid black'
  borderBottom: '1px solid black'
  padding: '0 20px'

exports.boxContainer =
  borderTop: '1px solid black'
  borderRight: '1px solid black'

exports.box = extend {}, box,
  width: 1200

exports.box2 = extend {}, box,
  width: 600

exports.box3 = extend {}, box,
  width: 400

exports.box23 = extend {}, box,
  width: 800

exports.darkBox = extend {}, exports.box,
  backgroundColor: '#ddd'
  textAlign: 'center'
  fontWeight: 'bold'

exports.boxMarginRight =
  display: 'inline-block'
  marginRight: 80

exports.bold =
  display: 'inline-block'
  fontWeight: 'bold'

exports.boldUnderline =
  display: 'inline-block'
  fontWeight: 'bold'
  lineHeight: 15
  borderBottom: '1px solid black'

exports.table =
  width: 1201

exports.td =
  padding: '0 20px'
  border: '1px solid black'

exports.th = extend {}, exports.td,
  backgroundColor: '#ddd'

exports.tableFooter =
  padding: '0 20px'
  border: '1px solid black'
  borderTop: 'none'