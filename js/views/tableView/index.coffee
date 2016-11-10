component = require '../../utils/component'
style = require './style'
sidebar = require './sidebar'
table = require './table'
search = require './search'
{extend, toDate} = require '../../utils'
{stateToPersian} = require '../../utils/logic'

module.exports = component 'tableView', ({dom, events, state}) ->
  {E, text, setStyle, append, empty} = dom
  {onEvent} = events

  view = E 'span', null,
    E sidebar
    E style.contents,
      searchInstance = E search
      tableInstance = E table,
        entityId: 'userId'
        properties:
          multiSelect: true
        headers: [
          {
            name: 'نام'
            getValue: ({firstName, lastName}) ->
              "#{firstName} #{lastName}"
            styleTd: ({firstName, lastName, personalPic}, td) ->
              empty td
              setStyle td, text: ''
              append td, [
                E 'img', extend {src: if personalPic then "/webApi/image?address=#{personalPic}" else 'assets/img/profilePlaceholder.png'}, style.profilePicture
                text "#{firstName} #{lastName}"
              ]
          }
          {
            name: 'تاریخ ثبت'            
            getValue: ({modificationTime}) -> toDate modificationTime
          }
          {
            name: 'شغل‌های درخواستی'
            key: 'selectedJobsString'
          }
          {
            name: 'وضعیت'
            getValue: ({state}) -> 'ثبت شده'#stateToPersian state
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
              append td, E 'a', extend {href: '/webApi/resume?address=' + resume}, style.icon, target: '_blank', class: 'fa fa-download', color: '#449e73'
          }
        ]
        handlers:
          select: (applicant) ->

  applicants = []
  update = ->
    tableInstance.setData applicants.filter searchInstance.isInSearch

  searchInstance.onChange update

  state.applicants.on (_applicants) ->
    applicants = _applicants
    applicants.forEach (applicant) ->
      applicant.firstName ?= ''
      applicant.lastName ?= ''
      applicant.selectedJobsString ?= ''
    update()

  view