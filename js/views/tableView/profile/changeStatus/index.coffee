style = require './style'
component = require '../../../../utils/component'
alert = require '../../../../components/alert'
dropdown = require '../../../../components/dropdown'
dateInput = require '../../../../components/dateInput'
logic = require '../../../../utils/logic'
{toTimestamp, toDate} = require '../../../../utils'

module.exports = (loadbarInstance, applicant, status) ->
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
            onEvent f.input, ['input', 'pInput'], -> update()
            f
        submit = E style.submit, 'ذخیره'
        remove = E style.remove, 'حذف'


    enabled = false
    enable = ->
      enabled = true
      setStyle submit, style.submit
    do disable = ->
      enabled = false
      setStyle submit, style.submitDisabled

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
          onEvent f.input, ['input', 'pInput'], -> update()
          f
      ]

    unless status
      hide remove
    else
      headerInput.setValue logic.statuses[status.status].substr 'در انتظار '.length
      switch headerInput.value()
        when 'مصاحبه فنی'
          state.all ['jobs', 'managers'], once: true, ([jobs, managers]) ->
            [job] = jobs.filter ({jobId}) -> jobId is status.jobId
            [manager] = managers.filter ({userId}) -> userId is status.managerId
            setStyle p1Input0.setValue job
            setStyle p1Input1.setValue manager
            setStyle p1Input2.input, value: toDate status.interViewTime
        when 'مصاحبه عمومی'
          setStyle p2Input.input, value: toDate status.interViewTime

    onEvent remove, 'click', ->
      loadbarInstance.set()
      service.deleteHRStatus status.statusHRId
      .then loadbarInstance.reset
      alertInstance.close()
    onEvent submit, 'click', ->
      return unless enabled
      fn = if status
        service.editHRStatus.bind null, applicant.userId, status.statusHRId
      else
        service.changeHRStatus.bind null, applicant.userId
      s = logic.statuses.indexOf 'در انتظار ' + headerInput.value()
      loadbarInstance.set()
      se = switch headerInput.value()
        when 'مصاحبه تلفنی'
          fn
            status: s
        when 'مصاحبه فنی'
          fn
            status: s
            jobId: p1Input0.value().jobId
            managerId: p1Input1.value().userId
            interViewTime: toTimestamp p1Input2.value()
        when 'مصاحبه عمومی'
          fn
            status: s
            interViewTime: toTimestamp p2Input.value()
      se.then loadbarInstance.reset
      alertInstance.close()


    alertInstance