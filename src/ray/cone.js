/**
 * Set ray's cone angle in radians.
 *
 * @function Ray.setAngle
 * @since 0.7.0
 *
 * @param {float} [cone] - Ray's cone angle in radians.
 *
 * @return {object} Ray object.
 */
export function setCone(cone = 0) {
    this.cone = cone;
    return this;
}

/**
 * Set ray's cone angle in degrees.
 *
 * @function Ray.setAngleDeg
 * @since 0.7.0
 *
 * @param {float} [cone] - Ray's cone angle in degrees.
 *
 * @return {object} Ray object.
 */
export function setConeDeg(cone = 0) {
    this.cone = Phaser.Math.DegToRad(cone);
    return this;
}
