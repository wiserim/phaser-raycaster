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

    this.config(options);
    this.updateMap();

    return this;
};

Map.prototype = {
    config: require('./config.js').config
};

Map.prototype.constructor = Map;
