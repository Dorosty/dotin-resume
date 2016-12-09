{extend} = require '../../../../../utils'

exports.view =
  position: 'relative'
  transition: '0.2s'
  height: 30
  paddingTop: 7

exports.item =
  width: 174
  float: 'left'
  position: 'relative'
  height: 30

exports.itemText =
  overflow: 'hidden'
  position: 'absolute'
  width: '100%'
  left: 26

exports.input =
  position: 'absolute'
  left: 26
  width: 174
  bottom: 0

icon =
  cursor: 'pointer'
  width: 20
  height: 20
  fontSize: 20
  position: 'absolute'
  left: 0

exports.add = extend {}, icon,
  class: 'fa fa-plus-circle'
  color: '#449e73'
  bottom: 5

exports.remove = extend {}, icon,
  class: 'fa fa-minus-circle'
  color: '#d71d24'
  top: 0