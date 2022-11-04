/**
 * Configure ray.
 *
 * @method Raycaster.Ray#config
 * @memberof Raycaster.Ray
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

    //ray range (0 = max)
    if(options.rayRange !== undefined)
        this.rayRange = options.rayRange;

    //collision range (0 = max)
    if(options.collisionRange !== undefined)
        this.collisionRange = options.collisionRange;

    //detection range (0 = max)
    if(options.detectionRange !== undefined)
        this.detectionRange = options.detectionRange;

    //ignore not intersected rays
    if(options.ignoreNotIntersectedRays !== undefined)
        this.ignoreNotIntersectedRays = (options.ignoreNotIntersectedRays == true)
    
    //round
    if(options.round !== undefined)
        this.round = (options.round == true)

    //auto slice
    if(options.autoSlice !== undefined)
        this.autoSlice = (options.autoSlice == true)

    //enable physics
    if(options.enablePhysics !== undefined && options.enablePhysics)
        this.enablePhysics(options.enablePhysics);
    
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.rayRange);
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);

    if(this._raycaster.debugOptions.enabled && this._raycaster.scene !== undefined) {
        this.graphics =  this._raycaster.scene.add.graphics({ lineStyle: { width: 1, color: 0x00ff00}, fillStyle: { color: 0xff00ff } });
        this.graphics.setDepth(1000);
    }

    return this;
}
