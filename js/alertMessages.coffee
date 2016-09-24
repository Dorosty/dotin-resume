service = require './utils/service'
alert = require './singletons/alert'
{uppercaseFirst} = require './utils'

addMessage = service.extendModule (exports) ->
  addMessageLastRequestQ = undefined
  (name, {success, failure}) ->
    prev = exports[name]
    exports[name] = (args...) ->
      addMessageLastRequestQ = addMessageRequestQ = prev args...
      .then (x) ->
        if success
          if typeof success is 'function'
            alert.instance.show success(e), true
          else
            alert.instance.show success, true
          setTimeout (->
            if addMessageLastRequestQ is addMessageRequestQ
              alert.instance.hide()
          ), 3000
        return x
      .catch (e) ->
        if failure
          if typeof failure is 'function'
            alert.instance.show failure(e), false
          else
            alert.instance.show failure, false
          setTimeout (->
            if addMessageLastRequestQ is addMessageRequestQ
              alert.instance.hide()
          ), 3000
        throw e

exports.do = ->
  addMessage 'login', success: 'خوش آمدید.'
  [
    {name:'person', persianName: 'شخص'}
  ].forEach ({name, persianName}) ->
    addMessage "create#{uppercaseFirst(name)}", success: "#{persianName} با موفقیت ایجاد شد."
    addMessage "update#{uppercaseFirst(name)}", success: "تغییرات #{persianName} با موفقیت ذخیره شد."
    addMessage "delete#{uppercaseFirst(name)}", success: "#{persianName} با موفقیت حذف شد."