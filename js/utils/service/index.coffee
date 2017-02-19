Q = require '../../q'
ex = require './ex'
{gets, posts, others} = require './names'
{get, post} = require './getPost'
log = require('../log').service

exports.instance = (thisComponent) ->
  exports = {}

  gets.concat(posts).concat(others).forEach (x) ->
    exports[x] = (params...) ->
      l = log.get thisComponent, x, params
      l()
      ex[x] params...
      .then (data) ->
        l data
        data
      .catch (e) ->
        console.log e
        throw e

  exports

exports.extendModule = (fn) ->
  fn ex

exports.getUser = ->
  get 'getUser'

exports.autoPing = ->
  do fn = ->
    Q.all [get('ping').catch(->), Q.delay 5000]
    .fin ->
      setTimeout fn