/**
 * Destroy object
 *
 * @method Raycaster.Ray#destroy
 * @memberof Raycaster.Ray
 * @instance
 * @since 0.10.3
 */
 export function destroy() {
    for(let key in this) {
        delete this[key];
    }
 }