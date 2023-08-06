/**
 * Draw rays in debug mode
 *
 * @method Raycaster.Ray#drawDebug
 * @memberof Raycaster
 * @private
 * @since 0.10.0
 * 
 * @param {Phaser.Geom.Point[]} Array of points of ray's closest intersections with tested objects.
 * 
 * @return {Raycaster.Ray} {@link Raycaster.Ray Raycaster.Ray} instance
 */
export function drawDebug(intersections) {
    if(this.graphics === undefined || !this._raycaster.debugOptions.enabled)
        return this;

    //clear
    this.graphics.clear();

    if(!this._raycaster.debugOptions.rays)
        return this;
    
    if(this._raycaster.debugOptions.graphics.ray) {
        this.graphics.lineStyle(1, this._raycaster.debugOptions.graphics.ray);

        for(let intersection of intersections) {
            this.graphics.strokeLineShape({
                x1: this.origin.x,
                y1: this.origin.y,
                x2: intersection.x,
                y2: intersection.y
            });
        }
    }

    if(this._raycaster.debugOptions.graphics.rayPoint) {
        this.graphics.fillStyle(this._raycaster.debugOptions.graphics.rayPoint);

        this.graphics.fillPoint(this.origin.x, this.origin.y, 3);
        
        for(let intersection of intersections) {
            this.graphics.fillPoint(intersection.x, intersection.y, 3);
        }
    }

    return this;
}