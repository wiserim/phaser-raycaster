/**
* @author       Marcin Walczak <mail@marcinwalczak.pl>
* @copyright    2020 Marcin Walczak
* @license      {@link https://github.com/wiserim/phaser-raycaster/blob/master/LICENSE|MIT License}
*/

/**
 * @classdesc
 *
 * Raycaster class responible for creating ray objects and managing mapped objects.
 *
 * @class Raycaster
 * @constructor
 * @since 6.0.0
 *
 * @param {object} options - Ray specific configuration settings.
 */
export function Raycaster(options) {
    this.version = '0.7.3';
    this.scene;
    this.graphics;
    this.boundingBox = false;
    this.mappedObjects = [];
    this.sortedPoints = [];
    this.mapSegmentCount = 0;   //quantity of segments of map of circle

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
    //set options
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

    //set bounding box
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

    //map object
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

    //remove mapped Objects
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

    //enable maps
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

    //disable maps
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

    //scene update event listener
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

    //ray factory
    createRay: function(options = {}) {
        return new this.Ray(options, this);
    }
}

Raycaster.prototype.Map = require('./map/map-core.js').Map;
Raycaster.prototype.Ray = require('./ray/ray-core.js').Ray;
