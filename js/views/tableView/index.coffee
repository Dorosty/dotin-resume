component = require '../../utils/component'
style = require './style'
sidebar = require './sidebar'
table = require './table'
{extend, toDate, textIsInSearch} = require '../../utils'
{stateToPersian} = require '../../utils/logic'

module.exports = component 'tableView', ({dom, events, state}) ->
  {E, text, setStyle, append, empty} = dom
  {onEvent} = events

  view = E 'span', null,
    E sidebar
    E marginRight: 350, marginTop: 50,
      searchbox = E 'input', style.searchbox
      E style.settings
      E clear: 'both', height: 20
      tableInstance = E table,
        properties:
          multiSelect: true
        headers: [
          {
            width: 120
            name: 'نام'
            getValue: ({firstName, lastName}) ->
              "#{firstName} #{lastName}"
            styleTd: ({firstName, lastName, picture}, td) ->
              empty td
              setStyle td, text: ''
              append td, [
                E 'img', extend {src: picture or 'assets/img/profilePlaceholder.png'}, style.profilePicture
                text "#{firstName} #{lastName}"
              ]
          }
          {
            width: 120
            name: 'تاریخ ثبت'            
            getValue: ({createdAt}) -> toDate createdAt
          }
          {
            width: 300
            name: 'شغل‌های درخواستی'
            key: 'jobs'
          }
          {
            width: 150
            name: 'وضعیت'
            getValue: ({state}) -> stateToPersian state
          }
          {
            width: 120
            name: 'یادداشت'
            styleTd: ({notes}, td, offs) ->
              setStyle td, style.iconTd
              empty td
              append td, E extend {}, style.icon, if notes.length
                  class: 'fa fa-sticky-note', color: '#449e73'
                else
                  class: 'fa fa-sticky-note-o', color: '#5c5555'
          }
          {
            width: 120
            name: 'رزومه'
            styleTd: ({}, td, offs) ->
              setStyle td, style.iconTd
              empty td
              append td, E extend {}, style.icon, class: 'fa fa-download', color: '#449e73'
          }
        ]
        handlers:
          select: (application) ->

  applications = []
  update = ->
    tableInstance.setData applications.filter ({firstName, lastName, jobs}) ->
      textIsInSearch("#{firstName} #{lastName}", searchbox.value()) or textIsInSearch(jobs.toLowerCase(), searchbox.value())

  onEvent searchbox, 'input', update

  state.applications.on (_applications) ->
    applications = _applications
    update()

  view