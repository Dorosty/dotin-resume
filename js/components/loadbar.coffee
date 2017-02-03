component = require '../utils/component'

module.exports = component 'loadbar', ({dom, returnObject}, style = {}) ->
  {E, setStyle} = dom

  c = E style,
    bar = E backgroundColor: '#449e73', position: 'absolute', top: 0, right: 0, height: 5, width: '0%'

  atMiddle = false

  returnObject
    set: (percent) ->
      if percent?
        setStyle bar, width: "#{percent}%"
      else
        if atMiddle
          setStyle bar, width: '100%'
        else
          setStyle bar, width: '50%'
        atMiddle = !atMiddle

  c