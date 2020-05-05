/**
 * Slice ray's field of view polygon into array of triangles.
 *
 * @method Raycaster.Ray#sliceFoV
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.8.0
 *
 * @param {(object[]|Phaser.Geom.Polygon)} [fov = {Ray#fov}] - Array of points or polygon representing field of view. If not passed, filed of view from last raycaste will be used.
 * @param {boolean} [closed = true|{Ray#fov}] - Define if field of view polygon is closed (first and last vertices sholud be connected). If fov was not passed, value depends of last type of casting.
 *
 * @return {Phaser.Geom.Triangle[]} Array of triangles representing slices of field of view.
 */
export function sliceFoV(fov, closed = true) {
    if(options.fov === undefined) {
        options.fov = this.fov;
        options.closed = this.fov.closed;
    }


}
