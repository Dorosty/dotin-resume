component = require '../../../../utils/component'
style = require './style'
{extend, monthToString, toDate} = require '../../../../utils'

module.exports = component 'tab0', ({dom}, {applicant}) ->
  {E} = dom

  birthdayString = applicant.birthday.split '/'
  birthdayString[1] = monthToString birthdayString[1]
  birthdayString = [birthdayString[2], birthdayString[1], birthdayString[0]].join ' '

  E null,
    E style.column,
      E style.section,
        E 'img', extend {src: if applicant.personalPic then "/webApi/image?address=#{applicant.personalPic}" else 'assets/img/default-avatar-small.png'}, style.sectionCircle
        E style.sectionText,
          E style.sectionTitle, "#{applicant.firstName} #{applicant.lastName}"
          E style.regular, 'متولد ' + birthdayString
          E style.regular, 'کد ملی: ' + applicant.identificationCode
          E style.regular, 'تاریخ ثبت: ' + toDate applicant.modificationTime
      E style.section,
        E style.sectionCircle,
        E extend {class: 'fa fa-suitcase'}, style.sectionIcon
        E style.sectionText,
          E style.sectionTitle, 'شغل‌های درخواستی'
          applicant.selectedJobs.map ({jobName}) ->
            E style.job, jobName
    E style.column,
      E style.section,
        E style.sectionCircle,
        E extend {class: 'fa fa-phone'}, style.sectionIcon
        E style.sectionText,
          E style.sectionTitle, 'شماره تماس: ' + applicant.phoneNumber
          E style.regular, 'رایانامه: ' + applicant.email
      E style.section,
        E style.sectionCircle,
        E extend {class: 'fa fa-download'}, style.sectionIcon
        E style.sectionText,
          E style.sectionTitle, 'دریافت رزومه متقاضی'
          E 'a', extend({href: '/webApi/resume?address=' + applicant.resume}, style.resumeLink), 'دریافت رزومه'