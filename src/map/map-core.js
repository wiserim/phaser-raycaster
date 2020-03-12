/**
* @author       Marcin Walczak <mail@marcinwalczak.pl>
* @copyright    2020 Marcin Walczak
* @license      {@link https://github.com/wiserim/phaser-raycaster/blob/master/LICENSE|MIT License}
*/

export function Map(options, scene) {
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
};

let rectangle = require('./map-rectangle-methods.js');
let line = require('./map-line-methods.js');
let polygon = require('./map-polygon-methods.js');
let arc = require('./map-circle-methods.js');

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
    _updateArcMap: arc.updateMap
};
