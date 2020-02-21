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

## Getting started
### 1. Include plugin in your project:
```html
<!--CDN-->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/phaser-raycaster@0.6.0/dist/phaser-raycaster.min.js"></script>
```
```
# NPM
npm install phaser-raycaster
```
### 2. Enable plugin in your Game config:
```javascript
let config = {
    type: Phaser.Auto,
    parent: 'game',
    width: 800,
    height: 600,
    backgroundColor: "black",
    scene: [
        Scene1
    ],
    plugins: {
        scene: [
            {
                key: 'PhaserRaycaster',
                plugin: PhaserRaycaster,
                mapping: 'raycasterPlugin'
            }
        ]
    }
}

new Phaser.Game(config);
```
### 3. Create new raycaster in your scene:
```javascript
create() {
  this.raycaster = this.raycasterPlugin.createRaycaster({
    boundingBox: {
      x: 0,
      y: 0,
      width: 800,
      height: 600
    },
    // additional options
  });
  
  // additional code
}
```
### 4. Create new ray
```javascript
create() {
  // additional code
  
  this.ray = this.raycaster.createRay({
    // additional options
  });
  
  // additional code
}
```
### 5. Map game objects which will be tested by rays
```javascript
//create game object
this.rectangle = this.add.rectangle(100, 100, 50, 50)
  .setStrokeStyle(1, 0xff0000);

//map game object
this.raycaster.mapGameObjects(this.rectangle);

//create group
this.group = this.add.group();

//map game objects actually in group
this.raycaster.mapGameObjects(this.group.getChildren());
```
### 6. Cast ray
```javascript
//set ray position
this.ray.setOrigin(400, 300);
//set ray direction (in radians)
this.ray.setAngle(2);
//cast single ray and get closets intersection with mapped objects
let intersection = this.ray.cast();

//cast rays toward all mapped objects vertices / points
let intersections = this.ray.castall();
```
