/**
 * Set ray's angle (direction) in radians.
 *
 * @method Raycaster.Ray#setAngle
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {float} [angle = 0] - Ray's angle in radians.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setAngle(angle = 0) {
    this.angle = Phaser.Math.Angle.Normalize(angle);
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    return this;
}

/**
 * Set ray's angle (direction) in degrees.
 *
 * @method Raycaster.Ray#setAngleDeg
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.1
 *
 * @param {float} [angle = 0] - Ray's angle in degrees.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setAngleDeg(angle = 0) {
    this.angle = Phaser.Math.Angle.Normalize(Phaser.Math.DegToRad(angle));
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    return this;
}
