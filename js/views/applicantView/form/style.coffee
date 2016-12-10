exports.cover =
  position: 'absolute'
  top: 0
  left: 0
  right: 0
  backgroundColor: 'white'
  zIndex: 100000
  transition: '0.2s'
  opacity: 0
  visibility: 'hidden'

exports.coverVisible =
  opacity: 0.9
  visibility: 'visible'

exports.header =
  color: '#449e73'
  fontSize: 18
  marginTop: 50
  marginBottom: 20
  height: 25
  lineHeight: 25

exports.optional =
  display: 'inline-block'
  marginRight: 5
  fontSize: 12
  color: '#ccc'
  height: 25
  lineHeight: 25

exports.checkboxWrapper =
  margin: '50px 0 0'

exports.submit =
  fontSize: 12
  borderRadius: 5
  color: 'white'
  margin: '10px 0'
  display: 'inline-block'
  float: 'left'
  padding: '5px 15px'
  cursor: 'pointer'
  transition: '0.2s'
  backgroundColor: '#449e73'

exports.submitDisabled =
  cursor: 'default'
  backgroundColor: 'gray'