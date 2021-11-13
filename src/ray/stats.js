/**
 * Get ray statistics for last casting. Stats include
 * * number of casted rays,
 * * number of tested mapped objects,
 * * number of tested map segments.
 * * casting time
 *
 * @method Raycaster.Ray#getStats
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.10
 *
 * @return {object} Statisticss from last casting.
 */
 export function getStats() {
     return this._stats;
 }