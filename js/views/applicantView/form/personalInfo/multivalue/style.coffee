{extend} = require '../../../../../utils'

exports.view =
  position: 'relative'
  transition: '0.2s'
  height: 30
  paddingTop: 7

exports.item =
  width: '57%'
  float: 'left'
  position: 'relative'
  height: 30

exports.itemText = {}

exports.input =
  position: 'absolute'
  width: '80%'
  bottom: 0

icon =
  cursor: 'pointer'
  width: 20
  height: 20
  fontSize: 20

exports.add = extend {}, icon,
  class: 'fa fa-plus-circle'
  color: '#449e73'
  position: 'absolute'
  top: null
  bottom: 5
  left: 0

exports.remove = extend {}, icon,
  class: 'fa fa-minus-circle'
  color: '#d71d24'
  position: 'absolute'
  top: 0
  left: 0