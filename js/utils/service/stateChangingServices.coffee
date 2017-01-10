{cruds} = require './names'
{uppercaseFirst} = require '..'

module.exports =
  logout:                stateName: 'user'
  login:                 stateName: 'user'
  clearAllNotifications: stateName: 'notifications'
  changeHRStatus:        stateName: 'applicants'
  changeManagerStatus:   stateName: 'applicants'

cruds.forEach ({name}) ->
  ['create', 'update'].forEach (method) ->
    module.exports["#{method}#{uppercaseFirst name}"] = stateName: "#{name}s"
  module.exports["delete#{uppercaseFirst name}s"] = stateName: "#{name}s"