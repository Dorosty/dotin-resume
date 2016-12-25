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
{remove} = require '../../../utils'

module.exports = component 'applicantForm', ({dom, events, state, service, setOff}) ->
  {E, text, setStyle, show, hide} = dom
  {onEvent, onResize} = events

  data = {}
  setData = (category) -> (key, value) ->
    if value?
      data[category] ?= {}
      data[category][key] = value
    else if data[category]
      delete data[category][key]
      unless Object.keys(data[category]).length
        delete data[category]
    setTimeout ->
      window.x = data
      setStyle x, englishHtml: JSON.stringify(data, null, '  ').replace(/\n/g, '<br />').replace(/  /g, '<div style="display:inline-block; width:50px"></div>')

  submit = E style.submit, 'ثبت نهایی اطلاعات'
  submitDisabled = true

  hideTooltips = []
  setOff ->
    hideTooltips.forEach (hideTooltip) -> hideTooltip()
  errors = []
  errorIsInitial = []
  errorLabels = []
  errorInputs = []
  registerErrorField = (label, field) ->
    hideTooltip = undefined
    input = field.input || field
    errorLabels.push label
    errorInputs.push input
    errorId = errors.length
    errors.push null
    errorIsInitial.push null
    onEvent input, 'focus', ->
      error = errors[errorId]
      if error && !errorIsInitial[errorId]
        h = tooltip input, error
        hideTooltips.push hideTooltip = ->
          h()
          remove hideTooltips, hideTooltip
    onEvent input, ['input', 'pInput'], ->
      setStyle [label, input], style.valid
      hideTooltip?()
    field.onChange? ->
      setStyle [label, input], style.valid
      hideTooltip?()
    onEvent input, 'blur', ->
      hideTooltip?()
    errorId

  setError = (errorId, error, initial) ->
    errors[errorId] = error
    errorIsInitial[errorId] = initial
    label = errorLabels[errorId]
    input = errorInputs[errorId]
    if error && !initial
      setStyle [label, input], style.invalid


  # (category) -> (key, error) ->
  #   if error?
  #     errors[category] ?= {}
  #     errors[category][key] = error
  #   else if errors[category]
  #     delete errors[category][key]
  #     unless Object.keys(errors[category]).length
  #       delete errors[category]
  #   if Object.keys(errors).length
  #     setStyle submit, style.submitDisabled
  #     submitDisabled = true
  #   else
  #     setStyle submit, style.submit
  #     submitDisabled = false
  #   setTimeout ->
  #     window.y = data
  #     setStyle y, englishHtml: JSON.stringify(errors, null, '  ').replace(/\n/g, '<br />').replace(/  /g, '<div style="display:inline-block; width:50px"></div>')

  view = E null,
    cover = E style.cover
    hide noData = E null, 'اطلاعات شما ثبت شده‌است.'
    yesData = E null,
      x = E()
      E 'h1', color: 'red', '---------'
      y = E()
      E overview
      scroll = E scrollViewer
      E style.header, 'مشخصات فردی'
      # E personalInfo, setData: setData('مشخصات فردی'), setError: setError('مشخصات فردی')
      E style.header, 'سوابق تحصیلی'
      # E education, setData: setData('سوابق تحصیلی'), setError: setError('سوابق تحصیلی')
      E style.header,
        text 'توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها'
        E style.optional, '(اختیاری)'
      # E talents, setData: setData('توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها')
      E style.header, 'مهارت زبان انگلیسی'
      E english, {setData: setData('مهارت زبان انگلیسی'), registerErrorField, setError}
      E style.header,
        text 'آخرین سوابق سازمانی و پروژه‌ای'
        E style.optional, '(اختیاری)'
      # E reputation, setData: setData('آخرین سوابق سازمانی و پروژه‌ای')
      E style.header, 'سایر اطلاعات'
      # E others, setData: setData('سایر اطلاعات'), setError: setError('سایر اطلاعات')
      E style.checkboxWrapper,
        accept = E checkbox, 'صحت اطلاعات تکمیل شده در فرم فوق را تأیید نموده و خود را ملزم به پاسخگویی در برابر صحت اطلاعات آن می‌دانم.'
      submit

  # setError('ac') 'cept', true
  # accept.onChange ->
  #   if accept.value()
  #     setError('ac') 'cept', null
  #   else
  #     setError('ac') 'cept', true

  resize = ->
    body = document.body
    html = document.documentElement
    height = Math.max body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight
    setStyle cover, height: height - 40
  onResize resize
  setTimeout resize

  onEvent submit, 'click', ->
    setTimeout (->
      if submitDisabled
        return
      if confirm 'پس از ثبت نهایی اطلاعات، این صفحه قابل ویرایش نخواهد‌بود.\nآیا از صحت اطلاعات وارد شده اطمینان دارید؟'
        setStyle cover, style.coverVisible
        setStyle submit, text: 'در حال ثبت...'
        setStyle submit, style.submitDisabled
        submitDisabled = true
        state.user.on once: true, (user) ->
          service.submitProfileData user.userId, data
          .fin ->
            setStyle submit, style.submitDisabled
            submitDisabled = true
            setStyle cover, style.cover
            setStyle submit, text: 'ثبت نهایی اطلاعات'
    ), 200

  state.user.on (user) ->
    if user.applicantData
      hide yesData
      show noData
      #####################
      # setStyle noData, englishHtml: 'اطلاعات شما ثبت شده‌است.' + '<br /><br /><br /><br /><br />اطلاعات ثبت شده (جهت تست):<br /><br /><br />' + JSON.stringify(user.applicantData, null, '  ').replace(/\n/g, '<br />').replace(/  /g, '<div style="display:inline-block; width:50px"></div>')
      #####################

  view