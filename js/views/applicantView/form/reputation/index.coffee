component = require '../../../../utils/component'
numberInput = require '../../../../components/restrictedInput/number'
dateInput = require '../../../../components/dateInput'
dropdown = require '../../../../components/dropdown'
style = require './style'
{extend, remove, monthToString, toEnglish} = require '../../../../utils'

module.exports = component 'applicantFormReputation', ({dom, events, setOff}, {setData, registerErrorField, setError}) ->
  {E, setStyle, text, append, destroy} = dom
  {onEvent} = events

  hideTooltips = []
  setOff ->
    hideTooltips.forEach (hideTooltip) -> hideTooltip()

  jobs = []

  view = E style.view,
    jobItemsPlaceholder = E style.jobItemsPlaceholder
    E style.inputRow,
      add = E style.add
      i0 = E 'input', extend {placeholder: 'نام'}, style.input
      i1 = E 'input', extend {placeholder: 'نوع فعالیت'}, style.input
      i2 = E 'input', extend {placeholder: 'نام مدیر عامل'}, style.input
      i3 = E 'input', extend {placeholder: 'نام مدیر مستقیم'}, style.input
      i4 = do ->
        f = E numberInput
        setStyle f, extend {placeholder: 'تلفن'}, style.input
        f
      i5 = E 'input', extend {placeholder: 'محدوده نشانی'}, style.input, marginLeft: 0
    E style.inputRow,
      E style.inputColumn0,
        E extend(style.inputRow, marginTop: 0),
          E style.label0, 'از'
          i6 = do ->
            f = E dateInput
            setStyle f, style.inputPlaceholder
            setStyle f.input, extend {placeholder: 'تاریخ شروع'}, style.dateInput
            onEvent f.input, ['input', 'pInput'], ->
              if f.value()
                setStyle f.input, direction: 'ltr'
              else
                setStyle f.input, direction: 'rtl'
            f
          E style.label0, 'تا'
          i7 = do ->
            f = E dateInput
            setStyle f, extend {marginLeft: '2%'}, style.inputPlaceholder
            setStyle f.input, extend  {placeholder: 'تاریخ پایان'}, style.dateInput
            onEvent f.input, ['input', 'pInput'], ->
              if f.value()
                setStyle f.input, direction: 'ltr'
              else
                setStyle f.input, direction: 'rtl'
            f
          i8 = do ->
            f = E dropdown, items: ['پاره وقت', 'تمام وقت', 'پروژه‌ای'], selectedIndex: 1
            setStyle f, style.inputPlaceholder
            setStyle f.input, extend style.dropdown
            f
        E style.inputRow,
          i9 = E 'input', extend {placeholder: 'علت خاتمه همکاری'}, style.input, marginLeft: 0, width: '100%'
        E style.inputRow,
          E style.label1, 'آخرین خالص دریافتی (تومان)'
          i10 = do ->
            f = E numberInput
            setStyle f, extend {}, style.input, marginLeft: 0, width: '70%'
            f
      E style.inputColumn1,
        i11 = E 'textarea', extend {placeholder: 'شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف'}, style.textarea
      E style.clearfix


  onAdds = []
  [i0, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11].forEach (field, i) ->
    error = registerErrorField field, field, true
    onAdds.push ->
      if !field.value()? || (typeof(field.value()) is 'string' && !field.value().trim())
        setError error, 'تکمیل این فیلد الزامیست.'
      else if field.valid? && !field.valid()
        setError error, 'تکمیل این فیلد الزامیست.'
    if field.onChange
      field.onChange ->
        setError error, null
    onEvent (field.input || field), 'input', ->
      setError error, null

  onEvent add, 'click', ->
    canAdd = [i0, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11].every (i) -> !((!i.value()? || (typeof(i.value()) is 'string' && !i.value().trim())) || (i.valid? && !i.valid()))
    unless canAdd
      onAdds.forEach (x) -> x()
      return
    # 'نام': 'سازمان‌گستران بی‌وقفه'
    # 'نوع فعالیت': 'تولید مواد عالی ضد‌شیمیایی'
    # 'نام مدیر عامل': 'علی شهیدی'
    # 'نام مدیر مستقیم': 'علی شهیدی'
    # 'تلفن': '0213458912'
    # 'محدوده نشانی': 'خیابان نلسون ماندلا (جردن)'
    # 'تاریخ شروع': '1392/8/1'
    # 'تاریخ پایان': '1395/7/30'
    # 'نوع همکاری': 'پروژه‌ای'
    # 'علت خاتمه همکاری': 'لورم ایپسوم متن ساختگی'
    # 'آخرین خالص دریافتی': '1000000'
    # 'شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف': 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.'
    jobs.push job =
      'نام': i0.value()
      'نوع فعالیت': i1.value()
      'نام مدیر عامل': i2.value()
      'نام مدیر مستقیم': i3.value()
      'تلفن': i4.value()
      'محدوده نشانی': i5.value()
      'تاریخ شروع': i6.value()
      'تاریخ پایان': i7.value()
      'نوع همکاری': i8.value()
      'علت خاتمه همکاری': i9.value()
      'آخرین خالص دریافتی': i10.value()
      'شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف': i11.value()

    setStyle [i0, i1, i2, i3, i4, i5, i6.input, i7.input, i9, i10, i11], value: ''
    i8.clear()

    start = toEnglish(job['تاریخ شروع']).split '/'
    start[1] = monthToString start[1]
    start = [start[1], start[0]].join ' '

    end = toEnglish(job['تاریخ پایان']).split '/'
    end[1] = monthToString end[1]
    end = [end[1], end[0]].join ' '

    append jobItemsPlaceholder, jobItem = E style.job,
      removeJob = E style.remove
      E style.jobDate, "از #{start} تا #{end}"
      E style.jobRow,
        E style['نام'], job['نام']
        E style['نوع فعالیت'], '--- ' + job['نوع فعالیت']
        E style['نام مدیر عامل'], '(به مدیریت ' + job['نام مدیر عامل'] + ')'
      E style.jobRow,
        E style['محدوده نشانی'],
          E style.mapIcon
          text job['محدوده نشانی']
        E style['تلفن'],
          E style.phoneIcon
          text job['تلفن']
      E extend {englishHtml: job['شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف'].replace /\n/g, '<br />'}, style.jobRow
      E style.jobRow,
        E style.jobColumn,
          E style.jobColumnHeader, 'آخرین خالص دریافتی'
          E null, toEnglish(job['آخرین خالص دریافتی']).replace(/\B(?=(\d{3})+(?!\d))/g, '،') + ' تومان'
        E style.jobColumn,
          E style.jobColumnHeader, 'علت خاتمه همکاری'
          E null, job['علت خاتمه همکاری']
        E style.jobColumn,
          E style.jobColumnHeader, 'نوع همکاری'
          E null, job['نوع همکاری']
        E style.clearfix

    onEvent removeJob, 'click', ->
      destroy jobItem
      remove jobs, job

    setData 'آخرین سوابق سازمانی و پروژه‌ای', jobs

  view