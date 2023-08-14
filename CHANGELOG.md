# Change Log
## Version 0.10.9 - 2023.08.

### Updates
* `Map.updateMap` method for matter objects now ignores internal segments in concave bodies.

### Bug fixes

* `Ray.cast` method won't test mapped object when ray is inside of mapped object and hit another mapped object within / overlap the first one.
* `Map.updateMap` method for matter objects don't map properly non enclosed concave bodies.

## Version 0.10.8 - 2023.08.08

### Bug fixes

* Typo in `Map.updateMap` method for polygons.
* Typo in `Map.updateMap` method for containers.
* Fixed code changes caused by faulty linter.

## Version 0.10.7 - 2023.08.06

### Updates

* `Map.updateMap` method now add array of neighbours to points in `Map.points`.
* Optimisation of `Map.updateMap` method for tilemaps.
* `Ray.castCircle` and `Ray.castCone` methods now checks if ray is "glancing" mapped objects.
* `Ray.cast` method now won't test mapped object if current closest intersection is closer to ray than it's bounding box.

### Bug fixes

* `Raycaster.removeMappedObjects` method isn't checking if passed objects are mapped.
* `Map.destroy` method doesn't work properly for Arcade and Matter bodies (fixed by @dreasgrech). 
* Fixed docs typos

---

## Version 0.10.6 - 2023.01.30

### Updates

* Added `Raycaster.dynamicMappedObjects` to store dynamic maps.
* `Raycaster.update` method now traverse through `Raycaster.dynamicMappedObjects` to update maps.
* Setting `Raycaster.Map.dynamic` now updates `Raycaster.dynamicMappedObjects` and `Ratcaster._stats`.

### Bug fixes

* `Raycaster.drawDebug` method isn't checking if mapped object has defined data property.
* `Raycaster.destroy` method isn't destroying `Raycaster.graphics` object used for debug.
* `Raycaster.destroy` method isn't removing scene's `update` event listener.
* `Ray.destroy` method isn't destroying `Ray.graphics` object used for debug.

---

## Version 0.10.5 - 2022.11.04

### Features

* Added TypeScript typings.

### Updates

* Updated `PhaserRaycaster` plugin class.

### Bug fixes

* Fixed docs typos

---

## Version 0.10.4 - 2022.06.28

### Updates

* `Raycaster.mapGameObjects` method now checks if mapped object is supported.
* `Map.updateMap` method for container objects now checks if mapped children objects are supported.

---

## Version 0.10.3 - 2022.06.27

### New features

* Added `Ray.destroy` method.
* Added `Map.destroy` method.
* Added `Raycaster.destroy` method.
* Added `mapChild` option to `Map.config` parameters.

### Updates

* `Raycaster.removeMappedObjects` method now also destroys `Map` objects.
* Container's `Map` now allows to choose single child element which will be mapped, by passing it as `mapChild` option to `Map.config` parameters.
* Container's `Map` now allows to use circle map children with `Map.segmentCount` set to 0. Transformed children circles are stored in `Map._circles` property.
* Updated NPM dev dependencies.

---

## Version 0.10.2 - 2021.12.20

### Bug fixes

* `Ray.overlap` - method is using deprecated method `Ray.testOverlap` instead of `Ray.testArcadeOverlap` to test Arcade body.

---

## Version 0.10.1 - 2021.11.16

### Bug fixes

* `Raycaster.update` - typo in code.
* `Ray.cast`, `Ray.castCircle` and `Ray.castCone` methods after optimization in fringe cases when ray "glanced" object's border box corner didn't detect hit properly.

---

## Version 0.10.0 - 2021.11.13

### New features

* Added debug mode.
* Added statistics.
* Added additional intersection data. Each point contains reference to hit mapped object and it's segment if available.

### Updates

* `Ray.cast`, `Ray.castCircle` and `Ray.castCone` methods optimization.

---

## Version 0.9.4 - 2021.08.20

### Bug fixes

* `Map.config` doesn't add `Map.getBoundingBox` method to containers map.
* `Raycaster.mapGameObjects` doesn't add map to data attribute if it's already enabled.

### Updates

* `Ray.cast`, `Ray.castCircle` and `Ray.castCone` methods return additionally hit mapped objects and segments.

---

## Version 0.9.3 - 2021.03.07

### Updates

* `Ray.cast`, `Ray.castCircle` and `Ray.castCone` methods return additionally hit mapped objects and segments.

---

## Version 0.9.2 - 2020.02.13

### Bug fixes

* `Raycaster.mapGameObjects` doesn't map `Phaser.Tilemaps.TilemapLayer` which replaced `Phaser.Tilemaps.StaticTilemapLayer` and `Phaser.Tilemaps.DynamicTilemapLayer` in Phaser 3.50.0.

---

## Version 0.9.1 - 2020.12.13

### New features

* Added matter physics game objects collision methods to `Ray`.
* `Ray.setCollisionCategory` is new method that sets the collision category of `Ray` matter body.
* `Ray.setCollisionGroup` is new method that sets the collision category of `Ray` matter body.
* `Ray.setCollidesWith` is new method that sets the collision mask for `Ray` matter body.
* `Ray.setOnCollide` is new method that sets `onCollide` event's calback for `Ray` matter body.
* `Ray.setOnCollideEnd` is new method that sets `onCollideEnd` event's calback for `Ray` matter body.
* `Ray.setOnCollideActive` is new method that sets `onCollideActive` event's calback for `Ray` matter body.
* `Ray.setOnCollideWith` is new method that sets `onCollide` event's calback for `Ray` matter body when it collides with the given body or bodies.

### Bug fixes

* `Ray.processOverlap` method return false for all arcade bodies.

---

## Version 0.9.0 - 2020.11.26

### New features

* Added matter physics support.
* `Raycaster.mapGameObjects` now accepts matter bodies.
* `Map` can now map matter bodies.
* `Map.getBoundingBox` is new method that allows to get map bounding box.
* `Map.forceConvex` is new property that force using matter body's convex body (hull) for mapping.
* `Map.forceVerticesMapping` is new property that force using circle matter body's vertices for mapping.
* `Ray.enablePhysics` is new method that creates arcade / matter physics body for ray.
* `Ray.bodyType` is new property which define if ray's body use arcade or matter physics.


### Updates

* `Ray.enableArcadeBody` was replaced by `Ray.enablePhysics`.
* `Ray.processOverlap` now also accepts matter bodies and matter CollisionInfo objects.
* `Map` contains now reference to `Raycaster` object.

---

## Version 0.8.1 - 2020.09.08

### New features

* `Ray.round` is new property that determines if ray's hit point will be rounded.

### Updates

* Slight ray casting optimisation: raycaster will cast ray at each angle only once.

---

## Version 0.8.0 - 2020.05.22

### New features

* `Ray.intersections` is new property that stores intersections calculated by last casting.
* `Ray.slicedIntersections` is new property that stores intersections calculated by last casting sliced into array of `Phaser.Geom.Triangle` objects.
* `Ray.autoSlice` is new property that determine if after casting, intesections should be sliced.
* `Ray.slice` is new method that allows to slice array of intersections into array of `Phaser.Geom.Triangle` objects.
* `Ray.enableArcadeBody` is new method that creates arcade physics body for ray.
* `Ray.overlap` is new method that allows to if game objects wih physics bodies overlap ray's field of view.
* `Ray` can be added to arcade physics collider / overlap.

### Updates

* `Ray.range` was renamed to `Ray.rayRange`.
* `Ray.setRange` was renamed to `Ray.setRayRange`.

---

## Version 0.7.3 - 2020.04.21

### New features

* `Map` can now map `Phaser.Tilemaps.StaticTilemapLayer` and `Phaser.Tilemaps.DynamicTilemapLayer` objects.

---

## Version 0.7.2 - 2020.03.29

### New features

* `Map` can be enabled / disabled with `Map.active` option. Disabled map return empty arrays instead of its points and segments and won't be updated.
* `Raycaster.enableMaps` is new methods that allows to enable objects maps by passing game object / game objects array as an argument.
* `Raycaster.disableMaps` is new methods that allows to disable objects maps by passing game object / game objects array as an argument.

---

## Version 0.7.1 - 2020.03.25

### New features

* `Map` can now map `Phaser.GameObjects.Container` objects and its children. At this moment circle maps of container's children are tested by `Ray` objects properly only when `Raycaster.mapSegmentCount` or `Map.segmentCount` is set above 0 (when circle map consists of segments which number is defined by `Map.segmentCount`).

### Updates
* Automatic map updates on update event can be now disabled, by passing `autoUpdate` option to raycaster constructor.

### Bug fixes

* Typo in `Ray.setDetectionRange` method.
* In `Ray.cast` method, when ray's range is set below `Phaser.Math.MAX_SAFE_INTEGER` and theres no available intersections within detection range, method was trying to calculate ray's target distance to ray origin, even if target was not passed.

---

## Version 0.7.0 - 2020.03.06

### New features

* `Ray.castCone` is new method that allows to cast rays in a cone. cone direction is defined by `Ray.angle` and cone angle is defined by `Ray.cone`.
* `Ray.setCone` is new method that allows to set `Ray.cone` (`Ray.castCone` method's cone angle).
* `Ray.setConeDeg` is new method that allows to set `Ray.cone` (`Ray.castCone` method's cone angle) in degrees.

---

## Version 0.6.4 - 2020.02.23

### Updates

* `Ray.angle` is now normalized (between 0 - 2π).

---

## Version 0.6.3 - 2020.02.23

### Bug fixes

* Not defining `Raycaster.boundingBox` when physics was not defined caused error.

---

## Version 0.6.2 - 2020.02.23

### Bug fixes

* Not defining `Raycaster.boundingBox` when physics was not defined caused error.

---

## Version 0.6.1 - 2020.02.22

### New features

* `Ray.setAngleDeg` is new method that allows to set `Ray.angle` in degrees.


### Updates

* `Raycaster`: bounds will be set to the world bounds by default.
* `Ray.castAll`: method renamed to `Ray.castCircle`.

### Bug fixes

* Not passing argument to `Raycaster.createRay` method caused error.
