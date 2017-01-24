component = require '../../utils/component'
style = require './style'
numberInput = require '../../components/restrictedInput/number'
{extend, toEnglish} = require '../../utils'

module.exports = component 'login', ({dom, events, service}) ->

  {E, empty, append, text, setStyle, show, hide, enable, disable} = dom
  {onEvent, onEnter} = events

  component = E null,
    E 'img', style.bg
    E style.form,
      E 'img', style.logo
      E style.title, 'شرکت نرم‌افزاری داتیس آرین قشم'
      E style.formInputs,
        email = E 'input', extend {placeholder: 'کد ملی / نام کاربری'}, style.input
        password = E 'input', extend {type: 'password', placeholder: 'رمز عبور'}, style.input
        captchaPlaceholder = E style.captchaSection
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

  captchaInput = undefined
  service.getCaptcha().then (captcha) ->
    [firstPart, lastPart] = captcha.split 'x'
    firstPart += ' '
    lastPart = ' ' + lastPart
    empty captchaPlaceholder
    append captchaPlaceholder, [
      E 'span', null, firstPart
      captchaInput = E numberInput, true
      E 'span', null, lastPart
    ]
    onEnter captchaInput, doSubmit
    setStyle captchaInput, style.captchaInput

  doSubmit = ->
    return unless captchaInput

    disable [email, password, submit, remember]
    hide invalid
    show spinner
    service.login
      identificationCode: email.value()
      password: password.value()
      # remember: !!remember.checked()
      captcha: toEnglish captchaInput.value()
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