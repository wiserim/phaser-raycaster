/*Map methods for circles*/
//get points
export function getPoints(ray = false) {
    if(this._points.length > 0)
        return this._points;
    
    let points = [];
    let offset = new Phaser.Geom.Point();
    offset.x = this.object.x - this.object.displayWidth * (this.object.originX - 0.5);
    offset.y = this.object.y - this.object.displayHeight * (this.object.originY - 0.5);

    //calculate tangent rays
    if(ray) {
        let rayA = new Phaser.Geom.Line();
        let rayB = new Phaser.Geom.Line();
        let c;
        
        let rotation = this.object.rotation;
        
        if(rotation !== 0) {
            let vector = new Phaser.Geom.Line(this.object.x, this.object.y, offset.x, offset.y);
            Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
            let cB = vector.getPointB();
            c = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, cB.x, cB.y);
        }
        else { 
            c = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, offset.x, offset.y);
        }

        let rayLength = Math.sqrt(Math.pow(Phaser.Geom.Line.Length(c), 2) - Math.pow(this.object.radius * this.object.scaleX, 2));

        //ray angle
        let angle = Phaser.Geom.Line.Angle(c);
        let dAngle = Math.asin((this.object.radius * this.object.scaleX) / Phaser.Geom.Line.Length(c));
        Phaser.Geom.Line.SetToAngle(rayA, ray.origin.x, ray.origin.y, angle - dAngle, rayLength);
        Phaser.Geom.Line.SetToAngle(rayB, ray.origin.x, ray.origin.y, angle + dAngle, rayLength);

        //adding tangent points
        points.push(rayA.getPointB());
        points.push(rayB.getPointB());
    }

    return points;
};

//get segments
export function getSegments() {
    return this._segments;
};

//map update
export function updateMap() {
    if(!this.segmentCount) {
        this._points = [];
        this._segments = [];
        return this;
    }
    
    //calculate offset based on object position and origin point
    let offset = new Phaser.Geom.Point();
    offset.x = this.object.x - this.object.displayWidth * this.object.originX + this.object.radius * this.object.scaleX;
    offset.y = this.object.y - this.object.displayHeight * this.object.originY + this.object.radius * this.object.scaleY;

    //get points surrounding circle
    let points = this.object.geom.getPoints(this.segmentCount);
    let segments = []

    //set points
    //calculate positions after object's rotation
    let rotation = this.object.rotation;
    if(rotation !== 0) {
        let newPoints = [];
        for(let point of points) {
            let vector = new Phaser.Geom.Line(this.object.x, this.object.y, this.object.x + (point.x + this.object.radius) * this.object.scaleX, this.object.y + (point.y + this.object.radius) * this.object.scaleY);
            Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
            newPoints.push(vector.getPointB());
        }
        points = newPoints;
    }
    //if rotation === 0
    else {
        for(let point of points) {
            point.x = point.x * this.object.scaleX + offset.x;
            point.y = point.y * this.object.scaleY + offset.y;
        }
    }

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
