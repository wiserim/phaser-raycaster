/**
* Get mapped object's bounding box.
*
* @method Raycaster.Map#matterBody.getBoundingBox
* @memberof Raycaster.Map
* @instance
* @private
* @since 0.9.0
*
* @return {Phaser.Geom.Rectangle} - Mapped object's bounding box.
*/
export function getBoundingBox() {
    return this.object.getBounds();
}
