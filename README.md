# Phaser Raycaster
Raycasting plugin for Phaser 3.

[![GitHub release](https://img.shields.io/github/release/wiserim/phaser-raycaster.svg)](https://github.com/wiserim/phaser-raycaster/releases) [![npm](https://img.shields.io/npm/v/phaser-raycaster.svg)](https://www.npmjs.com/package/phaser-raycaster) [![GitHub](https://img.shields.io/github/license/wiserim/phaser-raycaster.svg)](https://github.com/wiserim/phaser-raycaster/blob/master/LICENSE) [![Github file size](https://img.shields.io/github/size/wiserim/phaser-raycaster/dist/phaser-raycaster.min.js.svg)](https://github.com/wiserim/phaser-raycaster) [![](https://data.jsdelivr.com/v1/package/npm/phaser-raycaster/badge?style=rounded)](https://www.jsdelivr.com/package/npm/phaser-raycaster)

Phaser Raycaster is a [Phaser 3](https://github.com/photonstorm/phaser) plugin which provide raycasting for geometric game objects, sprites, Arcade Physics and Matter.js bodies.

Documentation: [https://wiserim.github.io/phaser-raycaster/](https://wiserim.github.io/phaser-raycaster/)

Code examples are available on CodePen: [LINK](https://codepen.io/collection/AOOQWr)

**Features:**
* compatible with arcade and matter physics,
* raycasting in a single direction, 360 degrees circle or in a cone,
* visibility detection (collision detection with game objects),
* test rays on mapped game objects (containers, lines, rectangles, polygons, circles, sprites, tilemaps and matter bodies),
* provides closest intersection points between rays and tested objects,
* tests can be made on all mapped objects, selected ones or only ones within detection range,
* static and dynamic mapping for individual objects,
* mapped objects intersections detection,
* debug mode.

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
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/phaser-raycaster@0.10.7-a/dist/phaser-raycaster.min.js"></script>
```
```
# NPM
npm install phaser-raycaster
```
### 2. Enable plugin in your Game config:
```javascript
import PhaserRaycaster from 'phaser-raycaster'

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
If you're using TypeScript, you need to add to scene plugin class:
```javascript
import PhaserRaycaster from 'phaser-raycaster'

export default class MyScene extends Phaser.Scene {
  raycasterPlugin: PhaserRaycaster

  // aditional code
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
//cast single ray and get closets intersection, hit mapped object and hit segment
let intersection = this.ray.cast();
let hitObject = intersection.object;
let hitSegment = intersection.segment;

//cast rays in all directions (toward all mapped objects vertices / points)
let intersections = this.ray.castCircle();

//set ray's cone angle (in radians)
this.ray.setCone(1);
//set ray's cone angle (in degrees)
this.ray.setConeDeg(90);

//cast rays in a cone
let intersections = this.ray.castCone();
```

### 7. Raycaster bounding box
By default Raycaster is setting it's bounding box based on Arcade Physics / Matter physics world bounds.
If world size will change after creation of Raycaster, bounding box needs to be updated.
```javascript
//define bounds
var bounds = new Phaser.Geom.Rectangle(x, y, width, height);

//get world bounds (arcade physics)
bounds = this.worldLayer.getBounds();

//get bounds (matter physics)
let walls = this.matter.world;
bounds = new Phaser.Geom.Rectangle(
  walls.top.vertices[3].x, //x
  walls.top.vertices[3].y, //y
  walls.bottom.vertices[1].x - walls.top.vertices[3].x, //width
  walls.bottom.vertices[1].y - walls.top.vertices[3].y //height
)

//set bounding box on raycaster creation
var raycaster = this.raycasterPlugin.createRaycaster({
  boundingBox: bounds
});

//set bounding box after creation
raycaster.setBoundingBox(x, y, width, height);
```

### 8. Collisions (arcade physics)
```javascript
//enable auto slicing field of view
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
  * What to do with game objects in line of sight.
  */
}, this.ray.processOverlap.bind(this.ray));
```

### 9. Collisions (matter physics)
```javascript
//enable auto slicing field of view
this.ray.autoSlice = true;
//enable matter physics body
this.ray.enablePhysics('matter');
//cast ray
this.ray.castCircle();

//get all game objects and bodies in field of view (which bodies overlap ray's field of view)
let visibleObjects = this.ray.overlap();

//get objects and bodies in field of view
visibleObjects = this.ray.overlap([gameObject1, gameObject2, body1, body2]);

//check if object or body is in field of view
visibleObjects = this.ray.overlap(gameObject);

//add onCollide event
this.ray.setOnCollide(function(collisionInfo){
  //get body
  let body = collisionInfo.bodyA.label === 'phaser-raycaster-ray-body' ? collisionInfo.bodyB : collisionInfo.bodyA;
    /*
    * What to do with game object which enters line of sight .
    */
  }
});

//add onCollideWith event
this.ray.setOnCollideWith(body, function(body, collisionInfo){
    /*
    * What to do with game object which enters line of sight.
    */
  }
});

//add onCollideEnd event
this.ray.setOnCollideEnd(function(collisionInfo){
  //get body
  let body = collisionInfo.bodyA.label === 'phaser-raycaster-ray-body' ? collisionInfo.bodyB : collisionInfo.bodyA;
    /*
    * What to do with game object which leaves line of sight.
    */
  }
});

//add onCollideActive event
this.ray.setOnCollide(function(collisionInfo){
  //get body
  let body = collisionInfo.bodyA.label === 'phaser-raycaster-ray-body' ? collisionInfo.bodyB : collisionInfo.bodyA;
    /*
    * What to do with game object while it's in line of sight.
    */
  }
});
```

### 10. Destroy objects
```javascript
//remove mapped objects
this.raycaster.removeMappedObjects(object);
this.raycaster.removeMappedObjects(arrayOfObjects);

//destroy ray
this.ray.destroy();

//destroy raycaster
this.raycaster.destroy();
```

### 11. Statistics
```javascript
//get raycaster statistics
let statistics = this.raycaster.getStats();
/*
  statistics = {
    mappedObjects: {
      total - mapped objects total
      static - static maps
      dynamic - dynamic maps
      rectangleMaps - rectangle maps
      polygonMaps - polygon maps
      circleMaps - circle maps
      lineMaps - line maps
      containerMaps - container maps
      tilemapMaps - tilemap maps
      matterMaps - matter body maps
    }
  }
*/

//get ray statistics
let rayStatistics = this.ray.getStats();
/*
  rayStatistics = {
    method - used casting method (cast, castCircle, castCone)
    rays - casted rays
    testedMappedObjects - tested mapped objects
    hitMappedObjects - hit mapped objects
    segments - tested segments
    time - casting time
  }
*/
```

### 12. Debug mode
```javascript
  //enable debug mode
  this.raycaster = this.raycasterPlugin.createRaycaster({
    debug: true
  });

  //advanced debug mode options
  this.raycaster = this.raycasterPlugin.createRaycaster({
    debug: {
      enabled: false, //enable debug mode
      maps: true, //enable maps debug
      rays: true, //enable rays debug
      graphics: {
          ray: 0x00ff00, //debug ray color; set false to disable
          rayPoint: 0xff00ff, //debug ray point color; set false to disable
          mapPoint: 0x00ffff, //debug map point color; set false to disable
          mapSegment: 0x0000ff, //debug map segment color; set false to disable
          mapBoundingBox: 0xff0000 //debug map bounding box color; set false to disable
      }
    }
  });

  //change debug options after initialization
  this.raycaster.debugOptions.enabled = true;

  this.raycaster.setOptions({
    debug: true
  });

```
