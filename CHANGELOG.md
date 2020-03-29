# Change Log

## Version 0.7.2 - 29.03.2020

### New features

* `Map` can be enabled / disabled with `Map.active` option. Disabled map return empty arrays instead of its points and segments and won't be updated.
* `Raycaster.enableMaps` is new methods that allows to enable objects maps by passing game object / game objects array as an argument.
* `Raycaster.disableMaps` is new methods that allows to disable objects maps by passing game object / game objects array as an argument.

---

## Version 0.7.1 - 25.03.2020

### New features

* `Map` can now map `Phaser.GameObjects.Container` objects and its children. At this moment circle maps of container's children are tested by `Ray` objects properly only when `Raycaster.mapSegmentCount` or `Map.segmentCount` is set above 0 (when circle map consists of segments which number is defined by `Map.segmentCount`).

### Updates
* Automatic map updates on update event can be now disabled, by passing `autoUpdate` option to raycaster constructor.

### Bug fixes

* Typo in `Ray.setDetectionRange` method.
* In `Ray.cast` method, when ray's range is set below `Phaser.Math.MAX_SAFE_INTEGER` and theres no available intersections within detection range, method was trying to calculate ray's target distance to ray origin, even if target was not passed.

---

## Version 0.7.0 - 6.03.2020

### New features

* `Ray.castCone` is new method that allows to cast rays in a cone. cone direction is defined by `Ray.angle` and cone angle is defined by `Ray.cone`.
* `Ray.setCone` is new method that allows to set `Ray.cone` (`Ray.castCone` method's cone angle).
* `Ray.setConeDeg` is new method that allows to set `Ray.cone` (`Ray.castCone` method's cone angle) in degrees.

---

## Version 0.6.4 - 23.02.2020

### Updates

* `Ray.angle` is now normalized (between 0 - 2π).

---

## Version 0.6.3 - 23.02.2020

### Bug fixes

* Not defining `Raycaster.boundingBox` when physics was not defined caused error.

---

## Version 0.6.2 - 23.02.2020

### Bug fixes

* Not defining `Raycaster.boundingBox` when physics was not defined caused error.

---

## Version 0.6.1 - 22.02.2020

### New features

* `Ray.setAngleDeg` is new method that allows to set `Ray.angle` in degrees.


### Updates

* `Raycaster`: bounds will be set to the world bounds by default.
* `Ray.castAll`: method renamed to `Ray.castCircle`.

### Bug fixes

* Not passing argument to `Raycaster.createRay` method caused error.
