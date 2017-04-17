component = require '../../../../utils/component'
style = require './style'
questions = require './questions'
{extend} = require '../../../../utils'
{generateId} = require '../../../../utils/dom'

questionNumbers =
  E: [0 .. 10]
  I: [11 .. 21]
  N: [22 .. 32]
  S: [33 .. 43]
  F: [44 .. 54]
  T: [55 .. 65]
  J: [66 .. 76]
  P: [77 .. 87]

module.exports = component 'applicantTestsSecondPage', ({dom, events, service, returnObject}, gotoResults) ->
  {E, setStyle, show, hide} = dom
  {onEvent} = events

  answers = []

  nextEnabled = false
  typeNext = (enbaled) ->
    if enbaled
      setStyle [nextButton, finishButton], style.nextButton
    else
      setStyle [nextButton, finishButton], style.nextButtonDisabled
    nextEnabled = enbaled

  view = E style.view,
    E style.progressbar,
      progressbarEmpty = E style.progressbarEmpty
      progressbarFull = E style.progressbarFull
      progressbarCirlcePlaceholder = E style.progressbarCirlcePlaceholder,
        progressbarCirlce = E style.progressbarCirlce
    questionElements = questions.map ({question, answers: [answer1, answer2]}, i) ->
      answer1Id = generateId()
      answer2Id = generateId()
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
        answers[i] = if answer1Input.checked() then 0 else 1
        typeNext true
      questionBox
    nextButton = E style.nextButton,
      E 'span', marginLeft: 10, 'بعدی'
      E class: 'fa fa-arrow-left', position: 'relative', top: 2
    hide finishButton = E style.nextButton,
      E 'span', marginLeft: 10, 'اتمام آزمون'
      E class: 'fa fa-arrow-left', position: 'relative', top: 2

  currentQuestionNumber = 0
  gotoQuestion = (number) ->
    currentQuestionNumber = number
    typeNext false
    unless number == questions.length
      setStyle questionElements, opacity: 0, visibility: 'hidden'
      setStyle questionElements[number], opacity: 1, visibility: 'visible'
    if number == questions.length - 1
      hide nextButton
      show finishButton
    percent = Math.floor 100 * number / questions.length
    setStyle progressbarEmpty, width: "#{100 - percent}%"
    setStyle progressbarFull, width: "#{percent}%"
    setStyle progressbarCirlcePlaceholder, right: "#{percent}%"
    setStyle progressbarCirlce, text: "#{percent}%"

  [nextButton, finishButton].forEach (button) ->
    onEvent button, 'mousemove', ->
      if nextEnabled
        setStyle button, style.nextButtonHover
      else
        setStyle button, style.nextButtonDisabled
    onEvent button, 'mouseout', ->
      if nextEnabled
        setStyle button, style.nextButton
      else
        setStyle button, style.nextButtonDisabled

  onEvent nextButton, 'click', ->
    if nextEnabled
      gotoQuestion currentQuestionNumber + 1

  onEvent finishButton, 'click', ->
    if nextEnabled
      gotoQuestion questions.length
      typeNext false
      service.submitTestResults ['E', 'I', 'N', 'S', 'F', 'T', 'J', 'P'].map (x) -> (questionNumbers[x].map (x) -> answers[x]).reduce ((acc, x) -> acc + x), 0
      .then gotoResults

  returnObject {gotoQuestion}

  view