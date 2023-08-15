/*Map methods for matter body*/
/**
* Get array of mapped matter body's vertices used as rays targets.
*
* @method Raycaster.Map#matterBody.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.9.0
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
*/
export function getPoints(ray = false) {
    if(!this.active)
        return [];

    let body = this.object.type === 'body' || this.object.type === 'composite' ? this.object : this.object.body;

    //calculate tangent rays
    if(ray && !this.forceVerticesMapping && body.circleRadius > 0) {
        let points = [];
        let rayA = new Phaser.Geom.Line();
        let rayB = new Phaser.Geom.Line();
        let c = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, body.position.x, body.position.y);

        let rayLength = Math.sqrt(Math.pow(Phaser.Geom.Line.Length(c), 2) - Math.pow(body.circleRadius * body.scale.x, 2));

        //ray angle
        let angle = Phaser.Geom.Line.Angle(c);
        let dAngle = Math.asin((body.circleRadius * body.scale.x) / Phaser.Geom.Line.Length(c));
        Phaser.Geom.Line.SetToAngle(rayA, ray.origin.x, ray.origin.y, angle - dAngle, rayLength);
        Phaser.Geom.Line.SetToAngle(rayB, ray.origin.x, ray.origin.y, angle + dAngle, rayLength);

        //adding tangent points
        points.push(rayA.getPointB(), rayB.getPointB());

        return points;
    }

    return this._points;
};

/**
* Get array of mapped matter body's segments used to test object's intersection with ray.
*
* @method Raycaster.Map#matterBody.getSegments
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.9.0
*
* @return {Phaser.Geom.Line[]} - Array of mapped object's segments.
*/
export function getSegments() {
    if(!this.active)
        return [];
    return this._segments;
};

/**
* Update matter body's map of points and segments.
*
* @method Raycaster.Map#matterBody.updateMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.9.0
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
export function updateMap() {
    if(!this.active)
        return this;

    let points = [];
    let segments = [];
    let body = this.object.type === 'body' || this.object.type === 'composite' ? this.object : this.object.body;
    let bodies = [body];
    let generateBounds = false;

    if(body.circleRadius > 0 && !this.forceVerticesMapping) {
        this.circle = true;
        this._points = points;
        this._segments = segments;

        return this;
    }

    this.circle = false;

    if(body.type == 'composite')
        bodies = body.bodies;

    if( ( body.bounds === undefined && body.type == 'composite' ) || ( body.type == 'composite' && this.dynamic ) ) {
        generateBounds = true;
    }
    
    for(let bodyItem of bodies) {
        //if convex body
        if(bodyItem.parts.length === 1 || this.forceConvex) {
            let vertices = bodyItem.parts[0].vertices;

            points.push(new Phaser.Geom.Point(vertices[0].x, vertices[0].y));
            points[0].neighbours = [];

            for(let i = 1, length = vertices.length; i < length; i++) {
                let pointA = points.slice(-1)[0],
                    pointB = new Phaser.Geom.Point(vertices[i].x, vertices[i].y);
                    
                if(!pointA.neighbours)
                    pointA.neighbours = [];
                pointA.neighbours.push(pointB);
                pointB.neighbours = [pointA];

                points.push(pointB);

                //add segment
                let segment = new Phaser.Geom.Line(pointA.x, pointA.y, pointB.x, pointB.y);
                segments.push(segment);
            }

            //closing segment
            let segment = new Phaser.Geom.Line(vertices[vertices.length - 1].x, vertices[vertices.length - 1].y, vertices[0].x, vertices[0].y);
            segments.push(segment);

            points[0].neighbours.push(points.slice(-1)[0]);
        }

        //if concave body
        else {
            let parts = [],
                indexedPoints = [];

            for(let i = 1, iLength = bodyItem.parts.length; i < iLength; i++) {
                let vertices = bodyItem.parts[i].vertices,
                    part = [];
                
                for(let j = 0, jLength = vertices.length; j < jLength; j++) {
                    let point = new Phaser.Geom.Point(vertices[j].x, vertices[j].y);

                    if(part.length) {
                        let prevPoint = part.slice(-1)[0];
                        point.neighbours = [prevPoint];
                        prevPoint.neighbours.push(point);
                    }
                    else {
                        point.neighbours = [];
                    }

                    let index = vertices[j].x + '/' + vertices[j].y;
                    if(indexedPoints[index] === undefined) {
                        points.push(point);
                        indexedPoints[index] = point;
                    }
                    else {
                        indexedPoints[index].neighbours.push(point);
                        point.neighbours.push(indexedPoints[index]);
                    }

                    part.push(point);

                    if(vertices[j].isInternal) {
                        parts.push(part);
                        part = [];
                    }
                }
                parts.push(part);
            }

            for(let part of parts) {
                let i = 0,
                iLength;
                for(i = 0, iLength = part.length - 1; i < iLength; i++) {
                    segments.push(new Phaser.Geom.Line(part[i].x, part[i].y, part[i+1].x, part[i+1].y));
                }
            }
        }
    }

    this._points = points;
    this._segments = segments;

    if(generateBounds) {
        let bounds = this._raycaster.scene.matter.composite.bounds(body);
        body.bounds = bounds;
    }

    return this;
};

/**
* Get matter body's bounding box.
*
* @method Raycaster.Map#matterBody.getBoundingBox
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.9.0
*
* @return {Phaser.Geom.Rectangle} - Matter body's bounding box.
*/
export function getBoundingBox() {
    let bounds = this.object.type === 'body' || this.object.type === 'composite' ? this.object.bounds : this.object.body.bounds;

    return new Phaser.Geom.Rectangle(bounds.min.x, bounds.min.y, bounds.max.x - bounds.min.x, bounds.max.y - bounds.min.y);
}

