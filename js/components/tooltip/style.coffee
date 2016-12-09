exports.tooltip =
  position: 'absolute'
  textAlign: 'center'
  backgroundColor: '#c00'
  color: 'white'
  width: 150
  fontSize: 10
  height: 30
  lineHeight: 30
  borderRadius: 3
  transition: '0.2s'
  opacity: 0
  visibility: 'hidden'

exports.tooltipActive =
  opacity: 1
  visibility: 'visible'

exports.arrow =
  position: 'absolute'
  width: 0
  height: 0
  borderStyle: 'solid'
  borderColor: 'transparent'
  bottom: -7
  right: (150 - 7) / 2
  borderWidth: '7px 7px 0'
  borderTopColor: '#c00'