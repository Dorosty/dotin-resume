{cruds} = require './names'
{uppercaseFirst} = require '..'

module.exports =
  logout: stateName: 'user'
  login:  stateName: 'user'

cruds.forEach ({name}) ->
  ['create', 'update', 'delete'].forEach (method) ->
    exports["#{method}#{uppercaseFirst name}"] = stateName: name