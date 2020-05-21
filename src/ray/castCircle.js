/**
 * Cast ray in all directions to find closest intersections with tested mapped objects.
 *
 * @method Raycaster.Ray#castCircle
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.6.0
 *
 * @param {object} [options] - options that may include:
 * @param {object[]} [options.objects = Raycaster.mappedObjects] - Array of game objects to test. If not provided test all mapped game objects.
 *
 * @return {Phaser.Geom.Point[]} Array of points of ray's closest intersections with tested objects.
 */
export function castCircle(options = {}) {
    let originalAngle = this.angle;
    let intersections = [];
    let maps = [];
    let rayTargets = [];
    let testedObjects = [];

    //if no objects to cast ray were passed, use raycasters mapped objects
    if(!options.objects) {
        if(this._raycaster)
            options.objects = this._raycaster.mappedObjects;
        else
            return intersections;

        //if bounding box is defined add bounding box points to 
        if(this._raycaster && this._raycaster.boundingBox) {
            for(let point of this._raycaster.boundingBox.points) {
                rayTargets.push({
                    point: point,
                    angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, point.x, point.y)
                });
            }
        }

        for(let i=0, iLength = options.objects.length; i < iLength; i++) {
            let object = options.objects[i];
            //if bound in range
            if(!this.boundsInRange(object))
                continue;
            
            testedObjects.push(object);

            let map = object.data.get('raycasterMap');
            maps.push(map);
            //get points and angles
            for(let point of map.getPoints(this)) {
                rayTargets.push({
                    point: point,
                    angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, point.x, point.y)
                });
            }

            //get objects intersections
            for(let j = i+1, jLength = options.objects.length; j < jLength; j++){
                let objectB = options.objects[j];
                let mapB = objectB.data.get('raycasterMap');
                //check if bounding boxes overlap
                if(!Phaser.Geom.Intersects.RectangleToRectangle(object.getBounds(), objectB.getBounds()))
                    continue;
                
                //find objects intersections
                for(let segmentA of map.getSegments(this)) {
                    for(let segmentB of mapB.getSegments(this)) {
                        let intersection = [];
                        if(!Phaser.Geom.Intersects.LineToLine(segmentA, segmentB, intersection))
                            continue;
                        
                        rayTargets.push({
                            point: new Phaser.Geom.Point(intersection.x, intersection.y),
                            angle: Phaser.Math.Angle.Between(this.origin.x, this.origin.y, intersection.x, intersection.y)
                        });
                    }
                }
            }
        }

        //sort target points by angle
        rayTargets.sort(function(a, b){
            //if rays towards points have the same angles promote closer one
            if(a.angle == b.angle) {
                if(Phaser.Math.Distance.Between(this.origin.x, this.origin.y, a.point.x, a.point.y) < Phaser.Math.Distance.Between(this.origin.x, this.origin.y, b.point.x, b.point.y))
                    return 1;
                else
                    return -1;
            }

            return a.angle - b.angle;
        }.bind(this));

        //cast rays
        for(let target of rayTargets){
            this.setAngle(target.angle);
            let intersection = this.cast({
                objects: testedObjects,
                target: target.point
            });
            if(intersection){
                //if intersection hits target point cast two additional rays
                if(Phaser.Geom.Point.Equals(target.point, intersection)) {
                    this.setAngle(target.angle - 0.0001);
                    let intersectionA = this.cast({
                        objects: testedObjects
                    });
                    if(intersectionA)
                        intersections.push(intersectionA);
                    
                    intersections.push(intersection);

                    this.setAngle(target.angle + 0.0001);
                    let intersectionB = this.cast({
                        objects: testedObjects
                    });
                    if(intersectionB)
                        intersections.push(intersectionB);

                    continue;
                }
                intersections.push(intersection);
            }
        }
    }

    this.setAngle(originalAngle);
    this.intersections = intersections;
    if(this.autoSlice)
        this.slicedIntersections = this.slice();

    return intersections;
}
