component = require '../../../utils/component'
style = require './style'
overview = require './overview'
scrollViewer = require '../../../components/scrollViewer'
checkbox = require '../../../components/checkbox'
personalInfo = require './personalInfo'
education = require './education'
talents = require './talents'
english = require './english'
reputation = require './reputation'
others = require './others'
tooltip = require '../../../components/tooltip'
tab1 = require '../../tableView/profile/tab1'
{extend, remove} = require '../../../utils'
{spring} = require '../../../utils/animation'
d = require '../../../utils/dom'

module.exports = component 'applicantForm', ({dom, events, state, service, setOff}) ->
  {E, text, setStyle, show, hide, append} = dom
  {onEvent, onResize} = events

  do setSubmitStyle = ->
    setTimeout ->
      if accept.value() && errors.every(({text}) -> !text)
        setStyle submit, style.submit
      else
        setStyle submit, style.submitDisabled

  data = {}
  setData = (category) -> (key, value) ->
    if value?
      data[category] ?= {}
      data[category][key] = value
    else if data[category]
      delete data[category][key]
      unless Object.keys(data[category]).length
        delete data[category]
    ##################
    # setTimeout ->
    #   window.x = data
    #   setStyle x, englishHtml: JSON.stringify(data, null, '  ').replace(/\n/g, '<br />').replace(/  /g, '<div style="display:inline-block; width:50px"></div>')
    ##################

  errors = []
  setOff ->
    errors.forEach ({hideTooltip}) -> hideTooltip?()
  registerErrorField = (label, field, notCritical) ->
    input = field.input || field
    error = {
      label
      input
      text: null
      off: ->
        remove errors, error
        setSubmitStyle()
    }
    unless notCritical
      errors.push error
    onEvent input, 'focus', ->
      if error.text && !error.hidden
        h = tooltip input, error.text
        error.hideTooltip = ->
          h?()
          h = null
    handleChange = ->
      setStyle [label, input], style.valid
      error.hideTooltip?()
    onEvent input, 'input', handleChange
    field.onChange? handleChange
    onEvent input, 'blur', ->
      error.hideTooltip?()
    error
  setError = (error, text, hidden) ->
    extend error, {text, hidden}
    if text && !hidden
      setStyle [error.label, error.input], style.invalid
    setSubmitStyle()

  view = E null,
    cover = E style.cover
    hide noData = E()
    yesData = E null,
      E overview
      scroll = E scrollViewer
      E style.header, 'مشخصات فردی'
      E personalInfo, {setData: setData('مشخصات فردی'), registerErrorField, setError}
      E style.header, 'سوابق تحصیلی'
      E education, {setData: setData('سوابق تحصیلی'), registerErrorField, setError}
      E style.header,
        text 'توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها'
        E style.optional, '(اختیاری)'
      E talents, {setData: setData('توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها'), registerErrorField, setError}
      E style.header, 'مهارت زبان انگلیسی'
      E english, {setData: setData('مهارت زبان انگلیسی'), registerErrorField, setError}
      E style.header,
        text 'آخرین سوابق سازمانی و پروژه‌ای'
        E style.optional, '(اختیاری)'
      E reputation, {setData: setData('آخرین سوابق سازمانی و پروژه‌ای'), registerErrorField, setError}
      E style.header, 'سایر اطلاعات'
      E others, {setData: setData('سایر اطلاعات'), registerErrorField, setError}
      E style.checkboxWrapper,
        accept = E checkbox, 'صحت اطلاعات تکمیل شده در فرم فوق را تأیید نموده و خود را ملزم به پاسخگویی در برابر صحت اطلاعات آن می‌دانم.'
      submit = E style.submit, 'ثبت نهایی اطلاعات'
  accept.onChange setSubmitStyle

  resize = ->
    body = document.body
    html = document.documentElement
    height = Math.max body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight
    setStyle cover, height: height - 40
  onResize resize
  setTimeout resize

  errorSpringRunning = false
  errorSpring = spring [300, 50], (y, running) ->
    window.scroll 0, [y]
    errorSpringRunning = running
  onEvent E(d.window), ['scroll', 'resize'], ->
    unless errorSpringRunning
      errorSpring window.scrollY, 'goto'
  submitting = false
  onEvent submit, 'click', ->
    setTimeout (->
      if submitting
        return
      unless errors.every(({text}) -> !text)
        errors.some ({label, text}) ->
          if text
            {element} = label.fn
            top = 0
            loop
              top += element.offsetTop || 0
              element = element.offsetParent
              break unless element
            errorSpring top - 50
            true
        errors.forEach (error) ->
          setError error, error.text
        return
      unless accept.value()
        alert 'لطفا تیک تأیید صحت اطلاعات (در انتهای صفحه) را بزنید.'
        return
      if confirm 'پس از ثبت نهایی اطلاعات، این صفحه قابل ویرایش نخواهد‌بود.\nآیا از صحت اطلاعات وارد شده اطمینان دارید؟'
        setStyle cover, style.coverVisible
        setStyle submit, text: 'در حال ثبت...'
        setStyle submit, style.submitSubmitting
        submitting = true
        service.submitProfileData data
        .fin ->
          setStyle submit, style.submitSubmitting
          submitting = false
          setStyle cover, style.cover
          setStyle submit, text: 'ثبت نهایی اطلاعات'
    )

  state.user.on (user) ->
    if user.applicantData
      hide yesData
      show noData
      append noData, E tab1, applicant: user

  view