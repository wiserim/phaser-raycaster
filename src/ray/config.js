/**
 * Configure ray.
 *
 * @method Raycaster.Ray#config
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {object} [options] - Ray's congfiguration options. May include:
 * @param {Phaser.Geom.Point} [options.origin = {x:0, y:0}] - Ray's position.
 * @param {float} [options.angle = 0] - Ray's angle in radians.
 * @param {float} [options.angleDeg = 0] - Ray's angle in degrees.
 * @param {float} [options.cone = 0] - Ray's cone angle in radians.
 * @param {float} [options.coneDeg = 0] - Ray's cone angle in degrees.
 * @param {integer} [options.range = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
 * @param {integer} [options.detectionRange = Phaser.Math.MAX_SAFE_INTEGER] - Maximum distance between ray's position and tested objects bounding boxes.
 * @param {boolean} [options.ignoreNotIntersectedRays = true] - If set true, ray returns false when it didn't hit anything. Otherwise returns ray's target position.
 * @param {boolean} [options.autoSlice = false] - If set true, ray will automatically slice intersections into array of triangles and store it in {@link Raycaster.Ray#slicedIntersections Ray.slicedIntersections}.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function config(options) {
    this.object = options.object;
    //origin
    if(options.origin !== undefined)
        this.origin.setTo(options.origin.x, options.origin.y);

    //angle
    if(options.angle !== undefined)
        this.angle = Phaser.Math.Angle.Normalize(options.angle);

    //angle deg
    if(options.angleDeg !== undefined)
        this.angle = Phaser.Math.Angle.Normalize(Phaser.Math.DegToRad(options.angleDeg));

    //cone angle
    if(options.cone !== undefined)
        this.cone = options.cone;

    //cone angle deg
    if(options.coneDeg !== undefined)
        this.cone = Phaser.Math.DegToRad(options.coneDeg);

    //range (0 = max)
    if(options.range !== undefined)
        this.range = options.range;

    //detection range (0 = max)
    if(options.detectionRange !== undefined)
        this.detectionRange = options.detectionRange;

    //ignore not intersected rays
    if(options.ignoreNotIntersectedRays !== undefined)
        this.ignoreNotIntersectedRays = (options.ignoreNotIntersectedRays == true)

    //auto slice
    if(options.autoSlice !== undefined)
        this.autoSlice = (options.autoSlice == true)
    
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);

    return this;
}
