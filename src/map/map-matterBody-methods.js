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
* @param {Raycatser.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
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
        points.push(rayA.getPointB());
        points.push(rayB.getPointB());

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

            for(let i = 1, length = vertices.length; i < length; i++) {
                let pointA = new Phaser.Geom.Point(vertices[i - 1].x, vertices[i - 1].y);
                let pointB = new Phaser.Geom.Point(vertices[i].x, vertices[i].y);

                points.push(pointB);

                //add segment
                let segment = new Phaser.Geom.Line(pointA.x, pointA.y, pointB.x, pointB.y);
                segments.push(segment);
            }

            //closing segment
            let segment = new Phaser.Geom.Line(vertices[vertices.length - 1].x, vertices[vertices.length - 1].y, vertices[0].x, vertices[0].y);
            segments.push(segment);
        }

        //if concave body
        else if(bodyItem.parts.length > 1) {
            for(let i = 1, length = bodyItem.parts.length; i < length; i++) {
                let vertices = bodyItem.parts[i].vertices;
                let pointA = new Phaser.Geom.Point(vertices[0].x, vertices[0].y);

                if(points.find(point => point.x == pointA.x && point.y == pointA.y) === undefined)
                    points.push(pointA);

                for(let j = 1, length = vertices.length; j < length; j++) {
                    let pointB = new Phaser.Geom.Point(vertices[j].x, vertices[j].y);
                    //check if segment was already added
                    let segmentIndex = segments.findIndex(segment => (segment.x1 == pointA.x && segment.y1 == pointA.y && segment.x2 == pointB.x && segment.y2 == pointB.y) || (segment.x1 == pointB.x && segment.y1 == pointB.y && segment.x2 == pointA.x && segment.y2 == pointA.y));
                    
                    if(segmentIndex !== -1) {
                        segments.splice(segmentIndex, 1);
                        pointA = pointB;
                        continue;
                    }
                    
                    if(points.find(point => point.x == pointB.x && point.y == pointB.y) === undefined)
                        points.push(pointB);

                    //add segment
                    let segment = new Phaser.Geom.Line(pointA.x, pointA.y, pointB.x, pointB.y);
                    segments.push(segment);
                    
                    pointA = pointB;
                }
                
                //closing segment
                let closingSegment = new Phaser.Geom.Line(vertices[vertices.length - 1].x, vertices[vertices.length - 1].y, vertices[0].x, vertices[0].y);

                let segmentIndex = segments.findIndex(segment => (segment.x1 == closingSegment.x1 && segment.y1 == closingSegment.y1 && segment.x2 == closingSegment.x2 && segment.y2 == closingSegment.y2) || (segment.x1 == closingSegment.x2 && segment.y1 == closingSegment.y2 && segment.x2 == closingSegment.x1 && segment.y2 == closingSegment.y1));
                if(segmentIndex === undefined)
                    segments.push(closingSegment);
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

