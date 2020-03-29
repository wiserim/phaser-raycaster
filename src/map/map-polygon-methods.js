/*Map methods for polygons*/
/**
 * Get array of polygon's points.
 *
 * @function Map._getPolygonPoints
 * @since 0.6.0
 *
 * @param {object} [ray] - Ray object.
 *
 * @return {array} Array of points.
 */
export function getPoints(ray = false) {
    if(!this.active)
        return [];
    return this._points;
};

/**
 * Get array of segments representing polygon.
 *
 * @function Map._getPolygonSegments
 * @since 0.6.0
 *
 *
 * @return {array} Array of Phaser.Geom.Line objects.
 */
export function getSegments() {
    if(!this.active)
        return [];
    return this._segments;
};

/**
 * Update polygon's map of points and segments.
 *
 * @function Map._updatePolygonMap
 * @since 0.6.0
 *
 *
 * @return {object} Map object.
 */
export function updateMap() {
    if(!this.active)
        return this;

    let points = [];
    let segments = [];
    
    //calculate offset based on object position and origin point
    let offset = new Phaser.Geom.Point();
    offset.x = this.object.x - this.object.displayWidth * this.object.originX;
    offset.y = this.object.y - this.object.displayHeight * this.object.originY;
    //set points
    //calculate positions after object's rotation
    let rotation = this.object.rotation;
    if(rotation !== 0) {
        for(let point of this.object.geom.points) {
            let vector = new Phaser.Geom.Line(this.object.x, this.object.y, point.x * this.object.scaleX + offset.x, point.y * this.object.scaleY + offset.y);
            Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
            points.push(vector.getPointB());
        }
    }
    //if rotation === 0
    else {
        for(let point of this.object.geom.points) {
            points.push(new Phaser.Geom.Point(point.x * this.object.scaleX + offset.x, point.y * this.object.scaleY + offset.y));
        }
    }

    //set segments
    for(let i = 0, length = points.length; i < length; i++) {
        if(i+1 < length)
            segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[i+1].x, points[i+1].y));   
    }
    //if polygon is closed
    if(this.object.closePath) {
        let last = points.length - 1;
        segments.push(new Phaser.Geom.Line(points[last].x, points[last].y, points[0].x, points[0].y));
    }

    this._points = points;
    this._segments = segments;

    return this;
};
