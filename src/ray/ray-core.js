export function Ray(options, raycaster) {
    this.origin = new Phaser.Geom.Point();
    this._ray = new Phaser.Geom.Line();
    this.angle = 0;
    this.range = Phaser.Math.MAX_SAFE_INTEGER;
    this.detectionRange = 0;
    this.detectionRangeCircle = new Phaser.Geom.Circle();
    this.ignoreNotIntersectedRays = true;
    this.intersections = [];
    this._raycaster = raycaster ? raycaster : false;

    this.config(options);
};

Ray.prototype = {
    //config
    config: function(options) {
        this.object = options.object;
        //origin
        if(options.origin)
            this.origin.setTo(options.origin.x, options.origin.y);

        //range (0 = max)
        if(options.range)
            this.range = options.range;

        //detection range (0 = max)
        if(options.detectionRange)
            this.detectionRange = options.detectionRange;

        if(options.ignoreNotIntersectedRays !== undefined)
            this.ignoreNotIntersectedRays = (options.ignoreNotIntersectedRays == true)
        
        Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
        this.detectionRangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);

        return this;
    },

    //set ray
    setRay: function(x, y, angle, range = Phaser.Math.MAX_SAFE_INTEGER) {
        this.origin.setTo(x, y);
        this.angle = angle;
        this.range = range;

        Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
        this.detectionRangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);
        return this;
    },

    //set ray's origin point
    setOrigin: function(x, y) {
        this.origin.setTo(x, y);
        Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
        this.detectionRangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);
        return this;
    },

    //set ray's range
    setRange: function(range = Phaser.Math.MAX_SAFE_INTEGER) {
        this.range = range;
        Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
        return this;
    },

    //set angle
    setAngle: function(angle = 0) {
        this.angle = angle;
        Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
        return this;
    },

    //set detection range
    setDetectionRange: function(detectionRange = 0) {
        this.detectionRange = detectionRange;
        this.rangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);
        return this;
    },

    //is object (possibly) in range
    boundsInRange(object, bounds = false) {
        if(!this.detectionRange)
            return true;

        let objectBounds;
        if(bounds)
            objectBounds = bounds;
        else
            objectBounds = object.getBounds();

        if(Phaser.Geom.Intersects.CircleToRectangle(this.detectionRangeCircle, objectBounds))
            return true;

        return false;
    },

    //cast ray to find closest intersection
    cast(options = {}) {
        let closestIntersection;
        let closestDistance = Phaser.Math.MAX_SAFE_INTEGER;
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
            else {
                closestDistance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, options.target.x, options.target.y);
                closestIntersection = options.target;
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
            for(let segment of map.getSegments()) {
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
    },

    //cast ray in all directions
    castAll: function(options = {}) {
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
                    for(let segmentA of map.getSegments()) {
                        for(let segmentB of mapB.getSegments()) {
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
                return a.angle - b.angle;
            });

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

        return intersections;
    }
};
