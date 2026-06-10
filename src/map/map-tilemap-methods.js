/*Map methods for tilemaps*/

import { Geom, Math as PhaserMath } from 'phaser';

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
* @return {Phaser.Math.Vector2[]} - Array of mapped object's vertices.
*/
export function getPoints(ray = false) {
    if(!this.active)
        return [];
    if(!ray || ray && (ray.detectionRange == 0 || ray.detectionRange >= PhaserMath.MAX_SAFE_INTEGER))
        return this._points;

    let points = [];
    for(let point of this._points) {
        if(PhaserMath.Distance.Between(ray.origin.x, ray.origin.y, point.x, point.y) <= ray.detectionRange)
            points.push(point);
    }

    //get intersections between tilemap's segments and ray's detection range edge
    let segments = this.getSegments(ray);

    for(let segment of segments) {
        if(PhaserMath.Distance.Between(ray.origin.x, ray.origin.y, segment.x1, segment.y1) > ray.detectionRange)
            points.push(new PhaserMath.Vector2(segment.x1, segment.y1));
        
        if(PhaserMath.Distance.Between(ray.origin.x, ray.origin.y, segment.x2, segment.y2) > ray.detectionRange)
            points.push(new PhaserMath.Vector2(segment.x2, segment.y2));
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
    if(!ray || (ray && (ray.detectionRange == 0 || ray.detectionRange >= PhaserMath.MAX_SAFE_INTEGER)))
        return this._segments;

    let segments = [];
    for(let segment of this._segments) {
        if(Geom.Intersects.LineToCircle(segment, ray.detectionRangeCircle)) {
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

    let points = [],
        segments = [],
        columns = Array(this.object.layer.data[0].length + 1);
        
        for(let i = 0, iLength = columns.length; i < iLength; i++) {
            columns[i] = [];
        }

    
    //calculate offset based on object position and origin point
    let offset = new PhaserMath.Vector2(this.object.x, this.object.y);

    let row = this.object.layer.data[0],
        tileWidth = this.object.layer.tileWidth * this.object.scaleX,
        tileHeight = this.object.layer.tileHeight * this.object.scaleY,
        startPoint,
        endPoint;

    //set top horizontal lines
    if(this.collisionTiles.includes(row[0].index)) {
        startPoint = new PhaserMath.Vector2(offset.x, offset.y);
        endPoint = new PhaserMath.Vector2(tileWidth + offset.x, offset.y);

        columns[0].push(startPoint);
    }

    for(let i = 1, iLength = row.length; i < iLength; i++) {
        let tile = row[i];
        
        if(!this.collisionTiles.includes(tile.index)) {
            if(startPoint) {
                startPoint.neighbours = [endPoint];
                endPoint.neighbours = [startPoint];

                points.push(startPoint, endPoint);
                segments.push(new Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y));

                columns[i].push(endPoint);

                startPoint = false;
                endPoint = false;
            }
            continue;
        }

        let x = i * tileWidth + offset.x,
            y = offset.y;

        if(!startPoint) {
            startPoint = new PhaserMath.Vector2(x, y);
            columns[i].push(startPoint);
        }

        if(!endPoint) {
            endPoint = new PhaserMath.Vector2(x + tileWidth, y);
        }
        else {
            endPoint.x = x + tileWidth;
        }
    }

    if(startPoint) {
        startPoint.neighbours = [endPoint];
        endPoint.neighbours = [startPoint];

        points.push(startPoint, endPoint);
        segments.push(new Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y));

        columns[row.length].push(endPoint);
    }

    startPoint = false;
    endPoint = false;
    let lastPoint = false;

    for(let i = 1, iLength = this.object.layer.data.length; i < iLength; i++) {
        row = this.object.layer.data[i];
        let higherRow = this.object.layer.data[i - 1];

        if(this.collisionTiles.includes(row[0].index) != this.collisionTiles.includes(higherRow[0].index)) {
            startPoint = new PhaserMath.Vector2(offset.x,  i * tileHeight + offset.y);
            endPoint = new PhaserMath.Vector2(tileWidth + offset.x, i * tileHeight + offset.y);

            columns[0].push(startPoint);
        }

        for(let j = 1, jLength = row.length; j < jLength; j++) {
            let tile = row[j],
                isCollisionTile = this.collisionTiles.includes(tile.index),
                isCollisionHigherTile = this.collisionTiles.includes(higherRow[j].index);
            
            if(isCollisionTile == isCollisionHigherTile) {
                if(startPoint) {

                    if(!startPoint.neighbours) {
                        startPoint.neighbours = [endPoint];
                        points.push(startPoint);
                    }

                    endPoint.neighbours = [lastPoint ? lastPoint : startPoint];
                    points.push(endPoint);
                    
                    segments.push(new Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y));

                    columns[j].push(endPoint);

                    startPoint = false;
                    endPoint = false;
                }
                continue;
            }
    
            let x = j * tileWidth + offset.x,
                y = i * tileHeight + offset.y;

            // check for checkerbox pattern
            if(
                startPoint
                && this.collisionTiles.includes(higherRow[j - 1].index) != isCollisionHigherTile
            ) {
                let midPoint = new PhaserMath.Vector2(x, y);
                midPoint.neighbours = [lastPoint ? lastPoint : startPoint];
                lastPoint = midPoint;

                if(!startPoint.neighbours)
                    startPoint.neighbours = [lastPoint];

                points.push(midPoint);
            }
    
            if(!startPoint) {
                startPoint = new PhaserMath.Vector2(x, y);

                columns[j].push(startPoint);
                lastPoint = false;
            }
    
            if(!endPoint) {
                endPoint = new PhaserMath.Vector2(x + tileWidth, y);
            }
            else {
                endPoint.x = x + tileWidth;
            }
        }
    
        if(startPoint) {
            if(!startPoint.neighbours)
                startPoint.neighbours = [lastPoint ? lastPoint : endPoint];
            endPoint.neighbours = [lastPoint ? lastPoint : startPoint];

            if(lastPoint)
                lastPoint.neighbours.push(endPoint);

            points.push(startPoint, endPoint);
            segments.push(new Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y));

            columns[row.length].push(endPoint);
        }

        startPoint = false;
        endPoint = false;
        lastPoint = false;
    }

    //set bottom horizontal lines
    row = this.object.layer.data.slice(-1)[0];
    let y = this.object.layer.data.length * tileHeight + offset.y;

    if(this.collisionTiles.includes(row[0].index)) {
        startPoint = new PhaserMath.Vector2(offset.x, y);
        endPoint = new PhaserMath.Vector2(tileWidth + offset.x, y);

        columns[0].push(startPoint);
    }

    for(let i = 1, iLength = row.length; i < iLength; i++) {
        let tile = row[i];
        
        if(!this.collisionTiles.includes(tile.index)) {
            if(startPoint) {
                startPoint.neighbours = [endPoint];
                endPoint.neighbours = [startPoint];

                points.push(startPoint, endPoint);
                segments.push(new Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y));

                columns[i].push(endPoint);

                startPoint = false;
                endPoint = false;
            }
            continue;
        }

        let x = i * tileWidth + offset.x;

        if(!startPoint) {
            startPoint = new PhaserMath.Vector2(x, y);

            columns[i].push(startPoint);
        }

        if(!endPoint) {
            endPoint = new PhaserMath.Vector2(x + tileWidth, y);
        }
        else {
            endPoint.x = x + tileWidth;
        }
    }

    if(startPoint) {
        startPoint.neighbours = [endPoint];
        endPoint.neighbours = [startPoint];

        points.push(startPoint, endPoint);
        segments.push(new Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y));

        columns[row.length].push(endPoint);
    }

    //set vertical lines
    for(let i = 0, iLength = columns.length; i < iLength; i++) {
        const column = columns[i];

        for(let j = 0, jLength = column.length - 1; j < jLength; j++) {
            segments.push(new Geom.Line(column[j].x, column[j].y, column[j+1].x, column[j+1].y));
            column[j].neighbours.push(column[j+1]);
            column[j+1].neighbours.push(column[j]);
            j++;
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
