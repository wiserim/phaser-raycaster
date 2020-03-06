/**
 * Set ray's position.
 *
 * @function Ray.setOrigin
 * @since 0.6.0
 *
 * @param {integer} x - X coordinate.
 * @param {integer} y - Y coordinate.
 *
 * @return {object} Ray object.
 */
export function setOrigin(x, y) {
    this.origin.setTo(x, y);
    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);
    return this;
}
