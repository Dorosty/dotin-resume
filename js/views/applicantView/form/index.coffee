component = require '../../../utils/component'
section = require './section'
highlightOnView = require '../../../components/highlightOnView'

module.exports = component 'applicantForm', ({dom}) ->
  {E} = dom

  h = E highlightOnView

  E null,
    E class: 'alert alert-info in', fontSize: 12,
      E 'p', null, 'با سلام؛ تمایل شما به منظور همکاری با داتین را ارج می‌نهیم؛ امیدواریم با شکل‌گیری این همکاری، زمینه‌های رشد و ارتقای دوجانبه فراهم شود.'
      E 'ul', null,
        E 'li', null, 'صداقت شما در پاسخگویی موجب اعتماد طرفین خواهد بود.'
        E 'li', null, 'پاسخگویی به سؤالاتی که با علامت (*) مشخص شده‌اند، الزامی می‌باشد.'
        E 'li', null, 'پس از تکمیل فرم رزومه خود را به آدرس job@dotin.ir ارسال نمائید و در قسمت عنوان نام و نام‌خانوادگی خود را ذکر نمائید.'
        E 'li', null, 'اطلاعات این فرم و رزومه شما به صورت محرمانه نزد داتین باقی خواهد ماند.'
        E 'li', null, 'پیشاپیش از اینکه اعتماد می‌کنید و به همه‌ی سؤالات به دقت پاسخ می‌دهید، سپاسگزاریم.'

    E class: 'well well-sm',
      E class: 'row',
        E class: 'form-group col-md-3',
          E 'input', class: 'form-control', placeholder: 'xxx'


    h.subscribe E section,
      title: 'سوابق تحصیلی'
      getContents: ->
        E class: 'row',
          E class: 'form-group col-md-3',
            E 'input', class: 'form-control', placeholder: 'aaa'

    h.subscribe E section,
      title: 'آخرین سوابق سازمانی / پروژه های انجام شده'
      getContents: ->
        E class: 'row',
          E class: 'form-group col-md-3',
            E 'input', class: 'form-control', placeholder: 'bbb'

    h.subscribe E section,
      title: 'دوره‌های آموزشی و مهارت‌ها'
      getContents: ->
        E class: 'row',
          E class: 'form-group col-md-3',
            E 'input', class: 'form-control', placeholder: 'ccc'
