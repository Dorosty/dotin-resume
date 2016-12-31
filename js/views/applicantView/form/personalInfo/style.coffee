{extend} = require '../../../../utils'

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

exports.optional =
  display: 'inline-block'
  marginRight: 5
  fontSize: 12
  color: '#ccc'
  height: 30
  lineHeight: 30

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

exports.bigLabel =
  fontSize: 12
  lineHeight: 30
  fontWeight: 'bold'
  transition: '0.2s'
  color: '#5c5555'

exports.address = extend {}, exports.input,
  width: '60%'
  margin: '5px 0 5px 1%'

exports.phoneNumber = extend {}, exports.input,
  width: '20%'