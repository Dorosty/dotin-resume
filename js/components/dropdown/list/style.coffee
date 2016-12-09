exports.list =
  cursor: 'pointer'
  position: 'absolute'
  backgroundColor: 'white'
  zIndex: 1000
  top: 30
  left: 0
  right: 0
  border: '1px solid #CCC'
  borderTop: 'none'
  borderRadius: '0 0 5px 5px'
  transition: '0.1s'
  opacity: 0
  visibility: 'hidden'

exports.visibleList =
  opacity: 1
  visibility: 'visible'

exports.item =
  fontSize: 12
  height: 30
  lineHeight: 30
  padding: '0 5px'
  backgroundColor: 'transparent'

exports.highlightedItem =
  backgroundColor: '#ddd'