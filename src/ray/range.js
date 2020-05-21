/**
 * Set ray's range.
 *
 * @method Raycaster.Ray#setRayRange
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {integer} [rayRange = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setRayRange(rayRange = Phaser.Math.MAX_SAFE_INTEGER) {
    this.rayRange = rayRange;
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.rayRange);
    return this;
}

/**
 * Set ray's maximum detection range. Objects outside detection range won't be tested.
 * Ray tests all objects when set to 0.
 *
 * @method Raycaster.Ray#setDetectionRange
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {integer} [detectionRange = 0] - Maximum distance between ray's position and tested objects bounding boxes.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setDetectionRange(detectionRange = 0) {
    this.detectionRange = detectionRange;
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);
    return this;
}

/**
 * Set ray's field of view maximum collision range. Objects outside collision range won't be tested by {@link Raycaster.Ray#overlap Raycaster.Ray.overlap} method.
 * Determines ray's physics body radius.
 *
 * @method Raycaster.Ray#setCollisionRange
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 * @param {integer} [collisionRange = Phaser.Math.MAX_SAFE_INTEGER] - Ray's collision range and physics body radius.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setCollisionRange(collisionRange = Phaser.Math.MAX_SAFE_INTEGER) {
    this.collisionRange = collisionRange;
    if(this.body) {
        this.arcadePhysicsCircle.setRadius(this.collisionRange);
        this.body.setCircle(this.collisionRange);
    }
    return this;
}

/**
 * Test if object's bounding box is in ray's detection range.
 *
 * @method Raycaster.Ray#boundsInRange
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {object} object - Tested object
 * @param {(Phaser.Geom.Rectangle|boolean)} [bounds = false] - Tested object's bounds. If not passed bounds will be generated automatically.
 *
 * @return {boolean} Information if object is in ray's detection range.
 */
export function boundsInRange(object, bounds = false) {
    if(!this.detectionRange)
        return true;

    let objectBounds;
    if(bounds)
        objectBounds = bounds;
    else
        objectBounds = object.getBounds();

    if(Phaser.Geom.Intersects.CircleToRectangle(this.detectionRangeCircle, objectBounds))
        return true;

    return false;
}
