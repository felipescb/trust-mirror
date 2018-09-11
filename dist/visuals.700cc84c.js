// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/visuals.js":[function(require,module,exports) {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// The MIT License (MIT)

// Typed.js | Copyright (c) 2014 Matt Boldt | www.mattboldt.com

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


!function ($) {

    "use strict";

    var Typed = function Typed(el, options) {

        // chosen element to manipulate text
        this.el = $(el);

        // options
        this.options = $.extend({}, $.fn.typed.defaults, options);

        // attribute to type into
        this.isInput = this.el.is('input');
        this.attr = this.options.attr;

        // show cursor
        this.showCursor = this.isInput ? false : this.options.showCursor;

        // text content of element
        this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text();

        // html or plain text
        this.contentType = this.options.contentType;

        // typing speed
        this.typeSpeed = this.options.typeSpeed;

        // add a delay before typing starts
        this.startDelay = this.options.startDelay;

        // backspacing speed
        this.backSpeed = this.options.backSpeed;

        // amount of time to wait before backspacing
        this.backDelay = this.options.backDelay;

        // div containing strings
        this.stringsElement = this.options.stringsElement;

        // input strings of text
        this.strings = this.options.strings;

        // character number position of current string
        this.strPos = 0;

        // current array position
        this.arrayPos = 0;

        // number to stop backspacing on.
        // default 0, can change depending on how many chars
        // you want to remove at the time
        this.stopNum = 0;

        // Looping logic
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 0;

        // for stopping
        this.stop = false;

        // custom cursor
        this.cursorChar = this.options.cursorChar;

        // shuffle the strings
        this.shuffle = this.options.shuffle;
        // the order of strings
        this.sequence = [];

        // All systems go!
        this.build();
    };

    Typed.prototype = {

        constructor: Typed,

        init: function init() {
            // begin the loop w/ first current string (global self.strings)
            // current string will be passed as an argument each time after this
            var self = this;
            self.timeout = setTimeout(function () {
                for (var i = 0; i < self.strings.length; ++i) {
                    self.sequence[i] = i;
                } // shuffle the array if true
                if (self.shuffle) self.sequence = self.shuffleArray(self.sequence);

                // Start typing
                self.typewrite(self.strings[self.sequence[self.arrayPos]], self.strPos);
            }, self.startDelay);
        },

        build: function build() {
            var self = this;
            // Insert cursor
            if (this.showCursor === true) {
                this.cursor = $("<span class=\"typed-cursor\">" + this.cursorChar + "</span>");
                this.el.after(this.cursor);
            }
            if (this.stringsElement) {
                self.strings = [];
                this.stringsElement.hide();
                var strings = this.stringsElement.find('p');
                $.each(strings, function (key, value) {
                    self.strings.push($(value).html());
                });
            }
            this.init();
        }

        // pass current string state to each function, types 1 char per call

        , typewrite: function typewrite(curString, curStrPos) {
            // exit when stopped
            if (this.stop === true) {
                return;
            }

            // varying values for setTimeout during typing
            // can't be global since number changes each time loop is executed
            var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            var self = this;

            // ------------- optional ------------- //
            // backpaces a certain string faster
            // ------------------------------------ //
            // if (self.arrayPos == 1){
            //  self.backDelay = 50;
            // }
            // else{ self.backDelay = 500; }

            // contain typing function in a timeout humanize'd delay
            self.timeout = setTimeout(function () {
                // check for an escape character before a pause value
                // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
                // single ^ are removed from string
                var charPause = 0;
                var substr = curString.substr(curStrPos);
                if (substr.charAt(0) === '^') {
                    var skip = 1; // skip atleast 1
                    if (/^\^\d+/.test(substr)) {
                        substr = /\d+/.exec(substr)[0];
                        skip += substr.length;
                        charPause = parseInt(substr);
                    }

                    // strip out the escape character and pause value so they're not printed
                    curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
                }

                if (self.contentType === 'html') {
                    // skip over html tags while typing
                    var curChar = curString.substr(curStrPos).charAt(0);
                    if (curChar === '<' || curChar === '&') {
                        var tag = '';
                        var endTag = '';
                        if (curChar === '<') {
                            endTag = '>';
                        } else {
                            endTag = ';';
                        }
                        while (curString.substr(curStrPos).charAt(0) !== endTag) {
                            tag += curString.substr(curStrPos).charAt(0);
                            curStrPos++;
                        }
                        curStrPos++;
                        tag += endTag;
                    }
                }

                // timeout for any pause after a character
                self.timeout = setTimeout(function () {
                    if (curStrPos === curString.length) {
                        // fires callback function
                        self.options.onStringTyped(self.arrayPos);

                        // is this the final string
                        if (self.arrayPos === self.strings.length - 1) {
                            // animation that occurs on the last typed string
                            self.options.callback();

                            self.curLoop++;

                            // quit if we wont loop back
                            if (self.loop === false || self.curLoop === self.loopCount) return;
                        }

                        self.timeout = setTimeout(function () {
                            self.backspace(curString, curStrPos);
                        }, self.backDelay);
                    } else {

                        /* call before functions if applicable */
                        if (curStrPos === 0) self.options.preStringTyped(self.arrayPos);

                        // start typing each new char into existing string
                        // curString: arg, self.el.html: original text inside element
                        var nextString = curString.substr(0, curStrPos + 1);
                        if (self.attr) {
                            self.el.attr(self.attr, nextString);
                        } else {
                            if (self.isInput) {
                                self.el.val(nextString);
                            } else if (self.contentType === 'html') {
                                self.el.html(nextString);
                            } else {
                                self.el.text(nextString);
                            }
                        }

                        // add characters one by one
                        curStrPos++;
                        // loop the function
                        self.typewrite(curString, curStrPos);
                    }
                    // end of character pause
                }, charPause);

                // humanized value for typing
            }, humanize);
        },

        backspace: function backspace(curString, curStrPos) {
            // exit when stopped
            if (this.stop === true) {
                return;
            }

            // varying values for setTimeout during typing
            // can't be global since number changes each time loop is executed
            var humanize = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
            var self = this;

            self.timeout = setTimeout(function () {

                // ----- this part is optional ----- //
                // check string array position
                // on the first string, only delete one word
                // the stopNum actually represents the amount of chars to
                // keep in the current string. In my case it's 14.
                // if (self.arrayPos == 1){
                //  self.stopNum = 14;
                // }
                //every other time, delete the whole typed string
                // else{
                //  self.stopNum = 0;
                // }

                if (self.contentType === 'html') {
                    // skip over html tags while backspacing
                    if (curString.substr(curStrPos).charAt(0) === '>') {
                        var tag = '';
                        while (curString.substr(curStrPos).charAt(0) !== '<') {
                            tag -= curString.substr(curStrPos).charAt(0);
                            curStrPos--;
                        }
                        curStrPos--;
                        tag += '<';
                    }
                }

                // ----- continue important stuff ----- //
                // replace text with base text + typed characters
                var nextString = curString.substr(0, curStrPos);
                if (self.attr) {
                    self.el.attr(self.attr, nextString);
                } else {
                    if (self.isInput) {
                        self.el.val(nextString);
                    } else if (self.contentType === 'html') {
                        self.el.html(nextString);
                    } else {
                        self.el.text(nextString);
                    }
                }

                // if the number (id of character in current string) is
                // less than the stop number, keep going
                if (curStrPos > self.stopNum) {
                    // subtract characters one by one
                    curStrPos--;
                    // loop the function
                    self.backspace(curString, curStrPos);
                }
                // if the stop number has been reached, increase
                // array position to next string
                else if (curStrPos <= self.stopNum) {
                        self.arrayPos++;

                        if (self.arrayPos === self.strings.length) {
                            self.arrayPos = 0;

                            // Shuffle sequence again
                            if (self.shuffle) self.sequence = self.shuffleArray(self.sequence);

                            self.init();
                        } else self.typewrite(self.strings[self.sequence[self.arrayPos]], curStrPos);
                    }

                // humanized value for typing
            }, humanize);
        }
        /**
         * Shuffles the numbers in the given array.
         * @param {Array} array
         * @returns {Array}
         */
        , shuffleArray: function shuffleArray(array) {
            var tmp,
                current,
                top = array.length;
            if (top) while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
            return array;
        }

        // Start & Stop currently not working

        // , stop: function() {
        //     var self = this;

        //     self.stop = true;
        //     clearInterval(self.timeout);
        // }

        // , start: function() {
        //     var self = this;
        //     if(self.stop === false)
        //        return;

        //     this.stop = false;
        //     this.init();
        // }

        // Reset and rebuild the element

        , reset: function reset() {
            var self = this;
            clearInterval(self.timeout);
            var id = this.el.attr('id');
            this.el.after('<span id="' + id + '"/>');
            this.el.remove();
            if (typeof this.cursor !== 'undefined') {
                this.cursor.remove();
            }
            // Send the callback
            self.options.resetCallback();
        }

    };

    $.fn.typed = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('typed'),
                options = (typeof option === "undefined" ? "undefined" : _typeof(option)) == 'object' && option;
            if (!data) $this.data('typed', data = new Typed(this, options));
            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        // typing speed
        typeSpeed: 0,
        // time before typing starts
        startDelay: 0,
        // backspacing speed
        backSpeed: 0,
        // shuffle the strings
        shuffle: false,
        // time before backspacing
        backDelay: 500,
        // loop
        loop: false,
        // false = infinite
        loopCount: false,
        // show cursor
        showCursor: true,
        // character for cursor
        cursorChar: "<span class='cursor'>|</span>",
        // attribute to type (null == text)
        attr: null,
        // either html or text
        contentType: 'html',
        // call when done callback function
        callback: function callback() {},
        // starting callback function before each string
        preStringTyped: function preStringTyped() {},
        //callback for every typed string
        onStringTyped: function onStringTyped() {},
        // callback for reset
        resetCallback: function resetCallback() {}
    };
}(window.jQuery);

/*
* rwdImageMaps jQuery plugin v1.5
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2013 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*/
;(function (a) {
    a.fn.rwdImageMaps = function () {
        var c = this;var b = function b() {
            c.each(function () {
                if (typeof a(this).attr("usemap") == "undefined") {
                    return;
                }var e = this,
                    d = a(e);a("<img />").load(function () {
                    var g = "width",
                        m = "height",
                        n = d.attr(g),
                        j = d.attr(m);if (!n || !j) {
                        var o = new Image();o.src = d.attr("src");if (!n) {
                            n = o.width;
                        }if (!j) {
                            j = o.height;
                        }
                    }var f = d.width() / 100,
                        k = d.height() / 100,
                        i = d.attr("usemap").replace("#", ""),
                        l = "coords";a('map[name="' + i + '"]').find("area").each(function () {
                        var r = a(this);if (!r.data(l)) {
                            r.data(l, r.attr(l));
                        }var q = r.data(l).split(","),
                            p = new Array(q.length);for (var h = 0; h < p.length; ++h) {
                            if (h % 2 === 0) {
                                p[h] = parseInt(q[h] / n * 100 * f);
                            } else {
                                p[h] = parseInt(q[h] / j * 100 * k);
                            }
                        }r.attr(l, p.toString());
                    });
                }).attr("src", d.attr("src"));
            });
        };a(window).resize(b).trigger("resize");return this;
    };
})(jQuery);
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '64971' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/visuals.js"], null)
//# sourceMappingURL=/visuals.700cc84c.map