component = require '../../../../utils/component'
style = require './style'
dropdown = require '../../../../components/dropdown'
dateInput = require '../../../../components/dateInput'
{textIsInSearch, toEnglish, toTimestamp, toDate} = require '../../../../utils'

module.exports = component 'search', ({dom, events, returnObject}) ->
  {E, setStyle, append, empty, destroy, show, hide} = dom
  {onEvent} = events

  changeListener = removeListener = undefined

  isInSearch = -> true

  typeDropdown = E dropdown, items: [0 .. 4], getTitle: (x) ->
    switch x
      when 0
        'نام'
      when 1
        'تاریخ ثبت'
      when 2
        'شغل‌های درخواستی'
      when 3
        'وضعیت'
      when 4
        'یادداشت'
  setStyle typeDropdown, style.inputPlaceholder
  setStyle typeDropdown.input, style.placeholderInput

  view = E margin: 20,
    typeDropdown
    rest = E style.rest
    remove = E style.remove

  typeDropdown.onChange ->
    empty rest
    append rest, switch typeDropdown.value()
      when 0 then do ->
        nameInput = E 'input', style.input
        onEvent nameInput, 'input', -> changeListener?()
        isInSearch = ({firstName, lastName}) ->
          not nameInput.value() || textIsInSearch "#{firstName} #{lastName}", nameInput.value()
        nameInput
      when 1 then do ->
        dateDropdown = E dropdown, items: [0 .. 2], getTitle: (x) ->
          switch x
            when 0
              'بعد از'
            when 1
              'قبل از'
            when 2
              'برابر'
        setStyle dateDropdown, style.inputPlaceholder
        setStyle dateDropdown.input, style.placeholderInput
        _dateInput = E dateInput
        setStyle _dateInput, style.inputPlaceholder
        setStyle _dateInput.input, style.placeholderInput
        dateDropdown.onChange -> changeListener?()
        onEvent _dateInput.input, ['input', 'pInput'], -> changeListener?()
        isInSearch = ({modificationTime}) ->
          unless _dateInput.valid()
            return true
          unless dateDropdown.value()?
            return true
          modificationTime = toTimestamp toDate modificationTime
          time = toTimestamp _dateInput.value()
          switch dateDropdown.value()
            when 0
              modificationTime >= time
            when 1
              modificationTime <= time
            when 2
              modificationTime is time
        [
          dateDropdown
          E style.rest,
            _dateInput
        ]
      when 2 then do ->
        jobsInput = E 'input', style.input
        onEvent jobsInput, 'input', -> changeListener?()
        isInSearch = ({selectedJobsString}) ->
          not jobsInput.value() || textIsInSearch selectedJobsString.toLowerCase(), jobsInput.value()
        jobsInput
      when 3 then do ->
        stateDropdown = E dropdown, items: [0 .. 2], getTitle: (x) ->
          switch x
            when 0
              'ثبت شده'
            when 1
              'در انتظار مصاحبه'
            when 2
              'غیره'
        setStyle stateDropdown, style.inputPlaceholder
        setStyle stateDropdown.input, style.placeholderInput
        stateDropdown.onChange -> changeListener?()
        isInSearch = ->
          unless stateDropdown.value()?
            return true
          switch stateDropdown.value()
            when 0
              true
            else
              false
        stateDropdown
      when 4 then do ->
        notesDropdown = E dropdown, items: [0 .. 1], getTitle: (x) ->
          switch x
            when 0
              'دارد'
            when 1
              'ندارد'
        setStyle notesDropdown, style.inputPlaceholder
        setStyle notesDropdown.input, style.placeholderInput
        notesDropdown.onChange -> changeListener?()
        isInSearch = ->
          unless notesDropdown.value()?
            return true
          switch notesDropdown.value()
            when 0
              true
            when 1
              false
        notesDropdown
    changeListener?()
  onEvent remove, 'click', ->
    destroy view
    removeListener?()

  returnObject
    onChange: (listener) -> changeListener = listener
    onRemove: (listener) -> removeListener = listener
    setRemoveEnabled: (enabled) ->
      if enabled
        show remove
      else
        hide remove
    isInSearch: (entity) ->
      isInSearch? entity

  view