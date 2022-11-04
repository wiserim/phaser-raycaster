/**
 * Set segment count for cirle's map.
 * If set to 0, map won't be generating segments and relay only on tangent points calculated for currently testing ray.
 *
 * @method Raycaster.Map#setSegmentCount
 * @memberof Raycaster.Map
 * @instance
 * @since 0.6.0
 *
 * @param {number} count - Circle map's segment count.
 *
 * @return {Raycaster.Map} {@link Raycaster.Map Raycaster.Map} instance
 */
export function setSegmentCount(count) {
    this.segmentCount = count;
    this.circle = count ? false : true;

    this.updateMap();
    return this;
}
