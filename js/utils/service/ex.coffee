Q = require '../../q'
state = require '../state'
stateChangingServices = require './stateChangingServices'
{gets, posts, cruds} = require './names'
{get, post} = require './getPost'
{eraseCookie} = require '../cookies'
{extend, uppercaseFirst, remove} = require '..'

exports.logout = (automatic = false) ->
  [
    'user'
  ].forEach (x) -> state[x].set null
  [
    'applicants'
    'notifications'
    'managers'
    'jobs'
  ].forEach (stateName) ->
    state[stateName].set []
  
  eraseCookie 'JSESSIONID'
  unless automatic is true
    stateChangingServices.logout.endedAt = +new Date()
  Q()

exports.submitProfileData = (data) ->
  post 'submitProfileData', data: JSON.stringify data
  .then ->
    state.user.on once: true, (user) ->
      state.user.set extend {}, user, applicantData: JSON.stringify data

exports.changeHRStatus = (applicantId, status) ->
  post 'changeHRStatus', extend({applicantId}, status)
  .then (x) ->
    return if x.indexOf('statusId = ') isnt 0
    x = +x.substr('statusId = '.length)
    state.applicants.on once: true, (applicants) ->
      [applicant] = applicants.filter ({userId}) -> userId is applicantId
      {applicantsHRStatus} = applicant
      applicants = applicants.slice()
      applicantsHRStatus = applicantsHRStatus.slice()
      applicantsHRStatus.push extend {}, status, statusHRId: x
      applicants[applicants.indexOf applicant] = extend {}, applicant, {applicantsHRStatus}
      state.applicants.set applicants

exports.createMultipleHRStatus = (applicantIds) ->
  post 'createMultipleHRStatus', applicantIds: applicantIds.join ','
  .then (x) ->
    return if x.indexOf('statusIds = [') isnt 0
    x = x.substr('statusIds = ['.length)
    xs = x.substr(0, x.length - 1).split(',').map (x) -> +x
    state.applicants.on once: true, (applicants) ->
      applicantIds.forEach (applicantId, i) ->
        [applicant] = applicants.filter ({userId}) -> userId is applicantId
        {applicantsHRStatus} = applicant
        applicants = applicants.slice()
        applicantsHRStatus = applicantsHRStatus.slice()
        applicantsHRStatus.push status: 12, modificationTime: +new Date(), statusHRId: xs[i]
        applicants[applicants.indexOf applicant] = extend {}, applicant, {applicantsHRStatus}
      state.applicants.set applicants

exports.editHRStatus = (statusId, interviewId, status) ->
  post 'editHRStatus', if interviewId then extend({statusId, interviewId}, status) else extend({statusId}, status)
  .then (x) ->
    return if x.indexOf('statusId = ') isnt 0
    x = +x.substr('statusId = '.length)
    state.applicants.on once: true, (applicants) ->
      [applicant] = applicants.filter ({applicantsHRStatus}) -> applicantsHRStatus.some ({statusHRId}) -> statusHRId is statusId
      {applicantsHRStatus} = applicant
      applicants = applicants.slice()
      applicantsHRStatus = applicantsHRStatus.slice()
      [s] = applicantsHRStatus.filter ({statusHRId}) -> statusHRId is statusId
      applicantsHRStatus[applicantsHRStatus.indexOf s] = extend {}, status, statusHRId: x
      applicants[applicants.indexOf applicant] = extend {}, applicant, {applicantsHRStatus}
      state.applicants.set applicants

exports.deleteHRStatus = (statusId, interviewId) ->
  post 'deleteHRStatus', if interviewId then {statusId, interviewId} else {statusId}
  .then ->
    state.applicants.on once: true, (applicants) ->
      [applicant] = applicants.filter ({applicantsHRStatus}) -> applicantsHRStatus.some ({statusHRId}) -> statusHRId is statusId
      {applicantsHRStatus} = applicant
      applicants = applicants.slice()
      applicantsHRStatus = applicantsHRStatus.slice()
      [status] = applicantsHRStatus.filter ({statusHRId}) -> statusHRId is statusId
      remove applicantsHRStatus, status
      applicants[applicants.indexOf applicant] = extend {}, applicant, {applicantsHRStatus}
      state.applicants.set applicants

exports.changeManagerStatus = (applicantId, status) ->
  post 'changeManagerStatus', {applicantId, status}
  .then ->
    state.user.on once: true, (user) ->
      state.applicants.on once: true, (applicants) ->
        [applicant] = applicants.filter ({userId}) -> userId is applicantId
        {applicantsManagerStatus} = applicant
        applicants = applicants.slice()
        applicantsManagerStatus = applicantsManagerStatus.slice()
        applicantsManagerStatus.push {status, managerId: user.userId}
        applicants[applicants.indexOf applicant] = extend {}, applicant, {applicantsManagerStatus}
        state.applicants.set applicants

exports.clearAllNotifications = ->
  get 'clearAllNotifications'
  .then ->
    state.notifications.set []

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