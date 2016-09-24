{textIsInSearch} = require '../../utils'

exports.create = ({components, variables, dom}) ->
  {input, itemsList} = components
  {setStyle} = dom

  functions =
    updateList: ->
      value = input.value()
      unless value.trim()
        filteredItems = if variables.showEmpty then [-1].concat variables.items else variables.items
      else
        filteredItems = variables.items.filter (item) -> textIsInSearch functions.getTitle(item), value
      itemsList.set filteredItems
      filteredItems.length

    setIndex: ->
      if variables.selectedId
        index = (variables.items.map (item) -> String functions.getId item).indexOf variables.selectedId
        if ~index
          if variables.showEmpty
            itemsList.setIndex index + 1
          else
            itemsList.setIndex index
        else
          itemsList.setIndex 0
      else
        itemsList.setIndex 0

    updateDropdown: ->
      unless document.activeElement is input
        unless functions.updateList()
          if variables.showEmpty or not variables.items.length
            setStyle input, englishValue: ''
          else
            setStyle input, englishValue: functions.getTitle variables.items[0] or ''
          functions.updateList()