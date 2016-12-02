{toPersian, textIsInSearch} = require '../../utils'

exports.create = ({components, variables, dom, args}) ->
  {input, itemsList} = components
  {setStyle} = dom

  {getId = ((x) -> x), getTitle = ((x) -> x), sortCompare = ((a, b) -> a)} = args

  functions =
    sortCompare: sortCompare

    getId: (x) ->
      if x is -1
        -1
      else
        getId x

    getTitle: (x) ->
      if x is -1
        ''
      else if variables.english
        getTitle x
      else
        toPersian getTitle x

    setInputValue: (value) ->
      if variables.english
        setStyle input, englishValue: value
      else
        setStyle input, value: value

    getFilteredItems: ->
      variables.allItems.filter (item) -> item isnt -1 and textIsInSearch functions.getTitle(item), input.value()

    updateDropdown: (force) ->
      if force or document.activeElement isnt input.fn.element
        if variables.selectedId?
          selectedItem = variables.allItems.filter((i) -> String(functions.getId(i)) is String variables.selectedId)[0]
          if selectedItem?
            functions.setInputValue functions.getTitle selectedItem
          else
            functions.setInputValue ''
        else if variables.showEmpty
          functions.setInputValue ''
        else
          filteredItems = functions.getFilteredItems()
          if filteredItems.length
            functions.setInputValue functions.getTitle filteredItems[0]
          else
            functions.setInputValue ''
        itemsList.set functions.getFilteredItems()

    select: (item) ->
      variables.selectedId = String functions.getId item
      itemsList.hide()
      functions.updateDropdown true

    showEmpty: (showEmpty) ->
      variables.showEmpty = showEmpty
      functions.update variables.items
    update: (items) ->
      variables.items = items
      if variables.showEmpty
        variables.allItems = [-1].concat items
      else
        variables.allItems = items
      functions.updateDropdown()
    reset: ->
      variables.selectedId = null
      variables.manuallySelected = false
      functions.setInputValue ''
      functions.updateDropdown()
    setSelectedId: (id) ->
      unless variables.manuallySelected
        variables.selectedId = String id
        functions.updateDropdown()
    undirty: ->
      variables.manuallySelected = false
    value: ->
      itemsList.value() ? -1