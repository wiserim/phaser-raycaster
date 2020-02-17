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

//config
Map.prototype = {
    config: function(options) {
        this.object = options.object;
        //object type
        if(options.type === undefined)
            options.type = options.object.type;
        this.type = options.type;

        switch(options.type) {
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
        }

        //dynamic map
        this.dynamic = (options.dynamic == true) ? true : false;
        this.segmentCount = (options.segmentCount) ? options.segmentCount : 0;

        return this;
    },

    //set segments count for circle map
    setSegmentCount: function(count) {
        this.segmentCount = count;
        this.updateMap();
        return this;
    }
};
//add methods for rectangle maps
let rectangle = require('./map-rectangle-methods.js');
Map.prototype._getRectanglePoints = rectangle.getPoints;
Map.prototype._getRectangleSegments = rectangle.getSegments;
Map.prototype._updateRectangleMap = rectangle.updateMap;

//add methods for line maps
let line = require('./map-line-methods.js');
Map.prototype._getLinePoints = line.getPoints;
Map.prototype._getLineSegments = line.getSegments;
Map.prototype._updateLineMap = line.updateMap;

//add methods for polygon maps
let polygon = require('./map-polygon-methods.js');
Map.prototype._getPolygonPoints = polygon.getPoints;
Map.prototype._getPolygonSegments = polygon.getSegments;
Map.prototype._updatePolygonMap = polygon.updateMap;

//add methods for circle maps
let arc = require('./map-circle-methods.js');
Map.prototype._getArcPoints = arc.getPoints;
Map.prototype._getArcSegments = arc.getSegments;
Map.prototype._updateArcMap = arc.updateMap;
