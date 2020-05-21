/**
* @author       Marcin Walczak <mail@marcinwalczak.pl>
* @copyright    2020 Marcin Walczak
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
 * @param {integer} [options.mapSegmentCount = 0] - Number of segments of circle maps. If set to 0, map will be teste
 * @param {(object|object[])} [options.objects] - Game object or array of game objects to map.
 * @param {Phaser.Geom.Rectangle} [options.boundingBox] - Raycaster's bounding box.
 * @param {boolean} [options.autoUpdate = true] - If set true, automatically update dynamic maps on scene update event.
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
    this.version = '0.8.0';
    /**
    * Raycaster's scene
    *
    * @name Raycaster#version
    * @type {string}
    * @private
    * @since 0.6.0
    */
    this.scene;
    this.graphics;

    /**
    * Raycaster's bounding box.
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
    this.sortedPoints = [];
    /**
    * Number of segments of circle maps.
    *
    * @name Raycaster#mapSegmentCount
    * @type {integer}
    * @default 0
    * @since 0.6.0
    */
    this.mapSegmentCount = 0;

    if(options !== undefined) {
        if(options.boundingBox === undefined && options.scene !== undefined && options.scene.physics !== undefined)
            options.boundingBox = options.scene.physics.world.bounds;

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
    * @param {integer} [options.mapSegmentCount = 0] - Number of segments of circle maps.
    * @param {(object|object[])} [options.objects] - Game object or array of game objects to map.
    * @param {Phaser.Geom.Rectangle} [options.boundingBox] - Raycaster's bounding box.
    *
    * @return {Raycaster} {@link Raycaster Raycaster} instance
    */
    setOptions: function(options) {
        if(options.scene !== undefined) {
            this.scene = options.scene;
            this.graphics =  this.scene.add.graphics({ lineStyle: { width: 1, color: 0x00ff00}, fillStyle: { color: 0xff00ff } });
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
    * Set Raycatser's bounding box.
    *
    * @method Raycaster#setBoundingBox
    * @memberof Raycaster
    * @instance
    * @since 0.6.0
    *
    * @param {integer} x - The X coordinate of the top left corner of bounding box.
    * @param {integer} y - The Y coordinate of the top left corner of bounding box.
    * @param {integer} width - The width of bounding box.
    * @param {integer} height - The height of bounding box.
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
    * @param {object|object[]} objects - Game object or array of game objects to map.
    * @param {boolean} [dynamic = false] - {@link Raycaster.Map Raycaster.Map} dynamic flag (determines map will be updated automatically).
    * @param {object} [options] - Additional options for {@link Raycaster.Map Raycaster.Map}
    *
    * @return {Raycaster} {@link Raycaster Raycaster} instance
    */
    mapGameObjects: function(objects, dynamic = false, options = {}) {
        options.dynamic = dynamic;
        options.segmentCount = (options.segmentCount !== undefined) ? options.segmentCount : this.segmentCount;

        if(!Array.isArray(objects)) {
            if(this.mappedObjects.includes(objects))
                return this;

            if(!objects.data)
                objects.setDataEnabled();

            options.object = objects;

            let map = new this.Map(options);

            objects.data.set('raycasterMap', map);
            this.mappedObjects.push(objects);

            return this;
        }
        
        for(let object of objects) {
            if(this.mappedObjects.includes(object))
                continue;

            if(!object.data)
                object.setDataEnabled();

            let config = {};
            for(let option in options) {
                config[option] = options[option];
            }
            config.object = object;
            
            let map = new this.Map(config);

            object.data.set('raycasterMap', map);
            this.mappedObjects.push(object);
        }
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
        if(!Array.isArray(objects)) {
            let index = this.mappedObjects.indexOf(objects);
            if(index >= 0)
                this.mappedObjects.splice(index, 1)
            return this;
        }

        for(let object of objects) {
            let index = this.mappedObjects.indexOf(object);
            if(index >= 0)
                this.mappedObjects.splice(index, 1)
        }

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
        if(!Array.isArray(objects)) {
            if(objects.data) {
                let map = objects.data.get('raycasterMap');
                if(map)
                    map.active = true;
            }
                
            return this;
        }
        
        for(let object of objects) {
            if(object.data) {
                let map = object.data.get('raycasterMap');
                if(map)
                    map.active = true;
            }
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
        if(!Array.isArray(objects)) {
            if(objects.data) {
                let map = objects.data.get('raycasterMap');
                if(map)
                    map.active = false;
            }
                
            return this;
        }
        
        for(let object of objects) {
            if(object.data) {
                let map = object.data.get('raycasterMap');
                if(map)
                    map.active = false;
            }
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
    */
    update: function() {
        //update dynamic maps
        if(this.mappedObjects.length > 0)
            for(let mapppedObject of this.mappedObjects) {
                if(mapppedObject.data === undefined)
                    continue;

                let map = mapppedObject.data.get('raycasterMap')
                if(map.dynamic)
                    map.updateMap();
            }
    },

    /**
    * Create {@link Raycaster.Ray Raycaster.Ray} object.
    *
    * @method Raycaster#createRay
    * @memberof Raycaster
    * @instance
    * @since 0.6.0
    *
    * @param {object} [options] - Ray options:
    *
    * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
    */
    createRay: function(options = {}) {
        return new this.Ray(options, this);
    }
}

Raycaster.prototype.Map = require('./map/map-core.js').Map;
Raycaster.prototype.Ray = require('./ray/ray-core.js').Ray;
