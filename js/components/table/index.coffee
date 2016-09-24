#### test

  #   E class: 'row',
  #     E marginTop: 20,
  #       do ->
  #         selectAll = E class: 'btn btn-default', marginLeft: 20, 'انتخاب همه سطرها'
  #         onEvent selectAll, 'click', -> tableE.fn.selectAll()
  #         selectAll
  #       text 'سطرهای انتخاب شده: '
  #       selectedResults = E display: 'inline-block'
  #     tableE = E table,
  #       headerNames: ['ستون اول', 'ستون دوم', 'ستون سوم', 'ستون چهارم']
  #       itemKeys: ['a', 'b', 'c', 'd']
  #       wrapperStyle: marginTop: 30
  #       onSelectedItemsChanged: (selectedItems) ->
  #         setStyle selectedResults, text: selectedItems.map(({id}) -> id).join ','
  #       onDataGetter: (callback) ->
  #         callback -> [
  #           {id: 1, a: 'مقدار اول', b: 'مقدار اول', c: 'مقدار اول', d: 'مقدار اول'}
  #           {id: 2, a: 'مقدار دوم', b: 'مقدار دوم', c: 'مقدار دوم', d: 'مقدار دوم'}
  #           {id: 3, a: 'مقدار سوم', b: 'مقدار سوم', c: 'مقدار سوم', d: 'مقدار سوم'}
  #           {id: 4, a: 'مقدار چهارم', b: 'مقدار چهارم', c: 'مقدار چهارم', d: 'مقدار چهارم'}
  #           {id: 5, a: 'مقدار پنجم', b: 'مقدار پنجم', c: 'مقدار پنجم', d: 'مقدار پنجم'}
  #           {id: 6, a: 'مقدار ششم', b: 'مقدار ششم', c: 'مقدار ششم', d: 'مقدار ششم'}
  #         ]


component = require '../utils/component'
style = require './tableStyle'
Q = require '../q'
modal = require '../modal'
{collection, compare, remove} = require '../utils'

module.exports = component 'table', ({dom, events, setOff, returnObject}, {notStriped, onSelectedItemsChanged, headerNames, itemKeys, sortData, onDataGetter, selectRow, deleteItem, deleteText, searchBoxes = [], wrapperStyle = null}) ->
  {E, destroy, append, setStyle, show, hide, addClass, removeClass} = dom
  {onEvent} = events

  arrows = []
  selectedItems = []
  selectRows = []
  sort = getData = undefined

  table = E position: 'relative',
    noData = E wrapperStyle, 'در حال بارگزاری...'
    hide yesData = E wrapperStyle,
      E 'table', class: 'table table-bordered ' + (unless notStriped then 'table-striped' else ''),
        E 'thead', null,
          E 'tr', null,
            if onSelectedItemsChanged
              E 'th', width: 20
            headerNames.map (headerName, index) ->
              th = E 'th', style.th,
                arrow = E style.arrow
                if searchBoxes.length
                  [
                    E style.headerWithSearchBox, headerName
                    searchBoxes[index]
                  ]
                else
                  E 'span', cursor: 'pointer', headerName

              arrows.push arrow

              if (sortData or itemKeys)?[index]

                key = (sortData or itemKeys)[index]

                if sort and (sort.key is key or sort.name is key.name)
                  if sort.direction is 'up'
                    setStyle arrow, class: 'fa fa-caret-up'
                  else
                    setStyle arrow, class: 'fa fa-caret-down'

                onEvent th, 'click', (e) ->
                  return
                  if e.target.tagName.toLowerCase() in ['input', 'select']
                    return

                  arrows.forEach (arrow) ->
                    setStyle arrow, class: ''
                  if sort and (sort.key is key or sort.name is key.name) and sort.direction is 'up'
                    sort.direction = 'down'
                    setStyle arrow, class: 'fa fa-caret-down'
                  else
                    if key.name
                      sort = name: key.name, getValue: key.getValue, direction: 'up'
                    else
                      sort = key: key, direction: 'up'
                    setStyle arrow, class: 'fa fa-caret-up'
                  update()

              return th
            if deleteItem
              E 'th', width: 45
        body = E 'tbody', null
    cover = E style.cover

  doCover = ->
    setStyle cover, style.cover
  do doUncover = ->
    setStyle cover, style.hiddenCover

  deleteRow = (item) ->
    if deleteText
      modal.display
        contents: E 'p', null, deleteText
        submitText: 'حذف'
        submitType: 'danger'
        closeText: 'انصراف'
        submit: ->
          doCover()
          Q deleteItem item
          .fin doUncover
          modal.hide()
    else
      doCover()
      Q deleteItem item
      .fin doUncover

  if selectRow
    selectRow = do (selectRow) -> ->
      Q selectRow.apply null, arguments
      .then ([finishQ]) ->
        doCover()
        Q finishQ
        .fin doUncover

  addRow = (item) ->

    rowElements = {} # row, delete
    rowOffs = [] # {click}, {delete}

    append body, rowElements.row = E 'tr', null,
      if onSelectedItemsChanged
        selectRows.push ->
          checkbox.element.checked = true
          remove selectedItems, item
          selectedItems.push item
          addClass rowElements.row, 'info'
        checkboxTh = E 'th', null,
          checkbox = E 'input', type: 'checkbox'
        onEvent checkbox, 'change', ->
          if checkbox.element.checked
            selectedItems.push item
            addClass rowElements.row, 'info'
          else
            remove selectedItems, item
            removeClass rowElements.row, 'info'
          onSelectedItemsChanged selectedItems
        checkboxTh

      rowElements.children = itemKeys.map (key) ->
        if typeof key is 'string'
          E 'td', cursor: (if selectRow and not item.uneditable then 'pointer' else 'default'), item[key]
        else if typeof key is 'function'
          key item, (E 'td', cursor: (if selectRow and not item.uneditable then 'pointer' else 'default')), (x) -> rowOffs.push x
      if deleteItem and not item.undeleteble
        rowElements.delete = E 'td', cursor: 'pointer', color: 'red', 'حذف'

    if selectRow and not item.uneditable
      onEvent rowElements.row, 'mousemove', ->
        addClass rowElements.row, 'info'
      onEvent rowElements.row, 'mouseout', ->
        removeClass rowElements.row, 'info'

    if selectRow and not item.uneditable
      rowOffs.push onEvent rowElements.row, 'click', rowElements.delete, -> selectRow item
    if deleteItem and not item.undeleteble
      rowOffs.push onEvent rowElements.delete, 'click', -> deleteRow item

    rowOff = -> rowOffs.forEach (x) -> x()

    {rowElements, rowOff}

  removeRow = ({rowElements}) ->
    destroy rowElements.row

  changeRow = (item, {rowElements, rowOff}) ->

    rowOff()
    rowOffs = [] # {click}, {delete}

    itemKeys.forEach (key, index) ->
      if typeof key is 'string'
        setStyle rowElements.children[index], text: item[key]
      else if typeof key is 'function'
        key item, rowElements.children[index], (x) -> rowOffs.push x
    
    if selectRow and not item.uneditable
      rowOffs.push onEvent rowElements.row, 'click', rowElements.delete, -> selectRow item
    if deleteItem and not item.undeleteble
      rowOffs.push onEvent rowElements.delete, 'click', -> deleteRow item

    rowOff = -> rowOffs.forEach (x) -> x()

    {rowElements, rowOff}

  handleRows = collection addRow, removeRow, changeRow

  update = ->
    if getData
      hide noData
      show yesData
      data = getData searchBoxes.map (searchBox) -> (searchBox.value ? searchBox.element.value).toLowerCase()
      if sort
        data = data
        .sort (a, b) ->
          sort = sort
          if sort.getValue
            aValue = sort.getValue a
            bValue = sort.getValue b
          else
            aValue = a[sort.key]
            bValue = b[sort.key]
          if sort.direction is 'up'
            compare aValue, bValue
          else
            compare bValue, aValue
    else 
      data = []
    handleRows data

  setOff onDataGetter (_getData) ->
    getData = _getData
    update()

  searchBoxes.forEach (searchBox) ->
    onEvent searchBox, ['input', 'pInput'], update

  returnObject
    selectAll: ->
      selectRows.forEach (x) -> x()
      onSelectedItemsChanged selectedItems

  table
