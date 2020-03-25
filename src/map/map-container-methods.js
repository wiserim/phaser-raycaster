/*Map methods for containers*/
/**
 * Get array of container's children points.
 *
 * @function Map._getContainerPoints
 * @since 0.7.1
 *
 * @param {object} [ray] - Ray object.
 *
 * @return {array} Array of points.
 */
export function getPoints(ray = false, getCircles = false) {
    let points = [];
    if(!getCircles)
        points = this._points;
    //calculate offset based on container position and origin point
    let offset = new Phaser.Geom.Point();
    offset.x = this.object.x - this.object.displayWidth * this.object.originX;
    offset.y = this.object.y - this.object.displayHeight * this.object.originY;

    //get tangent points of container's circles
    if(ray){
        //create temporary ray
        let vector = new Phaser.Geom.Line(0, 0, ray.origin.x - offset.x, ray.origin.y - offset.y);
        Phaser.Geom.Line.SetToAngle(vector, 0, 0, Phaser.Geom.Line.Angle(vector) - this.object.rotation, Phaser.Geom.Line.Length(vector));

        let tempRay = ray._raycaster.createRay({
            origin: {
                x: vector.getPointB().x,
                y: vector.getPointB().y
            }
        });

        for(let child of this.object.list){
            if(child.type === 'Arc'){

                let map = child.data.get('raycasterMap');
                if(map._points.length == 0){
                    for(let point of map.getPoints(tempRay, true)){
                        let vector = new Phaser.Geom.Line(0, 0, point.x, point.y);
                        Phaser.Geom.Line.SetToAngle(vector, 0, 0, Phaser.Geom.Line.Angle(vector) + this.object.rotation, Phaser.Geom.Line.Length(vector));

                        points.push(new Phaser.Geom.Point(vector.getPointB().x + offset.x, vector.getPointB().y + offset.y));
                    }
                }
            }
            else if(child.type === 'Container') {
                for(let point of child.data.get('raycasterMap').getPoints(tempRay, true)){
                    if(this.object.rotation !== 0) {
                        let vector = new Phaser.Geom.Line(this.object.x, this.object.y, point.x * this.object.scaleX + offset.x, point.y * this.object.scaleY + offset.y);
                        Phaser.Geom.Line.SetToAngle(vector, this.object.x, this.object.y, Phaser.Geom.Line.Angle(vector) + this.object.rotation, Phaser.Geom.Line.Length(vector));
                        points.push(vector.getPointB());
                    }
                    //if rotation === 0
                    else
                        points.push(new Phaser.Geom.Point(point.x * this.object.scaleX + offset.x, point.y * this.object.scaleX + offset.y));
                }
            }

        }
    }

    return points;
};

/**
 * Get array of segments representing container's children.
 *
 * @function Map._getContainerSegments
 * @since 0.7.1
 *
 *
 * @return {array} Array of Phaser.Geom.Line objects.
 */
export function getSegments(ray = false) {
    return this._segments;
};

/**
 * Update containers's map of points and segments.
 *
 * @function Map._updateContainerleMap
 * @since 0.7.1
 *
 *
 * @return {object} Map object.
 */
export function updateMap() {
    let points = [];
    let segments = [];
    let container = this.object;

    //calculate offset based on container position and origin point
    let offset = new Phaser.Geom.Point();
    offset.x = this.object.x - this.object.displayWidth * this.object.originX;
    offset.y = this.object.y - this.object.displayHeight * this.object.originY;

    let rotation = container.rotation;

    //iterate through container's children
    container.iterate(function(child){
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
        for(let point of map.getPoints()) {
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

    this._points = points;
    this._segments = segments;

    return this;
};
