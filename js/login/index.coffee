component = require '../utils/component'

module.exports = component 'login', ({dom, events, state, service}) ->

  {E, show, hide} = dom
  {onEvent, onEnter} = events

  component = E null,
    email = E 'input', placeholder: 'email'
    password = E 'input', placeholder: 'password'
    submit = E 'button', null, 'submit'
    spinner = E null, 'spinner'
    hide invalid = E null, 'invalid'

  hide spinner

  doSubmit = ->
    hide invalid
    show spinner
    service.login
      email: email.element.value
      password: password.element.value
    .then (response) ->
      if response.invalid
        show invalid
      else
        state.user.set response
    .fin ->
      hide spinner

  onEvent [email, password], 'input', ->
    hide invalid
  onEnter [email, password], doSubmit
  onEvent submit, 'click', doSubmit

  component