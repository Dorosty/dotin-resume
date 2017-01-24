exports.shade =
  position: 'absolute'
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
  backgroundColor: 'red'
  position: 'absolute'
  top: 100
  left: '50%'
  marginLeft: -300
  width: 600
  height: 400
  transition: '0.5s'
  opacity: 0
  visibility: 'hidden'

exports.alertActive =
  opacity: 1
  visibility: 'visible'
