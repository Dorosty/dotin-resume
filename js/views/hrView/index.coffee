component = require '../../utils/component'
tableView = require '../tableView'
modal = require '../../singletons/modal'
{generateId} = require '../../utils/dom'

module.exports = component 'hrView', ({dom, events, service}) ->
  {E, text, append} = dom
  {onEvent} = events

  requirements = []
  duties = []

  contents = [
    E class: 'form-group',
      E 'label', for: (titleId = generateId()), 'نام شغل'
      title = E 'input', id: titleId, class: 'form-control'
    E class: 'form-group',
      E 'label', for: (descriptionId = generateId()), 'توضیحات'
      description = E 'textarea', minHeight: 100, maxHeight: 100, id: descriptionId, class: 'form-control'
    E class: 'form-group',
      E 'label', null,
        text 'مهارتهای مورد نیاز'
        addRequirement = E 'i', class: 'fa fa-plus', color: 'green', marginRight: 10, cursor: 'pointer'
      requirementsList = E()
    E class: 'form-group',
      E 'label', null,
        text 'وظایف'
        addDuty = E 'i', class: 'fa fa-plus', color: 'green', marginRight: 10, cursor: 'pointer'
      dutiesList = E()
  ]

  onEvent addRequirement, 'click', ->
    requirements.push input = E 'input', class: 'form-control'
    onEvent input, 'input', setEnabled
    group = E class: 'form-group', input
    append requirementsList, group
    input.focus()

  onEvent addDuty, 'click', ->
    duties.push input = E 'input', class: 'form-control'
    onEvent input, 'input', setEnabled
    group = E class: 'form-group', input
    append dutiesList, group
    input.focus()

  onEvent [title, description], 'input', setEnabled = ->
    modal.instance.setEnabled title.value() and
    description.value() and
    requirements.length and
    duties.length and
    requirements.every((x) -> x.value()) and
    duties.every((x) -> x.value())

  submit = ->
    service.addJob
      title: title.value()
      description: description.value()
      requirements: requirements.map (x) -> x.value()
      duties: duties.map (x) -> x.value()

  E tableView, addJob: ->
    modal.instance.display {
      autoHide: true
      title: 'ثبت درخواست شغلی'
      submitText: 'ثبت'
      closeText: 'لغو'
      contents
      submit
    }
    setEnabled()
