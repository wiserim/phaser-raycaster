/**
 * Destroy object
 *
 * @method Raycaster.Map#destroy
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.10.3
 */
 export function destroy() {
    //destroy reference to map object in mapped object
    if(this.object.type === 'body' || this.object.type === 'composite') {
        delete object.raycasterMap;
    }
    else if(this.object.data) {
        this.object.data.remove('raycasterMap');
    }

    for(let key in this) {
        delete this[key];
    }
 }