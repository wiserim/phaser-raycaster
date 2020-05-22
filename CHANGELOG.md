# Change Log

## Version 0.8.0 - 2020.05.22

### New features

* `Ray.intersections` is new property that stores intersections calculated by last casting.
* `Ray.slicedIntersections` is new property that stores intersections calculated by last casting sliced into array of `Phaser.Geom.Triangle` objects.
* `Ray.autoSlice` is new property that determine if after casting, intesections should be sliced.
* `Ray.slice` is new method that allows to slice array of intersections into array of `Phaser.Geom.Triangle` objects.
* `Ray.enableArcadeBody` is new method that creates arcade physics body for raycaster.
* `Ray.overlap` is new method that allows to if game objects wih physics bodies overlap ray's field of view.
* `Ray` can be addet to arcade physics collider / overlap.

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
