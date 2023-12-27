(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("PhaserRaycaster", [], factory);
	else if(typeof exports === 'object')
		exports["PhaserRaycaster"] = factory();
	else
		root["PhaserRaycaster"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
* @author       Marcin Walczak <contact@marcin-walczak.pl>
* @copyright    2023 Marcin Walczak
* @license      {@link https://github.com/wiserim/phaser-raycaster/blob/master/LICENSE|MIT License}
*/
/**
 * Point object
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */
/**
 * @classdesc
 *
 * Raycaster plugin class.
 * 
 * @namespace PhaserRaycaster
 * @class PhaserRaycaster
 * @extends Phaser.Plugins.ScenePlugin
 * @constructor
 * @since 0.6.0
 *
 * @param {Phaser.Scene} scene
 * @param {Phaser.Plugins.PluginManager} pluginManager
 */
var PhaserRaycaster = /*#__PURE__*/function (_Phaser$Plugins$Scene) {
  _inherits(PhaserRaycaster, _Phaser$Plugins$Scene);
  var _super = _createSuper(PhaserRaycaster);
  function PhaserRaycaster(scene, pluginManager) {
    var _this;
    _classCallCheck(this, PhaserRaycaster);
    _this = _super.call(this, scene, pluginManager);
    _this._Raycaster = (__webpack_require__(/*! ./raycaster-core.js */ "./src/raycaster-core.js").Raycaster);
    return _this;
  }

  /**
  * Create Raycaster object.
  *
  * @method PhaserRaycaster#createRaycaster
  * @memberof PhaserRaycaster
  * @instance
  * @since 0.6.0
  *
  * @param {object} [options] - Raycaster's congfiguration options. May include:
  * @param {number} [options.mapSegmentCount = 0] - Number of segments of circle maps. If set to 0, map will be teste
  * @param {(object|object[])} [options.objects] - Game object or array of game objects to map.
  * @param {Phaser.Geom.Rectangle} [options.boundingBox] - Raycaster's bounding box. If not passed, {@link Raycaster Raycaster} will set it's bounding box based on Arcade Physics / Matter physics world bounds.
  * @param {boolean} [options.autoUpdate = true] - If set true, automatically update dynamic maps on scene update event.
  * @param {boolean|object} [options.debug] - Enable debug mode or configure it {@link Raycaster#debugOptions debugOptions}.
  *
  * @return {Raycaster} {@link Raycaster Raycaster} instance
  */
  _createClass(PhaserRaycaster, [{
    key: "createRaycaster",
    value: function createRaycaster() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      options.scene = this.scene;
      return new this._Raycaster(options);
    }
  }]);
  return PhaserRaycaster;
}(Phaser.Plugins.ScenePlugin); //Make sure you export the plugin for webpack to expose
module.exports = PhaserRaycaster;

/***/ }),

/***/ "./src/map/boundingBox.js":
/*!********************************!*\
  !*** ./src/map/boundingBox.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBoundingBox: function() { return /* binding */ getBoundingBox; }
/* harmony export */ });
/**
* Get mapped object's bounding box.
*
* @method Raycaster.Map#matterBody.getBoundingBox
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.9.0
*
* @return {Phaser.Geom.Rectangle} - Mapped object's bounding box.
*/
function getBoundingBox() {
  return this.object.getBounds();
}

/***/ }),

/***/ "./src/map/config.js":
/*!***************************!*\
  !*** ./src/map/config.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: function() { return /* binding */ config; }
/* harmony export */ });
var rectangle = __webpack_require__(/*! ./map-rectangle-methods.js */ "./src/map/map-rectangle-methods.js");
var line = __webpack_require__(/*! ./map-line-methods.js */ "./src/map/map-line-methods.js");
var polygon = __webpack_require__(/*! ./map-polygon-methods.js */ "./src/map/map-polygon-methods.js");
var arc = __webpack_require__(/*! ./map-circle-methods.js */ "./src/map/map-circle-methods.js");
var container = __webpack_require__(/*! ./map-container-methods.js */ "./src/map/map-container-methods.js");
var tilemap = __webpack_require__(/*! ./map-tilemap-methods.js */ "./src/map/map-tilemap-methods.js");
var matterBody = __webpack_require__(/*! ./map-matterBody-methods.js */ "./src/map/map-matterBody-methods.js");
var segmentCount = __webpack_require__(/*! ./segmentsCount.js */ "./src/map/segmentsCount.js");
var boundingBox = __webpack_require__(/*! ./boundingBox.js */ "./src/map/boundingBox.js");

/**
 * Configure map.
 *
 * @method Raycaster.Map#config
 * @memberof Raycaster.Map
 * @instance
 * @since 0.6.0
 *
 * @param {object} [options] - Map's congfiguration options. May include:
 * @param {object} options.object - Game object to map
 * @param {string} [options.type] - Map type. If not defined, it will be determined based on object.
 * @param {boolean} [options.dynamic = false] - If set true, map will be dynamic (updated on scene update event).
 * @param {boolean} [options.active = true] - If set true, map will be active (will provide points, segments and will be updated).
 * @param {number} [options.segmentCount] - Circle map's segment count. If set to 0, map won't be generating segments and relay only on tangent points calculated for currently testing ray.
 * @param {object} [options.mapChild] - Container's child. If set, only set child will be mapped.
 * @param {boolean} [options.forceConvex] - If set true, matter body map will use convex body (hull) for non-covex bodies.
 * @param {boolean} [options.forceVerticesMapping] - If set true, matter body map will use only vertices for mapping circle bodies.
 * 
 * @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
 */
function config(options) {
  this.object = options.object;
  //object type
  if (options.type === undefined) options.type = options.object.type;
  if (options.type === 'body' || options.type === 'composite') options.type = 'MatterBody';
  this.type = options.type;
  switch (options.type) {
    case 'Polygon':
      this.getPoints = polygon.getPoints;
      this.getSegments = polygon.getSegments;
      this.getBoundingBox = boundingBox.getBoundingBox;
      this.updateMap = polygon.updateMap;
      break;
    case 'Arc':
      //circle segments count
      this.segmentCount = options.segmentCount ? options.segmentCount : 0;
      this.circle = options.segmentCount ? false : true;
      this.getPoints = arc.getPoints;
      this.getSegments = arc.getSegments;
      this.getBoundingBox = boundingBox.getBoundingBox;
      this.updateMap = arc.updateMap;
      this.setSegmentCount = segmentCount.setSegmentCount;
      break;
    case 'Line':
      this.getPoints = line.getPoints;
      this.getSegments = line.getSegments;
      this.getBoundingBox = boundingBox.getBoundingBox;
      this.updateMap = line.updateMap;
      break;
    case 'Container':
      //container's child
      this.mapChild = options.mapChild ? options.mapChild : null;
      //circle segments count
      this.segmentCount = options.segmentCount ? options.segmentCount : 0;
      //transformed container's circle children
      this._circles = [];
      this.getPoints = container.getPoints;
      this.getSegments = container.getSegments;
      this.getBoundingBox = boundingBox.getBoundingBox;
      this.updateMap = container.updateMap;
      this._updateChildMap = container._updateChildMap;
      this.setSegmentCount = segmentCount.setSegmentCount;
      break;
    case 'StaticTilemapLayer':
      //ray colliding tiles
      this.collisionTiles = options.collisionTiles ? options.collisionTiles : [];
      this.getPoints = tilemap.getPoints;
      this.getSegments = tilemap.getSegments;
      this.getBoundingBox = boundingBox.getBoundingBox;
      this.updateMap = tilemap.updateMap;
      this.setCollisionTiles = tilemap.setCollisionTiles;
      //reset tilemap origin
      this.object.setOrigin(0, 0);
      break;
    case 'DynamicTilemapLayer':
      //ray colliding tiles
      this.collisionTiles = options.collisionTiles ? options.collisionTiles : [];
      this.getPoints = tilemap.getPoints;
      this.getSegments = tilemap.getSegments;
      this.getBoundingBox = boundingBox.getBoundingBox;
      this.updateMap = tilemap.updateMap;
      this.setCollisionTiles = tilemap.setCollisionTiles;
      //reset tilemap origin
      this.object.setOrigin(0, 0);
      break;
    case 'TilemapLayer':
      //ray colliding tiles
      this.collisionTiles = options.collisionTiles ? options.collisionTiles : [];
      this.getPoints = tilemap.getPoints;
      this.getSegments = tilemap.getSegments;
      this.getBoundingBox = boundingBox.getBoundingBox;
      this.updateMap = tilemap.updateMap;
      this.setCollisionTiles = tilemap.setCollisionTiles;
      //reset tilemap origin
      this.object.setOrigin(0, 0);
      break;
    case 'MatterBody':
      //force convex body (hull) mapping
      this.forceConvex = options.forceConvex ? true : false;
      //force mapping by vertices
      this.forceVerticesMapping = options.forceVerticesMapping ? true : false;
      this.circle = false;
      this.getPoints = matterBody.getPoints;
      this.getSegments = matterBody.getSegments;
      this.getBoundingBox = matterBody.getBoundingBox;
      this.updateMap = matterBody.updateMap;
      break;
    default:
      this.getPoints = rectangle.getPoints;
      this.getSegments = rectangle.getSegments;
      this.getBoundingBox = boundingBox.getBoundingBox;
      this.updateMap = rectangle.updateMap;
  }

  //if object is not supported
  if (this.type != 'MatterBody' && typeof this.object.getBounds !== 'function') {
    this.notSupported = true;
  }

  //dynamic map
  this.dynamic = options.dynamic == true ? true : false;

  //enable/disable map
  this.active = options.active !== undefined ? options.active : true;
  return this;
}

/***/ }),

/***/ "./src/map/destroy.js":
/*!****************************!*\
  !*** ./src/map/destroy.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   destroy: function() { return /* binding */ destroy; }
/* harmony export */ });
/**
 * Destroy object
 *
 * @method Raycaster.Map#destroy
 * @memberof Raycaster.Map
 * @instance
 * @since 0.10.3
 */
function destroy() {
  //destroy reference to map object in mapped object
  if (this.object.type === 'body' || this.object.type === 'composite') {
    delete this.object.raycasterMap;
  } else if (this.object.data) {
    this.object.data.remove('raycasterMap');
  }
  for (var key in this) {
    delete this[key];
  }
}

/***/ }),

/***/ "./src/map/map-circle-methods.js":
/*!***************************************!*\
  !*** ./src/map/map-circle-methods.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPoints: function() { return /* binding */ getPoints; },
/* harmony export */   getSegments: function() { return /* binding */ getSegments; },
/* harmony export */   updateMap: function() { return /* binding */ updateMap; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/*Map methods for circles*/
/**
* Get array of mapped circle's vertices used as rays targets.
* If {@link Raycaster.Map#segmentCount Raycaster.Map#segmentCount} is set to 0, it'll calculatoe tangent points for passed ray.
*
* @method Raycaster.Map#arc.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
*/
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!this.active) return [];
  if (this._points.length > 0) return this._points;
  var points = [];
  var offset = new Phaser.Geom.Point();
  offset.x = this.object.x - this.object.displayWidth * (this.object.originX - 0.5);
  offset.y = this.object.y - this.object.displayHeight * (this.object.originY - 0.5);

  //calculate tangent rays
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
    var rayLength = Math.sqrt(Math.pow(Phaser.Geom.Line.Length(c), 2) - Math.pow(this.object.radius * this.object.scaleX, 2));

    //ray angle
    var angle = Phaser.Geom.Line.Angle(c);
    var dAngle = Math.asin(this.object.radius * this.object.scaleX / Phaser.Geom.Line.Length(c));
    Phaser.Geom.Line.SetToAngle(rayA, ray.origin.x, ray.origin.y, angle - dAngle, rayLength);
    Phaser.Geom.Line.SetToAngle(rayB, ray.origin.x, ray.origin.y, angle + dAngle, rayLength);

    //add tangent points
    points.push(rayA.getPointB());
    points.push(rayB.getPointB());
    //assign neighbours
    points[0].neighbours = [points[1]];
    points[1].neighbours = [points[0]];
  }
  return points;
}
;

/**
* Get array of mapped circle's segments used to test object's intersection with ray.
* If {@link Raycaster.Map#segmentCount Raycaster.Map#segmentCount} is set to 0, it'll return empty array.
*
* @method Raycaster.Map#arc.getSegments
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @return {Phaser.Geom.Line[]} - Array of mapped object's segments.
*/
function getSegments() {
  if (!this.active) return [];
  return this._segments;
}
;

/**
* Update circles's map of points and segments.
*
* @method Raycaster.Map#arc.updateMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
function updateMap() {
  if (!this.active) return this;
  if (!this.segmentCount) {
    this._points = [];
    this._segments = [];
    return this;
  }

  //calculate offset based on object position and origin point
  var offset = new Phaser.Geom.Point();
  offset.x = this.object.x - this.object.displayWidth * this.object.originX + this.object.radius * this.object.scaleX;
  offset.y = this.object.y - this.object.displayHeight * this.object.originY + this.object.radius * this.object.scaleY;

  //get points surrounding circle
  var points = this.object.geom.getPoints(this.segmentCount);
  var segments = [];

  //set points
  //calculate positions after object's rotation
  var rotation = this.object.rotation;
  if (rotation !== 0) {
    var newPoints = [];
    var _iterator = _createForOfIteratorHelper(points),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var point = _step.value;
        var vector = new Phaser.Geom.Line(this.object.x, this.object.y, this.object.x + (point.x + this.object.radius) * this.object.scaleX, this.object.y + (point.y + this.object.radius) * this.object.scaleY);
        Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
        newPoints.push(vector.getPointB());
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    points = newPoints;
  }
  //if rotation === 0
  else {
    var _iterator2 = _createForOfIteratorHelper(points),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _point = _step2.value;
        _point.x = _point.x * this.object.scaleX + offset.x;
        _point.y = _point.y * this.object.scaleY + offset.y;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  //set segments
  for (var i = 0, length = points.length; i < length; i++) {
    var prevPoint = i > 0 ? points[i - 1] : points.slice(-1)[0],
      nextPoint = i < length - 1 ? points[i + 1] : points[0];
    segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, nextPoint.x, nextPoint.y));
    points[i].neighbours = [prevPoint, nextPoint];
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _updateChildMap: function() { return /* binding */ _updateChildMap; },
/* harmony export */   getPoints: function() { return /* binding */ getPoints; },
/* harmony export */   getSegments: function() { return /* binding */ getSegments; },
/* harmony export */   updateMap: function() { return /* binding */ updateMap; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/*Map methods for containers*/
/**
* Get array of mapped container's and its children vertices used as rays targets.
*
* @method Raycaster.Map#container.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.7.1
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
* @param {boolean} [isChild] - Flag definig if it is child container.
*
* @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
*/
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var isChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!this.active) return [];
  var points = this._points;
  //calculate offset based on container position and origin point
  var offset = new Phaser.Geom.Point();
  offset.x = this.object.x - this.object.displayWidth * this.object.originX;
  offset.y = this.object.y - this.object.displayHeight * this.object.originY;

  //get tangent points of container's circles
  if (this.segmentCount == 0 && !isChild) {
    if (ray) {
      //create temporary ray
      var vector = new Phaser.Geom.Line(0, 0, ray.origin.x - offset.x, ray.origin.y - offset.y);
      Phaser.Geom.Line.SetToAngle(vector, 0, 0, Phaser.Geom.Line.Angle(vector) - this.object.rotation, Phaser.Geom.Line.Length(vector));

      //calculate tangent rays
      var rayA = new Phaser.Geom.Line(),
        rayB = new Phaser.Geom.Line(),
        c;
      var _iterator = _createForOfIteratorHelper(this._circles),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var circle = _step.value;
          circle.points = [];
          c = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, circle.x, circle.y);
          var rayLength = Math.sqrt(Math.pow(Phaser.Geom.Line.Length(c), 2) - Math.pow(circle.radius, 2));

          //ray angle
          var angle = Phaser.Geom.Line.Angle(c);
          var dAngle = Math.asin(circle.radius / Phaser.Geom.Line.Length(c));
          Phaser.Geom.Line.SetToAngle(rayA, ray.origin.x, ray.origin.y, angle - dAngle, rayLength);
          Phaser.Geom.Line.SetToAngle(rayB, ray.origin.x, ray.origin.y, angle + dAngle, rayLength);

          //adding tangent points
          circle.points.push(rayA.getPointB());
          circle.points.push(rayB.getPointB());
          points.push(rayA.getPointB());
          points.push(rayB.getPointB());
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
  return points;
}
;

/**
* Get array of mapped container's and its children segments used to test object's intersection with ray.
*
* @method Raycaster.Map#container.getSegments
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.7.1
*
* @return {Phaser.Geom.Line[]} - Array of mapped object's segments.
*/
function getSegments() {
  if (!this.active) return [];
  return this._segments;
}
;

/**
* Update container's and its children maps of points and segments.
*
* @method Raycaster.Map#container.updateMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.7.1
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
function updateMap() {
  if (!this.active) return this;
  var points = [];
  var segments = [];
  var container = this.object;
  this._circles = [];

  //calculate offset based on container position and origin point
  var offset = new Phaser.Geom.Point();
  offset.x = this.object.x - this.object.displayWidth * this.object.originX;
  offset.y = this.object.y - this.object.displayHeight * this.object.originY;
  var rotation = container.rotation;
  if (this.mapChild) {
    this._updateChildMap(this.mapChild, points, segments, rotation, offset);
  } else {
    //iterate through container's children
    container.iterate(function (child) {
      this._updateChildMap(child, points, segments, rotation, offset);
    }.bind(this));

    //get children intersections
    for (var i = 0, iLength = container.list.length; i < iLength; i++) {
      var childA = container.list[i];
      var mapA = childA.data.get('raycasterMap');
      if (!mapA) continue;
      for (var j = i + 1, jLength = container.list.length; j < jLength; j++) {
        var childB = container.list[j];
        var mapB = childB.data.get('raycasterMap');
        //check if bounding boxes overlap
        if (!mapB || !Phaser.Geom.Intersects.RectangleToRectangle(childA.getBounds(), childB.getBounds())) continue;

        //find objects intersections
        var _iterator2 = _createForOfIteratorHelper(mapA.getSegments()),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var segmentA = _step2.value;
            var _iterator3 = _createForOfIteratorHelper(mapB.getSegments()),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var segmentB = _step3.value;
                var intersection = [];
                if (!Phaser.Geom.Intersects.LineToLine(segmentA, segmentB, intersection)) continue;

                //calculate positions after container's rotation
                if (rotation !== 0) {
                  var vector = new Phaser.Geom.Line(container.x, container.y, intersection.x * container.scaleX + offset.x, intersection.y * container.scaleY + offset.y);
                  Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
                  points.push(vector.getPointB());
                }
                //if rotation === 0
                else points.push(new Phaser.Geom.Point(intersection.x * container.scaleX + offset.x, intersection.y * container.scaleX + offset.y));
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }
  this._points = points;
  this._segments = segments;
  return this;
}
;

/**
* Update container's child map of points and segments.
*
* @method Raycaster.Map#container._updateChildMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.10.3
*
* @param {object} [child] - Container's child object.
* @param {Phaser.Geom.Point[]} [points] - Container's mapped points.
* @param {Phaser.Geom.Line[]} [segments] - Container's mapped segments.
* @param {number} [rotation] - Container's rotation.
* @param {Phaser.Geom.Point} [offset] - Container's offset.
*/
function _updateChildMap(child, points, segments, rotation, offset) {
  if (!child.data) child.setDataEnabled();

  //if object is not supported
  if (child.data.get('raycasterMapNotSupported')) return;

  //get child map
  var map = child.data.get('raycasterMap');
  if (!map) {
    map = new this.constructor({
      object: child,
      segmentCount: this.segmentCount
    });
    if (map.notSupported) {
      map.destroy();
      child.data.set('raycasterMapNotSupported', true);
      return;
    }
    child.data.set('raycasterMap', map);
  } else map.updateMap();

  //add child points
  var childPoints = [];
  var _iterator4 = _createForOfIteratorHelper(map.getPoints(false, true)),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var point = _step4.value;
      var childPoint = void 0;

      //calculate positions after container's rotation
      if (rotation !== 0) {
        var _vector2 = new Phaser.Geom.Line(this.object.x, this.object.y, point.x * this.object.scaleX + offset.x, point.y * this.object.scaleY + offset.y);
        Phaser.Geom.Line.SetToAngle(_vector2, this.object.x, this.object.y, Phaser.Geom.Line.Angle(_vector2) + rotation, Phaser.Geom.Line.Length(_vector2));
        childPoint = _vector2.getPointB();
      }
      //if rotation === 0
      else childPoint = new Phaser.Geom.Point(point.x * this.object.scaleX + offset.x, point.y * this.object.scaleX + offset.y);

      //add neighbour points
      childPoint.neighbours = [];
      if (childPoints.length > 0) {
        var previousPoint = childPoints.slice(-1)[0];
        previousPoint.neighbours.push(childPoint);
        childPoint.neighbours.push(previousPoint);
      }
      childPoints.push(childPoint);
      points.push(childPoint);
    }

    //add neighbour point to last child point
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  if (childPoints.length > 0) {
    childPoints.slice(-1)[0].neighbours.push(childPoints[0]);
  }

  //add child segments
  var _iterator5 = _createForOfIteratorHelper(map.getSegments()),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
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
      }
      //if rotation === 0
      else segments.push(new Phaser.Geom.Line(segment.getPointA().x * this.object.scaleX + offset.x, segment.getPointA().y * this.object.scaleY + offset.y, segment.getPointB().x * this.object.scaleX + offset.x, segment.getPointB().y * this.object.scaleY + offset.y));
    }

    //if child's map is a circle and this.segmentsCount == 0, store transformed circles in this._circles array.
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  if (map.type == 'Arc' && this.segmentCount == 0) {
    var circleOffset = new Phaser.Geom.Point();
    circleOffset.x = (map.object.x - map.object.displayWidth * (map.object.originX - 0.5)) * this.object.scaleX + offset.x;
    circleOffset.y = (map.object.y - map.object.displayHeight * (map.object.originY - 0.5)) * this.object.scaleY + offset.y;
    if (rotation !== 0) {
      var vector = new Phaser.Geom.Line(this.object.x, this.object.y, circleOffset.x, circleOffset.y);
      Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
      circleOffset = vector.getPointB();
    }
    this._circles.push(new Phaser.Geom.Circle(circleOffset.x, circleOffset.y, map.object.radius * map.object.scaleX * this.object.scaleX));
  } else if (map.type === 'Container') {
    var _iterator6 = _createForOfIteratorHelper(map._circles),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var childMapCircle = _step6.value;
        var _circleOffset = new Phaser.Geom.Point();
        _circleOffset.x = childMapCircle.x * this.object.scaleX + offset.x;
        _circleOffset.y = childMapCircle.y * this.object.scaleY + offset.y;
        if (rotation !== 0) {
          var _vector = new Phaser.Geom.Line(this.object.x, this.object.y, _circleOffset.x, _circleOffset.y);
          Phaser.Geom.Line.SetToAngle(_vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(_vector) + rotation, Phaser.Geom.Line.Length(_vector));
          _circleOffset = _vector.getPointB();
        }
        this._circles.push(new Phaser.Geom.Circle(_circleOffset.x, _circleOffset.y, childMapCircle.radius * this.object.scaleX));
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  }
}

/***/ }),

/***/ "./src/map/map-core.js":
/*!*****************************!*\
  !*** ./src/map/map-core.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Map: function() { return /* binding */ Map; }
/* harmony export */ });
/**
 * @classdesc
 *
 * Map class responsible for mapping game objects.
 *
 * @namespace Raycaster.Map
 * @class Raycaster.Map
 * @constructor
 * @since 0.6.0
 *
 * @param {object} options - Map specific configuration settings.
 * @param {Raycaster} [raycaster] - Parent raycaster object.
 */
function Map(options, raycaster) {
  /**
  * Reference to parent Raycaster object.
  *
  * @name Raycaster.Map#_raycaster
  * @type {Raycaster}
  * @private
  * @since 0.9.0
  */
  this._raycaster = raycaster ? raycaster : false;
  /**
  * Mapped object's type
  *
  * @name Raycaster.Map#type
  * @type {string}
  * @readonly
  * @since 0.6.0
  */
  this.type;
  /**
  * If set true, map will be tested by ray. Otherwise it will be ignored.
  *
  * @name Raycaster.Map#active
  * @type {boolean}
  * @default true
  * @since 0.7.2
  */
  this.active;
  /**
  * If set true, map will be automatically updated on scene update event.
  *
  * @name Raycaster.Map_dynamic
  * @type {boolean}
  * @default false
  * @since 0.6.0
  */
  this._dynamic = false;
  /**
  * If set true, map will be treated by ray as circle. Set automaticalyy on map update.
  *
  * @name Raycaster.Map#circle
  * @type {boolean}
  * @default false
  * @since 0.9.0
  */
  this.circle = false;
  /**
  * Reference to mapped object.
  *
  * @name Raycaster.Map#object
  * @type {object}
  * @readonly
  * @since 0.6.0
  */
  this.object;
  /**
  * Array of mapped object's vertices used as rays targets.
  *
  * @name Raycaster.Map#_points
  * @type {array}
  * @private
  * @since 0.6.0
  */
  this._points = [];
  /**
  * Array of mapped object's segments used to test object's intersection with ray.
  *
  * @name Raycaster.Map#_segments
  * @type {array}
  * @private
  * @since 0.6.0
  */
  this._segments = [];
  /**
  * Get array of mapped object's vertices used as rays targets.
  *
  * @method Raycaster.Map#getPoints
  * @memberof Raycaster.Map
  * @instance
  * @since 0.6.0
  *
  * @param {Raycaster.Ray} [ray] - {@link Raycaster.Ray Raycaster.Ray} object used in some some types of maps.
  *
  * @return {Phaser.Geom.Point[]} Array of mapped object's vertices.
  */
  this.getPoints;
  /**
  * Get array of mapped object's segments used to test object's intersection with ray.
  *
  * @method Raycaster.Map#getSegments
  * @memberof Raycaster.Map
  * @instance
  * @since 0.6.0
  *
  * @param {Raycaster.Ray} [ray] - {@link Raycaster.Ray Raycaster.Ray} object used in some some types of maps.
  *
  * @return {Phaser.Geom.Line[]} Array of mapped object's segments.
  */
  this.getSegments;
  /**
  * Get mapped object's bounding box.
  *
  * @method Raycaster.Map#getBoundingBox
  * @memberof Raycaster.Map
  * @instance
  * @since 0.9.0
  *
  * @return {Phaser.Geom.Rectangle} Mapped object's bounding box.
  */
  this.getBoundingBox;
  /**
  * Update object's map of points and segments.
  *
  * @method Raycaster.Map#updateMap
  * @memberof Raycaster.Map
  * @instance
  * @since 0.6.0
  *
  * @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
  */
  this.updateMap;
  this.config(options);
  if (!this.notSupported) this.updateMap();
  return this;
}
;
Map.prototype = {
  config: (__webpack_require__(/*! ./config.js */ "./src/map/config.js").config),
  destroy: (__webpack_require__(/*! ./destroy.js */ "./src/map/destroy.js").destroy),
  get dynamic() {
    return this._dynamic;
  },
  set dynamic(dynamic) {
    if (this._dynamic == dynamic) return this;
    if (dynamic) {
      this._dynamic = true;

      //add object to raycaster's dynamic objects list
      if (this._raycaster) {
        this._raycaster.dynamicMappedObjects.push(this.object);
        this._raycaster._stats.mappedObjects.dynamic = this._raycaster.dynamicMappedObjects.length;
        this._raycaster._stats.mappedObjects.static = this._raycaster._stats.mappedObjects.total - this._raycaster._stats.mappedObjects.dynamic;
      }
    } else {
      this._dynamic = false;

      //remove object from reycasters' dynamic objects list
      if (this._raycaster) {
        var index = this._raycaster.dynamicMappedObjects.indexOf(this.object);
        if (index >= 0) this._raycaster.dynamicMappedObjects.splice(index, 1);
        this._raycaster._stats.mappedObjects.dynamic = this._raycaster.dynamicMappedObjects.length;
        this._raycaster._stats.mappedObjects.static = this._raycaster._stats.mappedObjects.total - this._raycaster._stats.mappedObjects.dynamic;
      }
    }
    return this;
  }
};
Map.prototype.constructor = Map;

/***/ }),

/***/ "./src/map/map-line-methods.js":
/*!*************************************!*\
  !*** ./src/map/map-line-methods.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPoints: function() { return /* binding */ getPoints; },
/* harmony export */   getSegments: function() { return /* binding */ getSegments; },
/* harmony export */   updateMap: function() { return /* binding */ updateMap; }
/* harmony export */ });
/*Map methods for lines*/
/**
* Get array of mapped line's vertices used as rays targets.
*
* @method Raycaster.Map#line.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
*/
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!this.active) return [];
  return this._points;
}
;

/**
* Get array of mapped line's segments used to test object's intersection with ray.
*
* @method Raycaster.Map#line.getSegments
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @return {Phaser.Geom.Line[]} - Array of mapped object's segments.
*/
function getSegments() {
  if (!this.active) return [];
  return this._segments;
}
;

/**
* Update line's map of points and segments.
*
* @method Raycaster.Map#line.updateMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
function updateMap() {
  if (!this.active) return this;
  var points = [];
  var segments = [];

  //calculate offset based on object position and origin point
  var offset = new Phaser.Geom.Point();
  offset.x = this.object.x - this.object.displayWidth * this.object.originX;
  offset.y = this.object.y - this.object.displayHeight * this.object.originY;
  var pointA = this.object.geom.getPointA();
  var pointB = this.object.geom.getPointB();

  //calculate positions after object's rotation
  var rotation = this.object.rotation;
  if (rotation !== 0) {
    var vectorA = new Phaser.Geom.Line(this.object.x, this.object.y, pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y);
    Phaser.Geom.Line.SetToAngle(vectorA, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vectorA) + rotation, Phaser.Geom.Line.Length(vectorA));
    pointA = vectorA.getPointB();
    var vectorB = new Phaser.Geom.Line(this.object.x, this.object.y, pointB.x * this.object.scaleX + offset.x, pointB.y * this.object.scaleY + offset.y);
    Phaser.Geom.Line.SetToAngle(vectorB, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vectorB) + rotation, Phaser.Geom.Line.Length(vectorB));
    pointB = vectorB.getPointB();

    //set points
    points.push(new Phaser.Geom.Point(pointA.x, pointA.y));
    points.push(new Phaser.Geom.Point(pointB.x, pointB.y));
    //set segment
    segments.push(new Phaser.Geom.Line(pointA.x, pointA.y, pointB.x, pointB.y));
  }
  //if rotation === 0
  else {
    //set points
    points.push(new Phaser.Geom.Point(pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y));
    points.push(new Phaser.Geom.Point(pointB.x * this.object.scaleX + offset.x, pointB.y * this.object.scaleY + offset.y));
    //set segment
    segments.push(new Phaser.Geom.Line(pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y, pointB.x + offset.x * this.object.scaleX, pointB.y * this.object.scaleY + offset.y));
  }

  //assign neighbours
  points[0].neighbours = [points[1]];
  points[1].neighbours = [points[0]];
  this._points = points;
  this._segments = segments;
  return this;
}
;

/***/ }),

/***/ "./src/map/map-matterBody-methods.js":
/*!*******************************************!*\
  !*** ./src/map/map-matterBody-methods.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBoundingBox: function() { return /* binding */ getBoundingBox; },
/* harmony export */   getPoints: function() { return /* binding */ getPoints; },
/* harmony export */   getSegments: function() { return /* binding */ getSegments; },
/* harmony export */   updateMap: function() { return /* binding */ updateMap; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/*Map methods for matter body*/
/**
* Get array of mapped matter body's vertices used as rays targets.
*
* @method Raycaster.Map#matterBody.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.9.0
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
*/
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!this.active) return [];
  var body = this.object.type === 'body' || this.object.type === 'composite' ? this.object : this.object.body;

  //calculate tangent rays
  if (ray && !this.forceVerticesMapping && body.circleRadius > 0) {
    var points = [];
    var rayA = new Phaser.Geom.Line();
    var rayB = new Phaser.Geom.Line();
    var c = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, body.position.x, body.position.y);
    var rayLength = Math.sqrt(Math.pow(Phaser.Geom.Line.Length(c), 2) - Math.pow(body.circleRadius * body.scale.x, 2));

    //ray angle
    var angle = Phaser.Geom.Line.Angle(c);
    var dAngle = Math.asin(body.circleRadius * body.scale.x / Phaser.Geom.Line.Length(c));
    Phaser.Geom.Line.SetToAngle(rayA, ray.origin.x, ray.origin.y, angle - dAngle, rayLength);
    Phaser.Geom.Line.SetToAngle(rayB, ray.origin.x, ray.origin.y, angle + dAngle, rayLength);

    //adding tangent points
    points.push(rayA.getPointB(), rayB.getPointB());
    return points;
  }
  return this._points;
}
;

/**
* Get array of mapped matter body's segments used to test object's intersection with ray.
*
* @method Raycaster.Map#matterBody.getSegments
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.9.0
*
* @return {Phaser.Geom.Line[]} - Array of mapped object's segments.
*/
function getSegments() {
  if (!this.active) return [];
  return this._segments;
}
;

/**
* Update matter body's map of points and segments.
*
* @method Raycaster.Map#matterBody.updateMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.9.0
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
function updateMap() {
  if (!this.active) return this;
  var points = [];
  var segments = [];
  var body = this.object.type === 'body' || this.object.type === 'composite' ? this.object : this.object.body;
  var bodies = [body];
  var generateBounds = false;
  if (body.circleRadius > 0 && !this.forceVerticesMapping) {
    this.circle = true;
    this._points = points;
    this._segments = segments;
    return this;
  }
  this.circle = false;
  if (body.type == 'composite') bodies = body.bodies;
  if (body.bounds === undefined && body.type == 'composite' || body.type == 'composite' && this.dynamic) {
    generateBounds = true;
  }
  var _iterator = _createForOfIteratorHelper(bodies),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var bodyItem = _step.value;
      //if convex body
      if (bodyItem.parts.length === 1 || this.forceConvex) {
        var vertices = bodyItem.parts[0].vertices;
        points.push(new Phaser.Geom.Point(vertices[0].x, vertices[0].y));
        points[0].neighbours = [];
        for (var i = 1, length = vertices.length; i < length; i++) {
          var pointA = points.slice(-1)[0],
            pointB = new Phaser.Geom.Point(vertices[i].x, vertices[i].y);
          if (!pointA.neighbours) pointA.neighbours = [];
          pointA.neighbours.push(pointB);
          pointB.neighbours = [pointA];
          points.push(pointB);

          //add segment
          var _segment = new Phaser.Geom.Line(pointA.x, pointA.y, pointB.x, pointB.y);
          segments.push(_segment);
        }

        //closing segment
        var segment = new Phaser.Geom.Line(vertices[vertices.length - 1].x, vertices[vertices.length - 1].y, vertices[0].x, vertices[0].y);
        segments.push(segment);
        points[0].neighbours.push(points.slice(-1)[0]);
      }

      //if concave body
      else {
        var parts = [],
          indexedPoints = [];
        for (var _i = 1, iLength = bodyItem.parts.length; _i < iLength; _i++) {
          var _vertices = bodyItem.parts[_i].vertices,
            part = [];
          for (var j = 0, jLength = _vertices.length; j < jLength; j++) {
            var point = new Phaser.Geom.Point(_vertices[j].x, _vertices[j].y);
            if (part.length) {
              var prevPoint = part.slice(-1)[0];
              point.neighbours = [prevPoint];
              prevPoint.neighbours.push(point);
            } else {
              point.neighbours = [];
            }
            var index = _vertices[j].x + '/' + _vertices[j].y;
            if (indexedPoints[index] === undefined) {
              points.push(point);
              indexedPoints[index] = point;
            } else {
              indexedPoints[index].neighbours.push(point);
              point.neighbours.push(indexedPoints[index]);
            }
            part.push(point);
            if (_vertices[j].isInternal) {
              parts.push(part);
              part = [];
            }
          }
          parts.push(part);
        }
        for (var _i2 = 0, _parts = parts; _i2 < _parts.length; _i2++) {
          var _part = _parts[_i2];
          var _i3 = 0,
            _iLength = void 0;
          for (_i3 = 0, _iLength = _part.length - 1; _i3 < _iLength; _i3++) {
            segments.push(new Phaser.Geom.Line(_part[_i3].x, _part[_i3].y, _part[_i3 + 1].x, _part[_i3 + 1].y));
          }
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  this._points = points;
  this._segments = segments;
  if (generateBounds) {
    var bounds = this._raycaster.scene.matter.composite.bounds(body);
    body.bounds = bounds;
  }
  return this;
}
;

/**
* Get matter body's bounding box.
*
* @method Raycaster.Map#matterBody.getBoundingBox
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.9.0
*
* @return {Phaser.Geom.Rectangle} - Matter body's bounding box.
*/
function getBoundingBox() {
  var bounds = this.object.type === 'body' || this.object.type === 'composite' ? this.object.bounds : this.object.body.bounds;
  return new Phaser.Geom.Rectangle(bounds.min.x, bounds.min.y, bounds.max.x - bounds.min.x, bounds.max.y - bounds.min.y);
}

/***/ }),

/***/ "./src/map/map-polygon-methods.js":
/*!****************************************!*\
  !*** ./src/map/map-polygon-methods.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPoints: function() { return /* binding */ getPoints; },
/* harmony export */   getSegments: function() { return /* binding */ getSegments; },
/* harmony export */   updateMap: function() { return /* binding */ updateMap; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/*Map methods for polygons*/
/**
* Get array of mapped polygon's vertices used as rays targets.
*
* @method Raycaster.Map#polygon.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
*/
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!this.active) return [];
  return this._points;
}
;

/**
* Get array of mapped polygon's segments used to test object's intersection with ray.
*
* @method Raycaster.Map#polygon.getSegments
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @return {Phaser.Geom.Line[]} - Array of mapped object's segments.
*/
function getSegments() {
  if (!this.active) return [];
  return this._segments;
}
;

/**
* Update polygon's map of points and segments.
*
* @method Raycaster.Map#polygon.updateMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
function updateMap() {
  if (!this.active) return this;
  var points = [];
  var segments = [];

  //calculate offset based on object position and origin point
  var offset = new Phaser.Geom.Point();
  offset.x = this.object.x - this.object.displayWidth * this.object.originX;
  offset.y = this.object.y - this.object.displayHeight * this.object.originY;
  //set points
  //calculate positions after object's rotation
  var rotation = this.object.rotation;
  if (rotation !== 0) {
    var _iterator = _createForOfIteratorHelper(this.object.geom.points),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var point = _step.value;
        var vector = new Phaser.Geom.Line(this.object.x, this.object.y, point.x * this.object.scaleX + offset.x, point.y * this.object.scaleY + offset.y);
        Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
        points.push(vector.getPointB());
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  //if rotation === 0
  else {
    var _iterator2 = _createForOfIteratorHelper(this.object.geom.points),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _point = _step2.value;
        points.push(new Phaser.Geom.Point(_point.x * this.object.scaleX + offset.x, _point.y * this.object.scaleY + offset.y));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  for (var i = 0, length = points.length; i < length; i++) {
    var prevPoint = i > 0 ? points[i - 1] : points.slice(-1)[0],
      nextPoint = i < length - 1 ? points[i + 1] : points[0];
    segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, nextPoint.x, nextPoint.y));
    points[i].neighbours = [prevPoint, nextPoint];
  }

  //set segments
  for (var _i = 0, _length = points.length; _i < _length; _i++) {
    if (_i + 1 < _length) segments.push(new Phaser.Geom.Line(points[_i].x, points[_i].y, points[_i + 1].x, points[_i + 1].y));
  }
  //if polygon is not closed
  if (!this.object.closePath) {
    segments.pop();
    points[0].neighbours.shift();
    points[points.length - 1].neighbours.pop();
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPoints: function() { return /* binding */ getPoints; },
/* harmony export */   getSegments: function() { return /* binding */ getSegments; },
/* harmony export */   updateMap: function() { return /* binding */ updateMap; }
/* harmony export */ });
/*Map methods for rectangles*/
/**
* Get array of mapped rectangle's vertices used as rays targets.
*
* @method Raycaster.Map#rectangle.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
*/
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!this.active) return [];
  return this._points;
}
;

/**
* Get array of mapped rectangle's segments used to test object's intersection with ray.
*
* @method Raycaster.Map#rectangle.getSegments
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @return {Phaser.Geom.Line[]} - Array of mapped object's segments.
*/
function getSegments() {
  if (!this.active) return [];
  return this._segments;
}
;

/**
* Update rectangle's map of points and segments.
*
* @method Raycaster.Map#rectangle.updateMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
function updateMap() {
  if (!this.active) return this;
  var points = [];
  var segments = [];

  //set points
  points = [this.object.getTopLeft(), this.object.getTopRight(), this.object.getBottomRight(), this.object.getBottomLeft()];

  //set segments
  for (var i = 0, length = points.length; i < length; i++) {
    var prevPoint = i > 0 ? points[i - 1] : points.slice(-1)[0],
      nextPoint = i < length - 1 ? points[i + 1] : points[0];
    segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, nextPoint.x, nextPoint.y));
    points[i].neighbours = [prevPoint, nextPoint];
  }
  this._points = points;
  this._segments = segments;
  return this;
}
;

/***/ }),

/***/ "./src/map/map-tilemap-methods.js":
/*!****************************************!*\
  !*** ./src/map/map-tilemap-methods.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPoints: function() { return /* binding */ getPoints; },
/* harmony export */   getSegments: function() { return /* binding */ getSegments; },
/* harmony export */   setCollisionTiles: function() { return /* binding */ setCollisionTiles; },
/* harmony export */   updateMap: function() { return /* binding */ updateMap; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/*Map methods for tilemaps*/
/**
* Get array of mapped tilemap's vertices used as rays targets.
*
* @method Raycaster.Map#tilemap.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.7.3
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
*/
function getPoints() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!this.active) return [];
  if (!ray || ray && (ray.detectionRange == 0 || ray.detectionRange >= Phaser.Math.MAX_SAFE_INTEGER)) return this._points;
  var points = [];
  var _iterator = _createForOfIteratorHelper(this._points),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var point = _step.value;
      if (Phaser.Math.Distance.Between(ray.origin.x, ray.origin.y, point.x, point.y) <= ray.detectionRange) points.push(point);
    }

    //get intersections between tilemap's segments and ray's detection range edge
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var segments = this.getSegments(ray);
  var _iterator2 = _createForOfIteratorHelper(segments),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var segment = _step2.value;
      if (Phaser.Math.Distance.Between(ray.origin.x, ray.origin.y, segment.x1, segment.y1) > ray.detectionRange) points.push(new Phaser.Geom.Point(segment.x1, segment.y1));
      if (Phaser.Math.Distance.Between(ray.origin.x, ray.origin.y, segment.x2, segment.y2) > ray.detectionRange) points.push(new Phaser.Geom.Point(segment.x2, segment.y2));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return points;
}
;

/**
* Get array of mapped tilemap's segments used to test object's intersection with ray.
*
* @method Raycaster.Map#tilemap.getSegments
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.7.3
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Geom.Line[]} - Array of mapped object's segments.
*/
function getSegments() {
  var ray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!this.active) return [];
  if (!ray || ray && (ray.detectionRange == 0 || ray.detectionRange >= Phaser.Math.MAX_SAFE_INTEGER)) return this._segments;
  var segments = [];
  var _iterator3 = _createForOfIteratorHelper(this._segments),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var segment = _step3.value;
      if (Phaser.Geom.Intersects.LineToCircle(segment, ray.detectionRangeCircle)) {
        segments.push(segment);
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return segments;
}
;

/**
* Update tilemap's map of points and segments.
*
* @method Raycaster.Map#tilemap.updateMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.7.3
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
function updateMap() {
  if (!this.active) return this;
  var points = [],
    segments = [],
    columns = Array(this.object.layer.data[0].length + 1);
  for (var i = 0, iLength = columns.length; i < iLength; i++) {
    columns[i] = [];
  }

  //calculate offset based on object position and origin point
  var offset = new Phaser.Geom.Point(this.object.x, this.object.y);
  var row = this.object.layer.data[0],
    tileWidth = this.object.layer.tileWidth * this.object.scaleX,
    tileHeight = this.object.layer.tileHeight * this.object.scaleY,
    startPoint,
    endPoint;

  //set top horizontal lines
  if (this.collisionTiles.includes(row[0].index)) {
    startPoint = new Phaser.Geom.Point(offset.x, offset.y);
    endPoint = new Phaser.Geom.Point(tileWidth + offset.x, offset.y);
    columns[0].push(startPoint);
  }
  for (var _i = 1, _iLength = row.length; _i < _iLength; _i++) {
    var tile = row[_i];
    if (!this.collisionTiles.includes(tile.index)) {
      if (startPoint) {
        startPoint.neighbours = [endPoint];
        endPoint.neighbours = [startPoint];
        points.push(startPoint, endPoint);
        segments.push(new Phaser.Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y));
        columns[_i].push(endPoint);
        startPoint = false;
        endPoint = false;
      }
      continue;
    }
    var x = _i * tileWidth + offset.x,
      _y = offset.y;
    if (!startPoint) {
      startPoint = new Phaser.Geom.Point(x, _y);
      columns[_i].push(startPoint);
    }
    if (!endPoint) {
      endPoint = new Phaser.Geom.Point(x + tileWidth, _y);
    } else {
      endPoint.x = x + tileWidth;
    }
  }
  if (startPoint) {
    startPoint.neighbours = [endPoint];
    endPoint.neighbours = [startPoint];
    points.push(startPoint, endPoint);
    segments.push(new Phaser.Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y));
    columns[row.length].push(endPoint);
  }
  startPoint = false;
  endPoint = false;
  for (var _i2 = 1, _iLength2 = this.object.layer.data.length - 1; _i2 < _iLength2; _i2++) {
    row = this.object.layer.data[_i2];
    var higherRow = this.object.layer.data[_i2 - 1];
    if (this.collisionTiles.includes(row[0].index) != this.collisionTiles.includes(higherRow[0].index)) {
      startPoint = new Phaser.Geom.Point(offset.x, _i2 * tileHeight + offset.y);
      endPoint = new Phaser.Geom.Point(tileWidth + offset.x, _i2 * tileHeight + offset.y);
      columns[0].push(startPoint);
    }
    for (var j = 1, jLength = row.length; j < jLength; j++) {
      var _tile = row[j],
        isCollisionTile = this.collisionTiles.includes(_tile.index),
        isCollisionHigherTile = this.collisionTiles.includes(higherRow[j].index);
      if (isCollisionTile == isCollisionHigherTile) {
        if (startPoint) {
          startPoint.neighbours = [endPoint];
          endPoint.neighbours = [startPoint];
          points.push(startPoint, endPoint);
          segments.push(new Phaser.Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y));
          columns[j].push(endPoint);
          startPoint = false;
          endPoint = false;
        }
        continue;
      }
      var _x = j * tileWidth + offset.x,
        _y2 = _i2 * tileHeight + offset.y;
      if (!startPoint) {
        startPoint = new Phaser.Geom.Point(_x, _y2);
        columns[j].push(startPoint);
      }
      if (!endPoint) {
        endPoint = new Phaser.Geom.Point(_x + tileWidth, _y2);
      } else {
        endPoint.x = _x + tileWidth;
      }
    }
    if (startPoint) {
      startPoint.neighbours = [endPoint];
      endPoint.neighbours = [startPoint];
      points.push(startPoint, endPoint);
      segments.push(new Phaser.Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y));
      columns[row.length].push(endPoint);
    }
    startPoint = false;
    endPoint = false;
  }

  //set bottom horizontal lines
  row = this.object.layer.data.slice(-1)[0];
  var y = this.object.layer.data.length * tileHeight + offset.y;
  if (this.collisionTiles.includes(row[0].index)) {
    startPoint = new Phaser.Geom.Point(offset.x, y);
    endPoint = new Phaser.Geom.Point(tileWidth + offset.x, y);
    columns[0].push(startPoint);
  }
  for (var _i3 = 1, _iLength3 = row.length; _i3 < _iLength3; _i3++) {
    var _tile2 = row[_i3];
    if (!this.collisionTiles.includes(_tile2.index)) {
      if (startPoint) {
        startPoint.neighbours = [endPoint];
        endPoint.neighbours = [startPoint];
        points.push(startPoint, endPoint);
        segments.push(new Phaser.Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y));
        columns[_i3].push(endPoint);
        startPoint = false;
        endPoint = false;
      }
      continue;
    }
    var _x2 = _i3 * tileWidth + offset.x;
    if (!startPoint) {
      startPoint = new Phaser.Geom.Point(_x2, y);
      columns[_i3].push(startPoint);
    }
    if (!endPoint) {
      endPoint = new Phaser.Geom.Point(_x2 + tileWidth, y);
    } else {
      endPoint.x = _x2 + tileWidth;
    }
  }
  if (startPoint) {
    startPoint.neighbours = [endPoint];
    endPoint.neighbours = [startPoint];
    points.push(startPoint, endPoint);
    segments.push(new Phaser.Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y));
    columns[row.length].push(endPoint);
  }

  //set vertical lines
  for (var _i4 = 0, _iLength4 = columns.length; _i4 < _iLength4; _i4++) {
    var column = columns[_i4];
    for (var _j = 0, _jLength = column.length - 1; _j < _jLength; _j++) {
      segments.push(new Phaser.Geom.Line(column[_j].x, column[_j].y, column[_j + 1].x, column[_j + 1].y));
      column[_j].neighbours.push(column[_j + 1]);
      column[_j + 1].neighbours.push(column[_j]);
      _j++;
    }
  }
  this._points = points;
  this._segments = segments;
  return this;
}
;

/**
* Set tile types which should be mapped (for Phaser.Tilemaps.StaticTilemapLayer and Phaser.Tilemaps.DynamicTilemapLayer maps only).
*
* @method Raycaster.Map#setCollisionTiles
* @memberof Raycaster.Map
* @instance
* @since 0.7.3
*
* @param {array} [tiles = []] - Set of tile's indexes to map.
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
function setCollisionTiles() {
  var tiles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  this.collisionTiles = tiles;
  return this;
}

/***/ }),

/***/ "./src/map/segmentsCount.js":
/*!**********************************!*\
  !*** ./src/map/segmentsCount.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setSegmentCount: function() { return /* binding */ setSegmentCount; }
/* harmony export */ });
/**
 * Set segment count for cirle's map.
 * If set to 0, map won't be generating segments and relay only on tangent points calculated for currently testing ray.
 *
 * @method Raycaster.Map#setSegmentCount
 * @memberof Raycaster.Map
 * @instance
 * @since 0.6.0
 *
 * @param {number} count - Circle map's segment count.
 *
 * @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
 */
function setSegmentCount(count) {
  this.segmentCount = count;
  this.circle = count ? false : true;
  this.updateMap();
  return this;
}

/***/ }),

/***/ "./src/ray/angle.js":
/*!**************************!*\
  !*** ./src/ray/angle.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setAngle: function() { return /* binding */ setAngle; },
/* harmony export */   setAngleDeg: function() { return /* binding */ setAngleDeg; }
/* harmony export */ });
/**
 * Set ray's angle (direction) in radians.
 *
 * @method Raycaster.Ray#setAngle
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {number} [angle = 0] - Ray's angle in radians.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setAngle() {
  var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  this.angle = Phaser.Math.Angle.Normalize(angle);
  Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.rayRange);
  return this;
}

/**
 * Set ray's angle (direction) in degrees.
 *
 * @method Raycaster.Ray#setAngleDeg
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.1
 *
 * @param {number} [angle = 0] - Ray's angle in degrees.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setAngleDeg() {
  var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  this.angle = Phaser.Math.Angle.Normalize(Phaser.Math.DegToRad(angle));
  Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.rayRange);
  return this;
}

/***/ }),

/***/ "./src/ray/cast.js":
/*!*************************!*\
  !*** ./src/ray/cast.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cast: function() { return /* binding */ cast; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Cast ray to find closest intersection with tested mapped objects.
 *
 * @method Raycaster.Ray#cast
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {object} [options] - options that may include:
 * @param {object[]} [options.objects = {Raycaster#mappedObjects}] - Array of game objects to test. If not provided test all mapped game objects.
 * @param {Phaser.Geom.Point|Point} [options.target] - Ray's target point. Used in other casting methods to determine if ray was targeting mapped objects point.
 * @param {boolean} [options.internal = false] - Flag determining if method is used by other casting method.
 *
 * @return {(Phaser.Geom.Point|boolean)} Ray's closest intersection with tested objects. Returns false if no intersection has been found. Additionally contains reference to hit mapped object and segment if available.
 */
function cast() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var closestIntersection;
  var closestSegment;
  var closestObject;
  var closestDistance = this.rayRange;
  var internal = options.internal ? options.internal : false;
  var startTime = performance.now();
  var stats = {
    method: 'cast',
    rays: 1,
    testedMappedObjects: 0,
    hitMappedObjects: 0,
    segments: 0,
    time: 0
  };

  //if bounding box is defined check bounding box intersection
  if (this._raycaster && this._raycaster.boundingBox) {
    var _intersections = [];
    Phaser.Geom.Intersects.GetLineToRectangle(this._ray, this._raycaster.boundingBox.rectangle, _intersections);
    if (_intersections.length === 1) closestIntersection = _intersections[0];else if (_intersections.length > 1) {
      var _iterator = _createForOfIteratorHelper(_intersections),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var intersection = _step.value;
          var distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, intersection.x, intersection.y);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIntersection = intersection;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    //if ray target is declared
    else if (options.target) {
      var _distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, options.target.x, options.target.y);
      //if target is within ray range
      if (this.rayRange > _distance) {
        closestDistance = _distance;
        closestIntersection = options.target;
      }
    }
  }

  //if no objects to cast ray were passed, use raycasters mapped objects
  if (!options.objects) {
    if (this._raycaster) options.objects = this._raycaster.mappedObjects;else return intersections;
  }
  var _iterator2 = _createForOfIteratorHelper(options.objects),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var object = _step2.value;
      var map = void 0,
        boundingBox = void 0,
        boundingBoxIntersections = [],
        canTestMap = false;
      if (object.type === 'body' || object.type === 'composite') map = object.raycasterMap;else map = object.data.get('raycasterMap');
      stats.testedMappedObjects++;

      //get slightly enlarged bounding box due to fridge cases, when ray "glanced" border box's corner (v0.10.1)
      if (internal) {
        boundingBox = map._boundingBox;
      } else {
        boundingBox = map.getBoundingBox();
        boundingBox.setTo(boundingBox.x - 0.1, boundingBox.y - 0.1, boundingBox.width + 0.2, boundingBox.height + 0.2);
      }

      //check if object is intersected by ray
      if (Phaser.Geom.Intersects.GetLineToRectangle(this._ray, boundingBox, boundingBoxIntersections).length === 0) continue;

      //check if bounding box is closer than closest intersection
      if (Phaser.Geom.Rectangle.ContainsPoint(boundingBox, this.origin)) {
        canTestMap = true;
      } else {
        var _iterator3 = _createForOfIteratorHelper(boundingBoxIntersections),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var boundingBoxIntersection = _step3.value;
            if (Phaser.Math.Distance.Between(this.origin.x, this.origin.y, boundingBoxIntersection.x, boundingBoxIntersection.y) < closestDistance) {
              canTestMap = true;
              break;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      if (!canTestMap) continue;
      stats.hitMappedObjects++;
      stats.segments += map.getSegments(this).length;

      //check intersections
      var _iterator4 = _createForOfIteratorHelper(map.getSegments(this)),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var segment = _step4.value;
          var _intersection3 = [];

          //if target point is segmemt point
          if (options.target) {
            if (Phaser.Geom.Point.Equals(options.target, segment.getPointA()) || Phaser.Geom.Point.Equals(options.target, segment.getPointB())) {
              _intersection3 = options.target;
            } else if (!Phaser.Geom.Intersects.LineToLine(this._ray, segment, _intersection3)) continue;
          }
          //if no intersection continue
          else if (!Phaser.Geom.Intersects.LineToLine(this._ray, segment, _intersection3)) continue;

          //get closest intersection
          var _distance6 = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, _intersection3.x, _intersection3.y);
          if (_distance6 < closestDistance) {
            closestDistance = _distance6;
            closestIntersection = _intersection3;
            closestObject = map.object;
            closestSegment = segment;
          }
        }

        //check if map is circular
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      if (map.circle) {
        //if circular map has generated points (besides tangent points to ray)
        if (map._points.length > 0) {
          continue;
        }

        //check if target point is a circle tangent point to ray
        if (options.target) {
          var points = map.getPoints(this);
          var isTangent = false;
          var _iterator5 = _createForOfIteratorHelper(points),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var point = _step5.value;
              if (Phaser.Geom.Point.Equals(options.target, point)) {
                //get closest intersection
                var _distance2 = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, point.x, point.y);
                if (_distance2 < closestDistance) {
                  closestDistance = _distance2;
                  closestIntersection = point;
                  closestObject = map.object;
                  isTangent = true;
                  break;
                }
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          if (isTangent) continue;
        }
        var circleIntersections = [];
        var offset = new Phaser.Geom.Point();
        offset.x = map.object.x - map.object.displayWidth * (map.object.originX - 0.5);
        offset.y = map.object.y - map.object.displayHeight * (map.object.originY - 0.5);

        //calculate circle's center after rotation
        var rotation = map.object.rotation;
        if (rotation !== 0) {
          var vector = new Phaser.Geom.Line(map.object.x, map.object.y, offset.x, offset.y);
          Phaser.Geom.Line.SetToAngle(vector, map.object.x, map.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
          var cB = vector.getPointB();
          offset.x = cB.x;
          offset.y = cB.y;
        }

        //create transformed circle
        var circle = new Phaser.Geom.Circle(offset.x, offset.y, map.object.radius * map.object.scaleX);
        if (Phaser.Geom.Intersects.GetLineToCircle(this._ray, circle, circleIntersections)) {
          var _iterator6 = _createForOfIteratorHelper(circleIntersections),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var _intersection = _step6.value;
              //get closest intersection
              var _distance3 = Phaser.Math.Distance.Between(this._ray.x1, this._ray.y1, _intersection.x, _intersection.y);
              if (_distance3 < closestDistance) {
                closestDistance = _distance3;
                closestIntersection = _intersection;
                closestObject = map.object;
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      }

      //check container map's circles
      if (map.type == 'Container' && map._circles.length > 0) {
        var _iterator7 = _createForOfIteratorHelper(map._circles),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _circle = _step7.value;
            //check if target point is a circle tangent point to ray
            if (options.target) {
              var _isTangent = false;
              var _iterator8 = _createForOfIteratorHelper(_circle.points),
                _step8;
              try {
                for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                  var _point = _step8.value;
                  if (Phaser.Geom.Point.Equals(options.target, _point)) {
                    //get closest intersection
                    var _distance4 = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, _point.x, _point.y);
                    if (_distance4 < closestDistance) {
                      closestDistance = _distance4;
                      closestIntersection = _point;
                      closestObject = map.object;
                      _isTangent = true;
                      break;
                    }
                  }
                }
              } catch (err) {
                _iterator8.e(err);
              } finally {
                _iterator8.f();
              }
              if (_isTangent) continue;
            }
            var _circleIntersections = [];
            if (Phaser.Geom.Intersects.GetLineToCircle(this._ray, _circle, _circleIntersections)) {
              var _iterator9 = _createForOfIteratorHelper(_circleIntersections),
                _step9;
              try {
                for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                  var _intersection2 = _step9.value;
                  //get closest intersection
                  var _distance5 = Phaser.Math.Distance.Between(this._ray.x1, this._ray.y1, _intersection2.x, _intersection2.y);
                  if (_distance5 < closestDistance) {
                    closestDistance = _distance5;
                    closestIntersection = _intersection2;
                    closestObject = map.object;
                  }
                }
              } catch (err) {
                _iterator9.e(err);
              } finally {
                _iterator9.f();
              }
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
    }

    //update stats
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  if (internal) {
    this._stats.rays++;
    this._stats.testedMappedObjects += stats.testedMappedObjects;
    this._stats.hitMappedObjects += stats.hitMappedObjects;
    this._stats.segments += stats.segments;
  } else {
    stats.time = performance.now() - startTime;
    this._stats = stats;
  }
  var result;
  if (!closestIntersection) {
    if (this.ignoreNotIntersectedRays) return false;
    result = this._ray.getPointB();
  } else {
    result = new Phaser.Geom.Point(closestIntersection.x, closestIntersection.y);
    result.segment = closestSegment;
    result.object = closestObject;
  }
  if (this.round) {
    result.x = Math.round(result.x);
    result.y = Math.round(result.y);
  }
  if (!internal) this.drawDebug([result]);
  return result;
}

/***/ }),

/***/ "./src/ray/castCircle.js":
/*!*******************************!*\
  !*** ./src/ray/castCircle.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   castCircle: function() { return /* binding */ castCircle; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Cast ray in all directions to find closest intersections with tested mapped objects.
 *
 * @method Raycaster.Ray#castCircle
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {object} [options] - options that may include:
 * @param {object[]} [options.objects = Raycaster.mappedObjects] - Array of game objects to test. If not provided test all mapped game objects.
 *
 * @return {Phaser.Geom.Point[]} Array of points of ray's closest intersections with tested objects. Additionally each point contains reference to hit mapped object and it's segment if available.
 */
function castCircle() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var originalAngle = this.angle;
  var intersections = [];
  var maps = [];
  var rayTargets = [];
  var testedObjects = [];
  var startTime = performance.now();
  //reset stats
  this._stats = {
    method: 'castCircle',
    rays: 0,
    testedMappedObjects: 0,
    hitMappedObjects: 0,
    segments: 0,
    time: 0
  };

  //if no objects to cast ray were passed, use raycasters mapped objects
  if (!options.objects) {
    if (this._raycaster) options.objects = this._raycaster.mappedObjects;else return intersections;
  }

  //if bounding box is defined add bounding box points to 
  if (this._raycaster && this._raycaster.boundingBox) {
    var _iterator = _createForOfIteratorHelper(this._raycaster.boundingBox.points),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var point = _step.value;
        rayTargets.push({
          point: point,
          angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, point.x, point.y)
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  for (var i = 0, iLength = options.objects.length; i < iLength; i++) {
    var object = options.objects[i];
    //if bound in range
    if (!this.boundsInRange(object)) continue;
    testedObjects.push(object);
    var map = void 0,
      boundingBox = void 0;
    if (object.type === 'body' || object.type === 'composite') map = object.raycasterMap;else map = object.data.get('raycasterMap');

    //get slightly enlarged bounding box due to fridge cases, when ray "glanced" border box's corner (v0.10.1)
    boundingBox = map.getBoundingBox();
    boundingBox.setTo(boundingBox.x - 0.1, boundingBox.y - 0.1, boundingBox.width + 0.2, boundingBox.height + 0.2);
    map._boundingBox = boundingBox;
    maps.push(map);
    //get points and angles
    var _iterator2 = _createForOfIteratorHelper(map.getPoints(this)),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _point = _step2.value;
        rayTargets.push({
          point: _point,
          angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, _point.x, _point.y)
        });
      }

      //get objects intersections
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    for (var j = i + 1, jLength = options.objects.length; j < jLength; j++) {
      var objectB = options.objects[j];
      var mapB = void 0;
      if (objectB.type === 'body' || objectB.type === 'composite') mapB = objectB.raycasterMap;else {
        mapB = objectB.data.get('raycasterMap');
      }
      //check if bounding boxes overlap
      if (!Phaser.Geom.Intersects.RectangleToRectangle(map.getBoundingBox(), mapB.getBoundingBox())) continue;

      //find objects intersections
      var _iterator3 = _createForOfIteratorHelper(map.getSegments(this)),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var segmentA = _step3.value;
          var _iterator4 = _createForOfIteratorHelper(mapB.getSegments(this)),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var segmentB = _step4.value;
              var intersection = [];
              if (!Phaser.Geom.Intersects.LineToLine(segmentA, segmentB, intersection)) continue;
              var target = {
                point: new Phaser.Geom.Point(intersection.x, intersection.y),
                angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, intersection.x, intersection.y)
              };
              target.point.intersection = false;
              rayTargets.push(target);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }

  //sort target points by angle
  rayTargets.sort(function (a, b) {
    //if rays towards points have the same angles promote closer one
    if (a.angle == b.angle) {
      if (Phaser.Math.Distance.Between(this.origin.x, this.origin.y, a.point.x, a.point.y) > Phaser.Math.Distance.Between(this.origin.x, this.origin.y, b.point.x, b.point.y)) return 1;else return -1;
    }
    return a.angle - b.angle;
  }.bind(this));
  var previousTarget = {
    angle: false
  };

  //cast rays
  for (var _i = 0, _rayTargets = rayTargets; _i < _rayTargets.length; _i++) {
    var _target = _rayTargets[_i];
    //if current target is the same as previous one skip loop
    if (_target.angle === previousTarget.angle) {
      continue;
    }
    previousTarget = _target;
    this.setAngle(_target.angle);
    var _intersection = this.cast({
      objects: testedObjects,
      target: _target.point,
      internal: true
    });
    if (_intersection) {
      //if intersection hits target point check if ray "glanced" mapped object.
      var castSides = false;
      if (this.round) {
        var roundedTarget = new Phaser.Geom.Point(Math.round(_target.point.x), Math.round(_target.point.y));
        castSides = Phaser.Geom.Point.Equals(roundedTarget, _intersection);
      } else {
        castSides = Phaser.Geom.Point.Equals(_target.point, _intersection);
      }
      if (!castSides) {
        //castSides = false;
      } else if (!_target.point.neighbours || _target.point.neighbours.length < 2) {
        //castSides = true;
      }
      //check if ray and at least one line between target point and it's neighbours are parallel
      else if (Phaser.Math.Angle.Normalize(this.angle - Phaser.Math.Angle.BetweenPoints(this.origin, _target.point.neighbours[0])) < 0.0001 || Phaser.Math.Angle.Normalize(this.angle - Phaser.Math.Angle.BetweenPoints(this.origin, _target.point.neighbours[1])) < 0.0001) {
        //castSides = true;
      }
      //check if ray crossed more than 1 points of triangle created by tatget point and it's neighbours
      else {
        var triangleIntersections = [];
        if (!_target.point.neighboursTriangle) {
          _target.point.neighboursTriangle = new Phaser.Geom.Triangle(_target.point.x, _target.point.y, _target.point.neighbours[0].x, _target.point.neighbours[0].y, _target.point.neighbours[1].x, _target.point.neighbours[1].y);
        }
        Phaser.Geom.Intersects.GetTriangleToLine(_target.point.neighboursTriangle, this._ray, triangleIntersections);

        //if point of intersection of ray and tirangle are close to target point, assume ray "glanced" triangle.
        for (var _i2 = 0, _triangleIntersection = triangleIntersections; _i2 < _triangleIntersection.length; _i2++) {
          var triangleIntersection = _triangleIntersection[_i2];
          if (Math.abs(_target.point.x - triangleIntersection.x) > 0.0001 && Math.abs(_target.point.y - triangleIntersection.y) > 0.0001) {
            castSides = false;
            break;
          }
        }
      }

      //if ray "glanced" mapped object cast two additional rays
      if (castSides) {
        this.setAngle(_target.angle - 0.0001);
        var intersectionA = this.cast({
          objects: testedObjects,
          internal: true
        });
        if (intersectionA) {
          intersections.push(intersectionA);
        }
        intersections.push(_intersection);
        this.setAngle(_target.angle + 0.0001);
        var intersectionB = this.cast({
          objects: testedObjects,
          internal: true
        });
        if (intersectionB) {
          intersections.push(intersectionB);
        }
        continue;
      }
      intersections.push(_intersection);
    }
  }
  this.setAngle(originalAngle);
  this.intersections = intersections;
  if (this.autoSlice) this.slicedIntersections = this.slice();
  this._stats.time = performance.now() - startTime;
  this.drawDebug(intersections);
  return intersections;
}

/***/ }),

/***/ "./src/ray/castCone.js":
/*!*****************************!*\
  !*** ./src/ray/castCone.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   castCone: function() { return /* binding */ castCone; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Cast ray in a cone to find closest intersections with tested mapped objects.
 *
 * @method Raycaster.Ray#castCone
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.7.0
 *
 * @param {object} [options] - options that may include:
 * @param {object[]} [options.objects = Raycaster.mappedObjects] - Array of game objects to test. If not provided test all mapped game objects.
 *
 * @return {Phaser.Geom.Point[]} Array of points of ray's closest intersections with tested objects. Additionally each point contains reference to hit mapped object and it's segment if available.
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
  var angleOffset = 0;
  var startTime = performance.now();
  //reset stats
  this._stats = {
    method: 'castCone',
    rays: 0,
    testedMappedObjects: 0,
    hitMappedObjects: 0,
    segments: 0,
    time: 0
  };

  //set cone
  if (options.cone !== undefined) cone = options.cone;
  if (options.coneDeg !== undefined) cone = Phaser.Math.DegToRad(options.coneDeg);

  //set cone min and max angle
  minAngle = this.angle - cone / 2;
  maxAngle = this.angle + cone / 2;

  //add min and max angle points
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
  });

  //if no objects to cast ray were passed, use raycasters mapped objects
  if (!options.objects) {
    if (this._raycaster) options.objects = this._raycaster.mappedObjects;else return intersections;
  }

  //if bounding box is defined add bounding box points to 
  if (this._raycaster && this._raycaster.boundingBox) {
    var _iterator = _createForOfIteratorHelper(this._raycaster.boundingBox.points),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
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
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  for (var i = 0, iLength = options.objects.length; i < iLength; i++) {
    var object = options.objects[i];
    //if bound in range
    if (!this.boundsInRange(object)) continue;
    testedObjects.push(object);
    var map = void 0,
      boundingBox = void 0;
    if (object.type === 'body' || object.type === 'composite') map = object.raycasterMap;else map = object.data.get('raycasterMap');

    //get slightly enlarged bounding box due to fridge cases, when ray "glanced" border box's corner (v0.10.1)
    boundingBox = map.getBoundingBox();
    boundingBox.setTo(boundingBox.x - 0.1, boundingBox.y - 0.1, boundingBox.width + 0.2, boundingBox.height + 0.2);
    map._boundingBox = boundingBox;
    maps.push(map);
    //get points and angles
    var _iterator2 = _createForOfIteratorHelper(map.getPoints(this)),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
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
      }

      //get objects intersections
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    for (var j = i + 1, jLength = options.objects.length; j < jLength; j++) {
      var objectB = options.objects[j];
      var mapB = void 0;
      if (objectB.type === 'body' || objectB.type === 'composite') mapB = objectB.raycasterMap;else mapB = objectB.data.get('raycasterMap');
      //check if bounding boxes overlap
      if (!Phaser.Geom.Intersects.RectangleToRectangle(map.getBoundingBox(), mapB.getBoundingBox())) continue;

      //find objects intersections
      var _iterator3 = _createForOfIteratorHelper(map.getSegments(this)),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var segmentA = _step3.value;
          var _iterator4 = _createForOfIteratorHelper(mapB.getSegments(this)),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
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
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }

  //sort target points by angle
  rayTargets.sort(function (a, b) {
    //if rays towards points have the same angles promote closer one
    if (a.angle == b.angle) {
      if (Phaser.Math.Distance.Between(this.origin.x, this.origin.y, a.point.x, a.point.y) > Phaser.Math.Distance.Between(this.origin.x, this.origin.y, b.point.x, b.point.y)) return 1;else return -1;
    }
    return a.angleOffsetDeg - b.angleOffsetDeg;
  }.bind(this));
  var previousTarget = {
    angle: false
  };

  //cast rays
  for (var _i = 0, _rayTargets = rayTargets; _i < _rayTargets.length; _i++) {
    var target = _rayTargets[_i];
    //if current target is the same as previous one skip loop
    if (target.angle === previousTarget.angle) {
      continue;
    }
    previousTarget = target;
    this.setAngle(target.angle);
    var _intersection = this.cast({
      objects: testedObjects,
      target: target.point,
      internal: true
    });
    if (_intersection) {
      //if intersection hits target point check if ray "glanced" mapped object.
      var castSides = false;
      if (this.round) {
        var roundedTarget = new Phaser.Geom.Point(Math.round(target.point.x), Math.round(target.point.y));
        castSides = Phaser.Geom.Point.Equals(roundedTarget, _intersection);
      } else {
        castSides = Phaser.Geom.Point.Equals(target.point, _intersection);
      }
      if (!castSides) {
        //castSides = false;
      } else if (!target.point.neighbours || target.point.neighbours.length < 2) {
        //castSides = true;
      }
      //check if ray and at least one line between target point and it's neighbours are parallel
      else if (Phaser.Math.Angle.Normalize(this.angle - Phaser.Math.Angle.BetweenPoints(this.origin, target.point.neighbours[0])) < 0.0001 || Phaser.Math.Angle.Normalize(this.angle - Phaser.Math.Angle.BetweenPoints(this.origin, target.point.neighbours[1])) < 0.0001) {
        //castSides = true;
      }
      //check if ray crossed more than 1 points of triangle created by tatget point and it's neighbours
      else {
        var triangleIntersections = [];
        if (!target.point.neighboursTriangle) {
          target.point.neighboursTriangle = new Phaser.Geom.Triangle(target.point.x, target.point.y, target.point.neighbours[0].x, target.point.neighbours[0].y, target.point.neighbours[1].x, target.point.neighbours[1].y);
        }
        Phaser.Geom.Intersects.GetTriangleToLine(target.point.neighboursTriangle, this._ray, triangleIntersections);

        //if point of intersection of ray and tirangle are close to arget point, assume ray "glanced" triangle.
        for (var _i2 = 0, _triangleIntersection = triangleIntersections; _i2 < _triangleIntersection.length; _i2++) {
          var triangleIntersection = _triangleIntersection[_i2];
          if (Math.abs(target.point.x - triangleIntersection.x) > 0.0001 && Math.abs(target.point.y - triangleIntersection.y) > 0.0001) {
            castSides = false;
            break;
          }
        }
      }

      //if ray "glanced" mapped object cast two additional rays
      if (castSides) {
        this.setAngle(target.angle - 0.0001);
        var intersectionA = this.cast({
          objects: testedObjects,
          internal: true
        });
        if (intersectionA) {
          intersections.push(intersectionA);
        }
        intersections.push(_intersection);
        this.setAngle(target.angle + 0.0001);
        var intersectionB = this.cast({
          objects: testedObjects,
          internal: true
        });
        if (intersectionB) {
          intersections.push(intersectionB);
        }
        continue;
      }
      intersections.push(_intersection);
    }
  }
  this.setAngle(originalAngle);
  this.intersections = intersections;
  if (this.autoSlice) this.slicedIntersections = this.slice(intersections, false);
  this._stats.time = performance.now() - startTime;
  this.drawDebug(intersections);
  return intersections;
}

/***/ }),

/***/ "./src/ray/cone.js":
/*!*************************!*\
  !*** ./src/ray/cone.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setCone: function() { return /* binding */ setCone; },
/* harmony export */   setConeDeg: function() { return /* binding */ setConeDeg; }
/* harmony export */ });
/**
 * Set ray's cone angle (width) in radians.
 *
 * @method Raycaster.Ray#setCone
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.7.0
 *
 * @param {number} [cone = 0] - Ray's cone angle in radians.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setCone() {
  var cone = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  this.cone = cone;
  return this;
}

/**
 * Set ray's cone angle (width) in degrees.
 *
 * @method Raycaster.Ray#setConeDeg
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.7.0
 *
 * @param {number} [cone = 0] - Ray's cone angle in degrees.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: function() { return /* binding */ config; }
/* harmony export */ });
/**
 * Configure ray.
 *
 * @method Raycaster.Ray#config
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {object} [options] - Ray's congfiguration options. May include:
 * @param {Phaser.Geom.Point|Point} [options.origin = {x:0, y:0}] - Ray's position.
 * @param {number} [options.angle = 0] - Ray's angle in radians.
 * @param {number} [options.angleDeg = 0] - Ray's angle in degrees.
 * @param {number} [options.cone = 0] - Ray's cone angle in radians.
 * @param {number} [options.coneDeg = 0] - Ray's cone angle in degrees.
 * @param {number} [options.range = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
 * @param {number} [options.collisionRange = Phaser.Math.MAX_SAFE_INTEGER] - Ray's maximum collision range of ray's field of view.
 * @param {number} [options.detectionRange = Phaser.Math.MAX_SAFE_INTEGER] - Maximum distance between ray's position and tested objects bounding boxes.
 * @param {boolean} [options.ignoreNotIntersectedRays = true] - If set true, ray returns false when it didn't hit anything. Otherwise returns ray's target position.
 * @param {boolean} [options.autoSlice = false] - If set true, ray will automatically slice intersections into array of triangles and store it in {@link Raycaster.Ray#slicedIntersections Ray.slicedIntersections}.
 * @param {boolean} [options.round = false] - If set true, point where ray hit will be rounded.
 * @param {(boolean|'arcade'|'matter')} [options.enablePhysics = false] - Add to ray physics body. Body will be a circle with radius equal to {@link Raycaster.Ray#collisionRange Ray.collisionRange}. If set true, arcade physics body will be added.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function config(options) {
  this.object = options.object;
  //origin
  if (options.origin !== undefined) this.origin.setTo(options.origin.x, options.origin.y);

  //angle
  if (options.angle !== undefined) this.angle = Phaser.Math.Angle.Normalize(options.angle);

  //angle deg
  if (options.angleDeg !== undefined) this.angle = Phaser.Math.Angle.Normalize(Phaser.Math.DegToRad(options.angleDeg));

  //cone angle
  if (options.cone !== undefined) this.cone = options.cone;

  //cone angle deg
  if (options.coneDeg !== undefined) this.cone = Phaser.Math.DegToRad(options.coneDeg);

  //ray range (0 = max)
  if (options.rayRange !== undefined) this.rayRange = options.rayRange;

  //collision range (0 = max)
  if (options.collisionRange !== undefined) this.collisionRange = options.collisionRange;

  //detection range (0 = max)
  if (options.detectionRange !== undefined) this.detectionRange = options.detectionRange;

  //ignore not intersected rays
  if (options.ignoreNotIntersectedRays !== undefined) this.ignoreNotIntersectedRays = options.ignoreNotIntersectedRays == true;

  //round
  if (options.round !== undefined) this.round = options.round == true;

  //auto slice
  if (options.autoSlice !== undefined) this.autoSlice = options.autoSlice == true;

  //enable physics
  if (options.enablePhysics !== undefined && options.enablePhysics) this.enablePhysics(options.enablePhysics);
  Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.rayRange);
  this.detectionRangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
  if (this._raycaster.debugOptions.enabled && this._raycaster.scene !== undefined) {
    this.graphics = this._raycaster.scene.add.graphics({
      lineStyle: {
        width: 1,
        color: 0x00ff00
      },
      fillStyle: {
        color: 0xff00ff
      }
    });
    this.graphics.setDepth(1000);
  }
  return this;
}

/***/ }),

/***/ "./src/ray/debug.js":
/*!**************************!*\
  !*** ./src/ray/debug.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   drawDebug: function() { return /* binding */ drawDebug; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Draw rays in debug mode
 *
 * @method Raycaster.Ray#drawDebug
 * @memberof Raycaster
 * @private
 * @since 0.10.0
 * 
 * @param {Phaser.Geom.Point[]} Array of points of ray's closest intersections with tested objects.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function drawDebug(intersections) {
  if (this.graphics === undefined || !this._raycaster.debugOptions.enabled) return this;

  //clear
  this.graphics.clear();
  if (!this._raycaster.debugOptions.rays) return this;
  if (this._raycaster.debugOptions.graphics.ray) {
    this.graphics.lineStyle(1, this._raycaster.debugOptions.graphics.ray);
    var _iterator = _createForOfIteratorHelper(intersections),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var intersection = _step.value;
        this.graphics.strokeLineShape({
          x1: this.origin.x,
          y1: this.origin.y,
          x2: intersection.x,
          y2: intersection.y
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  if (this._raycaster.debugOptions.graphics.rayPoint) {
    this.graphics.fillStyle(this._raycaster.debugOptions.graphics.rayPoint);
    this.graphics.fillPoint(this.origin.x, this.origin.y, 3);
    var _iterator2 = _createForOfIteratorHelper(intersections),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _intersection = _step2.value;
        this.graphics.fillPoint(_intersection.x, _intersection.y, 3);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  return this;
}

/***/ }),

/***/ "./src/ray/destroy.js":
/*!****************************!*\
  !*** ./src/ray/destroy.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   destroy: function() { return /* binding */ destroy; }
/* harmony export */ });
/**
 * Destroy object
 *
 * @method Raycaster.Ray#destroy
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.10.3
 */
function destroy() {
  if (this.graphics) this.graphics.destroy();
  for (var key in this) {
    delete this[key];
  }
}

/***/ }),

/***/ "./src/ray/enablePhysics.js":
/*!**********************************!*\
  !*** ./src/ray/enablePhysics.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   enablePhysics: function() { return /* binding */ enablePhysics; }
/* harmony export */ });
/**
 * Add to ray physics body. Body will be a circle with radius equal to {@link Raycaster.Ray#collisionRange Ray.collisionRange}. Physics body can be added only once.
 *
 * @method Raycaster.Ray#enablePhysics
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 * @param {'arcade'|'matter'} [type = 'arcade'] - Physics type
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function enablePhysics() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'arcade';
  if (this.body !== undefined) return this;
  this.collisionCircle = this._raycaster.scene.add.circle(this.origin.x, this.origin.y, this.collisionRange);
  this.collisionCircle._ray = this;
  if (type === 'matter') {
    this.bodyType = 'matter';
    if (this.collisionRange == Phaser.Math.MAX_SAFE_INTEGER) {
      var bounds = this._raycaster.boundingBox;
      this._raycaster.scene.matter.add.gameObject(this.collisionCircle, {
        shape: {
          type: 'rectangle',
          x: bounds.rectangle.centerX,
          y: bounds.rectangle.centerY,
          width: bounds.rectangle.width,
          height: bounds.rectangle.height
        },
        label: 'phaser-raycaster-ray-body',
        isSensor: true,
        ignoreGravity: true
      });
    } else {
      this._raycaster.scene.matter.add.gameObject(this.collisionCircle, {
        shape: {
          type: 'circle'
        },
        label: 'phaser-raycaster-ray-body',
        isSensor: true,
        ignoreGravity: true
      });
    }
    this.body = this.collisionCircle.body;
    this.body._ray = this;
    this.setOnCollideActive();
  } else {
    this.bodyType = 'arcade';
    this._raycaster.scene.physics.add.existing(this.collisionCircle);
    this.body = this.collisionCircle.body;
    this.body.setCircle(this.collisionRange).setAllowGravity(false).setImmovable(true);
    this.body._ray = this;
  }
  return this;
}

/***/ }),

/***/ "./src/ray/matter-physics-methods.js":
/*!*******************************************!*\
  !*** ./src/ray/matter-physics-methods.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setCollidesWith: function() { return /* binding */ setCollidesWith; },
/* harmony export */   setCollisionCategory: function() { return /* binding */ setCollisionCategory; },
/* harmony export */   setCollisionGroup: function() { return /* binding */ setCollisionGroup; },
/* harmony export */   setOnCollide: function() { return /* binding */ setOnCollide; },
/* harmony export */   setOnCollideActive: function() { return /* binding */ setOnCollideActive; },
/* harmony export */   setOnCollideEnd: function() { return /* binding */ setOnCollideEnd; },
/* harmony export */   setOnCollideWith: function() { return /* binding */ setOnCollideWith; }
/* harmony export */ });
/*Matter physics methods for ray body*/
/**
 * Sets the collision category of this ray's Matter Body. This number must be a power of two between 2^0 (= 1) and 2^31.
 * Two bodies with different collision groups (see {@link #setCollisionGroup}) will only collide if their collision
 * categories are included in their collision masks (see {@link #setCollidesWith}).
 *
 * @method Raycaster.Ray#setCollisionCategory
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {number} value - Unique category bitfield.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setCollisionCategory(value) {
  this.body.collisionFilter.category = value;
  return this;
}
;

/**
 * Sets the collision group of this ray's Matter Body. If this is zero or two Matter Bodies have different values,
 * they will collide according to the usual rules (see {@link #setCollisionCategory} and {@link #setCollisionGroup}).
 * If two Matter Bodies have the same positive value, they will always collide; if they have the same negative value,
 * they will never collide.
 *
 * @method Raycaster.Ray#setCollisionCategory
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {number} value - Unique group index.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setCollisionGroup(value) {
  this.body.collisionFilter.group = value;
  return this;
}
;

/**
 * Sets the collision mask for this ray's Matter Body. Two Matter Bodies with different collision groups will only
 * collide if each one includes the other's category in its mask based on a bitwise AND, i.e. `(categoryA & maskB) !== 0`
 * and `(categoryB & maskA) !== 0` are both true.*
 *
 * @method Raycaster.Ray#setCollidesWith
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {(number|number[])} categories - A unique category bitfield, or an array of them.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */

function setCollidesWith(categories) {
  var flags = 0;
  if (!Array.isArray(categories)) {
    flags = categories;
  } else {
    for (var i = 0; i < categories.length; i++) {
      flags |= categories[i];
    }
  }
  this.body.collisionFilter.mask = flags;
  return this;
}
;

/**
 * The callback is sent a `Phaser.Types.Physics.Matter.MatterCollisionData` object.
 * 
 * This does not change the bodies collision category, group or filter. Those must be set in addition
 * to the callback.
 *
 * @method Raycaster.Ray#setOnCollide
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {function} callback - The callback to invoke when this body starts colliding with another.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setOnCollide(callback) {
  var self = this;
  this.body.onCollideCallback = function (collisionInfo) {
    if (collisionInfo.rayCollided) {
      callback(collisionInfo);
    } else if (self.processOverlap(collisionInfo)) {
      collisionInfo.rayCollided = true;
      callback(collisionInfo);
    }
  };
  return this;
}
;

/**
 * The callback is sent a `Phaser.Types.Physics.Matter.MatterCollisionData` object.
 * 
 * This does not change the bodies collision category, group or filter. Those must be set in addition
 * to the callback.
 *
 * @method Raycaster.Ray#setOnCollideEnd
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {function} callback - The callback to invoke when this body stops colliding with another.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setOnCollideEnd(callback) {
  this.body.onCollideEndCallback = function (collisionInfo) {
    if (collisionInfo.rayCollided) {
      collisionInfo.rayCollided = false;
      callback(collisionInfo);
    }
  };
  return this;
}
;

/**
 * The callback is sent a `Phaser.Types.Physics.Matter.MatterCollisionData` object.
 * 
 * This does not change the bodies collision category, group or filter. Those must be set in addition
 * to the callback.
 *
 * @method Raycaster.Ray#setOnCollideActive
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {function} callback - The callback to invoke for the duration of this body colliding with another.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setOnCollideActive(callback) {
  var self = this;
  var func = function func(collisionInfo) {
    if (self.processOverlap(collisionInfo)) {
      var body = collisionInfo.bodyA.label === 'phaser-raycaster-ray-body' ? collisionInfo.bodyB : collisionInfo.bodyA;
      if (collisionInfo.rayCollided !== true) {
        collisionInfo.rayCollided = true;
        if (self.body.onCollideCallback) {
          self.body.onCollideCallback(collisionInfo);
        }
        if (self.body.onCollideWith !== undefined && self.body.onCollideWith[body.id]) {
          self.body.onCollideWith[body.id](body, collisionInfo);
        }
      }
      if (callback) callback(collisionInfo);
    } else {
      if (self.body.onCollideEndCallback && collisionInfo.rayCollided === true) {
        self.body.onCollideEndCallback(collisionInfo);
      }
    }
  };
  this.body.onCollideActiveCallback = func;
  return this;
}

/**
 * The callback is sent a reference to the other body, along with a `Phaser.Types.Physics.Matter.MatterCollisionData` object.
 * 
 * This does not change the bodies collision category, group or filter. Those must be set in addition
 * to the callback.
 *
 * @method Raycaster.Ray#setOnCollideWith
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {(MatterJS.Body|MatterJS.Body[])} body - The body, or an array of bodies, to test for collisions with.
 * @param {function} callback - The callback to invoke when this body collides with the given body or bodies.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setOnCollideWith(body, callback) {
  var self = this;
  var func = function func(body, collisionInfo) {
    if (collisionInfo.rayCollided) {
      callback(body, collisionInfo);
    } else if (self.processOverlap(collisionInfo)) {
      collisionInfo.rayCollided = true;
      callback(body, collisionInfo);
    }
  };
  if (!Array.isArray(body)) {
    body = [body];
  }
  for (var i = 0; i < body.length; i++) {
    var src = body[i].hasOwnProperty('body') ? body[i].body : body[i];
    this.body.setOnCollideWith(src, func);
  }
  return this;
}
;

/***/ }),

/***/ "./src/ray/origin.js":
/*!***************************!*\
  !*** ./src/ray/origin.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setOrigin: function() { return /* binding */ setOrigin; }
/* harmony export */ });
/**
 * Set ray's source position.
 *
 * @method Raycaster.Ray#setOrigin
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setOrigin(x, y) {
  this.origin.setTo(x, y);
  Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.rayRange);
  this.detectionRangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
  if (this.bodyType === 'matter' && this.collisionRange !== Phaser.Math.MAX_SAFE_INTEGER) {
    this.collisionCircle.x = x;
    this.collisionCircle.y = y;
  } else if (this.bodyType === 'arcade') {
    this.collisionCircle.x = x;
    this.collisionCircle.y = y;
  }
  return this;
}

/***/ }),

/***/ "./src/ray/overlap.js":
/*!****************************!*\
  !*** ./src/ray/overlap.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   overlap: function() { return /* binding */ overlap; },
/* harmony export */   processOverlap: function() { return /* binding */ processOverlap; },
/* harmony export */   testArcadeOverlap: function() { return /* binding */ testArcadeOverlap; },
/* harmony export */   testMatterOverlap: function() { return /* binding */ testMatterOverlap; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Get game objects overlaping field of view.
 *
 * @method Raycaster.Ray#overlap
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 * @param {object|object[]} [objects] - Game object / array off game objects to test.
 *
 * @return {object[]} Array of game objects that overlaps with field of view.
 */
function overlap(objects) {
  var targets = [];
  var overlapCircle = new Phaser.Geom.Circle(this.origin.x, this.origin.y, this.collisionRange);

  //matter physics
  if (this.bodyType === 'matter') {
    var isCollisionInfo = false;
    if (objects === undefined) {
      objects = this._raycaster.scene.matter.query.collides(this.body, this._raycaster.scene.matter.getMatterBodies());
      var _iterator = _createForOfIteratorHelper(objects),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var object = _step.value;
          var body = object.bodyA === this.body ? object.bodyB : object.bodyA;
          if (this.testMatterOverlap(body)) targets.push(body);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    //get object's body
    else {
      if (!Array.isArray(objects)) objects = [objects];
      var _iterator2 = _createForOfIteratorHelper(objects),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _object = _step2.value;
          if (_object === this.body) continue;
          if (this.testMatterOverlap(_object)) targets.push(_object);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }
  //arcade physics
  else {
    var bodies = false;
    //get bodies in range
    if (objects === undefined) {
      objects = this._raycaster.scene.physics.overlapCirc(this.origin.x, this.origin.y, this.collisionRange, true, true);
      bodies = true;
    }
    //get object's body
    else if (!Array.isArray(objects)) {
      objects = [objects];
    }
    //if objects are bodies
    if (bodies) {
      var _iterator3 = _createForOfIteratorHelper(objects),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _body = _step3.value;
          if (_body === this.body) continue;
          var hitbox = void 0;
          //get physics body hitbox
          if (_body.isCircle) {
            hitbox = new Phaser.Geom.Circle(_body.position.x + _body.halfWidth, _body.position.y + _body.halfWidth, _body.halfWidth);
          } else {
            hitbox = new Phaser.Geom.Rectangle(_body.x, _body.y, _body.width, _body.height);
          }
          if (this.testArcadeOverlap(hitbox)) targets.push(_body.gameObject);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    //if objects are game objects
    else {
      var _iterator4 = _createForOfIteratorHelper(objects),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _object2 = _step4.value;
          if (_object2.body === undefined) continue;
          var _hitbox = void 0;
          //get physics body hitbox
          if (_object2.body.isCircle) {
            _hitbox = new Phaser.Geom.Circle(_object2.body.position.x + _object2.body.halfWidth, _object2.body.position.y + _object2.body.halfWidth, _object2.body.halfWidth);
            if (!Phaser.Geom.Intersects.CircleToCircle(overlapCircle, _hitbox)) continue;
          } else {
            _hitbox = new Phaser.Geom.Rectangle(_object2.body.x, _object2.body.y, _object2.body.width, _object2.body.height);
            if (!Phaser.Geom.Intersects.CircleToRectangle(overlapCircle, _hitbox)) continue;
          }
          if (this.testArcadeOverlap(_hitbox)) targets.push(_object2);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }
  return targets;
}

/**
 * Process callback for physics collider / overlap.
 *
 * @method Raycaster.Ray#processOverlap
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 * @param {object} object1 - Game object or matter body passed by collider / overlap or matter CollisionInfo object.
 * @param {object} object2 - Game object or matter body passed by collider / overlap. Ignored if matter CollisionInfo object was passed as first argument.
 *
 * @return {boolean} Return true if game object is overlapping ray's field of view.
 */
function processOverlap(object1, object2) {
  var obj1, obj2, target;
  //check if it's matter collisionInfo object
  if (object1.bodyA !== undefined && object1.bodyB !== undefined) {
    obj1 = object1.bodyA;
    obj2 = object1.bodyB;
  } else {
    obj1 = object1;
    obj2 = object2;
  }
  if (obj1._ray !== undefined && obj1._ray === this) target = obj2;else if (obj2._ray !== undefined && obj2._ray === this) target = obj1;else return false;
  return this.overlap(target).length > 0;
}

/**
 * Test if hitbox overlaps with field of view. Method used in {@link Raycaster.Ray#overlap Ray.overlap}.
 *
 * @method Raycaster.Ray#testArcadeOverlap
 * @memberof Raycaster.Ray
 * @instance
 * @private
 * @since 0.8.0
 *
 * @param {object} hitbox - Game object's hitbox generated inside {@link Raycaster.Ray#overlap Ray.overlap}.
 *
 * @return {boolean} True if hitbox overlaps with {@link Raycaster.Ray Raycaster.Ray} field of view.
 */
function testArcadeOverlap(hitbox) {
  var overlap = false;

  //iterate through field of view slices to check collisions with target
  var _iterator5 = _createForOfIteratorHelper(this.slicedIntersections),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var slice = _step5.value;
      //if hitbox is a circle
      if (hitbox.type == 0) {
        overlap = Phaser.Geom.Intersects.TriangleToCircle(slice, hitbox);
      }
      //if hitbox is a rectangle
      else {
        overlap = Phaser.Geom.Intersects.RectangleToTriangle(hitbox, slice);
      }
      if (overlap) {
        return true;
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return false;
}

/**
 * Test if matter body overlaps with field of view. Method used in {@link Raycaster.Ray#overlap Ray.overlap}.
 *
 * @method Raycaster.Ray#testMatterOverlap
 * @memberof Raycaster.Ray
 * @instance
 * @private
 * @since 0.9.0
 *
 * @param {object} body - Matter body.
 *
 * @return {boolean} True if body overlaps with {@link Raycaster.Ray Raycaster.Ray} field of view.
 */
function testMatterOverlap(object) {
  var body;
  if (object.type === 'body') body = object;else if (object.body !== undefined) body = object.body;else return false;

  //if body is concave, ignore convex body
  var parts = body.parts.length > 1 ? body.parts.splice(1) : body.parts;
  //iterate through bodies
  var _iterator6 = _createForOfIteratorHelper(parts),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var part = _step6.value;
      var pointA = part.vertices[0];
      for (var i = 1, length = part.vertices.length; i < length; i++) {
        var pointB = part.vertices[i];
        var _segment = new Phaser.Geom.Line(pointA.x, pointA.y, pointB.x, pointB.y);

        //iterate through field of view slices to check collisions with target
        var _iterator7 = _createForOfIteratorHelper(this.slicedIntersections),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var slice = _step7.value;
            var _overlap = Phaser.Geom.Intersects.TriangleToLine(slice, _segment);
            //additional checking if slice contain segment's points due to TriangleToLine bug.
            if (!_overlap) _overlap = Phaser.Geom.Triangle.ContainsPoint(slice, _segment.getPointA());
            if (!_overlap) _overlap = Phaser.Geom.Triangle.ContainsPoint(slice, _segment.getPointB());
            if (_overlap) {
              return true;
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        pointA = pointB;
      }

      //closing segment
      var segment = new Phaser.Geom.Line(part.vertices[part.vertices.length - 1].x, part.vertices[part.vertices.length - 1].y, part.vertices[0].x, part.vertices[0].y);
      //iterate through field of view slices to check collisions with target
      var _iterator8 = _createForOfIteratorHelper(this.slicedIntersections),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _slice = _step8.value;
          var _overlap2 = Phaser.Geom.Intersects.TriangleToLine(_slice, segment);
          if (_overlap2) {
            return true;
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  return false;
}

/***/ }),

/***/ "./src/ray/range.js":
/*!**************************!*\
  !*** ./src/ray/range.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   boundsInRange: function() { return /* binding */ boundsInRange; },
/* harmony export */   setCollisionRange: function() { return /* binding */ setCollisionRange; },
/* harmony export */   setDetectionRange: function() { return /* binding */ setDetectionRange; },
/* harmony export */   setRayRange: function() { return /* binding */ setRayRange; }
/* harmony export */ });
/**
 * Set ray's range.
 *
 * @method Raycaster.Ray#setRayRange
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {number} [rayRange = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setRayRange() {
  var rayRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Phaser.Math.MAX_SAFE_INTEGER;
  this.rayRange = rayRange;
  Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.rayRange);
  return this;
}

/**
 * Set ray's maximum detection range. Objects outside detection range won't be tested.
 * Ray tests all objects when set to 0.
 *
 * @method Raycaster.Ray#setDetectionRange
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {number} [detectionRange = 0] - Maximum distance between ray's position and tested objects bounding boxes.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setDetectionRange() {
  var detectionRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  this.detectionRange = detectionRange;
  this.detectionRangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
  return this;
}

/**
 * Set ray's field of view maximum collision range. Objects outside collision range won't be tested by {@link Raycaster.Ray#overlap Raycaster.Ray.overlap} method.
 * Determines ray's physics body radius.
 *
 * @method Raycaster.Ray#setCollisionRange
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 * @param {number} [collisionRange = Phaser.Math.MAX_SAFE_INTEGER] - Ray's collision range and physics body radius.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setCollisionRange() {
  var collisionRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Phaser.Math.MAX_SAFE_INTEGER;
  var oldRangeMax = this.collisionRange == Phaser.Math.MAX_SAFE_INTEGER;
  this.collisionRange = collisionRange;
  this.collisionCircle.setRadius(this.collisionRange);
  if (this.bodyType === 'matter') {
    if (this.collisionRange == Phaser.Math.MAX_SAFE_INTEGER) {
      var bounds = this._raycaster.boundingBox;
      this._raycaster.scene.matter.body.set(this.body, {
        shape: {
          type: 'rectangle',
          x: bounds.rectangle.centerX,
          y: bounds.rectangle.centerY,
          width: bounds.rectangle.width,
          height: bounds.rectangle.height,
          circleRadius: 0
        }
      });
    } else if (oldRangeMax) {
      this._raycaster.scene.matter.body.set(this.body, {
        shape: {
          type: 'circle',
          x: this.collisionCircle.x,
          y: this.collisionCircle.y
        },
        circleRadius: this.collisionRange,
        isStatic: false
      });
    } else {
      this.collisionCircle.setRadius(this.collisionRange);
    }
    this._raycaster.scene.matter.body.set(this.body, 'circleRadius', this.collisionRange);
  } else if (this.bodyType === 'arcade') {
    this.body.setCircle(this.collisionRange);
  }
  return this;
}

/**
 * Test if object's bounding box is in ray's detection range.
 *
 * @method Raycaster.Ray#boundsInRange
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {object} object - Tested object
 * @param {(Phaser.Geom.Rectangle|boolean)} [bounds = false] - Tested object's bounds. If not passed bounds will be generated automatically.
 *
 * @return {boolean} Information if object is in ray's detection range.
 */
function boundsInRange(object) {
  var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!this.detectionRange) return true;
  var objectBounds;
  if (bounds) objectBounds = bounds;else {
    if (object.type === 'body' || object.type === 'composite') objectBounds = object.raycasterMap.getBoundingBox();else objectBounds = object.data.get('raycasterMap').getBoundingBox();
  }
  if (Phaser.Geom.Intersects.CircleToRectangle(this.detectionRangeCircle, objectBounds)) return true;
  return false;
}

/***/ }),

/***/ "./src/ray/ray-core.js":
/*!*****************************!*\
  !*** ./src/ray/ray-core.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ray: function() { return /* binding */ Ray; }
/* harmony export */ });
/**
 * @classdesc
 *
 * Ray class responsible for casting ray's and testing their collisions with mapped objects.
 *
 * @namespace Raycaster.Ray
 * @class Raycaster.Ray
 * @constructor
 * @since 0.6.0
 *
 * @param {object} [options] - Ray's congfiguration options. May include:
 * @param {Phaser.Geom.Point|Point} [options.origin = {x:0, y:0}] - Ray's position.
 * @param {number} [options.angle = 0] - Ray's angle in radians.
 * @param {number} [options.angleDeg = 0] - Ray's angle in degrees.
 * @param {number} [options.cone = 0] - Ray's cone angle in radians.
 * @param {number} [options.coneDeg = 0] - Ray's cone angle in degrees.
 * @param {number} [options.range = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
 * @param {number} [options.collisionRange = Phaser.Math.MAX_SAFE_INTEGER] - Ray's maximum collision range of ray's field of view.
 * @param {number} [options.detectionRange = Phaser.Math.MAX_SAFE_INTEGER] - Maximum distance between ray's position and tested objects bounding boxes.
 * @param {boolean} [options.ignoreNotIntersectedRays = true] - If set true, ray returns false when it didn't hit anything. Otherwise returns ray's target position.
 * @param {boolean} [options.autoSlice = false] - If set true, ray will automatically slice intersections into array of triangles and store it in {@link Raycaster.Ray#slicedIntersections Ray.slicedIntersections}.
 * @param {boolean} [options.round = false] - If set true, point where ray hit will be rounded.
 * @param {(boolean|'arcade'|'matter')} [options.enablePhysics = false] - Add to ray physics body. Body will be a circle with radius equal to {@link Raycaster.Ray#collisionRange Ray.collisionRange}. If set true, arcade physics body will be added.
 * @param {Raycaster} [raycaster] - Parent raycaster object.
 */
function Ray(options, raycaster) {
  /**
  * Reference to parent Raycaster object.
  *
  * @name Raycaster.Ray#_raycaster
  * @type {Raycaster}
  * @private
  * @since 0.6.0
  */
  this._raycaster = raycaster ? raycaster : false;
  /**
  * Ray's source position.
  *
  * @name Raycaster.Ray#origin
  * @type {Phaser.Geom.Point}
  * @since 0.6.0
  */
  this.origin = new Phaser.Geom.Point();
  /**
  * Ray's representation used to calculating intersections.
  *
  * @name Raycaster.Ray#_ray
  * @type {Phaser.Geom.Line}
  * @private
  * @since 0.6.0
  */
  this._ray = new Phaser.Geom.Line();
  /**
  * Ray's angle in radians.
  *
  * @name Raycaster.Ray#angle
  * @type {number}
  * @default 0
  * @since 0.6.0
  */
  this.angle = 0;
  /**
  * Ray's cone width angle in radians.
  *
  * @name Raycaster.Ray#cone
  * @type {number}
  * @default 0
  * @since 0.7.0
  */
  this.cone = 0;
  /**
  * Ray's maximum range
  *
  * @name Raycaster.Ray#rayRange
  * @type {number}
  * @default Phaser.Math.MAX_SAFE_INTEGER
  * @since 0.6.0
  */
  this.rayRange = Phaser.Math.MAX_SAFE_INTEGER;
  /**
  * Ray's maximum detection range. Objects outside detection range won't be tested.
  * Ray tests all objects when set to 0.
  *
  * @name Raycaster.Ray#detectionRange
  * @type {number}
  * @default
  * @since 0.6.0
  */
  this.detectionRange = 0;
  /**
  * Ray's representation of detection range used in calculating if objects are in range.
  *
  * @name Raycaster.Ray#detectionRangeCircle
  * @type {Phaser.Geom.Circle}
  * @private
  * @since 0.6.0
  */
  this.detectionRangeCircle = new Phaser.Geom.Circle();
  /**
  * Ray's maximum collision range of ray's field of view. Radius of {@link Raycaster.Ray#collisionRangeCircle Ray.body}.
  *
  * @name Raycaster.Ray#collisionRange
  * @type {number}
  * @default Phaser.Math.MAX_SAFE_INTEGER
  * @since 0.8.0
  */
  this.collisionRange = Phaser.Math.MAX_SAFE_INTEGER;
  /**
  * If set true, ray returns false when it didn't hit anything. Otherwise returns ray's target position.
  *
  * @name Raycaster.Ray#ignoreNotIntersectedRays
  * @type {boolean}
  * @default true
  * @since 0.6.0
  */
  this.ignoreNotIntersectedRays = true;
  /**
  * If set true, ray's hit points will be rounded.
  *
  * @name Raycaster.Ray#round
  * @type {boolean}
  * @default false
  * @since 0.8.1
  */
  this.round = false;
  /**
  * If set true, ray will automatically slice intersections into array of triangles and store it in {@link Raycaster.Ray#slicedIntersections Ray.slicedIntersections}.
  *
  * @name Raycaster.Ray#autoSlice
  * @type {boolean}
  * @default false
  * @since 0.8.0
  */
  this.autoSlice = false;
  /**
  * Array of intersections from last raycast representing field of view.
  *
  * @name Raycaster.Ray#intersections
  * @type {object[]}
  * @default []
  * @since 0.8.0
  */
  this.intersections = [];
  /**
  * Array of triangles representing slices of field of view from last raycast.
  *
  * @name Raycaster.Ray#slicedIntersections
  * @type {Phaser.Geom.Triangle[]}
  * @default []
  * @since 0.8.0
  */
  this.slicedIntersections = [];

  /**
  * Physics body for testing field of view collisions.
  *
  * @name Raycaster.Ray#body
  * @type {object}
  * @default undefined
  * @since 0.8.0
  */
  //this.body = false;
  /**
  * Physics body type.
  *
  * @name Raycaster.Ray#bodyType
  * @type {(boolean|'arcade'|'matter')}
  * @default false
  * @since 0.9.0
  */
  this.bodyType = false;

  /**
  * Ray casting stats.
  *
  * @name Raycaster.Ray#_stats
  * @type {object}
  * @private
  * @since 0.10.0
  * 
  * @property {string} method Used casting method (cast, castCircle, castCone).
  * @property {number} rays Casted rays.
  * @property {number} testedMappedObjects Tested mapped objects.
  * @property {number} hitMappedObjects Hit mapped objects.
  * @property {number} segments Tested segments.
  * @property {number} time Casting time.
  */
  this._stats = {
    method: 'cast',
    rays: 0,
    testedMappedObjects: 0,
    hitMappedObjects: 0,
    segments: 0,
    time: 0
  };

  /**
  * Ray's graphics object used for debug
  *
  * @name Raycaster.Ray#graphics
  * @type {Phaser.GameObjects.Graphics}
  * @private
  * @since 0.10.0
  */
  this.graphics;
  this.config(options);
}
;
Ray.prototype = {
  config: (__webpack_require__(/*! ./config.js */ "./src/ray/config.js").config),
  getStats: (__webpack_require__(/*! ./stats.js */ "./src/ray/stats.js").getStats),
  setRay: (__webpack_require__(/*! ./ray.js */ "./src/ray/ray.js").setRay),
  setOrigin: (__webpack_require__(/*! ./origin.js */ "./src/ray/origin.js").setOrigin),
  setRayRange: (__webpack_require__(/*! ./range.js */ "./src/ray/range.js").setRayRange),
  setAngle: (__webpack_require__(/*! ./angle.js */ "./src/ray/angle.js").setAngle),
  setAngleDeg: (__webpack_require__(/*! ./angle.js */ "./src/ray/angle.js").setAngleDeg),
  setCone: (__webpack_require__(/*! ./cone.js */ "./src/ray/cone.js").setCone),
  setConeDeg: (__webpack_require__(/*! ./cone.js */ "./src/ray/cone.js").setConeDeg),
  setDetectionRange: (__webpack_require__(/*! ./range.js */ "./src/ray/range.js").setDetectionRange),
  boundsInRange: (__webpack_require__(/*! ./range.js */ "./src/ray/range.js").boundsInRange),
  cast: (__webpack_require__(/*! ./cast.js */ "./src/ray/cast.js").cast),
  castCircle: (__webpack_require__(/*! ./castCircle.js */ "./src/ray/castCircle.js").castCircle),
  castCone: (__webpack_require__(/*! ./castCone.js */ "./src/ray/castCone.js").castCone),
  slice: (__webpack_require__(/*! ./slice.js */ "./src/ray/slice.js").slice),
  setCollisionRange: (__webpack_require__(/*! ./range.js */ "./src/ray/range.js").setCollisionRange),
  enablePhysics: (__webpack_require__(/*! ./enablePhysics.js */ "./src/ray/enablePhysics.js").enablePhysics),
  overlap: (__webpack_require__(/*! ./overlap.js */ "./src/ray/overlap.js").overlap),
  processOverlap: (__webpack_require__(/*! ./overlap.js */ "./src/ray/overlap.js").processOverlap),
  testArcadeOverlap: (__webpack_require__(/*! ./overlap.js */ "./src/ray/overlap.js").testArcadeOverlap),
  testMatterOverlap: (__webpack_require__(/*! ./overlap.js */ "./src/ray/overlap.js").testMatterOverlap),
  setCollisionCategory: (__webpack_require__(/*! ./matter-physics-methods.js */ "./src/ray/matter-physics-methods.js").setCollisionCategory),
  setCollisionGroup: (__webpack_require__(/*! ./matter-physics-methods.js */ "./src/ray/matter-physics-methods.js").setCollisionGroup),
  setCollidesWith: (__webpack_require__(/*! ./matter-physics-methods.js */ "./src/ray/matter-physics-methods.js").setCollidesWith),
  setOnCollide: (__webpack_require__(/*! ./matter-physics-methods.js */ "./src/ray/matter-physics-methods.js").setOnCollide),
  setOnCollideEnd: (__webpack_require__(/*! ./matter-physics-methods.js */ "./src/ray/matter-physics-methods.js").setOnCollideEnd),
  setOnCollideActive: (__webpack_require__(/*! ./matter-physics-methods.js */ "./src/ray/matter-physics-methods.js").setOnCollideActive),
  setOnCollideWith: (__webpack_require__(/*! ./matter-physics-methods.js */ "./src/ray/matter-physics-methods.js").setOnCollideWith),
  drawDebug: (__webpack_require__(/*! ./debug.js */ "./src/ray/debug.js").drawDebug),
  destroy: (__webpack_require__(/*! ./destroy.js */ "./src/ray/destroy.js").destroy)
};

/***/ }),

/***/ "./src/ray/ray.js":
/*!************************!*\
  !*** ./src/ray/ray.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setRay: function() { return /* binding */ setRay; }
/* harmony export */ });
/**
 * Set ray's position, direction (angle) and range.
 *
 * @method Raycaster.Ray#setRay
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} [angle] - Ray's angle in radians.
 * @param {number} [range = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
function setRay(x, y, angle) {
  var rayRange = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Phaser.Math.MAX_SAFE_INTEGER;
  this.origin.setTo(x, y);
  this.angle = Phaser.Math.Angle.Normalize(angle);
  this.rayRange = rayRange;
  Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.rayRange);
  this.detectionRangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
  return this;
}

/***/ }),

/***/ "./src/ray/slice.js":
/*!**************************!*\
  !*** ./src/ray/slice.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   slice: function() { return /* binding */ slice; }
/* harmony export */ });
/**
 * Slice ray's field of view represented by polygon or array of points into array of triangles.
 *
 * @method Raycaster.Ray#slice
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 * @param {(object[]|Phaser.Geom.Polygon)} [fov = {Ray#fov}] - Array of points or polygon representing field of view. If not passed, filed of view from last raycaste will be used.
 * @param {boolean} [closed = true|{Ray#fov}] - Define if field of view polygon is closed (first and last vertices sholud be connected). If fov was not passed, value depends of last type of casting.
 *
 * @return {Phaser.Geom.Triangle[]} Array of triangles representing slices of field of view.
 */
function slice() {
  var intersections = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.intersections;
  var closed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  //if intersections is Phaser.Geom.Polygon object
  if (!Array.isArray(intersections)) {
    if (intersections.type === 4) intersections = intersections.points;else return [];
  }
  if (intersections.length === 0) return [];
  var slices = [];
  for (var i = 0, iLength = intersections.length - 1; i < iLength; i++) {
    slices.push(new Phaser.Geom.Triangle(this.origin.x, this.origin.y, intersections[i].x, intersections[i].y, intersections[i + 1].x, intersections[i + 1].y));
  }
  if (closed) slices.push(new Phaser.Geom.Triangle(this.origin.x, this.origin.y, intersections[0].x, intersections[0].y, intersections[intersections.length - 1].x, intersections[intersections.length - 1].y));
  return slices;
}

/***/ }),

/***/ "./src/ray/stats.js":
/*!**************************!*\
  !*** ./src/ray/stats.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getStats: function() { return /* binding */ getStats; }
/* harmony export */ });
/**
 * Get ray statistics for last casting. Stats include
 * * number of casted rays,
 * * number of tested mapped objects,
 * * number of tested map segments.
 * * casting time
 *
 * @method Raycaster.Ray#getStats
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.10.0
 *
 * @return {object} Statisticss from last casting.
 */
function getStats() {
  return this._stats;
}

/***/ }),

/***/ "./src/raycaster-core.js":
/*!*******************************!*\
  !*** ./src/raycaster-core.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Raycaster: function() { return /* binding */ Raycaster; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
* @author       Marcin Walczak <contact@marcin-walczak.pl>
* @copyright    2023 Marcin Walczak
* @license      {@link https://github.com/wiserim/phaser-raycaster/blob/master/LICENSE|MIT License}
*/

/**
 * @classdesc
 *
 * Raycaster class responsible for creating ray objects and managing mapped objects.
 * 
 * @namespace Raycaster
 * @class Raycaster
 * @constructor
 * @since 0.6.0
 *
 * @param {object} [options] - Raycaster's configuration options. May include:
 * @param {Phaser.Scene} [options.scene] - Scene in which Raycaster will be used.
 * @param {number} [options.mapSegmentCount = 0] - Number of segments of circle maps. If set to 0, map will be teste
 * @param {(object|object[])} [options.objects] - Game object or array of game objects to map.
 * @param {Phaser.Geom.Rectangle} [options.boundingBox] - Raycaster's bounding box. If not passed, {@link Raycaster Raycaster} will set it's bounding box based on Arcade Physics / Matter physics world bounds.
 * @param {boolean} [options.autoUpdate = true] - If set true, automatically update dynamic maps on scene update event.
 * @param {boolean|object} [options.debug] - Enable debug mode or configure it {@link Raycaster#debugOptions debugOptions}.
 */
function Raycaster(options) {
  /**
  * Plugin version.
  *
  * @name Raycaster#version
  * @type {string}
  * @readonly
  * @since 0.6.0
  */
  this.version = '0.10.10';
  /**
  * Raycaster's scene
  *
  * @name Raycaster#scene
  * @type {Phaser.Scene}
  * @private
  * @since 0.6.0
  */
  this.scene;
  /**
  * Raycaster's graphics object used for debug
  *
  * @name Raycaster#graphics
  * @type {Phaser.GameObjects.Graphics}
  * @private
  * @since 0.10.0
  */
  this.graphics;
  /**
  * Raycaster's debug config
  *
  * @name Raycaster#debugOptions
  * @type {Object}
  * @since 0.10.0
  * 
  * @property {boolean} [enable = false] Enable debug mode
  * @property {boolean} [maps = true] - Enable maps debug
  * @param {boolean} [rays = true] - Enable rays debug
  * @property {boolean} graphics - Debug graphics options
  * @property {boolean|number} [graphics.ray = 0x00ff00] - Debug ray color. Set false to disable.
  * @property {boolean|number} [graphics.rayPoint = 0xff00ff] - Debug ray point color. Set false to disable.
  * @property {boolean|number} [graphics.mapPoint = 0x00ffff] - debug map point color. Set false to disable.
  * @property {boolean|number} [graphics.mapSegment = 0x0000ff] - Debug map segment color. Set false to disable.
  * @property {boolean|number} [graphics.mapBoundingBox = 0xff0000] - Debug map bounding box color. Set false to disable.
  */
  this.debugOptions = {
    enabled: false,
    maps: true,
    rays: true,
    graphics: {
      ray: 0x00ff00,
      rayPoint: 0xff00ff,
      mapPoint: 0x00ffff,
      mapSegment: 0x0000ff,
      mapBoundingBox: 0xff0000
    }
  };

  /**
  * Raycaster statistics.
  *
  * @name Raycaster.Raycaster#_stats
  * @type {object}
  * @private
  * @since 0.10.0
  * 
  * @property {object} mappedObjects Mapped objects statistics.
  * @property {number} mappedObjects.total Mapped objects total.
  * @property {number} mappedObjects.static Static maps.
  * @property {number} mappedObjects.dynamic Dynamic maps.
  * @property {number} mappedObjects.rectangleMaps Rectangle maps.
  * @property {number} mappedObjects.polygonMaps Polygon maps.
  * @property {number} mappedObjects.circleMaps Circle maps.
  * @property {number} mappedObjects.lineMaps Line maps.
  * @property {number} mappedObjects.containerMaps Container maps.
  * @property {number} mappedObjects.tilemapMaps Tilemap maps.
  * @property {number} mappedObjects.matterMaps Matter body maps.
  */
  this._stats = {
    mappedObjects: {
      total: 0,
      static: 0,
      dynamic: 0,
      rectangleMaps: 0,
      polygonMaps: 0,
      circleMaps: 0,
      lineMaps: 0,
      containerMaps: 0,
      tilemapMaps: 0,
      matterMaps: 0
    }
  };

  /**
  * Raycaster's bounding box. By default it's size is based on Arcade Physics / Matter physics world bounds.
  * If world size will change after creation of Raycaster, bounding box needs to be updated.
  *
  * @name Raycaster#boundingBox
  * @type {Phaser.Geom.Rectangle}
  * @default false
  * @private
  * @since 0.6.0
  */
  this.boundingBox = false;
  /**
  * Array of mapped game objects.
  *
  * @name Raycaster#mappedObjects
  * @type {object[]}
  * @since 0.6.0
  */
  this.mappedObjects = [];
  /**
  * Array of dynamic mapped game objects.
  *
  * @name Raycaster#dynamicMappedObjects
  * @type {object[]}
  * @since 0.10.6
  */
  this.dynamicMappedObjects = [];
  /**
  * Number of segments of circle maps.
  *
  * @name Raycaster#mapSegmentCount
  * @type {number}
  * @default 0
  * @since 0.6.0
  */
  this.mapSegmentCount = 0;
  if (options !== undefined) {
    if (options.boundingBox === undefined && options.scene !== undefined) {
      if (options.scene.physics !== undefined) options.boundingBox = options.scene.physics.world.bounds;else if (options.scene.matter !== undefined) {
        var walls = options.scene.matter.world.walls;
        if (walls.top !== null) {
          options.boundingBox = new Phaser.Geom.Rectangle(walls.top.vertices[3].x, walls.top.vertices[3].y, walls.bottom.vertices[1].x - walls.top.vertices[3].x, walls.bottom.vertices[1].y - walls.top.vertices[3].y);
        }
      }
    }
    this.setOptions(options);
    if (options.autoUpdate === undefined || options.autoUpdate)
      //automatically update event
      this.scene.events.on('update', this.update, this);
  } else
    //automatically update event
    this.scene.events.on('update', this.update, this);
  return this;
}
Raycaster.prototype = {
  /**
  * Configure raycaster.
  *
  * @method Raycaster#setOptions
  * @memberof Raycaster
  * @instance
  * @since 0.6.0
  *
  * @param {object} [options] - Raycaster's congfiguration options. May include:
  * @param {Phaser.Scene} [options.scene] - Scene in which Raycaster will be used.
  * @param {number} [options.mapSegmentCount = 0] - Number of segments of circle maps.
  * @param {(object|object[])} [options.objects] - Game object or array of game objects to map.
  * @param {Phaser.Geom.Rectangle} [options.boundingBox] - Raycaster's bounding box.
  * @param {boolean|object} [options.debug] - Enable debug mode or cofigure {@link Raycaster#debugOptions debugOptions}.
  *
  * @return {Raycaster} {@link Raycaster Raycaster} instance
  */
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
      this.graphics.setDepth(999);
    }
    if (options.debug !== undefined && options.debug !== false) {
      this.debugOptions.enabled = true;
      if (_typeof(options.debug) === 'object') Object.assign(this.debugOptions, options.debug);
    }
    if (options.mapSegmentCount !== undefined) this.mapSegmentCount = options.mapSegmentCount;
    if (options.objects !== undefined) this.mapGameObjects(options.objects);
    if (options.boundingBox !== undefined) this.setBoundingBox(options.boundingBox.x, options.boundingBox.y, options.boundingBox.width, options.boundingBox.height);
    return this;
  },
  /**
  * Set Raycaster's bounding box.
  *
  * @method Raycaster#setBoundingBox
  * @memberof Raycaster
  * @instance
  * @since 0.6.0
  *
  * @param {number} x - The X coordinate of the top left corner of bounding box.
  * @param {number} y - The Y coordinate of the top left corner of bounding box.
  * @param {number} width - The width of bounding box.
  * @param {number} height - The height of bounding box.
  *
  * @return {Raycaster} {@link Raycaster Raycaster} instance
  */
  setBoundingBox: function setBoundingBox(x, y, width, height) {
    this.boundingBox = {
      rectangle: new Phaser.Geom.Rectangle(x, y, width, height),
      points: [],
      segments: []
    };
    //set points
    var points = [new Phaser.Geom.Point(this.boundingBox.rectangle.left, this.boundingBox.rectangle.top), new Phaser.Geom.Point(this.boundingBox.rectangle.right, this.boundingBox.rectangle.top), new Phaser.Geom.Point(this.boundingBox.rectangle.right, this.boundingBox.rectangle.bottom), new Phaser.Geom.Point(this.boundingBox.rectangle.left, this.boundingBox.rectangle.bottom)];
    this.boundingBox.points = points;

    //set segments
    for (var i = 0, length = this.boundingBox.points.length; i < length; i++) {
      if (i + 1 < length) this.boundingBox.segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y));else this.boundingBox.segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[0].x, points[0].y));
    }
  },
  /**
  * Map game objects
  *
  * @method Raycaster#mapGameObjects
  * @memberof Raycaster
  * @instance
  * @since 0.6.0
  *
  * @param {object|object[]} objects - Game object / matter body or array of game objects / matter bodies to map.
  * @param {boolean} [dynamic = false] - {@link Raycaster.Map Raycaster.Map} dynamic flag (determines map will be updated automatically).
  * @param {object} [options] - Additional options for {@link Raycaster.Map Raycaster.Map}
  *
  * @return {Raycaster} {@link Raycaster Raycaster} instance
  */
  mapGameObjects: function mapGameObjects(objects) {
    var dynamic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options.dynamic = dynamic;
    options.segmentCount = options.segmentCount !== undefined ? options.segmentCount : this.segmentCount;
    if (!Array.isArray(objects)) objects = [objects];
    var _iterator = _createForOfIteratorHelper(objects),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var object = _step.value;
        if (this.mappedObjects.includes(object)) continue;

        //if object is not supported
        if (object.data && object.data.get('raycasterMapNotSupported')) continue;
        var config = {};
        for (var option in options) {
          config[option] = options[option];
        }
        config.object = object;
        var map = new this.Map(config, this);
        if (map.notSupported) {
          map.destroy();
          continue;
        }
        if (object.type === 'body' || object.type === 'composite') {
          object.raycasterMap = map;
        } else if (!object.data) {
          object.setDataEnabled();
          object.data.set('raycasterMap', map);
        } else {
          object.data.set('raycasterMap', map);
        }
        this.mappedObjects.push(object);

        //update stats            
        switch (object.type) {
          case 'Polygon':
            this._stats.mappedObjects.polygonMaps++;
            break;
          case 'Arc':
            this._stats.mappedObjects.circleMaps++;
            break;
          case 'Line':
            this._stats.mappedObjects.lineMaps++;
            break;
          case 'Container':
            this._stats.mappedObjects.containerMaps++;
            break;
          case 'StaticTilemapLayer':
            this._stats.mappedObjects.tilemapMaps++;
            break;
          case 'DynamicTilemapLayer':
            this._stats.mappedObjects.tilemapMaps++;
            break;
          case 'TilemapLayer':
            this._stats.mappedObjects.tilemapMaps++;
            break;
          case 'MatterBody':
            this._stats.mappedObjects.matterMaps++;
            break;
          default:
            this._stats.mappedObjects.rectangleMaps++;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    this._stats.mappedObjects.total = this.mappedObjects.length;
    this._stats.mappedObjects.static = this._stats.mappedObjects.total - this.dynamicMappedObjects.length;
    return this;
  },
  /**
  * Remove game object's {@link Raycaster.Map Raycaster.Map} maps.
  *
  * @method Raycaster#removeMappedObjects
  * @memberof Raycaster
  * @instance
  * @since 0.6.0
  *
  * @param {(object|object[])} objects - Game object or array of game objects which maps will be removed.
  *
  * @return {Raycaster} {@link Raycaster Raycaster} instance
  */
  removeMappedObjects: function removeMappedObjects(objects) {
    if (!Array.isArray(objects)) objects = [objects];
    var _iterator2 = _createForOfIteratorHelper(objects),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var object = _step2.value;
        //remove object from mapped objects list
        var index = this.mappedObjects.indexOf(object);
        if (index === -1) {
          continue;
        }
        this.mappedObjects.splice(index, 1);

        //remove object from dynamic mapped objects list
        index = this.dynamicMappedObjects.indexOf(object);
        if (index >= 0) this.dynamicMappedObjects.splice(index, 1);
        if (object.type === 'body' || object.type === 'composite') {
          object.raycasterMap.destroy();
        } else {
          object.data.get('raycasterMap').destroy();
        }

        //update stats            
        switch (object.type) {
          case 'Polygon':
            this._stats.mappedObjects.polygonMaps--;
            break;
          case 'Arc':
            this._stats.mappedObjects.circleMaps--;
            break;
          case 'Line':
            this._stats.mappedObjects.lineMaps--;
            break;
          case 'Container':
            this._stats.mappedObjects.containerMaps--;
            break;
          case 'StaticTilemapLayer':
            this._stats.mappedObjects.tilemapMaps--;
            break;
          case 'DynamicTilemapLayer':
            this._stats.mappedObjects.tilemapMaps--;
            break;
          case 'TilemapLayer':
            this._stats.mappedObjects.tilemapMaps--;
            break;
          case 'MatterBody':
            this._stats.mappedObjects.matterMaps--;
            break;
          default:
            this._stats.mappedObjects.rectangleMaps--;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    this._stats.mappedObjects.total = this.mappedObjects.length;
    this._stats.mappedObjects.dynamic = this.dynamicMappedObjects.length;
    this._stats.mappedObjects.static = this._stats.mappedObjects.total - this.dynamicMappedObjects.length;
    return this;
  },
  /**
  * Enable game object's {@link Raycaster.Map Raycaster.Map} maps.
  *
  * @method Raycaster#enableMaps
  * @memberof Raycaster
  * @instance
  * @since 0.7.2
  *
  * @param {(object|object[])} objects - Game object or array of game objects which maps will be enabled.
  *
  * @return {Raycaster} {@link Raycaster Raycaster} instance
  */
  enableMaps: function enableMaps(objects) {
    if (!Array.isArray(objects)) objects = [objects];
    var _iterator3 = _createForOfIteratorHelper(objects),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var object = _step3.value;
        var map = void 0;
        if (object.type === 'body' || object.type === 'composite') {
          map = object.raycasterMap;
        } else if (object.data) {
          map = object.data.get('raycasterMap');
        }
        if (map) map.active = true;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return this;
  },
  /**
  * Disable game object's {@link Raycaster.Map Raycaster.Map} maps.
  *
  * @method Raycaster#disableMaps
  * @memberof Raycaster
  * @instance
  * @since 0.7.2
  *
  * @param {(object|object[])} objects - Game object or array of game objects which maps will be disabled.
  *
  * @return {Raycaster} {@link Raycaster Raycaster} instance
  */
  disableMaps: function disableMaps(objects) {
    if (!Array.isArray(objects)) objects = [objects];
    var _iterator4 = _createForOfIteratorHelper(objects),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var object = _step4.value;
        var map = void 0;
        if (object.type === 'body' || object.type === 'composite') {
          map = object.raycasterMap;
        } else if (object.data) {
          map = object.data.get('raycasterMap');
        }
        if (map) map.active = false;
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return this;
  },
  /**
  * Updates all {@link Raycaster.Map Raycaster.Map} dynamic maps. Fired on Phaser.Scene update event.
  *
  * @method Raycaster#update
  * @memberof Raycaster
  * @instance
  * @since 0.6.0
  * 
  * @return {Raycaster} {@link Raycaster Raycaster} instance
  */
  update: function update() {
    //update dynamic maps
    if (this.dynamicMappedObjects.length > 0) {
      var _iterator5 = _createForOfIteratorHelper(this.dynamicMappedObjects),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var mapppedObject = _step5.value;
          var map = void 0;
          if (mapppedObject.type === 'body' || mapppedObject.type === 'composite') {
            map = mapppedObject.raycasterMap;
          } else if (mapppedObject.data) {
            map = mapppedObject.data.get('raycasterMap');
          }
          if (!map) continue;
          if (map.active) {
            map.updateMap();
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }

    //debug
    if (this.debugOptions.enabled) this.drawDebug();
    return this;
  },
  /**
  * Create {@link Raycaster.Ray Raycaster.Ray} object.
  *
  * @method Raycaster#createRay
  * @memberof Raycaster
  * @instance
  * @since 0.6.0
  *
  * @param {object} [options] - Ray's congfiguration options. May include:
  * @param {Phaser.Geom.Point|Point} [options.origin = {x:0, y:0}] - Ray's position.
  * @param {number} [options.angle = 0] - Ray's angle in radians.
  * @param {number} [options.angleDeg = 0] - Ray's angle in degrees.
  * @param {number} [options.cone = 0] - Ray's cone angle in radians.
  * @param {number} [options.coneDeg = 0] - Ray's cone angle in degrees.
  * @param {number} [options.range = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
  * @param {number} [options.collisionRange = Phaser.Math.MAX_SAFE_INTEGER] - Ray's maximum collision range of ray's field of view.
  * @param {number} [options.detectionRange = Phaser.Math.MAX_SAFE_INTEGER] - Maximum distance between ray's position and tested objects bounding boxes.
  * @param {boolean} [options.ignoreNotIntersectedRays = true] - If set true, ray returns false when it didn't hit anything. Otherwise returns ray's target position.
  * @param {boolean} [options.autoSlice = false] - If set true, ray will automatically slice intersections into array of triangles and store it in {@link Raycaster.Ray#slicedIntersections Ray.slicedIntersections}.
  * @param {boolean} [options.round = false] - If set true, point where ray hit will be rounded.
  * @param {(boolean|'arcade'|'matter')} [options.enablePhysics = false] - Add to ray physics body. Body will be a circle with radius equal to {@link Raycaster.Ray#collisionRange Ray.collisionRange}. If set true, arcade physics body will be added.
  *
  * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
  */
  createRay: function createRay() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new this.Ray(options, this);
  },
  /**
  * Get raycaster statistics.
  *
  * @method Raycaster#getStats
  * @memberof Raycaster
  * @instance
  * @since 0.10.0
  *
  * @return {object} Raycaster statistics.
  */
  getStats: function getStats() {
    return this._stats;
  },
  /**
  * Draw maps in debug mode
  *
  * @method Raycaster#drawDebug
  * @memberof Raycaster
  * @private
  * @since 0.10.0
  * 
  * @return {Raycaster} {@link Raycaster Raycaster} instance
  */
  drawDebug: function drawDebug() {
    if (this.graphics === undefined || !this.debugOptions.enabled) return this;

    //clear
    this.graphics.clear();
    if (!this.debugOptions.maps) return this;
    var _iterator6 = _createForOfIteratorHelper(this.mappedObjects),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var object = _step6.value;
        var map = void 0;
        if (object.type === 'body' || object.type === 'composite') map = object.raycasterMap;else if (object.data) map = object.data.get('raycasterMap');
        if (!map) continue;

        //draw bounding box
        if (this.debugOptions.graphics.mapBoundingBox) {
          this.graphics.lineStyle(1, this.debugOptions.graphics.mapBoundingBox);
          this.graphics.strokeRectShape(map.getBoundingBox());
        }

        //draw segments
        if (this.debugOptions.graphics.mapSegment) {
          this.graphics.lineStyle(1, this.debugOptions.graphics.mapSegment);
          var _iterator7 = _createForOfIteratorHelper(map.getSegments()),
            _step7;
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var segment = _step7.value;
              this.graphics.strokeLineShape(segment);
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }

        //draw points
        if (this.debugOptions.graphics.mapPoint) {
          this.graphics.fillStyle(this.debugOptions.graphics.mapPoint);
          var _iterator8 = _createForOfIteratorHelper(map.getPoints()),
            _step8;
          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var point = _step8.value;
              this.graphics.fillPoint(point.x, point.y, 3);
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    return this;
  },
  /**
   * Destroy object and all mapped objects.
   *
   * @method Raycaster#destroy
   * @memberof Raycaster
   * @instance
   * @since 0.10.3
   */
  destroy: function destroy() {
    this.removeMappedObjects(this.mappedObjects);
    if (this.graphics) this.graphics.destroy();
    if (this.scene) {
      this.scene.events.removeListener('update', null, this);
    }
    for (var key in this) {
      delete this[key];
    }
  }
};
Raycaster.prototype.Map = (__webpack_require__(/*! ./map/map-core.js */ "./src/map/map-core.js").Map);
Raycaster.prototype.Ray = (__webpack_require__(/*! ./ray/ray-core.js */ "./src/ray/ray-core.js").Ray);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=phaser-raycaster.js.map