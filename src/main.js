/**
* @author       Marcin Walczak <contact@marcin-walczak.pl>
* @copyright    2023 Marcin Walczak
* @license      {@link https://github.com/wiserim/phaser-raycaster/blob/master/LICENSE|MIT License}
*/

/**
 * Point object
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */
 
/**
 * @classdesc
 *
 * Raycaster plugin class.
 * 
 * @namespace PhaserRaycaster
 * @class PhaserRaycaster
 * @extends Phaser.Plugins.ScenePlugin
 * @constructor
 * @since 0.6.0
 *
 * @param {Phaser.Scene} scene
 * @param {Phaser.Plugins.PluginManager} pluginManager
 */

class PhaserRaycaster extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this._Raycaster = require('./raycaster-core.js').Raycaster;
    }

    /**
    * Create Raycaster object.
    *
    * @method PhaserRaycaster#createRaycaster
    * @memberof PhaserRaycaster
    * @instance
    * @since 0.6.0
    *
    * @param {object} [options] - Raycaster's congfiguration options. May include:
    * @param {number} [options.mapSegmentCount = 0] - Number of segments of circle maps. If set to 0, map will be teste
    * @param {(object|object[])} [options.objects] - Game object or array of game objects to map.
    * @param {Phaser.Geom.Rectangle} [options.boundingBox] - Raycaster's bounding box. If not passed, {@link Raycaster Raycaster} will set it's bounding box based on Arcade Physics / Matter physics world bounds.
    * @param {boolean} [options.autoUpdate = true] - If set true, automatically update dynamic maps on scene update event.
    * @param {boolean|object} [options.debug] - Enable debug mode or configure it {@link Raycaster#debugOptions debugOptions}.
    *
    * @return {Raycaster} {@link Raycaster Raycaster} instance
    */
    createRaycaster(options = {}) {
        options.scene = this.scene;
        return new this._Raycaster(options);
    }
}

//Make sure you export the plugin for webpack to expose
module.exports = PhaserRaycaster;