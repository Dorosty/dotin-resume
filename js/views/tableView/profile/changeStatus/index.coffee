style = require './style'
component = require '../../../../utils/component'
alert = require '../../../../components/alert'
dropdown = require '../../../../components/dropdown'
dateInput = require '../../../../components/dateInput'
logic = require '../../../../utils/logic'
{toTimestamp, toDate, remove} = require '../../../../utils'

module.exports = (loadbarInstance, applicant, status) ->
  do component 'changeStatus', ({dom, events, state, service}) ->
    {E, setStyle, show, hide, append} = dom
    {onEvent} = events
    p1Input0 = p1Input1 = p1Input2 = undefined
    alertInstance = alert 'تغییر وضعیت به ...',
      E style.alert,
        headerInput = do ->
          if status
            items = ['مصاحبه فنی', 'مصاحبه عمومی']
          else
            items = ['مصاحبه تلفنی انجام شد', 'مصاحبه فنی', 'مصاحبه عمومی']
            if applicant.applicantsHRStatus.length
              remove items, 'مصاحبه تلفنی انجام شد'
            if applicant.applicantsHRStatus.some(({status}) -> logic.statuses[status] is 'در انتظار مصاحبه عمومی')
              remove items, 'مصاحبه عمومی'
          f = E dropdown, items: items, extendStyle: style.extendStyle
          setStyle f, style.headerDropdown
          setStyle f.input, style.headerDropdownInput
          f.onChange -> update()
          f
      E style.panel,
        hide loading = E null, 'در حال بارگزاری...'
        p1 = E null
        p2 = E null,
          p2Input = do ->
            f = E dateInput
            setStyle f, style.dateInput
            setStyle f.input, style.dateInputInput
            onEvent f.input, ['input', 'pInput'], -> update()
            f
        submit = E style.submit, 'ذخیره'
        removeButton = E style.remove, 'حذف'

    enabled = false
    do update = ->
      enabled = false
      setStyle submit, style.submitDisabled
      enable = ->
        enabled = true
        setStyle submit, style.submit
      hide [p1, p2]
      switch headerInput.value()
        when 'مصاحبه تلفنی انجام شد'
          enable()
        when 'مصاحبه فنی'
          show p1
          enable() if p1Input0.value() && p1Input1.value() && p1Input2.valid()
        when 'مصاحبه عمومی'
          show p2
          enable() if p2Input.valid()

    state.managers.on once: true, (managers) ->
      append p1, [
        p1Input0 = do ->
          f = E dropdown, items: applicant.selectedJobs, getTitle: ({jobName}) -> jobName
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

    _interviewId = undefined

    unless status
      hide removeButton
    else
      if status is applicant.applicantsHRStatus.filter(({status}) -> logic.statuses[status] in ['در انتظار مصاحبه عمومی', 'در انتظار مصاحبه فنی'])[0]
        setStyle removeButton, style.removeDisabled
      headerInput.setValue switch logic.statuses[status.status]
        when 'مصاحبه تلفنی انجام شد'
          'مصاحبه تلفنی انجام شد'
        when 'در انتظار مصاحبه عمومی'
          'مصاحبه عمومی'
        when 'در انتظار مصاحبه فنی'
          'مصاحبه فنی'
      switch headerInput.value()
        when 'مصاحبه فنی'
          show loading
          hide p1
          service.loadInterview statusId: status.statusHRId
          .then ({interviewId, interViewTime, jobId, managerId}) ->
            _interviewId = interviewId
            hide loading
            show p1
            state.managers.on once: true, (managers) ->
              [job] = applicant.selectedJobs.filter ({jobId: j}) -> j is jobId
              [manager] = managers.filter ({userId}) -> userId is managerId
              setStyle p1Input0.setValue job
              setStyle p1Input1.setValue manager
              setStyle p1Input2.input, value: toDate interViewTime
        when 'مصاحبه عمومی'
          show loading
          hide p2
          service.loadInterview statusId: status.statusHRId
          .then ({interviewId, interViewTime}) ->
            _interviewId = interviewId
            hide loading
            show p2
            setStyle p2Input.input, value: toDate interViewTime
        when 'مصاحبه تلفنی انجام شد'
          _interviewId = null

    onEvent removeButton, 'click', ->
      return if status is applicant.applicantsHRStatus.filter(({status}) -> logic.statuses[status] in ['در انتظار مصاحبه عمومی', 'در انتظار مصاحبه فنی'])[0]
      loadbarInstance.set()
      service.deleteHRStatus status.statusHRId, _interviewId
      .then loadbarInstance.reset
      alertInstance.close()
    onEvent submit, 'click', ->
      return unless enabled
      fn = if status
        service.editHRStatus.bind null, status.statusHRId, _interviewId
      else
        service.changeHRStatus.bind null, applicant.userId
      loadbarInstance.set()
      se = switch headerInput.value()
        when 'مصاحبه تلفنی انجام شد'
          fn
            status: logic.statuses.indexOf 'مصاحبه تلفنی انجام شد'
        when 'مصاحبه فنی'
          fn
            status: logic.statuses.indexOf 'در انتظار مصاحبه فنی'
            jobId: p1Input0.value().jobId
            managerId: p1Input1.value().userId
            interViewTime: toTimestamp p1Input2.value()
        when 'مصاحبه عمومی'
          fn
            status: logic.statuses.indexOf 'در انتظار مصاحبه عمومی'
            interViewTime: toTimestamp p2Input.value()
      se.then loadbarInstance.reset
      alertInstance.close()


    alertInstance