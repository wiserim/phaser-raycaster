/**
 * @classdesc
 *
 * Map class responsible for mapping game objects.
 *
 * @namespace Raycaster.Map
 * @class Raycaster.Map
 * @constructor
 * @since 6.0.0
 *
 * @param {object} options - Map specific configuration settings.
 * @param {Raycaster} [raycaster] - Parent raycaster object.
 */
export function Map(options) {
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
    * @name Raycaster.Map#dynamic
    * @type {boolean}
    * @default false
    * @since 0.6.0
    */
    this.dynamic;
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
    * @param {Raycatser.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
    *
    * @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
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
    * @param {Raycatser.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
    *
    * @return {Phaser.Geom.Line[]} - Array of mapped object's segments.
    */
    this.getSegments;
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
    this.getIntersections;

    this.config(options);
    this.updateMap();

    return this;
};

Map.prototype = {
    config: require('./config.js').config
};

Map.prototype.constructor = Map;
