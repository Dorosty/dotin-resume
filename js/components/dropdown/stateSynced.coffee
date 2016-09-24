state = require '../state'
dropdown = require './dropdown'
{extend} = require '../utils'

exports.createElement = ({getId, getTitle, onData, dataState, showEmpty, idState, style}) ->
  showEmpty ?= false
  d = dropdown.createElement getId, getTitle, style
  onData ?= state[dataState].on.bind null
  offData = onData (data) ->
    d.update data, showEmpty
  if idState
    state[idState].on (id) ->
      d.setSelectedId id
  
  extend d, off: offData