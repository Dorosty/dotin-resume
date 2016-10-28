Q = require '../../q'
state = require '../state'
stateChangingServices = require './stateChangingServices'
{gets, posts, cruds} = require './names'
{get, post} = require './getPost'
{eraseCookie} = require '../cookies'
{uppercaseFirst} = require '..'

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