component = require '../../../utils/component'
{remove} = require '../../../utils'

module.exports = component 'applicantFormSection', ({dom, events}, {title, getContents}) ->
  {E, text, show, hide, append, destroy} = dom
  {onEvent} = events

  view = E class: 'row', margin: '50px 0',
    E 'h5', null, title
    contents = E()
    add = E class: 'btn btn-sm btn-primary',
      E class: 'fa fa-plus', marginLeft: 10
      text 'افزودن یک آیتم دیگر'

  deletes = []

  setDeletesVisible = ->
    if deletes.length > 1
      show deletes
    else
      hide deletes

  do addContents = ->
    append contents, item = E class: 'well well-sm', position: 'relative', paddingBottom: 35,
      getContents()
      do ->
        button = E class: 'btn btn-sm btn-danger', position: 'absolute', bottom: 10, left: 10, 'حذف'
        onEvent button, 'click', ->
          destroy item
          remove deletes, button
          setDeletesVisible()
        deletes.push button
        button
    setDeletesVisible()

  onEvent add, 'click', addContents

  view