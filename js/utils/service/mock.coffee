return

Q = require '../../q'
{extend} = require '../../utils'

managers = [{
  userId: 10
  firstName: 'روح‌الله'
  lastName: 'محمد‌خانی'
}, {
  userId: 11
  firstName: 'حامد'
  lastName: 'حسینی‌نژاد'
}]

jobs = [{jobId: 0, jobName: 'Java developer'}, {jobId: 1, jobName: 'Javascript developer'}, {jobId: 2, jobName: 'UX designer'}]

applicants = [{
  userId: 0
  identificationCode: '0016503368'
  firstName: 'علی'
  lastName: 'درستی'
  phoneNumber: '09121234567'
  email: 'dorosty@doin.ir'
  birthday: '1340/1/2'
  selectedJobs: [jobs[0], jobs[1]]
  resume: null
  personalPic: null
  modificationTime: 1473132854116
  notes: []
  applicantsHRStatus: [{
    statusHRId: 0
    status: 3
  }, {
    statusHRId: 1
    status: 8
    interViewTime: 1486369082850
  }]
  applicantsManagerStatus: []
  history: [{
    firstName: 'aaa'
    lastName: 'bbb'
    personalPic: null
    action: 0
    time: 1486369082850
  }, {
    firstName: 'ddd'
    lastName: 'ccc'
    personalPic: null
    action: 1
    time: 1386369082850
  }]
}, {
  userId: 1
  identificationCode: '0016503368'
  firstName: 'سعید'
  lastName: 'قیومیه'
  phoneNumber: '09121234567'
  email: 'ghayoomi@dotin.ir'
  birthday: '1343/4/5'
  selectedJobs: [jobs[2]]
  resume: null
  personalPic: null
  modificationTime: 1373132854116
  notes: ['aaaaaaaaaaaa']
  applicantsHRStatus: [{
    statusHRId: 2
    status: 7
    interViewTime: 1486369082850
    jobId: jobs[1].jobId
    managerId: managers[0].userId
  }]
  applicantsManagerStatus: []
  history: []
}]

user =
  userId: 110
  identificationCode: '0016503368'
  firstName: 'علی'
  lastName: 'درستی'
  userType: 3
  phoneNumber: '09121234567'
  email: 'dorosty@doin.ir'
  birthday: '1340/1/2'
  personalPic: null
  modificationTime: 1473132854116
  notes: []
  applicantsHRStatus: []
  applicantsManagerStatus: []
  selectedJobs: [{jobName: 'Java developer'}, {jobName: 'Javascript developer'}]
  resume: null
  applicantData: JSON.stringify {
    "مشخصات فردی": {
      "جنسیت": "مرد",
      "وضعیت تاهل": "سایر",
      "نام پدر": "1",
      "شماره شناسنامه": "۱",
      "محل تولد": "1",
      "محل صدور": "1",
      "ملیت": "1",
      "تابعیت": "1",
      "دین": "1",
      "تاریخ تولد": "۱۳۱۱/۱/۱",
      "وضعیت نظام وظیفه": "معاف",
      "تعداد فرزندان": "۱",
      "تعداد افراد تحت تکفل": "۱",
      "نوع معافیت": "معافیت پزشکی",
      "دلیل معافیت": "1",
      "نام معرف": "1",
      "ایمیل": [
        "ma.dorosty@gmail.com"
      ],
      "تلفن همراه": [
        "۰۹۳۷۲۹۹۵۹۷۴"
      ],
      "آدرس محل سکونت دائم": "1",
      "تلفن ثابت محل سکونت دائم": "۱",
      "آدرس محل سکونت فعلی": "1",
      "تلفن ثابت محل سکونت فعلی": "۱"
    },
    "سایر اطلاعات": {
      "در ساعات اضافه کاری حضور داشته و کار کنید": "بلی",
      "در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید": "بلی",
      "در شیفت شب کار کنید": "بلی",
      "در تعطیلات آخر هفته کار کنید": "بلی",
      "در شهر تهران غیر از محل شرکت مشغول کار شوید": "بلی",
      "آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید": "بلی",
      "آیا دخانیات مصرف می‌کنید": "خیر",
      "آیا سابقه محکومیت کیفری دارید": "بلی",
      "متقاضی چه نوع همکاری هستید": "تمام وقت",
      "از چه طریقی از فرصت شغلی در داتین مطلع شدید": "نمایشگاه/همایش/کنفرانس",
      "از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید": "۱۳۱۱/۱/۱",
      "نوع بیمه‌ای که تا‌به‌حال داشته‌اید": "1",
      "مدت زمانی که بیمه بوده‌اید": "1",
      "مقدار دستمزد": "۱",
      "میزان دستمزد": "مقدار مشخص",
      "مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند": [
        {
          "نام و نام خانوادگی": "1",
          "نسبت با شما": "1",
          "نام محل کار": "1",
          "سمت": "1",
          "شماره تماس": "۱"
        },
        {
          "نام و نام خانوادگی": "1",
          "نسبت با شما": "1",
          "نام محل کار": "1",
          "سمت": "1",
          "شماره تماس": "۱"
        }
      ],
      "در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید": [
        {
          "نام و نام خانوادگی": "1",
          "سمت": "1",
          "نام محل کار": "1",
          "نسبت با شما": "1",
          "شماره تماس": "۱"
        }
      ],
      "ورزش‌های مورد علاقه": "1",
      "زمینه‌های هنری مورد علاقه": "1",
      "نوع آن را ذکر نمایید": "1",
      "تاریخ، دلایل و مدت آن را توضیح دهید": "1"
    },
    "سوابق تحصیلی": {
      "سوابق تحصیلی": [
        {
          "مقطع": "دیپلم",
          "رشته تحصیلی": "1",
          "نام دانشگاه و شهر محل تحصیل": "1",
          "سال ورود": "۱۳۱۱",
          "سال اخذ مدرک": "۱۳۱۱",
          "معدل": "۱",
          "عنوان پایان‌نامه": "1"
        }
      ],
      "مقطع و رشته‌ای که ادامه می‌دهید": "1"
    },
    "توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها": {
      "مهارت‌ها": [
        {
          "شایستگی / مهارت": "1",
          "علاقه به کار در این حوزه": "کم",
          "دانش و مهارت در این حوزه": "کم"
        }
      ],
      "دوره‌ها": [
        {
          "دوره": "1",
          "برگزار کننده": "1",
          "سال": "۱۳۱۱"
        }
      ],
      "نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده": "1",
      "آثار علمی و عضویت در انجمن‌ها": "1"
    },
    "مهارت زبان انگلیسی": {
      "مکالمه": "عالی",
      "نوشتن": "عالی",
      "خواندن": "عالی"
    },
    "آخرین سوابق سازمانی و پروژه‌ای": {
      "آخرین سوابق سازمانی و پروژه‌ای": [
        {
          "نام": "1",
          "نوع فعالیت": "1",
          "نام مدیر عامل": "1",
          "نام مدیر مستقیم": "1",
          "تلفن": "۱",
          "محدوده نشانی": "1",
          "تاریخ شروع": "۱۳۱۱/۱/۱",
          "تاریخ پایان": "۱۳۱۱/۱/۱",
          "نوع همکاری": "تمام وقت",
          "علت خاتمه همکاری": "1",
          "آخرین خالص دریافتی": "۱",
          "شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف": "1"
        }
      ]
    }
  }

applicants.forEach (applicant) ->
  applicant.applicantData = user.applicantData

# user.applicantData = undefined

notifications = [{
  userName: 'علی فرخی'
  userPersonalPic: null
  status: 7
  time: 1373132854116
  applicantId: 0
}, {
  userName: 'سجاد افشاریان'
  userPersonalPic: null
  status: 7
  time: 1373132854116
  applicantId: 1
}, {
  userName: 'سجاد افشاریان'
  userPersonalPic: null
  status: 7
  time: 1373132854116
  applicantId: 0
}, {
  userName: 'سجاد افشاریان'
  userPersonalPic: null
  status: 7
  time: 1373132854116
  applicantId: 1
}]

exports.ping = ->
  Q {user, notifications, applicants, managers, jobs}

exports.getUser = ->
  Q {user, notifications}

exports.login = ({email}) ->
  Q.delay 1000 + Math.floor 2000 * Math.random()
  .then ->
    switch email
      when 'hosseininejad@dotin.ir'
        user: user =
          name: 'حامد حسینی‌نژاد'
          type: 'hr'
        applicants: applicants
      when 'mohammadkhani@dotin.ir'
        user: user =
          name: 'روح‌الله محمد‌خانی'
          type: 'manager'
        applicants: applicants
      when 'dorosty@dotin.ir'
        user: user =
          name: 'علی درستی'
          type: 'applicant'
      else
        throw 'invalid'

exports.logout = ->
  user = undefined
  Q.delay 1000 + Math.floor 2000 * Math.random()
  .then ->
    loggedOut: true

exports.addJob = ->
  Q.delay 1000 + Math.floor 2000 * Math.random()
  .then -> {}

exports.getCaptcha = ->
  Q.delay 1000 + Math.floor 2000 * Math.random()
  .then -> '12*x=48'

exports.submitProfileData = ({data}) ->
  Q.delay 1000 + Math.floor 2000 * Math.random()
  .then ->
    user = extend {}, user, applicantData: data

exports.changeHRStatus = ({applicantId, status}) ->
  Q.delay 1000 + Math.floor 2000 * Math.random()
  .then ->
    applicants = JSON.parse JSON.stringify applicants
    [applicant] = applicants.filter ({userId}) -> userId is applicantId
    applicant.applicantsHRStatus.push {status}
    {}

exports.changeManagerStatus = ({applicantId, status}) ->
  Q.delay 1000 + Math.floor 2000 * Math.random()
  .then ->
    applicants = JSON.parse JSON.stringify applicants
    [applicant] = applicants.filter ({userId}) -> userId is applicantId
    applicant.applicantsManagerStatus.push {status, managerId: user.userId}
    {}

exports.clearAllNotifications = ->
  Q.delay 1000 + Math.floor 2000 * Math.random()
  .then ->
    notifications = []
    {}