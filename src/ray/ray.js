/**
 * Set ray's position, direction (angle) and range.
 *
 * @method Raycaster.Ray#setRay
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {integer} x - X coordinate.
 * @param {integer} y - Y coordinate.
 * @param {float} [angle] - Ray's angle in radians.
 * @param {integer} [range = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setRay(x, y, angle, rayRange = Phaser.Math.MAX_SAFE_INTEGER) {
    this.origin.setTo(x, y);
    this.angle = Phaser.Math.Angle.Normalize(angle);
    this.rayRange = rayRange;

    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.rayRange);
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y, this.detectionRange);
    return this;
}
