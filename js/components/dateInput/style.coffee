exports.view =
  position: 'relative'

exports.input =
  placeholder: '----/--/--'
  direction: 'ltr'

exports.calendarIcon =
  class: 'fa fa-calendar'
  position: 'absolute'
  top: 8
  left: 8
  cursor: 'pointer'
  color: 'gray'

exports.calendarPlaceholder =
  position: 'absolute'
  top: 30 + 10
  left: 160
  zIndex: 1000
  backgroundColor: '#eee'
  transition: '0.2s'
  opacity: 0
  visibility: 'hidden'

exports.calendarPlaceholderVisible =
  opacity: 1
  visibility: 'visible'

exports.calendarArrow =
  position: 'absolute'
  width: 0
  height: 0
  borderStyle: 'solid'
  borderColor: 'transparent'
  top: -10
  right: (286 - 10) / 2
  borderWidth: '0 10px 10px'
  borderBottomColor: '#eee'
