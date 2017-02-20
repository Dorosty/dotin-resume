component = require '../../../../utils/component'
style = require './style'
logic = require '../../../../utils/logic'
{extend, toDate, toTime} = require '../../../../utils'

module.exports = component 'tab4', ({dom, state, service}, {applicant}) ->
  {E, text, empty, append} = dom

  view = E 'table', style.table,
    E 'thead', null,
      E 'tr', null,
        E 'th', null, 'نام مسئول'
        E 'th', null, 'تغییر'
        E 'th', null, 'زمان تغییر'
        E 'th', null, 'تاریخ تغییر'
    body = E 'tbody'

  service.loadApplicantHistory applicantId: applicant.userId
  .then (history) ->
    empty body
    state.all ['hrUsers', 'managers', 'jobs'], once: true, ([hrUsers, managers, jobs]) ->
      append body,
        history.sort((a, b) -> b.actionTime - a.actionTime).map ({actionTime, actionType, hrUserId, managerId, jobId, chosenTime}, i) ->
          owner = switch logic.actions[actionType]
            when 'ثبت شده', 'اطلاعات تکمیل شد'
              applicant
            when 'درخواست مصاحبه تلفنی', 'درخواست مصاحبه عمومی', 'درخواست مصاحبه فنی'
              managers.filter(({userId}) -> userId is managerId)[0]
            when 'مصاحبه تلفنی انجام شد', 'در انتظار مصاحبه عمومی', 'در انتظار مصاحبه فنی', 'مراحل اداری', 'جذب', 'بایگانی', 'مصاحبه حذف شد', 'مصاحبه ویرایش شد'
              hrUsers.filter(({userId}) -> userId is hrUserId)[0]
          txt = logic.actions[actionType] + switch logic.actions[actionType]
            when 'ثبت شده', 'اطلاعات تکمیل شد', 'مراحل اداری', 'جذب', 'بایگانی', 'مصاحبه حذف شد', 'مصاحبه ویرایش شد', 'درخواست مصاحبه تلفنی', 'درخواست مصاحبه عمومی', 'درخواست مصاحبه فنی', 'مصاحبه تلفنی انجام شد'
              ''
            when 'در انتظار مصاحبه عمومی'
              ". زمان مصاحبه: #{toDate chosenTime}"
            when 'در انتظار مصاحبه فنی'
              manager = managers.filter(({userId}) -> userId is managerId)[0]
              job = jobs.filter(({jobId: j}) -> j is jobId)[0]
              ". نام مدیر: #{manager.firstName} #{manager.lastName} - شغل: #{job.jobName} - زمان مصاحبه: #{toDate chosenTime}"
          E 'tr', (if i % 2 is 0 then style.evenRow else style.row),
            E 'td', null,
              E 'img', extend {src: if owner.personalPic then "/webApi/image?address=#{owner.personalPic}" else 'assets/img/default-avatar-small.png'}, style.profilePicture
              text "#{owner.firstName} #{owner.lastName}"
            E 'td', null, txt
            E 'td', width: 100, toTime actionTime
            E 'td', width: 100, toDate actionTime

  view