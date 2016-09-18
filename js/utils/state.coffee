log = require('./log').state

createPubSub = ->
  data = dataNotNull = undefined
  subscribers = []
  on: (options, callback) ->

    firstDataSent = false
    unless options.omitFirst
      if not options.allowNull
        if dataNotNull isnt undefined
          callback dataNotNull
          firstDataSent = true
      else
        callback data
        firstDataSent = true

    if options.once and not options.omitFirst and firstDataSent
      return ->

    subscribers.push wrappedCallback = (data) ->
      if not options.allowNull and not data?
        return

      callback data

      if options.once
        unsubscribe()
        
    unsubscribe = ->
      index = subscribers.indexOf wrappedCallback
      if ~index
        subscribers.splice index, 1
        
  set: (_data) ->

    if JSON.stringify(data) is JSON.stringify(_data)
      return

    data = _data
    if data?
      dataNotNull = data

    subscribers.forEach (callback) -> callback data

pubSubs = [
  'user'
].map (x) ->
  x: x
  pubSub: createPubSub()

exports.instance = (thisComponent) ->

  exports = {}

  pubSubs.forEach ({x, pubSub}) ->

    l = log.pubsub thisComponent, x
    
    instancePubSub = {}

    instancePubSub.on = ->

      if arguments.length is 1
        [callback] = arguments
        options = {}
      else
        [options, callback] = arguments

      ll = l.on options, callback

      ll 0
      unsubscribe = pubSub.on options, (data) ->
        ll 1, data
        callback data
        ll 1, data
      ll 0
      unsubscribe = do (unsubscribe) -> ->
        ll 2
        unsubscribe()
        ll 2
      prevOff = thisComponent.off
      thisComponent.off = ->
        prevOff()
        unsubscribe()
      unsubscribe

    instancePubSub.set = (data) ->
      ll = l.set data
      ll()
      pubSub.set data
      ll()

    exports[x] = instancePubSub

  exports.all = ->

    if arguments.length is 2
      [keys, callback] = arguments
      options = {}
    else
      [options, keys, callback] = arguments

    l = log.all thisComponent, options, keys, callback

    resolved = {}
    values = {}
    l 0
    unsubscribes = keys.map (key) ->
      exports[key].on options, (x) ->
        resolved[key] = true
        values[key] = x
        if (keys.every (keys) -> resolved[keys])
          data = keys.map (key) -> values[key]
          l 1
          callback data
          l 1
    l 0

    unsubscribe = ->
      l 2
      unsubscribes.forEach (unsubscribe) -> unsubscribe()
      l 2

    prevOff = thisComponent.off
    thisComponent.off = ->
      prevOff()
      unsubscribe()

    unsubscribe

  exports