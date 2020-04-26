/*Map methods for rectangles*/
/**
* Get array of mapped rectangle's vertices used as rays targets.
*
* @method Raycaster.Map#rectangle.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.6.0
*
* @param {Raycatser.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
*/
export function getPoints(ray = false) {
    if(!this.active)
        return [];
    return this._points;
};

/**
* Get array of mapped rectangle's segments used to test object's intersection with ray.
*
* @method Raycaster.Map#rectangle.getSegments
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
* Update rectangle's map of points and segments.
*
* @method Raycaster.Map#rectangle.updateMap
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

    //set points
    points = [
        this.object.getTopLeft(),
        this.object.getTopRight(),
        this.object.getBottomRight(),
        this.object.getBottomLeft()
    ];

    //set segments
    for(let i = 0, length = points.length; i < length; i++) {
        if(i+1 < length)
        segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[i+1].x, points[i+1].y));
        else
        segments.push(new Phaser.Geom.Line(points[i].x, points[i].y, points[0].x, points[0].y));
    }

    this._points = points;
    this._segments = segments;

    return this;
};
