/**
 * Set ray's cone angle (width) in radians.
 *
 * @method Raycaster.Ray#setCone
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.7.0
 *
 * @param {number} [cone = 0] - Ray's cone angle in radians.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setCone(cone = 0) {
    this.cone = cone;
    return this;
}

/**
 * Set ray's cone angle (width) in degrees.
 *
 * @method Raycaster.Ray#setConeDeg
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.7.0
 *
 * @param {number} [cone = 0] - Ray's cone angle in degrees.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setConeDeg(cone = 0) {
    this.cone = Phaser.Math.DegToRad(cone);
    return this;
}
