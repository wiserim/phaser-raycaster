# Phaser Raycaster
Raycasting plugin for Phaser 3.

[![GitHub release](https://img.shields.io/github/release/wiserim/phaser-raycaster.svg)](https://github.com/wiserim/phaser-raycaster/releases) [![npm](https://img.shields.io/npm/v/phaser-raycaster.svg)](https://www.npmjs.com/package/phaser-raycaster) [![GitHub](https://img.shields.io/github/license/wiserim/phaser-raycaster.svg)](https://github.com/wiserim/phaser-raycaster/blob/master/LICENSE) [![Github file size](https://img.shields.io/github/size/wiserim/phaser-raycaster/dist/phaser-raycaster.min.js.svg)](https://github.com/wiserim/phaser-raycaster)

## WIP
Plugin is functional, but still work in progress. Require further improvements.

**TODO:**
* documentation and examples,
* raycasting optimization,
* casting ray in a cone,
* implementing Matter.js support,
* raycasting for tilemaps.


Phaser Raycaster is a [Phaser 3](https://github.com/photonstorm/phaser) plugin which provide raycasting for geometric game objects and sprites.
It doesn't require Matter.js (but it's support is planned) and can be used with arcade physics.

**Features:**
* works with arcade physics,
* cast rays in a single direction or 360 degrees,
* test rays on mapped game objects (lines, rectangles, polygons, circles and sprites),
* provides closest intersection points between rays and tested objects,
* tests can be made on all mapped objects or only selected ones,
* static and dynamic mapping for individual objects,
* mapped objects intersections detection,
* rays can test objects below defined range,


***NPM***
```
npm install phaser-raycaster
```

***CDN***

[https://www.jsdelivr.com/package/npm/phaser-raycaster](https://www.jsdelivr.com/package/npm/phaser-raycaster)
