exports.view =
  position: 'absolute'
  width: '100%'
  transition: '0.3s'
  opacity: 0
  visibility: 'hidden'

exports.questionBox =
  border: '1px solid #ebebeb'
  borderRadius: 5
  padding: 25
  position: 'absolute'
  width: '100%'
  transition: '0.3s'

exports.question =
  fontSize: 14
  fontWeight: 'bold'

exports.answers =
  fontSize: 14
  color: '#545454'
  padding: '30px 15px 10px'

exports.answer =
  float: 'right'
  width: '50%'

exports.answerRadio =
  type: 'radio'
  display: 'inline-block'
  marginLeft: 10
  verticalAlign: 'top'

exports.answerLabel =
  display: 'inline-block'
  fontWeight: 'normal'
  maxWidth: '90%'

exports.nextButton =
  width: 150
  height: 50
  borderRadius: 5
  color: 'white'
  textAlign: 'center'
  lineHeight: 50
  margin: '160px auto 20px'
  cursor: 'pointer'
  backgroundColor: '#449e73'
  transition: '0.2s'
  opacity: 1

exports.nextButtonHover =
  opacity: 0.8

exports.nextButtonDisabled =
  backgroundColor: 'gray'
  cursor: 'not-allowed'

exports.progressbar =
  position: 'relative'
  height: 70

exports.progressbarEmpty =
  position: 'absolute'
  top: 30
  height: 10
  backgroundColor: 'gray'
  left: 0
  borderRadius: '5px 0 0 5px'
  transition: '0.1s'

exports.progressbarFull =
  position: 'absolute'
  top: 30
  height: 10
  backgroundColor: '#449e73'
  right: 0
  borderRadius: '0 5px 5px 0'
  transition: '0.1s'

exports.progressbarCirlcePlaceholder =
  position: 'absolute'
  top: 35
  width: 0
  height: 0
  transition: '0.1s'

exports.progressbarCirlce =
  position: 'absolute'
  width: 40
  height: 40
  top: -20
  left: -20
  lineHeight: 40
  textAlign: 'center'
  borderRadius: 20
  backgroundColor: '#449e73'
  color: 'white'
