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
var component, list, style, toPersian, window;

component = require('../../utils/component');

style = require('./style');

list = require('./list');

toPersian = require('../../utils').toPersian;

window = require('../../utils/dom').window;

module.exports = component('actionButton', function(arg, arg1) {
  var E, actionButton, arrow, button, dom, english, events, getId, getTitle, items, itemsList, noButtonFunctionality, onEvent, onSelect, placeholder, returnObject, selectListeners, selectedIndex, setStyle;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  getId = arg1.getId, getTitle = arg1.getTitle, english = arg1.english, items = arg1.items, selectedIndex = arg1.selectedIndex, noButtonFunctionality = arg1.noButtonFunctionality, placeholder = arg1.placeholder;
  E = dom.E, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  if (getId == null) {
    getId = function(x) {
      return x;
    };
  }
  if (getTitle == null) {
    getTitle = function(x) {
      return x;
    };
  }
  getTitle = (function(getTitle) {
    return function(x) {
      if (english) {
        return getTitle(x);
      } else {
        return toPersian(getTitle(x));
      }
    };
  })(getTitle);
  if (selectedIndex == null) {
    selectedIndex = 0;
  }
  selectListeners = [];
  onSelect = function(item) {
    if (!placeholder) {
      setStyle(button, {
        englishText: getTitle(item)
      });
    }
    selectListeners.forEach(function(x) {
      return x(item);
    });
    return itemsList.hide();
  };
  actionButton = E(style.actionButton, button = E(style.button), arrow = E('i', style.arrow), itemsList = E(list, {
    getTitle: getTitle,
    onSelect: onSelect
  }));
  if (placeholder) {
    setStyle(button, {
      englishText: placeholder
    });
  } else {
    setStyle(button, {
      englishText: getTitle(items[selectedIndex])
    });
  }
  itemsList.update(items);
  onEvent(arrow, 'mouseover', function() {
    return setStyle(arrow, style.hover);
  });
  onEvent(arrow, 'mouseout', function() {
    return setStyle(arrow, style.arrow);
  });
  itemsList.update(items);
  onEvent(button, 'mouseover', function() {
    return setStyle(button, style.hover);
  });
  onEvent(button, 'mouseout', function() {
    return setStyle(button, style.button);
  });
  onEvent((noButtonFunctionality ? [arrow, button] : arrow), 'click', function() {
    if (itemsList.hidden()) {
      return itemsList.show();
    } else {
      return itemsList.hide();
    }
  });
  if (!noButtonFunctionality) {
    onEvent(button, 'click', function() {
      itemsList.hide();
      return selectListeners.forEach(function(x) {
        return x(itemsList.value() || items[selectedIndex]);
      });
    });
  }
  onEvent(E(window), 'click', actionButton, function() {
    return itemsList.hide();
  });
  returnObject({
    onSelect: function(listener) {
      return selectListeners.push(listener);
    },
    items: itemsList.items
  });
  return actionButton;
});


},{"../../utils":38,"../../utils/component":34,"../../utils/dom":36,"./list":3,"./style":5}],3:[function(require,module,exports){
var component, style;

component = require('../../../utils/component');

style = require('./style');

module.exports = component('dropdownList', function(arg, arg1) {
  var E, append, dom, empty, entities, events, getTitle, hidden, hide, highlightCurrentItem, highlightIndex, items, list, onEvent, onSelect, returnObject, select, setStyle, show, value;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  onSelect = arg1.onSelect, getTitle = arg1.getTitle;
  E = dom.E, empty = dom.empty, append = dom.append, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  list = E(style.list);
  entities = items = highlightIndex = value = void 0;
  highlightCurrentItem = function() {
    if (!(items != null ? items.length : void 0)) {
      return;
    }
    setStyle(items, style.item);
    if (highlightIndex != null) {
      return setStyle(items[highlightIndex], style.highlightedItem);
    }
  };
  hidden = true;
  show = function() {
    hidden = false;
    return setStyle(list, style.visibleList);
  };
  hide = function() {
    hidden = true;
    return setStyle(list, style.list);
  };
  select = function() {
    value = entities[highlightIndex];
    onSelect(value);
    return hide();
  };
  returnObject({
    value: function() {
      return value;
    },
    set: function(x) {
      return value = x;
    },
    reset: function() {
      return value = null;
    },
    update: function(_entities, styleItem) {
      highlightIndex = 0;
      empty(list);
      entities = _entities;
      append(list, items = entities.map(function(entity, i) {
        var item;
        item = E({
          englishText: getTitle(entity)
        });
        if (typeof styleItem === "function") {
          styleItem(item, entity);
        }
        onEvent(item, 'mousemove', function() {
          highlightIndex = i;
          return highlightCurrentItem();
        });
        onEvent(item, 'mouseout', function() {
          return setStyle(item, style.item);
        });
        onEvent(item, 'mousedown', function(e) {
          return e.preventDefault();
        });
        onEvent(item, 'click', select);
        return item;
      }));
      return highlightCurrentItem();
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
    items: function() {
      return items;
    },
    hidden: function() {
      return hidden;
    },
    select: select,
    show: show,
    hide: hide
  });
  return list;
});


},{"../../../utils/component":34,"./style":4}],4:[function(require,module,exports){
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
  fontSize: 12,
  height: 30,
  lineHeight: 30,
  padding: '0 5px',
  backgroundColor: 'transparent'
};

exports.highlightedItem = {
  backgroundColor: '#ddd'
};


},{}],5:[function(require,module,exports){
exports.actionButton = {
  position: 'relative'
};

exports.button = {
  width: 180,
  display: 'inline-block',
  height: 30,
  lineHeight: 30,
  fontSize: 14,
  padding: '0 5px',
  border: '1px solid #ddd',
  cursor: 'pointer',
  borderRadius: '0 3px 3px 0',
  color: '#777',
  transition: '0.2s',
  backgroundColor: '#f5f5f5'
};

exports.arrow = {
  display: 'inline-block',
  position: 'relative',
  top: 1,
  right: -1,
  "class": 'fa fa-chevron-down',
  cursor: 'pointer',
  border: '1px solid #ddd',
  borderRadius: '3px 0 0 3px',
  textAlign: 'center',
  color: '#777',
  width: 30,
  height: 30,
  lineHeight: 29,
  transition: '0.2s',
  backgroundColor: '#f5f5f5'
};

exports.hover = {
  backgroundColor: '#e5e5e5'
};


},{}],6:[function(require,module,exports){
var body, component, defer, style,
  slice = [].slice;

component = require('../../utils/component');

style = require('./style');

defer = require('../../utils').defer;

body = require('../../utils/dom').body;

module.exports = function() {
  var alert, elements, header, shade;
  header = arguments[0], elements = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  alert = shade = void 0;
  return component('alert', function(arg) {
    var E, append, close, destroy, dom, events, onEvent, returnObject, setStyle, text;
    dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
    E = dom.E, text = dom.text, append = dom.append, destroy = dom.destroy, setStyle = dom.setStyle;
    onEvent = events.onEvent;
    defer(5)(function() {
      var closeButton;
      append(E(body), [shade = E(style.shade), alert = E(style.alert, E(style.header, closeButton = E(style.close), text(header)), E(style.contents, elements))]);
      onEvent([shade, closeButton], 'click', close);
      return setTimeout(function() {
        setStyle(shade, style.shadeActive);
        return setStyle(alert, style.alertActive);
      });
    });
    close = function() {
      setStyle(shade, style.shade);
      setStyle(alert, style.alert);
      return setTimeout((function() {
        return destroy([shade, alert]);
      }), 500);
    };
    return returnObject({
      close: close
    });
  })();
};


},{"../../utils":38,"../../utils/component":34,"../../utils/dom":36,"./style":7}],7:[function(require,module,exports){
exports.shade = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'black',
  transition: '0.5s',
  opacity: 0,
  visibility: 'hidden'
};

exports.shadeActive = {
  opacity: 0.2,
  visibility: 'visible'
};

exports.alert = {
  position: 'fixed',
  top: 100,
  left: '50%',
  marginLeft: -300,
  width: 700,
  borderRadius: 5,
  transition: '0.5s',
  opacity: 0,
  visibility: 'hidden'
};

exports.alertActive = {
  opacity: 1,
  visibility: 'visible'
};

exports.header = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 55,
  lineHeight: 55,
  paddingRight: 20,
  color: 'white',
  backgroundColor: '#459d73',
  borderRadius: '5px 5px 0 0'
};

exports.close = {
  position: 'absolute',
  top: 20,
  left: 20,
  width: 15,
  height: 15,
  lineHeight: 15,
  fontSize: 15,
  "class": 'fa fa-times',
  cursor: 'pointer'
};

exports.contents = {
  marginTop: 55,
  backgroundColor: 'white',
  borderRadius: '0 0 5px 5px'
};


},{}],8:[function(require,module,exports){
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


},{"../../utils":38,"../../utils/component":34,"./style":9}],9:[function(require,module,exports){
exports.view = {};

exports.text = {
  cursor: 'pointer',
  fontSize: 12,
  fontWeight: 'bold',
  color: '#5c5555',
  display: 'inline-block',
  paddingRight: 10
};

exports.checkbox = {
  cursor: 'pointer',
  display: 'inline-block',
  "class": 'fa fa-check',
  margin: 4,
  marginLeft: 0,
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


},{}],10:[function(require,module,exports){
var component, getNextMonth, getPrevMonth, jalali, style;

component = require('../../../utils/component');

style = require('./style');

jalali = require('../../../jalali');

getPrevMonth = function(year, month) {
  if (month === 1) {
    year--;
    month = 12;
  } else {
    month--;
  }
  return {
    year: year,
    month: month
  };
};

getNextMonth = function(year, month) {
  if (month === 12) {
    year++;
    month = 1;
  } else {
    month++;
  }
  return {
    year: year,
    month: month
  };
};

module.exports = component('calendar', function(arg, textbox) {
  var E, append, calendar, date, dateCells, displayMonth, displayYear, dom, empty, events, gotoDate, gotoMonth, headerText, month, nextMonth, nextYear, onEvent, prevMonth, prevYear, ref, ref1, returnObject, setStyle, year;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  E = dom.E, setStyle = dom.setStyle, append = dom.append, empty = dom.empty;
  onEvent = events.onEvent;
  date = new Date();
  year = date.getYear() + 1900;
  month = date.getMonth() + 1;
  date = date.getDate();
  ref = jalali.toJalaali(year, month, date), year = ref.jy, month = ref.jm, date = ref.jd;
  ref1 = [year, month], displayYear = ref1[0], displayMonth = ref1[1];
  calendar = E(style.calendar, nextYear = E(style.nextYear, '››'), nextMonth = E(style.nextMonth, '›'), headerText = E(style.headerText), prevMonth = E(style.prevMonth, '‹'), prevYear = E(style.prevYear, '‹‹'), E({
    direction: 'rtl'
  }, ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map(function(day, i) {
    var cell;
    cell = E(style.dayCell, day);
    return cell;
  }), dateCells = E()));
  gotoMonth = function(y, m) {
    var day, gd, gm, gy, j, k, l, monthLength, nm, ny, pm, prevMonthLength, py, ref2, ref3, ref4, ref5, ref6, ref7, results, results1, results2, selectedDate;
    ref2 = [y, m], displayYear = ref2[0], displayMonth = ref2[1];
    setStyle(headerText, {
      text: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'][displayMonth - 1] + ' ' + displayYear
    });
    monthLength = jalali.jalaaliMonthLength(displayYear, displayMonth);
    ref3 = getPrevMonth(displayYear, displayMonth), py = ref3.year, pm = ref3.month;
    ref4 = getNextMonth(displayYear, displayMonth), ny = ref4.year, nm = ref4.month;
    prevMonthLength = jalali.jalaaliMonthLength(py, pm);
    ref5 = jalali.toGregorian(displayYear, displayMonth, 1), gy = ref5.gy, gm = ref5.gm, gd = ref5.gd;
    day = new Date(gy, gm - 1, gd).getDay() + 1;
    empty(dateCells);
    append(dateCells, (function() {
      results = [];
      for (var j = ref6 = prevMonthLength - day + 1; ref6 <= prevMonthLength ? j <= prevMonthLength : j >= prevMonthLength; ref6 <= prevMonthLength ? j++ : j--){ results.push(j); }
      return results;
    }).apply(this).map(function(date) {
      var cell;
      cell = E(style.grayCell, date);
      onEvent(cell, 'click', function() {
        return gotoDate(py, pm, date);
      });
      return cell;
    }));
    selectedDate = date;
    append(dateCells, (function() {
      results1 = [];
      for (var k = 1; 1 <= monthLength ? k <= monthLength : k >= monthLength; 1 <= monthLength ? k++ : k--){ results1.push(k); }
      return results1;
    }).apply(this).map(function(date) {
      var cell;
      cell = E(style.cell, date);
      if (selectedDate === date && month === displayMonth && year === displayYear) {
        setStyle(cell, style.todayCell);
      }
      onEvent(cell, 'click', function() {
        return gotoDate(displayYear, displayMonth, date);
      });
      return cell;
    }));
    return append(dateCells, (function() {
      results2 = [];
      for (var l = 1, ref7 = 42 - monthLength - day; 1 <= ref7 ? l <= ref7 : l >= ref7; 1 <= ref7 ? l++ : l--){ results2.push(l); }
      return results2;
    }).apply(this).map(function(date) {
      var cell;
      cell = E(style.grayCell, date);
      onEvent(cell, 'click', function() {
        return gotoDate(ny, nm, date);
      });
      return cell;
    }));
  };
  gotoDate = function(y, m, d, omitTextbox) {
    var ref2;
    ref2 = [y, m, d], year = ref2[0], month = ref2[1], date = ref2[2];
    gotoMonth(year, month);
    if (!omitTextbox) {
      return setStyle(textbox, {
        value: year + "/" + month + "/" + date
      });
    }
  };
  gotoDate(year, month, date, true);
  onEvent(prevYear, 'click', function() {
    return gotoMonth(displayYear - 1, displayMonth);
  });
  onEvent(nextYear, 'click', function() {
    return gotoMonth(displayYear + 1, displayMonth);
  });
  onEvent(prevMonth, 'click', function() {
    var m, ref2, y;
    ref2 = getPrevMonth(displayYear, displayMonth), y = ref2.year, m = ref2.month;
    return gotoMonth(y, m);
  });
  onEvent(nextMonth, 'click', function() {
    var m, ref2, y;
    ref2 = getNextMonth(displayYear, displayMonth), y = ref2.year, m = ref2.month;
    return gotoMonth(y, m);
  });
  returnObject({
    gotoDate: gotoDate
  });
  return calendar;
});


},{"../../../jalali":30,"../../../utils/component":34,"./style":11}],11:[function(require,module,exports){
var chevron, extend;

extend = require('../../../utils').extend;

exports.cell = {
  width: 30,
  height: 30,
  lineHeight: 30,
  margin: 10,
  borderRadius: 100,
  textAlign: 'center',
  display: 'inline-block',
  border: '1px solid transparent',
  marginLeft: -1,
  marginBottom: -1,
  backgroundColor: '#eee',
  color: '#555',
  cursor: 'pointer',
  fontSize: 13
};

exports.dayCell = extend({}, exports.cell, {
  cursor: 'default',
  fontSize: 16,
  fontWeight: 'bold'
});

exports.grayCell = extend({}, exports.cell, {
  color: '#ccc'
});

exports.todayCell = extend({}, exports.cell, {
  backgroundColor: '#d71d24',
  color: 'white'
});

exports.calendar = {
  position: 'absolute',
  borderRadius: 5,
  backgroundColor: '#eee',
  fontSize: 20,
  width: 7 * (exports.cell.width + exports.cell.margin) + 6,
  height: 8 * (exports.cell.width + exports.cell.margin) + 17,
  border: '1px solid transparent',
  cursor: 'default'
};

chevron = {
  position: 'absolute',
  cursor: 'pointer',
  top: 10,
  color: '#449e73',
  height: 30,
  lineHeight: 30,
  fontSize: 25,
  fontWeight: 'bold'
};

exports.nextYear = extend({}, chevron, {
  left: 30,
  textAlign: 'left'
});

exports.nextMonth = extend({}, chevron, {
  left: 60,
  textAlign: 'left'
});

exports.headerText = {
  marginTop: 10,
  width: '100%',
  height: 30,
  lineHeight: 30,
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#555'
};

exports.prevMonth = extend({}, chevron, {
  right: 60,
  textAlign: 'right'
});

exports.prevYear = extend({}, chevron, {
  right: 30,
  textAlign: 'right'
});


},{"../../../utils":38}],12:[function(require,module,exports){
var body, calendar, component, jalali, style, toEnglish,
  slice = [].slice;

component = require('../../utils/component');

style = require('./style');

calendar = require('./calendar');

jalali = require('../../jalali');

toEnglish = require('../../utils').toEnglish;

body = require('../../utils/dom').body;

module.exports = component('dateInput', function(arg) {
  var E, calendarIcon, calendarInstance, calendarPlaceholder, dom, events, input, onEvent, prevValue, returnObject, setStyle, view;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  E = dom.E, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  view = E(style.view, input = E('input', style.input), calendarIcon = E('i', style.calendarIcon), calendarPlaceholder = E(style.calendarPlaceholder, E(style.calendarArrow), calendarInstance = E(calendar, input)));
  onEvent(calendarIcon, 'click', function() {
    return setStyle(calendarPlaceholder, style.calendarPlaceholderVisible);
  });
  onEvent(E(body), 'click', view, function() {
    return setStyle(calendarPlaceholder, style.calendarPlaceholder);
  });
  prevValue = '';
  onEvent(input, 'input', function() {
    var d, m, parts, ref, ref1, valid, value, y;
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
      if (/^13[0-9][0-9]\/([1-9]|1[0-2])\/([1-9]|[1-2][0-9]|3[0-1])$/.test(value)) {
        ref = value.split('/'), y = ref[0], m = ref[1], d = ref[2];
        ref1 = [+y, +m, +d], y = ref1[0], m = ref1[1], d = ref1[2];
        if (jalali.isValidJalaaliDate(y, m, d)) {
          prevValue = value;
          calendarInstance.gotoDate.apply(calendarInstance, slice.call(parts.map(function(x) {
            return +x;
          })).concat([true]));
        } else {
          value = prevValue;
        }
      } else {
        prevValue = value;
      }
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
    },
    valid: function() {
      return /^13[0-9][0-9]\/([1-9]|1[0-2])\/([1-9]|[1-2][0-9]|3[0-1])$/.test(toEnglish(input.value()));
    }
  });
  return view;
});


},{"../../jalali":30,"../../utils":38,"../../utils/component":34,"../../utils/dom":36,"./calendar":10,"./style":13}],13:[function(require,module,exports){
exports.view = {
  position: 'relative'
};

exports.input = {
  placeholder: '----/--/--',
  direction: 'ltr'
};

exports.calendarIcon = {
  "class": 'fa fa-calendar',
  position: 'absolute',
  top: 8,
  left: 8,
  cursor: 'pointer',
  color: 'gray'
};

exports.calendarPlaceholder = {
  position: 'absolute',
  top: 30 + 10,
  left: 160,
  zIndex: 1000,
  backgroundColor: '#eee',
  transition: '0.2s',
  opacity: 0,
  visibility: 'hidden'
};

exports.calendarPlaceholderVisible = {
  opacity: 1,
  visibility: 'visible'
};

exports.calendarArrow = {
  position: 'absolute',
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderColor: 'transparent',
  top: -10,
  right: (286 - 10) / 2,
  borderWidth: '0 10px 10px',
  borderBottomColor: '#eee'
};


},{}],14:[function(require,module,exports){
var _style, component, extend, list, ref, textIsInSearch, toPersian;

component = require('../../utils/component');

_style = require('./style');

list = require('./list');

ref = require('../../utils'), toPersian = ref.toPersian, textIsInSearch = ref.textIsInSearch, extend = ref.extend;

module.exports = component('dropdown', function(arg, arg1) {
  var E, arrow, changeListeners, clear, dom, dropdown, english, events, extendStyle, filteredItems, getFilteredItems, getId, getTitle, input, items, itemsList, onEnter, onEvent, onSelect, prevInputValue, ref1, returnObject, selectedIndex, setInputValue, setStyle, style;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  getId = arg1.getId, getTitle = arg1.getTitle, english = arg1.english, items = arg1.items, selectedIndex = arg1.selectedIndex, extendStyle = (ref1 = arg1.extendStyle) != null ? ref1 : {};
  E = dom.E, setStyle = dom.setStyle;
  onEvent = events.onEvent, onEnter = events.onEnter;
  style = extend({}, _style, extendStyle);
  if (getId == null) {
    getId = function(x) {
      return x;
    };
  }
  if (getTitle == null) {
    getTitle = function(x) {
      return x;
    };
  }
  getTitle = (function(getTitle) {
    return function(x) {
      if (english) {
        return getTitle(x);
      } else {
        return toPersian(getTitle(x));
      }
    };
  })(getTitle);
  changeListeners = [];
  filteredItems = [];
  setInputValue = function(value) {
    if (english) {
      return setStyle(input, {
        englishValue: value
      });
    } else {
      return setStyle(input, {
        value: value
      });
    }
  };
  getFilteredItems = function() {
    return items.filter(function(item) {
      return textIsInSearch(getTitle(item), input.value());
    });
  };
  onSelect = function(item) {
    setInputValue(getTitle(item));
    itemsList.update(getFilteredItems());
    input.blur();
    return changeListeners.forEach(function(x) {
      return x();
    });
  };
  dropdown = E(style.dropdown, input = E('input', style.input), arrow = E('i', style.arrow), itemsList = E(list, {
    getTitle: getTitle,
    onSelect: onSelect
  }));
  clear = function() {
    setInputValue(getTitle(items[selectedIndex]));
    itemsList.update(getFilteredItems());
    return itemsList.set(items[selectedIndex]);
  };
  if (selectedIndex) {
    clear();
  }
  onEvent([input, arrow], 'mouseover', function() {
    return setStyle(arrow, style.arrowHover);
  });
  onEvent([input, arrow], 'mouseout', function() {
    return setStyle(arrow, style.arrow);
  });
  onEvent(arrow, 'click', function() {
    return input.focus();
  });
  onEvent(input, 'focus', function() {
    input.select();
    itemsList.update(items);
    return itemsList.show();
  });
  onEvent(input, 'blur', function() {
    return itemsList.hide();
  });
  onEvent(input, 'keydown', function(e) {
    var code;
    code = e.keyCode || e.which;
    switch (code) {
      case 40:
        e.preventDefault();
        return itemsList.goDown();
      case 38:
        e.preventDefault();
        return itemsList.goUp();
    }
  });
  onEnter(input, function() {
    itemsList.select();
    return input.blur();
  });
  prevInputValue = '';
  onEvent(input, 'input', function() {
    if (!english) {
      setStyle(input, {
        value: input.value()
      });
    }
    if (getFilteredItems().length) {
      prevInputValue = input.value();
    } else {
      setStyle(input, {
        englishValue: prevInputValue
      });
    }
    itemsList.reset();
    itemsList.update(getFilteredItems());
    return itemsList.show();
  });
  returnObject({
    onChange: function(listener) {
      return changeListeners.push(listener);
    },
    value: itemsList.value,
    input: input,
    setValue: function(item) {
      setInputValue(getTitle(item));
      itemsList.update([item]);
      return itemsList.select();
    },
    clear: function() {
      if (selectedIndex) {
        return clear();
      } else {
        setStyle(input, {
          value: ''
        });
        itemsList.reset();
        return itemsList.update(getFilteredItems());
      }
    }
  });
  return dropdown;
});


},{"../../utils":38,"../../utils/component":34,"./list":15,"./style":17}],15:[function(require,module,exports){
var component, style;

component = require('../../../utils/component');

style = require('./style');

module.exports = component('dropdownList', function(arg, arg1) {
  var E, append, dom, empty, entities, events, getTitle, hide, highlightCurrentItem, highlightIndex, items, list, onEvent, onSelect, returnObject, select, setStyle, show, value;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  onSelect = arg1.onSelect, getTitle = arg1.getTitle;
  E = dom.E, empty = dom.empty, append = dom.append, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  list = E(style.list);
  entities = items = highlightIndex = value = void 0;
  highlightCurrentItem = function() {
    if (!(items != null ? items.length : void 0)) {
      return;
    }
    setStyle(items, style.item);
    if (highlightIndex != null) {
      return setStyle(items[highlightIndex], style.highlightedItem);
    }
  };
  show = function() {
    return setStyle(list, style.visibleList);
  };
  hide = function() {
    return setStyle(list, style.list);
  };
  select = function() {
    value = entities[highlightIndex];
    onSelect(value);
    return hide();
  };
  returnObject({
    value: function() {
      return value;
    },
    set: function(x) {
      return value = x;
    },
    reset: function() {
      return value = null;
    },
    update: function(_entities) {
      highlightIndex = 0;
      empty(list);
      entities = _entities;
      append(list, items = entities.map(function(entity, i) {
        var item;
        item = E({
          englishText: getTitle(entity)
        });
        onEvent(item, 'mousemove', function() {
          highlightIndex = i;
          return highlightCurrentItem();
        });
        onEvent(item, 'mouseout', function() {
          return setStyle(item, style.item);
        });
        onEvent(item, 'mousedown', function(e) {
          return e.preventDefault();
        });
        onEvent(item, 'click', select);
        return item;
      }));
      return highlightCurrentItem();
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


},{"../../../utils/component":34,"./style":16}],16:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],17:[function(require,module,exports){
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


},{}],18:[function(require,module,exports){
var component;

component = require('../utils/component');

module.exports = component('loadbar', function(arg, style) {
  var E, bar, c, dom, returnObject, setStyle;
  dom = arg.dom, returnObject = arg.returnObject;
  if (style == null) {
    style = {};
  }
  E = dom.E, setStyle = dom.setStyle;
  c = E(style, bar = E({
    backgroundColor: '#449e73',
    position: 'absolute',
    top: 0,
    right: 0,
    height: 5,
    transition: '0.2s',
    width: '0%'
  }));
  returnObject({
    reset: function() {
      return setStyle(bar, {
        width: "0%"
      });
    },
    set: function(percent) {
      if (percent != null) {
        setStyle(bar, {
          width: percent + "%"
        });
      }
      return setStyle(bar, {
        width: '50%'
      });
    }
  });
  return c;
});


},{"../utils/component":34}],19:[function(require,module,exports){
var component, style;

component = require('../../utils/component');

style = require('./style');

module.exports = component('radioSwitch', function(arg, arg1) {
  var E, append, changeListeners, dom, empty, events, getTitle, items, onEvent, options, returnObject, selectedIndex, selectedItem, setStyle, view;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  items = arg1.items, getTitle = arg1.getTitle, selectedIndex = arg1.selectedIndex;
  E = dom.E, append = dom.append, empty = dom.empty, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  if (getTitle == null) {
    getTitle = function(x) {
      return x;
    };
  }
  if (selectedIndex == null) {
    selectedIndex = 0;
  }
  options = void 0;
  changeListeners = [];
  selectedItem = items[selectedIndex];
  view = E(null, options = items.map(function(item, i) {
    var option;
    option = i === 0 ? E(style.rightOption, getTitle(item)) : i === items.length - 1 ? E(style.leftOption, getTitle(item)) : E(style.option, getTitle(item));
    if (i === selectedIndex) {
      setStyle(option, style.optionActive);
    }
    onEvent(option, 'click', function() {
      selectedItem = item;
      setStyle(options, style.option);
      setStyle(option, style.optionActive);
      return changeListeners.forEach(function(x) {
        return x();
      });
    });
    return option;
  }));
  returnObject({
    value: function() {
      return selectedItem;
    },
    onChange: function(listener) {
      return changeListeners.push(listener);
    }
  });
  return view;
});


},{"../../utils/component":34,"./style":20}],20:[function(require,module,exports){
var extend;

extend = require('../../utils').extend;

exports.option = {
  float: 'right',
  border: '1px solid #ddd',
  cursor: 'pointer',
  padding: '0 10px',
  marginLeft: -1,
  fontSize: 12,
  height: 30,
  lineHeight: 30,
  transition: '0.2s',
  backgroundColor: 'white',
  color: '#777'
};

exports.leftOption = extend({}, exports.option, {
  borderRadius: '3px 0 0 3px'
});

exports.rightOption = extend({}, exports.option, {
  borderRadius: '0 3px 3px 0'
});

exports.optionActive = {
  backgroundColor: '#449e73',
  color: 'white'
};


},{"../../utils":38}],21:[function(require,module,exports){
var component, emailIsValid;

component = require('../../utils/component');

emailIsValid = require('../../utils').emailIsValid;

module.exports = component('emailInput', function(arg) {
  var dom, input, returnObject;
  dom = arg.dom, returnObject = arg.returnObject;
  input = dom.E('input');
  returnObject({
    value: function() {
      return input.value();
    },
    valid: function() {
      return emailIsValid(input.value());
    }
  });
  return input;
});


},{"../../utils":38,"../../utils/component":34}],22:[function(require,module,exports){
var component, restrictedInput, toEnglish;

component = require('../../utils/component');

restrictedInput = require('.');

toEnglish = require('../../utils').toEnglish;

module.exports = component('gradeInput', function(arg) {
  var dom, input, returnObject;
  dom = arg.dom, returnObject = arg.returnObject;
  input = dom.E(restrictedInput, /^([0-9]|[0-9]\.[0-9]?[0-9]?|1[0-9]|1[0-9]\.[0-9]?[0-9]?|20|20\.0?0?)?$/);
  returnObject({
    value: function() {
      return input.value();
    },
    valid: function() {
      return /^([0-9]|[0-9]\.[0-9][0-9]?|1[0-9]|1[0-9]\.[0-9][0-9]?|20|20\.00?)?$/.test(toEnglish(input.value()));
    }
  });
  return input;
});


},{".":23,"../../utils":38,"../../utils/component":34}],23:[function(require,module,exports){
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


},{"../../utils":38,"../../utils/component":34}],24:[function(require,module,exports){
var component, restrictedInput, toEnglish;

component = require('../../utils/component');

restrictedInput = require('.');

toEnglish = require('../../utils').toEnglish;

module.exports = component('numberInput', function(arg, isFraction) {
  var dom, input, returnObject;
  dom = arg.dom, returnObject = arg.returnObject;
  input = dom.E(restrictedInput, isFraction ? /^([0-9]*|[0-9]*\.[0-9]*)$/ : /^[0-9]*$/);
  returnObject({
    value: function() {
      return input.value();
    },
    valid: function() {
      return (isFraction ? /^([0-9]+|[0-9]*\.[0-9]+)$/ : /^[0-9]+$/).test(toEnglish(input.value()));
    }
  });
  return input;
});


},{".":23,"../../utils":38,"../../utils/component":34}],25:[function(require,module,exports){
var component, restrictedInput, toEnglish;

component = require('../../utils/component');

restrictedInput = require('.');

toEnglish = require('../../utils').toEnglish;

module.exports = component('phoneNumberInput', function(arg) {
  var dom, input, returnObject;
  dom = arg.dom, returnObject = arg.returnObject;
  input = dom.E(restrictedInput, /^(0?|09[0-9]{0,9})$/);
  returnObject({
    value: function() {
      return input.value();
    },
    valid: function() {
      return /^09[0-9]{9}$/.test(toEnglish(input.value()));
    }
  });
  return input;
});


},{".":23,"../../utils":38,"../../utils/component":34}],26:[function(require,module,exports){
var component, restrictedInput, toEnglish;

component = require('../../utils/component');

restrictedInput = require('.');

toEnglish = require('../../utils').toEnglish;

module.exports = component('yearInput', function(arg) {
  var dom, input, returnObject;
  dom = arg.dom, returnObject = arg.returnObject;
  input = dom.E(restrictedInput, /^(1?|13[0-9]?[0-9]?)$/);
  returnObject({
    value: function() {
      return input.value();
    },
    valid: function() {
      return /^13[0-9][0-9]$/.test(toEnglish(input.value()));
    }
  });
  return input;
});


},{".":23,"../../utils":38,"../../utils/component":34}],27:[function(require,module,exports){
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


},{"../utils/component":34,"../utils/dom":36}],28:[function(require,module,exports){
var body, component, defer, extend, ref, style;

component = require('../../utils/component');

style = require('./style');

ref = require('../../utils'), extend = ref.extend, defer = ref.defer;

body = require('../../utils/dom').body;

module.exports = function(element, text) {
  var destroyFn, tooltip;
  destroyFn = tooltip = void 0;
  component('tooltip', function(arg) {
    var E, append, destroy, dom, setStyle;
    dom = arg.dom;
    E = dom.E, append = dom.append, destroy = dom.destroy, setStyle = dom.setStyle;
    defer(5)(function() {
      var left, top, width;
      element = element.fn.element;
      width = element.offsetWidth;
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
        top: top - 37,
        left: left + (width - 150) / 2
      }, style.tooltip), E(style.arrow), dom.text(text)));
      return setTimeout((function() {
        return setStyle(tooltip, style.tooltipActive);
      }), 10);
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


},{"../../utils":38,"../../utils/component":34,"../../utils/dom":36,"./style":29}],29:[function(require,module,exports){
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
  bottom: -7,
  right: (150 - 7) / 2,
  borderWidth: '7px 7px 0',
  borderTopColor: '#c00'
};


},{}],30:[function(require,module,exports){
/*
  Expose functions.
*/
module.exports =
  { toJalaali: toJalaali
  , toGregorian: toGregorian
  , isValidJalaaliDate: isValidJalaaliDate
  , isLeapJalaaliYear: isLeapJalaaliYear
  , jalaaliMonthLength: jalaaliMonthLength
  , jalCal: jalCal
  , j2d: j2d
  , d2j: d2j
  , g2d: g2d
  , d2g: d2g
  }

/*
  Converts a Gregorian date to Jalaali.
*/
function toJalaali(gy, gm, gd) {
  if (Object.prototype.toString.call(gy) === '[object Date]') {
    gd = gy.getDate()
    gm = gy.getMonth() + 1
    gy = gy.getFullYear()
  }
  return d2j(g2d(gy, gm, gd))
}

/*
  Converts a Jalaali date to Gregorian.
*/
function toGregorian(jy, jm, jd) {
  return d2g(j2d(jy, jm, jd))
}

/*
  Checks whether a Jalaali date is valid or not.
*/
function isValidJalaaliDate(jy, jm, jd) {
  return  jy >= -61 && jy <= 3177 &&
          jm >= 1 && jm <= 12 &&
          jd >= 1 && jd <= jalaaliMonthLength(jy, jm)
}

/*
  Is this a leap year or not?
*/
function isLeapJalaaliYear(jy) {
  return jalCal(jy).leap === 0
}

/*
  Number of days in a given month in a Jalaali year.
*/
function jalaaliMonthLength(jy, jm) {
  if (jm <= 6) return 31
  if (jm <= 11) return 30
  if (isLeapJalaaliYear(jy)) return 30
  return 29
}

/*
  This function determines if the Jalaali (Persian) year is
  leap (366-day long) or is the common year (365 days), and
  finds the day in March (Gregorian calendar) of the first
  day of the Jalaali year (jy).

  @param jy Jalaali calendar year (-61 to 3177)
  @return
    leap: number of years since the last leap year (0 to 4)
    gy: Gregorian year of the beginning of Jalaali year
    march: the March day of Farvardin the 1st (1st day of jy)
  @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
  @see: http://www.fourmilab.ch/documents/calendar/
*/
function jalCal(jy) {
  // Jalaali years starting the 33-year rule.
  var breaks =  [ -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210
                , 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
                ]
    , bl = breaks.length
    , gy = jy + 621
    , leapJ = -14
    , jp = breaks[0]
    , jm
    , jump
    , leap
    , leapG
    , march
    , n
    , i

  if (jy < jp || jy >= breaks[bl - 1])
    throw new Error('Invalid Jalaali year ' + jy)

  // Find the limiting years for the Jalaali year jy.
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i]
    jump = jm - jp
    if (jy < jm)
      break
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4)
    jp = jm
  }
  n = jy - jp

  // Find the number of leap years from AD 621 to the beginning
  // of the current Jalaali year in the Persian calendar.
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4)
  if (mod(jump, 33) === 4 && jump - n === 4)
    leapJ += 1

  // And the same in the Gregorian calendar (until the year gy).
  leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150

  // Determine the Gregorian date of Farvardin the 1st.
  march = 20 + leapJ - leapG

  // Find how many years have passed since the last leap year.
  if (jump - n < 6)
    n = n - jump + div(jump + 4, 33) * 33
  leap = mod(mod(n + 1, 33) - 1, 4)
  if (leap === -1) {
    leap = 4
  }

  return  { leap: leap
          , gy: gy
          , march: march
          }
}

/*
  Converts a date of the Jalaali calendar to the Julian Day number.

  @param jy Jalaali year (1 to 3100)
  @param jm Jalaali month (1 to 12)
  @param jd Jalaali day (1 to 29/31)
  @return Julian Day number
*/
function j2d(jy, jm, jd) {
  var r = jalCal(jy)
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1
}

/*
  Converts the Julian Day number to a date in the Jalaali calendar.

  @param jdn Julian Day number
  @return
    jy: Jalaali year (1 to 3100)
    jm: Jalaali month (1 to 12)
    jd: Jalaali day (1 to 29/31)
*/
function d2j(jdn) {
  var gy = d2g(jdn).gy // Calculate Gregorian year (gy).
    , jy = gy - 621
    , r = jalCal(jy)
    , jdn1f = g2d(gy, 3, r.march)
    , jd
    , jm
    , k

  // Find number of days that passed since 1 Farvardin.
  k = jdn - jdn1f
  if (k >= 0) {
    if (k <= 185) {
      // The first 6 months.
      jm = 1 + div(k, 31)
      jd = mod(k, 31) + 1
      return  { jy: jy
              , jm: jm
              , jd: jd
              }
    } else {
      // The remaining months.
      k -= 186
    }
  } else {
    // Previous Jalaali year.
    jy -= 1
    k += 179
    if (r.leap === 1)
      k += 1
  }
  jm = 7 + div(k, 30)
  jd = mod(k, 30) + 1
  return  { jy: jy
          , jm: jm
          , jd: jd
          }
}

/*
  Calculates the Julian Day number from Gregorian or Julian
  calendar dates. This integer number corresponds to the noon of
  the date (i.e. 12 hours of Universal Time).
  The procedure was tested to be good since 1 March, -100100 (of both
  calendars) up to a few million years into the future.

  @param gy Calendar year (years BC numbered 0, -1, -2, ...)
  @param gm Calendar month (1 to 12)
  @param gd Calendar day of the month (1 to 28/29/30/31)
  @return Julian Day number
*/
function g2d(gy, gm, gd) {
  var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
      + div(153 * mod(gm + 9, 12) + 2, 5)
      + gd - 34840408
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752
  return d
}

/*
  Calculates Gregorian and Julian calendar dates from the Julian Day number
  (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
  calendars) to some millions years ahead of the present.

  @param jdn Julian Day number
  @return
    gy: Calendar year (years BC numbered 0, -1, -2, ...)
    gm: Calendar month (1 to 12)
    gd: Calendar day of the month M (1 to 28/29/30/31)
*/
function d2g(jdn) {
  var j
    , i
    , gd
    , gm
    , gy
  j = 4 * jdn + 139361631
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908
  i = div(mod(j, 1461), 4) * 5 + 308
  gd = div(mod(i, 153), 5) + 1
  gm = mod(div(i, 153), 12) + 1
  gy = div(j, 1461) - 100100 + div(8 - gm, 6)
  return  { gy: gy
          , gm: gm
          , gd: gd
          }
}

/*
  Utility helper functions.
*/

function div(a, b) {
  return ~~(a / b)
}

function mod(a, b) {
  return a - ~~(a / b) * b
}
},{}],31:[function(require,module,exports){
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


},{"./utils/component":34,"./utils/dom":36,"./views":87}],32:[function(require,module,exports){
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
},{"_process":1}],33:[function(require,module,exports){
var linear, spring, timeStep;

linear = function(rawCallback, wrapCallback) {
  var animate, callback, lastX, running, startTime, totalTime, x, xDest, xStart;
  lastX = void 0;
  callback = function(x) {
    if (lastX !== x) {
      lastX = x;
      return rawCallback(x, function(start, end) {
        return start + (end - start) * x;
      });
    }
  };
  x = 0;
  running = false;
  xStart = xDest = startTime = totalTime = void 0;
  callback(x);
  animate = function() {
    var passedTime;
    passedTime = performance.now() - startTime;
    x = xStart + (xDest - xStart) * passedTime / totalTime;
    if (passedTime >= totalTime) {
      running = false;
      return callback(xDest);
    } else {
      callback(x);
      return requestAnimationFrame(animate);
    }
  };
  return function(start, dest, time) {
    xStart = x;
    xDest = dest;
    startTime = performance.now();
    totalTime = time * (xDest - xStart) / (dest - start);
    if (!(running || totalTime === 0)) {
      running = true;
      return requestAnimationFrame(animate);
    }
  };
};

timeStep = 1 / 60;

spring = function(arg1, rawCallback) {
  var animate, callback, k, lastTime, lastX, m, running, v, x, xRest;
  k = arg1[0], m = arg1[1];
  lastX = void 0;
  callback = function(x) {
    if (lastX !== x) {
      lastX = x;
      return rawCallback(x, running, function(start, end) {
        return start + (end - start) * x;
      });
    }
  };
  x = xRest = 0;
  v = 0;
  running = false;
  lastTime = void 0;
  callback(xRest);
  animate = function() {
    var a, deltaTime, i, j, now, ref, remainingTime, stepsCount;
    now = performance.now();
    deltaTime = now - lastTime;
    stepsCount = Math.floor(deltaTime / 1000 / timeStep);
    lastTime = now;
    for (i = j = 0, ref = stepsCount; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      a = -k * (x - xRest) - m * v;
      v += a * timeStep;
      x += v * timeStep;
    }
    remainingTime = (deltaTime / 1000) - (stepsCount * timeStep);
    a = -k * (x - xRest) - m * v;
    v += a * remainingTime;
    x += v * remainingTime;
    if (Math.abs(a) <= 0.1) {
      running = false;
      return callback(xRest);
    } else {
      callback(x);
      return requestAnimationFrame(animate);
    }
  };
  return function(arg, arg2) {
    if (typeof arg === 'function') {
      return rawCallback = arg;
    } else if (typeof arg === 'object') {
      return k = arg[0], m = arg[1], arg;
    } else if (arg2 === 'stretch') {
      x = arg;
      v = 0;
      return callback(x);
    } else if (arg2 === 'goto') {
      x = xRest = arg;
      v = 0;
      running = false;
      return callback(x);
    } else {
      xRest = arg;
      if (!running) {
        running = true;
        lastTime = performance.now();
        return requestAnimationFrame(animate);
      }
    }
  };
};

module.exports = {
  linear: linear,
  spring: spring
};


},{}],34:[function(require,module,exports){
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


},{".":38,"./dom":36,"./events":37,"./log":39,"./service":44,"./state":49}],35:[function(require,module,exports){
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


},{}],36:[function(require,module,exports){
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
        case 'colSpan':
        case 'rowSpan':
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


},{".":38,"./log":39}],37:[function(require,module,exports){
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
    var clearInterval, l, lastHeight, unbind;
    l = log.onResize(thisComponent, callback);
    l(0);
    unbind = exports.onEvent(window(), 'resize', function(e) {
      l(1, e);
      callback(e);
      return l(1, e);
    });
    lastHeight = void 0;
    clearInterval = setInterval(function() {
      var height;
      height = body().fn.element.clientHeight;
      if (height !== lastHeight) {
        l(1, 'height');
        callback();
        l(1, 'height');
      }
      return lastHeight = height;
    });
    l(0);
    return function() {
      l(2);
      unbind();
      clearInterval();
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


},{".":38,"./dom":36,"./log":39}],38:[function(require,module,exports){
var slice = [].slice;

exports.emailIsValid = function(email) {
  return /^.+@.+\..+$/.test(email);
};

exports.defer = function(times) {
  return function(f) {
    var x;
    return (x = function() {
      return setTimeout(function() {
        times--;
        if (times) {
          return f();
        } else {
          return x();
        }
      });
    })();
  };
};

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

exports.toTime = function(timestamp) {
  var date, hours, minutes;
  date = new Date(timestamp);
  hours = String(date.getHours());
  minutes = String(date.getMinutes());
  if (hours.length === 1) {
    hours = '0' + hours;
  }
  if (minutes.length === 1) {
    minutes = '0' + minutes;
  }
  return hours + ":" + minutes;
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


},{}],39:[function(require,module,exports){
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


},{}],40:[function(require,module,exports){
exports.passwordIsValid = function(password) {
  return password.length >= 6;
};

exports.statuses = ['ثبت شده', 'درخواست مصاحبه تلفنی', 'در انتظار مصاحبه تلفنی', 'مصاحبه تلفنی انجام شد', 'درخواست مصاحبه عمومی', 'درخواست مصاحبه فنی', 'در انتظار تکمیل اطلاعات برای مصاحبه فنی', 'در انتظار تکمیل اطلاعات برای مصاحبه عمومی', 'در انتظار مصاحبه فنی', 'در انتظار مصاحبه عمومی', 'مراحل اداری', 'جذب', 'بایگانی', 'بازیابی'];

exports.actions = ['ثبت شده', 'درخواست مصاحبه تلفنی', 'در انتظار مصاحبه تلفنی', 'مصاحبه تلفنی انجام شد', 'درخواست مصاحبه عمومی', 'درخواست مصاحبه فنی', 'اطلاعات تکمیل شد', '', 'در انتظار مصاحبه فنی', 'در انتظار مصاحبه عمومی', 'مراحل اداری', 'جذب', 'بایگانی', 'مصاحبه حذف شد', 'مصاحبه ویرایش شد'];

exports.actionModifiable = function(action) {
  return true;
  switch (action) {
    case 0:
      return true;
    case 1:
      return false;
  }
};


},{}],41:[function(require,module,exports){
var Q, mock;

Q = require('../../q');

mock = require('./mock');

module.exports = function(isGet, serviceName, params) {
  var url;
  if (params == null) {
    params = {};
  }
  if (mock[serviceName]) {
    return mock[serviceName](params).then(function(x) {
      return JSON.parse(JSON.stringify(x));
    });
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
      var response;
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          response = xhr.responseText;
          try {
            response = JSON.parse(response);
          } catch (undefined) {}
          return resolve(response);
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


},{"../../q":32,"./mock":46}],42:[function(require,module,exports){
var Q, cruds, eraseCookie, extend, get, gets, post, posts, ref, ref1, ref2, remove, state, stateChangingServices, uppercaseFirst,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Q = require('../../q');

state = require('../state');

stateChangingServices = require('./stateChangingServices');

ref = require('./names'), gets = ref.gets, posts = ref.posts, cruds = ref.cruds;

ref1 = require('./getPost'), get = ref1.get, post = ref1.post;

eraseCookie = require('../cookies').eraseCookie;

ref2 = require('..'), extend = ref2.extend, uppercaseFirst = ref2.uppercaseFirst, remove = ref2.remove;

exports.logout = function(automatic) {
  if (automatic == null) {
    automatic = false;
  }
  ['user'].forEach(function(x) {
    return state[x].set(null);
  });
  ['applicants', 'notifications', 'managers', 'jobs'].forEach(function(stateName) {
    return state[stateName].set([]);
  });
  eraseCookie('JSESSIONID');
  if (automatic !== true) {
    stateChangingServices.logout.endedAt = +new Date();
  }
  return Q();
};

exports.submitProfileData = function(data) {
  return post('submitProfileData', {
    data: JSON.stringify(data)
  }).then(function() {
    return state.user.on({
      once: true
    }, function(user) {
      return state.user.set(extend({}, user, {
        applicantData: JSON.stringify(data)
      }));
    });
  });
};

exports.changeHRStatus = function(applicantId, status) {
  return post('changeHRStatus', extend({
    applicantId: applicantId
  }, status)).then(function(x) {
    if (x.indexOf('statusId = ') !== 0) {
      return;
    }
    x = +x.substr('statusId = '.length);
    return state.applicants.on({
      once: true
    }, function(applicants) {
      var applicant, applicantsHRStatus;
      applicant = applicants.filter(function(arg) {
        var userId;
        userId = arg.userId;
        return userId === applicantId;
      })[0];
      applicantsHRStatus = applicant.applicantsHRStatus;
      applicants = applicants.slice();
      applicantsHRStatus = applicantsHRStatus.slice();
      applicantsHRStatus.push(extend({}, status, {
        statusHRId: x
      }));
      applicants[applicants.indexOf(applicant)] = extend({}, applicant, {
        applicantsHRStatus: applicantsHRStatus
      });
      return state.applicants.set(applicants);
    });
  });
};

exports.createMultipleHRStatus = function(applicantIds) {
  return post('createMultipleHRStatus', {
    applicantIds: applicantIds.join(',')
  }).then(function(x) {
    var xs;
    if (x.indexOf('statusIds = [') !== 0) {
      return;
    }
    x = x.substr('statusIds = ['.length);
    xs = x.substr(0, x.length - 1).split(',').map(function(x) {
      return +x;
    });
    return state.applicants.on({
      once: true
    }, function(applicants) {
      applicantIds.forEach(function(applicantId, i) {
        var applicant, applicantsHRStatus;
        applicant = applicants.filter(function(arg) {
          var userId;
          userId = arg.userId;
          return userId === applicantId;
        })[0];
        applicantsHRStatus = applicant.applicantsHRStatus;
        applicants = applicants.slice();
        applicantsHRStatus = applicantsHRStatus.slice();
        applicantsHRStatus.push({
          status: 12,
          modificationTime: +new Date(),
          statusHRId: xs[i]
        });
        return applicants[applicants.indexOf(applicant)] = extend({}, applicant, {
          applicantsHRStatus: applicantsHRStatus
        });
      });
      return state.applicants.set(applicants);
    });
  });
};

exports.editHRStatus = function(statusId, interviewId, status) {
  return post('editHRStatus', interviewId ? extend({
    statusId: statusId,
    interviewId: interviewId
  }, status) : extend({
    statusId: statusId
  }, status)).then(function(x) {
    if (x.indexOf('statusId = ') !== 0) {
      return;
    }
    x = +x.substr('statusId = '.length);
    return state.applicants.on({
      once: true
    }, function(applicants) {
      var applicant, applicantsHRStatus, s;
      applicant = applicants.filter(function(arg) {
        var applicantsHRStatus;
        applicantsHRStatus = arg.applicantsHRStatus;
        return applicantsHRStatus.some(function(arg1) {
          var statusHRId;
          statusHRId = arg1.statusHRId;
          return statusHRId === statusId;
        });
      })[0];
      applicantsHRStatus = applicant.applicantsHRStatus;
      applicants = applicants.slice();
      applicantsHRStatus = applicantsHRStatus.slice();
      s = applicantsHRStatus.filter(function(arg) {
        var statusHRId;
        statusHRId = arg.statusHRId;
        return statusHRId === statusId;
      })[0];
      applicantsHRStatus[applicantsHRStatus.indexOf(s)] = extend({}, status, {
        statusHRId: x
      });
      applicants[applicants.indexOf(applicant)] = extend({}, applicant, {
        applicantsHRStatus: applicantsHRStatus
      });
      return state.applicants.set(applicants);
    });
  });
};

exports.deleteHRStatus = function(statusId, interviewId) {
  return post('deleteHRStatus', interviewId ? {
    statusId: statusId,
    interviewId: interviewId
  } : {
    statusId: statusId
  }).then(function() {
    return state.applicants.on({
      once: true
    }, function(applicants) {
      var applicant, applicantsHRStatus, status;
      applicant = applicants.filter(function(arg) {
        var applicantsHRStatus;
        applicantsHRStatus = arg.applicantsHRStatus;
        return applicantsHRStatus.some(function(arg1) {
          var statusHRId;
          statusHRId = arg1.statusHRId;
          return statusHRId === statusId;
        });
      })[0];
      applicantsHRStatus = applicant.applicantsHRStatus;
      applicants = applicants.slice();
      applicantsHRStatus = applicantsHRStatus.slice();
      status = applicantsHRStatus.filter(function(arg) {
        var statusHRId;
        statusHRId = arg.statusHRId;
        return statusHRId === statusId;
      })[0];
      remove(applicantsHRStatus, status);
      applicants[applicants.indexOf(applicant)] = extend({}, applicant, {
        applicantsHRStatus: applicantsHRStatus
      });
      return state.applicants.set(applicants);
    });
  });
};

exports.changeManagerStatus = function(applicantId, status) {
  return post('changeManagerStatus', {
    applicantId: applicantId,
    status: status
  }).then(function() {
    return state.user.on({
      once: true
    }, function(user) {
      return state.applicants.on({
        once: true
      }, function(applicants) {
        var applicant, applicantsManagerStatus;
        applicant = applicants.filter(function(arg) {
          var userId;
          userId = arg.userId;
          return userId === applicantId;
        })[0];
        applicantsManagerStatus = applicant.applicantsManagerStatus;
        applicants = applicants.slice();
        applicantsManagerStatus = applicantsManagerStatus.slice();
        applicantsManagerStatus.push({
          status: status,
          managerId: user.userId
        });
        applicants[applicants.indexOf(applicant)] = extend({}, applicant, {
          applicantsManagerStatus: applicantsManagerStatus
        });
        return state.applicants.set(applicants);
      });
    });
  });
};

exports.clearAllNotifications = function() {
  return get('clearAllNotifications').then(function() {
    return state.notifications.set([]);
  });
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


},{"..":38,"../../q":32,"../cookies":35,"../state":49,"./getPost":43,"./names":47,"./stateChangingServices":48}],43:[function(require,module,exports){
var ajax, eraseCookie, ex, handle, map, state, stateChangingServices, states;

ajax = require('./ajax');

stateChangingServices = require('./stateChangingServices');

ex = require('./ex');

states = require('./names').states;

eraseCookie = require('../cookies').eraseCookie;

state = require('../state');

map = require('./map');

handle = function(isGet) {
  return function(serviceName, params) {
    var ref, startedAt;
    if ((ref = stateChangingServices[serviceName]) != null) {
      ref.running = true;
    }
    startedAt = +new Date();
    return ajax(isGet, serviceName, params)["catch"](function(e) {
      var ref1, ref2;
      if ((ref1 = stateChangingServices[serviceName]) != null) {
        ref1.running = false;
      }
      if ((ref2 = stateChangingServices[serviceName]) != null) {
        ref2.endedAt = +new Date();
      }
      throw e;
    }).then(function(response) {
      var ref1, ref2;
      if (!((response != null) && typeof response === 'object')) {
        response = {
          value: response
        };
      }
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
          if (response[name] || (map[name] && response[map[name]])) {
            responseValue = response[name] || response[map[name]];
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


},{"../cookies":35,"../state":49,"./ajax":41,"./ex":42,"./map":45,"./names":47,"./stateChangingServices":48}],44:[function(require,module,exports){
var Q, ex, get, gets, log, others, post, posts, ref, ref1,
  slice = [].slice;

Q = require('../../q');

ex = require('./ex');

ref = require('./names'), gets = ref.gets, posts = ref.posts, others = ref.others;

ref1 = require('./getPost'), get = ref1.get, post = ref1.post;

log = require('../log').service;

exports.instance = function(thisComponent) {
  var exports;
  exports = {};
  gets.concat(posts).concat(others).forEach(function(x) {
    return exports[x] = function() {
      var l, params;
      params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      l = log.get(thisComponent, x, params);
      l();
      return ex[x].apply(ex, params).then(function(data) {
        l(data);
        return data;
      })["catch"](function(e) {
        console.log(e);
        throw e;
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


},{"../../q":32,"../log":39,"./ex":42,"./getPost":43,"./names":47}],45:[function(require,module,exports){
exports.jobs = 'allRecordedJobs';


},{}],46:[function(require,module,exports){
var Q, applicants, extend, jobs, managers, notifications, user;

return;

Q = require('../../q');

extend = require('../../utils').extend;

managers = [
  {
    userId: 10,
    firstName: 'روح‌الله',
    lastName: 'محمد‌خانی'
  }, {
    userId: 11,
    firstName: 'حامد',
    lastName: 'حسینی‌نژاد'
  }
];

jobs = [
  {
    jobId: 0,
    jobName: 'Java developer'
  }, {
    jobId: 1,
    jobName: 'Javascript developer'
  }, {
    jobId: 2,
    jobName: 'UX designer'
  }
];

applicants = [
  {
    dateRelatedId: '12345678901',
    userId: 0,
    identificationCode: '0016503368',
    firstName: 'علی',
    lastName: 'درستی',
    phoneNumber: '09121234567',
    email: 'dorosty@doin.ir',
    birthday: '1340/1/2',
    selectedJobs: [jobs[0], jobs[1]],
    resume: null,
    personalPic: null,
    modificationTime: 1473132854116,
    notes: [],
    applicantsHRStatus: [
      {
        statusHRId: 0,
        status: 3
      }, {
        statusHRId: 1,
        status: 8,
        interViewTime: 1486369082850
      }
    ],
    applicantsManagerStatus: [],
    history: [
      {
        firstName: 'aaa',
        lastName: 'bbb',
        personalPic: null,
        action: 0,
        time: 1486369082850
      }, {
        firstName: 'ddd',
        lastName: 'ccc',
        personalPic: null,
        action: 1,
        time: 1386369082850
      }
    ]
  }, {
    dateRelatedId: '23456789012',
    userId: 1,
    identificationCode: '0016503368',
    firstName: 'سعید',
    lastName: 'قیومیه',
    phoneNumber: '09121234567',
    email: 'ghayoomi@dotin.ir',
    birthday: '1343/4/5',
    selectedJobs: [jobs[2]],
    resume: null,
    personalPic: null,
    modificationTime: 1373132854116,
    notes: ['aaaaaaaaaaaa'],
    applicantsHRStatus: [
      {
        statusHRId: 2,
        status: 9,
        interViewTime: 1486369082850,
        jobId: jobs[1].jobId,
        managerId: managers[0].userId
      }
    ],
    applicantsManagerStatus: [],
    history: []
  }
];

user = {
  userId: 110,
  identificationCode: '0016503368',
  firstName: 'علی',
  lastName: 'درستی',
  userType: 2,
  phoneNumber: '09121234567',
  email: 'dorosty@doin.ir',
  birthday: '1340/1/2',
  personalPic: null,
  modificationTime: 1473132854116,
  notes: [],
  applicantsHRStatus: [],
  applicantsManagerStatus: [],
  selectedJobs: [
    {
      jobName: 'Java developer'
    }, {
      jobName: 'Javascript developer'
    }
  ],
  resume: null,
  applicantData: JSON.stringify({
    "مشخصات فردی": {
      "جنسیت": "مرد",
      "وضعیت تاهل": "سایر",
      "نام پدر": "1",
      "شماره شناسنامه": "۱",
      "محل تولد": "1",
      "محل صدور": "1",
      "ملیت": "1",
      "تابعیت": "1",
      "دین": "1",
      "تاریخ تولد": "۱۳۱۱/۱/۱",
      "وضعیت نظام وظیفه": "معاف",
      "تعداد فرزندان": "۱",
      "تعداد افراد تحت تکفل": "۱",
      "نوع معافیت": "معافیت پزشکی",
      "دلیل معافیت": "1",
      "نام معرف": "1",
      "ایمیل": ["ma.dorosty@gmail.com"],
      "تلفن همراه": ["۰۹۳۷۲۹۹۵۹۷۴"],
      "آدرس محل سکونت دائم": "1",
      "تلفن ثابت محل سکونت دائم": "۱",
      "آدرس محل سکونت فعلی": "1",
      "تلفن ثابت محل سکونت فعلی": "۱"
    },
    "سایر اطلاعات": {
      "در ساعات اضافه کاری حضور داشته و کار کنید": "بلی",
      "در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید": "بلی",
      "در شیفت شب کار کنید": "بلی",
      "در تعطیلات آخر هفته کار کنید": "بلی",
      "در شهر تهران غیر از محل شرکت مشغول کار شوید": "بلی",
      "آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید": "بلی",
      "آیا دخانیات مصرف می‌کنید": "خیر",
      "آیا سابقه محکومیت کیفری دارید": "بلی",
      "متقاضی چه نوع همکاری هستید": "تمام وقت",
      "از چه طریقی از فرصت شغلی در داتین مطلع شدید": "نمایشگاه/همایش/کنفرانس",
      "از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید": "۱۳۱۱/۱/۱",
      "نوع بیمه‌ای که تا‌به‌حال داشته‌اید": "1",
      "مدت زمانی که بیمه بوده‌اید": "1",
      "مقدار دستمزد": "۱",
      "میزان دستمزد": "مقدار مشخص",
      "مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند": [
        {
          "نام و نام خانوادگی": "1",
          "نسبت با شما": "1",
          "نام محل کار": "1",
          "سمت": "1",
          "شماره تماس": "۱"
        }, {
          "نام و نام خانوادگی": "1",
          "نسبت با شما": "1",
          "نام محل کار": "1",
          "سمت": "1",
          "شماره تماس": "۱"
        }
      ],
      "در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید": [
        {
          "نام و نام خانوادگی": "1",
          "سمت": "1",
          "نام محل کار": "1",
          "نسبت با شما": "1",
          "شماره تماس": "۱"
        }
      ],
      "ورزش‌های مورد علاقه": "1",
      "زمینه‌های هنری مورد علاقه": "1",
      "نوع آن را ذکر نمایید": "1",
      "تاریخ، دلایل و مدت آن را توضیح دهید": "1"
    },
    "سوابق تحصیلی": {
      "سوابق تحصیلی": [
        {
          "مقطع": "دیپلم",
          "رشته تحصیلی": "1",
          "نام دانشگاه و شهر محل تحصیل": "1",
          "سال ورود": "۱۳۱۱",
          "سال اخذ مدرک": "۱۳۱۱",
          "معدل": "۱",
          "عنوان پایان‌نامه": "1"
        }
      ],
      "مقطع و رشته‌ای که ادامه می‌دهید": "1"
    },
    "توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها": {
      "مهارت‌ها": [
        {
          "شایستگی / مهارت": "1",
          "علاقه به کار در این حوزه": "کم",
          "دانش و مهارت در این حوزه": "کم"
        }
      ],
      "دوره‌ها": [
        {
          "دوره": "1",
          "برگزار کننده": "1",
          "سال": "۱۳۱۱"
        }
      ],
      "نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده": "1",
      "آثار علمی و عضویت در انجمن‌ها": "1"
    },
    "مهارت زبان انگلیسی": {
      "مکالمه": "عالی",
      "نوشتن": "عالی",
      "خواندن": "عالی"
    },
    "آخرین سوابق سازمانی و پروژه‌ای": {
      "آخرین سوابق سازمانی و پروژه‌ای": [
        {
          "نام": "1",
          "نوع فعالیت": "1",
          "سمت": "1",
          "نام مدیر عامل": "1",
          "نام مدیر مستقیم": "1",
          "تلفن": "۱",
          "محدوده نشانی": "1",
          "تاریخ شروع": "۱۳۱۱/۱/۱",
          "تاریخ پایان": "۱۳۱۱/۱/۱",
          "نوع همکاری": "تمام وقت",
          "علت خاتمه همکاری": "1",
          "آخرین خالص دریافتی": "۱۰۰۰۰۰۰",
          "شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف": "1"
        }
      ]
    }
  })
};

applicants.forEach(function(applicant) {
  return applicant.applicantData = user.applicantData;
});

user.applicantData = void 0;

notifications = [
  {
    userName: 'علی فرخی',
    userPersonalPic: null,
    status: 7,
    time: 1373132854116,
    applicantId: 0
  }, {
    userName: 'سجاد افشاریان',
    userPersonalPic: null,
    status: 7,
    time: 1373132854116,
    applicantId: 1
  }, {
    userName: 'سجاد افشاریان',
    userPersonalPic: null,
    status: 7,
    time: 1373132854116,
    applicantId: 0
  }, {
    userName: 'سجاد افشاریان',
    userPersonalPic: null,
    status: 7,
    time: 1373132854116,
    applicantId: 1
  }
];

exports.ping = function() {
  return Q({
    user: user,
    notifications: notifications,
    applicants: applicants,
    managers: managers,
    jobs: jobs
  });
};

exports.getUser = function() {
  return Q({
    user: user,
    notifications: notifications
  });
};

exports.login = function(arg) {
  var email;
  email = arg.email;
  return Q.delay(1000 + Math.floor(2000 * Math.random())).then(function() {
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

exports.logout = function() {
  user = void 0;
  return Q.delay(1000 + Math.floor(2000 * Math.random())).then(function() {
    return {
      loggedOut: true
    };
  });
};

exports.addJob = function() {
  return Q.delay(1000 + Math.floor(2000 * Math.random())).then(function() {
    return {};
  });
};

exports.getCaptcha = function() {
  return Q.delay(1000 + Math.floor(2000 * Math.random())).then(function() {
    return '12*x=48';
  });
};

exports.submitProfileData = function(arg) {
  var data;
  data = arg.data;
  return Q.delay(1000 + Math.floor(2000 * Math.random())).then(function() {
    return user = extend({}, user, {
      applicantData: data
    });
  });
};

exports.changeHRStatus = function(arg) {
  var applicantId, status;
  applicantId = arg.applicantId, status = arg.status;
  return Q.delay(1000 + Math.floor(2000 * Math.random())).then(function() {
    var applicant;
    applicants = JSON.parse(JSON.stringify(applicants));
    applicant = applicants.filter(function(arg1) {
      var userId;
      userId = arg1.userId;
      return userId === applicantId;
    })[0];
    applicant.applicantsHRStatus.push({
      status: status
    });
    return {};
  });
};

exports.changeManagerStatus = function(arg) {
  var applicantId, status;
  applicantId = arg.applicantId, status = arg.status;
  return Q.delay(1000 + Math.floor(2000 * Math.random())).then(function() {
    var applicant;
    applicants = JSON.parse(JSON.stringify(applicants));
    applicant = applicants.filter(function(arg1) {
      var userId;
      userId = arg1.userId;
      return userId === applicantId;
    })[0];
    applicant.applicantsManagerStatus.push({
      status: status,
      managerId: user.userId
    });
    return {};
  });
};

exports.clearAllNotifications = function() {
  return Q.delay(1000 + Math.floor(2000 * Math.random())).then(function() {
    notifications = [];
    return {};
  });
};


},{"../../q":32,"../../utils":38}],47:[function(require,module,exports){
exports.gets = ['getCaptcha', 'getUser'];

exports.posts = ['login', 'addJob', 'loadInterview', 'loadApplicantHistory'];

exports.cruds = [
  {
    name: 'person',
    persianName: 'شخص'
  }
];

exports.others = ['logout', 'submitProfileData', 'changeHRStatus', 'editHRStatus', 'deleteHRStatus', 'changeManagerStatus', 'clearAllNotifications', 'createMultipleHRStatus'];

exports.states = ['user', 'applicants', 'notifications', 'managers', 'hrUsers', 'jobs'];


},{}],48:[function(require,module,exports){
var cruds, uppercaseFirst;

cruds = require('./names').cruds;

uppercaseFirst = require('..').uppercaseFirst;

module.exports = {
  logout: {
    stateName: 'user'
  },
  login: {
    stateName: 'user'
  },
  clearAllNotifications: {
    stateName: 'notifications'
  },
  changeHRStatus: {
    stateName: 'applicants'
  },
  changeManagerStatus: {
    stateName: 'applicants'
  },
  createMultipleHRStatus: {
    stateName: 'applicants'
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


},{"..":38,"./names":47}],49:[function(require,module,exports){
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
      if (name === 'applicants') {
        data.forEach(function(applicant) {
          return applicant.applicantsHRStatus = (applicant.applicantsHRStatus || []).sort(function(a, b) {
            return a.statusHRId - b.statusHRId;
          });
        });
      }
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


},{"../log":39,"./names":50}],50:[function(require,module,exports){
module.exports = ['user', 'applicants', 'notifications', 'hrUsers', 'managers', 'jobs'];


},{}],51:[function(require,module,exports){
var checkbox, component, dropdown, extend, gradeInput, ref, remove, style, yearInput;

component = require('../../../../utils/component');

style = require('./style');

dropdown = require('../../../../components/dropdown');

yearInput = require('../../../../components/restrictedInput/year');

gradeInput = require('../../../../components/restrictedInput/grade');

checkbox = require('../../../../components/checkbox');

ref = require('../../../../utils'), extend = ref.extend, remove = ref.remove;

module.exports = component('applicantFormEducation', function(arg, arg1) {
  var E, append, checkbox0, destroy, dom, events, handleTextarea, hide, onEvent, registerErrorField, setData, setError, setStyle, show, table, textarea0, textareaError, view;
  dom = arg.dom, events = arg.events;
  setData = arg1.setData, registerErrorField = arg1.registerErrorField, setError = arg1.setError;
  E = dom.E, setStyle = dom.setStyle, append = dom.append, destroy = dom.destroy, show = dom.show, hide = dom.hide;
  onEvent = events.onEvent;
  table = (function() {
    var add, body, createRow, entries, removeButtons, rows, view;
    entries = [];
    rows = [];
    removeButtons = [];
    view = E('span', null, E('table', null, E('thead', null, E('tr', null, E('th', style.th, 'مقطع'), E('th', style.th, 'رشته تحصیلی'), E('th', style.th, 'نام دانشگاه و شهر محل تحصیل'), E('th', style.th, 'سال ورود'), E('th', style.th, 'سال اخذ مدرک'), E('th', style.th, 'معدل'), E('th', style.th, 'عنوان پایان‌نامه'), E('th', style.th))), body = E('tbody', null)), E(null, add = E(style.add)));
    (createRow = function() {
      var entry, fields, i0, i1, i2, i3, i4, i5, i6, offErrors, row, showHideRemoveButtons;
      entries.push(entry = {});
      rows.push(row = E('tr', null, E('td', style.td, i0 = (function() {
        var f;
        i0 = f = E(dropdown, {
          items: ['دیپلم', 'کاردانی', 'کارشناسی', 'کارشناسی ارشد', 'دکتری']
        });
        setStyle(f.input, extend({}, style.input, {
          width: 150
        }));
        return i0;
      })()), E('td', style.td, i1 = E('input', style.input)), E('td', style.td, i2 = E('input', extend({}, style.input, {
        width: 150
      }))), E('td', style.td, i3 = (function() {
        i3 = E(yearInput);
        setStyle(i3, style.input);
        return i3;
      })()), E('td', style.td, i4 = (function() {
        i4 = E(yearInput);
        setStyle(i4, style.input);
        return i4;
      })()), E('td', style.td, i5 = (function() {
        i5 = E(gradeInput);
        setStyle(i5, style.input);
        return i5;
      })()), E('td', style.td, i6 = E('input', extend({}, style.input, {
        width: 150
      }))), E('td', style.td, (function() {
        var removeButton;
        removeButtons.push(removeButton = E(style.remove));
        onEvent(removeButton, 'click', function() {
          remove(rows, row);
          remove(entries, entry);
          setData('سوابق تحصیلی', entries);
          destroy(row);
          showHideRemoveButtons();
          return offErrors.forEach(function(x) {
            return x();
          });
        });
        return removeButton;
      })())));
      (showHideRemoveButtons = function() {
        if (entries.length > 1) {
          return show(removeButtons);
        } else {
          return hide(removeButtons);
        }
      })();
      append(body, row);
      offErrors = [];
      return Object.keys(fields = {
        'مقطع': i0,
        'رشته تحصیلی': i1,
        'نام دانشگاه و شهر محل تحصیل': i2,
        'سال ورود': i3,
        'سال اخذ مدرک': i4,
        'معدل': i5,
        'عنوان پایان‌نامه': i6
      }).forEach(function(fieldName) {
        var error, field, handleChange, input;
        field = fields[fieldName];
        error = registerErrorField(field, field);
        offErrors.push(error.off);
        setError(error, 'تکمیل این فیلد الزامیست.', true);
        if (field.onChange) {
          field.onChange(function() {
            entry[fieldName] = field.value();
            return setData('سوابق تحصیلی', entries);
          });
          onEvent(field.input, 'input', function() {
            return setError(error, 'تکمیل این فیلد الزامیست.', true);
          });
          return onEvent(field.input, 'blur', function() {
            return setTimeout(function() {
              if (field.value() == null) {
                return setError(error, 'تکمیل این فیلد الزامیست.');
              } else {
                return setError(error, null);
              }
            });
          });
        } else {
          input = field.input || field;
          onEvent(input, 'input', function() {
            entry[fieldName] = field.value();
            return setData('سوابق تحصیلی', entries);
          });
          handleChange = function(hidden) {
            return function() {
              if (!field.value().trim()) {
                return setError(error, 'تکمیل این فیلد الزامیست.', hidden);
              } else if ((field.valid != null) && !field.valid()) {
                return setError(error, 'مقدار وارد شده قابل قبول نیست.', hidden);
              } else {
                return setError(error, null);
              }
            };
          };
          onEvent(input, 'input', handleChange(true));
          return onEvent(input, 'blur', handleChange(false));
        }
      });
    })();
    onEvent(add, 'click', createRow);
    return view;
  })();
  view = E(null, table, E(style.column, checkbox0 = E(checkbox, 'آیا مایل به ادامه تحصیل در سال‌های آینده هستید؟'), textarea0 = hide(E('textarea', extend({
    placeholder: 'مقطع و رشته‌ای را که ادامه می‌دهید ذکر کنید.'
  }, style.textarea)))), E(style.clearfix));
  textareaError = registerErrorField(textarea0, textarea0);
  handleTextarea = function(hidden) {
    setData('مقطع و رشته‌ای که ادامه می‌دهید', textarea0.value());
    if (textarea0.value().trim()) {
      return setError(textareaError, null);
    } else {
      return setError(textareaError, 'تکمیل این فیلد الزامیست.', hidden);
    }
  };
  checkbox0.onChange(function() {
    if (checkbox0.value()) {
      show(textarea0);
      return handleTextarea(true);
    } else {
      hide(textarea0);
      setData('مقطع و رشته‌ای که ادامه می‌دهید', null);
      return setError(textareaError, null);
    }
  });
  onEvent(textarea0, 'input', function() {
    return handleTextarea(true);
  });
  onEvent(textarea0, 'blur', function() {
    return handleTextarea(false);
  });
  return view;
});


},{"../../../../components/checkbox":8,"../../../../components/dropdown":14,"../../../../components/restrictedInput/grade":22,"../../../../components/restrictedInput/year":26,"../../../../utils":38,"../../../../utils/component":34,"./style":52}],52:[function(require,module,exports){
var extend, icon;

extend = require('../../../../utils').extend;

exports.clearfix = {
  clear: 'both'
};

exports.th = {
  padding: '10px 10px 0',
  color: '#5c5555',
  fontSize: 12
};

exports.td = {
  padding: '10px 5px',
  color: '#5c5555',
  fontSize: 12
};

exports.input = {
  width: 100,
  fontSize: 12,
  height: 30,
  lineHeight: 30,
  borderRadius: 2,
  padding: '0 5px',
  outline: 'none',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555'
};

icon = {
  cursor: 'pointer',
  width: 20,
  height: 20,
  fontSize: 20,
  position: 'relative',
  top: 2
};

exports.add = extend({}, icon, {
  "class": 'fa fa-plus-circle',
  color: '#449e73',
  top: 0,
  right: 5
});

exports.remove = extend({}, icon, {
  "class": 'fa fa-minus-circle',
  color: '#d71d24'
});

exports.column = {
  float: 'right',
  width: '46%',
  padding: '2% 10px 0 10px'
};

exports.textarea = {
  minWidth: '100%',
  maxWidth: '100%',
  minHeight: 100,
  maxHeight: 100,
  margin: 5,
  fontSize: 12,
  borderRadius: 2,
  padding: '5px',
  outline: 'none',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555'
};


},{"../../../../utils":38}],53:[function(require,module,exports){
var component, dropdown, style;

component = require('../../../../utils/component');

style = require('./style');

dropdown = require('../../../../components/dropdown');

module.exports = component('applicantFormEnglish', function(arg, arg1) {
  var E, dom, events, onEvent, registerErrorField, setData, setError, setStyle;
  dom = arg.dom, events = arg.events;
  setData = arg1.setData, registerErrorField = arg1.registerErrorField, setError = arg1.setError;
  E = dom.E, setStyle = dom.setStyle;
  onEvent = events.onEvent;
  return E(null, ['مکالمه', 'نوشتن', 'خواندن'].map(function(labelText) {
    var column, error, field, label;
    field = E(dropdown, {
      items: ['عالی', 'خوب', 'متوسط', 'ضعیف']
    });
    setStyle(field, style.dropdownPlaceholder);
    setStyle(field.input, style.input);
    field.onChange(function() {
      return setData(labelText, field.value());
    });
    column = E(style.column, label = E(style.label, labelText), field);
    error = registerErrorField(label, field);
    setError(error, 'تکمیل این فیلد الزامیست.', true);
    onEvent(field.input, 'input', function() {
      return setError(error, 'تکمیل این فیلد الزامیست.', true);
    });
    onEvent(field.input, 'blur', function() {
      return setTimeout(function() {
        if (!field.value()) {
          return setError(error, 'تکمیل این فیلد الزامیست.');
        } else {
          return setError(error, null);
        }
      });
    });
    return column;
  }), E(style.clearfix));
});


},{"../../../../components/dropdown":14,"../../../../utils/component":34,"./style":54}],54:[function(require,module,exports){
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


},{}],55:[function(require,module,exports){
var applicantData, checkbox, component, d, education, english, extend, others, overview, personalInfo, ref, remove, reputation, scrollViewer, spring, style, tab1, talents, tooltip;

applicantData = {
  "مشخصات فردی": {
    "جنسیت": "مرد",
    "وضعیت تاهل": "سایر",
    "نام پدر": "1",
    "شماره شناسنامه": "۱",
    "محل تولد": "1",
    "محل صدور": "1",
    "ملیت": "1",
    "تابعیت": "1",
    "دین": "1",
    "تاریخ تولد": "۱۳۱۱/۱/۱",
    "وضعیت نظام وظیفه": "معاف",
    "تعداد فرزندان": "۱",
    "تعداد افراد تحت تکفل": "۱",
    "نوع معافیت": "معافیت پزشکی",
    "دلیل معافیت": "1",
    "نام معرف": "1",
    "ایمیل": ["ma.dorosty@gmail.com"],
    "تلفن همراه": ["۰۹۳۷۲۹۹۵۹۷۴"],
    "آدرس محل سکونت دائم": "1",
    "تلفن ثابت محل سکونت دائم": "۱",
    "آدرس محل سکونت فعلی": "1",
    "تلفن ثابت محل سکونت فعلی": "۱"
  },
  "سایر اطلاعات": {
    "در ساعات اضافه کاری حضور داشته و کار کنید": "بلی",
    "در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید": "بلی",
    "در شیفت شب کار کنید": "بلی",
    "در تعطیلات آخر هفته کار کنید": "بلی",
    "در شهر تهران غیر از محل شرکت مشغول کار شوید": "بلی",
    "آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید": "بلی",
    "آیا دخانیات مصرف می‌کنید": "خیر",
    "آیا سابقه محکومیت کیفری دارید": "بلی",
    "متقاضی چه نوع همکاری هستید": "تمام وقت",
    "از چه طریقی از فرصت شغلی در داتین مطلع شدید": "نمایشگاه/همایش/کنفرانس",
    "از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید": "۱۳۱۱/۱/۱",
    "نوع بیمه‌ای که تا‌به‌حال داشته‌اید": "1",
    "مدت زمانی که بیمه بوده‌اید": "1",
    "مقدار دستمزد": "۱",
    "میزان دستمزد": "مقدار مشخص",
    "مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند": [
      {
        "نام و نام خانوادگی": "1",
        "نسبت با شما": "1",
        "نام محل کار": "1",
        "سمت": "1",
        "شماره تماس": "۱"
      }, {
        "نام و نام خانوادگی": "1",
        "نسبت با شما": "1",
        "نام محل کار": "1",
        "سمت": "1",
        "شماره تماس": "۱"
      }
    ],
    "در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید": [
      {
        "نام و نام خانوادگی": "1",
        "سمت": "1",
        "نام محل کار": "1",
        "نسبت با شما": "1",
        "شماره تماس": "۱"
      }
    ],
    "ورزش‌های مورد علاقه": "1",
    "زمینه‌های هنری مورد علاقه": "1",
    "نوع آن را ذکر نمایید": "1",
    "تاریخ، دلایل و مدت آن را توضیح دهید": "1"
  },
  "سوابق تحصیلی": {
    "سوابق تحصیلی": [
      {
        "مقطع": "دیپلم",
        "رشته تحصیلی": "1",
        "نام دانشگاه و شهر محل تحصیل": "1",
        "سال ورود": "۱۳۱۱",
        "سال اخذ مدرک": "۱۳۱۱",
        "معدل": "۱",
        "عنوان پایان‌نامه": "1"
      }
    ],
    "مقطع و رشته‌ای که ادامه می‌دهید": "1"
  },
  "توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها": {
    "مهارت‌ها": [
      {
        "شایستگی / مهارت": "1",
        "علاقه به کار در این حوزه": "کم",
        "دانش و مهارت در این حوزه": "کم"
      }
    ],
    "دوره‌ها": [
      {
        "دوره": "1",
        "برگزار کننده": "1",
        "سال": "۱۳۱۱"
      }
    ],
    "نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده": "1",
    "آثار علمی و عضویت در انجمن‌ها": "1"
  },
  "مهارت زبان انگلیسی": {
    "مکالمه": "عالی",
    "نوشتن": "عالی",
    "خواندن": "عالی"
  },
  "آخرین سوابق سازمانی و پروژه‌ای": {
    "آخرین سوابق سازمانی و پروژه‌ای": [
      {
        "نام": "1",
        "نوع فعالیت": "1",
        "نام مدیر عامل": "1",
        "نام مدیر مستقیم": "1",
        "تلفن": "۱",
        "محدوده نشانی": "1",
        "تاریخ شروع": "۱۳۱۱/۱/۱",
        "تاریخ پایان": "۱۳۱۱/۱/۱",
        "نوع همکاری": "تمام وقت",
        "علت خاتمه همکاری": "1",
        "آخرین خالص دریافتی": "۱",
        "شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف": "1"
      }
    ]
  }
};

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

tooltip = require('../../../components/tooltip');

tab1 = require('../../tableView/profile/tab1');

ref = require('../../../utils'), extend = ref.extend, remove = ref.remove;

spring = require('../../../utils/animation').spring;

d = require('../../../utils/dom');

module.exports = component('applicantForm', function(arg) {
  var E, accept, append, cover, data, dom, errorSpring, errorSpringRunning, errors, events, hide, noData, onEvent, onResize, registerErrorField, resize, scroll, service, setData, setError, setOff, setStyle, setSubmitStyle, show, state, submit, submitting, text, view, yesData;
  dom = arg.dom, events = arg.events, state = arg.state, service = arg.service, setOff = arg.setOff;
  E = dom.E, text = dom.text, setStyle = dom.setStyle, show = dom.show, hide = dom.hide, append = dom.append;
  onEvent = events.onEvent, onResize = events.onResize;
  (setSubmitStyle = function() {
    return setTimeout(function() {
      if (accept.value() && errors.every(function(arg1) {
        var text;
        text = arg1.text;
        return !text;
      })) {
        return setStyle(submit, style.submit);
      } else {
        return setStyle(submit, style.submitDisabled);
      }
    });
  })();
  data = {};
  setData = function(category) {
    return function(key, value) {
      if (value != null) {
        if (data[category] == null) {
          data[category] = {};
        }
        return data[category][key] = value;
      } else if (data[category]) {
        delete data[category][key];
        if (!Object.keys(data[category]).length) {
          return delete data[category];
        }
      }
    };
  };
  errors = [];
  setOff(function() {
    return errors.forEach(function(arg1) {
      var hideTooltip;
      hideTooltip = arg1.hideTooltip;
      return typeof hideTooltip === "function" ? hideTooltip() : void 0;
    });
  });
  registerErrorField = function(label, field, notCritical) {
    var error, handleChange, input;
    input = field.input || field;
    error = {
      label: label,
      input: input,
      text: null,
      off: function() {
        remove(errors, error);
        return setSubmitStyle();
      }
    };
    if (!notCritical) {
      errors.push(error);
    }
    onEvent(input, 'focus', function() {
      var h;
      if (error.text && !error.hidden) {
        h = tooltip(input, error.text);
        return error.hideTooltip = function() {
          if (typeof h === "function") {
            h();
          }
          return h = null;
        };
      }
    });
    handleChange = function() {
      setStyle([label, input], style.valid);
      return typeof error.hideTooltip === "function" ? error.hideTooltip() : void 0;
    };
    onEvent(input, ['input', 'pInput'], handleChange);
    if (typeof field.onChange === "function") {
      field.onChange(handleChange);
    }
    onEvent(input, 'blur', function() {
      return typeof error.hideTooltip === "function" ? error.hideTooltip() : void 0;
    });
    return error;
  };
  setError = function(error, text, hidden) {
    extend(error, {
      text: text,
      hidden: hidden
    });
    if (text && !hidden) {
      setStyle([error.label, error.input], style.invalid);
    }
    return setSubmitStyle();
  };
  view = E(null, cover = E(style.cover), hide(noData = E()), yesData = E(null, E(overview), scroll = E(scrollViewer), E(style.header, 'مشخصات فردی'), E(personalInfo, {
    setData: setData('مشخصات فردی'),
    registerErrorField: registerErrorField,
    setError: setError
  }), E(style.header, 'سوابق تحصیلی'), E(education, {
    setData: setData('سوابق تحصیلی'),
    registerErrorField: registerErrorField,
    setError: setError
  }), E(style.header, text('توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها'), E(style.optional, '(اختیاری)')), E(talents, {
    setData: setData('توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها'),
    registerErrorField: registerErrorField,
    setError: setError
  }), E(style.header, 'مهارت زبان انگلیسی'), E(english, {
    setData: setData('مهارت زبان انگلیسی'),
    registerErrorField: registerErrorField,
    setError: setError
  }), E(style.header, text('آخرین سوابق سازمانی و پروژه‌ای'), E(style.optional, '(اختیاری)')), E(reputation, {
    setData: setData('آخرین سوابق سازمانی و پروژه‌ای'),
    registerErrorField: registerErrorField,
    setError: setError
  }), E(style.header, 'سایر اطلاعات'), E(others, {
    setData: setData('سایر اطلاعات'),
    registerErrorField: registerErrorField,
    setError: setError
  }), E(style.checkboxWrapper, accept = E(checkbox, 'صحت اطلاعات تکمیل شده در فرم فوق را تأیید نموده و خود را ملزم به پاسخگویی در برابر صحت اطلاعات آن می‌دانم.')), submit = E(style.submit, 'ثبت نهایی اطلاعات')));
  accept.onChange(setSubmitStyle);
  resize = function() {
    var body, height, html;
    body = document.body;
    html = document.documentElement;
    height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    return setStyle(cover, {
      height: height - 40
    });
  };
  onResize(resize);
  setTimeout(resize);
  errorSpringRunning = false;
  errorSpring = spring([300, 50], function(y, running) {
    window.scroll(0, [y]);
    return errorSpringRunning = running;
  });
  onEvent(E(d.window), ['scroll', 'resize'], function() {
    if (!errorSpringRunning) {
      return errorSpring(window.scrollY, 'goto');
    }
  });
  submitting = false;
  onEvent(submit, 'click', function() {
    return setTimeout((function() {
      if (submitting) {
        return;
      }
      if (!errors.every(function(arg1) {
        var text;
        text = arg1.text;
        return !text;
      })) {
        errors.some(function(arg1) {
          var element, label, text, top;
          label = arg1.label, text = arg1.text;
          if (text) {
            element = label.fn.element;
            top = 0;
            while (true) {
              top += element.offsetTop || 0;
              element = element.offsetParent;
              if (!element) {
                break;
              }
            }
            errorSpring(top - 50);
            return true;
          }
        });
        errors.forEach(function(error) {
          return setError(error, error.text);
        });
        return;
      }
      if (!accept.value()) {
        alert('لطفا تیک تأیید صحت اطلاعات (در انتهای صفحه) را بزنید.');
        return;
      }
      if (confirm('پس از ثبت نهایی اطلاعات، این صفحه قابل ویرایش نخواهد‌بود.\nآیا از صحت اطلاعات وارد شده اطمینان دارید؟')) {
        setStyle(cover, style.coverVisible);
        setStyle(submit, {
          text: 'در حال ثبت...'
        });
        setStyle(submit, style.submitSubmitting);
        submitting = true;
        return service.submitProfileData(data).fin(function() {
          setStyle(submit, style.submitSubmitting);
          submitting = false;
          setStyle(cover, style.cover);
          return setStyle(submit, {
            text: 'ثبت نهایی اطلاعات'
          });
        });
      }
    }));
  });
  state.user.on(function(user) {
    if (user.applicantData) {
      hide(yesData);
      show(noData);
      return append(noData, E(tab1, {
        applicant: user
      }));
    }
  });
  return view;
});


},{"../../../components/checkbox":8,"../../../components/scrollViewer":27,"../../../components/tooltip":28,"../../../utils":38,"../../../utils/animation":33,"../../../utils/component":34,"../../../utils/dom":36,"../../tableView/profile/tab1":100,"./education":51,"./english":53,"./others":56,"./overview":69,"./personalInfo":71,"./reputation":75,"./style":77,"./talents":78}],56:[function(require,module,exports){
var component, part0, part1, part2, part3, part4, part5;

component = require('../../../../utils/component');

part0 = require('./part0');

part1 = require('./part1');

part2 = require('./part2');

part3 = require('./part3');

part4 = require('./part4');

part5 = require('./part5');

module.exports = component('applicantFormOthers', function(arg, arg1) {
  var E, dom, registerErrorField, setData, setError;
  dom = arg.dom;
  setData = arg1.setData, registerErrorField = arg1.registerErrorField, setError = arg1.setError;
  E = dom.E;
  return E(null, E(part0, {
    setData: setData,
    registerErrorField: registerErrorField,
    setError: setError
  }), E(part1, {
    setData: setData
  }), E(part2, {
    setData: setData,
    registerErrorField: registerErrorField,
    setError: setError
  }), E(part3, {
    setData: setData,
    registerErrorField: registerErrorField,
    setError: setError
  }), E(part4, {
    setData: setData
  }), E(part5, {
    setData: setData,
    registerErrorField: registerErrorField,
    setError: setError
  }));
});


},{"../../../../utils/component":34,"./part0":57,"./part1":59,"./part2":61,"./part3":63,"./part4":65,"./part5":67}],57:[function(require,module,exports){
var component, dateInput, dropdown, extend, numberInput, ref, remove, style;

component = require('../../../../../utils/component');

style = require('./style');

dropdown = require('../../../../../components/dropdown');

dateInput = require('../../../../../components/dateInput');

numberInput = require('../../../../../components/restrictedInput/number');

ref = require('../../../../../utils'), extend = ref.extend, remove = ref.remove;

module.exports = component('applicantFormOthersPart0', function(arg, arg1) {
  var E, dom, events, f, f0, f1, fields, hide, hideTooltips, incomeError, labels, onEvent, registerErrorField, sayerError, setData, setError, setStyle, show, text, view;
  dom = arg.dom, events = arg.events;
  setData = arg1.setData, registerErrorField = arg1.registerErrorField, setError = arg1.setError;
  E = dom.E, text = dom.text, setStyle = dom.setStyle, show = dom.show, hide = dom.hide;
  onEvent = events.onEvent;
  labels = {};
  fields = {};
  incomeError = sayerError = void 0;
  fields['متقاضی چه نوع همکاری هستید'] = f = E(dropdown, {
    items: ['تمام وقت', 'پاره وقت', 'مشاوره‌ای - ساعتی', 'پیمانکاری']
  });
  setStyle(f, style.dropdownPlaceholder);
  setStyle(f.input, style.dropdown);
  f0 = E(null, (function() {
    var x, y;
    fields['از چه طریقی از فرصت شغلی در داتین مطلع شدید'] = x = E(dropdown, {
      items: ['نمایشگاه/همایش/کنفرانس', 'آگهی', 'سایت داتین', 'دوستان و همکاران', 'سایر']
    });
    setStyle(x, style.dropdownPlaceholder);
    setStyle(x.input, style.dropdown);
    hide(y = fields['از چه طریقی از فرصت شغلی در داتین مطلع شدید - سایر'] = E('input', extend({
      placeholder: 'توضیحات...'
    }, style.descriptionInput)));
    labels['از چه طریقی از فرصت شغلی در داتین مطلع شدید - سایر'] = E();
    x.onChange(function() {
      if (x.value() === 'سایر') {
        show(y);
        setData('از چه طریقی از فرصت شغلی در داتین مطلع شدید - سایر', y.value());
        if (!y.value()) {
          return setError(sayerError, 'تکمیل این فیلد الزامیست.', true);
        }
      } else {
        hide(y);
        setData('از چه طریقی از فرصت شغلی در داتین مطلع شدید - سایر', null);
        return setError(sayerError, null);
      }
    });
    return [x, y];
  })());
  fields['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید'] = f = E(dateInput);
  setStyle(f, style.dateInputPlaceholder);
  setStyle(f.input, style.dateInput);
  f1 = E(null, (function() {
    var x, y, z;
    fields['میزان دستمزد'] = x = E(dropdown, {
      items: ['طبق قانون کار', 'قابل مذاکره', 'مقدار مشخص']
    });
    setStyle(x, style.dropdownPlaceholder);
    setStyle(x.input, style.dropdown);
    hide(y = fields['مقدار دستمزد'] = E(numberInput));
    setStyle(y, style.descriptionInput);
    hide(z = labels['مقدار دستمزد'] = E(style.inlineLabel, 'ریال'));
    x.onChange(function() {
      if (x.value() === 'مقدار مشخص') {
        show([y, z]);
        setData('مقدار دستمزد', y.value());
        if (!y.value()) {
          return setError(incomeError, 'تکمیل این فیلد الزامیست.', true);
        }
      } else {
        hide([y, z]);
        setData('مقدار دستمزد', null);
        return setError(incomeError, null);
      }
    });
    return [x, y, z];
  })());
  view = E(null, E(style.column, labels['متقاضی چه نوع همکاری هستید'] = E(style.label, 'متقاضی چه نوع همکاری هستید؟'), fields['متقاضی چه نوع همکاری هستید'], labels['از چه طریقی از فرصت شغلی در داتین مطلع شدید'] = E(style.label, 'از چه طریقی از فرصت شغلی در داتین مطلع شدید؟'), f0, labels['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید'] = E(style.label, 'از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید؟'), fields['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید']), E(style.column, E(style.label, labels['نوع بیمه‌ای که تا‌به‌حال داشته‌اید'] = E('span', null, 'نوع بیمه‌ای که تا‌به‌حال داشته‌اید؟'), E(style.optional, '(اختیاری)')), fields['نوع بیمه‌ای که تا‌به‌حال داشته‌اید'] = E('input', style.input), E(style.label, labels['مدت زمانی که بیمه بوده‌اید'] = E('span', null, 'مدت زمانی که بیمه بوده‌اید؟'), E(style.optional, '(اختیاری)')), fields['مدت زمانی که بیمه بوده‌اید'] = E('input', style.input), labels['میزان دستمزد'] = E(style.label, text('میزان دستمزد '), E(style.underline, 'خالص'), text(' درخواستی شما چقدر است؟')), f1), E(style.clearfix));
  hideTooltips = [];
  Object.keys(fields).forEach(function(fieldName) {
    var error, field, handleChange, input, label;
    label = labels[fieldName];
    field = fields[fieldName];
    if (fieldName === 'نوع بیمه‌ای که تا‌به‌حال داشته‌اید' || fieldName === 'مدت زمانی که بیمه بوده‌اید') {
      if (field.onChange) {
        field.onChange(function() {
          return setData(fieldName, field.value());
        });
      } else {
        input = field.input || field;
        onEvent(input, ['input', 'pInput'], function() {
          return setData(fieldName, field.value());
        });
      }
      return;
    }
    error = registerErrorField(label, field);
    if (fieldName !== 'مقدار دستمزد') {
      setError(error, 'تکمیل این فیلد الزامیست.', true);
    }
    if (fieldName === 'مقدار دستمزد') {
      incomeError = error;
    }
    if (fieldName === 'از چه طریقی از فرصت شغلی در داتین مطلع شدید - سایر') {
      sayerError = error;
    }
    if (field.onChange) {
      field.onChange(function() {
        return setData(fieldName, field.value());
      });
      onEvent(field.input, 'input', function() {
        return setError(error, 'تکمیل این فیلد الزامیست.', true);
      });
      return onEvent(field.input, 'blur', function() {
        return setTimeout(function() {
          if (field.value() == null) {
            return setError(error, 'تکمیل این فیلد الزامیست.');
          } else {
            return setError(error, null);
          }
        });
      });
    } else {
      input = field.input || field;
      onEvent(input, ['input', 'pInput'], function() {
        return setData(fieldName, field.value());
      });
      handleChange = function(hidden) {
        return function() {
          if (!field.value().trim()) {
            return setError(error, 'تکمیل این فیلد الزامیست.', hidden);
          } else if ((field.valid != null) && !field.valid()) {
            return setError(error, 'مقدار وارد شده قابل قبول نیست.', hidden);
          } else {
            return setError(error, null);
          }
        };
      };
      onEvent(input, ['input', 'pInput'], handleChange(true));
      return onEvent(input, 'blur', handleChange(false));
    }
  });
  return view;
});


},{"../../../../../components/dateInput":12,"../../../../../components/dropdown":14,"../../../../../components/restrictedInput/number":24,"../../../../../utils":38,"../../../../../utils/component":34,"./style":58}],58:[function(require,module,exports){
var extend;

extend = require('../../../../../utils').extend;

exports.clearfix = {
  clear: 'both'
};

exports.column = {
  float: 'right',
  width: '50%'
};

exports.label = {
  fontSize: 12,
  lineHeight: 30,
  fontWeight: 'bold',
  marginTop: 10,
  transition: '0.2s',
  color: '#5c5555'
};

exports.inlineLabel = extend({}, exports.label, {
  display: 'inline-block',
  margin: 0,
  marginRight: 5
});

exports.optional = {
  display: 'inline-block',
  marginRight: 5,
  fontSize: 12,
  color: '#ccc',
  height: 30,
  lineHeight: 30
};

exports.underline = {
  display: 'inline',
  textDecoration: 'underline'
};

exports.input = {
  fontSize: 12,
  height: 30,
  lineHeight: 30,
  borderRadius: 2,
  padding: '0 5px',
  outline: 'none',
  width: 180,
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555'
};

exports.dropdown = extend({}, exports.input, {
  paddingLeft: 30
});

exports.dropdownPlaceholder = {
  display: 'inline-block',
  width: 180
};

exports.dateInput = extend({}, exports.input, {
  width: 100,
  paddingLeft: 30
});

exports.dateInputPlaceholder = {
  display: 'inline-block',
  width: 100
};

exports.descriptionInput = extend({}, exports.input, {
  width: 250,
  marginRight: 10
});


},{"../../../../../utils":38}],59:[function(require,module,exports){
var component, radioSwitch, style;

component = require('../../../../../utils/component');

style = require('./style');

radioSwitch = require('../../../../../components/radioSwitch');

module.exports = component('applicantFormOthersPart1', function(arg, arg1) {
  var E, dom, fields, setData, setStyle, view;
  dom = arg.dom;
  setData = arg1.setData;
  E = dom.E, setStyle = dom.setStyle;
  fields = {};
  view = E(null, E(style.mainLabel, 'در صورتی که شغل مورد نظر شما نیاز به موارد زیر داشته باشد، آیا می‌توانید:'), E(null, E(style.label, '- در ساعات اضافه کاری حضور داشته و کار کنید؟'), (function() {
    var f;
    f = fields['در ساعات اضافه کاری حضور داشته و کار کنید'] = E(radioSwitch, {
      items: ['بلی', 'خیر']
    });
    setStyle(f, style.radioSwitch);
    return f;
  })()), E(null, E(style.label, '- در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید؟'), (function() {
    var f;
    f = fields['در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید'] = E(radioSwitch, {
      items: ['بلی', 'خیر']
    });
    setStyle(f, style.radioSwitch);
    return f;
  })()), E(null, E(style.label, '- در شیفت شب کار کنید؟'), (function() {
    var f;
    f = fields['در شیفت شب کار کنید'] = E(radioSwitch, {
      items: ['بلی', 'خیر']
    });
    setStyle(f, style.radioSwitch);
    return f;
  })()), E(null, E(style.label, '- در تعطیلات آخر هفته کار کنید؟'), (function() {
    var f;
    f = fields['در تعطیلات آخر هفته کار کنید'] = E(radioSwitch, {
      items: ['بلی', 'خیر']
    });
    setStyle(f, style.radioSwitch);
    return f;
  })()), E(null, E(style.label, '- در شهر تهران غیر از محل شرکت مشغول کار شوید؟'), (function() {
    var f;
    f = fields['در شهر تهران غیر از محل شرکت مشغول کار شوید'] = E(radioSwitch, {
      items: ['بلی', 'خیر']
    });
    setStyle(f, style.radioSwitch);
    return f;
  })()));
  Object.keys(fields).forEach(function(labelText) {
    var field, set;
    field = fields[labelText];
    (set = function() {
      return setData(labelText, field.value());
    })();
    return field.onChange(set);
  });
  return view;
});


},{"../../../../../components/radioSwitch":19,"../../../../../utils/component":34,"./style":60}],60:[function(require,module,exports){
exports.mainLabel = {
  fontSize: 12,
  lineHeight: 30,
  fontWeight: 'bold',
  color: '#5c5555',
  margin: '50px 0 10px'
};

exports.label = {
  fontSize: 12,
  lineHeight: 30,
  color: '#5c5555',
  display: 'inline-block',
  width: 300
};

exports.radioSwitch = {
  display: 'inline-block',
  position: 'relative',
  top: 15
};


},{}],61:[function(require,module,exports){
var component, extend, numberInput, ref, remove, style;

component = require('../../../../../utils/component');

style = require('./style');

numberInput = require('../../../../../components/restrictedInput/number');

ref = require('../../../../../utils'), extend = ref.extend, remove = ref.remove;

module.exports = component('applicantFormOthersPart2', function(arg, arg1) {
  var E, add, append, body, createRow, destroy, dom, entries, events, hide, onEvent, registerErrorField, removeButtons, rows, setData, setError, setStyle, show, view;
  dom = arg.dom, events = arg.events;
  setData = arg1.setData, registerErrorField = arg1.registerErrorField, setError = arg1.setError;
  E = dom.E, setStyle = dom.setStyle, append = dom.append, destroy = dom.destroy, show = dom.show, hide = dom.hide;
  onEvent = events.onEvent;
  entries = [];
  rows = [];
  removeButtons = [];
  view = E('span', null, E(style.mainLabel, 'مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند:'), E('table', null, E('thead', null, E('tr', null, E('th', style.th, 'نام و نام خانوادگی'), E('th', style.th, 'نسبت با شما'), E('th', style.th, 'نام محل کار'), E('th', style.th, 'سمت'), E('th', style.th, 'شماره تماس'), E('th', style.th))), body = E('tbody', null)), E(null, add = E(style.add)));
  createRow = function() {
    var entry, fields, i0, i1, i2, i3, i4, offErrors, row, showHideRemoveButtons;
    entries.push(entry = {});
    rows.push(row = E('tr', null, E('td', style.td, i0 = E('input', style.input)), E('td', style.td, i1 = E('input', style.input)), E('td', style.td, i2 = E('input', extend({}, style.input, {
      width: 250
    }))), E('td', style.td, i3 = E('input', style.input)), E('td', style.td, i4 = (function() {
      i4 = E(numberInput);
      setStyle(i4, style.input);
      return i4;
    })()), E('td', style.td, (function() {
      var removeButton;
      removeButtons.push(removeButton = E(style.remove));
      onEvent(removeButton, 'click', function() {
        remove(rows, row);
        remove(entries, entry);
        setData('مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند', entries);
        destroy(row);
        showHideRemoveButtons();
        return offErrors.forEach(function(x) {
          return x();
        });
      });
      return removeButton;
    })())));
    (showHideRemoveButtons = function() {
      if (entries.length > 2) {
        return show(removeButtons);
      } else {
        return hide(removeButtons);
      }
    })();
    append(body, row);
    offErrors = [];
    return Object.keys(fields = {
      'نام و نام خانوادگی': i0,
      'نسبت با شما': i1,
      'نام محل کار': i2,
      'سمت': i3,
      'شماره تماس': i4
    }).forEach(function(fieldName) {
      var error, field, handleChange, input;
      field = fields[fieldName];
      error = registerErrorField(field, field);
      offErrors.push(error.off);
      setError(error, 'تکمیل این فیلد الزامیست.', true);
      if (field.onChange) {
        field.onChange(function() {
          entry[fieldName] = field.value();
          return setData('مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند', entries);
        });
        onEvent(field.input, 'input', function() {
          return setError(error, 'تکمیل این فیلد الزامیست.', true);
        });
        return onEvent(field.input, 'blur', function() {
          return setTimeout(function() {
            if (field.value() == null) {
              return setError(error, 'تکمیل این فیلد الزامیست.');
            } else {
              return setError(error, null);
            }
          });
        });
      } else {
        input = field.input || field;
        onEvent(input, 'input', function() {
          entry[fieldName] = field.value();
          return setData('مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند', entries);
        });
        handleChange = function(hidden) {
          return function() {
            if (!field.value().trim()) {
              return setError(error, 'تکمیل این فیلد الزامیست.', hidden);
            } else if ((field.valid != null) && !field.valid()) {
              return setError(error, 'مقدار وارد شده قابل قبول نیست.', hidden);
            } else {
              return setError(error, null);
            }
          };
        };
        onEvent(input, 'input', handleChange(true));
        return onEvent(input, 'blur', handleChange(false));
      }
    });
  };
  createRow();
  createRow();
  onEvent(add, 'click', createRow);
  return view;
});


},{"../../../../../components/restrictedInput/number":24,"../../../../../utils":38,"../../../../../utils/component":34,"./style":62}],62:[function(require,module,exports){
var extend, icon;

extend = require('../../../../../utils').extend;

exports.clearfix = {
  clear: 'both'
};

exports.mainLabel = {
  fontSize: 12,
  lineHeight: 30,
  fontWeight: 'bold',
  color: '#5c5555',
  margin: '50px 0 10px'
};

exports.th = {
  padding: '10px 10px 0',
  color: '#5c5555',
  fontSize: 12,
  width: 150
};

exports.td = {
  padding: '10px 5px',
  color: '#5c5555',
  fontSize: 12
};

exports.input = {
  width: 150,
  fontSize: 12,
  height: 30,
  lineHeight: 30,
  borderRadius: 2,
  padding: '0 5px',
  outline: 'none',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555'
};

icon = {
  cursor: 'pointer',
  width: 20,
  height: 20,
  fontSize: 20,
  position: 'relative',
  top: 2
};

exports.add = extend({}, icon, {
  "class": 'fa fa-plus-circle',
  color: '#449e73',
  top: 5,
  right: 5
});

exports.remove = extend({}, icon, {
  "class": 'fa fa-minus-circle',
  color: '#d71d24'
});


},{"../../../../../utils":38}],63:[function(require,module,exports){
var component, extend, numberInput, ref, remove, style;

component = require('../../../../../utils/component');

style = require('./style');

numberInput = require('../../../../../components/restrictedInput/number');

ref = require('../../../../../utils'), extend = ref.extend, remove = ref.remove;

module.exports = component('applicantFormOthersPart2', function(arg, arg1) {
  var E, add, append, body, createRow, destroy, dom, entries, events, onEvent, registerErrorField, removeButtons, rows, setData, setError, setStyle, view;
  dom = arg.dom, events = arg.events;
  setData = arg1.setData, registerErrorField = arg1.registerErrorField, setError = arg1.setError;
  E = dom.E, setStyle = dom.setStyle, append = dom.append, destroy = dom.destroy;
  onEvent = events.onEvent;
  entries = [];
  rows = [];
  removeButtons = [];
  view = E('span', null, E(style.mainLabel, 'در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید:'), E('table', null, E('thead', null, E('tr', null, E('th', style.th, 'نام و نام خانوادگی'), E('th', style.th, 'سمت'), E('th', style.th, 'نام محل کار'), E('th', style.th, 'نسبت با شما'), E('th', style.th, 'شماره تماس'), E('th', style.th))), body = E('tbody', null)), E(null, add = E(style.add)));
  createRow = function() {
    var entry, fields, i0, i1, i2, i3, i4, offErrors, row;
    entries.push(entry = {});
    rows.push(row = E('tr', null, E('td', style.td, i0 = E('input', style.input)), E('td', style.td, i1 = E('input', style.input)), E('td', style.td, i2 = E('input', extend({}, style.input, {
      width: 250
    }))), E('td', style.td, i3 = E('input', style.input)), E('td', style.td, i4 = (function() {
      i4 = E(numberInput);
      setStyle(i4, style.input);
      return i4;
    })()), E('td', style.td, (function() {
      var removeButton;
      removeButtons.push(removeButton = E(style.remove));
      onEvent(removeButton, 'click', function() {
        remove(rows, row);
        remove(entries, entry);
        setData('در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید', entries);
        destroy(row);
        return offErrors.forEach(function(x) {
          return x();
        });
      });
      return removeButton;
    })())));
    append(body, row);
    offErrors = [];
    return Object.keys(fields = {
      'نام و نام خانوادگی': i0,
      'سمت': i1,
      'نام محل کار': i2,
      'نسبت با شما': i3,
      'شماره تماس': i4
    }).forEach(function(fieldName) {
      var error, field, handleChange, input;
      field = fields[fieldName];
      error = registerErrorField(field, field);
      offErrors.push(error.off);
      setError(error, 'تکمیل این فیلد الزامیست.', true);
      if (field.onChange) {
        field.onChange(function() {
          entry[fieldName] = field.value();
          return setData('در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید', entries);
        });
        onEvent(field.input, 'input', function() {
          return setError(error, 'تکمیل این فیلد الزامیست.', true);
        });
        return onEvent(field.input, 'blur', function() {
          return setTimeout(function() {
            if (field.value() == null) {
              return setError(error, 'تکمیل این فیلد الزامیست.');
            } else {
              return setError(error, null);
            }
          });
        });
      } else {
        input = field.input || field;
        onEvent(input, 'input', function() {
          entry[fieldName] = field.value();
          return setData('در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید', entries);
        });
        handleChange = function(hidden) {
          return function() {
            if (!field.value().trim()) {
              return setError(error, 'تکمیل این فیلد الزامیست.', hidden);
            } else if ((field.valid != null) && !field.valid()) {
              return setError(error, 'مقدار وارد شده قابل قبول نیست.', hidden);
            } else {
              return setError(error, null);
            }
          };
        };
        onEvent(input, 'input', handleChange(true));
        return onEvent(input, 'blur', handleChange(false));
      }
    });
  };
  onEvent(add, 'click', createRow);
  return view;
});


},{"../../../../../components/restrictedInput/number":24,"../../../../../utils":38,"../../../../../utils/component":34,"./style":64}],64:[function(require,module,exports){
var extend, icon;

extend = require('../../../../../utils').extend;

exports.clearfix = {
  clear: 'both'
};

exports.mainLabel = {
  fontSize: 12,
  lineHeight: 30,
  fontWeight: 'bold',
  color: '#5c5555',
  margin: '50px 0 10px'
};

exports.optional = {
  display: 'inline-block',
  marginRight: 5,
  fontSize: 12,
  color: '#ccc',
  height: 30,
  lineHeight: 30
};

exports.th = {
  padding: '10px 10px 0',
  color: '#5c5555',
  fontSize: 12,
  width: 150
};

exports.td = {
  padding: '10px 5px',
  color: '#5c5555',
  fontSize: 12
};

exports.input = {
  width: 150,
  fontSize: 12,
  height: 30,
  lineHeight: 30,
  borderRadius: 2,
  padding: '0 5px',
  outline: 'none',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555'
};

icon = {
  cursor: 'pointer',
  width: 20,
  height: 20,
  fontSize: 20,
  position: 'relative',
  top: 2
};

exports.add = extend({}, icon, {
  "class": 'fa fa-plus-circle',
  color: '#449e73',
  top: 5,
  right: 5
});

exports.remove = extend({}, icon, {
  "class": 'fa fa-minus-circle',
  color: '#d71d24'
});


},{"../../../../../utils":38}],65:[function(require,module,exports){
var component, style;

component = require('../../../../../utils/component');

style = require('./style');

module.exports = component('applicantFormOthersPart2', function(arg, arg1) {
  var E, dom, events, onEvent, setData, t0, t1, text, view;
  dom = arg.dom, events = arg.events;
  setData = arg1.setData;
  E = dom.E, text = dom.text;
  onEvent = events.onEvent;
  view = E(null, E(style.column, E(style.label, text('ورزش‌های مورد علاقه'), E(style.optional, '(اختیاری)')), t0 = E('textarea', style.textarea)), E(style.column, E(style.label, text('زمینه‌های هنری مورد علاقه'), E(style.optional, '(اختیاری)')), t1 = E('textarea', style.textarea)), E(style.clearfix));
  onEvent(t0, 'input', function() {
    return setData('ورزش‌های مورد علاقه', t0.value());
  });
  onEvent(t1, 'input', function() {
    return setData('زمینه‌های هنری مورد علاقه', t0.value());
  });
  return view;
});


},{"../../../../../utils/component":34,"./style":66}],66:[function(require,module,exports){
exports.clearfix = {
  clear: 'both'
};

exports.column = {
  float: 'right',
  width: '46%',
  padding: '2% 10px 0 10px'
};

exports.label = {
  fontSize: 12,
  lineHeight: 30,
  fontWeight: 'bold',
  color: '#5c5555'
};

exports.optional = {
  display: 'inline-block',
  marginRight: 5,
  fontSize: 12,
  color: '#ccc',
  height: 30,
  lineHeight: 30
};

exports.textarea = {
  minWidth: '100%',
  maxWidth: '100%',
  minHeight: 100,
  maxHeight: 100,
  fontSize: 12,
  borderRadius: 2,
  padding: '5px',
  outline: 'none',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555'
};


},{}],67:[function(require,module,exports){
var component, extend, radioSwitch, ref, remove, style;

component = require('../../../../../utils/component');

radioSwitch = require('../../../../../components/radioSwitch');

style = require('./style');

ref = require('../../../../../utils'), extend = ref.extend, remove = ref.remove;

module.exports = component('applicantFormOthersPart2', function(arg, arg1) {
  var E, dom, events, fields, handleY0, handleY1, hide, onEvent, registerErrorField, setData, setError, setStyle, show, view, x0, x1, y0, y0Error, y1, y1Error;
  dom = arg.dom, events = arg.events;
  setData = arg1.setData, registerErrorField = arg1.registerErrorField, setError = arg1.setError;
  E = dom.E, setStyle = dom.setStyle, show = dom.show, hide = dom.hide;
  onEvent = events.onEvent;
  fields = {};
  view = E(null, E(style.label, 'آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید؟'), x0 = fields['آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید'] = E(radioSwitch, {
    items: ['بلی', 'خیر'],
    selectedIndex: 1
  }), hide(y0 = E('input', extend({
    placeholder: 'نوع آن را ذکر نمایید.'
  }, style.input))), E(style.clearfix), E(style.label, 'آیا دخانیات مصرف می‌کنید؟'), fields['آیا دخانیات مصرف می‌کنید'] = E(radioSwitch, {
    items: ['بلی', 'خیر'],
    selectedIndex: 1
  }), E(style.clearfix), E(style.label, 'آیا سابقه محکومیت کیفری دارید؟'), x1 = fields['آیا سابقه محکومیت کیفری دارید'] = E(radioSwitch, {
    items: ['بلی', 'خیر'],
    selectedIndex: 1
  }), hide(y1 = E('input', extend({
    placeholder: 'تاریخ، دلایل و مدت آن را توضیح دهید.'
  }, style.input))), E(style.clearfix));
  Object.keys(fields).forEach(function(fieldName) {
    var field;
    field = fields[fieldName];
    setData(fieldName, field.value());
    return field.onChange(function() {
      return setData(fieldName, field.value());
    });
  });
  y0Error = registerErrorField(y0, y0);
  y1Error = registerErrorField(y1, y1);
  handleY0 = function(hidden) {
    setData('نوع آن را ذکر نمایید', y0.value());
    if (y0.value().trim()) {
      return setError(y0Error, null);
    } else {
      return setError(y0Error, 'تکمیل این فیلد الزامیست.', hidden);
    }
  };
  x0.onChange(function() {
    if (x0.value() === 'بلی') {
      show(y0);
      return handleY0(true);
    } else {
      hide(y0);
      return setError(y0Error, null);
    }
  });
  onEvent(y0, 'input', function() {
    return handleY0(true);
  });
  onEvent(y0, 'blur', function() {
    return handleY0(false);
  });
  handleY1 = function(hidden) {
    setData('تاریخ، دلایل و مدت آن را توضیح دهید', y1.value());
    if (y1.value().trim()) {
      return setError(y1Error, null);
    } else {
      return setError(y1Error, 'تکمیل این فیلد الزامیست.', hidden);
    }
  };
  x1.onChange(function() {
    if (x1.value() === 'بلی') {
      show(y1);
      return handleY1(true);
    } else {
      hide(y1);
      return setError(y1Error, null);
    }
  });
  onEvent(y1, 'input', function() {
    return handleY1(true);
  });
  onEvent(y1, 'blur', function() {
    return handleY1(false);
  });
  return view;
});


},{"../../../../../components/radioSwitch":19,"../../../../../utils":38,"../../../../../utils/component":34,"./style":68}],68:[function(require,module,exports){
exports.clearfix = {
  clear: 'both'
};

exports.label = {
  fontSize: 12,
  lineHeight: 30,
  fontWeight: 'bold',
  color: '#5c5555',
  marginTop: 10
};

exports.input = {
  fontSize: 12,
  borderRadius: 2,
  padding: '5px',
  outline: 'none',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555',
  float: 'right',
  width: 500,
  marginRight: 10
};


},{}],69:[function(require,module,exports){
var component, extend, monthToString, ref, style, toDate;

component = require('../../../../utils/component');

style = require('./style');

ref = require('../../../../utils'), extend = ref.extend, toDate = ref.toDate, monthToString = ref.monthToString;

module.exports = component('applicantFormOverview', function(arg) {
  var E, append, birthday, createdAt, dom, empty, identificationCode, jobs, name, profileImg, resumeLink, setStyle, state, view;
  dom = arg.dom, state = arg.state;
  E = dom.E, setStyle = dom.setStyle, append = dom.append, empty = dom.empty;
  view = E(null, E(style.section, profileImg = E('img', style.sectionCircle), E(style.sectionText, name = E(style.sectionTitle), birthday = E(style.regular), identificationCode = E(style.regular), createdAt = E(style.regular))), E(style.section, E(style.sectionCircle, E(extend({
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
      src: user.personalPic ? "/webApi/image?address=" + user.personalPic : 'assets/img/default-avatar-small.png'
    });
    setStyle(name, {
      text: user.firstName + " " + user.lastName
    });
    setStyle(birthday, {
      text: 'متولد ' + birthdayString
    });
    setStyle(identificationCode, {
      text: 'کد ملی: ' + user.identificationCode
    });
    setStyle(createdAt, {
      text: 'تاریخ ثبت: ' + toDate(user.modificationTime)
    });
    empty(jobs);
    append(jobs, user.selectedJobs.map(function(arg1) {
      var jobName;
      jobName = arg1.jobName;
      return E(style.job, jobName);
    }));
    return setStyle(resumeLink, {
      href: '/webApi/resume?address=' + user.resume
    });
  });
  return view;
});


},{"../../../../utils":38,"../../../../utils/component":34,"./style":70}],70:[function(require,module,exports){
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


},{}],71:[function(require,module,exports){
var checkbox, component, defer, dropdown, emailInput, extend, multivalue, numberInput, phoneNumberInput, radioSwitch, ref, remove, style, toPersian;

component = require('../../../../utils/component');

style = require('./style');

radioSwitch = require('../../../../components/radioSwitch');

dropdown = require('../../../../components/dropdown');

numberInput = require('../../../../components/restrictedInput/number');

emailInput = require('../../../../components/restrictedInput/email');

phoneNumberInput = require('../../../../components/restrictedInput/phoneNumber');

checkbox = require('../../../../components/checkbox');

multivalue = require('./multivalue');

ref = require('../../../../utils'), extend = ref.extend, remove = ref.remove, defer = ref.defer, toPersian = ref.toPersian;

module.exports = component('applicantFormPersonalInfo', function(arg, arg1) {
  var E, addTextField, address, address2, address2Checkbox, addressLabel, addresses, dom, errors, events, f, fieldArrays, fieldCollections, groupArrays, handleMultivalue, hide, labelArrays, manageDalil, manageMoaf, onEvent, phone, phone2, registerErrorField, setData, setError, setStyle, show, state, text, textArrays, view;
  dom = arg.dom, events = arg.events, state = arg.state;
  setData = arg1.setData, registerErrorField = arg1.registerErrorField, setError = arg1.setError;
  E = dom.E, text = dom.text, setStyle = dom.setStyle, show = dom.show, hide = dom.hide;
  onEvent = events.onEvent;
  fieldCollections = [0, 1, 2].map(function() {
    return {};
  });
  addTextField = function(column, label) {
    var f;
    fieldCollections[column][label] = f = E('input', style.input);
    return onEvent(f, 'input', (function(f) {
      return function() {
        return setData(label, f.value());
      };
    })(f));
  };
  fieldCollections[0]['جنسیت'] = f = E(radioSwitch, {
    items: ['مرد', 'زن']
  });
  setData('جنسیت', f.value());
  f.onChange((function(f) {
    return function() {
      return setData('جنسیت', f.value());
    };
  })(f));
  addTextField(0, 'نام پدر');
  fieldCollections[0]['شماره شناسنامه'] = f = E(numberInput);
  setStyle(f, style.input);
  onEvent(f, ['input', 'pInput'], (function(f) {
    return function() {
      return setData('شماره شناسنامه', f.value());
    };
  })(f));
  addTextField(0, 'محل تولد');
  addTextField(0, 'محل صدور');
  addTextField(0, 'ملیت');
  addTextField(0, 'تابعیت');
  addTextField(0, 'دین');
  addTextField(0, 'مذهب');
  fieldCollections[1]['وضعیت نظام وظیفه'] = f = E(dropdown, {
    items: ['انجام شده', 'در حال انجام', 'معاف']
  });
  setStyle(f, style.dropdownPlaceholder);
  setStyle(f.input, style.specialInput);
  f.onChange((function(f) {
    return function() {
      return setData('وضعیت نظام وظیفه', f.value());
    };
  })(f));
  fieldCollections[1]['نوع معافیت'] = f = E(dropdown, {
    items: ['خرید خدمت', 'معافیت تحصیلی', 'معافیت کفالت', 'معافیت پزشکی']
  });
  setStyle(f, style.dropdownPlaceholder);
  setStyle(f.input, style.specialInput);
  f.onChange((function(f) {
    return function() {
      return setData('نوع معافیت', f.value());
    };
  })(f));
  addTextField(1, 'دلیل معافیت');
  fieldCollections[1]['وضعیت تاهل'] = f = E(radioSwitch, {
    items: ['مجرد', 'متاهل', 'سایر'],
    selectedIndex: 2
  });
  setData('وضعیت تاهل', f.value());
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
  fieldCollections[1]['تعداد افراد تحت تکفل'] = f = E(numberInput);
  setStyle(f, style.numberInput);
  onEvent(f, ['input', 'pInput'], (function(f) {
    return function() {
      return setData('تعداد افراد تحت تکفل', f.value());
    };
  })(f));
  addTextField(1, 'نام معرف');
  handleMultivalue = function(fieldName, label, f) {
    var error;
    error = registerErrorField(label, f, true);
    onEvent(f.input, 'input', function() {
      return setError(error, null);
    });
    return f.onChange(function(adding) {
      if (adding) {
        if (!f.input.value()) {
          setError(error, 'تکمیل این فیلد الزامیست.');
          return false;
        }
        if (!f.input.valid()) {
          setError(error, 'مقدار وارد شده قابل قبول نیست.');
          return false;
        }
      }
      return setTimeout(function() {
        return setData(fieldName, f.value());
      });
    });
  };
  f = E(emailInput);
  setStyle(f, style.input);
  state.user.on({
    once: true
  }, function(user) {
    fieldCollections[2]['ایمیل'] = f = E(multivalue, {
      input: f,
      initialItems: [user.email]
    });
    return (function(f) {
      return setTimeout(function() {
        return handleMultivalue('ایمیل', labelArrays[2][0], f);
      });
    })(f);
  });
  f = E(phoneNumberInput);
  setStyle(f, style.input);
  state.user.on({
    once: true
  }, function(user) {
    fieldCollections[2]['تلفن همراه'] = f = E(multivalue, {
      input: f,
      initialItems: [toPersian(user.phoneNumber)]
    });
    return (function(f) {
      return setTimeout(function() {
        return handleMultivalue('تلفن همراه', labelArrays[2][1], f);
      });
    })(f);
  });
  textArrays = [];
  groupArrays = [];
  labelArrays = [];
  fieldArrays = [];
  fieldCollections.forEach(function(fieldCollection, i) {
    var fieldArray, groupArray, labelArray, textArray;
    textArrays.push(textArray = []);
    groupArrays.push(groupArray = []);
    labelArrays.push(labelArray = []);
    fieldArrays.push(fieldArray = []);
    return Object.keys(fieldCollection).forEach(function(labelText, j) {
      var field, group, label;
      group = E(style.group, label = E(style.label, text(labelText), i === 1 && j === 6 ? E(style.optional, '(اختیاری)') : void 0, text(':')), field = fieldCollection[labelText], E(style.clearfix));
      textArray.push(labelText);
      groupArray.push(group);
      labelArray.push(label);
      return fieldArray.push(field);
    });
  });
  addresses = [
    E({
      margin: '20px 0'
    }, addressLabel = E(style.bigLabel, 'مشخصات محل سکونت دائم:'), address = E('input', extend({
      placeholder: 'آدرس پستی'
    }, style.address)), phone = E(numberInput)), E({
      margin: '20px 0'
    }, address2Checkbox = E(checkbox, 'محل سکونت فعلی‌ام با محل سکونت دائم فوق متفاوت است.'), hide(address2 = E('input', extend({
      placeholder: 'آدرس پستی محل سکونت'
    }, style.address))), hide(phone2 = E(numberInput)))
  ];
  onEvent(address, 'input', function() {
    return setData('آدرس محل سکونت دائم', address.value());
  });
  onEvent(phone, 'input', function() {
    return setData('تلفن ثابت محل سکونت دائم', phone.value());
  });
  onEvent(address2, 'input', function() {
    return setData('آدرس محل سکونت فعلی', address2.value());
  });
  onEvent(phone2, 'input', function() {
    return setData('تلفن ثابت محل سکونت فعلی', phone2.value());
  });
  setStyle(phone, extend({
    placeholder: 'تلفن تماس - 02185585558'
  }, style.phoneNumber));
  setStyle(phone2, extend({
    placeholder: 'تلفن تماس محل سکونت'
  }, style.phoneNumber));
  textArrays.push(['آدرس محل سکونت دائم', 'تلفن ثابت محل سکونت دائم', 'آدرس محل سکونت فعلی', 'تلفن ثابت محل سکونت فعلی']);
  labelArrays.push([address, phone, address2, phone2]);
  fieldArrays.push([address, phone, address2, phone2]);
  errors = {};
  fieldArrays.forEach(function(fieldArray, i) {
    var labelArray, textArray;
    textArray = textArrays[i];
    labelArray = labelArrays[i];
    return fieldArray.forEach(function(field, j) {
      var error, handleChange, input, label, labelText;
      if (i === 0 && (j === 0 || j === 8)) {
        return;
      }
      if (i === 1 && (j === 3 || j === 5 || j === 6)) {
        return;
      }
      if (i === 2) {
        return;
      }
      labelText = textArray[j];
      label = labelArray[j];
      error = registerErrorField(label, field);
      if (!((i === 1 && (j === 1 || j === 2)) || (i === 3 && (j === 2 || j === 3)))) {
        setError(error, 'تکمیل این فیلد الزامیست.', true);
      }
      if (i === 1) {
        if (j === 0) {
          errors['وضعیت نظام وظیفه'] = error;
        }
        if (j === 1) {
          errors['نوع معافیت'] = error;
        }
        if (j === 2) {
          errors['دلیل معافیت'] = error;
        }
        if (j === 4) {
          errors['تعداد فرزندان'] = error;
        }
      }
      if (i === 3) {
        if (j === 2) {
          errors['آدرس محل سکونت فعلی'] = error;
        }
        if (j === 3) {
          errors['تلفن ثابت محل سکونت فعلی'] = error;
        }
      }
      if (field.onChange) {
        onEvent(field.input, 'input', function() {
          return setError(error, 'تکمیل این فیلد الزامیست.', true);
        });
        return onEvent(field.input, 'blur', function() {
          return setTimeout(function() {
            if (field.value() == null) {
              return setError(error, 'تکمیل این فیلد الزامیست.');
            } else {
              return setError(error, null);
            }
          });
        });
      } else {
        input = field.input || field;
        handleChange = function(hidden) {
          return function() {
            if (!field.value().trim()) {
              return setError(error, 'تکمیل این فیلد الزامیست.', hidden);
            } else if ((field.valid != null) && !field.valid()) {
              return setError(error, 'مقدار وارد شده قابل قبول نیست.', hidden);
            } else {
              return setError(error, null);
            }
          };
        };
        onEvent(input, ['input', 'pInput'], handleChange(true));
        return onEvent(input, 'blur', handleChange(false));
      }
    });
  });
  address2Checkbox.onChange(function() {
    if (address2Checkbox.value()) {
      show([address2, phone2]);
      setData('آدرس محل سکونت فعلی', address2.value());
      setData('تلفن ثابت محل سکونت فعلی', phone2.value());
      if (!address2.value()) {
        setError(errors['آدرس محل سکونت فعلی'], 'تکمیل این فیلد الزامیست.', true);
      }
      if (!phone2.value()) {
        return setError(errors['تلفن ثابت محل سکونت فعلی'], 'تکمیل این فیلد الزامیست.', true);
      }
    } else {
      hide([address2, phone2]);
      setData('آدرس محل سکونت فعلی', null);
      setData('تلفن ثابت محل سکونت فعلی', null);
      setError(errors['آدرس محل سکونت فعلی'], null);
      return setError(errors['تلفن ثابت محل سکونت فعلی'], null);
    }
  });
  fieldCollections[1]['وضعیت تاهل'].onChange(function() {
    if (fieldCollections[1]['وضعیت تاهل'].value() !== 'مجرد') {
      show(groupArrays[1][4]);
      setData('تعداد فرزندان', fieldCollections[1]['تعداد فرزندان'].value());
      if (!fieldCollections[1]['تعداد فرزندان'].value()) {
        return setError(errors['تعداد فرزندان'], 'تکمیل این فیلد الزامیست.', true);
      }
    } else {
      hide(groupArrays[1][4]);
      setData('تعداد فرزندان', null);
      return setError(errors['تعداد فرزندان'], null);
    }
  });
  fieldCollections[0]['جنسیت'].onChange(function() {
    if (fieldCollections[0]['جنسیت'].value() === 'مرد') {
      show(groupArrays[1][0]);
      setData('وضعیت نظام وظیفه', fieldCollections[1]['وضعیت نظام وظیفه'].value());
      if (!fieldCollections[1]['وضعیت نظام وظیفه'].value()) {
        setError(errors['وضعیت نظام وظیفه'], 'تکمیل این فیلد الزامیست.', true);
      }
      return manageMoaf();
    } else {
      hide(groupArrays[1][0]);
      hide(groupArrays[1][1]);
      hide(groupArrays[1][2]);
      setData('وضعیت نظام وظیفه', null);
      setData('نوع معافیت', null);
      setData('دلیل معافیت', null);
      setError(errors['وضعیت نظام وظیفه'], null);
      setError(errors['نوع معافیت'], null);
      return setError(errors['دلیل معافیت'], null);
    }
  });
  (manageMoaf = function() {
    if (fieldCollections[1]['وضعیت نظام وظیفه'].value() === 'معاف') {
      show(groupArrays[1][1]);
      setData('نوع معافیت', fieldCollections[1]['نوع معافیت'].value());
      if (!fieldCollections[1]['نوع معافیت'].value()) {
        setError(errors['نوع معافیت'], 'تکمیل این فیلد الزامیست.', true);
      }
      return manageDalil();
    } else {
      hide(groupArrays[1][1]);
      hide(groupArrays[1][2]);
      setData('نوع معافیت', null);
      setData('دلیل معافیت', null);
      setError(errors['نوع معافیت'], null);
      return setError(errors['دلیل معافیت'], null);
    }
  })();
  manageDalil = function() {
    if (fieldCollections[1]['نوع معافیت'].value() === 'معافیت پزشکی') {
      show(groupArrays[1][2]);
      setData('دلیل معافیت', fieldCollections[1]['دلیل معافیت'].value());
      if (!fieldCollections[1]['دلیل معافیت'].value()) {
        return setError(errors['دلیل معافیت'], 'تکمیل این فیلد الزامیست.', true);
      }
    } else {
      hide(groupArrays[1][2]);
      setData('دلیل معافیت', null);
      return setError(errors['دلیل معافیت'], null);
    }
  };
  fieldCollections[1]['وضعیت نظام وظیفه'].onChange(manageMoaf);
  fieldCollections[1]['نوع معافیت'].onChange(manageDalil);
  view = E(null, groupArrays.map(function(groupArray) {
    return E(style.column, groupArray);
  }), E(style.clearfix), addresses);
  return view;
});


},{"../../../../components/checkbox":8,"../../../../components/dropdown":14,"../../../../components/radioSwitch":19,"../../../../components/restrictedInput/email":21,"../../../../components/restrictedInput/number":24,"../../../../components/restrictedInput/phoneNumber":25,"../../../../utils":38,"../../../../utils/component":34,"./multivalue":72,"./style":74}],72:[function(require,module,exports){
var component, extend, ref, remove, style;

component = require('../../../../../utils/component');

style = require('./style');

ref = require('../../../../../utils'), extend = ref.extend, remove = ref.remove;

module.exports = component('personalInfoMultivalue', function(arg, arg1) {
  var E, add, addItem, append, changeListeners, data, destroy, dom, events, initialItems, input, items, itemsPlaceholder, onEvent, returnObject, setStyle, setViewHeight, view;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  initialItems = arg1.initialItems, input = arg1.input;
  E = dom.E, setStyle = dom.setStyle, append = dom.append, destroy = dom.destroy;
  onEvent = events.onEvent;
  changeListeners = [];
  data = [];
  items = [];
  setStyle(input, style.input);
  view = E(style.view, itemsPlaceholder = E(null, initialItems.map(function(text) {
    return E(style.item, E(extend({
      englishText: text
    }, style.itemText)));
  })), input, add = E(style.add));
  (setViewHeight = function() {
    return setStyle(view, {
      height: (initialItems.length + items.length + 1) * 30
    });
  })();
  addItem = function(text) {
    var newItem, removeItem;
    newItem = E(style.item, E(extend({
      englishText: text
    }, style.itemText)), removeItem = E(style.remove));
    append(itemsPlaceholder, newItem);
    data.push(text);
    items.push(newItem);
    setViewHeight();
    setStyle(input, {
      value: ''
    });
    return onEvent(removeItem, 'click', function() {
      changeListeners.forEach(function(x) {
        return x(false);
      });
      destroy(newItem);
      data.splice(items.indexOf(newItem), 1);
      remove(items, newItem);
      return setViewHeight();
    });
  };
  onEvent(add, 'click', function() {
    if (!changeListeners.every(function(x) {
      return x(true) !== false;
    })) {
      return;
    }
    return addItem(input.value());
  });
  returnObject({
    input: input,
    onChange: function(listener) {
      return changeListeners.push(listener);
    },
    value: function() {
      return data;
    },
    add: addItem
  });
  return view;
});


},{"../../../../../utils":38,"../../../../../utils/component":34,"./style":73}],73:[function(require,module,exports){
var extend, icon;

extend = require('../../../../../utils').extend;

exports.view = {
  position: 'relative',
  transition: '0.2s',
  paddingTop: 7
};

exports.item = {
  width: 174,
  float: 'left',
  position: 'relative',
  height: 30
};

exports.itemText = {
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
  left: 26
};

exports.input = {
  position: 'absolute',
  left: 26,
  width: 174,
  bottom: 0
};

icon = {
  cursor: 'pointer',
  width: 20,
  height: 20,
  fontSize: 20,
  position: 'absolute',
  left: 0
};

exports.add = extend({}, icon, {
  "class": 'fa fa-plus-circle',
  color: '#449e73',
  bottom: 5
});

exports.remove = extend({}, icon, {
  "class": 'fa fa-minus-circle',
  color: '#d71d24',
  top: 0
});


},{"../../../../../utils":38}],74:[function(require,module,exports){
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

exports.optional = {
  display: 'inline-block',
  marginRight: 5,
  fontSize: 12,
  color: '#ccc',
  height: 30,
  lineHeight: 30
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


},{"../../../../utils":38}],75:[function(require,module,exports){
var component, dateInput, dropdown, extend, monthToString, numberInput, ref, remove, style, toEnglish;

component = require('../../../../utils/component');

numberInput = require('../../../../components/restrictedInput/number');

dateInput = require('../../../../components/dateInput');

dropdown = require('../../../../components/dropdown');

style = require('./style');

ref = require('../../../../utils'), extend = ref.extend, remove = ref.remove, monthToString = ref.monthToString, toEnglish = ref.toEnglish;

module.exports = component('applicantFormReputation', function(arg, arg1) {
  var E, add, append, destroy, dom, events, i0, i1, i10, i11, i12, i2, i3, i4, i5, i6, i7, i8, i9, jobItemsPlaceholder, jobs, onAdds, onEvent, registerErrorField, setData, setError, setStyle, text, view;
  dom = arg.dom, events = arg.events;
  setData = arg1.setData, registerErrorField = arg1.registerErrorField, setError = arg1.setError;
  E = dom.E, setStyle = dom.setStyle, text = dom.text, append = dom.append, destroy = dom.destroy;
  onEvent = events.onEvent;
  jobs = [];
  view = E(style.view, jobItemsPlaceholder = E(style.jobItemsPlaceholder), E(style.inputRow, add = E(style.add), i0 = E('input', extend({
    placeholder: 'نام'
  }, style.input)), i1 = E('input', extend({
    placeholder: 'نوع فعالیت'
  }, style.input)), i2 = E('input', extend({
    placeholder: 'سمت'
  }, style.input)), i3 = E('input', extend({
    placeholder: 'نام مدیر عامل'
  }, style.input)), i4 = E('input', extend({
    placeholder: 'نام مدیر مستقیم'
  }, style.input)), i5 = (function() {
    var f;
    f = E(numberInput);
    setStyle(f, extend({
      placeholder: 'تلفن'
    }, style.input, {
      marginLeft: 0
    }));
    return f;
  })()), E(style.inputRow, E(style.inputColumn0, E(extend(style.inputRow, {
    marginTop: 0
  }), E(style.label0, 'از'), i6 = (function() {
    var f;
    f = E(dateInput);
    setStyle(f, style.inputPlaceholder);
    setStyle(f.input, extend({
      placeholder: 'تاریخ شروع'
    }, style.dateInput));
    onEvent(f.input, ['input', 'pInput'], function() {
      if (f.value()) {
        return setStyle(f.input, {
          direction: 'ltr'
        });
      } else {
        return setStyle(f.input, {
          direction: 'rtl'
        });
      }
    });
    return f;
  })(), E(style.label0, 'تا'), i7 = (function() {
    var f;
    f = E(dateInput);
    setStyle(f, extend({
      marginLeft: '2%'
    }, style.inputPlaceholder));
    setStyle(f.input, extend({
      placeholder: 'تاریخ پایان'
    }, style.dateInput));
    onEvent(f.input, ['input', 'pInput'], function() {
      if (f.value()) {
        return setStyle(f.input, {
          direction: 'ltr'
        });
      } else {
        return setStyle(f.input, {
          direction: 'rtl'
        });
      }
    });
    return f;
  })(), i8 = (function() {
    var f;
    f = E(dropdown, {
      items: ['پاره وقت', 'تمام وقت', 'پروژه‌ای'],
      selectedIndex: 1
    });
    setStyle(f, style.inputPlaceholder);
    setStyle(f.input, extend(style.dropdown));
    return f;
  })()), E(style.inputRow, i9 = E('input', extend({
    placeholder: 'علت خاتمه همکاری'
  }, style.input, {
    marginLeft: 0,
    width: '100%'
  }))), E(style.inputRow, E(style.label1, 'آخرین خالص دریافتی (تومان)'), i10 = (function() {
    var f;
    f = E(numberInput);
    setStyle(f, extend({}, style.input, {
      marginLeft: 0,
      width: '70%'
    }));
    return f;
  })())), E(style.inputColumn1, i11 = E('input', extend({
    placeholder: 'محدوده نشانی'
  }, style.input, {
    width: '100%'
  })), i12 = E('textarea', extend({
    placeholder: 'شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف'
  }, style.textarea))), E(style.clearfix)));
  onAdds = [];
  [i0, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12].forEach(function(field, i) {
    var error;
    error = registerErrorField(field, field, true);
    onAdds.push(function() {
      if ((field.value() == null) || (typeof (field.value()) === 'string' && !field.value().trim())) {
        return setError(error, 'تکمیل این فیلد الزامیست.');
      } else if ((field.valid != null) && !field.valid()) {
        return setError(error, 'تکمیل این فیلد الزامیست.');
      }
    });
    if (field.onChange) {
      field.onChange(function() {
        return setError(error, null);
      });
    }
    return onEvent(field.input || field, 'input', function() {
      return setError(error, null);
    });
  });
  onEvent(add, 'click', function() {
    var canAdd, end, job, jobItem, removeJob, start;
    canAdd = [i0, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12].every(function(i) {
      return !(((i.value() == null) || (typeof (i.value()) === 'string' && !i.value().trim())) || ((i.valid != null) && !i.valid()));
    });
    if (!canAdd) {
      onAdds.forEach(function(x) {
        return x();
      });
      return;
    }
    jobs.push(job = {
      'نام': i0.value(),
      'نوع فعالیت': i1.value(),
      'سمت': i2.value(),
      'نام مدیر عامل': i3.value(),
      'نام مدیر مستقیم': i4.value(),
      'تلفن': i5.value(),
      'تاریخ شروع': i6.value(),
      'تاریخ پایان': i7.value(),
      'نوع همکاری': i8.value(),
      'علت خاتمه همکاری': i9.value(),
      'آخرین خالص دریافتی': i10.value(),
      'محدوده نشانی': i11.value(),
      'شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف': i12.value()
    });
    setStyle([i0, i1, i2, i3, i4, i5, i6.input, i7.input, i9, i10, i11, i12], {
      value: ''
    });
    i8.clear();
    start = toEnglish(job['تاریخ شروع']).split('/');
    start[1] = monthToString(start[1]);
    start = [start[1], start[0]].join(' ');
    end = toEnglish(job['تاریخ پایان']).split('/');
    end[1] = monthToString(end[1]);
    end = [end[1], end[0]].join(' ');
    append(jobItemsPlaceholder, jobItem = E(style.job, removeJob = E(style.remove), E(style.jobDate, "از " + start + " تا " + end), E(style.jobRow, E(style['نام'], job['نام']), E(style['نوع فعالیت'], '--- ' + job['نوع فعالیت']), E(style['نام مدیر عامل'], '(به مدیریت ' + job['نام مدیر عامل'] + ')')), E(style.jobRow, E(style['محدوده نشانی'], E(style.mapIcon), text(job['محدوده نشانی'])), E(style['تلفن'], E(style.phoneIcon), text(job['تلفن']))), E(extend({
      englishHtml: job['شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف'].replace(/\n/g, '<br />')
    }, style.jobRow)), E(style.jobRow, E(style.jobColumn, E(style.jobColumnHeader, 'سمت'), E(null, job['سمت'])), E(style.jobColumn, E(style.jobColumnHeader, 'آخرین خالص دریافتی'), E(null, toEnglish(job['آخرین خالص دریافتی']).replace(/\B(?=(\d{3})+(?!\d))/g, '،') + ' تومان')), E(style.jobColumn, E(style.jobColumnHeader, 'علت خاتمه همکاری'), E(null, job['علت خاتمه همکاری'])), E(style.jobColumn, E(style.jobColumnHeader, 'نوع همکاری'), E(null, job['نوع همکاری'])), E(style.jobColumn, E(style.jobColumnHeader, 'مدیر مستقیم'), E(null, job['نام مدیر مستقیم'])), E(style.clearfix))));
    onEvent(removeJob, 'click', function() {
      destroy(jobItem);
      return remove(jobs, job);
    });
    return setData('آخرین سوابق سازمانی و پروژه‌ای', jobs);
  });
  return view;
});


},{"../../../../components/dateInput":12,"../../../../components/dropdown":14,"../../../../components/restrictedInput/number":24,"../../../../utils":38,"../../../../utils/component":34,"./style":76}],76:[function(require,module,exports){
var extend;

extend = require('../../../../utils').extend;

exports.clearfix = {
  clear: 'both'
};

exports.view = {
  paddingLeft: 25
};

exports.inputRow = {
  margin: '15px 0',
  position: 'relative'
};

exports.inputColumn0 = {
  float: 'right',
  width: '54%',
  marginLeft: '1%'
};

exports.inputColumn1 = {
  float: 'right',
  width: '45%'
};

exports.label0 = {
  fontSize: 12,
  lineHeight: 30,
  display: 'inline-block',
  fontWeight: 'bold',
  textAlign: 'center',
  width: '4%',
  transition: '0.2s',
  color: '#5c5555'
};

exports.label1 = {
  fontSize: 12,
  lineHeight: 30,
  display: 'inline-block',
  fontWeight: 'bold',
  textAlign: 'center',
  width: '30%',
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
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555',
  width: '15.8%',
  marginLeft: '1%'
};

exports.inputPlaceholder = {
  display: 'inline-block',
  width: '30%'
};

exports.dropdown = extend({}, exports.input, {
  width: '100%',
  marginLeft: 0
});

exports.dateInput = extend({}, exports.dropdown, {
  paddingLeft: 30,
  direction: 'rtl'
});

exports.textarea = {
  fontSize: 12,
  borderRadius: 2,
  padding: 15,
  outline: 'none',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555',
  minWidth: '100%',
  maxWidth: '100%',
  marginTop: 15,
  minHeight: 75,
  maxHeight: 75
};

exports.add = {
  "class": 'fa fa-plus-circle',
  color: '#449e73',
  cursor: 'pointer',
  width: 20,
  height: 20,
  fontSize: 20,
  position: 'absolute',
  top: 5,
  left: -25
};

exports.jobItemsPlaceholder = {};

exports.job = {
  position: 'relative',
  marginTop: 30,
  paddingBottom: 15,
  borderBottom: '1px solid #ccc'
};

exports.remove = {
  "class": 'fa fa-minus-circle',
  color: '#d71d24',
  cursor: 'pointer',
  width: 20,
  height: 20,
  fontSize: 20,
  position: 'absolute',
  top: 0,
  left: -25
};

exports.jobDate = {
  position: 'absolute',
  top: 0,
  left: 5
};

exports.jobRow = {
  margin: '20px 25px 0 20px'
};

exports['نام'] = {
  display: 'inline-block',
  marginRight: -15,
  fontSize: 16,
  fontWeight: 'bold'
};

exports['نوع فعالیت'] = {
  display: 'inline-block',
  marginRight: 10,
  color: '#aaa'
};

exports['نام مدیر عامل'] = {
  display: 'inline-block',
  marginRight: 30
};

exports['محدوده نشانی'] = {
  display: 'inline-block'
};

exports.mapIcon = {
  "class": 'fa fa-map-marker',
  marginLeft: 10
};

exports['تلفن'] = {
  display: 'inline-block',
  marginRight: 50
};

exports.phoneIcon = {
  "class": 'fa fa-phone',
  marginLeft: 10
};

exports.jobColumn = {
  float: 'right',
  width: '20%'
};

exports.jobColumnHeader = {
  fontSize: 14,
  fontWeight: 'bold',
  marginBottom: 10
};


},{"../../../../utils":38}],77:[function(require,module,exports){
exports.valid = {
  color: '#5c5555',
  borderColor: '#ccc'
};

exports.invalid = {
  color: '#c00',
  borderColor: '#c00'
};

exports.form = {
  paddingRight: 20
};

exports.cover = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: 'white',
  zIndex: 100000,
  transition: '0.2s',
  opacity: 0,
  visibility: 'hidden'
};

exports.coverVisible = {
  opacity: 0.9,
  visibility: 'visible'
};

exports.header = {
  color: '#449e73',
  fontSize: 18,
  margin: '50px -20px 20px 0',
  height: 25,
  lineHeight: 25
};

exports.optional = {
  display: 'inline-block',
  marginRight: 5,
  fontSize: 12,
  color: '#ccc',
  height: 25,
  lineHeight: 25
};

exports.checkboxWrapper = {
  margin: '50px 0 0'
};

exports.submit = {
  fontSize: 12,
  borderRadius: 5,
  color: 'white',
  margin: '10px 0',
  display: 'inline-block',
  float: 'left',
  padding: '5px 15px',
  cursor: 'pointer',
  transition: '0.2s',
  backgroundColor: '#449e73'
};

exports.submitDisabled = {
  backgroundColor: 'gray'
};

exports.submitSubmitting = {
  backgroundColor: 'gray',
  cursor: 'default'
};


},{}],78:[function(require,module,exports){
var component, dropdown, remove, style, yearInput;

component = require('../../../../utils/component');

style = require('./style');

dropdown = require('../../../../components/dropdown');

yearInput = require('../../../../components/restrictedInput/year');

remove = require('../../../../utils').remove;

module.exports = component('applicantFormTalents', function(arg, arg1) {
  var E, append, destroy, dom, events, label0, label1, onEvent, registerErrorField, setData, setError, setStyle, table0, table1, textarea0, textarea1, view;
  dom = arg.dom, events = arg.events;
  setData = arg1.setData, registerErrorField = arg1.registerErrorField, setError = arg1.setError;
  E = dom.E, setStyle = dom.setStyle, append = dom.append, destroy = dom.destroy;
  onEvent = events.onEvent;
  table0 = (function() {
    var add, body, createRow, entries, removeButtons, rows, view;
    entries = [];
    rows = [];
    removeButtons = [];
    view = E('span', null, E('table', null, E('thead', null, E('tr', null, E('th', style.th, 'شایستگی / مهارت'), E('th', style.th, 'علاقه به کار در این حوزه'), E('th', style.th, 'دانش و مهارت در این حوزه'), E('th', style.th))), body = E('tbody', null)), E(null, add = E(style.add)));
    createRow = function() {
      var entry, fields, i0, i1, i2, offErrors, row;
      entries.push(entry = {});
      rows.push(row = E('tr', null, E('td', style.td, i0 = E('input', style.input)), E('td', style.td, i1 = (function() {
        i1 = E(dropdown, {
          items: ['کم', 'زیاد']
        });
        setStyle(i1.input, style.input);
        return i1;
      })()), E('td', style.td, i2 = (function() {
        i2 = E(dropdown, {
          items: ['کم', 'متوسط', 'زیاد']
        });
        setStyle(i2.input, style.input);
        return i2;
      })()), E('td', style.td, (function() {
        var removeButton;
        removeButtons.push(removeButton = E(style.remove));
        onEvent(removeButton, 'click', function() {
          remove(rows, row);
          remove(entries, entry);
          setData('مهارت‌ها', entries);
          destroy(row);
          return offErrors.forEach(function(x) {
            return x();
          });
        });
        return removeButton;
      })())));
      append(body, row);
      offErrors = [];
      return Object.keys(fields = {
        'شایستگی / مهارت': i0,
        'علاقه به کار در این حوزه': i1,
        'دانش و مهارت در این حوزه': i2
      }).forEach(function(fieldName) {
        var error, field, handleChange, input;
        field = fields[fieldName];
        error = registerErrorField(field, field);
        offErrors.push(error.off);
        setError(error, 'تکمیل این فیلد الزامیست.', true);
        if (field.onChange) {
          field.onChange(function() {
            entry[fieldName] = field.value();
            return setData('مهارت‌ها', entries);
          });
          onEvent(field.input, 'input', function() {
            return setError(error, 'تکمیل این فیلد الزامیست.', true);
          });
          return onEvent(field.input, 'blur', function() {
            return setTimeout(function() {
              if (field.value() == null) {
                return setError(error, 'تکمیل این فیلد الزامیست.');
              } else {
                return setError(error, null);
              }
            });
          });
        } else {
          input = field.input || field;
          onEvent(input, 'input', function() {
            entry[fieldName] = field.value();
            return setData('مهارت‌ها', entries);
          });
          handleChange = function(hidden) {
            return function() {
              if (!field.value().trim()) {
                return setError(error, 'تکمیل این فیلد الزامیست.', hidden);
              } else if ((field.valid != null) && !field.valid()) {
                return setError(error, 'مقدار وارد شده قابل قبول نیست.', hidden);
              } else {
                return setError(error, null);
              }
            };
          };
          onEvent(input, 'input', handleChange(true));
          return onEvent(input, 'blur', handleChange(false));
        }
      });
    };
    onEvent(add, 'click', createRow);
    return view;
  })();
  table1 = (function() {
    var add, body, createRow, entries, removeButtons, rows, view;
    entries = [];
    rows = [];
    removeButtons = [];
    view = E('span', null, E('table', null, E('thead', null, E('tr', null, E('th', style.th, 'دوره'), E('th', style.th, 'برگزار کننده'), E('th', style.th, 'سال'), E('th', style.th))), body = E('tbody', null)), E(null, add = E(style.add)));
    createRow = function() {
      var entry, fields, i0, i1, i2, offErrors, row;
      entries.push(entry = {});
      rows.push(row = E('tr', null, E('td', style.td, i0 = E('input', style.input)), E('td', style.td, i1 = E('input', style.input)), E('td', style.td, i2 = (function() {
        i2 = E(yearInput);
        setStyle(i2, style.input);
        return i2;
      })()), E('td', style.td, (function() {
        var removeButton;
        removeButtons.push(removeButton = E(style.remove));
        onEvent(removeButton, 'click', function() {
          remove(rows, row);
          remove(entries, entry);
          setData('دوره‌ها', entries);
          destroy(row);
          return offErrors.forEach(function(x) {
            return x();
          });
        });
        return removeButton;
      })())));
      append(body, row);
      offErrors = [];
      return Object.keys(fields = {
        'دوره': i0,
        'برگزار کننده': i1,
        'سال': i2
      }).forEach(function(fieldName) {
        var error, field, handleChange, input;
        field = fields[fieldName];
        error = registerErrorField(field, field);
        offErrors.push(error.off);
        setError(error, 'تکمیل این فیلد الزامیست.', true);
        if (field.onChange) {
          field.onChange(function() {
            entry[fieldName] = field.value();
            return setData('دوره‌ها', entries);
          });
          onEvent(field.input, 'input', function() {
            return setError(error, 'تکمیل این فیلد الزامیست.', true);
          });
          return onEvent(field.input, 'blur', function() {
            return setTimeout(function() {
              if (field.value() == null) {
                return setError(error, 'تکمیل این فیلد الزامیست.');
              } else {
                return setError(error, null);
              }
            });
          });
        } else {
          input = field.input || field;
          onEvent(input, 'input', function() {
            entry[fieldName] = field.value();
            return setData('دوره‌ها', entries);
          });
          handleChange = function(hidden) {
            return function() {
              if (!field.value().trim()) {
                return setError(error, 'تکمیل این فیلد الزامیست.', hidden);
              } else if ((field.valid != null) && !field.valid()) {
                return setError(error, 'مقدار وارد شده قابل قبول نیست.', hidden);
              } else {
                return setError(error, null);
              }
            };
          };
          onEvent(input, 'input', handleChange(true));
          return onEvent(input, 'blur', handleChange(false));
        }
      });
    };
    onEvent(add, 'click', createRow);
    return view;
  })();
  view = E(null, table0, table1, E(style.column, label0 = E(style.label, 'نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده:'), textarea0 = E('textarea', style.textarea)), E(style.column, label1 = E(style.label, 'آثار علمی و عضویت در انجمن‌ها:'), textarea1 = E('textarea', style.textarea)), E(style.clearfix));
  [
    {
      text: 'نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده',
      label: label0,
      field: textarea0
    }, {
      text: 'آثار علمی و عضویت در انجمن‌ها',
      label: label1,
      field: textarea1
    }
  ].forEach(function(arg2) {
    var field, label, text;
    text = arg2.text, label = arg2.label, field = arg2.field;
    return onEvent(field, 'input', function() {
      return setData(text, field.value());
    });
  });
  return view;
});


},{"../../../../components/dropdown":14,"../../../../components/restrictedInput/year":26,"../../../../utils":38,"../../../../utils/component":34,"./style":79}],79:[function(require,module,exports){
var extend, icon;

extend = require('../../../../utils').extend;

exports.clearfix = {
  clear: 'both'
};

exports.th = {
  padding: '10px 10px 0',
  color: '#5c5555',
  fontSize: 12,
  width: 200
};

exports.td = {
  padding: 10,
  color: '#5c5555',
  fontSize: 12
};

exports.input = {
  width: 200,
  fontSize: 12,
  height: 30,
  lineHeight: 30,
  borderRadius: 2,
  padding: '0 5px',
  outline: 'none',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555'
};

icon = {
  cursor: 'pointer',
  width: 20,
  height: 20,
  fontSize: 20,
  position: 'relative',
  top: 2
};

exports.add = extend({}, icon, {
  "class": 'fa fa-plus-circle',
  color: '#449e73',
  top: 5,
  right: 10
});

exports.remove = extend({}, icon, {
  "class": 'fa fa-minus-circle',
  color: '#d71d24'
});

exports.column = {
  float: 'right',
  width: '46%',
  padding: '2% 10px 0 10px'
};

exports.label = {
  color: '#5c5555',
  fontWeight: 'bold',
  margin: '5px 0',
  fontSize: 12
};

exports.textarea = {
  minWidth: '100%',
  maxWidth: '100%',
  minHeight: 100,
  maxHeight: 100,
  fontSize: 12,
  borderRadius: 2,
  padding: '5px',
  outline: 'none',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555'
};


},{"../../../../utils":38}],80:[function(require,module,exports){
var component, extend, form, style, tabContents, tabNames, tests;

component = require('../../utils/component');

style = require('./style');

form = require('./form');

tests = require('./tests');

extend = require('../../utils').extend;

tabNames = ['اطلاعات تکمیلی'];

tabContents = [form];

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


},{"../../utils":38,"../../utils/component":34,"./form":55,"./style":81,"./tests":82}],81:[function(require,module,exports){
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


},{"../../utils":38}],82:[function(require,module,exports){
var component;

component = require('../../../utils/component');

module.exports = component('applicantTests', function(arg) {
  var E, dom;
  dom = arg.dom;
  E = dom.E;
  return E(null, 'آزمون‌های شخصیت‌شناسی');
});


},{"../../../utils/component":34}],83:[function(require,module,exports){
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
      key: 'identificationCode',
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
      if ((key === 'phoneNumber' && (toEnglish(input.value()).indexOf('09') !== 0 || input.value().length !== 11)) || (key === 'identificationCode' && input.value().length !== 10)) {
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


},{"../../utils":38,"../../utils/component":34,"./jobs":84,"./style":85}],84:[function(require,module,exports){
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
},{}],85:[function(require,module,exports){
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


},{}],86:[function(require,module,exports){
var tableView;

tableView = require('../tableView');

module.exports = tableView;


},{"../tableView":93}],87:[function(require,module,exports){
var applicantView, apply, component, hrView, login, managerView, printView;

component = require('../utils/component');

apply = require('./apply');

login = require('./login');

hrView = require('./hrView');

managerView = require('./managerView');

applicantView = require('./applicantView');

printView = require('./printView');

module.exports = component('views', function(arg) {
  var E, append, currentPage, dom, empty, state, wrapper;
  dom = arg.dom, state = arg.state;
  E = dom.E, append = dom.append, empty = dom.empty;
  wrapper = E();
  currentPage = void 0;
  if (~location.hash.indexOf('#print_')) {
    append(wrapper, E(printView, +location.hash.slice('#print_'.length)));
  } else {
    state.user.on({
      allowNull: true
    }, function(user) {
      empty(wrapper);
      currentPage = (function() {
        if (user) {
          switch (user.userType) {
            case 3:
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
  }
  return wrapper;
});


},{"../utils/component":34,"./applicantView":80,"./apply":83,"./hrView":86,"./login":88,"./managerView":90,"./printView":91}],88:[function(require,module,exports){
var component, extend, numberInput, ref, style, toEnglish;

component = require('../../utils/component');

style = require('./style');

numberInput = require('../../components/restrictedInput/number');

ref = require('../../utils'), extend = ref.extend, toEnglish = ref.toEnglish;

module.exports = component('login', function(arg) {
  var E, append, captchaInput, captchaPlaceholder, disable, doSubmit, dom, email, empty, enable, events, hide, invalid, invalidCaptcha, loadCaptcha, onEnter, onEvent, password, service, setStyle, show, spinner, submit, text;
  dom = arg.dom, events = arg.events, service = arg.service;
  E = dom.E, empty = dom.empty, append = dom.append, text = dom.text, setStyle = dom.setStyle, show = dom.show, hide = dom.hide, enable = dom.enable, disable = dom.disable;
  onEvent = events.onEvent, onEnter = events.onEnter;
  component = E(null, E('img', style.bg), E(style.form, E('img', style.logo), E(style.title, 'شرکت نرم‌افزاری داتیس آرین قشم'), E(style.formInputs, email = E('input', extend({
    placeholder: 'کد ملی / نام کاربری'
  }, style.input)), password = E('input', extend({
    type: 'password',
    placeholder: 'رمز عبور'
  }, style.input)), captchaPlaceholder = E(style.captchaSection), E(style.submitSection, submit = E('button', style.submit, 'ورود'), spinner = E(style.spinner, 'در حال بارگذاری...'), hide(invalid = E(style.invalid, 'نام کاربری و یا رمز عبور اشتباه است.')), hide(invalidCaptcha = E(style.invalid, 'عدد وارد شده اشتباه است.'))))));
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
  (loadCaptcha = function() {
    return service.getCaptcha().then(function(captcha) {
      var firstPart, lastPart, ref1;
      ref1 = captcha.split('x'), firstPart = ref1[0], lastPart = ref1[1];
      firstPart += ' ';
      lastPart = ' ' + lastPart;
      empty(captchaPlaceholder);
      append(captchaPlaceholder, [E('span', null, firstPart), captchaInput = E(numberInput, true), E('span', null, lastPart)]);
      onEnter(captchaInput, doSubmit);
      return setStyle(captchaInput, style.captchaInput);
    });
  })();
  doSubmit = function() {
    if (!captchaInput) {
      return;
    }
    disable([email, password, submit]);
    hide([invalid, invalidCaptcha]);
    show(spinner);
    return service.login({
      identificationCode: email.value(),
      password: password.value(),
      captcha: toEnglish(captchaInput.value())
    })["catch"](function(response) {
      loadCaptcha();
      if (response === 'Captcha Answer Incorrect ') {
        return show(invalidCaptcha);
      } else {
        return show(invalid);
      }
    }).fin(function() {
      enable([email, password, submit]);
      return hide(spinner);
    }).done();
  };
  onEvent([email, password], 'input', function() {
    return hide([invalid, invalidCaptcha]);
  });
  onEnter([email, password], doSubmit);
  onEvent(submit, 'click', doSubmit);
  return component;
});


},{"../../components/restrictedInput/number":24,"../../utils":38,"../../utils/component":34,"./style":89}],89:[function(require,module,exports){
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


},{}],90:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"../tableView":93,"dup":86}],91:[function(require,module,exports){
var component, extend, monthToString, ref, style, toDate;

style = require('./style');

component = require('../../utils/component');

ref = require('../../utils'), extend = ref.extend, toDate = ref.toDate, monthToString = ref.monthToString;

module.exports = component('views', function(arg, userId) {
  var E, append, dom, state, text, view;
  dom = arg.dom, state = arg.state;
  E = dom.E, text = dom.text, append = dom.append;
  view = E(style.view);
  state.applicants.on({
    once: true
  }, function(applicants) {
    var applicant, applicantData, birthdayString, ref1, ref10, ref11, ref12, ref13, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
    applicant = applicants.filter(function(applicant) {
      return applicant.userId === userId;
    })[0];
    applicantData = applicant.applicantData;
    applicantData = JSON.parse(applicantData);
    birthdayString = applicant.birthday.split('/');
    birthdayString[1] = monthToString(birthdayString[1]);
    birthdayString = [birthdayString[2], birthdayString[1], birthdayString[0]].join(' ');
    append(view, [
      E('h1', null, '1. مشخصات فردی'), E(style.boxContainer, E(style.box3, "نام و نام خانوادگی: " + applicant.firstName + " " + applicant.lastName), E(style.box3, "جنسیت: " + applicantData['مشخصات فردی']['جنسیت']), E(style.box3, "نام پدر: " + applicantData['مشخصات فردی']['نام پدر']), E(style.box3, "تاریخ تولد: " + birthdayString), E(style.box3, "شماره شناسنامه: " + applicantData['مشخصات فردی']['شماره شناسنامه']), E(style.box3, "کد ملی: " + applicant.identificationCode), E(style.box3, text("محل تولد: " + applicantData['مشخصات فردی']['محل تولد']), E(style.boxMarginRight, "محل صدور: " + applicantData['مشخصات فردی']['محل صدور'])), E(style.box3, text("دین: " + applicantData['مشخصات فردی']['دین']), E(style.boxMarginRight, "مذهب: " + (applicantData['مشخصات فردی']['مذهب'] || ''))), E(style.box3, text("ملیت: " + applicantData['مشخصات فردی']['ملیت']), E(style.boxMarginRight, "تابعیت: " + applicantData['مشخصات فردی']['تابعیت'])), E(style.box2, "تلفن همراه: " + applicant.phoneNumber + ((applicantData['مشخصات فردی']['تلفن همراه'] || []).map(function(x) {
        return ' - ' + x;
      }))), E(style.box2, text("پست الکترونیک: " + applicant.email + ((applicantData['مشخصات فردی']['ایمیل'] || []).map(function(x) {
        return ' - ' + x;
      })))), E(style.box3, "تلفن محل سکونت دائم: " + applicantData['مشخصات فردی']['تلفن ثابت محل سکونت دائم']), E(style.box23, "نشانی محل سکونت دائم: " + applicantData['مشخصات فردی']['آدرس محل سکونت دائم']), E(extend({}, style.box, {
        borderBottomStyle: 'dashed'
      }), 'مشخصات محل سکونت فعلی (درصورتیکه در محلی غیر از محل سکونت دائم خود اقامت دارید (خوابگاه / پانسیون / ...))'), E(extend({}, style.box3, {
        borderBottomStyle: 'dashed',
        borderLeftStyle: 'dashed'
      }), "تلفن محل سکونت فعلی: " + (applicantData['مشخصات فردی']['تلفن ثابت محل سکونت فعلی'] || '')), E(extend({}, style.box23, {
        borderBottomStyle: 'dashed'
      }), "نشانی محل سکونت فعلی: " + (applicantData['مشخصات فردی']['آدرس محل سکونت فعلی'] || '')), ((ref1 = applicantData['مشخصات فردی']) != null ? ref1['جنسیت'] : void 0) === 'مرد' ? [
        E(style.box2, "وضعیت نظام وظیفه: " + applicantData['مشخصات فردی']['وضعیت نظام وظیفه']), E(extend({
          html: (((ref2 = applicantData['مشخصات فردی']) != null ? ref2['وضعیت نظام وظیفه'] : void 0) === 'معاف' ? 'نوع معافیت: ' + applicantData['مشخصات فردی']['نوع معافیت'] + (((ref3 = applicantData['مشخصات فردی']) != null ? ref3['نوع معافیت'] : void 0) === 'معافیت پزشکی' ? '<br />دلیل معافیت: ' + applicantData['مشخصات فردی']['دلیل معافیت'] : '') : '')
        }, style.box2, {
          borderRight: '1px solid black',
          marginRight: -1,
          width: 601
        }))
      ] : void 0, E(style.box3, "وضعیت تاهل: " + applicantData['مشخصات فردی']['وضعیت تاهل']), E(style.box3, ((ref4 = applicantData['مشخصات فردی']) != null ? ref4['وضعیت تاهل'] : void 0) !== 'مجرد' ? "تعداد فرزندان: " + applicantData['مشخصات فردی']['تعداد فرزندان'] : 'تعداد فرزندان: 0'), E(style.box3, "تعداد افراد تحت تکفل: " + (applicantData['مشخصات فردی']['تعداد افراد تحت تکفل'] || '')), E(style.box, "نام معرف (درصورتیکه کسی از دوستان و آشنایان شما را به شرکت معرفی کرده است): " + (applicantData['مشخصات فردی']['نام معرف'] || ''))), E('h1', null, '2. سوابق تحصیلی'), E('table', style.table, E('thead', null, E('tr', null, E('th', style.th, 'مقطع'), E('th', style.th, 'رشته تحصیلی'), E('th', style.th, 'نام دانشگاه و شهر محل تحصیل'), E('th', style.th, 'سال ورود'), E('th', style.th, 'سال اخذ مدرک'), E('th', style.th, 'معدل'), E('th', style.th, 'عنوان پایان‌نامه'))), E('tbody', null, (applicantData['سوابق تحصیلی']['سوابق تحصیلی'] || []).map(function(x) {
        return E('tr', null, E('td', style.td, x['مقطع']), E('td', style.td, x['رشته تحصیلی']), E('td', style.td, x['نام دانشگاه و شهر محل تحصیل']), E('td', style.td, x['سال ورود']), E('td', style.td, x['سال اخذ مدرک']), E('td', style.td, x['معدل']), E('td', style.td, x['عنوان پایان‌نامه']));
      }))), E(style.tableFooter, E(null, 'آیا مایل به ادامه تحصیل در سال‌های آینده هستید؟ ' + (applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید'] ? 'بلی' : 'خیر')), applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید'] ? E(null, "مقطع و رشته‌ای را که ادامه می‌دهید، ذکر کنید: " + applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید']) : void 0), E('h1', null, '3. توانمندیها، مهارت‌ها، دانش و شایستگی‌ها'), E('table', style.table, E('thead', null, E('tr', null, E('th', style.th, 'شایستگی / مهارت'), E('th', style.th, 'علاقه به کار در این حوزه'), E('th', style.th, 'دانش و مهارت در این حوزه'))), E('tbody', null, (((ref5 = applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']) != null ? ref5['مهارت‌ها'] : void 0) || []).map(function(x) {
        return E('tr', null, E('td', style.td, x['شایستگی / مهارت']), E('td', style.td, x['علاقه به کار در این حوزه']), E('td', style.td, x['دانش و مهارت در این حوزه']));
      }))), E('table', extend({
        marginTop: -1
      }, style.table), E('thead', null, E('tr', null, E('th', style.th, 'دوره'), E('th', style.th, 'برگزار کننده'), E('th', style.th, 'سال'))), E('tbody', null, (((ref6 = applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']) != null ? ref6['دوره‌ها'] : void 0) || []).map(function(x) {
        return E('tr', null, E('td', style.td, x['دوره']), E('td', style.td, x['برگزار کننده']), E('td', style.td, x['سال']));
      }))), E(style.tableFooter, E(null, "نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده: " + (((ref7 = applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']) != null ? ref7['نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده'] : void 0) || ''))), E(style.tableFooter, E(null, "آثار علمی و عضویت در انجمن‌ها: " + (((ref8 = applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']) != null ? ref8['آثار علمی و عضویت در انجمن‌ها'] : void 0) || ''))), E(extend({
        marginTop: -1
      }, style.boxContainer), E(extend(style.darkBox), 'مهارت زبان انگلیسی'), E(style.box3, "مکالمه: " + applicantData['مهارت زبان انگلیسی']['مکالمه']), E(style.box3, "نوشتن: " + applicantData['مهارت زبان انگلیسی']['نوشتن']), E(style.box3, "خواندن: " + applicantData['مهارت زبان انگلیسی']['خواندن'])), E('h1', null, '5. آخرین سوابق سازمانی و پروژه‌ای'), E('table', style.table, E('thead', null, E('tr', null, E('th', style.th, 'مشخصات شرکت / سازمان محل کار'), E('th', style.th, 'سمت'), E('th', style.th, 'شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف'))), E('tbody', null, (((ref9 = applicantData['آخرین سوابق سازمانی و پروژه‌ای']) != null ? ref9['آخرین سوابق سازمانی و پروژه‌ای'] : void 0) || []).map(function(x) {
        return [
          E('tr', null, E('td', extend({
            rowSpan: 2
          }, style.td), E(null, "نام: " + x['نام']), E(null, "نوع فعالیت: " + x['نوع فعالیت']), E(null, "نام مدیر عامل: " + x['نام مدیر عامل']), E(null, "نام مدیر مستقیم: " + x['نام مدیر مستقیم']), E(null, "تلفن: " + x['تلفن']), E(null, "محدوده نشانی: " + x['محدوده نشانی'])), E('td', extend({
            rowSpan: 2
          }, style.td), x['سمت']), E('td', style.td, x['شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف'])), E('tr', null, E('td', style.td, E(null, "تاریخ شروع: " + x['تاریخ شروع']), E(null, "تاریخ پایان: " + x['تاریخ پایان']), E(null, "آخرین خالص دریافتی (تومان): " + x['آخرین خالص دریافتی']), E(null, "نوع همکاری: " + x['نوع همکاری']), E(null, "علت خاتمه همکاری: " + x['علت خاتمه همکاری'])))
        ];
      }))), E('h1', null, '6. اطلاعات تکمیلی'), E(style.boxContainer, E(style.box, E(style.bold, 'کار در داتین...')), E(style.box, "متقاضی چه نوع همکاری هستید؟ " + applicantData['سایر اطلاعات']['متقاضی چه نوع همکاری هستید']), E(style.box, ("از چه طریقی از فرصت شغلی در داتین مطلع شدید؟ " + (applicantData['سایر اطلاعات']['از چه طریقی از فرصت شغلی در داتین مطلع شدید'] || '')) + (applicantData['سایر اطلاعات']['از چه طریقی از فرصت شغلی در داتین مطلع شدید'] === 'سایر' ? ' - ' + (((ref10 = applicantData['سایر اطلاعات']) != null ? ref10['از چه طریقی از فرصت شغلی در داتین مطلع شدید - سایر'] : void 0) || '') : '')), E(style.box, "از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید؟ " + (applicantData['سایر اطلاعات']['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید'] || '')), E(style.box, text("نوع بیمه‌ای که تا‌به‌حال داشته‌اید؟ " + (applicantData['سایر اطلاعات']['نوع بیمه‌ای که تا‌به‌حال داشته‌اید'] || '')), E(style.boxMarginRight, "مدت زمانی که بیمه بوده‌اید؟ " + (applicantData['سایر اطلاعات']['مدت زمانی که بیمه بوده‌اید'] || ''))), E(style.box, text('میزان دستمزد '), E(style.boldUnderline, 'خالص'), text((" درخواستی شما چقدر است؟ " + (applicantData['سایر اطلاعات']['میزان دستمزد'] || '')) + (applicantData['سایر اطلاعات']['مقدار دستمزد'] ? ' - ' + applicantData['سایر اطلاعات']['مقدار دستمزد'] + ' تومان' : ''))), E(extend({
        html: 'در صورتی که شغل مورد نظر شما نیاز به موارد زیر داشته باشد، آیا می‌توانید:' + '<br />' + 'در ساعات اضافه کاری حضور داشته و کار کنید - ' + applicantData['سایر اطلاعات']['در ساعات اضافه کاری حضور داشته و کار کنید'] + '<br />' + 'در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید - ' + applicantData['سایر اطلاعات']['در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید'] + '<br />' + 'در شیفت شب کار کنید - ' + applicantData['سایر اطلاعات']['در شیفت شب کار کنید'] + '<br />' + 'در تعطیلات آخر هفته کار کنید - ' + applicantData['سایر اطلاعات']['در تعطیلات آخر هفته کار کنید'] + '<br />' + 'در شهر تهران غیر از محل شرکت مشغول کار شوید - ' + applicantData['سایر اطلاعات']['در شهر تهران غیر از محل شرکت مشغول کار شوید']
      }, style.box)), E(style.box, 'مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند:'), E('table', extend({
        marginTop: -1,
        marginRight: -1
      }, style.table), E('thead', null, E('tr', null, E('th', style.th, 'نام و نام خانوادگی'), E('th', style.th, 'نسبت با شما'), E('th', style.th, 'نام محل کار'), E('th', style.th, 'سمت'), E('th', style.th, 'شماره تماس'))), E('tbody', null, (applicantData['سایر اطلاعات']['مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند'] || []).map(function(x) {
        return E('tr', null, E('td', style.td, x['نام و نام خانوادگی']), E('td', style.td, x['نسبت با شما']), E('td', style.td, x['نام محل کار']), E('td', style.td, x['سمت']), E('td', style.td, x['شماره تماس']));
      }))), E(style.box, 'در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید:'), E('table', extend({
        marginTop: -1,
        marginRight: -1
      }, style.table), E('thead', null, E('tr', null, E('th', style.th, 'نام و نام خانوادگی'), E('th', style.th, 'سمت'), E('th', style.th, 'نام محل کار'), E('th', style.th, 'نسبت با شما'), E('th', style.th, 'شماره تماس'))), E('tbody', null, (applicantData['سایر اطلاعات']['در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید'] || []).map(function(x) {
        return E('tr', null, E('td', style.td, x['نام و نام خانوادگی']), E('td', style.td, x['سمت']), E('td', style.td, x['نام محل کار']), E('td', style.td, x['نسبت با شما']), E('td', style.td, x['شماره تماس']));
      })))), E(extend({
        marginTop: 50
      }, style.boxContainer), E(style.box, E(style.bold, 'بیشتر درباره شما...')), E(style.box2, "ورزش‌های مورد علاقه: " + (applicantData['سایر اطلاعات']['ورزش‌های مورد علاقه'] || 'خیر')), E(style.box2, "زمینه‌های هنری مورد علاقه: " + (applicantData['سایر اطلاعات']['زمینه‌های هنری مورد علاقه'] || 'خیر')), E(style.box, 'آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید؟ ' + (((ref11 = applicantData['سایر اطلاعات']) != null ? ref11['آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید'] : void 0) || 'خیر') + (((ref12 = applicantData['سایر اطلاعات']) != null ? ref12['نوع آن را ذکر نمایید'] : void 0) ? ' - ' + applicantData['سایر اطلاعات']['نوع آن را ذکر نمایید'] : '')), E(style.box2, "'آیا دخانیات مصرف می‌کنید؟ " + (applicantData['سایر اطلاعات']['آیا دخانیات مصرف می‌کنید'] || 'خیر')), E(style.box2, ("آیا سابقه محکومیت کیفری دارید؟ " + (applicantData['سایر اطلاعات']['آیا سابقه محکومیت کیفری دارید'] || 'خیر')) + (((ref13 = applicantData['سایر اطلاعات']) != null ? ref13['تاریخ، دلایل و مدت آن را توضیح دهید'] : void 0) ? ' - ' + applicantData['سایر اطلاعات']['تاریخ، دلایل و مدت آن را توضیح دهید'] : '')))
    ]);
    return window.print();
  });
  return view;
});


},{"../../utils":38,"../../utils/component":34,"./style":92}],92:[function(require,module,exports){
var box, extend;

extend = require('../../utils').extend;

exports.view = {
  fontFamily: 'B Nazanin,Bold',
  width: 1201,
  lineHeight: 50,
  margin: '100px auto'
};

box = {
  display: 'inline-block',
  borderLeft: '1px solid black',
  borderBottom: '1px solid black',
  padding: '0 20px'
};

exports.boxContainer = {
  borderTop: '1px solid black',
  borderRight: '1px solid black'
};

exports.box = extend({}, box, {
  width: 1200
});

exports.box2 = extend({}, box, {
  width: 600
});

exports.box3 = extend({}, box, {
  width: 400
});

exports.box23 = extend({}, box, {
  width: 800
});

exports.darkBox = extend({}, exports.box, {
  backgroundColor: '#ddd',
  textAlign: 'center',
  fontWeight: 'bold'
});

exports.boxMarginRight = {
  display: 'inline-block',
  marginRight: 80
};

exports.bold = {
  display: 'inline-block',
  fontWeight: 'bold'
};

exports.boldUnderline = {
  display: 'inline-block',
  fontWeight: 'bold',
  lineHeight: 15,
  borderBottom: '1px solid black'
};

exports.table = {
  width: 1201
};

exports.td = {
  padding: '0 20px',
  border: '1px solid black'
};

exports.th = extend({}, exports.td, {
  backgroundColor: '#ddd'
});

exports.tableFooter = {
  padding: '0 20px',
  border: '1px solid black',
  borderTop: 'none'
};


},{"../../utils":38}],93:[function(require,module,exports){
var actionButton, component, extend, logic, profile, ref, search, sidebar, style, table, toDate;

component = require('../../utils/component');

style = require('./style');

sidebar = require('./sidebar');

table = require('./table');

search = require('./search');

profile = require('./profile');

actionButton = require('../../components/actionButton');

ref = require('../../utils'), extend = ref.extend, toDate = ref.toDate;

logic = require('../../utils/logic');

module.exports = component('tableView', function(arg) {
  var E, actionButtonPlaceholder, append, applicants, contents, dom, empty, events, gotoApplicant, gotoArchive, gotoIndex, headers, hide, isInArchive, onEvent, profilePlaceholder, searchInstance, selectedApplicants, service, setStyle, state, tableInstance, text, update, view;
  dom = arg.dom, events = arg.events, state = arg.state, service = arg.service;
  E = dom.E, text = dom.text, setStyle = dom.setStyle, append = dom.append, empty = dom.empty, hide = dom.hide;
  onEvent = events.onEvent;
  isInArchive = false;
  gotoApplicant = function(applicant) {
    setStyle(profilePlaceholder, style.profileVisible);
    empty(profilePlaceholder);
    return append(profilePlaceholder, E(profile, {
      applicant: applicant,
      gotoIndex: gotoIndex,
      gotoArchive: gotoArchive,
      isInArchive: isInArchive
    }));
  };
  gotoIndex = function() {
    var actionButtonInstance;
    setStyle(profilePlaceholder, style.profile);
    isInArchive = false;
    empty(actionButtonPlaceholder);
    append(actionButtonPlaceholder, actionButtonInstance = E(actionButton, {
      items: ['چاپ', 'بایگانی']
    }));
    actionButtonInstance.onSelect(function(value) {
      switch (value) {
        case 'چاپ':
          if (selectedApplicants.length !== 1) {
            alert('لطفا یک سطر را انتخاب کنید');
            return;
          }
          return window.open('#print_' + selectedApplicants[0].userId, '_blank');
        case 'بایگانی':
          if (!selectedApplicants.length) {
            alert('لطفا حداقل یک سطر را انتخاب کنید');
            return;
          }
          return service.createMultipleHRStatus(selectedApplicants.map(function(arg1) {
            var userId;
            userId = arg1.userId;
            return userId;
          }));
      }
    });
    return update();
  };
  setTimeout(gotoIndex);
  gotoArchive = function() {
    var actionButtonInstance;
    setStyle(profilePlaceholder, style.profile);
    isInArchive = true;
    empty(actionButtonPlaceholder);
    append(actionButtonPlaceholder, actionButtonInstance = E(actionButton, {
      items: ['چاپ', 'بازیابی']
    }));
    actionButtonInstance.onSelect(function(value) {
      switch (value) {
        case 'چاپ':
          if (selectedApplicants.length !== 1) {
            alert('لطفا یک سطر را انتخاب کنید');
            return;
          }
          return window.open('#print_' + selectedApplicants[0].userId, '_blank');
        case 'بازیابی':
          if (selectedApplicants.length !== 1) {
            alert('لطفا یک سطر را انتخاب کنید');
            return;
          }
          return service.changeHRStatus(selectedApplicants[0].userId, {
            status: logic.statuses.indexOf('بازیابی')
          });
      }
    });
    return update();
  };
  selectedApplicants = [];
  view = E('span', null, E(sidebar, {
    gotoIndex: gotoIndex,
    gotoApplicant: gotoApplicant,
    gotoArchive: gotoArchive
  }), contents = E(style.contents, actionButtonPlaceholder = E(style.action), searchInstance = E(search), tableInstance = E(table, {
    entityId: 'userId',
    properties: {
      multiSelect: true
    },
    headers: headers = [
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
        name: 'شناسه',
        getValue: function(arg1) {
          var dateRelatedId;
          dateRelatedId = arg1.dateRelatedId;
          return dateRelatedId;
        }
      }, {
        name: 'تاریخ ثبت',
        width: 100,
        getValue: function(arg1) {
          var modificationTime;
          modificationTime = arg1.modificationTime;
          return modificationTime;
        },
        styleTd: function(arg1, td) {
          var modificationTime;
          modificationTime = arg1.modificationTime;
          return setStyle(td, {
            text: toDate(modificationTime)
          });
        }
      }, {
        name: 'شغل‌های درخواستی',
        getValue: function(arg1) {
          var selectedJobs;
          selectedJobs = arg1.selectedJobs;
          return selectedJobs.map(function(arg2) {
            var jobName;
            jobName = arg2.jobName;
            return jobName;
          }).join(' - ');
        }
      }, {
        name: 'وضعیت',
        getValue: function(arg1) {
          var applicantData, applicantsHRStatus;
          applicantData = arg1.applicantData, applicantsHRStatus = arg1.applicantsHRStatus;
          if (applicantsHRStatus.length) {
            switch (logic.statuses[applicantsHRStatus[applicantsHRStatus.length - 1].status]) {
              case 'مصاحبه تلفنی انجام شد':
                return 'مصاحبه تلفنی انجام شد';
              case 'در انتظار مصاحبه فنی':
                if (applicantData) {
                  return 'در انتظار مصاحبه فنی';
                } else {
                  return 'در انتظار تکمیل اطلاعات برای مصاحبه فنی';
                }
                break;
              case 'در انتظار مصاحبه عمومی':
                if (applicantData) {
                  return 'در انتظار مصاحبه عمومی';
                } else {
                  return 'در انتظار تکمیل اطلاعات برای مصاحبه عمومی';
                }
                break;
              case 'بایگانی':
                return 'بایگانی';
              case 'بازیابی':
                return 'بازیابی';
            }
          } else {
            return 'ثبت شده';
          }
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
    sort: {
      header: headers[2],
      direction: 'down'
    },
    handlers: {
      select: gotoApplicant,
      update: function(descriptors) {
        return selectedApplicants = descriptors.filter(function(arg1) {
          var selected;
          selected = arg1.selected;
          return selected;
        }).map(function(arg1) {
          var entity;
          entity = arg1.entity;
          return entity;
        });
      }
    }
  }), profilePlaceholder = E(style.profile)));
  state.user.on({
    once: true
  }, function(user) {
    if (user.userType !== 2) {
      return hide(actionButtonPlaceholder);
    }
  });
  applicants = [];
  update = function() {
    var _applicants;
    if (!isInArchive) {
      _applicants = applicants.filter(function(arg1) {
        var applicantsHRStatus, result;
        applicantsHRStatus = arg1.applicantsHRStatus;
        result = true;
        applicantsHRStatus.forEach(function(arg2) {
          var status;
          status = arg2.status;
          switch (logic.statuses[status]) {
            case 'بایگانی':
              return result = false;
            case 'بازیابی':
              return result = true;
          }
        });
        return result;
      });
    } else {
      _applicants = applicants.filter(function(arg1) {
        var applicantsHRStatus, result;
        applicantsHRStatus = arg1.applicantsHRStatus;
        result = false;
        applicantsHRStatus.forEach(function(arg2) {
          var status;
          status = arg2.status;
          switch (logic.statuses[status]) {
            case 'بایگانی':
              return result = true;
            case 'بازیابی':
              return result = false;
          }
        });
        return result;
      });
    }
    return tableInstance.setData(_applicants.filter(searchInstance.isInSearch));
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


},{"../../components/actionButton":2,"../../utils":38,"../../utils/component":34,"../../utils/logic":40,"./profile":96,"./search":114,"./sidebar":116,"./style":118,"./table":120}],94:[function(require,module,exports){
var component, dateInput, dropdown, logic, newAlert, ref, remove, style, toDate, toTimestamp;

style = require('./style');

component = require('../../../../utils/component');

newAlert = require('../../../../components/alert');

dropdown = require('../../../../components/dropdown');

dateInput = require('../../../../components/dateInput');

logic = require('../../../../utils/logic');

ref = require('../../../../utils'), toTimestamp = ref.toTimestamp, toDate = ref.toDate, remove = ref.remove;

module.exports = function(loadbarInstance, applicant, status) {
  return component('changeStatus', function(arg) {
    var E, _interviewId, append, dom, enabled, events, headerInput, hide, loading, newAlertInstance, onEvent, p1, p1Input0, p1Input1, p1Input2, p2, p2Input, removeButton, service, setStyle, show, state, submit, update;
    dom = arg.dom, events = arg.events, state = arg.state, service = arg.service;
    E = dom.E, setStyle = dom.setStyle, show = dom.show, hide = dom.hide, append = dom.append;
    onEvent = events.onEvent;
    p1Input0 = p1Input1 = p1Input2 = void 0;
    newAlertInstance = newAlert('تغییر وضعیت به ...', E(style.alert, headerInput = (function() {
      var f, items;
      if (status || applicant.applicantsHRStatus.length) {
        items = ['مصاحبه فنی', 'مصاحبه عمومی'];
      } else {
        items = ['مصاحبه تلفنی انجام شد', 'مصاحبه فنی', 'مصاحبه عمومی'];
      }
      if (applicant.applicantsHRStatus.some(function(arg1) {
        var status;
        status = arg1.status;
        return logic.statuses[status] === 'در انتظار مصاحبه عمومی';
      })) {
        remove(items, 'مصاحبه عمومی');
      }
      f = E(dropdown, {
        items: items,
        extendStyle: style.extendStyle
      });
      setStyle(f, style.headerDropdown);
      setStyle(f.input, style.headerDropdownInput);
      f.onChange(function() {
        return update();
      });
      return f;
    })()), E(style.panel, hide(loading = E(null, 'در حال بارگزاری...')), p1 = E(), p2 = E(null, p2Input = (function() {
      var f;
      f = E(dateInput);
      setStyle(f, style.dateInput);
      setStyle(f.input, style.dateInputInput);
      onEvent(f.input, ['input', 'pInput'], function() {
        return update();
      });
      return f;
    })()), submit = E(style.submit, 'ذخیره'), removeButton = E(style.remove, 'حذف')));
    enabled = false;
    (update = function() {
      var enable;
      enabled = false;
      setStyle(submit, style.submitDisabled);
      enable = function() {
        enabled = true;
        return setStyle(submit, style.submit);
      };
      hide([p1, p2]);
      switch (headerInput.value()) {
        case 'مصاحبه تلفنی انجام شد':
          return enable();
        case 'مصاحبه فنی':
          show(p1);
          if (p1Input0.value() && p1Input1.value() && p1Input2.valid()) {
            return enable();
          }
          break;
        case 'مصاحبه عمومی':
          show(p2);
          if (p2Input.valid()) {
            return enable();
          }
      }
    })();
    state.managers.on({
      once: true
    }, function(managers) {
      return append(p1, [
        p1Input0 = (function() {
          var f;
          f = E(dropdown, {
            items: applicant.selectedJobs,
            getTitle: function(arg1) {
              var jobName;
              jobName = arg1.jobName;
              return jobName;
            }
          });
          setStyle(f, style.dropdown);
          setStyle(f.input, style.dropdownInput);
          f.onChange(function() {
            return update();
          });
          return f;
        })(), p1Input1 = (function() {
          var f;
          f = E(dropdown, {
            items: managers,
            getTitle: function(arg1) {
              var firstName, lastName;
              firstName = arg1.firstName, lastName = arg1.lastName;
              return firstName + " " + lastName;
            }
          });
          setStyle(f, style.dropdown);
          setStyle(f.input, style.dropdownInput);
          f.onChange(function() {
            return update();
          });
          return f;
        })(), p1Input2 = (function() {
          var f;
          f = E(dateInput);
          setStyle(f, style.dateInput);
          setStyle(f.input, style.dateInputInput);
          onEvent(f.input, ['input', 'pInput'], function() {
            return update();
          });
          return f;
        })()
      ]);
    });
    _interviewId = void 0;
    if (!status) {
      hide(removeButton);
    } else {
      if (status === applicant.applicantsHRStatus.filter(function(arg1) {
        var ref1, status;
        status = arg1.status;
        return (ref1 = logic.statuses[status]) === 'در انتظار مصاحبه عمومی' || ref1 === 'در انتظار مصاحبه فنی';
      })[0]) {
        setStyle(removeButton, style.removeDisabled);
      }
      headerInput.setValue((function() {
        switch (logic.statuses[status.status]) {
          case 'مصاحبه تلفنی انجام شد':
            return 'مصاحبه تلفنی انجام شد';
          case 'در انتظار مصاحبه عمومی':
            return 'مصاحبه عمومی';
          case 'در انتظار مصاحبه فنی':
            return 'مصاحبه فنی';
        }
      })());
      switch (headerInput.value()) {
        case 'مصاحبه فنی':
          show(loading);
          hide(p1);
          service.loadInterview({
            statusId: status.statusHRId
          }).then(function(arg1) {
            var interViewTime, interviewId, jobId, managerId;
            interviewId = arg1.interviewId, interViewTime = arg1.interViewTime, jobId = arg1.jobId, managerId = arg1.managerId;
            _interviewId = interviewId;
            hide(loading);
            show(p1);
            return state.managers.on({
              once: true
            }, function(managers) {
              var job, manager;
              job = applicant.selectedJobs.filter(function(arg2) {
                var j;
                j = arg2.jobId;
                return j === jobId;
              })[0];
              manager = managers.filter(function(arg2) {
                var userId;
                userId = arg2.userId;
                return userId === managerId;
              })[0];
              setStyle(p1Input0.setValue(job));
              setStyle(p1Input1.setValue(manager));
              return setStyle(p1Input2.input, {
                value: toDate(interViewTime)
              });
            });
          });
          break;
        case 'مصاحبه عمومی':
          show(loading);
          hide(p2);
          service.loadInterview({
            statusId: status.statusHRId
          }).then(function(arg1) {
            var interViewTime, interviewId;
            interviewId = arg1.interviewId, interViewTime = arg1.interViewTime;
            _interviewId = interviewId;
            hide(loading);
            show(p2);
            return setStyle(p2Input.input, {
              value: toDate(interViewTime)
            });
          });
          break;
        case 'مصاحبه تلفنی انجام شد':
          _interviewId = null;
      }
    }
    onEvent(removeButton, 'click', function() {
      if (status === applicant.applicantsHRStatus.filter(function(arg1) {
        var ref1, status;
        status = arg1.status;
        return (ref1 = logic.statuses[status]) === 'در انتظار مصاحبه عمومی' || ref1 === 'در انتظار مصاحبه فنی';
      })[0]) {
        return;
      }
      loadbarInstance.set();
      service.deleteHRStatus(status.statusHRId, _interviewId).then(loadbarInstance.reset);
      return newAlertInstance.close();
    });
    onEvent(submit, 'click', function() {
      var checkInterviewTime, fn, se;
      if (!enabled) {
        return;
      }
      fn = status ? service.editHRStatus.bind(null, status.statusHRId, _interviewId) : service.changeHRStatus.bind(null, applicant.userId);
      checkInterviewTime = function(value) {
        var date, today;
        date = new Date(toTimestamp(value));
        today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return date >= today;
      };
      loadbarInstance.set();
      switch (headerInput.value()) {
        case 'مصاحبه تلفنی انجام شد':
          se = fn({
            status: logic.statuses.indexOf('مصاحبه تلفنی انجام شد')
          });
          break;
        case 'مصاحبه فنی':
          if (!checkInterviewTime(p1Input2.value())) {
            alert('زمان مصاحبه نباید نباید قبل از روز جاری باشد.');
            loadbarInstance.reset();
            return;
          }
          se = fn({
            status: logic.statuses.indexOf('در انتظار مصاحبه فنی'),
            jobId: p1Input0.value().jobId,
            managerId: p1Input1.value().userId,
            interViewTime: toTimestamp(p1Input2.value())
          });
          break;
        case 'مصاحبه عمومی':
          if (!checkInterviewTime(p2Input.value())) {
            alert('زمان مصاحبه نباید نباید قبل از روز جاری باشد.');
            loadbarInstance.reset();
            return;
          }
          se = fn({
            status: logic.statuses.indexOf('در انتظار مصاحبه عمومی'),
            interViewTime: toTimestamp(p2Input.value())
          });
      }
      se.then(loadbarInstance.reset);
      return newAlertInstance.close();
    });
    return newAlertInstance;
  })();
};


},{"../../../../components/alert":6,"../../../../components/dateInput":12,"../../../../components/dropdown":14,"../../../../utils":38,"../../../../utils/component":34,"../../../../utils/logic":40,"./style":95}],95:[function(require,module,exports){
exports.alert = {
  backgroundColor: '#eee',
  padding: 10,
  textAlign: 'center'
};

exports.extendStyle = {
  arrow: {
    "class": 'fa fa-chevron-down',
    position: 'absolute',
    cursor: 'pointer',
    borderRight: '1px solid #ddd',
    borderRadius: '3px 0 0 3px',
    textAlign: 'center',
    color: '#777',
    top: 0,
    left: 1,
    width: 30,
    height: 30,
    lineHeight: 30,
    border: '1px solid #ccc',
    transition: '0.2s',
    backgroundColor: 'white'
  },
  arrowHover: {
    backgroundColor: 'white'
  }
};

exports.headerDropdown = {
  width: 200,
  display: 'inline-block',
  textAlign: 'right'
};

exports.headerDropdownInput = {
  width: 172,
  fontSize: 12,
  height: 30,
  lineHeight: 30,
  borderRadius: 2,
  padding: '0 5px',
  outline: 'none',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555'
};

exports.panel = {
  position: 'relative',
  minHeight: 150,
  padding: 20,
  textAlign: 'center'
};

exports.submit = {
  padding: 10,
  borderRadius: 5,
  position: 'absolute',
  cursor: 'pointer',
  textAlign: 'center',
  color: 'white',
  bottom: 10,
  width: 100,
  left: 10,
  transition: '0.2s',
  backgroundColor: '#459d73'
};

exports.submitDisabled = {
  backgroundColor: '#a1ceb9'
};

exports.remove = {
  padding: 10,
  borderRadius: 5,
  position: 'absolute',
  cursor: 'pointer',
  textAlign: 'center',
  color: 'white',
  bottom: 10,
  width: 100,
  left: 120,
  transition: '0.2s',
  backgroundColor: '#d61d23'
};

exports.removeDisabled = {
  backgroundColor: '#ccc'
};

exports.dateInput = {
  margin: '0 5px',
  width: 200,
  display: 'inline-block',
  textAlign: 'right'
};

exports.dateInputInput = {
  width: 200,
  fontSize: 12,
  height: 30,
  lineHeight: 30,
  borderRadius: 2,
  paddingRight: 5,
  paddingLeft: 30,
  outline: 'none',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555'
};

exports.dropdown = {
  margin: '0 5px',
  width: 200,
  display: 'inline-block',
  textAlign: 'right'
};

exports.dropdownInput = {
  width: 200,
  fontSize: 12,
  height: 30,
  lineHeight: 30,
  borderRadius: 2,
  paddingRight: 5,
  paddingLeft: 30,
  outline: 'none',
  transition: '0.2s',
  border: '1px solid #ccc',
  color: '#5c5555'
};


},{}],96:[function(require,module,exports){
var actionButton, changeStatus, component, extend, loadbar, logic, style, tab0, tab1, tab2, tab3, tab4, tab5, tabContents, tabNames, viewStatus;

component = require('../../../utils/component');

style = require('./style');

tab0 = require('./tab0');

tab1 = require('./tab1');

tab2 = require('./tab2');

tab3 = require('./tab3');

tab4 = require('./tab4');

tab5 = require('./tab5');

actionButton = require('../../../components/actionButton');

loadbar = require('../../../components/loadbar');

changeStatus = require('./changeStatus');

viewStatus = require('./viewStatus');

extend = require('../../../utils').extend;

logic = require('../../../utils/logic');

tabNames = ['اطلاعات اولیه', 'اطلاعات تکمیلی', 'آزمون', 'یادداشت', 'سوابق', 'نتایج مصاحبه'];

tabContents = [tab0, tab1, tab2, tab3, tab4, tab5];

module.exports = component('profile', function(arg, arg1) {
  var E, actionButtonInstance, actionButtonItemTexts, actionButtonPlaceholder, actionLegend, actionLegendButton, actionLegendVisible, append, applicant, changeTabIndex, content, contents, currentTabIndex, destroy, dom, empty, events, gotoArchive, gotoIndex, hide, indexLink, isInArchive, loadbarInstance, onEvent, printButton, service, setStyle, state, statusPlaceholder, tabs, text, view;
  dom = arg.dom, events = arg.events, state = arg.state, service = arg.service;
  applicant = arg1.applicant, gotoIndex = arg1.gotoIndex, gotoArchive = arg1.gotoArchive, isInArchive = arg1.isInArchive;
  E = dom.E, text = dom.text, setStyle = dom.setStyle, append = dom.append, destroy = dom.destroy, empty = dom.empty, hide = dom.hide;
  onEvent = events.onEvent;
  content = void 0;
  currentTabIndex = 0;
  view = E('span', null, loadbarInstance = E(loadbar, style.loadbar), indexLink = E('a', style.indexLink, isInArchive ? 'بایگانی' : 'رزومه‌ها'), E('span', style.profileBreadCrumb, ' › پروفایل'), printButton = E(style.printButton, 'چاپ'), actionButtonPlaceholder = E(style.action, actionLegendButton = E(style.actionLegendButton), actionLegend = E(style.actionLegend, E(style.actionLegendArrow), E(style.actionLegendRow, E(extend({
    backgroundColor: 'green'
  }, style.actionLegendCircle)), text('ثبت شده')), E(style.actionLegendRow, E(extend({
    backgroundColor: '#c5c5c5'
  }, style.actionLegendCircle)), text('قفل شده')), E(style.actionLegendRow, E(extend({
    backgroundColor: 'black'
  }, style.actionLegendCircle)), text('فعال'))), actionButtonInstance = E(actionButton, {
    noButtonFunctionality: true,
    placeholder: 'ارسال درخواست',
    items: actionButtonItemTexts = ['درخواست مصاحبه تلفنی', 'درخواست مصاحبه فنی', 'درخواست مصاحبه عمومی']
  })), statusPlaceholder = E(style.status), E(style.tabs, tabs = tabNames.map(function(tabName, index) {
    var tab;
    if (index === 0) {
      tab = E(style.tabUser, E({
        "class": 'fa fa-user-o',
        marginLeft: 5
      }), text(applicant.firstName + " " + applicant.lastName));
    } else {
      tab = E(style.tab, tabName);
    }
    onEvent(tab, 'click', function() {
      return changeTabIndex(index);
    });
    onEvent(tab, 'mouseover', function() {
      return setStyle(tab, style.tabActive);
    });
    onEvent(tab, 'mouseout', function() {
      if (currentTabIndex !== index) {
        if (index === 0) {
          return setStyle(tab, style.tabUser);
        } else {
          return setStyle(tab, style.tab);
        }
      }
    });
    return tab;
  })), contents = E(style.contents));
  state.user.on({
    once: true
  }, function(user) {
    if (user.userType === 1) {
      return hide(printButton);
    } else {
      return hide(actionButtonPlaceholder);
    }
  });
  onEvent(printButton, 'mouseover', function() {
    return setStyle(printButton, style.printButtonHover);
  });
  onEvent(printButton, 'mouseout', function() {
    return setStyle(printButton, style.printButton);
  });
  onEvent(printButton, 'click', function() {
    return window.open('#print_' + applicant.userId, '_blank');
  });
  state.all(['applicants', 'user'], function(arg2) {
    var applicants, applicantsHRStatus, editStatusButton, ts, user;
    applicants = arg2[0], user = arg2[1];
    applicant = applicants.filter(function(arg3) {
      var userId;
      userId = arg3.userId;
      return userId === applicant.userId;
    })[0];
    actionButtonItemTexts.forEach(function(s, i) {
      var item;
      item = actionButtonInstance.items()[i];
      setStyle(item, {
        color: 'black'
      });
      if (applicant.applicantsHRStatus.some(function(arg3) {
        var ref, status;
        status = arg3.status;
        return (ref = logic.statuses[status]) === 'در انتظار مصاحبه فنی' || ref === 'در انتظار مصاحبه عمومی';
      })) {
        setStyle(item, {
          color: '#c5c5c5'
        });
      }
      if (s === 'درخواست مصاحبه تلفنی' && (applicant.applicantsHRStatus.some(function(arg3) {
        var status;
        status = arg3.status;
        return logic.statuses[status] === 'مصاحبه تلفنی انجام دش';
      }))) {
        setStyle(item, {
          color: '#c5c5c5'
        });
      }
      if (applicant.applicantsManagerStatus.some(function(arg3) {
        var managerId;
        managerId = arg3.managerId;
        return managerId === user.userId;
      })) {
        setStyle(item, {
          color: '#c5c5c5'
        });
      }
      if (applicant.applicantsManagerStatus.some(function(arg3) {
        var managerId, status;
        managerId = arg3.managerId, status = arg3.status;
        return logic.statuses[status] === s && managerId === user.userId;
      })) {
        return setStyle(item, {
          color: 'green'
        });
      }
    });
    ts = [];
    editStatusButton = void 0;
    empty(statusPlaceholder);
    append(statusPlaceholder, E(style.statusSegment, E(style.statusCircle), E(extend({
      "class": 'fa fa-check'
    }, style.statusIcon)), (function() {
      var t;
      t = E(style.statusText, 'ثبت');
      ts.push(t);
      return t;
    })()));
    applicantsHRStatus = applicant.applicantsHRStatus.filter(function(arg3) {
      var ref, status;
      status = arg3.status;
      return (ref = logic.statuses[status]) === 'مصاحبه تلفنی انجام شد' || ref === 'در انتظار مصاحبه عمومی' || ref === 'در انتظار مصاحبه فنی' || ref === 'بایگانی' || ref === 'بازیابی';
    });
    append(statusPlaceholder, applicantsHRStatus.map(function(status, i, arr) {
      return [
        E(style.statusConnector), (function() {
          var ref, x;
          x = E(style.statusSegment, E(i === arr.length - 1 ? style.statusCircleActive : style.statusCircle), E(extend({
            "class": i === arr.length - 1 ? 'fa fa-question' : 'fa fa-check'
          }, style.statusIcon)), (function() {
            var t;
            t = logic.statuses[status.status];
            t = (function() {
              switch (t) {
                case 'مصاحبه تلفنی انجام شد':
                  return 'مصاحبه تلفنی';
                case 'در انتظار مصاحبه عمومی':
                  return 'مصاحبه عمومی';
                case 'در انتظار مصاحبه فنی':
                  return 'مصاحبه فنی';
                case 'بایگانی':
                  return 'بایگانی';
                case 'بازیابی':
                  return 'بازیابی';
              }
            })();
            t = E((i === arr.length - 1 ? style.statusTextActive : style.statusText), t);
            ts.push(t);
            return t;
          })());
          if (i === arr.length - 1 && !isInArchive && ((ref = logic.statuses[status.status]) !== 'بایگانی' && ref !== 'بازیابی')) {
            editStatusButton = x;
          } else {
            onEvent(x, 'click', function() {
              return viewStatus(applicant, status);
            });
          }
          return x;
        })()
      ];
    }));
    if (!isInArchive) {
      state.user.on({
        once: true
      }, function(user) {
        var changeStatusButton;
        if (user.userType === 2) {
          append(statusPlaceholder, [
            E(style.statusConnectorActive), changeStatusButton = E(style.statusSegment, E(style.statusCirclePlus), E(style.statusIconPlus), (function() {
              var t;
              t = E(style.statusText, 'ایجاد وضعیت');
              ts.push(t);
              return t;
            })())
          ]);
          onEvent(changeStatusButton, 'click', function() {
            return changeStatus(loadbarInstance, applicant);
          });
          if (editStatusButton) {
            return onEvent(editStatusButton, 'click', function() {
              return changeStatus(loadbarInstance, applicant, applicantsHRStatus[applicantsHRStatus.length - 1]);
            });
          }
        }
      });
    }
    return setTimeout(function() {
      return ts.forEach(function(t) {
        return setStyle(t, {
          marginRight: -t.fn.element.offsetWidth / 2 + 15
        });
      });
    });
  });
  actionButtonInstance.onSelect(function(value) {
    return state.user.on({
      once: true
    }, function(user) {
      if (applicant.applicantsHRStatus.some(function(arg2) {
        var ref, status;
        status = arg2.status;
        return (ref = logic.statuses[status]) === 'در انتظار مصاحبه فنی' || ref === 'در انتظار مصاحبه عمومی';
      })) {
        return;
      }
      if (value === 'درخواست مصاحبه تلفنی' && (applicant.applicantsHRStatus.some(function(arg2) {
        var status;
        status = arg2.status;
        return logic.statuses[status] === 'مصاحبه تلفنی انجام دشه';
      }))) {
        return;
      }
      if (applicant.applicantsManagerStatus.some(function(arg2) {
        var managerId;
        managerId = arg2.managerId;
        return managerId === user.userId;
      })) {
        return;
      }
      if (!confirm("بعد از ثبت امکان حذف یا ویرایش وجود ندارد. آیا از " + value + " اطمینان دارید؟")) {
        return;
      }
      loadbarInstance.set();
      return service.changeManagerStatus(applicant.userId, logic.statuses.indexOf(value)).then(loadbarInstance.reset);
    });
  });
  actionLegendVisible = false;
  onEvent(actionLegendButton, 'click', function() {
    actionLegendVisible = !actionLegendVisible;
    if (actionLegendVisible) {
      return setStyle(actionLegend, style.actionLegendVisible);
    } else {
      return setStyle(actionLegend, style.actionLegend);
    }
  });
  changeTabIndex = function(index) {
    if (content) {
      destroy(content);
    }
    if (currentTabIndex === 0) {
      setStyle(tabs[currentTabIndex], style.tabUser);
    } else {
      setStyle(tabs[currentTabIndex], style.tab);
    }
    currentTabIndex = index;
    append(contents, content = E(tabContents[currentTabIndex], {
      applicant: applicant
    }));
    return setStyle(tabs[currentTabIndex], style.tabActive);
  };
  changeTabIndex(0);
  onEvent(indexLink, 'click', function() {
    if (isInArchive) {
      return gotoArchive();
    } else {
      return gotoIndex();
    }
  });
  return view;
});


},{"../../../components/actionButton":2,"../../../components/loadbar":18,"../../../utils":38,"../../../utils/component":34,"../../../utils/logic":40,"./changeStatus":94,"./style":97,"./tab0":98,"./tab1":100,"./tab2":102,"./tab3":104,"./tab4":106,"./tab5":108,"./viewStatus":110}],97:[function(require,module,exports){
var extend;

extend = require('../../../utils').extend;

exports.loadbar = {
  width: '100%',
  height: 10
};

exports.indexLink = {
  color: '#449e73',
  cursor: 'pointer'
};

exports.profileBreadCrumb = {};

exports.action = {
  position: 'absolute',
  top: 0,
  left: 0
};

exports.actionLegendButton = {
  position: 'absolute',
  top: 7,
  left: 217,
  width: 20,
  height: 20,
  borderRadius: 100,
  backgroundColor: '#c5c5c5',
  cursor: 'pointer',
  "class": 'fa fa-info',
  color: 'white',
  textAlign: 'center',
  lineHeight: 20
};

exports.actionLegend = {
  boxShadow: '0px 0px 15px 0px #aaa',
  position: 'absolute',
  left: 250,
  width: 150,
  height: 100,
  backgroundColor: '#c5c5c5',
  borderRadius: 3,
  transition: '0.2s',
  opacity: 0,
  visibility: 'hidden'
};

exports.actionLegendVisible = {
  opacity: 1,
  visibility: 'visible'
};

exports.actionLegendArrow = {
  position: 'absolute',
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderColor: 'transparent',
  left: -7,
  top: 10,
  borderWidth: '7px 7px 7px 0',
  borderRightColor: '#c5c5c5'
};

exports.actionLegendRow = {
  paddingTop: 13,
  paddingRight: 58,
  height: 30,
  position: 'relative'
};

exports.actionLegendCircle = {
  position: 'absolute',
  top: 15,
  right: 15,
  width: 15,
  height: 15,
  borderRadius: 100,
  border: '1px solid white'
};

exports.status = {
  marginTop: 20,
  height: 100
};

exports.statusSegment = {
  cursor: 'pointer',
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

exports.statusCirclePlus = extend({}, exports.statusCircle, {
  backgroundColor: 'white',
  border: '4px solid #449e73'
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

exports.statusIconPlus = extend({}, exports.statusIcon, {
  "class": 'fa fa-plus',
  color: '#ccc'
});

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
  padding: '5px 20px',
  transition: '0.2s',
  color: '#5c5555',
  borderBottom: '3px solid white'
};

exports.tabUser = extend({}, exports.tab, {
  backgroundColor: '#eee',
  borderBottom: '3px solid #eee'
});

exports.tabActive = {
  color: '#449e73',
  borderColor: '#449e73'
};

exports.contents = {
  marginTop: 30
};

exports.printButton = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 180,
  height: 30,
  lineHeight: 30,
  fontSize: 14,
  padding: '0 5px',
  border: '1px solid #ddd',
  cursor: 'pointer',
  borderRadius: 3,
  color: '#777',
  transition: '0.2s',
  backgroundColor: '#f5f5f5'
};

exports.printButtonHover = {
  backgroundColor: '#e5e5e5'
};


},{"../../../utils":38}],98:[function(require,module,exports){
var component, extend, monthToString, ref, style, toDate;

component = require('../../../../utils/component');

style = require('./style');

ref = require('../../../../utils'), extend = ref.extend, monthToString = ref.monthToString, toDate = ref.toDate;

module.exports = component('tab0', function(arg, arg1) {
  var E, applicant, birthdayString, dom;
  dom = arg.dom;
  applicant = arg1.applicant;
  E = dom.E;
  birthdayString = applicant.birthday.split('/');
  birthdayString[1] = monthToString(birthdayString[1]);
  birthdayString = [birthdayString[2], birthdayString[1], birthdayString[0]].join(' ');
  return E(null, E(style.column, E(style.section, E('img', extend({
    src: applicant.personalPic ? "/webApi/image?address=" + applicant.personalPic : 'assets/img/default-avatar-small.png'
  }, style.sectionCircle)), E(style.sectionText, E(style.sectionTitle, applicant.firstName + " " + applicant.lastName), E(style.regular, 'متولد ' + birthdayString), E(style.regular, 'کد ملی: ' + applicant.identificationCode), E(style.regular, 'تاریخ ثبت: ' + toDate(applicant.modificationTime)))), E(style.section, E(style.sectionCircle, E(extend({
    "class": 'fa fa-suitcase'
  }, style.sectionIcon))), E(style.sectionText, E(style.sectionTitle, 'شغل‌های درخواستی'), applicant.selectedJobs.map(function(arg2) {
    var jobName;
    jobName = arg2.jobName;
    return E(style.job, jobName);
  })))), E(style.column, E(style.section, E(style.sectionCircle, E(extend({
    "class": 'fa fa-phone'
  }, style.sectionIcon))), E(style.sectionText, E(style.sectionTitle, 'شماره تماس: ' + applicant.phoneNumber), E(style.regular, 'رایانامه: ' + applicant.email))), E(style.section, E(style.sectionCircle, E(extend({
    "class": 'fa fa-download'
  }, style.sectionIcon))), E(style.sectionText, E(style.sectionTitle, 'دریافت رزومه متقاضی'), E('a', extend({
    href: '/webApi/resume?address=' + applicant.resume
  }, style.resumeLink), 'دریافت رزومه')))));
});


},{"../../../../utils":38,"../../../../utils/component":34,"./style":99}],99:[function(require,module,exports){
exports.column = {
  display: 'inline-block',
  width: '50%'
};

exports.section = {
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


},{}],100:[function(require,module,exports){
var component, extend, monthToString, ref, style, toDate, toEnglish;

component = require('../../../../utils/component');

style = require('./style');

ref = require('../../../../utils'), extend = ref.extend, monthToString = ref.monthToString, toDate = ref.toDate, toEnglish = ref.toEnglish;

module.exports = component('tab1', function(arg, arg1) {
  var E, applicant, applicantData, birthdayString, dom, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref3, ref4, ref5, ref6, ref7, ref8, ref9, text;
  dom = arg.dom;
  applicant = arg1.applicant;
  E = dom.E, text = dom.text;
  if (!applicant.applicantData) {
    return E();
  }
  applicantData = applicant.applicantData;
  applicantData = JSON.parse(applicantData);
  birthdayString = applicant.birthday.split('/');
  birthdayString[1] = monthToString(birthdayString[1]);
  birthdayString = [birthdayString[2], birthdayString[1], birthdayString[0]].join(' ');
  return E(style.form, E(style.header, 'مشخصات فردی'), E(null, E(style.inlineSection, E(style.bold, 'جنسیت'), E(null, applicantData['مشخصات فردی']['جنسیت'])), E(style.inlineSection, E(style.bold, 'نام پدر'), E(null, applicantData['مشخصات فردی']['نام پدر'])), E(style.inlineSection, E(style.bold, 'کد ملی'), E(null, applicant.identificationCode)), E(style.inlineSection, E(style.bold, 'شماره شناسنامه'), E(null, applicantData['مشخصات فردی']['شماره شناسنامه'])), E(style.inlineSection, E(style.bold, 'محل صدور'), E(null, applicantData['مشخصات فردی']['محل صدور'])), E(style.inlineSection, E(style.bold, 'محل تولد'), E(null, applicantData['مشخصات فردی']['محل تولد'])), E(style.inlineSection, E(style.bold, 'ملیت'), E(null, applicantData['مشخصات فردی']['ملیت'])), E(style.inlineSection, E(style.bold, 'تابعیت'), E(null, applicantData['مشخصات فردی']['تابعیت'])), E(style.inlineSection, E(style.bold, 'دین'), E(null, applicantData['مشخصات فردی']['دین'])), E(style.inlineSection, E(style.bold, 'مذهب'), E(null, applicantData['مشخصات فردی']['مذهب'])), E(style.inlineSection, E(style.bold, 'تاریخ تولد'), E(null, applicantData['مشخصات فردی']['تاریخ تولد']))), E(null, E(style.inlineSection, E(style.bold, 'وضعیت تاهل'), E(null, applicantData['مشخصات فردی']['وضعیت تاهل'])), ((ref1 = applicantData['مشخصات فردی']) != null ? ref1['جنسیت'] : void 0) === 'مرد' ? [E(style.inlineSection, E(style.bold, 'وضعیت نظام وظیفه'), E(null, applicantData['مشخصات فردی']['وضعیت نظام وظیفه'])), ((ref2 = applicantData['مشخصات فردی']) != null ? ref2['وضعیت نظام وظیفه'] : void 0) === 'معاف' ? [E(style.inlineSection, E(style.bold, 'نوع معافیت'), E(null, applicantData['مشخصات فردی']['نوع معافیت'])), ((ref3 = applicantData['مشخصات فردی']) != null ? ref3['نوع معافیت'] : void 0) === 'معافیت پزشکی' ? E(style.inlineSection, E(style.bold, 'دلیل معافیت'), E(null, applicantData['مشخصات فردی']['دلیل معافیت'])) : void 0] : void 0] : void 0, ((ref4 = applicantData['مشخصات فردی']) != null ? ref4['وضعیت تاهل'] : void 0) !== 'مجرد' ? E(style.inlineSection, E(style.bold, 'تعداد فرزندان'), E(null, applicantData['مشخصات فردی']['تعداد فرزندان'])) : void 0, E(style.inlineSection, E(style.bold, 'تعداد افراد تحت تکفل'), E(null, applicantData['مشخصات فردی']['تعداد افراد تحت تکفل'])), E(style.inlineSection, E(style.bold, 'نام معرف'), E(null, applicantData['مشخصات فردی']['نام معرف']))), E(style.bold, 'ایمیل'), E(style.indent, E(style.inline, E({
    "class": 'fa fa-envelope'
  }), E(style.afterIcon, applicant.email)), (applicantData['مشخصات فردی']['ایمیل'] || []).map(function(x) {
    return E(style.inline, E({
      "class": 'fa fa-envelope'
    }), E(style.afterIcon, x));
  })), E(style.bold, 'تلفن همراه'), E(style.indent, E(style.inline, E({
    "class": 'fa fa-mobile'
  }), E(style.afterIcon, applicant.phoneNumber)), (applicantData['مشخصات فردی']['تلفن همراه'] || []).map(function(x) {
    return E(style.inline, E({
      "class": 'fa fa-mobile'
    }), E(style.afterIcon, x));
  })), E(style.bold, 'مشخصات سکونت دائم'), E(style.indent, E({
    "class": 'fa fa-map-marker'
  }), E(style.inline, applicantData['مشخصات فردی']['آدرس محل سکونت دائم'])), E(style.indent, E({
    "class": 'fa fa-phone'
  }), E(style.inline, applicantData['مشخصات فردی']['تلفن ثابت محل سکونت دائم'])), E(style.bold, 'مشخصات سکونت فعلی'), E(style.indent, E({
    "class": 'fa fa-map-marker'
  }), E(style.inline, applicantData['مشخصات فردی']['آدرس محل سکونت فعلی'])), E(style.indent, E({
    "class": 'fa fa-phone'
  }), E(style.inline, applicantData['مشخصات فردی']['تلفن ثابت محل سکونت فعلی'])), E(style.header, 'سوابق تحصیلی'), E('table', style.table, E('thead', null, E('tr', style.headerTr, E('th', null, 'مقطع'), E('th', null, 'رشته تحصیلی'), E('th', null, 'نام دانشگاه و شهر محل تحصیل'), E('th', null, 'سال ورود'), E('th', null, 'سال اخذ مدرک'), E('th', null, 'معدل'), E('th', null, 'عنوان پایان‌نامه'))), E('tbody', null, applicantData['سوابق تحصیلی']['سوابق تحصیلی'].map(function(x) {
    return E('tr', style.tr, E('td', null, x['مقطع']), E('td', null, x['رشته تحصیلی']), E('td', null, x['نام دانشگاه و شهر محل تحصیل']), E('td', null, x['سال ورود']), E('td', null, x['سال اخذ مدرک']), E('td', null, x['معدل']), E('td', null, x['عنوان پایان‌نامه']));
  }))), E(style.bold, 'آیا مایل به ادامه تحصیل در سال‌های آینده هستید؟'), E(null, applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید'] ? 'بله' : 'خیر'), ((ref5 = applicantData['سوابق تحصیلی']) != null ? ref5['مقطع و رشته‌ای که ادامه می‌دهید'] : void 0) ? [E(style.bold, 'مقطع و رشته‌ای که ادامه می‌دهید را ذکر کنید.'), E(null, applicantData['سوابق تحصیلی']['مقطع و رشته‌ای که ادامه می‌دهید'])] : void 0, E(style.header, 'توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها'), ((ref6 = applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']) != null ? ref6['مهارت‌ها'] : void 0) ? E('table', style.table, E('thead', null, E('tr', style.headerTr, E('th', null, 'شایستگی / مهارت'), E('th', null, 'علاقه به کار در این حوزه'), E('th', null, 'دانش و مهارت در این حوزه'))), E('tbody', null, applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']['مهارت‌ها'].map(function(x) {
    return E('tr', style.tr, E('td', null, x['شایستگی / مهارت']), E('td', null, x['علاقه به کار در این حوزه']), E('td', null, x['دانش و مهارت در این حوزه']));
  }))) : void 0, ((ref7 = applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']) != null ? ref7['دوره‌ها'] : void 0) ? E('table', style.table, E('thead', null, E('tr', style.headerTr, E('th', null, 'دوره'), E('th', null, 'برگزار کننده'), E('th', null, 'سال'))), E('tbody', null, applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']['دوره‌ها'].map(function(x) {
    return E('tr', style.tr, E('td', null, x['دوره']), E('td', null, x['برگزار کننده']), E('td', null, x['سال']));
  }))) : void 0, ((ref8 = applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']) != null ? ref8['نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده'] : void 0) ? [E(style.bold, 'نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده'), E(null, applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']['نکات تکمیلی قابل ذکر در دوره‌های آموزشی گذرانده شده'])] : void 0, ((ref9 = applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']) != null ? ref9['آثار علمی و عضویت در انجمن‌ها'] : void 0) ? [E(style.bold, 'آثار علمی و عضویت در انجمن‌ها'), E(null, applicantData['توانمندی‌ها، مهارت‌ها، دانش و شایستگی‌ها']['آثار علمی و عضویت در انجمن‌ها'])] : void 0, E(style.header, 'مهارت زبان انگلیسی'), E(style.column3, E(style.bold, 'مکالمه'), E(null, applicantData['مهارت زبان انگلیسی']['مکالمه'])), E(style.column3, E(style.bold, 'نوشتن'), E(null, applicantData['مهارت زبان انگلیسی']['نوشتن'])), E(style.column3, E(style.bold, 'خواندن'), E(null, applicantData['مهارت زبان انگلیسی']['خواندن'])), E(style.header, 'آخرین سوابق سازمانی و پروژه‌ای'), ((ref10 = applicantData['آخرین سوابق سازمانی و پروژه‌ای']) != null ? ref10['آخرین سوابق سازمانی و پروژه‌ای'] : void 0) ? applicantData['آخرین سوابق سازمانی و پروژه‌ای']['آخرین سوابق سازمانی و پروژه‌ای'].map(function(job) {
    var end, start;
    start = toEnglish(job['تاریخ شروع']).split('/');
    start[1] = monthToString(start[1]);
    start = [start[1], start[0]].join(' ');
    end = toEnglish(job['تاریخ پایان']).split('/');
    end[1] = monthToString(end[1]);
    end = [end[1], end[0]].join(' ');
    return E(style.job.job, E(style.job.date, "از " + start + " تا " + end), E(style.job.row, E(style.job['نام'], job['نام']), E(style.job['نوع فعالیت'], '--- ' + job['نوع فعالیت']), E(style.job['نام مدیر عامل'], '(به مدیریت ' + job['نام مدیر عامل'] + ')')), E(style.job.row, E(style.job['محدوده نشانی'], E(style.job.mapIcon), text(job['محدوده نشانی'])), E(style.job['تلفن'], E(style.job.phoneIcon), text(job['تلفن']))), E(extend({
      englishHtml: job['شرح مهمترین اقدامات صورت گرفته / مهمترین شرح وظایف'].replace(/\n/g, '<br />')
    }, style.job.row)), E(style.job.row, E(style.job.column, E(style.job.columnHeader, 'سمت'), E(null, job['سمت'])), E(style.job.column, E(style.job.columnHeader, 'آخرین خالص دریافتی'), E(null, toEnglish(job['آخرین خالص دریافتی']).replace(/\B(?=(\d{3})+(?!\d))/g, '،') + ' تومان')), E(style.job.column, E(style.job.columnHeader, 'علت خاتمه همکاری'), E(null, job['علت خاتمه همکاری'])), E(style.job.column, E(style.job.columnHeader, 'نوع همکاری'), E(null, job['نوع همکاری'])), E(style.job.column, E(style.job.columnHeader, 'مدیر مستقیم'), E(null, job['نام مدیر مستقیم'])), E(style.clearfix)));
  }) : void 0, E(style.header, 'سایر اطلاعات'), E(style.column3, E(style.bold, 'متقاضی چه نوع همکاری هستید؟'), E(null, applicantData['سایر اطلاعات']['متقاضی چه نوع همکاری هستید'])), E(style.column3, E(style.bold, 'از چه طریقی از فرصت شغلی در داتین مطلع شدید؟'), E(null, applicantData['سایر اطلاعات']['از چه طریقی از فرصت شغلی در داتین مطلع شدید'])), ((ref11 = applicantData['سایر اطلاعات']) != null ? ref11['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید'] : void 0) ? [E(style.column3, E(style.bold, 'از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید؟'), E(null, applicantData['سایر اطلاعات']['از چه تاریخی می‌توانید همکاری خود را با داتین آغاز کنید']))] : void 0, ((ref12 = applicantData['سایر اطلاعات']) != null ? ref12['نوع بیمه‌ای که تا‌به‌حال داشته‌اید'] : void 0) ? [E(style.column3, E(style.bold, 'نوع بیمه‌ای که تا‌به‌حال داشته‌اید؟'), E(null, applicantData['سایر اطلاعات']['نوع بیمه‌ای که تا‌به‌حال داشته‌اید']))] : void 0, E(style.column3, E(style.bold, 'مدت زمانی که بیمه بوده‌اید'), E(null, applicantData['سایر اطلاعات']['مدت زمانی که بیمه بوده‌اید'])), E(style.column3, E(style.bold, 'میزان دستمزد خالص درخواستی شما چقدر است؟'), E(null, (((ref13 = applicantData['سایر اطلاعات']) != null ? ref13['مقدار دستمزد'] : void 0) ? ((ref14 = applicantData['سایر اطلاعات']) != null ? ref14['مقدار دستمزد'] : void 0) + 'تومان - ' : '') + applicantData['سایر اطلاعات']['میزان دستمزد'])), E(style.seperator), E(style.boldSection, 'در صورتی که شغل مورد نظر شما نیاز به موارد زیر داشته باشد، آیا می‌توانید:'), E('table', null, E('tbody', null, E('tr', null, E('td', null, 'در ساعات اضافه کاری حضور داشته و کار کنید'), E('td', {
    paddingRight: 50
  }, applicantData['سایر اطلاعات']['در ساعات اضافه کاری حضور داشته و کار کنید'])), E('tr', null, E('td', null, 'در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید'), E('td', {
    paddingRight: 50
  }, applicantData['سایر اطلاعات']['در صورت لزوم در ساعات غیر اداری به شرکت مراجعه کنید'])), E('tr', null, E('td', null, 'در شیفت شب کار کنید'), E('td', {
    paddingRight: 50
  }, applicantData['سایر اطلاعات']['در شیفت شب کار کنید'])), E('tr', null, E('td', null, 'در تعطیلات آخر هفته کار کنید'), E('td', {
    paddingRight: 50
  }, applicantData['سایر اطلاعات']['در تعطیلات آخر هفته کار کنید'])), E('tr', null, E('td', null, 'در شهر تهران غیر از محل شرکت مشغول کار شوید'), E('td', {
    paddingRight: 50
  }, applicantData['سایر اطلاعات']['در شهر تهران غیر از محل شرکت مشغول کار شوید'])))), E(style.boldSection, 'مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند:'), E('table', style.table, E('thead', null, E('tr', style.headerTr, E('th', null, 'نام و نام خانوادگی'), E('th', null, 'نسبت با شما'), E('th', null, 'نام محل کار'), E('th', null, 'سمت'), E('th', null, 'شماره تماس'))), E('tbody', null, applicantData['سایر اطلاعات']['مشخصات دو نفر از کسانی که شما را بشناسند و توانایی کاری شما را تایید کنند'].map(function(x) {
    return E('tr', null, E('td', null, x['نام و نام خانوادگی']), E('td', null, x['نسبت با شما']), E('td', null, x['نام محل کار']), E('td', null, x['سمت']), E('td', null, x['شماره تماس']));
  }))), applicantData['سایر اطلاعات']['در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید'] ? [
    E(style.boldSection, 'در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید:'), E('table', style.table, E('thead', null, E('tr', style.headerTr, E('th', null, 'نام و نام خانوادگی'), E('th', null, 'سمت'), E('th', null, 'نام محل کار'), E('th', null, 'نسبت با شما'), E('th', null, 'شماره تماس'))), E('tbody', null, applicantData['سایر اطلاعات']['در صورتی که فردی از آشنایان و بستگان شما در شرکت داتین، گروه هولدینگ فناپ و یا گروه مالی پاسارگاد مشغول به کار هستند، نام ببرید'].map(function(x) {
      return E('tr', null, E('td', null, x['نام و نام خانوادگی']), E('td', null, x['سمت']), E('td', null, x['نام محل کار']), E('td', null, x['نسبت با شما']), E('td', null, x['شماره تماس']));
    })))
  ] : void 0, ((ref15 = applicantData['سایر اطلاعات']) != null ? ref15['ورزش‌های مورد علاقه'] : void 0) ? [E(style.boldSection, 'ورزش‌های مورد علاقه:'), E(null, (ref16 = applicantData['سایر اطلاعات']) != null ? ref16['ورزش‌های مورد علاقه'] : void 0)] : void 0, ((ref17 = applicantData['سایر اطلاعات']) != null ? ref17['زمینه‌های هنری مورد علاقه'] : void 0) ? [E(style.boldSection, 'زمینه‌های هنری مورد علاقه:'), E(null, (ref18 = applicantData['سایر اطلاعات']) != null ? ref18['زمینه‌های هنری مورد علاقه'] : void 0)] : void 0, E(style.boldSection, 'آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید؟'), E(null, ((ref19 = applicantData['سایر اطلاعات']) != null ? ref19['آیا به بیماری خاصی که نیاز به مراقبت‌های ویژه داشته‌باشد، مبتلا هستید، یا نقص عضو یا عمل جراحی مهمی داشته‌اید'] : void 0) || 'خیر'), ((ref20 = applicantData['سایر اطلاعات']) != null ? ref20['نوع آن را ذکر نمایید'] : void 0) ? (E(style.boldSection, 'نوع آن را ذکر نمایید.'), E(null, applicantData['سایر اطلاعات']['نوع آن را ذکر نمایید'])) : void 0, E(style.boldSection, 'آیا دخانیات مصرف می‌کنید؟'), E(null, ((ref21 = applicantData['سایر اطلاعات']) != null ? ref21['آیا دخانیات مصرف می‌کنید'] : void 0) || 'خیر'), E(style.boldSection, 'آیا سابقه محکومیت کیفری دارید؟'), E(null, ((ref22 = applicantData['سایر اطلاعات']) != null ? ref22['آیا سابقه محکومیت کیفری دارید'] : void 0) || 'خیر'), ((ref23 = applicantData['سایر اطلاعات']) != null ? ref23['تاریخ، دلایل و مدت آن را توضیح دهید'] : void 0) ? (E(style.boldSection, 'تاریخ، دلایل و مدت آن را توضیح دهید.'), E(null, applicantData['سایر اطلاعات']['تاریخ، دلایل و مدت آن را توضیح دهید'])) : void 0);
});


},{"../../../../utils":38,"../../../../utils/component":34,"./style":101}],101:[function(require,module,exports){
exports.clearfix = {
  clear: 'both'
};

exports.form = {
  paddingRight: 20
};

exports.header = {
  color: '#449e73',
  fontSize: 18,
  margin: '50px -20px 20px 0',
  height: 25,
  lineHeight: 25
};

exports.table = {
  width: '100%',
  marginBottom: 30
};

exports.tr = {
  height: 30
};

exports.headerTr = {
  height: 30,
  borderBottom: '1px solid #ccc'
};

exports.bold = {
  fontWeight: 'bold',
  margin: '30px 0 5px'
};

exports.boldSection = {
  fontWeight: 'bold',
  margin: '30px 0 15px'
};

exports.indent = {
  marginRight: 15
};

exports.inline = {
  display: 'inline-block',
  margin: '5px 15px 0 5px'
};

exports.inlineSection = {
  display: 'inline-block',
  margin: '5px 0 0 40px',
  height: 100
};

exports.afterIcon = {
  display: 'inline-block',
  marginRight: 5
};

exports.column3 = {
  display: 'inline-block',
  width: '33%'
};

exports.job = {};

exports.job.job = {
  position: 'relative',
  marginTop: 30,
  paddingBottom: 15,
  borderBottom: '1px solid #ccc'
};

exports.job.date = {
  position: 'absolute',
  top: 0,
  left: 5
};

exports.job.row = {
  margin: '20px 25px 0 20px'
};

exports.job['نام'] = {
  display: 'inline-block',
  marginRight: -15,
  fontSize: 16,
  fontWeight: 'bold'
};

exports.job['نوع فعالیت'] = {
  display: 'inline-block',
  marginRight: 10,
  color: '#aaa'
};

exports.job['نام مدیر عامل'] = {
  display: 'inline-block',
  marginRight: 30
};

exports.job['محدوده نشانی'] = {
  display: 'inline-block'
};

exports.job.mapIcon = {
  "class": 'fa fa-map-marker',
  marginLeft: 10
};

exports.job['تلفن'] = {
  display: 'inline-block',
  marginRight: 50
};

exports.job.phoneIcon = {
  "class": 'fa fa-phone',
  marginLeft: 10
};

exports.job.column = {
  float: 'right',
  width: '20%'
};

exports.job.columnHeader = {
  fontSize: 14,
  fontWeight: 'bold',
  marginBottom: 10
};

exports.seperator = {
  margin: '15px 0',
  borderBottom: '1px solid #ccc'
};


},{}],102:[function(require,module,exports){
var component, style;

component = require('../../../../utils/component');

style = require('./style');

module.exports = component('tab2', function(arg) {
  var E, dom;
  dom = arg.dom;
  E = dom.E;
  return E(null, 'آزمون');
});


},{"../../../../utils/component":34,"./style":103}],103:[function(require,module,exports){



},{}],104:[function(require,module,exports){
var component, style;

component = require('../../../../utils/component');

style = require('./style');

module.exports = component('tab3', function(arg) {
  var E, dom;
  dom = arg.dom;
  E = dom.E;
  return E(null, 'یادداشت');
});


},{"../../../../utils/component":34,"./style":105}],105:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"dup":103}],106:[function(require,module,exports){
var component, extend, logic, ref, style, toDate, toTime;

component = require('../../../../utils/component');

style = require('./style');

logic = require('../../../../utils/logic');

ref = require('../../../../utils'), extend = ref.extend, toDate = ref.toDate, toTime = ref.toTime;

module.exports = component('tab4', function(arg, arg1) {
  var E, append, applicant, body, dom, empty, service, state, text, view;
  dom = arg.dom, state = arg.state, service = arg.service;
  applicant = arg1.applicant;
  E = dom.E, text = dom.text, empty = dom.empty, append = dom.append;
  view = E('table', style.table, E('thead', null, E('tr', null, E('th', null, 'نام مسئول'), E('th', null, 'تغییر'), E('th', null, 'زمان تغییر'), E('th', null, 'تاریخ تغییر'))), body = E('tbody'));
  service.loadApplicantHistory({
    applicantId: applicant.userId
  }).then(function(history) {
    empty(body);
    return state.all(['hrUsers', 'managers', 'jobs'], {
      once: true
    }, function(arg2) {
      var hrUsers, jobs, managers;
      hrUsers = arg2[0], managers = arg2[1], jobs = arg2[2];
      return append(body, history.sort(function(a, b) {
        return b.actionTime - a.actionTime;
      }).map(function(arg3, i) {
        var actionTime, actionType, chosenTime, hrUserId, job, jobId, manager, managerId, owner, txt;
        actionTime = arg3.actionTime, actionType = arg3.actionType, hrUserId = arg3.hrUserId, managerId = arg3.managerId, jobId = arg3.jobId, chosenTime = arg3.chosenTime;
        owner = (function() {
          switch (logic.actions[actionType]) {
            case 'ثبت شده':
            case 'اطلاعات تکمیل شد':
              return applicant;
            case 'درخواست مصاحبه تلفنی':
            case 'درخواست مصاحبه عمومی':
            case 'درخواست مصاحبه فنی':
              return managers.filter(function(arg4) {
                var userId;
                userId = arg4.userId;
                return userId === managerId;
              })[0];
            case 'مصاحبه تلفنی انجام شد':
            case 'در انتظار مصاحبه عمومی':
            case 'در انتظار مصاحبه فنی':
            case 'مراحل اداری':
            case 'جذب':
            case 'بایگانی':
            case 'مصاحبه حذف شد':
            case 'مصاحبه ویرایش شد':
              return hrUsers.filter(function(arg4) {
                var userId;
                userId = arg4.userId;
                return userId === hrUserId;
              })[0];
          }
        })();
        txt = logic.actions[actionType] + (function() {
          switch (logic.actions[actionType]) {
            case 'ثبت شده':
            case 'اطلاعات تکمیل شد':
            case 'مراحل اداری':
            case 'جذب':
            case 'بایگانی':
            case 'مصاحبه حذف شد':
            case 'مصاحبه ویرایش شد':
            case 'درخواست مصاحبه تلفنی':
            case 'درخواست مصاحبه عمومی':
            case 'درخواست مصاحبه فنی':
            case 'مصاحبه تلفنی انجام شد':
              return '';
            case 'در انتظار مصاحبه عمومی':
              return ". زمان مصاحبه: " + (toDate(chosenTime));
            case 'در انتظار مصاحبه فنی':
              manager = managers.filter(function(arg4) {
                var userId;
                userId = arg4.userId;
                return userId === managerId;
              })[0];
              job = jobs.filter(function(arg4) {
                var j;
                j = arg4.jobId;
                return j === jobId;
              })[0];
              return ". نام مدیر: " + manager.firstName + " " + manager.lastName + " - شغل: " + job.jobName + " - زمان مصاحبه: " + (toDate(chosenTime));
          }
        })();
        return E('tr', (i % 2 === 0 ? style.evenRow : style.row), E('td', null, E('img', extend({
          src: owner.personalPic ? "/webApi/image?address=" + owner.personalPic : 'assets/img/default-avatar-small.png'
        }, style.profilePicture)), text(owner.firstName + " " + owner.lastName)), E('td', null, txt), E('td', {
          width: 100
        }, toTime(actionTime)), E('td', {
          width: 100
        }, toDate(actionTime)));
      }));
    });
  });
  return view;
});


},{"../../../../utils":38,"../../../../utils/component":34,"../../../../utils/logic":40,"./style":107}],107:[function(require,module,exports){
exports.table = {
  width: '100%'
};

exports.row = {
  height: 45
};

exports.evenRow = {
  height: 45,
  backgroundColor: '#f6f6f6'
};

exports.profilePicture = {
  width: 30,
  height: 30,
  borderRadius: 100,
  marginLeft: 5
};


},{}],108:[function(require,module,exports){
var component, style;

component = require('../../../../utils/component');

style = require('./style');

module.exports = component('tab5', function(arg) {
  var E, dom;
  dom = arg.dom;
  E = dom.E;
  return E(null, 'نتایج مصاحبه');
});


},{"../../../../utils/component":34,"./style":109}],109:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"dup":103}],110:[function(require,module,exports){
var alert, component, logic, ref, style, toDate, toTime;

style = require('./style');

component = require('../../../../utils/component');

alert = require('../../../../components/alert');

logic = require('../../../../utils/logic');

ref = require('../../../../utils'), toDate = ref.toDate, toTime = ref.toTime;

module.exports = function(applicant, status) {
  return component('viewStatus', function(arg) {
    var E, alertInstance, append, dom, events, hide, loading, onEvent, p, service, show, state, submit;
    dom = arg.dom, events = arg.events, state = arg.state, service = arg.service;
    E = dom.E, show = dom.show, hide = dom.hide, append = dom.append;
    onEvent = events.onEvent;
    alertInstance = alert('مشاهده وضعیت ...', E(style.alert, E(style.panel, hide(loading = E(null, 'در حال بارگزاری...')), p = E(), submit = E(style.submit, 'بستن'))));
    switch (logic.statuses[status.status]) {
      case 'مصاحبه تلفنی انجام شد':
        append(p, E(null, 'مصاحبه تلفنی انجام شد.'));
        break;
      case 'در انتظار مصاحبه فنی':
        show(loading);
        service.loadInterview({
          statusId: status.statusHRId
        }).then(function(arg1) {
          var interViewTime, jobId, managerId;
          interViewTime = arg1.interViewTime, jobId = arg1.jobId, managerId = arg1.managerId;
          hide(loading);
          return state.managers.on({
            once: true
          }, function(managers) {
            var job, manager;
            job = applicant.selectedJobs.filter(function(arg2) {
              var j;
              j = arg2.jobId;
              return j === jobId;
            })[0];
            manager = managers.filter(function(arg2) {
              var userId;
              userId = arg2.userId;
              return userId === managerId;
            })[0];
            return append(p, E(null, "مصاحبه فنی انجام شد. نام مدیر: " + manager.firstName + " " + manager.lastName + " - شغل: " + job.jobName + " - زمان مصاحبه: " + (toDate(interViewTime))));
          });
        });
        break;
      case 'در انتظار مصاحبه عمومی':
        show(loading);
        service.loadInterview({
          statusId: status.statusHRId
        }).then(function(arg1) {
          var interViewTime;
          interViewTime = arg1.interViewTime;
          hide(loading);
          return append(p, E(null, "مصاحبه عمومی انجام شد. زمان مصاحبه: " + (toDate(interViewTime))));
        });
        break;
      case 'بایگانی':
        append(p, E(null, "در تاریخ " + (toDate(status.modificationTime)) + " ساعت " + (toTime(status.modificationTime)) + " بایگانی شد."));
        break;
      case 'بازیابی':
        append(p, E(null, "در تاریخ " + (toDate(status.modificationTime)) + " ساعت " + (toTime(status.modificationTime)) + " بازیابی شد."));
    }
    onEvent(submit, 'click', alertInstance.close);
    return alertInstance;
  })();
};


},{"../../../../components/alert":6,"../../../../utils":38,"../../../../utils/component":34,"../../../../utils/logic":40,"./style":111}],111:[function(require,module,exports){
exports.alert = {
  backgroundColor: '#eee',
  padding: 10,
  textAlign: 'center'
};

exports.panel = {
  position: 'relative',
  minHeight: 150,
  padding: 20,
  textAlign: 'center'
};

exports.submit = {
  padding: 10,
  borderRadius: 5,
  position: 'absolute',
  cursor: 'pointer',
  textAlign: 'center',
  color: 'white',
  bottom: 10,
  width: 100,
  left: 10,
  transition: '0.2s',
  backgroundColor: '#459d73'
};


},{}],112:[function(require,module,exports){
var component, dateInput, dropdown, logic, ref, style, textIsInSearch, toDate, toEnglish, toTimestamp;

component = require('../../../../utils/component');

style = require('./style');

dropdown = require('../../../../components/dropdown');

dateInput = require('../../../../components/dateInput');

logic = require('../../../../utils/logic');

ref = require('../../../../utils'), textIsInSearch = ref.textIsInSearch, toEnglish = ref.toEnglish, toTimestamp = ref.toTimestamp, toDate = ref.toDate;

module.exports = component('search', function(arg) {
  var E, append, changeListener, destroy, dom, empty, events, hide, isInSearch, onEvent, remove, removeListener, rest, returnObject, setStyle, show, typeDropdown, view;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  E = dom.E, setStyle = dom.setStyle, append = dom.append, empty = dom.empty, destroy = dom.destroy, show = dom.show, hide = dom.hide;
  onEvent = events.onEvent;
  changeListener = removeListener = void 0;
  isInSearch = function() {
    return true;
  };
  typeDropdown = E(dropdown, {
    items: [0, 1, 2, 3, 4, 5],
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
        case 5:
          return 'شناسه';
      }
    }
  });
  setStyle(typeDropdown, style.inputPlaceholder);
  setStyle(typeDropdown.input, style.placeholderInput);
  view = E({
    margin: 20
  }, typeDropdown, rest = E(style.rest), remove = E(style.remove));
  typeDropdown.onChange(function() {
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
              items: [0, 1, 2],
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
            _dateInput = E(dateInput);
            setStyle(_dateInput, style.inputPlaceholder);
            setStyle(_dateInput.input, style.placeholderInput);
            dateDropdown.onChange(function() {
              return typeof changeListener === "function" ? changeListener() : void 0;
            });
            onEvent(_dateInput.input, ['input', 'pInput'], function() {
              return typeof changeListener === "function" ? changeListener() : void 0;
            });
            isInSearch = function(arg1) {
              var modificationTime, time;
              modificationTime = arg1.modificationTime;
              if (!_dateInput.valid()) {
                return true;
              }
              if (dateDropdown.value() == null) {
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
              var selectedJobs;
              selectedJobs = arg1.selectedJobs;
              return !jobsInput.value() || selectedJobs.some(function(arg2) {
                var jobName;
                jobName = arg2.jobName;
                return textIsInSearch(jobName.toLowerCase(), jobsInput.value());
              });
            };
            return jobsInput;
          })();
        case 3:
          return (function() {
            var stateDropdown;
            stateDropdown = E(dropdown, {
              items: [0, 1, 2, 3],
              getTitle: function(x) {
                switch (x) {
                  case 0:
                    return 'ثبت شده';
                  case 1:
                    return 'مصاحبه تلفنی انجام شد';
                  case 2:
                    return 'در انتظار مصاحبه فنی';
                  case 3:
                    return 'در انتظار مصاحبه عمومی';
                }
              }
            });
            setStyle(stateDropdown, style.inputPlaceholder);
            setStyle(stateDropdown.input, style.placeholderInput);
            stateDropdown.onChange(function() {
              return typeof changeListener === "function" ? changeListener() : void 0;
            });
            isInSearch = function(arg1) {
              var applicantsHRStatus;
              applicantsHRStatus = arg1.applicantsHRStatus;
              if (stateDropdown.value() == null) {
                return true;
              }
              switch (stateDropdown.value()) {
                case 0:
                  return applicantsHRStatus.length === 0;
                case 1:
                  return logic.statuses[applicantsHRStatus[applicantsHRStatus.length - 1].status] === 'مصاحبه تلفنی انجام شد';
                case 2:
                  return logic.statuses[applicantsHRStatus[applicantsHRStatus.length - 1].status] === 'در انتظار مصاحبه فنی';
                case 3:
                  return logic.statuses[applicantsHRStatus[applicantsHRStatus.length - 1].status] === 'در انتظار مصاحبه عمومی';
              }
            };
            return stateDropdown;
          })();
        case 4:
          return (function() {
            var notesDropdown;
            notesDropdown = E(dropdown, {
              items: [0, 1],
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
            notesDropdown.onChange(function() {
              return typeof changeListener === "function" ? changeListener() : void 0;
            });
            isInSearch = function() {
              if (notesDropdown.value() == null) {
                return true;
              }
              switch (notesDropdown.value()) {
                case 0:
                  return true;
                case 1:
                  return false;
              }
            };
            return notesDropdown;
          })();
        case 5:
          return (function() {
            var dateRelatedIdInput;
            dateRelatedIdInput = E('input', style.input);
            onEvent(dateRelatedIdInput, 'input', function() {
              return typeof changeListener === "function" ? changeListener() : void 0;
            });
            isInSearch = function(arg1) {
              var dateRelatedId;
              dateRelatedId = arg1.dateRelatedId;
              return !dateRelatedIdInput.value() || textIsInSearch(String(dateRelatedId), dateRelatedIdInput.value());
            };
            return dateRelatedIdInput;
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


},{"../../../../components/dateInput":12,"../../../../components/dropdown":14,"../../../../utils":38,"../../../../utils/component":34,"../../../../utils/logic":40,"./style":113}],113:[function(require,module,exports){
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


},{"../../../../utils":38}],114:[function(require,module,exports){
var component, criterion, ref, remove, style, textIsInSearch;

component = require('../../../utils/component');

style = require('./style');

criterion = require('./criterion');

ref = require('../../../utils'), remove = ref.remove, textIsInSearch = ref.textIsInSearch;

module.exports = component('search', function(arg) {
  var E, add, addCriterion, append, arrow, arrowBorder, criteria, criteriaPlaceholder, disable, dom, empty, enable, events, isActive, onChangeListener, onEvent, panel, returnObject, searchbox, setStyle, settings, view;
  dom = arg.dom, events = arg.events, returnObject = arg.returnObject;
  E = dom.E, empty = dom.empty, append = dom.append, setStyle = dom.setStyle, enable = dom.enable, disable = dom.disable;
  onEvent = events.onEvent;
  onChangeListener = void 0;
  view = E('span', null, searchbox = E('input', style.searchbox), settings = E(style.settings), E(style.divider), panel = E(style.panel, arrowBorder = E(style.arrowBorder), arrow = E(style.arrow), criteriaPlaceholder = E(), E(style.pannelInner, add = E(style.add))));
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
      var dateRelatedId, firstName, lastName, selectedJobs, state, value;
      if (isActive) {
        return criteria.every(function(arg1) {
          var isInSearch;
          isInSearch = arg1.isInSearch;
          return isInSearch(applicant);
        });
      } else {
        firstName = applicant.firstName, lastName = applicant.lastName, selectedJobs = applicant.selectedJobs, state = applicant.state, dateRelatedId = applicant.dateRelatedId;
        value = searchbox.value();
        return textIsInSearch(firstName + " " + lastName, value) || textIsInSearch(String(dateRelatedId), value) || selectedJobs.some(function(arg1) {
          var jobName;
          jobName = arg1.jobName;
          return textIsInSearch(jobName.toLowerCase(), value);
        });
      }
    },
    onChange: function(listener) {
      return onChangeListener = listener;
    }
  });
  return view;
});


},{"../../../utils":38,"../../../utils/component":34,"./criterion":112,"./style":115}],115:[function(require,module,exports){
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


},{"../../../utils":38}],116:[function(require,module,exports){
var actionModifiable, component, extend, ref, ref1, statuses, style, toDate, toTime, window;

component = require('../../../utils/component');

style = require('./style');

ref = require('../../../utils'), extend = ref.extend, toDate = ref.toDate, toTime = ref.toTime;

ref1 = require('../../../utils/logic'), statuses = ref1.statuses, actionModifiable = ref1.actionModifiable;

window = require('../../../utils/dom').window;

module.exports = component('sidebar', function(arg, arg1) {
  var E, append, clearAllNotifications, dom, empty, events, gotoApplicant, gotoArchive, gotoIndex, linkIndex, links, logout, name, notificationsActive, notificationsBadge, notificationsIcon, notificationsPanel, notificationsPlaceholder, onEvent, onResize, position, profileImg, resize, service, setStyle, state, text, view;
  dom = arg.dom, state = arg.state, events = arg.events, service = arg.service;
  gotoIndex = arg1.gotoIndex, gotoApplicant = arg1.gotoApplicant, gotoArchive = arg1.gotoArchive;
  E = dom.E, text = dom.text, setStyle = dom.setStyle, empty = dom.empty, append = dom.append;
  onEvent = events.onEvent, onResize = events.onResize;
  view = E(style.sidebar, notificationsPlaceholder = E(style.notifications, E(style.notificationsHeader, clearAllNotifications = E(style.clearAllNotifications, 'پاک شدن همه')), notificationsPanel = E()), E(style.profile, profileImg = E('img', style.profileImg)), name = E(style.name), position = E(style.title), logout = E(extend({
    "class": 'fa fa-power-off'
  }, style.icon, {
    marginRight: 30
  })), E(extend({
    "class": 'fa fa-sliders'
  }, style.icon)), notificationsIcon = E(extend({
    "class": 'fa fa-bell-o'
  }, style.icon), notificationsBadge = E(style.badge)), E(style.divider), E(style.links), links = [
    E(style.link, E(extend({
      "class": 'fa fa-file-text-o'
    }, style.linkIcon)), text('رزومه‌ها')), E(style.link, E(extend({
      "class": 'fa fa-calendar'
    }, style.linkIcon)), text('تقویم')), E(style.link, E(extend({
      "class": 'fa fa-database'
    }, style.linkIcon)), text('فرصت‌های شغلی')), E(style.link, E(extend({
      "class": 'fa fa-folder'
    }, style.linkIcon)), text('بایگانی'))
  ]);
  linkIndex = 0;
  links.forEach(function(link, i) {
    if (linkIndex === i) {
      setStyle(link, style.linkActive);
    }
    onEvent(link, 'click', function() {
      switch (i) {
        case 0:
          gotoIndex();
          break;
        case 3:
          gotoArchive();
      }
      linkIndex = i;
      setStyle(links, style.link);
      return setStyle(link, style.linkActive);
    });
    onEvent(link, 'mouseover', function() {
      if (linkIndex !== i) {
        return setStyle(link, style.linkHover);
      }
    });
    return onEvent(link, 'mouseout', function() {
      if (linkIndex !== i) {
        return setStyle(link, style.link);
      }
    });
  });
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
  onEvent(E(window), 'scroll', resize);
  onEvent(profileImg, 'load', function() {
    var height, isPortriat, ref2, right, top, width;
    ref2 = profileImg.fn.element, width = ref2.width, height = ref2.height;
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
  notificationsActive = false;
  state.all(['notifications', 'applicants'], function(arg2) {
    var applicants, notifications;
    notifications = arg2[0], applicants = arg2[1];
    if (notifications != null ? notifications.length : void 0) {
      setStyle(notificationsBadge, style.badgeActive);
      setStyle(notificationsBadge, {
        text: notifications.length
      });
    } else {
      setStyle(notificationsBadge, style.badge);
      setStyle(notificationsBadge, {
        text: ''
      });
    }
    empty(notificationsPanel);
    return append(notificationsPanel, notifications.map(function(notification) {
      var applicant, notificationElement;
      applicant = applicants.filter(function(arg3) {
        var userId;
        userId = arg3.userId;
        return notification.applicantId === userId;
      })[0];
      notificationElement = E(style.notification, E('img', extend({
        src: notification.userPersonalPic ? '/webApi/image?address=' + notification.userPersonalPic : 'assets/img/default-avatar-small.png'
      }, style.notificationPersonalPic)), E(style.notificationUserName, notification.userName), E(style.notificationAction, statuses[notification.status]), E(style.notificationTime, (toDate(notification.time)) + " " + (toTime(notification.time))), E('a', extend({
        href: '/webApi/resume?address=' + applicant.resume
      }, style.notificationResume), E(style.notificationIcon), text(applicant.firstName + ' ' + applicant.lastName)));
      onEvent(notificationElement, 'mouseover', function() {
        return setStyle(notificationElement, style.notificationHover);
      });
      onEvent(notificationElement, 'mouseout', function() {
        return setStyle(notificationElement, style.notification);
      });
      onEvent(notificationElement, 'click', function() {
        gotoApplicant(applicant);
        notificationsActive = false;
        setStyle(notificationsIcon, style.icon);
        return setStyle(notificationsPlaceholder, style.notifications);
      });
      return notificationElement;
    }));
  });
  onEvent(notificationsIcon, 'click', function() {
    notificationsActive = !notificationsActive;
    if (notificationsActive) {
      setStyle(notificationsIcon, style.iconActive);
      return setStyle(notificationsPlaceholder, style.notificationsActive);
    } else {
      setStyle(notificationsIcon, style.icon);
      return setStyle(notificationsPlaceholder, style.notifications);
    }
  });
  onEvent(clearAllNotifications, 'click', function() {
    state.notifications.set([]);
    return service.clearAllNotifications();
  });
  return view;
});


},{"../../../utils":38,"../../../utils/component":34,"../../../utils/dom":36,"../../../utils/logic":40,"./style":117}],117:[function(require,module,exports){
var extend;

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

exports.icon = {
  color: 'white',
  float: 'right',
  cursor: 'pointer',
  margin: 10,
  padding: 10,
  fontSize: 20,
  borderRadius: 100,
  transition: '0.2s',
  backgroundColor: '#2b2e33',
  position: 'relative'
};

exports.iconActive = {
  backgroundColor: 'black'
};

exports.badge = {
  position: 'absolute',
  top: 5,
  left: 5,
  width: 15,
  height: 15,
  fontSize: 10,
  lineHeight: 15,
  borderRadius: 100,
  textAlign: 'center',
  transition: '0.2s',
  backgroundColor: 'transparent'
};

exports.badgeActive = {
  backgroundColor: 'red'
};

exports.divider = {
  marginTop: 100,
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
  color: 'white',
  paddingRight: 10,
  transition: '0.2s',
  borderLeft: '0px solid #449e73',
  backgroundColor: '#2b2e33'
};

exports.linkIcon = {
  fontSize: 20,
  margin: '0 10px',
  position: 'relative',
  top: 3
};

exports.linkHover = {
  borderLeftWidth: 10
};

exports.linkActive = {
  backgroundColor: '#449e73'
};

exports.notifications = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 200,
  zIndex: 1000,
  backgroundColor: 'white',
  boxShadow: '-10px 0px 15px 0px #aaa',
  overflowX: 'hidden',
  transition: '0.2s',
  opacity: 0,
  width: 0
};

exports.notificationsActive = {
  opacity: 1,
  width: 350
};

exports.notificationsHeader = {
  height: 30,
  backgroundColor: '#ddd',
  textAlign: 'left'
};

exports.clearAllNotifications = {
  backgroundColor: 'red',
  color: 'white',
  fontSize: 10,
  padding: 3,
  margin: 5,
  borderRadius: 3,
  display: 'inline-block',
  cursor: 'pointer'
};

exports.notification = {
  height: 80,
  position: 'relative',
  cursor: 'pointer',
  borderBottom: '1px solid #eee',
  transition: '0.2s',
  backgroundColor: 'white'
};

exports.notificationNotModifiable = {
  opacity: 0.5
};

exports.notificationHover = {
  backgroundColor: '#eee'
};

exports.notificationPersonalPic = {
  position: 'absolute',
  top: 10,
  right: 10,
  width: 30,
  height: 30,
  borderRadius: 100
};

exports.notificationUserName = {
  position: 'absolute',
  top: 10,
  right: 50
};

exports.notificationAction = {
  position: 'absolute',
  top: 45,
  right: 50
};

exports.notificationTime = {
  position: 'absolute',
  top: 10,
  left: 10,
  fontSize: 10,
  direction: 'ltr'
};

exports.notificationResume = {
  position: 'absolute',
  top: 45,
  left: 10,
  fontSize: 10,
  color: '#449e73'
};

exports.notificationIcon = {
  "class": 'fa fa-user',
  marginLeft: 5
};


},{"../../../utils":38}],118:[function(require,module,exports){
exports.contents = {
  marginRight: 250,
  marginTop: 50,
  marginLeft: 50,
  position: 'relative'
};

exports.profilePicture = {
  width: 30,
  height: 30,
  borderRadius: 100,
  marginLeft: 5
};

exports.iconTd = {};

exports.icon = {};

exports.action = {
  position: 'absolute',
  top: 0,
  left: 0
};

exports.profile = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  minHeight: '100%',
  backgroundColor: 'white',
  transition: '0.5s',
  opacity: 0,
  visibility: 'hidden'
};

exports.profileVisible = {
  opacity: 1,
  visibility: 'visible'
};


},{}],119:[function(require,module,exports){
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


},{"../../../utils":38,"./style":121}],120:[function(require,module,exports){
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


},{"../../../utils":38,"../../../utils/component":34,"./functions":119,"./style":121}],121:[function(require,module,exports){
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


},{"../../../utils":38}],122:[function(require,module,exports){
var Q, addPageCSS, addPageStyle, page, ref, service;

Q = require('./q');

service = require('./utils/service');

page = require('./page');

ref = require('./utils/dom'), addPageCSS = ref.addPageCSS, addPageStyle = ref.addPageStyle;

Q.longStackSupport = true;

addPageCSS('font-awesome/css/font-awesome.css');

addPageCSS('bootstrap.css');

addPageCSS('bootstrap-rtl.css');

addPageStyle("@font-face { font-family: iransans; src:url('assets/fonts/eot/IRANSansWeb.eot') format('eot'), url('assets/fonts/eot/IRANSansWeb_Bold.eot') format('eot'), url('assets/fonts/ttf/IRANSansWeb.ttf') format('truetype'), url('assets/fonts/ttf/IRANSansWeb_Bold.ttf') format('truetype'), url('assets/fonts/woff/IRANSansWeb.woff') format('woff'), url('assets/fonts/woff/IRANSansWeb_Bold.woff') format('woff'), url('assets/fonts/woff2/IRANSansWeb.woff2') format('woff2'), url('assets/fonts/woff2/IRANSansWeb_Bold.woff2') format('woff2'); } * { font-family: 'iransans', tahoma; direction: rtl; } .hidden { display: none; } input::selection { background: #ddd; } .alert { transition: all .15s linear; opacity: 0; visibility: hidden; } .alert.in { opacity: 1; visibility: visible; }");

document.title = 'سامانه جذب داتین';

service.autoPing();

service.getUser().then(function() {
  return page();
});


},{"./page":31,"./q":32,"./utils/dom":36,"./utils/service":44}]},{},[122]);
