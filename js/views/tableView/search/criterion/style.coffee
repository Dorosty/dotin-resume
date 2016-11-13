{extend} = require '../../../../utils'

exports.inputPlaceholder =
  display: 'inline-block'
  width: 200

exports.input =
  width: 200
  border: '1px solid #ddd'
  outline: 'none'
  borderRadius: 3
  padding: 7
  paddingLeft: 30
  height: 30
  lineHeight: 30

exports.placeholderInput = extend {}, exports.input,
  width: '100%'

exports.rest =
  display: 'inline-block'
  marginRight: 10

exports.remove =
  class: 'fa fa-minus-circle'
  color: '#d71d24'
  cursor: 'pointer'
  width: 20
  height: 20
  fontSize: 20
  marginRight: 10
  position: 'relative'
  top: 5