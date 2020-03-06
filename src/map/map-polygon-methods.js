/**
* @author       Marcin Walczak <mail@marcinwalczak.pl>
* @copyright    2020 Marcin Walczak
* @license      {@link https://github.com/wiserim/phaser-raycaster/blob/master/LICENSE|MIT License}
*/

/*Map methods for polygons*/
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
