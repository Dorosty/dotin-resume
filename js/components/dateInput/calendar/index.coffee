component = require '../../../utils/component'
jalali = require '../../../jalali'
{extend} = require '../../../utils'

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

module.exports = component 'calendar', ({dom, events}, textbox) ->
  {E, setStyle, append, empty} = dom
  {onEvent} = events

  date = new Date()
  year = date.getYear() + 1900
  month = date.getMonth() + 1
  date = date.getDate()
  {jy: year, jm: month, jd: date} = jalali.toJalaali year, month, date
  [displayYear, displayMonth] = [year, month]

  boxStyle = width: 40, height: 40, lineHeight: 40, textAlign: 'center'
  cellStyle = extend {display: 'inline-block', border: '1px solid #41698a', marginLeft: -1, marginBottom: -1}, boxStyle
  chevronStyle = position: 'absolute', cursor: 'pointer', top: 7, color: '#aaa', width: 40, height: 30, lineHeight: 30, fontSize: 25
  calendar = E calendarStyle = position: 'absolute', fontSize: 20, width: 7 * cellStyle.width + 6, height: 8 * cellStyle.width + 17, border: '1px solid transparent', cursor: 'default',
    nextYear = E extend({left: 0, textAlign: 'left'}, chevronStyle), '‹‹'
    nextMonth = E extend({left: 30, textAlign: 'left'}, chevronStyle), '‹'
    headerText = E marginTop: 10, width: '100%', height: 30, lineHeight: 30, textAlign: 'center', color: '#41698a'
    prevMonth = E extend({right: 30, textAlign: 'right'}, chevronStyle), '›'
    prevYear = E extend({right: 0, textAlign: 'right'}, chevronStyle), '››'
    E direction: 'rtl',
      E extend({marginRight: -1, backgroundColor: '#41698a', color: 'white'}, cellStyle), 'ش'
      ['ی', 'د', 'س', 'چ', 'پ', 'ج'].map (day, i) ->
        E extend({backgroundColor: '#41698a', color: 'white'}, cellStyle), day
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
      cell = E extend({color: '#ccc', cursor: 'pointer'}, cellStyle), date
      if date is prevMonthLength - day + 1
        setStyle cell, marginRight: -1
      onEvent cell, 'click', ->
        gotoDate py, pm, date
      cell
    selectedDate = date
    append dateCells, [1 .. monthLength].map (date) ->
      cell = E extend({color: '#41698a', cursor: 'pointer'}, cellStyle), date
      if ((day + date) % 7) is 1
        setStyle cell, marginRight: -1
      if selectedDate is date && month is displayMonth && year is displayYear
        setStyle cell, backgroundColor: '#ff6b6b'        
      onEvent cell, 'click', ->
        gotoDate displayYear, displayMonth, date
      cell
    append dateCells, [1 .. 42 - monthLength - day].map (date) ->
      cell = E extend({color: '#ccc', cursor: 'pointer'}, cellStyle), date
      if ((day + date + monthLength) % 7) is 1
        setStyle cell, marginRight: -1
      onEvent cell, 'click', ->
        gotoDate ny, nm, date
      cell

  gotoDate = (y, m, d) ->
    [year, month, date] = [y, m, d]
    gotoMonth year, month
    setStyle textbox, value: "#{year}/#{month}/#{date}"

  gotoDate year, month, date

  onEvent prevYear, 'click', -> gotoMonth displayYear - 1, displayMonth
  onEvent nextYear, 'click', -> gotoMonth displayYear + 1, displayMonth
  onEvent prevMonth, 'click', ->
    {year: y, month: m} = getPrevMonth displayYear, displayMonth
    gotoMonth y, m
  onEvent nextMonth, 'click', ->
    {year: y, month: m} = getNextMonth displayYear, displayMonth
    gotoMonth y, m

  calendar