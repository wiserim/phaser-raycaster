# Phaser Raycaster
Raycasting plugin for Phaser 3.

[![GitHub release](https://img.shields.io/github/release/wiserim/phaser-raycaster.svg)](https://github.com/wiserim/phaser-raycaster/releases) [![npm](https://img.shields.io/npm/v/phaser-raycaster.svg)](https://www.npmjs.com/package/phaser-raycaster) [![GitHub](https://img.shields.io/github/license/wiserim/phaser-raycaster.svg)](https://github.com/wiserim/phaser-raycaster/blob/master/LICENSE) [![Github file size](https://img.shields.io/github/size/wiserim/phaser-raycaster/dist/phaser-raycaster.min.js.svg)](https://github.com/wiserim/phaser-raycaster)

Phaser Raycaster is a [Phaser 3](https://github.com/photonstorm/phaser) plugin which provide raycasting for geometric game objects, sprites and Matter.js bodies.
It can be used with arcade physics Matter.js.

Documentation: [https://wiserim.github.io/phaser-raycaster/](https://wiserim.github.io/phaser-raycaster/)

Code examples are available on CodePen: [LINK](https://codepen.io/collection/AOOQWr)

**Features:**
* works with arcade and matter physics,
* raycasting in a single direction, 360 degrees circle or in a cone,
* visibility detection (collision detection with game objects),
* test rays on mapped game objects (containers, lines, rectangles, polygons, circles, sprites and tilemaps),
* provides closest intersection points between rays and tested objects,
* tests can be made on all mapped objects or only selected ones,
* static and dynamic mapping for individual objects,
* mapped objects intersections detection,
* rays can limit tests mapped objects below defined range.

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
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/phaser-raycaster@0.9.0/dist/phaser-raycaster.min.js"></script>
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
  this.raycaster = this.raycasterPlugin.createRaycaster(options);
  
  // additional code
}
```
### 4. Create new ray
```javascript
create() {
  // additional code
  
  this.ray = this.raycaster.createRay();
  
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

//map tilemap layer
this.map = this.make.tilemap();
this.tilemap = this.map.createStaticLayer();

this.raycaster.mapGameObjects(this.tilemap, false, {
  collisionTiles: [1,2,3] //array of tiles types which can collide with ray
});
```
### 6. Cast ray
```javascript
//set ray position
this.ray.setOrigin(400, 300);
//set ray direction (in radians)
this.ray.setAngle(2);
//set ray direction (in degrees)
this.ray.setAngleDeg(90);
//cast single ray and get closets intersection with mapped objects
let intersection = this.ray.cast();

//cast rays in all directions (toward all mapped objects vertices / points)
let intersections = this.ray.castCircle();

//set ray's cone angle (in radians)
this.ray.setCone(1);
//set ray's cone angle (in degrees)
this.ray.setCone(90);

//cast rays in a cone
let intersections = this.ray.castCone();
```

### 7. Collisions (arcade physics)
```javascript
//enable auto slicing filed of view
this.ray.autoSlice = true;
//enable arcade physics body
this.ray.enablePhysics();
//set collision (field of view) range
this.ray.setCollisionRange(200);
//cast ray
this.ray.castCircle();

//get all game objects in field of view (which bodies overlap ray's field of view)
let visibleObjects = this.ray.overlap();

//get objects in field of view
visibleObjects = this.ray.overlap(group.getChildren());

//check if object is in field of view
visibleObjects = this.ray.overlap(gameObject);

//add overlap collider (require passing ray.processOverlap as process callback)
this.physics.add.overlap(this.ray, targets, function(rayFoVCircle, target){
    /*
    * what to do in game objects in line of sight
    */
}, this.ray.processOverlap.bind(this.ray));
```

### 8. Collisions (matter physics)
```javascript
//enable auto slicing filed of view
this.ray.autoSlice = true;
//enable matter physics body
this.ray.enablePhysics('matter');
//cast ray
this.ray.castCircle();

//get all game objects and bodies in field of view (which bodies overlap ray's field of view)
let visibleObjects = this.ray.overlap();

//get objects and bodies in field of view
visibleObjects = this.ray.overlap([gameObject1, gameObject2, body1, body2]);

//check if object is in field of view
visibleObjects = this.ray.overlap(gameObject);

//add collider (require passing ray.overlap in callback to check if body's in field of view)
this.ray.body.setOnCollideWith(body, function(body){
    let overlap = this.ray.overlap(body);

    if(overlap) {
      /*
      * what to do in game objects in line of sight
      */
    }
});
```
