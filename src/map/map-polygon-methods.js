/*Map methods for polygons*/
/**
* Get array of mapped polygon's vertices used as rays targets.
*
* @method Raycaster.Map#polygon.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
*/
export function getPoints(ray = false) {
    if(!this.active)
        return [];
    return this._points;
};

/**
* Get array of mapped polygon's segments used to test object's intersection with ray.
*
* @method Raycaster.Map#polygon.getSegments
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
* Update polygon's map of points and segments.
*
* @method Raycaster.Map#polygon.updateMap
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

    for(let i = 0, length = points.length; i < length; i++) {
        let prevPoint = i > 0 ? points[i - 1] : points.slice(-1)[0],
            nextPoint = i < length - 1 ? points[i + 1] : points[0];

        segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, nextPoint.x, nextPoint.y));
        
        points[i].neighbours = [
            prevPoint,
            nextPoint
        ];
    }

    //set segments
    for(let i = 0, length = points.length; i < length; i++) {
        if(i+1 < length)
            segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[i+1].x, points[i+1].y));   
    }
    //if polygon is not closed
    if(!this.object.closePath) {
       segments.pop();
       points[0].neighbours.shift();
       points[points.length - 1].neighbours.pop();
    }

    this._points = points;
    this._segments = segments;

    return this;
};
