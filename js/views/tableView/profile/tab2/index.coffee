component = require '../../../../utils/component'
style = require './style'
data = require '../../../applicantView/tests/results/data'
{extend} = require '../../../../utils'

module.exports = component 'tab2', ({dom, events}, {applicant}) ->
  {E, setStyle} = dom

  return E() unless applicant.applicantTestResults

  {onEvent} = events

  {applicantTestResults} = applicant
  applicantTestResults = JSON.parse applicantTestResults

  mbti = [
    ['E', 'I']
    ['N', 'S']
    ['F', 'T']
    ['J', 'P']
  ].map ([a, b], i) ->
    if applicantTestResults[2 * i] > applicantTestResults[2 * i + 1] then a else b
  .join ''

  closeProgressBars = []
  setProgressBars = []

  applicantTestResults.forEach (x, i) ->
    setTimeout -> setProgressBars[i] x

  E style.view,
    E style.column,
      E 'img', extend {src: "assets/img/mbti/#{mbti.toLowerCase()}-personality-type-header.png"}, style.img
      # E extend {englishText: 'تصویر از سایت 16personalities.com'}, style.imgSource
      E style.header, 'نتیجه آزمون'
        E style.subHeader, (
          'تیپ شخصیتی، ' +
          (if mbti[0] == 'E' then 'برون‌گرا' else 'درون‌گرا') + ' ' +
          (if mbti[0] == 'N' then 'شهودی' else 'حسی') + ' ' +
          (if mbti[0] == 'F' then 'احساسی' else 'متفکر') + ' ' +
          (if mbti[0] == 'J' then 'قضاوت‌کننده' else 'ملاحظه‌کننده') + ' ' +
          mbti
        )
      E style.mbtiDisplay, mbti
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
        E style.descriptionItem, data[mbti][0]
      E style.descriptionBox,
        E style.descriptionHeader, 'توصیف شخصیتی و رفتار'
        data[mbti][1].map (x) ->
          E style.descriptionItem, x
       E style.descriptionBox,
        E style.descriptionHeader, 'نقاط قوت'
        data[mbti][2].map (x) ->
          E style.descriptionItem,
            E style.bullet
            E style.itemText, x
       E style.descriptionBox,
        E style.descriptionHeader, 'نقاط ضعف'
        data[mbti][3].map (x) ->
          E style.descriptionItem,
            E style.bullet
            E style.itemText, x
       E style.descriptionBox,
        E style.descriptionHeader, 'مشاغل مناسب'
        data[mbti][4].map (x) ->
          E style.descriptionItem,
            E style.bullet
            E style.itemText, x
       E style.descriptionBox,
        E style.descriptionHeader, 'چند پیشنهاد برای موفقیت بیشتر در محیط کار'
        data[mbti][5].map (x) ->
          E style.descriptionItem, x
