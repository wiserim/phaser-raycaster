/*Map methods for rectangles*/
//get points
export function getPoints(ray = false) {
    return this._points;
};

//get segments
export function getSegments() {
    return this._segments;
};

//map update
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
