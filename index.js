(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
var addMessage, alert, service, uppercaseFirst,
  slice = [].slice;

service = require('./utils/service');

alert = require('./singletons/alert');

uppercaseFirst = require('./utils').uppercaseFirst;

addMessage = service.extendModule(function(exports) {
  var addMessageLastRequestQ;
  addMessageLastRequestQ = void 0;
  return function(name, arg) {
    var failure, prev, success;
    success = arg.success, failure = arg.failure;
    prev = exports[name];
    return exports[name] = function() {
      var addMessageRequestQ, args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return addMessageLastRequestQ = addMessageRequestQ = prev.apply(null, args).then(function(x) {
        if (success) {
          if (typeof success === 'function') {
            alert.instance.show(success(e), true);
          } else {
            alert.instance.show(success, true);
          }
          setTimeout((function() {
            if (addMessageLastRequestQ === addMessageRequestQ) {
              return alert.instance.hide();
            }
          }), 3000);
        }
        return x;
      })["catch"](function(e) {
        if (failure) {
          if (typeof failure === 'function') {
            alert.instance.show(failure(e), false);
          } else {
            alert.instance.show(failure, false);
          }
          setTimeout((function() {
            if (addMessageLastRequestQ === addMessageRequestQ) {
              return alert.instance.hide();
            }
          }), 3000);
        }
        throw e;
      });
    };
  };
});

exports["do"] = function() {
  return [
    {
      name: 'person',
      persianName: 'شخص'
    }
  ].forEach(function(arg) {
    var name, persianName;
    name = arg.name, persianName = arg.persianName;
    addMessage("create" + (uppercaseFirst(name)), {
      success: persianName + " با موفقیت ایجاد شد."
    });
    addMessage("update" + (uppercaseFirst(name)), {
      success: "تغییرات " + persianName + " با موفقیت ذخیره شد."
    });
    return addMessage("delete" + (uppercaseFirst(name)), {
      success: persianName + " با موفقیت حذف شد."
    });
  });
};


},{"./singletons/alert":23,"./utils":29,"./utils/service":35}],3:[function(require,module,exports){
var component, extend, style;

component = require('../../utils/component');

style = require('./style');

extend = require('../../utils').extend;

module.exports = component('checkbox', function(arg, text) {
  var E, changeListener, checkbox, checked, dom, events, onEvent, returnObject, setStyle, view;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  E = dom.E, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  changeListener = void 0;
  checked = false;
  view = E(style.view, checkbox = E(style.checkbox), E(style.text, text));
  onEvent(view, 'click', function() {
    checked = !checked;
    if (checked) {
      setStyle(checkbox, style.checkboxChecked);
    } else {
      setStyle(checkbox, style.checkbox);
    }
    return typeof changeListener === "function" ? changeListener() : void 0;
  });
  returnObject({
    value: function() {
      return checked;
    },
    onChange: function(listener) {
      return changeListener = listener;
    }
  });
  return view;
});


},{"../../utils":29,"../../utils/component":25,"./style":4}],4:[function(require,module,exports){
exports.view = {
  cursor: 'pointer'
};

exports.text = {
  fontSize: 12,
  fontWeight: 'bold',
  color: '#5c5555',
  display: 'inline-block'
};

exports.checkbox = {
  display: 'inline-block',
  "class": 'fa fa-check',
  margin: 4,
  marginLeft: 10,
  width: 15,
  height: 15,
  borderRadius: 2,
  transition: '0.2s',
  backgroundColor: '#ddd',
  color: '#ddd'
};

exports.checkboxChecked = {
  backgroundColor: '#449e73',
  color: 'white'
};


},{}],5:[function(require,module,exports){
var component, style, toEnglish;

component = require('../../utils/component');

style = require('./style');

toEnglish = require('../../utils').toEnglish;

module.exports = component('restrictedInput', function(arg) {
  var E, dom, events, input, onEvent, prevValue, returnObject, setStyle, view;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  E = dom.E, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  view = E(style.view, input = E('input', style.input), E('i', style.calendar));
  prevValue = '';
  onEvent(input, 'input', function() {
    var parts, valid, value;
    value = toEnglish(input.value());
    parts = value.split('/');
    valid = (function() {
      switch (parts.length) {
        case 1:
          return /^(1?|13[0-9]?[0-9]?)$/.test(parts[0]);
        case 2:
          return /^13[0-9][0-9]$/.test(parts[0]) && /^([1-9]?|1[0-2])$/.test(parts[1]);
        case 3:
          return /^13[0-9][0-9]$/.test(parts[0]) && /^([1-9]|1[0-2])$/.test(parts[1]) && /^([1-9]?|[1-2][0-9]|3[0-1])$/.test(parts[2]);
      }
    })();
    if (valid) {
      prevValue = value;
    } else {
      value = prevValue;
    }
    return setStyle(input, {
      value: value
    });
  });
  returnObject({
    input: input,
    value: function() {
      return input.value();
    }
  });
  return view;
});


},{"../../utils":29,"../../utils/component":25,"./style":6}],6:[function(require,module,exports){
exports.view = {
  position: 'relative'
};

exports.input = {
  placeholder: '----/--/--',
  direction: 'ltr'
};

exports.calendar = {
  "class": 'fa fa-calendar',
  position: 'absolute',
  top: 8,
  left: 8,
  cursor: 'pointer',
  color: 'gray'
};


},{}],7:[function(require,module,exports){
var style;

style = require('./style');

exports["do"] = function(arg) {
  var arrow, components, dom, events, functions, input, itemsList, onEnter, onEvent, prevInputValue, setStyle, variables;
  components = arg.components, variables = arg.variables, functions = arg.functions, dom = arg.dom, events = arg.events;
  input = components.input, arrow = components.arrow, itemsList = components.itemsList;
  setStyle = dom.setStyle;
  onEvent = events.onEvent, onEnter = events.onEnter;
  onEvent([input, arrow], 'mouseover', function() {
    return setStyle(arrow, style.arrowHover);
  });
  onEvent([input, arrow], 'mouseout', function() {
    return setStyle(arrow, style.arrow);
  });
  onEvent(arrow, 'click', function() {
    return input.focus();
  });
  onEvent(input, ['click', 'focus'], function() {
    input.select();
    variables.manuallySelected = true;
    itemsList.set(variables.allItems);
    return itemsList.show();
  });
  onEvent(input, 'blur', function() {
    return setTimeout(function() {
      return setTimeout(function() {
        return setTimeout(function() {
          return setTimeout(function() {
            return setTimeout(function() {
              return itemsList.hide();
            });
          });
        });
      });
    });
  });
  onEvent(input, 'keydown', function(e) {
    var code;
    code = e.keyCode || e.which;
    switch (code) {
      case 40:
        return itemsList.goDown();
      case 38:
        return itemsList.goUp();
    }
  });
  onEnter(input, function() {
    itemsList.select();
    return input.blur();
  });
  prevInputValue = '';
  return onEvent(input, 'input', function() {
    variables.manuallySelected = true;
    if (!variables.english) {
      setStyle(input, {
        value: input.value()
      });
    }
    if (functions.getFilteredItems().length) {
      prevInputValue = input.value();
    } else {
      setStyle(input, {
        englishValue: prevInputValue
      });
    }
    itemsList.set(functions.getFilteredItems());
    return itemsList.show();
  });
};


},{"./style":12}],8:[function(require,module,exports){
var ref, textIsInSearch, toPersian;

ref = require('../../utils'), toPersian = ref.toPersian, textIsInSearch = ref.textIsInSearch;

exports.create = function(arg) {
  var args, components, dom, functions, getId, getTitle, input, itemsList, ref1, ref2, ref3, setStyle, sortCompare, variables;
  components = arg.components, variables = arg.variables, dom = arg.dom, args = arg.args;
  input = components.input, itemsList = components.itemsList;
  setStyle = dom.setStyle;
  getId = (ref1 = args.getId) != null ? ref1 : (function(x) {
    return x;
  }), getTitle = (ref2 = args.getTitle) != null ? ref2 : (function(x) {
    return x;
  }), sortCompare = (ref3 = args.sortCompare) != null ? ref3 : (function(a, b) {
    return a;
  });
  return functions = {
    sortCompare: sortCompare,
    getId: function(x) {
      if (x === -1) {
        return -1;
      } else {
        return String(getId(x));
      }
    },
    getTitle: function(x) {
      if (x === -1) {
        return '';
      } else if (variables.english) {
        return getTitle(x);
      } else {
        return toPersian(getTitle(x));
      }
    },
    setInputValue: function(value) {
      if (variables.english) {
        return setStyle(input, {
          englishValue: value
        });
      } else {
        return setStyle(input, {
          value: value
        });
      }
    },
    getFilteredItems: function() {
      return variables.allItems.filter(function(item) {
        return (item === -1 && !input.value().trim()) || textIsInSearch(functions.getTitle(item), input.value());
      });
    },
    updateDropdown: function(force) {
      var filteredItems, selectedItem;
      if (force || document.activeElement !== input.fn.element) {
        if ((variables.selectedId != null) && ~variables.selectedId) {
          selectedItem = variables.allItems.filter(function(i) {
            return String(functions.getId(i)) === String(variables.selectedId);
          })[0];
          if (selectedItem != null) {
            functions.setInputValue(functions.getTitle(selectedItem));
          } else {
            functions.setInputValue('');
          }
        } else if (variables.showEmpty) {
          functions.setInputValue('');
        } else {
          filteredItems = functions.getFilteredItems();
          if (filteredItems.length) {
            functions.setInputValue(functions.getTitle(filteredItems[0]));
          } else {
            functions.setInputValue('');
          }
        }
        return itemsList.set(functions.getFilteredItems());
      }
    },
    select: function(item) {
      variables.selectedId = functions.getId(item);
      itemsList.hide();
      return functions.updateDropdown(true);
    },
    showEmpty: function(showEmpty) {
      variables.showEmpty = showEmpty;
      return functions.update(variables.items);
    },
    update: function(items) {
      variables.items = items;
      if (variables.showEmpty) {
        variables.allItems = [-1].concat(items);
      } else {
        variables.allItems = items;
      }
      return functions.updateDropdown();
    },
    reset: function() {
      variables.selectedId = null;
      variables.manuallySelected = false;
      functions.setInputValue('');
      return functions.updateDropdown();
    },
    setSelectedId: function(id) {
      if (!variables.manuallySelected) {
        variables.selectedId = String(id);
        return functions.updateDropdown();
      }
    },
    undirty: function() {
      return variables.manuallySelected = false;
    },
    value: function() {
      var ref4;
      return (ref4 = itemsList.value()) != null ? ref4 : -1;
    }
  };
};


},{"../../utils":29}],9:[function(require,module,exports){
var _eventHandlers, _functions, component, extend, list, style;

component = require('../../utils/component');

style = require('./style');

list = require('./list');

_functions = require('./functions');

_eventHandlers = require('./eventHandlers');

extend = require('../../utils').extend;

module.exports = component('dropdown', function(arg, args) {
  var E, components, dom, events, functions, reset, returnObject, setSelectedId, setStyle, showEmpty, undirty, update, value, variables;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  if (args == null) {
    args = {};
  }
  E = dom.E, setStyle = dom.setStyle;
  variables = {
    english: args.english,
    items: [],
    allItems: [],
    showEmpty: false,
    selectedId: null,
    manuallySelected: false
  };
  components = {};
  functions = {};
  components.dropdown = E(style.dropdown, components.input = E('input', style.input), components.arrow = E('i', style.arrow), components.itemsList = E(list, {
    functions: functions
  }));
  extend(functions, _functions.create({
    variables: variables,
    components: components,
    dom: dom,
    args: args
  }));
  _eventHandlers["do"]({
    components: components,
    variables: variables,
    functions: functions,
    dom: dom,
    events: events
  });
  reset = functions.reset, undirty = functions.undirty, setSelectedId = functions.setSelectedId, showEmpty = functions.showEmpty, update = functions.update, value = functions.value;
  returnObject({
    reset: reset,
    undirty: undirty,
    setSelectedId: setSelectedId,
    showEmpty: showEmpty,
    update: update,
    value: value,
    input: components.input
  });
  return components.dropdown;
});


},{"../../utils":29,"../../utils/component":25,"./eventHandlers":7,"./functions":8,"./list":10,"./style":12}],10:[function(require,module,exports){
var component, style;

component = require('../../../utils/component');

style = require('./style');

module.exports = component('dropdownList', function(arg, arg1) {
  var E, append, dom, empty, entities, events, functions, hide, highlightCurrentItem, highlightIndex, items, list, onEvent, returnObject, select, selectedIndex, setStyle, show;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  functions = arg1.functions;
  E = dom.E, empty = dom.empty, append = dom.append, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  list = E(style.list);
  entities = items = highlightIndex = selectedIndex = void 0;
  highlightCurrentItem = function() {
    if (!(items != null ? items.length : void 0)) {
      return;
    }
    setStyle(items, style.item);
    return setStyle(items[highlightIndex], style.highlightedItem);
  };
  show = function() {
    return setStyle(list, style.visibleList);
  };
  hide = function() {
    return setStyle(list, style.list);
  };
  select = function() {
    selectedIndex = highlightIndex;
    functions.select(entities[selectedIndex]);
    return hide();
  };
  returnObject({
    set: function(_entities) {
      highlightIndex = selectedIndex = 0;
      empty(list);
      entities = _entities.sort(function(a, b) {
        return functions.sortCompare(functions.getTitle(a), functions.getTitle(b));
      });
      append(list, items = entities.map(function(entity, i) {
        var item;
        item = E({
          englishText: functions.getTitle(entity)
        });
        onEvent(item, 'mouseover', function() {
          highlightIndex = i;
          return highlightCurrentItem();
        });
        onEvent(item, 'mouseout', function() {
          return setStyle(item, style.item);
        });
        onEvent(item, 'click', select);
        return item;
      }));
      return highlightCurrentItem();
    },
    value: function() {
      if ((entities != null) && (selectedIndex != null)) {
        return entities[selectedIndex];
      }
    },
    goUp: function() {
      highlightIndex--;
      if (highlightIndex < 0) {
        highlightIndex = 0;
      }
      return highlightCurrentItem();
    },
    goDown: function() {
      highlightIndex++;
      if (highlightIndex >= entities.length) {
        highlightIndex = entities.length - 1;
      }
      return highlightCurrentItem();
    },
    select: select,
    show: show,
    hide: hide
  });
  return list;
});


},{"../../../utils/component":25,"./style":11}],11:[function(require,module,exports){
exports.list = {
  cursor: 'pointer',
  position: 'absolute',
  backgroundColor: 'white',
  zIndex: 1000,
  top: 30,
  left: 0,
  right: 0,
  border: '1px solid #CCC',
  borderTop: 'none',
  borderRadius: '0 0 5px 5px',
  transition: '0.1s',
  opacity: 0,
  visibility: 'hidden'
};

exports.visibleList = {
  opacity: 1,
  visibility: 'visible'
};

exports.item = {
  height: 30,
  padding: 5,
  backgroundColor: 'transparent'
};

exports.highlightedItem = {
  backgroundColor: '#ddd'
};


},{}],12:[function(require,module,exports){
exports.dropdown = {
  position: 'relative'
};

exports.input = {
  height: 30,
  border: '1px solid #ddd'
};

exports.arrow = {
  "class": 'fa fa-chevron-down',
  position: 'absolute',
  cursor: 'pointer',
  borderRight: '1px solid #ddd',
  borderRadius: '3px 0 0 3px',
  textAlign: 'center',
  color: '#777',
  top: 1,
  left: 1,
  width: 28,
  height: 28,
  lineHeight: 27,
  transition: '0.2s',
  backgroundColor: '#f5f5f5'
};

exports.arrowHover = {
  backgroundColor: '#e5e5e5'
};


},{}],13:[function(require,module,exports){
var component, extend, style;

component = require('../../utils/component');

style = require('./style');

extend = require('../../utils').extend;

module.exports = component('radioSwitch', function(arg, arg1) {
  var E, append, changeListener, dom, empty, entities, events, getId, getTitle, idsToOptions, onEvent, options, returnObject, selectedId, setStyle, view;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  getTitle = arg1.getTitle, getId = arg1.getId;
  E = dom.E, append = dom.append, empty = dom.empty, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  if (getTitle == null) {
    getTitle = function(x) {
      return x;
    };
  }
  if (getId == null) {
    getId = function(x) {
      return x;
    };
  }
  view = E();
  entities = options = changeListener = void 0;
  selectedId = -1;
  idsToOptions = {};
  returnObject({
    update: function(_entities) {
      entities = _entities;
      idsToOptions = {};
      empty(view);
      return append(view, options = entities.map(function(entity, i) {
        var option;
        option = i === 0 ? E(extend({}, style.rightOption, style.optionActive), getTitle(entity)) : i === entities.length - 1 ? E(style.leftOption, getTitle(entity)) : E(style.option, getTitle(entity));
        onEvent(option, 'click', function() {
          selectedId = String(getId(entity));
          setStyle(options, style.option);
          setStyle(option, style.optionActive);
          return typeof changeListener === "function" ? changeListener() : void 0;
        });
        idsToOptions[String(getId(entity))] = option;
        return option;
      }));
    },
    clear: function() {
      return setStyle(options, style.option);
    },
    setSelectedId: function(id) {
      selectedId = String(id);
      setStyle(options, style.option);
      return setStyle(idsToOptions[selectedId], style.optionActive);
    },
    value: function() {
      if (selectedId === -1) {
        return -1;
      }
      return entities.filter(function(entity) {
        return selectedId === String(getId(entity));
      })[0];
    },
    onChange: function(listener) {
      return changeListener = listener;
    }
  });
  return view;
});


},{"../../utils":29,"../../utils/component":25,"./style":14}],14:[function(require,module,exports){
var extend;

extend = require('../../utils').extend;

exports.option = {
  float: 'right',
  border: '1px solid #ddd',
  color: '#777',
  cursor: 'pointer',
  padding: '0 10px',
  marginLeft: -1,
  height: 30,
  lineHeight: 28,
  transition: '0.2s',
  backgroundColor: 'white'
};

exports.leftOption = extend({}, exports.option, {
  borderRadius: '3px 0 0 3px'
});

exports.rightOption = extend({}, exports.option, {
  borderRadius: '0 3px 3px 0'
});

exports.optionActive = {
  backgroundColor: '#ddd'
};


},{"../../utils":29}],15:[function(require,module,exports){
var component, toEnglish;

component = require('../../utils/component');

toEnglish = require('../../utils').toEnglish;

module.exports = component('restrictedInput', function(arg, regex) {
  var E, dom, events, input, onEvent, prevValue, returnObject, setStyle;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  E = dom.E, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  input = E('input');
  prevValue = '';
  onEvent(input, 'input', function() {
    var value;
    value = toEnglish(input.value());
    if (regex.test(value)) {
      prevValue = value;
    } else {
      value = prevValue;
    }
    return setStyle(input, {
      value: value
    });
  });
  returnObject({
    value: function() {
      return input.value();
    }
  });
  return input;
});


},{"../../utils":29,"../../utils/component":25}],16:[function(require,module,exports){
var component, restrictedInput;

component = require('../../utils/component');

restrictedInput = require('.');

module.exports = component('numberInput', function(arg, isFraction) {
  var dom, input, returnObject;
  dom = arg.dom, returnObject = arg.returnObject;
  input = dom.E(restrictedInput, isFraction ? /^([0-9]*|[0-9]*\.[0-9]*)$/ : /^[0-9]*$/);
  returnObject({
    value: function() {
      return input.value();
    }
  });
  return input;
});


},{".":15,"../../utils/component":25}],17:[function(require,module,exports){
var component, restrictedInput;

component = require('../../utils/component');

restrictedInput = require('.');

module.exports = component('phoneNumberInput', function(arg) {
  var dom, input, returnObject;
  dom = arg.dom, returnObject = arg.returnObject;
  input = dom.E(restrictedInput, /^(0?|09[0-9]{0,9})$/);
  returnObject({
    value: function() {
      return input.value();
    }
  });
  return input;
});


},{".":15,"../../utils/component":25}],18:[function(require,module,exports){
var component, window;

component = require('../utils/component');

window = require('../utils/dom').window;

module.exports = component('scrollViewer', function(arg) {
  var E, dom, elements, events, onEvent, prevInnerHeight, prevScrollY, returnObject, setStyle, w;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  E = dom.E, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  w = E(window);
  elements = [];
  prevScrollY = prevInnerHeight = void 0;
  returnObject({
    subscribe: function(element) {
      elements.push(element);
      elements = elements.sort(function(arg1, arg2) {
        var a, b;
        a = arg1.offsetTop;
        b = arg2.offsetTop;
        return a - b;
      });
      if (elements.length === 1) {
        onEvent(w, ['scroll', 'resize'], function() {
          var a, b, i, innerHeight, pa, pb, pi, ref, scrollY, state, viewState, wBottom, wTop;
          ref = w.fn.element, scrollY = ref.scrollY, innerHeight = ref.innerHeight;
          if (scrollY === prevScrollY && innerHeight === prevInnerHeight) {
            return;
          }
          prevScrollY = scrollY;
          prevInnerHeight = innerHeight;
          wTop = scrollY;
          wBottom = scrollY + innerHeight;
          viewState = function(element) {
            var bottom, offsetHeight, offsetTop, ref1, top;
            ref1 = element.fn.element, offsetTop = ref1.offsetTop, offsetHeight = ref1.offsetHeight;
            top = offsetTop;
            bottom = offsetTop + offsetHeight;
            if (bottom <= wTop) {
              return -1;
            }
            if (top >= wBottom) {
              return 1;
            }
            return 0;
          };
          a = 0;
          b = elements.length - 1;
          pa = pb = pi = void 0;
          while (a <= b) {
            i = Math.floor((a + b) / 2);
            state = viewState(element = elements[i]);
            if (state === -1) {
              a = i + 1;
            } else if (state === 1) {
              b = i - 1;
            } else {
              if (i === 0 || viewState(elements[i - 1]) !== 0) {
                break;
              }
              b = i;
            }
          }
          setStyle(elements, {
            opacity: 0.5
          });
          return setStyle(element, {
            opacity: 1
          });
        });
      }
      return element;
    }
  });
  return E(null);
});


},{"../utils/component":25,"../utils/dom":27}],19:[function(require,module,exports){
var body, component, extend, style;

component = require('../../utils/component');

style = require('./style');

extend = require('../../utils').extend;

body = require('../../utils/dom').body;

module.exports = function(element, text) {
  var destroyFn, tooltip;
  destroyFn = tooltip = void 0;
  component('tooltip', function(arg) {
    var E, append, destroy, dom, setStyle;
    dom = arg.dom;
    E = dom.E, append = dom.append, destroy = dom.destroy, setStyle = dom.setStyle;
    setTimeout(function() {
      return setTimeout(function() {
        return setTimeout(function() {
          return setTimeout(function() {
            return setTimeout(function() {
              var height, left, top, width;
              element = element.fn.element;
              width = element.offsetWidth, height = element.offsetHeight;
              top = left = 0;
              while (true) {
                top += element.offsetTop || 0;
                left += element.offsetLeft || 0;
                element = element.offsetParent;
                if (!element) {
                  break;
                }
              }
              append(E(body), tooltip = E(extend({
                top: top + height + 7,
                left: left + (width - 150) / 2
              }, style.tooltip), E(style.arrow), dom.text(text)));
              return setTimeout(function() {
                return setStyle(tooltip, style.tooltipActive);
              });
            });
          });
        });
      });
    });
    return destroyFn = function() {
      setStyle(tooltip, style.tooltip);
      return setTimeout((function() {
        return destroy(tooltip);
      }), 500);
    };
  })();
  return destroyFn;
};


},{"../../utils":29,"../../utils/component":25,"../../utils/dom":27,"./style":20}],20:[function(require,module,exports){
exports.tooltip = {
  position: 'absolute',
  textAlign: 'center',
  backgroundColor: '#c00',
  color: 'white',
  width: 150,
  fontSize: 10,
  height: 30,
  lineHeight: 30,
  borderRadius: 3,
  transition: '0.2s',
  opacity: 0,
  visibility: 'hidden'
};

exports.tooltipActive = {
  opacity: 1,
  visibility: 'visible'
};

exports.arrow = {
  position: 'absolute',
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderColor: 'transparent',
  top: -7,
  right: (150 - 7) / 2,
  borderWidth: '0 7px 7px',
  borderBottomColor: '#c00'
};


},{}],21:[function(require,module,exports){
var body, component, views;

component = require('./utils/component');

views = require('./views');

body = require('./utils/dom').body;

module.exports = component('page', function(arg) {
  var E, append, dom;
  dom = arg.dom;
  E = dom.E, append = dom.append;
  return append(E(body), E(views));
});


/*
  alert = require './components/alert'
  modal = require './components/modal'
  sheet = require './components/sheet'
  singletonAlert = require './singletons/alert'
  singletonModal = require './singletons/modal'
  singletonSheet = require './singletons/sheet'

  append E(body), alertE = E alert
  append E(body), modalE = E modal

  singletonAlert.set alertE
  singletonModal.set modalE
  singletonSheet.set E sheet
 */


},{"./utils/component":25,"./utils/dom":27,"./views":66}],22:[function(require,module,exports){
(function (process){
// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object" && typeof module === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else if (typeof window !== "undefined" || typeof self !== "undefined") {
        // Prefer window over self for add-on scripts. Use self for
        // non-windowed contexts.
        var global = typeof window !== "undefined" ? window : self;

        // Get the `window` object, save the previous Q global
        // and initialize Q as a global.
        var previousQ = global.Q;
        global.Q = definition();

        // Add a noConflict function so Q can be removed from the
        // global namespace.
        global.Q.noConflict = function () {
            global.Q = previousQ;
            return this;
        };

    } else {
        throw new Error("This environment was not anticipated by Q. Please file a bug.");
    }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;
    // queue for late tasks, used by unhandled rejection tracking
    var laterQueue = [];

    function flush() {
        /* jshint loopfunc: true */
        var task, domain;

        while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }
            runSingle(task, domain);

        }
        while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
        }
        flushing = false;
    }
    // runs a single function in the async queue
    function runSingle(task, domain) {
        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process === "object" &&
        process.toString() === "[object process]" && process.nextTick) {
        // Ensure Q is in a real Node environment, with a `process.nextTick`.
        // To see through fake Node environments:
        // * Mocha test runner - exposes a `process` global without a `nextTick`
        // * Browserify - exposes a `process.nexTick` function that uses
        //   `setTimeout`. In this case `setImmediate` is preferred because
        //    it is faster. Browserify's `process.toString()` yields
        //   "[object Object]", while in a real Node environment
        //   `process.nextTick()` yields "[object process]".
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }
    // runs a task after all other tasks have been run
    // this is useful for unhandled rejection tracking that needs to happen
    // after all `then`d tasks have been run.
    nextTick.runAfter = function (task) {
        laterQueue.push(task);
        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };
    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack &&
        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

// enable long stacks if Q_DEBUG is set
if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
    Q.longStackSupport = true;
}

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            Q.nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;
        promise.source = newPromise;

        array_reduce(messages, function (undefined, message) {
            Q.nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            Q.nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become settled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be settled
 */
Q.race = race;
function race(answerPs) {
    return promise(function (resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function (answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
};

/**
 * Works almost like "finally", but not called for rejections.
 * Original resolution value is passed through callback unaffected.
 * Callback may return a promise that will be awaited for.
 * @param {Function} callback
 * @returns {Q.Promise}
 * @example
 * doSomething()
 *   .then(...)
 *   .tap(console.log)
 *   .then(...);
 */
Promise.prototype.tap = function (callback) {
    callback = Q(callback);

    return this.then(function (value) {
        return callback.fcall(value).thenResolve(value);
    });
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return object instanceof Promise;
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var reportedUnhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }
    if (typeof process === "object" && typeof process.emit === "function") {
        Q.nextTick.runAfter(function () {
            if (array_indexOf(unhandledRejections, promise) !== -1) {
                process.emit("unhandledRejection", reason, promise);
                reportedUnhandledRejections.push(promise);
            }
        });
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function () {
                var atReport = array_indexOf(reportedUnhandledRejections, promise);
                if (atReport !== -1) {
                    process.emit("rejectionHandled", unhandledReasons[at], promise);
                    reportedUnhandledRejections.splice(atReport, 1);
                }
            });
        }
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return Q(result.value);
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return Q(exception.value);
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var pendingCount = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++pendingCount;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (pendingCount === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Returns the first resolved promise of an array. Prior rejected promises are
 * ignored.  Rejects only if all promises are rejected.
 * @param {Array*} an array containing values or promises for values
 * @returns a promise fulfilled with the value of the first resolved promise,
 * or a rejected promise if all promises are rejected.
 */
Q.any = any;

function any(promises) {
    if (promises.length === 0) {
        return Q.resolve();
    }

    var deferred = Q.defer();
    var pendingCount = 0;
    array_reduce(promises, function (prev, current, index) {
        var promise = promises[index];

        pendingCount++;

        when(promise, onFulfilled, onRejected, onProgress);
        function onFulfilled(result) {
            deferred.resolve(result);
        }
        function onRejected() {
            pendingCount--;
            if (pendingCount === 0) {
                deferred.reject(new Error(
                    "Can't get fulfillment value from any promise, all " +
                    "promises were rejected."
                ));
            }
        }
        function onProgress(progress) {
            deferred.notify({
                index: index,
                value: progress
            });
        }
    }, undefined);

    return deferred.promise;
}

Promise.prototype.any = function () {
    return any(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        Q.nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {Any*} custom error message or Error object (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
};

Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
        }
        deferred.reject(error);
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            Q.nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            Q.nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

Q.noConflict = function() {
    throw new Error("Q.noConflict only works when Q is used as a global");
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

}).call(this,require('_process'))
},{"_process":1}],23:[function(require,module,exports){
exports.set = function(x) {
  return exports.instance = x;
};


},{}],24:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],25:[function(require,module,exports){
var _dom, _events, _service, _state, extend, log,
  slice = [].slice;

_state = require('./state');

_service = require('./service');

_dom = require('./dom');

_events = require('./events');

log = require('./log').component;

extend = require('.').extend;

module.exports = function(componentName, create) {
  return function() {
    var args, c, component, dom, events, others, ref, ref1, returnObject, service, setOff, state;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    component = {};
    component.fn = {
      name: componentName,
      off: function() {}
    };
    log.create(0, component);
    dom = _dom.instance(component);
    events = _events.instance(component);
    state = _state.instance(component);
    service = _service.instance(component);
    returnObject = function(returnObject) {
      return extend(component, returnObject);
    };
    setOff = function(offf) {
      return component.fn.off = offf;
    };
    others = {
      loading: function(stateNames, yesData, noData) {
        if (!Array.isArray(stateNames)) {
          stateNames = [stateNames];
        }
        dom.hide(yesData);
        return state.all(stateNames, function() {
          dom.hide(noData);
          return dom.show(yesData);
        });
      }
    };
    c = create.apply(null, [{
      dom: dom,
      events: events,
      state: state,
      service: service,
      returnObject: returnObject,
      setOff: setOff,
      others: others
    }].concat(slice.call(args)));
    if (c != null ? (ref = c.fn) != null ? ref.element : void 0 : void 0) {
      component.fn.element = c.fn.element;
    }
    if (c != null ? (ref1 = c.fn) != null ? ref1.pInputListeners : void 0 : void 0) {
      component.fn.pInputListeners = c.fn.pInputListeners;
    }
    log.create(1, component);
    return component;
  };
};


},{".":29,"./dom":27,"./events":28,"./log":30,"./service":35,"./state":39}],26:[function(require,module,exports){
var createCookie, eraseCookie, readCookie;

createCookie = function(name, value, days) {
  var date, expires;
  if (days) {
    date = new Date();
    date.setTime(+date + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + (date.toGMTString());
  } else {
    expires = '';
  }
  return document.cookie = name + "=" + value + expires + "; path=/";
};

readCookie = function(name) {
  var nameEQ, result, resultArray;
  nameEQ = name + "=";
  resultArray = document.cookie.split(';').map(function(c) {
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    return c;
  }).filter(function(c) {
    return c.indexOf(nameEQ) === 0;
  });
  result = resultArray[0];
  return result != null ? result.substring(nameEQ.length) : void 0;
};

eraseCookie = function(name) {
  return createCookie(name, '', -1);
};

module.exports = {
  createCookie: createCookie,
  readCookie: readCookie,
  eraseCookie: eraseCookie
};


},{}],27:[function(require,module,exports){
var extend, log, ref, remove, toPersian, uppercaseFirst,
  slice = [].slice;

log = require('./log').dom;

ref = require('.'), toPersian = ref.toPersian, uppercaseFirst = ref.uppercaseFirst, extend = ref.extend, remove = ref.remove;

exports.window = function() {
  return {
    fn: {
      name: 'window',
      element: window,
      off: function() {}
    }
  };
};

exports.document = function() {
  return {
    fn: {
      name: 'document',
      element: document,
      off: function() {}
    }
  };
};

exports.body = function() {
  return {
    fn: {
      name: 'body',
      element: document.body,
      off: function() {}
    }
  };
};

exports.head = function() {
  return {
    fn: {
      name: 'head',
      element: document.head,
      off: function() {}
    }
  };
};

exports.addPageCSS = function(url) {
  var cssNode;
  cssNode = document.createElement('link');
  cssNode.setAttribute('rel', 'stylesheet');
  cssNode.setAttribute('href', "assets/" + url);
  return document.head.appendChild(cssNode);
};

exports.addPageStyle = function(code) {
  var styleNode;
  styleNode = document.createElement('style');
  styleNode.type = 'text/css';
  styleNode.textContent = code;
  return document.head.appendChild(styleNode);
};

exports.generateId = (function() {
  var i;
  i = 0;
  return function() {
    return i++;
  };
})();

exports.instance = function(thisComponent) {
  var exports;
  exports = {};
  exports.E = (function() {
    var e;
    e = function(parent, tagName, style, children) {
      var appendChildren, component, element;
      element = document.createElement(tagName);
      component = {
        value: function() {
          return element.value;
        },
        checked: function() {
          return element.checked;
        },
        focus: function() {
          return element.focus();
        },
        blur: function() {
          return element.blur();
        },
        select: function() {
          return element.select();
        },
        fn: {
          pInputListeners: [],
          name: tagName,
          element: element,
          parent: parent,
          off: function() {}
        }
      };
      exports.setStyle(component, style);
      (appendChildren = function(children) {
        return children.forEach(function(x) {
          var ref1;
          if ((ref1 = typeof x) === 'string' || ref1 === 'number') {
            return exports.setStyle(component, {
              text: x
            });
          } else if (Array.isArray(x)) {
            return appendChildren(x);
          } else {
            return exports.append(component, x);
          }
        });
      })(children);
      return component;
    };
    return function() {
      var args, children, component, firstArg, l, prevOff, restOfArgs, style, tagName;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      firstArg = args[0];
      if (typeof firstArg === 'function') {
        l = log.E0(thisComponent);
        restOfArgs = args.slice(1);
        l(null, restOfArgs);
        component = firstArg.apply(null, restOfArgs);
        component.fn.parent = thisComponent;
        l(component, restOfArgs);
      } else {
        if (typeof firstArg === 'string') {
          tagName = firstArg;
          style = args[1] || {};
          children = args.slice(2);
        } else if (typeof firstArg === 'object' && !Array.isArray(firstArg)) {
          tagName = 'div';
          style = firstArg || {};
          children = args.slice(1);
        } else {
          tagName = 'div';
          style = {};
          children = args.slice(1);
        }
        l = log.E1(thisComponent, tagName, style, children, parent);
        l();
        component = e(thisComponent, tagName, style, children);
        l();
      }
      prevOff = thisComponent.fn.off;
      thisComponent.fn.off = function() {
        prevOff();
        return component.fn.off();
      };
      return component;
    };
  })();
  exports.text = function(text) {
    var component, l;
    l = log.text(thisComponent, text);
    l();
    component = {
      fn: {
        name: "text[" + text + "]",
        element: document.createTextNode(text),
        off: function() {}
      }
    };
    l();
    return component;
  };
  exports.append = function(parent, component) {
    var base, l;
    if (!component) {
      return;
    }
    if (Array.isArray(component)) {
      return component.forEach(function(component) {
        return exports.append(parent, component);
      });
    }
    l = log.append(thisComponent, parent, component);
    l();
    parent.fn.element.appendChild(component.fn.element);
    component.fn.domParent = parent;
    if ((base = parent.fn).childComponents == null) {
      base.childComponents = [];
    }
    parent.fn.childComponents.push(component);
    return l();
  };
  exports.detatch = function(component) {
    var element, l;
    if (Array.isArray(component)) {
      return component.map(function(component) {
        return exports.detatch(component);
      });
    }
    element = component.fn.element;
    l = log.detatch(thisComponent, component);
    l();
    try {
      element.parentNode.removeChild(element);
      remove(component.fn.domParent.fn.childComponents, component);
    } catch (undefined) {}
    return l();
  };
  exports.destroy = function(component) {
    var l;
    if (Array.isArray(component)) {
      return component.map(function(component) {
        return exports.destroy(component);
      });
    }
    l = log.destroy(thisComponent, component);
    l();
    exports.detatch(component);
    component.fn.off();
    return l();
  };
  exports.empty = function(component) {
    var element, l, ref1;
    if (Array.isArray(component)) {
      return component.map(function(component) {
        return exports.empty(elemcomponentent);
      });
    }
    element = component.fn.element;
    l = log.empty(thisComponent, component);
    l();
    if ((ref1 = component.fn.childComponents) != null) {
      ref1.slice().forEach(exports.destroy);
    }
    return l();
  };
  exports.setStyle = function(component, style) {
    var element, l;
    if (style == null) {
      style = {};
    }
    if (Array.isArray(component)) {
      return component.map(function(component) {
        return exports.setStyle(component, style);
      });
    }
    element = component.fn.element;
    l = log.setStyle(thisComponent, component, style, thisComponent);
    l();
    component.fn.style = style;
    Object.keys(style).forEach(function(key) {
      var value;
      value = style[key];
      switch (key) {
        case 'html':
          return element.innerHTML = toPersian(value);
        case 'englishHtml':
          return element.innerHTML = value != null ? value : '';
        case 'text':
          return element.textContent = element.innerText = toPersian(value);
        case 'englishText':
          return element.textContent = element.innerText = value != null ? value : '';
        case 'value':
          if (element.value !== toPersian(value)) {
            element.value = toPersian(value);
            return setTimeout(function() {
              return component.fn.pInputListeners.forEach(function(x) {
                return x({});
              });
            });
          }
          break;
        case 'englishValue':
          if (element.value !== value) {
            element.value = value != null ? value : '';
            return setTimeout(function() {
              return component.fn.pInputListeners.forEach(function(x) {
                return x({});
              });
            });
          }
          break;
        case 'checked':
          return element.checked = value;
        case 'placeholder':
          return element.setAttribute(key, toPersian(value));
        case 'class':
        case 'type':
        case 'id':
        case 'for':
        case 'src':
        case 'href':
        case 'target':
          return element.setAttribute(key, value);
        default:
          if ((typeof value === 'number') && !(key === 'opacity' || key === 'zIndex')) {
            value = Math.floor(value) + 'px';
          }
          if (key === 'float') {
            key = 'cssFloat';
          }
          return element.style[key] = value;
      }
    });
    l();
    return component;
  };
  exports.addClass = function(component, klass) {
    var element, l, ref1;
    if (Array.isArray(component)) {
      return component.map(function(component) {
        return exports.addClass(component, klass);
      });
    }
    if (Array.isArray(klass)) {
      klass.forEach(function(klass) {
        return exports.addClass(component, klass);
      });
      return component;
    }
    exports.removeClass(component, klass);
    element = component.fn.element;
    l = log.addClass(thisComponent, component, klass);
    l();
    element.setAttribute('class', (((ref1 = element.getAttribute('class')) != null ? ref1 : '') + ' ' + klass).replace(/\ +/g, ' ').trim());
    l();
    return component;
  };
  exports.removeClass = function(component, klass) {
    var classIndex, element, l, previousClass, ref1;
    if (Array.isArray(component)) {
      return component.map(function(component) {
        return exports.removeClass(component, klass);
      });
    }
    if (Array.isArray(klass)) {
      klass.forEach(function(klass) {
        return exports.removeClass(component, klass);
      });
      return component;
    }
    element = component.fn.element;
    l = log.removeClass(thisComponent, component, klass);
    l();
    previousClass = (ref1 = element.getAttribute('class')) != null ? ref1 : '';
    classIndex = previousClass.indexOf(klass);
    if (~classIndex) {
      element.setAttribute('class', ((previousClass.substr(0, classIndex)) + (previousClass.substr(classIndex + klass.length))).replace(/\ +/g, ' ').trim());
    }
    l();
    return component;
  };
  exports.show = function(component) {
    var l;
    l = log.show(thisComponent, component);
    l();
    exports.removeClass(component, 'hidden');
    l();
    return component;
  };
  exports.hide = function(component) {
    var l;
    l = log.hide(thisComponent, component);
    l();
    exports.addClass(component, 'hidden');
    l();
    return component;
  };
  exports.enable = function(component) {
    var element, l;
    if (Array.isArray(component)) {
      return component.map(function(component) {
        return exports.enable(component);
      });
    }
    element = component.fn.element;
    l = log.enable(thisComponent, component);
    l();
    element.removeAttribute('disabled');
    l();
    return component;
  };
  exports.disable = function(component) {
    var element, l;
    if (Array.isArray(component)) {
      return component.map(function(component) {
        return exports.disable(component);
      });
    }
    element = component.fn.element;
    l = log.disable(thisComponent, component);
    l();
    element.setAttribute('disabled', 'disabled');
    l();
    return component;
  };
  return exports;
};


},{".":29,"./log":30}],28:[function(require,module,exports){
var body, isIn, log, ref, remove, window,
  slice = [].slice;

log = require('./log').events;

ref = require('./dom'), window = ref.window, body = ref.body;

remove = require('.').remove;

isIn = function(component, arg) {
  var maxX, maxY, minX, minY, pageX, pageY, rect;
  pageX = arg.pageX, pageY = arg.pageY;
  rect = component.fn.element.getBoundingClientRect();
  minX = rect.left;
  maxX = rect.left + rect.width;
  minY = rect.top + window().fn.element.scrollY;
  maxY = rect.top + window().fn.element.scrollY + rect.height;
  return (minX < pageX && pageX < maxX) && (minY < pageY && pageY < maxY);
};

exports.instance = function(thisComponent) {
  var exports;
  exports = {};
  exports.onEvent = function() {
    var args, callback, component, element, event, ignores, l, prevOff, unbind, unbinds;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    switch (args.length) {
      case 3:
        component = args[0], event = args[1], callback = args[2];
        break;
      case 4:
        component = args[0], event = args[1], ignores = args[2], callback = args[3];
        if (!Array.isArray(ignores)) {
          ignores = [ignores];
        }
    }
    if (Array.isArray(component)) {
      unbinds = component.map(function(component) {
        args[0] = component;
        return exports.onEvent.apply(null, args);
      });
      return function() {
        return unbinds.forEach(function(unbind) {
          return unbind();
        });
      };
    }
    if (Array.isArray(event)) {
      unbinds = event.map(function(event) {
        args[1] = event;
        return exports.onEvent.apply(null, args);
      });
      return function() {
        return unbinds.forEach(function(unbind) {
          return unbind();
        });
      };
    }
    element = component.fn.element;
    l = log.onEvent(thisComponent, component, event, ignores, callback);
    callback = (function(callback) {
      return function(e) {
        var shouldIgnore, target;
        if (e.target == null) {
          e.target = e.srcElement;
        }
        if (ignores) {
          target = e.target;
          while (target && target !== document && target !== document.body) {
            shouldIgnore = ignores.some(function(ignore) {
              if (target === ignore.fn.element) {
                l.ignore(ignore, e);
                return true;
              }
            });
            if (shouldIgnore) {
              return;
            }
            target = target.parentNode || target.parentElement;
          }
        }
        l(1, e);
        callback(e);
        return l(1, e);
      };
    })(callback);
    l(0);
    if (event === 'pInput') {
      component.fn.pInputListeners.push(callback);
    } else if (element.addEventListener) {
      element.addEventListener(event, callback);
    } else if (element.attachEvent) {
      element.attachEvent("on" + (uppercaseFirst(event)), callback);
    }
    l(0);
    unbind = function() {
      l(2);
      if (event === 'pInput') {
        remove(component.fn.pInputListeners, callback);
      } else if (element.removeEventListener) {
        element.removeEventListener(event, callback);
      } else if (element.detachEvent) {
        element.detachEvent("on" + (uppercaseFirst(event)), callback);
      }
      return l(2);
    };
    prevOff = component.fn.off;
    component.fn.off = function() {
      prevOff();
      return unbind();
    };
    return unbind;
  };
  exports.onLoad = function(callback) {
    var l, unbind;
    l = log.onLoad(thisComponent, callback);
    l(0);
    unbind = exports.onEvent(window(), 'load', function(e) {
      l(1, e);
      callback(e);
      return l(1, e);
    });
    l(0);
    return function() {
      l(2);
      unbind();
      return l(2);
    };
  };
  exports.onResize = function(callback) {
    var l, unbind;
    l = log.onResize(thisComponent, callback);
    l(0);
    unbind = exports.onEvent(window(), 'resize', function(e) {
      l(1, e);
      callback(e);
      return l(1, e);
    });
    l(0);
    return function() {
      l(2);
      unbind();
      return l(2);
    };
  };
  exports.onMouseover = function(component, callback) {
    var allreadyIn, l, unbind;
    l = log.onMouseover(thisComponent, component, callback);
    allreadyIn = false;
    l(0);
    unbind = exports.onEvent(body(), 'mousemove', function(e) {
      if (isIn(component, e)) {
        l(1, e);
        if (!allreadyIn) {
          callback(e);
        }
        l(1, e);
        return allreadyIn = true;
      } else {
        return allreadyIn = false;
      }
    });
    l(0);
    return function() {
      l(2);
      unbind();
      return l(2);
    };
  };
  exports.onMouseout = function(component, callback) {
    var allreadyOut, l, unbind0, unbind1;
    l = log.onMouseout(thisComponent, component, callback);
    allreadyOut = false;
    if (component) {
      l(0.0);
      unbind0 = exports.onEvent(body(), 'mousemove', function(e) {
        if (!isIn(component, e)) {
          l(1.0, e);
          if (!allreadyOut) {
            callback(e);
          }
          l(1.0, e);
          return allreadyOut = true;
        } else {
          return allreadyOut = false;
        }
      });
      l(0.0);
    }
    l(0.1);
    unbind1 = exports.onEvent(body(), 'mouseout', function(e) {
      var from;
      from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName === 'HTML') {
        l(1.1, e);
        allreadyOut = true;
        callback(e);
        return l(1.1, e);
      }
    });
    l(0.1);
    return function() {
      l(2.0);
      if (typeof unbind0 === "function") {
        unbind0();
      }
      l(2.0);
      l(2.1);
      unbind1();
      return l(2.1);
    };
  };
  exports.onMouseup = function(callback) {
    var unbind0, unbind1;
    l(0.0);
    unbind0 = exports.onEvent(body(), 'mouseup', function(e) {
      l(1.0, e);
      callback(e);
      return l(1.0, e);
    });
    l(0.0);
    l(0.1);
    unbind1 = exports.onEvent(body(), 'mouseout', function(e) {
      var from;
      from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName === 'HTML') {
        l(1.1, e);
        callback(e);
        return l(1.1, e);
      }
    });
    l(0.1);
    return function() {
      l(2.0);
      unbind0();
      l(2.0);
      l(2.1);
      unbind1();
      return l(2.1);
    };
  };
  exports.onEnter = function(component, callback) {
    var l, unbind;
    l = log.onEnter(thisComponent, component, callback);
    l(0);
    unbind = exports.onEvent(component, 'keydown', function(e) {
      if (e.keyCode === 13) {
        l(1, e);
        callback();
        return l(1, e);
      }
    });
    l(0);
    return function() {
      l(2);
      unbind();
      return l(2);
    };
  };
  return exports;
};


},{".":29,"./dom":27,"./log":30}],29:[function(require,module,exports){
var slice = [].slice;

exports.compare = function(a, b) {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
};

exports.remove = function(array, item) {
  var index;
  index = array.indexOf(item);
  if (~index) {
    array.splice(index, 1);
  }
  return array;
};

exports.extend = function() {
  var sources, target;
  target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  sources.forEach(function(source) {
    return Object.keys(source).forEach(function(key) {
      return target[key] = source[key];
    });
  });
  return target;
};

exports.uppercaseFirst = function(name) {
  return name.charAt(0).toUpperCase() + name.substr(1);
};

exports.toEnglish = function(value) {
  if (value == null) {
    value = '';
  }
  value = '' + value;
  '۰۱۲۳۴۵۶۷۸۹'.split('').forEach(function(digit, i) {
    return value = value.replace(new RegExp(digit, 'g'), i);
  });
  return value;
};

exports.toPersian = function(value) {
  if (value == null) {
    value = '';
  }
  value = '' + value;
  '۰۱۲۳۴۵۶۷۸۹'.split('').forEach(function(digit, i) {
    return value = value.replace(new RegExp('' + i, 'g'), digit);
  });
  return value.replace(/ي/g, 'ی').replace(/ك/g, 'ک');
};

exports.toDate = function(timestamp) {
  var date, day, j, month, year;
  date = new Date(timestamp);
  day = date.getDate();
  month = date.getMonth() + 1;
  year = date.getFullYear();
  j = jalaali.toJalaali(year, month, day);
  day = j.jd;
  month = j.jm;
  year = j.jy;
  return year + "/" + month + "/" + day;
};

exports.toTimestamp = function(dateString) {
  var day, g, month, ref, year;
  dateString = exports.toEnglish(dateString);
  ref = dateString.split('/'), year = ref[0], month = ref[1], day = ref[2];
  g = jalaali.toGregorian(+year, +month, +day);
  return +new Date(g.gy, g.gm - 1, g.gd);
};

exports.monthToString = function(month) {
  return ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'][month - 1];
};

exports.textIsInSearch = function(text, search, notPersian, caseSensitive) {
  var searchWords, textWords;
  if (!notPersian) {
    text = exports.toPersian(text);
    search = exports.toPersian(search);
  }
  if (!caseSensitive) {
    text = text.toLowerCase();
    search = search.toLowerCase();
  }
  searchWords = search.trim().split(' ').map(function(x) {
    return x.trim();
  }).filter(function(x) {
    return x;
  });
  textWords = text.trim().split(' ').map(function(x) {
    return x.trim();
  }).filter(function(x) {
    return x;
  });
  return searchWords.every(function(searchWord) {
    return textWords.some(function(textWord) {
      return ~textWord.indexOf(searchWord);
    });
  });
};

exports.collection = function(add, destroy, change) {
  var data;
  data = [];
  return function(newData) {
    var k, l, m, n, ref, ref1, ref2, ref3, ref4, results, results1, results2, results3, results4;
    if (newData.length > data.length) {
      if (data.length) {
        (function() {
          results = [];
          for (var k = 0, ref = data.length - 1; 0 <= ref ? k <= ref : k >= ref; 0 <= ref ? k++ : k--){ results.push(k); }
          return results;
        }).apply(this).forEach(function(i) {
          return data[i] = change(newData[i], data[i]);
        });
      }
      return (function() {
        results1 = [];
        for (var l = ref1 = data.length, ref2 = newData.length - 1; ref1 <= ref2 ? l <= ref2 : l >= ref2; ref1 <= ref2 ? l++ : l--){ results1.push(l); }
        return results1;
      }).apply(this).forEach(function(i) {
        return data[i] = add(newData[i]);
      });
    } else if (data.length > newData.length) {
      if (newData.length) {
        (function() {
          results2 = [];
          for (var m = 0, ref3 = newData.length - 1; 0 <= ref3 ? m <= ref3 : m >= ref3; 0 <= ref3 ? m++ : m--){ results2.push(m); }
          return results2;
        }).apply(this).forEach(function(i) {
          return data[i] = change(newData[i], data[i]);
        });
      }
      results3 = [];
      while (data.length > newData.length) {
        destroy(data[data.length - 1]);
        results3.push(data.splice(data.length - 1, 1));
      }
      return results3;
    } else if (data.length) {
      return (function() {
        results4 = [];
        for (var n = 0, ref4 = data.length - 1; 0 <= ref4 ? n <= ref4 : n >= ref4; 0 <= ref4 ? n++ : n--){ results4.push(n); }
        return results4;
      }).apply(this).forEach(function(i) {
        return data[i] = change(newData[i], data[i]);
      });
    }
  };
};


},{}],30:[function(require,module,exports){
var getFullName, log;

log = function(x) {
  return console.log(x);
};

getFullName = function(component) {
  var name;
  name = '';
  while (component) {
    name = component.fn.name + ">" + name;
    component = component.parent;
  }
  return name.substr(0, name.length - 1);
};

exports.component = {
  create: function(part, component) {
    return;
    return log(part + ":create:" + (getFullName(component)));
  }
};

exports.dom = {
  E0: function(thisComponent) {
    var part;
    part = 0;
    return function(component, args) {
      var error, stringifiedArgs;
      return;
      try {
        stringifiedArgs = JSON.stringify(args);
      } catch (error) {
        stringifiedArgs = '[Cannot Stringify]';
      }
      return log((part++) + ":dom.E:" + (component ? getFullName(component) : 'UnknownComponent') + (args.length ? ':' + stringifiedArgs : '') + "|" + (getFullName(thisComponent)));
    };
  },
  E1: function(thisComponent, tagName, style, children) {
    var logText, part;
    logText = "dom.E:" + (getFullName({
      fn: {
        name: tagName,
        parent: thisComponent
      }
    }));
    if (Object.keys(style).length) {
      logText += ':' + JSON.stringify(style);
    }
    if (children.length) {
      logText += ':HasChildren';
    }
    logText += "|" + (getFullName(thisComponent));
    part = 0;
    return function() {
      return;
      return log((part++) + ":" + logText);
    };
  },
  text: function(thisComponent, text) {
    var part;
    part = 0;
    return function() {
      return;
      return log((part++) + ":dom.text:" + text + "|" + (getFullName(thisComponent)));
    };
  },
  append: function(thisComponent, parent, component) {
    var part;
    part = 0;
    return function() {
      return;
      return log((part++) + ":dom.append:" + (getFullName(parent)) + "--->" + (getFullName(component)) + "|" + (getFullName(thisComponent)));
    };
  },
  detatch: function(thisComponent, component) {
    var part;
    part = 0;
    return function() {
      return;
      return log((part++) + ":dom.detatch:" + (getFullName(component)) + "|" + (getFullName(thisComponent)));
    };
  },
  destroy: function(thisComponent, component) {
    var part;
    part = 0;
    return function() {
      return;
      return log((part++) + ":dom.destroy:" + (getFullName(component)) + "|" + (getFullName(thisComponent)));
    };
  },
  empty: function(thisComponent, component) {
    var part;
    part = 0;
    return function() {
      return;
      return log((part++) + ":dom.empty:" + (getFullName(component)) + "|" + (getFullName(thisComponent)));
    };
  },
  setStyle: function(thisComponent, component, style) {
    var logText, part;
    logText = "dom.setStyle:" + (getFullName(component));
    if (Object.keys(style).length) {
      logText += ':' + JSON.stringify(style);
    }
    logText += "|" + (getFullName(thisComponent));
    part = 0;
    return function() {
      return;
      return log((part++) + ":" + logText);
    };
  },
  addClass: function(thisComponent, component, klass) {
    var part;
    part = 0;
    return function() {
      return;
      return log((part++) + ":dom.addClass:" + (getFullName(component)) + ":" + klass + "|" + (getFullName(thisComponent)));
    };
  },
  removeClass: function(thisComponent, component, klass) {
    var part;
    part = 0;
    return function() {
      return;
      return log((part++) + ":dom.removeClass:" + (getFullName(component)) + ":" + klass + "|" + (getFullName(thisComponent)));
    };
  },
  show: function(thisComponent, component) {
    var part;
    part = 0;
    return function() {
      return;
      return log((part++) + ":dom.show:" + (getFullName(component)) + "|" + (getFullName(thisComponent)));
    };
  },
  hide: function(thisComponent, component) {
    var part;
    part = 0;
    return function() {
      return;
      return log((part++) + ":dom.hide:" + (getFullName(component)) + "|" + (getFullName(thisComponent)));
    };
  },
  enable: function(thisComponent, component) {
    var part;
    part = 0;
    return function() {
      return;
      return log((part++) + ":dom.enable:" + (getFullName(component)) + "|" + (getFullName(thisComponent)));
    };
  },
  disable: function(thisComponent, component) {
    var part;
    part = 0;
    return function() {
      return;
      return log((part++) + ":dom.disable:" + (getFullName(component)) + "|" + (getFullName(thisComponent)));
    };
  }
};

exports.events = {
  onEvent: function(thisComponent, component, event, ignores, callback) {
    var l, logText, parts;
    logText = "events.onEvent:" + (getFullName(component)) + ":" + event;
    if (ignores) {
      logText += ":ignore:" + (JSON.stringify(ignores.map(function(component) {
        return getFullName(component);
      })));
    }
    logText += "|" + (getFullName(thisComponent));
    parts = [0, 0, 0];
    l = function(partIndex, e) {
      return;
      return log(partIndex + ":" + (parts[partIndex]++) + (e ? ':' + JSON.stringify(e) : '') + ":" + logText);
    };
    l.ignore = function(ignoredComponent, e) {
      return;
      return log("ignore " + (getFullName(ignoredComponent)) + (e ? ':' + JSON.stringify(e) : '') + ":" + logText);
    };
    return l;
  },
  onLoad: function(thisComponent, callback) {
    var parts;
    parts = [0, 0, 0];
    return function(partIndex) {
      return;
      return log(partIndex + ":" + (parts[partIndex]++) + ":events.onLoad|" + (getFullName(thisComponent)));
    };
  },
  onResize: function(thisComponent, callback) {
    var parts;
    parts = [0, 0, 0];
    return function(partIndex) {
      return;
      return log(partIndex + ":" + (parts[partIndex]++) + ":events.onResize|" + (getFullName(thisComponent)));
    };
  },
  onMouseover: function(thisComponent, component, callback) {
    var parts;
    parts = [0, 0, 0];
    return function(partIndex) {
      return;
      return log(partIndex + ":" + (parts[partIndex]++) + ":events.onMouseover:" + (getFullName(component)) + "|" + (getFullName(thisComponent)));
    };
  },
  onMouseout: function(thisComponent, component, callback) {
    var parts;
    parts = [0, 0, 0];
    return function(partIndex) {
      return;
      return log(partIndex + ":" + (parts[partIndex]++) + ":events.onMouseout:" + (getFullName(component)) + "|" + (getFullName(thisComponent)));
    };
  },
  onMouseup: function(thisComponent, callback) {
    var parts;
    parts = [0, 0, 0];
    return function(partIndex) {
      return;
      return log(partIndex + ":" + (parts[partIndex]++) + ":events.onMouseup|" + (getFullName(thisComponent)));
    };
  },
  onEnter: function(thisComponent, component, callback) {
    var parts;
    parts = [0, 0, 0];
    return function(partIndex) {
      return;
      return log(partIndex + ":" + (parts[partIndex]++) + ":events.onEnter:" + (getFullName(component)) + "|" + (getFullName(thisComponent)));
    };
  }
};

exports.state = {
  createPubsub: function(thisComponent) {
    return {
      on: function(options, callback) {
        var parts;
        parts = [0, 0, 0];
        return function(partIndex, data) {
          var logText;
          return;
          logText = partIndex + ":" + (parts[partIndex]++) + ":state.createPubsub.on:" + (JSON.stringify(options));
          if (partIndex === 1) {
            logText += ':' + JSON.stringify(data);
          }
          logText += "|" + (getFullName(thisComponent));
          return log(logText);
        };
      },
      set: function(data) {
        var part;
        part = 0;
        return function() {
          return;
          return log((part++) + ":state.createPubsub.set:" + (JSON.stringify(data)) + "|" + (getFullName(thisComponent)));
        };
      }
    };
  },
  pubsub: function(thisComponent, name) {
    return {
      on: function(options, callback) {
        var parts;
        parts = [0, 0, 0];
        return function(partIndex, data) {
          var logText;
          return;
          logText = partIndex + ":" + (parts[partIndex]++) + ":state.pubsub.on:" + name + ":" + (JSON.stringify(options));
          if (partIndex === 1) {
            logText += ':' + JSON.stringify(data);
          }
          logText += "|" + (getFullName(thisComponent));
          return log(logText);
        };
      },
      set: function(data) {
        var part;
        part = 0;
        return function() {
          return;
          return log((part++) + ":state.pubsub.set:" + name + ":" + (JSON.stringify(data)) + "|" + (getFullName(thisComponent)));
        };
      }
    };
  },
  all: function(thisComponent, options, keys, callback) {
    var parts;
    parts = [0, 0, 0];
    return function(partIndex, data) {
      return;
      return log(partIndex + ":" + (parts[partIndex]++) + ":state.all:" + (JSON.stringify(keys)) + ":" + (JSON.stringify(options)) + (data ? ':' + JSON.stringify(data) : '') + "|" + (getFullName(thisComponent)));
    };
  }
};

exports.service = {
  get: function(thisComponent, url, params) {
    return function(data) {
      return;
      return log("service.get:" + url + (params ? ':' + JSON.stringify(params) : '') + (data ? ':' + JSON.stringify(data) : '') + "|" + (getFullName(thisComponent)));
    };
  },
  post: function(thisComponent, url, params) {
    return function(data) {
      return;
      return log("service.post:" + url + (params ? ':' + JSON.stringify(params) : '') + (data ? ':' + JSON.stringify(data) : '') + "|" + (getFullName(thisComponent)));
    };
  }
};


},{}],31:[function(require,module,exports){
exports.emailIsValid = function(email) {
  return /^.+@.+\..+$/.test(email);
};

exports.passwordIsValid = function(password) {
  return password.length >= 6;
};

exports.stateToPersian = function(state) {
  switch (state) {
    case 0:
      return 'ثبت شده';
    case 1:
      return 'تایید اولیه توسط مدیر';
    case 2:
      return 'مصاحبه تلفنی انجام شده';
    case 3:
      return 'اطلاعات تکمیل شده';
    case 4:
      return 'آزمون‌های شخصیت‌شناسی داده شده';
    case 5:
      return 'مصاحبه فنی برگزار شده';
    case 6:
      return 'کمیته جذب برگزار شده';
    case 7:
      return 'جذب شده';
    case 8:
      return 'بایگانی';
  }
};


},{}],32:[function(require,module,exports){
var Q, mock;

Q = require('../../q');

mock = require('./mock');

module.exports = function(isGet, serviceName, params) {
  var url;
  if (params == null) {
    params = {};
  }
  if (mock[serviceName]) {
    return mock[serviceName](params);
  }
  url = "/webApi/" + serviceName;
  if (isGet) {
    url += '?' + Object.keys(params).map(function(param) {
      return param + "=" + params[param];
    }).join('&');
  }
  return Q.promise(function(resolve, reject) {
    var methodType, xhr;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          return resolve(JSON.parse(xhr.responseText));
        } else {
          return reject(xhr.responseText);
        }
      }
    };
    methodType = isGet ? 'GET' : 'POST';
    xhr.open(methodType, url, true);
    if (isGet) {
      return xhr.send();
    } else {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      return xhr.send(Object.keys(params).map(function(param) {
        return param + "=" + params[param];
      }).join('&'));
    }
  });
};


},{"../../q":22,"./mock":36}],33:[function(require,module,exports){
var Q, cruds, eraseCookie, get, gets, post, posts, ref, ref1, state, stateChangingServices, uppercaseFirst,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Q = require('../../q');

state = require('../state');

stateChangingServices = require('./stateChangingServices');

ref = require('./names'), gets = ref.gets, posts = ref.posts, cruds = ref.cruds;

ref1 = require('./getPost'), get = ref1.get, post = ref1.post;

eraseCookie = require('../cookies').eraseCookie;

uppercaseFirst = require('..').uppercaseFirst;

exports.logout = function(automatic) {
  if (automatic == null) {
    automatic = false;
  }
  ['user'].forEach(function(x) {
    return state[x].set(null);
  });
  ['applicants'].forEach(function(stateName) {
    return state[stateName].set([]);
  });
  eraseCookie('JSESSIONID');
  if (automatic !== true) {
    stateChangingServices.logout.endedAt = +new Date();
  }
  return Q();
};

gets.forEach(function(x) {
  return exports[x] = function(params) {
    return get(x, params);
  };
});

posts.forEach(function(x) {
  return exports[x] = function(params) {
    return post(x, params);
  };
});

cruds.forEach(function(arg) {
  var name, persianName, serviceName;
  name = arg.name, persianName = arg.persianName;
  posts.push(serviceName = "create" + (uppercaseFirst(name)));
  return exports[serviceName] = function(entity) {
    return post(serviceName, entity).then(function(id) {
      return state[name + "s"].on({
        once: true
      }, function(entities) {
        entities = entities.slice();
        entity = extend({}, entity, {
          id: id
        });
        entities.push(entity);
        return state[name + "s"].set(entities);
      });
    });
  };
});

cruds.forEach(function(arg) {
  var name, persianName, serviceName;
  name = arg.name, persianName = arg.persianName;
  posts.push(serviceName = "update" + (uppercaseFirst(name)));
  return exports[serviceName] = function(entity) {
    return post(serviceName, entity).then(function() {
      return state[name + "s"].on({
        once: true
      }, function(entities) {
        var previousEntitiy;
        entities = entities.slice();
        previousEntitiy = entities.filter(function(arg1) {
          var id;
          id = arg1.id;
          return id === entity.id;
        })[0];
        entities[entities.indexOf(previousEntitiy)] = extend({}, previousEntitiy, entity);
        return state[name + "s"].set(entities);
      });
    });
  };
});

cruds.forEach(function(arg) {
  var name, persianName, serviceName;
  name = arg.name, persianName = arg.persianName;
  posts.push(serviceName = "delete" + (uppercaseFirst(name)) + "s");
  return exports[serviceName] = function(ids) {
    return post(serviceName, {
      ids: ids
    }).then(function() {
      return state[name + "s"].on({
        once: true
      }, function(entities) {
        entities = entities.filter(function(arg1) {
          var id;
          id = arg1.id;
          return !(indexOf.call(ids, id) >= 0);
        });
        return state[name + "s"].set(entities);
      });
    });
  };
});


},{"..":29,"../../q":22,"../cookies":26,"../state":39,"./getPost":34,"./names":37,"./stateChangingServices":38}],34:[function(require,module,exports){
var ajax, eraseCookie, ex, handle, state, stateChangingServices, states;

ajax = require('./ajax');

stateChangingServices = require('./stateChangingServices');

ex = require('./ex');

states = require('./names').states;

eraseCookie = require('../cookies').eraseCookie;

state = require('../state');

handle = function(isGet) {
  return function(serviceName, params) {
    var ref, startedAt;
    if ((ref = stateChangingServices[serviceName]) != null) {
      ref.running = true;
    }
    startedAt = +new Date();
    return ajax(isGet, serviceName, params)["catch"](function(ex) {
      var ref1, ref2;
      if ((ref1 = stateChangingServices[serviceName]) != null) {
        ref1.running = false;
      }
      if ((ref2 = stateChangingServices[serviceName]) != null) {
        ref2.endedAt = +new Date();
      }
      throw ex;
    }).then(function(response) {
      var ref1, ref2;
      if ((ref1 = stateChangingServices[serviceName]) != null) {
        ref1.running = false;
      }
      if ((ref2 = stateChangingServices[serviceName]) != null) {
        ref2.endedAt = +new Date();
      }
      states.forEach(function(name) {
        var dontSetState, responseValue;
        dontSetState = Object.keys(stateChangingServices).some(function(_serviceName) {
          var service;
          service = stateChangingServices[_serviceName];
          if (service.stateName === name || _serviceName === 'logout') {
            if (_serviceName === serviceName) {
              return false;
            } else if (service.running) {
              return true;
            } else if (!service.endedAt) {
              return false;
            } else {
              return service.endedAt >= startedAt;
            }
          } else {
            return false;
          }
        });
        if (!dontSetState) {
          if (response[name]) {
            responseValue = response[name];
            setTimeout(function() {
              return state[name].set(responseValue);
            });
          }
          if (name === 'user' && response.loggedOut) {
            return setTimeout(function() {
              return ex.logout(true);
            });
          }
        }
      });
      delete response.user;
      delete response.loggedOut;
      if (response.value != null) {
        response = response.value;
      }
      return response;
    });
  };
};

exports.get = handle(true);

exports.post = handle(false);


},{"../cookies":26,"../state":39,"./ajax":32,"./ex":33,"./names":37,"./stateChangingServices":38}],35:[function(require,module,exports){
var Q, ex, get, gets, log, others, post, posts, ref, ref1;

Q = require('../../q');

ex = require('./ex');

ref = require('./names'), gets = ref.gets, posts = ref.posts, others = ref.others;

ref1 = require('./getPost'), get = ref1.get, post = ref1.post;

log = require('../log').service;

exports.instance = function(thisComponent) {
  var exports;
  exports = {};
  gets.concat(posts).concat(others).forEach(function(x) {
    return exports[x] = function(params) {
      var l;
      l = log.get(thisComponent, x, params);
      l();
      return ex[x](params).then(function(data) {
        l(data);
        return data;
      });
    };
  });
  return exports;
};

exports.extendModule = function(fn) {
  return fn(ex);
};

exports.getUser = function() {
  return get('getUser');
};

exports.autoPing = function() {
  var fn;
  return (fn = function() {
    return Q.all([get('ping')["catch"](function() {}), Q.delay(5000)]).fin(function() {
      return setTimeout(fn);
    });
  })();
};


},{"../../q":22,"../log":30,"./ex":33,"./getPost":34,"./names":37}],36:[function(require,module,exports){
var Q, applicants, user;

Q = require('../../q');

applicants = [
  {
    userId: 0,
    firstName: 'علی',
    lastName: 'درستی',
    phoneNumber: '09121234567',
    email: 'dorosty@doin.ir',
    birthday: '1340/1/2',
    selectedJobs: ['Java developer', 'Javascript developer'],
    resume: null,
    personalPic: null,
    modificationTime: 1473132854116,
    notes: [],
    state: 0
  }, {
    userId: 1,
    firstName: 'سعید',
    lastName: 'قیومیه',
    phoneNumber: '09121234567',
    email: 'ghayoomi@dotin.ir',
    birthday: '1343/4/5',
    selectedJobs: ['UX designer'],
    resume: null,
    personalPic: null,
    modificationTime: 1373132854116,
    notes: ['aaaaaaaaaaaa'],
    state: 1
  }
];

user = {
  ssid: '0016503368',
  personalPic: null,
  name: 'حامد حسینی‌نژاد',
  userType: 0,
  phoneNumber: '09121234567',
  email: 'dorosty@doin.ir',
  birthday: '1340/1/2',
  personalPic: null,
  modificationTime: 1473132854116,
  notes: [],
  selectedJobs: ['Java developer', 'Javascript developer'],
  resume: null,
  state: 0
};

exports.ping = function() {
  return Q({
    user: user,
    applicants: applicants
  });
};

exports.getUser = function() {
  return Q({
    user: user
  });
};

exports.login = function(arg) {
  var email;
  email = arg.email;
  return Q.delay(1000 + 2000 * Math.floor(Math.random())).then(function() {
    switch (email) {
      case 'hosseininejad@dotin.ir':
        return {
          user: user = {
            name: 'حامد حسینی‌نژاد',
            type: 'hr'
          },
          applicants: applicants
        };
      case 'mohammadkhani@dotin.ir':
        return {
          user: user = {
            name: 'روح‌الله محمد‌خانی',
            type: 'manager'
          },
          applicants: applicants
        };
      case 'dorosty@dotin.ir':
        return {
          user: user = {
            name: 'علی درستی',
            type: 'applicant'
          }
        };
      default:
        throw 'invalid';
    }
  });
};

exports.logout = function(arg) {
  var email, password;
  email = arg.email, password = arg.password;
  return Q.delay(1000 + 2000 * Math.floor(Math.random())).then(function() {
    return {
      loggedOut: true
    };
  });
};

exports.addJob = function() {
  return Q.delay(1000 + 2000 * Math.floor(Math.random())).then(function() {
    return {};
  });
};

exports.getCaptcha = function() {
  return Q.delay(1000 + 2000 * Math.floor(Math.random())).then(function() {
    return '12*x=48';
  });
};


},{"../../q":22}],37:[function(require,module,exports){
exports.gets = ['getCaptcha', 'getUser'];

exports.posts = ['login', 'addJob', 'submitProfileData'];

exports.cruds = [
  {
    name: 'person',
    persianName: 'شخص'
  }
];

exports.others = ['logout'];

exports.states = ['user', 'applicants'];


},{}],38:[function(require,module,exports){
var cruds, uppercaseFirst;

cruds = require('./names').cruds;

uppercaseFirst = require('..').uppercaseFirst;

module.exports = {
  logout: {
    stateName: 'user'
  },
  login: {
    stateName: 'user'
  }
};

cruds.forEach(function(arg) {
  var name;
  name = arg.name;
  ['create', 'update'].forEach(function(method) {
    return module.exports["" + method + (uppercaseFirst(name))] = {
      stateName: name + "s"
    };
  });
  return module.exports["delete" + (uppercaseFirst(name)) + "s"] = {
    stateName: name + "s"
  };
});


},{"..":29,"./names":37}],39:[function(require,module,exports){
var createPubSub, log, names, pubSubs;

names = require('./names');

log = require('../log').state;

createPubSub = function(name) {
  var data, dataNotNull, subscribers;
  data = dataNotNull = void 0;
  subscribers = [];
  return {
    on: function(options, callback) {
      var firstDataSent, unsubscribe, wrappedCallback;
      firstDataSent = false;
      if (!options.omitFirst) {
        if (!options.allowNull) {
          if (dataNotNull !== void 0) {
            callback(dataNotNull);
            firstDataSent = true;
          }
        } else {
          callback(data);
          firstDataSent = true;
        }
      }
      if (options.once && !options.omitFirst && firstDataSent) {
        return function() {};
      }
      subscribers.push(wrappedCallback = function(data) {
        if (!options.allowNull && (data == null)) {
          return;
        }
        callback(data);
        if (options.once) {
          return unsubscribe();
        }
      });
      return unsubscribe = function() {
        var index;
        index = subscribers.indexOf(wrappedCallback);
        if (~index) {
          return subscribers.splice(index, 1);
        }
      };
    },
    set: function(_data) {
      if (JSON.stringify(data) === JSON.stringify(_data)) {
        return;
      }
      data = _data;
      if (data != null) {
        dataNotNull = data;
      }
      return subscribers.forEach(function(callback) {
        return callback(data);
      });
    }
  };
};

pubSubs = names.map(function(name) {
  return {
    name: name,
    pubSub: exports[name] = createPubSub(name)
  };
});

exports.instance = function(thisComponent) {
  var exports;
  exports = {};
  exports.createPubSub = function(name) {
    var l, pubsub;
    l = log.pubsub(thisComponent, name);
    pubsub = createPubSub(name);
    return {
      on: function() {
        var callback, ll, options, prevOff, unsubscribe;
        if (arguments.length === 1) {
          callback = arguments[0];
          options = {};
        } else {
          options = arguments[0], callback = arguments[1];
        }
        ll = l.on(options, callback);
        ll(0);
        unsubscribe = pubSub.on(options, function(data) {
          ll(1, data);
          callback(data);
          return ll(1, data);
        });
        ll(0);
        unsubscribe = (function(unsubscribe) {
          return function() {
            ll(2);
            unsubscribe();
            return ll(2);
          };
        })(unsubscribe);
        prevOff = thisComponent.fn.off;
        thisComponent.fn.off = function() {
          prevOff();
          return unsubscribe();
        };
        return unsubscribe;
      },
      set: function() {
        var ll;
        ll = l.set(data);
        ll();
        pubSub.set(data);
        return ll();
      }
    };
  };
  pubSubs.forEach(function(arg) {
    var instancePubSub, l, name, pubSub;
    name = arg.name, pubSub = arg.pubSub;
    l = log.pubsub(thisComponent, name);
    instancePubSub = {};
    instancePubSub.on = function() {
      var callback, ll, options, prevOff, unsubscribe;
      if (arguments.length === 1) {
        callback = arguments[0];
        options = {};
      } else {
        options = arguments[0], callback = arguments[1];
      }
      ll = l.on(options, callback);
      ll(0);
      unsubscribe = pubSub.on(options, function(data) {
        ll(1, data);
        callback(data);
        return ll(1, data);
      });
      ll(0);
      unsubscribe = (function(unsubscribe) {
        return function() {
          ll(2);
          unsubscribe();
          return ll(2);
        };
      })(unsubscribe);
      prevOff = thisComponent.fn.off;
      thisComponent.fn.off = function() {
        prevOff();
        return unsubscribe();
      };
      return unsubscribe;
    };
    instancePubSub.set = function(data) {
      var ll;
      ll = l.set(data);
      ll();
      pubSub.set(data);
      return ll();
    };
    return exports[name] = instancePubSub;
  });
  exports.all = function() {
    var callback, keys, l, options, prevOff, resolved, unsubscribe, unsubscribes, values;
    if (arguments.length === 2) {
      keys = arguments[0], callback = arguments[1];
      options = {};
    } else {
      keys = arguments[0], options = arguments[1], callback = arguments[2];
    }
    l = log.all(thisComponent, options, keys, callback);
    resolved = {};
    values = {};
    l(0);
    unsubscribes = keys.map(function(key) {
      return exports[key].on(options, function(value) {
        resolved[key] = true;
        values[key] = value;
        if (keys.every(function(keys) {
          return resolved[keys];
        })) {
          l(1);
          callback(keys.map(function(key) {
            return values[key];
          }));
          return l(1);
        }
      });
    });
    l(0);
    unsubscribe = function() {
      l(2);
      unsubscribes.forEach(function(unsubscribe) {
        return unsubscribe();
      });
      return l(2);
    };
    prevOff = thisComponent.fn.off;
    thisComponent.fn.off = function() {
      prevOff();
      return unsubscribe();
    };
    return unsubscribe;
  };
  return exports;
};


},{"../log":30,"./names":40}],40:[function(require,module,exports){
module.exports = ['user', 'applicants'];


},{}],41:[function(require,module,exports){
var component, style;

component = require('../../../../utils/component');

style = require('./style');

module.exports = component('applicantFormEducation', function(arg, setData) {
  var E, dom;
  dom = arg.dom;
  E = dom.E;
  return E(null, 'education');
});


},{"../../../../utils/component":25,"./style":42}],42:[function(require,module,exports){



},{}],43:[function(require,module,exports){
var component, dropdown, extend, style;

component = require('../../../../utils/component');

style = require('./style');

dropdown = require('../../../../components/dropdown');

extend = require('../../../../utils').extend;

module.exports = component('applicantFormEnglish', function(arg, setData) {
  var E, dom, setStyle;
  dom = arg.dom;
  E = dom.E, setStyle = dom.setStyle;
  return E(null, ['مکالمه', 'نوشتن', 'خواندن'].map(function(label) {
    var f;
    f = E(dropdown, {
      getTitle: function(x) {
        switch (x) {
          case 0:
            return 'قوی';
          case 1:
            return 'متوسط';
          case 2:
            return 'ضعیف';
        }
      }
    });
    f.update([0, 1, 2]);
    f.showEmpty(true);
    setStyle(f, style.dropdownPlaceholder);
    setStyle(f.input, style.input);
    return E(style.column, E(style.label, label), f);
  }), E(style.clearfix));
});


},{"../../../../components/dropdown":9,"../../../../utils":29,"../../../../utils/component":25,"./style":44}],44:[function(require,module,exports){
exports.clearfix = {
  clear: 'both'
};

exports.column = {
  float: 'right',
  width: '33%'
};

exports.label = {
  fontSize: 12,
  lineHeight: 30,
  fontWeight: 'bold',
  float: 'right',
  width: '15%',
  margin: '0 2%',
  textAlign: 'left',
  transition: '0.2s',
  color: '#5c5555'
};

exports.dropdownPlaceholder = {
  float: 'right',
  width: '57%'
};

exports.input = {
  fontSize: 12,
  height: 30,
  lineHeight: 30,
  borderRadius: 2,
  padding: '0 5px',
  outline: 'none',
  width: '100%',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555',
  paddingLeft: 30
};


},{}],45:[function(require,module,exports){
var checkbox, component, education, english, others, overview, personalInfo, reputation, scrollViewer, style, talents;

component = require('../../../utils/component');

style = require('./style');

overview = require('./overview');

scrollViewer = require('../../../components/scrollViewer');

checkbox = require('../../../components/checkbox');

personalInfo = require('./personalInfo');

education = require('./education');

talents = require('./talents');

english = require('./english');

reputation = require('./reputation');

others = require('./others');

module.exports = component('applicantForm', function(arg) {
  var E, accept, data, dom, hide, scroll, setData, show, submit, view;
  dom = arg.dom;
  E = dom.E, show = dom.show, hide = dom.hide;
  data = {
    'مشخصات فردی': {
      'جنسیت': 0,
      'وضعیت تاهل': 2
    }
  };
  setData = function(category) {
    return function(key, value) {
      if (data[category] == null) {
        data[category] = {};
      }
      if (value != null) {
        return data[category][key] = value;
      } else {
        return delete data[category][key];
      }
    };
  };
  view = E(null, E(overview), scroll = E(scrollViewer), E(style.header, 'مشخصات فردی'), E(personalInfo, {
    setData: setData('مشخصات فردی')
  }), E(style.header, 'سوابق تحصیلی'), E(education, {
    setData: setData('سوابق تحصیلی')
  }), E(style.header, 'توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها'), E(talents, {
    setData: setData('توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها')
  }), E(style.header, 'مهارت زبان انگلیسی'), E(english, {
    setData: setData('مهارت زبان انگلیسی')
  }), E(style.header, 'آخرین سوابق سازمانی و پروژه‌ای'), E(reputation, {
    setData: setData('آخرین سوابق سازمانی و پروژه‌ای')
  }), E(style.header, 'سایر اطلاعات'), E(others, {
    setData: setData('سایر اطلاعات')
  }), E(style.checkboxWrapper, accept = E(checkbox, 'صحت اطلاعات تکمیل شده در فرم فوق را تأیید نموده و خود را ملزم به پاسخگویی در برابر صحت اطلاعات آن می‌دانم.')), hide(submit = E(style.submit, 'ثبت نهایی اطلاعات')));
  accept.onChange(function() {
    if (accept.value()) {
      return show(submit);
    } else {
      return hide(submit);
    }
  });
  return view;
});


},{"../../../components/checkbox":3,"../../../components/scrollViewer":18,"../../../utils/component":25,"./education":41,"./english":43,"./others":46,"./overview":48,"./personalInfo":50,"./reputation":54,"./style":56,"./talents":57}],46:[function(require,module,exports){
var component, style;

component = require('../../../../utils/component');

style = require('./style');

module.exports = component('applicantFormOthers', function(arg, setData) {
  var E, dom;
  dom = arg.dom;
  E = dom.E;
  return E(null, 'others');
});


},{"../../../../utils/component":25,"./style":47}],47:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42}],48:[function(require,module,exports){
var component, extend, monthToString, ref, style, toDate;

component = require('../../../../utils/component');

style = require('./style');

ref = require('../../../../utils'), extend = ref.extend, toDate = ref.toDate, monthToString = ref.monthToString;

module.exports = component('applicantFormOverview', function(arg) {
  var E, append, birthday, createdAt, dom, empty, jobs, name, profileImg, resumeLink, setStyle, ssid, state, view;
  dom = arg.dom, state = arg.state;
  E = dom.E, setStyle = dom.setStyle, append = dom.append, empty = dom.empty;
  view = E(null, E(style.section, profileImg = E('img', style.sectionCircle), E(style.sectionText, name = E(style.sectionTitle), birthday = E(style.regular), ssid = E(style.regular), createdAt = E(style.regular))), E(style.section, E(style.sectionCircle, E(extend({
    "class": 'fa fa-suitcase'
  }, style.sectionIcon))), E(style.sectionText, E(style.sectionTitle, 'شغل‌های درخواستی'), jobs = E())), E(style.section, E(style.sectionCircle, E(extend({
    "class": 'fa fa-download'
  }, style.sectionIcon))), E(style.sectionText, E(style.sectionTitle, 'دریافت رزومه متقاضی'), resumeLink = E('a', style.resumeLink, 'دریافت رزومه'))));
  state.user.on(function(user) {
    var birthdayString;
    birthdayString = user.birthday.split('/');
    birthdayString[1] = monthToString(birthdayString[1]);
    birthdayString = [birthdayString[2], birthdayString[1], birthdayString[0]].join(' ');
    setStyle(profileImg, {
      src: user.personalPic ? "/webApi/image?address=" + personalPic : 'assets/img/default-avatar-small.png'
    });
    setStyle(name, {
      text: user.name
    });
    setStyle(birthday, {
      text: 'متولد ' + birthdayString
    });
    setStyle(ssid, {
      text: 'کد ملی: ' + user.ssid
    });
    setStyle(createdAt, {
      text: 'تاریخ ثبت: ' + toDate(user.modificationTime)
    });
    empty(jobs);
    append(jobs, user.selectedJobs.map(function(job) {
      return E(style.job, job);
    }));
    return setStyle(resumeLink, {
      href: '/webApi/resume?address=' + user.resume
    });
  });
  return view;
});


},{"../../../../utils":29,"../../../../utils/component":25,"./style":49}],49:[function(require,module,exports){
exports.section = {
  display: 'inline-block',
  width: '33%',
  height: 200
};

exports.sectionCircle = {
  float: 'right',
  width: 80,
  height: 80,
  borderRadius: 100,
  marginLeft: 20,
  backgroundColor: '#ccc',
  position: 'relative'
};

exports.sectionIcon = {
  fontSize: 50,
  width: 50,
  height: 50,
  position: 'absolute',
  top: 15,
  right: 15
};

exports.sectionText = {
  float: 'right'
};

exports.sectionTitle = {
  marginTop: 20,
  fontSize: 20,
  fontWeight: 'bold',
  color: '#5c5555',
  marginBottom: 5
};

exports.regular = {
  margin: '5px 0',
  color: '#5c5555'
};

exports.job = {
  width: 160,
  height: 30,
  lineHeight: 20,
  fontSize: 12,
  borderRadius: 2,
  margin: '10px 0',
  padding: 5,
  backgroundColor: '#449e73',
  color: 'white'
};

exports.resumeLink = {
  target: '_blank',
  color: '#449e73',
  textDecoration: 'underline',
  cursor: 'pointer'
};


},{}],50:[function(require,module,exports){
var checkbox, component, dateInput, dropdown, extend, multivalue, numberInput, phoneNumberInput, radioSwitch, ref, remove, style, tooltip;

component = require('../../../../utils/component');

style = require('./style');

tooltip = require('../../../../components/tooltip');

radioSwitch = require('../../../../components/radioSwitch');

dateInput = require('../../../../components/dateInput');

dropdown = require('../../../../components/dropdown');

numberInput = require('../../../../components/restrictedInput/number');

phoneNumberInput = require('../../../../components/restrictedInput/phoneNumber');

checkbox = require('../../../../components/checkbox');

multivalue = require('./multivalue');

ref = require('../../../../utils'), extend = ref.extend, remove = ref.remove;

module.exports = component('applicantFormPersonalInfo', function(arg, arg1) {
  var E, addTextField, address2, checkbox2, dom, events, f, fieldArrays, fieldCollections, groupArrays, hide, hideMoaf, hideTooltips, labelArrays, onEvent, phone2, setData, setOff, setStyle, show, view;
  dom = arg.dom, events = arg.events, setOff = arg.setOff;
  setData = arg1.setData;
  E = dom.E, setStyle = dom.setStyle, show = dom.show, hide = dom.hide;
  onEvent = events.onEvent;
  fieldCollections = [0, 1, 2].map(function() {
    return {};
  });
  addTextField = function(column, label, extraStyle) {
    var f;
    if (extraStyle == null) {
      extraStyle = {};
    }
    fieldCollections[column][label] = f = E('input', extend(extraStyle, style.input));
    return onEvent(f, ['input', 'pInput'], (function(f) {
      return function() {
        return setData(label, f.value());
      };
    })(f));
  };
  fieldCollections[0]['جنسیت'] = f = E(radioSwitch, {
    getTitle: function(x) {
      switch (x) {
        case 0:
          return 'مرد';
        case 1:
          return 'زن';
      }
    }
  });
  f.update([0, 1]);
  f.onChange((function(f) {
    return function() {
      return setData('جنسیت', f.value());
    };
  })(f));
  addTextField(0, 'نام پدر');
  addTextField(0, 'شماره شناسنامه');
  addTextField(0, 'محل تولد');
  addTextField(0, 'محل صدور');
  addTextField(0, 'ملیت');
  addTextField(0, 'تابعیت');
  addTextField(0, 'دین');
  fieldCollections[0]['تاریخ تولد'] = f = E(dateInput);
  setStyle(f, style.dateInputPlaceholder);
  setStyle(f.input, style.specialInput);
  onEvent(f, ['input', 'pInput'], (function(f) {
    return function() {
      return setData('تاریخ تولد', f.value());
    };
  })(f));
  fieldCollections[1]['وضعیت نظام وظیفه'] = f = E(dropdown, {
    getTitle: function(x) {
      switch (x) {
        case 0:
          return 'اتمام';
        case 1:
          return 'مشمول';
        case 2:
          return 'معاف';
      }
    }
  });
  f.update([0, 1, 2]);
  f.showEmpty(true);
  setStyle(f, style.dropdownPlaceholder);
  setStyle(f.input, style.specialInput);
  onEvent(f.input, ['input', 'pInput'], (function(f) {
    return function() {
      return setData('وضعیت نظام وظیفه', f.value());
    };
  })(f));
  fieldCollections[1]['نوع معافیت'] = f = E(dropdown, {
    getTitle: function(x) {
      switch (x) {
        case 0:
          return 'پزشکی';
        case 1:
          return 'سایر';
      }
    }
  });
  f.update([0, 1]);
  f.showEmpty(true);
  setStyle(f, style.dropdownPlaceholder);
  setStyle(f.input, style.specialInput);
  onEvent(f.input, ['input', 'pInput'], (function(f) {
    return function() {
      return setData('نوع معافیت', f.value());
    };
  })(f));
  addTextField(1, 'دلیل معافیت');
  fieldCollections[1]['وضعیت تاهل'] = f = E(radioSwitch, {
    getTitle: function(x) {
      switch (x) {
        case 0:
          return 'مجرد';
        case 1:
          return 'متاهل';
        case 2:
          return 'سایر';
      }
    }
  });
  f.update([0, 1, 2]);
  f.setSelectedId(2);
  f.onChange((function(f) {
    return function() {
      return setData('وضعیت تاهل', f.value());
    };
  })(f));
  fieldCollections[1]['تعداد فرزندان'] = f = E(numberInput);
  setStyle(f, style.numberInput);
  onEvent(f, ['input', 'pInput'], (function(f) {
    return function() {
      return setData('تعداد فرزندان', f.value());
    };
  })(f));
  fieldCollections[1]['تعداد افراد تحت تکلف'] = f = E(numberInput);
  setStyle(f, style.numberInput);
  onEvent(f, ['input', 'pInput'], (function(f) {
    return function() {
      return setData('تعداد افراد تحت تکلف', f.value());
    };
  })(f));
  addTextField(1, 'نام معرف', {
    placeholder: 'اختیاری'
  });
  fieldCollections[2]['ایمیل'] = f = E(multivalue, E('input', style.input));
  f.onChange((function(f) {
    return function() {
      return setData('ایمیل', f.value());
    };
  })(f));
  f = E(phoneNumberInput);
  setStyle(f, style.input);
  fieldCollections[2]['تلفن همراه'] = f = E(multivalue, f);
  f.onChange((function(f) {
    return function() {
      return setData('تلفن همراه', f.value());
    };
  })(f));
  groupArrays = [];
  labelArrays = [];
  fieldArrays = [];
  fieldCollections.forEach(function(fieldCollection) {
    var fieldArray, groupArray, labelArray;
    groupArrays.push(groupArray = []);
    labelArrays.push(labelArray = []);
    fieldArrays.push(fieldArray = []);
    return Object.keys(fieldCollection).forEach(function(labelText) {
      var field, group, label;
      group = E(style.group, label = E(style.label, labelText + ':'), field = fieldCollection[labelText], E(style.clearfix));
      groupArray.push(group);
      labelArray.push(label);
      return fieldArray.push(field);
    });
  });
  hideTooltips = [];
  fieldArrays.forEach(function(fieldArray, i) {
    var labelArray;
    labelArray = labelArrays[i];
    return fieldArray.forEach(function(field, j) {
      var hideTooltip, input, label, timeout;
      if (i === 1 && j === 6) {
        return;
      }
      if (field.input) {
        input = field.input;
      } else {
        input = field;
      }
      hideTooltip = timeout = void 0;
      label = labelArray[j];
      onEvent(input, ['focus', 'input', 'pInput'], function() {
        setStyle([label, input], style.valid);
        if (timeout && !((field.value() == null) || field.value() === -1 || (typeof (field.value()) === 'string' && !field.value().trim()))) {
          return clearTimeout(timeout);
        } else {
          return typeof hideTooltip === "function" ? hideTooltip() : void 0;
        }
      });
      return onEvent(input, 'blur', function() {
        if ((field.value() == null) || field.value() === -1 || (typeof (field.value()) === 'string' && !field.value().trim())) {
          return timeout = setTimeout((function() {
            var h;
            setStyle([label, input], style.invalid);
            h = tooltip(input, 'تکمیل این فیلد الزامیست...');
            return hideTooltips.push(hideTooltip = function() {
              h();
              return remove(hideTooltips, hideTooltip);
            });
          }), 100);
        }
      });
    });
  });
  (hideMoaf = function() {
    hide(groupArrays[1][1]);
    return hide(groupArrays[1][2]);
  })();
  onEvent(fieldCollections[1]['وضعیت نظام وظیفه'].input, ['input', 'pInput'], function() {
    if (fieldCollections[1]['وضعیت نظام وظیفه'].value() === 2) {
      show(groupArrays[1][1]);
      return show(groupArrays[1][2]);
    } else {
      return hideMoaf();
    }
  });
  setOff(function() {
    return hideTooltips.forEach(function(hideTooltip) {
      return hideTooltip();
    });
  });
  view = E(null, groupArrays.map(function(groupArray) {
    return E(style.column, groupArray);
  }), E(style.clearfix), E({
    margin: '20px 0'
  }, E(style.bigLabel, 'مشخصات محل سکونت دائم:'), E('input', extend({
    placeholder: 'آدرس پستی'
  }, style.address)), E('input', extend({
    placeholder: 'تلفن تماس - 0218558555'
  }, style.phoneNumber))), E({
    margin: '20px 0'
  }, checkbox2 = E(checkbox, 'محل سکونت فعلی‌ام با محل سکونت دائم فوق متفاوت است.'), hide(address2 = E('input', extend({
    placeholder: 'آدرس پستی محل سکونت'
  }, style.address))), hide(phone2 = E('input', extend({
    placeholder: 'تلفن تماس محل سکونت'
  }, style.phoneNumber)))));
  checkbox2.onChange(function() {
    if (checkbox2.value()) {
      return show([address2, phone2]);
    } else {
      return hide([address2, phone2]);
    }
  });
  return view;
});


},{"../../../../components/checkbox":3,"../../../../components/dateInput":5,"../../../../components/dropdown":9,"../../../../components/radioSwitch":13,"../../../../components/restrictedInput/number":16,"../../../../components/restrictedInput/phoneNumber":17,"../../../../components/tooltip":19,"../../../../utils":29,"../../../../utils/component":25,"./multivalue":51,"./style":53}],51:[function(require,module,exports){
var component, extend, ref, remove, style;

component = require('../../../../../utils/component');

style = require('./style');

ref = require('../../../../../utils'), extend = ref.extend, remove = ref.remove;

module.exports = component('personalInfoMultivalue', function(arg, input) {
  var E, add, addPanel, append, changeListener, data, destroy, dom, events, isAdding, items, itemsPlaceholder, onEvent, returnObject, setStyle, setViewHeight, submit, view;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  E = dom.E, setStyle = dom.setStyle, append = dom.append, destroy = dom.destroy;
  onEvent = events.onEvent;
  changeListener = void 0;
  isAdding = false;
  data = [];
  items = [];
  view = E(style.view, itemsPlaceholder = E(), E(style.addIconDiv, add = E(style.add)), addPanel = E(style.addPanel, input, submit = E(style.submit)));
  setStyle(input, style.input);
  setViewHeight = function() {
    return setStyle(view, {
      height: (items.length + 1) * 30
    });
  };
  onEvent(add, 'click', function() {
    isAdding = true;
    setStyle(add, style.addHidden);
    setStyle(addPanel, style.addPanelActive);
    return setViewHeight();
  });
  onEvent(submit, 'click', function() {
    var newItem, removeItem;
    isAdding = false;
    setStyle(add, style.add);
    setStyle(addPanel, style.addPanel);
    newItem = E(style.item, E(extend({
      englishText: input.value()
    }, style.itemText)), removeItem = E(style.remove));
    append(itemsPlaceholder, newItem);
    data.push(input.value());
    items.push(newItem);
    setViewHeight();
    setStyle(input, {
      value: ''
    });
    if (typeof changeListener === "function") {
      changeListener();
    }
    return onEvent(removeItem, 'click', function() {
      destroy(newItem);
      data.splice(items.indexOf(newItem), 1);
      remove(items, newItem);
      setViewHeight();
      return typeof changeListener === "function" ? changeListener() : void 0;
    });
  });
  returnObject({
    onChange: function(listener) {
      return changeListener = listener;
    },
    value: function() {
      return data;
    }
  });
  return view;
});


},{"../../../../../utils":29,"../../../../../utils/component":25,"./style":52}],52:[function(require,module,exports){
var extend, icon;

extend = require('../../../../../utils').extend;

exports.visible = {
  opacity: 1,
  visibility: 'visible'
};

exports.view = {
  position: 'relative',
  transition: '0.2s',
  height: 30,
  paddingTop: 7
};

exports.item = {
  width: '57%',
  float: 'left',
  position: 'relative',
  height: 30
};

exports.itemText = {};

exports.addIconDiv = {
  width: '57%',
  float: 'left'
};

exports.addPanel = {
  position: 'absolute',
  width: '57%',
  left: 0,
  bottom: 0,
  transition: '0.2s',
  height: 0,
  opacity: 0,
  visibility: 'hidden'
};

exports.addPanelActive = {
  height: 38,
  opacity: 1,
  visibility: 'visible'
};

exports.input = {
  position: 'absolute',
  width: '80%',
  bottom: 0
};

icon = {
  cursor: 'pointer',
  width: 20,
  height: 20,
  fontSize: 20
};

exports.add = extend({}, icon, {
  "class": 'fa fa-plus-circle',
  color: '#449e73',
  flaot: 'left',
  transition: '0.2s',
  opacity: 1,
  visibility: 'visible'
});

exports.addHidden = {
  opacity: 0,
  visibility: 'hidden'
};

exports.submit = extend({}, icon, {
  "class": 'fa fa-check-circle',
  color: '#449e73',
  marginRight: 10,
  position: 'absolute',
  top: null,
  bottom: 5,
  left: 0
});

exports.remove = extend({}, icon, {
  "class": 'fa fa-minus-circle',
  color: '#d71d24',
  position: 'absolute',
  top: 0,
  left: 0
});


},{"../../../../../utils":29}],53:[function(require,module,exports){
var extend;

extend = require('../../../../utils').extend;

exports.clearfix = {
  clear: 'both'
};

exports.column = {
  float: 'right',
  width: '33%'
};

exports.group = {
  margin: '7px 0'
};

exports.label = {
  fontSize: 12,
  lineHeight: 30,
  fontWeight: 'bold',
  float: 'right',
  width: '35%',
  margin: '0 2%',
  textAlign: 'left',
  transition: '0.2s',
  color: '#5c5555'
};

exports.input = {
  fontSize: 12,
  height: 30,
  lineHeight: 30,
  borderRadius: 2,
  padding: '0 5px',
  outline: 'none',
  width: '57%',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555'
};

exports.dropdownPlaceholder = {
  float: 'right',
  width: '57%'
};

exports.dateInputPlaceholder = {
  float: 'right',
  width: '40%'
};

exports.specialInput = extend({}, exports.input, {
  width: '100%',
  paddingLeft: 30
});

exports.numberInput = extend({}, exports.input, {
  width: '15%',
  direction: 'ltr'
});

exports.valid = {
  color: '#5c5555',
  borderColor: '#ccc'
};

exports.invalid = {
  color: '#c00',
  borderColor: '#c00'
};

exports.bigLabel = {
  fontSize: 12,
  lineHeight: 30,
  fontWeight: 'bold',
  transition: '0.2s',
  color: '#5c5555'
};

exports.address = extend({}, exports.input, {
  width: '60%',
  margin: '5px 0 5px 1%'
});

exports.phoneNumber = extend({}, exports.input, {
  width: '20%'
});


},{"../../../../utils":29}],54:[function(require,module,exports){
var component, style;

component = require('../../../../utils/component');

style = require('./style');

module.exports = component('applicantFormReputation', function(arg, setData) {
  var E, dom;
  dom = arg.dom;
  E = dom.E;
  return E(null, 'reputation');
});


},{"../../../../utils/component":25,"./style":55}],55:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42}],56:[function(require,module,exports){
exports.header = {
  color: '#449e73',
  fontSize: 18,
  marginTop: 50,
  marginBottom: 20
};

exports.checkboxWrapper = {
  margin: '50px 0 0'
};

exports.submit = {
  fontSize: 12,
  borderRadius: 5,
  backgroundColor: '#449e73',
  color: 'white',
  margin: '10px 0',
  display: 'inline-block',
  float: 'left',
  padding: '5px 15px',
  cursor: 'pointer'
};


},{}],57:[function(require,module,exports){
var component, style;

component = require('../../../../utils/component');

style = require('./style');

module.exports = component('applicantFormTalents', function(arg, setData) {
  var E, dom;
  dom = arg.dom;
  E = dom.E;
  return E('table', null, E('thead', null, E('tr', null, E('th', null, 'شایستگی / مهارت'), E('th', null, 'علاقه به کار در این حوزه'), E('th', null, 'دانش و مهارت در این حوزه'), E('th'))), E('tbody', null, E('tr', null, E('td', null, E('input')), E('td', null, E('input')), E('td', null, E('input')))));
});


},{"../../../../utils/component":25,"./style":58}],58:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42}],59:[function(require,module,exports){
var component, extend, form, style, tabContents, tabNames, tests;

component = require('../../utils/component');

style = require('./style');

form = require('./form');

tests = require('./tests');

extend = require('../../utils').extend;

tabNames = ['اطلاعات تکمیلی', 'آزمون'];

tabContents = [form, tests];

module.exports = component('applicantView', function(arg) {
  var E, append, changeTabIndex, content, contents, currentTabIndex, destroy, dom, events, logout, onEvent, service, setStyle, t1, t2, t3, tabs, text, view;
  dom = arg.dom, events = arg.events, service = arg.service;
  E = dom.E, text = dom.text, setStyle = dom.setStyle, append = dom.append, destroy = dom.destroy;
  onEvent = events.onEvent;
  content = void 0;
  currentTabIndex = 0;
  view = E(style.view, logout = E(style.logout, E(style.logoutIcon), text('خروج')), E(style.status, E(style.statusSegment, E(style.statusCircle), E(extend({
    "class": 'fa fa-check'
  }, style.statusIcon)), t1 = E(style.statusText, 'ثبت')), E(style.statusConnector), E(style.statusSegment, E(style.statusCircle), E(extend({
    "class": 'fa fa-check'
  }, style.statusIcon)), t2 = E(style.statusText, 'مصاحبه تلفنی')), E(style.statusConnectorActive), E(style.statusSegment, E(style.statusCircleActive), E(extend({
    "class": 'fa fa-question'
  }, style.statusIcon)), t3 = E(style.statusTextActive, 'در انتظار تکمیل اطلاعات'))), E(style.tabs, tabs = tabNames.map(function(tabName, index) {
    var tab;
    tab = E(style.tab, tabName);
    onEvent(tab, 'click', function() {
      return changeTabIndex(index);
    });
    onEvent(tab, 'mouseover', function() {
      return setStyle(tab, style.tabActive);
    });
    onEvent(tab, 'mouseout', function() {
      if (currentTabIndex !== index) {
        return setStyle(tab, style.tab);
      }
    });
    return tab;
  })), contents = E(style.contents));
  onEvent(logout, 'click', function() {
    return service.logout();
  });
  setTimeout(function() {
    return [t1, t2, t3].forEach(function(t) {
      return setStyle(t, {
        marginRight: -t.fn.element.offsetWidth / 2 + 15
      });
    });
  });
  changeTabIndex = function(index) {
    if (content) {
      destroy(content);
    }
    setStyle(tabs[currentTabIndex], style.tab);
    currentTabIndex = index;
    append(contents, content = E(tabContents[currentTabIndex]));
    return setStyle(tabs[currentTabIndex], style.tabActive);
  };
  changeTabIndex(0);
  return view;
});


},{"../../utils":29,"../../utils/component":25,"./form":45,"./style":60,"./tests":61}],60:[function(require,module,exports){
var extend;

extend = require('../../utils').extend;

exports.view = {
  width: 1000,
  margin: '0 auto'
};

exports.logout = {
  float: 'left',
  position: 'relative',
  left: 20,
  cursor: 'pointer',
  color: '#5c5555'
};

exports.logoutIcon = {
  "class": 'fa fa-power-off',
  position: 'absolute',
  top: 4,
  left: -20
};

exports.status = {
  marginTop: 20,
  height: 100
};

exports.statusSegment = {
  position: 'relative',
  display: 'inline-block',
  width: 30
};

exports.statusCircle = {
  width: 30,
  height: 30,
  borderRadius: 100,
  backgroundColor: '#ccc',
  position: 'relative'
};

exports.statusCircleActive = extend({}, exports.statusCircle, {
  backgroundColor: '#449e73'
});

exports.statusIcon = {
  position: 'absolute',
  color: 'white',
  top: 7,
  left: 7,
  fontSize: 16,
  width: 16,
  height: 16,
  lineHeight: 16,
  textAlign: 'center'
};

exports.statusText = {
  position: 'absolute',
  display: 'inline-block',
  color: '#ccc',
  top: 30,
  fontSize: 13,
  marginTop: 2,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

exports.statusTextActive = extend({}, exports.statusText, {
  color: '#449e73'
});

exports.statusConnector = {
  display: 'inline-block',
  position: 'relative',
  top: -13,
  width: 100,
  height: 4,
  backgroundColor: '#ccc'
};

exports.statusConnectorActive = extend({}, exports.statusConnector, {
  backgroundColor: '#449e73'
});

exports.tabs = {
  borderBottom: '1px solid #ccc'
};

exports.tab = {
  display: 'inline-block',
  cursor: 'pointer',
  marginLeft: 20,
  padding: 5,
  transition: '0.2s',
  color: '#5c5555',
  borderBottom: '3px solid white'
};

exports.tabActive = {
  color: '#449e73',
  borderColor: '#449e73'
};

exports.contents = {
  marginTop: 30
};


},{"../../utils":29}],61:[function(require,module,exports){
var component;

component = require('../../../utils/component');

module.exports = component('applicantTests', function(arg) {
  var E, dom;
  dom = arg.dom;
  E = dom.E;
  return E(null, 'آزمون‌های شخصیت‌شناسی');
});


},{"../../../utils/component":25}],62:[function(require,module,exports){
var component, extend, jobs, ref, style, toEnglish;

component = require('../../utils/component');

style = require('./style');

ref = require('../../utils'), extend = ref.extend, toEnglish = ref.toEnglish;

jobs = require('./jobs');

module.exports = component('apply', function(arg) {
  var E, append, dom, events, i, j, jobsPlaceholder, onEvent, results, results1, setStyle, text, view;
  dom = arg.dom, events = arg.events;
  E = dom.E, text = dom.text, append = dom.append, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  view = E('span', null, E(style.header, E(style.headerMarginfix), E(style.title, 'تقاضای استخدام'), E(style.breadcrumbs, E({
    color: 'white'
  }, E('a', style.breadcrumbsLink, 'خانه'), E('i', {
    "class": 'fa fa-angle-double-left'
  }), E('a', style.breadcrumbsLink, 'دعوت به همکاری'), E('i', {
    "class": 'fa fa-angle-double-left'
  }), E('a', style.breadcrumbsLinkActive, 'تقاضای استخدام')))), E(style.sectionTitle, 'انتخاب شغل های مورد تقاضا'), jobsPlaceholder = E(), E(style.form, E(style.formBackground), E(style.formInner, E(style.formTitle, 'مشخصات فردی'), [
    {
      key: 'name',
      text: 'نام*',
      isPersian: true
    }, {
      key: 'surname',
      text: 'نام خانوادگی*',
      isPersian: true
    }, {
      key: 'ssid',
      text: 'کد ملی*',
      isNumber: true
    }, {
      key: 'phoneNumber',
      text: 'تلفن همراه*',
      isNumber: true
    }, {
      key: 'email',
      text: 'ایمیل*'
    }
  ].map(function(arg1) {
    var group, input, isNumber, isPersian, key, previousValue, text, tooltip;
    key = arg1.key, text = arg1.text, isNumber = arg1.isNumber, isPersian = arg1.isPersian;
    tooltip = void 0;
    group = E(null, input = E('input', extend({
      placeholder: text
    }, style.formInput)));
    if (isNumber || isPersian) {
      previousValue = '';
      onEvent(input, 'input', function() {
        if ((!isNumber || !(isNaN(toEnglish(input.value())))) && (!isPersian || (/^[آئا-ی]*$/.test(input.value())))) {
          $(input.fn.element).tooltip('destroy');
          previousValue = input.value();
        } else {
          if (tooltip === 2) {
            $(input.fn.element).tooltip('destroy');
          }
          tooltip = 1;
          setTimeout(function() {
            $(input.fn.element).tooltip({
              trigger: 'manual',
              placement: 'bottom',
              title: isNumber ? 'لطفا عدد وارد کنید.' : 'لطفا زبان کیبورد را به فارسی تغییر دهید.'
            });
            return setTimeout(function() {
              return $(input.fn.element).tooltip('show');
            });
          });
        }
        return setStyle(input, {
          value: previousValue
        });
      });
    }
    onEvent(input, 'blur', function() {
      if ((key === 'phoneNumber' && (toEnglish(input.value()).indexOf('09') !== 0 || input.value().length !== 11)) || (key === 'ssid' && input.value().length !== 10)) {
        if (tooltip === 1) {
          $(input.fn.element).tooltip('destroy');
        }
        tooltip = 2;
        return setTimeout(function() {
          $(input.fn.element).tooltip({
            trigger: 'manual',
            placement: 'left',
            template: '<div class="tooltip" role="tooltip"> <div class="tooltip-arrow" style="border-left-color: red"></div> <div class="tooltip-inner" style="background-color: red"></div> </div>',
            title: key === 'phoneNumber' ? 'شماره تلفن وارد شده معتبر نیست.' : 'کد ملی وارد شده معتبر نیست.'
          });
          return setTimeout(function() {
            return $(input.fn.element).tooltip('show');
          });
        });
      } else {
        return $(input.fn.element).tooltip('destroy');
      }
    });
    return group;
  }), E(null, text('تاریخ تولد'), E(style.formBirthdayLabel, 'روز'), E('select', style.formBirthdayDropdown, (function() {
    results = [];
    for (i = 1; i <= 31; i++){ results.push(i); }
    return results;
  }).apply(this).map(function(x) {
    return E('option', null, x);
  })), E(style.formBirthdayLabel, 'ماه'), E('select', style.formBirthdayDropdown, ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'].map(function(x) {
    return E('option', null, x);
  })), E(style.formBirthdayLabel, 'سال'), E('select', style.formBirthdayDropdown, (function() {
    results1 = [];
    for (j = 1340; j <= 1390; j++){ results1.push(j); }
    return results1;
  }).apply(this).map(function(x) {
    return E('option', null, x);
  }))), E(style.formResume, (function() {
    var button;
    button = E(style.formResumeButton, E('i', {
      "class": 'fa fa-paperclip',
      fontSize: 20,
      marginLeft: 10
    }), text('بارگذاری رزومه'));
    onEvent(button, 'mouseover', function() {
      return setStyle(button, style.formResumeButtonHover);
    });
    onEvent(button, 'mouseout', function() {
      return setStyle(button, style.formResumeButton);
    });
    return button;
  })(), (function() {
    var link;
    link = E('a', style.formResumeLink, 'نمونه رزومه');
    onEvent(link, 'mouseover', function() {
      return setStyle(link, style.formResumeLinkHover);
    });
    onEvent(link, 'mouseout', function() {
      return setStyle(link, style.formResumeLink);
    });
    return link;
  })()), E(style.submit, 'ارسال'))), E(style.footer, E(style.footerText, text('© ۱۳۹۵ '), E('a', style.footerLogo)), E(style.footerSubtext, text('تمامی حقوق مادی و معنوی این وبسایت متعلق به '), E('a', style.footerLink, 'شرکت داتیس آرین قشم (داتین)'), text(' است'))));
  jobs.forEach(function(arg1) {
    var chores, description, icon, requirements, title;
    title = arg1.title, description = arg1.description, icon = arg1.icon, requirements = arg1.requirements, chores = arg1.chores;
    return append(jobsPlaceholder, E(style.job, E(style.jobHeader, E(style.jobAdorner), E(style.jobAdorner2), E(style.jobTitle, title), E(extend({
      html: description
    }, style.jobDescription)))));
  });
  return view;
});


},{"../../utils":29,"../../utils/component":25,"./jobs":63,"./style":64}],63:[function(require,module,exports){
module.exports = [{
    id: 1,
    title: 'کارشناس کنترل کیفیت',
    description: 'حفظ و بهبود نرم افزارهای موجود و تلاش در جهت توسعه ویژگی‌های جدید و مورد نیاز مشتری.<br />طراحی و پیاده‌سازی نیازهای استخراج‌شده‌ی مشتری. همکاری در تیم با دیگر توسعه دهندگان نرم افزار، تحلیلگران، آزمون‌گران، و غیره.',
    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">st0{}.st1{}.st2{}.st3{}.st4{opacity:0.4;}.st5{clip-path:url(#XMLID_462_);}.st6{clip-path:url(#XMLID_479_);}.st7{clip-path:url(#XMLID_717_);}.st8{}.st9{opacity:0.3;}.st10{}.st11{}.st12{opacity:0.7;}.st13{stroke:#114632;stroke-width:2;stroke-miterlimit:10;}.st14{opacity:0.5;}.st15{opacity:0.7;stroke:#114632;stroke-linejoin:bevel;stroke-miterlimit:10;}.st16{opacity:0.3;}.st17{opacity:0.7;}.st18{stroke:#F7901E;stroke-width:2;stroke-miterlimit:10;}.st19{opacity:0.5;}.st20{opacity:0.7;stroke:#F7901E;stroke-linejoin:bevel;stroke-miterlimit:10;}.st21{}.st22{}.st23{stroke:#FFFFFF;stroke-miterlimit:10;}.st24{opacity:0.3;}.st25{stroke:#FFF9E7;stroke-width:2;stroke-miterlimit:10;}.st26{opacity:0.5;}.st27{opacity:0.7;stroke:#C8E0D7;stroke-linejoin:bevel;stroke-miterlimit:10;}.st28{clip-path:url(#XMLID_719_);}.st29{clip-path:url(#XMLID_723_);}.st30{}.st31{}.st32{stroke:#F7901E;stroke-width:2;stroke-miterlimit:10;}.st33{}.st34{stroke:#E0E0E0;stroke-miterlimit:10;}.st35{}.st36{}.st37{stroke:#E5E5E5;stroke-miterlimit:10;}.st38{display:none;stroke:#E5E5E5;stroke-miterlimit:10;}.st39{}.st40{}.st41{display:none;}.st42{stroke:#78C19D;stroke-miterlimit:10;}.st43{stroke:#F1F1F1;stroke-miterlimit:10;}.st44{stroke:#78C19D;stroke-miterlimit:10;}.st45{stroke:#78C19D;stroke-miterlimit:10;}.st46{}.st47{stroke:#B2B2B2;stroke-miterlimit:10;}.st48{stroke:#B2B2B2;stroke-miterlimit:10;}.st49{stroke:#78C19D;stroke-width:0.5;stroke-miterlimit:10;}.st50{clip-path:url(#XMLID_901_);}.st51{clip-path:url(#XMLID_902_);}.st52{}.st53{stroke:#F0EBDF;stroke-miterlimit:10;}.st54{stroke:#E8DBBA;stroke-miterlimit:10;}.st55{}.st56{opacity:0.75;}.st57{}.st58{stroke:#F5EEDC;stroke-miterlimit:10;}.st59{stroke:#F5EEDC;stroke-miterlimit:10;}.st60{opacity:0.1;}</style><g id="New_Symbol"></g><g id="XMLID_465_"><g id="XMLID_2096_"><g id="XMLID_2105_"><g id="XMLID_2106_"><path id="XMLID_2114_" class="st3" d="M6.2,21.4C6.2,21.4,6.2,21.3,6.2,21.4c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0,0,0.1-0.1c0,0,0-0.1,0.1-0.1c0,0,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.3v-1.8c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0,0.1,0.1,0.1c0,0,0,0.1,0,0.1v1.8c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2-0.1,0.2c0,0.1-0.1,0.1-0.1,0.2c0,0.1-0.1,0.1-0.2,0.2c-0.1,0.1-0.1,0.1-0.2,0.1C7.1,21.9,7,22,6.9,22c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.2l0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1l0,0c0,0,0.1,0,0.1,0C6.1,21.3,6.2,21.3,6.2,21.4"/><path id="XMLID_2111_" class="st3" d="M10.2,22C10.2,22,10.1,22,10.2,22c-0.1,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.2c0-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0.1-0.2c0-0.1,0.1-0.1,0.1-0.2c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0v-0.1c0-0.1,0-0.1,0-0.2c0,0,0-0.1-0.1-0.1c0,0-0.1-0.1-0.2-0.1c-0.1,0-0.2,0-0.4,0c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0l0,0c0,0-0.1,0-0.1-0.1c0,0,0-0.1-0.1-0.1l0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1l0,0l0,0c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1c0,0,0.1,0.1,0.1,0.2c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1,0,0.2v1.5c0,0,0,0.1,0,0.1c0,0,0,0.1-0.1,0.1c0,0-0.1,0-0.1,0.1C10.3,22,10.2,22,10.2,22z M9.3,20.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1,0c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0C9.4,20.8,9.3,20.8,9.3,20.8z"/><path id="XMLID_2110_" class="st3" d="M12,22C12,22,11.9,22,12,22c-0.1,0-0.1,0-0.1,0c0,0,0,0-0.1,0c0,0,0,0,0-0.1l-0.9-2.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0,0.1,0.1,0.1L12,21l0.7-1.5c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0,0.1,0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1l-0.9,2.1c0,0,0,0,0,0.1c0,0,0,0-0.1,0C12.1,22,12.1,22,12,22C12.1,22,12,22,12,22z"/><path id="XMLID_2107_" class="st3" d="M15.6,22C15.6,22,15.6,22,15.6,22c-0.1,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.2c0-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0.1-0.2c0-0.1,0.1-0.1,0.1-0.2c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0v-0.1c0-0.1,0-0.1,0-0.2c0,0,0-0.1-0.1-0.1c0,0-0.1-0.1-0.2-0.1c-0.1,0-0.2,0-0.4,0c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0l0,0c0,0-0.1,0-0.1-0.1c0,0,0-0.1-0.1-0.1l0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1l0,0l0,0c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1c0,0,0.1,0.1,0.1,0.2c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1,0,0.2v1.5c0,0,0,0.1,0,0.1c0,0,0,0.1-0.1,0.1c0,0-0.1,0-0.1,0.1C15.7,22,15.7,22,15.6,22z M14.7,20.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1,0c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0C14.9,20.8,14.8,20.8,14.7,20.8z"/></g></g><path id="XMLID_2104_" class="st3" d="M12.1,8.9c-0.1,0-0.2,0-0.2-0.1c0-0.1,0-0.1,0-0.2c0-0.1,0.1-0.1,0.1-0.1c0.3-0.1,0.5-0.3,0.6-0.6c0.1-0.2,0-0.3,0-0.5c-0.1-0.1-0.1-0.2-0.2-0.3c-0.1-0.1-0.1-0.2-0.2-0.3C12,6.7,12,6.6,12,6.5c0-0.1,0-0.2,0-0.3c0,0,0-0.1,0-0.1C12.2,5.5,12.5,5,13,4.8c0,0,0.1,0,0.1,0c0.1,0,0.2,0,0.2,0.1c0,0.1,0,0.1,0,0.2c0,0.1-0.1,0.1-0.1,0.1c0,0-0.1,0-0.1,0.1l0,0c0,0,0,0,0,0l0,0c0,0,0,0,0,0c-0.1,0-0.1,0.1-0.2,0.2c-0.1,0.1-0.2,0.2-0.2,0.4c0,0.1-0.1,0.2-0.1,0.3c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1l0,0l0,0c0,0,0,0,0,0.1c0,0,0.1,0.1,0.1,0.2c0.2,0.4,0.5,0.7,0.4,1.2c-0.1,0.4-0.4,0.8-0.8,1C12.2,8.9,12.1,8.9,12.1,8.9z"/><path id="XMLID_2103_" class="st3" d="M10.4,10.3c-0.7,0-1.4,0-1.9-0.1C7.3,10,7.1,9.7,7.1,9.5c0-0.4,0.6-0.6,0.8-0.7c0.4-0.1,0.9-0.2,1.5-0.3L9.5,9c-0.6,0.1-1,0.2-1.4,0.3c0,0,0,0,0,0L8,9.4C8,9.4,8,9.5,8,9.6l0.1,0c0,0,0,0,0,0c0.5,0.1,1.4,0.2,2.3,0.2c0.3,0,0.6,0,0.9,0c1.7-0.1,2.9-0.3,3.4-0.5l0.2,0.5c-0.7,0.3-2,0.5-3.6,0.6C11,10.3,10.7,10.3,10.4,10.3z"/><path id="XMLID_2102_" class="st3" d="M10.7,12c-1.5,0-2.1-0.3-2.3-0.5c-0.2-0.2-0.2-0.3-0.2-0.4c0-0.1,0-0.3,0.6-0.5L8.9,11c0,0-0.3,0.2-0.3,0.2l0.3,0.1c0.2,0.1,0.7,0.2,1.8,0.2c0.3,0,0.5,0,0.8,0c1-0.1,2.3-0.3,2.7-0.4l0.1,0.5c-0.4,0.1-1.7,0.3-2.8,0.4C11.2,12,10.9,12,10.7,12z"/><path id="XMLID_2101_" class="st3" d="M9.3,12.9L9.3,12.9c0,0.2,0.1,0.3,0.2,0.4c0.2,0.1,0.7,0.2,1.3,0.2c0.9,0,2.3-0.1,3-0.4l0.2,0.5c-0.8,0.4-2.2,0.5-3.2,0.5c-0.7,0-1.2-0.1-1.5-0.3c-0.3-0.2-0.5-0.5-0.5-0.8c0-0.2,0.2-0.4,0.3-0.5l0.2,0.4"/><path id="XMLID_2100_" class="st3" d="M11.1,15.9c-1.3,0-2.4-0.1-3.4-0.3c-1.9-0.4-1.9-0.8-1.9-1c0-0.2,0.1-0.3,0.2-0.4c0.3-0.3,1-0.5,1.8-0.5v0.5c-0.7,0-1.1,0.2-1.3,0.3l-0.2,0.1l0.2,0.1C6.6,14.8,7.1,15,8,15.1c0.9,0.2,2,0.2,3.1,0.2c0.2,0,0.4,0,0.7,0c3-0.1,4.5-0.7,5.3-1.3l0.3,0.4c-0.8,0.6-2.4,1.3-5.6,1.4C11.6,15.9,11.3,15.9,11.1,15.9z"/><path id="XMLID_2099_" class="st3" d="M11.6,17.1c-1.5,0-2.9-0.1-4.1-0.4l0.1-0.5c1.1,0.3,2.5,0.4,4,0.4c3.3,0,5.2-0.9,6.3-1.6l0.3,0.4C17.1,16.2,15.1,17.1,11.6,17.1z"/><path id="XMLID_2098_" class="st3" d="M15.3,11.6c0.2,0,0.5-0.1,0.7-0.2c0.5-0.2,1-0.6,1.2-0.9c0.1-0.2,0.4-0.6,0.2-1c-0.1-0.3-0.6-0.6-1.2-0.6c-0.1,0-0.3,0-0.4,0l-0.1-0.5c0.2,0,0.3,0,0.5,0c0.8,0,1.4,0.3,1.7,0.9c0.2,0.4,0.1,1-0.3,1.5c-0.3,0.5-0.8,0.9-1.5,1.1c-0.3,0.1-0.5,0.2-0.8,0.2L15.3,11.6z"/><path id="XMLID_2097_" class="st3" d="M11.6,7.9c-0.1,0-0.2-0.1-0.2-0.1c-0.3-0.4-0.7-0.9-0.8-1.5c-0.1-0.6,0-1.1,0.3-1.5c0.2-0.2,0.4-0.4,0.7-0.6C11.7,4,11.9,3.8,12,3.7c0.5-0.4,0.6-0.9,0.5-1.4c0-0.1,0-0.1,0-0.2C12.6,2,12.7,2,12.8,2c0.1,0,0.2,0.1,0.3,0.2c0.1,0.5,0,1.1-0.3,1.5c-0.2,0.3-0.5,0.6-0.9,0.8c-0.1,0.1-0.2,0.1-0.3,0.2C11.1,5.1,11,5.5,11,6c0.1,0.5,0.4,1,0.7,1.4l0,0.1c0,0,0,0.1,0,0.2c0,0.1-0.1,0.2-0.1,0.2C11.7,7.9,11.6,7.9,11.6,7.9z"/></g></g></svg>',
    requirements: [
        'اصول برنامه نویسی و طراحی شی گرا'
    ],
    chores: [
        'اصول برنامه نویسی و طراحی شی گرا',
        'مهارت در Angular JS، جاوا اسکریپت، MVC، فرم‌های وب Asp.net',
        'مهارت بالا در چارچوب‌های دات نت و C#',
        'دانش و مهارتSQL Server',
        'آشنایی با مفاهیم  وب‌سرویس، WCF، SOA، WEP API',
        'آشنایی با مفاهیم امنیت در تولید نرم‌افزار',
        'تخصص در طراحی، توسعه، تست و برنامه‌های کاربردی استقرار',
        'داشتن حداقل 3 سال سابقه کار مرتبط یک مزیت محسوب خواهد شد.',
        'آشنایی با مفاهیم حوزه بانکی یک مزیت محسوب خواهد شد.'
    ],
    selected: true
}, {
    id: 2,
    title: 'برنامه نویس جاوا',
    description: 'حفظ و بهبود نرم افزارهای موجود و تلاش در جهت توسعه ویژگی‌های جدید و مورد نیاز مشتری.',
    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">st0{}.st1{}.st2{}.st3{}.st4{opacity:0.4;}.st5{clip-path:url(#XMLID_462_);}.st6{clip-path:url(#XMLID_479_);}.st7{clip-path:url(#XMLID_717_);}.st8{}.st9{opacity:0.3;}.st10{}.st11{}.st12{opacity:0.7;}.st13{stroke:#114632;stroke-width:2;stroke-miterlimit:10;}.st14{opacity:0.5;}.st15{opacity:0.7;stroke:#114632;stroke-linejoin:bevel;stroke-miterlimit:10;}.st16{opacity:0.3;}.st17{opacity:0.7;}.st18{stroke:#F7901E;stroke-width:2;stroke-miterlimit:10;}.st19{opacity:0.5;}.st20{opacity:0.7;stroke:#F7901E;stroke-linejoin:bevel;stroke-miterlimit:10;}.st21{}.st22{}.st23{stroke:#FFFFFF;stroke-miterlimit:10;}.st24{opacity:0.3;}.st25{stroke:#FFF9E7;stroke-width:2;stroke-miterlimit:10;}.st26{opacity:0.5;}.st27{opacity:0.7;stroke:#C8E0D7;stroke-linejoin:bevel;stroke-miterlimit:10;}.st28{clip-path:url(#XMLID_719_);}.st29{clip-path:url(#XMLID_723_);}.st30{}.st31{}.st32{stroke:#F7901E;stroke-width:2;stroke-miterlimit:10;}.st33{}.st34{stroke:#E0E0E0;stroke-miterlimit:10;}.st35{}.st36{}.st37{stroke:#E5E5E5;stroke-miterlimit:10;}.st38{display:none;stroke:#E5E5E5;stroke-miterlimit:10;}.st39{}.st40{}.st41{display:none;}.st42{stroke:#78C19D;stroke-miterlimit:10;}.st43{stroke:#F1F1F1;stroke-miterlimit:10;}.st44{stroke:#78C19D;stroke-miterlimit:10;}.st45{stroke:#78C19D;stroke-miterlimit:10;}.st46{}.st47{stroke:#B2B2B2;stroke-miterlimit:10;}.st48{stroke:#B2B2B2;stroke-miterlimit:10;}.st49{stroke:#78C19D;stroke-width:0.5;stroke-miterlimit:10;}.st50{clip-path:url(#XMLID_901_);}.st51{clip-path:url(#XMLID_902_);}.st52{}.st53{stroke:#F0EBDF;stroke-miterlimit:10;}.st54{stroke:#E8DBBA;stroke-miterlimit:10;}.st55{}.st56{opacity:0.75;}.st57{}.st58{stroke:#F5EEDC;stroke-miterlimit:10;}.st59{stroke:#F5EEDC;stroke-miterlimit:10;}.st60{opacity:0.1;}</style><g id="New_Symbol"></g><g id="XMLID_465_"><g id="XMLID_2096_"><g id="XMLID_2105_"><g id="XMLID_2106_"><path id="XMLID_2114_" class="st3" d="M6.2,21.4C6.2,21.4,6.2,21.3,6.2,21.4c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0,0,0.1-0.1c0,0,0-0.1,0.1-0.1c0,0,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.3v-1.8c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0,0.1,0.1,0.1c0,0,0,0.1,0,0.1v1.8c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2-0.1,0.2c0,0.1-0.1,0.1-0.1,0.2c0,0.1-0.1,0.1-0.2,0.2c-0.1,0.1-0.1,0.1-0.2,0.1C7.1,21.9,7,22,6.9,22c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.2l0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1l0,0c0,0,0.1,0,0.1,0C6.1,21.3,6.2,21.3,6.2,21.4"/><path id="XMLID_2111_" class="st3" d="M10.2,22C10.2,22,10.1,22,10.2,22c-0.1,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.2c0-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0.1-0.2c0-0.1,0.1-0.1,0.1-0.2c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0v-0.1c0-0.1,0-0.1,0-0.2c0,0,0-0.1-0.1-0.1c0,0-0.1-0.1-0.2-0.1c-0.1,0-0.2,0-0.4,0c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0l0,0c0,0-0.1,0-0.1-0.1c0,0,0-0.1-0.1-0.1l0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1l0,0l0,0c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1c0,0,0.1,0.1,0.1,0.2c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1,0,0.2v1.5c0,0,0,0.1,0,0.1c0,0,0,0.1-0.1,0.1c0,0-0.1,0-0.1,0.1C10.3,22,10.2,22,10.2,22z M9.3,20.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1,0c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0C9.4,20.8,9.3,20.8,9.3,20.8z"/><path id="XMLID_2110_" class="st3" d="M12,22C12,22,11.9,22,12,22c-0.1,0-0.1,0-0.1,0c0,0,0,0-0.1,0c0,0,0,0,0-0.1l-0.9-2.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0,0.1,0.1,0.1L12,21l0.7-1.5c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0,0.1,0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1l-0.9,2.1c0,0,0,0,0,0.1c0,0,0,0-0.1,0C12.1,22,12.1,22,12,22C12.1,22,12,22,12,22z"/><path id="XMLID_2107_" class="st3" d="M15.6,22C15.6,22,15.6,22,15.6,22c-0.1,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.2c0-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0.1-0.2c0-0.1,0.1-0.1,0.1-0.2c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0v-0.1c0-0.1,0-0.1,0-0.2c0,0,0-0.1-0.1-0.1c0,0-0.1-0.1-0.2-0.1c-0.1,0-0.2,0-0.4,0c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0l0,0c0,0-0.1,0-0.1-0.1c0,0,0-0.1-0.1-0.1l0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1l0,0l0,0c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1c0,0,0.1,0.1,0.1,0.2c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1,0,0.2v1.5c0,0,0,0.1,0,0.1c0,0,0,0.1-0.1,0.1c0,0-0.1,0-0.1,0.1C15.7,22,15.7,22,15.6,22z M14.7,20.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1,0c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0C14.9,20.8,14.8,20.8,14.7,20.8z"/></g></g><path id="XMLID_2104_" class="st3" d="M12.1,8.9c-0.1,0-0.2,0-0.2-0.1c0-0.1,0-0.1,0-0.2c0-0.1,0.1-0.1,0.1-0.1c0.3-0.1,0.5-0.3,0.6-0.6c0.1-0.2,0-0.3,0-0.5c-0.1-0.1-0.1-0.2-0.2-0.3c-0.1-0.1-0.1-0.2-0.2-0.3C12,6.7,12,6.6,12,6.5c0-0.1,0-0.2,0-0.3c0,0,0-0.1,0-0.1C12.2,5.5,12.5,5,13,4.8c0,0,0.1,0,0.1,0c0.1,0,0.2,0,0.2,0.1c0,0.1,0,0.1,0,0.2c0,0.1-0.1,0.1-0.1,0.1c0,0-0.1,0-0.1,0.1l0,0c0,0,0,0,0,0l0,0c0,0,0,0,0,0c-0.1,0-0.1,0.1-0.2,0.2c-0.1,0.1-0.2,0.2-0.2,0.4c0,0.1-0.1,0.2-0.1,0.3c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1l0,0l0,0c0,0,0,0,0,0.1c0,0,0.1,0.1,0.1,0.2c0.2,0.4,0.5,0.7,0.4,1.2c-0.1,0.4-0.4,0.8-0.8,1C12.2,8.9,12.1,8.9,12.1,8.9z"/><path id="XMLID_2103_" class="st3" d="M10.4,10.3c-0.7,0-1.4,0-1.9-0.1C7.3,10,7.1,9.7,7.1,9.5c0-0.4,0.6-0.6,0.8-0.7c0.4-0.1,0.9-0.2,1.5-0.3L9.5,9c-0.6,0.1-1,0.2-1.4,0.3c0,0,0,0,0,0L8,9.4C8,9.4,8,9.5,8,9.6l0.1,0c0,0,0,0,0,0c0.5,0.1,1.4,0.2,2.3,0.2c0.3,0,0.6,0,0.9,0c1.7-0.1,2.9-0.3,3.4-0.5l0.2,0.5c-0.7,0.3-2,0.5-3.6,0.6C11,10.3,10.7,10.3,10.4,10.3z"/><path id="XMLID_2102_" class="st3" d="M10.7,12c-1.5,0-2.1-0.3-2.3-0.5c-0.2-0.2-0.2-0.3-0.2-0.4c0-0.1,0-0.3,0.6-0.5L8.9,11c0,0-0.3,0.2-0.3,0.2l0.3,0.1c0.2,0.1,0.7,0.2,1.8,0.2c0.3,0,0.5,0,0.8,0c1-0.1,2.3-0.3,2.7-0.4l0.1,0.5c-0.4,0.1-1.7,0.3-2.8,0.4C11.2,12,10.9,12,10.7,12z"/><path id="XMLID_2101_" class="st3" d="M9.3,12.9L9.3,12.9c0,0.2,0.1,0.3,0.2,0.4c0.2,0.1,0.7,0.2,1.3,0.2c0.9,0,2.3-0.1,3-0.4l0.2,0.5c-0.8,0.4-2.2,0.5-3.2,0.5c-0.7,0-1.2-0.1-1.5-0.3c-0.3-0.2-0.5-0.5-0.5-0.8c0-0.2,0.2-0.4,0.3-0.5l0.2,0.4"/><path id="XMLID_2100_" class="st3" d="M11.1,15.9c-1.3,0-2.4-0.1-3.4-0.3c-1.9-0.4-1.9-0.8-1.9-1c0-0.2,0.1-0.3,0.2-0.4c0.3-0.3,1-0.5,1.8-0.5v0.5c-0.7,0-1.1,0.2-1.3,0.3l-0.2,0.1l0.2,0.1C6.6,14.8,7.1,15,8,15.1c0.9,0.2,2,0.2,3.1,0.2c0.2,0,0.4,0,0.7,0c3-0.1,4.5-0.7,5.3-1.3l0.3,0.4c-0.8,0.6-2.4,1.3-5.6,1.4C11.6,15.9,11.3,15.9,11.1,15.9z"/><path id="XMLID_2099_" class="st3" d="M11.6,17.1c-1.5,0-2.9-0.1-4.1-0.4l0.1-0.5c1.1,0.3,2.5,0.4,4,0.4c3.3,0,5.2-0.9,6.3-1.6l0.3,0.4C17.1,16.2,15.1,17.1,11.6,17.1z"/><path id="XMLID_2098_" class="st3" d="M15.3,11.6c0.2,0,0.5-0.1,0.7-0.2c0.5-0.2,1-0.6,1.2-0.9c0.1-0.2,0.4-0.6,0.2-1c-0.1-0.3-0.6-0.6-1.2-0.6c-0.1,0-0.3,0-0.4,0l-0.1-0.5c0.2,0,0.3,0,0.5,0c0.8,0,1.4,0.3,1.7,0.9c0.2,0.4,0.1,1-0.3,1.5c-0.3,0.5-0.8,0.9-1.5,1.1c-0.3,0.1-0.5,0.2-0.8,0.2L15.3,11.6z"/><path id="XMLID_2097_" class="st3" d="M11.6,7.9c-0.1,0-0.2-0.1-0.2-0.1c-0.3-0.4-0.7-0.9-0.8-1.5c-0.1-0.6,0-1.1,0.3-1.5c0.2-0.2,0.4-0.4,0.7-0.6C11.7,4,11.9,3.8,12,3.7c0.5-0.4,0.6-0.9,0.5-1.4c0-0.1,0-0.1,0-0.2C12.6,2,12.7,2,12.8,2c0.1,0,0.2,0.1,0.3,0.2c0.1,0.5,0,1.1-0.3,1.5c-0.2,0.3-0.5,0.6-0.9,0.8c-0.1,0.1-0.2,0.1-0.3,0.2C11.1,5.1,11,5.5,11,6c0.1,0.5,0.4,1,0.7,1.4l0,0.1c0,0,0,0.1,0,0.2c0,0.1-0.1,0.2-0.1,0.2C11.7,7.9,11.6,7.9,11.6,7.9z"/></g></g></svg>',
    requirements: [
        'اصول برنامه نویسی و طراحی شی گرا',
        'مهارت در Angular JS، جاوا اسکریپت، MVC، فرم‌های وب Asp.net',
        'مهارت بالا در چارچوب‌های دات نت و C#',
        'دانش و مهارتSQL Server',
        'آشنایی با مفاهیم  وب‌سرویس، WCF، SOA، WEP API',
        'آشنایی با مفاهیم امنیت در تولید نرم‌افزار',
        'تخصص در طراحی، توسعه، تست و برنامه‌های کاربردی استقرار',
        'داشتن حداقل 3 سال سابقه کار مرتبط یک مزیت محسوب خواهد شد.',
        'آشنایی با مفاهیم حوزه بانکی یک مزیت محسوب خواهد شد.'
    ],
    chores: [
        'اصول برنامه نویسی و طراحی شی گرا'
    ],
    selected: true
}, {
    id: 3,
    title: 'برنامه نویس دات نت',
    description: 'حفظ و بهبود نرم افزارهای موجود و تلاش در جهت توسعه ویژگی‌های جدید و مورد نیاز مشتری.<br />طراحی و پیاده‌سازی نیازهای استخراج‌شده‌ی مشتری. همکاری در تیم با دیگر توسعه دهندگان نرم افزار، تحلیلگران، آزمون‌گران، و غیره.',
    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">st0{}.st1{}.st2{}.st3{}.st4{opacity:0.4;}.st5{clip-path:url(#XMLID_462_);}.st6{clip-path:url(#XMLID_479_);}.st7{clip-path:url(#XMLID_717_);}.st8{}.st9{opacity:0.3;}.st10{}.st11{}.st12{opacity:0.7;}.st13{stroke:#114632;stroke-width:2;stroke-miterlimit:10;}.st14{opacity:0.5;}.st15{opacity:0.7;stroke:#114632;stroke-linejoin:bevel;stroke-miterlimit:10;}.st16{opacity:0.3;}.st17{opacity:0.7;}.st18{stroke:#F7901E;stroke-width:2;stroke-miterlimit:10;}.st19{opacity:0.5;}.st20{opacity:0.7;stroke:#F7901E;stroke-linejoin:bevel;stroke-miterlimit:10;}.st21{}.st22{}.st23{stroke:#FFFFFF;stroke-miterlimit:10;}.st24{opacity:0.3;}.st25{stroke:#FFF9E7;stroke-width:2;stroke-miterlimit:10;}.st26{opacity:0.5;}.st27{opacity:0.7;stroke:#C8E0D7;stroke-linejoin:bevel;stroke-miterlimit:10;}.st28{clip-path:url(#XMLID_719_);}.st29{clip-path:url(#XMLID_723_);}.st30{}.st31{}.st32{stroke:#F7901E;stroke-width:2;stroke-miterlimit:10;}.st33{}.st34{stroke:#E0E0E0;stroke-miterlimit:10;}.st35{}.st36{}.st37{stroke:#E5E5E5;stroke-miterlimit:10;}.st38{display:none;stroke:#E5E5E5;stroke-miterlimit:10;}.st39{}.st40{}.st41{display:none;}.st42{stroke:#78C19D;stroke-miterlimit:10;}.st43{stroke:#F1F1F1;stroke-miterlimit:10;}.st44{stroke:#78C19D;stroke-miterlimit:10;}.st45{stroke:#78C19D;stroke-miterlimit:10;}.st46{}.st47{stroke:#B2B2B2;stroke-miterlimit:10;}.st48{stroke:#B2B2B2;stroke-miterlimit:10;}.st49{stroke:#78C19D;stroke-width:0.5;stroke-miterlimit:10;}.st50{clip-path:url(#XMLID_901_);}.st51{clip-path:url(#XMLID_902_);}.st52{}.st53{stroke:#F0EBDF;stroke-miterlimit:10;}.st54{stroke:#E8DBBA;stroke-miterlimit:10;}.st55{}.st56{opacity:0.75;}.st57{}.st58{stroke:#F5EEDC;stroke-miterlimit:10;}.st59{stroke:#F5EEDC;stroke-miterlimit:10;}.st60{opacity:0.1;}</style><g id="New_Symbol"></g><g id="XMLID_465_"><g id="XMLID_2096_"><g id="XMLID_2105_"><g id="XMLID_2106_"><path id="XMLID_2114_" class="st3" d="M6.2,21.4C6.2,21.4,6.2,21.3,6.2,21.4c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0,0,0.1-0.1c0,0,0-0.1,0.1-0.1c0,0,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.3v-1.8c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0,0.1,0.1,0.1c0,0,0,0.1,0,0.1v1.8c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2-0.1,0.2c0,0.1-0.1,0.1-0.1,0.2c0,0.1-0.1,0.1-0.2,0.2c-0.1,0.1-0.1,0.1-0.2,0.1C7.1,21.9,7,22,6.9,22c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.2l0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1l0,0c0,0,0.1,0,0.1,0C6.1,21.3,6.2,21.3,6.2,21.4"/><path id="XMLID_2111_" class="st3" d="M10.2,22C10.2,22,10.1,22,10.2,22c-0.1,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.2c0-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0.1-0.2c0-0.1,0.1-0.1,0.1-0.2c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0v-0.1c0-0.1,0-0.1,0-0.2c0,0,0-0.1-0.1-0.1c0,0-0.1-0.1-0.2-0.1c-0.1,0-0.2,0-0.4,0c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0l0,0c0,0-0.1,0-0.1-0.1c0,0,0-0.1-0.1-0.1l0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1l0,0l0,0c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1c0,0,0.1,0.1,0.1,0.2c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1,0,0.2v1.5c0,0,0,0.1,0,0.1c0,0,0,0.1-0.1,0.1c0,0-0.1,0-0.1,0.1C10.3,22,10.2,22,10.2,22z M9.3,20.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1,0c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0C9.4,20.8,9.3,20.8,9.3,20.8z"/><path id="XMLID_2110_" class="st3" d="M12,22C12,22,11.9,22,12,22c-0.1,0-0.1,0-0.1,0c0,0,0,0-0.1,0c0,0,0,0,0-0.1l-0.9-2.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0,0.1,0.1,0.1L12,21l0.7-1.5c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0,0.1,0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1l-0.9,2.1c0,0,0,0,0,0.1c0,0,0,0-0.1,0C12.1,22,12.1,22,12,22C12.1,22,12,22,12,22z"/><path id="XMLID_2107_" class="st3" d="M15.6,22C15.6,22,15.6,22,15.6,22c-0.1,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.2c0-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0.1-0.2c0-0.1,0.1-0.1,0.1-0.2c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0v-0.1c0-0.1,0-0.1,0-0.2c0,0,0-0.1-0.1-0.1c0,0-0.1-0.1-0.2-0.1c-0.1,0-0.2,0-0.4,0c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0l0,0c0,0-0.1,0-0.1-0.1c0,0,0-0.1-0.1-0.1l0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1l0,0l0,0c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1c0,0,0.1,0.1,0.1,0.2c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1,0,0.2v1.5c0,0,0,0.1,0,0.1c0,0,0,0.1-0.1,0.1c0,0-0.1,0-0.1,0.1C15.7,22,15.7,22,15.6,22z M14.7,20.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1,0c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0C14.9,20.8,14.8,20.8,14.7,20.8z"/></g></g><path id="XMLID_2104_" class="st3" d="M12.1,8.9c-0.1,0-0.2,0-0.2-0.1c0-0.1,0-0.1,0-0.2c0-0.1,0.1-0.1,0.1-0.1c0.3-0.1,0.5-0.3,0.6-0.6c0.1-0.2,0-0.3,0-0.5c-0.1-0.1-0.1-0.2-0.2-0.3c-0.1-0.1-0.1-0.2-0.2-0.3C12,6.7,12,6.6,12,6.5c0-0.1,0-0.2,0-0.3c0,0,0-0.1,0-0.1C12.2,5.5,12.5,5,13,4.8c0,0,0.1,0,0.1,0c0.1,0,0.2,0,0.2,0.1c0,0.1,0,0.1,0,0.2c0,0.1-0.1,0.1-0.1,0.1c0,0-0.1,0-0.1,0.1l0,0c0,0,0,0,0,0l0,0c0,0,0,0,0,0c-0.1,0-0.1,0.1-0.2,0.2c-0.1,0.1-0.2,0.2-0.2,0.4c0,0.1-0.1,0.2-0.1,0.3c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1l0,0l0,0c0,0,0,0,0,0.1c0,0,0.1,0.1,0.1,0.2c0.2,0.4,0.5,0.7,0.4,1.2c-0.1,0.4-0.4,0.8-0.8,1C12.2,8.9,12.1,8.9,12.1,8.9z"/><path id="XMLID_2103_" class="st3" d="M10.4,10.3c-0.7,0-1.4,0-1.9-0.1C7.3,10,7.1,9.7,7.1,9.5c0-0.4,0.6-0.6,0.8-0.7c0.4-0.1,0.9-0.2,1.5-0.3L9.5,9c-0.6,0.1-1,0.2-1.4,0.3c0,0,0,0,0,0L8,9.4C8,9.4,8,9.5,8,9.6l0.1,0c0,0,0,0,0,0c0.5,0.1,1.4,0.2,2.3,0.2c0.3,0,0.6,0,0.9,0c1.7-0.1,2.9-0.3,3.4-0.5l0.2,0.5c-0.7,0.3-2,0.5-3.6,0.6C11,10.3,10.7,10.3,10.4,10.3z"/><path id="XMLID_2102_" class="st3" d="M10.7,12c-1.5,0-2.1-0.3-2.3-0.5c-0.2-0.2-0.2-0.3-0.2-0.4c0-0.1,0-0.3,0.6-0.5L8.9,11c0,0-0.3,0.2-0.3,0.2l0.3,0.1c0.2,0.1,0.7,0.2,1.8,0.2c0.3,0,0.5,0,0.8,0c1-0.1,2.3-0.3,2.7-0.4l0.1,0.5c-0.4,0.1-1.7,0.3-2.8,0.4C11.2,12,10.9,12,10.7,12z"/><path id="XMLID_2101_" class="st3" d="M9.3,12.9L9.3,12.9c0,0.2,0.1,0.3,0.2,0.4c0.2,0.1,0.7,0.2,1.3,0.2c0.9,0,2.3-0.1,3-0.4l0.2,0.5c-0.8,0.4-2.2,0.5-3.2,0.5c-0.7,0-1.2-0.1-1.5-0.3c-0.3-0.2-0.5-0.5-0.5-0.8c0-0.2,0.2-0.4,0.3-0.5l0.2,0.4"/><path id="XMLID_2100_" class="st3" d="M11.1,15.9c-1.3,0-2.4-0.1-3.4-0.3c-1.9-0.4-1.9-0.8-1.9-1c0-0.2,0.1-0.3,0.2-0.4c0.3-0.3,1-0.5,1.8-0.5v0.5c-0.7,0-1.1,0.2-1.3,0.3l-0.2,0.1l0.2,0.1C6.6,14.8,7.1,15,8,15.1c0.9,0.2,2,0.2,3.1,0.2c0.2,0,0.4,0,0.7,0c3-0.1,4.5-0.7,5.3-1.3l0.3,0.4c-0.8,0.6-2.4,1.3-5.6,1.4C11.6,15.9,11.3,15.9,11.1,15.9z"/><path id="XMLID_2099_" class="st3" d="M11.6,17.1c-1.5,0-2.9-0.1-4.1-0.4l0.1-0.5c1.1,0.3,2.5,0.4,4,0.4c3.3,0,5.2-0.9,6.3-1.6l0.3,0.4C17.1,16.2,15.1,17.1,11.6,17.1z"/><path id="XMLID_2098_" class="st3" d="M15.3,11.6c0.2,0,0.5-0.1,0.7-0.2c0.5-0.2,1-0.6,1.2-0.9c0.1-0.2,0.4-0.6,0.2-1c-0.1-0.3-0.6-0.6-1.2-0.6c-0.1,0-0.3,0-0.4,0l-0.1-0.5c0.2,0,0.3,0,0.5,0c0.8,0,1.4,0.3,1.7,0.9c0.2,0.4,0.1,1-0.3,1.5c-0.3,0.5-0.8,0.9-1.5,1.1c-0.3,0.1-0.5,0.2-0.8,0.2L15.3,11.6z"/><path id="XMLID_2097_" class="st3" d="M11.6,7.9c-0.1,0-0.2-0.1-0.2-0.1c-0.3-0.4-0.7-0.9-0.8-1.5c-0.1-0.6,0-1.1,0.3-1.5c0.2-0.2,0.4-0.4,0.7-0.6C11.7,4,11.9,3.8,12,3.7c0.5-0.4,0.6-0.9,0.5-1.4c0-0.1,0-0.1,0-0.2C12.6,2,12.7,2,12.8,2c0.1,0,0.2,0.1,0.3,0.2c0.1,0.5,0,1.1-0.3,1.5c-0.2,0.3-0.5,0.6-0.9,0.8c-0.1,0.1-0.2,0.1-0.3,0.2C11.1,5.1,11,5.5,11,6c0.1,0.5,0.4,1,0.7,1.4l0,0.1c0,0,0,0.1,0,0.2c0,0.1-0.1,0.2-0.1,0.2C11.7,7.9,11.6,7.9,11.6,7.9z"/></g></g></svg>',
    requirements: [
        'اصول برنامه نویسی و طراحی شی گرا',
        'مهارت در Angular JS، جاوا اسکریپت، MVC، فرم‌های وب Asp.net',
        'مهارت بالا در چارچوب‌های دات نت و C#',
        'دانش و مهارتSQL Server',
        'آشنایی با مفاهیم  وب‌سرویس، WCF، SOA، WEP API',
        'آشنایی با مفاهیم امنیت در تولید نرم‌افزار',
        'تخصص در طراحی، توسعه، تست و برنامه‌های کاربردی استقرار',
        'داشتن حداقل 3 سال سابقه کار مرتبط یک مزیت محسوب خواهد شد.',
        'آشنایی با مفاهیم حوزه بانکی یک مزیت محسوب خواهد شد.'
    ],
    chores: [
        'اصول برنامه نویسی و طراحی شی گرا'
    ],
    selected: false
}, {
    id: 4,
    title: 'کارشناس کنترل کیفیت',
    description: 'حفظ و بهبود نرم افزارهای موجود و تلاش در جهت توسعه ویژگی‌های جدید و مورد نیاز مشتری.',
    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">st0{}.st1{}.st2{}.st3{}.st4{opacity:0.4;}.st5{clip-path:url(#XMLID_462_);}.st6{clip-path:url(#XMLID_479_);}.st7{clip-path:url(#XMLID_717_);}.st8{}.st9{opacity:0.3;}.st10{}.st11{}.st12{opacity:0.7;}.st13{stroke:#114632;stroke-width:2;stroke-miterlimit:10;}.st14{opacity:0.5;}.st15{opacity:0.7;stroke:#114632;stroke-linejoin:bevel;stroke-miterlimit:10;}.st16{opacity:0.3;}.st17{opacity:0.7;}.st18{stroke:#F7901E;stroke-width:2;stroke-miterlimit:10;}.st19{opacity:0.5;}.st20{opacity:0.7;stroke:#F7901E;stroke-linejoin:bevel;stroke-miterlimit:10;}.st21{}.st22{}.st23{stroke:#FFFFFF;stroke-miterlimit:10;}.st24{opacity:0.3;}.st25{stroke:#FFF9E7;stroke-width:2;stroke-miterlimit:10;}.st26{opacity:0.5;}.st27{opacity:0.7;stroke:#C8E0D7;stroke-linejoin:bevel;stroke-miterlimit:10;}.st28{clip-path:url(#XMLID_719_);}.st29{clip-path:url(#XMLID_723_);}.st30{}.st31{}.st32{stroke:#F7901E;stroke-width:2;stroke-miterlimit:10;}.st33{}.st34{stroke:#E0E0E0;stroke-miterlimit:10;}.st35{}.st36{}.st37{stroke:#E5E5E5;stroke-miterlimit:10;}.st38{display:none;stroke:#E5E5E5;stroke-miterlimit:10;}.st39{}.st40{}.st41{display:none;}.st42{stroke:#78C19D;stroke-miterlimit:10;}.st43{stroke:#F1F1F1;stroke-miterlimit:10;}.st44{stroke:#78C19D;stroke-miterlimit:10;}.st45{stroke:#78C19D;stroke-miterlimit:10;}.st46{}.st47{stroke:#B2B2B2;stroke-miterlimit:10;}.st48{stroke:#B2B2B2;stroke-miterlimit:10;}.st49{stroke:#78C19D;stroke-width:0.5;stroke-miterlimit:10;}.st50{clip-path:url(#XMLID_901_);}.st51{clip-path:url(#XMLID_902_);}.st52{}.st53{stroke:#F0EBDF;stroke-miterlimit:10;}.st54{stroke:#E8DBBA;stroke-miterlimit:10;}.st55{}.st56{opacity:0.75;}.st57{}.st58{stroke:#F5EEDC;stroke-miterlimit:10;}.st59{stroke:#F5EEDC;stroke-miterlimit:10;}.st60{opacity:0.1;}</style><g id="New_Symbol"></g><g id="XMLID_465_"><g id="XMLID_2096_"><g id="XMLID_2105_"><g id="XMLID_2106_"><path id="XMLID_2114_" class="st3" d="M6.2,21.4C6.2,21.4,6.2,21.3,6.2,21.4c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0,0,0.1-0.1c0,0,0-0.1,0.1-0.1c0,0,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.3v-1.8c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0,0.1,0.1,0.1c0,0,0,0.1,0,0.1v1.8c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2-0.1,0.2c0,0.1-0.1,0.1-0.1,0.2c0,0.1-0.1,0.1-0.2,0.2c-0.1,0.1-0.1,0.1-0.2,0.1C7.1,21.9,7,22,6.9,22c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.2l0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1l0,0c0,0,0.1,0,0.1,0C6.1,21.3,6.2,21.3,6.2,21.4"/><path id="XMLID_2111_" class="st3" d="M10.2,22C10.2,22,10.1,22,10.2,22c-0.1,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.2c0-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0.1-0.2c0-0.1,0.1-0.1,0.1-0.2c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0v-0.1c0-0.1,0-0.1,0-0.2c0,0,0-0.1-0.1-0.1c0,0-0.1-0.1-0.2-0.1c-0.1,0-0.2,0-0.4,0c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0l0,0c0,0-0.1,0-0.1-0.1c0,0,0-0.1-0.1-0.1l0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1l0,0l0,0c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1c0,0,0.1,0.1,0.1,0.2c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1,0,0.2v1.5c0,0,0,0.1,0,0.1c0,0,0,0.1-0.1,0.1c0,0-0.1,0-0.1,0.1C10.3,22,10.2,22,10.2,22z M9.3,20.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1,0c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0C9.4,20.8,9.3,20.8,9.3,20.8z"/><path id="XMLID_2110_" class="st3" d="M12,22C12,22,11.9,22,12,22c-0.1,0-0.1,0-0.1,0c0,0,0,0-0.1,0c0,0,0,0,0-0.1l-0.9-2.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0,0.1,0.1,0.1L12,21l0.7-1.5c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0.1c0,0,0,0.1,0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1l-0.9,2.1c0,0,0,0,0,0.1c0,0,0,0-0.1,0C12.1,22,12.1,22,12,22C12.1,22,12,22,12,22z"/><path id="XMLID_2107_" class="st3" d="M15.6,22C15.6,22,15.6,22,15.6,22c-0.1,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.2c0-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0.1-0.2c0-0.1,0.1-0.1,0.1-0.2c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0v-0.1c0-0.1,0-0.1,0-0.2c0,0,0-0.1-0.1-0.1c0,0-0.1-0.1-0.2-0.1c-0.1,0-0.2,0-0.4,0c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0l0,0c0,0-0.1,0-0.1-0.1c0,0,0-0.1-0.1-0.1l0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1l0,0l0,0c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1c0,0,0.1,0,0.1-0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1c0,0,0.1,0.1,0.1,0.2c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1,0,0.2v1.5c0,0,0,0.1,0,0.1c0,0,0,0.1-0.1,0.1c0,0-0.1,0-0.1,0.1C15.7,22,15.7,22,15.6,22z M14.7,20.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1,0c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0C14.9,20.8,14.8,20.8,14.7,20.8z"/></g></g><path id="XMLID_2104_" class="st3" d="M12.1,8.9c-0.1,0-0.2,0-0.2-0.1c0-0.1,0-0.1,0-0.2c0-0.1,0.1-0.1,0.1-0.1c0.3-0.1,0.5-0.3,0.6-0.6c0.1-0.2,0-0.3,0-0.5c-0.1-0.1-0.1-0.2-0.2-0.3c-0.1-0.1-0.1-0.2-0.2-0.3C12,6.7,12,6.6,12,6.5c0-0.1,0-0.2,0-0.3c0,0,0-0.1,0-0.1C12.2,5.5,12.5,5,13,4.8c0,0,0.1,0,0.1,0c0.1,0,0.2,0,0.2,0.1c0,0.1,0,0.1,0,0.2c0,0.1-0.1,0.1-0.1,0.1c0,0-0.1,0-0.1,0.1l0,0c0,0,0,0,0,0l0,0c0,0,0,0,0,0c-0.1,0-0.1,0.1-0.2,0.2c-0.1,0.1-0.2,0.2-0.2,0.4c0,0.1-0.1,0.2-0.1,0.3c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1l0,0l0,0c0,0,0,0,0,0.1c0,0,0.1,0.1,0.1,0.2c0.2,0.4,0.5,0.7,0.4,1.2c-0.1,0.4-0.4,0.8-0.8,1C12.2,8.9,12.1,8.9,12.1,8.9z"/><path id="XMLID_2103_" class="st3" d="M10.4,10.3c-0.7,0-1.4,0-1.9-0.1C7.3,10,7.1,9.7,7.1,9.5c0-0.4,0.6-0.6,0.8-0.7c0.4-0.1,0.9-0.2,1.5-0.3L9.5,9c-0.6,0.1-1,0.2-1.4,0.3c0,0,0,0,0,0L8,9.4C8,9.4,8,9.5,8,9.6l0.1,0c0,0,0,0,0,0c0.5,0.1,1.4,0.2,2.3,0.2c0.3,0,0.6,0,0.9,0c1.7-0.1,2.9-0.3,3.4-0.5l0.2,0.5c-0.7,0.3-2,0.5-3.6,0.6C11,10.3,10.7,10.3,10.4,10.3z"/><path id="XMLID_2102_" class="st3" d="M10.7,12c-1.5,0-2.1-0.3-2.3-0.5c-0.2-0.2-0.2-0.3-0.2-0.4c0-0.1,0-0.3,0.6-0.5L8.9,11c0,0-0.3,0.2-0.3,0.2l0.3,0.1c0.2,0.1,0.7,0.2,1.8,0.2c0.3,0,0.5,0,0.8,0c1-0.1,2.3-0.3,2.7-0.4l0.1,0.5c-0.4,0.1-1.7,0.3-2.8,0.4C11.2,12,10.9,12,10.7,12z"/><path id="XMLID_2101_" class="st3" d="M9.3,12.9L9.3,12.9c0,0.2,0.1,0.3,0.2,0.4c0.2,0.1,0.7,0.2,1.3,0.2c0.9,0,2.3-0.1,3-0.4l0.2,0.5c-0.8,0.4-2.2,0.5-3.2,0.5c-0.7,0-1.2-0.1-1.5-0.3c-0.3-0.2-0.5-0.5-0.5-0.8c0-0.2,0.2-0.4,0.3-0.5l0.2,0.4"/><path id="XMLID_2100_" class="st3" d="M11.1,15.9c-1.3,0-2.4-0.1-3.4-0.3c-1.9-0.4-1.9-0.8-1.9-1c0-0.2,0.1-0.3,0.2-0.4c0.3-0.3,1-0.5,1.8-0.5v0.5c-0.7,0-1.1,0.2-1.3,0.3l-0.2,0.1l0.2,0.1C6.6,14.8,7.1,15,8,15.1c0.9,0.2,2,0.2,3.1,0.2c0.2,0,0.4,0,0.7,0c3-0.1,4.5-0.7,5.3-1.3l0.3,0.4c-0.8,0.6-2.4,1.3-5.6,1.4C11.6,15.9,11.3,15.9,11.1,15.9z"/><path id="XMLID_2099_" class="st3" d="M11.6,17.1c-1.5,0-2.9-0.1-4.1-0.4l0.1-0.5c1.1,0.3,2.5,0.4,4,0.4c3.3,0,5.2-0.9,6.3-1.6l0.3,0.4C17.1,16.2,15.1,17.1,11.6,17.1z"/><path id="XMLID_2098_" class="st3" d="M15.3,11.6c0.2,0,0.5-0.1,0.7-0.2c0.5-0.2,1-0.6,1.2-0.9c0.1-0.2,0.4-0.6,0.2-1c-0.1-0.3-0.6-0.6-1.2-0.6c-0.1,0-0.3,0-0.4,0l-0.1-0.5c0.2,0,0.3,0,0.5,0c0.8,0,1.4,0.3,1.7,0.9c0.2,0.4,0.1,1-0.3,1.5c-0.3,0.5-0.8,0.9-1.5,1.1c-0.3,0.1-0.5,0.2-0.8,0.2L15.3,11.6z"/><path id="XMLID_2097_" class="st3" d="M11.6,7.9c-0.1,0-0.2-0.1-0.2-0.1c-0.3-0.4-0.7-0.9-0.8-1.5c-0.1-0.6,0-1.1,0.3-1.5c0.2-0.2,0.4-0.4,0.7-0.6C11.7,4,11.9,3.8,12,3.7c0.5-0.4,0.6-0.9,0.5-1.4c0-0.1,0-0.1,0-0.2C12.6,2,12.7,2,12.8,2c0.1,0,0.2,0.1,0.3,0.2c0.1,0.5,0,1.1-0.3,1.5c-0.2,0.3-0.5,0.6-0.9,0.8c-0.1,0.1-0.2,0.1-0.3,0.2C11.1,5.1,11,5.5,11,6c0.1,0.5,0.4,1,0.7,1.4l0,0.1c0,0,0,0.1,0,0.2c0,0.1-0.1,0.2-0.1,0.2C11.7,7.9,11.6,7.9,11.6,7.9z"/></g></g></svg>',
    requirements: [
        'اصول برنامه نویسی و طراحی شی گرا'
    ],
    chores: [
        'اصول برنامه نویسی و طراحی شی گرا',
        'مهارت در Angular JS، جاوا اسکریپت، MVC، فرم‌های وب Asp.net',
        'مهارت بالا در چارچوب‌های دات نت و C#',
        'دانش و مهارتSQL Server',
        'آشنایی با مفاهیم  وب‌سرویس، WCF، SOA، WEP API',
        'آشنایی با مفاهیم امنیت در تولید نرم‌افزار',
        'تخصص در طراحی، توسعه، تست و برنامه‌های کاربردی استقرار',
        'داشتن حداقل 3 سال سابقه کار مرتبط یک مزیت محسوب خواهد شد.',
        'آشنایی با مفاهیم حوزه بانکی یک مزیت محسوب خواهد شد.'
    ],
    selected: false
}];
},{}],64:[function(require,module,exports){
exports.headerMarginfix = {
  display: 'inline-block',
  marginTop: 30
};

exports.header = {
  width: '100%',
  height: 200,
  backgroundImage: 'url(assets/img/apply/header.jpg)',
  backgroundSize: 'cover'
};

exports.title = {
  fontSize: 20,
  margin: '30px 30px 0',
  color: 'white'
};

exports.breadcrumbs = {
  fontSize: 16,
  margin: '20px 30px 0'
};

exports.breadcrumbsLink = {
  href: '#',
  textDecoration: 'none',
  color: 'white',
  margin: '0 5px'
};

exports.breadcrumbsLinkActive = {
  href: '#',
  margin: '0 5px',
  textDecoration: 'none',
  color: '#B8F3D6'
};

exports.sectionTitle = {
  fontSize: 20,
  margin: '30px 30px',
  color: '#78C29E'
};

exports.job = {
  margin: '10px 30px',
  border: '1px solid rgb(229, 229, 229)'
};

exports.jobHeader = {
  backgroundColor: '#FAFAFA',
  position: 'relative',
  height: 43,
  cursor: 'pointer'
};

exports.jobAdorner = {
  position: 'absolute',
  top: -1,
  right: -10,
  width: 43 + 2,
  height: 43 + 2,
  backgroundColor: '#78C19D'
};

exports.jobAdorner2 = {
  borderTop: '10px solid #78C19D',
  borderRight: 'transparent solid 11px',
  boxSizing: 'border-box',
  position: 'absolute',
  top: 43 + 2 - 1,
  right: -10,
  width: 10,
  height: 0
};

exports.jobTitle = {
  color: '#78C29E',
  lineHeight: 43,
  height: 43,
  overflow: 'hidden',
  position: 'absolute',
  right: 50,
  width: 200
};

exports.jobDescription = {
  color: '#9ACFB2',
  lineHeight: 43,
  height: 43,
  overflow: 'hidden',
  position: 'absolute',
  right: 250,
  left: 100
};

exports.form = {
  backgroundColor: '#F2F2F2',
  position: 'relative'
};

exports.formBackground = {
  backgroundImage: 'url(assets/img/apply/formBg.png)',
  position: 'absolute',
  top: 50,
  left: 200,
  width: 300,
  height: 300
};

exports.formInner = {
  margin: '0 auto',
  padding: '20px 30px'
};

exports.formTitle = {
  fontSize: 20,
  margin: '10px 0',
  color: '#78C29E'
};

exports.formInput = {
  outline: 'none',
  margin: '5px 0',
  padding: '3px 7px',
  width: '100%',
  maxWidth: 442,
  height: 40,
  lineHeight: 40 - 2 * 3,
  borderRadius: 5,
  border: '1px solid #AAA'
};

exports.formBirthdayLabel = {
  display: 'inline-block',
  color: '#959595',
  margin: '5px 0',
  marginRight: 15,
  marginLeft: 5
};

exports.formBirthdayDropdown = {
  outline: 'none',
  margin: '5px 0',
  padding: '3px 7px',
  width: 90,
  height: 40,
  lineHeight: 40 - 2 * 3,
  borderRadius: 5,
  border: '1px solid #AAA'
};

exports.formResume = {
  marginTop: 20
};

exports.formResumeButton = {
  display: 'inline-block',
  height: 30,
  lineHeight: 30,
  padding: '0 20px',
  border: '1px solid #78C19D',
  borderRadius: 50,
  cursor: 'pointer',
  transition: '0.2s',
  color: '#78C19D',
  backgroundColor: 'transparent'
};

exports.formResumeButtonHover = {
  color: 'white',
  backgroundColor: '#78C19D'
};

exports.formResumeLink = {
  href: '#',
  textDecoration: 'underline',
  marginRight: 10,
  transition: '0.2s',
  color: '#9ACFB2'
};

exports.formResumeLinkHover = {
  color: '#78C29E'
};

exports.submit = {
  display: 'inline-block',
  height: 45,
  lineHeight: 45,
  margin: '20px 180px 0',
  padding: '0 30px',
  borderRadius: 50,
  cursor: 'pointer',
  color: 'white',
  transition: '0.2s',
  backgroundColor: 'gray'
};

exports.footer = {
  backgroundColor: '#1f1f1f',
  padding: '20px 30px',
  textAlign: 'center'
};

exports.footerText = {
  fontSize: 14,
  color: '#656565'
};

exports.footerSubtext = {
  fontSize: 12,
  color: '#656565',
  margin: '3px 0'
};

exports.footerLogo = {
  href: '#',
  backgroundImage: 'url(assets/img/footerLogo.png)',
  display: 'inline-block',
  width: 30,
  height: 30,
  marginRight: 10
};

exports.footerLink = {
  href: '#',
  color: '#73BD89',
  textDecoration: 'none'
};


},{}],65:[function(require,module,exports){
var component, generateId, modal, tableView;

component = require('../../utils/component');

tableView = require('../tableView');

modal = require('../../singletons/modal');

generateId = require('../../utils/dom').generateId;

module.exports = component('hrView', function(arg) {
  var E, addDuty, addRequirement, append, contents, description, descriptionId, dom, duties, dutiesList, events, onEvent, requirements, requirementsList, service, setEnabled, submit, text, title, titleId;
  dom = arg.dom, events = arg.events, service = arg.service;
  E = dom.E, text = dom.text, append = dom.append;
  onEvent = events.onEvent;
  requirements = [];
  duties = [];
  contents = [
    E({
      "class": 'form-group'
    }, E('label', {
      "for": (titleId = generateId())
    }, 'نام شغل'), title = E('input', {
      id: titleId,
      "class": 'form-control'
    })), E({
      "class": 'form-group'
    }, E('label', {
      "for": (descriptionId = generateId())
    }, 'توضیحات'), description = E('textarea', {
      minHeight: 100,
      maxHeight: 100,
      id: descriptionId,
      "class": 'form-control'
    })), E({
      "class": 'form-group'
    }, E('label', null, text('مهارتهای مورد نیاز'), addRequirement = E('i', {
      "class": 'fa fa-plus',
      color: 'green',
      marginRight: 10,
      cursor: 'pointer'
    })), requirementsList = E()), E({
      "class": 'form-group'
    }, E('label', null, text('وظایف'), addDuty = E('i', {
      "class": 'fa fa-plus',
      color: 'green',
      marginRight: 10,
      cursor: 'pointer'
    })), dutiesList = E())
  ];
  onEvent(addRequirement, 'click', function() {
    var group, input;
    requirements.push(input = E('input', {
      "class": 'form-control'
    }));
    onEvent(input, 'input', setEnabled);
    group = E({
      "class": 'form-group'
    }, input);
    append(requirementsList, group);
    return input.focus();
  });
  onEvent(addDuty, 'click', function() {
    var group, input;
    duties.push(input = E('input', {
      "class": 'form-control'
    }));
    onEvent(input, 'input', setEnabled);
    group = E({
      "class": 'form-group'
    }, input);
    append(dutiesList, group);
    return input.focus();
  });
  onEvent([title, description], 'input', setEnabled = function() {
    return modal.instance.setEnabled(title.value() && description.value() && requirements.length && duties.length && requirements.every(function(x) {
      return x.value();
    }) && duties.every(function(x) {
      return x.value();
    }));
  });
  submit = function() {
    return service.addJob({
      title: title.value(),
      description: description.value(),
      requirements: requirements.map(function(x) {
        return x.value();
      }),
      duties: duties.map(function(x) {
        return x.value();
      })
    });
  };
  return E(tableView, {
    addJob: function() {
      modal.instance.display({
        autoHide: true,
        title: 'ثبت درخواست شغلی',
        submitText: 'ثبت',
        closeText: 'لغو',
        contents: contents,
        submit: submit
      });
      return setEnabled();
    }
  });
});


},{"../../singletons/modal":24,"../../utils/component":25,"../../utils/dom":27,"../tableView":70}],66:[function(require,module,exports){
var applicantView, apply, component, hrView, login, managerView;

component = require('../utils/component');

apply = require('./apply');

login = require('./login');

hrView = require('./hrView');

managerView = require('./managerView');

applicantView = require('./applicantView');

module.exports = component('views', function(arg) {
  var E, append, currentPage, dom, empty, state, wrapper;
  dom = arg.dom, state = arg.state;
  E = dom.E, append = dom.append, empty = dom.empty;
  wrapper = E();
  currentPage = void 0;
  state.user.on({
    allowNull: true
  }, function(user) {
    empty(wrapper);
    currentPage = (function() {
      if (user) {
        switch (user.userType) {
          case 0:
            return applicantView;
          case 1:
            return managerView;
          case 2:
            return hrView;
        }
      } else {
        return login;
      }
    })();
    return append(wrapper, E(currentPage));
  });
  return wrapper;
});


},{"../utils/component":25,"./applicantView":59,"./apply":62,"./hrView":65,"./login":67,"./managerView":69}],67:[function(require,module,exports){
var component, extend, numberInput, ref, style, toEnglish;

component = require('../../utils/component');

style = require('./style');

numberInput = require('../../components/restrictedInput/number');

ref = require('../../utils'), extend = ref.extend, toEnglish = ref.toEnglish;

module.exports = component('login', function(arg) {
  var E, append, captchaInput, captchaPlaceholder, disable, doSubmit, dom, email, empty, enable, events, hide, invalid, onEnter, onEvent, password, remember, service, setStyle, show, spinner, submit, text;
  dom = arg.dom, events = arg.events, service = arg.service;
  E = dom.E, empty = dom.empty, append = dom.append, text = dom.text, setStyle = dom.setStyle, show = dom.show, hide = dom.hide, enable = dom.enable, disable = dom.disable;
  onEvent = events.onEvent, onEnter = events.onEnter;
  component = E(null, E('img', style.bg), E(style.form, E('img', style.logo), E(style.title, 'شرکت نرم‌افزاری داتیس آرین قشم'), E(style.formInputs, email = E('input', extend({
    placeholder: 'کد ملی'
  }, style.input)), password = E('input', extend({
    type: 'password',
    placeholder: 'رمز عبور'
  }, style.input)), captchaPlaceholder = E(style.captchaSection), E(style.submitSection, submit = E('button', style.submit, 'ورود'), E('label', style.rememberLabel, remember = E('input', extend({
    type: 'checkbox'
  }, style.remember)), text('مرا به خاطر بسپار')), spinner = E(style.spinner, 'در حال بارگذاری...'), hide(invalid = E(style.invalid, 'نام کاربری و یا رمز عبور اشتباه است.'))))));
  hide(spinner);
  [email, password].forEach(function(input) {
    onEvent(input, 'focus', function() {
      return setStyle(input, style.inputFocus);
    });
    return onEvent(input, 'blur', function() {
      return setStyle(input, style.input);
    });
  });
  captchaInput = void 0;
  service.getCaptcha().then(function(captcha) {
    var firstPart, lastPart, ref1;
    ref1 = captcha.split('x'), firstPart = ref1[0], lastPart = ref1[1];
    firstPart += ' ';
    lastPart = ' ' + lastPart;
    empty(captchaPlaceholder);
    append(captchaPlaceholder, [E('span', null, firstPart), captchaInput = E(numberInput, true), E('span', null, lastPart)]);
    onEnter(captchaInput, doSubmit);
    return setStyle(captchaInput, style.captchaInput);
  });
  doSubmit = function() {
    if (!captchaInput) {
      return;
    }
    disable([email, password, submit, remember]);
    hide(invalid);
    show(spinner);
    return service.login({
      identificationCode: email.value(),
      password: password.value(),
      captcha: toEnglish(captchaInput.value())
    })["catch"](function() {
      return show(invalid);
    }).fin(function() {
      enable([email, password, submit, remember]);
      return hide(spinner);
    }).done();
  };
  onEvent([email, password], 'input', function() {
    return hide(invalid);
  });
  onEnter([email, password], doSubmit);
  onEvent(submit, 'click', doSubmit);
  return component;
});


},{"../../components/restrictedInput/number":16,"../../utils":29,"../../utils/component":25,"./style":68}],68:[function(require,module,exports){
exports.bg = {
  src: 'assets/img/login/bg.jpg',
  zIndex: -1,
  minHeight: '100%',
  minWidth: 1024,
  width: '100%',
  height: 'auto',
  position: 'fixed',
  top: 0,
  left: 0
};

exports.form = {
  margin: '100px auto 0',
  width: 500,
  backgroundColor: 'white',
  textAlign: 'center',
  paddingBottom: 100
};

exports.logo = {
  src: 'assets/img/logo.png',
  width: 100,
  marginTop: 100
};

exports.title = {
  fontSize: 18,
  color: '#1D7453'
};

exports.formInputs = {
  marginTop: 50
};

exports.input = {
  border: 0,
  outline: 0,
  width: 400,
  padding: 4,
  margin: '20px 0',
  borderBottom: '1px solid #ddd',
  transition: 'border-bottom .5s'
};

exports.inputFocus = {
  borderBottom: '1px solid #6cc791'
};

exports.submit = {
  backgroundColor: '#6cc791',
  color: 'white',
  padding: '7px 20px',
  borderRadius: 5,
  marginTop: 50,
  marginLeft: 20,
  border: 0,
  cursor: 'pointer'
};

exports.captchaSection = {
  direction: 'ltr'
};

exports.captchaInput = {
  width: 30,
  direction: 'ltr'
};

exports.submitSection = {
  textAlign: 'right',
  paddingRight: 50
};

exports.rememberLabel = {
  fontSize: 11,
  color: '#888',
  cursor: 'pointer'
};

exports.remember = {
  width: 'auto',
  margin: '20px 5px',
  position: 'relative',
  top: 4
};

exports.spinner = {
  color: '#999'
};

exports.invalid = {
  color: 'red'
};


},{}],69:[function(require,module,exports){
var tableView;

tableView = require('../tableView');

module.exports = tableView;


},{"../tableView":70}],70:[function(require,module,exports){
var component, extend, ref, search, sidebar, stateToPersian, style, table, toDate;

component = require('../../utils/component');

style = require('./style');

sidebar = require('./sidebar');

table = require('./table');

search = require('./search');

ref = require('../../utils'), extend = ref.extend, toDate = ref.toDate;

stateToPersian = require('../../utils/logic').stateToPersian;

module.exports = component('tableView', function(arg) {
  var E, append, applicants, dom, empty, events, onEvent, searchInstance, setStyle, state, tableInstance, text, update, view;
  dom = arg.dom, events = arg.events, state = arg.state;
  E = dom.E, text = dom.text, setStyle = dom.setStyle, append = dom.append, empty = dom.empty;
  onEvent = events.onEvent;
  view = E('span', null, E(sidebar), E(style.contents, searchInstance = E(search), tableInstance = E(table, {
    entityId: 'userId',
    properties: {
      multiSelect: true
    },
    headers: [
      {
        name: 'نام',
        getValue: function(arg1) {
          var firstName, lastName;
          firstName = arg1.firstName, lastName = arg1.lastName;
          return firstName + " " + lastName;
        },
        styleTd: function(arg1, td) {
          var firstName, lastName, personalPic;
          firstName = arg1.firstName, lastName = arg1.lastName, personalPic = arg1.personalPic;
          empty(td);
          setStyle(td, {
            text: ''
          });
          return append(td, [
            E('img', extend({
              src: personalPic ? "/webApi/image?address=" + personalPic : 'assets/img/default-avatar-small.png'
            }, style.profilePicture)), text(firstName + " " + lastName)
          ]);
        }
      }, {
        name: 'تاریخ ثبت',
        getValue: function(arg1) {
          var modificationTime;
          modificationTime = arg1.modificationTime;
          return toDate(modificationTime);
        }
      }, {
        name: 'شغل‌های درخواستی',
        getValue: function(arg1) {
          var selectedJobs;
          selectedJobs = arg1.selectedJobs;
          return selectedJobs.join(' - ');
        }
      }, {
        name: 'وضعیت',
        getValue: function(arg1) {
          var state;
          state = arg1.state;
          return 'ثبت شده';
        }
      }, {
        name: 'یادداشت',
        width: 50,
        styleTd: function(arg1, td, offs) {
          var notes;
          notes = arg1.notes;
          setStyle(td, style.iconTd);
          empty(td);
          return append(td, E(extend({}, style.icon, false ? {
            "class": 'fa fa-sticky-note',
            color: '#449e73'
          } : {
            "class": 'fa fa-sticky-note-o',
            color: '#5c5555'
          })));
        }
      }, {
        name: 'رزومه',
        width: 50,
        styleTd: function(arg1, td, offs) {
          var resume;
          resume = arg1.resume;
          setStyle(td, style.iconTd);
          empty(td);
          return append(td, E('a', extend({
            href: '/webApi/resume?address=' + resume
          }, style.icon, {
            target: '_blank',
            "class": 'fa fa-download',
            color: '#449e73'
          })));
        }
      }
    ],
    handlers: {
      select: function(applicant) {}
    }
  })));
  applicants = [];
  update = function() {
    return tableInstance.setData(applicants.filter(searchInstance.isInSearch));
  };
  searchInstance.onChange(update);
  state.applicants.on(function(_applicants) {
    applicants = _applicants;
    applicants.forEach(function(applicant) {
      if (applicant.firstName == null) {
        applicant.firstName = '';
      }
      return applicant.lastName != null ? applicant.lastName : applicant.lastName = '';
    });
    return update();
  });
  return view;
});


},{"../../utils":29,"../../utils/component":25,"../../utils/logic":31,"./search":73,"./sidebar":75,"./style":77,"./table":79}],71:[function(require,module,exports){
var component, dateInput, dropdown, ref, style, textIsInSearch, toDate, toEnglish, toTimestamp;

component = require('../../../../utils/component');

style = require('./style');

dropdown = require('../../../../components/dropdown');

dateInput = require('../../../../components/dateInput');

ref = require('../../../../utils'), textIsInSearch = ref.textIsInSearch, toEnglish = ref.toEnglish, toTimestamp = ref.toTimestamp, toDate = ref.toDate;

module.exports = component('search', function(arg) {
  var E, append, changeListener, destroy, dom, empty, events, hide, isInSearch, onEvent, remove, removeListener, rest, returnObject, setStyle, show, typeDropdown, view;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  E = dom.E, setStyle = dom.setStyle, append = dom.append, empty = dom.empty, destroy = dom.destroy, show = dom.show, hide = dom.hide;
  onEvent = events.onEvent;
  changeListener = removeListener = isInSearch = void 0;
  typeDropdown = E(dropdown, {
    getTitle: function(x) {
      switch (x) {
        case 0:
          return 'نام';
        case 1:
          return 'تاریخ ثبت';
        case 2:
          return 'شغل‌های درخواستی';
        case 3:
          return 'وضعیت';
        case 4:
          return 'یادداشت';
      }
    }
  });
  setStyle(typeDropdown, style.inputPlaceholder);
  setStyle(typeDropdown.input, style.placeholderInput);
  typeDropdown.update([0, 1, 2, 3, 4]);
  view = E({
    margin: 20
  }, typeDropdown, rest = E(style.rest), remove = E(style.remove));
  onEvent(typeDropdown.input, ['input', 'pInput'], function() {
    empty(rest);
    append(rest, (function() {
      switch (typeDropdown.value()) {
        case 0:
          return (function() {
            var nameInput;
            nameInput = E('input', style.input);
            onEvent(nameInput, 'input', function() {
              return typeof changeListener === "function" ? changeListener() : void 0;
            });
            isInSearch = function(arg1) {
              var firstName, lastName;
              firstName = arg1.firstName, lastName = arg1.lastName;
              return !nameInput.value() || textIsInSearch(firstName + " " + lastName, nameInput.value());
            };
            return nameInput;
          })();
        case 1:
          return (function() {
            var _dateInput, dateDropdown;
            dateDropdown = E(dropdown, {
              getTitle: function(x) {
                switch (x) {
                  case 0:
                    return 'بعد از';
                  case 1:
                    return 'قبل از';
                  case 2:
                    return 'برابر';
                }
              }
            });
            setStyle(dateDropdown, style.inputPlaceholder);
            setStyle(dateDropdown.input, style.placeholderInput);
            dateDropdown.update([0, 1, 2]);
            _dateInput = E(dateInput);
            setStyle(_dateInput, style.inputPlaceholder);
            setStyle(_dateInput.input, style.placeholderInput);
            onEvent([dateDropdown.input, _dateInput.input], ['input', 'pInput'], function() {
              return typeof changeListener === "function" ? changeListener() : void 0;
            });
            isInSearch = function(arg1) {
              var modificationTime, time;
              modificationTime = arg1.modificationTime;
              if (!/^13[0-9][0-9]\/([1-9]|1[0-2])\/([1-9]|[1-2][0-9]|3[0-1])/.test(toEnglish(_dateInput.value()))) {
                return true;
              }
              modificationTime = toTimestamp(toDate(modificationTime));
              time = toTimestamp(_dateInput.value());
              switch (dateDropdown.value()) {
                case 0:
                  return modificationTime >= time;
                case 1:
                  return modificationTime <= time;
                case 2:
                  return modificationTime === time;
              }
            };
            return [dateDropdown, E(style.rest, _dateInput)];
          })();
        case 2:
          return (function() {
            var jobsInput;
            jobsInput = E('input', style.input);
            onEvent(jobsInput, 'input', function() {
              return typeof changeListener === "function" ? changeListener() : void 0;
            });
            isInSearch = function(arg1) {
              var selectedJobsString;
              selectedJobsString = arg1.selectedJobsString;
              return !jobsInput.value() || textIsInSearch(selectedJobsString.toLowerCase(), jobsInput.value());
            };
            return jobsInput;
          })();
        case 3:
          return (function() {
            var stateDropdown;
            stateDropdown = E(dropdown, {
              getTitle: function(x) {
                switch (x) {
                  case 0:
                    return 'ثبت شده';
                  case 1:
                    return 'در انتظار مصاحبه';
                  case 2:
                    return 'غیره';
                }
              }
            });
            setStyle(stateDropdown, style.inputPlaceholder);
            setStyle(stateDropdown.input, style.placeholderInput);
            stateDropdown.update([0, 1, 2]);
            onEvent(stateDropdown.input, ['input', 'pInput'], function() {
              return typeof changeListener === "function" ? changeListener() : void 0;
            });
            isInSearch = function() {
              switch (stateDropdown.value()) {
                case 0:
                  return true;
                default:
                  return false;
              }
            };
            return stateDropdown;
          })();
        case 4:
          return (function() {
            var notesDropdown;
            notesDropdown = E(dropdown, {
              getTitle: function(x) {
                switch (x) {
                  case 0:
                    return 'دارد';
                  case 1:
                    return 'ندارد';
                }
              }
            });
            setStyle(notesDropdown, style.inputPlaceholder);
            setStyle(notesDropdown.input, style.placeholderInput);
            notesDropdown.update([0, 1]);
            onEvent(notesDropdown.input, ['input', 'pInput'], function() {
              return typeof changeListener === "function" ? changeListener() : void 0;
            });
            isInSearch = function() {
              switch (notesDropdown.value()) {
                case 0:
                  return true;
                case 1:
                  return false;
              }
            };
            return notesDropdown;
          })();
      }
    })());
    return typeof changeListener === "function" ? changeListener() : void 0;
  });
  onEvent(remove, 'click', function() {
    destroy(view);
    return typeof removeListener === "function" ? removeListener() : void 0;
  });
  returnObject({
    onChange: function(listener) {
      return changeListener = listener;
    },
    onRemove: function(listener) {
      return removeListener = listener;
    },
    setRemoveEnabled: function(enabled) {
      if (enabled) {
        return show(remove);
      } else {
        return hide(remove);
      }
    },
    isInSearch: function(entity) {
      return typeof isInSearch === "function" ? isInSearch(entity) : void 0;
    }
  });
  return view;
});


},{"../../../../components/dateInput":5,"../../../../components/dropdown":9,"../../../../utils":29,"../../../../utils/component":25,"./style":72}],72:[function(require,module,exports){
var extend;

extend = require('../../../../utils').extend;

exports.inputPlaceholder = {
  display: 'inline-block',
  width: 200
};

exports.input = {
  width: 200,
  border: '1px solid #ddd',
  outline: 'none',
  borderRadius: 3,
  padding: 7,
  paddingLeft: 30,
  height: 30,
  lineHeight: 30
};

exports.placeholderInput = extend({}, exports.input, {
  width: '100%'
});

exports.rest = {
  display: 'inline-block',
  marginRight: 10
};

exports.remove = {
  "class": 'fa fa-minus-circle',
  color: '#d71d24',
  cursor: 'pointer',
  width: 20,
  height: 20,
  fontSize: 20,
  marginRight: 10,
  position: 'relative',
  top: 5
};


},{"../../../../utils":29}],73:[function(require,module,exports){
var component, criterion, ref, remove, stateToPersian, style, textIsInSearch;

component = require('../../../utils/component');

style = require('./style');

criterion = require('./criterion');

ref = require('../../../utils'), remove = ref.remove, textIsInSearch = ref.textIsInSearch;

stateToPersian = require('../../../utils/logic').stateToPersian;

module.exports = component('search', function(arg) {
  var E, add, addCriterion, append, arrow, arrowBorder, criteria, criteriaPlaceholder, disable, dom, empty, enable, events, isActive, onChangeListener, onEvent, panel, returnObject, searchbox, setStyle, settings, view;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  E = dom.E, empty = dom.empty, append = dom.append, setStyle = dom.setStyle, enable = dom.enable, disable = dom.disable;
  onEvent = events.onEvent;
  onChangeListener = void 0;
  view = E('span', null, searchbox = E('input', style.searchbox), settings = E(style.settings), E(style.divider), panel = E(style.panel, arrowBorder = E(style.arrowBorder), arrow = E(style.arrow), E(style.pannelInner, criteriaPlaceholder = E(), add = E(style.add))));
  addCriterion = function() {
    var newCriterion, rearrange;
    append(criteriaPlaceholder, newCriterion = E(criterion));
    criteria.push(newCriterion);
    (rearrange = function() {
      setStyle(panel, {
        height: 60 + (50 * criteria.length)
      });
      if (criteria.length === 1) {
        return criteria[0].setRemoveEnabled(false);
      } else {
        return criteria.forEach(function(arg1) {
          var setRemoveEnabled;
          setRemoveEnabled = arg1.setRemoveEnabled;
          return setRemoveEnabled(true);
        });
      }
    })();
    newCriterion.onChange(function() {
      return typeof onChangeListener === "function" ? onChangeListener() : void 0;
    });
    return newCriterion.onRemove(function() {
      remove(criteria, newCriterion);
      rearrange();
      return typeof onChangeListener === "function" ? onChangeListener() : void 0;
    });
  };
  onEvent(searchbox, 'focus', function() {
    return setStyle(searchbox, style.searchboxFocus);
  });
  onEvent(searchbox, 'blur', function() {
    return setStyle(searchbox, style.searchbox);
  });
  onEvent(searchbox, 'input', function() {
    return typeof onChangeListener === "function" ? onChangeListener() : void 0;
  });
  onEvent(add, 'mouseover', function() {
    return setStyle(add, style.addHover);
  });
  onEvent(add, 'mouseout', function() {
    return setStyle(add, style.add);
  });
  onEvent(add, 'click', addCriterion);
  criteria = [];
  isActive = false;
  onEvent(settings, 'click', function() {
    if (isActive) {
      setStyle(panel, style.panel);
      setStyle(settings, style.settings);
      setStyle(arrow, style.arrow);
      setStyle(arrowBorder, style.arrowBorder);
      enable(searchbox);
    } else {
      setStyle(panel, style.panelActive);
      setStyle(settings, style.settingsActive);
      setStyle(arrow, style.arrowActive);
      setStyle(arrowBorder, style.arrowActive);
      disable(searchbox);
      empty(criteriaPlaceholder);
      criteria = [];
      addCriterion();
    }
    isActive = !isActive;
    return typeof onChangeListener === "function" ? onChangeListener() : void 0;
  });
  returnObject({
    isInSearch: function(applicant) {
      var firstName, lastName, selectedJobsString, state, value;
      if (isActive) {
        return criteria.every(function(arg1) {
          var isInSearch;
          isInSearch = arg1.isInSearch;
          return isInSearch(applicant);
        });
      } else {
        firstName = applicant.firstName, lastName = applicant.lastName, selectedJobsString = applicant.selectedJobsString, state = applicant.state;
        value = searchbox.value();
        return textIsInSearch(firstName + " " + lastName, value) || textIsInSearch(selectedJobsString.toLowerCase(), value);
      }
    },
    onChange: function(listener) {
      return onChangeListener = listener;
    }
  });
  return view;
});


},{"../../../utils":29,"../../../utils/component":25,"../../../utils/logic":31,"./criterion":71,"./style":74}],74:[function(require,module,exports){
var extend;

extend = require('../../../utils').extend;

exports.searchbox = {
  placeholder: 'جستجوی رزومه مورد نظر شما',
  border: '1px solid #bdd1e5',
  outline: 'none',
  width: 400,
  borderRadius: 3,
  padding: 7,
  paddingLeft: 50,
  height: 30,
  lineHeight: 30,
  float: 'right',
  transition: '0.2s',
  backgroundColor: '#ecedee',
  color: 'black'
};

exports.searchboxFocus = {
  backgroundColor: '#c1c1c1',
  color: '#555'
};

exports.settings = {
  "class": 'fa fa-cog',
  display: 'inline-block',
  width: 28,
  height: 28,
  fontSize: 20,
  lineHeight: 20,
  padding: '4px 5px',
  marginRight: -29,
  marginTop: 1,
  borderRadius: '3px 0 0 3px',
  color: '#555',
  float: 'right',
  cursor: 'pointer',
  transition: '0.2s',
  backgroundColor: '#ddd'
};

exports.settingsActive = {
  backgroundColor: '#c1c1c1'
};

exports.divider = {
  clear: 'both',
  height: 20
};

exports.panel = {
  marginBottom: 20,
  width: '100%',
  backgroundColor: '#f6f6f6',
  border: '1px solid #ccc',
  color: '#555',
  position: 'relative',
  transition: '0.2s',
  opacity: 0,
  height: 0
};

exports.panelActive = {
  opacity: 1,
  height: 110
};

exports.pannelInner = {
  overflow: 'hidden',
  height: '100%'
};

exports.arrow = {
  position: 'absolute',
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderColor: 'transparent',
  right: 375,
  top: -13,
  borderWidth: '0 13px 13px',
  borderBottomColor: '#f6f6f6',
  transition: '0.2s',
  opacity: 0
};

exports.arrowBorder = extend({}, exports.arrow, {
  right: 374,
  top: -14,
  borderWidth: '0 14px 14px',
  borderBottomColor: '#ccc'
});

exports.arrowActive = {
  opacity: 1
};

exports.add = {
  "class": 'fa fa-plus',
  position: 'absolute',
  bottom: 10,
  right: 20,
  borderRadius: 3,
  width: 30,
  height: 30,
  lineHeight: 30,
  cursor: 'pointer',
  textAlign: 'center',
  color: 'white',
  transition: '0.2s',
  backgroundColor: '#449e73'
};

exports.addHover = {
  backgroundColor: '#55af84'
};


},{"../../../utils":29}],75:[function(require,module,exports){
var component, style;

component = require('../../../utils/component');

style = require('./style');

module.exports = component('sidebar', function(arg) {
  var E, dom, events, logout, name, onEvent, onResize, position, profileImg, resize, service, setStyle, state, view;
  dom = arg.dom, state = arg.state, events = arg.events, service = arg.service;
  E = dom.E, setStyle = dom.setStyle;
  onEvent = events.onEvent, onResize = events.onResize;
  view = E(style.sidebar, E(style.profile, profileImg = E('img', style.profileImg)), name = E(style.name), position = E(style.title), logout = E(style.logout), E(style.settings), E(style.notifications), E(style.divider), E(style.links), E(style.linkActive, 'رزومه‌ها'), E(style.link, 'تقویم'), E(style.link, 'فرصت‌های شغلی'), E(style.link, 'بایگانی'));
  resize = function() {
    var body, height, html;
    body = document.body;
    html = document.documentElement;
    height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    return setStyle(view, {
      height: height
    });
  };
  onResize(resize);
  setTimeout(resize);
  onEvent(profileImg, 'load', function() {
    var height, isPortriat, ref, right, top, width;
    ref = profileImg.fn.element, width = ref.width, height = ref.height;
    right = top = 0;
    isPortriat = height > width;
    if (isPortriat) {
      height *= 150 / width;
      width = 150;
      top = -(height - 150) / 2;
    } else {
      width *= 150 / height;
      height = 150;
      right = -(width - 150) / 2;
    }
    top -= 5;
    right -= 5;
    return setStyle(profileImg, {
      width: width,
      height: height,
      top: top,
      right: right
    });
  });
  onEvent(logout, 'click', function() {
    return service.logout();
  });
  state.user.on(function(user) {
    setStyle(profileImg, {
      src: user.personalPic ? '/webApi/image?address=' + user.personalPic : 'assets/img/default-avatar.png'
    });
    setStyle(name, {
      text: user.name
    });
    return setStyle(position, {
      text: (function() {
        switch (user.type) {
          case 1:
            return user.position;
          case 2:
            return 'کارشناس واحد منابع انسانی';
        }
      })()
    });
  });
  return view;
});


},{"../../../utils/component":25,"./style":76}],76:[function(require,module,exports){
var extend, icon;

extend = require('../../../utils').extend;

exports.sidebar = {
  backgroundColor: '#2b2e33',
  position: 'absolute',
  top: 0,
  right: 0,
  width: 200
};

exports.profile = {
  overflow: 'hidden',
  borderRadius: 100,
  width: 150,
  height: 150,
  marginTop: 20,
  marginRight: 20,
  border: '5px solid #1c1e21',
  position: 'relative'
};

exports.profileImg = {
  position: 'absolute'
};

exports.name = {
  fontSize: 14,
  textAlign: 'center',
  color: 'white',
  marginTop: 30
};

exports.title = {
  fontSize: 14,
  textAlign: 'center',
  color: '#505d63',
  marginTop: 10
};

icon = {
  color: 'white',
  float: 'right',
  cursor: 'pointer',
  margin: 20,
  fontSize: 20
};

exports.logout = extend({}, icon, {
  "class": 'fa fa-power-off',
  marginRight: 30
});

exports.settings = extend({}, icon, {
  "class": 'fa fa-sliders'
});

exports.notifications = extend({}, icon, {
  "class": 'fa fa-bell-o'
});

exports.divider = {
  marginTop: 80,
  height: 2,
  backgroundColor: '#1c1e21'
};

exports.links = {
  marginTop: 20
};

exports.link = {
  cursor: 'pointer',
  height: 65,
  lineHeight: 65,
  textAlign: 'center',
  color: 'white'
};

exports.linkActive = extend({}, exports.link, {
  backgroundColor: '#449e73'
});


},{"../../../utils":29}],77:[function(require,module,exports){
exports.contents = {
  marginRight: 250,
  marginTop: 50,
  marginLeft: 50
};

exports.profilePicture = {
  width: 30,
  height: 30,
  borderRadius: 100,
  marginLeft: 5
};

exports.iconTd = {};

exports.icon = {};


},{}],78:[function(require,module,exports){
var collection, compare, ref, style;

style = require('./style');

ref = require('../../../utils'), collection = ref.collection, compare = ref.compare;

exports.create = function(arg) {
  var E, append, components, destroy, dom, events, functions, handlers, headers, hide, onEvent, properties, setStyle, show, variables;
  headers = arg.headers, properties = arg.properties, handlers = arg.handlers, variables = arg.variables, components = arg.components, dom = arg.dom, events = arg.events;
  E = dom.E, destroy = dom.destroy, append = dom.append, setStyle = dom.setStyle, show = dom.show, hide = dom.hide;
  onEvent = events.onEvent;
  functions = {
    update: function() {
      var descriptors;
      if (variables.descriptors) {
        hide(components.noData);
        show(components.yesData);
        if (variables.sort) {
          variables.descriptors = variables.descriptors.sort(function(arg1, arg2) {
            var a, b, first, firstValue, header, ref1, ref2, result, second, secondValue;
            a = arg1.entity;
            b = arg2.entity;
            header = variables.sort.header;
            if (variables.sort.direction === 'up') {
              ref1 = [a, b], first = ref1[0], second = ref1[1];
            } else {
              ref2 = [b, a], first = ref2[0], second = ref2[1];
            }
            if (header.getValue) {
              firstValue = header.getValue(first);
              secondValue = header.getValue(second);
            } else {
              firstValue = first[header.key];
              secondValue = second[header.key];
            }
            result = compare(firstValue, secondValue);
            if (result === 0 && variables.entityId) {
              return compare(first[variables.entityId], second[variables.entityId]);
            } else {
              return result;
            }
          });
        }
      }
      descriptors = variables.descriptors || [];
      variables.selectionMode = descriptors.some(function(arg1) {
        var selected;
        selected = arg1.selected;
        return selected;
      });
      descriptors.forEach(function(descriptor, index) {
        return descriptor.index = index;
      });
      functions.handleRows(descriptors);
      return handlers.update(descriptors);
    },
    setData: function(entities) {
      if (!variables.descriptors) {
        variables.descriptors = entities.map(function(entity) {
          return {
            entity: entity
          };
        });
      } else {
        variables.descriptors = entities.map(function(entity) {
          var returnValue, shouldReturn;
          returnValue = void 0;
          shouldReturn = variables.descriptors.some(function(x) {
            if (functions.isEqual(entity, x.entity)) {
              returnValue = x;
              return true;
            }
          });
          if (shouldReturn) {
            returnValue.entity = entity;
            return returnValue;
          } else {
            return {
              entity: entity
            };
          }
        });
      }
      return functions.update();
    },
    setSelectedRows: function(callback) {
      variables.descriptors.forEach(function(descriptor) {
        return descriptor.selected = false;
      });
      callback(variables.descriptors).forEach(function(descriptor) {
        return descriptor.selected = true;
      });
      return functions.update();
    },
    setSort: function(header) {
      var sort;
      headers.forEach(function(arg1) {
        var arrowDown, arrowUp;
        arrowUp = arg1.arrowUp, arrowDown = arg1.arrowDown;
        if (arrowUp) {
          setStyle(arrowUp, style.arrowUp);
        }
        if (arrowDown) {
          return setStyle(arrowDown, style.arrowDown);
        }
      });
      sort = variables.sort;
      if ((sort != null ? sort.header : void 0) === header && sort.direction === 'up') {
        setStyle(header.arrowDown, style.arrowActive);
        sort.direction = 'down';
      } else {
        setStyle(header.arrowUp, style.arrowActive);
        variables.sort = {
          header: header,
          direction: 'up'
        };
      }
      return functions.update();
    },
    styleTd: function(header, arg1, td, row) {
      var entity;
      entity = arg1.entity;
      if (header.key) {
        setStyle(td, {
          text: entity[header.key]
        });
      } else if (header.englishKey) {
        setStyle(td, {
          englishText: entity[header.englishKey]
        });
      } else if (header.getValue) {
        setStyle(td, {
          text: header.getValue(entity)
        });
      }
      if (header.styleTd) {
        header.styleTd(entity, td, row.offs, row);
      }
      return td;
    },
    setupRow: function(row, descriptor) {
      var notClickableTds, setDefaultStyle;
      row.off = function() {
        row.offs.forEach(function(x) {
          return x();
        });
        return row.offs = [];
      };
      (setDefaultStyle = function() {
        if (!functions.styleRow) {
          return setStyle(row.tr, descriptor.index % 2 ? style.row : style.rowOdd);
        } else {
          return functions.styleRow(descriptor.entity, row.tr);
        }
      })();
      if (properties.multiSelect) {
        setStyle(row.checkbox, style.checkbox);
        if (descriptor.selected) {
          setStyle(row.tr, style.rowSelected);
          setStyle(row.checkbox, style.checkboxSelected);
        }
        row.offs.push(onEvent(row.checkboxTd, 'click', function() {
          descriptor.selected = !descriptor.selected;
          return functions.update();
        }));
      }
      if (handlers.select && !descriptor.unselectable) {
        if (!descriptor.selected) {
          row.offs.push(onEvent(row.tr, 'mousemove', function() {
            return setStyle(row.tr, style.rowHover);
          }));
          row.offs.push(onEvent(row.tr, 'mouseout', function() {
            return setDefaultStyle();
          }));
        }
        row.tds.forEach(function(td) {
          return setStyle(td, {
            cursor: 'pointer'
          });
        });
        notClickableTds = row.tds.filter(function(_, i) {
          return headers[i].notClickable;
        });
        if (properties.multiSelect) {
          notClickableTds.push(row.checkboxTd);
        }
        row.offs.push(onEvent(row.tr, 'click', notClickableTds, function() {
          return handlers.select(descriptor.entity);
        }));
      }
      return row;
    },
    addRow: function(descriptor, i) {
      var row;
      row = {
        offs: []
      };
      append(components.body, row.tr = E('tr', null, properties.multiSelect ? row.checkboxTd = E('td', {
        cursor: 'pointer'
      }, row.checkbox = E(style.checkbox)) : void 0, row.tds = headers.map(function(header) {
        return functions.styleTd(header, descriptor, E('td', style.td), row, i);
      })));
      return functions.setupRow(row, descriptor);
    },
    changeRow: function(descriptor, row, i) {
      row.off();
      row.tds.forEach(function(td, index) {
        return functions.styleTd(headers[index], descriptor, td, row, i);
      });
      return functions.setupRow(row, descriptor);
    },
    removeRow: function(row) {
      row.off();
      return destroy(row.tr);
    }
  };
  functions.handleRows = collection(functions.addRow, functions.removeRow, functions.changeRow);
  return functions;
};


},{"../../../utils":29,"./style":80}],79:[function(require,module,exports){
var _functions, component, extend, style;

component = require('../../../utils/component');

style = require('./style');

_functions = require('./functions');

extend = require('../../../utils').extend;

module.exports = component('table', function(arg, arg1) {
  var E, allSelected, components, dom, entityId, events, functions, handlers, headers, hide, isEqual, onEvent, prevHandleUpdate, properties, ref, ref1, returnObject, selectAll, selectAllTd, setStyle, show, sort, styleRow, styleSelectAll, table, text, variables;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  headers = arg1.headers, entityId = arg1.entityId, isEqual = arg1.isEqual, sort = arg1.sort, styleRow = arg1.styleRow, properties = (ref = arg1.properties) != null ? ref : {}, handlers = (ref1 = arg1.handlers) != null ? ref1 : {};
  E = dom.E, text = dom.text, setStyle = dom.setStyle, show = dom.show, hide = dom.hide;
  onEvent = events.onEvent;
  if (entityId == null) {
    entityId = 'id';
  }
  if (isEqual == null) {
    isEqual = function(a, b) {
      return a[entityId] === b[entityId];
    };
  }
  variables = {
    entityId: entityId,
    headers: [],
    descriptors: null,
    sort: sort || {
      header: headers[0],
      direction: 'up'
    }
  };
  components = {};
  allSelected = false;
  prevHandleUpdate = handlers.update;
  styleSelectAll = function() {
    setStyle(selectAll, style.checkbox);
    if (allSelected) {
      return setStyle(selectAll, style.checkboxSelected);
    }
  };
  handlers.update = function(descriptors) {
    if (typeof prevHandleUpdate === "function") {
      prevHandleUpdate(descriptors);
    }
    allSelected = descriptors.length && descriptors.every(function(arg2) {
      var selected;
      selected = arg2.selected;
      return selected;
    });
    return styleSelectAll();
  };
  functions = _functions.create({
    headers: headers,
    properties: properties,
    handlers: handlers,
    variables: variables,
    components: components,
    dom: dom,
    events: events
  });
  extend(functions, {
    isEqual: isEqual,
    styleRow: styleRow
  });
  table = E({
    position: 'relative'
  }, components.noData = E(null, 'در حال بارگذاری...'), hide(components.yesData = E(null, E('table', {
    width: '100%'
  }, E('thead', null, E('tr', style.headerRow, properties.multiSelect ? selectAllTd = E('th', {
    width: 20,
    cursor: 'pointer'
  }, selectAll = E(style.checkbox)) : void 0, headers.map(function(header) {
    var th;
    th = E('th', extend({
      cursor: header.key || header.getValue ? 'pointer' : 'default'
    }, style.th), header.key || header.getValue ? [header.arrowUp = E(style.arrowUp), header.arrowDown = E(style.arrowDown)] : void 0, text(header.name));
    if (header.width) {
      setStyle(th, {
        width: header.width
      });
    }
    if (header.key || header.getValue) {
      onEvent(th, 'click', function() {
        return functions.setSort(header);
      });
      onEvent(th, 'mouseover', function() {
        return setStyle(th, style.thHover);
      });
      onEvent(th, 'mouseout', function() {
        return setStyle(th, style.thOut);
      });
    }
    return th;
  }))), components.body = E('tbody', style.tbody)))));
  onEvent(selectAllTd, 'click', function() {
    functions.setSelectedRows(function(descriptors) {
      if (allSelected) {
        return [];
      } else {
        return descriptors;
      }
    });
    return styleSelectAll();
  });
  variables.sort.direction = (function() {
    switch (variables.sort.direction) {
      case 'up':
        return 'down';
      case 'down':
        return 'up';
    }
  })();
  functions.setSort(variables.sort.header);
  returnObject({
    setData: functions.setData,
    setSelectedRows: functions.setSelectedRows
  });
  return table;
});


},{"../../../utils":29,"../../../utils/component":25,"./functions":78,"./style":80}],80:[function(require,module,exports){
var arrow, extend, row;

extend = require('../../../utils').extend;

arrow = {
  cursor: 'pointer',
  position: 'absolute',
  left: 5,
  transition: '0.2s',
  color: '#ddd'
};

exports.arrowUp = extend({}, arrow, {
  "class": 'fa fa-caret-up',
  top: 8
});

exports.arrowDown = extend({}, arrow, {
  "class": 'fa fa-caret-down',
  top: 17
});

exports.arrowActive = {
  color: '#555'
};

exports.tbody = {
  borderBottom: '1px solid #c1c1c1'
};

exports.td = {
  height: 30,
  padding: 7,
  color: '#5c5555'
};

exports.th = extend({}, exports.td, {
  position: 'relative',
  paddingLeft: 15,
  transition: '0.2s'
});

exports.thHover = {
  backgroundColor: '#ececec'
};

exports.thOut = {
  backgroundColor: 'white'
};

row = {
  transition: '0.2s',
  backgroundColor: 'white'
};

exports.headerRow = {
  borderBottom: '2px solid #c1c1c1'
};

exports.row = extend({}, row);

exports.rowOdd = extend({}, row, {
  backgroundColor: '#f6f6f6'
});

exports.rowHover = {
  backgroundColor: '#e7e7e7'
};

exports.rowSelected = {
  backgroundColor: '#d3e4dc'
};

exports.checkbox = {
  "class": 'fa fa-check',
  margin: 4,
  width: 15,
  height: 15,
  borderRadius: 2,
  transition: '0.2s',
  backgroundColor: '#ddd',
  color: '#ddd'
};

exports.checkboxSelected = {
  backgroundColor: '#449e73',
  color: 'white'
};


},{"../../../utils":29}],81:[function(require,module,exports){
var Q, addPageCSS, addPageStyle, alertMessages, page, ref, service;

Q = require('./q');

service = require('./utils/service');

page = require('./page');

alertMessages = require('./alertMessages');

ref = require('./utils/dom'), addPageCSS = ref.addPageCSS, addPageStyle = ref.addPageStyle;

Q.longStackSupport = true;

addPageCSS('font-awesome/css/font-awesome.css');

addPageCSS('bootstrap.css');

addPageCSS('bootstrap-rtl.css');

addPageStyle("@font-face { font-family: iransans; src:url('assets/fonts/eot/IRANSansWeb.eot') format('eot'), url('assets/fonts/eot/IRANSansWeb_Bold.eot') format('eot'), url('assets/fonts/ttf/IRANSansWeb.ttf') format('truetype'), url('assets/fonts/ttf/IRANSansWeb_Bold.ttf') format('truetype'), url('assets/fonts/woff/IRANSansWeb.woff') format('woff'), url('assets/fonts/woff/IRANSansWeb_Bold.woff') format('woff'), url('assets/fonts/woff2/IRANSansWeb.woff2') format('woff2'), url('assets/fonts/woff2/IRANSansWeb_Bold.woff2') format('woff2'); } * { font-family: 'iransans', tahoma; direction: rtl; } .hidden { display: none; } input::selection { background: #ddd; } .alert { transition: all .15s linear; opacity: 0; visibility: hidden; } .alert.in { opacity: 1; visibility: visible; }");

document.title = 'سامانه جذب داتین';

alertMessages["do"]();

service.autoPing();

service.getUser().then(function() {
  return page();
});


},{"./alertMessages":2,"./page":21,"./q":22,"./utils/dom":27,"./utils/service":35}]},{},[81]);
