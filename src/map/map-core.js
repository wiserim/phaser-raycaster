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
export function Map(options) {
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
};

let rectangle = require('./map-rectangle-methods.js');
let line = require('./map-line-methods.js');
let polygon = require('./map-polygon-methods.js');
let arc = require('./map-circle-methods.js');
let container = require('./map-container-methods.js');

Map.prototype = {
    config: require('./config.js').config,
    setSegmentCount: require('./segmentsCount.js').setSegmentCount,
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
