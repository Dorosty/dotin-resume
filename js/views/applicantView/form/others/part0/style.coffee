{extend} = require '../../../../../utils'

exports.clearfix =
  clear: 'both'

exports.valid =
  color: '#5c5555'
  borderColor: '#ccc'

exports.invalid =
  color: '#c00'
  borderColor: '#c00'

exports.column =
  float: 'right'
  width: '50%'

exports.label =
  fontSize: 12
  lineHeight: 30
  fontWeight: 'bold'
  marginTop: 10
  transition: '0.2s'
  color: '#5c5555'

exports.inlineLabel = extend {}, exports.label,
  display: 'inline-block'
  margin: 0
  marginRight: 5

exports.optional =
  display: 'inline-block'
  marginRight: 5
  fontSize: 12
  color: '#ccc'
  height: 30
  lineHeight: 30

exports.underline =
  display: 'inline'
  textDecoration: 'underline'

exports.input =
  fontSize: 12
  height: 30
  lineHeight: 30
  borderRadius: 2
  padding: '0 5px'
  outline: 'none'
  width: 180
  transition: '0.2s'
  border: '1px solid #ccc'
  color: '#5c5555'

exports.dropdown = extend {}, exports.input,
  paddingLeft: 30

exports.dropdownPlaceholder =
  display: 'inline-block'
  width: 180

exports.dateInput = extend {}, exports.input,
  width: 100
  paddingLeft: 30

exports.dateInputPlaceholder =
  display: 'inline-block'
  width: 100

exports.descriptionInput = extend {}, exports.input,
  width: 250
  marginRight: 10