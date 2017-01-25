style = require './style'
component = require '../../../../utils/component'
alert = require '../../../../components/alert'
dropdown = require '../../../../components/dropdown'
dateInput = require '../../../../components/dateInput'

module.exports = (applicant) ->
  do component 'changeStatus', ({dom, events, state}) ->
    {E, setStyle, show, hide, append} = dom
    {onEvent} = events
    p2Input0 = p2Input1 = p2Input2 = undefined
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
        close = E style.close, 'لغو'

    enable = ->
      setStyle submit, style.submit
      # setStyle close, style.close

    do disable = ->
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
          enable() if p2Input0.value() && p2Input1.value() && p2Input2.valid()
        when 'مصاحبه عمومی'
          show p2
          enable() if p2Input.valid()

    state.all ['jobs', 'managers'], once: true, ([jobs, managers]) ->
      append p1, [
        p2Input0 = do ->
          f = E dropdown, items: jobs.map ({jobName}) -> jobName
          setStyle f, style.dropdown
          setStyle f.input, style.dropdownInput
          f.onChange -> update()
          f
        p2Input1 = do ->
          f = E dropdown, items: managers.map ({firstName, lastName}) -> "#{firstName} #{lastName}"
          setStyle f, style.dropdown
          setStyle f.input, style.dropdownInput
          f.onChange -> update()
          f
        p2Input2 = do ->
          f = E dateInput
          setStyle f, style.dateInput
          setStyle f.input, style.dateInputInput
          onEvent f.input, 'input', -> update()
          f
      ]

    onEvent close, 'click', alertInstance.close

    alertInstance