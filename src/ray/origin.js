/**
 * Set ray's source position.
 *
 * @method Raycaster.Ray#setOrigin
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {integer} x - X coordinate.
 * @param {integer} y - Y coordinate.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setOrigin(x, y) {
    this.origin.setTo(x, y);
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);
    return this;
}
