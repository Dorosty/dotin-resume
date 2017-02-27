component = require '../../../../utils/component'
style = require './style'
{extend, monthToString, toDate, toEnglish} = require '../../../../utils'

module.exports = component 'tab1', ({dom}, {applicant}) ->
  {E, text} = dom

  return E() unless applicant.applicantData

  {applicantData} = applicant
  applicantData = JSON.parse applicantData

  birthdayString = applicant.birthday.split '/'
  birthdayString[1] = monthToString birthdayString[1]
  birthdayString = [birthdayString[2], birthdayString[1], birthdayString[0]].join ' '

  E style.form,
    E style.header, 'مشخصات فردی'
    E null,
      E style.inlineSection,
        E style.bold, 'جنسیت'
        E null, applicantData['مشخصات فردی']['جنسیت']
      E style.inlineSection,
        E style.bold, 'نام پدر'
        E null, applicantData['مشخصات فردی']['نام پدر']
      E style.inlineSection,
        E style.bold, 'کد ملی'
        E null, applicant.identificationCode
      E style.inlineSection,
        E style.bold, 'شماره شناسنامه'
        E null, applicantData['مشخصات فردی']['شماره شناسنامه']
      E style.inlineSection,
        E style.bold, 'محل صدور'
        E null, applicantData['مشخصات فردی']['محل صدور']
      E style.inlineSection,
        E style.bold, 'محل تولد'
        E null, applicantData['مشخصات فردی']['محل تولد']
      E style.inlineSection,
        E style.bold, 'ملیت'
        E null, applicantData['مشخصات فردی']['ملیت']
      E style.inlineSection,
        E style.bold, 'تابعیت'
        E null, applicantData['مشخصات فردی']['تابعیت']
      E style.inlineSection,
        E style.bold, 'دین'
        E null, applicantData['مشخصات فردی']['دین']
      E style.inlineSection,
        E style.bold, 'مذهب'
        E null, applicantData['مشخصات فردی']['مذهب']
      E style.inlineSection,
        E style.bold, 'تاریخ تولد'
        E null, applicantData['مشخصات فردی']['تاریخ تولد']
    E null,
      E style.inlineSection,
        E style.bold, 'وضعیت تاهل'
        E null, applicantData['مشخصات فردی']['وضعیت تاهل']
      if applicantData['مشخصات فردی']?['جنسیت'] is 'مرد'
        [
          E style.inlineSection,
            E style.bold, 'وضعیت نظام وظیفه'
            E null, applicantData['مشخصات فردی']['وضعیت نظام وظیفه']
          if applicantData['مشخصات فردی']?['وضعیت نظام وظیفه'] is 'معاف'
            [
              E style.inlineSection,
                E style.bold, 'نوع معافیت'
                E null, applicantData['مشخصات فردی']['نوع معافیت']
              if applicantData['مشخصات فردی']?['نوع معافیت'] is 'معافیت پزشکی'
                E style.inlineSection,
                  E style.bold, 'دلیل معافیت'
                  E null, applicantData['مشخصات فردی']['دلیل معافیت']
            ]
        ]
      unless applicantData['مشخصات فردی']?['وضعیت تاهل'] is 'مجرد'
        E style.inlineSection,
          E style.bold, 'تعداد فرزندان'
          E null, applicantData['مشخصات فردی']['تعداد فرزندان']
      E style.inlineSection,
        E style.bold, 'تعداد افراد تحت تکفل'
        E null, applicantData['مشخصات فردی']['تعداد افراد تحت تکفل']
      E style.inlineSection,
        E style.bold, 'نام معرف'
        E null, applicantData['مشخصات فردی']['نام معرف']
    E style.bold, 'ایمیل'
    E style.indent,
      E style.inline,
        E class: 'fa fa-envelope'
        E style.afterIcon, applicant.email
      (applicantData['مشخصات فردی']['ایمیل'] || []).map (x) ->
        E style.inline,
          E class: 'fa fa-envelope'
          E style.afterIcon, x
    E style.bold, 'تلفن همراه'
    E style.indent,
      E style.inline,
        E class: 'fa fa-mobile'
        E style.afterIcon, applicant.phoneNumber
      (applicantData['مشخصات فردی']['تلفن همراه'] || []).map (x) ->
        E style.inline,
          E class: 'fa fa-mobile'
          E style.afterIcon, x
    E style.bold, 'مشخصات سکونت دائم'
    E style.indent,
      E class: 'fa fa-map-marker'
      E style.inline, applicantData['مشخصات فردی']['آدرس محل سکونت دائم']
    E style.indent,
      E class: 'fa fa-phone'
      E style.inline, applicantData['مشخصات فردی']['تلفن ثابت محل سکونت دائم']
    E style.bold, 'مشخصات سکونت فعلی'
    E style.indent,
      E class: 'fa fa-map-marker'
      E style.inline, applicantData['مشخصات فردی']['آدرس محل سکونت فعلی']
    E style.indent,
      E class: 'fa fa-phone'
      E style.inline, applicantData['مشخصات فردی']['تلفن ثابت محل سکونت فعلی']
    E style.header, 'سوابق تحصیلی'
    E 'table', style.table,
      E 'thead', null,
        E 'tr', style.headerTr,
          E 'th', null, 'مقطع'
          E 'th', null, 'رشته تحصیلی'
          E 'th', null, 'نام دانشگاه و شهر محل تحصیل'
          E 'th', null, 'سال ورود'
          E 'th', null, 'سال اخذ مدرک'
          E 'th', null, 'معدل'
          E 'th', null, 'عنوان پایان‌نامه'
      E 'tbody', null,
        applicantData['سوابق تحصیلی']['سوابق تحصیلی'].map (x) ->
          E 'tr', style.tr,
            E 'td', null, x['مقطع']
            E 'td', null, x['رشته تحصیلی']
            E 'td', null, x['نام دانشگاه و شهر محل تحصیل']
            E 'td', null, x['سال ورود']
            E 'td', null, x['سال اخذ مدرک']
            E 'td', null, x['معدل']
            E 'td', null, x['عنوان پایان‌نامه']
    E style.bold, 'آیا مایل به ادامه تحصیل در سال‌های آینده هستید؟'
    E null, if applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید'] then 'بله' else 'خیر'
    if applicantData['سوابق تحصیلی']?['مقطع و رشته‌ای که ادامه می‌دهید']
      [
        E style.bold, 'مقطع و رشته‌ای که ادامه می‌دهید را ذکر کنید.'
        E null, applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید']
      ]
    E style.header, 'توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها'
    if applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']?['مهارت‌ها']
      E 'table', style.table,
        E 'thead', null,
          E 'tr', style.headerTr,
            E 'th', null, 'شایستگی / مهارت'
            E 'th', null, 'علاقه به کار در این حوزه'
            E 'th', null, 'دانش و مهارت در این حوزه'
        E 'tbody', null,
          applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']['مهارت‌ها'].map (x) ->
            E 'tr', style.tr,
              E 'td', null, x['شایستگی / مهارت']
              E 'td', null, x['علاقه به کار در این حوزه']
              E 'td', null, x['دانش و مهارت در این حوزه']
    if applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']?['دوره‌ها']
      E 'table', style.table,
        E 'thead', null,
          E 'tr', style.headerTr,
            E 'th', null, 'دوره'
            E 'th', null, 'برگزار کننده'
            E 'th', null, 'سال'
        E 'tbody', null,
          applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']['دوره‌ها'].map (x) ->
            E 'tr', style.tr,
              E 'td', null, x['دوره']
              E 'td', null, x['برگزار کننده']
              E 'td', null, x['سال']
    if applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']?['نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده']
      [
        E style.bold, 'نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده'
        E null, applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']['نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده']
      ]
    if applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']?['آثار علمی و عضویت در انجمن‌ها']
      [
        E style.bold, 'آثار علمی و عضویت در انجمن‌ها'
        E null, applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']['آثار علمی و عضویت در انجمن‌ها']
      ]
    E style.header, 'مهارت زبان انگلیسی'
      E style.column3,
        E style.bold, 'مکالمه'
        E null,applicantData['مهارت زبان انگلیسی']['مکالمه']
      E style.column3,
        E style.bold, 'نوشتن'
        E null,applicantData['مهارت زبان انگلیسی']['نوشتن']
      E style.column3,
        E style.bold, 'خواندن'
        E null,applicantData['مهارت زبان انگلیسی']['خواندن']
    E style.header, 'آخرین سوابق سازمانی و پروژه‌ای'
    if applicantData['آخرین سوابق سازمانی و پروژه‌ای']?['آخرین سوابق سازمانی و پروژه‌ای']
      applicantData['آخرین سوابق سازمانی و پروژه‌ای']['آخرین سوابق سازمانی و پروژه‌ای'].map (job) ->
        start = toEnglish(job['تاریخ شروع']).split '/'
        start[1] = monthToString start[1]
        start = [start[1], start[0]].join ' '

        end = toEnglish(job['تاریخ پایان']).split '/'
        end[1] = monthToString end[1]
        end = [end[1], end[0]].join ' '

        E style.job.job,
          E style.job.date, "از #{start} تا #{end}"
          E style.job.row,
            E style.job['نام'], job['نام']
            E style.job['نوع فعالیت'], '--- ' + job['نوع فعالیت']
            E style.job['نام مدیر عامل'], '(به مدیریت ' + job['نام مدیر عامل'] + ')'
          E style.job.row,
            E style.job['محدوده نشانی'],
              E style.job.mapIcon
              text job['محدوده نشانی']
            E style.job['تلفن'],
              E style.job.phoneIcon
              text job['تلفن']
          E extend {englishHtml: job['شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف'].replace /\n/g, '<br />'}, style.job.row
          E style.job.row,
            E style.job.column,
              E style.job.columnHeader, 'آخرین خالص دریافتی'
              E englishText: (job['آخرین خالص دریافتی']).replace(/\B(?=(\d{3})+(?!\d))/g, '،') + ' تومان'
            E style.job.column,
              E style.job.columnHeader, 'علت خاتمه همکاری'
              E null, job['علت خاتمه همکاری']
            E style.job.column,
              E style.job.columnHeader, 'نوع همکاری'
              E null, job['نوع همکاری']
            E style.job.column,
              E style.job.columnHeader, 'مدیر مستقیم'
              E null, job['نام مدیر مستقیم']
            E style.clearfix
    E style.header, 'سایر اطلاعات'
    E style.column3,
      E style.bold, 'متقاضی چه نوع همکاری هستید؟'
      E null, applicantData['سایر اطلاعات']['متقاضی چه نوع همکاری هستید']
    E style.column3,
      E style.bold, 'از چه طریقی از فرصت شغلی در داتین مطلع شدید؟'
      E null, applicantData['سایر اطلاعات']['از چه طریقی از فرصت شغلی در داتین مطلع شدید']
    if applicantData['سایر اطلاعات']?['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید']
      [
        E style.column3,
          E style.bold, 'از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید؟'
          E null, applicantData['سایر اطلاعات']['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید']
      ]
    if applicantData['سایر اطلاعات']?['نوع بیمه‌ای که تا‌به‌حال داشته‌اید']
      [
        E style.column3,
          E style.bold, 'نوع بیمه‌ای که تا‌به‌حال داشته‌اید؟'
          E null, applicantData['سایر اطلاعات']['نوع بیمه‌ای که تا‌به‌حال داشته‌اید']
      ]
    E style.column3,
      E style.bold, 'مدت زمانی که بیمه بوده‌اید'
      E null, applicantData['سایر اطلاعات']['مدت زمانی که بیمه بوده‌اید']
    E style.column3,
      E style.bold, 'میزان دستمزد خالص درخواستی شما چقدر است؟'
      E null, (if applicantData['سایر اطلاعات']?['مقدار دستمزد'] then applicantData['سایر اطلاعات']?['مقدار دستمزد'] + 'تومان - ' else '') + applicantData['سایر اطلاعات']['میزان دستمزد']
    E style.seperator    
    E style.boldSection, 'در صورتی که شغل مورد نظر شما نیاز به موارد زیر داشته باشد، آیا می‌توانید:'
    E 'table', null,
      E 'tbody', null,
        E 'tr', null,
          E 'td', null, 'در ساعات اضافه کاری حضور داشته و کار کنید'
          E 'td', paddingRight: 50, applicantData['سایر اطلاعات']['در ساعات اضافه کاری حضور داشته و کار کنید']
        E 'tr', null,
          E 'td', null, 'در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید'
          E 'td', paddingRight: 50, applicantData['سایر اطلاعات']['در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید']
        E 'tr', null,
          E 'td', null, 'در شیفت شب کار کنید'
          E 'td', paddingRight: 50, applicantData['سایر اطلاعات']['در شیفت شب کار کنید']
        E 'tr', null,
          E 'td', null, 'در تعطیلات آخر هفته کار کنید'
          E 'td', paddingRight: 50, applicantData['سایر اطلاعات']['در تعطیلات آخر هفته کار کنید']
        E 'tr', null,
          E 'td', null, 'در شهر تهران غیر از محل شرکت مشغول کار شوید'
          E 'td', paddingRight: 50, applicantData['سایر اطلاعات']['در شهر تهران غیر از محل شرکت مشغول کار شوید']
    E style.boldSection, 'مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند:'
    E 'table', style.table,
      E 'thead', null,
        E 'tr', style.headerTr,
          E 'th', null, 'نام و نام خانوادگی'
          E 'th', null, 'نسبت با شما'
          E 'th', null, 'نام محل کار'
          E 'th', null, 'سمت'
          E 'th', null, 'شماره تماس'
      E 'tbody', null,
        applicantData['سایر اطلاعات']['مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند'].map (x) ->
          E 'tr', null,
            E 'td', null, x['نام و نام خانوادگی']
            E 'td', null, x['نسبت با شما']
            E 'td', null, x['نام محل کار']
            E 'td', null, x['سمت']
            E 'td', null, x['شماره تماس']
    if applicantData['سایر اطلاعات']['در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید']
      [
        E style.boldSection, 'در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید:'
        E 'table', style.table,
          E 'thead', null,
            E 'tr', style.headerTr,
              E 'th', null, 'نام و نام خانوادگی'
              E 'th', null, 'سمت'
              E 'th', null, 'نام محل کار'
              E 'th', null, 'نسبت با شما'
              E 'th', null, 'شماره تماس'
          E 'tbody', null,
            applicantData['سایر اطلاعات']['در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید'].map (x) ->
              E 'tr', null,
                E 'td', null, x['نام و نام خانوادگی']
                E 'td', null, x['سمت']
                E 'td', null, x['نام محل کار']
                E 'td', null, x['نسبت با شما']
                E 'td', null, x['شماره تماس']
      ]
    if applicantData['سایر اطلاعات']?['ورزش‌های مورد علاقه']
      [
        E style.boldSection, 'ورزش‌های مورد علاقه:'
        E null, applicantData['سایر اطلاعات']?['ورزش‌های مورد علاقه']
      ]
    if applicantData['سایر اطلاعات']?['زمینه‌های هنری مورد علاقه']
      [
        E style.boldSection, 'زمینه‌های هنری مورد علاقه:'
        E null, applicantData['سایر اطلاعات']?['زمینه‌های هنری مورد علاقه']
      ]
    E style.boldSection, 'آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید؟'
    E null, applicantData['سایر اطلاعات']?['آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید'] || 'خیر'
    if applicantData['سایر اطلاعات']?['نوع آن را ذکر نمایید']
      E style.boldSection, 'نوع آن را ذکر نمایید.'
      E null, applicantData['سایر اطلاعات']['نوع آن را ذکر نمایید']
    E style.boldSection, 'آیا دخانیات مصرف می‌کنید؟'
    E null, applicantData['سایر اطلاعات']?['آیا دخانیات مصرف می‌کنید'] || 'خیر'
    E style.boldSection, 'آیا سابقه محکومیت کیفری دارید؟'
    E null, applicantData['سایر اطلاعات']?['آیا سابقه محکومیت کیفری دارید'] || 'خیر'
    if applicantData['سایر اطلاعات']?['تاریخ، دلایل و مدت آن را توضیح دهید']
      E style.boldSection, 'تاریخ، دلایل و مدت آن را توضیح دهید.'
      E null, applicantData['سایر اطلاعات']['تاریخ، دلایل و مدت آن را توضیح دهید']