/**
 * Set ray's range.
 *
 * @function Ray.setRange
 * @since 0.6.0
 *
 * @param {integer} [range] = Phaser.Math.MAX_SAFE_INTEGER - Ray's range.
 *
 * @return {object} Ray object.
 */
export function setRange(range = Phaser.Math.MAX_SAFE_INTEGER) {
    this.range = range;
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    return this;
}

/**
 * Set ray's range.
 *
 * @function Ray.setRange
 * @since 0.6.0
 *
 * @param {integer} [detectionRange] = Phaser.Math.MAX_SAFE_INTEGER - Maximum distance between ray's position and tested objects bounding boxes.
 *
 * @return {object} Ray object.
 */
export function setDetectionRange(detectionRange = 0) {
    this.detectionRange = detectionRange;
    this.rangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);
    return this;
}

/**
 * Test if object's bounding box is in ray's detection range.
 *
 * @function Ray.boundsInRange
 * @since 0.6.0
 *
 * @param {object} object - Tested object
 * @param {Phaser.Geom. Rectangle} / {boolean} [bounds] = false - Tested object's bounds. If not passed bounds will be generated.
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
