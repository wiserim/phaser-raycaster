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

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2018 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser3-plugin-template/blob/master/LICENSE|MIT License}
*/
var PhaserRaycaster = function PhaserRaycaster(scene) {
  //  The Scene that owns this plugin
  this.scene = scene;
  this.systems = scene.sys;

  if (!scene.sys.settings.isBooted) {
    scene.sys.events.once('boot', this.boot, this);
  }
}; //  Static function called by the PluginFile Loader.


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
  //  A test method.
  test: function test(name) {
    console.log('BasePlugin says hello ' + name + '!');
  },
  //  Called when a Scene is started by the SceneManager. The Scene is now active, visible and running.
  start: function start() {},
  //  Called every Scene step - phase 1
  preUpdate: function preUpdate(time, delta) {},
  //  Called every Scene step - phase 2
  update: function update(time, delta) {},
  //  Called every Scene step - phase 3
  postUpdate: function postUpdate(time, delta) {},
  //  Called when a Scene is paused. A paused scene doesn't have its Step run, but still renders.
  pause: function pause() {},
  //  Called when a Scene is resumed from a paused state.
  resume: function resume() {},
  //  Called when a Scene is put to sleep. A sleeping scene doesn't update or render, but isn't destroyed or shutdown. preUpdate events still fire.
  sleep: function sleep() {},
  //  Called when a Scene is woken from a sleeping state.
  wake: function wake() {},
  //  Called when a Scene shuts down, it may then come back again later (which will invoke the 'start' event) but should be considered dormant.
  shutdown: function shutdown() {},
  //  Called when a Scene is destroyed by the Scene Manager. There is no coming back from a destroyed Scene, so clear up all resources here.
  destroy: function destroy() {
    this.shutdown();
    this.scene = undefined;
  },
  // Create Raycaster object
  createRaycaster: function createRaycaster() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    options.scene = this.scene;
    return new this._Raycaster(options);
  }
};
PhaserRaycaster.prototype.constructor = PhaserRaycaster;
PhaserRaycaster.prototype._Raycaster = __webpack_require__(/*! ./raycaster-core.js */ "./src/raycaster-core.js").Raycaster; //  Make sure you export the plugin for webpack to expose

module.exports = PhaserRaycaster;

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
//get points
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
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
; //get segments

function getSegments() {
  return this._segments;
}
; //map update

function updateMap() {
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

/***/ "./src/map/map-core.js":
/*!*****************************!*\
  !*** ./src/map/map-core.js ***!
  \*****************************/
/*! exports provided: Map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return Map; });
function Map(options, scene) {
  this.type;
  this.active;
  this.dynamic;
  this._object;
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
; //config

Map.prototype = {
  config: function config(options) {
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

      default:
        this.getPoints = this._getRectanglePoints;
        this.getSegments = this._getRectangleSegments;
        this.updateMap = this._updateRectangleMap;
    } //dynamic map


    this.dynamic = options.dynamic == true ? true : false;
    this.segmentCount = options.segmentCount ? options.segmentCount : 0;
    return this;
  },
  //set segments count for circle map
  setSegmentCount: function setSegmentCount(count) {
    this.segmentCount = count;
    this.updateMap();
    return this;
  }
}; //add methods for rectangle maps

var rectangle = __webpack_require__(/*! ./map-rectangle-methods.js */ "./src/map/map-rectangle-methods.js");

Map.prototype._getRectanglePoints = rectangle.getPoints;
Map.prototype._getRectangleSegments = rectangle.getSegments;
Map.prototype._updateRectangleMap = rectangle.updateMap; //add methods for line maps

var line = __webpack_require__(/*! ./map-line-methods.js */ "./src/map/map-line-methods.js");

Map.prototype._getLinePoints = line.getPoints;
Map.prototype._getLineSegments = line.getSegments;
Map.prototype._updateLineMap = line.updateMap; //add methods for polygon maps

var polygon = __webpack_require__(/*! ./map-polygon-methods.js */ "./src/map/map-polygon-methods.js");

Map.prototype._getPolygonPoints = polygon.getPoints;
Map.prototype._getPolygonSegments = polygon.getSegments;
Map.prototype._updatePolygonMap = polygon.updateMap; //add methods for circle maps

var arc = __webpack_require__(/*! ./map-circle-methods.js */ "./src/map/map-circle-methods.js");

Map.prototype._getArcPoints = arc.getPoints;
Map.prototype._getArcSegments = arc.getSegments;
Map.prototype._updateArcMap = arc.updateMap;

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
//get points
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return this._points;
}
; //get segments

function getSegments() {
  return this._segments;
}
; //map update

function updateMap() {
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

      segments.push(new Phaser.Geom.Line(pointA.x + offset.x, pointA.y + offset.y, pointB.x + offset.x, pointB.y + offset.y));
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
//get points
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return this._points;
}
; //get segments

function getSegments() {
  return this._segments;
}
; //map update

function updateMap() {
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
//get points
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return this._points;
}
; //get segments

function getSegments() {
  return this._segments;
}
; //map update

function updateMap() {
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

/***/ "./src/ray/ray-core.js":
/*!*****************************!*\
  !*** ./src/ray/ray-core.js ***!
  \*****************************/
/*! exports provided: Ray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ray", function() { return Ray; });
function Ray(options, raycaster) {
  this.origin = new Phaser.Geom.Point();
  this._ray = new Phaser.Geom.Line();
  this.angle = 0;
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
  //config
  config: function config(options) {
    this.object = options.object; //origin

    if (options.origin) this.origin.setTo(options.origin.x, options.origin.y); //range (0 = max)

    if (options.range) this.range = options.range; //detection range (0 = max)

    if (options.detectionRange) this.detectionRange = options.detectionRange;
    if (options.ignoreNotIntersectedRays !== undefined) this.ignoreNotIntersectedRays = options.ignoreNotIntersectedRays == true;
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
    return this;
  },
  //set ray
  setRay: function setRay(x, y, angle) {
    var range = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Phaser.Math.MAX_SAFE_INTEGER;
    this.origin.setTo(x, y);
    this.angle = angle;
    this.range = range;
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
    return this;
  },
  //set ray's origin point
  setOrigin: function setOrigin(x, y) {
    this.origin.setTo(x, y);
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
    return this;
  },
  //set ray's range
  setRange: function setRange() {
    var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Phaser.Math.MAX_SAFE_INTEGER;
    this.range = range;
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    return this;
  },
  //set angle
  setAngle: function setAngle() {
    var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    this.angle = angle;
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    return this;
  },
  //set detection range
  setDetectionRange: function setDetectionRange() {
    var detectionRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    this.detectionRange = detectionRange;
    this.rangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
    return this;
  },
  //is object (possibly) in range
  boundsInRange: function boundsInRange(object) {
    var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!this.detectionRange) return true;
    var objectBounds;
    if (bounds) objectBounds = bounds;else objectBounds = object.getBounds();
    if (Phaser.Geom.Intersects.CircleToRectangle(this.detectionRangeCircle, objectBounds)) return true;
    return false;
  },
  //cast ray to find closest intersection
  cast: function cast() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var closestIntersection;
    var closestDistance = Phaser.Math.MAX_SAFE_INTEGER; //if bounding box is defined check bounding box intersection

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
      } else {
        closestDistance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, options.target.x, options.target.y);
        closestIntersection = options.target;
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
          for (var _iterator3 = map.getSegments()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var segment = _step3.value;
            var _intersection2 = []; //if target point is segmemt point

            if (options.target) {
              if (Phaser.Geom.Point.Equals(options.target, segment.getPointA()) || Phaser.Geom.Point.Equals(options.target, segment.getPointB())) {
                _intersection2 = options.target;
              } else if (!Phaser.Geom.Intersects.LineToLine(this._ray, segment, _intersection2)) continue;
            } //if no intersection continue
            else if (!Phaser.Geom.Intersects.LineToLine(this._ray, segment, _intersection2)) continue; //get closest intersection


            var _distance3 = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, _intersection2.x, _intersection2.y);

            if (_distance3 < closestDistance) {
              closestDistance = _distance3;
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
                  var _distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, point.x, point.y);

                  if (_distance < closestDistance) {
                    closestDistance = _distance;
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
                var _distance2 = Phaser.Math.Distance.Between(this._ray.x1, this._ray.y1, _intersection.x, _intersection.y);

                if (_distance2 < closestDistance) {
                  closestDistance = _distance2;
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
  },
  //cast ray in all directions
  castAll: function castAll() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var intersections = [];
    var maps = [];
    var rayTargets = [];
    var testedObjects = []; //if no objects to cast ray were passed, use raycasters mapped objects

    if (!options.objects) {
      if (this._raycaster) options.objects = this._raycaster.mappedObjects;else return intersections; //if bounding box is defined add bounding box points to 

      if (this._raycaster && this._raycaster.boundingBox) {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this._raycaster.boundingBox.points[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var point = _step6.value;
            rayTargets.push({
              point: point,
              angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, point.x, point.y)
            });
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

      for (var i = 0, iLength = options.objects.length; i < iLength; i++) {
        var object = options.objects[i]; //if bound in range

        if (!this.boundsInRange(object)) continue;
        testedObjects.push(object);
        var map = object.data.get('raycasterMap');
        maps.push(map); //get points and angles

        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = map.getPoints(this)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var _point = _step7.value;
            rayTargets.push({
              point: _point,
              angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, _point.x, _point.y)
            });
          } //get objects intersections

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

        for (var j = i + 1, jLength = options.objects.length; j < jLength; j++) {
          var objectB = options.objects[j];
          var mapB = objectB.data.get('raycasterMap'); //check if bounding boxes overlap

          if (!Phaser.Geom.Intersects.RectangleToRectangle(object.getBounds(), objectB.getBounds())) continue; //find objects intersections

          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = map.getSegments()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var segmentA = _step8.value;
              var _iteratorNormalCompletion9 = true;
              var _didIteratorError9 = false;
              var _iteratorError9 = undefined;

              try {
                for (var _iterator9 = mapB.getSegments()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                  var segmentB = _step9.value;
                  var intersection = [];
                  if (!Phaser.Geom.Intersects.LineToLine(segmentA, segmentB, intersection)) continue;
                  rayTargets.push({
                    point: new Phaser.Geom.Point(intersection.x, intersection.y),
                    angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, intersection.x, intersection.y)
                  });
                }
              } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
                    _iterator9.return();
                  }
                } finally {
                  if (_didIteratorError9) {
                    throw _iteratorError9;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
                _iterator8.return();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        }
      } //sort target points by angle


      rayTargets.sort(function (a, b) {
        return a.angle - b.angle;
      }); //cast rays

      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = rayTargets[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var target = _step10.value;
          this.setAngle(target.angle);

          var _intersection3 = this.cast({
            objects: testedObjects,
            target: target.point
          });

          if (_intersection3) {
            //if intersection hits target point cast two additional rays
            if (Phaser.Geom.Point.Equals(target.point, _intersection3)) {
              this.setAngle(target.angle - 0.0001);
              var intersectionA = this.cast({
                objects: testedObjects
              });
              if (intersectionA) intersections.push(intersectionA);
              intersections.push(_intersection3);
              this.setAngle(target.angle + 0.0001);
              var intersectionB = this.cast({
                objects: testedObjects
              });
              if (intersectionB) intersections.push(intersectionB);
              continue;
            }

            intersections.push(_intersection3);
          }
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    }

    return intersections;
  }
};

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
function Raycaster(options) {
  this.scene;
  this.graphics;
  this.boundingBox = false;
  this.mappedObjects = [];
  this.sortedPoints = [];
  this.mapSegmentCount = 0; //quantity of segments of map of circle

  if (options !== undefined) this.setOptions(options); //update event

  this.scene.events.on('update', function () {
    this.update();
  }.bind(this));
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
      }, this.scene);
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
  //scene update event listener
  update: function update() {
    //update dynamic maps
    if (this.mappedObjects.length > 0) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.mappedObjects[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var mapppedObject = _step3.value;
          var map = mapppedObject.data.get('raycasterMap');
          if (map.dynamic) map.updateMap();
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
  },
  //ray factory
  createRay: function createRay(options) {
    return new this.Ray(options, this);
  }
};
Raycaster.prototype.Map = __webpack_require__(/*! ./map/map-core.js */ "./src/map/map-core.js").Map;
Raycaster.prototype.Ray = __webpack_require__(/*! ./ray/ray-core.js */ "./src/ray/ray-core.js").Ray;

/***/ })

/******/ });
});
//# sourceMappingURL=phaser-raycaster.js.map