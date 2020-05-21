/**
 * Cast ray to find closest intersection with tested mapped objects.
 *
 * @method Raycaster.Ray#cast
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {object} [options] - options that may include:
 * @param {object[]} [options.objects = {Raycaster#mappedObjects}] - Array of game objects to test. If not provided test all mapped game objects.
 * @param {Phaser.Geom.Point} [options.target] - Ray's target point. Used in other casting methods to determine if ray was targeting mapped objects point.
 *
 * @return {(Phaser.Geom.Point|boolean)} Ray's closest intersection with tested objects. Returns false if no intersection has been found.
 */
export function cast(options = {}) {
    let closestIntersection;
    let closestDistance = this.rayRange;
    //if bounding box is defined check bounding box intersection
    if(this._raycaster && this._raycaster.boundingBox) {
        let intersections = [];
        Phaser.Geom.Intersects.GetLineToRectangle(this._ray, this._raycaster.boundingBox.rectangle, intersections);
        if(intersections.length === 1)
            closestIntersection = intersections[0];
        else if(intersections.length > 1) {
            for(let intersection of intersections) {
                let distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, intersection.x, intersection.y);
                if(distance < closestDistance) {
                    closestDistance = distance;
                    closestIntersection = intersection;
                }
            }
        }
        //if ray target is declared
        else if(options.target){
            let distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, options.target.x, options.target.y);
            //if target is within ray range
            if(this.rayRange > distance) {
                closestDistance = distance;
                closestIntersection = options.target;
            }
        }
    }

    //if no objects to cast ray were passed, use raycasters mapped objects
    if(!options.objects) {
        if(this._raycaster)
            options.objects = this._raycaster.mappedObjects;
        else
            return intersections;
    }
    
    for(let object of options.objects) {
        //check if object is intersected by ray
        if(!Phaser.Geom.Intersects.GetLineToRectangle(this._ray, object.getBounds()))
            continue;

        let map = object.data.get('raycasterMap');
        
        //check intersections
        for(let segment of map.getSegments(this)) {
            let intersection = [];

            //if target point is segmemt point
            if(options.target) {
                if(
                    Phaser.Geom.Point.Equals(options.target, segment.getPointA())
                    || Phaser.Geom.Point.Equals(options.target, segment.getPointB())
                ) {
                    intersection = options.target;
                }
                else if(!Phaser.Geom.Intersects.LineToLine(this._ray, segment, intersection))
                    continue;
            }
            //if no intersection continue
            else if(!Phaser.Geom.Intersects.LineToLine(this._ray, segment, intersection))
              continue;
            
            //get closest intersection
            let distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, intersection.x, intersection.y);
            if(distance < closestDistance) {
                closestDistance = distance;
                closestIntersection = intersection;
            }
        }

        //check arc intersections if its not
        if(map.type === 'Arc') {
           //if arc has generated points (besides tangent points to ray)
            if(map._points.length > 0) {
                continue;
            }
            
            //check if target point is a circle tangent point to ray
            if(options.target) {
                let points = map.getPoints(this);
                let isTangent = false;
                for(let point of points) {

                    if(Phaser.Geom.Point.Equals(options.target, point)) {
                        //get closest intersection
                        let distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, point.x, point.y);

                        if(distance < closestDistance) {
                            closestDistance = distance;
                            closestIntersection = point;
                            isTangent = true;
                            break;
                        }
                    }
                }

                if(isTangent)
                    continue;
            }

            let circleIntersections = [];
            let offset = new Phaser.Geom.Point();
            offset.x = map.object.x - map.object.displayWidth * (map.object.originX - 0.5);
            offset.y = map.object.y - map.object.displayHeight * (map.object.originY - 0.5);

            //calculate circle's center after rotation
            let rotation = map.object.rotation;
            if(rotation !== 0) {
                let vector = new Phaser.Geom.Line(map.object.x, map.object.y, offset.x, offset.y);
                Phaser.Geom.Line.SetToAngle(vector, map.object.x, map.object.y, Phaser.Geom.Line.Angle(vector) + rotation, Phaser.Geom.Line.Length(vector));
                let cB = vector.getPointB();
                offset.x = cB.x;
                offset.y = cB.y;
            }

            //create transformed circle
            let circle = new Phaser.Geom.Circle(offset.x, offset.y, map.object.radius * map.object.scaleX);

            if(Phaser.Geom.Intersects.GetLineToCircle(this._ray, circle, circleIntersections)) {
                for(let intersection of circleIntersections) {
                    //get closest intersection
                    let distance = Phaser.Math.Distance.Between(this._ray.x1, this._ray.y1, intersection.x, intersection.y);

                    if(distance < closestDistance) {

                        closestDistance = distance;
                        closestIntersection = intersection;
                    }
                }
            }
        }
    }

    if(!closestIntersection)
        return (this.ignoreNotIntersectedRays) ? false : this._ray.getPointB();
    return new Phaser.Geom.Point(closestIntersection.x, closestIntersection.y);
}
