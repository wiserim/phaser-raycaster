# Change Log

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
