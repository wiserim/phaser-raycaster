/**
 * Set ray's position, direction (angle) and range.
 *
 * @function Ray.setAngle
 * @since 0.6.0
 *
 * @param {integer} x - X coordinate.
 * @param {integer} y - Y coordinate.
 * @param {float} [angle] - Ray's angle in radians.
 * @param {integer} [range] = Phaser.Math.MAX_SAFE_INTEGER - Ray's range.
 *
 * @return {object} Ray object.
 */
export function setRay(x, y, angle, range = Phaser.Math.MAX_SAFE_INTEGER) {
    this.origin.setTo(x, y);
    this.angle = Phaser.Math.Angle.Normalize(angle);
    this.range = range;

    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);
    return this;
}