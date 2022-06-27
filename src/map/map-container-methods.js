/*Map methods for containers*/
/**
* Get array of mapped container's and its children vertices used as rays targets.
*
* @method Raycaster.Map#container.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.7.1
*
* @param {Raycatser.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
* @param {bool} [isChild] - Flag definig if it is child container.
*
* @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
*/
export function getPoints(ray = false, isChild = false) {
    if(!this.active)
        return [];

    let points = this._points;
    //calculate offset based on container position and origin point
    let offset = new Phaser.Geom.Point();
    offset.x = this.object.x - this.object.displayWidth * this.object.originX;
    offset.y = this.object.y - this.object.displayHeight * this.object.originY;

    //get tangent points of container's circles
    if(this.segmentCount == 0 && !isChild) {
        if(ray) {
            //create temporary ray
            let vector = new Phaser.Geom.Line(0, 0, ray.origin.x - offset.x, ray.origin.y - offset.y);
            Phaser.Geom.Line.SetToAngle(vector, 0, 0, Phaser.Geom.Line.Angle(vector) - this.object.rotation, Phaser.Geom.Line.Length(vector));
    
            let tempRay = ray._raycaster.createRay({
                origin: {
                    x: vector.getPointB().x,
                    y: vector.getPointB().y
                }
            });

            //calculate tangent rays
            let rayA = new Phaser.Geom.Line();
            let rayB = new Phaser.Geom.Line();
            let c;

            for(let circle of this._circles) {
                circle.points = [];
                c = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, circle.x, circle.y);

                let rayLength = Math.sqrt(Math.pow(Phaser.Geom.Line.Length(c), 2) - Math.pow(circle.radius, 2));

                //ray angle
                let angle = Phaser.Geom.Line.Angle(c);
                let dAngle = Math.asin((circle.radius) / Phaser.Geom.Line.Length(c));
                Phaser.Geom.Line.SetToAngle(rayA, ray.origin.x, ray.origin.y, angle - dAngle, rayLength);
                Phaser.Geom.Line.SetToAngle(rayB, ray.origin.x, ray.origin.y, angle + dAngle, rayLength);

                //adding tangent points
                circle.points.push(rayA.getPointB());
                circle.points.push(rayB.getPointB());
                points.push(rayA.getPointB());
                points.push(rayB.getPointB());
            }
        }
    }
    
    return points;
};

/**
* Get array of mapped container's and its children segments used to test object's intersection with ray.
*
* @method Raycaster.Map#container.getSegments
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.7.1
*
* @return {Phaser.Geom.Line[]} - Array of mapped object's segments.
*/
export function getSegments() {
    if(!this.active)
        return [];

    return this._segments;
};

/**
* Update container's and its children maps of points and segments.
*
* @method Raycaster.Map#container.updateMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.7.1
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
export function updateMap() {
    if(!this.active)
        return this;

    let points = [];
    let segments = [];
    let container = this.object;
    this._circles = [];

    //calculate offset based on container position and origin point
    let offset = new Phaser.Geom.Point();
    offset.x = this.object.x - this.object.displayWidth * this.object.originX;
    offset.y = this.object.y - this.object.displayHeight * this.object.originY;

    let rotation = container.rotation;

    if(this.mapChild) {
        this._updateChildMap(this.mapChild, points, segments, rotation, offset);
    }
    else {
        //iterate through container's children
        container.iterate(function(child){
            this._updateChildMap(child, points, segments, rotation, offset);
        }.bind(this));

        //get children intersections
        for(let i = 0, iLength = container.list.length; i < iLength; i++){
            let childA = container.list[i];
            let mapA = childA.data.get('raycasterMap');

            for(let j = i+1, jLength = container.list.length; j < jLength; j++){
                let childB = container.list[j];
                let mapB = childB.data.get('raycasterMap');
                //check if bounding boxes overlap
                if(!Phaser.Geom.Intersects.RectangleToRectangle(childA.getBounds(), childB.getBounds()))
                    continue;

                //find objects intersections
                for(let segmentA of mapA.getSegments()) {
                    for(let segmentB of mapB.getSegments()) {
                        let intersection = [];
                        if(!Phaser.Geom.Intersects.LineToLine(segmentA, segmentB, intersection))
                            continue;
                        
                        //calculate positions after container's rotation
                        if(rotation !== 0) {
                            let vector = new Phaser.Geom.Line(this.object.x, this.object.y, intersection.x * this.object.scaleX + offset.x, intersection.y * this.object.scaleY + offset.y);
                            Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
                            points.push(vector.getPointB());
                        }
                        //if rotation === 0
                        else
                            points.push(new Phaser.Geom.Point(intersection.x * container.scaleX + offset.x, intersection.y * container.scaleX + offset.y));
                    }
                }
            }
        }
    }

    this._points = points;
    this._segments = segments;

    return this;
};

/**
* Update container's child map of points and segments.
*
* @method Raycaster.Map#container._updateChildMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.10.3
*
* @param {object} [child] - Container's child object.
* @param {Phaser.Geom.Point[]} [points] - Container's mapped points.
* @param {Phaser.Geom.Line[]} [segments] - Container's mapped segments.
* @param {float} [rotation] - Container's rotation.
* @param {Phaser.Geom.Point} [offset] - Container's offset.
*/
export function _updateChildMap(child, points, segments, rotation, offset) {
    if(!child.data)
        child.setDataEnabled();

    //get child map
    let map = child.data.get('raycasterMap');
    if(!map) {
        map = new this.constructor({
            object: child,
            segmentCount: this.segmentCount
        });
        child.data.set('raycasterMap', map);
    }
    else
        map.updateMap();

    //add child points
    let childPoints = [];
    for(let point of map.getPoints(false, true)) {
        //calculate positions after container's rotation
        if(rotation !== 0) {
            let vector = new Phaser.Geom.Line(this.object.x, this.object.y, point.x * this.object.scaleX + offset.x, point.y * this.object.scaleY + offset.y);
            Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
            points.push(vector.getPointB());
        }
        //if rotation === 0
        else
            points.push(new Phaser.Geom.Point(point.x * container.scaleX + offset.x, point.y * container.scaleX + offset.y));

        childPoints.push(points[points.length - 1])
    }

    //add child segments
    for(let segment of map.getSegments()) {
        //calculate positions after container's rotation
        if(rotation !== 0) {
            let pointA = segment.getPointA();
            let pointB = segment.getPointB();
            let vectorA = new Phaser.Geom.Line(this.object.x, this.object.y, pointA.x * this.object.scaleX + offset.x, pointA.y * this.object.scaleY + offset.y);
            let vectorB = new Phaser.Geom.Line(this.object.x, this.object.y, pointB.x * this.object.scaleX + offset.x, pointB.y * this.object.scaleY + offset.y);
            Phaser.Geom.Line.SetToAngle(vectorA, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vectorA) + rotation, Phaser.Geom.Line.Length(vectorA));
            Phaser.Geom.Line.SetToAngle(vectorB, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vectorB) + rotation, Phaser.Geom.Line.Length(vectorB));

            segments.push(new Phaser.Geom.Line(vectorA.getPointB().x, vectorA.getPointB().y, vectorB.getPointB().x, vectorB.getPointB().y));
        }
        //if rotation === 0
        else
            segments.push(new Phaser.Geom.Line(segment.getPointA().x * container.scaleX + offset.x, segment.getPointA().y * container.scaleY + offset.y, segment.getPointB().x * container.scaleX + offset.x, segment.getPointB().y * container.scaleY + offset.y));
    }

    //if child's map is a circle and this.segmentsCount == 0, store transformed circles in this._circles array.
    if(map.type == 'Arc' && this.segmentCount == 0) {
        let circleOffset = new Phaser.Geom.Point();
        circleOffset.x = (map.object.x - map.object.displayWidth * (map.object.originX - 0.5)) * this.object.scaleX + offset.x;
        circleOffset.y = (map.object.y - map.object.displayHeight * (map.object.originY - 0.5))  * this.object.scaleY + offset.y;

        if(rotation !== 0) {
            let vector = new Phaser.Geom.Line(this.object.x, this.object.y, circleOffset.x, circleOffset.y)
            Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
            circleOffset = vector.getPointB();
        }

        this._circles.push(new Phaser.Geom.Circle(circleOffset.x, circleOffset.y, map.object.radius * map.object.scaleX * this.object.scaleX));
    }
    else if(map.type === 'Container') {
        for(let childMapCircle of map._circles) {
            let circleOffset = new Phaser.Geom.Point();
                circleOffset.x = childMapCircle.x * this.object.scaleX + offset.x;
                circleOffset.y = childMapCircle.y * this.object.scaleY + offset.y;

            if(rotation !== 0) {
                let vector = new Phaser.Geom.Line(this.object.x, this.object.y, circleOffset.x, circleOffset.y)
                Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
                circleOffset = vector.getPointB();
            }

            this._circles.push(new Phaser.Geom.Circle(circleOffset.x, circleOffset.y, childMapCircle.radius * this.object.scaleX));
        }
    }
}
