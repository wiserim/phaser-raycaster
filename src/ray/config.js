/**
 * Configure ray on creation.
 *
 * @function Ray.config
 * @since 0.6.0
 *
 * @param {object} [options] - Ray's congfiguration options. May include:
 * - {Phaser.Types.Math.Vector2Like} [origin] = {x:0, y:0} - Ray's position.
 * - {float} [angle] = 0 - Ray's angle in radians.
 * - {float} [angleDeg] = 0 - Ray's angle in degrees.
 * - {float} [cone] = 0 - Ray's cone angle in radians.
 * - {float} [coneDeg] = 0 - Ray's cone angle in degrees.
 * - {integer} [range] = Phaser.Math.MAX_SAFE_INTEGER - Ray's range.
 * - {integer} [detectionRange] = Phaser.Math.MAX_SAFE_INTEGER - Maximum distance between ray's position and tested objects bounding boxes.
 * - {boolean} [ignoreNotIntersectedRays] = true - If set true, ray returns false when it didn't hit anything. Otherwise returns ray's target.
 *
 * @return {object} Ray object.
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

    if(options.ignoreNotIntersectedRays !== undefined)
        this.ignoreNotIntersectedRays = (options.ignoreNotIntersectedRays == true)
    
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);

    return this;
}
