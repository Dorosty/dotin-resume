{extend} = require '../../../../utils'

exports.header =
  color: '#449e73'
  fontSize: 18
  marginBottom: 10

exports.clearfix =
  clear: 'both'

exports.column =
  float: 'right'
  width: '33%'

exports.group =
  margin: '7px 0'

exports.label =
  fontSize: 12
  lineHeight: 30
  fontWeight: 'bold'
  float: 'right'
  width: '35%'
  margin: '0 2%'
  textAlign: 'left'
  transition: '0.2s'
  color: '#5c5555'

exports.input =
  fontSize: 12
  height: 30
  lineHeight: 30
  borderRadius: 2
  padding: '0 5px'
  outline: 'none'
  width: '57%'
  transition: '0.2s'
  border: '1px solid #ccc'
  color: '#5c5555'

exports.dropdownPlaceholder =
  float: 'right'
  width: '57%'

exports.dateInputPlaceholder =
  float: 'right'
  width: '40%'

exports.specialInput = extend {}, exports.input,
  width: '100%'
  paddingLeft: 30

exports.numberInput = extend {}, exports.input,
  width: '15%'
  direction: 'ltr'

exports.valid =
  color: '#5c5555'
  borderColor: '#ccc'

exports.invalid =
  color: '#c00'
  borderColor: '#c00'