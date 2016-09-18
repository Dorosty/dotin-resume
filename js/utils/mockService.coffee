Q = require '../q'
service = require './service'

service.login = ({email, password}) ->
  switch email
    when 'ma.dorosty@gmail.com'
      return name: 'Ali Dorosty'
    else
      return invalid: true

Object.keys(service).forEach (key) ->
  prev = service[key]
  service[key] = (args...) ->
    Q.delay 1000 + 2000 * Math.floor Math.random()
    .then ->
      prev args...