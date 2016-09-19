exports.bg =
  src: 'img/bg-1.jpg'
  zIndex: -1
  # Set rules to fill background
  minHeight: '100%'
  minWidth: 1024
    # Set up proportionate scaling
  width: '100%'
  height: 'auto'  
  # Set up positioning
  position: 'fixed'
  top: 0
  left: 0

exports.form =
  margin: '100px auto 0'
  width: 500
  backgroundColor: 'white'
  textAlign: 'center'
  paddingBottom: 100

exports.logo =
  width: 100
  marginTop: 100

exports.title =
  fontSize: 18
  color: '#1D7453'

exports.formInputs =
  marginTop: 50

exports.input =
  border: 0
  outline: 0
  width: 400
  padding: 4
  margin: '20px 0'
  borderBottom: '1px solid #ddd'
  transition: 'border-bottom .5s'

exports.inputFocus =
  borderBottom: '1px solid #6cc791'

exports.submit =
  backgroundColor: '#6cc791'
  color: 'white'
  padding: '7px 20px'
  borderRadius: 5
  marginTop: 50
  marginLeft: 20
  border: 0
  cursor: 'pointer'

exports.submitSection =
  textAlign: 'right'
  paddingRight: 50

exports.rememberLabel =
  fontSize: 11
  color: '#888'
  cursor: 'pointer'

exports.remember =
  width: 'auto'
  margin: '20px 5px'
  position: 'relative'
  top: 4

exports.spinner =
  color: '#999'

exports.invalid =
  color: 'red'