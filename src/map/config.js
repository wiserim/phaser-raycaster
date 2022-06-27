let rectangle = require('./map-rectangle-methods.js');
let line = require('./map-line-methods.js');
let polygon = require('./map-polygon-methods.js');
let arc = require('./map-circle-methods.js');
let container = require('./map-container-methods.js');
let tilemap = require('./map-tilemap-methods.js');
let matterBody = require('./map-matterBody-methods.js');
let segmentCount = require('./segmentsCount.js');
let boundingBox = require('./boundingBox.js');

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
 * @param {integer} [options.segmentCount] - Circle map's segment count. If set to 0, map won't be generating segments and relay only on tangent points calculated for currently testing ray.
 * @param {object} [options.mapChild] - Container's child. If set, only set child will be mapped.
 * @param {boolean} [options.forceConvex] - If set true, matter body map will use convex body (hull) for non-covex bodies.
 * @param {boolean} [options.forceVerticesMapping] - If set true, matter body map will use only vertices for mapping circle bodies.
 * 
 * @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
 */
export function config(options) {
    this.object = options.object;
    //object type
    if(options.type === undefined)
        options.type = options.object.type;
    if(options.type === 'body' || options.type === 'composite')
        options.type = 'MatterBody';
    this.type = options.type;
    
    switch(options.type) {
        case 'Polygon':
            this.getPoints = polygon.getPoints;
            this.getSegments = polygon.getSegments;
            this.getBoundingBox = boundingBox.getBoundingBox;
            this.updateMap = polygon.updateMap;
            break;
        case 'Arc':
            //circle segments count
            this.segmentCount = (options.segmentCount) ? options.segmentCount : 0;
            this.circle = (options.segmentCount) ? false : true;
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
            this.mapChild = (options.mapChild) ? options.mapChild : null;
            //circle segments count
            this.segmentCount = (options.segmentCount) ? options.segmentCount : 0;
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
            this.collisionTiles = (options.collisionTiles) ? options.collisionTiles : [];
            this.getPoints = tilemap.getPoints;
            this.getSegments = tilemap.getSegments;
            this.getBoundingBox = boundingBox.getBoundingBox;
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
            this.getBoundingBox = boundingBox.getBoundingBox;
            this.updateMap = tilemap.updateMap;
            this.setCollisionTiles = tilemap.setCollisionTiles;
            //reset tilemap origin
            this.object.setOrigin(0,0);
            break;
        case 'TilemapLayer':
            //ray colliding tiles
            this.collisionTiles = (options.collisionTiles) ? options.collisionTiles : [];
            this.getPoints = tilemap.getPoints;
            this.getSegments = tilemap.getSegments;
            this.getBoundingBox = boundingBox.getBoundingBox;
            this.updateMap = tilemap.updateMap;
            this.setCollisionTiles = tilemap.setCollisionTiles;
            //reset tilemap origin
            this.object.setOrigin(0,0);
            break;
        case 'MatterBody':
            //force convex body (hull) mapping
            this.forceConvex = (options.forceConvex) ? true : false;
            //force mapping by vertices
            this.forceVerticesMapping = (options.forceVerticesMapping) ? true : false;
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

    //dynamic map
    this.dynamic = (options.dynamic == true) ? true : false;

    //enable/disable map
    this.active = (options.active !== undefined) ? options.active : true;

    return this;
}
