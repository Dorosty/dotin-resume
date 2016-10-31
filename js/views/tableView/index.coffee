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
    E style.contents,
      searchbox = do ->
        searchbox = E 'input', style.searchbox
        onEvent searchbox, 'focus', ->
          setStyle searchbox, style.searchboxFocus
        onEvent searchbox, 'blur', ->
          setStyle searchbox, style.searchbox
        searchbox
      E style.settings
      E clear: 'both', height: 20
      tableInstance = E table,
        properties:
          multiSelect: true
        headers: [
          {
            name: 'نام'
            getValue: ({firstName, lastName}) ->
              "#{firstName} #{lastName}"
            styleTd: ({firstName, lastName, picture}, td) ->
              empty td
              setStyle td, text: ''
              append td, [
                E 'img', extend {src: if picture then "webApi/image?address=#{picture}" else 'assets/img/profilePlaceholder.png'}, style.profilePicture
                text "#{firstName} #{lastName}"
              ]
          }
          {
            name: 'تاریخ ثبت'            
            getValue: ({createdAt}) -> toDate createdAt
          }
          {
            name: 'شغل‌های درخواستی'
            key: 'jobs'
          }
          {
            name: 'وضعیت'
            getValue: ({state}) -> ''#stateToPersian state
          }
          {
            name: 'یادداشت'
            styleTd: ({notes}, td, offs) ->
              setStyle td, style.iconTd
              empty td
              append td, E extend {}, style.icon, if false#notes.length
                  class: 'fa fa-sticky-note', color: '#449e73'
                else
                  class: 'fa fa-sticky-note-o', color: '#5c5555'
          }
          {
            name: 'رزومه'
            styleTd: ({resume}, td, offs) ->
              setStyle td, style.iconTd
              empty td
              append td, E 'a', extend {href: '/webApi/resume?address=' + resume}, style.icon, class: 'fa fa-download', color: '#449e73'
          }
        ]
        handlers:
          select: (applicant) ->

  applicants = []
  update = ->
    tableInstance.setData applicants.filter ({firstName, lastName, jobs, state}) ->
      value = searchbox.value()
      textIsInSearch("#{firstName} #{lastName}", value) or textIsInSearch(jobs.toLowerCase(), value) or textIsInSearch(stateToPersian(state), value)

  onEvent searchbox, 'input', update

  state.applicants.on (_applicants) ->
    applicants = _applicants
    update()

  view