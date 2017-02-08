component = require '../../../../utils/component'
style = require './style'
{statuses} = require '../../../../utils/logic'
{extend, toDate, toTime} = require '../../../../utils'

module.exports = component 'tab4', ({dom, state}, {applicant}) ->
  {E, text} = dom

  history = []

  applicant.applicantsHRStatus
  .forEach (status) ->
    {firstName, lastName, personalPic} = status.hrUser
    {status, modificationTime} = status
    history.push {firstName, lastName, personalPic, status, modificationTime}

  applicant.applicantsManagerStatus
  .forEach (status) ->
    state.managers.on once: true, (managers) ->
      [{firstName, lastName, personalPic}] = managers.filter ({userId}) -> userId is status.statusManagerId
      {status, time: modificationTime} = status
      history.push {firstName, lastName, personalPic, status, modificationTime}

  E 'table', style.table,
    E 'tbody', null,
      history.sort((a, b) -> b.modificationTime - a.modificationTime).map ({firstName, lastName, personalPic, status, modificationTime}, i) ->
        E 'tr', (if i % 2 is 0 then style.evenRow else style.row),
          E 'td', null,
            E 'img', extend {src: if personalPic then "/webApi/image?address=#{personalPic}" else 'assets/img/default-avatar-small.png'}, style.profilePicture
            text "#{firstName} #{lastName}"
          E 'td', null, statuses[status]
          E 'td', width: 100, toTime modificationTime
          E 'td', width: 100, toDate modificationTime