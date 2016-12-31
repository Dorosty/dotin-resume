component = require '../../utils/component'
style = require './style'
{extend, toEnglish} = require '../../utils'

############################
jobs = require './jobs'
############################

module.exports = component 'apply', ({dom, events}) ->
  {E, text, append, setStyle} = dom
  {onEvent} = events

  view = E 'span', null,
    E style.header,
      E style.headerMarginfix
      E style.title, 'تقاضای استخدام'
      E style.breadcrumbs,
        E color: 'white',
          E 'a', style.breadcrumbsLink, 'خانه'
          E 'i', class: 'fa fa-angle-double-left'
          E 'a', style.breadcrumbsLink, 'دعوت به همکاری'
          E 'i', class: 'fa fa-angle-double-left'
          E 'a', style.breadcrumbsLinkActive, 'تقاضای استخدام'
    E style.sectionTitle, 'انتخاب شغل های مورد تقاضا'
    jobsPlaceholder = E()
    E style.form,
      E style.formBackground
      E style.formInner,
        E style.formTitle, 'مشخصات فردی'
        [
          {key: 'name', text: 'نام*', isPersian: true}
          {key: 'surname', text: 'نام خانوادگی*', isPersian: true}
          {key: 'identificationCode', text: 'کد ملی*', isNumber: true}
          {key: 'phoneNumber', text: 'تلفن همراه*', isNumber: true}
          {key: 'email', text: 'ایمیل*'}
        ].map ({key, text, isNumber, isPersian}) ->
          tooltip = undefined
          group = E null,
            input = E 'input', extend {placeholder: text}, style.formInput
          if isNumber || isPersian
            previousValue = ''
            onEvent input, 'input', ->
              if (not isNumber || not (isNaN toEnglish input.value())) && (not isPersian || (/^[آئا-ی]*$/.test input.value()))
                $(input.fn.element).tooltip 'destroy'
                previousValue = input.value()
              else
                if tooltip is 2
                  $(input.fn.element).tooltip 'destroy'
                tooltip = 1
                setTimeout ->
                  $(input.fn.element).tooltip
                    trigger: 'manual'
                    placement: 'bottom'
                    title: if isNumber then 'لطفا عدد وارد کنید.' else 'لطفا زبان کیبورد را به فارسی تغییر دهید.'
                  setTimeout -> $(input.fn.element).tooltip 'show'
              setStyle input, value: previousValue
          onEvent input, 'blur', ->
            if (key is 'phoneNumber' && (toEnglish(input.value()).indexOf('09') isnt 0 || input.value().length isnt 11)) || (key is 'identificationCode' && input.value().length isnt 10)
              if tooltip is 1
                $(input.fn.element).tooltip 'destroy'
              tooltip = 2
              setTimeout ->
                $(input.fn.element).tooltip
                  trigger: 'manual'
                  placement: 'left'
                  template: '<div class="tooltip" role="tooltip">
                    <div class="tooltip-arrow" style="border-left-color: red"></div>
                    <div class="tooltip-inner" style="background-color: red"></div>
                  </div>'
                  title: if key is 'phoneNumber' then 'شماره تلفن وارد شده معتبر نیست.' else 'کد ملی وارد شده معتبر نیست.'
                setTimeout ->
                  $(input.fn.element).tooltip 'show'
            else
              $(input.fn.element).tooltip 'destroy'
          group
        E null,
          text 'تاریخ تولد'
          E style.formBirthdayLabel, 'روز'
          E 'select', style.formBirthdayDropdown,
            [1 .. 31].map (x) ->
              E 'option', null, x
          E style.formBirthdayLabel, 'ماه'
          E 'select', style.formBirthdayDropdown,
            ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'].map (x) ->
              E 'option', null, x
          E style.formBirthdayLabel, 'سال'
          E 'select', style.formBirthdayDropdown,
            [1340 .. 1390].map (x) ->
              E 'option', null, x
        E style.formResume,
          do ->
            button = E style.formResumeButton,
              E 'i', class: 'fa fa-paperclip', fontSize: 20, marginLeft: 10
              text 'بارگذاری رزومه'
            onEvent button, 'mouseover', ->
              setStyle button, style.formResumeButtonHover
            onEvent button, 'mouseout', ->
              setStyle button, style.formResumeButton
            button
          do ->
            link = E 'a', style.formResumeLink, 'نمونه رزومه'
            onEvent link, 'mouseover', ->
              setStyle link, style.formResumeLinkHover
            onEvent link, 'mouseout', ->
              setStyle link, style.formResumeLink
            link
        E style.submit, 'ارسال'

    E style.footer,
      E style.footerText,
        text '© ۱۳۹۵ '
        E 'a', style.footerLogo
      E style.footerSubtext,
        text 'تمامی حقوق مادی و معنوی این وبسایت متعلق به '
        E 'a', style.footerLink, 'شرکت داتیس آرین قشم (داتین)'
        text ' است'

  jobs.forEach ({title, description, icon, requirements, chores}) ->
    append jobsPlaceholder, E style.job,
      E style.jobHeader,
        E style.jobAdorner
        E style.jobAdorner2
        E style.jobTitle, title
        E extend {html: description}, style.jobDescription

  view