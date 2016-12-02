{extend} = require '../../utils'

exports.option =
  float: 'right'
  border: '1px solid #ddd'
  color: '#777'
  cursor: 'pointer'
  padding: '0 10px'
  marginLeft: -1
  height: 30
  lineHeight: 28
  transition: '0.2s'
  backgroundColor: 'white'

exports.leftOption = extend {}, exports.option,
  borderRadius: '3px 0 0 3px'

exports.rightOption = extend {}, exports.option,
  borderRadius: '0 3px 3px 0'

exports.optionActive =
  backgroundColor: '#ddd'