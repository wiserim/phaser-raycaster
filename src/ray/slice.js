/**
 * Slice ray's field of view represented by polygon or array of points into array of triangles.
 *
 * @method Raycaster.Ray#slice
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 * @param {(object[]|Phaser.Geom.Polygon)} [fov = {Ray#fov}] - Array of points or polygon representing field of view. If not passed, filed of view from last raycaste will be used.
 * @param {boolean} [closed = true|{Ray#fov}] - Define if field of view polygon is closed (first and last vertices sholud be connected). If fov was not passed, value depends of last type of casting.
 *
 * @return {Phaser.Geom.Triangle[]} Array of triangles representing slices of field of view.
 */
export function slice(intersections = this.intersections, closed = true) {
    //if intersections is Phaser.Geom.Polygon object
    if(!Array.isArray(intersections)) {
        if(intersections.type === 4)
            intersections = intersections.points;
        else
            return [];
    }

    if(intersections.length === 0)
        return [];

    let slices = [];
    for(let i = 0, iLength = intersections.length - 1; i < iLength; i++) {
        slices.push(new Phaser.Geom.Triangle(this.origin.x, this.origin.y, intersections[i].x, intersections[i].y, intersections[i+1].x, intersections[i+1].y));
    }

    if(closed)
        slices.push(new Phaser.Geom.Triangle(this.origin.x, this.origin.y, intersections[0].x, intersections[0].y, intersections[intersections.length-1].x, intersections[intersections.length-1].y));

    return slices;
}
