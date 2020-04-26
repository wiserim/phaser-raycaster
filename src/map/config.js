let rectangle = require('./map-rectangle-methods.js');
let line = require('./map-line-methods.js');
let polygon = require('./map-polygon-methods.js');
let arc = require('./map-circle-methods.js');
let segmentCount = require('./segmentsCount.js');
let container = require('./map-container-methods.js');
let tilemap = require('./map-tilemap-methods.js');

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
 * @param {integer} [options.segmentCount] - Circle map's segment count. If set to 0, map won't be generating segments and relay only on tangent points calculated for currently testing ray.
 * @param {boolean} [options.active = true] - If set true, map will be active (will provide points, segments and will be updated).
 * 
 * @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
 */
export function config(options) {
    this.object = options.object;
    //object type
    if(options.type === undefined)
        options.type = options.object.type;
    this.type = options.type;
    
    switch(options.type) {
        case 'Polygon':
            this.getPoints = polygon.getPoints;
            this.getSegments = polygon.getSegments;
            this.updateMap = polygon.updateMap;
            break;
        case 'Arc':
            //circle segments count
            this.segmentCount = (options.segmentCount) ? options.segmentCount : 0;
            this.getPoints = arc.getPoints;
            this.getSegments = arc.getSegments;
            this.updateMap = arc.updateMap;
            this.setSegmentCount = segmentCount.setSegmentCount;
            break;
        case 'Line':
            this.getPoints = line.getPoints;
            this.getSegments = line.getSegments;
            this.updateMap = line.updateMap;
            break;
        case 'Container':
            this.getPoints = container.getPoints;
            this.getSegments = container.getSegments;
            this.updateMap = container.updateMap;
            break;
        case 'StaticTilemapLayer':
            //ray colliding tiles
            this.collisionTiles = (options.collisionTiles) ? options.collisionTiles : [];
            this.getPoints = tilemap.getPoints;
            this.getSegments = tilemap.getSegments;
            this.updateMap = tilemap.updateMap;
            this.setCollisionTiles = tilemap.setCollisionTiles;
            //reset tilemap origin
            this.object.setOrigin(0,0);
            break;
        case 'DynamicTilemapLayer':
            //ray colliding tiles
            this.collisionTiles = (options.collisionTiles) ? options.collisionTiles : [];
            this.getPoints = tilemap.getPoints;
            this.getSegments = tilemap.getSegments;
            this.updateMap = tilemap.updateMap;
            this.setCollisionTiles = tilemap.setCollisionTiles;
            //reset tilemap origin
            this.object.setOrigin(0,0);
            break;
        default:
            this.getPoints = rectangle.getPoints;
            this.getSegments = rectangle.getSegments;
            this.updateMap = rectangle.updateMap;
    }

    //dynamic map
    this.dynamic = (options.dynamic == true) ? true : false;

    //enable/disable map
    this.active = (options.active !== undefined) ? options.active : true;

    return this;
}
