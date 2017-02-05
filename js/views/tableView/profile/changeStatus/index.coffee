style = require './style'
component = require '../../../../utils/component'
alert = require '../../../../components/alert'
dropdown = require '../../../../components/dropdown'
dateInput = require '../../../../components/dateInput'
logic = require '../../../../utils/logic'
{toTimestamp} = require '../../../../utils'

module.exports = (loadbarInstance, applicant) ->
  do component 'changeStatus', ({dom, events, state, service}) ->
    {E, setStyle, show, hide, append} = dom
    {onEvent} = events
    p1Input0 = p1Input1 = p1Input2 = undefined
    alertInstance = alert 'تغییر وضعیت به ...',
      E style.alert,
        headerInput = do ->
          f = E dropdown, items: ['مصاحبه تلفنی', 'مصاحبه فنی', 'مصاحبه عمومی'], extendStyle: style.extendStyle
          setStyle f, style.headerDropdown
          setStyle f.input, style.headerDropdownInput
          f.onChange -> update()
          f
      E style.panel,
        hide p1 = E null
        hide p2 = E null,
          p2Input = do ->
            f = E dateInput
            setStyle f, style.dateInput
            setStyle f.input, style.dateInputInput
            onEvent f.input, 'input', -> update()
            f
        submit = E style.submit, 'ذخیره'
        hide close = E style.close, 'لغو'########################

    enabled = false
    enable = ->
      enabled = true
      setStyle submit, style.submit
      # setStyle close, style.close
    do disable = ->
      enabled = false
      setStyle submit, style.submitDisabled
      # setStyle close, style.closeDisabled

    update = ->
      disable()
      hide [p1, p2]
      switch headerInput.value()
        when 'مصاحبه تلفنی'
          enable()
        when 'مصاحبه فنی'
          show p1
          enable() if p1Input0.value() && p1Input1.value() && p1Input2.valid()
        when 'مصاحبه عمومی'
          show p2
          enable() if p2Input.valid()

    state.all ['jobs', 'managers'], once: true, ([jobs, managers]) ->
      append p1, [
        p1Input0 = do ->
          f = E dropdown, items: jobs, getTitle: ({jobName}) -> jobName
          setStyle f, style.dropdown
          setStyle f.input, style.dropdownInput
          f.onChange -> update()
          f
        p1Input1 = do ->
          f = E dropdown, items: managers, getTitle: ({firstName, lastName}) -> "#{firstName} #{lastName}"
          setStyle f, style.dropdown
          setStyle f.input, style.dropdownInput
          f.onChange -> update()
          f
        p1Input2 = do ->
          f = E dateInput
          setStyle f, style.dateInput
          setStyle f.input, style.dateInputInput
          onEvent f.input, 'input', -> update()
          f
      ]

    onEvent close, 'click', alertInstance.close
    onEvent submit, 'click', ->
      return unless enabled
      status = logic.statuses.indexOf 'در انتظار ' + headerInput.value()
      loadbarInstance.set()
      s = switch headerInput.value()
        when 'مصاحبه تلفنی'
          service.changeHRStatus applicant.userId,
            status: status
        when 'مصاحبه فنی'
          service.changeHRStatus applicant.userId,
            status: status
            jobId: p1Input0.value().jobId
            managerId: p1Input1.value().userId
            interViewTime: toTimestamp p1Input2.value()
        when 'مصاحبه عمومی'
          service.changeHRStatus applicant.userId,
            status: status
            interViewTime: toTimestamp p2Input.value()
      s.then loadbarInstance.reset
      alertInstance.close()


    alertInstance