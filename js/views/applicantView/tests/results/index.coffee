component = require '../../../../utils/component'
style = require './style'
data = require './data'

module.exports = component 'applicantTestResults', ({dom, events, state}) ->
  {E, setStyle, empty, append} = dom
  {onEvent} = events

  closeProgressBars = []
  setProgressBars = []

  view = E style.view,
    E style.header, 'نتیجه آزمون'
    subheader = E style.subHeader
    img = E 'img', style.img
    E style.column,
      mbtiDisplay = E style.mbtiDisplay
      [
        ['برون‌گرایی', 'E', 'درون‌گرایی', 'I']
        ['شهودی', 'N', 'حسی', 'S']
        ['احساسی', 'F', 'متفکر', 'T']
        ['قضاوت‌‌کننده', 'J', 'ملاحظه‌کننده', 'P']
      ].map ([a, as, b, bs], i, arr) ->
        [
          [[a, as], [b, bs]].map ([a, as]) ->
            classification = E style.classification,
              bar = E style.progressbar,
                E style.progressbarLabel, a
                barEmpty = E style.progressbarEmpty
                barFull = E style.progressbarFull
                E style.progressbarCircle, as
                count = E style.progressbarCount
                totalCount = E style.progressbarTotalCount, data[as].count
                E style.progressbarDescription, data[as].description
            setProgressBars.push (n) -> setTimeout ->
              setStyle count, text: n
              width = barEmpty.fn.element.offsetWidth * n / data[as].count
              setStyle count, right: 115 - (12 / 2) + width
              setStyle barFull, width: width
            isOpen = false
            onEvent bar, 'mousemove', ->
              unless isOpen
                setStyle bar, style.progressbarHover
            onEvent bar, 'mouseout', ->
              unless isOpen
                setStyle bar, style.progressbar
            closeProgressBars.push closeBar = ->
              setStyle bar, style.progressbar
              isOpen = false
            onEvent bar, 'click', ->
              if isOpen
                closeBar()
              else
                closeProgressBars.forEach (x) -> x()
                setStyle bar, style.progressbarOpen
                isOpen = true
            classification
          unless i == arr.length - 1
            E style.seperator
        ]

    E style.column,
      E style.descriptionBox,
        E style.descriptionHeader, 'ویژگی‌های کلی تیپ شخصیتی'
        box0 = E style.descriptionItem
      E style.descriptionBox,
        E style.descriptionHeader, 'توصیف شخصیتی و رفتار'
        box1 = E()
       E style.descriptionBox,
        E style.descriptionHeader, 'نقاط قوت'
        box2 = E()
       E style.descriptionBox,
        E style.descriptionHeader, 'نقاط ضعف'
        box3 = E()
       E style.descriptionBox,
        E style.descriptionHeader, 'مشاغل مناسب'
        box4 = E()
       E style.descriptionBox,
        E style.descriptionHeader, 'چند پیشنهاد برای موفقیت بیشتر در محیط کار'
        box5 = E()

  state.user.on ({applicantTestResults}) ->
    return unless applicantTestResults
    applicantTestResults = JSON.parse applicantTestResults
    applicantTestResults.forEach (x, i) ->
      setProgressBars[i] x

    mbti = [
      ['E', 'I']
      ['N', 'S']
      ['F', 'T']
      ['J', 'P']
    ].map ([a, b], i) ->
      if applicantTestResults[2 * i] > applicantTestResults[2 * i + 1] then a else b
    .join ''

    setStyle mbtiDisplay, text: mbti
    setStyle img, src: "assets/img/mbti/#{mbti.toLowerCase()}-personality-type-header.png"
    setStyle subheader, text: 'تیپ شخصیتی، ' +
      (if mbti[0] == 'E' then 'برون‌گرا' else 'درون‌گرا') + ' ' +
      (if mbti[0] == 'N' then 'شهودی' else 'حسی') + ' ' +
      (if mbti[0] == 'F' then 'احساسی' else 'متفکر') + ' ' +
      (if mbti[0] == 'J' then 'قضاوت‌کننده' else 'ملاحظه‌کننده') + ' ' +
      mbti

    setStyle box0, text: data[mbti][0]
    empty [box1, box2, box3, box4, box5]
    append box1, data[mbti][1].map (x) ->
      E style.descriptionItem, x
    append box2, data[mbti][2].map (x) ->
      E style.descriptionItem,
        E style.bullet
        E style.itemText, x
    append box3, data[mbti][3].map (x) ->
      E style.descriptionItem,
        E style.bullet
        E style.itemText, x
    append box4, data[mbti][4].map (x) ->
      E style.descriptionItem,
        E style.bullet
        E style.itemText, x
    append box5, data[mbti][5].map (x) ->
      E style.descriptionItem, x

  view