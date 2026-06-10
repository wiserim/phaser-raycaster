import { Geom, Math as PhaserMath } from 'phaser';

/**
 * Set ray's source position.
 *
 * @method Raycaster.Ray#setOrigin
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setOrigin(x, y) {
    this.origin.setTo(x, y);
    Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.rayRange);
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);

    if(this.bodyType === 'matter' && this.collisionRange !== PhaserMath.MAX_SAFE_INTEGER) {
        this.collisionCircle.x = x;
        this.collisionCircle.y = y;
    }
    else if(this.bodyType === 'arcade') {
        this.collisionCircle.x = x;
        this.collisionCircle.y = y;
    }

    return this;
}
