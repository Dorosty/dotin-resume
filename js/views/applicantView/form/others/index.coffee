component = require '../../../../utils/component'
part0 = require './part0'
part1 = require './part1'
part2 = require './part2'
part3 = require './part3'
part4 = require './part4'
part5 = require './part5'

module.exports = component 'applicantFormOthers', ({dom}, {setData, setError}) ->
  {E} = dom

  E null,
    E part0, {setData, setError}
    E part1, {setData}
    E part2, {setData, setError}
    E part3, {setData}
    E part4, {setData}
    E part5, {setData, setError}
