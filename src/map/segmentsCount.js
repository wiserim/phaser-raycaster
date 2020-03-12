/**
 * Set segment count for cirle's map.
 *
 * @function Map.setSegmentCount
 * @since 0.6.0
 *
 * @param {integer} [count] - Circle's map segments count.
 *
 * @return {object} Map object.
 */
export function setSegmentCount(count) {
    this.segmentCount = count;
        this.updateMap();
        return this;
}
