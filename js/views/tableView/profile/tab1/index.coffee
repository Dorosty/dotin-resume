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
    E 'table', style.table,
      E 'thead', null,
        E 'tr', style.tr,
          E 'th', null, 'جنسیت'
          E 'th', null, 'نام پدر'
          E 'th', null, 'کد ملی'
          E 'th', null, 'شماره شناسنامه'
          E 'th', null, 'محل صدور'
          E 'th', null, 'محل تولد'
          E 'th', null, 'ملیت'
          E 'th', null, 'تابعیت'
          E 'th', null, 'دین'
          E 'th', null, 'تاریخ تولد'
      E 'tbody', null,
        E 'tr', style.tr,
          E 'td', null, applicantData['مشخصات فردی']['جنسیت']
          E 'td', null, applicantData['مشخصات فردی']['نام پدر']
          E 'td', null, applicantData['مشخصات فردی']['کد ملی']
          E 'td', null, applicantData['مشخصات فردی']['شماره شناسنامه']
          E 'td', null, applicantData['مشخصات فردی']['محل صدور']
          E 'td', null, applicantData['مشخصات فردی']['محل تولد']
          E 'td', null, applicantData['مشخصات فردی']['ملیت']
          E 'td', null, applicantData['مشخصات فردی']['تابعیت']
          E 'td', null, applicantData['مشخصات فردی']['دین']
          E 'td', null, applicantData['مشخصات فردی']['تاریخ تولد']
    E 'table', style.table,
      E 'thead', null,
        E 'tr', style.tr,
          E 'th', null, 'وضعیت تاهل'
          if applicantData['مشخصات فردی']?['جنسیت'] is 'مرد'
            [
              E 'th', null, 'وضعیت نظام وظیفه'
              if applicantData['مشخصات فردی']?['وضعیت نظام وظیفه'] is 'معاف'
                [
                  E 'th', null, 'نوع معافیت'
                  if applicantData['مشخصات فردی']?['نوع معافیت'] is 'معافیت پزشکی'
                    E 'th', null, 'دلیل معافیت'
                ]
            ]
          unless applicantData['مشخصات فردی']?['وضعیت تاهل'] is 'مجرد'
            E 'th', null, 'تعداد فرزندان'
          E 'th', null, 'تعداد افراد تحت تکفل'
          E 'th', null, 'نام معرف'

      E 'tbody', null,
        E 'tr', style.tr,
          E 'td', null, applicantData['مشخصات فردی']['وضعیت تاهل']
          if applicantData['مشخصات فردی']?['جنسیت'] is 'مرد'
            [
              E 'td', null, applicantData['مشخصات فردی']['وضعیت نظام وظیفه']
              if applicantData['مشخصات فردی']?['وضعیت نظام وظیفه'] is 'معاف'
                [
                  E 'td', null, applicantData['مشخصات فردی']['نوع معافیت']
                  if applicantData['مشخصات فردی']?['نوع معافیت'] is 'معافیت پزشکی'
                    E 'td', null, applicantData['مشخصات فردی']['دلیل معافیت']
                ]
            ]
          unless applicantData['مشخصات فردی']?['وضعیت تاهل'] is 'مجرد'
            E 'td', null, applicantData['مشخصات فردی']['تعداد فرزندان']
          E 'td', null, applicantData['مشخصات فردی']['تعداد افراد تحت تکفل']
          E 'td', null, applicantData['مشخصات فردی']['نام معرف']
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
        E style.afterIcon, applicant.email
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
            E style.clearfix

        # نام مدیر مستقیم
        # نوع همکاری
  
