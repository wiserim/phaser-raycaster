/*Map methods for lines*/
/**
 * Get array of points for line.
 *
 * @function Map._getLinePoints
 * @since 0.6.0
 *
 * @param {object} [ray] - Ray object.
 *
 * @return {array} Array of points.
 */
export function getPoints(ray = false) {
    return this._points;
};

/**
 * Get array of segments representing line.
 *
 * @function Map._getLineSegments
 * @since 0.6.0
 *
 *
 * @return {array} Array of Phaser.Geom.Line objects.
 */
export function getSegments() {
    return this._segments;
};

/**
 * Update line's map of points and segments.
 *
 * @function Map._updateLineMap
 * @since 0.6.0
 *
 *
 * @return {object} Map object.
 */
export function updateMap() {
    let points = [];
    let segments = [];
    
    //calculate offset based on object position and origin point
    let offset = new Phaser.Geom.Point();
    offset.x = this.object.x - this.object.displayWidth * this.object.originX;
    offset.y = this.object.y - this.object.displayHeight * this.object.originY;
    let pointA = this.object.geom.getPointA();
    let pointB = this.object.geom.getPointB();

    //calculate positions after object's rotation
    let rotation = this.object.rotation;
    if(rotation !== 0) {
        let vectorA = new Phaser.Geom.Line(this.object.x, this.object.y, pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y);
        Phaser.Geom.Line.SetToAngle(vectorA, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vectorA) + rotation, Phaser.Geom.Line.Length(vectorA));
        pointA = vectorA.getPointB();

        let vectorB = new Phaser.Geom.Line(this.object.x, this.object.y, pointB.x * this.object.scaleX + offset.x, pointB.y * this.object.scaleY + offset.y);
        Phaser.Geom.Line.SetToAngle(vectorB, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vectorB) + rotation, Phaser.Geom.Line.Length(vectorB));
        pointB = vectorB.getPointB();

        //set points
        points.push(new Phaser.Geom.Point(pointA.x, pointA.y));
        points.push(new Phaser.Geom.Point(pointB.x, pointB.y));
        //set segment
        segments.push(new Phaser.Geom.Line(pointA.x, pointA.y, pointB.x, pointB.y));
    }
    //if rotation === 0
    else {
        //set points
        points.push(new Phaser.Geom.Point(pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y));
        points.push(new Phaser.Geom.Point(pointB.x * this.object.scaleX + offset.x, pointB.y * this.object.scaleY + offset.y));
        //set segment
        segments.push(new Phaser.Geom.Line(pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y, pointB.x + offset.x * this.object.scaleX, pointB.y * this.object.scaleY + offset.y));
    }
    

    this._points = points;
    this._segments = segments;
    return this;
};
