{extend} = require '../../../../utils'

exports.clearfix =
  clear: 'both'
  
exports.valid =
  color: '#5c5555'
  borderColor: '#ccc'

exports.invalid =
  color: '#c00'
  borderColor: '#c00'


exports.th =
  padding: '10px 10px 0'
  color: '#5c5555'
  fontSize: 12

exports.td =
  padding: 10
  color: '#5c5555'
  fontSize: 12

exports.input =
  fontSize: 12
  height: 30
  lineHeight: 30
  borderRadius: 2
  padding: '0 5px'
  outline: 'none'
  transition: '0.2s'
  border: '1px solid #ccc'
  color: '#5c5555'

icon =
  cursor: 'pointer'
  width: 20
  height: 20
  fontSize: 20
  position: 'relative'
  top: 2

exports.add = extend {}, icon,
  class: 'fa fa-plus-circle'
  color: '#449e73'

exports.remove = extend {}, icon,
  class: 'fa fa-minus-circle'
  color: '#d71d24'

exports.column = 
  float: 'right'
  width: '46%'
  padding: '2% 10px 0 10px'

exports.label =
  color: '#5c5555'
  fontWeight: 'bold'
  margin: '5px 0'
  fontSize: 12

exports.textarea =
  minWidth: '100%'
  maxWidth: '100%'
  minHeight: 100
  maxHeight: 100
  fontSize: 12
  borderRadius: 2
  padding: '5px'
  outline: 'none'
  transition: '0.2s'
  border: '1px solid #ccc'
  color: '#5c5555'