/**
 * Set ray angle in radians.
 *
 * @function Ray.setAngle
 * @since 0.6.0
 *
 * @param {float} [angle] - Ray's angle in radians.
 *
 * @return {object} Ray object.
 */
export function setAngle(angle = 0) {
    this.angle = Phaser.Math.Angle.Normalize(angle);
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    return this;
}

/**
 * Set ray angle in degrees.
 *
 * @function Ray.setAngleDeg
 * @since 0.6.1
 *
 * @param {float} [angle] - Ray's angle in degrees.
 *
 * @return {object} Ray object.
 */
export function setAngleDeg(angle = 0) {
    this.angle = Phaser.Math.Angle.Normalize(Phaser.Math.DegToRad(angle));
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    return this;
}
