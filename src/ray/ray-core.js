/**
 * @classdesc
 *
 * Ray class responible for casting ray's and testing their collisions with mapped objects.
 *
 * @class Ray
 * @memberof Raycaster
 * @constructor
 * @since 6.0.0
 *
 * @param {object} options - Ray specific configuration settings.
 * @param {Raycaster} [raycaster] - Parent raycaster object.
 */
export function Ray(options, raycaster) {
    this.origin = new Phaser.Geom.Point();
    this._ray = new Phaser.Geom.Line();
    this.angle = 0;
    this.cone = 0;
    this.range = Phaser.Math.MAX_SAFE_INTEGER;
    this.detectionRange = 0;
    this.detectionRangeCircle = new Phaser.Geom.Circle();
    this.ignoreNotIntersectedRays = true;
    this.intersections = [];
    this._raycaster = raycaster ? raycaster : false;

    this.config(options);
};

Ray.prototype = {
    config: require('./config.js').config,
    setRay: require('./ray.js').setRay,    
    setOrigin: require('./origin.js').setOrigin,
    setRange: require('./range.js').setRange,
    setAngle: require('./angle.js').setAngle,
    setAngleDeg: require('./angle.js').setAngleDeg,
    setCone: require('./cone.js').setCone,
    setConeDeg: require('./cone.js').setConeDeg,
    setDetectionRange: require('./range.js').setDetectionRange,
    boundsInRange: require('./range.js').boundsInRange,
    cast: require('./cast.js').cast,
    castCircle: require('./castCircle.js').castCircle,
    castCone: require('./castCone.js').castCone
};
