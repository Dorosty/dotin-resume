component = require '../../../../../utils/component'
style = require './style'
radioSwitch = require '../../../../../components/radioSwitch'

module.exports = component 'applicantFormOthersPart1', ({dom}, {setData}) ->
  {E, setStyle} = dom

  fields = {}

  view = E null,
    E style.mainLabel, 'در صورتی که شغل مورد نظر شما نیاز به موارد زیر داشته باشد، آیا می‌توانید:'
    E null,
      E style.label, '- در ساعات اضافه کاری حضور داشته و کار کنید؟'
      do ->
        f = fields['- در ساعات اضافه کاری حضور داشته و کار کنید؟'] = E radioSwitch, items: ['بلی', 'خیر']
        setStyle f, style.radioSwitch
        f
    E null,
      E style.label, '- در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید؟'
      do ->
        f = fields['- در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید؟'] = E radioSwitch, items: ['بلی', 'خیر']
        setStyle f, style.radioSwitch
        f
    E null,
      E style.label, '- در شیفت شب کار کنید؟'
      do ->
        f = fields['- در شیفت شب کار کنید؟'] = E radioSwitch, items: ['بلی', 'خیر']
        setStyle f, style.radioSwitch
        f
    E null,
      E style.label, '- در تعطیلات آخر هفته کار کنید؟'
      do ->
        f = fields['- در تعطیلات آخر هفته کار کنید؟'] = E radioSwitch, items: ['بلی', 'خیر']
        setStyle f, style.radioSwitch
        f
    E null,
      E style.label, '- در شهر تهران غیر از محل شرکت مشغول کار شوید؟'
      do ->
        f = fields['- در شهر تهران غیر از محل شرکت مشغول کار شوید؟'] = E radioSwitch, items: ['بلی', 'خیر']
        setStyle f, style.radioSwitch
        f

  Object.keys(fields).forEach (labelText) ->
    field = fields[labelText]
    do set = ->
      setData labelText, field.value()
    field.onChange set

  view