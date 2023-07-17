/**
 * Cast ray in a cone to find closest intersections with tested mapped objects.
 *
 * @method Raycaster.Ray#castCone
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.7.0
 *
 * @param {object} [options] - options that may include:
 * @param {object[]} [options.objects = Raycaster.mappedObjects] - Array of game objects to test. If not provided test all mapped game objects.
 *
 * @return {Phaser.Geom.Point[]} Array of points of ray's closest intersections with tested objects. Additionally each point contains reference to hit mapped object and it's segment if available.
 */
export function castCone(options = {}) {
    let originalAngle = this.angle;
    let intersections = [];
    let maps = [];
    let rayTargets = [];
    let testedObjects = [];
    let cone = this.cone;
    let minAngle = 0;
    let maxAngle = 0;
    let angleOffset = 0;
    let startTime = performance.now();
    //reset stats
    this._stats = {
        method: 'castCone',
        rays: 0,
        testedMappedObjects: 0,
        hitMappedObjects: 0,
        segments: 0,
        time: 0
    };

    //set cone
    if(options.cone !== undefined)
        cone = options.cone;
    if(options.coneDeg !== undefined)
        cone = Phaser.Math.DegToRad(options.coneDeg);

    //set cone min and max angle
    minAngle = this.angle - cone / 2;
    maxAngle = this.angle + cone / 2;

    //add min and max angle points
    this.setAngle(minAngle);
    rayTargets.push({
        point: this._ray.getPointB(),
        angle: minAngle,
        angleOffsetDeg: Phaser.Math.RadToDeg(-cone / 2)
    });

    this.setAngle(maxAngle);
    rayTargets.push({
        point: this._ray.getPointB(),
        angle: maxAngle,
        angleOffsetDeg: Phaser.Math.RadToDeg(cone / 2)
    });

    //if no objects to cast ray were passed, use raycasters mapped objects
    if(!options.objects) {
        if(this._raycaster)
            options.objects = this._raycaster.mappedObjects;
        else
            return intersections;
    }

    //if bounding box is defined add bounding box points to 
    if(this._raycaster && this._raycaster.boundingBox) {
        for(let point of this._raycaster.boundingBox.points) {

            let angle = Phaser.Math.Angle.Between(this.origin.x, this.origin.y, point.x, point.y);
            let angleOffsetDeg = Phaser.Math.Angle.ShortestBetween(Phaser.Math.RadToDeg(angle), Phaser.Math.RadToDeg(originalAngle));

            if(Math.abs(angleOffsetDeg) < Phaser.Math.RadToDeg(cone / 2)) {
                rayTargets.push({
                    point: point,
                    angle: angle,
                    angleOffsetDeg: -angleOffsetDeg
                });
            }
        }
    }

    for(let i=0, iLength = options.objects.length; i < iLength; i++) {
        let object = options.objects[i];
        //if bound in range
        if(!this.boundsInRange(object))
            continue;
        
        testedObjects.push(object);

        let map, boundingBox;
        if(object.type === 'body' || object.type === 'composite')
            map = object.raycasterMap;
        else
            map = object.data.get('raycasterMap');

        //get slightly enlarged bounding box due to fridge cases, when ray "glanced" border box's corner (v0.10.1)
        boundingBox = map.getBoundingBox();
        boundingBox.setTo(boundingBox.x - 0.1, boundingBox.y - 0.1, boundingBox.width + 0.2, boundingBox.height + 0.2);

        map._boundingBox = boundingBox;

        maps.push(map);
        //get points and angles
        for(let point of map.getPoints(this)) {

            let angle = Phaser.Math.Angle.Between(this.origin.x, this.origin.y, point.x, point.y);
            let angleOffsetDeg = Phaser.Math.Angle.ShortestBetween(Phaser.Math.RadToDeg(angle), Phaser.Math.RadToDeg(originalAngle));

            if(Math.abs(angleOffsetDeg) < Phaser.Math.RadToDeg(cone / 2)) {
                rayTargets.push({
                    point: point,
                    angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, point.x, point.y),
                    angleOffsetDeg: -angleOffsetDeg
                });
            }
        }

        //get objects intersections
        for(let j = i+1, jLength = options.objects.length; j < jLength; j++){
            let objectB = options.objects[j];
            let mapB;
            if(objectB.type === 'body' || objectB.type === 'composite')
                mapB = objectB.raycasterMap;
            else
                mapB = objectB.data.get('raycasterMap');
            //check if bounding boxes overlap
            if(!Phaser.Geom.Intersects.RectangleToRectangle(map.getBoundingBox(), mapB.getBoundingBox()))
                continue;
            
            //find objects intersections
            for(let segmentA of map.getSegments(this)) {
                for(let segmentB of mapB.getSegments(this)) {
                    let intersection = [];
                    if(!Phaser.Geom.Intersects.LineToLine(segmentA, segmentB, intersection))
                        continue;
                    let angle = Phaser.Math.Angle.Between(this.origin.x, this.origin.y, intersection.x, intersection.y);
                    let angleOffsetDeg = Phaser.Math.Angle.ShortestBetween(Phaser.Math.RadToDeg(angle), Phaser.Math.RadToDeg(originalAngle));

                    if(Math.abs(angleOffsetDeg) < Phaser.Math.RadToDeg(cone / 2)) {
                        rayTargets.push({
                            point: new Phaser.Geom.Point(intersection.x, intersection.y),
                            angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, intersection.x, intersection.y),
                            angleOffsetDeg: -angleOffsetDeg
                        });
                    }
                }
            }
        }
    }

    //sort target points by angle
    rayTargets.sort(function(a, b){
        //if rays towards points have the same angles promote closer one
        if(a.angle == b.angle) {
            if(Phaser.Math.Distance.Between(this.origin.x, this.origin.y, a.point.x, a.point.y) > Phaser.Math.Distance.Between(this.origin.x, this.origin.y, b.point.x, b.point.y))
                return 1;
            else
                return -1;
        }

        return a.angleOffsetDeg - b.angleOffsetDeg;
    }.bind(this));

    let previousTarget = {
        angle: false
    };

    //cast rays
    for(let target of rayTargets){
        //if current target is the same as previous one skip loop
        if(target.angle === previousTarget.angle) {
            continue;
        }

        previousTarget = target;
        
        this.setAngle(target.angle);
        let intersection = this.cast({
            objects: testedObjects,
            target: target.point,
            internal: true
        });

        if(intersection) {
            //if intersection hits target point check if ray "glanced" mapped object.
            let castSides = false;
            if(this.round) {
                let roundedTarget = new Phaser.Geom.Point(Math.round(target.point.x), Math.round(target.point.y));
                castSides = Phaser.Geom.Point.Equals(roundedTarget, intersection)
            }
            else {
                castSides = Phaser.Geom.Point.Equals(target.point, intersection);
            }
            
            if(!castSides) {
                //castSides = false;
            }
            else if(!target.point.neighbours || target.point.neighbours.length < 2) {
                //castSides = true;
            }
            //check if ray and at least one line between target point and it's neighbours are parallel
            else if(Phaser.Math.Angle.Normalize(this.angle - Phaser.Math.Angle.BetweenPoints(this.origin, target.point.neighbours[0])) < 0.0001
                || Phaser.Math.Angle.Normalize(this.angle - Phaser.Math.Angle.BetweenPoints(this.origin, target.point.neighbours[1])) < 0.0001) {
                //castSides = true;
            }
            //check if ray crossed more than 1 points of triangle created by tatget point and it's neighbours
            else {
                let triangleIntersections = [];
                let triangle = new Phaser.Geom.Triangle(target.point.x, target.point.y, target.point.neighbours[0].x, target.point.neighbours[0].y, target.point.neighbours[1].x, target.point.neighbours[1].y);
                Phaser.Geom.Intersects.GetTriangleToLine(triangle, this._ray, triangleIntersections);
                
                //if point of intersection of ray and tirangle are close to arget point, assume ray "glanced" triangle.
                for(let triangleIntersection of triangleIntersections) {
                    if(Math.abs(target.point.x - triangleIntersection.x) > 0.0001 && Math.abs(target.point.y - triangleIntersection.y) > 0.0001) {
                        castSides = false;
                        break;
                    }
                }
            }
            
            //if ray "glanced" mapped object cast two additional rays
            if(castSides) {
                this.setAngle(target.angle - 0.0001);
                let intersectionA = this.cast({
                    objects: testedObjects,
                    internal: true
                });

                if(intersectionA) {
                    intersections.push(intersectionA);
                }

                intersections.push(intersection);

                this.setAngle(target.angle + 0.0001);
                let intersectionB = this.cast({
                    objects: testedObjects,
                    internal: true
                });

                if(intersectionB) {
                    intersections.push(intersectionB);
                }

                continue;
            }

            intersections.push(intersection);
        }
    }

    this.setAngle(originalAngle);
    this.intersections = intersections;
    if(this.autoSlice)
        this.slicedIntersections = this.slice(intersections, false);
    
    this._stats.time = performance.now() - startTime;

    this.drawDebug(intersections);

    return intersections;
}
