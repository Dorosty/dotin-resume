component = require '../../../../utils/component'
style = require './style'
{actions} = require '../../../../utils/logic'
{extend, toDate, toTime} = require '../../../../utils'

module.exports = component 'tab4', ({dom}, {applicant}) ->
  {E, text} = dom

  E 'table', style.table,
    E 'tbody', null,
      applicant.history.sort((a, b) -> b.time - a.time).map ({firstName, lastName, personalPic, action, time}, i) ->
        E 'tr', (if i % 2 is 0 then style.evenRow else style.row),
          E 'td', null,
            E 'img', extend {src: if personalPic then "/webApi/image?address=#{personalPic}" else 'assets/img/default-avatar-small.png'}, style.profilePicture
            text "#{firstName} #{lastName}"
          E 'td', null, actions[action]
          E 'td', width: 100, toTime time
          E 'td', width: 100, toDate time