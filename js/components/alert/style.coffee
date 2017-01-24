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
  overflow: 'hidden'
  position: 'fixed'
  top: 100
  left: '50%'
  marginLeft: -300
  width: 600
  height: 400
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
  height: 70
  lineHeight: 70
  color: 'white'
  backgroundColor: '#459d73'

exports.contents =
  position: 'absolute'
  top: 70
  left: 0
  right: 0
  bottom: 0
  backgroundColor: 'white'