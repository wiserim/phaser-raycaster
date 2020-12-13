/*Matter physics methods for ray body*/
/**
 * Sets the collision category of this ray's Matter Body. This number must be a power of two between 2^0 (= 1) and 2^31.
 * Two bodies with different collision groups (see {@link #setCollisionGroup}) will only collide if their collision
 * categories are included in their collision masks (see {@link #setCollidesWith}).
 *
 * @method Raycaster.Ray#setCollisionCategory
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {number} value - Unique category bitfield.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setCollisionCategory(value) {
    this.body.collisionFilter.category = value;

    return this;
};

/**
 * Sets the collision group of this ray's Matter Body. If this is zero or two Matter Bodies have different values,
 * they will collide according to the usual rules (see {@link #setCollisionCategory} and {@link #setCollisionGroup}).
 * If two Matter Bodies have the same positive value, they will always collide; if they have the same negative value,
 * they will never collide.
 *
 * @method Raycaster.Ray#setCollisionCategory
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {number} value - Unique group index.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setCollisionGroup(value) {
    this.body.collisionFilter.group = value;

    return this;
};

/**
 * Sets the collision mask for this ray's Matter Body. Two Matter Bodies with different collision groups will only
 * collide if each one includes the other's category in its mask based on a bitwise AND, i.e. `(categoryA & maskB) !== 0`
 * and `(categoryB & maskA) !== 0` are both true.*
 *
 * @method Raycaster.Ray#setCollidesWith
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {(number|number[])} categories - A unique category bitfield, or an array of them.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */

export function setCollidesWith(categories) {
    var flags = 0;

    if (!Array.isArray(categories))
    {
        flags = categories;
    }
    else
    {
        for (var i = 0; i < categories.length; i++)
        {
            flags |= categories[i];
        }
    }

    this.body.collisionFilter.mask = flags;

    return this;
};

/**
 * The callback is sent a `Phaser.Types.Physics.Matter.MatterCollisionData` object.
 * 
 * This does not change the bodies collision category, group or filter. Those must be set in addition
 * to the callback.
 *
 * @method Raycaster.Ray#setOnCollide
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {function} callback - The callback to invoke when this body starts colliding with another.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setOnCollide(callback) {
    let self = this;
    this.body.onCollideCallback = function(collisionInfo) {
        if(collisionInfo.rayCollided) {
            callback(collisionInfo);
        }
        else if(self.processOverlap(collisionInfo)) {
            collisionInfo.rayCollided = true;
            callback(collisionInfo);
        }
    };

    return this;
};

/**
 * The callback is sent a `Phaser.Types.Physics.Matter.MatterCollisionData` object.
 * 
 * This does not change the bodies collision category, group or filter. Those must be set in addition
 * to the callback.
 *
 * @method Raycaster.Ray#setOnCollideEnd
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {function} callback - The callback to invoke when this body stops colliding with another.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setOnCollideEnd(callback) {
    this.body.onCollideEndCallback = function(collisionInfo) {
        if(collisionInfo.rayCollided) {
            collisionInfo.rayCollided = false;
            callback(collisionInfo);
        }
    }

    return this;
};

/**
 * The callback is sent a `Phaser.Types.Physics.Matter.MatterCollisionData` object.
 * 
 * This does not change the bodies collision category, group or filter. Those must be set in addition
 * to the callback.
 *
 * @method Raycaster.Ray#setOnCollideActive
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {function} callback - The callback to invoke for the duration of this body colliding with another.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setOnCollideActive(callback) {
    let self = this;
    let func = function(collisionInfo) {
        if(self.processOverlap(collisionInfo)) {
            let body = collisionInfo.bodyA.label === 'phaser-raycaster-ray-body' ? collisionInfo.bodyB : collisionInfo.bodyA;

            if(collisionInfo.rayCollided !== true) {
                collisionInfo.rayCollided = true;
                if(self.body.onCollideCallback) {
                    self.body.onCollideCallback(collisionInfo);
                }

                if(self.body.onCollideWith !== undefined && self.body.onCollideWith[body.id]) {
                    self.body.onCollideWith[body.id](body, collisionInfo);
                }
            }
            if(callback)
                callback(collisionInfo);
        }
        else {
            if(self.body.onCollideEndCallback && collisionInfo.rayCollided === true) {
                self.body.onCollideEndCallback(collisionInfo);
            }
        }
    }

    this.body.onCollideActiveCallback = func;

    return this;
}

/**
 * The callback is sent a reference to the other body, along with a `Phaser.Types.Physics.Matter.MatterCollisionData` object.
 * 
 * This does not change the bodies collision category, group or filter. Those must be set in addition
 * to the callback.
 *
 * @method Raycaster.Ray#setOnCollideWith
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.9.1
 *
 * @param {(MatterJS.Body|MatterJS.Body[])} body - The body, or an array of bodies, to test for collisions with.
 * @param {function} callback - The callback to invoke when this body collides with the given body or bodies.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function setOnCollideWith(body, callback) {
    let self = this;
    let func = function(body, collisionInfo) {
        if(collisionInfo.rayCollided) {
            callback(body, collisionInfo);
        }
        else if(self.processOverlap(collisionInfo)) {
            collisionInfo.rayCollided = true;
            callback(body, collisionInfo);
        }
    }

    if (!Array.isArray(body))
    {
        body = [ body ];
    }

    for (var i = 0; i < body.length; i++)
    {
        var src = (body[i].hasOwnProperty('body')) ? body[i].body : body[i];

        this.body.setOnCollideWith(src, func);
    }

    return this;
};
