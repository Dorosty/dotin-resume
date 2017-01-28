component = require '../../utils/component'
style = require './style'
sidebar = require './sidebar'
table = require './table'
search = require './search'
profile = require './profile'
actionButton = require '../../components/actionButton'
{extend, toDate} = require '../../utils'
{getApplicantStatus} = require '../../utils/logic'

module.exports = component 'tableView', ({dom, events, state, service}) ->
  {E, text, setStyle, append, empty, hide} = dom
  {onEvent} = events

  gotoApplicant = (applicant) ->
    setStyle profilePlaceholder, style.profileVisible
    empty profilePlaceholder
    append profilePlaceholder, E profile, {applicant, gotoIndex}

  gotoIndex = ->
    setStyle profilePlaceholder, style.profile

  selectedApplicants = []

  view = E 'span', null,
    E sidebar, {gotoIndex, gotoApplicant}
    contents = E style.contents,
      E style.action,
        actionButtonInstance = E actionButton, items: ['دعوت به مصاحبه', 'چاپ']
      searchInstance = E search
      tableInstance = E table,
        entityId: 'userId'
        properties:
          multiSelect: true
        headers: headers = [
          {
            name: 'نام'
            getValue: ({firstName, lastName}) ->
              "#{firstName} #{lastName}"
            styleTd: ({firstName, lastName, personalPic}, td) ->
              empty td
              setStyle td, text: ''
              append td, [
                E 'img', extend {src: if personalPic then "/webApi/image?address=#{personalPic}" else 'assets/img/default-avatar-small.png'}, style.profilePicture
                text "#{firstName} #{lastName}"
              ]
          }
          {
            name: 'تاریخ ثبت'
            width: 100
            getValue: ({modificationTime}) ->
              modificationTime
            styleTd: ({modificationTime}, td) ->
              setStyle td, text: toDate modificationTime
          }
          {
            name: 'شغل‌های درخواستی'
            getValue: ({selectedJobs}) -> selectedJobs.map(({jobName}) -> jobName).join ' - '
          }
          {
            name: 'وضعیت'
            getValue: getApplicantStatus
          }
          {
            name: 'یادداشت'
            width: 50
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
            width: 50
            styleTd: ({resume}, td, offs) ->
              setStyle td, style.iconTd
              empty td
              append td, E 'a', extend {href: '/webApi/resume?address=' + resume}, style.icon, target: '_blank', class: 'fa fa-download', color: '#449e73'
          }
        ]
        sort: {
          header: headers[1]
          direction: 'down'
        }
        handlers:
          select: gotoApplicant
          update: (descriptors) ->
            selectedApplicants = descriptors.filter(({selected}) -> selected).map ({entity}) -> entity
      profilePlaceholder = E style.profile


  ######################
  state.user.on once: true, (user) ->
    if user.userType isnt 2
      hide actionButtonInstance
  ######################

  actionButtonInstance.onSelect (value) ->
    unless selectedApplicants.length is 1
      alert 'لطفا یک سطر را انتخاب کنید'
      return
    selectedApplicant = selectedApplicants[0]
    switch value
      when 'دعوت به مصاحبه'
        service.changeHRStatus selectedApplicant.userId, 0
      when 'چاپ'
        window.open '#print_' + selectedApplicant.userId, '_blank'

  applicants = []
  update = ->
    tableInstance.setData applicants.filter searchInstance.isInSearch

  searchInstance.onChange update

  state.applicants.on (_applicants) ->
    applicants = _applicants
    #################################
    applicants.forEach (applicant) ->
      applicant.firstName ?= ''
      applicant.lastName ?= ''
    #################################
    update()

  view