style = require './style'
component = require '../../../../utils/component'
alert = require '../../../../components/alert'
logic = require '../../../../utils/logic'
{toDate, toTime} = require '../../../../utils'

module.exports = (applicant, status) ->
  do component 'viewStatus', ({dom, events, state, service}) ->
    {E, show, hide, append} = dom
    {onEvent} = events

    alertInstance = alert 'مشاهده وضعیت ...',
      E style.alert,
      E style.panel,
        hide loading = E null, 'در حال بارگزاری...'
        p = E()
        submit = E style.submit, 'بستن'

    switch logic.statuses[status.status]
      when 'مصاحبه تلفنی انجام شد'
        append p, E null, 'مصاحبه تلفنی انجام شد.'
      when 'در انتظار مصاحبه فنی'
        show loading
        service.loadInterview statusId: status.statusHRId
        .then ({interViewTime, jobId, managerId}) ->
          hide loading
          state.managers.on once: true, (managers) ->
            [job] = applicant.selectedJobs.filter ({jobId: j}) -> j is jobId
            [manager] = managers.filter ({userId}) -> userId is managerId
            append p, E null, "مصاحبه فنی انجام شد. نام مدیر: #{manager.firstName} #{manager.lastName} - شغل: #{job.jobName} - زمان مصاحبه: #{toDate interViewTime}"
      when 'در انتظار مصاحبه عمومی'
        show loading
        service.loadInterview statusId: status.statusHRId
        .then ({interViewTime}) ->
          hide loading
          append p, E null, "مصاحبه عمومی انجام شد. زمان مصاحبه: #{toDate interViewTime}"
      when 'بایگانی'
        append p, E null, "در تاریخ #{toDate status.modificationTime} ساعت #{toTime status.modificationTime} بایگانی شد."
      when 'بازیابی'
        append p, E null, "در تاریخ #{toDate status.modificationTime} ساعت #{toTime status.modificationTime} بازیابی شد."

    onEvent submit, 'click', alertInstance.close

    alertInstance