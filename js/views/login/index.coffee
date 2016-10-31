component = require '../../utils/component'
style = require './style'
{extend} = require '../../utils'

module.exports = component 'login', ({dom, events, service}) ->

  {E, text, setStyle, show, hide, enable, disable} = dom
  {onEvent, onEnter} = events

  component = E null,
    E 'img', style.bg
    E style.form,
      E 'img', style.logo
      E style.title, 'شرکت نرم‌افزاری داتیس آرین قشم'
      E style.formInputs,
        email = E 'input', extend {placeholder: 'کد ملی'}, style.input
        password = E 'input', extend {type: 'password', placeholder: 'رمز عبور'}, style.input
        E style.submitSection,
          submit = E 'button', style.submit, 'ورود'
          E 'label', style.rememberLabel,
            remember = E 'input', extend {type: 'checkbox'}, style.remember
            text 'مرا به خاطر بسپار'
          spinner = E style.spinner, 'در حال بارگذاری...'
          hide invalid = E style.invalid, 'نام کاربری و یا رمز عبور اشتباه است.'

  hide spinner

  [email, password].forEach (input) ->
    onEvent input, 'focus', ->
      setStyle input, style.inputFocus
    onEvent input, 'blur', ->
      setStyle input, style.input

  doSubmit = ->
    disable [email, password, submit, remember]
    hide invalid
    show spinner
    service.login
      identificationCode: +email.value()
      password: password.value()
      # remember: !!remember.checked()
    .catch ->
      show invalid
    .fin ->
      enable [email, password, submit, remember]
      hide spinner
    .done()

  onEvent [email, password], 'input', ->
    hide invalid
  onEnter [email, password], doSubmit
  onEvent submit, 'click', doSubmit

  component