style = require './style'
component = require '../../utils/component'
{extend, toDate, monthToString} = require '../../utils'

module.exports = component 'views', ({dom, state}, userId) ->
  {E, text, append} = dom

  view = E style.view

  state.applicants.on once: true, (applicants) ->
    [applicant] = applicants.filter (applicant) -> applicant.userId is userId

    {applicantData} = applicant
    applicantData = JSON.parse applicantData

    birthdayString = applicant.birthday.split '/'
    birthdayString[1] = monthToString birthdayString[1]
    birthdayString = [birthdayString[2], birthdayString[1], birthdayString[0]].join ' '

    append view, [
      E 'h1', null, '1. مشخصات فردی'
      E style.boxContainer,
        E style.box3, "نام و نام خانوادگی: #{applicant.firstName} #{applicant.lastName}"
        E style.box3, "جنسیت: #{applicantData['مشخصات فردی']['جنسیت']}"
        E style.box3, "نام پدر: #{applicantData['مشخصات فردی']['نام پدر']}"
        E style.box3, "تاریخ تولد: #{birthdayString}"
        E style.box3, "شماره شناسنامه: #{applicantData['مشخصات فردی']['شماره شناسنامه']}"
        E style.box3, "کد ملی: #{applicant.identificationCode}"
        E style.box3,
          text "محل تولد: #{applicantData['مشخصات فردی']['محل تولد']}"
          E style.boxMarginRight, "محل صدور: #{applicantData['مشخصات فردی']['محل صدور']}"
        E style.box3,
          text "دین: #{applicantData['مشخصات فردی']['دین']}"
          # E style.boxMarginRight, # MAZHAB
        E style.box3,
          text "ملیت: #{applicantData['مشخصات فردی']['ملیت']}"
          E style.boxMarginRight, "تابعیت: #{applicantData['مشخصات فردی']['تابعیت']}"
        E style.box2, "تلفن همراه: #{applicant.phoneNumber}#{(applicantData['مشخصات فردی']['تلفن همراه'] || []).map (x) -> ' - ' +x}"
        E style.box2,
          text "پست الکترونیک: #{applicant.email}#{(applicantData['مشخصات فردی']['ایمیل'] || []).map (x) -> ' - ' +x}"
        E style.box3, "تلفن محل سکونت دائم: #{applicantData['مشخصات فردی']['تلفن ثابت محل سکونت دائم']}"
        E style.box23, "نشانی محل سکونت دائم: #{applicantData['مشخصات فردی']['آدرس محل سکونت دائم']}"
        E (extend {}, style.box, borderBottomStyle: 'dashed'), 'مشخصات محل سکونت فعلی (درصورتیکه در محلی غیر از محل سکونت دائم خود اقامت دارید (خوابگاه / پانسیون / ...))'
        E (extend {}, style.box3, borderBottomStyle: 'dashed', borderLeftStyle: 'dashed'), "تلفن محل سکونت فعلی: #{applicantData['مشخصات فردی']['تلفن ثابت محل سکونت فعلی']}"
        E (extend {}, style.box23, borderBottomStyle: 'dashed'), "نشانی محل سکونت فعلی: #{applicantData['مشخصات فردی']['آدرس محل سکونت فعلی']}"
        if applicantData['مشخصات فردی']?['جنسیت'] is 'مرد'
          [
            E style.box2, "وضعیت نظام وظیفه: #{applicantData['مشخصات فردی']['وضعیت نظام وظیفه']}"
            E extend html: (
                if applicantData['مشخصات فردی']?['وضعیت نظام وظیفه'] is 'معاف'
                  'نوع معافیت: ' + applicantData['مشخصات فردی']['نوع معافیت'] +
                  if applicantData['مشخصات فردی']?['نوع معافیت'] is 'معافیت پزشکی'
                    '<br />دلیل معافیت: ' + applicantData['مشخصات فردی']['دلیل معافیت']
                  else
                    ''
                else
                  ''
              ), style.box2, {borderRight: '1px solid black', marginRight: -1, width: 601}
          ]
        E style.box3, "وضعیت تاهل: #{applicantData['مشخصات فردی']['وضعیت تاهل']}"
        E style.box3,
          unless applicantData['مشخصات فردی']?['وضعیت تاهل'] is 'مجرد'
            "تعداد فرزندان: #{applicantData['مشخصات فردی']['تعداد فرزندان']}"
        E style.box3, "تعداد افراد تحت تکفل: #{applicantData['مشخصات فردی']['تعداد افراد تحت تکفل']}"
        E style.box, "نام معرف (درصورتیکه کسی از دوستان و آشنایان شما را به شرکت معرفی کرده است): #{applicantData['مشخصات فردی']['نام معرف']}"
      E 'h1', null, '2. سوابق تحصیلی'
      E 'table', style.table,
        E 'thead', null,
          E 'tr', null,
            E 'th', style.th, 'مقطع'
            E 'th', style.th, 'رشته تحصیلی'
            E 'th', style.th, 'نام دانشگاه و شهر محل تحصیل'
            E 'th', style.th, 'سال ورود'
            E 'th', style.th, 'سال اخذ مدرک'
            E 'th', style.th, 'معدل'
            E 'th', style.th, 'عنوان پایان‌نامه'
        E 'tbody', null,
          applicantData['سوابق تحصیلی']['سوابق تحصیلی'].map (x) ->
            E 'tr', null,
              E 'td', style.td, x['مقطع']
              E 'td', style.td, x['رشته تحصیلی']
              E 'td', style.td, x['نام دانشگاه و شهر محل تحصیل']
              E 'td', style.td, x['سال ورود']
              E 'td', style.td, x['سال اخذ مدرک']
              E 'td', style.td, x['معدل']
              E 'td', style.td, x['عنوان پایان‌نامه']
      E style.tableFooter,
        E null, 'آیا مایل به ادامه تحصیل در سال‌های آینده هستید؟ ' + if applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید'] then 'بلی' else 'خیر'
        if applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید']
          E null, "مقطع و رشته‌ای را که ادامه می‌دهید، ذکر کنید: #{applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید']}"
      E 'h1', null, '3. توانمندیها، مهارتها، دانش و شایستگی‌ها'
      if applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']?['مهارت‌ها']
        E 'table', style.table,
          E 'thead', null,
            E 'tr', null,
              E 'th', style.th, 'شایستگی / مهارت'
              E 'th', style.th, 'علاقه به کار در این حوزه'
              E 'th', style.th, 'دانش و مهارت در این حوزه'
          E 'tbody', null,
            applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']['مهارت‌ها'].map (x) ->
              E 'tr', null,
                E 'td', style.td, x['شایستگی / مهارت']
                E 'td', style.td, x['علاقه به کار در این حوزه']
                E 'td', style.td, x['دانش و مهارت در این حوزه']
      if applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']?['دوره‌ها']
        E 'table', extend({marginTop: -1}, style.table),
          E 'thead', null,
            E 'tr', null,
              E 'th', style.th, 'دوره'
              E 'th', style.th, 'برگزار کننده'
              E 'th', style.th, 'سال'
          E 'tbody', null,
            applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']['دوره‌ها'].map (x) ->
              E 'tr', null,
                E 'td', style.td, x['دوره']
                E 'td', style.td, x['برگزار کننده']
                E 'td', style.td, x['سال']
      E style.tableFooter,
        E null, "نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده: #{applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']['نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده']}"
      E style.tableFooter,
        E null, "آثار علمی و عضویت در انجمن‌ها: #{applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']['آثار علمی و عضویت در انجمن‌ها']}"
      E extend({marginTop: -1}, style.boxContainer),
        E extend(style.darkBox), 'مهارت زبان انگلیسی'
        E style.box3, "مکالمه: #{applicantData['مهارت زبان انگلیسی']['مکالمه']}"
        E style.box3, "نوشتن: #{applicantData['مهارت زبان انگلیسی']['نوشتن']}"
        E style.box3, "خواندن: #{applicantData['مهارت زبان انگلیسی']['خواندن']}"
      E 'h1', null, '5. آخرین سوابق سازمانی و پروژه‌ای'
      E 'table', style.table,
        E 'thead', null,
          E 'tr', null,
            E 'th', style.th, 'مشخصات شرکت / سازمان محل کار'
            E 'th', style.th, 'سمت'
            E 'th', style.th, 'شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف'
        E 'tbody', null,
          applicantData['آخرین سوابق سازمانی و پروژه‌ای']?['آخرین سوابق سازمانی و پروژه‌ای'].map (x) ->
            [
              E 'tr', null,
                E 'td', extend({rowSpan: 2}, style.td),
                  E null, "نام: #{x['نام']}"
                  E null, "نوع فعالیت: #{x['نوع فعالیت']}"
                  E null, "نام مدیر عامل: #{x['نام مدیر عامل']}"
                  E null, "نام مدیر مستقیم: #{x['نام مدیر مستقیم']}"
                  E null, "تلفن: #{x['تلفن']}"
                  E null, "محدوده نشانی: #{x['محدوده نشانی']}"
                E 'td', extend({rowSpan: 2}, style.td), x['سمت']
                E 'td', style.td, x['شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف']
              E 'tr', null,
                E 'td', style.td,
                  E null, "تاریخ شروع: #{x['تاریخ شروع']}"
                  E null, "تاریخ پایان: #{x['تاریخ پایان']}"
                  E null, "آخرین خالص دریافتی (تومان): #{x['آخرین خالص دریافتی']}"
                  E null, "نوع همکاری: #{x['نوع همکاری']}"
                  E null, "علت خاتمه همکاری: #{x['علت خاتمه همکاری']}"
            ]
      E 'h1', null, '6. اطلاعات تکمیلی'
      E style.boxContainer,
        E style.box,
          E style.bold, 'کار در داتین...'
        E style.box, "متقاضی چه نوع همکاری هستید؟ #{applicantData['سایر اطلاعات']['متقاضی چه نوع همکاری هستید']}"
        E style.box, "از چه طریقی از فرصت شغلی در داتین مطلع شدید؟ #{applicantData['سایر اطلاعات']['از چه طریقی از فرصت شغلی در داتین مطلع شدید']}" +
          if applicantData['سایر اطلاعات']['از چه طریقی از فرصت شغلی در داتین مطلع شدید'] is 'سایر'
            ' - ' + applicantData['از چه طریقی از فرصت شغلی در داتین مطلع شدید - سایر']
          else
            ''
        E style.box, "از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید؟ #{applicantData['سایر اطلاعات']['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید']}"
        E style.box,
          text "نوع بیمه‌ای که تا‌به‌حال داشته‌اید؟ #{applicantData['سایر اطلاعات']['نوع بیمه‌ای که تا‌به‌حال داشته‌اید']}"
          E style.boxMarginRight, "مدت زمانی که بیمه بوده‌اید؟ #{applicantData['سایر اطلاعات']['مدت زمانی که بیمه بوده‌اید']}"
        E style.box,
          text 'میزان دستمزد '
          E style.boldUnderline, 'خالص'
          text " درخواستی شما چقدر است؟ #{applicantData['سایر اطلاعات']['میزان دستمزد']}" +
          if applicantData['سایر اطلاعات']['مقدار دستمزد']
            ' - ' + applicantData['سایر اطلاعات']['مقدار دستمزد'] + ' تومان'
          else
            ''
        E extend((html:
            'در صورتی که شغل مورد نظر شما نیاز به موارد زیر داشته باشد، آیا می‌توانید:' + '<br />' +
            'در ساعات اضافه کاری حضور داشته و کار کنید - ' + applicantData['سایر اطلاعات']['در ساعات اضافه کاری حضور داشته و کار کنید'] + '<br />' +
            'در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید - ' + applicantData['سایر اطلاعات']['در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید'] + '<br />' +
            'در شیفت شب کار کنید - ' + applicantData['سایر اطلاعات']['در شیفت شب کار کنید'] + '<br />' +
            'در تعطیلات آخر هفته کار کنید - ' + applicantData['سایر اطلاعات']['در تعطیلات آخر هفته کار کنید'] + '<br />' +
            'در شهر تهران غیر از محل شرکت مشغول کار شوید - ' + applicantData['سایر اطلاعات']['در شهر تهران غیر از محل شرکت مشغول کار شوید']
          ), style.box)
        E style.box, 'مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند:'
        E 'table', extend({marginTop: -1, marginRight: -1}, style.table),
          E 'thead', null,
            E 'tr', null,
              E 'th', style.th, 'نام و نام خانوادگی'
              E 'th', style.th, 'نسبت با شما'
              E 'th', style.th, 'نام محل کار'
              E 'th', style.th, 'سمت'
              E 'th', style.th, 'شماره تماس'
          E 'tbody', null,
            applicantData['سایر اطلاعات']['مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند'].map (x) ->
              E 'tr', null,
                E 'td', style.td, x['نام و نام خانوادگی']
                E 'td', style.td, x['نسبت با شما']
                E 'td', style.td, x['نام محل کار']
                E 'td', style.td, x['سمت']
                E 'td', style.td, x['شماره تماس']
        E style.box, 'در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید:'
        E 'table', extend({marginTop: -1, marginRight: -1}, style.table),
          E 'thead', null,
            E 'tr', null,
              E 'th', style.th, 'نام و نام خانوادگی'
              E 'th', style.th, 'سمت'
              E 'th', style.th, 'نام محل کار'
              E 'th', style.th, 'نسبت با شما'
              E 'th', style.th, 'شماره تماس'
          E 'tbody', null,
            applicantData['سایر اطلاعات']['در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید'].map (x) ->
              E 'tr', null,
                E 'td', style.td, x['نام و نام خانوادگی']
                E 'td', style.td, x['سمت']
                E 'td', style.td, x['نام محل کار']
                E 'td', style.td, x['نسبت با شما']
                E 'td', style.td, x['شماره تماس']
      E extend({marginTop: 50}, style.boxContainer),
        E style.box,
          E style.bold, 'بیشتر درباره شما...'
        E style.box2, "ورزش‌های مورد علاقه: #{applicantData['سایر اطلاعات']['ورزش‌های مورد علاقه']}"
        E style.box2, "زمینه‌های هنری مورد علاقه: #{applicantData['سایر اطلاعات']['زمینه‌های هنری مورد علاقه']}"
        E style.box, 'آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید؟: ' +
          applicantData['سایر اطلاعات']?['آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید'] +
          if applicantData['سایر اطلاعات']?['نوع آن را ذکر نمایید']
            ' - ' + applicantData['سایر اطلاعات']['نوع آن را ذکر نمایید']
          else
            ''
        E style.box2, "'آیا دخانیات مصرف می‌کنید؟ #{applicantData['سایر اطلاعات']['آیا دخانیات مصرف می‌کنید']}"
        E style.box2, "آیا سابقه محکومیت کیفری دارید؟ #{applicantData['سایر اطلاعات']['آیا سابقه محکومیت کیفری دارید']}" + 
          if applicantData['سایر اطلاعات']?['تاریخ، دلایل و مدت آن را توضیح دهید']
            ' - ' + applicantData['سایر اطلاعات']['تاریخ، دلایل و مدت آن را توضیح دهید']
    ]

    window.print()

    # MAZHAB
    # SHOGHL HA
    # SEMAT (SAVABEGHE SHOGHLI)

  view