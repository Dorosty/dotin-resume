component = require '../utils/component'

module.exports = component 'login', ({dom, events, state, service})->
  {E, show, hide} = dom
  {onEvent, onEnter} = events

  component = E null,
    email = E 'input', placeholder: 'email'
    password = E 'input', placeholder: 'password'
    submit = E 'button', null, 'submit'
    spinner = E null, 'spinner'

  hide spinner

  doSubmit = ->
    show spinner
    service.login
      email: email.element.value
      password: password.element.value
    .then (response) ->
      if response.invalid
        alert 'invalid'
    .fin ->
      hide spinner

  onEnter [email, password], doSubmit
  onEvent submit, 'click', doSubmit

  component