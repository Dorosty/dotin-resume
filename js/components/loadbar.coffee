component = require '../utils/component'

module.exports = component 'loadbar', ({dom, returnObject}, style = {}) ->
  {E, setStyle} = dom

  c = E style,
    bar = E backgroundColor: '#449e73', position: 'absolute', top: 0, right: 0, height: 5, width: '0%'

  returnObject
    reset: ->
      setStyle bar, width: "0%"
    set: (percent) ->
      if percent?
        setStyle bar, width: "#{percent}%"
      setStyle bar, width: '50%'

  c