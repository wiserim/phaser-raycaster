/**
 * @classdesc
 *
 * Ray class responsible for casting ray's and testing their collisions with mapped objects.
 *
 * @namespace Raycaster.Ray
 * @class Raycaster.Ray
 * @constructor
 * @since 6.0.0
 *
 * @param {object} options - Ray specific configuration settings.
 * @param {Raycaster} [raycaster] - Parent raycaster object.
 */
export function Ray(options, raycaster) {
    /**
    * Reference to parent Raycaster object.
    *
    * @name Raycaster.Ray#_raycaster
    * @type {Raycaster}
    * @private
    * @since 0.6.0
    */
    this._raycaster = raycaster ? raycaster : false;
    /**
    * Ray's source position.
    *
    * @name Raycaster.Ray#origin
    * @type {Phaser.Geom.Point}
    * @since 0.6.0
    */
    this.origin = new Phaser.Geom.Point();
    /**
    * Ray's representation used to calculating intersections.
    *
    * @name Raycaster.Ray#_ray
    * @type {Phaser.Geom.Line}
    * @private
    * @since 0.6.0
    */
    this._ray = new Phaser.Geom.Line();
    /**
    * Ray's angle in radians.
    *
    * @name Raycaster.Ray#angle
    * @type {float}
    * @default 0
    * @since 0.6.0
    */
    this.angle = 0;
    /**
    * Ray's cone width angle in radians.
    *
    * @name Raycaster.Ray#cone
    * @type {float}
    * @default 0
    * @since 0.7.0
    */
    this.cone = 0;
    /**
    * Ray's maximum range
    *
    * @name Raycaster.Ray#rayRange
    * @type {integer}
    * @default Phaser.Math.MAX_SAFE_INTEGER
    * @since 0.6.0
    */
    this.rayRange = Phaser.Math.MAX_SAFE_INTEGER;
    /**
    * Ray's maximum detection range. Objects outside detection range won't be tested.
    * Ray tests all objects when set to 0.
    *
    * @name Raycaster.Ray#detectionRange
    * @type {integer}
    * @default
    * @since 0.6.0
    */
    this.detectionRange = 0;
    /**
    * Ray's representation of detection range used in calculating if objects are in range.
    *
    * @name Raycaster.Ray#detectionRangeCircle
    * @type {Phaser.Geom.Circle}
    * @private
    * @since 0.6.0
    */
    this.detectionRangeCircle = new Phaser.Geom.Circle();
    /**
    * Ray's maximum collision range of ray's field of view. Radius of {@link Raycaster.Ray#collisionRangeCircle Ray.body}.
    *
    * @name Raycaster.Ray#collisionRange
    * @type {integer}
    * @default Phaser.Math.MAX_SAFE_INTEGER
    * @since 0.8.0
    */
    this.collisionRange = Phaser.Math.MAX_SAFE_INTEGER;
    /**
    * If set true, ray returns false when it didn't hit anything. Otherwise returns ray's target position.
    *
    * @name Raycaster.Ray#ignoreNotIntersectedRays
    * @type {boolean}
    * @default true
    * @since 0.6.0
    */
    this.ignoreNotIntersectedRays = true;
    /**
    * If set true, ray's hit points will be rounded.
    *
    * @name Raycaster.Ray#round
    * @type {boolean}
    * @default false
    * @since 0.8.1
    */
    this.round = false;
    /**
    * If set true, ray will automatically slice intersections into array of triangles and store it in {@link Raycaster.Ray#slicedIntersections Ray.slicedIntersections}.
    *
    * @name Raycaster.Ray#autoSlice
    * @type {boolean}
    * @default false
    * @since 0.8.0
    */
    this.autoSlice = false;
    /**
    * Array of intersections from last raycast representing field of view.
    *
    * @name Raycaster.Ray#intersections
    * @type {object[]}
    * @default []
    * @since 0.8.0
    */
    this.intersections = [];
    /**
    * Array of triangles representing slices of field of view from last raycast.
    *
    * @name Raycaster.Ray#slicedIntersections
    * @type {Phaser.Geom.Triangle[]}
    * @default []
    * @since 0.8.0
    */
    this.slicedIntersections = [];

    /**
    * Physics body for testing field of view collisions.
    *
    * @name Raycaster.Ray#body
    * @type {object}
    * @default undefined
    * @since 0.8.0
    */
    //this.body = false;
    /**
    * Physics body type.
    *
    * @name Raycaster.Ray#bodyType
    * @type {(bolean|'arcade'|'matter')}
    * @default false
    * @since 0.9.0
    */
    this.bodyType = false;

    //this.collisionCircle;

    this.config(options);
};

Ray.prototype = {
    config: require('./config.js').config,
    setRay: require('./ray.js').setRay,    
    setOrigin: require('./origin.js').setOrigin,
    setRayRange: require('./range.js').setRayRange,
    setAngle: require('./angle.js').setAngle,
    setAngleDeg: require('./angle.js').setAngleDeg,
    setCone: require('./cone.js').setCone,
    setConeDeg: require('./cone.js').setConeDeg,
    setDetectionRange: require('./range.js').setDetectionRange,
    boundsInRange: require('./range.js').boundsInRange,
    cast: require('./cast.js').cast,
    castCircle: require('./castCircle.js').castCircle,
    castCone: require('./castCone.js').castCone,
    slice: require('./slice.js').slice,
    setCollisionRange: require('./range.js').setCollisionRange,
    enablePhysics: require('./enablePhysics.js').enablePhysics,
    overlap: require('./overlap.js').overlap,
    processOverlap: require('./overlap.js').processOverlap,
    testArcadeOverlap: require('./overlap.js').testArcadeOverlap,
    testMatterOverlap: require('./overlap.js').testMatterOverlap
};
