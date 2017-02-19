ajax = require './ajax'
stateChangingServices = require './stateChangingServices'
ex = require './ex'
{states} = require './names'
{eraseCookie} = require '../cookies'
state = require '../state'
map = require './map'

handle = (isGet) -> (serviceName, params) ->
  stateChangingServices[serviceName]?.running = true
  startedAt = +new Date()
  ajax isGet, serviceName, params
  .catch (e) ->
    stateChangingServices[serviceName]?.running = false
    stateChangingServices[serviceName]?.endedAt = +new Date()
    throw e
  .then (response) ->
    unless response? && typeof(response) is 'object'
      response = value: response
    stateChangingServices[serviceName]?.running = false
    stateChangingServices[serviceName]?.endedAt = +new Date()
    states.forEach (name) ->
      dontSetState = Object.keys(stateChangingServices).some (_serviceName) ->
        service = stateChangingServices[_serviceName]
        if service.stateName is name || _serviceName is 'logout'
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
        if response[name] || (map[name] && response[map[name]])
          responseValue = response[name] || response[map[name]]
          setTimeout ->
            state[name].set responseValue
        if name is 'user' && response.loggedOut
          setTimeout ->
            ex.logout true
    delete response.user
    delete response.loggedOut
    if response.value?
      response = response.value
    response

exports.get = handle true
exports.post = handle false