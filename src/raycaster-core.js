/**
* @author       Marcin Walczak <contact@marcin-walczak.pl>
* @copyright    2022 Marcin Walczak
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
 * @since 6.0.0
 *
 * @param {object} [options] - Raycaster's configuration options. May include:
 * @param {Phaser.Scene} [options.scene] - Scene in which Raycaster will be used.
 * @param {number} [options.mapSegmentCount = 0] - Number of segments of circle maps. If set to 0, map will be teste
 * @param {(object|object[])} [options.objects] - Game object or array of game objects to map.
 * @param {Phaser.Geom.Rectangle} [options.boundingBox] - Raycaster's bounding box. If not passed, {@link Raycaster Raycaster} will set it's bounding box based on Arcade Physics / Matter physics world bounds.
 * @param {boolean} [options.autoUpdate = true] - If set true, automatically update dynamic maps on scene update event.
 * @param {boolean|object} [options.debug] - Enable debug mode or configure it {@link Raycaster#debugOptions debugOptions}.
 */
export function Raycaster(options) {
    /**
    * Plugin version.
    *
    * @name Raycaster#version
    * @type {string}
    * @readonly
    * @since 0.6.0
    */
    this.version = '0.11.0';
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
    * @since 0.11.0
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

    if(options !== undefined) {
        if(options.boundingBox === undefined && options.scene !== undefined) {
            if(options.scene.physics !== undefined)
                options.boundingBox = options.scene.physics.world.bounds;
            else if(options.scene.matter !== undefined) {
                let walls = options.scene.matter.world.walls;

                if(walls.top !== null) {
                    options.boundingBox = new Phaser.Geom.Rectangle(
                        walls.top.vertices[3].x,
                        walls.top.vertices[3].y,
                        walls.bottom.vertices[1].x - walls.top.vertices[3].x,
                        walls.bottom.vertices[1].y - walls.top.vertices[3].y
                    );
                }
            }
        }

        this.setOptions(options);

        if(options.autoUpdate === undefined || options.autoUpdate)
            //automatically update event
            this.scene.events.on('update', this.update.bind(this));
    }
    else
        //automatically update event
        this.scene.events.on('update', this.update.bind(this));

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
    setOptions: function(options) {
        if(options.scene !== undefined) {
            this.scene = options.scene;
            this.graphics =  this.scene.add.graphics({ lineStyle: { width: 1, color: 0x00ff00}, fillStyle: { color: 0xff00ff } });
            this.graphics.setDepth(999);
        }

        if(options.debug !== undefined && options.debug !== false) {
            this.debugOptions.enabled = true;

            if(typeof options.debug === 'object')
                Object.assign(this.debugOptions, options.debug);
        }

        if(options.mapSegmentCount !== undefined)
            this.mapSegmentCount = options.mapSegmentCount;

        if(options.objects !== undefined)
            this.mapGameObjects(options.objects);

        if(options.boundingBox !== undefined)
            this.setBoundingBox(options.boundingBox.x, options.boundingBox.y, options.boundingBox.width, options.boundingBox.height)

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
    setBoundingBox: function(x, y, width, height) {
        this.boundingBox = {
            rectangle: new Phaser.Geom.Rectangle(x, y, width, height),
            points: [],
            segments: []
        }
        //set points
        let points = [
            new Phaser.Geom.Point(this.boundingBox.rectangle.left, this.boundingBox.rectangle.top),
            new Phaser.Geom.Point(this.boundingBox.rectangle.right, this.boundingBox.rectangle.top),
            new Phaser.Geom.Point(this.boundingBox.rectangle.right, this.boundingBox.rectangle.bottom),
            new Phaser.Geom.Point(this.boundingBox.rectangle.left, this.boundingBox.rectangle.bottom)
        ];

        this.boundingBox.points = points;

        //set segments
        for(let i = 0, length = this.boundingBox.points.length; i < length; i++) {
            if(i+1 < length)
            this.boundingBox.segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[i+1].x, points[i+1].y));
            else
            this.boundingBox.segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[0].x, points[0].y));
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
    mapGameObjects: function(objects, dynamic = false, options = {}) {
        options.dynamic = dynamic;
        options.segmentCount = (options.segmentCount !== undefined) ? options.segmentCount : this.segmentCount;

        if(!Array.isArray(objects))
            objects = [objects];
        
        for(let object of objects) {
            if(this.mappedObjects.includes(object))
                continue;

            //if object is not supported
            if(object.data && object.data.get('raycasterMapNotSupported'))
                continue;

            let config = {};
            for(let option in options) {
                config[option] = options[option];
            }
            config.object = object;
            
            let map = new this.Map(config, this);
            
            if(map.notSupported) {
                map.destroy();
                continue;
            }

            if(object.type === 'body' || object.type === 'composite') {
                object.raycasterMap = map;
            }
            else if(!object.data) {
                object.setDataEnabled();
                object.data.set('raycasterMap', map);
            }
            else {
                object.data.set('raycasterMap', map);
            }

            this.mappedObjects.push(object);

            //update stats            
            switch(object.type) {
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
    removeMappedObjects: function(objects) {
        if(!Array.isArray(objects))
            objects = [objects];

        for(let object of objects) {
            //remove object from mapped objects list
            let index = this.mappedObjects.indexOf(object);
            if(index >= 0)
                this.mappedObjects.splice(index, 1);
            //remove object from dynamic mapped objects list
            index = this.dynamicMappedObjects.indexOf(object);
            if(index >= 0)
                this.dynamicMappedObjects.splice(index, 1);
            
            if(object.type === 'body' || object.type === 'composite')
                object.raycasterMap.destroy();
            else
                object.data.get('raycasterMap').destroy();
            
            //update stats            
            switch(object.type) {
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
    enableMaps: function(objects) {
        if(!Array.isArray(objects))
            objects = [objects];
        
        for(let object of objects) {
            let map;

            if(object.type === 'body' || object.type === 'composite') {
                map = object.raycasterMap;
            }
            else if(object.data) {
                map = object.data.get('raycasterMap');
            }

            if(map)
                map.active = true;
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
    disableMaps: function(objects) {
        if(!Array.isArray(objects))
            objects = [objects];
        
        for(let object of objects) {
            let map;

            if(object.type === 'body' || object.type === 'composite') {
                map = object.raycasterMap;
            }
            else if(object.data) {
                map = object.data.get('raycasterMap');
            }

            if(map)
                map.active = false;
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
    update: function() {
        //update dynamic maps
        if(this.dynamicMappedObjects.length > 0) {
            for(let mapppedObject of this.dynamicMappedObjects) {
                let map;

                if(mapppedObject.type === 'body' || mapppedObject.type === 'composite') {
                    map = mapppedObject.raycasterMap;
                }
                else if(mapppedObject.data) {
                    map = mapppedObject.data.get('raycasterMap');
                }

                if(!map)
                    continue;

                if(map.active) {
                    map.updateMap();
                }
            }
        }

        //debug
        if(this.debugOptions.enabled)
            this.drawDebug();

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
    createRay: function(options = {}) {
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
    getStats: function() {
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
     drawDebug: function() {
        if(this.graphics === undefined || !this.debugOptions.enabled)
            return this;

        //clear
        this.graphics.clear();

        if(!this.debugOptions.maps)
            return this;

        for(let object of this.mappedObjects)
        {
            let map;
        
            if(object.type === 'body' || object.type === 'composite')
                map = object.raycasterMap;
            else
                map = object.data.get('raycasterMap');
            
            if(!map)
                continue;

            //draw bounding box
            if(this.debugOptions.graphics.mapBoundingBox) {
                this.graphics.lineStyle(1, this.debugOptions.graphics.mapBoundingBox);
                this.graphics.strokeRectShape(map.getBoundingBox());
            }

            //draw segments
            if(this.debugOptions.graphics.mapSegment) {
                this.graphics.lineStyle(1, this.debugOptions.graphics.mapSegment);
                for(let segment of map.getSegments()) {
                    this.graphics.strokeLineShape(segment);
                }
            }

            //draw points
            if(this.debugOptions.graphics.mapPoint) {
                this.graphics.fillStyle(this.debugOptions.graphics.mapPoint);
                for(let point of map.getPoints()) {
                    this.graphics.fillPoint(point.x, point.y, 3)
                }
            }
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
    destroy: function() {
        this.removeMappedObjects(this.mappedObjects);

        for(let key in this) {
            delete this[key];
        }
    }
}

Raycaster.prototype.Map = require('./map/map-core.js').Map;
Raycaster.prototype.Ray = require('./ray/ray-core.js').Ray;
