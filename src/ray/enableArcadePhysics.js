/**
 * Add to ray arcade physics body. Body will be circle with radius equal to {@link Raycaster.Ray#range Ray.range}.
 *
 * @method Raycaster.Ray#enableArcadePhysics
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 *
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function enableArcadePhysics() {
    
    if(this.body !== undefined)
        return this;

    this.arcadePhysicsCircle = this._raycaster.scene.add.circle(this.origin.x, this.origin.y);
    this.arcadePhysicsCircle.setOrigin(0.5, 0.5);
    this._raycaster.scene.physics.add.existing(this.arcadePhysicsCircle);

    this.body = this.arcadePhysicsCircle.body;
    this.body.setCircle(this.collisionRange);

    return this;
}
