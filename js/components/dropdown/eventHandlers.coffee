{toPersian} = require '../../utils'

exports.do = ({components, variables, functions, dom, events}) ->
  {input, arrow, itemsList} = components
  {setStyle} = dom
  {onEvent, onEnter} = events

  onEvent arrow, 'click', ->
    input.fn.element.focus()

  onEvent input, 'focus', ->
    input.fn.element.select()

  prevInputValue = ''
  onEvent input, ['input', 'focus'], ->
    variables.manuallySelected = true
    if variables.persian
      unless toPersian(input.value()) is input.value()
        setStyle input, value: input.value()
    if functions.updateList()
      prevInputValue = input.value()
      itemsList.show()
    else
      setStyle input, englishValue: prevInputValue
      functions.updateList()

  onEvent input, 'blur', ->
    variables.selectedId = String functions.getId itemsList.value()
    setStyle input, englishValue: functions.getTitle itemsList.value()
    itemsList.hide()

  onEvent input, 'keydown', (e) ->
    code = e.keyCode or e.which
    switch code
      when 40
        itemsList.goDown()
      when 38
        itemsList.goUp()

  onEnter input, ->
    input.fn.element.blur()