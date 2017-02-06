component = require '../../../utils/component'
style = require './style'
jalali = require '../../../jalali'

getPrevMonth = (year, month) ->
  if month is 1
    year--
    month = 12
  else
    month--
  {year, month}
getNextMonth = (year, month) ->
  if month is 12
    year++
    month = 1
  else
    month++
  {year, month}

module.exports = component 'calendar', ({dom, events, returnObject}, textbox) ->
  {E, setStyle, append, empty} = dom
  {onEvent} = events

  date = new Date()
  year = date.getYear() + 1900
  month = date.getMonth() + 1
  date = date.getDate()
  {jy: year, jm: month, jd: date} = jalali.toJalaali year, month, date
  [displayYear, displayMonth] = [year, month]

  calendar = E style.calendar,
    nextYear = E style.nextYear, '››'
    nextMonth = E style.nextMonth, '›'
    headerText = E style.headerText
    prevMonth = E style.prevMonth, '‹'
    prevYear = E style.prevYear, '‹‹'
    E direction: 'rtl',
      ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map (day, i) ->
        cell = E style.dayCell, day
        # if i is 0
        #   setStyle cell, marginRight: -1
        cell
      dateCells = E()

  gotoMonth = (y, m) ->
    [displayYear, displayMonth] = [y, m]
    setStyle headerText, text: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'][displayMonth - 1] + ' ' + displayYear
    monthLength = jalali.jalaaliMonthLength displayYear, displayMonth
    {year: py, month: pm} = getPrevMonth displayYear, displayMonth
    {year: ny, month: nm} = getNextMonth displayYear, displayMonth
    prevMonthLength = jalali.jalaaliMonthLength py, pm
    {gy, gm, gd} = jalali.toGregorian displayYear, displayMonth, 1
    day = new Date(gy, gm - 1, gd).getDay() + 1
    empty dateCells
    append dateCells, [prevMonthLength - day + 1 .. prevMonthLength].map (date) ->
      cell = E style.grayCell, date
      # if date is prevMonthLength - day + 1
      #   setStyle cell, marginRight: -1
      onEvent cell, 'click', ->
        gotoDate py, pm, date
      cell
    selectedDate = date
    append dateCells, [1 .. monthLength].map (date) ->
      cell = E style.cell, date
      # if ((day + date) % 7) is 1
      #   setStyle cell, marginRight: -1
      if selectedDate is date && month is displayMonth && year is displayYear
        setStyle cell, style.todayCell
      onEvent cell, 'click', ->
        gotoDate displayYear, displayMonth, date
      cell
    append dateCells, [1 .. 42 - monthLength - day].map (date) ->
      cell = E style.grayCell, date
      # if ((day + date + monthLength) % 7) is 1
      #   setStyle cell, marginRight: -1
      onEvent cell, 'click', ->
        gotoDate ny, nm, date
      cell

  gotoDate = (y, m, d, omitTextbox) ->
    [year, month, date] = [y, m, d]
    gotoMonth year, month
    unless omitTextbox
      setStyle textbox, value: "#{year}/#{month}/#{date}"

  gotoDate year, month, date, true

  onEvent prevYear, 'click', -> gotoMonth displayYear - 1, displayMonth
  onEvent nextYear, 'click', -> gotoMonth displayYear + 1, displayMonth
  onEvent prevMonth, 'click', ->
    {year: y, month: m} = getPrevMonth displayYear, displayMonth
    gotoMonth y, m
  onEvent nextMonth, 'click', ->
    {year: y, month: m} = getNextMonth displayYear, displayMonth
    gotoMonth y, m

  returnObject {gotoDate}

  calendar
