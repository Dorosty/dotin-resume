log = require('./log').state

createPubSub = (name) ->
  data = dataNotNull = dataNotLoading = dataNotNullNotLoading = undefined
  subscribers = []
  on: (options, callback) ->

    firstDataSent = false
    unless options.omitFirst
      if not options.allowNull and not options.allowLoading
        if dataNotNullNotLoading isnt undefined
          callback dataNotNullNotLoading
          firstDataSent = true
      else unless options.allowNull
        if dataNotNull isnt undefined
          callback dataNotNull
          firstDataSent = true
      else unless options.allowLoading
        callback dataNotLoading
        firstDataSent = true
      else
        callback data
        firstDataSent = true

    if options.once and not options.omitFirst and firstDataSent
      return ->

    subscribers.push wrappedCallback = (data) ->
      unsubscribe = ->
        index = subscribers.indexOf wrappedCallback
        if ~index
          subscribers.splice index, 1

      if not options.allowNull and not data?
        return

      if not options.allowLoading and data?.loading
        return

      callback data

      if options.once
        unsubscribe()
        
      unsubscribe
        
  set: set = (_data) ->

    if JSON.stringify(data) is JSON.stringify(_data)
      return

    data = _data
    if data?
      dataNotNull = data
    unless data?.loading
      dataNotLoading = data
    if data? and not data.loading
      dataNotNullNotLoading = data

    if data?.then?
      set loading: true
      data.then set
    else
      subscribers.forEach (callback) -> callback data

exports.instance = (thisComponent) ->

  exports = {}

  [
  ].forEach (x) ->
    pubSub = createPubSub x
    prevOn = pubSub.on
    prevSet = pubSub.set

    l = log.pubsub thisComponent, x, options, callback

    pubSub.on = ->

      if arguments.length is 1
        [callback] = arguments
        options = {}
      else
        [options, callback] = arguments

      l 0
      unsubscribe = prevOn options, (data) ->
        l 1, data
        callback data
        l 1, data
      l 0
      unsubscribe = do (unsubscribe) ->
        l 2
        unsubscribe()
        l 2
      prevOff = thisComponent.off
      thisComponent.off = ->
        prevOff()
        unsubscribe()
      unsubscribe

    pubSub.set = (data) ->
      l 4 
      prevSet data
      l 4

    exports[x] = pubSub

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

    thisComponent.off = ->
      prevOff()
      unsubscribe()

    unsubscribe

  exports