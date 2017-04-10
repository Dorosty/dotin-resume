component = require '../../../../utils/component'
style = require './style'
{extend} = require '../../../../utils'
{generateId} = require '../../../../utils/dom'

module.exports = component 'applicantTestsSecondPage', ({dom, events, returnObject}) ->
  {E, setStyle, hide} = dom
  {onEvent} = events

  questions = [{
    id: 0
    question: 'آیا شناختن شما'
    answers: [
      'اسان است، یا'
      'دشوار است؟'
    ]
  }, {
    id: 1
    question: 'chi?'
    answers: [
      '1'
      '2'
    ]
  }]

  answer1Id = generateId()
  answer2Id = generateId()

  nextEnabled = false
  typeNext = (enbaled) ->
    if enbaled
      setStyle nextButton, style.nextButton
    else
      setStyle nextButton, style.nextButtonDisabled
    nextEnabled = enbaled

  view = E style.view,
    questionElements = questions.map ({question, answers: [answer1, answer2]}) ->
      questionBox = E style.questionBox,
        E style.question, question
        E style.answers,
          E style.answer,
            answer1Input = E 'input', extend {name: 'answer', id: answer1Id}, style.answerRadio
            E 'label', extend {for: answer1Id, text: answer1}, style.answerLabel
          E style.answer,
            answer2Input = E 'input', extend {name: 'answer', id: answer2Id}, style.answerRadio
            E 'label', extend {for: answer2Id, text: answer2}, style.answerLabel
          E clear: 'both'
      onEvent [answer1Input, answer2Input], 'change', ->
        typeNext true
      questionBox
    nextButton = E style.nextButton,
      E 'span', marginLeft: 10, 'بعدی'
      E class: 'fa fa-arrow-left', position: 'relative', top: 2

  currentQuestionNumber = 0
  gotoQuestion = (number) ->
    currentQuestionNumber = number
    setStyle questionElements, opacity: 0, visibility: 'hidden'
    setStyle questionElements[number], opacity: 1, visibility: 'visible'
    typeNext false
    if number == questions.length - 1
      hide nextButton

  onEvent nextButton, 'mousemove', ->
    if nextEnabled
      setStyle nextButton, style.nextButtonHover
    else
      setStyle nextButton, style.nextButtonDisabled
  onEvent nextButton, 'mouseout', ->
    if nextEnabled
      setStyle nextButton, style.nextButton
    else
      setStyle nextButton, style.nextButtonDisabled

  onEvent nextButton, 'click', ->
    if nextEnabled
      gotoQuestion currentQuestionNumber + 1

  returnObject {gotoQuestion}

  view