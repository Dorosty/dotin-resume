Q = require '../../q'
state = require '../state'
stateChangingServices = require './stateChangingServices'
{gets, posts, cruds} = require './names'
{get, post} = require './getPost'
{eraseCookie} = require '../cookies'
{extend, uppercaseFirst} = require '..'

exports.logout = (automatic = false) ->
  [
    'user'
  ].forEach (x) -> state[x].set null
  [
    'applicants'
  ].forEach (stateName) ->
    state[stateName].set []
  
  eraseCookie 'JSESSIONID'
  unless automatic is true
    stateChangingServices.logout.endedAt = +new Date()
  Q()

exports.submitProfileData = (userId, data) ->
  post 'submitProfileData', {userId, data: JSON.stringify data}
  .then ->
    state.user.on once: true, (user) ->
      state.user.set extend {}, user, applicantData: data

gets.forEach (x) ->
  exports[x] = (params) ->
    get x, params

posts.forEach (x) ->
  exports[x] = (params) ->
    post x, params

cruds.forEach ({name, persianName}) ->
  posts.push serviceName = "create#{uppercaseFirst(name)}"
  exports[serviceName] = (entity) ->
    post serviceName, entity
    .then (id) ->
      state["#{name}s"].on once: true, (entities) ->
        entities = entities.slice()
        entity = extend {}, entity, {id}
        entities.push entity
        state["#{name}s"].set entities

cruds.forEach ({name, persianName}) ->
  posts.push serviceName = "update#{uppercaseFirst(name)}"  
  exports[serviceName] = (entity) ->
    post serviceName, entity
    .then ->
      state["#{name}s"].on once: true, (entities) ->
        entities = entities.slice()
        [previousEntitiy] = entities.filter ({id}) -> id is entity.id
        entities[entities.indexOf previousEntitiy] = extend {}, previousEntitiy,  entity
        state["#{name}s"].set entities

cruds.forEach ({name, persianName}) ->
  posts.push serviceName = "delete#{uppercaseFirst(name)}s"
  exports[serviceName] = (ids) ->
    post serviceName, {ids}
    .then ->
      state["#{name}s"].on once: true, (entities) ->
        entities = entities.filter ({id}) -> not (id in ids)
        state["#{name}s"].set entities