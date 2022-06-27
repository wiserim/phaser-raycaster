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
 * @param {boolean} [options.internal = false] - Flag determining if method is used by other casting method.
 *
 * @return {(Phaser.Geom.Point|boolean)} Ray's closest intersection with tested objects. Returns false if no intersection has been found. Additionally contains reference to hit mapped object and segment if available.
 */
export function cast(options = {}) {
    let closestIntersection;
    let closestSegment;
    let closestObject;
    let closestDistance = this.rayRange;
    let internal = options.internal ? options.internal : false;
    let startTime = performance.now();
    let stats = {
        method: 'cast',
        rays: 1,
        testedMappedObjects: 0,
        hitMappedObjects: 0,
        segments: 0,
        time: 0
    };

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
        let map, boundingBox;
        
        if(object.type === 'body' || object.type === 'composite')
            map = object.raycasterMap;
        else
            map = object.data.get('raycasterMap');

        stats.testedMappedObjects++;

        //get slightly enlarged bounding box due to fridge cases, when ray "glanced" border box's corner (v0.10.1)
        if(internal) {
            boundingBox = map._boundingBox;
        }
        else {
            boundingBox = map.getBoundingBox();
            boundingBox.setTo(boundingBox.x - 0.1, boundingBox.y - 0.1, boundingBox.width + 0.2, boundingBox.height + 0.2);
        }

        //check if object is intersected by ray
        if(Phaser.Geom.Intersects.GetLineToRectangle(this._ray, boundingBox).length === 0)
            continue;

        stats.hitMappedObjects++;
        stats.segments += map.getSegments(this).length;
        
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
                closestObject = map.object;
                closestSegment = segment;
            }
        }

        //check if map is circular
        if(map.circle) {
           //if circular map has generated points (besides tangent points to ray)
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
                            closestObject = map.object;
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
                        closestObject = map.object;
                    }
                }
            }
        }

        //check container map's circles
        if(map.type == 'Container' && map._circles.length > 0) {
            for(let circle of map._circles) {
                //check if target point is a circle tangent point to ray
                if(options.target) {
                    let isTangent = false;

                    for(let point of circle.points) {
                        if(Phaser.Geom.Point.Equals(options.target, point)) {
                            //get closest intersection
                            let distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, point.x, point.y);

                            if(distance < closestDistance) {
                                closestDistance = distance;
                                closestIntersection = point;
                                closestObject = map.object;
                                isTangent = true;
                                break;
                            }
                        }
                    }

                    if(isTangent)
                        continue;
                }

                let circleIntersections = [];

                if(Phaser.Geom.Intersects.GetLineToCircle(this._ray, circle, circleIntersections)) {
                    for(let intersection of circleIntersections) {
                        //get closest intersection
                        let distance = Phaser.Math.Distance.Between(this._ray.x1, this._ray.y1, intersection.x, intersection.y);

                        if(distance < closestDistance) {
                            closestDistance = distance;
                            closestIntersection = intersection;
                            closestObject = map.object;
                        }
                    }
                }
            }
        }
    }

    //update stats
    if(internal) {
        this._stats.rays++;
        this._stats.testedMappedObjects += stats.testedMappedObjects;
        this._stats.hitMappedObjects += stats.hitMappedObjects;
        this._stats.segments += stats.segments;
    }
    else {
        stats.time = performance.now() - startTime;
        this._stats = stats;
    }

    let result;
    if(!closestIntersection) {
        if(this.ignoreNotIntersectedRays)
            return false;

        result = this._ray.getPointB();
    }
    else {
        result = new Phaser.Geom.Point(closestIntersection.x, closestIntersection.y);
        result.segment = closestSegment;
        result.object = closestObject;
    }

    if(this.round) {
        result.x = Math.round(result.x);
        result.y = Math.round(result.y);
    }

    if(!internal)
        this.drawDebug([result]);
    
    return result;
}