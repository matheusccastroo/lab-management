__meteor_runtime_config__ = Object.assign(
  {
    meteorEnv: {},
    DDP_DEFAULT_CONNECTION_URL: "https://lab-management-univesp.herokuapp.com/",
  },
  window.__meteor_runtime_config__
);

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Package-scope variables */
  var global, meteorEnv, Meteor;

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/global.js                                                                            //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Export a reliable global object for all Meteor code.
    global = this;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/client_environment.js                                                                //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    var config = __meteor_runtime_config__;
    meteorEnv = config.meteorEnv;

    /**
     * @summary The Meteor namespace
     * @namespace Meteor
     */
    Meteor = {
      /**
       * @summary Boolean variable.  True if running in production environment.
       * @locus Anywhere
       * @static
       * @type {Boolean}
       */
      isProduction: meteorEnv.NODE_ENV === "production",

      /**
       * @summary Boolean variable.  True if running in development environment.
       * @locus Anywhere
       * @static
       * @type {Boolean}
       */
      isDevelopment: meteorEnv.NODE_ENV !== "production",

      /**
       * @summary Boolean variable.  True if running in client environment.
       * @locus Anywhere
       * @static
       * @type {Boolean}
       */
      isClient: true,

      /**
       * @summary Boolean variable.  True if running in server environment.
       * @locus Anywhere
       * @static
       * @type {Boolean}
       */
      isServer: false,

      /**
       * @summary Boolean variable.  True if running in Cordova environment.
       * @locus Anywhere
       * @static
       * @type {Boolean}
       */
      isCordova: false,

      /**
       * @summary Boolean variable. True if running in a "modern" JS
       *          environment, as determined by the `modern` package.
       * @locus Anywhere
       * @static
       * @type {Boolean}
       */
      isModern: config.isModern,
    };

    if (config.gitCommitHash) {
      /**
       * @summary Hexadecimal Git commit hash, if the application is using Git
       *          for version control. Undefined otherwise.
       * @locus Anywhere
       * @static
       * @type {String}
       */
      Meteor.gitCommitHash = config.gitCommitHash;
    }

    if (config.PUBLIC_SETTINGS) {
      /**
       * @summary `Meteor.settings` contains deployment-specific configuration options. You can initialize settings by passing the `--settings` option (which takes the name of a file containing JSON data) to `meteor run` or `meteor deploy`. When running your server directly (e.g. from a bundle), you instead specify settings by putting the JSON directly into the `METEOR_SETTINGS` environment variable. If the settings object contains a key named `public`, then `Meteor.settings.public` will be available on the client as well as the server.  All other properties of `Meteor.settings` are only defined on the server.  You can rely on `Meteor.settings` and `Meteor.settings.public` being defined objects (not undefined) on both client and server even if there are no settings specified.  Changes to `Meteor.settings.public` at runtime will be picked up by new client connections.
       * @locus Anywhere
       * @type {Object}
       */
      Meteor.settings = {
        public: config.PUBLIC_SETTINGS,
      };
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/define-package.js                                                                    //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    function PackageRegistry() {
      this._promiseInfoMap = Object.create(null);
    }

    var PRp = PackageRegistry.prototype;

    // Set global.Package[name] = pkg || {}. If additional arguments are
    // supplied, their keys will be copied into pkg if not already present.
    // This method is defined on the prototype of global.Package so that it
    // will not be included in Object.keys(Package).
    PRp._define = function definePackage(name, pkg) {
      pkg = pkg || {};

      var argc = arguments.length;
      for (var i = 2; i < argc; ++i) {
        var arg = arguments[i];
        for (var s in arg) {
          if (!(s in pkg)) {
            pkg[s] = arg[s];
          }
        }
      }

      this[name] = pkg;

      var info = this._promiseInfoMap[name];
      if (info) {
        info.resolve(pkg);
      }

      return pkg;
    };

    PRp._has = function has(name) {
      return Object.prototype.hasOwnProperty.call(this, name);
    };

    // Returns a Promise that will resolve to the exports of the named
    // package, or be rejected if the package is not installed.
    PRp._promise = function promise(name) {
      var self = this;
      var info = self._promiseInfoMap[name];

      if (!info) {
        info = self._promiseInfoMap[name] = {};
        info.promise = new Promise(function (resolve, reject) {
          info.resolve = resolve;
          if (self._has(name)) {
            resolve(self[name]);
          } else {
            Meteor.startup(function () {
              if (!self._has(name)) {
                reject(new Error("Package " + name + " not installed"));
              }
            });
          }
        });
      }

      return info.promise;
    };

    // Initialize the Package namespace used by all Meteor packages.
    global.Package = new PackageRegistry();

    if (typeof exports === "object") {
      // This code is also used by meteor/tools/isobuild/bundler.js.
      exports.PackageRegistry = PackageRegistry;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/helpers.js                                                                           //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    if (Meteor.isServer) var Future = Npm.require("fibers/future");

    if (
      typeof __meteor_runtime_config__ === "object" &&
      __meteor_runtime_config__.meteorRelease
    ) {
      /**
       * @summary `Meteor.release` is a string containing the name of the [release](#meteorupdate) with which the project was built (for example, `"1.2.3"`). It is `undefined` if the project was built using a git checkout of Meteor.
       * @locus Anywhere
       * @type {String}
       */
      Meteor.release = __meteor_runtime_config__.meteorRelease;
    }

    // XXX find a better home for these? Ideally they would be _.get,
    // _.ensure, _.delete..

    // _get(a,b,c,d) returns a[b][c][d], or else undefined if a[b] or
    // a[b][c] doesn't exist.
    //
    Meteor._get = function (obj /*, arguments */) {
      for (var i = 1; i < arguments.length; i++) {
        if (!(arguments[i] in obj)) return undefined;
        obj = obj[arguments[i]];
      }
      return obj;
    };

    // _ensure(a,b,c,d) ensures that a[b][c][d] exists. If it does not,
    // it is created and set to {}. Either way, it is returned.
    //
    Meteor._ensure = function (obj /*, arguments */) {
      for (var i = 1; i < arguments.length; i++) {
        var key = arguments[i];
        if (!(key in obj)) obj[key] = {};
        obj = obj[key];
      }

      return obj;
    };

    // _delete(a, b, c, d) deletes a[b][c][d], then a[b][c] unless it
    // isn't empty, then a[b] unless it isn't empty.
    //
    Meteor._delete = function (obj /*, arguments */) {
      var stack = [obj];
      var leaf = true;
      for (var i = 1; i < arguments.length - 1; i++) {
        var key = arguments[i];
        if (!(key in obj)) {
          leaf = false;
          break;
        }
        obj = obj[key];
        if (typeof obj !== "object") break;
        stack.push(obj);
      }

      for (var i = stack.length - 1; i >= 0; i--) {
        var key = arguments[i + 1];

        if (leaf) leaf = false;
        else for (var other in stack[i][key]) return; // not empty -- we're done

        delete stack[i][key];
      }
    };

    // wrapAsync can wrap any function that takes some number of arguments that
    // can't be undefined, followed by some optional arguments, where the callback
    // is the last optional argument.
    // e.g. fs.readFile(pathname, [callback]),
    // fs.open(pathname, flags, [mode], [callback])
    // For maximum effectiveness and least confusion, wrapAsync should be used on
    // functions where the callback is the only argument of type Function.

    /**
     * @memberOf Meteor
     * @summary Wrap a function that takes a callback function as its final parameter. The signature of the callback of the wrapped function should be `function(error, result){}`. On the server, the wrapped function can be used either synchronously (without passing a callback) or asynchronously (when a callback is passed). On the client, a callback is always required; errors will be logged if there is no callback. If a callback is provided, the environment captured when the original function was called will be restored in the callback.
     * @locus Anywhere
     * @param {Function} func A function that takes a callback as its final parameter
     * @param {Object} [context] Optional `this` object against which the original function will be invoked
     */
    Meteor.wrapAsync = function (fn, context) {
      return function () /* arguments */ {
        var self = context || this;
        var newArgs = Array.prototype.slice.call(arguments);
        var callback;

        for (var i = newArgs.length - 1; i >= 0; --i) {
          var arg = newArgs[i];
          var type = typeof arg;
          if (type !== "undefined") {
            if (type === "function") {
              callback = arg;
            }
            break;
          }
        }

        if (!callback) {
          if (Meteor.isClient) {
            callback = logErr;
          } else {
            var fut = new Future();
            callback = fut.resolver();
          }
          ++i; // Insert the callback just after arg.
        }

        newArgs[i] = Meteor.bindEnvironment(callback);
        var result = fn.apply(self, newArgs);
        return fut ? fut.wait() : result;
      };
    };

    // Sets child's prototype to a new object whose prototype is parent's
    // prototype. Used as:
    //   Meteor._inherits(ClassB, ClassA).
    //   _.extend(ClassB.prototype, { ... })
    // Inspired by CoffeeScript's `extend` and Google Closure's `goog.inherits`.
    var hasOwn = Object.prototype.hasOwnProperty;
    Meteor._inherits = function (Child, Parent) {
      // copy Parent static properties
      for (var key in Parent) {
        // make sure we only copy hasOwnProperty properties vs. prototype
        // properties
        if (hasOwn.call(Parent, key)) {
          Child[key] = Parent[key];
        }
      }

      // a middle member of prototype chain: takes the prototype from the Parent
      var Middle = function () {
        this.constructor = Child;
      };
      Middle.prototype = Parent.prototype;
      Child.prototype = new Middle();
      Child.__super__ = Parent.prototype;
      return Child;
    };

    var warnedAboutWrapAsync = false;

    /**
     * @deprecated in 0.9.3
     */
    Meteor._wrapAsync = function (fn, context) {
      if (!warnedAboutWrapAsync) {
        Meteor._debug("Meteor._wrapAsync has been renamed to Meteor.wrapAsync");
        warnedAboutWrapAsync = true;
      }
      return Meteor.wrapAsync.apply(Meteor, arguments);
    };

    function logErr(err) {
      if (err) {
        return Meteor._debug("Exception in callback of async function", err);
      }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    var global = this;

    // IE 10, Node >= 9.1

    function useSetImmediate() {
      if (!global.setImmediate) return null;
      else {
        var setImmediate = function (fn) {
          global.setImmediate(fn);
        };
        setImmediate.implementation = "setImmediate";
        return setImmediate;
      }
    }

    // Android 2.3.6, Chrome 26, Firefox 20, IE 8-9, iOS 5.1.1 Safari

    function usePostMessage() {
      // The test against `importScripts` prevents this implementation
      // from being installed inside a web worker, where
      // `global.postMessage` means something completely different and
      // can't be used for this purpose.

      if (!global.postMessage || global.importScripts) {
        return null;
      }

      // Avoid synchronous post message implementations.

      var postMessageIsAsynchronous = true;
      var oldOnMessage = global.onmessage;
      global.onmessage = function () {
        postMessageIsAsynchronous = false;
      };
      global.postMessage("", "*");
      global.onmessage = oldOnMessage;

      if (!postMessageIsAsynchronous) return null;

      var funcIndex = 0;
      var funcs = {};

      // Installs an event handler on `global` for the `message` event: see
      // * https://developer.mozilla.org/en/DOM/window.postMessage
      // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

      // XXX use Random.id() here?
      var MESSAGE_PREFIX = "Meteor._setImmediate." + Math.random() + ".";

      function isStringAndStartsWith(string, putativeStart) {
        return (
          typeof string === "string" &&
          string.substring(0, putativeStart.length) === putativeStart
        );
      }

      function onGlobalMessage(event) {
        // This will catch all incoming messages (even from other
        // windows!), so we need to try reasonably hard to avoid letting
        // anyone else trick us into firing off. We test the origin is
        // still this window, and that a (randomly generated)
        // unpredictable identifying prefix is present.
        if (
          event.source === global &&
          isStringAndStartsWith(event.data, MESSAGE_PREFIX)
        ) {
          var index = event.data.substring(MESSAGE_PREFIX.length);
          try {
            if (funcs[index]) funcs[index]();
          } finally {
            delete funcs[index];
          }
        }
      }

      if (global.addEventListener) {
        global.addEventListener("message", onGlobalMessage, false);
      } else {
        global.attachEvent("onmessage", onGlobalMessage);
      }

      var setImmediate = function (fn) {
        // Make `global` post a message to itself with the handle and
        // identifying prefix, thus asynchronously invoking our
        // onGlobalMessage listener above.
        ++funcIndex;
        funcs[funcIndex] = fn;
        global.postMessage(MESSAGE_PREFIX + funcIndex, "*");
      };
      setImmediate.implementation = "postMessage";
      return setImmediate;
    }

    function useTimeout() {
      var setImmediate = function (fn) {
        global.setTimeout(fn, 0);
      };
      setImmediate.implementation = "setTimeout";
      return setImmediate;
    }

    Meteor._setImmediate =
      useSetImmediate() || usePostMessage() || useTimeout();

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/timers.js                                                                            //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    function withoutInvocation(f) {
      if (Package.ddp) {
        var DDP = Package.ddp.DDP;
        var CurrentInvocation =
          DDP._CurrentMethodInvocation ||
          // For backwards compatibility, as explained in this issue:
          // https://github.com/meteor/meteor/issues/8947
          DDP._CurrentInvocation;

        var invocation = CurrentInvocation.get();
        if (invocation && invocation.isSimulation) {
          throw new Error("Can't set timers inside simulations");
        }

        return function () {
          CurrentInvocation.withValue(null, f);
        };
      } else {
        return f;
      }
    }

    function bindAndCatch(context, f) {
      return Meteor.bindEnvironment(withoutInvocation(f), context);
    }

    // Meteor.setTimeout and Meteor.setInterval callbacks scheduled
    // inside a server method are not part of the method invocation and
    // should clear out the CurrentMethodInvocation environment variable.

    /**
     * @memberOf Meteor
     * @summary Call a function in the future after waiting for a specified delay.
     * @locus Anywhere
     * @param {Function} func The function to run
     * @param {Number} delay Number of milliseconds to wait before calling function
     */
    Meteor.setTimeout = function (f, duration) {
      return setTimeout(bindAndCatch("setTimeout callback", f), duration);
    };

    /**
     * @memberOf Meteor
     * @summary Call a function repeatedly, with a time delay between calls.
     * @locus Anywhere
     * @param {Function} func The function to run
     * @param {Number} delay Number of milliseconds to wait between each function call.
     */
    Meteor.setInterval = function (f, duration) {
      return setInterval(bindAndCatch("setInterval callback", f), duration);
    };

    /**
     * @memberOf Meteor
     * @summary Cancel a repeating function call scheduled by `Meteor.setInterval`.
     * @locus Anywhere
     * @param {Object} id The handle returned by `Meteor.setInterval`
     */
    Meteor.clearInterval = function (x) {
      return clearInterval(x);
    };

    /**
     * @memberOf Meteor
     * @summary Cancel a function call scheduled by `Meteor.setTimeout`.
     * @locus Anywhere
     * @param {Object} id The handle returned by `Meteor.setTimeout`
     */
    Meteor.clearTimeout = function (x) {
      return clearTimeout(x);
    };

    // XXX consider making this guarantee ordering of defer'd callbacks, like
    // Tracker.afterFlush or Node's nextTick (in practice). Then tests can do:
    //    callSomethingThatDefersSomeWork();
    //    Meteor.defer(expect(somethingThatValidatesThatTheWorkHappened));

    /**
     * @memberOf Meteor
     * @summary Defer execution of a function to run asynchronously in the background (similar to `Meteor.setTimeout(func, 0)`.
     * @locus Anywhere
     * @param {Function} func The function to run
     */
    Meteor.defer = function (f) {
      Meteor._setImmediate(bindAndCatch("defer callback", f));
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/errors.js                                                                            //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Makes an error subclass which properly contains a stack trace in most
    // environments. constructor can set fields on `this` (and should probably set
    // `message`, which is what gets displayed at the top of a stack trace).
    //
    Meteor.makeErrorType = function (name, constructor) {
      var errorClass = function () /*arguments*/ {
        // Ensure we get a proper stack trace in most Javascript environments
        if (Error.captureStackTrace) {
          // V8 environments (Chrome and Node.js)
          Error.captureStackTrace(this, errorClass);
        } else {
          // Borrow the .stack property of a native Error object.
          this.stack = new Error().stack;
        }
        // Safari magically works.

        constructor.apply(this, arguments);

        this.errorType = name;
      };

      Meteor._inherits(errorClass, Error);

      return errorClass;
    };

    // This should probably be in the livedata package, but we don't want
    // to require you to use the livedata package to get it. Eventually we
    // should probably rename it to DDP.Error and put it back in the
    // 'livedata' package (which we should rename to 'ddp' also.)
    //
    // Note: The DDP server assumes that Meteor.Error EJSON-serializes as an object
    // containing 'error' and optionally 'reason' and 'details'.
    // The DDP client manually puts these into Meteor.Error objects. (We don't use
    // EJSON.addType here because the type is determined by location in the
    // protocol, not text on the wire.)

    /**
     * @summary This class represents a symbolic error thrown by a method.
     * @locus Anywhere
     * @class
     * @param {String} error A string code uniquely identifying this kind of error.
     * This string should be used by callers of the method to determine the
     * appropriate action to take, instead of attempting to parse the reason
     * or details fields. For example:
     *
     * ```
     * // on the server, pick a code unique to this error
     * // the reason field should be a useful debug message
     * throw new Meteor.Error("logged-out",
     *   "The user must be logged in to post a comment.");
     *
     * // on the client
     * Meteor.call("methodName", function (error) {
     *   // identify the error
     *   if (error && error.error === "logged-out") {
     *     // show a nice error message
     *     Session.set("errorMessage", "Please log in to post a comment.");
     *   }
     * });
     * ```
     *
     * For legacy reasons, some built-in Meteor functions such as `check` throw
     * errors with a number in this field.
     *
     * @param {String} [reason] Optional.  A short human-readable summary of the
     * error, like 'Not Found'.
     * @param {String} [details] Optional.  Additional information about the error,
     * like a textual stack trace.
     */
    Meteor.Error = Meteor.makeErrorType("Meteor.Error", function (
      error,
      reason,
      details
    ) {
      var self = this;

      // Newer versions of DDP use this property to signify that an error
      // can be sent back and reconstructed on the calling client.
      self.isClientSafe = true;

      // String code uniquely identifying this kind of error.
      self.error = error;

      // Optional: A short human-readable summary of the error. Not
      // intended to be shown to end users, just developers. ("Not Found",
      // "Internal Server Error")
      self.reason = reason;

      // Optional: Additional information about the error, say for
      // debugging. It might be a (textual) stack trace if the server is
      // willing to provide one. The corresponding thing in HTTP would be
      // the body of a 404 or 500 response. (The difference is that we
      // never expect this to be shown to end users, only developers, so
      // it doesn't need to be pretty.)
      self.details = details;

      // This is what gets displayed at the top of a stack trace. Current
      // format is "[404]" (if no reason is set) or "File not found [404]"
      if (self.reason) self.message = self.reason + " [" + self.error + "]";
      else self.message = "[" + self.error + "]";
    });

    // Meteor.Error is basically data and is sent over DDP, so you should be able to
    // properly EJSON-clone it. This is especially important because if a
    // Meteor.Error is thrown through a Future, the error, reason, and details
    // properties become non-enumerable so a standard Object clone won't preserve
    // them and they will be lost from DDP.
    Meteor.Error.prototype.clone = function () {
      var self = this;
      return new Meteor.Error(self.error, self.reason, self.details);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/fiber_stubs_client.js                                                                //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // This file is a partial analogue to fiber_helpers.js, which allows the client
    // to use a queue too, and also to call noYieldsAllowed.

    // The client has no ability to yield, so noYieldsAllowed is a noop.
    //
    Meteor._noYieldsAllowed = function (f) {
      return f();
    };

    // An even simpler queue of tasks than the fiber-enabled one.  This one just
    // runs all the tasks when you call runTask or flush, synchronously.
    //
    Meteor._SynchronousQueue = function () {
      var self = this;
      self._tasks = [];
      self._running = false;
      self._runTimeout = null;
    };

    var SQp = Meteor._SynchronousQueue.prototype;

    SQp.runTask = function (task) {
      var self = this;
      if (!self.safeToRunTask())
        throw new Error(
          "Could not synchronously run a task from a running task"
        );
      self._tasks.push(task);
      var tasks = self._tasks;
      self._tasks = [];
      self._running = true;

      if (self._runTimeout) {
        // Since we're going to drain the queue, we can forget about the timeout
        // which tries to run it.  (But if one of our tasks queues something else,
        // the timeout will be correctly re-created.)
        clearTimeout(self._runTimeout);
        self._runTimeout = null;
      }

      try {
        while (tasks.length > 0) {
          var t = tasks.shift();
          try {
            t();
          } catch (e) {
            if (tasks.length === 0) {
              // this was the last task, that is, the one we're calling runTask
              // for.
              throw e;
            }
            Meteor._debug("Exception in queued task", e);
          }
        }
      } finally {
        self._running = false;
      }
    };

    SQp.queueTask = function (task) {
      var self = this;
      self._tasks.push(task);
      // Intentionally not using Meteor.setTimeout, because it doesn't like runing
      // in stubs for now.
      if (!self._runTimeout) {
        self._runTimeout = setTimeout(function () {
          return self.flush.apply(self, arguments);
        }, 0);
      }
    };

    SQp.flush = function () {
      var self = this;
      self.runTask(function () {});
    };

    SQp.drain = function () {
      var self = this;
      if (!self.safeToRunTask()) {
        return;
      }
      while (self._tasks.length > 0) {
        self.flush();
      }
    };

    SQp.safeToRunTask = function () {
      var self = this;
      return !self._running;
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/startup_client.js                                                                    //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    var callbackQueue = [];
    var isLoadingCompleted = false;
    var isReady = false;

    // Keeps track of how many events to wait for in addition to loading completing,
    // before we're considered ready.
    var readyHoldsCount = 0;

    var holdReady = function () {
      readyHoldsCount++;
    };

    var releaseReadyHold = function () {
      readyHoldsCount--;
      maybeReady();
    };

    var maybeReady = function () {
      if (isReady || !isLoadingCompleted || readyHoldsCount > 0) return;

      isReady = true;

      // Run startup callbacks
      while (callbackQueue.length) callbackQueue.shift()();

      if (Meteor.isCordova) {
        // Notify the WebAppLocalServer plugin that startup was completed successfully,
        // so we can roll back faulty versions if this doesn't happen
        WebAppLocalServer.startupDidComplete();
      }
    };

    var loadingCompleted = function () {
      if (!isLoadingCompleted) {
        isLoadingCompleted = true;
        maybeReady();
      }
    };

    if (Meteor.isCordova) {
      holdReady();
      document.addEventListener("deviceready", releaseReadyHold, false);
    }

    if (
      document.readyState === "complete" ||
      document.readyState === "loaded"
    ) {
      // Loading has completed,
      // but allow other scripts the opportunity to hold ready
      window.setTimeout(loadingCompleted);
    } else {
      // Attach event listeners to wait for loading to complete
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", loadingCompleted, false);
        window.addEventListener("load", loadingCompleted, false);
      } else {
        // Use IE event model for < IE9
        document.attachEvent("onreadystatechange", function () {
          if (document.readyState === "complete") {
            loadingCompleted();
          }
        });
        window.attachEvent("load", loadingCompleted);
      }
    }

    /**
     * @summary Run code when a client or a server starts.
     * @locus Anywhere
     * @param {Function} func A function to run on startup.
     */
    Meteor.startup = function (callback) {
      // Fix for < IE9, see http://javascript.nwbox.com/IEContentLoaded/
      var doScroll =
        !document.addEventListener && document.documentElement.doScroll;

      if (!doScroll || window !== top) {
        if (isReady) callback();
        else callbackQueue.push(callback);
      } else {
        try {
          doScroll("left");
        } catch (error) {
          setTimeout(function () {
            Meteor.startup(callback);
          }, 50);
          return;
        }
        callback();
      }
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/debug.js                                                                             //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    var suppress = 0;

    // replacement for console.log. This is a temporary API. We should
    // provide a real logging API soon (possibly just a polyfill for
    // console?)
    //
    // NOTE: this is used on the server to print the warning about
    // having autopublish enabled when you probably meant to turn it
    // off. it's not really the proper use of something called
    // _debug. the intent is for this message to go to the terminal and
    // be very visible. if you change _debug to go someplace else, etc,
    // please fix the autopublish code to do something reasonable.
    //
    Meteor._debug = function () /* arguments */ {
      if (suppress) {
        suppress--;
        return;
      }
      if (
        typeof console !== "undefined" &&
        typeof console.log !== "undefined"
      ) {
        if (arguments.length == 0) {
          // IE Companion breaks otherwise
          // IE10 PP4 requires at least one argument
          console.log("");
        } else {
          // IE doesn't have console.log.apply, it's not a real Object.
          // http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9
          // http://patik.com/blog/complete-cross-browser-console-log/
          if (typeof console.log.apply === "function") {
            // Most browsers

            // Chrome and Safari only hyperlink URLs to source files in first argument of
            // console.log, so try to call it with one argument if possible.
            // Approach taken here: If all arguments are strings, join them on space.
            // See https://github.com/meteor/meteor/pull/732#issuecomment-13975991
            var allArgumentsOfTypeString = true;
            for (var i = 0; i < arguments.length; i++)
              if (typeof arguments[i] !== "string")
                allArgumentsOfTypeString = false;

            if (allArgumentsOfTypeString)
              console.log.apply(console, [
                Array.prototype.join.call(arguments, " "),
              ]);
            else console.log.apply(console, arguments);
          } else if (typeof Function.prototype.bind === "function") {
            // IE9
            var log = Function.prototype.bind.call(console.log, console);
            log.apply(console, arguments);
          } else {
            // IE8
            Function.prototype.call.call(
              console.log,
              console,
              Array.prototype.slice.call(arguments)
            );
          }
        }
      }
    };

    // Suppress the next 'count' Meteor._debug messsages. Use this to
    // stop tests from spamming the console.
    //
    Meteor._suppress_log = function (count) {
      suppress += count;
    };

    Meteor._suppressed_log_expected = function () {
      return suppress !== 0;
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/string_utils.js                                                                      //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Like Perl's quotemeta: quotes all regexp metacharacters.
    // Code taken from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    Meteor._escapeRegExp = function (string) {
      return String(string).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/test_environment.js                                                                  //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    var TEST_METADATA_STR;
    if (Meteor.isClient) {
      TEST_METADATA_STR = meteorEnv.TEST_METADATA;
    } else {
      TEST_METADATA_STR = process.env.TEST_METADATA;
    }

    var TEST_METADATA = JSON.parse(TEST_METADATA_STR || "{}");
    var testDriverPackageName = TEST_METADATA.driverPackage;

    // Note that if we are in test-packages mode neither of these will be set,
    // but we will have a test driver package
    Meteor.isTest = !!TEST_METADATA.isTest;
    Meteor.isAppTest = !!TEST_METADATA.isAppTest;
    Meteor.isPackageTest =
      !!testDriverPackageName && !Meteor.isTest && !Meteor.isAppTest;

    if (typeof testDriverPackageName === "string") {
      Meteor.startup(function () {
        var testDriverPackage = Package[testDriverPackageName];
        if (!testDriverPackage) {
          throw new Error(
            "Can't find test driver package: " + testDriverPackageName
          );
        }

        // On the client, the test driver *must* define `runTests`
        if (Meteor.isClient) {
          if (typeof testDriverPackage.runTests !== "function") {
            throw new Error(
              "Test driver package " +
                testDriverPackageName +
                " missing `runTests` export"
            );
          }
          testDriverPackage.runTests();
        } else {
          // The server can optionally define `start`
          if (typeof testDriverPackage.start === "function") {
            testDriverPackage.start();
          }
        }
      });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/dynamics_browser.js                                                                  //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Simple implementation of dynamic scoping, for use in browsers

    var nextSlot = 0;
    var currentValues = [];

    Meteor.EnvironmentVariable = function () {
      this.slot = nextSlot++;
    };

    var EVp = Meteor.EnvironmentVariable.prototype;

    EVp.get = function () {
      return currentValues[this.slot];
    };

    EVp.getOrNullIfOutsideFiber = function () {
      return this.get();
    };

    EVp.withValue = function (value, func) {
      var saved = currentValues[this.slot];
      try {
        currentValues[this.slot] = value;
        var ret = func();
      } finally {
        currentValues[this.slot] = saved;
      }
      return ret;
    };

    Meteor.bindEnvironment = function (func, onException, _this) {
      // needed in order to be able to create closures inside func and
      // have the closed variables not change back to their original
      // values
      var boundValues = currentValues.slice();

      if (!onException || typeof onException === "string") {
        var description = onException || "callback of async function";
        onException = function (error) {
          Meteor._debug("Exception in " + description + ":", error);
        };
      }

      return function () /* arguments */ {
        var savedValues = currentValues;
        try {
          currentValues = boundValues;
          var ret = func.apply(_this, arguments);
        } catch (e) {
          // note: callback-hook currently relies on the fact that if onException
          // throws in the browser, the wrapped call throws.
          onException(e);
        } finally {
          currentValues = savedValues;
        }
        return ret;
      };
    };

    Meteor._nodeCodeMustBeInFiber = function () {
      // no-op on browser
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                      //
    // packages/meteor/url_common.js                                                                        //
    //                                                                                                      //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    /**
     * @summary Generate an absolute URL pointing to the application. The server reads from the `ROOT_URL` environment variable to determine where it is running. This is taken care of automatically for apps deployed to Galaxy, but must be provided when using `meteor build`.
     * @locus Anywhere
     * @param {String} [path] A path to append to the root URL. Do not include a leading "`/`".
     * @param {Object} [options]
     * @param {Boolean} options.secure Create an HTTPS URL.
     * @param {Boolean} options.replaceLocalhost Replace localhost with 127.0.0.1. Useful for services that don't recognize localhost as a domain name.
     * @param {String} options.rootUrl Override the default ROOT_URL from the server environment. For example: "`http://foo.example.com`"
     */
    Meteor.absoluteUrl = function (path, options) {
      // path is optional
      if (!options && typeof path === "object") {
        options = path;
        path = undefined;
      }
      // merge options with defaults
      options = Object.assign(
        {},
        Meteor.absoluteUrl.defaultOptions,
        options || {}
      );

      var url = options.rootUrl;
      if (!url)
        throw new Error(
          "Must pass options.rootUrl or set ROOT_URL in the server environment"
        );

      if (!/^http[s]?:\/\//i.test(url))
        // url starts with 'http://' or 'https://'
        url = "http://" + url; // we will later fix to https if options.secure is set

      if (!url.endsWith("/")) {
        url += "/";
      }

      if (path) {
        // join url and path with a / separator
        while (path.startsWith("/")) {
          path = path.slice(1);
        }
        url += path;
      }

      // turn http to https if secure option is set, and we're not talking
      // to localhost.
      if (
        options.secure &&
        /^http:/.test(url) && // url starts with 'http:'
        !/http:\/\/localhost[:\/]/.test(url) && // doesn't match localhost
        !/http:\/\/127\.0\.0\.1[:\/]/.test(url)
      )
        // or 127.0.0.1
        url = url.replace(/^http:/, "https:");

      if (options.replaceLocalhost)
        url = url.replace(/^http:\/\/localhost([:\/].*)/, "http://127.0.0.1$1");

      return url;
    };

    // allow later packages to override default options
    var defaultOptions = (Meteor.absoluteUrl.defaultOptions = {});

    // available only in a browser environment
    var location = typeof window === "object" && window.location;

    if (
      typeof __meteor_runtime_config__ === "object" &&
      __meteor_runtime_config__.ROOT_URL
    ) {
      defaultOptions.rootUrl = __meteor_runtime_config__.ROOT_URL;
    } else if (location && location.protocol && location.host) {
      defaultOptions.rootUrl = location.protocol + "//" + location.host;
    }

    // Make absolute URLs use HTTPS by default if the current window.location
    // uses HTTPS. Since this is just a default, it can be overridden by
    // passing { secure: false } if necessary.
    if (location && location.protocol === "https:") {
      defaultOptions.secure = true;
    }

    Meteor._relativeToSiteRootUrl = function (link) {
      if (
        typeof __meteor_runtime_config__ === "object" &&
        link.substr(0, 1) === "/"
      )
        link = (__meteor_runtime_config__.ROOT_URL_PATH_PREFIX || "") + link;
      return link;
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }.call(this));

  /* Exports */
  Package._define("meteor", {
    Meteor: Meteor,
    global: global,
    meteorEnv: meteorEnv,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Exports */
  Package._define("meteor-base");
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;

  /* Package-scope variables */
  var makeInstaller, meteorInstall;

  ///////////////////////////////////////////////////////////////////////////////
  //                                                                           //
  // packages/modules-runtime/.npm/package/node_modules/install/install.js     //
  // This file is in bare mode and is not in its own closure.                  //
  //                                                                           //
  ///////////////////////////////////////////////////////////////////////////////
  //
  makeInstaller = function (options) {
    options = options || {};

    // These file extensions will be appended to required module identifiers
    // if they do not exactly match an installed module.
    var defaultExtensions = options.extensions || [".js", ".json"];

    // If defined, the options.fallback function will be called when no
    // installed module is found for a required module identifier. Often
    // options.fallback will be implemented in terms of the native Node
    // require function, which has the ability to load binary modules.
    var fallback = options.fallback;

    // List of fields to look for in package.json files to determine the
    // main entry module of the package. The first field listed here whose
    // value is a string will be used to resolve the entry module.
    var mainFields =
      options.mainFields ||
      // If options.mainFields is absent and options.browser is truthy,
      // package resolution will prefer the "browser" field of package.json
      // files to the "main" field. Note that this only supports
      // string-valued "browser" fields for now, though in the future it
      // might make sense to support the object version, a la browserify.
      (options.browser ? ["browser", "main"] : ["main"]);

    var hasOwn = {}.hasOwnProperty;
    function strictHasOwn(obj, key) {
      return isObject(obj) && isString(key) && hasOwn.call(obj, key);
    }

    // Cache for looking up File objects given absolute module identifiers.
    // Invariants:
    //   filesByModuleId[module.id] === fileAppendId(root, module.id)
    //   filesByModuleId[module.id].module === module
    var filesByModuleId = {};

    // The file object representing the root directory of the installed
    // module tree.
    var root = new File("/", new File("/.."));
    var rootRequire = makeRequire(root);

    // Merges the given tree of directories and module factory functions
    // into the tree of installed modules and returns a require function
    // that behaves as if called from a module in the root directory.
    function install(tree, options) {
      if (isObject(tree)) {
        fileMergeContents(root, tree, options);
      }
      return rootRequire;
    }

    // Replace this function to enable Module.prototype.prefetch.
    install.fetch = function (ids) {
      throw new Error("fetch not implemented");
    };

    // This constructor will be used to instantiate the module objects
    // passed to module factory functions (i.e. the third argument after
    // require and exports), and is exposed as install.Module in case the
    // caller of makeInstaller wishes to modify Module.prototype.
    function Module(id) {
      this.id = id;

      // The Node implementation of module.children unfortunately includes
      // only those child modules that were imported for the first time by
      // this parent module (i.e., child.parent === this).
      this.children = [];

      // This object is an install.js extension that includes all child
      // modules imported by this module, even if this module is not the
      // first to import them.
      this.childrenById = {};
    }

    // Used to keep module.prefetch promise resolutions well-ordered.
    var lastPrefetchPromise;

    // May be shared by multiple sequential calls to module.prefetch.
    // Initialized to {} only when necessary.
    var missing;

    Module.prototype.prefetch = function (id) {
      var _module = this;
      var parentFile = getOwn(filesByModuleId, _module.id);

      lastPrefetchPromise = lastPrefetchPromise || Promise.resolve();
      var previousPromise = lastPrefetchPromise;

      function walk(_module2) {
        var file = getOwn(filesByModuleId, _module2.id);
        if (fileIsDynamic(file) && !file.pending) {
          file.pending = true;
          missing = missing || {};

          // These are the data that will be exposed to the install.fetch
          // callback, so it's worth documenting each item with a comment.
          missing[_module2.id] = {
            // The CommonJS module object that will be exposed to this
            // dynamic module when it is evaluated. Note that install.fetch
            // could decide to populate module.exports directly, instead of
            // fetching anything. In that case, install.fetch should omit
            // this module from the tree that it produces.
            module: file.module,
            // List of module identifier strings imported by this module.
            // Note that the missing object already contains all available
            // dependencies (including transitive dependencies), so
            // install.fetch should not need to traverse these dependencies
            // in most cases; however, they may be useful for other reasons.
            // Though the strings are unique, note that two different
            // strings could resolve to the same module.
            deps: Object.keys(file.deps),
            // The options (if any) that were passed as the second argument
            // to the install(tree, options) function when this stub was
            // first registered. Typically contains options.extensions, but
            // could contain any information appropriate for the entire tree
            // as originally installed. These options will be automatically
            // inherited by the newly fetched modules, so install.fetch
            // should not need to modify them.
            options: file.options,
            // Any stub data included in the array notation from the
            // original entry for this dynamic module. Typically contains
            // "main" and/or "browser" fields for package.json files, and is
            // otherwise undefined.
            stub: file.stub,
          };

          each(file.deps, function (parentId, id) {
            fileResolve(file, id);
          });

          each(_module2.childrenById, walk);
        }
      }

      return (lastPrefetchPromise = new Promise(function (resolve) {
        var absChildId = _module.resolve(id);
        each(_module.childrenById, walk);
        resolve(absChildId);
      }).then(function (absChildId) {
        // Grab the current missing object and fetch its contents.
        var toBeFetched = missing;
        missing = null;

        function clearPending() {
          if (toBeFetched) {
            Object.keys(toBeFetched).forEach(function (id) {
              getOwn(filesByModuleId, id).pending = false;
            });
          }
        }

        return new Promise(function (resolve) {
          // The install.fetch function takes an object mapping missing
          // dynamic module identifiers to options objects, and should
          // return a Promise that resolves to a module tree that can be
          // installed. As an optimization, if there were no missing dynamic
          // modules, then we can skip calling install.fetch entirely.
          resolve(toBeFetched && install.fetch(toBeFetched));
        }).then(
          function (tree) {
            function both() {
              install(tree);
              clearPending();
              return absChildId;
            }

            // Although we want multiple install.fetch calls to run in
            // parallel, it is important that the promises returned by
            // module.prefetch are resolved in the same order as the original
            // calls to module.prefetch, because previous fetches may include
            // modules assumed to exist by more recent module.prefetch calls.
            // Whether previousPromise was resolved or rejected, carry on with
            // the installation regardless.
            return previousPromise.then(both, both);
          },
          function (error) {
            // Fixes https://github.com/meteor/meteor/issues/10182.
            clearPending();
            throw error;
          }
        );
      }));
    };

    install.Module = Module;

    function getOwn(obj, key) {
      return strictHasOwn(obj, key) && obj[key];
    }

    function isObject(value) {
      return value !== null && typeof value === "object";
    }

    function isFunction(value) {
      return typeof value === "function";
    }

    function isString(value) {
      return typeof value === "string";
    }

    function makeMissingError(id) {
      return new Error("Cannot find module '" + id + "'");
    }

    Module.prototype.resolve = function (id) {
      var file = fileResolve(filesByModuleId[this.id], id);
      if (file) return file.module.id;
      var error = makeMissingError(id);
      if (fallback && isFunction(fallback.resolve)) {
        return fallback.resolve(id, this.id, error);
      }
      throw error;
    };

    Module.prototype.require = function require(id) {
      var result = fileResolve(filesByModuleId[this.id], id);
      if (result) {
        return fileEvaluate(result, this);
      }

      var error = makeMissingError(id);

      if (isFunction(fallback)) {
        return fallback(
          id, // The missing module identifier.
          this.id, // ID of the parent module.
          error // The error we would have thrown.
        );
      }

      throw error;
    };

    function makeRequire(file) {
      var _module3 = file.module;

      function _require(id) {
        return _module3.require(id);
      }

      _require.extensions = fileGetExtensions(file).slice(0);

      _require.resolve = function resolve(id) {
        return _module3.resolve(id);
      };

      return _require;
    }

    // File objects represent either directories or modules that have been
    // installed. When a `File` respresents a directory, its `.contents`
    // property is an object containing the names of the files (or
    // directories) that it contains. When a `File` represents a module, its
    // `.contents` property is a function that can be invoked with the
    // appropriate `(require, exports, module)` arguments to evaluate the
    // module. If the `.contents` property is a string, that string will be
    // resolved as a module identifier, and the exports of the resulting
    // module will provide the exports of the original file. The `.parent`
    // property of a File is either a directory `File` or `null`. Note that
    // a child may claim another `File` as its parent even if the parent
    // does not have an entry for that child in its `.contents` object.
    // This is important for implementing anonymous files, and preventing
    // child modules from using `../relative/identifier` syntax to examine
    // unrelated modules.
    function File(moduleId, parent) {
      var file = this;

      // Link to the parent file.
      file.parent = parent = parent || null;

      // The module object for this File, which will eventually boast an
      // .exports property when/if the file is evaluated.
      file.module = new Module(moduleId);
      filesByModuleId[moduleId] = file;

      // The .contents of the file can be either (1) an object, if the file
      // represents a directory containing other files; (2) a factory
      // function, if the file represents a module that can be imported; (3)
      // a string, if the file is an alias for another file; or (4) null, if
      // the file's contents are not (yet) available.
      file.contents = null;

      // Set of module identifiers imported by this module. Note that this
      // set is not necessarily complete, so don't rely on it unless you
      // know what you're doing.
      file.deps = {};
    }

    function fileEvaluate(file, parentModule) {
      var _module4 = file.module;
      if (!strictHasOwn(_module4, "exports")) {
        var contents = file.contents;
        if (!contents) {
          // If this file was installed with array notation, and the array
          // contained one or more objects but no functions, then the combined
          // properties of the objects are treated as a temporary stub for
          // file.module.exports. This is particularly important for partial
          // package.json modules, so that the resolution logic can know the
          // value of the "main" and/or "browser" fields, at least, even if
          // the rest of the package.json file is not (yet) available.
          if (file.stub) {
            return file.stub;
          }

          throw makeMissingError(_module4.id);
        }

        if (parentModule) {
          _module4.parent = parentModule;
          var children = parentModule.children;
          if (Array.isArray(children)) {
            children.push(_module4);
          }
        }

        contents(
          makeRequire(file),
          // If the file had a .stub, reuse the same object for exports.
          (_module4.exports = file.stub || {}),
          _module4,
          file.module.id,
          file.parent.module.id
        );

        _module4.loaded = true;
      }

      // The module.runModuleSetters method will be deprecated in favor of
      // just module.runSetters: https://github.com/benjamn/reify/pull/160
      var runSetters = _module4.runSetters || _module4.runModuleSetters;
      if (isFunction(runSetters)) {
        runSetters.call(_module4);
      }

      return _module4.exports;
    }

    function fileIsDirectory(file) {
      return file && isObject(file.contents);
    }

    function fileIsDynamic(file) {
      return file && file.contents === null;
    }

    function fileMergeContents(file, contents, options) {
      if (Array.isArray(contents)) {
        contents.forEach(function (item) {
          if (isString(item)) {
            file.deps[item] = file.module.id;
          } else if (isFunction(item)) {
            contents = item;
          } else if (isObject(item)) {
            file.stub = file.stub || {};
            each(item, function (value, key) {
              file.stub[key] = value;
            });
          }
        });

        if (!isFunction(contents)) {
          // If the array did not contain a function, merge nothing.
          contents = null;
        }
      } else if (
        !isFunction(contents) &&
        !isString(contents) &&
        !isObject(contents)
      ) {
        // If contents is neither an array nor a function nor a string nor
        // an object, just give up and merge nothing.
        contents = null;
      }

      if (contents) {
        file.contents = file.contents || (isObject(contents) ? {} : contents);
        if (isObject(contents) && fileIsDirectory(file)) {
          each(contents, function (value, key) {
            if (key === "..") {
              child = file.parent;
            } else {
              var child = getOwn(file.contents, key);

              if (!child) {
                child = file.contents[key] = new File(
                  file.module.id.replace(/\/*$/, "/") + key,
                  file
                );

                child.options = options;
              }
            }

            fileMergeContents(child, value, options);
          });
        }
      }
    }

    function each(obj, callback, context) {
      Object.keys(obj).forEach(function (key) {
        callback.call(this, obj[key], key);
      }, context);
    }

    function fileGetExtensions(file) {
      return (file.options && file.options.extensions) || defaultExtensions;
    }

    function fileAppendIdPart(file, part, extensions) {
      // Always append relative to a directory.
      while (file && !fileIsDirectory(file)) {
        file = file.parent;
      }

      if (!file || !part || part === ".") {
        return file;
      }

      if (part === "..") {
        return file.parent;
      }

      var exactChild = getOwn(file.contents, part);

      // Only consider multiple file extensions if this part is the last
      // part of a module identifier and not equal to `.` or `..`, and there
      // was no exact match or the exact match was a directory.
      if (extensions && (!exactChild || fileIsDirectory(exactChild))) {
        for (var e = 0; e < extensions.length; ++e) {
          var child = getOwn(file.contents, part + extensions[e]);
          if (child && !fileIsDirectory(child)) {
            return child;
          }
        }
      }

      return exactChild;
    }

    function fileAppendId(file, id, extensions) {
      var parts = id.split("/");

      // Use `Array.prototype.every` to terminate iteration early if
      // `fileAppendIdPart` returns a falsy value.
      parts.every(function (part, i) {
        return (file =
          i < parts.length - 1
            ? fileAppendIdPart(file, part)
            : fileAppendIdPart(file, part, extensions));
      });

      return file;
    }

    function recordChild(parentModule, childFile) {
      var childModule = childFile && childFile.module;
      if (parentModule && childModule) {
        parentModule.childrenById[childModule.id] = childModule;
      }
    }

    function fileResolve(file, id, parentModule, seenDirFiles) {
      var parentModule = parentModule || file.module;
      var extensions = fileGetExtensions(file);

      file =
        // Absolute module identifiers (i.e. those that begin with a `/`
        // character) are interpreted relative to the root directory, which
        // is a slight deviation from Node, which has access to the entire
        // file system.
        id.charAt(0) === "/"
          ? fileAppendId(root, id, extensions)
          : // Relative module identifiers are interpreted relative to the
          // current file, naturally.
          id.charAt(0) === "."
          ? fileAppendId(file, id, extensions)
          : // Top-level module identifiers are interpreted as referring to
            // packages in `node_modules` directories.
            nodeModulesLookup(file, id, extensions);

      // If the identifier resolves to a directory, we use the same logic as
      // Node to find an `index.js` or `package.json` file to evaluate.
      while (fileIsDirectory(file)) {
        seenDirFiles = seenDirFiles || [];

        // If the "main" field of a `package.json` file resolves to a
        // directory we've already considered, then we should not attempt to
        // read the same `package.json` file again. Using an array as a set
        // is acceptable here because the number of directories to consider
        // is rarely greater than 1 or 2. Also, using indexOf allows us to
        // store File objects instead of strings.
        if (seenDirFiles.indexOf(file) < 0) {
          seenDirFiles.push(file);

          var pkgJsonFile = fileAppendIdPart(file, "package.json");
          var pkg = pkgJsonFile && fileEvaluate(pkgJsonFile, parentModule);
          var mainFile,
            resolved =
              pkg &&
              mainFields.some(function (name) {
                var main = pkg[name];
                if (isString(main)) {
                  // The "main" field of package.json does not have to begin
                  // with ./ to be considered relative, so first we try
                  // simply appending it to the directory path before
                  // falling back to a full fileResolve, which might return
                  // a package from a node_modules directory.
                  return (mainFile =
                    fileAppendId(file, main, extensions) ||
                    fileResolve(file, main, parentModule, seenDirFiles));
                }
              });

          if (resolved && mainFile) {
            file = mainFile;
            recordChild(parentModule, pkgJsonFile);
            // The fileAppendId call above may have returned a directory,
            // so continue the loop to make sure we resolve it to a
            // non-directory file.
            continue;
          }
        }

        // If we didn't find a `package.json` file, or it didn't have a
        // resolvable `.main` property, the only possibility left to
        // consider is that this directory contains an `index.js` module.
        // This assignment almost always terminates the while loop, because
        // there's very little chance `fileIsDirectory(file)` will be true
        // for `fileAppendIdPart(file, "index", extensions)`. However, in
        // principle it is remotely possible that a file called `index.js`
        // could be a directory instead of a file.
        file = fileAppendIdPart(file, "index", extensions);
      }

      if (file && isString(file.contents)) {
        file = fileResolve(file, file.contents, parentModule, seenDirFiles);
      }

      recordChild(parentModule, file);

      return file;
    }

    function nodeModulesLookup(file, id, extensions) {
      for (var resolved; file && !resolved; file = file.parent) {
        resolved =
          fileIsDirectory(file) &&
          fileAppendId(file, "node_modules/" + id, extensions);
      }
      return resolved;
    }

    return install;
  };

  if (typeof exports === "object") {
    exports.makeInstaller = makeInstaller;
  }

  ///////////////////////////////////////////////////////////////////////////////

  (function () {
    ///////////////////////////////////////////////////////////////////////////////
    //                                                                           //
    // packages/modules-runtime/modern.js                                        //
    //                                                                           //
    ///////////////////////////////////////////////////////////////////////////////
    //
    meteorInstall = makeInstaller({
      // On the client, make package resolution prefer the "browser" field of
      // package.json over the "module" field over the "main" field.
      browser: true,
      mainFields: ["browser", "module", "main"],

      fallback: function (id, parentId, error) {
        if (id && id.startsWith("meteor/")) {
          var packageName = id.split("/", 2)[1];
          throw new Error(
            'Cannot find package "' +
              packageName +
              '". ' +
              'Try "meteor add ' +
              packageName +
              '".'
          );
        }

        throw error;
      },
    });

    ///////////////////////////////////////////////////////////////////////////////
  }.call(this));

  (function () {
    ///////////////////////////////////////////////////////////////////////////////
    //                                                                           //
    // packages/modules-runtime/profile.js                                       //
    //                                                                           //
    ///////////////////////////////////////////////////////////////////////////////
    //
    if (typeof Profile === "function" && process.env.METEOR_PROFILE) {
      var Mp = meteorInstall.Module.prototype;
      Mp.require = Profile(function (id) {
        return "require(" + JSON.stringify(id) + ")";
      }, Mp.require);
    }

    ///////////////////////////////////////////////////////////////////////////////
  }.call(this));

  /* Exports */
  Package._define("modules-runtime", {
    meteorInstall: meteorInstall,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var meteorInstall = Package["modules-runtime"].meteorInstall;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          modules: {
            "client.js": function _module(_require, _exports) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                       //
              // packages/modules/client.js                                                                            //
              //                                                                                                       //
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _require("./install-packages.js");
              _require("./stubs.js");
              _require("./process.js");
              _require("./reify.js");

              _exports.addStyles = _require("./css").addStyles;

              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "css.js": function _module2(_require3, _exports3) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                       //
              // packages/modules/css.js                                                                               //
              //                                                                                                       //
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              var doc = document;
              var head = doc.getElementsByTagName("head").item(0);

              _exports3.addStyles = function (css) {
                var style = doc.createElement("style");

                style.setAttribute("type", "text/css");

                // https://msdn.microsoft.com/en-us/library/ms535871(v=vs.85).aspx
                var internetExplorerSheetObject =
                  style.sheet || style.styleSheet; // Edge/IE11. // Older IEs.

                if (internetExplorerSheetObject) {
                  internetExplorerSheetObject.cssText = css;
                } else {
                  style.appendChild(doc.createTextNode(css));
                }

                return head.appendChild(style);
              };

              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "install-packages.js": function module(
              _require4,
              _exports4,
              _module3
            ) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                       //
              // packages/modules/install-packages.js                                                                  //
              //                                                                                                       //
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              function install(name, mainModule) {
                var meteorDir = {};

                // Given a package name <name>, install a stub module in the
                // /node_modules/meteor directory called <name>.js, so that
                // require.resolve("meteor/<name>") will always return
                // /node_modules/meteor/<name>.js instead of something like
                // /node_modules/meteor/<name>/index.js, in the rare but possible event
                // that the package contains a file called index.js (#6590).

                if (typeof mainModule === "string") {
                  // Set up an alias from /node_modules/meteor/<package>.js to the main
                  // module, e.g. meteor/<package>/index.js.
                  meteorDir[name + ".js"] = mainModule;
                } else {
                  // back compat with old Meteor packages
                  meteorDir[name + ".js"] = function (r, e, _module4) {
                    _module4.exports = Package[name];
                  };
                }

                meteorInstall({
                  node_modules: {
                    meteor: meteorDir,
                  },
                });
              }

              // This file will be modified during computeJsOutputFilesMap to include
              // install(<name>) calls for every Meteor package.

              install("meteor");
              install("meteor-base");
              install("modules-runtime");
              install("modules", "meteor/modules/client.js");
              install("modern-browsers");
              install("babel-compiler");
              install("ecmascript");
              install("ecmascript-runtime");
              install("babel-runtime", "meteor/babel-runtime/babel-runtime.js");
              install("promise", "meteor/promise/client.js");
              install("fetch", "meteor/fetch/modern.js");
              install("dynamic-import", "meteor/dynamic-import/client.js");
              install("es5-shim");
              install(
                "ecmascript-runtime-client",
                "meteor/ecmascript-runtime-client/modern.js"
              );
              install("webapp", "meteor/webapp/webapp_client.js");
              install("base64", "meteor/base64/base64.js");
              install("ejson", "meteor/ejson/ejson.js");
              install("check", "meteor/check/match.js");
              install("random", "meteor/random/main_client.js");
              install("tracker");
              install("retry", "meteor/retry/retry.js");
              install("id-map", "meteor/id-map/id-map.js");
              install("callback-hook", "meteor/callback-hook/hook.js");
              install("ddp-common");
              install("reload", "meteor/reload/reload.js");
              install(
                "socket-stream-client",
                "meteor/socket-stream-client/browser.js"
              );
              install("diff-sequence", "meteor/diff-sequence/diff.js");
              install("mongo-id", "meteor/mongo-id/id.js");
              install("ddp-client", "meteor/ddp-client/client/client.js");
              install("ddp");
              install("ddp-server");
              install("livedata");
              install("hot-code-push");
              install("autoupdate", "meteor/autoupdate/autoupdate_client.js");

              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "process.js": function module(_require5, _exports5, _module5) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                       //
              // packages/modules/process.js                                                                           //
              //                                                                                                       //
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              if (!global.process) {
                try {
                  // The application can run `npm install process` to provide its own
                  // process stub; otherwise this module will provide a partial stub.
                  global.process = _require5("process");
                } catch (missing) {
                  global.process = {};
                }
              }

              var proc = global.process;

              if (Meteor.isServer) {
                // Make require("process") work on the server in all versions of Node.
                meteorInstall({
                  node_modules: {
                    "process.js": function (r, e, _module6) {
                      _module6.exports = proc;
                    },
                  },
                });
              } else {
                proc.platform = "browser";
                proc.nextTick = proc.nextTick || Meteor._setImmediate;
              }

              if (typeof proc.env !== "object") {
                proc.env = {};
              }

              var hasOwn = Object.prototype.hasOwnProperty;
              for (var key in meteorEnv) {
                if (hasOwn.call(meteorEnv, key)) {
                  proc.env[key] = meteorEnv[key];
                }
              }

              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "reify.js": function module(_require6, _exports6, _module7) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                       //
              // packages/modules/reify.js                                                                             //
              //                                                                                                       //
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _require6("reify/lib/runtime").enable(
                _module7.constructor.prototype
              );

              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "stubs.js": function _module8(_require7) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                       //
              // packages/modules/stubs.js                                                                             //
              //                                                                                                       //
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              var haveStubs = false;
              try {
                _require7.resolve("meteor-node-stubs");
                haveStubs = true;
              } catch (noStubs) {}

              if (haveStubs) {
                // When meteor-node-stubs is installed in the application's root
                // node_modules directory, requiring it here installs aliases for stubs
                // for all Node built-in modules, such as fs, util, and http.
                _require7("meteor-node-stubs");
              }

              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            node_modules: {
              reify: {
                lib: {
                  runtime: {
                    "index.js": function module(
                      _require8,
                      _exports7,
                      _module9
                    ) {
                      // This module should be compatible with PhantomJS v1, just like the other files
                      // in reify/lib/runtime. Node 4+ features like const/let and arrow functions are
                      // not acceptable here, and importing any npm packages should be contemplated
                      // with extreme skepticism.

                      var utils = _require8("./utils.js");
                      var Entry = _require8("./entry.js");

                      // The exports.enable method can be used to enable the Reify runtime for
                      // specific module objects, or for Module.prototype (where implemented),
                      // to make the runtime available throughout the entire module system.
                      _exports7.enable = function (mod) {
                        if (mod.link !== moduleLink) {
                          mod.link = moduleLink;
                          mod["export"] = moduleExport;
                          mod.exportDefault = moduleExportDefault;
                          mod.exportAs = moduleExportAs;
                          mod.runSetters = runSetters;

                          // Legacy shorthand for mod.exportAs("*").
                          mod.makeNsSetter = moduleMakeNsSetter;

                          return true;
                        }

                        return false;
                      };

                      // Calling module.link(id, setters) resolves the given ID using
                      // module.resolve(id), which should return a canonical absolute module
                      // identifier string (like require.resolve); then creates an Entry object
                      // for the child module and evaluates its code (if this is the first time
                      // it has been imported) by calling module.require(id). Finally, the
                      // provided setter functions will be called with values exported by the
                      // module, possibly multiple times when/if those exported values change.
                      // The module.link name is intended to evoke the "liveness" of the
                      // exported bindings, since we are subscribing to all future exports of
                      // the child module, not just taking a snapshot of its current exports.
                      function moduleLink(id, setters, key) {
                        utils.setESModule(this.exports);
                        Entry.getOrCreate(this.id, this);

                        var absChildId = this.resolve(id);
                        var childEntry = Entry.getOrCreate(absChildId);

                        if (utils.isObject(setters)) {
                          childEntry.addSetters(this, setters, key);
                        }

                        var _exports8 = this.require(absChildId);

                        if (childEntry.module === null) {
                          childEntry.module = {
                            id: absChildId,
                            exports: _exports8,
                          };
                        }

                        childEntry.runSetters();
                      }

                      // Register getter functions for local variables in the scope of an export
                      // statement. Pass true as the second argument to indicate that the getter
                      // functions always return the same values.
                      function moduleExport(getters, constant) {
                        utils.setESModule(this.exports);
                        var entry = Entry.getOrCreate(this.id, this);
                        entry.addGetters(getters, constant);
                        if (this.loaded) {
                          // If the module has already been evaluated, then we need to trigger
                          // another round of entry.runSetters calls, which begins by calling
                          // entry.runModuleGetters(module).
                          entry.runSetters();
                        }
                      }

                      // Register a getter function that always returns the given value.
                      function moduleExportDefault(value) {
                        return this["export"](
                          {
                            default: function () {
                              return value;
                            },
                          },
                          true
                        );
                      }

                      // Returns a function suitable for passing as a setter callback to
                      // module.link. If name is an identifier, calling the function will set
                      // the export of that name to the given value. If the name is "*", all
                      // properties of the value object will be exported by name, except for
                      // "default" (use "*+" instead of "*" to include it). Why the "default"
                      // property is skipped: https://github.com/tc39/ecma262/issues/948
                      function moduleExportAs(name) {
                        var entry = this;
                        var includeDefault = name === "*+";
                        return function (value) {
                          if (name === "*" || name === "*+") {
                            Object.keys(value).forEach(function (key) {
                              if (includeDefault || key !== "default") {
                                utils.copyKey(key, entry.exports, value);
                              }
                            });
                          } else {
                            entry.exports[name] = value;
                          }
                        };
                      }

                      // Platform-specific code should find a way to call this method whenever
                      // the module system is about to return module.exports from require. This
                      // might happen more than once per module, in case of dependency cycles,
                      // so we want Module.prototype.runSetters to run each time.
                      function runSetters(valueToPassThrough) {
                        Entry.getOrCreate(this.id, this).runSetters();

                        // Assignments to exported local variables get wrapped with calls to
                        // module.runSetters, so module.runSetters returns the
                        // valueToPassThrough parameter to allow the value of the original
                        // expression to pass through. For example,
                        //
                        //   export var a = 1;
                        //   console.log(a += 3);
                        //
                        // becomes
                        //
                        //   module.export("a", () => a);
                        //   var a = 1;
                        //   console.log(module.runSetters(a += 3));
                        //
                        // This ensures module.runSetters runs immediately after the assignment,
                        // and does not interfere with the larger computation.
                        return valueToPassThrough;
                      }

                      // Legacy helper that returns a function that takes a namespace object and
                      // copies the properties of the namespace to module.exports, excluding any
                      // "default" property (unless includeDefault is true), which is useful for
                      // implementing `export * from "module"`.
                      //
                      // Instead of using this helper like so:
                      //
                      //   module.link(id, { "*": module.makeNsSetter() });
                      //
                      // non-legacy code should simply use a string-valued setter:
                      //
                      //   module.link(id, { "*": "*" });
                      //
                      // or, to include the "default" property:
                      //
                      //   module.link(id, { "*": "*+" });
                      //
                      // This helper may be removed in a future version of Reify.
                      function moduleMakeNsSetter(includeDefault) {
                        return this.exportAs(includeDefault ? "*+" : "*");
                      }

                      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                    },
                    "utils.js": function module(
                      _require9,
                      _exports9,
                      _module10
                    ) {
                      // This module should be compatible with PhantomJS v1, just like the other files
                      // in reify/lib/runtime. Node 4+ features like const/let and arrow functions are
                      // not acceptable here, and importing any npm packages should be contemplated
                      // with extreme skepticism.

                      var useSetPrototypeOf =
                        typeof Object.setPrototypeOf === "function";
                      var useSymbol = typeof Symbol === "function";

                      var esStrKey = "__esModule";
                      var esSymKey = useSymbol ? Symbol.for(esStrKey) : null;
                      var useToStringTag =
                        useSymbol && typeof Symbol.toStringTag === "symbol";
                      var useGetOwnPropDesc =
                        typeof Object.getOwnPropertyDescriptor === "function";
                      var hasOwn = Object.prototype.hasOwnProperty;

                      function copyKey(key, target, source) {
                        if (useGetOwnPropDesc) {
                          var desc = Object.getOwnPropertyDescriptor(
                            source,
                            key
                          );
                          desc.configurable = true; // Allow redefinition.
                          Object.defineProperty(target, key, desc);
                        } else {
                          target[key] = source[key];
                        }
                      }

                      _exports9.copyKey = copyKey;

                      // Returns obj[key] unless that property is defined by a getter function,
                      // in which case the getter function is returned.
                      _exports9.valueOrGetter = function (obj, key) {
                        if (useGetOwnPropDesc && hasOwn.call(obj, key)) {
                          var desc = Object.getOwnPropertyDescriptor(obj, key);
                          if (typeof desc.get === "function") {
                            return desc.get;
                          }
                        }

                        return obj[key];
                      };

                      function getESModule(exported) {
                        if (isObjectLike(exported)) {
                          if (useSymbol && hasOwn.call(exported, esSymKey)) {
                            return !!exported[esSymKey];
                          }

                          if (hasOwn.call(exported, esStrKey)) {
                            return !!exported[esStrKey];
                          }
                        }

                        return false;
                      }

                      _exports9.getESModule = getESModule;

                      function setESModule(exported) {
                        if (isObjectLike(exported)) {
                          if (useSymbol) {
                            exported[esSymKey] = true;
                          }

                          if (!exported[esStrKey]) {
                            // Other module runtime systems may set exported.__esModule such
                            // that it can't be redefined, so we call Object.defineProperty only
                            // when exported.__esModule is not already true.
                            Object.defineProperty(exported, esStrKey, {
                              configurable: true,
                              enumerable: false,
                              value: true,
                              writable: false,
                            });
                          }
                        }
                      }

                      _exports9.setESModule = setESModule;

                      function isObject(value) {
                        return typeof value === "object" && value !== null;
                      }

                      _exports9.isObject = isObject;

                      function isObjectLike(value) {
                        var type = typeof value;
                        return (
                          type === "function" ||
                          (type === "object" && value !== null)
                        );
                      }

                      _exports9.isObjectLike = isObjectLike;

                      function createNamespace() {
                        var namespace = Object.create(null);

                        if (useToStringTag) {
                          Object.defineProperty(namespace, Symbol.toStringTag, {
                            value: "Module",
                            configurable: false,
                            enumerable: false,
                            writable: false,
                          });
                        }

                        setESModule(namespace);

                        return namespace;
                      }

                      _exports9.createNamespace = createNamespace;

                      function setPrototypeOf(object, proto) {
                        if (useSetPrototypeOf) {
                          Object.setPrototypeOf(object, proto);
                        } else {
                          object.__proto__ = proto;
                        }
                        return object;
                      }

                      _exports9.setPrototypeOf = setPrototypeOf;

                      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                    },
                    "entry.js": function module(
                      _require10,
                      _exports10,
                      _module11
                    ) {
                      // This module should be compatible with PhantomJS v1, just like the other files
                      // in reify/lib/runtime. Node 4+ features like const/let and arrow functions are
                      // not acceptable here, and importing any npm packages should be contemplated
                      // with extreme skepticism.

                      var utils = _require10("./utils.js");

                      var GETTER_ERROR = {};
                      var NAN = {};
                      var UNDEFINED = {};
                      var hasOwn = Object.prototype.hasOwnProperty;
                      var keySalt = 0;

                      function Entry(id) {
                        // The canonical absolute module ID of the module this Entry manages.
                        this.id = id;
                        // The Module object this Entry manages, unknown until module.export or
                        // module.link is called for the first time.
                        this.module = null;
                        // Getters for local variables exported from the managed module.
                        this.getters = Object.create(null);
                        // Setters for assigning to local variables in parent modules.
                        this.setters = Object.create(null);
                        // The normalized namespace object that importers receive when they use
                        // `import * as namespace from "..."` syntax.
                        this.namespace = utils.createNamespace();
                      }

                      var Ep = utils.setPrototypeOf(Entry.prototype, null);
                      var entryMap = Object.create(null);

                      Entry.getOrCreate = function (id, mod) {
                        var entry = hasOwn.call(entryMap, id)
                          ? entryMap[id]
                          : (entryMap[id] = new Entry(id));

                        if (utils.isObject(mod) && mod.id === entry.id) {
                          entry.module = mod;
                        }

                        return entry;
                      };

                      function safeKeys(obj) {
                        var keys = Object.keys(obj);
                        var esModuleIndex = keys.indexOf("__esModule");
                        if (esModuleIndex >= 0) {
                          keys.splice(esModuleIndex, 1);
                        }
                        return keys;
                      }

                      Ep.addGetters = function (getters, constant) {
                        var names = safeKeys(getters);
                        var nameCount = names.length;
                        constant = !!constant;

                        for (var i = 0; i < nameCount; ++i) {
                          var name = names[i];
                          var getter = getters[name];

                          if (
                            typeof getter === "function" &&
                            // Should this throw if this.getters[name] exists?
                            !(name in this.getters)
                          ) {
                            this.getters[name] = getter;
                            getter.constant = constant;
                            getter.runCount = 0;
                          }
                        }
                      };

                      Ep.addSetters = function (parent, setters, key) {
                        var names = safeKeys(setters);
                        var nameCount = names.length;

                        if (!nameCount) {
                          return;
                        }

                        // If no key is provided, make a unique key. Otherwise, make sure the key is
                        // distinct from keys provided by other parent modules.
                        key =
                          key === void 0
                            ? makeUniqueKey()
                            : parent.id + ":" + key;

                        var entry = this;

                        for (var i = 0; i < nameCount; ++i) {
                          var name = names[i];
                          var setter = normalizeSetterValue(
                            parent,
                            setters[name]
                          );

                          if (typeof setter === "function") {
                            setter.parent = parent;
                            if (!(name in entry.setters)) {
                              entry.setters[name] = Object.create(null);
                            }
                            entry.setters[name][key] = setter;
                          }
                        }

                        entry.runSetters(names);
                      };

                      function normalizeSetterValue(_module12, setter) {
                        if (typeof setter === "function") {
                          return setter;
                        }

                        if (typeof setter === "string") {
                          // If the value of the setter property is a string, the setter will
                          // re-export the imported value using that string as the name of the
                          // exported value. If the string is "*", all properties of the value
                          // object will be re-exported as individual exports, except for the
                          // "default" property (use "*+" instead of "*" to include it).
                          return _module12.exportAs(setter);
                        }

                        if (Array.isArray(setter)) {
                          switch (setter.length) {
                            case 0:
                              return null;
                            case 1:
                              return normalizeSetterValue(_module12, setter[0]);
                            default:
                              var setterFns = setter.map(function (elem) {
                                return normalizeSetterValue(_module12, elem);
                              });

                              // Return a combined function that calls all of the nested setter
                              // functions with the same value.
                              return function (value) {
                                setterFns.forEach(function (fn) {
                                  fn(value);
                                });
                              };
                          }
                        }

                        return null;
                      }

                      Ep.runGetters = function (names) {
                        // Before running getters, copy anything added to the exports object
                        // over to the namespace. Values returned by getters take precedence
                        // over these values, but we don't want to miss anything.
                        syncExportsToNamespace(this, names);

                        if (names === void 0 || names.indexOf("*") >= 0) {
                          names = Object.keys(this.getters);
                        }

                        var nameCount = names.length;

                        for (var i = 0; i < nameCount; ++i) {
                          var name = names[i];
                          var value = runGetter(this, name);

                          // If the getter is run without error, update both entry.namespace and
                          // module.exports with the current value so that CommonJS require
                          // calls remain consistent with module.watch.
                          if (value !== GETTER_ERROR) {
                            this.namespace[name] = value;
                            this.module.exports[name] = value;
                          }
                        }
                      };

                      function syncExportsToNamespace(entry, names) {
                        var setDefault = false;

                        if (entry.module === null) return;
                        var _exports11 = entry.module.exports;

                        if (!utils.getESModule(_exports11)) {
                          // If the module entry is managing overrides module.exports, that
                          // value should be exposed as the .default property of the namespace,
                          // unless module.exports is marked as an ECMASCript module.
                          entry.namespace.default = _exports11;
                          setDefault = true;
                        }

                        if (!utils.isObjectLike(_exports11)) {
                          return;
                        }

                        if (names === void 0 || names.indexOf("*") >= 0) {
                          names = Object.keys(_exports11);
                        }

                        names.forEach(function (key) {
                          // Don't set any properties for which a getter function exists in
                          // entry.getters, don't accidentally override entry.namespace.default,
                          // and only copy own properties from entry.module.exports.
                          if (
                            !hasOwn.call(entry.getters, key) &&
                            !(setDefault && key === "default") &&
                            hasOwn.call(_exports11, key)
                          ) {
                            utils.copyKey(key, entry.namespace, _exports11);
                          }
                        });
                      }

                      // Called whenever module.exports might have changed, to trigger any
                      // setters associated with the newly exported values. The names parameter
                      // is optional; without it, all getters and setters will run.
                      Ep.runSetters = function (names) {
                        // Make sure entry.namespace and module.exports are up to date before we
                        // call getExportByName(entry, name).
                        this.runGetters(names);

                        // Lazily-initialized object mapping parent module identifiers to parent
                        // module objects whose setters we might need to run.
                        var parents;

                        forEachSetter(this, names, function (
                          setter,
                          name,
                          value
                        ) {
                          if (parents === void 0) {
                            parents = Object.create(null);
                          }
                          parents[setter.parent.id] = setter.parent;

                          // The param order for setters is `value` then `name` because the `name`
                          // param is only used by namespace exports.
                          setter(value, name);
                        });

                        if (!parents) {
                          return;
                        }

                        // If any of the setters updated the module.exports of a parent module,
                        // or updated local variables that are exported by that parent module,
                        // then we must re-run any setters registered by that parent module.
                        var parentIDs = Object.keys(parents);
                        var parentIDCount = parentIDs.length;

                        for (var i = 0; i < parentIDCount; ++i) {
                          // What happens if parents[parentIDs[id]] === module, or if
                          // longer cycles exist in the parent chain? Thanks to our setter.last
                          // bookkeeping above, the runSetters broadcast will only proceed
                          // as far as there are any actual changes to report.
                          var parent = parents[parentIDs[i]];
                          var parentEntry = entryMap[parent.id];
                          if (parentEntry) {
                            parentEntry.runSetters();
                          }
                        }
                      };

                      function callSetterIfNecessary(
                        setter,
                        name,
                        value,
                        callback
                      ) {
                        if (name === "__esModule") {
                          // Ignore setters asking for module.exports.__esModule.
                          return;
                        }

                        var shouldCall = false;

                        if (setter.last === void 0) {
                          setter.last = Object.create(null);
                          // Always call the setter if it has never been called before.
                          shouldCall = true;
                        }

                        function changed(name, value) {
                          var valueToCompare = value;
                          if (valueToCompare !== valueToCompare) {
                            valueToCompare = NAN;
                          } else if (valueToCompare === void 0) {
                            valueToCompare = UNDEFINED;
                          }

                          if (setter.last[name] === valueToCompare) {
                            return false;
                          }

                          setter.last[name] = valueToCompare;
                          return true;
                        }

                        if (name === "*") {
                          var keys = safeKeys(value);
                          var keyCount = keys.length;
                          for (var i = 0; i < keyCount; ++i) {
                            var key = keys[i];
                            // Evaluating value[key] is risky because the property might be
                            // defined by a getter function that logs a deprecation warning (or
                            // worse) when evaluated. For example, Node uses this trick to
                            // display a deprecation warning whenever crypto.createCredentials
                            // is accessed. Fortunately, when value[key] is defined by a getter
                            // function, it's enough to check whether the getter function itself
                            // has changed, since we are careful elsewhere to preserve getters
                            // rather than prematurely evaluating them.
                            if (changed(key, utils.valueOrGetter(value, key))) {
                              shouldCall = true;
                            }
                          }
                        } else if (changed(name, value)) {
                          shouldCall = true;
                        }

                        if (shouldCall) {
                          // Only invoke the callback if we have not called this setter
                          // (with a value of this name) before, or the current value is
                          // different from the last value we passed to this setter.
                          return callback(setter, name, value);
                        }
                      }

                      // Invoke the given callback once for every (setter, name, value) that needs to
                      // be called. Note that forEachSetter does not call any setters itself, only the
                      // given callback.
                      function forEachSetter(entry, names, callback) {
                        var needToCheckNames = true;

                        if (names === void 0) {
                          names = Object.keys(entry.setters);
                          needToCheckNames = false;
                        }

                        var nameCount = names.length;

                        for (var i = 0; i < nameCount; ++i) {
                          var name = names[i];

                          if (
                            needToCheckNames &&
                            !hasOwn.call(entry.setters, name)
                          ) {
                            continue;
                          }

                          var setters = entry.setters[name];
                          var keys = Object.keys(setters);
                          var keyCount = keys.length;

                          for (var j = 0; j < keyCount; ++j) {
                            var key = keys[j];
                            var value = getExportByName(entry, name);

                            callSetterIfNecessary(
                              setters[key],
                              name,
                              value,
                              callback
                            );

                            var getter = entry.getters[name];
                            if (
                              typeof getter === "function" &&
                              // Sometimes a getter function will throw because it's called
                              // before the variable it's supposed to return has been
                              // initialized, so we need to know that the getter function has
                              // run to completion at least once.
                              getter.runCount > 0 &&
                              getter.constant
                            ) {
                              // If we happen to know that this getter function has run
                              // successfully, and will never return a different value, then we
                              // can forget the corresponding setter, because we've already
                              // reported that constant value. Note that we can't forget the
                              // getter, because we need to remember the original value in case
                              // anyone tampers with entry.module.exports[name].
                              delete setters[key];
                            }
                          }
                        }
                      }

                      function getExportByName(entry, name) {
                        if (name === "*") {
                          return entry.namespace;
                        }

                        if (hasOwn.call(entry.namespace, name)) {
                          return entry.namespace[name];
                        }

                        if (entry.module === null) return;
                        var exports = entry.module.exports;

                        if (
                          name === "default" &&
                          !(utils.getESModule(exports) && "default" in exports)
                        ) {
                          return exports;
                        }

                        if (exports == null) {
                          return;
                        }

                        return exports[name];
                      }

                      function makeUniqueKey() {
                        return (
                          Math.random()
                            .toString(36)
                            // Add an incrementing salt to help track key ordering and also
                            // absolutely guarantee we never return the same key twice.
                            .replace("0.", ++keySalt + "$")
                        );
                      }

                      function runGetter(entry, name) {
                        var getter = entry.getters[name];
                        try {
                          var result = getter();
                          ++getter.runCount;
                          return result;
                        } catch (e) {}
                        return GETTER_ERROR;
                      }

                      _module11.exports = Entry;

                      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                    },
                  },
                },
              },
            },
          },
        },
        "meteor-node-stubs": {
          "package.json": function module(_require11, _exports12, _module13) {
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            //                                                                                                       //
            // node_modules/meteor-node-stubs/package.json                                                           //
            //                                                                                                       //
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            //
            _module13.exports = {
              name: "meteor-node-stubs",
              version: "1.0.1",
              main: "index.js",
            };

            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
          },
          "index.js": function module(_require12, _exports13, _module14) {
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            //                                                                                                       //
            // node_modules/meteor-node-stubs/index.js                                                               //
            //                                                                                                       //
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            //
            var map = _require12("./map.json");
            var meteorAliases = {};

            Object.keys(map).forEach(function (id) {
              if (typeof map[id] === "string") {
                var aliasParts = _module14.id.split("/");
                aliasParts.pop();
                aliasParts.push("node_modules", map[id]);
                _exports13[id] = meteorAliases[id + ".js"] = aliasParts.join(
                  "/"
                );
              } else {
                _exports13[id] = map[id];
                meteorAliases[id + ".js"] = function () {};
              }
            });

            if (typeof meteorInstall === "function") {
              meteorInstall({
                // Install the aliases into a node_modules directory one level up from
                // the root directory, so that they do not clutter the namespace
                // available to apps and packages.
                "..": {
                  node_modules: meteorAliases,
                },
              });
            }

            // If Buffer is not defined globally, but the "buffer" built-in stub is
            // installed and can be imported, use it to define global.Buffer so that
            // modules like core-util-is/lib/util.js can refer to Buffer without
            // crashing application startup.
            if (typeof global.Buffer !== "function") {
              try {
                // Use (0, require)(...) to avoid registering a dependency on the
                // "buffer" stub, in case it is not otherwise bundled.
                global.Buffer = (0, _require12)("buffer").Buffer;
              } catch (ok) {
                // Failure to import "buffer" is fine as long as the Buffer global
                // variable is not used.
              }
            }

            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
          },
          "map.json": function module(_require13, _exports14, _module15) {
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            //                                                                                                       //
            // node_modules/meteor-node-stubs/map.json                                                               //
            //                                                                                                       //
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            //
            _module15.exports = {
              assert: "assert/",
              buffer: "buffer/",
              child_process: null,
              cluster: null,
              console: "console-browserify",
              constants: "constants-browserify",
              crypto: "../wrappers/crypto.js",
              dgram: null,
              dns: null,
              domain: "domain-browser",
              events: "events/",
              fs: null,
              http: "stream-http",
              https: "https-browserify",
              module: "../wrappers/module.js",
              net: null,
              os: "os-browserify/browser.js",
              path: "path-browserify",
              process: "process/browser.js",
              punycode: "punycode/",
              querystring: "querystring-es3/",
              readline: null,
              repl: null,
              stream: "stream-browserify",
              _stream_duplex: "readable-stream/lib/_stream_duplex.js",
              _stream_passthrough: "readable-stream/lib/_stream_passthrough.js",
              _stream_readable: "readable-stream/lib/_stream_readable.js",
              _stream_transform: "readable-stream/lib/_stream_transform.js",
              _stream_writable: "readable-stream/lib/_stream_writable.js",
              string_decoder: "string_decoder/",
              sys: "util/util.js",
              timers: "timers-browserify",
              tls: null,
              tty: "tty-browserify",
              url: "url/",
              util: "util/util.js",
              vm: "vm-browserify",
              zlib: "browserify-zlib",
            };

            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
          },
          deps: {
            "process.js": function _module16(_require14) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                       //
              // node_modules/meteor-node-stubs/deps/process.js                                                        //
              //                                                                                                       //
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _require14("process/browser.js");

              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
          node_modules: {
            process: {
              "browser.js": function module(_require15, _exports15, _module17) {
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                //                                                                                                       //
                // node_modules/meteor-node-stubs/node_modules/process/browser.js                                        //
                //                                                                                                       //
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                //
                // shim for using process in browser
                var process = (_module17.exports = {});

                // cached from whatever global is present so that test runners that stub it
                // don't break things.  But we need to wrap it in a try catch in case it is
                // wrapped in strict mode code which doesn't define any globals.  It's inside a
                // function because try/catches deoptimize in certain engines.

                var cachedSetTimeout;
                var cachedClearTimeout;

                function defaultSetTimout() {
                  throw new Error("setTimeout has not been defined");
                }
                function defaultClearTimeout() {
                  throw new Error("clearTimeout has not been defined");
                }
                (function () {
                  try {
                    if (typeof setTimeout === "function") {
                      cachedSetTimeout = setTimeout;
                    } else {
                      cachedSetTimeout = defaultSetTimout;
                    }
                  } catch (e) {
                    cachedSetTimeout = defaultSetTimout;
                  }
                  try {
                    if (typeof clearTimeout === "function") {
                      cachedClearTimeout = clearTimeout;
                    } else {
                      cachedClearTimeout = defaultClearTimeout;
                    }
                  } catch (e) {
                    cachedClearTimeout = defaultClearTimeout;
                  }
                })();
                function runTimeout(fun) {
                  if (cachedSetTimeout === setTimeout) {
                    //normal enviroments in sane situations
                    return setTimeout(fun, 0);
                  }
                  // if setTimeout wasn't available but was latter defined
                  if (
                    (cachedSetTimeout === defaultSetTimout ||
                      !cachedSetTimeout) &&
                    setTimeout
                  ) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                  }
                  try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedSetTimeout(fun, 0);
                  } catch (e) {
                    try {
                      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                      return cachedSetTimeout.call(null, fun, 0);
                    } catch (e) {
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
                  if (
                    (cachedClearTimeout === defaultClearTimeout ||
                      !cachedClearTimeout) &&
                    clearTimeout
                  ) {
                    cachedClearTimeout = clearTimeout;
                    return clearTimeout(marker);
                  }
                  try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedClearTimeout(marker);
                  } catch (e) {
                    try {
                      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                      return cachedClearTimeout.call(null, marker);
                    } catch (e) {
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
                  while (len) {
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
                process.title = "browser";
                process.browser = true;
                process.env = {};
                process.argv = [];
                process.version = ""; // empty string to avoid regexp issues
                process.versions = {};

                function noop() {}

                process.on = noop;
                process.addListener = noop;
                process.once = noop;
                process.off = noop;
                process.removeListener = noop;
                process.removeAllListeners = noop;
                process.emit = noop;
                process.prependListener = noop;
                process.prependOnceListener = noop;

                process.listeners = function (name) {
                  return [];
                };

                process.binding = function (name) {
                  throw new Error("process.binding is not supported");
                };

                process.cwd = function () {
                  return "/";
                };
                process.chdir = function (dir) {
                  throw new Error("process.chdir is not supported");
                };
                process.umask = function () {
                  return 0;
                };

                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              },
            },
          },
        },
        "@babel": {
          runtime: {
            "package.json": function module(_require16, _exports16, _module18) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                       //
              // node_modules/@babel/runtime/package.json                                                              //
              //                                                                                                       //
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module18.exports = {
                author: {
                  name: "Sebastian McKenzie",
                  email: "sebmck@gmail.com",
                },
                bugs: {
                  url: "https://github.com/babel/babel/issues",
                },
                bundleDependencies: false,
                dependencies: {
                  "regenerator-runtime": "^0.13.4",
                },
                deprecated: false,
                description: "babel's modular runtime helpers",
                exports: {
                  "./helpers/": "./helpers/",
                  "./helpers/typeof": "./helpers/typeof.js",
                  "./helpers/jsx": "./helpers/jsx.js",
                  "./helpers/asyncIterator": "./helpers/asyncIterator.js",
                  "./helpers/AwaitValue": "./helpers/AwaitValue.js",
                  "./helpers/AsyncGenerator": "./helpers/AsyncGenerator.js",
                  "./helpers/wrapAsyncGenerator":
                    "./helpers/wrapAsyncGenerator.js",
                  "./helpers/awaitAsyncGenerator":
                    "./helpers/awaitAsyncGenerator.js",
                  "./helpers/asyncGeneratorDelegate":
                    "./helpers/asyncGeneratorDelegate.js",
                  "./helpers/asyncToGenerator": "./helpers/asyncToGenerator.js",
                  "./helpers/classCallCheck": "./helpers/classCallCheck.js",
                  "./helpers/createClass": "./helpers/createClass.js",
                  "./helpers/defineEnumerableProperties":
                    "./helpers/defineEnumerableProperties.js",
                  "./helpers/defaults": "./helpers/defaults.js",
                  "./helpers/defineProperty": "./helpers/defineProperty.js",
                  "./helpers/extends": "./helpers/extends.js",
                  "./helpers/objectSpread": "./helpers/objectSpread.js",
                  "./helpers/objectSpread2": "./helpers/objectSpread2.js",
                  "./helpers/inherits": "./helpers/inherits.js",
                  "./helpers/inheritsLoose": "./helpers/inheritsLoose.js",
                  "./helpers/getPrototypeOf": "./helpers/getPrototypeOf.js",
                  "./helpers/setPrototypeOf": "./helpers/setPrototypeOf.js",
                  "./helpers/isNativeReflectConstruct":
                    "./helpers/isNativeReflectConstruct.js",
                  "./helpers/construct": "./helpers/construct.js",
                  "./helpers/isNativeFunction": "./helpers/isNativeFunction.js",
                  "./helpers/wrapNativeSuper": "./helpers/wrapNativeSuper.js",
                  "./helpers/instanceof": "./helpers/instanceof.js",
                  "./helpers/interopRequireDefault":
                    "./helpers/interopRequireDefault.js",
                  "./helpers/interopRequireWildcard":
                    "./helpers/interopRequireWildcard.js",
                  "./helpers/newArrowCheck": "./helpers/newArrowCheck.js",
                  "./helpers/objectDestructuringEmpty":
                    "./helpers/objectDestructuringEmpty.js",
                  "./helpers/objectWithoutPropertiesLoose":
                    "./helpers/objectWithoutPropertiesLoose.js",
                  "./helpers/objectWithoutProperties":
                    "./helpers/objectWithoutProperties.js",
                  "./helpers/assertThisInitialized":
                    "./helpers/assertThisInitialized.js",
                  "./helpers/possibleConstructorReturn":
                    "./helpers/possibleConstructorReturn.js",
                  "./helpers/createSuper": "./helpers/createSuper.js",
                  "./helpers/superPropBase": "./helpers/superPropBase.js",
                  "./helpers/get": "./helpers/get.js",
                  "./helpers/set": "./helpers/set.js",
                  "./helpers/taggedTemplateLiteral":
                    "./helpers/taggedTemplateLiteral.js",
                  "./helpers/taggedTemplateLiteralLoose":
                    "./helpers/taggedTemplateLiteralLoose.js",
                  "./helpers/readOnlyError": "./helpers/readOnlyError.js",
                  "./helpers/classNameTDZError":
                    "./helpers/classNameTDZError.js",
                  "./helpers/temporalUndefined":
                    "./helpers/temporalUndefined.js",
                  "./helpers/tdz": "./helpers/tdz.js",
                  "./helpers/temporalRef": "./helpers/temporalRef.js",
                  "./helpers/slicedToArray": "./helpers/slicedToArray.js",
                  "./helpers/slicedToArrayLoose":
                    "./helpers/slicedToArrayLoose.js",
                  "./helpers/toArray": "./helpers/toArray.js",
                  "./helpers/toConsumableArray":
                    "./helpers/toConsumableArray.js",
                  "./helpers/arrayWithoutHoles":
                    "./helpers/arrayWithoutHoles.js",
                  "./helpers/arrayWithHoles": "./helpers/arrayWithHoles.js",
                  "./helpers/maybeArrayLike": "./helpers/maybeArrayLike.js",
                  "./helpers/iterableToArray": "./helpers/iterableToArray.js",
                  "./helpers/iterableToArrayLimit":
                    "./helpers/iterableToArrayLimit.js",
                  "./helpers/iterableToArrayLimitLoose":
                    "./helpers/iterableToArrayLimitLoose.js",
                  "./helpers/unsupportedIterableToArray":
                    "./helpers/unsupportedIterableToArray.js",
                  "./helpers/arrayLikeToArray": "./helpers/arrayLikeToArray.js",
                  "./helpers/nonIterableSpread":
                    "./helpers/nonIterableSpread.js",
                  "./helpers/nonIterableRest": "./helpers/nonIterableRest.js",
                  "./helpers/createForOfIteratorHelper":
                    "./helpers/createForOfIteratorHelper.js",
                  "./helpers/createForOfIteratorHelperLoose":
                    "./helpers/createForOfIteratorHelperLoose.js",
                  "./helpers/skipFirstGeneratorNext":
                    "./helpers/skipFirstGeneratorNext.js",
                  "./helpers/toPrimitive": "./helpers/toPrimitive.js",
                  "./helpers/toPropertyKey": "./helpers/toPropertyKey.js",
                  "./helpers/initializerWarningHelper":
                    "./helpers/initializerWarningHelper.js",
                  "./helpers/initializerDefineProperty":
                    "./helpers/initializerDefineProperty.js",
                  "./helpers/applyDecoratedDescriptor":
                    "./helpers/applyDecoratedDescriptor.js",
                  "./helpers/classPrivateFieldLooseKey":
                    "./helpers/classPrivateFieldLooseKey.js",
                  "./helpers/classPrivateFieldLooseBase":
                    "./helpers/classPrivateFieldLooseBase.js",
                  "./helpers/classPrivateFieldGet":
                    "./helpers/classPrivateFieldGet.js",
                  "./helpers/classPrivateFieldSet":
                    "./helpers/classPrivateFieldSet.js",
                  "./helpers/classPrivateFieldDestructureSet":
                    "./helpers/classPrivateFieldDestructureSet.js",
                  "./helpers/classStaticPrivateFieldSpecGet":
                    "./helpers/classStaticPrivateFieldSpecGet.js",
                  "./helpers/classStaticPrivateFieldSpecSet":
                    "./helpers/classStaticPrivateFieldSpecSet.js",
                  "./helpers/classStaticPrivateMethodGet":
                    "./helpers/classStaticPrivateMethodGet.js",
                  "./helpers/classStaticPrivateMethodSet":
                    "./helpers/classStaticPrivateMethodSet.js",
                  "./helpers/decorate": "./helpers/decorate.js",
                  "./helpers/classPrivateMethodGet":
                    "./helpers/classPrivateMethodGet.js",
                  "./helpers/classPrivateMethodSet":
                    "./helpers/classPrivateMethodSet.js",
                  "./helpers/wrapRegExp": "./helpers/wrapRegExp.js",
                  "./helpers/esm/typeof": "./helpers/esm/typeof.js",
                  "./helpers/esm/jsx": "./helpers/esm/jsx.js",
                  "./helpers/esm/asyncIterator":
                    "./helpers/esm/asyncIterator.js",
                  "./helpers/esm/AwaitValue": "./helpers/esm/AwaitValue.js",
                  "./helpers/esm/AsyncGenerator":
                    "./helpers/esm/AsyncGenerator.js",
                  "./helpers/esm/wrapAsyncGenerator":
                    "./helpers/esm/wrapAsyncGenerator.js",
                  "./helpers/esm/awaitAsyncGenerator":
                    "./helpers/esm/awaitAsyncGenerator.js",
                  "./helpers/esm/asyncGeneratorDelegate":
                    "./helpers/esm/asyncGeneratorDelegate.js",
                  "./helpers/esm/asyncToGenerator":
                    "./helpers/esm/asyncToGenerator.js",
                  "./helpers/esm/classCallCheck":
                    "./helpers/esm/classCallCheck.js",
                  "./helpers/esm/createClass": "./helpers/esm/createClass.js",
                  "./helpers/esm/defineEnumerableProperties":
                    "./helpers/esm/defineEnumerableProperties.js",
                  "./helpers/esm/defaults": "./helpers/esm/defaults.js",
                  "./helpers/esm/defineProperty":
                    "./helpers/esm/defineProperty.js",
                  "./helpers/esm/extends": "./helpers/esm/extends.js",
                  "./helpers/esm/objectSpread": "./helpers/esm/objectSpread.js",
                  "./helpers/esm/objectSpread2":
                    "./helpers/esm/objectSpread2.js",
                  "./helpers/esm/inherits": "./helpers/esm/inherits.js",
                  "./helpers/esm/inheritsLoose":
                    "./helpers/esm/inheritsLoose.js",
                  "./helpers/esm/getPrototypeOf":
                    "./helpers/esm/getPrototypeOf.js",
                  "./helpers/esm/setPrototypeOf":
                    "./helpers/esm/setPrototypeOf.js",
                  "./helpers/esm/isNativeReflectConstruct":
                    "./helpers/esm/isNativeReflectConstruct.js",
                  "./helpers/esm/construct": "./helpers/esm/construct.js",
                  "./helpers/esm/isNativeFunction":
                    "./helpers/esm/isNativeFunction.js",
                  "./helpers/esm/wrapNativeSuper":
                    "./helpers/esm/wrapNativeSuper.js",
                  "./helpers/esm/instanceof": "./helpers/esm/instanceof.js",
                  "./helpers/esm/interopRequireDefault":
                    "./helpers/esm/interopRequireDefault.js",
                  "./helpers/esm/interopRequireWildcard":
                    "./helpers/esm/interopRequireWildcard.js",
                  "./helpers/esm/newArrowCheck":
                    "./helpers/esm/newArrowCheck.js",
                  "./helpers/esm/objectDestructuringEmpty":
                    "./helpers/esm/objectDestructuringEmpty.js",
                  "./helpers/esm/objectWithoutPropertiesLoose":
                    "./helpers/esm/objectWithoutPropertiesLoose.js",
                  "./helpers/esm/objectWithoutProperties":
                    "./helpers/esm/objectWithoutProperties.js",
                  "./helpers/esm/assertThisInitialized":
                    "./helpers/esm/assertThisInitialized.js",
                  "./helpers/esm/possibleConstructorReturn":
                    "./helpers/esm/possibleConstructorReturn.js",
                  "./helpers/esm/createSuper": "./helpers/esm/createSuper.js",
                  "./helpers/esm/superPropBase":
                    "./helpers/esm/superPropBase.js",
                  "./helpers/esm/get": "./helpers/esm/get.js",
                  "./helpers/esm/set": "./helpers/esm/set.js",
                  "./helpers/esm/taggedTemplateLiteral":
                    "./helpers/esm/taggedTemplateLiteral.js",
                  "./helpers/esm/taggedTemplateLiteralLoose":
                    "./helpers/esm/taggedTemplateLiteralLoose.js",
                  "./helpers/esm/readOnlyError":
                    "./helpers/esm/readOnlyError.js",
                  "./helpers/esm/classNameTDZError":
                    "./helpers/esm/classNameTDZError.js",
                  "./helpers/esm/temporalUndefined":
                    "./helpers/esm/temporalUndefined.js",
                  "./helpers/esm/tdz": "./helpers/esm/tdz.js",
                  "./helpers/esm/temporalRef": "./helpers/esm/temporalRef.js",
                  "./helpers/esm/slicedToArray":
                    "./helpers/esm/slicedToArray.js",
                  "./helpers/esm/slicedToArrayLoose":
                    "./helpers/esm/slicedToArrayLoose.js",
                  "./helpers/esm/toArray": "./helpers/esm/toArray.js",
                  "./helpers/esm/toConsumableArray":
                    "./helpers/esm/toConsumableArray.js",
                  "./helpers/esm/arrayWithoutHoles":
                    "./helpers/esm/arrayWithoutHoles.js",
                  "./helpers/esm/arrayWithHoles":
                    "./helpers/esm/arrayWithHoles.js",
                  "./helpers/esm/maybeArrayLike":
                    "./helpers/esm/maybeArrayLike.js",
                  "./helpers/esm/iterableToArray":
                    "./helpers/esm/iterableToArray.js",
                  "./helpers/esm/iterableToArrayLimit":
                    "./helpers/esm/iterableToArrayLimit.js",
                  "./helpers/esm/iterableToArrayLimitLoose":
                    "./helpers/esm/iterableToArrayLimitLoose.js",
                  "./helpers/esm/unsupportedIterableToArray":
                    "./helpers/esm/unsupportedIterableToArray.js",
                  "./helpers/esm/arrayLikeToArray":
                    "./helpers/esm/arrayLikeToArray.js",
                  "./helpers/esm/nonIterableSpread":
                    "./helpers/esm/nonIterableSpread.js",
                  "./helpers/esm/nonIterableRest":
                    "./helpers/esm/nonIterableRest.js",
                  "./helpers/esm/createForOfIteratorHelper":
                    "./helpers/esm/createForOfIteratorHelper.js",
                  "./helpers/esm/createForOfIteratorHelperLoose":
                    "./helpers/esm/createForOfIteratorHelperLoose.js",
                  "./helpers/esm/skipFirstGeneratorNext":
                    "./helpers/esm/skipFirstGeneratorNext.js",
                  "./helpers/esm/toPrimitive": "./helpers/esm/toPrimitive.js",
                  "./helpers/esm/toPropertyKey":
                    "./helpers/esm/toPropertyKey.js",
                  "./helpers/esm/initializerWarningHelper":
                    "./helpers/esm/initializerWarningHelper.js",
                  "./helpers/esm/initializerDefineProperty":
                    "./helpers/esm/initializerDefineProperty.js",
                  "./helpers/esm/applyDecoratedDescriptor":
                    "./helpers/esm/applyDecoratedDescriptor.js",
                  "./helpers/esm/classPrivateFieldLooseKey":
                    "./helpers/esm/classPrivateFieldLooseKey.js",
                  "./helpers/esm/classPrivateFieldLooseBase":
                    "./helpers/esm/classPrivateFieldLooseBase.js",
                  "./helpers/esm/classPrivateFieldGet":
                    "./helpers/esm/classPrivateFieldGet.js",
                  "./helpers/esm/classPrivateFieldSet":
                    "./helpers/esm/classPrivateFieldSet.js",
                  "./helpers/esm/classPrivateFieldDestructureSet":
                    "./helpers/esm/classPrivateFieldDestructureSet.js",
                  "./helpers/esm/classStaticPrivateFieldSpecGet":
                    "./helpers/esm/classStaticPrivateFieldSpecGet.js",
                  "./helpers/esm/classStaticPrivateFieldSpecSet":
                    "./helpers/esm/classStaticPrivateFieldSpecSet.js",
                  "./helpers/esm/classStaticPrivateMethodGet":
                    "./helpers/esm/classStaticPrivateMethodGet.js",
                  "./helpers/esm/classStaticPrivateMethodSet":
                    "./helpers/esm/classStaticPrivateMethodSet.js",
                  "./helpers/esm/decorate": "./helpers/esm/decorate.js",
                  "./helpers/esm/classPrivateMethodGet":
                    "./helpers/esm/classPrivateMethodGet.js",
                  "./helpers/esm/classPrivateMethodSet":
                    "./helpers/esm/classPrivateMethodSet.js",
                  "./helpers/esm/wrapRegExp": "./helpers/esm/wrapRegExp.js",
                  "./package": "./package.json",
                  "./package.json": "./package.json",
                  "./regenerator": "./regenerator/index.js",
                  "./regenerator/": "./regenerator/",
                },
                homepage: "https://babeljs.io/",
                license: "MIT",
                name: "@babel/runtime",
                publishConfig: {
                  access: "public",
                },
                repository: {
                  type: "git",
                  url: "git+https://github.com/babel/babel.git",
                  directory: "packages/babel-runtime",
                },
                version: "7.12.5",
              };

              ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            helpers: {
              "objectSpread2.js": function module(
                _require17,
                _exports17,
                _module19
              ) {
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                //                                                                                                       //
                // node_modules/@babel/runtime/helpers/objectSpread2.js                                                  //
                //                                                                                                       //
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                //
                var defineProperty = _require17("./defineProperty");

                function ownKeys(object, enumerableOnly) {
                  var keys = Object.keys(object);

                  if (Object.getOwnPropertySymbols) {
                    var symbols = Object.getOwnPropertySymbols(object);
                    if (enumerableOnly)
                      symbols = symbols.filter(function (sym) {
                        return Object.getOwnPropertyDescriptor(
                          object,
                          sym
                        ).enumerable;
                      });
                    keys.push.apply(keys, symbols);
                  }

                  return keys;
                }

                function _objectSpread2(target) {
                  for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i] != null ? arguments[i] : {};

                    if (i % 2) {
                      ownKeys(Object(source), true).forEach(function (key) {
                        defineProperty(target, key, source[key]);
                      });
                    } else if (Object.getOwnPropertyDescriptors) {
                      Object.defineProperties(
                        target,
                        Object.getOwnPropertyDescriptors(source)
                      );
                    } else {
                      ownKeys(Object(source)).forEach(function (key) {
                        Object.defineProperty(
                          target,
                          key,
                          Object.getOwnPropertyDescriptor(source, key)
                        );
                      });
                    }
                  }

                  return target;
                }

                _module19.exports = _objectSpread2;
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              },
              "defineProperty.js": function module(
                _require18,
                _exports18,
                _module20
              ) {
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                //                                                                                                       //
                // node_modules/@babel/runtime/helpers/defineProperty.js                                                 //
                //                                                                                                       //
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                //
                function _defineProperty(obj, key, value) {
                  if (key in obj) {
                    Object.defineProperty(obj, key, {
                      value: value,
                      enumerable: true,
                      configurable: true,
                      writable: true,
                    });
                  } else {
                    obj[key] = value;
                  }

                  return obj;
                }

                _module20.exports = _defineProperty;
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              },
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/modules/client.js");

  /* Exports */
  Package._define("modules", _exports2, {
    meteorInstall: meteorInstall,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Exports */
  Package._define("modern-browsers");
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Exports */
  Package._define("babel-compiler");
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Exports */
  Package._define("ecmascript");
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Exports */
  Package._define("ecmascript-runtime");
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var meteorInstall = Package.modules.meteorInstall;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          "babel-runtime": {
            "babel-runtime.js": function _module(_require) {
              /////////////////////////////////////////////////////////////////////////////////////
              //                                                                                 //
              // packages/babel-runtime/babel-runtime.js                                         //
              //                                                                                 //
              /////////////////////////////////////////////////////////////////////////////////////
              //
              try {
                var babelRuntimeVersion = _require(
                  "@babel/runtime/package.json"
                ).version;
              } catch (e) {
                throw new Error(
                  [
                    "",
                    "The @babel/runtime npm package could not be found in your node_modules ",
                    "directory. Please run the following command to install it:",
                    "",
                    "  meteor npm install --save @babel/runtime",
                    "",
                  ].join("\n")
                );
              }

              if (
                parseInt(babelRuntimeVersion, 10) < 7 ||
                (babelRuntimeVersion.indexOf("7.0.0-beta.") === 0 &&
                  parseInt(babelRuntimeVersion.split(".").pop(), 10) < 56)
              ) {
                console.error(
                  [
                    "The version of @babel/runtime installed in your node_modules directory ",
                    "(" +
                      babelRuntimeVersion +
                      ") is out of date. Please upgrade it by running ",
                    "",
                    "  meteor npm install --save @babel/runtime@latest",
                    "",
                    "in your application directory.",
                    "",
                  ].join("\n")
                );
              }

              /////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports = _require2(
    "/node_modules/meteor/babel-runtime/babel-runtime.js"
  );

  /* Exports */
  Package._define("babel-runtime", _exports);
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var meteorInstall = Package.modules.meteorInstall;

  /* Package-scope variables */
  var Promise;

  var _require = meteorInstall(
    {
      node_modules: {
        meteor: {
          promise: {
            "modern.js": function _module() {
              /////////////////////////////////////////////////////////////////////////////
              //                                                                         //
              // packages/promise/modern.js                                              //
              //                                                                         //
              /////////////////////////////////////////////////////////////////////////////
              //
              // Initialize the package-scoped Promise variable with global.Promise in
              // all environments, even if it's not defined.
              Promise = global.Promise;

              /////////////////////////////////////////////////////////////////////////////
            },
            "client.js": function _module2(_require2) {
              /////////////////////////////////////////////////////////////////////////////
              //                                                                         //
              // packages/promise/client.js                                              //
              //                                                                         //
              /////////////////////////////////////////////////////////////////////////////
              //
              _require2("./extensions.js");
              _require2("meteor-promise").makeCompatible(Promise);

              /////////////////////////////////////////////////////////////////////////////
            },
            "extensions.js": function _module3() {
              /////////////////////////////////////////////////////////////////////////////
              //                                                                         //
              // packages/promise/extensions.js                                          //
              //                                                                         //
              /////////////////////////////////////////////////////////////////////////////
              //
              var proto = Promise.prototype;
              var hasOwn = Object.prototype.hasOwnProperty;

              proto.done = function (onFulfilled, onRejected) {
                var self = this;

                if (arguments.length > 0) {
                  self = this.then.apply(this, arguments);
                }

                self.then(null, function (err) {
                  Meteor._setImmediate(function () {
                    throw err;
                  });
                });
              };

              if (!hasOwn.call(proto, "finally")) {
                proto["finally"] = function (onFinally) {
                  var threw = false,
                    result;
                  return this.then(
                    function (value) {
                      result = value;
                      // Most implementations of Promise.prototype.finally call
                      // Promise.resolve(onFinally()) (or this.constructor.resolve or even
                      // this.constructor[Symbol.species].resolve, depending on how spec
                      // compliant they're trying to be), but this implementation simply
                      // relies on the standard Promise behavior of resolving any value
                      // returned from a .then callback function.
                      return onFinally();
                    },
                    function (error) {
                      // Make the final .then callback (below) re-throw the error instead
                      // of returning it.
                      threw = true;
                      result = error;
                      return onFinally();
                    }
                  ).then(function () {
                    if (threw) throw result;
                    return result;
                  });
                };
              }

              /////////////////////////////////////////////////////////////////////////////
            },
            node_modules: {
              "meteor-promise": {
                "package.json": function module(
                  _require3,
                  _exports2,
                  _module4
                ) {
                  /////////////////////////////////////////////////////////////////////////////
                  //                                                                         //
                  // node_modules/meteor/promise/node_modules/meteor-promise/package.json    //
                  //                                                                         //
                  /////////////////////////////////////////////////////////////////////////////
                  //
                  _module4.exports = {
                    name: "meteor-promise",
                    version: "0.8.7",
                    browser: "promise_client.js",
                    main: "promise_server.js",
                  };

                  /////////////////////////////////////////////////////////////////////////////
                },
                "promise_client.js": function _module5(_require4, _exports3) {
                  /////////////////////////////////////////////////////////////////////////////
                  //                                                                         //
                  // node_modules/meteor/promise/node_modules/meteor-promise/promise_client. //
                  //                                                                         //
                  /////////////////////////////////////////////////////////////////////////////
                  //
                  _exports3.makeCompatible = function (Promise) {
                    var es6PromiseThen = Promise.prototype.then;

                    Promise.prototype.then = function (onResolved, onRejected) {
                      if (
                        typeof Meteor === "object" &&
                        typeof Meteor.bindEnvironment === "function"
                      ) {
                        return es6PromiseThen.call(
                          this,
                          onResolved &&
                            Meteor.bindEnvironment(onResolved, raise),
                          onRejected &&
                            Meteor.bindEnvironment(onRejected, raise)
                        );
                      }

                      return es6PromiseThen.call(this, onResolved, onRejected);
                    };
                  };

                  function raise(exception) {
                    throw exception;
                  }

                  /////////////////////////////////////////////////////////////////////////////
                },
              },
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  _require("/node_modules/meteor/promise/modern.js");
  var _exports = _require("/node_modules/meteor/promise/client.js");

  /* Exports */
  Package._define("promise", _exports, {
    Promise: Promise,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var fetch;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          fetch: {
            "modern.js": function _module(_require, _exports) {
              ///////////////////////////////////////////////////////////////////////
              //                                                                   //
              // packages/fetch/modern.js                                          //
              //                                                                   //
              ///////////////////////////////////////////////////////////////////////
              //
              _exports.fetch = global.fetch;
              _exports.Headers = global.Headers;
              _exports.Request = global.Request;
              _exports.Response = global.Response;

              ///////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/fetch/modern.js");

  /* Exports */
  Package._define("fetch", _exports2, {
    fetch: fetch,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;
  var fetch = Package.fetch.fetch;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          "dynamic-import": {
            "client.js": function module(_require, _exports, _module) {
              /////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                     //
              // packages/dynamic-import/client.js                                                   //
              //                                                                                     //
              /////////////////////////////////////////////////////////////////////////////////////////
              //
              var Module = _module.constructor;
              var cache = _require("./cache.js");
              var meteorInstall = _require("meteor/modules").meteorInstall;

              var dynamicImportSettings =
                (Meteor.settings &&
                  Meteor.settings.public &&
                  Meteor.settings.public.packages &&
                  Meteor.settings.public.packages["dynamic-import"]) ||
                {};

              // Call module.dynamicImport(id) to fetch a module and any/all of its
              // dependencies that have not already been fetched, and evaluate them as
              // soon as they arrive. This runtime API makes it very easy to implement
              // ECMAScript dynamic import(...) syntax.
              Module.prototype.dynamicImport = function (id) {
                var module = this;
                return module.prefetch(id).then(function () {
                  return getNamespace(module, id);
                });
              };

              // Called by Module.prototype.prefetch if there are any missing dynamic
              // modules that need to be fetched.
              meteorInstall.fetch = function (ids) {
                var tree = Object.create(null);
                var versions = Object.create(null);
                var dynamicVersions = _require("./dynamic-versions.js");
                var missing;

                function addSource(id, source) {
                  addToTree(
                    tree,
                    id,
                    makeModuleFunction(id, source, ids[id].options)
                  );
                }

                function addMissing(id) {
                  addToTree((missing = missing || Object.create(null)), id, 1);
                }

                Object.keys(ids).forEach(function (id) {
                  var version = dynamicVersions.get(id);
                  if (version) {
                    versions[id] = version;
                  } else {
                    addMissing(id);
                  }
                });

                return cache
                  .checkMany(versions)
                  .then(function (sources) {
                    Object.keys(sources).forEach(function (id) {
                      var source = sources[id];
                      if (source) {
                        addSource(id, source);
                      } else {
                        addMissing(id);
                      }
                    });

                    return (
                      missing &&
                      fetchMissing(missing).then(function (results) {
                        var versionsAndSourcesById = Object.create(null);
                        var flatResults = flattenModuleTree(results);

                        Object.keys(flatResults).forEach(function (id) {
                          var source = flatResults[id];
                          addSource(id, source);

                          var version = dynamicVersions.get(id);
                          if (version) {
                            versionsAndSourcesById[id] = {
                              version: version,
                              source: source,
                            };
                          }
                        });

                        cache.setMany(versionsAndSourcesById);
                      })
                    );
                  })
                  .then(function () {
                    return tree;
                  });
              };

              function flattenModuleTree(tree) {
                var parts = [""];
                var result = Object.create(null);

                function walk(t) {
                  if (t && typeof t === "object") {
                    Object.keys(t).forEach(function (key) {
                      parts.push(key);
                      walk(t[key]);
                      parts.pop();
                    });
                  } else if (typeof t === "string") {
                    result[parts.join("/")] = t;
                  }
                }

                walk(tree);

                return result;
              }

              function makeModuleFunction(id, source, options) {
                // By calling (options && options.eval || eval) in a wrapper function,
                // we delay the cost of parsing and evaluating the module code until the
                // module is first imported.
                return function () {
                  // If an options.eval function was provided in the second argument to
                  // meteorInstall when this bundle was first installed, use that
                  // function to parse and evaluate the dynamic module code in the scope
                  // of the package. Otherwise fall back to indirect (global) eval.
                  return ((options && options.eval) || eval)(
                    // Wrap the function(require,exports,module){...} expression in
                    // parentheses to force it to be parsed as an expression.
                    "(" + source + ")\n//# sourceURL=" + id
                  ).apply(this, arguments);
                };
              }

              var secretKey = null;
              _exports.setSecretKey = function (key) {
                secretKey = key;
              };

              var fetchURL = _require("./common.js").fetchURL;

              function inIframe() {
                try {
                  return window.self !== window.top;
                } catch (e) {
                  return true;
                }
              }

              function fetchMissing(missingTree) {
                // If the hostname of the URL returned by Meteor.absoluteUrl differs
                // from location.host, then we'll be making a cross-origin request here,
                // but that's fine because the dynamic-import server sets appropriate
                // CORS headers to enable fetching dynamic modules from any
                // origin. Browsers that check CORS do so by sending an additional
                // preflight OPTIONS request, which may add latency to the first dynamic
                // import() request, so it's a good idea for ROOT_URL to match
                // location.host if possible, though not strictly necessary.

                var url = fetchURL;

                var useLocationOrigin = dynamicImportSettings.useLocationOrigin;

                var disableLocationOriginIframe =
                  dynamicImportSettings.disableLocationOriginIframe;

                if (
                  useLocationOrigin &&
                  location &&
                  !(disableLocationOriginIframe && inIframe())
                ) {
                  url = location.origin.concat(url);
                } else {
                  url = Meteor.absoluteUrl(url);
                }

                if (secretKey) {
                  url += "key=" + secretKey;
                }

                return fetch(url, {
                  method: "POST",
                  body: JSON.stringify(missingTree),
                }).then(function (res) {
                  if (!res.ok) throw res;
                  return res.json();
                });
              }

              function addToTree(tree, id, value) {
                var parts = id.split("/");
                var lastIndex = parts.length - 1;
                parts.forEach(function (part, i) {
                  if (part) {
                    tree = tree[part] =
                      tree[part] ||
                      (i < lastIndex ? Object.create(null) : value);
                  }
                });
              }

              function getNamespace(_module2, id) {
                var namespace;

                _module2.link(id, {
                  "*": function (ns) {
                    namespace = ns;
                  },
                });

                // This helps with Babel interop, since we're not just returning the
                // module.exports object.
                Object.defineProperty(namespace, "__esModule", {
                  value: true,
                  enumerable: false,
                });

                return namespace;
              }

              /////////////////////////////////////////////////////////////////////////////////////////
            },
            "cache.js": function module(_require3, _exports3, _module3) {
              /////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                     //
              // packages/dynamic-import/cache.js                                                    //
              //                                                                                     //
              /////////////////////////////////////////////////////////////////////////////////////////
              //
              var dbPromise;

              var canUseCache =
                // The server doesn't benefit from dynamic module fetching, and almost
                // certainly doesn't support IndexedDB.
                Meteor.isClient &&
                // Cordova bundles all modules into the monolithic initial bundle, so
                // the dynamic module cache won't be necessary.
                !Meteor.isCordova &&
                // Caching can be confusing in development, and is designed to be a
                // transparent optimization for production performance.
                Meteor.isProduction;

              function getIDB() {
                if (typeof indexedDB !== "undefined") return indexedDB;
                if (typeof webkitIndexedDB !== "undefined")
                  return webkitIndexedDB;
                if (typeof mozIndexedDB !== "undefined") return mozIndexedDB;
                if (typeof OIndexedDB !== "undefined") return OIndexedDB;
                if (typeof msIndexedDB !== "undefined") return msIndexedDB;
              }

              function withDB(callback) {
                dbPromise =
                  dbPromise ||
                  new Promise(function (resolve, reject) {
                    var idb = getIDB();
                    if (!idb) {
                      throw new Error("IndexedDB not available");
                    }

                    // Incrementing the version number causes all existing object stores
                    // to be deleted and recreates those specified by objectStoreMap.
                    var request = idb.open("MeteorDynamicImportCache", 2);

                    request.onupgradeneeded = function (event) {
                      var db = event.target.result;

                      // It's fine to delete existing object stores since onupgradeneeded
                      // is only called when we change the DB version number, and the data
                      // we're storing is disposable/reconstructible.
                      Array.from(db.objectStoreNames).forEach(
                        db.deleteObjectStore,
                        db
                      );

                      Object.keys(objectStoreMap).forEach(function (name) {
                        db.createObjectStore(name, objectStoreMap[name]);
                      });
                    };

                    request.onerror = makeOnError(reject, "indexedDB.open");
                    request.onsuccess = function (event) {
                      resolve(event.target.result);
                    };
                  });

                return dbPromise.then(callback, function (error) {
                  return callback(null);
                });
              }

              var objectStoreMap = {
                sourcesByVersion: { keyPath: "version" },
              };

              function makeOnError(reject, source) {
                return function (event) {
                  reject(
                    new Error(
                      "IndexedDB failure in " +
                        source +
                        " " +
                        JSON.stringify(event.target)
                    )
                  );

                  // Returning true from an onerror callback function prevents an
                  // InvalidStateError in Firefox during Private Browsing. Silencing
                  // that error is safe because we handle the error more gracefully by
                  // passing it to the Promise reject function above.
                  // https://github.com/meteor/meteor/issues/8697
                  return true;
                };
              }

              var checkCount = 0;

              _exports3.checkMany = function (versions) {
                var ids = Object.keys(versions);
                var sourcesById = Object.create(null);

                // Initialize sourcesById with null values to indicate all sources are
                // missing (unless replaced with actual sources below).
                ids.forEach(function (id) {
                  sourcesById[id] = null;
                });

                if (!canUseCache) {
                  return Promise.resolve(sourcesById);
                }

                return withDB(function (db) {
                  if (!db) {
                    // We thought we could used IndexedDB, but something went wrong
                    // while opening the database, so err on the side of safety.
                    return sourcesById;
                  }

                  var txn = db.transaction(["sourcesByVersion"], "readonly");

                  var sourcesByVersion = txn.objectStore("sourcesByVersion");

                  ++checkCount;

                  function finish() {
                    --checkCount;
                    return sourcesById;
                  }

                  return Promise.all(
                    ids.map(function (id) {
                      return new Promise(function (resolve, reject) {
                        var version = versions[id];
                        if (version) {
                          var sourceRequest = sourcesByVersion.get(version);
                          sourceRequest.onerror = makeOnError(
                            reject,
                            "sourcesByVersion.get"
                          );
                          sourceRequest.onsuccess = function (event) {
                            var result = event.target.result;
                            if (result) {
                              sourcesById[id] = result.source;
                            }
                            resolve();
                          };
                        } else resolve();
                      });
                    })
                  ).then(finish, finish);
                });
              };

              var pendingVersionsAndSourcesById = Object.create(null);

              _exports3.setMany = function (versionsAndSourcesById) {
                if (canUseCache) {
                  Object.assign(
                    pendingVersionsAndSourcesById,
                    versionsAndSourcesById
                  );

                  // Delay the call to flushSetMany so that it doesn't contribute to the
                  // amount of time it takes to call module.dynamicImport.
                  if (!flushSetMany.timer) {
                    flushSetMany.timer = setTimeout(flushSetMany, 100);
                  }
                }
              };

              function flushSetMany() {
                if (checkCount > 0) {
                  // If checkMany is currently underway, postpone the flush until later,
                  // since updating the cache is less important than reading from it.
                  return (flushSetMany.timer = setTimeout(flushSetMany, 100));
                }

                flushSetMany.timer = null;

                var versionsAndSourcesById = pendingVersionsAndSourcesById;
                pendingVersionsAndSourcesById = Object.create(null);

                return withDB(function (db) {
                  if (!db) {
                    // We thought we could used IndexedDB, but something went wrong
                    // while opening the database, so err on the side of safety.
                    return;
                  }

                  var setTxn = db.transaction(
                    ["sourcesByVersion"],
                    "readwrite"
                  );

                  var sourcesByVersion = setTxn.objectStore("sourcesByVersion");

                  return Promise.all(
                    Object.keys(versionsAndSourcesById).map(function (id) {
                      var info = versionsAndSourcesById[id];
                      return new Promise(function (resolve, reject) {
                        var request = sourcesByVersion.put({
                          version: info.version,
                          source: info.source,
                        });
                        request.onerror = makeOnError(
                          reject,
                          "sourcesByVersion.put"
                        );
                        request.onsuccess = resolve;
                      });
                    })
                  );
                });
              }

              /////////////////////////////////////////////////////////////////////////////////////////
            },
            "common.js": function _module4(_require4, _exports4) {
              /////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                     //
              // packages/dynamic-import/common.js                                                   //
              //                                                                                     //
              /////////////////////////////////////////////////////////////////////////////////////////
              //
              _exports4.fetchURL = "/__meteor__/dynamic-import/fetch";

              /////////////////////////////////////////////////////////////////////////////////////////
            },
            "dynamic-versions.js": function module(
              _require5,
              _exports5,
              _module5
            ) {
              /////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                     //
              // packages/dynamic-import/dynamic-versions.js                                         //
              //                                                                                     //
              /////////////////////////////////////////////////////////////////////////////////////////
              //
              // This magic double-underscored identifier gets replaced in
              // tools/isobuild/bundler.js with a tree of hashes of all dynamic
              // modules, for use in client.js and cache.js.
              var versions = {};

              _exports5.get = function (id) {
                var tree = versions;
                var version = null;

                id.split("/").some(function (part) {
                  if (part) {
                    // If the tree contains identifiers for Meteor packages with colons
                    // in their names, the colons should not have been replaced by
                    // underscores, but there's a bug that results in that behavior, so
                    // for now it seems safest to be tolerant of underscores here.
                    // https://github.com/meteor/meteor/pull/9103
                    tree = tree[part] || tree[part.replace(":", "_")];
                  }

                  if (!tree) {
                    // Terminate the search without reassigning version.
                    return true;
                  }

                  if (typeof tree === "string") {
                    version = tree;
                    return true;
                  }
                });

                return version;
              };

              function getFlatModuleArray(tree) {
                var parts = [""];
                var result = [];

                function walk(t) {
                  if (t && typeof t === "object") {
                    Object.keys(t).forEach(function (key) {
                      parts.push(key);
                      walk(t[key]);
                      parts.pop();
                    });
                  } else if (typeof t === "string") {
                    result.push(parts.join("/"));
                  }
                }

                walk(tree);

                return result;
              }

              // If Package.appcache is loaded, preload additional modules after the
              // core bundle has been loaded.
              function precacheOnLoad(event) {
                // Check inside onload to make sure Package.appcache has had a chance to
                // become available.
                if (!Package.appcache) {
                  return;
                }

                // Prefetch in chunks to reduce overhead. If we call module.prefetch(id)
                // multiple times in the same tick of the event loop, all those modules
                // will be fetched in one HTTP POST request.
                function prefetchInChunks(modules, amount) {
                  Promise.all(
                    modules.splice(0, amount).map(function (id) {
                      return _module5.prefetch(id);
                    })
                  ).then(function () {
                    if (modules.length > 0) {
                      setTimeout(function () {
                        prefetchInChunks(modules, amount);
                      }, 0);
                    }
                  });
                }

                // Get a flat array of modules and start prefetching.
                prefetchInChunks(getFlatModuleArray(versions), 50);
              }

              // Use window.onload to only prefetch after the main bundle has loaded.
              if (global.addEventListener) {
                global.addEventListener("load", precacheOnLoad, false);
              } else if (global.attachEvent) {
                global.attachEvent("onload", precacheOnLoad);
              }

              /////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/dynamic-import/client.js");

  /* Exports */
  Package._define("dynamic-import", _exports2);
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Exports */
  Package._define("es5-shim");
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          "ecmascript-runtime-client": {
            "modern.js": function _module(_require) {
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                                     //
              // packages/ecmascript-runtime-client/modern.js                                                                        //
              //                                                                                                                     //
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              try {
                _require(
                  "core-js/modules/es.object.get-own-property-descriptors"
                );
              } catch (e) {
                throw new Error(
                  [
                    "The core-js npm package could not be found in your node_modules ",
                    "directory. Please run the following command to install it:",
                    "",
                    "  meteor npm install --save core-js",
                    "",
                  ].join("\n")
                );
              }

              _require("core-js/modules/es.object.is");
              _require("core-js/modules/es.function.name");
              _require("core-js/modules/es.number.is-finite");
              _require("core-js/modules/es.number.is-nan");
              _require("core-js/modules/es.array.flat");
              _require("core-js/modules/es.array.flat-map");
              _require("core-js/modules/es.object.from-entries");
              _require("core-js/modules/es.string.pad-start");
              _require("core-js/modules/es.string.pad-end");
              _require("core-js/modules/es.string.trim-start");
              _require("core-js/modules/es.string.trim-end");
              _require("core-js/modules/es.symbol.async-iterator");

              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            node_modules: {
              "core-js": {
                modules: {
                  "es.object.get-own-property-descriptors.js": function _module2(
                    _require3
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es.object.get-own-property-descriptors.j //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var $ = _require3("../internals/export");
                    var DESCRIPTORS = _require3("../internals/descriptors");
                    var ownKeys = _require3("../internals/own-keys");
                    var toIndexedObject = _require3(
                      "../internals/to-indexed-object"
                    );
                    var getOwnPropertyDescriptorModule = _require3(
                      "../internals/object-get-own-property-descriptor"
                    );
                    var createProperty = _require3(
                      "../internals/create-property"
                    );

                    // `Object.getOwnPropertyDescriptors` method
                    // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
                    $(
                      { target: "Object", stat: true, sham: !DESCRIPTORS },
                      {
                        getOwnPropertyDescriptors: function getOwnPropertyDescriptors(
                          object
                        ) {
                          var O = toIndexedObject(object);
                          var getOwnPropertyDescriptor =
                            getOwnPropertyDescriptorModule.f;
                          var keys = ownKeys(O);
                          var result = {};
                          var index = 0;
                          var key, descriptor;
                          while (keys.length > index) {
                            descriptor = getOwnPropertyDescriptor(
                              O,
                              (key = keys[index++])
                            );
                            if (descriptor !== undefined)
                              createProperty(result, key, descriptor);
                          }
                          return result;
                        },
                      }
                    );

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "es.object.is.js": function _module3(_require4) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es.object.is.js                          //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var $ = _require4("../internals/export");
                    var is = _require4("../internals/same-value");

                    // `Object.is` method
                    // https://tc39.github.io/ecma262/#sec-object.is
                    $(
                      { target: "Object", stat: true },
                      {
                        is: is,
                      }
                    );

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "es.function.name.js": function _module4(_require5) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es.function.name.js                      //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var DESCRIPTORS = _require5("../internals/descriptors");
                    var defineProperty = _require5(
                      "../internals/object-define-property"
                    ).f;

                    var FunctionPrototype = Function.prototype;
                    var FunctionPrototypeToString = FunctionPrototype.toString;
                    var nameRE = /^\s*function ([^ (]*)/;
                    var NAME = "name";

                    // Function instances `.name` property
                    // https://tc39.github.io/ecma262/#sec-function-instances-name
                    if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
                      defineProperty(FunctionPrototype, NAME, {
                        configurable: true,
                        get: function () {
                          try {
                            return FunctionPrototypeToString.call(this).match(
                              nameRE
                            )[1];
                          } catch (error) {
                            return "";
                          }
                        },
                      });
                    }

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "es.number.is-finite.js": function _module5(_require6) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es.number.is-finite.js                   //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var $ = _require6("../internals/export");
                    var numberIsFinite = _require6(
                      "../internals/number-is-finite"
                    );

                    // `Number.isFinite` method
                    // https://tc39.github.io/ecma262/#sec-number.isfinite
                    $(
                      { target: "Number", stat: true },
                      { isFinite: numberIsFinite }
                    );

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "es.number.is-nan.js": function _module6(_require7) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es.number.is-nan.js                      //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var $ = _require7("../internals/export");

                    // `Number.isNaN` method
                    // https://tc39.github.io/ecma262/#sec-number.isnan
                    $(
                      { target: "Number", stat: true },
                      {
                        isNaN: function isNaN(number) {
                          // eslint-disable-next-line no-self-compare
                          return number != number;
                        },
                      }
                    );

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "es.array.flat.js": function _module7(_require8) {
                    var $ = _require8("../internals/export");
                    var flattenIntoArray = _require8(
                      "../internals/flatten-into-array"
                    );
                    var toObject = _require8("../internals/to-object");
                    var toLength = _require8("../internals/to-length");
                    var toInteger = _require8("../internals/to-integer");
                    var arraySpeciesCreate = _require8(
                      "../internals/array-species-create"
                    );

                    // `Array.prototype.flat` method
                    // https://github.com/tc39/proposal-flatMap
                    $(
                      { target: "Array", proto: true },
                      {
                        flat: function flat() /* depthArg = 1 */ {
                          var depthArg = arguments.length
                            ? arguments[0]
                            : undefined;
                          var O = toObject(this);
                          var sourceLen = toLength(O.length);
                          var A = arraySpeciesCreate(O, 0);
                          A.length = flattenIntoArray(
                            A,
                            O,
                            O,
                            sourceLen,
                            0,
                            depthArg === undefined ? 1 : toInteger(depthArg)
                          );
                          return A;
                        },
                      }
                    );

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "es.array.flat-map.js": function _module8(_require9) {
                    var $ = _require9("../internals/export");
                    var flattenIntoArray = _require9(
                      "../internals/flatten-into-array"
                    );
                    var toObject = _require9("../internals/to-object");
                    var toLength = _require9("../internals/to-length");
                    var aFunction = _require9("../internals/a-function");
                    var arraySpeciesCreate = _require9(
                      "../internals/array-species-create"
                    );

                    // `Array.prototype.flatMap` method
                    // https://github.com/tc39/proposal-flatMap
                    $(
                      { target: "Array", proto: true },
                      {
                        flatMap: function flatMap(callbackfn /* , thisArg */) {
                          var O = toObject(this);
                          var sourceLen = toLength(O.length);
                          var A;
                          aFunction(callbackfn);
                          A = arraySpeciesCreate(O, 0);
                          A.length = flattenIntoArray(
                            A,
                            O,
                            O,
                            sourceLen,
                            0,
                            1,
                            callbackfn,
                            arguments.length > 1 ? arguments[1] : undefined
                          );
                          return A;
                        },
                      }
                    );

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "es.object.from-entries.js": function _module9(_require10) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es.object.from-entries.js                //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var $ = _require10("../internals/export");
                    var iterate = _require10("../internals/iterate");
                    var createProperty = _require10(
                      "../internals/create-property"
                    );

                    // `Object.fromEntries` method
                    // https://github.com/tc39/proposal-object-from-entries
                    $(
                      { target: "Object", stat: true },
                      {
                        fromEntries: function fromEntries(iterable) {
                          var obj = {};
                          iterate(
                            iterable,
                            function (k, v) {
                              createProperty(obj, k, v);
                            },
                            undefined,
                            true
                          );
                          return obj;
                        },
                      }
                    );

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "es.string.pad-start.js": function _module10(_require11) {
                    var $ = _require11("../internals/export");
                    var $padStart = _require11("../internals/string-pad").start;
                    var WEBKIT_BUG = _require11(
                      "../internals/string-pad-webkit-bug"
                    );

                    // `String.prototype.padStart` method
                    // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
                    $(
                      { target: "String", proto: true, forced: WEBKIT_BUG },
                      {
                        padStart: function padStart(
                          maxLength /* , fillString = ' ' */
                        ) {
                          return $padStart(
                            this,
                            maxLength,
                            arguments.length > 1 ? arguments[1] : undefined
                          );
                        },
                      }
                    );

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "es.string.pad-end.js": function _module11(_require12) {
                    var $ = _require12("../internals/export");
                    var $padEnd = _require12("../internals/string-pad").end;
                    var WEBKIT_BUG = _require12(
                      "../internals/string-pad-webkit-bug"
                    );

                    // `String.prototype.padEnd` method
                    // https://tc39.github.io/ecma262/#sec-string.prototype.padend
                    $(
                      { target: "String", proto: true, forced: WEBKIT_BUG },
                      {
                        padEnd: function padEnd(
                          maxLength /* , fillString = ' ' */
                        ) {
                          return $padEnd(
                            this,
                            maxLength,
                            arguments.length > 1 ? arguments[1] : undefined
                          );
                        },
                      }
                    );

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "es.string.trim-start.js": function _module12(_require13) {
                    var $ = _require13("../internals/export");
                    var $trimStart = _require13("../internals/string-trim")
                      .start;
                    var forcedStringTrimMethod = _require13(
                      "../internals/string-trim-forced"
                    );

                    var FORCED = forcedStringTrimMethod("trimStart");

                    var trimStart = FORCED
                      ? function trimStart() {
                          return $trimStart(this);
                        }
                      : "".trimStart;

                    // `String.prototype.{ trimStart, trimLeft }` methods
                    // https://github.com/tc39/ecmascript-string-left-right-trim
                    $(
                      { target: "String", proto: true, forced: FORCED },
                      {
                        trimStart: trimStart,
                        trimLeft: trimStart,
                      }
                    );

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "es.string.trim-end.js": function _module13(_require14) {
                    var $ = _require14("../internals/export");
                    var $trimEnd = _require14("../internals/string-trim").end;
                    var forcedStringTrimMethod = _require14(
                      "../internals/string-trim-forced"
                    );

                    var FORCED = forcedStringTrimMethod("trimEnd");

                    var trimEnd = FORCED
                      ? function trimEnd() {
                          return $trimEnd(this);
                        }
                      : "".trimEnd;

                    // `String.prototype.{ trimEnd, trimRight }` methods
                    // https://github.com/tc39/ecmascript-string-left-right-trim
                    $(
                      { target: "String", proto: true, forced: FORCED },
                      {
                        trimEnd: trimEnd,
                        trimRight: trimEnd,
                      }
                    );

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "es.symbol.async-iterator.js": function _module14(
                    _require15
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es.symbol.async-iterator.js              //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var defineWellKnownSymbol = _require15(
                      "../internals/define-well-known-symbol"
                    );

                    // `Symbol.asyncIterator` well-known symbol
                    // https://tc39.github.io/ecma262/#sec-symbol.asynciterator
                    defineWellKnownSymbol("asyncIterator");

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                },
                internals: {
                  "export.js": function module(
                    _require16,
                    _exports2,
                    _module15
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/export.js                              //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var global = _require16("../internals/global");
                    var getOwnPropertyDescriptor = _require16(
                      "../internals/object-get-own-property-descriptor"
                    ).f;
                    var createNonEnumerableProperty = _require16(
                      "../internals/create-non-enumerable-property"
                    );
                    var redefine = _require16("../internals/redefine");
                    var setGlobal = _require16("../internals/set-global");
                    var copyConstructorProperties = _require16(
                      "../internals/copy-constructor-properties"
                    );
                    var isForced = _require16("../internals/is-forced");

                    /*
                    options.target      - name of the target object
                    options.global      - target is the global object
                    options.stat        - export as static methods of target
                    options.proto       - export as prototype methods of target
                    options.real        - real prototype method for the `pure` version
                    options.forced      - export even if the native feature is available
                    options.bind        - bind methods to the target, required for the `pure` version
                    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
                    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
                    options.sham        - add a flag to not completely full polyfills
                    options.enumerable  - export as enumerable property
                    options.noTargetGet - prevent calling a getter on target
                  */
                    _module15.exports = function (options, source) {
                      var TARGET = options.target;
                      var GLOBAL = options.global;
                      var STATIC = options.stat;
                      var FORCED,
                        target,
                        key,
                        targetProperty,
                        sourceProperty,
                        descriptor;
                      if (GLOBAL) {
                        target = global;
                      } else if (STATIC) {
                        target = global[TARGET] || setGlobal(TARGET, {});
                      } else {
                        target = (global[TARGET] || {}).prototype;
                      }
                      if (target)
                        for (key in source) {
                          sourceProperty = source[key];
                          if (options.noTargetGet) {
                            descriptor = getOwnPropertyDescriptor(target, key);
                            targetProperty = descriptor && descriptor.value;
                          } else targetProperty = target[key];
                          FORCED = isForced(
                            GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key,
                            options.forced
                          );
                          // contained in target
                          if (!FORCED && targetProperty !== undefined) {
                            if (typeof sourceProperty === typeof targetProperty)
                              continue;
                            copyConstructorProperties(
                              sourceProperty,
                              targetProperty
                            );
                          }
                          // add a flag to not completely full polyfills
                          if (
                            options.sham ||
                            (targetProperty && targetProperty.sham)
                          ) {
                            createNonEnumerableProperty(
                              sourceProperty,
                              "sham",
                              true
                            );
                          }
                          // extend global
                          redefine(target, key, sourceProperty, options);
                        }
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "global.js": function module(
                    _require17,
                    _exports3,
                    _module16
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/global.js                              //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var check = function (it) {
                      return it && it.Math == Math && it;
                    };

                    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
                    _module16.exports =
                      // eslint-disable-next-line no-undef
                      check(typeof globalThis == "object" && globalThis) ||
                      check(typeof window == "object" && window) ||
                      check(typeof self == "object" && self) ||
                      check(typeof global == "object" && global) ||
                      // eslint-disable-next-line no-new-func
                      Function("return this")();

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "object-get-own-property-descriptor.js": function _module17(
                    _require18,
                    _exports4
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/object-get-own-property-descriptor.js  //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var DESCRIPTORS = _require18("../internals/descriptors");
                    var propertyIsEnumerableModule = _require18(
                      "../internals/object-property-is-enumerable"
                    );
                    var createPropertyDescriptor = _require18(
                      "../internals/create-property-descriptor"
                    );
                    var toIndexedObject = _require18(
                      "../internals/to-indexed-object"
                    );
                    var toPrimitive = _require18("../internals/to-primitive");
                    var has = _require18("../internals/has");
                    var IE8_DOM_DEFINE = _require18(
                      "../internals/ie8-dom-define"
                    );

                    var nativeGetOwnPropertyDescriptor =
                      Object.getOwnPropertyDescriptor;

                    // `Object.getOwnPropertyDescriptor` method
                    // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
                    _exports4.f = DESCRIPTORS
                      ? nativeGetOwnPropertyDescriptor
                      : function getOwnPropertyDescriptor(O, P) {
                          O = toIndexedObject(O);
                          P = toPrimitive(P, true);
                          if (IE8_DOM_DEFINE)
                            try {
                              return nativeGetOwnPropertyDescriptor(O, P);
                            } catch (error) {
                              /* empty */
                            }
                          if (has(O, P))
                            return createPropertyDescriptor(
                              !propertyIsEnumerableModule.f.call(O, P),
                              O[P]
                            );
                        };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "descriptors.js": function module(
                    _require19,
                    _exports5,
                    _module18
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/descriptors.js                         //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var fails = _require19("../internals/fails");

                    // Thank's IE8 for his funny defineProperty
                    _module18.exports = !fails(function () {
                      return (
                        Object.defineProperty({}, 1, {
                          get: function () {
                            return 7;
                          },
                        })[1] != 7
                      );
                    });

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "fails.js": function module(
                    _require20,
                    _exports6,
                    _module19
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/fails.js                               //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    _module19.exports = function (exec) {
                      try {
                        return !!exec();
                      } catch (error) {
                        return true;
                      }
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "object-property-is-enumerable.js": function _module20(
                    _require21,
                    _exports7
                  ) {
                    var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
                    var getOwnPropertyDescriptor =
                      Object.getOwnPropertyDescriptor;

                    // Nashorn ~ JDK8 bug
                    var NASHORN_BUG =
                      getOwnPropertyDescriptor &&
                      !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

                    // `Object.prototype.propertyIsEnumerable` method implementation
                    // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
                    _exports7.f = NASHORN_BUG
                      ? function propertyIsEnumerable(V) {
                          var descriptor = getOwnPropertyDescriptor(this, V);
                          return !!descriptor && descriptor.enumerable;
                        }
                      : nativePropertyIsEnumerable;

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "create-property-descriptor.js": function module(
                    _require22,
                    _exports8,
                    _module21
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/create-property-descriptor.js          //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    _module21.exports = function (bitmap, value) {
                      return {
                        enumerable: !(bitmap & 1),
                        configurable: !(bitmap & 2),
                        writable: !(bitmap & 4),
                        value: value,
                      };
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "to-indexed-object.js": function module(
                    _require23,
                    _exports9,
                    _module22
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/to-indexed-object.js                   //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    // toObject with fallback for non-array-like ES3 strings
                    var IndexedObject = _require23(
                      "../internals/indexed-object"
                    );
                    var requireObjectCoercible = _require23(
                      "../internals/require-object-coercible"
                    );

                    _module22.exports = function (it) {
                      return IndexedObject(requireObjectCoercible(it));
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "indexed-object.js": function module(
                    _require24,
                    _exports10,
                    _module23
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/indexed-object.js                      //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var fails = _require24("../internals/fails");
                    var classof = _require24("../internals/classof-raw");

                    var split = "".split;

                    // fallback for non-array-like ES3 and non-enumerable old V8 strings
                    _module23.exports = fails(function () {
                      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
                      // eslint-disable-next-line no-prototype-builtins
                      return !Object("z").propertyIsEnumerable(0);
                    })
                      ? function (it) {
                          return classof(it) == "String"
                            ? split.call(it, "")
                            : Object(it);
                        }
                      : Object;

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "classof-raw.js": function module(
                    _require25,
                    _exports11,
                    _module24
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/classof-raw.js                         //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var toString = {}.toString;

                    _module24.exports = function (it) {
                      return toString.call(it).slice(8, -1);
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "require-object-coercible.js": function module(
                    _require26,
                    _exports12,
                    _module25
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/require-object-coercible.js            //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    // `RequireObjectCoercible` abstract operation
                    // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
                    _module25.exports = function (it) {
                      if (it == undefined)
                        throw TypeError("Can't call method on " + it);
                      return it;
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "to-primitive.js": function module(
                    _require27,
                    _exports13,
                    _module26
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/to-primitive.js                        //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var isObject = _require27("../internals/is-object");

                    // `ToPrimitive` abstract operation
                    // https://tc39.github.io/ecma262/#sec-toprimitive
                    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
                    // and the second argument - flag - preferred type is a string
                    _module26.exports = function (input, PREFERRED_STRING) {
                      if (!isObject(input)) return input;
                      var fn, val;
                      if (
                        PREFERRED_STRING &&
                        typeof (fn = input.toString) == "function" &&
                        !isObject((val = fn.call(input)))
                      )
                        return val;
                      if (
                        typeof (fn = input.valueOf) == "function" &&
                        !isObject((val = fn.call(input)))
                      )
                        return val;
                      if (
                        !PREFERRED_STRING &&
                        typeof (fn = input.toString) == "function" &&
                        !isObject((val = fn.call(input)))
                      )
                        return val;
                      throw TypeError(
                        "Can't convert object to primitive value"
                      );
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "is-object.js": function module(
                    _require28,
                    _exports14,
                    _module27
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/is-object.js                           //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    _module27.exports = function (it) {
                      return typeof it === "object"
                        ? it !== null
                        : typeof it === "function";
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "has.js": function module(_require29, _exports15, _module28) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/has.js                                 //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var hasOwnProperty = {}.hasOwnProperty;

                    _module28.exports = function (it, key) {
                      return hasOwnProperty.call(it, key);
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "ie8-dom-define.js": function module(
                    _require30,
                    _exports16,
                    _module29
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/ie8-dom-define.js                      //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var DESCRIPTORS = _require30("../internals/descriptors");
                    var fails = _require30("../internals/fails");
                    var createElement = _require30(
                      "../internals/document-create-element"
                    );

                    // Thank's IE8 for his funny defineProperty
                    _module29.exports =
                      !DESCRIPTORS &&
                      !fails(function () {
                        return (
                          Object.defineProperty(createElement("div"), "a", {
                            get: function () {
                              return 7;
                            },
                          }).a != 7
                        );
                      });

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "document-create-element.js": function module(
                    _require31,
                    _exports17,
                    _module30
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/document-create-element.js             //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var global = _require31("../internals/global");
                    var isObject = _require31("../internals/is-object");

                    var document = global.document;
                    // typeof document.createElement is 'object' in old IE
                    var EXISTS =
                      isObject(document) && isObject(document.createElement);

                    _module30.exports = function (it) {
                      return EXISTS ? document.createElement(it) : {};
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "create-non-enumerable-property.js": function module(
                    _require32,
                    _exports18,
                    _module31
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/create-non-enumerable-property.js      //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var DESCRIPTORS = _require32("../internals/descriptors");
                    var definePropertyModule = _require32(
                      "../internals/object-define-property"
                    );
                    var createPropertyDescriptor = _require32(
                      "../internals/create-property-descriptor"
                    );

                    _module31.exports = DESCRIPTORS
                      ? function (object, key, value) {
                          return definePropertyModule.f(
                            object,
                            key,
                            createPropertyDescriptor(1, value)
                          );
                        }
                      : function (object, key, value) {
                          object[key] = value;
                          return object;
                        };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "object-define-property.js": function _module32(
                    _require33,
                    _exports19
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/object-define-property.js              //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var DESCRIPTORS = _require33("../internals/descriptors");
                    var IE8_DOM_DEFINE = _require33(
                      "../internals/ie8-dom-define"
                    );
                    var anObject = _require33("../internals/an-object");
                    var toPrimitive = _require33("../internals/to-primitive");

                    var nativeDefineProperty = Object.defineProperty;

                    // `Object.defineProperty` method
                    // https://tc39.github.io/ecma262/#sec-object.defineproperty
                    _exports19.f = DESCRIPTORS
                      ? nativeDefineProperty
                      : function defineProperty(O, P, Attributes) {
                          anObject(O);
                          P = toPrimitive(P, true);
                          anObject(Attributes);
                          if (IE8_DOM_DEFINE)
                            try {
                              return nativeDefineProperty(O, P, Attributes);
                            } catch (error) {
                              /* empty */
                            }
                          if ("get" in Attributes || "set" in Attributes)
                            throw TypeError("Accessors not supported");
                          if ("value" in Attributes) O[P] = Attributes.value;
                          return O;
                        };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "an-object.js": function module(
                    _require34,
                    _exports20,
                    _module33
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/an-object.js                           //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var isObject = _require34("../internals/is-object");

                    _module33.exports = function (it) {
                      if (!isObject(it)) {
                        throw TypeError(String(it) + " is not an object");
                      }
                      return it;
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "redefine.js": function module(
                    _require35,
                    _exports21,
                    _module34
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/redefine.js                            //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var global = _require35("../internals/global");
                    var createNonEnumerableProperty = _require35(
                      "../internals/create-non-enumerable-property"
                    );
                    var has = _require35("../internals/has");
                    var setGlobal = _require35("../internals/set-global");
                    var inspectSource = _require35(
                      "../internals/inspect-source"
                    );
                    var InternalStateModule = _require35(
                      "../internals/internal-state"
                    );

                    var getInternalState = InternalStateModule.get;
                    var enforceInternalState = InternalStateModule.enforce;
                    var TEMPLATE = String(String).split("String");

                    (_module34.exports = function (O, key, value, options) {
                      var unsafe = options ? !!options.unsafe : false;
                      var simple = options ? !!options.enumerable : false;
                      var noTargetGet = options ? !!options.noTargetGet : false;
                      if (typeof value == "function") {
                        if (typeof key == "string" && !has(value, "name"))
                          createNonEnumerableProperty(value, "name", key);
                        enforceInternalState(value).source = TEMPLATE.join(
                          typeof key == "string" ? key : ""
                        );
                      }
                      if (O === global) {
                        if (simple) O[key] = value;
                        else setGlobal(key, value);
                        return;
                      } else if (!unsafe) {
                        delete O[key];
                      } else if (!noTargetGet && O[key]) {
                        simple = true;
                      }
                      if (simple) O[key] = value;
                      else createNonEnumerableProperty(O, key, value);
                      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
                    })(Function.prototype, "toString", function toString() {
                      return (
                        (typeof this == "function" &&
                          getInternalState(this).source) ||
                        inspectSource(this)
                      );
                    });

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "set-global.js": function module(
                    _require36,
                    _exports22,
                    _module35
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/set-global.js                          //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var global = _require36("../internals/global");
                    var createNonEnumerableProperty = _require36(
                      "../internals/create-non-enumerable-property"
                    );

                    _module35.exports = function (key, value) {
                      try {
                        createNonEnumerableProperty(global, key, value);
                      } catch (error) {
                        global[key] = value;
                      }
                      return value;
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "inspect-source.js": function module(
                    _require37,
                    _exports23,
                    _module36
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/inspect-source.js                      //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var store = _require37("../internals/shared-store");

                    var functionToString = Function.toString;

                    // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
                    if (typeof store.inspectSource != "function") {
                      store.inspectSource = function (it) {
                        return functionToString.call(it);
                      };
                    }

                    _module36.exports = store.inspectSource;

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "shared-store.js": function module(
                    _require38,
                    _exports24,
                    _module37
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/shared-store.js                        //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var global = _require38("../internals/global");
                    var setGlobal = _require38("../internals/set-global");

                    var SHARED = "__core-js_shared__";
                    var store = global[SHARED] || setGlobal(SHARED, {});

                    _module37.exports = store;

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "internal-state.js": function module(
                    _require39,
                    _exports25,
                    _module38
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/internal-state.js                      //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var NATIVE_WEAK_MAP = _require39(
                      "../internals/native-weak-map"
                    );
                    var global = _require39("../internals/global");
                    var isObject = _require39("../internals/is-object");
                    var createNonEnumerableProperty = _require39(
                      "../internals/create-non-enumerable-property"
                    );
                    var objectHas = _require39("../internals/has");
                    var sharedKey = _require39("../internals/shared-key");
                    var hiddenKeys = _require39("../internals/hidden-keys");

                    var WeakMap = global.WeakMap;
                    var set, get, has;

                    var enforce = function (it) {
                      return has(it) ? get(it) : set(it, {});
                    };

                    var getterFor = function (TYPE) {
                      return function (it) {
                        var state;
                        if (!isObject(it) || (state = get(it)).type !== TYPE) {
                          throw TypeError(
                            "Incompatible receiver, " + TYPE + " required"
                          );
                        }
                        return state;
                      };
                    };

                    if (NATIVE_WEAK_MAP) {
                      var store = new WeakMap();
                      var wmget = store.get;
                      var wmhas = store.has;
                      var wmset = store.set;
                      set = function (it, metadata) {
                        wmset.call(store, it, metadata);
                        return metadata;
                      };
                      get = function (it) {
                        return wmget.call(store, it) || {};
                      };
                      has = function (it) {
                        return wmhas.call(store, it);
                      };
                    } else {
                      var STATE = sharedKey("state");
                      hiddenKeys[STATE] = true;
                      set = function (it, metadata) {
                        createNonEnumerableProperty(it, STATE, metadata);
                        return metadata;
                      };
                      get = function (it) {
                        return objectHas(it, STATE) ? it[STATE] : {};
                      };
                      has = function (it) {
                        return objectHas(it, STATE);
                      };
                    }

                    _module38.exports = {
                      set: set,
                      get: get,
                      has: has,
                      enforce: enforce,
                      getterFor: getterFor,
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "native-weak-map.js": function module(
                    _require40,
                    _exports26,
                    _module39
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/native-weak-map.js                     //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var global = _require40("../internals/global");
                    var inspectSource = _require40(
                      "../internals/inspect-source"
                    );

                    var WeakMap = global.WeakMap;

                    _module39.exports =
                      typeof WeakMap === "function" &&
                      /native code/.test(inspectSource(WeakMap));

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "shared-key.js": function module(
                    _require41,
                    _exports27,
                    _module40
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/shared-key.js                          //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var shared = _require41("../internals/shared");
                    var uid = _require41("../internals/uid");

                    var keys = shared("keys");

                    _module40.exports = function (key) {
                      return keys[key] || (keys[key] = uid(key));
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "shared.js": function module(
                    _require42,
                    _exports28,
                    _module41
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/shared.js                              //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var IS_PURE = _require42("../internals/is-pure");
                    var store = _require42("../internals/shared-store");

                    (_module41.exports = function (key, value) {
                      return (
                        store[key] ||
                        (store[key] = value !== undefined ? value : {})
                      );
                    })("versions", []).push({
                      version: "3.6.5",
                      mode: IS_PURE ? "pure" : "global",
                      copyright: "© 2020 Denis Pushkarev (zloirock.ru)",
                    });

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "is-pure.js": function module(
                    _require43,
                    _exports29,
                    _module42
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/is-pure.js                             //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    _module42.exports = false;

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "uid.js": function module(_require44, _exports30, _module43) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/uid.js                                 //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var id = 0;
                    var postfix = Math.random();

                    _module43.exports = function (key) {
                      return (
                        "Symbol(" +
                        String(key === undefined ? "" : key) +
                        ")_" +
                        (++id + postfix).toString(36)
                      );
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "hidden-keys.js": function module(
                    _require45,
                    _exports31,
                    _module44
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/hidden-keys.js                         //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    _module44.exports = {};

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "copy-constructor-properties.js": function module(
                    _require46,
                    _exports32,
                    _module45
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/copy-constructor-properties.js         //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var has = _require46("../internals/has");
                    var ownKeys = _require46("../internals/own-keys");
                    var getOwnPropertyDescriptorModule = _require46(
                      "../internals/object-get-own-property-descriptor"
                    );
                    var definePropertyModule = _require46(
                      "../internals/object-define-property"
                    );

                    _module45.exports = function (target, source) {
                      var keys = ownKeys(source);
                      var defineProperty = definePropertyModule.f;
                      var getOwnPropertyDescriptor =
                        getOwnPropertyDescriptorModule.f;
                      for (var i = 0; i < keys.length; i++) {
                        var key = keys[i];
                        if (!has(target, key))
                          defineProperty(
                            target,
                            key,
                            getOwnPropertyDescriptor(source, key)
                          );
                      }
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "own-keys.js": function module(
                    _require47,
                    _exports33,
                    _module46
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/own-keys.js                            //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var getBuiltIn = _require47("../internals/get-built-in");
                    var getOwnPropertyNamesModule = _require47(
                      "../internals/object-get-own-property-names"
                    );
                    var getOwnPropertySymbolsModule = _require47(
                      "../internals/object-get-own-property-symbols"
                    );
                    var anObject = _require47("../internals/an-object");

                    // all object keys, includes non-enumerable and symbols
                    _module46.exports =
                      getBuiltIn("Reflect", "ownKeys") ||
                      function ownKeys(it) {
                        var keys = getOwnPropertyNamesModule.f(anObject(it));
                        var getOwnPropertySymbols =
                          getOwnPropertySymbolsModule.f;
                        return getOwnPropertySymbols
                          ? keys.concat(getOwnPropertySymbols(it))
                          : keys;
                      };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "get-built-in.js": function module(
                    _require48,
                    _exports34,
                    _module47
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/get-built-in.js                        //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var path = _require48("../internals/path");
                    var global = _require48("../internals/global");

                    var aFunction = function (variable) {
                      return typeof variable == "function"
                        ? variable
                        : undefined;
                    };

                    _module47.exports = function (namespace, method) {
                      return arguments.length < 2
                        ? aFunction(path[namespace]) ||
                            aFunction(global[namespace])
                        : (path[namespace] && path[namespace][method]) ||
                            (global[namespace] && global[namespace][method]);
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "path.js": function module(
                    _require49,
                    _exports35,
                    _module48
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/path.js                                //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var global = _require49("../internals/global");

                    _module48.exports = global;

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "object-get-own-property-names.js": function _module49(
                    _require50,
                    _exports36
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/object-get-own-property-names.js       //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var internalObjectKeys = _require50(
                      "../internals/object-keys-internal"
                    );
                    var enumBugKeys = _require50("../internals/enum-bug-keys");

                    var hiddenKeys = enumBugKeys.concat("length", "prototype");

                    // `Object.getOwnPropertyNames` method
                    // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
                    _exports36.f =
                      Object.getOwnPropertyNames ||
                      function getOwnPropertyNames(O) {
                        return internalObjectKeys(O, hiddenKeys);
                      };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "object-keys-internal.js": function module(
                    _require51,
                    _exports37,
                    _module50
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/object-keys-internal.js                //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var has = _require51("../internals/has");
                    var toIndexedObject = _require51(
                      "../internals/to-indexed-object"
                    );
                    var indexOf = _require51("../internals/array-includes")
                      .indexOf;
                    var hiddenKeys = _require51("../internals/hidden-keys");

                    _module50.exports = function (object, names) {
                      var O = toIndexedObject(object);
                      var i = 0;
                      var result = [];
                      var key;
                      for (key in O)
                        !has(hiddenKeys, key) &&
                          has(O, key) &&
                          result.push(key);
                      // Don't enum bug & hidden keys
                      while (names.length > i)
                        if (has(O, (key = names[i++]))) {
                          ~indexOf(result, key) || result.push(key);
                        }
                      return result;
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "array-includes.js": function module(
                    _require52,
                    _exports38,
                    _module51
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/array-includes.js                      //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var toIndexedObject = _require52(
                      "../internals/to-indexed-object"
                    );
                    var toLength = _require52("../internals/to-length");
                    var toAbsoluteIndex = _require52(
                      "../internals/to-absolute-index"
                    );

                    // `Array.prototype.{ indexOf, includes }` methods implementation
                    var createMethod = function (IS_INCLUDES) {
                      return function ($this, el, fromIndex) {
                        var O = toIndexedObject($this);
                        var length = toLength(O.length);
                        var index = toAbsoluteIndex(fromIndex, length);
                        var value;
                        // Array#includes uses SameValueZero equality algorithm
                        // eslint-disable-next-line no-self-compare
                        if (IS_INCLUDES && el != el)
                          while (length > index) {
                            value = O[index++];
                            // eslint-disable-next-line no-self-compare
                            if (value != value) return true;
                            // Array#indexOf ignores holes, Array#includes - not
                          }
                        else
                          for (; length > index; index++) {
                            if ((IS_INCLUDES || index in O) && O[index] === el)
                              return IS_INCLUDES || index || 0;
                          }
                        return !IS_INCLUDES && -1;
                      };
                    };

                    _module51.exports = {
                      // `Array.prototype.includes` method
                      // https://tc39.github.io/ecma262/#sec-array.prototype.includes
                      includes: createMethod(true),
                      // `Array.prototype.indexOf` method
                      // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
                      indexOf: createMethod(false),
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "to-length.js": function module(
                    _require53,
                    _exports39,
                    _module52
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/to-length.js                           //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var toInteger = _require53("../internals/to-integer");

                    var min = Math.min;

                    // `ToLength` abstract operation
                    // https://tc39.github.io/ecma262/#sec-tolength
                    _module52.exports = function (argument) {
                      return argument > 0
                        ? min(toInteger(argument), 0x1fffffffffffff)
                        : 0; // 2 ** 53 - 1 == 9007199254740991
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "to-integer.js": function module(
                    _require54,
                    _exports40,
                    _module53
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/to-integer.js                          //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var ceil = Math.ceil;
                    var floor = Math.floor;

                    // `ToInteger` abstract operation
                    // https://tc39.github.io/ecma262/#sec-tointeger
                    _module53.exports = function (argument) {
                      return isNaN((argument = +argument))
                        ? 0
                        : (argument > 0 ? floor : ceil)(argument);
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "to-absolute-index.js": function module(
                    _require55,
                    _exports41,
                    _module54
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/to-absolute-index.js                   //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var toInteger = _require55("../internals/to-integer");

                    var max = Math.max;
                    var min = Math.min;

                    // Helper for a popular repeating case of the spec:
                    // Let integer be ? ToInteger(index).
                    // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
                    _module54.exports = function (index, length) {
                      var integer = toInteger(index);
                      return integer < 0
                        ? max(integer + length, 0)
                        : min(integer, length);
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "enum-bug-keys.js": function module(
                    _require56,
                    _exports42,
                    _module55
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/enum-bug-keys.js                       //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    // IE8- don't enum bug keys
                    _module55.exports = [
                      "constructor",
                      "hasOwnProperty",
                      "isPrototypeOf",
                      "propertyIsEnumerable",
                      "toLocaleString",
                      "toString",
                      "valueOf",
                    ];

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "object-get-own-property-symbols.js": function _module56(
                    _require57,
                    _exports43
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/object-get-own-property-symbols.js     //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    _exports43.f = Object.getOwnPropertySymbols;

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "is-forced.js": function module(
                    _require58,
                    _exports44,
                    _module57
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/is-forced.js                           //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var fails = _require58("../internals/fails");

                    var replacement = /#|\.prototype\./;

                    var isForced = function (feature, detection) {
                      var value = data[normalize(feature)];
                      return value == POLYFILL
                        ? true
                        : value == NATIVE
                        ? false
                        : typeof detection == "function"
                        ? fails(detection)
                        : !!detection;
                    };

                    var normalize = (isForced.normalize = function (string) {
                      return String(string)
                        .replace(replacement, ".")
                        .toLowerCase();
                    });

                    var data = (isForced.data = {});
                    var NATIVE = (isForced.NATIVE = "N");
                    var POLYFILL = (isForced.POLYFILL = "P");

                    _module57.exports = isForced;

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "create-property.js": function module(
                    _require59,
                    _exports45,
                    _module58
                  ) {
                    var toPrimitive = _require59("../internals/to-primitive");
                    var definePropertyModule = _require59(
                      "../internals/object-define-property"
                    );
                    var createPropertyDescriptor = _require59(
                      "../internals/create-property-descriptor"
                    );

                    _module58.exports = function (object, key, value) {
                      var propertyKey = toPrimitive(key);
                      if (propertyKey in object)
                        definePropertyModule.f(
                          object,
                          propertyKey,
                          createPropertyDescriptor(0, value)
                        );
                      else object[propertyKey] = value;
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "same-value.js": function module(
                    _require60,
                    _exports46,
                    _module59
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/same-value.js                          //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    // `SameValue` abstract operation
                    // https://tc39.github.io/ecma262/#sec-samevalue
                    _module59.exports =
                      Object.is ||
                      function is(x, y) {
                        // eslint-disable-next-line no-self-compare
                        return x === y
                          ? x !== 0 || 1 / x === 1 / y
                          : x != x && y != y;
                      };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "number-is-finite.js": function module(
                    _require61,
                    _exports47,
                    _module60
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/number-is-finite.js                    //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var global = _require61("../internals/global");

                    var globalIsFinite = global.isFinite;

                    // `Number.isFinite` method
                    // https://tc39.github.io/ecma262/#sec-number.isfinite
                    _module60.exports =
                      Number.isFinite ||
                      function isFinite(it) {
                        return typeof it == "number" && globalIsFinite(it);
                      };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "flatten-into-array.js": function module(
                    _require62,
                    _exports48,
                    _module61
                  ) {
                    var isArray = _require62("../internals/is-array");
                    var toLength = _require62("../internals/to-length");
                    var bind = _require62("../internals/function-bind-context");

                    // `FlattenIntoArray` abstract operation
                    // https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
                    var flattenIntoArray = function (
                      target,
                      original,
                      source,
                      sourceLen,
                      start,
                      depth,
                      mapper,
                      thisArg
                    ) {
                      var targetIndex = start;
                      var sourceIndex = 0;
                      var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
                      var element;

                      while (sourceIndex < sourceLen) {
                        if (sourceIndex in source) {
                          element = mapFn
                            ? mapFn(source[sourceIndex], sourceIndex, original)
                            : source[sourceIndex];

                          if (depth > 0 && isArray(element)) {
                            targetIndex =
                              flattenIntoArray(
                                target,
                                original,
                                element,
                                toLength(element.length),
                                targetIndex,
                                depth - 1
                              ) - 1;
                          } else {
                            if (targetIndex >= 0x1fffffffffffff)
                              throw TypeError(
                                "Exceed the acceptable array length"
                              );
                            target[targetIndex] = element;
                          }

                          targetIndex++;
                        }
                        sourceIndex++;
                      }
                      return targetIndex;
                    };

                    _module61.exports = flattenIntoArray;

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "is-array.js": function module(
                    _require63,
                    _exports49,
                    _module62
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/is-array.js                            //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var classof = _require63("../internals/classof-raw");

                    // `IsArray` abstract operation
                    // https://tc39.github.io/ecma262/#sec-isarray
                    _module62.exports =
                      Array.isArray ||
                      function isArray(arg) {
                        return classof(arg) == "Array";
                      };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "function-bind-context.js": function module(
                    _require64,
                    _exports50,
                    _module63
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/function-bind-context.js               //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var aFunction = _require64("../internals/a-function");

                    // optional / simple context binding
                    _module63.exports = function (fn, that, length) {
                      aFunction(fn);
                      if (that === undefined) return fn;
                      switch (length) {
                        case 0:
                          return function () {
                            return fn.call(that);
                          };
                        case 1:
                          return function (a) {
                            return fn.call(that, a);
                          };
                        case 2:
                          return function (a, b) {
                            return fn.call(that, a, b);
                          };
                        case 3:
                          return function (a, b, c) {
                            return fn.call(that, a, b, c);
                          };
                      }
                      return function () /* ...args */ {
                        return fn.apply(that, arguments);
                      };
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "a-function.js": function module(
                    _require65,
                    _exports51,
                    _module64
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/a-function.js                          //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    _module64.exports = function (it) {
                      if (typeof it != "function") {
                        throw TypeError(String(it) + " is not a function");
                      }
                      return it;
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "to-object.js": function module(
                    _require66,
                    _exports52,
                    _module65
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/to-object.js                           //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var requireObjectCoercible = _require66(
                      "../internals/require-object-coercible"
                    );

                    // `ToObject` abstract operation
                    // https://tc39.github.io/ecma262/#sec-toobject
                    _module65.exports = function (argument) {
                      return Object(requireObjectCoercible(argument));
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "array-species-create.js": function module(
                    _require67,
                    _exports53,
                    _module66
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/array-species-create.js                //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var isObject = _require67("../internals/is-object");
                    var isArray = _require67("../internals/is-array");
                    var wellKnownSymbol = _require67(
                      "../internals/well-known-symbol"
                    );

                    var SPECIES = wellKnownSymbol("species");

                    // `ArraySpeciesCreate` abstract operation
                    // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
                    _module66.exports = function (originalArray, length) {
                      var C;
                      if (isArray(originalArray)) {
                        C = originalArray.constructor;
                        // cross-realm fallback
                        if (
                          typeof C == "function" &&
                          (C === Array || isArray(C.prototype))
                        )
                          C = undefined;
                        else if (isObject(C)) {
                          C = C[SPECIES];
                          if (C === null) C = undefined;
                        }
                      }
                      return new (C === undefined ? Array : C)(
                        length === 0 ? 0 : length
                      );
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "well-known-symbol.js": function module(
                    _require68,
                    _exports54,
                    _module67
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/well-known-symbol.js                   //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var global = _require68("../internals/global");
                    var shared = _require68("../internals/shared");
                    var has = _require68("../internals/has");
                    var uid = _require68("../internals/uid");
                    var NATIVE_SYMBOL = _require68(
                      "../internals/native-symbol"
                    );
                    var USE_SYMBOL_AS_UID = _require68(
                      "../internals/use-symbol-as-uid"
                    );

                    var WellKnownSymbolsStore = shared("wks");
                    var Symbol = global.Symbol;
                    var createWellKnownSymbol = USE_SYMBOL_AS_UID
                      ? Symbol
                      : (Symbol && Symbol.withoutSetter) || uid;

                    _module67.exports = function (name) {
                      if (!has(WellKnownSymbolsStore, name)) {
                        if (NATIVE_SYMBOL && has(Symbol, name))
                          WellKnownSymbolsStore[name] = Symbol[name];
                        else
                          WellKnownSymbolsStore[name] = createWellKnownSymbol(
                            "Symbol." + name
                          );
                      }
                      return WellKnownSymbolsStore[name];
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "native-symbol.js": function module(
                    _require69,
                    _exports55,
                    _module68
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/native-symbol.js                       //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var fails = _require69("../internals/fails");

                    _module68.exports =
                      !!Object.getOwnPropertySymbols &&
                      !fails(function () {
                        // Chrome 38 Symbol has incorrect toString conversion
                        // eslint-disable-next-line no-undef
                        return !String(Symbol());
                      });

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "use-symbol-as-uid.js": function module(
                    _require70,
                    _exports56,
                    _module69
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/use-symbol-as-uid.js                   //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var NATIVE_SYMBOL = _require70(
                      "../internals/native-symbol"
                    );

                    _module69.exports =
                      NATIVE_SYMBOL &&
                      // eslint-disable-next-line no-undef
                      !Symbol.sham &&
                      // eslint-disable-next-line no-undef
                      typeof Symbol.iterator == "symbol";

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "iterate.js": function module(
                    _require71,
                    _exports57,
                    _module70
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/iterate.js                             //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var anObject = _require71("../internals/an-object");
                    var isArrayIteratorMethod = _require71(
                      "../internals/is-array-iterator-method"
                    );
                    var toLength = _require71("../internals/to-length");
                    var bind = _require71("../internals/function-bind-context");
                    var getIteratorMethod = _require71(
                      "../internals/get-iterator-method"
                    );
                    var callWithSafeIterationClosing = _require71(
                      "../internals/call-with-safe-iteration-closing"
                    );

                    var Result = function (stopped, result) {
                      this.stopped = stopped;
                      this.result = result;
                    };

                    var iterate = (_module70.exports = function (
                      iterable,
                      fn,
                      that,
                      AS_ENTRIES,
                      IS_ITERATOR
                    ) {
                      var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
                      var iterator, iterFn, index, length, result, next, step;

                      if (IS_ITERATOR) {
                        iterator = iterable;
                      } else {
                        iterFn = getIteratorMethod(iterable);
                        if (typeof iterFn != "function")
                          throw TypeError("Target is not iterable");
                        // optimisation for array iterators
                        if (isArrayIteratorMethod(iterFn)) {
                          for (
                            index = 0, length = toLength(iterable.length);
                            length > index;
                            index++
                          ) {
                            result = AS_ENTRIES
                              ? boundFunction(
                                  anObject((step = iterable[index]))[0],
                                  step[1]
                                )
                              : boundFunction(iterable[index]);
                            if (result && result instanceof Result)
                              return result;
                          }
                          return new Result(false);
                        }
                        iterator = iterFn.call(iterable);
                      }

                      next = iterator.next;
                      while (!(step = next.call(iterator)).done) {
                        result = callWithSafeIterationClosing(
                          iterator,
                          boundFunction,
                          step.value,
                          AS_ENTRIES
                        );
                        if (
                          typeof result == "object" &&
                          result &&
                          result instanceof Result
                        )
                          return result;
                      }
                      return new Result(false);
                    });

                    iterate.stop = function (result) {
                      return new Result(true, result);
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "is-array-iterator-method.js": function module(
                    _require72,
                    _exports58,
                    _module71
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/is-array-iterator-method.js            //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var wellKnownSymbol = _require72(
                      "../internals/well-known-symbol"
                    );
                    var Iterators = _require72("../internals/iterators");

                    var ITERATOR = wellKnownSymbol("iterator");
                    var ArrayPrototype = Array.prototype;

                    // check on default Array iterator
                    _module71.exports = function (it) {
                      return (
                        it !== undefined &&
                        (Iterators.Array === it ||
                          ArrayPrototype[ITERATOR] === it)
                      );
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "iterators.js": function module(
                    _require73,
                    _exports59,
                    _module72
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/iterators.js                           //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    _module72.exports = {};

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "get-iterator-method.js": function module(
                    _require74,
                    _exports60,
                    _module73
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/get-iterator-method.js                 //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var classof = _require74("../internals/classof");
                    var Iterators = _require74("../internals/iterators");
                    var wellKnownSymbol = _require74(
                      "../internals/well-known-symbol"
                    );

                    var ITERATOR = wellKnownSymbol("iterator");

                    _module73.exports = function (it) {
                      if (it != undefined)
                        return (
                          it[ITERATOR] ||
                          it["@@iterator"] ||
                          Iterators[classof(it)]
                        );
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "classof.js": function module(
                    _require75,
                    _exports61,
                    _module74
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/classof.js                             //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var TO_STRING_TAG_SUPPORT = _require75(
                      "../internals/to-string-tag-support"
                    );
                    var classofRaw = _require75("../internals/classof-raw");
                    var wellKnownSymbol = _require75(
                      "../internals/well-known-symbol"
                    );

                    var TO_STRING_TAG = wellKnownSymbol("toStringTag");
                    // ES3 wrong here
                    var CORRECT_ARGUMENTS =
                      classofRaw(
                        (function () {
                          return arguments;
                        })()
                      ) == "Arguments";

                    // fallback for IE11 Script Access Denied error
                    var tryGet = function (it, key) {
                      try {
                        return it[key];
                      } catch (error) {
                        /* empty */
                      }
                    };

                    // getting tag from ES6+ `Object.prototype.toString`
                    _module74.exports = TO_STRING_TAG_SUPPORT
                      ? classofRaw
                      : function (it) {
                          var O, tag, result;
                          return it === undefined
                            ? "Undefined"
                            : it === null
                            ? "Null"
                            : // @@toStringTag case
                            typeof (tag = tryGet(
                                (O = Object(it)),
                                TO_STRING_TAG
                              )) == "string"
                            ? tag
                            : // builtinTag case
                            CORRECT_ARGUMENTS
                            ? classofRaw(O)
                            : // ES3 arguments fallback
                            (result = classofRaw(O)) == "Object" &&
                              typeof O.callee == "function"
                            ? "Arguments"
                            : result;
                        };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "to-string-tag-support.js": function module(
                    _require76,
                    _exports62,
                    _module75
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/to-string-tag-support.js               //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var wellKnownSymbol = _require76(
                      "../internals/well-known-symbol"
                    );

                    var TO_STRING_TAG = wellKnownSymbol("toStringTag");
                    var test = {};

                    test[TO_STRING_TAG] = "z";

                    _module75.exports = String(test) === "[object z]";

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "call-with-safe-iteration-closing.js": function module(
                    _require77,
                    _exports63,
                    _module76
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/call-with-safe-iteration-closing.js    //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var anObject = _require77("../internals/an-object");

                    // call something on iterator step with safe closing on error
                    _module76.exports = function (
                      iterator,
                      fn,
                      value,
                      ENTRIES
                    ) {
                      try {
                        return ENTRIES
                          ? fn(anObject(value)[0], value[1])
                          : fn(value);
                        // 7.4.6 IteratorClose(iterator, completion)
                      } catch (error) {
                        var returnMethod = iterator["return"];
                        if (returnMethod !== undefined)
                          anObject(returnMethod.call(iterator));
                        throw error;
                      }
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "string-pad.js": function module(
                    _require78,
                    _exports64,
                    _module77
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/string-pad.js                          //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    // https://github.com/tc39/proposal-string-pad-start-end
                    var toLength = _require78("../internals/to-length");
                    var repeat = _require78("../internals/string-repeat");
                    var requireObjectCoercible = _require78(
                      "../internals/require-object-coercible"
                    );

                    var ceil = Math.ceil;

                    // `String.prototype.{ padStart, padEnd }` methods implementation
                    var createMethod = function (IS_END) {
                      return function ($this, maxLength, fillString) {
                        var S = String(requireObjectCoercible($this));
                        var stringLength = S.length;
                        var fillStr =
                          fillString === undefined ? " " : String(fillString);
                        var intMaxLength = toLength(maxLength);
                        var fillLen, stringFiller;
                        if (intMaxLength <= stringLength || fillStr == "")
                          return S;
                        fillLen = intMaxLength - stringLength;
                        stringFiller = repeat.call(
                          fillStr,
                          ceil(fillLen / fillStr.length)
                        );
                        if (stringFiller.length > fillLen)
                          stringFiller = stringFiller.slice(0, fillLen);
                        return IS_END ? S + stringFiller : stringFiller + S;
                      };
                    };

                    _module77.exports = {
                      // `String.prototype.padStart` method
                      // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
                      start: createMethod(false),
                      // `String.prototype.padEnd` method
                      // https://tc39.github.io/ecma262/#sec-string.prototype.padend
                      end: createMethod(true),
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "string-repeat.js": function module(
                    _require79,
                    _exports65,
                    _module78
                  ) {
                    var toInteger = _require79("../internals/to-integer");
                    var requireObjectCoercible = _require79(
                      "../internals/require-object-coercible"
                    );

                    // `String.prototype.repeat` method implementation
                    // https://tc39.github.io/ecma262/#sec-string.prototype.repeat
                    _module78.exports =
                      "".repeat ||
                      function repeat(count) {
                        var str = String(requireObjectCoercible(this));
                        var result = "";
                        var n = toInteger(count);
                        if (n < 0 || n == Infinity)
                          throw RangeError("Wrong number of repetitions");
                        for (; n > 0; (n >>>= 1) && (str += str))
                          if (n & 1) result += str;
                        return result;
                      };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "string-pad-webkit-bug.js": function module(
                    _require80,
                    _exports66,
                    _module79
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/string-pad-webkit-bug.js               //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    // https://github.com/zloirock/core-js/issues/280
                    var userAgent = _require80(
                      "../internals/engine-user-agent"
                    );

                    // eslint-disable-next-line unicorn/no-unsafe-regex
                    _module79.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(
                      userAgent
                    );

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "engine-user-agent.js": function module(
                    _require81,
                    _exports67,
                    _module80
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/engine-user-agent.js                   //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var getBuiltIn = _require81("../internals/get-built-in");

                    _module80.exports =
                      getBuiltIn("navigator", "userAgent") || "";

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "string-trim.js": function module(
                    _require82,
                    _exports68,
                    _module81
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/string-trim.js                         //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var requireObjectCoercible = _require82(
                      "../internals/require-object-coercible"
                    );
                    var whitespaces = _require82("../internals/whitespaces");

                    var whitespace = "[" + whitespaces + "]";
                    var ltrim = RegExp("^" + whitespace + whitespace + "*");
                    var rtrim = RegExp(whitespace + whitespace + "*$");

                    // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
                    var createMethod = function (TYPE) {
                      return function ($this) {
                        var string = String(requireObjectCoercible($this));
                        if (TYPE & 1) string = string.replace(ltrim, "");
                        if (TYPE & 2) string = string.replace(rtrim, "");
                        return string;
                      };
                    };

                    _module81.exports = {
                      // `String.prototype.{ trimLeft, trimStart }` methods
                      // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
                      start: createMethod(1),
                      // `String.prototype.{ trimRight, trimEnd }` methods
                      // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
                      end: createMethod(2),
                      // `String.prototype.trim` method
                      // https://tc39.github.io/ecma262/#sec-string.prototype.trim
                      trim: createMethod(3),
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "whitespaces.js": function module(
                    _require83,
                    _exports69,
                    _module82
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/whitespaces.js                         //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    // a string of all valid unicode whitespaces
                    // eslint-disable-next-line max-len
                    _module82.exports =
                      "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "string-trim-forced.js": function module(
                    _require84,
                    _exports70,
                    _module83
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/string-trim-forced.js                  //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var fails = _require84("../internals/fails");
                    var whitespaces = _require84("../internals/whitespaces");

                    var non = "\u200B\u0085\u180E";

                    // check that a method works with the correct list
                    // of whitespaces and has a correct name
                    _module83.exports = function (METHOD_NAME) {
                      return fails(function () {
                        return (
                          !!whitespaces[METHOD_NAME]() ||
                          non[METHOD_NAME]() != non ||
                          whitespaces[METHOD_NAME].name !== METHOD_NAME
                        );
                      });
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "define-well-known-symbol.js": function module(
                    _require85,
                    _exports71,
                    _module84
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/define-well-known-symbol.js            //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var path = _require85("../internals/path");
                    var has = _require85("../internals/has");
                    var wrappedWellKnownSymbolModule = _require85(
                      "../internals/well-known-symbol-wrapped"
                    );
                    var defineProperty = _require85(
                      "../internals/object-define-property"
                    ).f;

                    _module84.exports = function (NAME) {
                      var Symbol = path.Symbol || (path.Symbol = {});
                      if (!has(Symbol, NAME))
                        defineProperty(Symbol, NAME, {
                          value: wrappedWellKnownSymbolModule.f(NAME),
                        });
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                  "well-known-symbol-wrapped.js": function _module85(
                    _require86,
                    _exports72
                  ) {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //                                                                                                                     //
                    // node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/internals/well-known-symbol-wrapped.js           //
                    //                                                                                                                     //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    var wellKnownSymbol = _require86(
                      "../internals/well-known-symbol"
                    );

                    _exports72.f = wellKnownSymbol;

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports = _require2(
    "/node_modules/meteor/ecmascript-runtime-client/modern.js"
  );

  /* Exports */
  Package._define("ecmascript-runtime-client", _exports);
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var WebApp;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          webapp: {
            "webapp_client.js": function module(_require, _exports, _module) {
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                                    //
              // packages/webapp/webapp_client.js                                                                                   //
              //                                                                                                                    //
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module.export({
                WebApp: () => WebApp,
              });
              const WebApp = {
                _isCssLoaded() {
                  if (document.styleSheets.length === 0) {
                    return true;
                  }

                  return Array.prototype.find.call(
                    document.styleSheets,
                    (sheet) => {
                      if (sheet.cssText && !sheet.cssRules) {
                        // IE8
                        return !sheet.cssText.match(
                          /meteor-css-not-found-error/
                        );
                      }

                      return !Array.prototype.find.call(
                        sheet.cssRules,
                        (rule) =>
                          rule.selectorText === ".meteor-css-not-found-error"
                      );
                    }
                  );
                },
              };
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/webapp/webapp_client.js");

  /* Exports */
  Package._define("webapp", _exports2, {
    WebApp: WebApp,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var Base64;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          base64: {
            "base64.js": function module(_require, _exports, _module) {
              ////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                        //
              // packages/base64/base64.js                                                              //
              //                                                                                        //
              ////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module.export({
                Base64: () => Base64,
              });
              // Base 64 encoding
              const BASE_64_CHARS =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
              const BASE_64_VALS = Object.create(null);

              const getChar = (val) => BASE_64_CHARS.charAt(val);

              const getVal = (ch) => (ch === "=" ? -1 : BASE_64_VALS[ch]);

              for (let i = 0; i < BASE_64_CHARS.length; i++) {
                BASE_64_VALS[getChar(i)] = i;
              }

              const encode = (array) => {
                if (typeof array === "string") {
                  const str = array;
                  array = newBinary(str.length);

                  for (let i = 0; i < str.length; i++) {
                    const ch = str.charCodeAt(i);

                    if (ch > 0xff) {
                      throw new Error(
                        "Not ascii. Base64.encode can only take ascii strings."
                      );
                    }

                    array[i] = ch;
                  }
                }

                const answer = [];
                let a = null;
                let b = null;
                let c = null;
                let d = null;

                for (let i = 0; i < array.length; i++) {
                  switch (i % 3) {
                    case 0:
                      a = (array[i] >> 2) & 0x3f;
                      b = (array[i] & 0x03) << 4;
                      break;

                    case 1:
                      b = b | ((array[i] >> 4) & 0xf);
                      c = (array[i] & 0xf) << 2;
                      break;

                    case 2:
                      c = c | ((array[i] >> 6) & 0x03);
                      d = array[i] & 0x3f;
                      answer.push(getChar(a));
                      answer.push(getChar(b));
                      answer.push(getChar(c));
                      answer.push(getChar(d));
                      a = null;
                      b = null;
                      c = null;
                      d = null;
                      break;
                  }
                }

                if (a != null) {
                  answer.push(getChar(a));
                  answer.push(getChar(b));

                  if (c == null) {
                    answer.push("=");
                  } else {
                    answer.push(getChar(c));
                  }

                  if (d == null) {
                    answer.push("=");
                  }
                }

                return answer.join("");
              }; // XXX This is a weird place for this to live, but it's used both by
              // this package and 'ejson', and we can't put it in 'ejson' without
              // introducing a circular dependency. It should probably be in its own
              // package or as a helper in a package that both 'base64' and 'ejson'
              // use.

              const newBinary = (len) => {
                if (
                  typeof Uint8Array === "undefined" ||
                  typeof ArrayBuffer === "undefined"
                ) {
                  const ret = [];

                  for (let i = 0; i < len; i++) {
                    ret.push(0);
                  }

                  ret.$Uint8ArrayPolyfill = true;
                  return ret;
                }

                return new Uint8Array(new ArrayBuffer(len));
              };

              const decode = (str) => {
                let len = Math.floor((str.length * 3) / 4);

                if (str.charAt(str.length - 1) == "=") {
                  len--;

                  if (str.charAt(str.length - 2) == "=") {
                    len--;
                  }
                }

                const arr = newBinary(len);
                let one = null;
                let two = null;
                let three = null;
                let j = 0;

                for (let i = 0; i < str.length; i++) {
                  const c = str.charAt(i);
                  const v = getVal(c);

                  switch (i % 4) {
                    case 0:
                      if (v < 0) {
                        throw new Error("invalid base64 string");
                      }

                      one = v << 2;
                      break;

                    case 1:
                      if (v < 0) {
                        throw new Error("invalid base64 string");
                      }

                      one = one | (v >> 4);
                      arr[j++] = one;
                      two = (v & 0x0f) << 4;
                      break;

                    case 2:
                      if (v >= 0) {
                        two = two | (v >> 2);
                        arr[j++] = two;
                        three = (v & 0x03) << 6;
                      }

                      break;

                    case 3:
                      if (v >= 0) {
                        arr[j++] = three | v;
                      }

                      break;
                  }
                }

                return arr;
              };

              const Base64 = {
                encode,
                decode,
                newBinary,
              };
              ////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/base64/base64.js");

  /* Exports */
  Package._define("base64", _exports2, {
    Base64: Base64,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var Base64 = Package.base64.Base64;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var EJSON;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          ejson: {
            "ejson.js": function module(_require, _exports, _module) {
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                             //
              // packages/ejson/ejson.js                                                                                     //
              //                                                                                                             //
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module.export({
                EJSON: () => EJSON,
              });
              let isFunction,
                isObject,
                keysOf,
                lengthOf,
                hasOwn,
                convertMapToObject,
                isArguments,
                isInfOrNaN,
                handleError;
              _module.link(
                "./utils",
                {
                  isFunction(v) {
                    isFunction = v;
                  },

                  isObject(v) {
                    isObject = v;
                  },

                  keysOf(v) {
                    keysOf = v;
                  },

                  lengthOf(v) {
                    lengthOf = v;
                  },

                  hasOwn(v) {
                    hasOwn = v;
                  },

                  convertMapToObject(v) {
                    convertMapToObject = v;
                  },

                  isArguments(v) {
                    isArguments = v;
                  },

                  isInfOrNaN(v) {
                    isInfOrNaN = v;
                  },

                  handleError(v) {
                    handleError = v;
                  },
                },
                0
              );

              /**
               * @namespace
               * @summary Namespace for EJSON functions
               */
              const EJSON = {}; // Custom type interface definition

              /**
               * @class CustomType
               * @instanceName customType
               * @memberOf EJSON
               * @summary The interface that a class must satisfy to be able to become an
               * EJSON custom type via EJSON.addType.
               */

              /**
               * @function typeName
               * @memberOf EJSON.CustomType
               * @summary Return the tag used to identify this type.  This must match the
               *          tag used to register this type with
               *          [`EJSON.addType`](#ejson_add_type).
               * @locus Anywhere
               * @instance
               */

              /**
               * @function toJSONValue
               * @memberOf EJSON.CustomType
               * @summary Serialize this instance into a JSON-compatible value.
               * @locus Anywhere
               * @instance
               */

              /**
               * @function clone
               * @memberOf EJSON.CustomType
               * @summary Return a value `r` such that `this.equals(r)` is true, and
               *          modifications to `r` do not affect `this` and vice versa.
               * @locus Anywhere
               * @instance
               */

              /**
               * @function equals
               * @memberOf EJSON.CustomType
               * @summary Return `true` if `other` has a value equal to `this`; `false`
               *          otherwise.
               * @locus Anywhere
               * @param {Object} other Another object to compare this to.
               * @instance
               */

              const customTypes = new Map(); // Add a custom type, using a method of your choice to get to and
              // from a basic JSON-able representation.  The factory argument
              // is a function of JSON-able --> your object
              // The type you add must have:
              // - A toJSONValue() method, so that Meteor can serialize it
              // - a typeName() method, to show how to look it up in our type table.
              // It is okay if these methods are monkey-patched on.
              // EJSON.clone will use toJSONValue and the given factory to produce
              // a clone, but you may specify a method clone() that will be
              // used instead.
              // Similarly, EJSON.equals will use toJSONValue to make comparisons,
              // but you may provide a method equals() instead.

              /**
               * @summary Add a custom datatype to EJSON.
               * @locus Anywhere
               * @param {String} name A tag for your custom type; must be unique among
               *                      custom data types defined in your project, and must
               *                      match the result of your type's `typeName` method.
               * @param {Function} factory A function that deserializes a JSON-compatible
               *                           value into an instance of your type.  This should
               *                           match the serialization performed by your
               *                           type's `toJSONValue` method.
               */

              EJSON.addType = (name, factory) => {
                if (customTypes.has(name)) {
                  throw new Error("Type ".concat(name, " already present"));
                }

                customTypes.set(name, factory);
              };

              const builtinConverters = [
                {
                  // Date
                  matchJSONValue(obj) {
                    return hasOwn(obj, "$date") && lengthOf(obj) === 1;
                  },

                  matchObject(obj) {
                    return obj instanceof Date;
                  },

                  toJSONValue(obj) {
                    return {
                      $date: obj.getTime(),
                    };
                  },

                  fromJSONValue(obj) {
                    return new Date(obj.$date);
                  },
                },
                {
                  // RegExp
                  matchJSONValue(obj) {
                    return (
                      hasOwn(obj, "$regexp") &&
                      hasOwn(obj, "$flags") &&
                      lengthOf(obj) === 2
                    );
                  },

                  matchObject(obj) {
                    return obj instanceof RegExp;
                  },

                  toJSONValue(regexp) {
                    return {
                      $regexp: regexp.source,
                      $flags: regexp.flags,
                    };
                  },

                  fromJSONValue(obj) {
                    // Replaces duplicate / invalid flags.
                    return new RegExp(
                      obj.$regexp,
                      obj.$flags // Cut off flags at 50 chars to avoid abusing RegExp for DOS.
                        .slice(0, 50)
                        .replace(/[^gimuy]/g, "")
                        .replace(/(.)(?=.*\1)/g, "")
                    );
                  },
                },
                {
                  // NaN, Inf, -Inf. (These are the only objects with typeof !== 'object'
                  // which we match.)
                  matchJSONValue(obj) {
                    return hasOwn(obj, "$InfNaN") && lengthOf(obj) === 1;
                  },

                  matchObject: isInfOrNaN,

                  toJSONValue(obj) {
                    let sign;

                    if (Number.isNaN(obj)) {
                      sign = 0;
                    } else if (obj === Infinity) {
                      sign = 1;
                    } else {
                      sign = -1;
                    }

                    return {
                      $InfNaN: sign,
                    };
                  },

                  fromJSONValue(obj) {
                    return obj.$InfNaN / 0;
                  },
                },
                {
                  // Binary
                  matchJSONValue(obj) {
                    return hasOwn(obj, "$binary") && lengthOf(obj) === 1;
                  },

                  matchObject(obj) {
                    return (
                      (typeof Uint8Array !== "undefined" &&
                        obj instanceof Uint8Array) ||
                      (obj && hasOwn(obj, "$Uint8ArrayPolyfill"))
                    );
                  },

                  toJSONValue(obj) {
                    return {
                      $binary: Base64.encode(obj),
                    };
                  },

                  fromJSONValue(obj) {
                    return Base64.decode(obj.$binary);
                  },
                },
                {
                  // Escaping one level
                  matchJSONValue(obj) {
                    return hasOwn(obj, "$escape") && lengthOf(obj) === 1;
                  },

                  matchObject(obj) {
                    let match = false;

                    if (obj) {
                      const keyCount = lengthOf(obj);

                      if (keyCount === 1 || keyCount === 2) {
                        match = builtinConverters.some((converter) =>
                          converter.matchJSONValue(obj)
                        );
                      }
                    }

                    return match;
                  },

                  toJSONValue(obj) {
                    const newObj = {};
                    keysOf(obj).forEach((key) => {
                      newObj[key] = EJSON.toJSONValue(obj[key]);
                    });
                    return {
                      $escape: newObj,
                    };
                  },

                  fromJSONValue(obj) {
                    const newObj = {};
                    keysOf(obj.$escape).forEach((key) => {
                      newObj[key] = EJSON.fromJSONValue(obj.$escape[key]);
                    });
                    return newObj;
                  },
                },
                {
                  // Custom
                  matchJSONValue(obj) {
                    return (
                      hasOwn(obj, "$type") &&
                      hasOwn(obj, "$value") &&
                      lengthOf(obj) === 2
                    );
                  },

                  matchObject(obj) {
                    return EJSON._isCustomType(obj);
                  },

                  toJSONValue(obj) {
                    const jsonValue = Meteor._noYieldsAllowed(() =>
                      obj.toJSONValue()
                    );

                    return {
                      $type: obj.typeName(),
                      $value: jsonValue,
                    };
                  },

                  fromJSONValue(obj) {
                    const typeName = obj.$type;

                    if (!customTypes.has(typeName)) {
                      throw new Error(
                        "Custom EJSON type ".concat(typeName, " is not defined")
                      );
                    }

                    const converter = customTypes.get(typeName);
                    return Meteor._noYieldsAllowed(() => converter(obj.$value));
                  },
                },
              ];

              EJSON._isCustomType = (obj) =>
                obj &&
                isFunction(obj.toJSONValue) &&
                isFunction(obj.typeName) &&
                customTypes.has(obj.typeName());

              EJSON._getTypes = function () {
                let isOriginal =
                  arguments.length > 0 && arguments[0] !== undefined
                    ? arguments[0]
                    : false;
                return isOriginal
                  ? customTypes
                  : convertMapToObject(customTypes);
              };

              EJSON._getConverters = () => builtinConverters; // Either return the JSON-compatible version of the argument, or undefined (if
              // the item isn't itself replaceable, but maybe some fields in it are)

              const toJSONValueHelper = (item) => {
                for (let i = 0; i < builtinConverters.length; i++) {
                  const converter = builtinConverters[i];

                  if (converter.matchObject(item)) {
                    return converter.toJSONValue(item);
                  }
                }

                return undefined;
              }; // for both arrays and objects, in-place modification.

              const adjustTypesToJSONValue = (obj) => {
                // Is it an atom that we need to adjust?
                if (obj === null) {
                  return null;
                }

                const maybeChanged = toJSONValueHelper(obj);

                if (maybeChanged !== undefined) {
                  return maybeChanged;
                } // Other atoms are unchanged.

                if (!isObject(obj)) {
                  return obj;
                } // Iterate over array or object structure.

                keysOf(obj).forEach((key) => {
                  const value = obj[key];

                  if (
                    !isObject(value) &&
                    value !== undefined &&
                    !isInfOrNaN(value)
                  ) {
                    return; // continue
                  }

                  const changed = toJSONValueHelper(value);

                  if (changed) {
                    obj[key] = changed;
                    return; // on to the next key
                  } // if we get here, value is an object but not adjustable
                  // at this level.  recurse.

                  adjustTypesToJSONValue(value);
                });
                return obj;
              };

              EJSON._adjustTypesToJSONValue = adjustTypesToJSONValue;
              /**
               * @summary Serialize an EJSON-compatible value into its plain JSON
               *          representation.
               * @locus Anywhere
               * @param {EJSON} val A value to serialize to plain JSON.
               */

              EJSON.toJSONValue = (item) => {
                const changed = toJSONValueHelper(item);

                if (changed !== undefined) {
                  return changed;
                }

                let newItem = item;

                if (isObject(item)) {
                  newItem = EJSON.clone(item);
                  adjustTypesToJSONValue(newItem);
                }

                return newItem;
              }; // Either return the argument changed to have the non-json
              // rep of itself (the Object version) or the argument itself.
              // DOES NOT RECURSE.  For actually getting the fully-changed value, use
              // EJSON.fromJSONValue

              const fromJSONValueHelper = (value) => {
                if (isObject(value) && value !== null) {
                  const keys = keysOf(value);

                  if (
                    keys.length <= 2 &&
                    keys.every(
                      (k) => typeof k === "string" && k.substr(0, 1) === "$"
                    )
                  ) {
                    for (let i = 0; i < builtinConverters.length; i++) {
                      const converter = builtinConverters[i];

                      if (converter.matchJSONValue(value)) {
                        return converter.fromJSONValue(value);
                      }
                    }
                  }
                }

                return value;
              }; // for both arrays and objects. Tries its best to just
              // use the object you hand it, but may return something
              // different if the object you hand it itself needs changing.

              const adjustTypesFromJSONValue = (obj) => {
                if (obj === null) {
                  return null;
                }

                const maybeChanged = fromJSONValueHelper(obj);

                if (maybeChanged !== obj) {
                  return maybeChanged;
                } // Other atoms are unchanged.

                if (!isObject(obj)) {
                  return obj;
                }

                keysOf(obj).forEach((key) => {
                  const value = obj[key];

                  if (isObject(value)) {
                    const changed = fromJSONValueHelper(value);

                    if (value !== changed) {
                      obj[key] = changed;
                      return;
                    } // if we get here, value is an object but not adjustable
                    // at this level.  recurse.

                    adjustTypesFromJSONValue(value);
                  }
                });
                return obj;
              };

              EJSON._adjustTypesFromJSONValue = adjustTypesFromJSONValue;
              /**
               * @summary Deserialize an EJSON value from its plain JSON representation.
               * @locus Anywhere
               * @param {JSONCompatible} val A value to deserialize into EJSON.
               */

              EJSON.fromJSONValue = (item) => {
                let changed = fromJSONValueHelper(item);

                if (changed === item && isObject(item)) {
                  changed = EJSON.clone(item);
                  adjustTypesFromJSONValue(changed);
                }

                return changed;
              };
              /**
               * @summary Serialize a value to a string. For EJSON values, the serialization
               *          fully represents the value. For non-EJSON values, serializes the
               *          same way as `JSON.stringify`.
               * @locus Anywhere
               * @param {EJSON} val A value to stringify.
               * @param {Object} [options]
               * @param {Boolean | Integer | String} options.indent Indents objects and
               * arrays for easy readability.  When `true`, indents by 2 spaces; when an
               * integer, indents by that number of spaces; and when a string, uses the
               * string as the indentation pattern.
               * @param {Boolean} options.canonical When `true`, stringifies keys in an
               *                                    object in sorted order.
               */

              EJSON.stringify = handleError((item, options) => {
                let serialized;
                const json = EJSON.toJSONValue(item);

                if (options && (options.canonical || options.indent)) {
                  let canonicalStringify;
                  _module.link(
                    "./stringify",
                    {
                      default(v) {
                        canonicalStringify = v;
                      },
                    },
                    1
                  );
                  serialized = canonicalStringify(json, options);
                } else {
                  serialized = JSON.stringify(json);
                }

                return serialized;
              });
              /**
               * @summary Parse a string into an EJSON value. Throws an error if the string
               *          is not valid EJSON.
               * @locus Anywhere
               * @param {String} str A string to parse into an EJSON value.
               */

              EJSON.parse = (item) => {
                if (typeof item !== "string") {
                  throw new Error("EJSON.parse argument should be a string");
                }

                return EJSON.fromJSONValue(JSON.parse(item));
              };
              /**
               * @summary Returns true if `x` is a buffer of binary data, as returned from
               *          [`EJSON.newBinary`](#ejson_new_binary).
               * @param {Object} x The variable to check.
               * @locus Anywhere
               */

              EJSON.isBinary = (obj) => {
                return !!(
                  (typeof Uint8Array !== "undefined" &&
                    obj instanceof Uint8Array) ||
                  (obj && obj.$Uint8ArrayPolyfill)
                );
              };
              /**
               * @summary Return true if `a` and `b` are equal to each other.  Return false
               *          otherwise.  Uses the `equals` method on `a` if present, otherwise
               *          performs a deep comparison.
               * @locus Anywhere
               * @param {EJSON} a
               * @param {EJSON} b
               * @param {Object} [options]
               * @param {Boolean} options.keyOrderSensitive Compare in key sensitive order,
               * if supported by the JavaScript implementation.  For example, `{a: 1, b: 2}`
               * is equal to `{b: 2, a: 1}` only when `keyOrderSensitive` is `false`.  The
               * default is `false`.
               */

              EJSON.equals = (a, b, options) => {
                let i;
                const keyOrderSensitive = !!(
                  options && options.keyOrderSensitive
                );

                if (a === b) {
                  return true;
                } // This differs from the IEEE spec for NaN equality, b/c we don't want
                // anything ever with a NaN to be poisoned from becoming equal to anything.

                if (Number.isNaN(a) && Number.isNaN(b)) {
                  return true;
                } // if either one is falsy, they'd have to be === to be equal

                if (!a || !b) {
                  return false;
                }

                if (!(isObject(a) && isObject(b))) {
                  return false;
                }

                if (a instanceof Date && b instanceof Date) {
                  return a.valueOf() === b.valueOf();
                }

                if (EJSON.isBinary(a) && EJSON.isBinary(b)) {
                  if (a.length !== b.length) {
                    return false;
                  }

                  for (i = 0; i < a.length; i++) {
                    if (a[i] !== b[i]) {
                      return false;
                    }
                  }

                  return true;
                }

                if (isFunction(a.equals)) {
                  return a.equals(b, options);
                }

                if (isFunction(b.equals)) {
                  return b.equals(a, options);
                }

                if (a instanceof Array) {
                  if (!(b instanceof Array)) {
                    return false;
                  }

                  if (a.length !== b.length) {
                    return false;
                  }

                  for (i = 0; i < a.length; i++) {
                    if (!EJSON.equals(a[i], b[i], options)) {
                      return false;
                    }
                  }

                  return true;
                } // fallback for custom types that don't implement their own equals

                switch (EJSON._isCustomType(a) + EJSON._isCustomType(b)) {
                  case 1:
                    return false;

                  case 2:
                    return EJSON.equals(
                      EJSON.toJSONValue(a),
                      EJSON.toJSONValue(b)
                    );

                  default: // Do nothing
                } // fall back to structural equality of objects

                let ret;
                const aKeys = keysOf(a);
                const bKeys = keysOf(b);

                if (keyOrderSensitive) {
                  i = 0;
                  ret = aKeys.every((key) => {
                    if (i >= bKeys.length) {
                      return false;
                    }

                    if (key !== bKeys[i]) {
                      return false;
                    }

                    if (!EJSON.equals(a[key], b[bKeys[i]], options)) {
                      return false;
                    }

                    i++;
                    return true;
                  });
                } else {
                  i = 0;
                  ret = aKeys.every((key) => {
                    if (!hasOwn(b, key)) {
                      return false;
                    }

                    if (!EJSON.equals(a[key], b[key], options)) {
                      return false;
                    }

                    i++;
                    return true;
                  });
                }

                return ret && i === bKeys.length;
              };
              /**
               * @summary Return a deep copy of `val`.
               * @locus Anywhere
               * @param {EJSON} val A value to copy.
               */

              EJSON.clone = (v) => {
                let ret;

                if (!isObject(v)) {
                  return v;
                }

                if (v === null) {
                  return null; // null has typeof "object"
                }

                if (v instanceof Date) {
                  return new Date(v.getTime());
                } // RegExps are not really EJSON elements (eg we don't define a serialization
                // for them), but they're immutable anyway, so we can support them in clone.

                if (v instanceof RegExp) {
                  return v;
                }

                if (EJSON.isBinary(v)) {
                  ret = EJSON.newBinary(v.length);

                  for (let i = 0; i < v.length; i++) {
                    ret[i] = v[i];
                  }

                  return ret;
                }

                if (Array.isArray(v)) {
                  return v.map(EJSON.clone);
                }

                if (isArguments(v)) {
                  return Array.from(v).map(EJSON.clone);
                } // handle general user-defined typed Objects if they have a clone method

                if (isFunction(v.clone)) {
                  return v.clone();
                } // handle other custom types

                if (EJSON._isCustomType(v)) {
                  return EJSON.fromJSONValue(
                    EJSON.clone(EJSON.toJSONValue(v)),
                    true
                  );
                } // handle other objects

                ret = {};
                keysOf(v).forEach((key) => {
                  ret[key] = EJSON.clone(v[key]);
                });
                return ret;
              };
              /**
               * @summary Allocate a new buffer of binary data that EJSON can serialize.
               * @locus Anywhere
               * @param {Number} size The number of bytes of binary data to allocate.
               */
              // EJSON.newBinary is the public documented API for this functionality,
              // but the implementation is in the 'base64' package to avoid
              // introducing a circular dependency. (If the implementation were here,
              // then 'base64' would have to use EJSON.newBinary, and 'ejson' would
              // also have to use 'base64'.)

              EJSON.newBinary = Base64.newBinary;
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "stringify.js": function module(_require3, _exports3, _module2) {
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                             //
              // packages/ejson/stringify.js                                                                                 //
              //                                                                                                             //
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              // Based on json2.js from https://github.com/douglascrockford/JSON-js
              //
              //    json2.js
              //    2012-10-08
              //
              //    Public Domain.
              //
              //    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
              function quote(string) {
                return JSON.stringify(string);
              }

              const str = (
                key,
                holder,
                singleIndent,
                outerIndent,
                canonical
              ) => {
                const value = holder[key]; // What happens next depends on the value's type.

                switch (typeof value) {
                  case "string":
                    return quote(value);

                  case "number":
                    // JSON numbers must be finite. Encode non-finite numbers as null.
                    return isFinite(value) ? String(value) : "null";

                  case "boolean":
                    return String(value);
                  // If the type is 'object', we might be dealing with an object or an array or
                  // null.

                  case "object": {
                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.
                    if (!value) {
                      return "null";
                    } // Make an array to hold the partial results of stringifying this object
                    // value.

                    const innerIndent = outerIndent + singleIndent;
                    const partial = [];
                    let v; // Is the value an array?

                    if (
                      Array.isArray(value) ||
                      {}.hasOwnProperty.call(value, "callee")
                    ) {
                      // The value is an array. Stringify every element. Use null as a
                      // placeholder for non-JSON values.
                      const length = value.length;

                      for (let i = 0; i < length; i += 1) {
                        partial[i] =
                          str(i, value, singleIndent, innerIndent, canonical) ||
                          "null";
                      } // Join all of the elements together, separated with commas, and wrap
                      // them in brackets.

                      if (partial.length === 0) {
                        v = "[]";
                      } else if (innerIndent) {
                        v =
                          "[\n" +
                          innerIndent +
                          partial.join(",\n" + innerIndent) +
                          "\n" +
                          outerIndent +
                          "]";
                      } else {
                        v = "[" + partial.join(",") + "]";
                      }

                      return v;
                    } // Iterate through all of the keys in the object.

                    let keys = Object.keys(value);

                    if (canonical) {
                      keys = keys.sort();
                    }

                    keys.forEach((k) => {
                      v = str(k, value, singleIndent, innerIndent, canonical);

                      if (v) {
                        partial.push(quote(k) + (innerIndent ? ": " : ":") + v);
                      }
                    }); // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.

                    if (partial.length === 0) {
                      v = "{}";
                    } else if (innerIndent) {
                      v =
                        "{\n" +
                        innerIndent +
                        partial.join(",\n" + innerIndent) +
                        "\n" +
                        outerIndent +
                        "}";
                    } else {
                      v = "{" + partial.join(",") + "}";
                    }

                    return v;
                  }

                  default: // Do nothing
                }
              }; // If the JSON object does not yet have a stringify method, give it one.

              const canonicalStringify = (value, options) => {
                // Make a fake root object containing our value under the key of ''.
                // Return the result of stringifying the value.
                const allOptions = Object.assign(
                  {
                    indent: "",
                    canonical: false,
                  },
                  options
                );

                if (allOptions.indent === true) {
                  allOptions.indent = "  ";
                } else if (typeof allOptions.indent === "number") {
                  let newIndent = "";

                  for (let i = 0; i < allOptions.indent; i++) {
                    newIndent += " ";
                  }

                  allOptions.indent = newIndent;
                }

                return str(
                  "",
                  {
                    "": value,
                  },
                  allOptions.indent,
                  "",
                  allOptions.canonical
                );
              };

              _module2.exportDefault(canonicalStringify);
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "utils.js": function module(_require4, _exports4, _module3) {
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                             //
              // packages/ejson/utils.js                                                                                     //
              //                                                                                                             //
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module3.export({
                isFunction: () => isFunction,
                isObject: () => isObject,
                keysOf: () => keysOf,
                lengthOf: () => lengthOf,
                hasOwn: () => hasOwn,
                convertMapToObject: () => convertMapToObject,
                isArguments: () => isArguments,
                isInfOrNaN: () => isInfOrNaN,
                checkError: () => checkError,
                handleError: () => handleError,
              });

              const isFunction = (fn) => typeof fn === "function";

              const isObject = (fn) => typeof fn === "object";

              const keysOf = (obj) => Object.keys(obj);

              const lengthOf = (obj) => Object.keys(obj).length;

              const hasOwn = (obj, prop) =>
                Object.prototype.hasOwnProperty.call(obj, prop);

              const convertMapToObject = (map) =>
                Array.from(map).reduce((acc, _ref) => {
                  let [key, value] = _ref;
                  // reassign to not create new object
                  acc[key] = value;
                  return acc;
                }, {});

              const isArguments = (obj) => obj != null && hasOwn(obj, "callee");

              const isInfOrNaN = (obj) =>
                Number.isNaN(obj) || obj === Infinity || obj === -Infinity;

              const checkError = {
                maxStack: (msgError) =>
                  new RegExp("Maximum call stack size exceeded", "g").test(
                    msgError
                  ),
              };

              const handleError = (fn) =>
                function () {
                  try {
                    return fn.apply(this, arguments);
                  } catch (error) {
                    const isMaxStack = checkError.maxStack(error.message);

                    if (isMaxStack) {
                      throw new Error("Converting circular structure to JSON");
                    }

                    throw error;
                  }
                };
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/ejson/ejson.js");

  /* Exports */
  Package._define("ejson", _exports2, {
    EJSON: EJSON,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var EJSON = Package.ejson.EJSON;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var check, Match;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          check: {
            "match.js": function module(_require, _exports, _module) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                               //
              // packages/check/match.js                                                                                       //
              //                                                                                                               //
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module.export({
                check: () => check,
                Match: () => Match,
              });
              let isPlainObject;
              _module.link(
                "./isPlainObject",
                {
                  isPlainObject(v) {
                    isPlainObject = v;
                  },
                },
                0
              );
              // Things we explicitly do NOT support:
              //    - heterogenous arrays
              const currentArgumentChecker = new Meteor.EnvironmentVariable();
              const hasOwn = Object.prototype.hasOwnProperty;
              /**
               * @summary Check that a value matches a [pattern](#matchpatterns).
               * If the value does not match the pattern, throw a `Match.Error`.
               *
               * Particularly useful to assert that arguments to a function have the right
               * types and structure.
               * @locus Anywhere
               * @param {Any} value The value to check
               * @param {MatchPattern} pattern The pattern to match `value` against
               */

              function check(value, pattern) {
                // Record that check got called, if somebody cared.
                //
                // We use getOrNullIfOutsideFiber so that it's OK to call check()
                // from non-Fiber server contexts; the downside is that if you forget to
                // bindEnvironment on some random callback in your method/publisher,
                // it might not find the argumentChecker and you'll get an error about
                // not checking an argument that it looks like you're checking (instead
                // of just getting a "Node code must run in a Fiber" error).
                const argChecker = currentArgumentChecker.getOrNullIfOutsideFiber();

                if (argChecker) {
                  argChecker.checking(value);
                }

                const result = testSubtree(value, pattern);

                if (result) {
                  const err = new Match.Error(result.message);

                  if (result.path) {
                    err.message += " in field ".concat(result.path);
                    err.path = result.path;
                  }

                  throw err;
                }
              }

              /**
               * @namespace Match
               * @summary The namespace for all Match types and methods.
               */

              const Match = {
                Optional: function (pattern) {
                  return new Optional(pattern);
                },
                Maybe: function (pattern) {
                  return new Maybe(pattern);
                },
                OneOf: function () {
                  for (
                    var _len = arguments.length,
                      args = new Array(_len),
                      _key = 0;
                    _key < _len;
                    _key++
                  ) {
                    args[_key] = arguments[_key];
                  }

                  return new OneOf(args);
                },
                Any: ["__any__"],
                Where: function (condition) {
                  return new Where(condition);
                },
                ObjectIncluding: function (pattern) {
                  return new ObjectIncluding(pattern);
                },
                ObjectWithValues: function (pattern) {
                  return new ObjectWithValues(pattern);
                },
                // Matches only signed 32-bit integers
                Integer: ["__integer__"],
                // XXX matchers should know how to describe themselves for errors
                Error: Meteor.makeErrorType("Match.Error", function (msg) {
                  this.message = "Match error: ".concat(msg); // The path of the value that failed to match. Initially empty, this gets
                  // populated by catching and rethrowing the exception as it goes back up the
                  // stack.
                  // E.g.: "vals[3].entity.created"

                  this.path = ""; // If this gets sent over DDP, don't give full internal details but at least
                  // provide something better than 500 Internal server error.

                  this.sanitizedError = new Meteor.Error(400, "Match failed");
                }),

                // Tests to see if value matches pattern. Unlike check, it merely returns true
                // or false (unless an error other than Match.Error was thrown). It does not
                // interact with _failIfArgumentsAreNotAllChecked.
                // XXX maybe also implement a Match.match which returns more information about
                //     failures but without using exception handling or doing what check()
                //     does with _failIfArgumentsAreNotAllChecked and Meteor.Error conversion

                /**
                 * @summary Returns true if the value matches the pattern.
                 * @locus Anywhere
                 * @param {Any} value The value to check
                 * @param {MatchPattern} pattern The pattern to match `value` against
                 */
                test(value, pattern) {
                  return !testSubtree(value, pattern);
                },

                // Runs `f.apply(context, args)`. If check() is not called on every element of
                // `args` (either directly or in the first level of an array), throws an error
                // (using `description` in the message).
                _failIfArgumentsAreNotAllChecked(
                  f,
                  context,
                  args,
                  description
                ) {
                  const argChecker = new ArgumentChecker(args, description);
                  const result = currentArgumentChecker.withValue(
                    argChecker,
                    () => f.apply(context, args)
                  ); // If f didn't itself throw, make sure it checked all of its arguments.

                  argChecker.throwUnlessAllArgumentsHaveBeenChecked();
                  return result;
                },
              };

              class Optional {
                constructor(pattern) {
                  this.pattern = pattern;
                }
              }

              class Maybe {
                constructor(pattern) {
                  this.pattern = pattern;
                }
              }

              class OneOf {
                constructor(choices) {
                  if (!choices || choices.length === 0) {
                    throw new Error(
                      "Must provide at least one choice to Match.OneOf"
                    );
                  }

                  this.choices = choices;
                }
              }

              class Where {
                constructor(condition) {
                  this.condition = condition;
                }
              }

              class ObjectIncluding {
                constructor(pattern) {
                  this.pattern = pattern;
                }
              }

              class ObjectWithValues {
                constructor(pattern) {
                  this.pattern = pattern;
                }
              }

              const stringForErrorMessage = function (value) {
                let options =
                  arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : {};

                if (value === null) {
                  return "null";
                }

                if (options.onlyShowType) {
                  return typeof value;
                } // Your average non-object things.  Saves from doing the try/catch below for.

                if (typeof value !== "object") {
                  return EJSON.stringify(value);
                }

                try {
                  // Find objects with circular references since EJSON doesn't support them yet (Issue #4778 + Unaccepted PR)
                  // If the native stringify is going to choke, EJSON.stringify is going to choke too.
                  JSON.stringify(value);
                } catch (stringifyError) {
                  if (stringifyError.name === "TypeError") {
                    return typeof value;
                  }
                }

                return EJSON.stringify(value);
              };

              const typeofChecks = [
                [String, "string"],
                [Number, "number"],
                [Boolean, "boolean"], // While we don't allow undefined/function in EJSON, this is good for optional
                // arguments with OneOf.
                [Function, "function"],
                [undefined, "undefined"],
              ]; // Return `false` if it matches. Otherwise, return an object with a `message` and a `path` field.

              const testSubtree = (value, pattern) => {
                // Match anything!
                if (pattern === Match.Any) {
                  return false;
                } // Basic atomic types.
                // Do not match boxed objects (e.g. String, Boolean)

                for (let i = 0; i < typeofChecks.length; ++i) {
                  if (pattern === typeofChecks[i][0]) {
                    if (typeof value === typeofChecks[i][1]) {
                      return false;
                    }

                    return {
                      message: "Expected "
                        .concat(typeofChecks[i][1], ", got ")
                        .concat(
                          stringForErrorMessage(value, {
                            onlyShowType: true,
                          })
                        ),
                      path: "",
                    };
                  }
                }

                if (pattern === null) {
                  if (value === null) {
                    return false;
                  }

                  return {
                    message: "Expected null, got ".concat(
                      stringForErrorMessage(value)
                    ),
                    path: "",
                  };
                } // Strings, numbers, and booleans match literally. Goes well with Match.OneOf.

                if (
                  typeof pattern === "string" ||
                  typeof pattern === "number" ||
                  typeof pattern === "boolean"
                ) {
                  if (value === pattern) {
                    return false;
                  }

                  return {
                    message: "Expected "
                      .concat(pattern, ", got ")
                      .concat(stringForErrorMessage(value)),
                    path: "",
                  };
                } // Match.Integer is special type encoded with array

                if (pattern === Match.Integer) {
                  // There is no consistent and reliable way to check if variable is a 64-bit
                  // integer. One of the popular solutions is to get reminder of division by 1
                  // but this method fails on really large floats with big precision.
                  // E.g.: 1.348192308491824e+23 % 1 === 0 in V8
                  // Bitwise operators work consistantly but always cast variable to 32-bit
                  // signed integer according to JavaScript specs.
                  if (typeof value === "number" && (value | 0) === value) {
                    return false;
                  }

                  return {
                    message: "Expected Integer, got ".concat(
                      stringForErrorMessage(value)
                    ),
                    path: "",
                  };
                } // 'Object' is shorthand for Match.ObjectIncluding({});

                if (pattern === Object) {
                  pattern = Match.ObjectIncluding({});
                } // Array (checked AFTER Any, which is implemented as an Array).

                if (pattern instanceof Array) {
                  if (pattern.length !== 1) {
                    return {
                      message: "Bad pattern: arrays must have one type element ".concat(
                        stringForErrorMessage(pattern)
                      ),
                      path: "",
                    };
                  }

                  if (!Array.isArray(value) && !isArguments(value)) {
                    return {
                      message: "Expected array, got ".concat(
                        stringForErrorMessage(value)
                      ),
                      path: "",
                    };
                  }

                  for (let i = 0, length = value.length; i < length; i++) {
                    const result = testSubtree(value[i], pattern[0]);

                    if (result) {
                      result.path = _prependPath(i, result.path);
                      return result;
                    }
                  }

                  return false;
                } // Arbitrary validation checks. The condition can return false or throw a
                // Match.Error (ie, it can internally use check()) to fail.

                if (pattern instanceof Where) {
                  let result;

                  try {
                    result = pattern.condition(value);
                  } catch (err) {
                    if (!(err instanceof Match.Error)) {
                      throw err;
                    }

                    return {
                      message: err.message,
                      path: err.path,
                    };
                  }

                  if (result) {
                    return false;
                  } // XXX this error is terrible

                  return {
                    message: "Failed Match.Where validation",
                    path: "",
                  };
                }

                if (pattern instanceof Maybe) {
                  pattern = Match.OneOf(undefined, null, pattern.pattern);
                } else if (pattern instanceof Optional) {
                  pattern = Match.OneOf(undefined, pattern.pattern);
                }

                if (pattern instanceof OneOf) {
                  for (let i = 0; i < pattern.choices.length; ++i) {
                    const result = testSubtree(value, pattern.choices[i]);

                    if (!result) {
                      // No error? Yay, return.
                      return false;
                    } // Match errors just mean try another choice.
                  } // XXX this error is terrible

                  return {
                    message:
                      "Failed Match.OneOf, Match.Maybe or Match.Optional validation",
                    path: "",
                  };
                } // A function that isn't something we special-case is assumed to be a
                // constructor.

                if (pattern instanceof Function) {
                  if (value instanceof pattern) {
                    return false;
                  }

                  return {
                    message: "Expected ".concat(
                      pattern.name || "particular constructor"
                    ),
                    path: "",
                  };
                }

                let unknownKeysAllowed = false;
                let unknownKeyPattern;

                if (pattern instanceof ObjectIncluding) {
                  unknownKeysAllowed = true;
                  pattern = pattern.pattern;
                }

                if (pattern instanceof ObjectWithValues) {
                  unknownKeysAllowed = true;
                  unknownKeyPattern = [pattern.pattern];
                  pattern = {}; // no required keys
                }

                if (typeof pattern !== "object") {
                  return {
                    message: "Bad pattern: unknown pattern type",
                    path: "",
                  };
                } // An object, with required and optional keys. Note that this does NOT do
                // structural matches against objects of special types that happen to match
                // the pattern: this really needs to be a plain old {Object}!

                if (typeof value !== "object") {
                  return {
                    message: "Expected object, got ".concat(typeof value),
                    path: "",
                  };
                }

                if (value === null) {
                  return {
                    message: "Expected object, got null",
                    path: "",
                  };
                }

                if (!isPlainObject(value)) {
                  return {
                    message: "Expected plain object",
                    path: "",
                  };
                }

                const requiredPatterns = Object.create(null);
                const optionalPatterns = Object.create(null);
                Object.keys(pattern).forEach((key) => {
                  const subPattern = pattern[key];

                  if (
                    subPattern instanceof Optional ||
                    subPattern instanceof Maybe
                  ) {
                    optionalPatterns[key] = subPattern.pattern;
                  } else {
                    requiredPatterns[key] = subPattern;
                  }
                });

                for (let key in Object(value)) {
                  const subValue = value[key];

                  if (hasOwn.call(requiredPatterns, key)) {
                    const result = testSubtree(subValue, requiredPatterns[key]);

                    if (result) {
                      result.path = _prependPath(key, result.path);
                      return result;
                    }

                    delete requiredPatterns[key];
                  } else if (hasOwn.call(optionalPatterns, key)) {
                    const result = testSubtree(subValue, optionalPatterns[key]);

                    if (result) {
                      result.path = _prependPath(key, result.path);
                      return result;
                    }
                  } else {
                    if (!unknownKeysAllowed) {
                      return {
                        message: "Unknown key",
                        path: key,
                      };
                    }

                    if (unknownKeyPattern) {
                      const result = testSubtree(
                        subValue,
                        unknownKeyPattern[0]
                      );

                      if (result) {
                        result.path = _prependPath(key, result.path);
                        return result;
                      }
                    }
                  }
                }

                const keys = Object.keys(requiredPatterns);

                if (keys.length) {
                  return {
                    message: "Missing key '".concat(keys[0], "'"),
                    path: "",
                  };
                }
              };

              class ArgumentChecker {
                constructor(args, description) {
                  // Make a SHALLOW copy of the arguments. (We'll be doing identity checks
                  // against its contents.)
                  this.args = [...args]; // Since the common case will be to check arguments in order, and we splice
                  // out arguments when we check them, make it so we splice out from the end
                  // rather than the beginning.

                  this.args.reverse();
                  this.description = description;
                }

                checking(value) {
                  if (this._checkingOneValue(value)) {
                    return;
                  } // Allow check(arguments, [String]) or check(arguments.slice(1), [String])
                  // or check([foo, bar], [String]) to count... but only if value wasn't
                  // itself an argument.

                  if (Array.isArray(value) || isArguments(value)) {
                    Array.prototype.forEach.call(
                      value,
                      this._checkingOneValue.bind(this)
                    );
                  }
                }

                _checkingOneValue(value) {
                  for (let i = 0; i < this.args.length; ++i) {
                    // Is this value one of the arguments? (This can have a false positive if
                    // the argument is an interned primitive, but it's still a good enough
                    // check.)
                    // (NaN is not === to itself, so we have to check specially.)
                    if (
                      value === this.args[i] ||
                      (Number.isNaN(value) && Number.isNaN(this.args[i]))
                    ) {
                      this.args.splice(i, 1);
                      return true;
                    }
                  }

                  return false;
                }

                throwUnlessAllArgumentsHaveBeenChecked() {
                  if (this.args.length > 0)
                    throw new Error(
                      "Did not check() all arguments during ".concat(
                        this.description
                      )
                    );
                }
              }

              const _jsKeywords = [
                "do",
                "if",
                "in",
                "for",
                "let",
                "new",
                "try",
                "var",
                "case",
                "else",
                "enum",
                "eval",
                "false",
                "null",
                "this",
                "true",
                "void",
                "with",
                "break",
                "catch",
                "class",
                "const",
                "super",
                "throw",
                "while",
                "yield",
                "delete",
                "export",
                "import",
                "public",
                "return",
                "static",
                "switch",
                "typeof",
                "default",
                "extends",
                "finally",
                "package",
                "private",
                "continue",
                "debugger",
                "function",
                "arguments",
                "interface",
                "protected",
                "implements",
                "instanceof",
              ]; // Assumes the base of path is already escaped properly
              // returns key + base

              const _prependPath = (key, base) => {
                if (typeof key === "number" || key.match(/^[0-9]+$/)) {
                  key = "[".concat(key, "]");
                } else if (
                  !key.match(/^[a-z_$][0-9a-z_$]*$/i) ||
                  _jsKeywords.indexOf(key) >= 0
                ) {
                  key = JSON.stringify([key]);
                }

                if (base && base[0] !== "[") {
                  return "".concat(key, ".").concat(base);
                }

                return key + base;
              };

              const isObject = (value) =>
                typeof value === "object" && value !== null;

              const baseIsArguments = (item) =>
                isObject(item) &&
                Object.prototype.toString.call(item) === "[object Arguments]";

              const isArguments = baseIsArguments(
                (function () {
                  return arguments;
                })()
              )
                ? baseIsArguments
                : (value) =>
                    isObject(value) && typeof value.callee === "function";
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "isPlainObject.js": function module(
              _require3,
              _exports3,
              _module2
            ) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                               //
              // packages/check/isPlainObject.js                                                                               //
              //                                                                                                               //
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module2.export({
                isPlainObject: () => isPlainObject,
              });
              // Copy of jQuery.isPlainObject for the server side from jQuery v3.1.1.
              const class2type = {};
              const toString = class2type.toString;
              const hasOwn = Object.prototype.hasOwnProperty;
              const fnToString = hasOwn.toString;
              const ObjectFunctionString = fnToString.call(Object);
              const getProto = Object.getPrototypeOf;

              const isPlainObject = (obj) => {
                let proto;
                let Ctor; // Detect obvious negatives
                // Use toString instead of jQuery.type to catch host objects

                if (!obj || toString.call(obj) !== "[object Object]") {
                  return false;
                }

                proto = getProto(obj); // Objects with no prototype (e.g., `Object.create( null )`) are plain

                if (!proto) {
                  return true;
                } // Objects with prototype are plain iff they were constructed by a global Object function

                Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
                return (
                  typeof Ctor === "function" &&
                  fnToString.call(Ctor) === ObjectFunctionString
                );
              };
              ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/check/match.js");

  /* Exports */
  Package._define("check", _exports2, {
    check: check,
    Match: Match,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var charsCount, Random;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          random: {
            "main_client.js": function module(_require, _exports, _module) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                               //
              // packages/random/main_client.js                                                                //
              //                                                                                               //
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module.export({
                Random: () => Random,
              });
              let BrowserRandomGenerator;
              _module.link(
                "./BrowserRandomGenerator",
                {
                  default(v) {
                    BrowserRandomGenerator = v;
                  },
                },
                0
              );
              let createAleaGeneratorWithGeneratedSeed;
              _module.link(
                "./createAleaGenerator",
                {
                  default(v) {
                    createAleaGeneratorWithGeneratedSeed = v;
                  },
                },
                1
              );
              let createRandom;
              _module.link(
                "./createRandom",
                {
                  default(v) {
                    createRandom = v;
                  },
                },
                2
              );
              let generator;

              if (
                typeof window !== "undefined" &&
                window.crypto &&
                window.crypto.getRandomValues
              ) {
                generator = new BrowserRandomGenerator();
              } else {
                // On IE 10 and below, there's no browser crypto API
                // available. Fall back to Alea
                //
                // XXX looks like at the moment, we use Alea in IE 11 as well,
                // which has `window.msCrypto` instead of `window.crypto`.
                generator = createAleaGeneratorWithGeneratedSeed();
              }

              const Random = createRandom(generator);
              ///////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "AbstractRandomGenerator.js": function module(
              _require3,
              _exports3,
              _module2
            ) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                               //
              // packages/random/AbstractRandomGenerator.js                                                    //
              //                                                                                               //
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module2.export({
                default: () => RandomGenerator,
              });
              let Meteor;
              _module2.link(
                "meteor/meteor",
                {
                  Meteor(v) {
                    Meteor = v;
                  },
                },
                0
              );
              const UNMISTAKABLE_CHARS =
                "23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz";
              const BASE64_CHARS =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                "0123456789-_"; // `type` is one of `RandomGenerator.Type` as defined below.
              //
              // options:
              // - seeds: (required, only for RandomGenerator.Type.ALEA) an array
              //   whose items will be `toString`ed and used as the seed to the Alea
              //   algorithm

              class RandomGenerator {
                /**
                 * @name Random.fraction
                 * @summary Return a number between 0 and 1, like `Math.random`.
                 * @locus Anywhere
                 */
                fraction() {
                  throw new Error("Unknown random generator type");
                }
                /**
                 * @name Random.hexString
                 * @summary Return a random string of `n` hexadecimal digits.
                 * @locus Anywhere
                 * @param {Number} n Length of the string
                 */

                hexString(digits) {
                  return this._randomString(digits, "0123456789abcdef");
                }

                _randomString(charsCount, alphabet) {
                  let result = "";

                  for (let i = 0; i < charsCount; i++) {
                    result += this.choice(alphabet);
                  }

                  return result;
                }
                /**
                 * @name Random.id
                 * @summary Return a unique identifier, such as `"Jjwjg6gouWLXhMGKW"`, that is
                 * likely to be unique in the whole world.
                 * @locus Anywhere
                 * @param {Number} [n] Optional length of the identifier in characters
                 *   (defaults to 17)
                 */

                id(charsCount) {
                  // 17 characters is around 96 bits of entropy, which is the amount of
                  // state in the Alea PRNG.
                  if (charsCount === undefined) {
                    charsCount = 17;
                  }

                  return this._randomString(charsCount, UNMISTAKABLE_CHARS);
                }
                /**
                 * @name Random.secret
                 * @summary Return a random string of printable characters with 6 bits of
                 * entropy per character. Use `Random.secret` for security-critical secrets
                 * that are intended for machine, rather than human, consumption.
                 * @locus Anywhere
                 * @param {Number} [n] Optional length of the secret string (defaults to 43
                 *   characters, or 256 bits of entropy)
                 */

                secret(charsCount) {
                  // Default to 256 bits of entropy, or 43 characters at 6 bits per
                  // character.
                  if (charsCount === undefined) {
                    charsCount = 43;
                  }

                  return this._randomString(charsCount, BASE64_CHARS);
                }
                /**
                 * @name Random.choice
                 * @summary Return a random element of the given array or string.
                 * @locus Anywhere
                 * @param {Array|String} arrayOrString Array or string to choose from
                 */

                choice(arrayOrString) {
                  const index = Math.floor(
                    this.fraction() * arrayOrString.length
                  );

                  if (typeof arrayOrString === "string") {
                    return arrayOrString.substr(index, 1);
                  }

                  return arrayOrString[index];
                }
              }
              ///////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "AleaRandomGenerator.js": function module(
              _require4,
              _exports4,
              _module3
            ) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                               //
              // packages/random/AleaRandomGenerator.js                                                        //
              //                                                                                               //
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module3.export({
                default: () => AleaRandomGenerator,
              });
              let RandomGenerator;
              _module3.link(
                "./AbstractRandomGenerator",
                {
                  default(v) {
                    RandomGenerator = v;
                  },
                },
                0
              );

              // Alea PRNG, which is not cryptographically strong
              // see http://baagoe.org/en/wiki/Better_random_numbers_for_javascript
              // for a full discussion and Alea implementation.
              function Alea(seeds) {
                function Mash() {
                  let n = 0xefc8249d;

                  const mash = (data) => {
                    data = data.toString();

                    for (let i = 0; i < data.length; i++) {
                      n += data.charCodeAt(i);
                      let h = 0.02519603282416938 * n;
                      n = h >>> 0;
                      h -= n;
                      h *= n;
                      n = h >>> 0;
                      h -= n;
                      n += h * 0x100000000; // 2^32
                    }

                    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
                  };

                  mash.version = "Mash 0.9";
                  return mash;
                }

                let s0 = 0;
                let s1 = 0;
                let s2 = 0;
                let c = 1;

                if (seeds.length === 0) {
                  seeds = [+new Date()];
                }

                let mash = Mash();
                s0 = mash(" ");
                s1 = mash(" ");
                s2 = mash(" ");

                for (let i = 0; i < seeds.length; i++) {
                  s0 -= mash(seeds[i]);

                  if (s0 < 0) {
                    s0 += 1;
                  }

                  s1 -= mash(seeds[i]);

                  if (s1 < 0) {
                    s1 += 1;
                  }

                  s2 -= mash(seeds[i]);

                  if (s2 < 0) {
                    s2 += 1;
                  }
                }

                mash = null;

                const random = () => {
                  const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32

                  s0 = s1;
                  s1 = s2;
                  return (s2 = t - (c = t | 0));
                };

                random.uint32 = () => random() * 0x100000000; // 2^32

                random.fract53 = () =>
                  random() +
                  ((random() * 0x200000) | 0) * 1.1102230246251565e-16; // 2^-53

                random.version = "Alea 0.9";
                random.args = seeds;
                return random;
              } // options:
              // - seeds: an array
              //   whose items will be `toString`ed and used as the seed to the Alea
              //   algorithm

              class AleaRandomGenerator extends RandomGenerator {
                constructor() {
                  let { seeds = [] } =
                    arguments.length > 0 && arguments[0] !== undefined
                      ? arguments[0]
                      : {};
                  super();

                  if (!seeds) {
                    throw new Error("No seeds were provided for Alea PRNG");
                  }

                  this.alea = Alea(seeds);
                }
                /**
                 * @name Random.fraction
                 * @summary Return a number between 0 and 1, like `Math.random`.
                 * @locus Anywhere
                 */

                fraction() {
                  return this.alea();
                }
              }
              ///////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "BrowserRandomGenerator.js": function module(
              _require5,
              _exports5,
              _module4
            ) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                               //
              // packages/random/BrowserRandomGenerator.js                                                     //
              //                                                                                               //
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module4.export({
                default: () => BrowserRandomGenerator,
              });
              let RandomGenerator;
              _module4.link(
                "./AbstractRandomGenerator",
                {
                  default(v) {
                    RandomGenerator = v;
                  },
                },
                0
              );

              class BrowserRandomGenerator extends RandomGenerator {
                /**
                 * @name Random.fraction
                 * @summary Return a number between 0 and 1, like `Math.random`.
                 * @locus Anywhere
                 */
                fraction() {
                  const array = new Uint32Array(1);
                  window.crypto.getRandomValues(array);
                  return array[0] * 2.3283064365386963e-10; // 2^-32
                }
              }
              ///////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "createAleaGenerator.js": function module(
              _require6,
              _exports6,
              _module5
            ) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                               //
              // packages/random/createAleaGenerator.js                                                        //
              //                                                                                               //
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module5.export({
                default: () => createAleaGenerator,
              });
              let AleaRandomGenerator;
              _module5.link(
                "./AleaRandomGenerator",
                {
                  default(v) {
                    AleaRandomGenerator = v;
                  },
                },
                0
              );
              // instantiate RNG.  Heuristically collect entropy from various sources when a
              // cryptographic PRNG isn't available.
              // client sources
              const height =
                (typeof window !== "undefined" && window.innerHeight) ||
                (typeof document !== "undefined" &&
                  document.documentElement &&
                  document.documentElement.clientHeight) ||
                (typeof document !== "undefined" &&
                  document.body &&
                  document.body.clientHeight) ||
                1;
              const width =
                (typeof window !== "undefined" && window.innerWidth) ||
                (typeof document !== "undefined" &&
                  document.documentElement &&
                  document.documentElement.clientWidth) ||
                (typeof document !== "undefined" &&
                  document.body &&
                  document.body.clientWidth) ||
                1;
              const agent =
                (typeof navigator !== "undefined" && navigator.userAgent) || "";

              function createAleaGenerator() {
                return new AleaRandomGenerator({
                  seeds: [new Date(), height, width, agent, Math.random()],
                });
              }
              ///////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "createRandom.js": function module(_require7, _exports7, _module6) {
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                               //
              // packages/random/createRandom.js                                                               //
              //                                                                                               //
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module6.export({
                default: () => createRandom,
              });
              let AleaRandomGenerator;
              _module6.link(
                "./AleaRandomGenerator",
                {
                  default(v) {
                    AleaRandomGenerator = v;
                  },
                },
                0
              );
              let createAleaGeneratorWithGeneratedSeed;
              _module6.link(
                "./createAleaGenerator",
                {
                  default(v) {
                    createAleaGeneratorWithGeneratedSeed = v;
                  },
                },
                1
              );

              function createRandom(generator) {
                // Create a non-cryptographically secure PRNG with a given seed (using
                // the Alea algorithm)
                generator.createWithSeeds = function () {
                  for (
                    var _len = arguments.length,
                      seeds = new Array(_len),
                      _key = 0;
                    _key < _len;
                    _key++
                  ) {
                    seeds[_key] = arguments[_key];
                  }

                  if (seeds.length === 0) {
                    throw new Error("No seeds were provided");
                  }

                  return new AleaRandomGenerator({
                    seeds,
                  });
                }; // Used like `Random`, but much faster and not cryptographically
                // secure

                generator.insecure = createAleaGeneratorWithGeneratedSeed();
                return generator;
              }
              ///////////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/random/main_client.js");

  /* Exports */
  Package._define("random", _exports2, {
    Random: Random,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var Tracker, Deps, computation;

  var _require = meteorInstall(
    {
      node_modules: {
        meteor: {
          tracker: {
            "tracker.js": function _module() {
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                                    //
              // packages/tracker/tracker.js                                                                                        //
              //                                                                                                                    //
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              /////////////////////////////////////////////////////
              // Package docs at http://docs.meteor.com/#tracker //
              /////////////////////////////////////////////////////

              /**
               * @namespace Tracker
               * @summary The namespace for Tracker-related methods.
               */
              Tracker = {};
              /**
               * @namespace Deps
               * @deprecated
               */

              Deps = Tracker; // http://docs.meteor.com/#tracker_active

              /**
               * @summary True if there is a current computation, meaning that dependencies on reactive data sources will be tracked and potentially cause the current computation to be rerun.
               * @locus Client
               * @type {Boolean}
               */

              Tracker.active = false; // http://docs.meteor.com/#tracker_currentcomputation

              /**
               * @summary The current computation, or `null` if there isn't one.  The current computation is the [`Tracker.Computation`](#tracker_computation) object created by the innermost active call to `Tracker.autorun`, and it's the computation that gains dependencies when reactive data sources are accessed.
               * @locus Client
               * @type {Tracker.Computation}
               */

              Tracker.currentComputation = null;

              function setCurrentComputation(c) {
                Tracker.currentComputation = c;
                Tracker.active = !!c;
              }

              function _debugFunc() {
                // We want this code to work without Meteor, and also without
                // "console" (which is technically non-standard and may be missing
                // on some browser we come across, like it was on IE 7).
                //
                // Lazy evaluation because `Meteor` does not exist right away.(??)
                return typeof Meteor !== "undefined"
                  ? Meteor._debug
                  : typeof console !== "undefined" && console.error
                  ? function () {
                      console.error.apply(console, arguments);
                    }
                  : function () {};
              }

              function _maybeSuppressMoreLogs(messagesLength) {
                // Sometimes when running tests, we intentionally suppress logs on expected
                // printed errors. Since the current implementation of _throwOrLog can log
                // multiple separate log messages, suppress all of them if at least one suppress
                // is expected as we still want them to count as one.
                if (typeof Meteor !== "undefined") {
                  if (Meteor._suppressed_log_expected()) {
                    Meteor._suppress_log(messagesLength - 1);
                  }
                }
              }

              function _throwOrLog(from, e) {
                if (throwFirstError) {
                  throw e;
                } else {
                  var printArgs = [
                    "Exception from Tracker " + from + " function:",
                  ];

                  if (e.stack && e.message && e.name) {
                    var idx = e.stack.indexOf(e.message);

                    if (idx < 0 || idx > e.name.length + 2) {
                      // check for "Error: "
                      // message is not part of the stack
                      var message = e.name + ": " + e.message;
                      printArgs.push(message);
                    }
                  }

                  printArgs.push(e.stack);

                  _maybeSuppressMoreLogs(printArgs.length);

                  for (var i = 0; i < printArgs.length; i++) {
                    _debugFunc()(printArgs[i]);
                  }
                }
              } // Takes a function `f`, and wraps it in a `Meteor._noYieldsAllowed`
              // block if we are running on the server. On the client, returns the
              // original function (since `Meteor._noYieldsAllowed` is a
              // no-op). This has the benefit of not adding an unnecessary stack
              // frame on the client.

              function withNoYieldsAllowed(f) {
                if (typeof Meteor === "undefined" || Meteor.isClient) {
                  return f;
                } else {
                  return function () {
                    var args = arguments;

                    Meteor._noYieldsAllowed(function () {
                      f.apply(null, args);
                    });
                  };
                }
              }

              var nextId = 1; // computations whose callbacks we should call at flush time

              var pendingComputations = []; // `true` if a Tracker.flush is scheduled, or if we are in Tracker.flush now

              var willFlush = false; // `true` if we are in Tracker.flush now

              var inFlush = false; // `true` if we are computing a computation now, either first time
              // or recompute.  This matches Tracker.active unless we are inside
              // Tracker.nonreactive, which nullfies currentComputation even though
              // an enclosing computation may still be running.

              var inCompute = false; // `true` if the `_throwFirstError` option was passed in to the call
              // to Tracker.flush that we are in. When set, throw rather than log the
              // first error encountered while flushing. Before throwing the error,
              // finish flushing (from a finally block), logging any subsequent
              // errors.

              var throwFirstError = false;
              var afterFlushCallbacks = [];

              function requireFlush() {
                if (!willFlush) {
                  // We want this code to work without Meteor, see debugFunc above
                  if (typeof Meteor !== "undefined")
                    Meteor._setImmediate(Tracker._runFlush);
                  else setTimeout(Tracker._runFlush, 0);
                  willFlush = true;
                }
              } // Tracker.Computation constructor is visible but private
              // (throws an error if you try to call it)

              var constructingComputation = false; //
              // http://docs.meteor.com/#tracker_computation

              /**
               * @summary A Computation object represents code that is repeatedly rerun
               * in response to
               * reactive data changes. Computations don't have return values; they just
               * perform actions, such as rerendering a template on the screen. Computations
               * are created using Tracker.autorun. Use stop to prevent further rerunning of a
               * computation.
               * @instancename computation
               */

              Tracker.Computation = class Computation {
                constructor(f, parent, onError) {
                  if (!constructingComputation)
                    throw new Error(
                      "Tracker.Computation constructor is private; use Tracker.autorun"
                    );
                  constructingComputation = false; // http://docs.meteor.com/#computation_stopped

                  /**
                   * @summary True if this computation has been stopped.
                   * @locus Client
                   * @memberOf Tracker.Computation
                   * @instance
                   * @name  stopped
                   */

                  this.stopped = false; // http://docs.meteor.com/#computation_invalidated

                  /**
                   * @summary True if this computation has been invalidated (and not yet rerun), or if it has been stopped.
                   * @locus Client
                   * @memberOf Tracker.Computation
                   * @instance
                   * @name  invalidated
                   * @type {Boolean}
                   */

                  this.invalidated = false; // http://docs.meteor.com/#computation_firstrun

                  /**
                   * @summary True during the initial run of the computation at the time `Tracker.autorun` is called, and false on subsequent reruns and at other times.
                   * @locus Client
                   * @memberOf Tracker.Computation
                   * @instance
                   * @name  firstRun
                   * @type {Boolean}
                   */

                  this.firstRun = true;
                  this._id = nextId++;
                  this._onInvalidateCallbacks = [];
                  this._onStopCallbacks = []; // the plan is at some point to use the parent relation
                  // to constrain the order that computations are processed

                  this._parent = parent;
                  this._func = f;
                  this._onError = onError;
                  this._recomputing = false;
                  var errored = true;

                  try {
                    this._compute();

                    errored = false;
                  } finally {
                    this.firstRun = false;
                    if (errored) this.stop();
                  }
                } // http://docs.meteor.com/#computation_oninvalidate

                /**
                 * @summary Registers `callback` to run when this computation is next invalidated, or runs it immediately if the computation is already invalidated.  The callback is run exactly once and not upon future invalidations unless `onInvalidate` is called again after the computation becomes valid again.
                 * @locus Client
                 * @param {Function} callback Function to be called on invalidation. Receives one argument, the computation that was invalidated.
                 */

                onInvalidate(f) {
                  if (typeof f !== "function")
                    throw new Error("onInvalidate requires a function");

                  if (this.invalidated) {
                    Tracker.nonreactive(() => {
                      withNoYieldsAllowed(f)(this);
                    });
                  } else {
                    this._onInvalidateCallbacks.push(f);
                  }
                }
                /**
                 * @summary Registers `callback` to run when this computation is stopped, or runs it immediately if the computation is already stopped.  The callback is run after any `onInvalidate` callbacks.
                 * @locus Client
                 * @param {Function} callback Function to be called on stop. Receives one argument, the computation that was stopped.
                 */

                onStop(f) {
                  if (typeof f !== "function")
                    throw new Error("onStop requires a function");

                  if (this.stopped) {
                    Tracker.nonreactive(() => {
                      withNoYieldsAllowed(f)(this);
                    });
                  } else {
                    this._onStopCallbacks.push(f);
                  }
                } // http://docs.meteor.com/#computation_invalidate

                /**
                 * @summary Invalidates this computation so that it will be rerun.
                 * @locus Client
                 */

                invalidate() {
                  if (!this.invalidated) {
                    // if we're currently in _recompute(), don't enqueue
                    // ourselves, since we'll rerun immediately anyway.
                    if (!this._recomputing && !this.stopped) {
                      requireFlush();
                      pendingComputations.push(this);
                    }

                    this.invalidated = true; // callbacks can't add callbacks, because
                    // this.invalidated === true.

                    for (
                      var i = 0, f;
                      (f = this._onInvalidateCallbacks[i]);
                      i++
                    ) {
                      Tracker.nonreactive(() => {
                        withNoYieldsAllowed(f)(this);
                      });
                    }

                    this._onInvalidateCallbacks = [];
                  }
                } // http://docs.meteor.com/#computation_stop

                /**
                 * @summary Prevents this computation from rerunning.
                 * @locus Client
                 */

                stop() {
                  if (!this.stopped) {
                    this.stopped = true;
                    this.invalidate();

                    for (var i = 0, f; (f = this._onStopCallbacks[i]); i++) {
                      Tracker.nonreactive(() => {
                        withNoYieldsAllowed(f)(this);
                      });
                    }

                    this._onStopCallbacks = [];
                  }
                }

                _compute() {
                  this.invalidated = false;
                  var previous = Tracker.currentComputation;
                  setCurrentComputation(this);
                  var previousInCompute = inCompute;
                  inCompute = true;

                  try {
                    withNoYieldsAllowed(this._func)(this);
                  } finally {
                    setCurrentComputation(previous);
                    inCompute = previousInCompute;
                  }
                }

                _needsRecompute() {
                  return this.invalidated && !this.stopped;
                }

                _recompute() {
                  this._recomputing = true;

                  try {
                    if (this._needsRecompute()) {
                      try {
                        this._compute();
                      } catch (e) {
                        if (this._onError) {
                          this._onError(e);
                        } else {
                          _throwOrLog("recompute", e);
                        }
                      }
                    }
                  } finally {
                    this._recomputing = false;
                  }
                }
                /**
                 * @summary Process the reactive updates for this computation immediately
                 * and ensure that the computation is rerun. The computation is rerun only
                 * if it is invalidated.
                 * @locus Client
                 */

                flush() {
                  if (this._recomputing) return;

                  this._recompute();
                }
                /**
                 * @summary Causes the function inside this computation to run and
                 * synchronously process all reactive updtes.
                 * @locus Client
                 */

                run() {
                  this.invalidate();
                  this.flush();
                }
              }; //
              // http://docs.meteor.com/#tracker_dependency

              /**
               * @summary A Dependency represents an atomic unit of reactive data that a
               * computation might depend on. Reactive data sources such as Session or
               * Minimongo internally create different Dependency objects for different
               * pieces of data, each of which may be depended on by multiple computations.
               * When the data changes, the computations are invalidated.
               * @class
               * @instanceName dependency
               */

              Tracker.Dependency = class Dependency {
                constructor() {
                  this._dependentsById = Object.create(null);
                } // http://docs.meteor.com/#dependency_depend
                //
                // Adds `computation` to this set if it is not already
                // present.  Returns true if `computation` is a new member of the set.
                // If no argument, defaults to currentComputation, or does nothing
                // if there is no currentComputation.

                /**
               * @summary Declares that the current computation (or `fromComputation` if given) depends on `dependency`.  The computation will be invalidated the next time `dependency` changes.
                If there is no current computation and `depend()` is called with no arguments, it does nothing and returns false.
                Returns true if the computation is a new dependent of `dependency` rather than an existing one.
               * @locus Client
               * @param {Tracker.Computation} [fromComputation] An optional computation declared to depend on `dependency` instead of the current computation.
               * @returns {Boolean}
               */

                depend(computation) {
                  if (!computation) {
                    if (!Tracker.active) return false;
                    computation = Tracker.currentComputation;
                  }

                  var id = computation._id;

                  if (!(id in this._dependentsById)) {
                    this._dependentsById[id] = computation;
                    computation.onInvalidate(() => {
                      delete this._dependentsById[id];
                    });
                    return true;
                  }

                  return false;
                } // http://docs.meteor.com/#dependency_changed

                /**
                 * @summary Invalidate all dependent computations immediately and remove them as dependents.
                 * @locus Client
                 */

                changed() {
                  for (var id in this._dependentsById)
                    this._dependentsById[id].invalidate();
                } // http://docs.meteor.com/#dependency_hasdependents

                /**
                 * @summary True if this Dependency has one or more dependent Computations, which would be invalidated if this Dependency were to change.
                 * @locus Client
                 * @returns {Boolean}
                 */

                hasDependents() {
                  for (var id in this._dependentsById) return true;

                  return false;
                }
              }; // http://docs.meteor.com/#tracker_flush

              /**
               * @summary Process all reactive updates immediately and ensure that all invalidated computations are rerun.
               * @locus Client
               */

              Tracker.flush = function (options) {
                Tracker._runFlush({
                  finishSynchronously: true,
                  throwFirstError: options && options._throwFirstError,
                });
              };
              /**
               * @summary True if we are computing a computation now, either first time or recompute.  This matches Tracker.active unless we are inside Tracker.nonreactive, which nullfies currentComputation even though an enclosing computation may still be running.
               * @locus Client
               * @returns {Boolean}
               */

              Tracker.inFlush = function () {
                return inFlush;
              }; // Run all pending computations and afterFlush callbacks.  If we were not called
              // directly via Tracker.flush, this may return before they're all done to allow
              // the event loop to run a little before continuing.

              Tracker._runFlush = function (options) {
                // XXX What part of the comment below is still true? (We no longer
                // have Spark)
                //
                // Nested flush could plausibly happen if, say, a flush causes
                // DOM mutation, which causes a "blur" event, which runs an
                // app event handler that calls Tracker.flush.  At the moment
                // Spark blocks event handlers during DOM mutation anyway,
                // because the LiveRange tree isn't valid.  And we don't have
                // any useful notion of a nested flush.
                //
                // https://app.asana.com/0/159908330244/385138233856
                if (Tracker.inFlush())
                  throw new Error("Can't call Tracker.flush while flushing");
                if (inCompute)
                  throw new Error("Can't flush inside Tracker.autorun");
                options = options || {};
                inFlush = true;
                willFlush = true;
                throwFirstError = !!options.throwFirstError;
                var recomputedCount = 0;
                var finishedTry = false;

                try {
                  while (
                    pendingComputations.length ||
                    afterFlushCallbacks.length
                  ) {
                    // recompute all pending computations
                    while (pendingComputations.length) {
                      var comp = pendingComputations.shift();

                      comp._recompute();

                      if (comp._needsRecompute()) {
                        pendingComputations.unshift(comp);
                      }

                      if (
                        !options.finishSynchronously &&
                        ++recomputedCount > 1000
                      ) {
                        finishedTry = true;
                        return;
                      }
                    }

                    if (afterFlushCallbacks.length) {
                      // call one afterFlush callback, which may
                      // invalidate more computations
                      var func = afterFlushCallbacks.shift();

                      try {
                        func();
                      } catch (e) {
                        _throwOrLog("afterFlush", e);
                      }
                    }
                  }

                  finishedTry = true;
                } finally {
                  if (!finishedTry) {
                    // we're erroring due to throwFirstError being true.
                    inFlush = false; // needed before calling `Tracker.flush()` again
                    // finish flushing

                    Tracker._runFlush({
                      finishSynchronously: options.finishSynchronously,
                      throwFirstError: false,
                    });
                  }

                  willFlush = false;
                  inFlush = false;

                  if (
                    pendingComputations.length ||
                    afterFlushCallbacks.length
                  ) {
                    // We're yielding because we ran a bunch of computations and we aren't
                    // required to finish synchronously, so we'd like to give the event loop a
                    // chance. We should flush again soon.
                    if (options.finishSynchronously) {
                      throw new Error("still have more to do?"); // shouldn't happen
                    }

                    setTimeout(requireFlush, 10);
                  }
                }
              }; // http://docs.meteor.com/#tracker_autorun
              //
              // Run f(). Record its dependencies. Rerun it whenever the
              // dependencies change.
              //
              // Returns a new Computation, which is also passed to f.
              //
              // Links the computation to the current computation
              // so that it is stopped if the current computation is invalidated.

              /**
               * @callback Tracker.ComputationFunction
               * @param {Tracker.Computation}
               */

              /**
               * @summary Run a function now and rerun it later whenever its dependencies
               * change. Returns a Computation object that can be used to stop or observe the
               * rerunning.
               * @locus Client
               * @param {Tracker.ComputationFunction} runFunc The function to run. It receives
               * one argument: the Computation object that will be returned.
               * @param {Object} [options]
               * @param {Function} options.onError Optional. The function to run when an error
               * happens in the Computation. The only argument it receives is the Error
               * thrown. Defaults to the error being logged to the console.
               * @returns {Tracker.Computation}
               */

              Tracker.autorun = function (f, options) {
                if (typeof f !== "function")
                  throw new Error(
                    "Tracker.autorun requires a function argument"
                  );
                options = options || {};
                constructingComputation = true;
                var c = new Tracker.Computation(
                  f,
                  Tracker.currentComputation,
                  options.onError
                );
                if (Tracker.active)
                  Tracker.onInvalidate(function () {
                    c.stop();
                  });
                return c;
              }; // http://docs.meteor.com/#tracker_nonreactive
              //
              // Run `f` with no current computation, returning the return value
              // of `f`.  Used to turn off reactivity for the duration of `f`,
              // so that reactive data sources accessed by `f` will not result in any
              // computations being invalidated.

              /**
               * @summary Run a function without tracking dependencies.
               * @locus Client
               * @param {Function} func A function to call immediately.
               */

              Tracker.nonreactive = function (f) {
                var previous = Tracker.currentComputation;
                setCurrentComputation(null);

                try {
                  return f();
                } finally {
                  setCurrentComputation(previous);
                }
              }; // http://docs.meteor.com/#tracker_oninvalidate

              /**
               * @summary Registers a new [`onInvalidate`](#computation_oninvalidate) callback on the current computation (which must exist), to be called immediately when the current computation is invalidated or stopped.
               * @locus Client
               * @param {Function} callback A callback function that will be invoked as `func(c)`, where `c` is the computation on which the callback is registered.
               */

              Tracker.onInvalidate = function (f) {
                if (!Tracker.active)
                  throw new Error(
                    "Tracker.onInvalidate requires a currentComputation"
                  );
                Tracker.currentComputation.onInvalidate(f);
              }; // http://docs.meteor.com/#tracker_afterflush

              /**
               * @summary Schedules a function to be called during the next flush, or later in the current flush if one is in progress, after all invalidated computations have been rerun.  The function will be run once and not on subsequent flushes unless `afterFlush` is called again.
               * @locus Client
               * @param {Function} callback A function to call at flush time.
               */

              Tracker.afterFlush = function (f) {
                afterFlushCallbacks.push(f);
                requireFlush();
              };
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  _require("/node_modules/meteor/tracker/tracker.js");

  /* Exports */
  Package._define("tracker", {
    Tracker: Tracker,
    Deps: Deps,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var Random = Package.random.Random;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var Retry;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          retry: {
            "retry.js": function module(_require, _exports, _module) {
              //////////////////////////////////////////////////////////////////////////////////
              //                                                                              //
              // packages/retry/retry.js                                                      //
              //                                                                              //
              //////////////////////////////////////////////////////////////////////////////////
              //
              _module.export({
                Retry: () => Retry,
              });

              class Retry {
                constructor() {
                  let {
                    baseTimeout = 1000,
                    exponent = 2.2,
                    // The default is high-ish to ensure a server can recover from a
                    // failure caused by load.
                    maxTimeout = 5 * 60 * 1000,
                    minTimeout = 10,
                    minCount = 2,
                    fuzz = 0.5,
                  } =
                    arguments.length > 0 && arguments[0] !== undefined
                      ? arguments[0]
                      : {};
                  this.baseTimeout = baseTimeout;
                  this.exponent = exponent;
                  this.maxTimeout = maxTimeout;
                  this.minTimeout = minTimeout;
                  this.minCount = minCount;
                  this.fuzz = fuzz;
                  this.retryTimer = null;
                } // Reset a pending retry, if any.

                clear() {
                  if (this.retryTimer) {
                    clearTimeout(this.retryTimer);
                  }

                  this.retryTimer = null;
                } // Calculate how long to wait in milliseconds to retry, based on the
                // `count` of which retry this is.

                _timeout(count) {
                  if (count < this.minCount) {
                    return this.minTimeout;
                  } // fuzz the timeout randomly, to avoid reconnect storms when a
                  // server goes down.

                  var timeout =
                    Math.min(
                      this.maxTimeout,
                      this.baseTimeout * Math.pow(this.exponent, count)
                    ) *
                    (Random.fraction() * this.fuzz + (1 - this.fuzz / 2));
                  return timeout;
                } // Call `fn` after a delay, based on the `count` of which retry this is.

                retryLater(count, fn) {
                  var timeout = this._timeout(count);

                  if (this.retryTimer) clearTimeout(this.retryTimer);
                  this.retryTimer = Meteor.setTimeout(fn, timeout);
                  return timeout;
                }
              }
              //////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/retry/retry.js");

  /* Exports */
  Package._define("retry", _exports2, {
    Retry: Retry,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var EJSON = Package.ejson.EJSON;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var IdMap;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          "id-map": {
            "id-map.js": function module(_require, _exports, _module) {
              ////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                        //
              // packages/id-map/id-map.js                                                              //
              //                                                                                        //
              ////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module.export({
                IdMap: () => IdMap,
              });
              const hasOwn = Object.prototype.hasOwnProperty;

              class IdMap {
                constructor(idStringify, idParse) {
                  this.clear();
                  this._idStringify = idStringify || JSON.stringify;
                  this._idParse = idParse || JSON.parse;
                } // Some of these methods are designed to match methods on OrderedDict, since
                // (eg) ObserveMultiplex and _CachingChangeObserver use them interchangeably.
                // (Conceivably, this should be replaced with "UnorderedDict" with a specific
                // set of methods that overlap between the two.)

                get(id) {
                  var key = this._idStringify(id);

                  return this._map[key];
                }

                set(id, value) {
                  var key = this._idStringify(id);

                  this._map[key] = value;
                }

                remove(id) {
                  var key = this._idStringify(id);

                  delete this._map[key];
                }

                has(id) {
                  var key = this._idStringify(id);

                  return hasOwn.call(this._map, key);
                }

                empty() {
                  for (let key in this._map) {
                    return false;
                  }

                  return true;
                }

                clear() {
                  this._map = Object.create(null);
                } // Iterates over the items in the map. Return `false` to break the loop.

                forEach(iterator) {
                  // don't use _.each, because we can't break out of it.
                  var keys = Object.keys(this._map);

                  for (var i = 0; i < keys.length; i++) {
                    var breakIfFalse = iterator.call(
                      null,
                      this._map[keys[i]],
                      this._idParse(keys[i])
                    );

                    if (breakIfFalse === false) {
                      return;
                    }
                  }
                }

                size() {
                  return Object.keys(this._map).length;
                }

                setDefault(id, def) {
                  var key = this._idStringify(id);

                  if (hasOwn.call(this._map, key)) {
                    return this._map[key];
                  }

                  this._map[key] = def;
                  return def;
                } // Assumes that values are EJSON-cloneable, and that we don't need to clone
                // IDs (ie, that nobody is going to mutate an ObjectId).

                clone() {
                  var clone = new IdMap(this._idStringify, this._idParse);
                  this.forEach(function (value, id) {
                    clone.set(id, EJSON.clone(value));
                  });
                  return clone;
                }
              }
              ////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/id-map/id-map.js");

  /* Exports */
  Package._define("id-map", _exports2, {
    IdMap: IdMap,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var options, Hook;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          "callback-hook": {
            "hook.js": function module(_require, _exports, _module) {
              /////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                 //
              // packages/callback-hook/hook.js                                                                  //
              //                                                                                                 //
              /////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module.export({
                Hook: () => Hook,
              });
              // XXX This pattern is under development. Do not add more callsites
              // using this package for now. See:
              // https://meteor.hackpad.com/Design-proposal-Hooks-YxvgEW06q6f
              //
              // Encapsulates the pattern of registering callbacks on a hook.
              //
              // The `each` method of the hook calls its iterator function argument
              // with each registered callback.  This allows the hook to
              // conditionally decide not to call the callback (if, for example, the
              // observed object has been closed or terminated).
              //
              // By default, callbacks are bound with `Meteor.bindEnvironment`, so they will be
              // called with the Meteor environment of the calling code that
              // registered the callback. Override by passing { bindEnvironment: false }
              // to the constructor.
              //
              // Registering a callback returns an object with a single `stop`
              // method which unregisters the callback.
              //
              // The code is careful to allow a callback to be safely unregistered
              // while the callbacks are being iterated over.
              //
              // If the hook is configured with the `exceptionHandler` option, the
              // handler will be called if a called callback throws an exception.
              // By default (if the exception handler doesn't itself throw an
              // exception, or if the iterator function doesn't return a falsy value
              // to terminate the calling of callbacks), the remaining callbacks
              // will still be called.
              //
              // Alternatively, the `debugPrintExceptions` option can be specified
              // as string describing the callback.  On an exception the string and
              // the exception will be printed to the console log with
              // `Meteor._debug`, and the exception otherwise ignored.
              //
              // If an exception handler isn't specified, exceptions thrown in the
              // callback will propagate up to the iterator function, and will
              // terminate calling the remaining callbacks if not caught.
              const hasOwn = Object.prototype.hasOwnProperty;

              class Hook {
                constructor(options) {
                  options = options || {};
                  this.nextCallbackId = 0;
                  this.callbacks = Object.create(null); // Whether to wrap callbacks with Meteor.bindEnvironment

                  this.bindEnvironment = true;

                  if (options.bindEnvironment === false) {
                    this.bindEnvironment = false;
                  }

                  if (options.exceptionHandler) {
                    this.exceptionHandler = options.exceptionHandler;
                  } else if (options.debugPrintExceptions) {
                    if (typeof options.debugPrintExceptions !== "string") {
                      throw new Error(
                        "Hook option debugPrintExceptions should be a string"
                      );
                    }

                    this.exceptionHandler = options.debugPrintExceptions;
                  }
                }

                register(callback) {
                  var exceptionHandler =
                    this.exceptionHandler ||
                    function (exception) {
                      // Note: this relies on the undocumented fact that if bindEnvironment's
                      // onException throws, and you are invoking the callback either in the
                      // browser or from within a Fiber in Node, the exception is propagated.
                      throw exception;
                    };

                  if (this.bindEnvironment) {
                    callback = Meteor.bindEnvironment(
                      callback,
                      exceptionHandler
                    );
                  } else {
                    callback = dontBindEnvironment(callback, exceptionHandler);
                  }

                  var id = this.nextCallbackId++;
                  this.callbacks[id] = callback;
                  return {
                    callback,
                    stop: () => {
                      delete this.callbacks[id];
                    },
                  };
                } // For each registered callback, call the passed iterator function
                // with the callback.
                //
                // The iterator function can choose whether or not to call the
                // callback.  (For example, it might not call the callback if the
                // observed object has been closed or terminated).
                //
                // The iteration is stopped if the iterator function returns a falsy
                // value or throws an exception.
                //

                each(iterator) {
                  // Invoking bindEnvironment'd callbacks outside of a Fiber in Node doesn't
                  // run them to completion (and exceptions thrown from onException are not
                  // propagated), so we need to be in a Fiber.
                  Meteor._nodeCodeMustBeInFiber();

                  var ids = Object.keys(this.callbacks);

                  for (var i = 0; i < ids.length; ++i) {
                    var id = ids[i]; // check to see if the callback was removed during iteration

                    if (hasOwn.call(this.callbacks, id)) {
                      var callback = this.callbacks[id];

                      if (!iterator(callback)) {
                        break;
                      }
                    }
                  }
                }
              }

              // Copied from Meteor.bindEnvironment and removed all the env stuff.
              function dontBindEnvironment(func, onException, _this) {
                if (!onException || typeof onException === "string") {
                  var description = onException || "callback of async function";

                  onException = function (error) {
                    Meteor._debug("Exception in " + description, error);
                  };
                }

                return function () {
                  try {
                    for (
                      var _len = arguments.length,
                        args = new Array(_len),
                        _key = 0;
                      _key < _len;
                      _key++
                    ) {
                      args[_key] = arguments[_key];
                    }

                    var ret = func.apply(_this, args);
                  } catch (e) {
                    onException(e);
                  }

                  return ret;
                };
              }
              /////////////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/callback-hook/hook.js");

  /* Exports */
  Package._define("callback-hook", _exports2, {
    Hook: Hook,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var check = Package.check.check;
  var Match = Package.check.Match;
  var Random = Package.random.Random;
  var EJSON = Package.ejson.EJSON;
  var Tracker = Package.tracker.Tracker;
  var Deps = Package.tracker.Deps;
  var Retry = Package.retry.Retry;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var DDPCommon;

  var _require = meteorInstall(
    {
      node_modules: {
        meteor: {
          "ddp-common": {
            "namespace.js": function _module() {
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                                    //
              // packages/ddp-common/namespace.js                                                                                   //
              //                                                                                                                    //
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              /**
               * @namespace DDPCommon
               * @summary Namespace for DDPCommon-related methods/classes. Shared between
               * `ddp-client` and `ddp-server`, where the ddp-client is the implementation
               * of a ddp client for both client AND server; and the ddp server is the
               * implementation of the livedata server and stream server. Common
               * functionality shared between both can be shared under this namespace
               */
              DDPCommon = {};
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "heartbeat.js": function _module2() {
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                                    //
              // packages/ddp-common/heartbeat.js                                                                                   //
              //                                                                                                                    //
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              // Heartbeat options:
              //   heartbeatInterval: interval to send pings, in milliseconds.
              //   heartbeatTimeout: timeout to close the connection if a reply isn't
              //     received, in milliseconds.
              //   sendPing: function to call to send a ping on the connection.
              //   onTimeout: function to call to close the connection.
              DDPCommon.Heartbeat = class Heartbeat {
                constructor(options) {
                  this.heartbeatInterval = options.heartbeatInterval;
                  this.heartbeatTimeout = options.heartbeatTimeout;
                  this._sendPing = options.sendPing;
                  this._onTimeout = options.onTimeout;
                  this._seenPacket = false;
                  this._heartbeatIntervalHandle = null;
                  this._heartbeatTimeoutHandle = null;
                }

                stop() {
                  this._clearHeartbeatIntervalTimer();

                  this._clearHeartbeatTimeoutTimer();
                }

                start() {
                  this.stop();

                  this._startHeartbeatIntervalTimer();
                }

                _startHeartbeatIntervalTimer() {
                  this._heartbeatIntervalHandle = Meteor.setInterval(
                    () => this._heartbeatIntervalFired(),
                    this.heartbeatInterval
                  );
                }

                _startHeartbeatTimeoutTimer() {
                  this._heartbeatTimeoutHandle = Meteor.setTimeout(
                    () => this._heartbeatTimeoutFired(),
                    this.heartbeatTimeout
                  );
                }

                _clearHeartbeatIntervalTimer() {
                  if (this._heartbeatIntervalHandle) {
                    Meteor.clearInterval(this._heartbeatIntervalHandle);
                    this._heartbeatIntervalHandle = null;
                  }
                }

                _clearHeartbeatTimeoutTimer() {
                  if (this._heartbeatTimeoutHandle) {
                    Meteor.clearTimeout(this._heartbeatTimeoutHandle);
                    this._heartbeatTimeoutHandle = null;
                  }
                } // The heartbeat interval timer is fired when we should send a ping.

                _heartbeatIntervalFired() {
                  // don't send ping if we've seen a packet since we last checked,
                  // *or* if we have already sent a ping and are awaiting a timeout.
                  // That shouldn't happen, but it's possible if
                  // `this.heartbeatInterval` is smaller than
                  // `this.heartbeatTimeout`.
                  if (!this._seenPacket && !this._heartbeatTimeoutHandle) {
                    this._sendPing(); // Set up timeout, in case a pong doesn't arrive in time.

                    this._startHeartbeatTimeoutTimer();
                  }

                  this._seenPacket = false;
                } // The heartbeat timeout timer is fired when we sent a ping, but we
                // timed out waiting for the pong.

                _heartbeatTimeoutFired() {
                  this._heartbeatTimeoutHandle = null;

                  this._onTimeout();
                }

                messageReceived() {
                  // Tell periodic checkin that we have seen a packet, and thus it
                  // does not need to send a ping this cycle.
                  this._seenPacket = true; // If we were waiting for a pong, we got it.

                  if (this._heartbeatTimeoutHandle) {
                    this._clearHeartbeatTimeoutTimer();
                  }
                }
              };
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "utils.js": function module(_require2, _exports, _module3) {
              _module3.export({
                hasOwn: () => hasOwn,
                slice: () => slice,
                keys: () => keys,
                isEmpty: () => isEmpty,
                last: () => last,
              });
              const hasOwn = Object.prototype.hasOwnProperty;
              const slice = Array.prototype.slice;

              function keys(obj) {
                return Object.keys(Object(obj));
              }

              function isEmpty(obj) {
                if (obj == null) {
                  return true;
                }

                if (Array.isArray(obj) || typeof obj === "string") {
                  return obj.length === 0;
                }

                for (const key in obj) {
                  if (hasOwn.call(obj, key)) {
                    return false;
                  }
                }

                return true;
              }

              function last(array, n, guard) {
                if (array == null) {
                  return;
                }

                if (n == null || guard) {
                  return array[array.length - 1];
                }

                return slice.call(array, Math.max(array.length - n, 0));
              }

              DDPCommon.SUPPORTED_DDP_VERSIONS = ["1", "pre2", "pre1"];

              DDPCommon.parseDDP = function (stringMessage) {
                try {
                  var msg = JSON.parse(stringMessage);
                } catch (e) {
                  Meteor._debug(
                    "Discarding message with invalid JSON",
                    stringMessage
                  );

                  return null;
                } // DDP messages must be objects.

                if (msg === null || typeof msg !== "object") {
                  Meteor._debug(
                    "Discarding non-object DDP message",
                    stringMessage
                  );

                  return null;
                } // massage msg to get it into "abstract ddp" rather than "wire ddp" format.
                // switch between "cleared" rep of unsetting fields and "undefined"
                // rep of same

                if (hasOwn.call(msg, "cleared")) {
                  if (!hasOwn.call(msg, "fields")) {
                    msg.fields = {};
                  }

                  msg.cleared.forEach((clearKey) => {
                    msg.fields[clearKey] = undefined;
                  });
                  delete msg.cleared;
                }

                ["fields", "params", "result"].forEach((field) => {
                  if (hasOwn.call(msg, field)) {
                    msg[field] = EJSON._adjustTypesFromJSONValue(msg[field]);
                  }
                });
                return msg;
              };

              DDPCommon.stringifyDDP = function (msg) {
                const copy = EJSON.clone(msg); // swizzle 'changed' messages from 'fields undefined' rep to 'fields
                // and cleared' rep

                if (hasOwn.call(msg, "fields")) {
                  const cleared = [];
                  Object.keys(msg.fields).forEach((key) => {
                    const value = msg.fields[key];

                    if (typeof value === "undefined") {
                      cleared.push(key);
                      delete copy.fields[key];
                    }
                  });

                  if (!isEmpty(cleared)) {
                    copy.cleared = cleared;
                  }

                  if (isEmpty(copy.fields)) {
                    delete copy.fields;
                  }
                } // adjust types to basic

                ["fields", "params", "result"].forEach((field) => {
                  if (hasOwn.call(copy, field)) {
                    copy[field] = EJSON._adjustTypesToJSONValue(copy[field]);
                  }
                });

                if (msg.id && typeof msg.id !== "string") {
                  throw new Error("Message id is not a string");
                }

                return JSON.stringify(copy);
              };
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "method_invocation.js": function _module4() {
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                                    //
              // packages/ddp-common/method_invocation.js                                                                           //
              //                                                                                                                    //
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              // Instance name is this because it is usually referred to as this inside a
              // method definition

              /**
               * @summary The state for a single invocation of a method, referenced by this
               * inside a method definition.
               * @param {Object} options
               * @instanceName this
               * @showInstanceName true
               */
              DDPCommon.MethodInvocation = class MethodInvocation {
                constructor(options) {
                  // true if we're running not the actual method, but a stub (that is,
                  // if we're on a client (which may be a browser, or in the future a
                  // server connecting to another server) and presently running a
                  // simulation of a server-side method for latency compensation
                  // purposes). not currently true except in a client such as a browser,
                  // since there's usually no point in running stubs unless you have a
                  // zero-latency connection to the user.

                  /**
                   * @summary Access inside a method invocation.  Boolean value, true if this invocation is a stub.
                   * @locus Anywhere
                   * @name  isSimulation
                   * @memberOf DDPCommon.MethodInvocation
                   * @instance
                   * @type {Boolean}
                   */
                  this.isSimulation = options.isSimulation; // call this function to allow other method invocations (from the
                  // same client) to continue running without waiting for this one to
                  // complete.

                  this._unblock = options.unblock || function () {};

                  this._calledUnblock = false; // current user id

                  /**
                   * @summary The id of the user that made this method call, or `null` if no user was logged in.
                   * @locus Anywhere
                   * @name  userId
                   * @memberOf DDPCommon.MethodInvocation
                   * @instance
                   */

                  this.userId = options.userId; // sets current user id in all appropriate server contexts and
                  // reruns subscriptions

                  this._setUserId = options.setUserId || function () {}; // On the server, the connection this method call came in on.

                  /**
                   * @summary Access inside a method invocation. The [connection](#meteor_onconnection) that this method was received on. `null` if the method is not associated with a connection, eg. a server initiated method call. Calls to methods made from a server method which was in turn initiated from the client share the same `connection`.
                   * @locus Server
                   * @name  connection
                   * @memberOf DDPCommon.MethodInvocation
                   * @instance
                   */

                  this.connection = options.connection; // The seed for randomStream value generation

                  this.randomSeed = options.randomSeed; // This is set by RandomStream.get; and holds the random stream state

                  this.randomStream = null;
                }
                /**
                 * @summary Call inside a method invocation.  Allow subsequent method from this client to begin running in a new fiber.
                 * @locus Server
                 * @memberOf DDPCommon.MethodInvocation
                 * @instance
                 */

                unblock() {
                  this._calledUnblock = true;

                  this._unblock();
                }
                /**
                 * @summary Set the logged in user.
                 * @locus Server
                 * @memberOf DDPCommon.MethodInvocation
                 * @instance
                 * @param {String | null} userId The value that should be returned by `userId` on this connection.
                 */

                setUserId(userId) {
                  if (this._calledUnblock) {
                    throw new Error(
                      "Can't call setUserId in a method after calling unblock"
                    );
                  }

                  this.userId = userId;

                  this._setUserId(userId);
                }
              };
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "random_stream.js": function _module5() {
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                                    //
              // packages/ddp-common/random_stream.js                                                                               //
              //                                                                                                                    //
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              // RandomStream allows for generation of pseudo-random values, from a seed.
              //
              // We use this for consistent 'random' numbers across the client and server.
              // We want to generate probably-unique IDs on the client, and we ideally want
              // the server to generate the same IDs when it executes the method.
              //
              // For generated values to be the same, we must seed ourselves the same way,
              // and we must keep track of the current state of our pseudo-random generators.
              // We call this state the scope. By default, we use the current DDP method
              // invocation as our scope.  DDP now allows the client to specify a randomSeed.
              // If a randomSeed is provided it will be used to seed our random sequences.
              // In this way, client and server method calls will generate the same values.
              //
              // We expose multiple named streams; each stream is independent
              // and is seeded differently (but predictably from the name).
              // By using multiple streams, we support reordering of requests,
              // as long as they occur on different streams.
              //
              // @param options {Optional Object}
              //   seed: Array or value - Seed value(s) for the generator.
              //                          If an array, will be used as-is
              //                          If a value, will be converted to a single-value array
              //                          If omitted, a random array will be used as the seed.
              DDPCommon.RandomStream = class RandomStream {
                constructor(options) {
                  this.seed = [].concat(options.seed || randomToken());
                  this.sequences = Object.create(null);
                } // Get a random sequence with the specified name, creating it if does not exist.
                // New sequences are seeded with the seed concatenated with the name.
                // By passing a seed into Random.create, we use the Alea generator.

                _sequence(name) {
                  var self = this;
                  var sequence = self.sequences[name] || null;

                  if (sequence === null) {
                    var sequenceSeed = self.seed.concat(name);

                    for (var i = 0; i < sequenceSeed.length; i++) {
                      if (typeof sequenceSeed[i] === "function") {
                        sequenceSeed[i] = sequenceSeed[i]();
                      }
                    }

                    self.sequences[
                      name
                    ] = sequence = Random.createWithSeeds.apply(
                      null,
                      sequenceSeed
                    );
                  }

                  return sequence;
                }
              }; // Returns a random string of sufficient length for a random seed.
              // This is a placeholder function; a similar function is planned
              // for Random itself; when that is added we should remove this function,
              // and call Random's randomToken instead.

              function randomToken() {
                return Random.hexString(20);
              } // Returns the random stream with the specified name, in the specified

              // scope. If a scope is passed, then we use that to seed a (not
              // cryptographically secure) PRNG using the fast Alea algorithm.  If
              // scope is null (or otherwise falsey) then we use a generated seed.
              //
              // However, scope will normally be the current DDP method invocation,
              // so we'll use the stream with the specified name, and we should get
              // consistent values on the client and server sides of a method call.

              DDPCommon.RandomStream.get = function (scope, name) {
                if (!name) {
                  name = "default";
                }

                if (!scope) {
                  // There was no scope passed in; the sequence won't actually be
                  // reproducible. but make it fast (and not cryptographically
                  // secure) anyways, so that the behavior is similar to what you'd
                  // get by passing in a scope.
                  return Random.insecure;
                }

                var randomStream = scope.randomStream;

                if (!randomStream) {
                  scope.randomStream = randomStream = new DDPCommon.RandomStream(
                    {
                      seed: scope.randomSeed,
                    }
                  );
                }

                return randomStream._sequence(name);
              }; // Creates a randomSeed for passing to a method call.
              // Note that we take enclosing as an argument,
              // though we expect it to be DDP._CurrentMethodInvocation.get()
              // However, we often evaluate makeRpcSeed lazily, and thus the relevant
              // invocation may not be the one currently in scope.
              // If enclosing is null, we'll use Random and values won't be repeatable.

              DDPCommon.makeRpcSeed = function (enclosing, methodName) {
                var stream = DDPCommon.RandomStream.get(
                  enclosing,
                  "/rpc/" + methodName
                );
                return stream.hexString(20);
              };
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  _require("/node_modules/meteor/ddp-common/namespace.js");
  _require("/node_modules/meteor/ddp-common/heartbeat.js");
  _require("/node_modules/meteor/ddp-common/utils.js");
  _require("/node_modules/meteor/ddp-common/method_invocation.js");
  _require("/node_modules/meteor/ddp-common/random_stream.js");

  /* Exports */
  Package._define("ddp-common", {
    DDPCommon: DDPCommon,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var Reload;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          reload: {
            "reload.js": function module(_require, _exports, _module) {
              ///////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                           //
              // packages/reload/reload.js                                                                 //
              //                                                                                           //
              ///////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module.export({
                Reload: () => Reload,
              });
              const Reload = {};
              var KEY_NAME = "Meteor_Reload";
              var old_data = {}; // read in old data at startup.

              var old_json; // This logic for sessionStorage detection is based on browserstate/history.js

              var safeSessionStorage = null;

              try {
                // This throws a SecurityError on Chrome if cookies & localStorage are
                // explicitly disabled
                //
                // On Firefox with dom.storage.enabled set to false, sessionStorage is null
                //
                // We can't even do (typeof sessionStorage) on Chrome, it throws.  So we rely
                // on the throw if sessionStorage == null; the alternative is browser
                // detection, but this seems better.
                safeSessionStorage = window.sessionStorage; // Check we can actually use it

                if (safeSessionStorage) {
                  safeSessionStorage.setItem("__dummy__", "1");
                  safeSessionStorage.removeItem("__dummy__");
                } else {
                  // Be consistently null, for safety
                  safeSessionStorage = null;
                }
              } catch (e) {
                // Expected on chrome with strict security, or if sessionStorage not supported
                safeSessionStorage = null;
              } // Exported for test.

              Reload._getData = function () {
                return (
                  safeSessionStorage && safeSessionStorage.getItem(KEY_NAME)
                );
              };

              if (safeSessionStorage) {
                old_json = Reload._getData();
                safeSessionStorage.removeItem(KEY_NAME);
              } else {
                // Unsupported browser (IE 6,7) or locked down security settings.
                // No session resumption.
                // Meteor._debug("XXX UNSUPPORTED BROWSER/SETTINGS");
              }

              if (!old_json) old_json = "{}";
              var old_parsed = {};

              try {
                old_parsed = JSON.parse(old_json);

                if (typeof old_parsed !== "object") {
                  Meteor._debug("Got bad data on reload. Ignoring.");

                  old_parsed = {};
                }
              } catch (err) {
                Meteor._debug("Got invalid JSON on reload. Ignoring.");
              }

              if (old_parsed.reload && typeof old_parsed.data === "object") {
                // Meteor._debug("Restoring reload data.");
                old_data = old_parsed.data;
              }

              var providers = []; ////////// External API //////////
              // Packages that support migration should register themselves by calling
              // this function. When it's time to migrate, callback will be called
              // with one argument, the "retry function," and an optional 'option'
              // argument (containing a key 'immediateMigration'). If the package
              // is ready to migrate, it should return [true, data], where data is
              // its migration data, an arbitrary JSON value (or [true] if it has
              // no migration data this time). If the package needs more time
              // before it is ready to migrate, it should return false. Then, once
              // it is ready to migrating again, it should call the retry
              // function. The retry function will return immediately, but will
              // schedule the migration to be retried, meaning that every package
              // will be polled once again for its migration data. If they are all
              // ready this time, then the migration will happen. name must be set if there
              // is migration data. If 'immediateMigration' is set in the options
              // argument, then it doesn't matter whether the package is ready to
              // migrate or not; the reload will happen immediately without waiting
              // (used for OAuth redirect login).
              //

              Reload._onMigrate = function (name, callback) {
                if (!callback) {
                  // name not provided, so first arg is callback.
                  callback = name;
                  name = undefined;
                }

                providers.push({
                  name: name,
                  callback: callback,
                });
              }; // Called by packages when they start up.
              // Returns the object that was saved, or undefined if none saved.
              //

              Reload._migrationData = function (name) {
                return old_data[name];
              }; // Options are the same as for `Reload._migrate`.

              var pollProviders = function (tryReload, options) {
                tryReload = tryReload || function () {};

                options = options || {};
                var migrationData = {};
                var remaining = providers.slice(0);
                var allReady = true;

                while (remaining.length) {
                  var p = remaining.shift();
                  var status = p.callback(tryReload, options);
                  if (!status[0]) allReady = false;
                  if (status.length > 1 && p.name)
                    migrationData[p.name] = status[1];
                }

                if (allReady || options.immediateMigration)
                  return migrationData;
                else return null;
              }; // Options are:
              //  - immediateMigration: true if the page will be reloaded immediately
              //    regardless of whether packages report that they are ready or not.

              Reload._migrate = function (tryReload, options) {
                // Make sure each package is ready to go, and collect their
                // migration data
                var migrationData = pollProviders(tryReload, options);
                if (migrationData === null) return false; // not ready yet..

                try {
                  // Persist the migration data
                  var json = JSON.stringify({
                    data: migrationData,
                    reload: true,
                  });
                } catch (err) {
                  Meteor._debug(
                    "Couldn't serialize data for migration",
                    migrationData
                  );

                  throw err;
                }

                if (safeSessionStorage) {
                  try {
                    safeSessionStorage.setItem(KEY_NAME, json);
                  } catch (err) {
                    // We should have already checked this, but just log - don't throw
                    Meteor._debug(
                      "Couldn't save data for migration to sessionStorage",
                      err
                    );
                  }
                } else {
                  Meteor._debug(
                    "Browser does not support sessionStorage. Not saving migration state."
                  );
                }

                return true;
              }; // Allows tests to isolate the list of providers.

              Reload._withFreshProvidersForTest = function (f) {
                var originalProviders = providers.slice(0);
                providers = [];

                try {
                  f();
                } finally {
                  providers = originalProviders;
                }
              }; // Migrating reload: reload this page (presumably to pick up a new
              // version of the code or assets), but save the program state and
              // migrate it over. This function returns immediately. The reload
              // will happen at some point in the future once all of the packages
              // are ready to migrate.
              //

              var reloading = false;

              Reload._reload = function (options) {
                options = options || {};
                if (reloading) return;
                reloading = true;

                function tryReload() {
                  setTimeout(reload, 1);
                }

                function forceBrowserReload() {
                  // We'd like to make the browser reload the page using location.replace()
                  // instead of location.reload(), because this avoids validating assets
                  // with the server if we still have a valid cached copy. This doesn't work
                  // when the location contains a hash however, because that wouldn't reload
                  // the page and just scroll to the hash location instead.
                  if (
                    window.location.hash ||
                    window.location.href.endsWith("#")
                  ) {
                    window.location.reload();
                  } else {
                    window.location.replace(window.location.href);
                  }
                }

                function reload() {
                  if (Reload._migrate(tryReload, options)) {
                    if (Meteor.isCordova) {
                      WebAppLocalServer.switchToPendingVersion(() => {
                        forceBrowserReload();
                      });
                    } else {
                      forceBrowserReload();
                    }
                  }
                }

                tryReload();
              };
              ///////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/reload/reload.js");

  /* Exports */
  Package._define("reload", _exports2, {
    Reload: Reload,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var Retry = Package.retry.Retry;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var options, SockJS;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          "socket-stream-client": {
            "browser.js": function module(_require, _exports, _module) {
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                                     //
              // packages/socket-stream-client/browser.js                                                                            //
              //                                                                                                                     //
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              let _objectSpread;

              _module.link(
                "@babel/runtime/helpers/objectSpread2",
                {
                  default(v) {
                    _objectSpread = v;
                  },
                },
                0
              );
              _module.export({
                ClientStream: () => ClientStream,
              });
              let toSockjsUrl, toWebsocketUrl;
              _module.link(
                "./urls.js",
                {
                  toSockjsUrl(v) {
                    toSockjsUrl = v;
                  },

                  toWebsocketUrl(v) {
                    toWebsocketUrl = v;
                  },
                },
                0
              );
              let StreamClientCommon;
              _module.link(
                "./common.js",
                {
                  StreamClientCommon(v) {
                    StreamClientCommon = v;
                  },
                },
                1
              );
              _module.link("./sockjs-0.3.4.js");

              class ClientStream extends StreamClientCommon {
                // @param url {String} URL to Meteor app
                //   "http://subdomain.meteor.com/" or "/" or
                //   "ddp+sockjs://foo-**.meteor.com/sockjs"
                constructor(url, options) {
                  super(options);

                  this._initCommon(this.options); //// Constants
                  // how long between hearing heartbeat from the server until we declare
                  // the connection dead. heartbeats come every 45s (stream_server.js)
                  //
                  // NOTE: this is a older timeout mechanism. We now send heartbeats at
                  // the DDP level (https://github.com/meteor/meteor/pull/1865), and
                  // expect those timeouts to kill a non-responsive connection before
                  // this timeout fires. This is kept around for compatibility (when
                  // talking to a server that doesn't support DDP heartbeats) and can be
                  // removed later.

                  this.HEARTBEAT_TIMEOUT = 100 * 1000;
                  this.rawUrl = url;
                  this.socket = null;
                  this.lastError = null;
                  this.heartbeatTimer = null; // Listen to global 'online' event if we are running in a browser.
                  // (IE8 does not support addEventListener)

                  if (typeof window !== "undefined" && window.addEventListener)
                    window.addEventListener(
                      "online",
                      this._online.bind(this),
                      false
                      /* useCapture. make FF3.6 happy. */
                    ); //// Kickoff!

                  this._launchConnection();
                } // data is a utf8 string. Data sent while not connected is dropped on
                // the floor, and it is up the user of this API to retransmit lost
                // messages on 'reset'

                send(data) {
                  if (this.currentStatus.connected) {
                    this.socket.send(data);
                  }
                } // Changes where this connection points

                _changeUrl(url) {
                  this.rawUrl = url;
                }

                _connected() {
                  if (this.connectionTimer) {
                    clearTimeout(this.connectionTimer);
                    this.connectionTimer = null;
                  }

                  if (this.currentStatus.connected) {
                    // already connected. do nothing. this probably shouldn't happen.
                    return;
                  } // update status

                  this.currentStatus.status = "connected";
                  this.currentStatus.connected = true;
                  this.currentStatus.retryCount = 0;
                  this.statusChanged(); // fire resets. This must come after status change so that clients
                  // can call send from within a reset callback.

                  this.forEachCallback("reset", (callback) => {
                    callback();
                  });
                }

                _cleanup(maybeError) {
                  this._clearConnectionAndHeartbeatTimers();

                  if (this.socket) {
                    this.socket.onmessage = this.socket.onclose = this.socket.onerror = this.socket.onheartbeat = () => {};

                    this.socket.close();
                    this.socket = null;
                  }

                  this.forEachCallback("disconnect", (callback) => {
                    callback(maybeError);
                  });
                }

                _clearConnectionAndHeartbeatTimers() {
                  if (this.connectionTimer) {
                    clearTimeout(this.connectionTimer);
                    this.connectionTimer = null;
                  }

                  if (this.heartbeatTimer) {
                    clearTimeout(this.heartbeatTimer);
                    this.heartbeatTimer = null;
                  }
                }

                _heartbeat_timeout() {
                  console.log(
                    "Connection timeout. No sockjs heartbeat received."
                  );

                  this._lostConnection(
                    new this.ConnectionError("Heartbeat timed out")
                  );
                }

                _heartbeat_received() {
                  // If we've already permanently shut down this stream, the timeout is
                  // already cleared, and we don't need to set it again.
                  if (this._forcedToDisconnect) return;
                  if (this.heartbeatTimer) clearTimeout(this.heartbeatTimer);
                  this.heartbeatTimer = setTimeout(
                    this._heartbeat_timeout.bind(this),
                    this.HEARTBEAT_TIMEOUT
                  );
                }

                _sockjsProtocolsWhitelist() {
                  // only allow polling protocols. no streaming.  streaming
                  // makes safari spin.
                  var protocolsWhitelist = [
                    "xdr-polling",
                    "xhr-polling",
                    "iframe-xhr-polling",
                    "jsonp-polling",
                  ]; // iOS 4 and 5 and below crash when using websockets over certain
                  // proxies. this seems to be resolved with iOS 6. eg
                  // https://github.com/LearnBoost/socket.io/issues/193#issuecomment-7308865.
                  //
                  // iOS <4 doesn't support websockets at all so sockjs will just
                  // immediately fall back to http

                  var noWebsockets =
                    navigator &&
                    /iPhone|iPad|iPod/.test(navigator.userAgent) &&
                    /OS 4_|OS 5_/.test(navigator.userAgent);
                  if (!noWebsockets)
                    protocolsWhitelist = ["websocket"].concat(
                      protocolsWhitelist
                    );
                  return protocolsWhitelist;
                }

                _launchConnection() {
                  this._cleanup(); // cleanup the old socket, if there was one.

                  var options = _objectSpread(
                    {
                      protocols_whitelist: this._sockjsProtocolsWhitelist(),
                    },
                    this.options._sockjsOptions
                  );

                  const hasSockJS = typeof SockJS === "function";
                  this.socket = hasSockJS // Convert raw URL to SockJS URL each time we open a connection, so
                    ? // that we can connect to random hostnames and get around browser
                      // per-host connection limits.
                      new SockJS(toSockjsUrl(this.rawUrl), undefined, options)
                    : new WebSocket(toWebsocketUrl(this.rawUrl));

                  this.socket.onopen = (data) => {
                    this.lastError = null;

                    this._connected();
                  };

                  this.socket.onmessage = (data) => {
                    this.lastError = null;

                    this._heartbeat_received();

                    if (this.currentStatus.connected) {
                      this.forEachCallback("message", (callback) => {
                        callback(data.data);
                      });
                    }
                  };

                  this.socket.onclose = () => {
                    this._lostConnection();
                  };

                  this.socket.onerror = (error) => {
                    const { lastError } = this;
                    this.lastError = error;
                    if (lastError) return;
                    console.log(
                      "stream error",
                      error,
                      new Date().toDateString()
                    );
                  };

                  this.socket.onheartbeat = () => {
                    this.lastError = null;

                    this._heartbeat_received();
                  };

                  if (this.connectionTimer) clearTimeout(this.connectionTimer);
                  this.connectionTimer = setTimeout(() => {
                    this._lostConnection(
                      new this.ConnectionError("DDP connection timed out")
                    );
                  }, this.CONNECT_TIMEOUT);
                }
              }
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "common.js": function module(_require3, _exports2, _module2) {
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                                     //
              // packages/socket-stream-client/common.js                                                                             //
              //                                                                                                                     //
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              let _objectSpread;

              _module2.link(
                "@babel/runtime/helpers/objectSpread2",
                {
                  default(v) {
                    _objectSpread = v;
                  },
                },
                0
              );
              _module2.export({
                StreamClientCommon: () => StreamClientCommon,
              });
              let Retry;
              _module2.link(
                "meteor/retry",
                {
                  Retry(v) {
                    Retry = v;
                  },
                },
                0
              );
              const forcedReconnectError = new Error("forced reconnect");

              class StreamClientCommon {
                constructor(options) {
                  this.options = _objectSpread(
                    {
                      retry: true,
                    },
                    options || null
                  );
                  this.ConnectionError =
                    (options && options.ConnectionError) || Error;
                } // Register for callbacks.

                on(name, callback) {
                  if (
                    name !== "message" &&
                    name !== "reset" &&
                    name !== "disconnect"
                  )
                    throw new Error("unknown event type: " + name);
                  if (!this.eventCallbacks[name])
                    this.eventCallbacks[name] = [];
                  this.eventCallbacks[name].push(callback);
                }

                forEachCallback(name, cb) {
                  if (
                    !this.eventCallbacks[name] ||
                    !this.eventCallbacks[name].length
                  ) {
                    return;
                  }

                  this.eventCallbacks[name].forEach(cb);
                }

                _initCommon(options) {
                  options = options || Object.create(null); //// Constants
                  // how long to wait until we declare the connection attempt
                  // failed.

                  this.CONNECT_TIMEOUT = options.connectTimeoutMs || 10000;
                  this.eventCallbacks = Object.create(null); // name -> [callback]

                  this._forcedToDisconnect = false; //// Reactive status

                  this.currentStatus = {
                    status: "connecting",
                    connected: false,
                    retryCount: 0,
                  };

                  if (Package.tracker) {
                    this.statusListeners = new Package.tracker.Tracker.Dependency();
                  }

                  this.statusChanged = () => {
                    if (this.statusListeners) {
                      this.statusListeners.changed();
                    }
                  }; //// Retry logic

                  this._retry = new Retry();
                  this.connectionTimer = null;
                } // Trigger a reconnect.

                reconnect(options) {
                  options = options || Object.create(null);

                  if (options.url) {
                    this._changeUrl(options.url);
                  }

                  if (options._sockjsOptions) {
                    this.options._sockjsOptions = options._sockjsOptions;
                  }

                  if (this.currentStatus.connected) {
                    if (options._force || options.url) {
                      this._lostConnection(forcedReconnectError);
                    }

                    return;
                  } // if we're mid-connection, stop it.

                  if (this.currentStatus.status === "connecting") {
                    // Pretend it's a clean close.
                    this._lostConnection();
                  }

                  this._retry.clear();

                  this.currentStatus.retryCount -= 1; // don't count manual retries

                  this._retryNow();
                }

                disconnect(options) {
                  options = options || Object.create(null); // Failed is permanent. If we're failed, don't let people go back
                  // online by calling 'disconnect' then 'reconnect'.

                  if (this._forcedToDisconnect) return; // If _permanent is set, permanently disconnect a stream. Once a stream
                  // is forced to disconnect, it can never reconnect. This is for
                  // error cases such as ddp version mismatch, where trying again
                  // won't fix the problem.

                  if (options._permanent) {
                    this._forcedToDisconnect = true;
                  }

                  this._cleanup();

                  this._retry.clear();

                  this.currentStatus = {
                    status: options._permanent ? "failed" : "offline",
                    connected: false,
                    retryCount: 0,
                  };
                  if (options._permanent && options._error)
                    this.currentStatus.reason = options._error;
                  this.statusChanged();
                } // maybeError is set unless it's a clean protocol-level close.

                _lostConnection(maybeError) {
                  this._cleanup(maybeError);

                  this._retryLater(maybeError); // sets status. no need to do it here.
                } // fired when we detect that we've gone online. try to reconnect
                // immediately.

                _online() {
                  // if we've requested to be offline by disconnecting, don't reconnect.
                  if (this.currentStatus.status != "offline") this.reconnect();
                }

                _retryLater(maybeError) {
                  var timeout = 0;

                  if (
                    this.options.retry ||
                    maybeError === forcedReconnectError
                  ) {
                    timeout = this._retry.retryLater(
                      this.currentStatus.retryCount,
                      this._retryNow.bind(this)
                    );
                    this.currentStatus.status = "waiting";
                    this.currentStatus.retryTime =
                      new Date().getTime() + timeout;
                  } else {
                    this.currentStatus.status = "failed";
                    delete this.currentStatus.retryTime;
                  }

                  this.currentStatus.connected = false;
                  this.statusChanged();
                }

                _retryNow() {
                  if (this._forcedToDisconnect) return;
                  this.currentStatus.retryCount += 1;
                  this.currentStatus.status = "connecting";
                  this.currentStatus.connected = false;
                  delete this.currentStatus.retryTime;
                  this.statusChanged();

                  this._launchConnection();
                } // Get current status. Reactive.

                status() {
                  if (this.statusListeners) {
                    this.statusListeners.depend();
                  }

                  return this.currentStatus;
                }
              }
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "sockjs-0.3.4.js": function _module3(_require4) {
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                                     //
              // packages/socket-stream-client/sockjs-0.3.4.js                                                                       //
              //                                                                                                                     //
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              // XXX METEOR changes in <METEOR>

              /* SockJS client, version 0.3.4, http://sockjs.org, MIT License

            Copyright (c) 2011-2012 VMware, Inc.

            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:

            The above copyright notice and this permission notice shall be included in
            all copies or substantial portions of the Software.

            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
            THE SOFTWARE.
            */
              // <METEOR> Commented out JSO implementation (use json package instead).
              // JSON2 by Douglas Crockford (minified).
              // var JSON;JSON||(JSON={}),function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g;return e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver=="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")})}()
              // </METEOR>
              //     [*] Including lib/index.js
              // Public object
              SockJS = (function () {
                var _document = document;
                var _window = window;
                var utils = {}; //         [*] Including lib/reventtarget.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                /* Simplified implementation of DOM2 EventTarget.
                 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
                 */

                var REventTarget = function () {};

                REventTarget.prototype.addEventListener = function (
                  eventType,
                  listener
                ) {
                  if (!this._listeners) {
                    this._listeners = {};
                  }

                  if (!(eventType in this._listeners)) {
                    this._listeners[eventType] = [];
                  }

                  var arr = this._listeners[eventType];

                  if (utils.arrIndexOf(arr, listener) === -1) {
                    arr.push(listener);
                  }

                  return;
                };

                REventTarget.prototype.removeEventListener = function (
                  eventType,
                  listener
                ) {
                  if (!(this._listeners && eventType in this._listeners)) {
                    return;
                  }

                  var arr = this._listeners[eventType];
                  var idx = utils.arrIndexOf(arr, listener);

                  if (idx !== -1) {
                    if (arr.length > 1) {
                      this._listeners[eventType] = arr
                        .slice(0, idx)
                        .concat(arr.slice(idx + 1));
                    } else {
                      delete this._listeners[eventType];
                    }

                    return;
                  }

                  return;
                };

                REventTarget.prototype.dispatchEvent = function (event) {
                  var t = event.type;
                  var args = Array.prototype.slice.call(arguments, 0);

                  if (this["on" + t]) {
                    this["on" + t].apply(this, args);
                  }

                  if (this._listeners && t in this._listeners) {
                    for (var i = 0; i < this._listeners[t].length; i++) {
                      this._listeners[t][i].apply(this, args);
                    }
                  }
                }; //         [*] End of lib/reventtarget.js
                //         [*] Including lib/simpleevent.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var SimpleEvent = function (type, obj) {
                  this.type = type;

                  if (typeof obj !== "undefined") {
                    for (var k in obj) {
                      if (!obj.hasOwnProperty(k)) continue;
                      this[k] = obj[k];
                    }
                  }
                };

                SimpleEvent.prototype.toString = function () {
                  var r = [];

                  for (var k in this) {
                    if (!this.hasOwnProperty(k)) continue;
                    var v = this[k];
                    if (typeof v === "function") v = "[function]";
                    r.push(k + "=" + v);
                  }

                  return "SimpleEvent(" + r.join(", ") + ")";
                }; //         [*] End of lib/simpleevent.js
                //         [*] Including lib/eventemitter.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var EventEmitter = function (events) {
                  var that = this;
                  that._events = events || [];
                  that._listeners = {};
                };

                EventEmitter.prototype.emit = function (type) {
                  var that = this;

                  that._verifyType(type);

                  if (that._nuked) return;
                  var args = Array.prototype.slice.call(arguments, 1);

                  if (that["on" + type]) {
                    that["on" + type].apply(that, args);
                  }

                  if (type in that._listeners) {
                    for (var i = 0; i < that._listeners[type].length; i++) {
                      that._listeners[type][i].apply(that, args);
                    }
                  }
                };

                EventEmitter.prototype.on = function (type, callback) {
                  var that = this;

                  that._verifyType(type);

                  if (that._nuked) return;

                  if (!(type in that._listeners)) {
                    that._listeners[type] = [];
                  }

                  that._listeners[type].push(callback);
                };

                EventEmitter.prototype._verifyType = function (type) {
                  var that = this;

                  if (utils.arrIndexOf(that._events, type) === -1) {
                    utils.log(
                      "Event " +
                        JSON.stringify(type) +
                        " not listed " +
                        JSON.stringify(that._events) +
                        " in " +
                        that
                    );
                  }
                };

                EventEmitter.prototype.nuke = function () {
                  var that = this;
                  that._nuked = true;

                  for (var i = 0; i < that._events.length; i++) {
                    delete that[that._events[i]];
                  }

                  that._listeners = {};
                }; //         [*] End of lib/eventemitter.js
                //         [*] Including lib/utils.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var random_string_chars =
                  "abcdefghijklmnopqrstuvwxyz0123456789_";

                utils.random_string = function (length, max) {
                  max = max || random_string_chars.length;
                  var i,
                    ret = [];

                  for (i = 0; i < length; i++) {
                    ret.push(
                      random_string_chars.substr(
                        Math.floor(Math.random() * max),
                        1
                      )
                    );
                  }

                  return ret.join("");
                };

                utils.random_number = function (max) {
                  return Math.floor(Math.random() * max);
                };

                utils.random_number_string = function (max) {
                  var t = ("" + (max - 1)).length;
                  var p = Array(t + 1).join("0");
                  return (p + utils.random_number(max)).slice(-t);
                }; // Assuming that url looks like: http://asdasd:111/asd

                utils.getOrigin = function (url) {
                  url += "/";
                  var parts = url.split("/").slice(0, 3);
                  return parts.join("/");
                };

                utils.isSameOriginUrl = function (url_a, url_b) {
                  // location.origin would do, but it's not always available.
                  if (!url_b) url_b = _window.location.href;
                  return (
                    url_a.split("/").slice(0, 3).join("/") ===
                    url_b.split("/").slice(0, 3).join("/")
                  );
                }; // <METEOR>
                // https://github.com/sockjs/sockjs-client/issues/79

                utils.isSameOriginScheme = function (url_a, url_b) {
                  if (!url_b) url_b = _window.location.href;
                  return url_a.split(":")[0] === url_b.split(":")[0];
                }; // </METEOR>

                utils.getParentDomain = function (url) {
                  // ipv4 ip address
                  if (/^[0-9.]*$/.test(url)) return url; // ipv6 ip address

                  if (/^\[/.test(url)) return url; // no dots

                  if (!/[.]/.test(url)) return url;
                  var parts = url.split(".").slice(1);
                  return parts.join(".");
                };

                utils.objectExtend = function (dst, src) {
                  for (var k in src) {
                    if (src.hasOwnProperty(k)) {
                      dst[k] = src[k];
                    }
                  }

                  return dst;
                };

                var WPrefix = "_jp";

                utils.polluteGlobalNamespace = function () {
                  if (!(WPrefix in _window)) {
                    _window[WPrefix] = {};
                  }
                };

                utils.closeFrame = function (code, reason) {
                  return "c" + JSON.stringify([code, reason]);
                };

                utils.userSetCode = function (code) {
                  return code === 1000 || (code >= 3000 && code <= 4999);
                }; // See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
                // and RFC 2988.

                utils.countRTO = function (rtt) {
                  var rto;

                  if (rtt > 100) {
                    rto = 3 * rtt; // rto > 300msec
                  } else {
                    rto = rtt + 200; // 200msec < rto <= 300msec
                  }

                  return rto;
                };

                utils.log = function () {
                  if (_window.console && console.log && console.log.apply) {
                    console.log.apply(console, arguments);
                  }
                };

                utils.debug = function () {
                  if (_window.console && console.debug && console.debug.apply) {
                    console.debug.apply(console, arguments);
                  }
                };

                utils.bind = function (fun, that) {
                  if (fun.bind) {
                    return fun.bind(that);
                  } else {
                    return function () {
                      return fun.apply(that, arguments);
                    };
                  }
                };

                utils.flatUrl = function (url) {
                  return url.indexOf("?") === -1 && url.indexOf("#") === -1;
                }; // `relativeTo` is an optional absolute URL. If provided, `url` will be
                // interpreted relative to `relativeTo`. Defaults to `document.location`.
                // <METEOR>

                utils.amendUrl = function (url, relativeTo) {
                  var baseUrl;

                  if (relativeTo === undefined) {
                    baseUrl = _document.location;
                  } else {
                    var protocolMatch = /^([a-z0-9.+-]+:)/i.exec(relativeTo);

                    if (protocolMatch) {
                      var protocol = protocolMatch[0].toLowerCase();
                      var rest = relativeTo.substring(protocol.length);
                      var hostMatch = /[a-z0-9\.-]+(:[0-9]+)?/.exec(rest);
                      if (hostMatch) var host = hostMatch[0];
                    }

                    if (!protocol || !host)
                      throw new Error("relativeTo must be an absolute url");
                    baseUrl = {
                      protocol: protocol,
                      host: host,
                    };
                  }

                  if (!url) {
                    throw new Error("Wrong url for SockJS");
                  }

                  if (!utils.flatUrl(url)) {
                    throw new Error("Only basic urls are supported in SockJS");
                  } //  '//abc' --> 'http://abc'

                  if (url.indexOf("//") === 0) {
                    url = baseUrl.protocol + url;
                  } // '/abc' --> 'http://localhost:1234/abc'

                  if (url.indexOf("/") === 0) {
                    url = baseUrl.protocol + "//" + baseUrl.host + url;
                  } // </METEOR>
                  // strip trailing slashes

                  url = url.replace(/[/]+$/, ""); // We have a full url here, with proto and host. For some browsers
                  // http://localhost:80/ is not in the same origin as http://localhost/
                  // Remove explicit :80 or :443 in such cases. See #74

                  var parts = url.split("/");

                  if (
                    (parts[0] === "http:" && /:80$/.test(parts[2])) ||
                    (parts[0] === "https:" && /:443$/.test(parts[2]))
                  ) {
                    parts[2] = parts[2].replace(/:(80|443)$/, "");
                  }

                  url = parts.join("/");
                  return url;
                }; // IE doesn't support [].indexOf.

                utils.arrIndexOf = function (arr, obj) {
                  for (var i = 0; i < arr.length; i++) {
                    if (arr[i] === obj) {
                      return i;
                    }
                  }

                  return -1;
                };

                utils.arrSkip = function (arr, obj) {
                  var idx = utils.arrIndexOf(arr, obj);

                  if (idx === -1) {
                    return arr.slice();
                  } else {
                    var dst = arr.slice(0, idx);
                    return dst.concat(arr.slice(idx + 1));
                  }
                }; // Via: https://gist.github.com/1133122/2121c601c5549155483f50be3da5305e83b8c5df

                utils.isArray =
                  Array.isArray ||
                  function (value) {
                    return {}.toString.call(value).indexOf("Array") >= 0;
                  };

                utils.delay = function (t, fun) {
                  if (typeof t === "function") {
                    fun = t;
                    t = 0;
                  }

                  return setTimeout(fun, t);
                }; // Chars worth escaping, as defined by Douglas Crockford:
                //   https://github.com/douglascrockford/JSON-js/blob/47a9882cddeb1e8529e07af9736218075372b8ac/json2.js#L196

                var json_escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                  json_lookup = {
                    "\0": "\\u0000",
                    "\x01": "\\u0001",
                    "\x02": "\\u0002",
                    "\x03": "\\u0003",
                    "\x04": "\\u0004",
                    "\x05": "\\u0005",
                    "\x06": "\\u0006",
                    "\x07": "\\u0007",
                    "\b": "\\b",
                    "\t": "\\t",
                    "\n": "\\n",
                    "\x0B": "\\u000b",
                    "\f": "\\f",
                    "\r": "\\r",
                    "\x0E": "\\u000e",
                    "\x0F": "\\u000f",
                    "\x10": "\\u0010",
                    "\x11": "\\u0011",
                    "\x12": "\\u0012",
                    "\x13": "\\u0013",
                    "\x14": "\\u0014",
                    "\x15": "\\u0015",
                    "\x16": "\\u0016",
                    "\x17": "\\u0017",
                    "\x18": "\\u0018",
                    "\x19": "\\u0019",
                    "\x1A": "\\u001a",
                    "\x1B": "\\u001b",
                    "\x1C": "\\u001c",
                    "\x1D": "\\u001d",
                    "\x1E": "\\u001e",
                    "\x1F": "\\u001f",
                    '"': '\\"',
                    "\\": "\\\\",
                    "\x7F": "\\u007f",
                    "\x80": "\\u0080",
                    "\x81": "\\u0081",
                    "\x82": "\\u0082",
                    "\x83": "\\u0083",
                    "\x84": "\\u0084",
                    "\x85": "\\u0085",
                    "\x86": "\\u0086",
                    "\x87": "\\u0087",
                    "\x88": "\\u0088",
                    "\x89": "\\u0089",
                    "\x8A": "\\u008a",
                    "\x8B": "\\u008b",
                    "\x8C": "\\u008c",
                    "\x8D": "\\u008d",
                    "\x8E": "\\u008e",
                    "\x8F": "\\u008f",
                    "\x90": "\\u0090",
                    "\x91": "\\u0091",
                    "\x92": "\\u0092",
                    "\x93": "\\u0093",
                    "\x94": "\\u0094",
                    "\x95": "\\u0095",
                    "\x96": "\\u0096",
                    "\x97": "\\u0097",
                    "\x98": "\\u0098",
                    "\x99": "\\u0099",
                    "\x9A": "\\u009a",
                    "\x9B": "\\u009b",
                    "\x9C": "\\u009c",
                    "\x9D": "\\u009d",
                    "\x9E": "\\u009e",
                    "\x9F": "\\u009f",
                    "\xAD": "\\u00ad",
                    "\u0600": "\\u0600",
                    "\u0601": "\\u0601",
                    "\u0602": "\\u0602",
                    "\u0603": "\\u0603",
                    "\u0604": "\\u0604",
                    "\u070F": "\\u070f",
                    "\u17B4": "\\u17b4",
                    "\u17B5": "\\u17b5",
                    "\u200C": "\\u200c",
                    "\u200D": "\\u200d",
                    "\u200E": "\\u200e",
                    "\u200F": "\\u200f",
                    "\u2028": "\\u2028",
                    "\u2029": "\\u2029",
                    "\u202A": "\\u202a",
                    "\u202B": "\\u202b",
                    "\u202C": "\\u202c",
                    "\u202D": "\\u202d",
                    "\u202E": "\\u202e",
                    "\u202F": "\\u202f",
                    "\u2060": "\\u2060",
                    "\u2061": "\\u2061",
                    "\u2062": "\\u2062",
                    "\u2063": "\\u2063",
                    "\u2064": "\\u2064",
                    "\u2065": "\\u2065",
                    "\u2066": "\\u2066",
                    "\u2067": "\\u2067",
                    "\u2068": "\\u2068",
                    "\u2069": "\\u2069",
                    "\u206A": "\\u206a",
                    "\u206B": "\\u206b",
                    "\u206C": "\\u206c",
                    "\u206D": "\\u206d",
                    "\u206E": "\\u206e",
                    "\u206F": "\\u206f",
                    "\uFEFF": "\\ufeff",
                    "\uFFF0": "\\ufff0",
                    "\uFFF1": "\\ufff1",
                    "\uFFF2": "\\ufff2",
                    "\uFFF3": "\\ufff3",
                    "\uFFF4": "\\ufff4",
                    "\uFFF5": "\\ufff5",
                    "\uFFF6": "\\ufff6",
                    "\uFFF7": "\\ufff7",
                    "\uFFF8": "\\ufff8",
                    "\uFFF9": "\\ufff9",
                    "\uFFFA": "\\ufffa",
                    "\uFFFB": "\\ufffb",
                    "\uFFFC": "\\ufffc",
                    "\uFFFD": "\\ufffd",
                    "\uFFFE": "\\ufffe",
                    "\uFFFF": "\\uffff",
                  }; // Some extra characters that Chrome gets wrong, and substitutes with
                // something else on the wire.

                var extra_escapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,
                  extra_lookup; // JSON Quote string. Use native implementation when possible.

                var JSONQuote =
                  (JSON && JSON.stringify) ||
                  function (string) {
                    json_escapable.lastIndex = 0;

                    if (json_escapable.test(string)) {
                      string = string.replace(json_escapable, function (a) {
                        return json_lookup[a];
                      });
                    }

                    return '"' + string + '"';
                  }; // This may be quite slow, so let's delay until user actually uses bad
                // characters.

                var unroll_lookup = function (escapable) {
                  var i;
                  var unrolled = {};
                  var c = [];

                  for (i = 0; i < 65536; i++) {
                    c.push(String.fromCharCode(i));
                  }

                  escapable.lastIndex = 0;
                  c.join("").replace(escapable, function (a) {
                    unrolled[a] =
                      "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                    return "";
                  });
                  escapable.lastIndex = 0;
                  return unrolled;
                }; // Quote string, also taking care of unicode characters that browsers
                // often break. Especially, take care of unicode surrogates:
                //    http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates

                utils.quote = function (string) {
                  var quoted = JSONQuote(string); // In most cases this should be very fast and good enough.

                  extra_escapable.lastIndex = 0;

                  if (!extra_escapable.test(quoted)) {
                    return quoted;
                  }

                  if (!extra_lookup)
                    extra_lookup = unroll_lookup(extra_escapable);
                  return quoted.replace(extra_escapable, function (a) {
                    return extra_lookup[a];
                  });
                };

                var _all_protocols = [
                  "websocket",
                  "xdr-streaming",
                  "xhr-streaming",
                  "iframe-eventsource",
                  "iframe-htmlfile",
                  "xdr-polling",
                  "xhr-polling",
                  "iframe-xhr-polling",
                  "jsonp-polling",
                ];

                utils.probeProtocols = function () {
                  var probed = {};

                  for (var i = 0; i < _all_protocols.length; i++) {
                    var protocol = _all_protocols[i]; // User can have a typo in protocol name.

                    probed[protocol] =
                      SockJS[protocol] && SockJS[protocol].enabled();
                  }

                  return probed;
                };

                utils.detectProtocols = function (
                  probed,
                  protocols_whitelist,
                  info
                ) {
                  var pe = {},
                    protocols = [];
                  if (!protocols_whitelist)
                    protocols_whitelist = _all_protocols;

                  for (var i = 0; i < protocols_whitelist.length; i++) {
                    var protocol = protocols_whitelist[i];
                    pe[protocol] = probed[protocol];
                  }

                  var maybe_push = function (protos) {
                    var proto = protos.shift();

                    if (pe[proto]) {
                      protocols.push(proto);
                    } else {
                      if (protos.length > 0) {
                        maybe_push(protos);
                      }
                    }
                  }; // 1. Websocket

                  if (info.websocket !== false) {
                    maybe_push(["websocket"]);
                  } // 2. Streaming

                  if (pe["xhr-streaming"] && !info.null_origin) {
                    protocols.push("xhr-streaming");
                  } else {
                    if (
                      pe["xdr-streaming"] &&
                      !info.cookie_needed &&
                      !info.null_origin
                    ) {
                      protocols.push("xdr-streaming");
                    } else {
                      maybe_push(["iframe-eventsource", "iframe-htmlfile"]);
                    }
                  } // 3. Polling

                  if (pe["xhr-polling"] && !info.null_origin) {
                    protocols.push("xhr-polling");
                  } else {
                    if (
                      pe["xdr-polling"] &&
                      !info.cookie_needed &&
                      !info.null_origin
                    ) {
                      protocols.push("xdr-polling");
                    } else {
                      maybe_push(["iframe-xhr-polling", "jsonp-polling"]);
                    }
                  }

                  return protocols;
                }; //         [*] End of lib/utils.js
                //         [*] Including lib/dom.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */
                // May be used by htmlfile jsonp and transports.

                var MPrefix = "_sockjs_global";

                utils.createHook = function () {
                  var window_id = "a" + utils.random_string(8);

                  if (!(MPrefix in _window)) {
                    var map = {};

                    _window[MPrefix] = function (window_id) {
                      if (!(window_id in map)) {
                        map[window_id] = {
                          id: window_id,
                          del: function () {
                            delete map[window_id];
                          },
                        };
                      }

                      return map[window_id];
                    };
                  }

                  return _window[MPrefix](window_id);
                };

                utils.attachMessage = function (listener) {
                  utils.attachEvent("message", listener);
                };

                utils.attachEvent = function (event, listener) {
                  if (typeof _window.addEventListener !== "undefined") {
                    _window.addEventListener(event, listener, false);
                  } else {
                    // IE quirks.
                    // According to: http://stevesouders.com/misc/test-postmessage.php
                    // the message gets delivered only to 'document', not 'window'.
                    _document.attachEvent("on" + event, listener); // I get 'window' for ie8.

                    _window.attachEvent("on" + event, listener);
                  }
                };

                utils.detachMessage = function (listener) {
                  utils.detachEvent("message", listener);
                };

                utils.detachEvent = function (event, listener) {
                  if (typeof _window.addEventListener !== "undefined") {
                    _window.removeEventListener(event, listener, false);
                  } else {
                    _document.detachEvent("on" + event, listener);

                    _window.detachEvent("on" + event, listener);
                  }
                };

                var on_unload = {}; // Things registered after beforeunload are to be called immediately.

                var after_unload = false;

                var trigger_unload_callbacks = function () {
                  for (var ref in on_unload) {
                    on_unload[ref]();
                    delete on_unload[ref];
                  }
                };

                var unload_triggered = function () {
                  if (after_unload) return;
                  after_unload = true;
                  trigger_unload_callbacks();
                }; // 'unload' alone is not reliable in opera within an iframe, but we
                // can't use `beforeunload` as IE fires it on javascript: links.

                utils.attachEvent("unload", unload_triggered);

                utils.unload_add = function (listener) {
                  var ref = utils.random_string(8);
                  on_unload[ref] = listener;

                  if (after_unload) {
                    utils.delay(trigger_unload_callbacks);
                  }

                  return ref;
                };

                utils.unload_del = function (ref) {
                  if (ref in on_unload) delete on_unload[ref];
                };

                utils.createIframe = function (iframe_url, error_callback) {
                  var iframe = _document.createElement("iframe");

                  var tref, unload_ref;

                  var unattach = function () {
                    clearTimeout(tref); // Explorer had problems with that.

                    try {
                      iframe.onload = null;
                    } catch (x) {}

                    iframe.onerror = null;
                  };

                  var cleanup = function () {
                    if (iframe) {
                      unattach(); // This timeout makes chrome fire onbeforeunload event
                      // within iframe. Without the timeout it goes straight to
                      // onunload.

                      setTimeout(function () {
                        if (iframe) {
                          iframe.parentNode.removeChild(iframe);
                        }

                        iframe = null;
                      }, 0);
                      utils.unload_del(unload_ref);
                    }
                  };

                  var onerror = function (r) {
                    if (iframe) {
                      cleanup();
                      error_callback(r);
                    }
                  };

                  var post = function (msg, origin) {
                    try {
                      // When the iframe is not loaded, IE raises an exception
                      // on 'contentWindow'.
                      if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage(msg, origin);
                      }
                    } catch (x) {}
                  };

                  iframe.src = iframe_url;
                  iframe.style.display = "none";
                  iframe.style.position = "absolute";

                  iframe.onerror = function () {
                    onerror("onerror");
                  };

                  iframe.onload = function () {
                    // `onload` is triggered before scripts on the iframe are
                    // executed. Give it few seconds to actually load stuff.
                    clearTimeout(tref);
                    tref = setTimeout(function () {
                      onerror("onload timeout");
                    }, 2000);
                  };

                  _document.body.appendChild(iframe);

                  tref = setTimeout(function () {
                    onerror("timeout");
                  }, 15000);
                  unload_ref = utils.unload_add(cleanup);
                  return {
                    post: post,
                    cleanup: cleanup,
                    loaded: unattach,
                  };
                };

                utils.createHtmlfile = function (iframe_url, error_callback) {
                  var doc = new ActiveXObject("htmlfile");
                  var tref, unload_ref;
                  var iframe;

                  var unattach = function () {
                    clearTimeout(tref);
                  };

                  var cleanup = function () {
                    if (doc) {
                      unattach();
                      utils.unload_del(unload_ref);
                      iframe.parentNode.removeChild(iframe);
                      iframe = doc = null;
                      CollectGarbage();
                    }
                  };

                  var onerror = function (r) {
                    if (doc) {
                      cleanup();
                      error_callback(r);
                    }
                  };

                  var post = function (msg, origin) {
                    try {
                      // When the iframe is not loaded, IE raises an exception
                      // on 'contentWindow'.
                      if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage(msg, origin);
                      }
                    } catch (x) {}
                  };

                  doc.open();
                  doc.write(
                    "<html><s" +
                      "cript>" +
                      'document.domain="' +
                      document.domain +
                      '";' +
                      "</s" +
                      "cript></html>"
                  );
                  doc.close();
                  doc.parentWindow[WPrefix] = _window[WPrefix];
                  var c = doc.createElement("div");
                  doc.body.appendChild(c);
                  iframe = doc.createElement("iframe");
                  c.appendChild(iframe);
                  iframe.src = iframe_url;
                  tref = setTimeout(function () {
                    onerror("timeout");
                  }, 15000);
                  unload_ref = utils.unload_add(cleanup);
                  return {
                    post: post,
                    cleanup: cleanup,
                    loaded: unattach,
                  };
                }; //         [*] End of lib/dom.js
                //         [*] Including lib/dom2.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var AbstractXHRObject = function () {};

                AbstractXHRObject.prototype = new EventEmitter([
                  "chunk",
                  "finish",
                ]);

                AbstractXHRObject.prototype._start = function (
                  method,
                  url,
                  payload,
                  opts
                ) {
                  var that = this;

                  try {
                    that.xhr = new XMLHttpRequest();
                  } catch (x) {}

                  if (!that.xhr) {
                    try {
                      that.xhr = new _window.ActiveXObject("Microsoft.XMLHTTP");
                    } catch (x) {}
                  }

                  if (_window.ActiveXObject || _window.XDomainRequest) {
                    // IE8 caches even POSTs
                    url +=
                      (url.indexOf("?") === -1 ? "?" : "&") +
                      "t=" +
                      +new Date();
                  } // Explorer tends to keep connection open, even after the
                  // tab gets closed: http://bugs.jquery.com/ticket/5280

                  that.unload_ref = utils.unload_add(function () {
                    that._cleanup(true);
                  });

                  try {
                    that.xhr.open(method, url, true);
                  } catch (e) {
                    // IE raises an exception on wrong port.
                    that.emit("finish", 0, "");

                    that._cleanup();

                    return;
                  }

                  if (!opts || !opts.no_credentials) {
                    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
                    // "This never affects same-site requests."
                    that.xhr.withCredentials = "true";
                  }

                  if (opts && opts.headers) {
                    for (var key in opts.headers) {
                      that.xhr.setRequestHeader(key, opts.headers[key]);
                    }
                  }

                  that.xhr.onreadystatechange = function () {
                    if (that.xhr) {
                      var x = that.xhr;

                      switch (x.readyState) {
                        case 3:
                          // IE doesn't like peeking into responseText or status
                          // on Microsoft.XMLHTTP and readystate=3
                          try {
                            var status = x.status;
                            var text = x.responseText;
                          } catch (x) {} // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450

                          if (status === 1223) status = 204; // IE does return readystate == 3 for 404 answers.

                          if (text && text.length > 0) {
                            that.emit("chunk", status, text);
                          }

                          break;

                        case 4:
                          var status = x.status; // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450

                          if (status === 1223) status = 204;
                          that.emit("finish", status, x.responseText);

                          that._cleanup(false);

                          break;
                      }
                    }
                  };

                  that.xhr.send(payload);
                };

                AbstractXHRObject.prototype._cleanup = function (abort) {
                  var that = this;
                  if (!that.xhr) return;
                  utils.unload_del(that.unload_ref); // IE needs this field to be a function

                  that.xhr.onreadystatechange = function () {};

                  if (abort) {
                    try {
                      that.xhr.abort();
                    } catch (x) {}
                  }

                  that.unload_ref = that.xhr = null;
                };

                AbstractXHRObject.prototype.close = function () {
                  var that = this;
                  that.nuke();

                  that._cleanup(true);
                };

                var XHRCorsObject = (utils.XHRCorsObject = function () {
                  var that = this,
                    args = arguments;
                  utils.delay(function () {
                    that._start.apply(that, args);
                  });
                });

                XHRCorsObject.prototype = new AbstractXHRObject();

                var XHRLocalObject = (utils.XHRLocalObject = function (
                  method,
                  url,
                  payload
                ) {
                  var that = this;
                  utils.delay(function () {
                    that._start(method, url, payload, {
                      no_credentials: true,
                    });
                  });
                });

                XHRLocalObject.prototype = new AbstractXHRObject(); // References:
                //   http://ajaxian.com/archives/100-line-ajax-wrapper
                //   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

                var XDRObject = (utils.XDRObject = function (
                  method,
                  url,
                  payload
                ) {
                  var that = this;
                  utils.delay(function () {
                    that._start(method, url, payload);
                  });
                });

                XDRObject.prototype = new EventEmitter(["chunk", "finish"]);

                XDRObject.prototype._start = function (method, url, payload) {
                  var that = this;
                  var xdr = new XDomainRequest(); // IE caches even POSTs

                  url +=
                    (url.indexOf("?") === -1 ? "?" : "&") + "t=" + +new Date();

                  var onerror = (xdr.ontimeout = xdr.onerror = function () {
                    that.emit("finish", 0, "");

                    that._cleanup(false);
                  });

                  xdr.onprogress = function () {
                    that.emit("chunk", 200, xdr.responseText);
                  };

                  xdr.onload = function () {
                    that.emit("finish", 200, xdr.responseText);

                    that._cleanup(false);
                  };

                  that.xdr = xdr;
                  that.unload_ref = utils.unload_add(function () {
                    that._cleanup(true);
                  });

                  try {
                    // Fails with AccessDenied if port number is bogus
                    that.xdr.open(method, url);
                    that.xdr.send(payload);
                  } catch (x) {
                    onerror();
                  }
                };

                XDRObject.prototype._cleanup = function (abort) {
                  var that = this;
                  if (!that.xdr) return;
                  utils.unload_del(that.unload_ref);
                  that.xdr.ontimeout = that.xdr.onerror = that.xdr.onprogress = that.xdr.onload = null;

                  if (abort) {
                    try {
                      that.xdr.abort();
                    } catch (x) {}
                  }

                  that.unload_ref = that.xdr = null;
                };

                XDRObject.prototype.close = function () {
                  var that = this;
                  that.nuke();

                  that._cleanup(true);
                }; // 1. Is natively via XHR
                // 2. Is natively via XDR
                // 3. Nope, but postMessage is there so it should work via the Iframe.
                // 4. Nope, sorry.

                utils.isXHRCorsCapable = function () {
                  if (
                    _window.XMLHttpRequest &&
                    "withCredentials" in new XMLHttpRequest()
                  ) {
                    return 1;
                  } // XDomainRequest doesn't work if page is served from file://

                  if (_window.XDomainRequest && _document.domain) {
                    return 2;
                  }

                  if (IframeTransport.enabled()) {
                    return 3;
                  }

                  return 4;
                }; //         [*] End of lib/dom2.js
                //         [*] Including lib/sockjs.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var SockJS = function (url, dep_protocols_whitelist, options) {
                  if (!(this instanceof SockJS)) {
                    // makes `new` optional
                    return new SockJS(url, dep_protocols_whitelist, options);
                  }

                  var that = this,
                    protocols_whitelist;
                  that._options = {
                    devel: false,
                    debug: false,
                    protocols_whitelist: [],
                    info: undefined,
                    rtt: undefined,
                  };

                  if (options) {
                    utils.objectExtend(that._options, options);
                  }

                  that._base_url = utils.amendUrl(url);
                  that._server =
                    that._options.server || utils.random_number_string(1000);

                  if (
                    that._options.protocols_whitelist &&
                    that._options.protocols_whitelist.length
                  ) {
                    protocols_whitelist = that._options.protocols_whitelist;
                  } else {
                    // Deprecated API
                    if (
                      typeof dep_protocols_whitelist === "string" &&
                      dep_protocols_whitelist.length > 0
                    ) {
                      protocols_whitelist = [dep_protocols_whitelist];
                    } else if (utils.isArray(dep_protocols_whitelist)) {
                      protocols_whitelist = dep_protocols_whitelist;
                    } else {
                      protocols_whitelist = null;
                    }

                    if (protocols_whitelist) {
                      that._debug(
                        'Deprecated API: Use "protocols_whitelist" option ' +
                          "instead of supplying protocol list as a second " +
                          "parameter to SockJS constructor."
                      );
                    }
                  }

                  that._protocols = [];
                  that.protocol = null;
                  that.readyState = SockJS.CONNECTING;
                  that._ir = createInfoReceiver(that._base_url);

                  that._ir.onfinish = function (info, rtt) {
                    that._ir = null;

                    if (info) {
                      if (that._options.info) {
                        // Override if user supplies the option
                        info = utils.objectExtend(info, that._options.info);
                      }

                      if (that._options.rtt) {
                        rtt = that._options.rtt;
                      }

                      that._applyInfo(info, rtt, protocols_whitelist);

                      that._didClose();
                    } else {
                      that._didClose(1002, "Can't connect to server", true);
                    }
                  };
                }; // Inheritance

                SockJS.prototype = new REventTarget();
                SockJS.version = "0.3.4";
                SockJS.CONNECTING = 0;
                SockJS.OPEN = 1;
                SockJS.CLOSING = 2;
                SockJS.CLOSED = 3;

                SockJS.prototype._debug = function () {
                  if (this._options.debug) utils.log.apply(utils, arguments);
                };

                SockJS.prototype._dispatchOpen = function () {
                  var that = this;

                  if (that.readyState === SockJS.CONNECTING) {
                    if (that._transport_tref) {
                      clearTimeout(that._transport_tref);
                      that._transport_tref = null;
                    }

                    that.readyState = SockJS.OPEN;
                    that.dispatchEvent(new SimpleEvent("open"));
                  } else {
                    // The server might have been restarted, and lost track of our
                    // connection.
                    that._didClose(1006, "Server lost session");
                  }
                };

                SockJS.prototype._dispatchMessage = function (data) {
                  var that = this;
                  if (that.readyState !== SockJS.OPEN) return;
                  that.dispatchEvent(
                    new SimpleEvent("message", {
                      data: data,
                    })
                  );
                };

                SockJS.prototype._dispatchHeartbeat = function (data) {
                  var that = this;
                  if (that.readyState !== SockJS.OPEN) return;
                  that.dispatchEvent(new SimpleEvent("heartbeat", {}));
                };

                SockJS.prototype._didClose = function (code, reason, force) {
                  var that = this;

                  if (
                    that.readyState !== SockJS.CONNECTING &&
                    that.readyState !== SockJS.OPEN &&
                    that.readyState !== SockJS.CLOSING
                  ) {
                    utils.debug("INVALID_STATE_ERR", that.readyState);
                    return;
                  }

                  if (that._ir) {
                    that._ir.nuke();

                    that._ir = null;
                  }

                  if (that._transport) {
                    that._transport.doCleanup();

                    that._transport = null;
                  }

                  var close_event = new SimpleEvent("close", {
                    code: code,
                    reason: reason,
                    wasClean: utils.userSetCode(code),
                  });

                  if (
                    !utils.userSetCode(code) &&
                    that.readyState === SockJS.CONNECTING &&
                    !force
                  ) {
                    if (that._try_next_protocol(close_event)) {
                      return;
                    }

                    close_event = new SimpleEvent("close", {
                      code: 2000,
                      reason: "All transports failed",
                      wasClean: false,
                      last_event: close_event,
                    });
                  }

                  that.readyState = SockJS.CLOSED;
                  utils.delay(function () {
                    that.dispatchEvent(close_event);
                  });
                };

                SockJS.prototype._didMessage = function (data) {
                  var that = this;
                  var type = data.slice(0, 1);

                  switch (type) {
                    case "o":
                      that._dispatchOpen();

                      break;

                    case "a":
                      var payload = JSON.parse(data.slice(1) || "[]");

                      for (var i = 0; i < payload.length; i++) {
                        that._dispatchMessage(payload[i]);
                      }

                      break;

                    case "m":
                      var payload = JSON.parse(data.slice(1) || "null");

                      that._dispatchMessage(payload);

                      break;

                    case "c":
                      var payload = JSON.parse(data.slice(1) || "[]");

                      that._didClose(payload[0], payload[1]);

                      break;

                    case "h":
                      that._dispatchHeartbeat();

                      break;
                  }
                };

                SockJS.prototype._try_next_protocol = function (close_event) {
                  var that = this;

                  if (that.protocol) {
                    that._debug(
                      "Closed transport:",
                      that.protocol,
                      "" + close_event
                    );

                    that.protocol = null;
                  }

                  if (that._transport_tref) {
                    clearTimeout(that._transport_tref);
                    that._transport_tref = null;
                  }

                  while (1) {
                    var protocol = (that.protocol = that._protocols.shift());

                    if (!protocol) {
                      return false;
                    } // Some protocols require access to `body`, what if were in
                    // the `head`?

                    if (
                      SockJS[protocol] &&
                      SockJS[protocol].need_body === true &&
                      (!_document.body ||
                        (typeof _document.readyState !== "undefined" &&
                          _document.readyState !== "complete"))
                    ) {
                      that._protocols.unshift(protocol);

                      that.protocol = "waiting-for-load";
                      utils.attachEvent("load", function () {
                        that._try_next_protocol();
                      });
                      return true;
                    }

                    if (
                      !SockJS[protocol] ||
                      !SockJS[protocol].enabled(that._options)
                    ) {
                      that._debug("Skipping transport:", protocol);
                    } else {
                      var roundTrips = SockJS[protocol].roundTrips || 1;
                      var to = (that._options.rto || 0) * roundTrips || 5000;
                      that._transport_tref = utils.delay(to, function () {
                        if (that.readyState === SockJS.CONNECTING) {
                          // I can't understand how it is possible to run
                          // this timer, when the state is CLOSED, but
                          // apparently in IE everythin is possible.
                          that._didClose(2007, "Transport timeouted");
                        }
                      });
                      var connid = utils.random_string(8);
                      var trans_url =
                        that._base_url + "/" + that._server + "/" + connid;

                      that._debug(
                        "Opening transport:",
                        protocol,
                        " url:" + trans_url,
                        " RTO:" + that._options.rto
                      );

                      that._transport = new SockJS[protocol](
                        that,
                        trans_url,
                        that._base_url
                      );
                      return true;
                    }
                  }
                };

                SockJS.prototype.close = function (code, reason) {
                  var that = this;
                  if (code && !utils.userSetCode(code))
                    throw new Error("INVALID_ACCESS_ERR");

                  if (
                    that.readyState !== SockJS.CONNECTING &&
                    that.readyState !== SockJS.OPEN
                  ) {
                    return false;
                  }

                  that.readyState = SockJS.CLOSING;

                  that._didClose(code || 1000, reason || "Normal closure");

                  return true;
                };

                SockJS.prototype.send = function (data) {
                  var that = this;
                  if (that.readyState === SockJS.CONNECTING)
                    throw new Error("INVALID_STATE_ERR");

                  if (that.readyState === SockJS.OPEN) {
                    that._transport.doSend(utils.quote("" + data));
                  }

                  return true;
                };

                SockJS.prototype._applyInfo = function (
                  info,
                  rtt,
                  protocols_whitelist
                ) {
                  var that = this;
                  that._options.info = info;
                  that._options.rtt = rtt;
                  that._options.rto = utils.countRTO(rtt);
                  that._options.info.null_origin = !_document.domain; // Servers can override base_url, eg to provide a randomized domain name and
                  // avoid browser per-domain connection limits.

                  if (info.base_url)
                    // <METEOR>
                    that._base_url = utils.amendUrl(
                      info.base_url,
                      that._base_url
                    ); // </METEOR>

                  var probed = utils.probeProtocols();
                  that._protocols = utils.detectProtocols(
                    probed,
                    protocols_whitelist,
                    info
                  ); // <METEOR>
                  // https://github.com/sockjs/sockjs-client/issues/79
                  // Hack to avoid XDR when using different protocols
                  // We're on IE trying to do cross-protocol. jsonp only.

                  if (
                    !utils.isSameOriginScheme(that._base_url) &&
                    2 === utils.isXHRCorsCapable()
                  ) {
                    that._protocols = ["jsonp-polling"];
                  } // </METEOR>
                }; //         [*] End of lib/sockjs.js
                //         [*] Including lib/trans-websocket.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var WebSocketTransport = (SockJS.websocket = function (
                  ri,
                  trans_url
                ) {
                  var that = this;
                  var url = trans_url + "/websocket";

                  if (url.slice(0, 5) === "https") {
                    url = "wss" + url.slice(5);
                  } else {
                    url = "ws" + url.slice(4);
                  }

                  that.ri = ri;
                  that.url = url;
                  var Constructor = _window.WebSocket || _window.MozWebSocket;
                  that.ws = new Constructor(that.url);

                  that.ws.onmessage = function (e) {
                    that.ri._didMessage(e.data);
                  }; // Firefox has an interesting bug. If a websocket connection is
                  // created after onunload, it stays alive even when user
                  // navigates away from the page. In such situation let's lie -
                  // let's not open the ws connection at all. See:
                  // https://github.com/sockjs/sockjs-client/issues/28
                  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085

                  that.unload_ref = utils.unload_add(function () {
                    that.ws.close();
                  });

                  that.ws.onclose = function () {
                    that.ri._didMessage(
                      utils.closeFrame(1006, "WebSocket connection broken")
                    );
                  };
                });

                WebSocketTransport.prototype.doSend = function (data) {
                  this.ws.send("[" + data + "]");
                };

                WebSocketTransport.prototype.doCleanup = function () {
                  var that = this;
                  var ws = that.ws;

                  if (ws) {
                    ws.onmessage = ws.onclose = null;
                    ws.close();
                    utils.unload_del(that.unload_ref);
                    that.unload_ref = that.ri = that.ws = null;
                  }
                };

                WebSocketTransport.enabled = function () {
                  return !!(_window.WebSocket || _window.MozWebSocket);
                }; // In theory, ws should require 1 round trip. But in chrome, this is
                // not very stable over SSL. Most likely a ws connection requires a
                // separate SSL connection, in which case 2 round trips are an
                // absolute minumum.

                WebSocketTransport.roundTrips = 2; //         [*] End of lib/trans-websocket.js
                //         [*] Including lib/trans-sender.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var BufferedSender = function () {};

                BufferedSender.prototype.send_constructor = function (sender) {
                  var that = this;
                  that.send_buffer = [];
                  that.sender = sender;
                };

                BufferedSender.prototype.doSend = function (message) {
                  var that = this;
                  that.send_buffer.push(message);

                  if (!that.send_stop) {
                    that.send_schedule();
                  }
                }; // For polling transports in a situation when in the message callback,
                // new message is being send. If the sending connection was started
                // before receiving one, it is possible to saturate the network and
                // timeout due to the lack of receiving socket. To avoid that we delay
                // sending messages by some small time, in order to let receiving
                // connection be started beforehand. This is only a halfmeasure and
                // does not fix the big problem, but it does make the tests go more
                // stable on slow networks.

                BufferedSender.prototype.send_schedule_wait = function () {
                  var that = this;
                  var tref;

                  that.send_stop = function () {
                    that.send_stop = null;
                    clearTimeout(tref);
                  };

                  tref = utils.delay(25, function () {
                    that.send_stop = null;
                    that.send_schedule();
                  });
                };

                BufferedSender.prototype.send_schedule = function () {
                  var that = this;

                  if (that.send_buffer.length > 0) {
                    var payload = "[" + that.send_buffer.join(",") + "]";
                    that.send_stop = that.sender(
                      that.trans_url,
                      payload,
                      function (success, abort_reason) {
                        that.send_stop = null;

                        if (success === false) {
                          that.ri._didClose(
                            1006,
                            "Sending error " + abort_reason
                          );
                        } else {
                          that.send_schedule_wait();
                        }
                      }
                    );
                    that.send_buffer = [];
                  }
                };

                BufferedSender.prototype.send_destructor = function () {
                  var that = this;

                  if (that._send_stop) {
                    that._send_stop();
                  }

                  that._send_stop = null;
                };

                var jsonPGenericSender = function (url, payload, callback) {
                  var that = this;

                  if (!("_send_form" in that)) {
                    var form = (that._send_form = _document.createElement(
                      "form"
                    ));

                    var area = (that._send_area = _document.createElement(
                      "textarea"
                    ));

                    area.name = "d";
                    form.style.display = "none";
                    form.style.position = "absolute";
                    form.method = "POST";
                    form.enctype = "application/x-www-form-urlencoded";
                    form.acceptCharset = "UTF-8";
                    form.appendChild(area);

                    _document.body.appendChild(form);
                  }

                  var form = that._send_form;
                  var area = that._send_area;
                  var id = "a" + utils.random_string(8);
                  form.target = id;
                  form.action = url + "/jsonp_send?i=" + id;
                  var iframe;

                  try {
                    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
                    iframe = _document.createElement(
                      '<iframe name="' + id + '">'
                    );
                  } catch (x) {
                    iframe = _document.createElement("iframe");
                    iframe.name = id;
                  }

                  iframe.id = id;
                  form.appendChild(iframe);
                  iframe.style.display = "none";

                  try {
                    area.value = payload;
                  } catch (e) {
                    utils.log(
                      "Your browser is seriously broken. Go home! " + e.message
                    );
                  }

                  form.submit();

                  var completed = function (e) {
                    if (!iframe.onerror) return;
                    iframe.onreadystatechange = iframe.onerror = iframe.onload = null; // Opera mini doesn't like if we GC iframe
                    // immediately, thus this timeout.

                    utils.delay(500, function () {
                      iframe.parentNode.removeChild(iframe);
                      iframe = null;
                    });
                    area.value = ""; // It is not possible to detect if the iframe succeeded or
                    // failed to submit our form.

                    callback(true);
                  };

                  iframe.onerror = iframe.onload = completed;

                  iframe.onreadystatechange = function (e) {
                    if (iframe.readyState == "complete") completed();
                  };

                  return completed;
                };

                var createAjaxSender = function (AjaxObject) {
                  return function (url, payload, callback) {
                    var xo = new AjaxObject("POST", url + "/xhr_send", payload);

                    xo.onfinish = function (status, text) {
                      callback(
                        status === 200 || status === 204,
                        "http status " + status
                      );
                    };

                    return function (abort_reason) {
                      callback(false, abort_reason);
                    };
                  };
                }; //         [*] End of lib/trans-sender.js
                //         [*] Including lib/trans-jsonp-receiver.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */
                // Parts derived from Socket.io:
                //    https://github.com/LearnBoost/socket.io/blob/0.6.17/lib/socket.io/transports/jsonp-polling.js
                // and jQuery-JSONP:
                //    https://code.google.com/p/jquery-jsonp/source/browse/trunk/core/jquery.jsonp.js

                var jsonPGenericReceiver = function (url, callback) {
                  var tref;

                  var script = _document.createElement("script");

                  var script2; // Opera synchronous load trick.

                  var close_script = function (frame) {
                    if (script2) {
                      script2.parentNode.removeChild(script2);
                      script2 = null;
                    }

                    if (script) {
                      clearTimeout(tref); // Unfortunately, you can't really abort script loading of
                      // the script.

                      script.parentNode.removeChild(script);
                      script.onreadystatechange = script.onerror = script.onload = script.onclick = null;
                      script = null;
                      callback(frame);
                      callback = null;
                    }
                  }; // IE9 fires 'error' event after orsc or before, in random order.

                  var loaded_okay = false;
                  var error_timer = null;
                  script.id = "a" + utils.random_string(8);
                  script.src = url;
                  script.type = "text/javascript";
                  script.charset = "UTF-8";

                  script.onerror = function (e) {
                    if (!error_timer) {
                      // Delay firing close_script.
                      error_timer = setTimeout(function () {
                        if (!loaded_okay) {
                          close_script(
                            utils.closeFrame(
                              1006,
                              "JSONP script loaded abnormally (onerror)"
                            )
                          );
                        }
                      }, 1000);
                    }
                  };

                  script.onload = function (e) {
                    close_script(
                      utils.closeFrame(
                        1006,
                        "JSONP script loaded abnormally (onload)"
                      )
                    );
                  };

                  script.onreadystatechange = function (e) {
                    if (/loaded|closed/.test(script.readyState)) {
                      if (script && script.htmlFor && script.onclick) {
                        loaded_okay = true;

                        try {
                          // In IE, actually execute the script.
                          script.onclick();
                        } catch (x) {}
                      }

                      if (script) {
                        close_script(
                          utils.closeFrame(
                            1006,
                            "JSONP script loaded abnormally (onreadystatechange)"
                          )
                        );
                      }
                    }
                  }; // IE: event/htmlFor/onclick trick.
                  // One can't rely on proper order for onreadystatechange. In order to
                  // make sure, set a 'htmlFor' and 'event' properties, so that
                  // script code will be installed as 'onclick' handler for the
                  // script object. Later, onreadystatechange, manually execute this
                  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
                  // set. For reference see:
                  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
                  // Also, read on that about script ordering:
                  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order

                  if (
                    typeof script.async === "undefined" &&
                    _document.attachEvent
                  ) {
                    // According to mozilla docs, in recent browsers script.async defaults
                    // to 'true', so we may use it to detect a good browser:
                    // https://developer.mozilla.org/en/HTML/Element/script
                    if (!/opera/i.test(navigator.userAgent)) {
                      // Naively assume we're in IE
                      try {
                        script.htmlFor = script.id;
                        script.event = "onclick";
                      } catch (x) {}

                      script.async = true;
                    } else {
                      // Opera, second sync script hack
                      script2 = _document.createElement("script");
                      script2.text =
                        "try{var a = document.getElementById('" +
                        script.id +
                        "'); if(a)a.onerror();}catch(x){};";
                      script.async = script2.async = false;
                    }
                  }

                  if (typeof script.async !== "undefined") {
                    script.async = true;
                  } // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.

                  tref = setTimeout(function () {
                    close_script(
                      utils.closeFrame(
                        1006,
                        "JSONP script loaded abnormally (timeout)"
                      )
                    );
                  }, 35000);

                  var head = _document.getElementsByTagName("head")[0];

                  head.insertBefore(script, head.firstChild);

                  if (script2) {
                    head.insertBefore(script2, head.firstChild);
                  }

                  return close_script;
                }; //         [*] End of lib/trans-jsonp-receiver.js
                //         [*] Including lib/trans-jsonp-polling.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */
                // The simplest and most robust transport, using the well-know cross
                // domain hack - JSONP. This transport is quite inefficient - one
                // mssage could use up to one http request. But at least it works almost
                // everywhere.
                // Known limitations:
                //   o you will get a spinning cursor
                //   o for Konqueror a dumb timer is needed to detect errors

                var JsonPTransport = (SockJS["jsonp-polling"] = function (
                  ri,
                  trans_url
                ) {
                  utils.polluteGlobalNamespace();
                  var that = this;
                  that.ri = ri;
                  that.trans_url = trans_url;
                  that.send_constructor(jsonPGenericSender);

                  that._schedule_recv();
                }); // Inheritnace

                JsonPTransport.prototype = new BufferedSender();

                JsonPTransport.prototype._schedule_recv = function () {
                  var that = this;

                  var callback = function (data) {
                    that._recv_stop = null;

                    if (data) {
                      // no data - heartbeat;
                      if (!that._is_closing) {
                        that.ri._didMessage(data);
                      }
                    } // The message can be a close message, and change is_closing state.

                    if (!that._is_closing) {
                      that._schedule_recv();
                    }
                  };

                  that._recv_stop = jsonPReceiverWrapper(
                    that.trans_url + "/jsonp",
                    jsonPGenericReceiver,
                    callback
                  );
                };

                JsonPTransport.enabled = function () {
                  return true;
                };

                JsonPTransport.need_body = true;

                JsonPTransport.prototype.doCleanup = function () {
                  var that = this;
                  that._is_closing = true;

                  if (that._recv_stop) {
                    that._recv_stop();
                  }

                  that.ri = that._recv_stop = null;
                  that.send_destructor();
                }; // Abstract away code that handles global namespace pollution.

                var jsonPReceiverWrapper = function (
                  url,
                  constructReceiver,
                  user_callback
                ) {
                  var id = "a" + utils.random_string(6);
                  var url_id = url + "?c=" + escape(WPrefix + "." + id); // Unfortunately it is not possible to abort loading of the
                  // script. We need to keep track of frake close frames.

                  var aborting = 0; // Callback will be called exactly once.

                  var callback = function (frame) {
                    switch (aborting) {
                      case 0:
                        // Normal behaviour - delete hook _and_ emit message.
                        delete _window[WPrefix][id];
                        user_callback(frame);
                        break;

                      case 1:
                        // Fake close frame - emit but don't delete hook.
                        user_callback(frame);
                        aborting = 2;
                        break;

                      case 2:
                        // Got frame after connection was closed, delete hook, don't emit.
                        delete _window[WPrefix][id];
                        break;
                    }
                  };

                  var close_script = constructReceiver(url_id, callback);
                  _window[WPrefix][id] = close_script;

                  var stop = function () {
                    if (_window[WPrefix][id]) {
                      aborting = 1;

                      _window[WPrefix][id](
                        utils.closeFrame(1000, "JSONP user aborted read")
                      );
                    }
                  };

                  return stop;
                }; //         [*] End of lib/trans-jsonp-polling.js
                //         [*] Including lib/trans-xhr.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var AjaxBasedTransport = function () {};

                AjaxBasedTransport.prototype = new BufferedSender();

                AjaxBasedTransport.prototype.run = function (
                  ri,
                  trans_url,
                  url_suffix,
                  Receiver,
                  AjaxObject
                ) {
                  var that = this;
                  that.ri = ri;
                  that.trans_url = trans_url;
                  that.send_constructor(createAjaxSender(AjaxObject));
                  that.poll = new Polling(
                    ri,
                    Receiver,
                    trans_url + url_suffix,
                    AjaxObject
                  );
                };

                AjaxBasedTransport.prototype.doCleanup = function () {
                  var that = this;

                  if (that.poll) {
                    that.poll.abort();
                    that.poll = null;
                  }
                }; // xhr-streaming

                var XhrStreamingTransport = (SockJS[
                  "xhr-streaming"
                ] = function (ri, trans_url) {
                  this.run(
                    ri,
                    trans_url,
                    "/xhr_streaming",
                    XhrReceiver,
                    utils.XHRCorsObject
                  );
                });

                XhrStreamingTransport.prototype = new AjaxBasedTransport();

                XhrStreamingTransport.enabled = function () {
                  // Support for CORS Ajax aka Ajax2? Opera 12 claims CORS but
                  // doesn't do streaming.
                  return (
                    _window.XMLHttpRequest &&
                    "withCredentials" in new XMLHttpRequest() &&
                    !/opera/i.test(navigator.userAgent)
                  );
                };

                XhrStreamingTransport.roundTrips = 2; // preflight, ajax
                // Safari gets confused when a streaming ajax request is started
                // before onload. This causes the load indicator to spin indefinetely.

                XhrStreamingTransport.need_body = true; // According to:
                //   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
                //   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
                // xdr-streaming

                var XdrStreamingTransport = (SockJS[
                  "xdr-streaming"
                ] = function (ri, trans_url) {
                  this.run(
                    ri,
                    trans_url,
                    "/xhr_streaming",
                    XhrReceiver,
                    utils.XDRObject
                  );
                });

                XdrStreamingTransport.prototype = new AjaxBasedTransport();

                XdrStreamingTransport.enabled = function () {
                  return !!_window.XDomainRequest;
                };

                XdrStreamingTransport.roundTrips = 2; // preflight, ajax
                // xhr-polling

                var XhrPollingTransport = (SockJS["xhr-polling"] = function (
                  ri,
                  trans_url
                ) {
                  this.run(
                    ri,
                    trans_url,
                    "/xhr",
                    XhrReceiver,
                    utils.XHRCorsObject
                  );
                });

                XhrPollingTransport.prototype = new AjaxBasedTransport();
                XhrPollingTransport.enabled = XhrStreamingTransport.enabled;
                XhrPollingTransport.roundTrips = 2; // preflight, ajax
                // xdr-polling

                var XdrPollingTransport = (SockJS["xdr-polling"] = function (
                  ri,
                  trans_url
                ) {
                  this.run(ri, trans_url, "/xhr", XhrReceiver, utils.XDRObject);
                });

                XdrPollingTransport.prototype = new AjaxBasedTransport();
                XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
                XdrPollingTransport.roundTrips = 2; // preflight, ajax
                //         [*] End of lib/trans-xhr.js
                //         [*] Including lib/trans-iframe.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */
                // Few cool transports do work only for same-origin. In order to make
                // them working cross-domain we shall use iframe, served form the
                // remote domain. New browsers, have capabilities to communicate with
                // cross domain iframe, using postMessage(). In IE it was implemented
                // from IE 8+, but of course, IE got some details wrong:
                //    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
                //    http://stevesouders.com/misc/test-postmessage.php

                var IframeTransport = function () {};

                IframeTransport.prototype.i_constructor = function (
                  ri,
                  trans_url,
                  base_url
                ) {
                  var that = this;
                  that.ri = ri;
                  that.origin = utils.getOrigin(base_url);
                  that.base_url = base_url;
                  that.trans_url = trans_url;
                  var iframe_url = base_url + "/iframe.html";

                  if (that.ri._options.devel) {
                    iframe_url += "?t=" + +new Date();
                  }

                  that.window_id = utils.random_string(8);
                  iframe_url += "#" + that.window_id;
                  that.iframeObj = utils.createIframe(iframe_url, function (r) {
                    that.ri._didClose(
                      1006,
                      "Unable to load an iframe (" + r + ")"
                    );
                  });
                  that.onmessage_cb = utils.bind(that.onmessage, that);
                  utils.attachMessage(that.onmessage_cb);
                };

                IframeTransport.prototype.doCleanup = function () {
                  var that = this;

                  if (that.iframeObj) {
                    utils.detachMessage(that.onmessage_cb);

                    try {
                      // When the iframe is not loaded, IE raises an exception
                      // on 'contentWindow'.
                      if (that.iframeObj.iframe.contentWindow) {
                        that.postMessage("c");
                      }
                    } catch (x) {}

                    that.iframeObj.cleanup();
                    that.iframeObj = null;
                    that.onmessage_cb = that.iframeObj = null;
                  }
                };

                IframeTransport.prototype.onmessage = function (e) {
                  var that = this;
                  if (e.origin !== that.origin) return;
                  var window_id = e.data.slice(0, 8);
                  var type = e.data.slice(8, 9);
                  var data = e.data.slice(9);
                  if (window_id !== that.window_id) return;

                  switch (type) {
                    case "s":
                      that.iframeObj.loaded();
                      that.postMessage(
                        "s",
                        JSON.stringify([
                          SockJS.version,
                          that.protocol,
                          that.trans_url,
                          that.base_url,
                        ])
                      );
                      break;

                    case "t":
                      that.ri._didMessage(data);

                      break;
                  }
                };

                IframeTransport.prototype.postMessage = function (type, data) {
                  var that = this;
                  that.iframeObj.post(
                    that.window_id + type + (data || ""),
                    that.origin
                  );
                };

                IframeTransport.prototype.doSend = function (message) {
                  this.postMessage("m", message);
                };

                IframeTransport.enabled = function () {
                  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
                  // huge delay, or not at all.
                  var konqueror =
                    navigator &&
                    navigator.userAgent &&
                    navigator.userAgent.indexOf("Konqueror") !== -1;
                  return (
                    (typeof _window.postMessage === "function" ||
                      typeof _window.postMessage === "object") &&
                    !konqueror
                  );
                }; //         [*] End of lib/trans-iframe.js
                //         [*] Including lib/trans-iframe-within.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var curr_window_id;

                var postMessage = function (type, data) {
                  if (parent !== _window) {
                    parent.postMessage(
                      curr_window_id + type + (data || ""),
                      "*"
                    );
                  } else {
                    utils.log(
                      "Can't postMessage, no parent window.",
                      type,
                      data
                    );
                  }
                };

                var FacadeJS = function () {};

                FacadeJS.prototype._didClose = function (code, reason) {
                  postMessage("t", utils.closeFrame(code, reason));
                };

                FacadeJS.prototype._didMessage = function (frame) {
                  postMessage("t", frame);
                };

                FacadeJS.prototype._doSend = function (data) {
                  this._transport.doSend(data);
                };

                FacadeJS.prototype._doCleanup = function () {
                  this._transport.doCleanup();
                };

                utils.parent_origin = undefined;

                SockJS.bootstrap_iframe = function () {
                  var facade;
                  curr_window_id = _document.location.hash.slice(1);

                  var onMessage = function (e) {
                    if (e.source !== parent) return;
                    if (typeof utils.parent_origin === "undefined")
                      utils.parent_origin = e.origin;
                    if (e.origin !== utils.parent_origin) return;
                    var window_id = e.data.slice(0, 8);
                    var type = e.data.slice(8, 9);
                    var data = e.data.slice(9);
                    if (window_id !== curr_window_id) return;

                    switch (type) {
                      case "s":
                        var p = JSON.parse(data);
                        var version = p[0];
                        var protocol = p[1];
                        var trans_url = p[2];
                        var base_url = p[3];

                        if (version !== SockJS.version) {
                          utils.log(
                            "Incompatibile SockJS! Main site uses:" +
                              ' "' +
                              version +
                              '", the iframe:' +
                              ' "' +
                              SockJS.version +
                              '".'
                          );
                        }

                        if (
                          !utils.flatUrl(trans_url) ||
                          !utils.flatUrl(base_url)
                        ) {
                          utils.log("Only basic urls are supported in SockJS");
                          return;
                        }

                        if (
                          !utils.isSameOriginUrl(trans_url) ||
                          !utils.isSameOriginUrl(base_url)
                        ) {
                          utils.log(
                            "Can't connect to different domain from within an " +
                              "iframe. (" +
                              JSON.stringify([
                                _window.location.href,
                                trans_url,
                                base_url,
                              ]) +
                              ")"
                          );
                          return;
                        }

                        facade = new FacadeJS();
                        facade._transport = new FacadeJS[protocol](
                          facade,
                          trans_url,
                          base_url
                        );
                        break;

                      case "m":
                        facade._doSend(data);

                        break;

                      case "c":
                        if (facade) facade._doCleanup();
                        facade = null;
                        break;
                    }
                  }; // alert('test ticker');
                  // facade = new FacadeJS();
                  // facade._transport = new FacadeJS['w-iframe-xhr-polling'](facade, 'http://host.com:9999/ticker/12/basd');

                  utils.attachMessage(onMessage); // Start

                  postMessage("s");
                }; //         [*] End of lib/trans-iframe-within.js
                //         [*] Including lib/info.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var InfoReceiver = function (base_url, AjaxObject) {
                  var that = this;
                  utils.delay(function () {
                    that.doXhr(base_url, AjaxObject);
                  });
                };

                InfoReceiver.prototype = new EventEmitter(["finish"]);

                InfoReceiver.prototype.doXhr = function (base_url, AjaxObject) {
                  var that = this;
                  var t0 = new Date().getTime(); // <METEOR>
                  // https://github.com/sockjs/sockjs-client/pull/129
                  // var xo = new AjaxObject('GET', base_url + '/info');

                  var xo = new AjaxObject( // add cachebusting parameter to url to work around a chrome bug:
                    // https://code.google.com/p/chromium/issues/detail?id=263981
                    // or misbehaving proxies.
                    "GET",
                    base_url + "/info?cb=" + utils.random_string(10)
                  ); // </METEOR>

                  var tref = utils.delay(8000, function () {
                    xo.ontimeout();
                  });

                  xo.onfinish = function (status, text) {
                    clearTimeout(tref);
                    tref = null;

                    if (status === 200) {
                      var rtt = new Date().getTime() - t0;
                      var info = JSON.parse(text);
                      if (typeof info !== "object") info = {};
                      that.emit("finish", info, rtt);
                    } else {
                      that.emit("finish");
                    }
                  };

                  xo.ontimeout = function () {
                    xo.close();
                    that.emit("finish");
                  };
                };

                var InfoReceiverIframe = function (base_url) {
                  var that = this;

                  var go = function () {
                    var ifr = new IframeTransport();
                    ifr.protocol = "w-iframe-info-receiver";

                    var fun = function (r) {
                      if (typeof r === "string" && r.substr(0, 1) === "m") {
                        var d = JSON.parse(r.substr(1));
                        var info = d[0],
                          rtt = d[1];
                        that.emit("finish", info, rtt);
                      } else {
                        that.emit("finish");
                      }

                      ifr.doCleanup();
                      ifr = null;
                    };

                    var mock_ri = {
                      _options: {},
                      _didClose: fun,
                      _didMessage: fun,
                    };
                    ifr.i_constructor(mock_ri, base_url, base_url);
                  };

                  if (!_document.body) {
                    utils.attachEvent("load", go);
                  } else {
                    go();
                  }
                };

                InfoReceiverIframe.prototype = new EventEmitter(["finish"]);

                var InfoReceiverFake = function () {
                  // It may not be possible to do cross domain AJAX to get the info
                  // data, for example for IE7. But we want to run JSONP, so let's
                  // fake the response, with rtt=2s (rto=6s).
                  var that = this;
                  utils.delay(function () {
                    that.emit("finish", {}, 2000);
                  });
                };

                InfoReceiverFake.prototype = new EventEmitter(["finish"]);

                var createInfoReceiver = function (base_url) {
                  if (utils.isSameOriginUrl(base_url)) {
                    // If, for some reason, we have SockJS locally - there's no
                    // need to start up the complex machinery. Just use ajax.
                    return new InfoReceiver(base_url, utils.XHRLocalObject);
                  }

                  switch (utils.isXHRCorsCapable()) {
                    case 1:
                      // XHRLocalObject -> no_credentials=true
                      return new InfoReceiver(base_url, utils.XHRLocalObject);

                    case 2:
                      // <METEOR>
                      // https://github.com/sockjs/sockjs-client/issues/79
                      // XDR doesn't work across different schemes
                      // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
                      if (utils.isSameOriginScheme(base_url))
                        return new InfoReceiver(base_url, utils.XDRObject);
                      else return new InfoReceiverFake();
                    // </METEOR>

                    case 3:
                      // Opera
                      return new InfoReceiverIframe(base_url);

                    default:
                      // IE 7
                      return new InfoReceiverFake();
                  }
                };

                var WInfoReceiverIframe = (FacadeJS[
                  "w-iframe-info-receiver"
                ] = function (ri, _trans_url, base_url) {
                  var ir = new InfoReceiver(base_url, utils.XHRLocalObject);

                  ir.onfinish = function (info, rtt) {
                    ri._didMessage("m" + JSON.stringify([info, rtt]));

                    ri._didClose();
                  };
                });

                WInfoReceiverIframe.prototype.doCleanup = function () {}; //         [*] End of lib/info.js
                //         [*] Including lib/trans-iframe-eventsource.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var EventSourceIframeTransport = (SockJS[
                  "iframe-eventsource"
                ] = function () {
                  var that = this;
                  that.protocol = "w-iframe-eventsource";
                  that.i_constructor.apply(that, arguments);
                });

                EventSourceIframeTransport.prototype = new IframeTransport();

                EventSourceIframeTransport.enabled = function () {
                  return "EventSource" in _window && IframeTransport.enabled();
                };

                EventSourceIframeTransport.need_body = true;
                EventSourceIframeTransport.roundTrips = 3; // html, javascript, eventsource
                // w-iframe-eventsource

                var EventSourceTransport = (FacadeJS[
                  "w-iframe-eventsource"
                ] = function (ri, trans_url) {
                  this.run(
                    ri,
                    trans_url,
                    "/eventsource",
                    EventSourceReceiver,
                    utils.XHRLocalObject
                  );
                });

                EventSourceTransport.prototype = new AjaxBasedTransport(); //         [*] End of lib/trans-iframe-eventsource.js
                //         [*] Including lib/trans-iframe-xhr-polling.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var XhrPollingIframeTransport = (SockJS[
                  "iframe-xhr-polling"
                ] = function () {
                  var that = this;
                  that.protocol = "w-iframe-xhr-polling";
                  that.i_constructor.apply(that, arguments);
                });

                XhrPollingIframeTransport.prototype = new IframeTransport();

                XhrPollingIframeTransport.enabled = function () {
                  return _window.XMLHttpRequest && IframeTransport.enabled();
                };

                XhrPollingIframeTransport.need_body = true;
                XhrPollingIframeTransport.roundTrips = 3; // html, javascript, xhr
                // w-iframe-xhr-polling

                var XhrPollingITransport = (FacadeJS[
                  "w-iframe-xhr-polling"
                ] = function (ri, trans_url) {
                  this.run(
                    ri,
                    trans_url,
                    "/xhr",
                    XhrReceiver,
                    utils.XHRLocalObject
                  );
                });

                XhrPollingITransport.prototype = new AjaxBasedTransport(); //         [*] End of lib/trans-iframe-xhr-polling.js
                //         [*] Including lib/trans-iframe-htmlfile.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */
                // This transport generally works in any browser, but will cause a
                // spinning cursor to appear in any browser other than IE.
                // We may test this transport in all browsers - why not, but in
                // production it should be only run in IE.

                var HtmlFileIframeTransport = (SockJS[
                  "iframe-htmlfile"
                ] = function () {
                  var that = this;
                  that.protocol = "w-iframe-htmlfile";
                  that.i_constructor.apply(that, arguments);
                }); // Inheritance.

                HtmlFileIframeTransport.prototype = new IframeTransport();

                HtmlFileIframeTransport.enabled = function () {
                  return IframeTransport.enabled();
                };

                HtmlFileIframeTransport.need_body = true;
                HtmlFileIframeTransport.roundTrips = 3; // html, javascript, htmlfile
                // w-iframe-htmlfile

                var HtmlFileTransport = (FacadeJS[
                  "w-iframe-htmlfile"
                ] = function (ri, trans_url) {
                  this.run(
                    ri,
                    trans_url,
                    "/htmlfile",
                    HtmlfileReceiver,
                    utils.XHRLocalObject
                  );
                });

                HtmlFileTransport.prototype = new AjaxBasedTransport(); //         [*] End of lib/trans-iframe-htmlfile.js
                //         [*] Including lib/trans-polling.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var Polling = function (ri, Receiver, recv_url, AjaxObject) {
                  var that = this;
                  that.ri = ri;
                  that.Receiver = Receiver;
                  that.recv_url = recv_url;
                  that.AjaxObject = AjaxObject;

                  that._scheduleRecv();
                };

                Polling.prototype._scheduleRecv = function () {
                  var that = this;
                  var poll = (that.poll = new that.Receiver(
                    that.recv_url,
                    that.AjaxObject
                  ));
                  var msg_counter = 0;

                  poll.onmessage = function (e) {
                    msg_counter += 1;

                    that.ri._didMessage(e.data);
                  };

                  poll.onclose = function (e) {
                    that.poll = poll = poll.onmessage = poll.onclose = null;

                    if (!that.poll_is_closing) {
                      if (e.reason === "permanent") {
                        that.ri._didClose(
                          1006,
                          "Polling error (" + e.reason + ")"
                        );
                      } else {
                        that._scheduleRecv();
                      }
                    }
                  };
                };

                Polling.prototype.abort = function () {
                  var that = this;
                  that.poll_is_closing = true;

                  if (that.poll) {
                    that.poll.abort();
                  }
                }; //         [*] End of lib/trans-polling.js
                //         [*] Including lib/trans-receiver-eventsource.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var EventSourceReceiver = function (url) {
                  var that = this;
                  var es = new EventSource(url);

                  es.onmessage = function (e) {
                    that.dispatchEvent(
                      new SimpleEvent("message", {
                        data: unescape(e.data),
                      })
                    );
                  };

                  that.es_close = es.onerror = function (e, abort_reason) {
                    // ES on reconnection has readyState = 0 or 1.
                    // on network error it's CLOSED = 2
                    var reason = abort_reason
                      ? "user"
                      : es.readyState !== 2
                      ? "network"
                      : "permanent";
                    that.es_close = es.onmessage = es.onerror = null; // EventSource reconnects automatically.

                    es.close();
                    es = null; // Safari and chrome < 15 crash if we close window before
                    // waiting for ES cleanup. See:
                    //   https://code.google.com/p/chromium/issues/detail?id=89155

                    utils.delay(200, function () {
                      that.dispatchEvent(
                        new SimpleEvent("close", {
                          reason: reason,
                        })
                      );
                    });
                  };
                };

                EventSourceReceiver.prototype = new REventTarget();

                EventSourceReceiver.prototype.abort = function () {
                  var that = this;

                  if (that.es_close) {
                    that.es_close({}, true);
                  }
                }; //         [*] End of lib/trans-receiver-eventsource.js
                //         [*] Including lib/trans-receiver-htmlfile.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var _is_ie_htmlfile_capable;

                var isIeHtmlfileCapable = function () {
                  if (_is_ie_htmlfile_capable === undefined) {
                    if ("ActiveXObject" in _window) {
                      try {
                        _is_ie_htmlfile_capable = !!new ActiveXObject(
                          "htmlfile"
                        );
                      } catch (x) {}
                    } else {
                      _is_ie_htmlfile_capable = false;
                    }
                  }

                  return _is_ie_htmlfile_capable;
                };

                var HtmlfileReceiver = function (url) {
                  var that = this;
                  utils.polluteGlobalNamespace();
                  that.id = "a" + utils.random_string(6, 26);
                  url +=
                    (url.indexOf("?") === -1 ? "?" : "&") +
                    "c=" +
                    escape(WPrefix + "." + that.id);
                  var constructor = isIeHtmlfileCapable()
                    ? utils.createHtmlfile
                    : utils.createIframe;
                  var iframeObj;
                  _window[WPrefix][that.id] = {
                    start: function () {
                      iframeObj.loaded();
                    },
                    message: function (data) {
                      that.dispatchEvent(
                        new SimpleEvent("message", {
                          data: data,
                        })
                      );
                    },
                    stop: function () {
                      that.iframe_close({}, "network");
                    },
                  };

                  that.iframe_close = function (e, abort_reason) {
                    iframeObj.cleanup();
                    that.iframe_close = iframeObj = null;
                    delete _window[WPrefix][that.id];
                    that.dispatchEvent(
                      new SimpleEvent("close", {
                        reason: abort_reason,
                      })
                    );
                  };

                  iframeObj = constructor(url, function (e) {
                    that.iframe_close({}, "permanent");
                  });
                };

                HtmlfileReceiver.prototype = new REventTarget();

                HtmlfileReceiver.prototype.abort = function () {
                  var that = this;

                  if (that.iframe_close) {
                    that.iframe_close({}, "user");
                  }
                }; //         [*] End of lib/trans-receiver-htmlfile.js
                //         [*] Including lib/trans-receiver-xhr.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */

                var XhrReceiver = function (url, AjaxObject) {
                  var that = this;
                  var buf_pos = 0;
                  that.xo = new AjaxObject("POST", url, null);

                  that.xo.onchunk = function (status, text) {
                    if (status !== 200) return;

                    while (1) {
                      var buf = text.slice(buf_pos);
                      var p = buf.indexOf("\n");
                      if (p === -1) break;
                      buf_pos += p + 1;
                      var msg = buf.slice(0, p);
                      that.dispatchEvent(
                        new SimpleEvent("message", {
                          data: msg,
                        })
                      );
                    }
                  };

                  that.xo.onfinish = function (status, text) {
                    that.xo.onchunk(status, text);
                    that.xo = null;
                    var reason = status === 200 ? "network" : "permanent";
                    that.dispatchEvent(
                      new SimpleEvent("close", {
                        reason: reason,
                      })
                    );
                  };
                };

                XhrReceiver.prototype = new REventTarget();

                XhrReceiver.prototype.abort = function () {
                  var that = this;

                  if (that.xo) {
                    that.xo.close();
                    that.dispatchEvent(
                      new SimpleEvent("close", {
                        reason: "user",
                      })
                    );
                    that.xo = null;
                  }
                }; //         [*] End of lib/trans-receiver-xhr.js
                //         [*] Including lib/test-hooks.js

                /*
                 * ***** BEGIN LICENSE BLOCK *****
                 * Copyright (c) 2011-2012 VMware, Inc.
                 *
                 * For the license see COPYING.
                 * ***** END LICENSE BLOCK *****
                 */
                // For testing

                SockJS.getUtils = function () {
                  return utils;
                };

                SockJS.getIframeTransport = function () {
                  return IframeTransport;
                }; //         [*] End of lib/test-hooks.js

                return SockJS;
              })();

              if ("_sockjs_onload" in window) setTimeout(_sockjs_onload, 1); // AMD compliance

              if (typeof define === "function" && define.amd) {
                define("sockjs", [], function () {
                  return SockJS;
                });
              } //     [*] End of lib/index.js
              // [*] End of lib/all.js
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "urls.js": function module(_require5, _exports3, _module4) {
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                                     //
              // packages/socket-stream-client/urls.js                                                                               //
              //                                                                                                                     //
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module4.export({
                toSockjsUrl: () => toSockjsUrl,
                toWebsocketUrl: () => toWebsocketUrl,
              });

              // @param url {String} URL to Meteor app, eg:
              //   "/" or "madewith.meteor.com" or "https://foo.meteor.com"
              //   or "ddp+sockjs://ddp--****-foo.meteor.com/sockjs"
              // @returns {String} URL to the endpoint with the specific scheme and subPath, e.g.
              // for scheme "http" and subPath "sockjs"
              //   "http://subdomain.meteor.com/sockjs" or "/sockjs"
              //   or "https://ddp--1234-foo.meteor.com/sockjs"
              function translateUrl(url, newSchemeBase, subPath) {
                if (!newSchemeBase) {
                  newSchemeBase = "http";
                }

                if (subPath !== "sockjs" && url.startsWith("/")) {
                  url = Meteor.absoluteUrl(url.substr(1));
                }

                var ddpUrlMatch = url.match(/^ddp(i?)\+sockjs:\/\//);
                var httpUrlMatch = url.match(/^http(s?):\/\//);
                var newScheme;

                if (ddpUrlMatch) {
                  // Remove scheme and split off the host.
                  var urlAfterDDP = url.substr(ddpUrlMatch[0].length);
                  newScheme =
                    ddpUrlMatch[1] === "i"
                      ? newSchemeBase
                      : newSchemeBase + "s";
                  var slashPos = urlAfterDDP.indexOf("/");
                  var host =
                    slashPos === -1
                      ? urlAfterDDP
                      : urlAfterDDP.substr(0, slashPos);
                  var rest =
                    slashPos === -1 ? "" : urlAfterDDP.substr(slashPos); // In the host (ONLY!), change '*' characters into random digits. This
                  // allows different stream connections to connect to different hostnames
                  // and avoid browser per-hostname connection limits.

                  host = host.replace(/\*/g, () =>
                    Math.floor(Math.random() * 10)
                  );
                  return newScheme + "://" + host + rest;
                } else if (httpUrlMatch) {
                  newScheme = !httpUrlMatch[1]
                    ? newSchemeBase
                    : newSchemeBase + "s";
                  var urlAfterHttp = url.substr(httpUrlMatch[0].length);
                  url = newScheme + "://" + urlAfterHttp;
                } // Prefix FQDNs but not relative URLs

                if (url.indexOf("://") === -1 && !url.startsWith("/")) {
                  url = newSchemeBase + "://" + url;
                } // XXX This is not what we should be doing: if I have a site
                // deployed at "/foo", then DDP.connect("/") should actually connect
                // to "/", not to "/foo". "/" is an absolute path. (Contrast: if
                // deployed at "/foo", it would be reasonable for DDP.connect("bar")
                // to connect to "/foo/bar").
                //
                // We should make this properly honor absolute paths rather than
                // forcing the path to be relative to the site root. Simultaneously,
                // we should set DDP_DEFAULT_CONNECTION_URL to include the site
                // root. See also client_convenience.js #RationalizingRelativeDDPURLs

                url = Meteor._relativeToSiteRootUrl(url);
                if (url.endsWith("/")) return url + subPath;
                else return url + "/" + subPath;
              }

              function toSockjsUrl(url) {
                return translateUrl(url, "http", "sockjs");
              }

              function toWebsocketUrl(url) {
                return translateUrl(url, "ws", "websocket");
              }
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  /* Exports */
  Package._define("socket-stream-client");
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var EJSON = Package.ejson.EJSON;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var DiffSequence;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          "diff-sequence": {
            "diff.js": function module(_require, _exports, _module) {
              /////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                 //
              // packages/diff-sequence/diff.js                                                                  //
              //                                                                                                 //
              /////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module.export({
                DiffSequence: () => DiffSequence,
              });
              const DiffSequence = {};
              const hasOwn = Object.prototype.hasOwnProperty;

              function isObjEmpty(obj) {
                for (let key in Object(obj)) {
                  if (hasOwn.call(obj, key)) {
                    return false;
                  }
                }

                return true;
              } // ordered: bool.
              // old_results and new_results: collections of documents.
              //    if ordered, they are arrays.
              //    if unordered, they are IdMaps

              DiffSequence.diffQueryChanges = function (
                ordered,
                oldResults,
                newResults,
                observer,
                options
              ) {
                if (ordered)
                  DiffSequence.diffQueryOrderedChanges(
                    oldResults,
                    newResults,
                    observer,
                    options
                  );
                else
                  DiffSequence.diffQueryUnorderedChanges(
                    oldResults,
                    newResults,
                    observer,
                    options
                  );
              };

              DiffSequence.diffQueryUnorderedChanges = function (
                oldResults,
                newResults,
                observer,
                options
              ) {
                options = options || {};
                var projectionFn = options.projectionFn || EJSON.clone;

                if (observer.movedBefore) {
                  throw new Error(
                    "_diffQueryUnordered called with a movedBefore observer!"
                  );
                }

                newResults.forEach(function (newDoc, id) {
                  var oldDoc = oldResults.get(id);

                  if (oldDoc) {
                    if (observer.changed && !EJSON.equals(oldDoc, newDoc)) {
                      var projectedNew = projectionFn(newDoc);
                      var projectedOld = projectionFn(oldDoc);
                      var changedFields = DiffSequence.makeChangedFields(
                        projectedNew,
                        projectedOld
                      );

                      if (!isObjEmpty(changedFields)) {
                        observer.changed(id, changedFields);
                      }
                    }
                  } else if (observer.added) {
                    var fields = projectionFn(newDoc);
                    delete fields._id;
                    observer.added(newDoc._id, fields);
                  }
                });

                if (observer.removed) {
                  oldResults.forEach(function (oldDoc, id) {
                    if (!newResults.has(id)) observer.removed(id);
                  });
                }
              };

              DiffSequence.diffQueryOrderedChanges = function (
                old_results,
                new_results,
                observer,
                options
              ) {
                options = options || {};
                var projectionFn = options.projectionFn || EJSON.clone;
                var new_presence_of_id = {};
                new_results.forEach(function (doc) {
                  if (new_presence_of_id[doc._id])
                    Meteor._debug("Duplicate _id in new_results");
                  new_presence_of_id[doc._id] = true;
                });
                var old_index_of_id = {};
                old_results.forEach(function (doc, i) {
                  if (doc._id in old_index_of_id)
                    Meteor._debug("Duplicate _id in old_results");
                  old_index_of_id[doc._id] = i;
                }); // ALGORITHM:
                //
                // To determine which docs should be considered "moved" (and which
                // merely change position because of other docs moving) we run
                // a "longest common subsequence" (LCS) algorithm.  The LCS of the
                // old doc IDs and the new doc IDs gives the docs that should NOT be
                // considered moved.
                // To actually call the appropriate callbacks to get from the old state to the
                // new state:
                // First, we call removed() on all the items that only appear in the old
                // state.
                // Then, once we have the items that should not move, we walk through the new
                // results array group-by-group, where a "group" is a set of items that have
                // moved, anchored on the end by an item that should not move.  One by one, we
                // move each of those elements into place "before" the anchoring end-of-group
                // item, and fire changed events on them if necessary.  Then we fire a changed
                // event on the anchor, and move on to the next group.  There is always at
                // least one group; the last group is anchored by a virtual "null" id at the
                // end.
                // Asymptotically: O(N k) where k is number of ops, or potentially
                // O(N log N) if inner loop of LCS were made to be binary search.
                //////// LCS (longest common sequence, with respect to _id)
                // (see Wikipedia article on Longest Increasing Subsequence,
                // where the LIS is taken of the sequence of old indices of the
                // docs in new_results)
                //
                // unmoved: the output of the algorithm; members of the LCS,
                // in the form of indices into new_results

                var unmoved = []; // max_seq_len: length of LCS found so far

                var max_seq_len = 0; // seq_ends[i]: the index into new_results of the last doc in a
                // common subsequence of length of i+1 <= max_seq_len

                var N = new_results.length;
                var seq_ends = new Array(N); // ptrs:  the common subsequence ending with new_results[n] extends
                // a common subsequence ending with new_results[ptr[n]], unless
                // ptr[n] is -1.

                var ptrs = new Array(N); // virtual sequence of old indices of new results

                var old_idx_seq = function (i_new) {
                  return old_index_of_id[new_results[i_new]._id];
                }; // for each item in new_results, use it to extend a common subsequence
                // of length j <= max_seq_len

                for (var i = 0; i < N; i++) {
                  if (old_index_of_id[new_results[i]._id] !== undefined) {
                    var j = max_seq_len; // this inner loop would traditionally be a binary search,
                    // but scanning backwards we will likely find a subseq to extend
                    // pretty soon, bounded for example by the total number of ops.
                    // If this were to be changed to a binary search, we'd still want
                    // to scan backwards a bit as an optimization.

                    while (j > 0) {
                      if (old_idx_seq(seq_ends[j - 1]) < old_idx_seq(i)) break;
                      j--;
                    }

                    ptrs[i] = j === 0 ? -1 : seq_ends[j - 1];
                    seq_ends[j] = i;
                    if (j + 1 > max_seq_len) max_seq_len = j + 1;
                  }
                } // pull out the LCS/LIS into unmoved

                var idx = max_seq_len === 0 ? -1 : seq_ends[max_seq_len - 1];

                while (idx >= 0) {
                  unmoved.push(idx);
                  idx = ptrs[idx];
                } // the unmoved item list is built backwards, so fix that

                unmoved.reverse(); // the last group is always anchored by the end of the result list, which is
                // an id of "null"

                unmoved.push(new_results.length);
                old_results.forEach(function (doc) {
                  if (!new_presence_of_id[doc._id])
                    observer.removed && observer.removed(doc._id);
                }); // for each group of things in the new_results that is anchored by an unmoved
                // element, iterate through the things before it.

                var startOfGroup = 0;
                unmoved.forEach(function (endOfGroup) {
                  var groupId = new_results[endOfGroup]
                    ? new_results[endOfGroup]._id
                    : null;
                  var oldDoc, newDoc, fields, projectedNew, projectedOld;

                  for (var i = startOfGroup; i < endOfGroup; i++) {
                    newDoc = new_results[i];

                    if (!hasOwn.call(old_index_of_id, newDoc._id)) {
                      fields = projectionFn(newDoc);
                      delete fields._id;
                      observer.addedBefore &&
                        observer.addedBefore(newDoc._id, fields, groupId);
                      observer.added && observer.added(newDoc._id, fields);
                    } else {
                      // moved
                      oldDoc = old_results[old_index_of_id[newDoc._id]];
                      projectedNew = projectionFn(newDoc);
                      projectedOld = projectionFn(oldDoc);
                      fields = DiffSequence.makeChangedFields(
                        projectedNew,
                        projectedOld
                      );

                      if (!isObjEmpty(fields)) {
                        observer.changed &&
                          observer.changed(newDoc._id, fields);
                      }

                      observer.movedBefore &&
                        observer.movedBefore(newDoc._id, groupId);
                    }
                  }

                  if (groupId) {
                    newDoc = new_results[endOfGroup];
                    oldDoc = old_results[old_index_of_id[newDoc._id]];
                    projectedNew = projectionFn(newDoc);
                    projectedOld = projectionFn(oldDoc);
                    fields = DiffSequence.makeChangedFields(
                      projectedNew,
                      projectedOld
                    );

                    if (!isObjEmpty(fields)) {
                      observer.changed && observer.changed(newDoc._id, fields);
                    }
                  }

                  startOfGroup = endOfGroup + 1;
                });
              }; // General helper for diff-ing two objects.
              // callbacks is an object like so:
              // { leftOnly: function (key, leftValue) {...},
              //   rightOnly: function (key, rightValue) {...},
              //   both: function (key, leftValue, rightValue) {...},
              // }

              DiffSequence.diffObjects = function (left, right, callbacks) {
                Object.keys(left).forEach((key) => {
                  const leftValue = left[key];

                  if (hasOwn.call(right, key)) {
                    callbacks.both &&
                      callbacks.both(key, leftValue, right[key]);
                  } else {
                    callbacks.leftOnly && callbacks.leftOnly(key, leftValue);
                  }
                });

                if (callbacks.rightOnly) {
                  Object.keys(right).forEach((key) => {
                    const rightValue = right[key];

                    if (!hasOwn.call(left, key)) {
                      callbacks.rightOnly(key, rightValue);
                    }
                  });
                }
              };

              DiffSequence.diffMaps = function (left, right, callbacks) {
                left.forEach(function (leftValue, key) {
                  if (right.has(key)) {
                    callbacks.both &&
                      callbacks.both(key, leftValue, right.get(key));
                  } else {
                    callbacks.leftOnly && callbacks.leftOnly(key, leftValue);
                  }
                });

                if (callbacks.rightOnly) {
                  right.forEach(function (rightValue, key) {
                    if (!left.has(key)) {
                      callbacks.rightOnly(key, rightValue);
                    }
                  });
                }
              };

              DiffSequence.makeChangedFields = function (newDoc, oldDoc) {
                var fields = {};
                DiffSequence.diffObjects(oldDoc, newDoc, {
                  leftOnly: function (key, value) {
                    fields[key] = undefined;
                  },
                  rightOnly: function (key, value) {
                    fields[key] = value;
                  },
                  both: function (key, leftValue, rightValue) {
                    if (!EJSON.equals(leftValue, rightValue))
                      fields[key] = rightValue;
                  },
                });
                return fields;
              };

              DiffSequence.applyChanges = function (doc, changeFields) {
                Object.keys(changeFields).forEach((key) => {
                  const value = changeFields[key];

                  if (typeof value === "undefined") {
                    delete doc[key];
                  } else {
                    doc[key] = value;
                  }
                });
              };
              /////////////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/diff-sequence/diff.js");

  /* Exports */
  Package._define("diff-sequence", _exports2, {
    DiffSequence: DiffSequence,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var EJSON = Package.ejson.EJSON;
  var IdMap = Package["id-map"].IdMap;
  var Random = Package.random.Random;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var hexString, MongoID;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          "mongo-id": {
            "id.js": function module(_require, _exports, _module) {
              ///////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                           //
              // packages/mongo-id/id.js                                                                   //
              //                                                                                           //
              ///////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module.export({
                MongoID: () => MongoID,
              });
              let EJSON;
              _module.link(
                "meteor/ejson",
                {
                  EJSON(v) {
                    EJSON = v;
                  },
                },
                0
              );
              let Random;
              _module.link(
                "meteor/random",
                {
                  Random(v) {
                    Random = v;
                  },
                },
                1
              );
              const MongoID = {};

              MongoID._looksLikeObjectID = (str) =>
                str.length === 24 && str.match(/^[0-9a-f]*$/);

              MongoID.ObjectID = class ObjectID {
                constructor(hexString) {
                  //random-based impl of Mongo ObjectID
                  if (hexString) {
                    hexString = hexString.toLowerCase();

                    if (!MongoID._looksLikeObjectID(hexString)) {
                      throw new Error(
                        "Invalid hexadecimal string for creating an ObjectID"
                      );
                    } // meant to work with _.isEqual(), which relies on structural equality

                    this._str = hexString;
                  } else {
                    this._str = Random.hexString(24);
                  }
                }

                equals(other) {
                  return (
                    other instanceof MongoID.ObjectID &&
                    this.valueOf() === other.valueOf()
                  );
                }

                toString() {
                  return 'ObjectID("'.concat(this._str, '")');
                }

                clone() {
                  return new MongoID.ObjectID(this._str);
                }

                typeName() {
                  return "oid";
                }

                getTimestamp() {
                  return Number.parseInt(this._str.substr(0, 8), 16);
                }

                valueOf() {
                  return this._str;
                }

                toJSONValue() {
                  return this.valueOf();
                }

                toHexString() {
                  return this.valueOf();
                }
              };
              EJSON.addType("oid", (str) => new MongoID.ObjectID(str));

              MongoID.idStringify = (id) => {
                if (id instanceof MongoID.ObjectID) {
                  return id.valueOf();
                } else if (typeof id === "string") {
                  if (id === "") {
                    return id;
                  } else if (
                    id.startsWith("-") || // escape previously dashed strings
                    id.startsWith("~") || // escape escaped numbers, true, false
                    MongoID._looksLikeObjectID(id) || // escape object-id-form strings
                    id.startsWith("{")
                  ) {
                    // escape object-form strings, for maybe implementing later
                    return "-".concat(id);
                  } else {
                    return id; // other strings go through unchanged.
                  }
                } else if (id === undefined) {
                  return "-";
                } else if (typeof id === "object" && id !== null) {
                  throw new Error(
                    "Meteor does not currently support objects other than ObjectID as ids"
                  );
                } else {
                  // Numbers, true, false, null
                  return "~".concat(JSON.stringify(id));
                }
              };

              MongoID.idParse = (id) => {
                if (id === "") {
                  return id;
                } else if (id === "-") {
                  return undefined;
                } else if (id.startsWith("-")) {
                  return id.substr(1);
                } else if (id.startsWith("~")) {
                  return JSON.parse(id.substr(1));
                } else if (MongoID._looksLikeObjectID(id)) {
                  return new MongoID.ObjectID(id);
                } else {
                  return id;
                }
              };
              ///////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/mongo-id/id.js");

  /* Exports */
  Package._define("mongo-id", _exports2, {
    MongoID: MongoID,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var check = Package.check.check;
  var Match = Package.check.Match;
  var Random = Package.random.Random;
  var EJSON = Package.ejson.EJSON;
  var Tracker = Package.tracker.Tracker;
  var Deps = Package.tracker.Deps;
  var Retry = Package.retry.Retry;
  var IdMap = Package["id-map"].IdMap;
  var Hook = Package["callback-hook"].Hook;
  var DDPCommon = Package["ddp-common"].DDPCommon;
  var Reload = Package.reload.Reload;
  var DiffSequence = Package["diff-sequence"].DiffSequence;
  var MongoID = Package["mongo-id"].MongoID;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var options, DDP;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          "ddp-client": {
            client: {
              "client.js": function module(_require, _exports, _module) {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //                                                                                                                     //
                // packages/ddp-client/client/client.js                                                                                //
                //                                                                                                                     //
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //
                _module.link(
                  "../common/namespace.js",
                  {
                    DDP: "DDP",
                  },
                  0
                );
                _module.link("../common/livedata_connection");
                _module.link("./client_convenience");
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              },
              "client_convenience.js": function module(
                _require3,
                _exports3,
                _module2
              ) {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //                                                                                                                     //
                // packages/ddp-client/client/client_convenience.js                                                                    //
                //                                                                                                                     //
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //
                let DDP;
                _module2.link(
                  "../common/namespace.js",
                  {
                    DDP(v) {
                      DDP = v;
                    },
                  },
                  0
                );
                let Meteor;
                _module2.link(
                  "meteor/meteor",
                  {
                    Meteor(v) {
                      Meteor = v;
                    },
                  },
                  1
                );

                // Meteor.refresh can be called on the client (if you're in common code) but it
                // only has an effect on the server.
                Meteor.refresh = () => {}; // By default, try to connect back to the same endpoint as the page
                // was served from.
                //
                // XXX We should be doing this a different way. Right now we don't
                // include ROOT_URL_PATH_PREFIX when computing ddpUrl. (We don't
                // include it on the server when computing
                // DDP_DEFAULT_CONNECTION_URL, and we don't include it in our
                // default, '/'.) We get by with this because DDP.connect then
                // forces the URL passed to it to be interpreted relative to the
                // app's deploy path, even if it is absolute. Instead, we should
                // make DDP_DEFAULT_CONNECTION_URL, if set, include the path prefix;
                // make the default ddpUrl be '' rather that '/'; and make
                // _translateUrl in stream_client_common.js not force absolute paths
                // to be treated like relative paths. See also
                // stream_client_common.js #RationalizingRelativeDDPURLs

                var ddpUrl = "/";

                if (typeof __meteor_runtime_config__ !== "undefined") {
                  if (__meteor_runtime_config__.DDP_DEFAULT_CONNECTION_URL)
                    ddpUrl =
                      __meteor_runtime_config__.DDP_DEFAULT_CONNECTION_URL;
                }

                var retry = new Retry();

                function onDDPVersionNegotiationFailure(description) {
                  Meteor._debug(description);

                  if (Package.reload) {
                    var migrationData =
                      Package.reload.Reload._migrationData("livedata") ||
                      Object.create(null);
                    var failures =
                      migrationData.DDPVersionNegotiationFailures || 0;
                    ++failures;

                    Package.reload.Reload._onMigrate("livedata", () => {
                      return [
                        true,
                        {
                          DDPVersionNegotiationFailures: failures,
                        },
                      ];
                    });

                    retry.retryLater(failures, () => {
                      Package.reload.Reload._reload();
                    });
                  }
                }

                Meteor.connection = DDP.connect(ddpUrl, {
                  onDDPVersionNegotiationFailure: onDDPVersionNegotiationFailure,
                }); // Proxy the public methods of Meteor.connection so they can
                // be called directly on Meteor.

                [
                  "subscribe",
                  "methods",
                  "call",
                  "apply",
                  "status",
                  "reconnect",
                  "disconnect",
                ].forEach((name) => {
                  Meteor[name] = Meteor.connection[name].bind(
                    Meteor.connection
                  );
                }); // Meteor.connection used to be called
                // Meteor.default_connection. Provide backcompat as a courtesy even
                // though it was never documented.
                // XXX COMPAT WITH 0.6.4

                Meteor.default_connection = Meteor.connection; // We should transition from Meteor.connect to DDP.connect.
                // XXX COMPAT WITH 0.6.4

                Meteor.connect = DDP.connect;
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              },
            },
            common: {
              "MethodInvoker.js": function module(
                _require4,
                _exports4,
                _module3
              ) {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //                                                                                                                     //
                // packages/ddp-client/common/MethodInvoker.js                                                                         //
                //                                                                                                                     //
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //
                _module3.export({
                  default: () => MethodInvoker,
                });

                class MethodInvoker {
                  constructor(options) {
                    // Public (within this file) fields.
                    this.methodId = options.methodId;
                    this.sentMessage = false;
                    this._callback = options.callback;
                    this._connection = options.connection;
                    this._message = options.message;

                    this._onResultReceived =
                      options.onResultReceived || (() => {});

                    this._wait = options.wait;
                    this.noRetry = options.noRetry;
                    this._methodResult = null;
                    this._dataVisible = false; // Register with the connection.

                    this._connection._methodInvokers[this.methodId] = this;
                  } // Sends the method message to the server. May be called additional times if
                  // we lose the connection and reconnect before receiving a result.

                  sendMessage() {
                    // This function is called before sending a method (including resending on
                    // reconnect). We should only (re)send methods where we don't already have a
                    // result!
                    if (this.gotResult())
                      throw new Error(
                        "sendingMethod is called on method with result"
                      ); // If we're re-sending it, it doesn't matter if data was written the first
                    // time.

                    this._dataVisible = false;
                    this.sentMessage = true; // If this is a wait method, make all data messages be buffered until it is
                    // done.

                    if (this._wait)
                      this._connection._methodsBlockingQuiescence[
                        this.methodId
                      ] = true; // Actually send the message.

                    this._connection._send(this._message);
                  } // Invoke the callback, if we have both a result and know that all data has
                  // been written to the local cache.

                  _maybeInvokeCallback() {
                    if (this._methodResult && this._dataVisible) {
                      // Call the callback. (This won't throw: the callback was wrapped with
                      // bindEnvironment.)
                      this._callback(
                        this._methodResult[0],
                        this._methodResult[1]
                      ); // Forget about this method.

                      delete this._connection._methodInvokers[this.methodId]; // Let the connection know that this method is finished, so it can try to
                      // move on to the next block of methods.

                      this._connection._outstandingMethodFinished();
                    }
                  } // Call with the result of the method from the server. Only may be called
                  // once; once it is called, you should not call sendMessage again.
                  // If the user provided an onResultReceived callback, call it immediately.
                  // Then invoke the main callback if data is also visible.

                  receiveResult(err, result) {
                    if (this.gotResult())
                      throw new Error(
                        "Methods should only receive results once"
                      );
                    this._methodResult = [err, result];

                    this._onResultReceived(err, result);

                    this._maybeInvokeCallback();
                  } // Call this when all data written by the method is visible. This means that
                  // the method has returns its "data is done" message *AND* all server
                  // documents that are buffered at that time have been written to the local
                  // cache. Invokes the main callback if the result has been received.

                  dataVisible() {
                    this._dataVisible = true;

                    this._maybeInvokeCallback();
                  } // True if receiveResult has been called.

                  gotResult() {
                    return !!this._methodResult;
                  }
                }
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              },
              "livedata_connection.js": function module(
                _require5,
                _exports5,
                _module4
              ) {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //                                                                                                                     //
                // packages/ddp-client/common/livedata_connection.js                                                                   //
                //                                                                                                                     //
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //
                let _objectSpread;

                _module4.link(
                  "@babel/runtime/helpers/objectSpread2",
                  {
                    default(v) {
                      _objectSpread = v;
                    },
                  },
                  0
                );
                _module4.export({
                  Connection: () => Connection,
                });
                let Meteor;
                _module4.link(
                  "meteor/meteor",
                  {
                    Meteor(v) {
                      Meteor = v;
                    },
                  },
                  0
                );
                let DDPCommon;
                _module4.link(
                  "meteor/ddp-common",
                  {
                    DDPCommon(v) {
                      DDPCommon = v;
                    },
                  },
                  1
                );
                let Tracker;
                _module4.link(
                  "meteor/tracker",
                  {
                    Tracker(v) {
                      Tracker = v;
                    },
                  },
                  2
                );
                let EJSON;
                _module4.link(
                  "meteor/ejson",
                  {
                    EJSON(v) {
                      EJSON = v;
                    },
                  },
                  3
                );
                let Random;
                _module4.link(
                  "meteor/random",
                  {
                    Random(v) {
                      Random = v;
                    },
                  },
                  4
                );
                let Hook;
                _module4.link(
                  "meteor/callback-hook",
                  {
                    Hook(v) {
                      Hook = v;
                    },
                  },
                  5
                );
                let MongoID;
                _module4.link(
                  "meteor/mongo-id",
                  {
                    MongoID(v) {
                      MongoID = v;
                    },
                  },
                  6
                );
                let DDP;
                _module4.link(
                  "./namespace.js",
                  {
                    DDP(v) {
                      DDP = v;
                    },
                  },
                  7
                );
                let MethodInvoker;
                _module4.link(
                  "./MethodInvoker.js",
                  {
                    default(v) {
                      MethodInvoker = v;
                    },
                  },
                  8
                );
                let hasOwn, slice, keys, isEmpty, last;
                _module4.link(
                  "meteor/ddp-common/utils.js",
                  {
                    hasOwn(v) {
                      hasOwn = v;
                    },

                    slice(v) {
                      slice = v;
                    },

                    keys(v) {
                      keys = v;
                    },

                    isEmpty(v) {
                      isEmpty = v;
                    },

                    last(v) {
                      last = v;
                    },
                  },
                  9
                );

                if (Meteor.isServer) {
                  var Fiber = Npm.require("fibers");

                  var Future = Npm.require("fibers/future");
                }

                class MongoIDMap extends IdMap {
                  constructor() {
                    super(MongoID.idStringify, MongoID.idParse);
                  }
                } // @param url {String|Object} URL to Meteor app,
                //   or an object as a test hook (see code)
                // Options:
                //   reloadWithOutstanding: is it OK to reload if there are outstanding methods?
                //   headers: extra headers to send on the websockets connection, for
                //     server-to-server DDP only
                //   _sockjsOptions: Specifies options to pass through to the sockjs client
                //   onDDPNegotiationVersionFailure: callback when version negotiation fails.
                //
                // XXX There should be a way to destroy a DDP connection, causing all
                // outstanding method calls to fail.
                //
                // XXX Our current way of handling failure and reconnection is great
                // for an app (where we want to tolerate being disconnected as an
                // expect state, and keep trying forever to reconnect) but cumbersome
                // for something like a command line tool that wants to make a
                // connection, call a method, and print an error if connection
                // fails. We should have better usability in the latter case (while
                // still transparently reconnecting if it's just a transient failure
                // or the server migrating us).

                class Connection {
                  constructor(url, options) {
                    var self = this;
                    this.options = options = _objectSpread(
                      {
                        onConnected() {},

                        onDDPVersionNegotiationFailure(description) {
                          Meteor._debug(description);
                        },

                        heartbeatInterval: 17500,
                        heartbeatTimeout: 15000,
                        npmFayeOptions: Object.create(null),
                        // These options are only for testing.
                        reloadWithOutstanding: false,
                        supportedDDPVersions: DDPCommon.SUPPORTED_DDP_VERSIONS,
                        retry: true,
                        respondToPings: true,
                        // When updates are coming within this ms interval, batch them together.
                        bufferedWritesInterval: 5,
                        // Flush buffers immediately if writes are happening continuously for more than this many ms.
                        bufferedWritesMaxAge: 500,
                      },
                      options
                    ); // If set, called when we reconnect, queuing method calls _before_ the
                    // existing outstanding ones.
                    // NOTE: This feature has been preserved for backwards compatibility. The
                    // preferred method of setting a callback on reconnect is to use
                    // DDP.onReconnect.

                    self.onReconnect = null; // as a test hook, allow passing a stream instead of a url.

                    if (typeof url === "object") {
                      self._stream = url;
                    } else {
                      const { ClientStream } = _require5(
                        "meteor/socket-stream-client"
                      );

                      self._stream = new ClientStream(url, {
                        retry: options.retry,
                        ConnectionError: DDP.ConnectionError,
                        headers: options.headers,
                        _sockjsOptions: options._sockjsOptions,
                        // Used to keep some tests quiet, or for other cases in which
                        // the right thing to do with connection errors is to silently
                        // fail (e.g. sending package usage stats). At some point we
                        // should have a real API for handling client-stream-level
                        // errors.
                        _dontPrintErrors: options._dontPrintErrors,
                        connectTimeoutMs: options.connectTimeoutMs,
                        npmFayeOptions: options.npmFayeOptions,
                      });
                    }

                    self._lastSessionId = null;
                    self._versionSuggestion = null; // The last proposed DDP version.

                    self._version = null; // The DDP version agreed on by client and server.

                    self._stores = Object.create(null); // name -> object with methods

                    self._methodHandlers = Object.create(null); // name -> func

                    self._nextMethodId = 1;
                    self._supportedDDPVersions = options.supportedDDPVersions;
                    self._heartbeatInterval = options.heartbeatInterval;
                    self._heartbeatTimeout = options.heartbeatTimeout; // Tracks methods which the user has tried to call but which have not yet
                    // called their user callback (ie, they are waiting on their result or for all
                    // of their writes to be written to the local cache). Map from method ID to
                    // MethodInvoker object.

                    self._methodInvokers = Object.create(null); // Tracks methods which the user has called but whose result messages have not
                    // arrived yet.
                    //
                    // _outstandingMethodBlocks is an array of blocks of methods. Each block
                    // represents a set of methods that can run at the same time. The first block
                    // represents the methods which are currently in flight; subsequent blocks
                    // must wait for previous blocks to be fully finished before they can be sent
                    // to the server.
                    //
                    // Each block is an object with the following fields:
                    // - methods: a list of MethodInvoker objects
                    // - wait: a boolean; if true, this block had a single method invoked with
                    //         the "wait" option
                    //
                    // There will never be adjacent blocks with wait=false, because the only thing
                    // that makes methods need to be serialized is a wait method.
                    //
                    // Methods are removed from the first block when their "result" is
                    // received. The entire first block is only removed when all of the in-flight
                    // methods have received their results (so the "methods" list is empty) *AND*
                    // all of the data written by those methods are visible in the local cache. So
                    // it is possible for the first block's methods list to be empty, if we are
                    // still waiting for some objects to quiesce.
                    //
                    // Example:
                    //  _outstandingMethodBlocks = [
                    //    {wait: false, methods: []},
                    //    {wait: true, methods: [<MethodInvoker for 'login'>]},
                    //    {wait: false, methods: [<MethodInvoker for 'foo'>,
                    //                            <MethodInvoker for 'bar'>]}]
                    // This means that there were some methods which were sent to the server and
                    // which have returned their results, but some of the data written by
                    // the methods may not be visible in the local cache. Once all that data is
                    // visible, we will send a 'login' method. Once the login method has returned
                    // and all the data is visible (including re-running subs if userId changes),
                    // we will send the 'foo' and 'bar' methods in parallel.

                    self._outstandingMethodBlocks = []; // method ID -> array of objects with keys 'collection' and 'id', listing
                    // documents written by a given method's stub. keys are associated with
                    // methods whose stub wrote at least one document, and whose data-done message
                    // has not yet been received.

                    self._documentsWrittenByStub = Object.create(null); // collection -> IdMap of "server document" object. A "server document" has:
                    // - "document": the version of the document according the
                    //   server (ie, the snapshot before a stub wrote it, amended by any changes
                    //   received from the server)
                    //   It is undefined if we think the document does not exist
                    // - "writtenByStubs": a set of method IDs whose stubs wrote to the document
                    //   whose "data done" messages have not yet been processed

                    self._serverDocuments = Object.create(null); // Array of callbacks to be called after the next update of the local
                    // cache. Used for:
                    //  - Calling methodInvoker.dataVisible and sub ready callbacks after
                    //    the relevant data is flushed.
                    //  - Invoking the callbacks of "half-finished" methods after reconnect
                    //    quiescence. Specifically, methods whose result was received over the old
                    //    connection (so we don't re-send it) but whose data had not been made
                    //    visible.

                    self._afterUpdateCallbacks = []; // In two contexts, we buffer all incoming data messages and then process them
                    // all at once in a single update:
                    //   - During reconnect, we buffer all data messages until all subs that had
                    //     been ready before reconnect are ready again, and all methods that are
                    //     active have returned their "data done message"; then
                    //   - During the execution of a "wait" method, we buffer all data messages
                    //     until the wait method gets its "data done" message. (If the wait method
                    //     occurs during reconnect, it doesn't get any special handling.)
                    // all data messages are processed in one update.
                    //
                    // The following fields are used for this "quiescence" process.
                    // This buffers the messages that aren't being processed yet.

                    self._messagesBufferedUntilQuiescence = []; // Map from method ID -> true. Methods are removed from this when their
                    // "data done" message is received, and we will not quiesce until it is
                    // empty.

                    self._methodsBlockingQuiescence = Object.create(null); // map from sub ID -> true for subs that were ready (ie, called the sub
                    // ready callback) before reconnect but haven't become ready again yet

                    self._subsBeingRevived = Object.create(null); // map from sub._id -> true
                    // if true, the next data update should reset all stores. (set during
                    // reconnect.)

                    self._resetStores = false; // name -> array of updates for (yet to be created) collections

                    self._updatesForUnknownStores = Object.create(null); // if we're blocking a migration, the retry func

                    self._retryMigrate = null;
                    self.__flushBufferedWrites = Meteor.bindEnvironment(
                      self._flushBufferedWrites,
                      "flushing DDP buffered writes",
                      self
                    ); // Collection name -> array of messages.

                    self._bufferedWrites = Object.create(null); // When current buffer of updates must be flushed at, in ms timestamp.

                    self._bufferedWritesFlushAt = null; // Timeout handle for the next processing of all pending writes

                    self._bufferedWritesFlushHandle = null;
                    self._bufferedWritesInterval =
                      options.bufferedWritesInterval;
                    self._bufferedWritesMaxAge = options.bufferedWritesMaxAge; // metadata for subscriptions.  Map from sub ID to object with keys:
                    //   - id
                    //   - name
                    //   - params
                    //   - inactive (if true, will be cleaned up if not reused in re-run)
                    //   - ready (has the 'ready' message been received?)
                    //   - readyCallback (an optional callback to call when ready)
                    //   - errorCallback (an optional callback to call if the sub terminates with
                    //                    an error, XXX COMPAT WITH 1.0.3.1)
                    //   - stopCallback (an optional callback to call when the sub terminates
                    //     for any reason, with an error argument if an error triggered the stop)

                    self._subscriptions = Object.create(null); // Reactive userId.

                    self._userId = null;
                    self._userIdDeps = new Tracker.Dependency(); // Block auto-reload while we're waiting for method responses.

                    if (
                      Meteor.isClient &&
                      Package.reload &&
                      !options.reloadWithOutstanding
                    ) {
                      Package.reload.Reload._onMigrate((retry) => {
                        if (!self._readyToMigrate()) {
                          if (self._retryMigrate)
                            throw new Error("Two migrations in progress?");
                          self._retryMigrate = retry;
                          return false;
                        } else {
                          return [true];
                        }
                      });
                    }

                    var onDisconnect = () => {
                      if (self._heartbeat) {
                        self._heartbeat.stop();

                        self._heartbeat = null;
                      }
                    };

                    if (Meteor.isServer) {
                      self._stream.on(
                        "message",
                        Meteor.bindEnvironment(
                          this.onMessage.bind(this),
                          "handling DDP message"
                        )
                      );

                      self._stream.on(
                        "reset",
                        Meteor.bindEnvironment(
                          this.onReset.bind(this),
                          "handling DDP reset"
                        )
                      );

                      self._stream.on(
                        "disconnect",
                        Meteor.bindEnvironment(
                          onDisconnect,
                          "handling DDP disconnect"
                        )
                      );
                    } else {
                      self._stream.on("message", this.onMessage.bind(this));

                      self._stream.on("reset", this.onReset.bind(this));

                      self._stream.on("disconnect", onDisconnect);
                    }
                  } // 'name' is the name of the data on the wire that should go in the
                  // store. 'wrappedStore' should be an object with methods beginUpdate, update,
                  // endUpdate, saveOriginals, retrieveOriginals. see Collection for an example.

                  registerStore(name, wrappedStore) {
                    var self = this;
                    if (name in self._stores) return false; // Wrap the input object in an object which makes any store method not
                    // implemented by 'store' into a no-op.

                    var store = Object.create(null);
                    [
                      "update",
                      "beginUpdate",
                      "endUpdate",
                      "saveOriginals",
                      "retrieveOriginals",
                      "getDoc",
                      "_getCollection",
                    ].forEach((method) => {
                      store[method] = function () {
                        if (wrappedStore[method]) {
                          return wrappedStore[method](...arguments);
                        }
                      };
                    });
                    self._stores[name] = store;
                    var queued = self._updatesForUnknownStores[name];

                    if (queued) {
                      store.beginUpdate(queued.length, false);
                      queued.forEach((msg) => {
                        store.update(msg);
                      });
                      store.endUpdate();
                      delete self._updatesForUnknownStores[name];
                    }

                    return true;
                  }
                  /**
                   * @memberOf Meteor
                   * @importFromPackage meteor
                   * @alias Meteor.subscribe
                   * @summary Subscribe to a record set.  Returns a handle that provides
                   * `stop()` and `ready()` methods.
                   * @locus Client
                   * @param {String} name Name of the subscription.  Matches the name of the
                   * server's `publish()` call.
                   * @param {EJSONable} [arg1,arg2...] Optional arguments passed to publisher
                   * function on server.
                   * @param {Function|Object} [callbacks] Optional. May include `onStop`
                   * and `onReady` callbacks. If there is an error, it is passed as an
                   * argument to `onStop`. If a function is passed instead of an object, it
                   * is interpreted as an `onReady` callback.
                   */

                  subscribe(
                    name
                    /* .. [arguments] .. (callback|callbacks) */
                  ) {
                    var self = this;
                    var params = slice.call(arguments, 1);
                    var callbacks = Object.create(null);

                    if (params.length) {
                      var lastParam = params[params.length - 1];

                      if (typeof lastParam === "function") {
                        callbacks.onReady = params.pop();
                      } else if (
                        lastParam &&
                        [
                          lastParam.onReady, // XXX COMPAT WITH 1.0.3.1 onError used to exist, but now we use
                          // onStop with an error callback instead.
                          lastParam.onError,
                          lastParam.onStop,
                        ].some((f) => typeof f === "function")
                      ) {
                        callbacks = params.pop();
                      }
                    } // Is there an existing sub with the same name and param, run in an
                    // invalidated Computation? This will happen if we are rerunning an
                    // existing computation.
                    //
                    // For example, consider a rerun of:
                    //
                    //     Tracker.autorun(function () {
                    //       Meteor.subscribe("foo", Session.get("foo"));
                    //       Meteor.subscribe("bar", Session.get("bar"));
                    //     });
                    //
                    // If "foo" has changed but "bar" has not, we will match the "bar"
                    // subcribe to an existing inactive subscription in order to not
                    // unsub and resub the subscription unnecessarily.
                    //
                    // We only look for one such sub; if there are N apparently-identical subs
                    // being invalidated, we will require N matching subscribe calls to keep
                    // them all active.

                    var existing;
                    keys(self._subscriptions).some((id) => {
                      const sub = self._subscriptions[id];

                      if (
                        sub.inactive &&
                        sub.name === name &&
                        EJSON.equals(sub.params, params)
                      ) {
                        return (existing = sub);
                      }
                    });
                    var id;

                    if (existing) {
                      id = existing.id;
                      existing.inactive = false; // reactivate

                      if (callbacks.onReady) {
                        // If the sub is not already ready, replace any ready callback with the
                        // one provided now. (It's not really clear what users would expect for
                        // an onReady callback inside an autorun; the semantics we provide is
                        // that at the time the sub first becomes ready, we call the last
                        // onReady callback provided, if any.)
                        // If the sub is already ready, run the ready callback right away.
                        // It seems that users would expect an onReady callback inside an
                        // autorun to trigger once the the sub first becomes ready and also
                        // when re-subs happens.
                        if (existing.ready) {
                          callbacks.onReady();
                        } else {
                          existing.readyCallback = callbacks.onReady;
                        }
                      } // XXX COMPAT WITH 1.0.3.1 we used to have onError but now we call
                      // onStop with an optional error argument

                      if (callbacks.onError) {
                        // Replace existing callback if any, so that errors aren't
                        // double-reported.
                        existing.errorCallback = callbacks.onError;
                      }

                      if (callbacks.onStop) {
                        existing.stopCallback = callbacks.onStop;
                      }
                    } else {
                      // New sub! Generate an id, save it locally, and send message.
                      id = Random.id();
                      self._subscriptions[id] = {
                        id: id,
                        name: name,
                        params: EJSON.clone(params),
                        inactive: false,
                        ready: false,
                        readyDeps: new Tracker.Dependency(),
                        readyCallback: callbacks.onReady,
                        // XXX COMPAT WITH 1.0.3.1 #errorCallback
                        errorCallback: callbacks.onError,
                        stopCallback: callbacks.onStop,
                        connection: self,

                        remove() {
                          delete this.connection._subscriptions[this.id];
                          this.ready && this.readyDeps.changed();
                        },

                        stop() {
                          this.connection._send({
                            msg: "unsub",
                            id: id,
                          });

                          this.remove();

                          if (callbacks.onStop) {
                            callbacks.onStop();
                          }
                        },
                      };

                      self._send({
                        msg: "sub",
                        id: id,
                        name: name,
                        params: params,
                      });
                    } // return a handle to the application.

                    var handle = {
                      stop() {
                        if (!hasOwn.call(self._subscriptions, id)) {
                          return;
                        }

                        self._subscriptions[id].stop();
                      },

                      ready() {
                        // return false if we've unsubscribed.
                        if (!hasOwn.call(self._subscriptions, id)) {
                          return false;
                        }

                        var record = self._subscriptions[id];
                        record.readyDeps.depend();
                        return record.ready;
                      },

                      subscriptionId: id,
                    };

                    if (Tracker.active) {
                      // We're in a reactive computation, so we'd like to unsubscribe when the
                      // computation is invalidated... but not if the rerun just re-subscribes
                      // to the same subscription!  When a rerun happens, we use onInvalidate
                      // as a change to mark the subscription "inactive" so that it can
                      // be reused from the rerun.  If it isn't reused, it's killed from
                      // an afterFlush.
                      Tracker.onInvalidate((c) => {
                        if (hasOwn.call(self._subscriptions, id)) {
                          self._subscriptions[id].inactive = true;
                        }

                        Tracker.afterFlush(() => {
                          if (
                            hasOwn.call(self._subscriptions, id) &&
                            self._subscriptions[id].inactive
                          ) {
                            handle.stop();
                          }
                        });
                      });
                    }

                    return handle;
                  } // options:
                  // - onLateError {Function(error)} called if an error was received after the ready event.
                  //     (errors received before ready cause an error to be thrown)

                  _subscribeAndWait(name, args, options) {
                    var self = this;
                    var f = new Future();
                    var ready = false;
                    var handle;
                    args = args || [];
                    args.push({
                      onReady() {
                        ready = true;
                        f["return"]();
                      },

                      onError(e) {
                        if (!ready) f["throw"](e);
                        else
                          options &&
                            options.onLateError &&
                            options.onLateError(e);
                      },
                    });
                    handle = self.subscribe.apply(self, [name].concat(args));
                    f.wait();
                    return handle;
                  }

                  methods(methods) {
                    keys(methods).forEach((name) => {
                      const func = methods[name];

                      if (typeof func !== "function") {
                        throw new Error(
                          "Method '" + name + "' must be a function"
                        );
                      }

                      if (this._methodHandlers[name]) {
                        throw new Error(
                          "A method named '" + name + "' is already defined"
                        );
                      }

                      this._methodHandlers[name] = func;
                    });
                  }
                  /**
                   * @memberOf Meteor
                   * @importFromPackage meteor
                   * @alias Meteor.call
                   * @summary Invokes a method passing any number of arguments.
                   * @locus Anywhere
                   * @param {String} name Name of method to invoke
                   * @param {EJSONable} [arg1,arg2...] Optional method arguments
                   * @param {Function} [asyncCallback] Optional callback, which is called asynchronously with the error or result after the method is complete. If not provided, the method runs synchronously if possible (see below).
                   */

                  call(
                    name
                    /* .. [arguments] .. callback */
                  ) {
                    // if it's a function, the last argument is the result callback,
                    // not a parameter to the remote method.
                    var args = slice.call(arguments, 1);
                    if (
                      args.length &&
                      typeof args[args.length - 1] === "function"
                    )
                      var callback = args.pop();
                    return this.apply(name, args, callback);
                  }
                  /**
                   * @memberOf Meteor
                   * @importFromPackage meteor
                   * @alias Meteor.apply
                   * @summary Invoke a method passing an array of arguments.
                   * @locus Anywhere
                   * @param {String} name Name of method to invoke
                   * @param {EJSONable[]} args Method arguments
                   * @param {Object} [options]
                   * @param {Boolean} options.wait (Client only) If true, don't send this method until all previous method calls have completed, and don't send any subsequent method calls until this one is completed.
                   * @param {Function} options.onResultReceived (Client only) This callback is invoked with the error or result of the method (just like `asyncCallback`) as soon as the error or result is available. The local cache may not yet reflect the writes performed by the method.
                   * @param {Boolean} options.noRetry (Client only) if true, don't send this method again on reload, simply call the callback an error with the error code 'invocation-failed'.
                   * @param {Boolean} options.throwStubExceptions (Client only) If true, exceptions thrown by method stubs will be thrown instead of logged, and the method will not be invoked on the server.
                   * @param {Boolean} options.returnStubValue (Client only) If true then in cases where we would have otherwise discarded the stub's return value and returned undefined, instead we go ahead and return it. Specifically, this is any time other than when (a) we are already inside a stub or (b) we are in Node and no callback was provided. Currently we require this flag to be explicitly passed to reduce the likelihood that stub return values will be confused with server return values; we may improve this in future.
                   * @param {Function} [asyncCallback] Optional callback; same semantics as in [`Meteor.call`](#meteor_call).
                   */

                  apply(name, args, options, callback) {
                    var self = this; // We were passed 3 arguments. They may be either (name, args, options)
                    // or (name, args, callback)

                    if (!callback && typeof options === "function") {
                      callback = options;
                      options = Object.create(null);
                    }

                    options = options || Object.create(null);

                    if (callback) {
                      // XXX would it be better form to do the binding in stream.on,
                      // or caller, instead of here?
                      // XXX improve error message (and how we report it)
                      callback = Meteor.bindEnvironment(
                        callback,
                        "delivering result of invoking '" + name + "'"
                      );
                    } // Keep our args safe from mutation (eg if we don't send the message for a
                    // while because of a wait method).

                    args = EJSON.clone(args);

                    var enclosing = DDP._CurrentMethodInvocation.get();

                    var alreadyInSimulation =
                      enclosing && enclosing.isSimulation; // Lazily generate a randomSeed, only if it is requested by the stub.
                    // The random streams only have utility if they're used on both the client
                    // and the server; if the client doesn't generate any 'random' values
                    // then we don't expect the server to generate any either.
                    // Less commonly, the server may perform different actions from the client,
                    // and may in fact generate values where the client did not, but we don't
                    // have any client-side values to match, so even here we may as well just
                    // use a random seed on the server.  In that case, we don't pass the
                    // randomSeed to save bandwidth, and we don't even generate it to save a
                    // bit of CPU and to avoid consuming entropy.

                    var randomSeed = null;

                    var randomSeedGenerator = () => {
                      if (randomSeed === null) {
                        randomSeed = DDPCommon.makeRpcSeed(enclosing, name);
                      }

                      return randomSeed;
                    }; // Run the stub, if we have one. The stub is supposed to make some
                    // temporary writes to the database to give the user a smooth experience
                    // until the actual result of executing the method comes back from the
                    // server (whereupon the temporary writes to the database will be reversed
                    // during the beginUpdate/endUpdate process.)
                    //
                    // Normally, we ignore the return value of the stub (even if it is an
                    // exception), in favor of the real return value from the server. The
                    // exception is if the *caller* is a stub. In that case, we're not going
                    // to do a RPC, so we use the return value of the stub as our return
                    // value.

                    var stub = self._methodHandlers[name];

                    if (stub) {
                      var setUserId = (userId) => {
                        self.setUserId(userId);
                      };

                      var invocation = new DDPCommon.MethodInvocation({
                        isSimulation: true,
                        userId: self.userId(),
                        setUserId: setUserId,

                        randomSeed() {
                          return randomSeedGenerator();
                        },
                      });
                      if (!alreadyInSimulation) self._saveOriginals();

                      try {
                        // Note that unlike in the corresponding server code, we never audit
                        // that stubs check() their arguments.
                        var stubReturnValue = DDP._CurrentMethodInvocation.withValue(
                          invocation,
                          () => {
                            if (Meteor.isServer) {
                              // Because saveOriginals and retrieveOriginals aren't reentrant,
                              // don't allow stubs to yield.
                              return Meteor._noYieldsAllowed(() => {
                                // re-clone, so that the stub can't affect our caller's values
                                return stub.apply(
                                  invocation,
                                  EJSON.clone(args)
                                );
                              });
                            } else {
                              return stub.apply(invocation, EJSON.clone(args));
                            }
                          }
                        );
                      } catch (e) {
                        var exception = e;
                      }
                    } // If we're in a simulation, stop and return the result we have,
                    // rather than going on to do an RPC. If there was no stub,
                    // we'll end up returning undefined.

                    if (alreadyInSimulation) {
                      if (callback) {
                        callback(exception, stubReturnValue);
                        return undefined;
                      }

                      if (exception) throw exception;
                      return stubReturnValue;
                    } // We only create the methodId here because we don't actually need one if
                    // we're already in a simulation

                    const methodId = "" + self._nextMethodId++;

                    if (stub) {
                      self._retrieveAndStoreOriginals(methodId);
                    } // Generate the DDP message for the method call. Note that on the client,
                    // it is important that the stub have finished before we send the RPC, so
                    // that we know we have a complete list of which local documents the stub
                    // wrote.

                    var message = {
                      msg: "method",
                      method: name,
                      params: args,
                      id: methodId,
                    }; // If an exception occurred in a stub, and we're ignoring it
                    // because we're doing an RPC and want to use what the server
                    // returns instead, log it so the developer knows
                    // (unless they explicitly ask to see the error).
                    //
                    // Tests can set the '_expectedByTest' flag on an exception so it won't
                    // go to log.

                    if (exception) {
                      if (options.throwStubExceptions) {
                        throw exception;
                      } else if (!exception._expectedByTest) {
                        Meteor._debug(
                          "Exception while simulating the effect of invoking '" +
                            name +
                            "'",
                          exception
                        );
                      }
                    } // At this point we're definitely doing an RPC, and we're going to
                    // return the value of the RPC to the caller.
                    // If the caller didn't give a callback, decide what to do.

                    if (!callback) {
                      if (Meteor.isClient) {
                        // On the client, we don't have fibers, so we can't block. The
                        // only thing we can do is to return undefined and discard the
                        // result of the RPC. If an error occurred then print the error
                        // to the console.
                        callback = (err) => {
                          err &&
                            Meteor._debug(
                              "Error invoking Method '" + name + "'",
                              err
                            );
                        };
                      } else {
                        // On the server, make the function synchronous. Throw on
                        // errors, return on success.
                        var future = new Future();
                        callback = future.resolver();
                      }
                    } // Send the randomSeed only if we used it

                    if (randomSeed !== null) {
                      message.randomSeed = randomSeed;
                    }

                    var methodInvoker = new MethodInvoker({
                      methodId,
                      callback: callback,
                      connection: self,
                      onResultReceived: options.onResultReceived,
                      wait: !!options.wait,
                      message: message,
                      noRetry: !!options.noRetry,
                    });

                    if (options.wait) {
                      // It's a wait method! Wait methods go in their own block.
                      self._outstandingMethodBlocks.push({
                        wait: true,
                        methods: [methodInvoker],
                      });
                    } else {
                      // Not a wait method. Start a new block if the previous block was a wait
                      // block, and add it to the last block of methods.
                      if (
                        isEmpty(self._outstandingMethodBlocks) ||
                        last(self._outstandingMethodBlocks).wait
                      ) {
                        self._outstandingMethodBlocks.push({
                          wait: false,
                          methods: [],
                        });
                      }

                      last(self._outstandingMethodBlocks).methods.push(
                        methodInvoker
                      );
                    } // If we added it to the first block, send it out now.

                    if (self._outstandingMethodBlocks.length === 1)
                      methodInvoker.sendMessage(); // If we're using the default callback on the server,
                    // block waiting for the result.

                    if (future) {
                      return future.wait();
                    }

                    return options.returnStubValue
                      ? stubReturnValue
                      : undefined;
                  } // Before calling a method stub, prepare all stores to track changes and allow
                  // _retrieveAndStoreOriginals to get the original versions of changed
                  // documents.

                  _saveOriginals() {
                    if (!this._waitingForQuiescence()) {
                      this._flushBufferedWrites();
                    }

                    keys(this._stores).forEach((storeName) => {
                      this._stores[storeName].saveOriginals();
                    });
                  } // Retrieves the original versions of all documents modified by the stub for
                  // method 'methodId' from all stores and saves them to _serverDocuments (keyed
                  // by document) and _documentsWrittenByStub (keyed by method ID).

                  _retrieveAndStoreOriginals(methodId) {
                    var self = this;
                    if (self._documentsWrittenByStub[methodId])
                      throw new Error(
                        "Duplicate methodId in _retrieveAndStoreOriginals"
                      );
                    var docsWritten = [];
                    keys(self._stores).forEach((collection) => {
                      var originals = self._stores[
                        collection
                      ].retrieveOriginals(); // not all stores define retrieveOriginals

                      if (!originals) return;
                      originals.forEach((doc, id) => {
                        docsWritten.push({
                          collection,
                          id,
                        });

                        if (!hasOwn.call(self._serverDocuments, collection)) {
                          self._serverDocuments[collection] = new MongoIDMap();
                        }

                        var serverDoc = self._serverDocuments[
                          collection
                        ].setDefault(id, Object.create(null));

                        if (serverDoc.writtenByStubs) {
                          // We're not the first stub to write this doc. Just add our method ID
                          // to the record.
                          serverDoc.writtenByStubs[methodId] = true;
                        } else {
                          // First stub! Save the original value and our method ID.
                          serverDoc.document = doc;
                          serverDoc.flushCallbacks = [];
                          serverDoc.writtenByStubs = Object.create(null);
                          serverDoc.writtenByStubs[methodId] = true;
                        }
                      });
                    });

                    if (!isEmpty(docsWritten)) {
                      self._documentsWrittenByStub[methodId] = docsWritten;
                    }
                  } // This is very much a private function we use to make the tests
                  // take up fewer server resources after they complete.

                  _unsubscribeAll() {
                    keys(this._subscriptions).forEach((id) => {
                      const sub = this._subscriptions[id]; // Avoid killing the autoupdate subscription so that developers
                      // still get hot code pushes when writing tests.
                      //
                      // XXX it's a hack to encode knowledge about autoupdate here,
                      // but it doesn't seem worth it yet to have a special API for
                      // subscriptions to preserve after unit tests.

                      if (sub.name !== "meteor_autoupdate_clientVersions") {
                        sub.stop();
                      }
                    });
                  } // Sends the DDP stringification of the given message object

                  _send(obj) {
                    this._stream.send(DDPCommon.stringifyDDP(obj));
                  } // We detected via DDP-level heartbeats that we've lost the
                  // connection.  Unlike `disconnect` or `close`, a lost connection
                  // will be automatically retried.

                  _lostConnection(error) {
                    this._stream._lostConnection(error);
                  }
                  /**
                   * @memberOf Meteor
                   * @importFromPackage meteor
                   * @alias Meteor.status
                   * @summary Get the current connection status. A reactive data source.
                   * @locus Client
                   */

                  status() {
                    return this._stream.status(...arguments);
                  }
                  /**
                 * @summary Force an immediate reconnection attempt if the client is not connected to the server.
                 This method does nothing if the client is already connected.
                 * @memberOf Meteor
                 * @importFromPackage meteor
                 * @alias Meteor.reconnect
                 * @locus Client
                 */

                  reconnect() {
                    return this._stream.reconnect(...arguments);
                  }
                  /**
                   * @memberOf Meteor
                   * @importFromPackage meteor
                   * @alias Meteor.disconnect
                   * @summary Disconnect the client from the server.
                   * @locus Client
                   */

                  disconnect() {
                    return this._stream.disconnect(...arguments);
                  }

                  close() {
                    return this._stream.disconnect({
                      _permanent: true,
                    });
                  } ///
                  /// Reactive user system
                  ///

                  userId() {
                    if (this._userIdDeps) this._userIdDeps.depend();
                    return this._userId;
                  }

                  setUserId(userId) {
                    // Avoid invalidating dependents if setUserId is called with current value.
                    if (this._userId === userId) return;
                    this._userId = userId;
                    if (this._userIdDeps) this._userIdDeps.changed();
                  } // Returns true if we are in a state after reconnect of waiting for subs to be
                  // revived or early methods to finish their data, or we are waiting for a
                  // "wait" method to finish.

                  _waitingForQuiescence() {
                    return (
                      !isEmpty(this._subsBeingRevived) ||
                      !isEmpty(this._methodsBlockingQuiescence)
                    );
                  } // Returns true if any method whose message has been sent to the server has
                  // not yet invoked its user callback.

                  _anyMethodsAreOutstanding() {
                    const invokers = this._methodInvokers;
                    return keys(invokers).some((id) => {
                      return invokers[id].sentMessage;
                    });
                  }

                  _livedata_connected(msg) {
                    var self = this;

                    if (
                      self._version !== "pre1" &&
                      self._heartbeatInterval !== 0
                    ) {
                      self._heartbeat = new DDPCommon.Heartbeat({
                        heartbeatInterval: self._heartbeatInterval,
                        heartbeatTimeout: self._heartbeatTimeout,

                        onTimeout() {
                          self._lostConnection(
                            new DDP.ConnectionError("DDP heartbeat timed out")
                          );
                        },

                        sendPing() {
                          self._send({
                            msg: "ping",
                          });
                        },
                      });

                      self._heartbeat.start();
                    } // If this is a reconnect, we'll have to reset all stores.

                    if (self._lastSessionId) self._resetStores = true;

                    if (typeof msg.session === "string") {
                      var reconnectedToPreviousSession =
                        self._lastSessionId === msg.session;
                      self._lastSessionId = msg.session;
                    }

                    if (reconnectedToPreviousSession) {
                      // Successful reconnection -- pick up where we left off.  Note that right
                      // now, this never happens: the server never connects us to a previous
                      // session, because DDP doesn't provide enough data for the server to know
                      // what messages the client has processed. We need to improve DDP to make
                      // this possible, at which point we'll probably need more code here.
                      return;
                    } // Server doesn't have our data any more. Re-sync a new session.
                    // Forget about messages we were buffering for unknown collections. They'll
                    // be resent if still relevant.

                    self._updatesForUnknownStores = Object.create(null);

                    if (self._resetStores) {
                      // Forget about the effects of stubs. We'll be resetting all collections
                      // anyway.
                      self._documentsWrittenByStub = Object.create(null);
                      self._serverDocuments = Object.create(null);
                    } // Clear _afterUpdateCallbacks.

                    self._afterUpdateCallbacks = []; // Mark all named subscriptions which are ready (ie, we already called the
                    // ready callback) as needing to be revived.
                    // XXX We should also block reconnect quiescence until unnamed subscriptions
                    //     (eg, autopublish) are done re-publishing to avoid flicker!

                    self._subsBeingRevived = Object.create(null);
                    keys(self._subscriptions).forEach((id) => {
                      if (self._subscriptions[id].ready) {
                        self._subsBeingRevived[id] = true;
                      }
                    }); // Arrange for "half-finished" methods to have their callbacks run, and
                    // track methods that were sent on this connection so that we don't
                    // quiesce until they are all done.
                    //
                    // Start by clearing _methodsBlockingQuiescence: methods sent before
                    // reconnect don't matter, and any "wait" methods sent on the new connection
                    // that we drop here will be restored by the loop below.

                    self._methodsBlockingQuiescence = Object.create(null);

                    if (self._resetStores) {
                      const invokers = self._methodInvokers;
                      keys(invokers).forEach((id) => {
                        const invoker = invokers[id];

                        if (invoker.gotResult()) {
                          // This method already got its result, but it didn't call its callback
                          // because its data didn't become visible. We did not resend the
                          // method RPC. We'll call its callback when we get a full quiesce,
                          // since that's as close as we'll get to "data must be visible".
                          self._afterUpdateCallbacks.push(function () {
                            return invoker.dataVisible(...arguments);
                          });
                        } else if (invoker.sentMessage) {
                          // This method has been sent on this connection (maybe as a resend
                          // from the last connection, maybe from onReconnect, maybe just very
                          // quickly before processing the connected message).
                          //
                          // We don't need to do anything special to ensure its callbacks get
                          // called, but we'll count it as a method which is preventing
                          // reconnect quiescence. (eg, it might be a login method that was run
                          // from onReconnect, and we don't want to see flicker by seeing a
                          // logged-out state.)
                          self._methodsBlockingQuiescence[
                            invoker.methodId
                          ] = true;
                        }
                      });
                    }

                    self._messagesBufferedUntilQuiescence = []; // If we're not waiting on any methods or subs, we can reset the stores and
                    // call the callbacks immediately.

                    if (!self._waitingForQuiescence()) {
                      if (self._resetStores) {
                        keys(self._stores).forEach((storeName) => {
                          const s = self._stores[storeName];
                          s.beginUpdate(0, true);
                          s.endUpdate();
                        });
                        self._resetStores = false;
                      }

                      self._runAfterUpdateCallbacks();
                    }
                  }

                  _processOneDataMessage(msg, updates) {
                    const messageType = msg.msg; // msg is one of ['added', 'changed', 'removed', 'ready', 'updated']

                    if (messageType === "added") {
                      this._process_added(msg, updates);
                    } else if (messageType === "changed") {
                      this._process_changed(msg, updates);
                    } else if (messageType === "removed") {
                      this._process_removed(msg, updates);
                    } else if (messageType === "ready") {
                      this._process_ready(msg, updates);
                    } else if (messageType === "updated") {
                      this._process_updated(msg, updates);
                    } else if (messageType === "nosub") {
                      // ignore this
                    } else {
                      Meteor._debug(
                        "discarding unknown livedata data message type",
                        msg
                      );
                    }
                  }

                  _livedata_data(msg) {
                    var self = this;

                    if (self._waitingForQuiescence()) {
                      self._messagesBufferedUntilQuiescence.push(msg);

                      if (msg.msg === "nosub") {
                        delete self._subsBeingRevived[msg.id];
                      }

                      if (msg.subs) {
                        msg.subs.forEach((subId) => {
                          delete self._subsBeingRevived[subId];
                        });
                      }

                      if (msg.methods) {
                        msg.methods.forEach((methodId) => {
                          delete self._methodsBlockingQuiescence[methodId];
                        });
                      }

                      if (self._waitingForQuiescence()) {
                        return;
                      } // No methods or subs are blocking quiescence!
                      // We'll now process and all of our buffered messages, reset all stores,
                      // and apply them all at once.

                      const bufferedMessages =
                        self._messagesBufferedUntilQuiescence;
                      keys(bufferedMessages).forEach((id) => {
                        self._processOneDataMessage(
                          bufferedMessages[id],
                          self._bufferedWrites
                        );
                      });
                      self._messagesBufferedUntilQuiescence = [];
                    } else {
                      self._processOneDataMessage(msg, self._bufferedWrites);
                    } // Immediately flush writes when:
                    //  1. Buffering is disabled. Or;
                    //  2. any non-(added/changed/removed) message arrives.

                    var standardWrite =
                      msg.msg === "added" ||
                      msg.msg === "changed" ||
                      msg.msg === "removed";

                    if (self._bufferedWritesInterval === 0 || !standardWrite) {
                      self._flushBufferedWrites();

                      return;
                    }

                    if (self._bufferedWritesFlushAt === null) {
                      self._bufferedWritesFlushAt =
                        new Date().valueOf() + self._bufferedWritesMaxAge;
                    } else if (
                      self._bufferedWritesFlushAt < new Date().valueOf()
                    ) {
                      self._flushBufferedWrites();

                      return;
                    }

                    if (self._bufferedWritesFlushHandle) {
                      clearTimeout(self._bufferedWritesFlushHandle);
                    }

                    self._bufferedWritesFlushHandle = setTimeout(
                      self.__flushBufferedWrites,
                      self._bufferedWritesInterval
                    );
                  }

                  _flushBufferedWrites() {
                    var self = this;

                    if (self._bufferedWritesFlushHandle) {
                      clearTimeout(self._bufferedWritesFlushHandle);
                      self._bufferedWritesFlushHandle = null;
                    }

                    self._bufferedWritesFlushAt = null; // We need to clear the buffer before passing it to
                    //  performWrites. As there's no guarantee that it
                    //  will exit cleanly.

                    var writes = self._bufferedWrites;
                    self._bufferedWrites = Object.create(null);

                    self._performWrites(writes);
                  }

                  _performWrites(updates) {
                    var self = this;

                    if (self._resetStores || !isEmpty(updates)) {
                      // Begin a transactional update of each store.
                      keys(self._stores).forEach((storeName) => {
                        self._stores[storeName].beginUpdate(
                          hasOwn.call(updates, storeName)
                            ? updates[storeName].length
                            : 0,
                          self._resetStores
                        );
                      });
                      self._resetStores = false;
                      keys(updates).forEach((storeName) => {
                        const updateMessages = updates[storeName];
                        var store = self._stores[storeName];

                        if (store) {
                          updateMessages.forEach((updateMessage) => {
                            store.update(updateMessage);
                          });
                        } else {
                          // Nobody's listening for this data. Queue it up until
                          // someone wants it.
                          // XXX memory use will grow without bound if you forget to
                          // create a collection or just don't care about it... going
                          // to have to do something about that.
                          const updates = self._updatesForUnknownStores;

                          if (!hasOwn.call(updates, storeName)) {
                            updates[storeName] = [];
                          }

                          updates[storeName].push(...updateMessages);
                        }
                      }); // End update transaction.

                      keys(self._stores).forEach((storeName) => {
                        self._stores[storeName].endUpdate();
                      });
                    }

                    self._runAfterUpdateCallbacks();
                  } // Call any callbacks deferred with _runWhenAllServerDocsAreFlushed whose
                  // relevant docs have been flushed, as well as dataVisible callbacks at
                  // reconnect-quiescence time.

                  _runAfterUpdateCallbacks() {
                    var self = this;
                    var callbacks = self._afterUpdateCallbacks;
                    self._afterUpdateCallbacks = [];
                    callbacks.forEach((c) => {
                      c();
                    });
                  }

                  _pushUpdate(updates, collection, msg) {
                    if (!hasOwn.call(updates, collection)) {
                      updates[collection] = [];
                    }

                    updates[collection].push(msg);
                  }

                  _getServerDoc(collection, id) {
                    var self = this;

                    if (!hasOwn.call(self._serverDocuments, collection)) {
                      return null;
                    }

                    var serverDocsForCollection =
                      self._serverDocuments[collection];
                    return serverDocsForCollection.get(id) || null;
                  }

                  _process_added(msg, updates) {
                    var self = this;
                    var id = MongoID.idParse(msg.id);

                    var serverDoc = self._getServerDoc(msg.collection, id);

                    if (serverDoc) {
                      // Some outstanding stub wrote here.
                      var isExisting = serverDoc.document !== undefined;
                      serverDoc.document = msg.fields || Object.create(null);
                      serverDoc.document._id = id;

                      if (self._resetStores) {
                        // During reconnect the server is sending adds for existing ids.
                        // Always push an update so that document stays in the store after
                        // reset. Use current version of the document for this update, so
                        // that stub-written values are preserved.
                        var currentDoc = self._stores[msg.collection].getDoc(
                          msg.id
                        );

                        if (currentDoc !== undefined) msg.fields = currentDoc;

                        self._pushUpdate(updates, msg.collection, msg);
                      } else if (isExisting) {
                        throw new Error(
                          "Server sent add for existing id: " + msg.id
                        );
                      }
                    } else {
                      self._pushUpdate(updates, msg.collection, msg);
                    }
                  }

                  _process_changed(msg, updates) {
                    var self = this;

                    var serverDoc = self._getServerDoc(
                      msg.collection,
                      MongoID.idParse(msg.id)
                    );

                    if (serverDoc) {
                      if (serverDoc.document === undefined)
                        throw new Error(
                          "Server sent changed for nonexisting id: " + msg.id
                        );
                      DiffSequence.applyChanges(serverDoc.document, msg.fields);
                    } else {
                      self._pushUpdate(updates, msg.collection, msg);
                    }
                  }

                  _process_removed(msg, updates) {
                    var self = this;

                    var serverDoc = self._getServerDoc(
                      msg.collection,
                      MongoID.idParse(msg.id)
                    );

                    if (serverDoc) {
                      // Some outstanding stub wrote here.
                      if (serverDoc.document === undefined)
                        throw new Error(
                          "Server sent removed for nonexisting id:" + msg.id
                        );
                      serverDoc.document = undefined;
                    } else {
                      self._pushUpdate(updates, msg.collection, {
                        msg: "removed",
                        collection: msg.collection,
                        id: msg.id,
                      });
                    }
                  }

                  _process_updated(msg, updates) {
                    var self = this; // Process "method done" messages.

                    msg.methods.forEach((methodId) => {
                      const docs = self._documentsWrittenByStub[methodId];
                      keys(docs).forEach((id) => {
                        const written = docs[id];

                        const serverDoc = self._getServerDoc(
                          written.collection,
                          written.id
                        );

                        if (!serverDoc) {
                          throw new Error(
                            "Lost serverDoc for " + JSON.stringify(written)
                          );
                        }

                        if (!serverDoc.writtenByStubs[methodId]) {
                          throw new Error(
                            "Doc " +
                              JSON.stringify(written) +
                              " not written by  method " +
                              methodId
                          );
                        }

                        delete serverDoc.writtenByStubs[methodId];

                        if (isEmpty(serverDoc.writtenByStubs)) {
                          // All methods whose stubs wrote this method have completed! We can
                          // now copy the saved document to the database (reverting the stub's
                          // change if the server did not write to this object, or applying the
                          // server's writes if it did).
                          // This is a fake ddp 'replace' message.  It's just for talking
                          // between livedata connections and minimongo.  (We have to stringify
                          // the ID because it's supposed to look like a wire message.)
                          self._pushUpdate(updates, written.collection, {
                            msg: "replace",
                            id: MongoID.idStringify(written.id),
                            replace: serverDoc.document,
                          }); // Call all flush callbacks.

                          serverDoc.flushCallbacks.forEach((c) => {
                            c();
                          }); // Delete this completed serverDocument. Don't bother to GC empty
                          // IdMaps inside self._serverDocuments, since there probably aren't
                          // many collections and they'll be written repeatedly.

                          self._serverDocuments[written.collection].remove(
                            written.id
                          );
                        }
                      });
                      delete self._documentsWrittenByStub[methodId]; // We want to call the data-written callback, but we can't do so until all
                      // currently buffered messages are flushed.

                      const callbackInvoker = self._methodInvokers[methodId];

                      if (!callbackInvoker) {
                        throw new Error(
                          "No callback invoker for method " + methodId
                        );
                      }

                      self._runWhenAllServerDocsAreFlushed(function () {
                        return callbackInvoker.dataVisible(...arguments);
                      });
                    });
                  }

                  _process_ready(msg, updates) {
                    var self = this; // Process "sub ready" messages. "sub ready" messages don't take effect
                    // until all current server documents have been flushed to the local
                    // database. We can use a write fence to implement this.

                    msg.subs.forEach((subId) => {
                      self._runWhenAllServerDocsAreFlushed(() => {
                        var subRecord = self._subscriptions[subId]; // Did we already unsubscribe?

                        if (!subRecord) return; // Did we already receive a ready message? (Oops!)

                        if (subRecord.ready) return;
                        subRecord.ready = true;
                        subRecord.readyCallback && subRecord.readyCallback();
                        subRecord.readyDeps.changed();
                      });
                    });
                  } // Ensures that "f" will be called after all documents currently in
                  // _serverDocuments have been written to the local cache. f will not be called
                  // if the connection is lost before then!

                  _runWhenAllServerDocsAreFlushed(f) {
                    var self = this;

                    var runFAfterUpdates = () => {
                      self._afterUpdateCallbacks.push(f);
                    };

                    var unflushedServerDocCount = 0;

                    var onServerDocFlush = () => {
                      --unflushedServerDocCount;

                      if (unflushedServerDocCount === 0) {
                        // This was the last doc to flush! Arrange to run f after the updates
                        // have been applied.
                        runFAfterUpdates();
                      }
                    };

                    keys(self._serverDocuments).forEach((collection) => {
                      self._serverDocuments[collection].forEach((serverDoc) => {
                        const writtenByStubForAMethodWithSentMessage = keys(
                          serverDoc.writtenByStubs
                        ).some((methodId) => {
                          var invoker = self._methodInvokers[methodId];
                          return invoker && invoker.sentMessage;
                        });

                        if (writtenByStubForAMethodWithSentMessage) {
                          ++unflushedServerDocCount;
                          serverDoc.flushCallbacks.push(onServerDocFlush);
                        }
                      });
                    });

                    if (unflushedServerDocCount === 0) {
                      // There aren't any buffered docs --- we can call f as soon as the current
                      // round of updates is applied!
                      runFAfterUpdates();
                    }
                  }

                  _livedata_nosub(msg) {
                    var self = this; // First pass it through _livedata_data, which only uses it to help get
                    // towards quiescence.

                    self._livedata_data(msg); // Do the rest of our processing immediately, with no
                    // buffering-until-quiescence.
                    // we weren't subbed anyway, or we initiated the unsub.

                    if (!hasOwn.call(self._subscriptions, msg.id)) {
                      return;
                    } // XXX COMPAT WITH 1.0.3.1 #errorCallback

                    var errorCallback =
                      self._subscriptions[msg.id].errorCallback;
                    var stopCallback = self._subscriptions[msg.id].stopCallback;

                    self._subscriptions[msg.id].remove();

                    var meteorErrorFromMsg = (msgArg) => {
                      return (
                        msgArg &&
                        msgArg.error &&
                        new Meteor.Error(
                          msgArg.error.error,
                          msgArg.error.reason,
                          msgArg.error.details
                        )
                      );
                    }; // XXX COMPAT WITH 1.0.3.1 #errorCallback

                    if (errorCallback && msg.error) {
                      errorCallback(meteorErrorFromMsg(msg));
                    }

                    if (stopCallback) {
                      stopCallback(meteorErrorFromMsg(msg));
                    }
                  }

                  _livedata_result(msg) {
                    // id, result or error. error has error (code), reason, details
                    var self = this; // Lets make sure there are no buffered writes before returning result.

                    if (!isEmpty(self._bufferedWrites)) {
                      self._flushBufferedWrites();
                    } // find the outstanding request
                    // should be O(1) in nearly all realistic use cases

                    if (isEmpty(self._outstandingMethodBlocks)) {
                      Meteor._debug(
                        "Received method result but no methods outstanding"
                      );

                      return;
                    }

                    var currentMethodBlock =
                      self._outstandingMethodBlocks[0].methods;
                    var m;

                    for (var i = 0; i < currentMethodBlock.length; i++) {
                      m = currentMethodBlock[i];
                      if (m.methodId === msg.id) break;
                    }

                    if (!m) {
                      Meteor._debug(
                        "Can't match method response to original method call",
                        msg
                      );

                      return;
                    } // Remove from current method block. This may leave the block empty, but we
                    // don't move on to the next block until the callback has been delivered, in
                    // _outstandingMethodFinished.

                    currentMethodBlock.splice(i, 1);

                    if (hasOwn.call(msg, "error")) {
                      m.receiveResult(
                        new Meteor.Error(
                          msg.error.error,
                          msg.error.reason,
                          msg.error.details
                        )
                      );
                    } else {
                      // msg.result may be undefined if the method didn't return a
                      // value
                      m.receiveResult(undefined, msg.result);
                    }
                  } // Called by MethodInvoker after a method's callback is invoked.  If this was
                  // the last outstanding method in the current block, runs the next block. If
                  // there are no more methods, consider accepting a hot code push.

                  _outstandingMethodFinished() {
                    var self = this;
                    if (self._anyMethodsAreOutstanding()) return; // No methods are outstanding. This should mean that the first block of
                    // methods is empty. (Or it might not exist, if this was a method that
                    // half-finished before disconnect/reconnect.)

                    if (!isEmpty(self._outstandingMethodBlocks)) {
                      var firstBlock = self._outstandingMethodBlocks.shift();

                      if (!isEmpty(firstBlock.methods))
                        throw new Error(
                          "No methods outstanding but nonempty block: " +
                            JSON.stringify(firstBlock)
                        ); // Send the outstanding methods now in the first block.

                      if (!isEmpty(self._outstandingMethodBlocks))
                        self._sendOutstandingMethods();
                    } // Maybe accept a hot code push.

                    self._maybeMigrate();
                  } // Sends messages for all the methods in the first block in
                  // _outstandingMethodBlocks.

                  _sendOutstandingMethods() {
                    var self = this;

                    if (isEmpty(self._outstandingMethodBlocks)) {
                      return;
                    }

                    self._outstandingMethodBlocks[0].methods.forEach((m) => {
                      m.sendMessage();
                    });
                  }

                  _livedata_error(msg) {
                    Meteor._debug("Received error from server: ", msg.reason);

                    if (msg.offendingMessage)
                      Meteor._debug("For: ", msg.offendingMessage);
                  }

                  _callOnReconnectAndSendAppropriateOutstandingMethods() {
                    var self = this;
                    var oldOutstandingMethodBlocks =
                      self._outstandingMethodBlocks;
                    self._outstandingMethodBlocks = [];
                    self.onReconnect && self.onReconnect();

                    DDP._reconnectHook.each((callback) => {
                      callback(self);
                      return true;
                    });

                    if (isEmpty(oldOutstandingMethodBlocks)) return; // We have at least one block worth of old outstanding methods to try
                    // again. First: did onReconnect actually send anything? If not, we just
                    // restore all outstanding methods and run the first block.

                    if (isEmpty(self._outstandingMethodBlocks)) {
                      self._outstandingMethodBlocks = oldOutstandingMethodBlocks;

                      self._sendOutstandingMethods();

                      return;
                    } // OK, there are blocks on both sides. Special case: merge the last block of
                    // the reconnect methods with the first block of the original methods, if
                    // neither of them are "wait" blocks.

                    if (
                      !last(self._outstandingMethodBlocks).wait &&
                      !oldOutstandingMethodBlocks[0].wait
                    ) {
                      oldOutstandingMethodBlocks[0].methods.forEach((m) => {
                        last(self._outstandingMethodBlocks).methods.push(m); // If this "last block" is also the first block, send the message.

                        if (self._outstandingMethodBlocks.length === 1) {
                          m.sendMessage();
                        }
                      });
                      oldOutstandingMethodBlocks.shift();
                    } // Now add the rest of the original blocks on.

                    oldOutstandingMethodBlocks.forEach((block) => {
                      self._outstandingMethodBlocks.push(block);
                    });
                  } // We can accept a hot code push if there are no methods in flight.

                  _readyToMigrate() {
                    return isEmpty(this._methodInvokers);
                  } // If we were blocking a migration, see if it's now possible to continue.
                  // Call whenever the set of outstanding/blocked methods shrinks.

                  _maybeMigrate() {
                    var self = this;

                    if (self._retryMigrate && self._readyToMigrate()) {
                      self._retryMigrate();

                      self._retryMigrate = null;
                    }
                  }

                  onMessage(raw_msg) {
                    try {
                      var msg = DDPCommon.parseDDP(raw_msg);
                    } catch (e) {
                      Meteor._debug("Exception while parsing DDP", e);

                      return;
                    } // Any message counts as receiving a pong, as it demonstrates that
                    // the server is still alive.

                    if (this._heartbeat) {
                      this._heartbeat.messageReceived();
                    }

                    if (msg === null || !msg.msg) {
                      // XXX COMPAT WITH 0.6.6. ignore the old welcome message for back
                      // compat.  Remove this 'if' once the server stops sending welcome
                      // messages (stream_server.js).
                      if (!(msg && msg.server_id))
                        Meteor._debug(
                          "discarding invalid livedata message",
                          msg
                        );
                      return;
                    }

                    if (msg.msg === "connected") {
                      this._version = this._versionSuggestion;

                      this._livedata_connected(msg);

                      this.options.onConnected();
                    } else if (msg.msg === "failed") {
                      if (
                        this._supportedDDPVersions.indexOf(msg.version) >= 0
                      ) {
                        this._versionSuggestion = msg.version;

                        this._stream.reconnect({
                          _force: true,
                        });
                      } else {
                        var description =
                          "DDP version negotiation failed; server requested version " +
                          msg.version;

                        this._stream.disconnect({
                          _permanent: true,
                          _error: description,
                        });

                        this.options.onDDPVersionNegotiationFailure(
                          description
                        );
                      }
                    } else if (
                      msg.msg === "ping" &&
                      this.options.respondToPings
                    ) {
                      this._send({
                        msg: "pong",
                        id: msg.id,
                      });
                    } else if (msg.msg === "pong") {
                      // noop, as we assume everything's a pong
                    } else if (
                      [
                        "added",
                        "changed",
                        "removed",
                        "ready",
                        "updated",
                      ].includes(msg.msg)
                    ) {
                      this._livedata_data(msg);
                    } else if (msg.msg === "nosub") {
                      this._livedata_nosub(msg);
                    } else if (msg.msg === "result") {
                      this._livedata_result(msg);
                    } else if (msg.msg === "error") {
                      this._livedata_error(msg);
                    } else {
                      Meteor._debug(
                        "discarding unknown livedata message type",
                        msg
                      );
                    }
                  }

                  onReset() {
                    // Send a connect message at the beginning of the stream.
                    // NOTE: reset is called even on the first connection, so this is
                    // the only place we send this message.
                    var msg = {
                      msg: "connect",
                    };
                    if (this._lastSessionId) msg.session = this._lastSessionId;
                    msg.version =
                      this._versionSuggestion || this._supportedDDPVersions[0];
                    this._versionSuggestion = msg.version;
                    msg.support = this._supportedDDPVersions;

                    this._send(msg); // Mark non-retry calls as failed. This has to be done early as getting these methods out of the
                    // current block is pretty important to making sure that quiescence is properly calculated, as
                    // well as possibly moving on to another useful block.
                    // Only bother testing if there is an outstandingMethodBlock (there might not be, especially if
                    // we are connecting for the first time.

                    if (this._outstandingMethodBlocks.length > 0) {
                      // If there is an outstanding method block, we only care about the first one as that is the
                      // one that could have already sent messages with no response, that are not allowed to retry.
                      const currentMethodBlock = this
                        ._outstandingMethodBlocks[0].methods;
                      this._outstandingMethodBlocks[0].methods = currentMethodBlock.filter(
                        (methodInvoker) => {
                          // Methods with 'noRetry' option set are not allowed to re-send after
                          // recovering dropped connection.
                          if (
                            methodInvoker.sentMessage &&
                            methodInvoker.noRetry
                          ) {
                            // Make sure that the method is told that it failed.
                            methodInvoker.receiveResult(
                              new Meteor.Error(
                                "invocation-failed",
                                "Method invocation might have failed due to dropped connection. " +
                                  "Failing because `noRetry` option was passed to Meteor.apply."
                              )
                            );
                          } // Only keep a method if it wasn't sent or it's allowed to retry.
                          // This may leave the block empty, but we don't move on to the next
                          // block until the callback has been delivered, in _outstandingMethodFinished.

                          return !(
                            methodInvoker.sentMessage && methodInvoker.noRetry
                          );
                        }
                      );
                    } // Now, to minimize setup latency, go ahead and blast out all of
                    // our pending methods ands subscriptions before we've even taken
                    // the necessary RTT to know if we successfully reconnected. (1)
                    // They're supposed to be idempotent, and where they are not,
                    // they can block retry in apply; (2) even if we did reconnect,
                    // we're not sure what messages might have gotten lost
                    // (in either direction) since we were disconnected (TCP being
                    // sloppy about that.)
                    // If the current block of methods all got their results (but didn't all get
                    // their data visible), discard the empty block now.

                    if (
                      this._outstandingMethodBlocks.length > 0 &&
                      this._outstandingMethodBlocks[0].methods.length === 0
                    ) {
                      this._outstandingMethodBlocks.shift();
                    } // Mark all messages as unsent, they have not yet been sent on this
                    // connection.

                    keys(this._methodInvokers).forEach((id) => {
                      this._methodInvokers[id].sentMessage = false;
                    }); // If an `onReconnect` handler is set, call it first. Go through
                    // some hoops to ensure that methods that are called from within
                    // `onReconnect` get executed _before_ ones that were originally
                    // outstanding (since `onReconnect` is used to re-establish auth
                    // certificates)

                    this._callOnReconnectAndSendAppropriateOutstandingMethods(); // add new subscriptions at the end. this way they take effect after
                    // the handlers and we don't see flicker.

                    keys(this._subscriptions).forEach((id) => {
                      const sub = this._subscriptions[id];

                      this._send({
                        msg: "sub",
                        id: id,
                        name: sub.name,
                        params: sub.params,
                      });
                    });
                  }
                }
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              },
              "namespace.js": function module(_require6, _exports6, _module5) {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //                                                                                                                     //
                // packages/ddp-client/common/namespace.js                                                                             //
                //                                                                                                                     //
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //
                _module5.export({
                  DDP: () => DDP,
                });
                let DDPCommon;
                _module5.link(
                  "meteor/ddp-common",
                  {
                    DDPCommon(v) {
                      DDPCommon = v;
                    },
                  },
                  0
                );
                let Meteor;
                _module5.link(
                  "meteor/meteor",
                  {
                    Meteor(v) {
                      Meteor = v;
                    },
                  },
                  1
                );
                let keys;
                _module5.link(
                  "meteor/ddp-common/utils.js",
                  {
                    keys(v) {
                      keys = v;
                    },
                  },
                  2
                );
                let Connection;
                _module5.link(
                  "./livedata_connection.js",
                  {
                    Connection(v) {
                      Connection = v;
                    },
                  },
                  3
                );
                // This array allows the `_allSubscriptionsReady` method below, which
                // is used by the `spiderable` package, to keep track of whether all
                // data is ready.
                const allConnections = [];
                /**
                 * @namespace DDP
                 * @summary Namespace for DDP-related methods/classes.
                 */

                const DDP = {};
                // This is private but it's used in a few places. accounts-base uses
                // it to get the current user. Meteor.setTimeout and friends clear
                // it. We can probably find a better way to factor this.
                DDP._CurrentMethodInvocation = new Meteor.EnvironmentVariable();
                DDP._CurrentPublicationInvocation = new Meteor.EnvironmentVariable(); // XXX: Keep DDP._CurrentInvocation for backwards-compatibility.

                DDP._CurrentInvocation = DDP._CurrentMethodInvocation; // This is passed into a weird `makeErrorType` function that expects its thing
                // to be a constructor

                function connectionErrorConstructor(message) {
                  this.message = message;
                }

                DDP.ConnectionError = Meteor.makeErrorType(
                  "DDP.ConnectionError",
                  connectionErrorConstructor
                );
                DDP.ForcedReconnectError = Meteor.makeErrorType(
                  "DDP.ForcedReconnectError",
                  () => {}
                ); // Returns the named sequence of pseudo-random values.
                // The scope will be DDP._CurrentMethodInvocation.get(), so the stream will produce
                // consistent values for method calls on the client and server.

                DDP.randomStream = (name) => {
                  var scope = DDP._CurrentMethodInvocation.get();

                  return DDPCommon.RandomStream.get(scope, name);
                }; // @param url {String} URL to Meteor app,
                //     e.g.:
                //     "subdomain.meteor.com",
                //     "http://subdomain.meteor.com",
                //     "/",
                //     "ddp+sockjs://ddp--****-foo.meteor.com/sockjs"

                /**
                 * @summary Connect to the server of a different Meteor application to subscribe to its document sets and invoke its remote methods.
                 * @locus Anywhere
                 * @param {String} url The URL of another Meteor application.
                 */

                DDP.connect = (url, options) => {
                  var ret = new Connection(url, options);
                  allConnections.push(ret); // hack. see below.

                  return ret;
                };

                DDP._reconnectHook = new Hook({
                  bindEnvironment: false,
                });
                /**
                 * @summary Register a function to call as the first step of
                 * reconnecting. This function can call methods which will be executed before
                 * any other outstanding methods. For example, this can be used to re-establish
                 * the appropriate authentication context on the connection.
                 * @locus Anywhere
                 * @param {Function} callback The function to call. It will be called with a
                 * single argument, the [connection object](#ddp_connect) that is reconnecting.
                 */

                DDP.onReconnect = (callback) => {
                  return DDP._reconnectHook.register(callback);
                }; // Hack for `spiderable` package: a way to see if the page is done
                // loading all the data it needs.
                //

                DDP._allSubscriptionsReady = () => {
                  return allConnections.every((conn) => {
                    return keys(conn._subscriptions).every((id) => {
                      return conn._subscriptions[id].ready;
                    });
                  });
                };
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              },
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2("/node_modules/meteor/ddp-client/client/client.js");

  /* Exports */
  Package._define("ddp-client", _exports2, {
    DDP: DDP,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var DDP = Package["ddp-client"].DDP;

  /* Exports */
  Package._define("ddp", {
    DDP: DDP,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Exports */
  Package._define("ddp-server");
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var DDP = Package["ddp-client"].DDP;

  /* Package-scope variables */
  var LivedataTest;

  /* Exports */
  Package._define("livedata", {
    DDP: DDP,
    LivedataTest: LivedataTest,
  });
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Exports */
  Package._define("hot-code-push");
})(); //////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

(function () {
  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var Tracker = Package.tracker.Tracker;
  var Deps = Package.tracker.Deps;
  var Retry = Package.retry.Retry;
  var DDP = Package["ddp-client"].DDP;
  var meteorInstall = Package.modules.meteorInstall;
  var Promise = Package.promise.Promise;

  /* Package-scope variables */
  var Autoupdate;

  var _require2 = meteorInstall(
    {
      node_modules: {
        meteor: {
          autoupdate: {
            "autoupdate_client.js": function module(
              _require,
              _exports,
              _module
            ) {
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                            //
              // packages/autoupdate/autoupdate_client.js                                                                   //
              //                                                                                                            //
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              _module.export({
                Autoupdate: () => Autoupdate,
              });
              let ClientVersions;
              _module.link(
                "./client_versions.js",
                {
                  ClientVersions(v) {
                    ClientVersions = v;
                  },
                },
                0
              );
              const clientArch = Meteor.isCordova
                ? "web.cordova"
                : Meteor.isModern
                ? "web.browser"
                : "web.browser.legacy";
              const autoupdateVersions = ((
                __meteor_runtime_config__.autoupdate || {}
              ).versions || {})[clientArch] || {
                version: "unknown",
                versionRefreshable: "unknown",
                versionNonRefreshable: "unknown",
                assets: [],
              };
              const Autoupdate = {};
              // Stores acceptable client versions.
              const clientVersions = (Autoupdate._clientVersions = new ClientVersions()); // Used by a self-test.
              Meteor.connection.registerStore(
                "meteor_autoupdate_clientVersions",
                clientVersions.createStore()
              );

              Autoupdate.newClientAvailable = function () {
                return clientVersions.newClientAvailable(
                  clientArch,
                  ["versionRefreshable", "versionNonRefreshable"],
                  autoupdateVersions
                );
              }; // Set to true if the link.onload callback ever fires for any <link> node.

              let knownToSupportCssOnLoad = false;
              const retry = new Retry({
                // Unlike the stream reconnect use of Retry, which we want to be instant
                // in normal operation, this is a wacky failure. We don't want to retry
                // right away, we can start slowly.
                //
                // A better way than timeconstants here might be to use the knowledge
                // of when we reconnect to help trigger these retries. Typically, the
                // server fixing code will result in a restart and reconnect, but
                // potentially the subscription could have a transient error.
                minCount: 0,
                // don't do any immediate retries
                baseTimeout: 30 * 1000, // start with 30s
              });
              let failures = 0;

              Autoupdate._retrySubscription = () => {
                Meteor.subscribe("meteor_autoupdate_clientVersions", {
                  onError(error) {
                    Meteor._debug("autoupdate subscription failed", error);

                    failures++;
                    retry.retryLater(failures, function () {
                      // Just retry making the subscription, don't reload the whole
                      // page. While reloading would catch more cases (for example,
                      // the server went back a version and is now doing old-style hot
                      // code push), it would also be more prone to reload loops,
                      // which look really bad to the user. Just retrying the
                      // subscription over DDP means it is at least possible to fix by
                      // updating the server.
                      Autoupdate._retrySubscription();
                    });
                  },

                  onReady() {
                    // Call checkNewVersionDocument with a slight delay, so that the
                    // const handle declaration is guaranteed to be initialized, even if
                    // the added or changed callbacks are called synchronously.
                    const resolved = Promise.resolve();

                    function check(doc) {
                      resolved.then(() => checkNewVersionDocument(doc));
                    }

                    const stop = clientVersions.watch(check);

                    function checkNewVersionDocument(doc) {
                      if (doc._id !== clientArch) {
                        return;
                      }

                      if (
                        doc.versionNonRefreshable !==
                        autoupdateVersions.versionNonRefreshable
                      ) {
                        // Non-refreshable assets have changed, so we have to reload the
                        // whole page rather than just replacing <link> tags.
                        if (stop) stop();

                        if (Package.reload) {
                          // The reload package should be provided by ddp-client, which
                          // is provided by the ddp package that autoupdate depends on.
                          Package.reload.Reload._reload();
                        }

                        return;
                      }

                      if (
                        doc.versionRefreshable !==
                        autoupdateVersions.versionRefreshable
                      ) {
                        autoupdateVersions.versionRefreshable =
                          doc.versionRefreshable; // Switch out old css links for the new css links. Inspired by:
                        // https://github.com/guard/guard-livereload/blob/master/js/livereload.js#L710

                        var newCss = doc.assets || [];
                        var oldLinks = [];
                        Array.prototype.forEach.call(
                          document.getElementsByTagName("link"),
                          function (link) {
                            if (link.className === "__meteor-css__") {
                              oldLinks.push(link);
                            }
                          }
                        );

                        function waitUntilCssLoads(link, callback) {
                          var called;

                          link.onload = function () {
                            knownToSupportCssOnLoad = true;

                            if (!called) {
                              called = true;
                              callback();
                            }
                          };

                          if (!knownToSupportCssOnLoad) {
                            var id = Meteor.setInterval(function () {
                              if (link.sheet) {
                                if (!called) {
                                  called = true;
                                  callback();
                                }

                                Meteor.clearInterval(id);
                              }
                            }, 50);
                          }
                        }

                        let newLinksLeftToLoad = newCss.length;

                        function removeOldLinks() {
                          if (oldLinks.length > 0 && --newLinksLeftToLoad < 1) {
                            oldLinks.splice(0).forEach((link) => {
                              link.parentNode.removeChild(link);
                            });
                          }
                        }

                        if (newCss.length > 0) {
                          newCss.forEach((css) => {
                            const newLink = document.createElement("link");
                            newLink.setAttribute("rel", "stylesheet");
                            newLink.setAttribute("type", "text/css");
                            newLink.setAttribute("class", "__meteor-css__");
                            newLink.setAttribute("href", css.url);
                            waitUntilCssLoads(newLink, function () {
                              Meteor.setTimeout(removeOldLinks, 200);
                            });
                            const head = document
                              .getElementsByTagName("head")
                              .item(0);
                            head.appendChild(newLink);
                          });
                        } else {
                          removeOldLinks();
                        }
                      }
                    }
                  },
                });
              };

              Autoupdate._retrySubscription();
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            "client_versions.js": function module(
              _require3,
              _exports3,
              _module2
            ) {
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //                                                                                                            //
              // packages/autoupdate/client_versions.js                                                                     //
              //                                                                                                            //
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //
              let _objectSpread;

              _module2.link(
                "@babel/runtime/helpers/objectSpread2",
                {
                  default(v) {
                    _objectSpread = v;
                  },
                },
                0
              );
              _module2.export({
                ClientVersions: () => ClientVersions,
              });
              let Tracker;
              _module2.link(
                "meteor/tracker",
                {
                  Tracker(v) {
                    Tracker = v;
                  },
                },
                0
              );

              class ClientVersions {
                constructor() {
                  this._versions = new Map();
                  this._watchCallbacks = new Set();
                } // Creates a Livedata store for use with `Meteor.connection.registerStore`.
                // After the store is registered, document updates reported by Livedata are
                // merged with the documents in this `ClientVersions` instance.

                createStore() {
                  return {
                    update: (_ref) => {
                      let { id, msg, fields } = _ref;

                      if (msg === "added" || msg === "changed") {
                        this.set(id, fields);
                      }
                    },
                  };
                }

                hasVersions() {
                  return this._versions.size > 0;
                }

                get(id) {
                  return this._versions.get(id);
                } // Adds or updates a version document and invokes registered callbacks for the
                // added/updated document. If a document with the given ID already exists, its
                // fields are merged with `fields`.

                set(id, fields) {
                  let version = this._versions.get(id);

                  let isNew = false;

                  if (version) {
                    Object.assign(version, fields);
                  } else {
                    version = _objectSpread(
                      {
                        _id: id,
                      },
                      fields
                    );
                    isNew = true;

                    this._versions.set(id, version);
                  }

                  this._watchCallbacks.forEach((_ref2) => {
                    let { fn, filter } = _ref2;

                    if (!filter || filter === version._id) {
                      fn(version, isNew);
                    }
                  });
                } // Registers a callback that will be invoked when a version document is added
                // or changed. Calling the function returned by `watch` removes the callback.
                // If `skipInitial` is true, the callback isn't be invoked for existing
                // documents. If `filter` is set, the callback is only invoked for documents
                // with ID `filter`.

                watch(fn) {
                  let { skipInitial, filter } =
                    arguments.length > 1 && arguments[1] !== undefined
                      ? arguments[1]
                      : {};

                  if (!skipInitial) {
                    const resolved = Promise.resolve();

                    this._versions.forEach((version) => {
                      if (!filter || filter === version._id) {
                        resolved.then(() => fn(version, true));
                      }
                    });
                  }

                  const callback = {
                    fn,
                    filter,
                  };

                  this._watchCallbacks.add(callback);

                  return () => this._watchCallbacks.delete(callback);
                } // A reactive data source for `Autoupdate.newClientAvailable`.

                newClientAvailable(id, fields, currentVersion) {
                  function isNewVersion(version) {
                    return (
                      version._id === id &&
                      fields.some(
                        (field) => version[field] !== currentVersion[field]
                      )
                    );
                  }

                  const dependency = new Tracker.Dependency();
                  const version = this.get(id);
                  dependency.depend();
                  const stop = this.watch(
                    (version) => {
                      if (isNewVersion(version)) {
                        dependency.changed();
                        stop();
                      }
                    },
                    {
                      skipInitial: true,
                    }
                  );
                  return !!version && isNewVersion(version);
                }
              }
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
          },
        },
      },
    },
    {
      extensions: [".js", ".json"],
    }
  );

  var _exports2 = _require2(
    "/node_modules/meteor/autoupdate/autoupdate_client.js"
  );

  /* Exports */
  Package._define("autoupdate", _exports2, {
    Autoupdate: Autoupdate,
  });
})(); /* Imports for global scope */

Meteor = Package.meteor.Meteor;
global = Package.meteor.global;
meteorEnv = Package.meteor.meteorEnv;
WebApp = Package.webapp.WebApp;
DDP = Package["ddp-client"].DDP;
Autoupdate = Package.autoupdate.Autoupdate;
Reload = Package.reload.Reload; // Disable hot-code-push
if (Package.reload) {
  Package.reload.Reload._onMigrate(function () {
    return [false];
  });
}
