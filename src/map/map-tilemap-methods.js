/*Map methods for tilemaps*/
/**
* Get array of mapped tilemap's vertices used as rays targets.
*
* @method Raycaster.Map#tilemap.getPoints
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.7.3
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Geom.Point[]} - Array of mapped object's vertices.
*/
export function getPoints(ray = false) {
    if(!this.active)
        return [];
    if(!ray || ray && (ray.detectionRange == 0 || ray.detectionRange >= Phaser.Math.MAX_SAFE_INTEGER))
        return this._points;

    let points = [];
    for(let point of this._points) {
        if(Phaser.Math.Distance.Between(ray.origin.x, ray.origin.y, point.x, point.y) <= ray.detectionRange)
            points.push(point);
    }

    //get intersections between tilemap's segments and ray's detection range edge
    let segments = this.getSegments(ray);

    for(let segment of segments) {
        if(Phaser.Math.Distance.Between(ray.origin.x, ray.origin.y, segment.x1, segment.y1) > ray.detectionRange)
            points.push(new Phaser.Geom.Point(segment.x1, segment.y1));
        
        if(Phaser.Math.Distance.Between(ray.origin.x, ray.origin.y, segment.x2, segment.y2) > ray.detectionRange)
            points.push(new Phaser.Geom.Point(segment.x2, segment.y2));
    }

    return points;
};

/**
* Get array of mapped tilemap's segments used to test object's intersection with ray.
*
* @method Raycaster.Map#tilemap.getSegments
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.7.3
*
* @param {Raycaster.Ray} [ray] - {Raycaster.Ray} object used in some some types of maps.
*
* @return {Phaser.Geom.Line[]} - Array of mapped object's segments.
*/
export function getSegments(ray = false) {
    if(!this.active)
        return [];
    if(!ray || ray && (ray.detectionRange == 0 || ray.detectionRange >= Phaser.Math.MAX_SAFE_INTEGER))
        return this._segments;

    let segments = [];
    for(let segment of this._segments) {
        if(Phaser.Geom.Intersects.LineToCircle(segment, ray.detectionRangeCircle)) {
            segments.push(segment);
        }
    }

    return segments;
};

/**
* Update tilemap's map of points and segments.
*
* @method Raycaster.Map#tilemap.updateMap
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.7.3
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
export function updateMap() {
    if(!this.active)
        return this;

    let points = [];
    let segments = [];
    
    //calculate offset based on object position and origin point
    let offset = new Phaser.Geom.Point();
    offset.x = this.object.x;
    offset.y = this.object.y;

    let horizontal = false;
    let horizontals = [];
    let verticals = [];

    //iterate rows
    for(let i = 0, iLength = this.object.layer.data.length; i < iLength; i++) {
        let row = this.object.layer.data[i];

        //iterate row's tiles
        for(let j = 0, jLength = row.length; j < jLength; j++) {
            let tile = row[j];

            //check if tile and its top and left neighbours have different are from different sets (rays blocking and non-bloking)
            let upperEdge = ((i > 0 && this.collisionTiles.includes(this.object.layer.data[i-1][j].index) != this.collisionTiles.includes(tile.index)) || (i == 0 && this.collisionTiles.includes(tile.index))) ? true : false;
            let leftEdge = ((j > 0 && this.collisionTiles.includes(this.object.layer.data[i][j-1].index) != this.collisionTiles.includes(tile.index)) || (j == 0 && this.collisionTiles.includes(tile.index))) ? true : false;

            //get current tile's column last vertical line
            let vertical = false;
            if(verticals.length <= j)
                verticals[j] = [];
            else if(verticals[j].length > 0)
                vertical = verticals[j][verticals[j].length - 1];

            //check if tile has edge from left
            if(leftEdge) {
                if(vertical && vertical.y + vertical.height == i)
                    vertical.height++;
                else {
                    verticals[j].push({
                        x: tile.x,
                        y: tile.y,
                        height: 1
                    });
                }
            }

            //check if tile has edge from top
            if(upperEdge) {
                if(horizontal)
                    horizontal.width++;
                else
                    horizontal = {
                        x: tile.x,
                        y: tile.y,
                        width: 1
                    };
                continue;
            }

            if(horizontal) {
                let x = horizontal.x * this.object.layer.tileWidth * this.object.scaleX + offset.x;
                let y = horizontal.y * this.object.layer.tileHeight * this.object.scaleY + offset.y;
                let segment = new Phaser.Geom.Line(x, y, x + this.object.layer.tileWidth * this.object.scaleX * horizontal.width, y);
                segments.push(segment);
                horizontals.push(segment);
                points.push(new Phaser.Geom.Point(x, y));
                points.push(new Phaser.Geom.Point(x + this.object.layer.tileWidth * this.object.scaleX * horizontal.width, y));
                horizontal = false;
            }
        }
        
        //at the end of row add segment if exist
        if(horizontal) {
            let x = horizontal.x * this.object.layer.tileWidth * this.object.scaleX + offset.x;
            let y = horizontal.y * this.object.layer.tileHeight * this.object.scaleY + offset.y;
            let segment = new Phaser.Geom.Line(x, y, x + this.object.layer.tileWidth * this.object.scaleX * horizontal.width, y);
            segments.push(segment);
            horizontals.push(segment);
            points.push(new Phaser.Geom.Point(x, y));
            points.push(new Phaser.Geom.Point(x + this.object.layer.tileWidth * this.object.scaleX * horizontal.width, y));
            horizontal = false;
        }
    }

    //add bottom horizontal segments
    for(let tile of this.object.layer.data[this.object.layer.data.length - 1]) {
        if(this.collisionTiles.includes(tile.index)) {
            if(horizontal)
                horizontal.width++;
            else
                horizontal = {
                    x: tile.x,
                    y: tile.y + 1,
                    width: 1
                };
            continue;
        }

        if(horizontal) {
            let x = horizontal.x * this.object.layer.tileWidth * this.object.scaleX + offset.x;
            let y = horizontal.y * this.object.layer.tileHeight * this.object.scaleY + offset.y;
            let segment = new Phaser.Geom.Line(x, y, x + this.object.layer.tileWidth * this.object.scaleX * horizontal.width, y);
            segments.push(segment);
            horizontals.push(segment);
            points.push(new Phaser.Geom.Point(x, y));
            points.push(new Phaser.Geom.Point(x + this.object.layer.tileWidth * this.object.scaleX * horizontal.width, y));
            horizontal = false;
        }
    }

    //add segment if exist
    if(horizontal) {
        let x = horizontal.x * this.object.layer.tileWidth * this.object.scaleX + offset.x;
        let y = horizontal.y * this.object.layer.tileHeight * this.object.scaleY + offset.y;
        let segment = new Phaser.Geom.Line(x, y, x + this.object.layer.tileWidth * this.object.scaleX * horizontal.width, y);
        segments.push(segment);
        horizontals.push(segment);
        points.push(new Phaser.Geom.Point(x, y));
        points.push(new Phaser.Geom.Point(x + this.object.layer.tileWidth * this.object.scaleX * horizontal.width, y));
        horizontal = false;
    }
    
    //add right vertical segments
    let vertical = false;
    let verticalsLastColumn = [];
    for(let row of this.object.layer.data) {
        let tile = row[row.length - 1];

        //if tile blocks ray
        if(this.collisionTiles.includes(tile.index)) {
            if(vertical) {
                vertical.height++;
            }
            else {
                vertical = {
                    x: tile.x + 1,
                    y: tile.y,
                    height: 1
                };
            }

            continue;
        }

        if(vertical) {
            verticalsLastColumn.push(vertical);
            vertical = false;
        }
    }

    verticals.push(verticalsLastColumn);
    
    //add vertical segments
    for(let column of verticals) {
        if(!column)
            continue;

        for(let vertical of column) {
            let x = vertical.x * this.object.layer.tileWidth * this.object.scaleX + offset.x;
            let y1 = vertical.y * this.object.layer.tileHeight * this.object.scaleY + offset.y;
            let y2 = y1 + this.object.layer.tileHeight * this.object.scaleY * vertical.height;
            let segment = new Phaser.Geom.Line(x, y1, x, y2)
            segments.push(segment);

            //add points if they're not already there
            if(!points.filter(point => point.x == x && point.y == y1))
                points.push(new Phaser.Geom.Point(x, y));

            if(!points.filter(point => point.x == x && point.y == y2))
                points.push(new Phaser.Geom.Point(x, y));

            //get intersections between horizontal segments and vertical
            for(let horizontalSegment of horizontals) {
                if(segment.x1 == horizontalSegment.x1 || segment.x1 == horizontalSegment.x2 || segment.x2 == horizontalSegment.x1 || segment.x2 == horizontalSegment.x2)
                    continue;

                if(segment.y1 == horizontalSegment.y1 || segment.y1 == horizontalSegment.y2 || segment.y2 == horizontalSegment.y1 || segment.y2 == horizontalSegment.y2)
                    continue;

                let point = new Phaser.Geom.Point();
                if(Phaser.Geom.Intersects.LineToLine(segment, horizontalSegment, point)) {
                    points.push(point);
                }
            }
        }
    }

    this._points = points;
    this._segments = segments;
    return this;
};

/**
* Set tile types which should be mapped (for Phaser.Tilemaps.StaticTilemapLayer and Phaser.Tilemaps.DynamicTilemapLayer maps only).
*
* @method Raycaster.Map#setCollisionTiles
* @memberof Raycaster.Map
* @instance
* @since 0.7.3
*
* @param {array} [tiles = []] - Set of tile's indexes to map.
*
* @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
*/
export function setCollisionTiles(tiles = []) {
    this.collisionTiles = tiles;
    return this;
}
