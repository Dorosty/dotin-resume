component = require '../../../utils/component'
style = require './style'
{textIsInSearch} = require '../../../utils'
{stateToPersian} = require '../../../utils/logic'
###############
{extend} = require '../../../utils'
###############

module.exports = component 'search', ({dom, events, returnObject}) ->
  {E, setStyle, enable, disable} = dom
  {onEvent} = events

  onChangeListener = undefined

  view = E 'span', null,
    searchbox = E 'input', style.searchbox
    settings = E style.settings
    E style.divider
    panel = E style.panel,
      arrowBorder = E style.arrowBorder
      arrow = E style.arrow
      E margin: 20,
        E 'input', extend {}, style.searchbox, float: 'none', backgroundColor: 'white', border: '1px solid #ddd', width: 200
      E margin: 20,
        E 'input', extend {}, style.searchbox, float: 'none', backgroundColor: 'white', border: '1px solid #ddd', width: 200
      E margin: 20,
        E 'input', extend {}, style.searchbox, float: 'none', backgroundColor: 'white', border: '1px solid #ddd', width: 200

  onEvent searchbox, 'focus', ->
    setStyle searchbox, style.searchboxFocus
  onEvent searchbox, 'blur', ->
    setStyle searchbox, style.searchbox

  onEvent searchbox, 'input', -> onChangeListener?()

  isActive = false
  onEvent settings, 'click', ->
    if isActive
      setStyle settings, style.settings
      setStyle panel, style.panel
      setStyle arrow, style.arrow
      setStyle arrowBorder, style.arrowBorder
      enable searchbox
    else
      setStyle settings, style.settingsActive
      setStyle panel, style.panelActive
      setStyle arrow, style.arrowActive
      setStyle arrowBorder, style.arrowActive
      disable searchbox
      setTimeout (-> setStyle panel, height: 'auto'), 200
      setStyle searchbox, value: ''
    onChangeListener?()
    isActive = not isActive

  returnObject
    isInSearch: ({firstName, lastName, selectedJobsString, state}) ->
      value = searchbox.value()
      textIsInSearch("#{firstName} #{lastName}", value) or textIsInSearch(selectedJobsString.toLowerCase(), value) # or textIsInSearch(stateToPersian(state), value)
    onChange: (listener) -> onChangeListener = listener

  view