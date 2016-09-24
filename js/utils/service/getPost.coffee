ajax = require './ajax'
stateChangingServices = require './stateChangingServices'
ex = require './ex'
{states} = require './names'
state = require '../state'

handle = (isGet) -> (serviceName, params) ->
  stateChangingServices[serviceName]?.running = true
  startedAt = +new Date()
  ajax isGet, serviceName, params
  .then (response) ->
    states.forEach (name) ->
      stateChangingServices[serviceName]?.running = false
      stateChangingServices[serviceName]?.endedAt = +new Date()
      dontSetState = Object.keys(stateChangingServices).some (_serviceName) ->
        service = stateChangingServices[_serviceName]
        if service.stateName is name
          if _serviceName is serviceName
            false
          else if service.running
            true
          else unless service.endedAt
            false
          else
            service.endedAt >= startedAt
        else
          false
      unless dontSetState
        if response[name]
          state[name].set response[name]
        if name is 'user' and response.loggedOut
          state.user.set null
    delete response.user
    delete response.loggedOut
    if response.value?
      response = response.value
    response

exports.get = handle true
exports.post = handle false