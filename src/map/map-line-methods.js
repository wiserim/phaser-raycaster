/*Map methods for lines*/

import { Geom, Math as PhaserMath } from 'phaser';

/**
* Get array of mapped line's vertices used as rays targets.
*
* @method Raycaster.Map#line.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Math.Vector2[]} - Array of mapped object's vertices.
*/
export function getPoints(ray = false) {
    if(!this.active)
        return [];
    return this._points;
};

/**
* Get array of mapped line's segments used to test object's intersection with ray.
*
* @method Raycaster.Map#line.getSegments
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @return {Phaser.Geom.Line[]} - Array of mapped object's segments.
*/
export function getSegments() {
    if(!this.active)
        return [];
    return this._segments;
};

/**
* Update line's map of points and segments.
*
* @method Raycaster.Map#line.updateMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
export function updateMap() {
    if(!this.active)
        return this;

    let points = [];
    let segments = [];
    
    //calculate offset based on object position and origin point
    let offset = new PhaserMath.Vector2();
    offset.x = this.object.x - this.object.displayWidth * this.object.originX;
    offset.y = this.object.y - this.object.displayHeight * this.object.originY;
    let pointA = this.object.geom.getPointA();
    let pointB = this.object.geom.getPointB();

    //calculate positions after object's rotation
    let rotation = this.object.rotation;
    if(rotation !== 0) {
        let vectorA = new Geom.Line(this.object.x, this.object.y, pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y);
        Geom.Line.SetToAngle(vectorA, this.object.x, this.object.y, Geom.Line.Angle(vectorA) + rotation, Geom.Line.Length(vectorA));
        pointA = vectorA.getPointB();

        let vectorB = new Geom.Line(this.object.x, this.object.y, pointB.x * this.object.scaleX + offset.x, pointB.y * this.object.scaleY + offset.y);
        Geom.Line.SetToAngle(vectorB, this.object.x, this.object.y, Geom.Line.Angle(vectorB) + rotation, Geom.Line.Length(vectorB));
        pointB = vectorB.getPointB();

        //set points
        points.push(new PhaserMath.Vector2(pointA.x, pointA.y));
        points.push(new PhaserMath.Vector2(pointB.x, pointB.y));
        //set segment
        segments.push(new Geom.Line(pointA.x, pointA.y, pointB.x, pointB.y));
    }
    //if rotation === 0
    else {
        //set points
        points.push(new PhaserMath.Vector2(pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y));
        points.push(new PhaserMath.Vector2(pointB.x * this.object.scaleX + offset.x, pointB.y * this.object.scaleY + offset.y));
        //set segment
        segments.push(new Geom.Line(pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y, pointB.x + offset.x * this.object.scaleX, pointB.y * this.object.scaleY + offset.y));
    }
    
    //assign neighbours
    points[0].neighbours = [points[1]];
    points[1].neighbours = [points[0]];

    this._points = points;
    this._segments = segments;
    return this;
};
