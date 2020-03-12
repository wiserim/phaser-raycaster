/*Map methods for rectangles*/
/**
 * Get array of rectangle's points.
 *
 * @function Map._getRectanglePoints
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
 * Get array of segments representing rectangle.
 *
 * @function Map._getRectangleSegments
 * @since 0.6.0
 *
 *
 * @return {array} Array of Phaser.Geom.Line objects.
 */
export function getSegments() {
    return this._segments;
};

/**
 * Update rectangle's map of points and segments.
 *
 * @function Map._updateRectangleMap
 * @since 0.6.0
 *
 *
 * @return {object} Map object.
 */
export function updateMap() {
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
