exports.shade =
  position: 'fixed'
  top: 0
  left: 0
  right: 0
  bottom: 0
  backgroundColor: 'black'
  transition: '0.5s'
  opacity: 0
  visibility: 'hidden'

exports.shadeActive =
  opacity: 0.2
  visibility: 'visible'

exports.alert =
  position: 'fixed'
  top: 100
  left: '50%'
  marginLeft: -300
  width: 700
  borderRadius: 5
  transition: '0.5s'
  opacity: 0
  visibility: 'hidden'

exports.alertActive =
  opacity: 1
  visibility: 'visible'

exports.header =
  position: 'absolute'
  top: 0
  left: 0
  right: 0
  height: 55
  lineHeight: 55
  paddingRight: 20
  color: 'white'
  backgroundColor: '#459d73'
  borderRadius: '5px 5px 0 0'

exports.close =
  position: 'absolute'
  top: 20
  left: 20
  width: 15
  height: 15
  lineHeight: 15
  fontSize: 15
  class: 'fa fa-times'
  cursor: 'pointer'

exports.contents =
  marginTop: 55
  backgroundColor: 'white'
  borderRadius: '0 0 5px 5px'