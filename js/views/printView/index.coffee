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
        E style.box3,
          text 'نام و نام خانوادگی: '
          E style.answer, "#{applicant.firstName} #{applicant.lastName}"
        E style.box3,
          text 'جنسیت: '
          E style.answer, applicantData['مشخصات فردی']['جنسیت']
        E style.box3,
          text 'نام پدر: '
          E style.answer, applicantData['مشخصات فردی']['نام پدر']
        E style.box3, 
          text 'تاریخ تولد: '
          E style.answer, birthdayString
        E style.box3, 
          text 'شماره شناسنامه: '
          E style.answer, applicantData['مشخصات فردی']['شماره شناسنامه']
        E style.box3, 
          text 'کد ملی: '
          E style.answer, applicant.identificationCode
        E style.box3,
          text 'محل تولد: '
          E style.answer, applicantData['مشخصات فردی']['محل تولد']
          E style.boxMarginRight,
            text 'محل صدور: '
            E style.answer, applicantData['مشخصات فردی']['محل صدور']
        E style.box3,
          text 'دین: '
          E style.answer, applicantData['مشخصات فردی']['دین']
          E style.boxMarginRight,
            text 'مذهب: '
            E style.answer, applicantData['مشخصات فردی']['مذهب'] || ''
        E style.box3,
          text 'ملیت: '
          E style.answer, applicantData['مشخصات فردی']['ملیت']
          E style.boxMarginRight,
            text 'تابعیت: '
            E style.answer, applicantData['مشخصات فردی']['تابعیت']
        E style.box2,
          text 'تلفن همراه: '
          E style.answer, "#{applicant.phoneNumber}#{(applicantData['مشخصات فردی']['تلفن همراه'] || []).map (x) -> ' - ' +x}"
        E style.box2,
          text 'پست الکترونیک: '
          E style.answer, "#{applicant.email}#{(applicantData['مشخصات فردی']['ایمیل'] || []).map (x) -> ' - ' +x}"
        E style.box3,
          text 'تلفن محل سکونت دائم: '
          E style.answer, applicantData['مشخصات فردی']['تلفن ثابت محل سکونت دائم']
        E style.box23,
          text 'نشانی محل سکونت دائم: '
          E style.answer, applicantData['مشخصات فردی']['آدرس محل سکونت دائم']
        E (extend {}, style.box, borderBottomStyle: 'dashed'), 'مشخصات محل سکونت فعلی (درصورتیکه در محلی غیر از محل سکونت دائم خود اقامت دارید (خوابگاه / پانسیون / ...))'
        E (extend {}, style.box3, borderBottomStyle: 'dashed', borderLeftStyle: 'dashed'),
          text 'تلفن محل سکونت فعلی: '
          E style.answer, applicantData['مشخصات فردی']['تلفن ثابت محل سکونت فعلی'] || ''
        E (extend {}, style.box23, borderBottomStyle: 'dashed'),
          text 'نشانی محل سکونت فعلی: '
          E style.answer, applicantData['مشخصات فردی']['آدرس محل سکونت فعلی'] || ''
        if applicantData['مشخصات فردی']?['جنسیت'] is 'مرد'
          [
            E style.box2,
              text 'وضعیت نظام وظیفه: '
              E style.answer, applicantData['مشخصات فردی']['وضعیت نظام وظیفه']
            E extend({}, style.box2, {borderRight: '1px solid black', marginRight: -1, width: 601}),            
              if applicantData['مشخصات فردی']?['وضعیت نظام وظیفه'] is 'معاف'
                [
                  text 'نوع معافیت: '
                  E style.answer, applicantData['مشخصات فردی']['نوع معافیت']
                  if applicantData['مشخصات فردی']?['نوع معافیت'] is 'معافیت پزشکی'
                    [
                      E 'br'
                      text 'دلیل معافیت: '
                      E style.answer, applicantData['مشخصات فردی']['دلیل معافیت']
                    ]
                ]
          ]
        E style.box3,
          text 'وضعیت تاهل: '
          E style.answer, applicantData['مشخصات فردی']['وضعیت تاهل']
        E style.box3,
          unless applicantData['مشخصات فردی']?['وضعیت تاهل'] is 'مجرد'
            text 'تعداد فرزندان: '
            E style.answer, applicantData['مشخصات فردی']['تعداد فرزندان']
          else
            text 'تعداد فرزندان: '
            E style.answer, 0
        E style.box3,
          text 'تعداد افراد تحت تکفل: '
          E style.answer, applicantData['مشخصات فردی']['تعداد افراد تحت تکفل'] || ''
        E style.box,
          text 'نام معرف (درصورتیکه کسی از دوستان و آشنایان شما را به شرکت معرفی کرده است): '
          E style.answer, applicantData['مشخصات فردی']['نام معرف'] || ''
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
          (applicantData['سوابق تحصیلی']['سوابق تحصیلی'] || []).map (x) ->
            E 'tr', null,
              E 'td', style.td, E style.answer, x['مقطع']
              E 'td', style.td, E style.answer, x['رشته تحصیلی']
              E 'td', style.td, E style.answer, x['نام دانشگاه و شهر محل تحصیل']
              E 'td', style.td, E style.answer, x['سال ورود']
              E 'td', style.td, E style.answer, x['سال اخذ مدرک']
              E 'td', style.td, E style.answer, x['معدل']
              E 'td', style.td, E style.answer, x['عنوان پایان‌نامه']
      E style.tableFooter,
        E null,
          text 'آیا مایل به ادامه تحصیل در سال‌های آینده هستید؟ '
          E style.answer, if applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید'] then 'بلی' else 'خیر'
        if applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید']
          E null,
            text 'مقطع و رشته‌ای را که ادامه می‌دهید، ذکر کنید: '
            E style.answer, applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید']
      E 'h1', null, '3. توانمندیها، مهارت‌ها، دانش و شایستگی‌ها'
      E 'table', style.table,
        E 'thead', null,
          E 'tr', null,
            E 'th', style.th, 'شایستگی / مهارت'
            E 'th', style.th, 'علاقه به کار در این حوزه'
            E 'th', style.th, 'دانش و مهارت در این حوزه'
        E 'tbody', null,
          (applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']?['مهارت‌ها'] || []).map (x) ->
            E 'tr', null,
              E 'td', style.td, E style.answer, x['شایستگی / مهارت']
              E 'td', style.td, E style.answer, x['علاقه به کار در این حوزه']
              E 'td', style.td, E style.answer, x['دانش و مهارت در این حوزه']
      E 'table', extend({marginTop: -1}, style.table),
        E 'thead', null,
          E 'tr', null,
            E 'th', style.th, 'دوره'
            E 'th', style.th, 'برگزار کننده'
            E 'th', style.th, 'سال'
        E 'tbody', null,
          (applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']?['دوره‌ها'] || []).map (x) ->
            E 'tr', null,
              E 'td', style.td, E style.answer, x['دوره']
              E 'td', style.td, E style.answer, x['برگزار کننده']
              E 'td', style.td, E style.answer, x['سال']
      E style.tableFooter,
        E null,
          text 'نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده: '
          E style.answer, applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']?['نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده'] || ''
      E style.tableFooter,
        E null,
          text 'آثار علمی و عضویت در انجمن‌ها: '
          E style.answer, applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']?['آثار علمی و عضویت در انجمن‌ها'] || ''
      E extend({marginTop: -1}, style.boxContainer),
        E extend(style.darkBox), 'مهارت زبان انگلیسی'
        E style.box3,
          text 'مکالمه: '
          E style.answer, applicantData['مهارت زبان انگلیسی']['مکالمه']
        E style.box3,
          text 'نوشتن: '
          E style.answer, applicantData['مهارت زبان انگلیسی']['نوشتن']
        E style.box3,
          text 'خواندن: '
          E style.answer, applicantData['مهارت زبان انگلیسی']['خواندن']
      E 'h1', null, '5. آخرین سوابق سازمانی و پروژه‌ای'
      E 'table', style.table,
        E 'thead', null,
          E 'tr', null,
            E 'th', style.th, 'مشخصات شرکت / سازمان محل کار'
            E 'th', style.th, 'سمت'
            E 'th', style.th, 'شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف'
        E 'tbody', null,
          (applicantData['آخرین سوابق سازمانی و پروژه‌ای']?['آخرین سوابق سازمانی و پروژه‌ای'] || []).map (x) ->
            [
              E 'tr', null,
                E 'td', extend({rowSpan: 2}, style.td),
                  E null,
                    text 'نام: '
                    E style.answer, x['نام']
                  E null,
                    text 'نوع فعالیت: '
                    E style.answer, x['نوع فعالیت']
                  E null,
                    text 'نام مدیر عامل: '
                    E style.answer, x['نام مدیر عامل']
                  E null,
                    text 'نام مدیر مستقیم: '
                    E style.answer, x['نام مدیر مستقیم']
                  E null,
                    text 'تلفن: '
                    E style.answer, x['تلفن']
                  E null,
                    text 'محدوده نشانی: '
                    E style.answer, x['محدوده نشانی']
                E 'td', extend({rowSpan: 2}, style.td),
                  E style.answer, x['سمت']
                E 'td', style.td,
                  E style.answer, x['شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف']
              E 'tr', null,
                E 'td', style.td,
                  E null, 
                    text 'تاریخ شروع: '
                    E style.answer, x['تاریخ شروع']
                  E null, 
                    text 'تاریخ پایان: '
                    E style.answer, x['تاریخ پایان']
                  E null, 
                    text 'آخرین خالص دریافتی (تومان): '
                    E style.answer, x['آخرین خالص دریافتی']
                  E null, 
                    text 'نوع همکاری: '
                    E style.answer, x['نوع همکاری']
                  E null, 
                    text 'علت خاتمه همکاری: '
                    E style.answer, x['علت خاتمه همکاری']
            ]
      E 'h1', null, '6. اطلاعات تکمیلی'
      E style.boxContainer,
        E style.box,
          E style.bold, 'کار در داتین...'
        E style.box,
          text 'متقاضی چه نوع همکاری هستید؟ '
          E style.answer, applicantData['سایر اطلاعات']['متقاضی چه نوع همکاری هستید']
        E style.box,
          text 'از چه طریقی از فرصت شغلی در داتین مطلع شدید؟ '
          E style.answer, (applicantData['سایر اطلاعات']['از چه طریقی از فرصت شغلی در داتین مطلع شدید'] || '' +
            if applicantData['سایر اطلاعات']['از چه طریقی از فرصت شغلی در داتین مطلع شدید'] is 'سایر'
              ' - ' + (applicantData['سایر اطلاعات']?['از چه طریقی از فرصت شغلی در داتین مطلع شدید - سایر'] || '')
            else
              ''
          )
        E style.box,
          text 'از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید؟ '
          E style.answer, applicantData['سایر اطلاعات']['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید'] || ''
        E style.box,
          text 'نوع بیمه‌ای که تا‌به‌حال داشته‌اید؟ '
          E style.answer, applicantData['سایر اطلاعات']['نوع بیمه‌ای که تا‌به‌حال داشته‌اید'] || ''
          E style.boxMarginRight,
            text 'مدت زمانی که بیمه بوده‌اید؟ '
            E style.answer, applicantData['سایر اطلاعات']['مدت زمانی که بیمه بوده‌اید'] || ''
        E style.box,
          text 'میزان دستمزد '
          E style.boldUnderline, 'خالص'
          text " درخواستی شما چقدر است؟ #{applicantData['سایر اطلاعات']['میزان دستمزد'] || ''}"
          E style.answer, if applicantData['سایر اطلاعات']['مقدار دستمزد']
            ' - ' + applicantData['سایر اطلاعات']['مقدار دستمزد'] + ' تومان'
          else
            ''
        E style.box,
          E null, 'در صورتی که شغل مورد نظر شما نیاز به موارد زیر داشته باشد، آیا می‌توانید:'
          E null,
            text 'در ساعات اضافه کاری حضور داشته و کار کنید - '
            E style.answer, applicantData['سایر اطلاعات']['در ساعات اضافه کاری حضور داشته و کار کنید']
          E null,
            text 'در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید - '
            E style.answer, applicantData['سایر اطلاعات']['در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید']
          E null,
            text 'در شیفت شب کار کنید - '
            E style.answer, applicantData['سایر اطلاعات']['در شیفت شب کار کنید']
          E null,
            text 'در تعطیلات آخر هفته کار کنید - '
            E style.answer, applicantData['سایر اطلاعات']['در تعطیلات آخر هفته کار کنید']
          E null,
            text 'در شهر تهران غیر از محل شرکت مشغول کار شوید - '
            E style.answer, applicantData['سایر اطلاعات']['در شهر تهران غیر از محل شرکت مشغول کار شوید']
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
            (applicantData['سایر اطلاعات']['مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند'] || []).map (x) ->
              E 'tr', null,
                E 'td', style.td, E style.answer, x['نام و نام خانوادگی']
                E 'td', style.td, E style.answer, x['نسبت با شما']
                E 'td', style.td, E style.answer, x['نام محل کار']
                E 'td', style.td, E style.answer, x['سمت']
                E 'td', style.td, E style.answer, x['شماره تماس']
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
            (applicantData['سایر اطلاعات']['در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید'] || []).map (x) ->
              E 'tr', null,
                E 'td', style.td, E style.answer, x['نام و نام خانوادگی']
                E 'td', style.td, E style.answer, x['سمت']
                E 'td', style.td, E style.answer, x['نام محل کار']
                E 'td', style.td, E style.answer, x['نسبت با شما']
                E 'td', style.td, E style.answer, x['شماره تماس']
      E extend({marginTop: 50}, style.boxContainer),
        E style.box,
          E style.bold, 'بیشتر درباره شما...'
        E style.box2,
          text 'ورزش‌های مورد علاقه: '
          E style.answer, applicantData['سایر اطلاعات']['ورزش‌های مورد علاقه'] || ''
        E style.box2,
          text 'زمینه‌های هنری مورد علاقه: '
          E style.answer, applicantData['سایر اطلاعات']['زمینه‌های هنری مورد علاقه'] || ''
        E style.box,
          text 'آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید؟ '
          E style.answer, ((applicantData['سایر اطلاعات']?['آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید'] || 'خیر') +
            if applicantData['سایر اطلاعات']?['نوع آن را ذکر نمایید']
              ' - ' + applicantData['سایر اطلاعات']['نوع آن را ذکر نمایید']
            else
              ''
          )
        E style.box2,
          text 'آیا دخانیات مصرف می‌کنید؟ '
          E style.answer, applicantData['سایر اطلاعات']['آیا دخانیات مصرف می‌کنید'] || 'خیر'
        E style.box2,
          text 'آیا سابقه محکومیت کیفری دارید؟ '
          E style.answer, ((applicantData['سایر اطلاعات']['آیا سابقه محکومیت کیفری دارید'] || 'خیر') + 
            if applicantData['سایر اطلاعات']?['تاریخ، دلایل و مدت آن را توضیح دهید']
              ' - ' + applicantData['سایر اطلاعات']['تاریخ، دلایل و مدت آن را توضیح دهید']
            else
              ''
          )
    ]

    setTimeout (-> window.print()), 300

  view