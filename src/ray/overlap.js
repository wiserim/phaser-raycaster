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
    let overlapCircle = new Phaser.Geom.Circle(this.origin.x, this.origin.y, this.collisionRange);

    //matter physics
    if(this.bodyType === 'matter') {
        let isCollisionInfo = false;
        if(objects === undefined) {
            objects = this._raycaster.scene.matter.query.collides(this.body, this._raycaster.scene.matter.getMatterBodies());

            for(let object of objects) {   
                let body = object.bodyA === this.body ? object.bodyB : object.bodyA;

                if(this.testMatterOverlap(body))
                    targets.push(body);
            }
        }
        //get object's body
        else {
            if(!Array.isArray(objects))
                objects = [objects];
            
            for(let object of objects) {
                if(object === this.body)
                    continue;
    
                if(this.testMatterOverlap(object))
                    targets.push(object);
            }
        }
    }
    //arcade physics
    else {
        let bodies = false;
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
                if(object.body === undefined)
                    continue;

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

                if(this.testArcadeOverlap(hitbox))
                    targets.push(object);
            }
        }
    }

    return targets;
}

/**
 * Process callback for physics collider / overlap.
 *
 * @method Raycaster.Ray#processOverlap
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 * @param {object} object1 - Game object or matter body passed by collider / overlap or matter CollisionInfo object.
 * @param {object} object2 - Game object or matter body passed by collider / overlap. Ignored if matter CollisionInfo object was passed as first argument.
 *
 * @return {boolean} Return true if game object is overlapping ray's field of view.
 */
export function processOverlap(object1, object2) {
    let target;
    //check if it's matter collisionInfo object
    if(object1.bodyA !== undefined && object1.bodyB !== undefined) {
        object2 = object1.bodyB;
        object1 = object1.bodyA;
    }

    if(object1._ray !== undefined && object1._ray === this)
        target = object2;
    else if(object2._ray !== undefined && object2._ray === this)
        target = object1;
    else
        return false;

    return (this.overlap(target).length > 0);
}   

/**
 * Test if hitbox overlaps with field of view. Method used in {@link Raycaster.Ray#overlap Ray.overlap}.
 *
 * @method Raycaster.Ray#testArcadeOverlap
 * @memberof Raycaster.Ray
 * @instance
 * @private
 * @since 0.8.0
 *
 * @param {object} hitbox - Game object's hitbox generated inside {@link Raycaster.Ray#overlap Ray.overlap}.
 *
 * @return {boolean} True if hitbox overlaps with {@link Raycaster.Ray Raycaster.Ray} field of view.
 */
export function testArcadeOverlap(hitbox) {
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

/**
 * Test if matter body overlaps with field of view. Method used in {@link Raycaster.Ray#overlap Ray.overlap}.
 *
 * @method Raycaster.Ray#testMatterOverlap
 * @memberof Raycaster.Ray
 * @instance
 * @private
 * @since 0.9.0
 *
 * @param {object} body - Matter body.
 *
 * @return {boolean} True if body overlaps with {@link Raycaster.Ray Raycaster.Ray} field of view.
 */
export function testMatterOverlap(object) {
    let overlap = false;
    let body;

    if(object.type === 'body')
        body = object;
    else if(object.body !== undefined)
        body = object.body;
    else
        return false;

    //if body is concave, ignore convex body
    let parts = body.parts.length > 1 ? body.parts.splice(1) : body.parts;
    //iterate through bodies
    for(let part of parts) {
        let pointA = part.vertices[0];

        for(let i = 1, length = part.vertices.length; i < length; i++) {
            let pointB = part.vertices[i];
            let segment = new Phaser.Geom.Line(pointA.x, pointA.y, pointB.x, pointB.y);

            //iterate through field of view slices to check collisions with target
            for(let slice of this.slicedIntersections) {
                let overlap = Phaser.Geom.Intersects.TriangleToLine(slice, segment);
                //additional checking if slice contain segment's points due to TriangleToLine bug.
                if(!overlap)
                    overlap = Phaser.Geom.Triangle.ContainsPoint(slice, segment.getPointA());
                if(!overlap)
                    overlap = Phaser.Geom.Triangle.ContainsPoint(slice, segment.getPointB());

                if(overlap) {
                    return true;
                }
            }
            pointA = pointB;
        }

        //closing segment
        let segment = new Phaser.Geom.Line(part.vertices[part.vertices.length - 1].x, part.vertices[part.vertices.length - 1].y, part.vertices[0].x, part.vertices[0].y);
         //iterate through field of view slices to check collisions with target
        for(let slice of this.slicedIntersections) {
            let overlap = Phaser.Geom.Intersects.TriangleToLine(slice, segment);

            if(overlap) {
                return true;
            }
        }
    }

    return false;
}
