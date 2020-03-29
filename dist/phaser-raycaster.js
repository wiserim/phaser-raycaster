(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("PhaserRaycaster", [], factory);
	else if(typeof exports === 'object')
		exports["PhaserRaycaster"] = factory();
	else
		root["PhaserRaycaster"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var PhaserRaycaster = function PhaserRaycaster(scene) {
  //The Scene that owns this plugin
  this.scene = scene;
  this.systems = scene.sys;

  if (!scene.sys.settings.isBooted) {
    scene.sys.events.once('boot', this.boot, this);
  }
}; //Static function called by the PluginFile Loader.


PhaserRaycaster.register = function (PluginManager) {
  //  Register this plugin with the PluginManager, so it can be added to Scenes.
  //  The first argument is the name this plugin will be known as in the PluginManager. It should not conflict with already registered plugins.
  //  The second argument is a reference to the plugin object, which will be instantiated by the PluginManager when the Scene boots.
  //  The third argument is the local mapping. This will make the plugin available under `this.sys.base` and also `this.base` from a Scene if
  //  it has an entry in the InjectionMap.
  PluginManager.register('PhaserRaycaster', PhaserRaycaster, 'base');
};

PhaserRaycaster.prototype = {
  //  Called when the Plugin is booted by the PluginManager.
  //  If you need to reference other systems in the Scene (like the Loader or DisplayList) then set-up those references now, not in the constructor.
  boot: function boot() {
    var eventEmitter = this.systems.events; //  Listening to the following events is entirely optional, although we would recommend cleanly shutting down and destroying at least.
    //  If you don't need any of these events then remove the listeners and the relevant methods too.

    eventEmitter.on('start', this.start, this);
    eventEmitter.on('preupdate', this.preUpdate, this);
    eventEmitter.on('update', this.update, this);
    eventEmitter.on('postupdate', this.postUpdate, this);
    eventEmitter.on('pause', this.pause, this);
    eventEmitter.on('resume', this.resume, this);
    eventEmitter.on('sleep', this.sleep, this);
    eventEmitter.on('wake', this.wake, this);
    eventEmitter.on('shutdown', this.shutdown, this);
    eventEmitter.on('destroy', this.destroy, this);
  },
  //A test method.
  test: function test(name) {
    console.log('RaycasterPlugin says hello ' + name + '!');
  },
  //Called when a Scene is started by the SceneManager. The Scene is now active, visible and running.
  start: function start() {},
  //Called every Scene step - phase 1
  preUpdate: function preUpdate(time, delta) {},
  //Called every Scene step - phase 2
  update: function update(time, delta) {},
  //Called every Scene step - phase 3
  postUpdate: function postUpdate(time, delta) {},
  //Called when a Scene is paused. A paused scene doesn't have its Step run, but still renders.
  pause: function pause() {},
  //Called when a Scene is resumed from a paused state.
  resume: function resume() {},
  //Called when a Scene is put to sleep. A sleeping scene doesn't update or render, but isn't destroyed or shutdown. preUpdate events still fire.
  sleep: function sleep() {},
  //Called when a Scene is woken from a sleeping state.
  wake: function wake() {},
  //Called when a Scene shuts down, it may then come back again later (which will invoke the 'start' event) but should be considered dormant.
  shutdown: function shutdown() {},
  //Called when a Scene is destroyed by the Scene Manager. There is no coming back from a destroyed Scene, so clear up all resources here.
  destroy: function destroy() {
    this.shutdown();
    this.scene = undefined;
  },
  //Create Raycaster object
  createRaycaster: function createRaycaster() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    options.scene = this.scene;
    return new this._Raycaster(options);
  }
};
PhaserRaycaster.prototype.constructor = PhaserRaycaster;
PhaserRaycaster.prototype._Raycaster = __webpack_require__(/*! ./raycaster-core.js */ "./src/raycaster-core.js").Raycaster; //Make sure you export the plugin for webpack to expose

module.exports = PhaserRaycaster;

/***/ }),

/***/ "./src/map/config.js":
/*!***************************!*\
  !*** ./src/map/config.js ***!
  \***************************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/**
 * Configure map on creation.
 *
 * @function Map.config
 * @since 0.6.0
 *
 * @param {object} [options] - Ray's congfiguration options. May include:
 * - {object} object - Mapped game object
 * - {string} [type] - Map type. If not defined, will be determined from object
 * - {boolean} [dynamic] = false - If set true, map will be dynamic (updated on scene update event).
 * - {integer} [segmentCount] = 0 - Circle map's segment count. If set to 0, map won't be generating segments and relay only on generated tangent point to actually testing ray.
 * - {boolean} [active] = true - If set true, map will be active (will provide points, segments and will be updated).
 *
 * @return {object} Map object.
 */
function config(options) {
  this.object = options.object; //object type

  if (options.type === undefined) options.type = options.object.type;
  this.type = options.type;

  switch (options.type) {
    case 'Polygon':
      this.getPoints = this._getPolygonPoints;
      this.getSegments = this._getPolygonSegments;
      this.updateMap = this._updatePolygonMap;
      break;

    case 'Arc':
      this.getPoints = this._getArcPoints;
      this.getSegments = this._getArcSegments;
      this.updateMap = this._updateArcMap;
      break;

    case 'Line':
      this.getPoints = this._getLinePoints;
      this.getSegments = this._getLineSegments;
      this.updateMap = this._updateLineMap;
      break;

    case 'Container':
      this.getPoints = this._getContainerPoints;
      this.getSegments = this._getContainerSegments;
      this.updateMap = this._updateContainerMap;
      break;

    default:
      this.getPoints = this._getRectanglePoints;
      this.getSegments = this._getRectangleSegments;
      this.updateMap = this._updateRectangleMap;
  } //dynamic map


  this.dynamic = options.dynamic == true ? true : false; //circle segments count

  this.segmentCount = options.segmentCount ? options.segmentCount : 0; //enable/disable map

  this.active = options.active !== undefined ? options.active : true;
  return this;
}

/***/ }),

/***/ "./src/map/map-circle-methods.js":
/*!***************************************!*\
  !*** ./src/map/map-circle-methods.js ***!
  \***************************************/
/*! exports provided: getPoints, getSegments, updateMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPoints", function() { return getPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSegments", function() { return getSegments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateMap", function() { return updateMap; });
/*Map methods for circles*/

/**
 * Get array of points on circle.
 *
 * @function Map._getArcPoints
 * @since 0.6.0
 *
 * @param {object} [ray] - Ray object. Used to generate points of rays tangent to circle, from ray origin.
 *
 * @return {array} Array of Phaser.GeomLine objects.
 */
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!this.active) return [];
  if (this._points.length > 0) return this._points;
  var points = [];
  var offset = new Phaser.Geom.Point();
  offset.x = this.object.x - this.object.displayWidth * (this.object.originX - 0.5);
  offset.y = this.object.y - this.object.displayHeight * (this.object.originY - 0.5); //calculate tangent rays

  if (ray) {
    var rayA = new Phaser.Geom.Line();
    var rayB = new Phaser.Geom.Line();
    var c;
    var rotation = this.object.rotation;

    if (rotation !== 0) {
      var vector = new Phaser.Geom.Line(this.object.x, this.object.y, offset.x, offset.y);
      Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
      var cB = vector.getPointB();
      c = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, cB.x, cB.y);
    } else {
      c = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, offset.x, offset.y);
    }

    var rayLength = Math.sqrt(Math.pow(Phaser.Geom.Line.Length(c), 2) - Math.pow(this.object.radius * this.object.scaleX, 2)); //ray angle

    var angle = Phaser.Geom.Line.Angle(c);
    var dAngle = Math.asin(this.object.radius * this.object.scaleX / Phaser.Geom.Line.Length(c));
    Phaser.Geom.Line.SetToAngle(rayA, ray.origin.x, ray.origin.y, angle - dAngle, rayLength);
    Phaser.Geom.Line.SetToAngle(rayB, ray.origin.x, ray.origin.y, angle + dAngle, rayLength); //adding tangent points

    points.push(rayA.getPointB());
    points.push(rayB.getPointB());
  }

  return points;
}
;
/**
 * Get array of segments representing circle.
 *
 * @function Map._getArcSegments
 * @since 0.6.0
 *
 *
 * @return {array} Array of Phaser.Geom.Line objects.
 */

function getSegments() {
  if (!this.active) return [];
  return this._segments;
}
;
/**
 * Update circle's map of points and segments. If segmentCount == 0. Map is generated dynamically by calculating points of rays tangent to circle, from ray origin.
 *
 * @function Map._updateArcMap
 * @since 0.6.0
 *
 *
 * @return {object} Map object.
 */

function updateMap() {
  if (!this.active) return this;

  if (!this.segmentCount) {
    this._points = [];
    this._segments = [];
    return this;
  } //calculate offset based on object position and origin point


  var offset = new Phaser.Geom.Point();
  offset.x = this.object.x - this.object.displayWidth * this.object.originX + this.object.radius * this.object.scaleX;
  offset.y = this.object.y - this.object.displayHeight * this.object.originY + this.object.radius * this.object.scaleY; //get points surrounding circle

  var points = this.object.geom.getPoints(this.segmentCount);
  var segments = []; //set points
  //calculate positions after object's rotation

  var rotation = this.object.rotation;

  if (rotation !== 0) {
    var newPoints = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var point = _step.value;
        var vector = new Phaser.Geom.Line(this.object.x, this.object.y, this.object.x + (point.x + this.object.radius) * this.object.scaleX, this.object.y + (point.y + this.object.radius) * this.object.scaleY);
        Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
        newPoints.push(vector.getPointB());
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    points = newPoints;
  } //if rotation === 0
  else {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = points[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _point = _step2.value;
          _point.x = _point.x * this.object.scaleX + offset.x;
          _point.y = _point.y * this.object.scaleY + offset.y;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } //set segments


  for (var i = 0, length = points.length; i < length; i++) {
    if (i + 1 < length) segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y));else segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[0].x, points[0].y));
  }

  this._points = points;
  this._segments = segments;
  return this;
}
;

/***/ }),

/***/ "./src/map/map-container-methods.js":
/*!******************************************!*\
  !*** ./src/map/map-container-methods.js ***!
  \******************************************/
/*! exports provided: getPoints, getSegments, updateMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPoints", function() { return getPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSegments", function() { return getSegments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateMap", function() { return updateMap; });
/*Map methods for containers*/

/**
 * Get array of container's children points.
 *
 * @function Map._getContainerPoints
 * @since 0.7.1
 *
 * @param {object} [ray] - Ray object.
 *
 * @return {array} Array of points.
 */
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var getCircles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!this.active) return [];
  var points = [];
  if (!getCircles) points = this._points; //calculate offset based on container position and origin point

  var offset = new Phaser.Geom.Point();
  offset.x = this.object.x - this.object.displayWidth * this.object.originX;
  offset.y = this.object.y - this.object.displayHeight * this.object.originY; //get tangent points of container's circles

  if (ray) {
    //create temporary ray
    var vector = new Phaser.Geom.Line(0, 0, ray.origin.x - offset.x, ray.origin.y - offset.y);
    Phaser.Geom.Line.SetToAngle(vector, 0, 0, Phaser.Geom.Line.Angle(vector) - this.object.rotation, Phaser.Geom.Line.Length(vector));

    var tempRay = ray._raycaster.createRay({
      origin: {
        x: vector.getPointB().x,
        y: vector.getPointB().y
      }
    });

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.object.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var child = _step.value;

        if (child.type === 'Arc') {
          var map = child.data.get('raycasterMap');

          if (map._points.length == 0) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = map.getPoints(tempRay, true)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var point = _step2.value;

                var _vector = new Phaser.Geom.Line(0, 0, point.x, point.y);

                Phaser.Geom.Line.SetToAngle(_vector, 0, 0, Phaser.Geom.Line.Angle(_vector) + this.object.rotation, Phaser.Geom.Line.Length(_vector));
                points.push(new Phaser.Geom.Point(_vector.getPointB().x + offset.x, _vector.getPointB().y + offset.y));
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        } else if (child.type === 'Container') {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = child.data.get('raycasterMap').getPoints(tempRay, true)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _point = _step3.value;

              if (this.object.rotation !== 0) {
                var _vector2 = new Phaser.Geom.Line(this.object.x, this.object.y, _point.x * this.object.scaleX + offset.x, _point.y * this.object.scaleY + offset.y);

                Phaser.Geom.Line.SetToAngle(_vector2, this.object.x, this.object.y, Phaser.Geom.Line.Angle(_vector2) + this.object.rotation, Phaser.Geom.Line.Length(_vector2));
                points.push(_vector2.getPointB());
              } //if rotation === 0
              else points.push(new Phaser.Geom.Point(_point.x * this.object.scaleX + offset.x, _point.y * this.object.scaleX + offset.y));
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return points;
}
;
/**
 * Get array of segments representing container's children.
 *
 * @function Map._getContainerSegments
 * @since 0.7.1
 *
 *
 * @return {array} Array of Phaser.Geom.Line objects.
 */

function getSegments() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!this.active) return [];
  return this._segments;
}
;
/**
 * Update containers's map of points and segments.
 *
 * @function Map._updateContainerleMap
 * @since 0.7.1
 *
 *
 * @return {object} Map object.
 */

function updateMap() {
  if (!this.active) return this;
  var points = [];
  var segments = [];
  var container = this.object; //calculate offset based on container position and origin point

  var offset = new Phaser.Geom.Point();
  offset.x = this.object.x - this.object.displayWidth * this.object.originX;
  offset.y = this.object.y - this.object.displayHeight * this.object.originY;
  var rotation = container.rotation; //iterate through container's children

  container.iterate(function (child) {
    if (!child.data) child.setDataEnabled(); //get child map

    var map = child.data.get('raycasterMap');

    if (!map) {
      map = new this.constructor({
        object: child,
        segmentCount: this.segmentCount
      });
      child.data.set('raycasterMap', map);
    } else map.updateMap(); //add child points


    var childPoints = [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = map.getPoints()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var point = _step4.value;

        //calculate positions after container's rotation
        if (rotation !== 0) {
          var vector = new Phaser.Geom.Line(this.object.x, this.object.y, point.x * this.object.scaleX + offset.x, point.y * this.object.scaleY + offset.y);
          Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
          points.push(vector.getPointB());
        } //if rotation === 0
        else points.push(new Phaser.Geom.Point(point.x * container.scaleX + offset.x, point.y * container.scaleX + offset.y));

        childPoints.push(points[points.length - 1]);
      } //add child segments

    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = map.getSegments()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var segment = _step5.value;

        //calculate positions after container's rotation
        if (rotation !== 0) {
          var pointA = segment.getPointA();
          var pointB = segment.getPointB();
          var vectorA = new Phaser.Geom.Line(this.object.x, this.object.y, pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y);
          var vectorB = new Phaser.Geom.Line(this.object.x, this.object.y, pointB.x * this.object.scaleX + offset.x, pointB.y * this.object.scaleY + offset.y);
          Phaser.Geom.Line.SetToAngle(vectorA, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vectorA) + rotation, Phaser.Geom.Line.Length(vectorA));
          Phaser.Geom.Line.SetToAngle(vectorB, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vectorB) + rotation, Phaser.Geom.Line.Length(vectorB));
          segments.push(new Phaser.Geom.Line(vectorA.getPointB().x, vectorA.getPointB().y, vectorB.getPointB().x, vectorB.getPointB().y));
        } //if rotation === 0
        else segments.push(new Phaser.Geom.Line(segment.getPointA().x * container.scaleX + offset.x, segment.getPointA().y * container.scaleY + offset.y, segment.getPointB().x * container.scaleX + offset.x, segment.getPointB().y * container.scaleY + offset.y));
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  }.bind(this)); //get children intersections

  for (var i = 0, iLength = container.list.length; i < iLength; i++) {
    var childA = container.list[i];
    var mapA = childA.data.get('raycasterMap');

    for (var j = i + 1, jLength = container.list.length; j < jLength; j++) {
      var childB = container.list[j];
      var mapB = childB.data.get('raycasterMap'); //check if bounding boxes overlap

      if (!Phaser.Geom.Intersects.RectangleToRectangle(childA.getBounds(), childB.getBounds())) continue; //find objects intersections

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = mapA.getSegments()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var segmentA = _step6.value;
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = mapB.getSegments()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var segmentB = _step7.value;
              var intersection = [];
              if (!Phaser.Geom.Intersects.LineToLine(segmentA, segmentB, intersection)) continue; //calculate positions after container's rotation

              if (rotation !== 0) {
                var vector = new Phaser.Geom.Line(this.object.x, this.object.y, intersection.x * this.object.scaleX + offset.x, intersection.y * this.object.scaleY + offset.y);
                Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
                points.push(vector.getPointB());
              } //if rotation === 0
              else points.push(new Phaser.Geom.Point(intersection.x * container.scaleX + offset.x, intersection.y * container.scaleX + offset.y));
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  }

  this._points = points;
  this._segments = segments;
  return this;
}
;

/***/ }),

/***/ "./src/map/map-core.js":
/*!*****************************!*\
  !*** ./src/map/map-core.js ***!
  \*****************************/
/*! exports provided: Map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return Map; });
/**
 * @classdesc
 *
 * Map class responible for mapping game objects.
 *
 * @class Map
 * @memberof Raycaster
 * @constructor
 * @since 6.0.0
 *
 * @param {object} options - Map specific configuration settings.
 * @param {Raycaster} [raycaster] - Parent raycaster object.
 */
function Map(options) {
  this.type;
  this.active;
  this.dynamic;
  this.object;
  this._points = [];
  this._segments = [];
  this.getPoints;
  this.getSegments;
  this.getIntersections;
  this.segmentCount = 0;
  this.config(options);
  this.updateMap();
  return this;
}
;

var rectangle = __webpack_require__(/*! ./map-rectangle-methods.js */ "./src/map/map-rectangle-methods.js");

var line = __webpack_require__(/*! ./map-line-methods.js */ "./src/map/map-line-methods.js");

var polygon = __webpack_require__(/*! ./map-polygon-methods.js */ "./src/map/map-polygon-methods.js");

var arc = __webpack_require__(/*! ./map-circle-methods.js */ "./src/map/map-circle-methods.js");

var container = __webpack_require__(/*! ./map-container-methods.js */ "./src/map/map-container-methods.js");

Map.prototype = {
  config: __webpack_require__(/*! ./config.js */ "./src/map/config.js").config,
  setSegmentCount: __webpack_require__(/*! ./segmentsCount.js */ "./src/map/segmentsCount.js").setSegmentCount,
  //methods for rectangle maps
  _getRectanglePoints: rectangle.getPoints,
  _getRectangleSegments: rectangle.getSegments,
  _updateRectangleMap: rectangle.updateMap,
  //methods for line maps
  _getLinePoints: line.getPoints,
  _getLineSegments: line.getSegments,
  _updateLineMap: line.updateMap,
  //methods for polygon maps
  _getPolygonPoints: polygon.getPoints,
  _getPolygonSegments: polygon.getSegments,
  _updatePolygonMap: polygon.updateMap,
  //methods for circle maps
  _getArcPoints: arc.getPoints,
  _getArcSegments: arc.getSegments,
  _updateArcMap: arc.updateMap,
  //methods for container maps
  _getContainerPoints: container.getPoints,
  _getContainerSegments: container.getSegments,
  _updateContainerMap: container.updateMap
};
Map.prototype.constructor = Map;

/***/ }),

/***/ "./src/map/map-line-methods.js":
/*!*************************************!*\
  !*** ./src/map/map-line-methods.js ***!
  \*************************************/
/*! exports provided: getPoints, getSegments, updateMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPoints", function() { return getPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSegments", function() { return getSegments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateMap", function() { return updateMap; });
/*Map methods for lines*/

/**
 * Get array of points for line.
 *
 * @function Map._getLinePoints
 * @since 0.6.0
 *
 * @param {object} [ray] - Ray object.
 *
 * @return {array} Array of points.
 */
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!this.active) return [];
  return this._points;
}
;
/**
 * Get array of segments representing line.
 *
 * @function Map._getLineSegments
 * @since 0.6.0
 *
 *
 * @return {array} Array of Phaser.Geom.Line objects.
 */

function getSegments() {
  if (!this.active) return [];
  return this._segments;
}
;
/**
 * Update line's map of points and segments.
 *
 * @function Map._updateLineMap
 * @since 0.6.0
 *
 *
 * @return {object} Map object.
 */

function updateMap() {
  if (!this.active) return this;
  var points = [];
  var segments = []; //calculate offset based on object position and origin point

  var offset = new Phaser.Geom.Point();
  offset.x = this.object.x - this.object.displayWidth * this.object.originX;
  offset.y = this.object.y - this.object.displayHeight * this.object.originY;
  var pointA = this.object.geom.getPointA();
  var pointB = this.object.geom.getPointB(); //calculate positions after object's rotation

  var rotation = this.object.rotation;

  if (rotation !== 0) {
    var vectorA = new Phaser.Geom.Line(this.object.x, this.object.y, pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y);
    Phaser.Geom.Line.SetToAngle(vectorA, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vectorA) + rotation, Phaser.Geom.Line.Length(vectorA));
    pointA = vectorA.getPointB();
    var vectorB = new Phaser.Geom.Line(this.object.x, this.object.y, pointB.x * this.object.scaleX + offset.x, pointB.y * this.object.scaleY + offset.y);
    Phaser.Geom.Line.SetToAngle(vectorB, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vectorB) + rotation, Phaser.Geom.Line.Length(vectorB));
    pointB = vectorB.getPointB(); //set points

    points.push(new Phaser.Geom.Point(pointA.x, pointA.y));
    points.push(new Phaser.Geom.Point(pointB.x, pointB.y)); //set segment

    segments.push(new Phaser.Geom.Line(pointA.x, pointA.y, pointB.x, pointB.y));
  } //if rotation === 0
  else {
      //set points
      points.push(new Phaser.Geom.Point(pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y));
      points.push(new Phaser.Geom.Point(pointB.x * this.object.scaleX + offset.x, pointB.y * this.object.scaleY + offset.y)); //set segment

      segments.push(new Phaser.Geom.Line(pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y, pointB.x + offset.x * this.object.scaleX, pointB.y * this.object.scaleY + offset.y));
    }

  this._points = points;
  this._segments = segments;
  return this;
}
;

/***/ }),

/***/ "./src/map/map-polygon-methods.js":
/*!****************************************!*\
  !*** ./src/map/map-polygon-methods.js ***!
  \****************************************/
/*! exports provided: getPoints, getSegments, updateMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPoints", function() { return getPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSegments", function() { return getSegments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateMap", function() { return updateMap; });
/*Map methods for polygons*/

/**
 * Get array of polygon's points.
 *
 * @function Map._getPolygonPoints
 * @since 0.6.0
 *
 * @param {object} [ray] - Ray object.
 *
 * @return {array} Array of points.
 */
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!this.active) return [];
  return this._points;
}
;
/**
 * Get array of segments representing polygon.
 *
 * @function Map._getPolygonSegments
 * @since 0.6.0
 *
 *
 * @return {array} Array of Phaser.Geom.Line objects.
 */

function getSegments() {
  if (!this.active) return [];
  return this._segments;
}
;
/**
 * Update polygon's map of points and segments.
 *
 * @function Map._updatePolygonMap
 * @since 0.6.0
 *
 *
 * @return {object} Map object.
 */

function updateMap() {
  if (!this.active) return this;
  var points = [];
  var segments = []; //calculate offset based on object position and origin point

  var offset = new Phaser.Geom.Point();
  offset.x = this.object.x - this.object.displayWidth * this.object.originX;
  offset.y = this.object.y - this.object.displayHeight * this.object.originY; //set points
  //calculate positions after object's rotation

  var rotation = this.object.rotation;

  if (rotation !== 0) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.object.geom.points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var point = _step.value;
        var vector = new Phaser.Geom.Line(this.object.x, this.object.y, point.x * this.object.scaleX + offset.x, point.y * this.object.scaleY + offset.y);
        Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
        points.push(vector.getPointB());
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } //if rotation === 0
  else {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.object.geom.points[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _point = _step2.value;
          points.push(new Phaser.Geom.Point(_point.x * this.object.scaleX + offset.x, _point.y * this.object.scaleY + offset.y));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } //set segments


  for (var i = 0, length = points.length; i < length; i++) {
    if (i + 1 < length) segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y));
  } //if polygon is closed


  if (this.object.closePath) {
    var last = points.length - 1;
    segments.push(new Phaser.Geom.Line(points[last].x, points[last].y, points[0].x, points[0].y));
  }

  this._points = points;
  this._segments = segments;
  return this;
}
;

/***/ }),

/***/ "./src/map/map-rectangle-methods.js":
/*!******************************************!*\
  !*** ./src/map/map-rectangle-methods.js ***!
  \******************************************/
/*! exports provided: getPoints, getSegments, updateMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPoints", function() { return getPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSegments", function() { return getSegments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateMap", function() { return updateMap; });
/*Map methods for rectangles*/

/**
 * Get array of rectangle's points.
 *
 * @function Map._getRectanglePoints
 * @since 0.6.0
 *
 * @param {object} [ray] - Ray object.
 *
 * @return {array} Array of points.
 */
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!this.active) return [];
  return this._points;
}
;
/**
 * Get array of segments representing rectangle.
 *
 * @function Map._getRectangleSegments
 * @since 0.6.0
 *
 *
 * @return {array} Array of Phaser.Geom.Line objects.
 */

function getSegments() {
  if (!this.active) return [];
  return this._segments;
}
;
/**
 * Update rectangle's map of points and segments.
 *
 * @function Map._updateRectangleMap
 * @since 0.6.0
 *
 *
 * @return {object} Map object.
 */

function updateMap() {
  if (!this.active) return this;
  var points = [];
  var segments = []; //set points

  points = [this.object.getTopLeft(), this.object.getTopRight(), this.object.getBottomRight(), this.object.getBottomLeft()]; //set segments

  for (var i = 0, length = points.length; i < length; i++) {
    if (i + 1 < length) segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y));else segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[0].x, points[0].y));
  }

  this._points = points;
  this._segments = segments;
  return this;
}
;

/***/ }),

/***/ "./src/map/segmentsCount.js":
/*!**********************************!*\
  !*** ./src/map/segmentsCount.js ***!
  \**********************************/
/*! exports provided: setSegmentCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSegmentCount", function() { return setSegmentCount; });
/**
 * Set segment count for cirle's map.
 *
 * @function Map.setSegmentCount
 * @since 0.6.0
 *
 * @param {integer} [count] - Circle's map segments count.
 *
 * @return {object} Map object.
 */
function setSegmentCount(count) {
  this.segmentCount = count;
  this.updateMap();
  return this;
}

/***/ }),

/***/ "./src/ray/angle.js":
/*!**************************!*\
  !*** ./src/ray/angle.js ***!
  \**************************/
/*! exports provided: setAngle, setAngleDeg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAngle", function() { return setAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAngleDeg", function() { return setAngleDeg; });
/**
 * Set ray angle in radians.
 *
 * @function Ray.setAngle
 * @since 0.6.0
 *
 * @param {float} [angle] - Ray's angle in radians.
 *
 * @return {object} Ray object.
 */
function setAngle() {
  var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  this.angle = Phaser.Math.Angle.Normalize(angle);
  Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
  return this;
}
/**
 * Set ray angle in degrees.
 *
 * @function Ray.setAngleDeg
 * @since 0.6.1
 *
 * @param {float} [angle] - Ray's angle in degrees.
 *
 * @return {object} Ray object.
 */

function setAngleDeg() {
  var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  this.angle = Phaser.Math.Angle.Normalize(Phaser.Math.DegToRad(angle));
  Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
  return this;
}

/***/ }),

/***/ "./src/ray/cast.js":
/*!*************************!*\
  !*** ./src/ray/cast.js ***!
  \*************************/
/*! exports provided: cast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cast", function() { return cast; });
/**
 * Cast ray to find closest intersection with tested mapped objects.
 *
 * @function Ray.cast
 * @since 0.6.0
 *
 * @param {object} [options] - options that may include:
 * - {array} [objects] - Array of game objects to test. If not provided use all mapped game objects.
 * - {Phaser.Types.Math.Vector2Like} [target] - Ray's target point. Used in other casting methods to determine if ray was targeting mapped objects point.
 *
 * @return {Phaser.Types.Math.Vector2Like} / {boolean} - Point object of ray's closest intersection with tested objects. Returns false if no intersection has been found.
 */
function cast() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var closestIntersection;
  var closestDistance = this.range; //if bounding box is defined check bounding box intersection

  if (this._raycaster && this._raycaster.boundingBox) {
    var _intersections = [];
    Phaser.Geom.Intersects.GetLineToRectangle(this._ray, this._raycaster.boundingBox.rectangle, _intersections);
    if (_intersections.length === 1) closestIntersection = _intersections[0];else if (_intersections.length > 1) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _intersections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var intersection = _step.value;
          var distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, intersection.x, intersection.y);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIntersection = intersection;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } //if ray target is declared
    else if (options.target) {
        var _distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, options.target.x, options.target.y); //if target is within ray range


        if (this.range > _distance) {
          closestDistance = _distance;
          closestIntersection = options.target;
        }
      }
  } //if no objects to cast ray were passed, use raycasters mapped objects


  if (!options.objects) {
    if (this._raycaster) options.objects = this._raycaster.mappedObjects;else return intersections;
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = options.objects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var object = _step2.value;
      //check if object is intersected by ray
      if (!Phaser.Geom.Intersects.GetLineToRectangle(this._ray, object.getBounds())) continue;
      var map = object.data.get('raycasterMap'); //check intersections

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = map.getSegments(this)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var segment = _step3.value;
          var _intersection2 = []; //if target point is segmemt point

          if (options.target) {
            if (Phaser.Geom.Point.Equals(options.target, segment.getPointA()) || Phaser.Geom.Point.Equals(options.target, segment.getPointB())) {
              _intersection2 = options.target;
            } else if (!Phaser.Geom.Intersects.LineToLine(this._ray, segment, _intersection2)) continue;
          } //if no intersection continue
          else if (!Phaser.Geom.Intersects.LineToLine(this._ray, segment, _intersection2)) continue; //get closest intersection


          var _distance4 = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, _intersection2.x, _intersection2.y);

          if (_distance4 < closestDistance) {
            closestDistance = _distance4;
            closestIntersection = _intersection2;
          }
        } //check arc intersections if its not

      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      if (map.type === 'Arc') {
        //if arc has generated points (besides tangent points to ray)
        if (map._points.length > 0) {
          continue;
        } //check if target point is a circle tangent point to ray


        if (options.target) {
          var points = map.getPoints(this);
          var isTangent = false;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = points[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var point = _step4.value;

              if (Phaser.Geom.Point.Equals(options.target, point)) {
                //get closest intersection
                var _distance2 = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, point.x, point.y);

                if (_distance2 < closestDistance) {
                  closestDistance = _distance2;
                  closestIntersection = point;
                  isTangent = true;
                  break;
                }
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          if (isTangent) continue;
        }

        var circleIntersections = [];
        var offset = new Phaser.Geom.Point();
        offset.x = map.object.x - map.object.displayWidth * (map.object.originX - 0.5);
        offset.y = map.object.y - map.object.displayHeight * (map.object.originY - 0.5); //calculate circle's center after rotation

        var rotation = map.object.rotation;

        if (rotation !== 0) {
          var vector = new Phaser.Geom.Line(map.object.x, map.object.y, offset.x, offset.y);
          Phaser.Geom.Line.SetToAngle(vector, map.object.x, map.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
          var cB = vector.getPointB();
          offset.x = cB.x;
          offset.y = cB.y;
        } //create transformed circle


        var circle = new Phaser.Geom.Circle(offset.x, offset.y, map.object.radius * map.object.scaleX);

        if (Phaser.Geom.Intersects.GetLineToCircle(this._ray, circle, circleIntersections)) {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = circleIntersections[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _intersection = _step5.value;

              //get closest intersection
              var _distance3 = Phaser.Math.Distance.Between(this._ray.x1, this._ray.y1, _intersection.x, _intersection.y);

              if (_distance3 < closestDistance) {
                closestDistance = _distance3;
                closestIntersection = _intersection;
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  if (!closestIntersection) return this.ignoreNotIntersectedRays ? false : this._ray.getPointB();
  return new Phaser.Geom.Point(closestIntersection.x, closestIntersection.y);
}

/***/ }),

/***/ "./src/ray/castCircle.js":
/*!*******************************!*\
  !*** ./src/ray/castCircle.js ***!
  \*******************************/
/*! exports provided: castCircle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "castCircle", function() { return castCircle; });
/**
 * Cast ray in all directions to find closest intersections with tested mapped objects.
 *
 * @function Ray.castCircle
 * @since 0.6.0
 *
 * @param {object} [options] - options that may include:
 * - {array} [objects] - Array of game objects to test. If not provided use all mapped game objects.
 *
 * @return {array} - Array of Point objects of ray's closest intersections with tested objects.
 */
function castCircle() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var originalAngle = this.angle;
  var intersections = [];
  var maps = [];
  var rayTargets = [];
  var testedObjects = []; //if no objects to cast ray were passed, use raycasters mapped objects

  if (!options.objects) {
    if (this._raycaster) options.objects = this._raycaster.mappedObjects;else return intersections; //if bounding box is defined add bounding box points to 

    if (this._raycaster && this._raycaster.boundingBox) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._raycaster.boundingBox.points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var point = _step.value;
          rayTargets.push({
            point: point,
            angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, point.x, point.y)
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    for (var i = 0, iLength = options.objects.length; i < iLength; i++) {
      var object = options.objects[i]; //if bound in range

      if (!this.boundsInRange(object)) continue;
      testedObjects.push(object);
      var map = object.data.get('raycasterMap');
      maps.push(map); //get points and angles

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = map.getPoints(this)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _point = _step2.value;
          rayTargets.push({
            point: _point,
            angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, _point.x, _point.y)
          });
        } //get objects intersections

      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      for (var j = i + 1, jLength = options.objects.length; j < jLength; j++) {
        var objectB = options.objects[j];
        var mapB = objectB.data.get('raycasterMap'); //check if bounding boxes overlap

        if (!Phaser.Geom.Intersects.RectangleToRectangle(object.getBounds(), objectB.getBounds())) continue; //find objects intersections

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = map.getSegments(this)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var segmentA = _step3.value;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = mapB.getSegments(this)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var segmentB = _step4.value;
                var intersection = [];
                if (!Phaser.Geom.Intersects.LineToLine(segmentA, segmentB, intersection)) continue;
                rayTargets.push({
                  point: new Phaser.Geom.Point(intersection.x, intersection.y),
                  angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, intersection.x, intersection.y)
                });
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    } //sort target points by angle


    rayTargets.sort(function (a, b) {
      //if rays towards points have the same angles promote closer one
      if (a.angle == b.angle) {
        if (Phaser.Math.Distance.Between(this.origin.x, this.origin.y, a.point.x, a.point.y) < Phaser.Math.Distance.Between(this.origin.x, this.origin.y, b.point.x, b.point.y)) return 1;else return -1;
      }

      return a.angle - b.angle;
    }.bind(this)); //cast rays

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = rayTargets[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var target = _step5.value;
        this.setAngle(target.angle);

        var _intersection = this.cast({
          objects: testedObjects,
          target: target.point
        });

        if (_intersection) {
          //if intersection hits target point cast two additional rays
          if (Phaser.Geom.Point.Equals(target.point, _intersection)) {
            this.setAngle(target.angle - 0.0001);
            var intersectionA = this.cast({
              objects: testedObjects
            });
            if (intersectionA) intersections.push(intersectionA);
            intersections.push(_intersection);
            this.setAngle(target.angle + 0.0001);
            var intersectionB = this.cast({
              objects: testedObjects
            });
            if (intersectionB) intersections.push(intersectionB);
            continue;
          }

          intersections.push(_intersection);
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  }

  this.setAngle(originalAngle);
  return intersections;
}

/***/ }),

/***/ "./src/ray/castCone.js":
/*!*****************************!*\
  !*** ./src/ray/castCone.js ***!
  \*****************************/
/*! exports provided: castCone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "castCone", function() { return castCone; });
/**
 * Cast ray in cone to find closest intersections with tested mapped objects.
 *
 * @function Ray.castCone
 * @since 0.7.0
 *
 * @param {object} [options] - options that may include:
 * - {array} [objects] - Array of game objects to test. If not provided use all mapped game objects.
 *
 * @return {array} - Array of Point objects of ray's closest intersections with tested objects.
 */
function castCone() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var originalAngle = this.angle;
  var intersections = [];
  var maps = [];
  var rayTargets = [];
  var testedObjects = [];
  var cone = this.cone;
  var minAngle = 0;
  var maxAngle = 0;
  var angleOffset = 0; //set cone

  if (options.cone !== undefined) cone = options.cone;
  if (options.coneDeg !== undefined) cone = Phaser.Math.DegToRad(options.coneDeg); //set cone min and max angle

  minAngle = this.angle - cone / 2;
  maxAngle = this.angle + cone / 2; //add min and max angle points

  this.setAngle(minAngle);
  rayTargets.push({
    point: this._ray.getPointB(),
    angle: minAngle,
    angleOffsetDeg: Phaser.Math.RadToDeg(-cone / 2)
  });
  this.setAngle(maxAngle);
  rayTargets.push({
    point: this._ray.getPointB(),
    angle: maxAngle,
    angleOffsetDeg: Phaser.Math.RadToDeg(cone / 2)
  }); //if no objects to cast ray were passed, use raycasters mapped objects

  if (!options.objects) {
    if (this._raycaster) options.objects = this._raycaster.mappedObjects;else return intersections; //if bounding box is defined add bounding box points to 

    if (this._raycaster && this._raycaster.boundingBox) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._raycaster.boundingBox.points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var point = _step.value;
          var angle = Phaser.Math.Angle.Between(this.origin.x, this.origin.y, point.x, point.y);
          var angleOffsetDeg = Phaser.Math.Angle.ShortestBetween(Phaser.Math.RadToDeg(angle), Phaser.Math.RadToDeg(originalAngle));

          if (Math.abs(angleOffsetDeg) < Phaser.Math.RadToDeg(cone / 2)) {
            rayTargets.push({
              point: point,
              angle: angle,
              angleOffsetDeg: -angleOffsetDeg
            });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }

  for (var i = 0, iLength = options.objects.length; i < iLength; i++) {
    var object = options.objects[i]; //if bound in range

    if (!this.boundsInRange(object)) continue;
    testedObjects.push(object);
    var map = object.data.get('raycasterMap');
    maps.push(map); //get points and angles

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = map.getPoints(this)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _point = _step2.value;

        var _angle2 = Phaser.Math.Angle.Between(this.origin.x, this.origin.y, _point.x, _point.y);

        var _angleOffsetDeg2 = Phaser.Math.Angle.ShortestBetween(Phaser.Math.RadToDeg(_angle2), Phaser.Math.RadToDeg(originalAngle));

        if (Math.abs(_angleOffsetDeg2) < Phaser.Math.RadToDeg(cone / 2)) {
          rayTargets.push({
            point: _point,
            angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, _point.x, _point.y),
            angleOffsetDeg: -_angleOffsetDeg2
          });
        }
      } //get objects intersections

    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    for (var j = i + 1, jLength = options.objects.length; j < jLength; j++) {
      var objectB = options.objects[j];
      var mapB = objectB.data.get('raycasterMap'); //check if bounding boxes overlap

      if (!Phaser.Geom.Intersects.RectangleToRectangle(object.getBounds(), objectB.getBounds())) continue; //find objects intersections

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = map.getSegments(this)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var segmentA = _step3.value;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = mapB.getSegments(this)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var segmentB = _step4.value;
              var intersection = [];
              if (!Phaser.Geom.Intersects.LineToLine(segmentA, segmentB, intersection)) continue;

              var _angle = Phaser.Math.Angle.Between(this.origin.x, this.origin.y, intersection.x, intersection.y);

              var _angleOffsetDeg = Phaser.Math.Angle.ShortestBetween(Phaser.Math.RadToDeg(_angle), Phaser.Math.RadToDeg(originalAngle));

              if (Math.abs(_angleOffsetDeg) < Phaser.Math.RadToDeg(cone / 2)) {
                rayTargets.push({
                  point: new Phaser.Geom.Point(intersection.x, intersection.y),
                  angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, intersection.x, intersection.y),
                  angleOffsetDeg: -_angleOffsetDeg
                });
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  } //sort target points by angle


  rayTargets.sort(function (a, b) {
    //if rays towards points have the same angles promote closer one
    if (a.angle == b.angle) {
      if (Phaser.Math.Distance.Between(this.origin.x, this.origin.y, a.point.x, a.point.y) < Phaser.Math.Distance.Between(this.origin.x, this.origin.y, b.point.x, b.point.y)) return 1;else return -1;
    }

    return a.angleOffsetDeg - b.angleOffsetDeg;
  }.bind(this)); //cast rays

  for (var _i = 0, _rayTargets = rayTargets; _i < _rayTargets.length; _i++) {
    var target = _rayTargets[_i];
    this.setAngle(target.angle);

    var _intersection = this.cast({
      objects: testedObjects,
      target: target.point
    });

    if (_intersection) {
      //if intersection hits target point cast two additional rays
      if (Phaser.Geom.Point.Equals(target.point, _intersection)) {
        this.setAngle(target.angle - 0.0001);
        var intersectionA = this.cast({
          objects: testedObjects
        });
        if (intersectionA) intersections.push(intersectionA);
        intersections.push(_intersection);
        this.setAngle(target.angle + 0.0001);
        var intersectionB = this.cast({
          objects: testedObjects
        });
        if (intersectionB) intersections.push(intersectionB);
        continue;
      }

      intersections.push(_intersection);
    }
  }

  this.setAngle(originalAngle);
  return intersections;
}

/***/ }),

/***/ "./src/ray/cone.js":
/*!*************************!*\
  !*** ./src/ray/cone.js ***!
  \*************************/
/*! exports provided: setCone, setConeDeg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCone", function() { return setCone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConeDeg", function() { return setConeDeg; });
/**
 * Set ray's cone angle in radians.
 *
 * @function Ray.setAngle
 * @since 0.7.0
 *
 * @param {float} [cone] - Ray's cone angle in radians.
 *
 * @return {object} Ray object.
 */
function setCone() {
  var cone = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  this.cone = cone;
  return this;
}
/**
 * Set ray's cone angle in degrees.
 *
 * @function Ray.setAngleDeg
 * @since 0.7.0
 *
 * @param {float} [cone] - Ray's cone angle in degrees.
 *
 * @return {object} Ray object.
 */

function setConeDeg() {
  var cone = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  this.cone = Phaser.Math.DegToRad(cone);
  return this;
}

/***/ }),

/***/ "./src/ray/config.js":
/*!***************************!*\
  !*** ./src/ray/config.js ***!
  \***************************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/**
 * Configure ray on creation.
 *
 * @function Ray.config
 * @since 0.6.0
 *
 * @param {object} [options] - Ray's congfiguration options. May include:
 * - {Phaser.Types.Math.Vector2Like} [origin] = {x:0, y:0} - Ray's position.
 * - {float} [angle] = 0 - Ray's angle in radians.
 * - {float} [angleDeg] = 0 - Ray's angle in degrees.
 * - {float} [cone] = 0 - Ray's cone angle in radians.
 * - {float} [coneDeg] = 0 - Ray's cone angle in degrees.
 * - {integer} [range] = Phaser.Math.MAX_SAFE_INTEGER - Ray's range.
 * - {integer} [detectionRange] = Phaser.Math.MAX_SAFE_INTEGER - Maximum distance between ray's position and tested objects bounding boxes.
 * - {boolean} [ignoreNotIntersectedRays] = true - If set true, ray returns false when it didn't hit anything. Otherwise returns ray's target.
 *
 * @return {object} Ray object.
 */
function config(options) {
  this.object = options.object; //origin

  if (options.origin) this.origin.setTo(options.origin.x, options.origin.y); //angle

  if (options.angle) this.angle = Phaser.Math.Angle.Normalize(options.angle); //angle deg

  if (options.angleDeg) this.angle = Phaser.Math.Angle.Normalize(Phaser.Math.DegToRad(options.angleDeg)); //cone angle

  if (options.cone) this.cone = options.cone; //cone angle deg

  if (options.coneDeg) this.cone = Phaser.Math.DegToRad(options.coneDeg); //range (0 = max)

  if (options.range) this.range = options.range; //detection range (0 = max)

  if (options.detectionRange) this.detectionRange = options.detectionRange;
  if (options.ignoreNotIntersectedRays !== undefined) this.ignoreNotIntersectedRays = options.ignoreNotIntersectedRays == true;
  Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
  this.detectionRangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
  return this;
}

/***/ }),

/***/ "./src/ray/origin.js":
/*!***************************!*\
  !*** ./src/ray/origin.js ***!
  \***************************/
/*! exports provided: setOrigin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOrigin", function() { return setOrigin; });
/**
 * Set ray's position.
 *
 * @function Ray.setOrigin
 * @since 0.6.0
 *
 * @param {integer} x - X coordinate.
 * @param {integer} y - Y coordinate.
 *
 * @return {object} Ray object.
 */
function setOrigin(x, y) {
  this.origin.setTo(x, y);
  Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
  this.detectionRangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
  return this;
}

/***/ }),

/***/ "./src/ray/range.js":
/*!**************************!*\
  !*** ./src/ray/range.js ***!
  \**************************/
/*! exports provided: setRange, setDetectionRange, boundsInRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRange", function() { return setRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDetectionRange", function() { return setDetectionRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundsInRange", function() { return boundsInRange; });
/**
 * Set ray's range.
 *
 * @function Ray.setRange
 * @since 0.6.0
 *
 * @param {integer} [range] = Phaser.Math.MAX_SAFE_INTEGER - Ray's range.
 *
 * @return {object} Ray object.
 */
function setRange() {
  var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Phaser.Math.MAX_SAFE_INTEGER;
  this.range = range;
  Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
  return this;
}
/**
 * Set ray's range.
 *
 * @function Ray.setRange
 * @since 0.6.0
 *
 * @param {integer} [detectionRange] = Phaser.Math.MAX_SAFE_INTEGER - Maximum distance between ray's position and tested objects bounding boxes.
 *
 * @return {object} Ray object.
 */

function setDetectionRange() {
  var detectionRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  this.detectionRange = detectionRange;
  this.detectionRangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
  return this;
}
/**
 * Test if object's bounding box is in ray's detection range.
 *
 * @function Ray.boundsInRange
 * @since 0.6.0
 *
 * @param {object} object - Tested object
 * @param {Phaser.Geom. Rectangle} / {boolean} [bounds] = false - Tested object's bounds. If not passed bounds will be generated.
 *
 * @return {boolean} Information if object is in ray's detection range.
 */

function boundsInRange(object) {
  var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!this.detectionRange) return true;
  var objectBounds;
  if (bounds) objectBounds = bounds;else objectBounds = object.getBounds();
  if (Phaser.Geom.Intersects.CircleToRectangle(this.detectionRangeCircle, objectBounds)) return true;
  return false;
}

/***/ }),

/***/ "./src/ray/ray-core.js":
/*!*****************************!*\
  !*** ./src/ray/ray-core.js ***!
  \*****************************/
/*! exports provided: Ray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ray", function() { return Ray; });
/**
 * @classdesc
 *
 * Ray class responible for casting ray's and testing their collisions with mapped objects.
 *
 * @class Ray
 * @memberof Raycaster
 * @constructor
 * @since 6.0.0
 *
 * @param {object} options - Ray specific configuration settings.
 * @param {Raycaster} [raycaster] - Parent raycaster object.
 */
function Ray(options, raycaster) {
  this.origin = new Phaser.Geom.Point();
  this._ray = new Phaser.Geom.Line();
  this.angle = 0;
  this.cone = 0;
  this.range = Phaser.Math.MAX_SAFE_INTEGER;
  this.detectionRange = 0;
  this.detectionRangeCircle = new Phaser.Geom.Circle();
  this.ignoreNotIntersectedRays = true;
  this.intersections = [];
  this._raycaster = raycaster ? raycaster : false;
  this.config(options);
}
;
Ray.prototype = {
  config: __webpack_require__(/*! ./config.js */ "./src/ray/config.js").config,
  setRay: __webpack_require__(/*! ./ray.js */ "./src/ray/ray.js").setRay,
  setOrigin: __webpack_require__(/*! ./origin.js */ "./src/ray/origin.js").setOrigin,
  setRange: __webpack_require__(/*! ./range.js */ "./src/ray/range.js").setRange,
  setAngle: __webpack_require__(/*! ./angle.js */ "./src/ray/angle.js").setAngle,
  setAngleDeg: __webpack_require__(/*! ./angle.js */ "./src/ray/angle.js").setAngleDeg,
  setCone: __webpack_require__(/*! ./cone.js */ "./src/ray/cone.js").setCone,
  setConeDeg: __webpack_require__(/*! ./cone.js */ "./src/ray/cone.js").setConeDeg,
  setDetectionRange: __webpack_require__(/*! ./range.js */ "./src/ray/range.js").setDetectionRange,
  boundsInRange: __webpack_require__(/*! ./range.js */ "./src/ray/range.js").boundsInRange,
  cast: __webpack_require__(/*! ./cast.js */ "./src/ray/cast.js").cast,
  castCircle: __webpack_require__(/*! ./castCircle.js */ "./src/ray/castCircle.js").castCircle,
  castCone: __webpack_require__(/*! ./castCone.js */ "./src/ray/castCone.js").castCone
};

/***/ }),

/***/ "./src/ray/ray.js":
/*!************************!*\
  !*** ./src/ray/ray.js ***!
  \************************/
/*! exports provided: setRay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRay", function() { return setRay; });
/**
 * Set ray's position, direction (angle) and range.
 *
 * @function Ray.setAngle
 * @since 0.6.0
 *
 * @param {integer} x - X coordinate.
 * @param {integer} y - Y coordinate.
 * @param {float} [angle] - Ray's angle in radians.
 * @param {integer} [range] = Phaser.Math.MAX_SAFE_INTEGER - Ray's range.
 *
 * @return {object} Ray object.
 */
function setRay(x, y, angle) {
  var range = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Phaser.Math.MAX_SAFE_INTEGER;
  this.origin.setTo(x, y);
  this.angle = Phaser.Math.Angle.Normalize(angle);
  this.range = range;
  Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
  this.detectionRangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
  return this;
}

/***/ }),

/***/ "./src/raycaster-core.js":
/*!*******************************!*\
  !*** ./src/raycaster-core.js ***!
  \*******************************/
/*! exports provided: Raycaster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Raycaster", function() { return Raycaster; });
/**
* @author       Marcin Walczak <mail@marcinwalczak.pl>
* @copyright    2020 Marcin Walczak
* @license      {@link https://github.com/wiserim/phaser-raycaster/blob/master/LICENSE|MIT License}
*/

/**
 * @classdesc
 *
 * Raycaster class responible for creating ray objects and managing mapped objects.
 *
 * @class Raycaster
 * @constructor
 * @since 6.0.0
 *
 * @param {object} options - Ray specific configuration settings.
 */
function Raycaster(options) {
  this.version = '0.7.2';
  this.scene;
  this.graphics;
  this.boundingBox = false;
  this.mappedObjects = [];
  this.sortedPoints = [];
  this.mapSegmentCount = 0; //quantity of segments of map of circle

  if (options !== undefined) {
    if (options.boundingBox === undefined && options.scene !== undefined && options.scene.physics !== undefined) options.boundingBox = options.scene.physics.world.bounds;
    this.setOptions(options);
    if (options.autoUpdate === undefined || options.autoUpdate) //automatically update event
      this.scene.events.on('update', this.update.bind(this));
  } else //automatically update event
    this.scene.events.on('update', this.update.bind(this));

  return this;
}
Raycaster.prototype = {
  //set options
  setOptions: function setOptions(options) {
    if (options.scene !== undefined) {
      this.scene = options.scene;
      this.graphics = this.scene.add.graphics({
        lineStyle: {
          width: 1,
          color: 0x00ff00
        },
        fillStyle: {
          color: 0xff00ff
        }
      });
    }

    if (options.mapSegmentCount !== undefined) this.mapSegmentCount = options.mapSegmentCount;
    if (options.objects !== undefined) this.mapGameObjects(options.objects);
    if (options.boundingBox !== undefined) this.setBoundingBox(options.boundingBox.x, options.boundingBox.y, options.boundingBox.width, options.boundingBox.height);
    return this;
  },
  //set bounding box
  setBoundingBox: function setBoundingBox(x, y, width, height) {
    this.boundingBox = {
      rectangle: new Phaser.Geom.Rectangle(x, y, width, height),
      points: [],
      segments: []
    }; //set points

    var points = [new Phaser.Geom.Point(this.boundingBox.rectangle.left, this.boundingBox.rectangle.top), new Phaser.Geom.Point(this.boundingBox.rectangle.right, this.boundingBox.rectangle.top), new Phaser.Geom.Point(this.boundingBox.rectangle.right, this.boundingBox.rectangle.bottom), new Phaser.Geom.Point(this.boundingBox.rectangle.left, this.boundingBox.rectangle.bottom)];
    this.boundingBox.points = points; //set segments

    for (var i = 0, length = this.boundingBox.points.length; i < length; i++) {
      if (i + 1 < length) this.boundingBox.segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y));else this.boundingBox.segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[0].x, points[0].y));
    }
  },
  //map object
  mapGameObjects: function mapGameObjects(objects) {
    var dynamic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var segmentCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.mapSegmentCount;

    if (!Array.isArray(objects)) {
      if (this.mappedObjects.includes(objects)) return this;
      if (!objects.data) objects.setDataEnabled();
      var map = new this.Map({
        object: objects,
        dynamic: dynamic,
        segmentCount: segmentCount
      });
      objects.data.set('raycasterMap', map);
      this.mappedObjects.push(objects);
      return this;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var object = _step.value;
        if (this.mappedObjects.includes(object)) continue;
        if (!object.data) object.setDataEnabled();

        var _map = new this.Map({
          object: object,
          dynamic: dynamic,
          segmentCount: segmentCount
        });

        object.data.set('raycasterMap', _map);
        this.mappedObjects.push(object);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return this;
  },
  //remove mapped Objects
  removeMappedObjects: function removeMappedObjects(objects) {
    if (!Array.isArray(objects)) {
      var index = this.mappedObjects.indexOf(objects);
      if (index >= 0) this.mappedObjects.splice(index, 1);
      return this;
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = objects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var object = _step2.value;

        var _index = this.mappedObjects.indexOf(object);

        if (_index >= 0) this.mappedObjects.splice(_index, 1);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return this;
  },
  //enable maps
  enableMaps: function enableMaps(objects) {
    if (!Array.isArray(objects)) {
      if (objects.data) {
        var map = objects.data.get('raycasterMap');
        if (map) map.active = true;
      }

      return this;
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = objects[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var object = _step3.value;

        if (object.data) {
          var _map2 = object.data.get('raycasterMap');

          if (_map2) _map2.active = true;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return this;
  },
  //disable maps
  disableMaps: function disableMaps(objects) {
    if (!Array.isArray(objects)) {
      if (objects.data) {
        var map = objects.data.get('raycasterMap');
        if (map) map.active = false;
      }

      return this;
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = objects[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var object = _step4.value;

        if (object.data) {
          var _map3 = object.data.get('raycasterMap');

          if (_map3) _map3.active = false;
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    return this;
  },
  //scene update event listener
  update: function update() {
    //update dynamic maps
    if (this.mappedObjects.length > 0) {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.mappedObjects[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var mapppedObject = _step5.value;
          if (mapppedObject.data === undefined) continue;
          var map = mapppedObject.data.get('raycasterMap');
          if (map.dynamic) map.updateMap();
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  },
  //ray factory
  createRay: function createRay() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new this.Ray(options, this);
  }
};
Raycaster.prototype.Map = __webpack_require__(/*! ./map/map-core.js */ "./src/map/map-core.js").Map;
Raycaster.prototype.Ray = __webpack_require__(/*! ./ray/ray-core.js */ "./src/ray/ray-core.js").Ray;

/***/ })

/******/ });
});
//# sourceMappingURL=phaser-raycaster.js.map