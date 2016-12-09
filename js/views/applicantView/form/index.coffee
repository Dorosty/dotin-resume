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

module.exports = component 'applicantForm', ({dom}) ->
  {E, setStyle} = dom

  data = {}
  setData = (category) -> (key, value) ->
    if value?
      data[category] ?= {}
      data[category][key] = value
    else
      delete data[category][key]
      unless Object.keys(data[category]).length
        delete data[category]

  submit = E style.submit, 'ثبت نهایی اطلاعات'
  submitDisabled = true

  errors = {}
  setError = (category) -> (key, value) ->
    if value?
      errors[category] ?= {}
      errors[category][key] = value
    else
      delete errors[category][key]
      unless Object.keys(errors[category]).length
        delete errors[category]
    if Object.keys(errors).length
      setStyle submit, style.submitDisabled
      submitDisabled = true
    else
      setStyle submit, style.submit
      submitDisabled = false

  view = E null,
    E overview
    scroll = E scrollViewer
    E style.header, 'مشخصات فردی'
    E personalInfo, setData: setData('مشخصات فردی'), setError: setError('مشخصات فردی')
    # E style.header, 'سوابق تحصیلی'
    # E education, setData: setData 'سوابق تحصیلی'
    # E style.header, 'توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها'
    # E talents, setData: setData 'توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها'
    # E style.header, 'مهارت زبان انگلیسی'
    # E english, setData: setData 'مهارت زبان انگلیسی'
    # E style.header, 'آخرین سوابق سازمانی و پروژه‌ای'
    # E reputation, setData: setData 'آخرین سوابق سازمانی و پروژه‌ای'
    # E style.header, 'سایر اطلاعات'
    # E others, setData: setData 'سایر اطلاعات'
    E style.checkboxWrapper,
      accept = E checkbox, 'صحت اطلاعات تکمیل شده در فرم فوق را تأیید نموده و خود را ملزم به پاسخگویی در برابر صحت اطلاعات آن می‌دانم.'
    submit

  setError('ac') 'cept', true
  accept.onChange ->
    if accept.value()
      setError('ac') 'cept', null
    else
      setError('ac') 'cept', true

  view