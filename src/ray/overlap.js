/**
 * Get game objects overlaping field of view.
 *
 * @method Raycaster.Ray#overlap
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 * @param {object|object[]} [objects] - Game object / array off game objects to test.
 *
 * @return {object[]} Array of game objects that overlaps with field of view.
 */
export function overlap(objects) {
    let targets = [];
    let bodies = false;
    let overlapCircle = new Phaser.Geom.Circle(this.origin.x, this.origin.y, this.collisionRange);

    //get bodies in range
    if(objects === undefined) {
        objects = this._raycaster.scene.physics.overlapCirc(this.origin.x, this.origin.y, this.collisionRange, true, true);
        bodies = true;
    }
    //get object's body
    else if(!Array.isArray(objects)) {
        objects = [objects];
    }
    //if objects are bodies
    if(bodies) {
        for(let body of objects) {
            if(body === this.body)
                continue;
            
            let hitbox;
            //get physics body hitbox
            if(body.isCircle) {
                hitbox = new Phaser.Geom.Circle(body.position.x + body.halfWidth, body.position.y + body.halfWidth, body.halfWidth);
            }
            else {
                hitbox = new Phaser.Geom.Rectangle(body.x, body.y, body.width, body.height);
            }

            if(this.testOverlap(hitbox))
                targets.push(body.gameObject);
        }
    }
    //if objects are game objects
    else {
        for(let object of objects) {
            let hitbox;
            //get physics body hitbox
            if(object.body.isCircle) {
                hitbox = new Phaser.Geom.Circle(object.body.position.x + object.body.halfWidth, object.body.position.y + object.body.halfWidth, object.body.halfWidth);
                if(!Phaser.Geom.Intersects.CircleToCircle(overlapCircle, hitbox))
                    continue;
            }
            else {
                hitbox = new Phaser.Geom.Rectangle(object.body.x, object.body.y, object.body.width, object.body.height);
                if(!Phaser.Geom.Intersects.CircleToRectangle(overlapCircle, hitbox))
                    continue;
            }

            if(this.testOverlap(hitbox))
                targets.push(object);
        }
    }

    return targets;
}

/**
 * Process callback for arcade physics collider / overlap.
 *
 * @method Raycaster.Ray#processOverlap
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 * @param {object} object1 - Game object passed by collider / overlap.
 * @param {object} object2 - Game object passed by collider / overlap.
 *
 * @return {boolean} Return true if game object is overlapping ray's field of view.
 */
export function processOverlap(object1, object2) {
    let target;

    if(object1._ray === this)
        target = object2;
    else if(object2._ray === this)
        target = obj1;
    else
        return false;

    return (this.overlap(target).length > 0);
}   

/**
 * Test if hitbox overlaps with field of view. Method used in {@link Raycaster.Ray#overlap Ray.overlap}.
 *
 * @method Raycaster.Ray#testOverlap
 * @memberof Raycaster.Ray
 * @instance
 * @private
 * @since 0.8.0
 *
 * @param {object} hitbox - Game object's hitbox generated inside {@link Raycaster.Ray#overlap Ray.overlap}.
 *
 * @return {boolean} True if hitbox overlaps with {@link Raycaster.Ray Raycaster.Ray} field of view.
 */
export function testOverlap(hitbox) {
    let overlap = false;

    //iterate through field of view slices to check collisions with target
    for(let slice of this.slicedIntersections) {
        //if hitbox is a circle
        if(hitbox.type == 0) {
            overlap = Phaser.Geom.Intersects.TriangleToCircle(slice, hitbox);
        }
        //if hitbox is a rectangle
        else {
            overlap = Phaser.Geom.Intersects.RectangleToTriangle(hitbox, slice);
        }

        if(overlap) {
            return true;
        }
    }

    return false;
}
