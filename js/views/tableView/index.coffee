component = require '../../utils/component'
style = require './style'
sidebar = require './sidebar'
table = require './table'
search = require './search'
profile = require './profile'
actionButton = require '../../components/actionButton'
{extend, toDate, changeHash, getManualHash, setManualHash} = require '../../utils'
logic = require '../../utils/logic'

module.exports = component 'tableView', ({dom, events, state, service}) ->
  {E, text, setStyle, append, empty, hide} = dom
  {onEvent} = events

  isInArchive = false
  clickedOnResume = false

  _gotoApplicant = (applicant) ->
    if clickedOnResume
      clickedOnResume = false
      return
    setStyle profilePlaceholder, style.profileVisible
    empty profilePlaceholder
    append profilePlaceholder, E profile, {applicant, gotoIndex, gotoArchive, isInArchive}

  gotoApplicant = ({userId}) ->
    window.location = '#profile_' + userId

  _gotoIndex = ->
    setStyle profilePlaceholder, style.profile
    isInArchive = false
    empty actionButtonPlaceholder
    append actionButtonPlaceholder, actionButtonInstance = E actionButton, items: ['چاپ', 'بایگانی']
    actionButtonInstance.onSelect (value) ->
      switch value
        when 'چاپ'
          unless selectedApplicants.length is 1
            alert 'لطفا یک سطر را انتخاب کنید'
            return
          window.open '#print_' + selectedApplicants[0].userId, '_blank'
        when 'بایگانی'
          unless selectedApplicants.length
            alert 'لطفا حداقل یک سطر را انتخاب کنید'
            return
          service.createMultipleHRStatus selectedApplicants.map ({userId}) -> userId
    update()

  gotoIndex = ->
    window.location = '#home'

  gotoArchive = ->
    setStyle profilePlaceholder, style.profile
    isInArchive = true
    empty actionButtonPlaceholder
    append actionButtonPlaceholder, actionButtonInstance = E actionButton, items: ['چاپ', 'بازیابی']
    actionButtonInstance.onSelect (value) ->
      switch value
        when 'چاپ'
          unless selectedApplicants.length is 1
            alert 'لطفا یک سطر را انتخاب کنید'
            return
          window.open '#print_' + selectedApplicants[0].userId, '_blank'
        when 'بازیابی'
          unless selectedApplicants.length is 1
            alert 'لطفا یک سطر را انتخاب کنید'
            return
          service.changeHRStatus selectedApplicants[0].userId, status: logic.statuses.indexOf 'بازیابی'
    update()

  selectedApplicants = []

  view = E 'span', null,
    E sidebar, {gotoIndex, gotoApplicant, gotoArchive}
    contents = E style.contents,
      actionButtonPlaceholder = E style.action
      searchInstance = E search
      itemsCount = E style.itemsCount
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
            name: 'شناسه'
            getValue: ({dateRelatedId}) -> dateRelatedId
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
            getValue: ({applicantData, applicantsHRStatus}) ->
              if applicantsHRStatus.length
                switch logic.statuses[applicantsHRStatus[applicantsHRStatus.length - 1].status]
                  when 'مصاحبه تلفنی انجام شد'
                    'مصاحبه تلفنی انجام شد'
                  when 'در انتظار مصاحبه فنی'
                    if applicantData
                      'در انتظار مصاحبه فنی'
                    else
                      'در انتظار تکمیل اطلاعات برای مصاحبه فنی'
                  when 'در انتظار مصاحبه عمومی'
                    if applicantData
                      'در انتظار مصاحبه عمومی'
                    else
                      'در انتظار تکمیل اطلاعات برای مصاحبه عمومی'
                  when 'بایگانی'
                    'بایگانی'
                  when 'بازیابی'
                    'بازیابی'
              else
                'ثبت شده'
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
              offs.push onEvent td, 'click', -> clickedOnResume = true
              empty td
              append td, E 'a', extend {href: '/webApi/resume?address=' + resume}, style.icon, target: '_blank', class: 'fa fa-download', color: '#449e73'
          }
        ]
        sort: {
          header: headers[2]
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
      hide actionButtonPlaceholder
  ######################

  applicants = []
  update = ->
    unless isInArchive
      _applicants = applicants.filter ({applicantsHRStatus}) ->
        result = true
        applicantsHRStatus.forEach ({status}) ->
          switch logic.statuses[status]
            when 'بایگانی'
              result = false
            when 'بازیابی'
              result = true
        result
    else
      _applicants = applicants.filter ({applicantsHRStatus}) ->
        result = false
        applicantsHRStatus.forEach ({status}) ->
          switch logic.statuses[status]
            when 'بایگانی'
              result = true
            when 'بازیابی'
              result = false
        result
    _applicants = _applicants.filter searchInstance.isInSearch
    setStyle itemsCount, text: "#{_applicants.length} مورد"
    tableInstance.setData _applicants

  searchInstance.onChange update

  state.applicants.on (_applicants) ->
    applicants = _applicants
    #################################
    applicants.forEach (applicant) ->
      applicant.firstName ?= ''
      applicant.lastName ?= ''
    #################################
    update()

  do loc = ->
    if ~location.hash.indexOf '#profile_'
      profileId = +location.hash.slice '#profile_'.length
      state.applicants.on once: true, (applicants) ->
        [applicant] = applicants.filter ({userId}) -> userId == profileId
        if applicant
          _gotoApplicant applicant
        else
          _gotoIndex()
    else
      _gotoIndex()

  window.onhashchange = loc

  view