{extend} = require '../../../../utils'

exports.clearfix =
  clear: 'both'

exports.view =
  paddingLeft: 25

exports.inputRow =
  margin: '15px 0'
  position: 'relative'

exports.inputColumn0 =
  float: 'right'
  width: '54%'
  marginLeft: '1%'

exports.inputColumn1 =
  float: 'right'
  width: '45%'

exports.label0 =
  fontSize: 12
  lineHeight: 30
  display: 'inline-block'
  fontWeight: 'bold'
  textAlign: 'center'
  width: '4%'
  transition: '0.2s'
  color: '#5c5555'

exports.label1 =
  fontSize: 12
  lineHeight: 30
  display: 'inline-block'
  fontWeight: 'bold'
  textAlign: 'center'
  width: '30%'
  transition: '0.2s'
  color: '#5c5555'

exports.input =
  fontSize: 12
  height: 30
  lineHeight: 30
  borderRadius: 2
  padding: '0 5px'
  outline: 'none'
  transition: '0.2s'
  border: '1px solid #ccc'
  color: '#5c5555'
  width: '15.8%'
  marginLeft: '1%'

exports.inputPlaceholder =
  display: 'inline-block'
  width: '30%'

exports.dropdown = extend {}, exports.input,
  width: '100%'
  marginLeft: 0

exports.dateInput = extend {}, exports.dropdown,
  paddingLeft: 30
  direction: 'rtl'

exports.textarea =
  fontSize: 12
  borderRadius: 2
  padding: 15
  outline: 'none'
  transition: '0.2s'
  border: '1px solid #ccc'
  color: '#5c5555'
  minWidth: '100%'
  maxWidth: '100%'
  marginTop: 15
  minHeight: 75
  maxHeight: 75

exports.add =
  class: 'fa fa-plus-circle'
  color: '#449e73'
  cursor: 'pointer'
  width: 20
  height: 20
  fontSize: 20
  position: 'absolute'
  top: 5
  left: -25

exports.jobItemsPlaceholder = {}

exports.job =
  position: 'relative'
  marginTop: 30
  paddingBottom: 15
  borderBottom: '1px solid #ccc'

exports.remove =
  class: 'fa fa-minus-circle'
  color: '#d71d24'
  cursor: 'pointer'
  width: 20
  height: 20
  fontSize: 20
  position: 'absolute'
  top: 0
  left: -25

exports.jobDate =
  position: 'absolute'
  top: 0
  left: 5

exports.jobRow =
  margin: '20px 25px 0 20px'

exports['نام'] =
  display: 'inline-block'
  marginRight: -15
  fontSize: 16
  fontWeight: 'bold'

exports['نوع فعالیت'] =
  display: 'inline-block'
  marginRight: 10
  color: '#aaa'

exports['نام مدیر عامل'] =
  display: 'inline-block'
  marginRight: 30

exports['محدوده نشانی'] =
  display: 'inline-block'

exports.mapIcon =
  class: 'fa fa-map-marker'
  marginLeft: 10

exports['تلفن'] =
  display: 'inline-block'
  marginRight: 50

exports.phoneIcon =
  class: 'fa fa-phone'
  marginLeft: 10

exports.jobColumn =
  float: 'right'
  width: '20%'

exports.jobColumnHeader =
  fontSize: 14
  fontWeight: 'bold'
  marginBottom: 10