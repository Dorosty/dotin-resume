component = require '../../../utils/component'
style = require './style'
criterion = require './criterion'
{remove, textIsInSearch} = require '../../../utils'
{stateToPersian} = require '../../../utils/logic'

module.exports = component 'search', ({dom, events, returnObject}) ->
  {E, empty, append, setStyle, enable, disable} = dom
  {onEvent} = events

  onChangeListener = undefined

  view = E 'span', null,
    searchbox = E 'input', style.searchbox
    settings = E style.settings
    E style.divider
    panel = E style.panel,
      arrowBorder = E style.arrowBorder
      arrow = E style.arrow
      criteriaPlaceholder = E()
      E style.pannelInner,
        add = E style.add

  addCriterion = ->
    append criteriaPlaceholder, newCriterion = E criterion
    criteria.push newCriterion
    do rearrange = ->
      setStyle panel, height: 60 + (50 * criteria.length)
      if criteria.length is 1
        criteria[0].setRemoveEnabled false
      else
        criteria.forEach ({setRemoveEnabled}) -> setRemoveEnabled true
    newCriterion.onChange -> onChangeListener?()
    newCriterion.onRemove ->
      remove criteria, newCriterion
      rearrange()
      onChangeListener?()

  onEvent searchbox, 'focus', ->
    setStyle searchbox, style.searchboxFocus
  onEvent searchbox, 'blur', ->
    setStyle searchbox, style.searchbox

  onEvent searchbox, 'input', -> onChangeListener?()

  onEvent add, 'mouseover', ->
    setStyle add, style.addHover
  onEvent add, 'mouseout', ->
    setStyle add, style.add
  onEvent add, 'click', addCriterion

  criteria = []
  isActive = false
  onEvent settings, 'click', ->
    if isActive
      setStyle panel, style.panel
      setStyle settings, style.settings
      setStyle arrow, style.arrow
      setStyle arrowBorder, style.arrowBorder
      enable searchbox
    else
      setStyle panel, style.panelActive
      setStyle settings, style.settingsActive
      setStyle arrow, style.arrowActive
      setStyle arrowBorder, style.arrowActive
      disable searchbox
      empty criteriaPlaceholder
      criteria = []
      addCriterion()
    isActive = not isActive
    onChangeListener?()

  returnObject
    isInSearch: (applicant) ->
      if isActive
        criteria.every ({isInSearch}) -> isInSearch applicant
      else
        {firstName, lastName, selectedJobsString, state} = applicant
        value = searchbox.value()
        textIsInSearch("#{firstName} #{lastName}", value) || textIsInSearch(selectedJobsString.toLowerCase(), value) # || textIsInSearch(stateToPersian(state), value)
    onChange: (listener) -> onChangeListener = listener

  view