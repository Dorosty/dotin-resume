component = require '../../../../utils/component'
style = require './style'
dropdown = require '../../../../components/dropdown'
numberInput = require '../../../../components/restrictedInput/number'
{remove} = require '../../../../utils'

module.exports = component 'applicantFormTalents', ({dom, events}, setData) ->
  {E, setStyle, empty, append} = dom
  {onEvent} = events

  table0 = do ->

    rows = []

    dropdowns = [0 .. 1].map ->
      f = E dropdown
      f.update ['کم', 'متوسط', 'زیاد']
      f.showEmpty true
      setStyle f.input, style.input
      f

    lastLine = E 'tr', null,
      E 'td', style.td,
        i0 = E 'input', style.input
      E 'td', style.td,
        i1 = dropdowns[0]
      E 'td', style.td,
        i2 = dropdowns[1]
      E 'td', style.td,
        add = E style.add

    view = E 'table', null,
      E 'thead', null,
        E 'tr', null,
          E 'th', style.th, 'شایستگی / مهارت'
          E 'th', style.th, 'علاقه به کار در این حوزه'
          E 'th', style.th, 'دانش و مهارت در این حوزه'
          E 'th', style.th
      body = E 'tbody', null,
        lastLine

    update = ->    
      empty body
      append body, rows.map (row) ->
        [v0, v1, v2] = row
        E 'tr', null,
          E 'td', style.td, v0
          E 'td', style.td, v1
          E 'td', style.td, v2
          E 'td', style.td, do ->
            removeRow = E style.remove
            onEvent removeRow, 'click', ->
              remove rows, row
              update()
            removeRow
      append body, lastLine
    onEvent add, 'click', ->
      rows.push [i0, i1, i2].map (i) -> if ~i.value() then i.value() else ''
      update()
      setStyle [i0, i1.input, i2.input], value: ''

    view

  table1 = do ->

    rows = []

    lastLine = E 'tr', null,
      E 'td', style.td,
        i0 = E 'input', style.input
      E 'td', style.td,
        i1 = E 'input', style.input
      E 'td', style.td,
        i2 = do ->
          i2 = E numberInput
          setStyle i2, style.input
          i2
      E 'td', style.td,
        add = E style.add

    view = E 'table', null,
      E 'thead', null,
        E 'tr', null,
          E 'th', style.th, 'دوره'
          E 'th', style.th, 'برگزار کننده'
          E 'th', style.th, 'سال'
          E 'th', style.th
      body = E 'tbody', null,
        lastLine

    update = ->    
      empty body
      append body, rows.map (row) ->
        [v0, v1, v2] = row
        E 'tr', null,
          E 'td', style.td, v0
          E 'td', style.td, v1
          E 'td', style.td, v2
          E 'td', style.td, do ->
            removeRow = E style.remove
            onEvent removeRow, 'click', ->
              remove rows, row
              update()
            removeRow
      append body, lastLine
    onEvent add, 'click', ->
      rows.push [i0, i1, i2].map (i) -> if ~i.value() then i.value() else ''
      update()
      setStyle [i0, i1, i2], value: ''

    view

  E null,
    table0
    table1
    E style.column,
      E style.label, 'نکات تکمیلی قابل ذکر در دوره‌های آموزشه گذرانده شده:'
      E 'textarea', style.textarea
    E style.column,
      E style.label, 'آثار علمی و عضویت در انجمن‌ها:'
      E 'textarea', style.textarea
    E style.clearfix