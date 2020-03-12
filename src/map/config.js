/**
 * Configure map on creation.
 *
 * @function Map.config
 * @since 0.6.0
 *
 * @param {object} [options] - Ray's congfiguration options. May include:
 * - {object} object - Mapped game object
 * - {string} [type] - Map type. If not defined, will be determined from object
 * - {boolean} [dynamic] = false - If set true, map will be dynamic (updated on scene update event).
 * - {integer} [segmentCount] = 0 - Circle map's segment count. If set to 0, map won't be generating segments and relay only on generated tangent point to actually testing ray.
 *
 * @return {object} Map object.
 */
export function config(options) {
    this.object = options.object;
    //object type
    if(options.type === undefined)
        options.type = options.object.type;
    this.type = options.type;

    switch(options.type) {
        case 'Polygon':
            this.getPoints = this._getPolygonPoints;
            this.getSegments = this._getPolygonSegments;
            this.updateMap = this._updatePolygonMap;
            break;
        case 'Arc':
            this.getPoints = this._getArcPoints;
            this.getSegments = this._getArcSegments;
            this.updateMap = this._updateArcMap;
            break;
        case 'Line':
            this.getPoints = this._getLinePoints;
            this.getSegments = this._getLineSegments;
            this.updateMap = this._updateLineMap;
            break;
        default:
            this.getPoints = this._getRectanglePoints;
            this.getSegments = this._getRectangleSegments;
            this.updateMap = this._updateRectangleMap;
    }

    //dynamic map
    this.dynamic = (options.dynamic == true) ? true : false;
    this.segmentCount = (options.segmentCount) ? options.segmentCount : 0;

    return this;
}
