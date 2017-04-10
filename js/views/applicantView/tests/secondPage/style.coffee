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

exports.answerLabel =
  display: 'inline-block'
  fontWeight: 'normal'

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
