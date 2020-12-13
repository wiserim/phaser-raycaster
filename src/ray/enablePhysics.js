/**
 * Add to ray physics body. Body will be a circle with radius equal to {@link Raycaster.Ray#collisionRange Ray.collisionRange}. Physics body can be added only once.
 *
 * @method Raycaster.Ray#enablePhysics
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 * @param {'arcade'|'matter'} [type = 'arcade'] - Physics type
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function enablePhysics(type = 'arcade') {
    
    if(this.body !== undefined)
        return this;

    this.collisionCircle = this._raycaster.scene.add.circle(this.origin.x, this.origin.y, this.collisionRange);
    this.collisionCircle._ray = this;

    if(type === 'matter') {
        this.bodyType = 'matter';

        if(this.collisionRange == Phaser.Math.MAX_SAFE_INTEGER) {
            let bounds = this._raycaster.boundingBox;
            this._raycaster.scene.matter.add.gameObject(this.collisionCircle, { shape: { type: 'rectangle', x:bounds.rectangle.centerX, y:bounds.rectangle.centerY, width:bounds.rectangle.width, height:bounds.rectangle.height }, label: 'phaser-raycaster-ray-body', isSensor: true, ignoreGravity:true });
        }
        else {
            this._raycaster.scene.matter.add.gameObject(this.collisionCircle, { shape: { type: 'circle' }, label: 'phaser-raycaster-ray-body', isSensor: true, ignoreGravity:true });
        }

        this.body = this.collisionCircle.body;
        this.body._ray = this;
        
        this.setOnCollideActive();
    }
    else {
        this.bodyType = 'arcade';
        this._raycaster.scene.physics.add.existing(this.collisionCircle);

        this.body = this.collisionCircle.body;
        this.body
            .setCircle(this.collisionRange)
            .setAllowGravity(false)
            .setImmovable(true);
        this.body._ray = this;
    }

    return this;
}
