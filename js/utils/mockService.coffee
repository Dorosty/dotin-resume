Q = require '../q'

exports.login = ({email, password}) ->
  Q.delay 1000 + 2000 * Math.floor Math.random()
  .then ->
    switch email
      when 'ma.dorosty@gmail.com'
        return name: 'Ali Dorosty'
      else
        return invalid: true