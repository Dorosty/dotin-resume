style = require './style'

exports.do = ({components, variables, functions, dom, events}) ->
  {input, arrow, itemsList} = components
  {setStyle} = dom
  {onEvent, onEnter} = events

  onEvent [input, arrow], 'mouseover', ->
    setStyle arrow, style.arrowHover

  onEvent [input, arrow], 'mouseout', ->
    setStyle arrow, style.arrow

  onEvent arrow, 'click', ->
    input.focus()

  onEvent input, ['click', 'focus'], ->
    input.select()
    variables.manuallySelected = true
    itemsList.set variables.allItems
    itemsList.show()

  onEvent input, 'blur', ->
    setTimeout -> setTimeout -> setTimeout -> setTimeout -> setTimeout ->
      itemsList.hide()

  onEvent input, 'keydown', (e) ->
    code = e.keyCode or e.which
    switch code
      when 40
        itemsList.goDown()
      when 38
        itemsList.goUp()

  onEnter input, ->
    itemsList.select()
    input.blur()

  prevInputValue = ''
  onEvent input, 'input', ->
    variables.manuallySelected = true
    unless variables.english
      setStyle input, value: input.value()
    if functions.getFilteredItems().length
      prevInputValue = input.value()
    else
      setStyle input, englishValue: prevInputValue
    itemsList.set functions.getFilteredItems()
    itemsList.show()