component = require '../../../../utils/component'
style = require './style'
{extend, toDate, monthToString} = require '../../../../utils'

module.exports = component 'applicantFormOverview', ({dom, state}) ->
  {E, setStyle, append, empty} = dom
  view = E null,
    E style.section,
      profileImg = E 'img', style.sectionCircle
      E style.sectionText,
        name      = E style.sectionTitle
        birthday  = E style.regular
        ssid      = E style.regular
        createdAt = E style.regular
    E style.section,
      E style.sectionCircle,
      E extend {class: 'fa fa-suitcase'}, style.sectionIcon
      E style.sectionText,
        E style.sectionTitle, 'شغل‌های درخواستی'
        jobs = E()
    E style.section,
      E style.sectionCircle,
      E extend {class: 'fa fa-download'}, style.sectionIcon
      E style.sectionText,
        E style.sectionTitle, 'دریافت رزومه متقاضی'
        resumeLink = E 'a', style.resumeLink, 'دریافت رزومه'

  state.user.on (user) ->
    birthdayString = user.birthday.split '/'
    birthdayString[1] = monthToString birthdayString[1]
    birthdayString = [birthdayString[2], birthdayString[1], birthdayString[0]].join ' '

    setStyle profileImg, src: if user.personalPic then "/webApi/image?address=#{personalPic}" else 'assets/img/default-avatar-small.png'
    setStyle name, text: user.name
    setStyle birthday, text: 'متولد ' + birthdayString
    setStyle ssid, text: 'کد ملی: ' + user.ssid
    setStyle createdAt, text: 'تاریخ ثبت: ' + toDate user.modificationTime

    empty jobs
    append jobs, user.selectedJobs.map (job) ->
      E style.job, job

    setStyle resumeLink, href: '/webApi/resume?address=' + user.resume

  view