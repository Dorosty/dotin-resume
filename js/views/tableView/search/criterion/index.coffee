component = require '../../../../utils/component'
style = require './style'

module.exports = component 'search', ({dom, events, returnObject}) ->
  {E, destroy, show, hide} = dom
  {onEvent} = events

  view = E margin: 20,
    input = E 'input', style.input
    remove = E style.remove

  changeListener = removeListener = undefined

  onEvent input, 'input', -> changeListener?()
  onEvent remove, 'click', ->
    destroy view
    removeListener?()

  returnObject
    onChange: (listener) -> changeListener = listener
    onRemove: (listener) -> removeListener = listener
    setRemoveEnabled: (enabled) ->
      if enabled
        show remove
      else
        hide remove
    isInSearch: (entity) ->
      true #################################

  view