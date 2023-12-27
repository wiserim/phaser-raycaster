/**
 * Point object
 */
declare type Point = {
    x: number;
    y: number;
};

/**
 * Raycaster plugin class.
 */
declare class PhaserRaycaster extends Phaser.Plugins.ScenePlugin {
    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager);
    /**
     * Create Raycaster object.
     * @param [options] - Raycaster's congfiguration options. May include:
     * @param [options.mapSegmentCount = 0] - Number of segments of circle maps. If set to 0, map will be teste
     * @param [options.objects] - Game object or array of game objects to map.
     * @param [options.boundingBox] - Raycaster's bounding box. If not passed, {@link Raycaster Raycaster} will set it's bounding box based on Arcade Physics / Matter physics world bounds.
     * @param [options.autoUpdate = true] - If set true, automatically update dynamic maps on scene update event.
     * @param [options.debug] - Enable debug mode or configure it {@link Raycaster#debugOptions debugOptions}.
     * @returns {@link Raycaster Raycaster} instance
     */
    createRaycaster(options?: {
        mapSegmentCount?: number;
        objects?: any | object[];
        boundingBox?: Phaser.Geom.Rectangle;
        autoUpdate?: boolean;
        debug?: boolean | any;
    }): Raycaster;
}

declare namespace Raycaster {
    /**
     * Map class responsible for mapping game objects.
     * @param options - Map specific configuration settings.
     * @param [raycaster] - Parent raycaster object.
     */
    class Map {
        constructor(options: any, raycaster?: Raycaster);
        /**
         * Configure map.
         * @param [options] - Map's congfiguration options. May include:
         * @param options.object - Game object to map
         * @param [options.type] - Map type. If not defined, it will be determined based on object.
         * @param [options.dynamic = false] - If set true, map will be dynamic (updated on scene update event).
         * @param [options.active = true] - If set true, map will be active (will provide points, segments and will be updated).
         * @param [options.segmentCount] - Circle map's segment count. If set to 0, map won't be generating segments and relay only on tangent points calculated for currently testing ray.
         * @param [options.mapChild] - Container's child. If set, only set child will be mapped.
         * @param [options.forceConvex] - If set true, matter body map will use convex body (hull) for non-covex bodies.
         * @param [options.forceVerticesMapping] - If set true, matter body map will use only vertices for mapping circle bodies.
         * @returns {@link Raycaster.Map Raycaster.Map} instance
         */
        config(options?: {
            object: any;
            type?: string;
            dynamic?: boolean;
            active?: boolean;
            segmentCount?: number;
            mapChild?: any;
            forceConvex?: boolean;
            forceVerticesMapping?: boolean;
        }): Raycaster.Map;
        /**
         * Destroy object
         */
        destroy(): void;
        /**
         * Mapped object's type
         */
        readonly type: string;
        /**
         * If set true, map will be tested by ray. Otherwise it will be ignored.
         */
        active: boolean;
        /**
         * If set true, map will be treated by ray as circle. Set automaticalyy on map update.
         */
        circle: boolean;
        /**
         * Reference to mapped object.
         */
        readonly object: any;
        /**
         * Get array of mapped object's vertices used as rays targets.
         * @param [ray] - {@link Raycaster.Ray Raycaster.Ray} object used in some some types of maps.
         * @returns Array of mapped object's vertices.
         */
        getPoints(ray?: Raycaster.Ray): Phaser.Geom.Point[];
        /**
         * Get array of mapped object's segments used to test object's intersection with ray.
         * @param [ray] - {@link Raycaster.Ray Raycaster.Ray} object used in some some types of maps.
         * @returns Array of mapped object's segments.
         */
        getSegments(ray?: Raycaster.Ray): Phaser.Geom.Line[];
        /**
         * Get mapped object's bounding box.
         * @returns Mapped object's bounding box.
         */
        getBoundingBox(): Phaser.Geom.Rectangle;
        /**
         * Update object's map of points and segments.
         * @returns {@link Raycaster.Map Raycaster.Map} instance
         */
        updateMap(): Raycaster.Map;
        /**
         * Set tile types which should be mapped (for Phaser.Tilemaps.StaticTilemapLayer and Phaser.Tilemaps.DynamicTilemapLayer maps only).
         * @param [tiles = []] - Set of tile's indexes to map.
         * @returns {@link Raycaster.Map Raycaster.Map} instance
         */
        setCollisionTiles(tiles?: any[]): Raycaster.Map;
        /**
         * Set segment count for cirle's map.
         * If set to 0, map won't be generating segments and relay only on tangent points calculated for currently testing ray.
         * @param count - Circle map's segment count.
         * @returns {@link Raycaster.Map Raycaster.Map} instance
         */
        setSegmentCount(count: number): Raycaster.Map;
    }
    /**
     * Ray class responsible for casting ray's and testing their collisions with mapped objects.
     * @param [options] - Ray's congfiguration options. May include:
     * @param [options.origin = {x:0, y:0}] - Ray's position.
     * @param [options.angle = 0] - Ray's angle in radians.
     * @param [options.angleDeg = 0] - Ray's angle in degrees.
     * @param [options.cone = 0] - Ray's cone angle in radians.
     * @param [options.coneDeg = 0] - Ray's cone angle in degrees.
     * @param [options.range = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
     * @param [options.collisionRange = Phaser.Math.MAX_SAFE_INTEGER] - Ray's maximum collision range of ray's field of view.
     * @param [options.detectionRange = Phaser.Math.MAX_SAFE_INTEGER] - Maximum distance between ray's position and tested objects bounding boxes.
     * @param [options.ignoreNotIntersectedRays = true] - If set true, ray returns false when it didn't hit anything. Otherwise returns ray's target position.
     * @param [options.autoSlice = false] - If set true, ray will automatically slice intersections into array of triangles and store it in {@link Raycaster.Ray#slicedIntersections Ray.slicedIntersections}.
     * @param [options.round = false] - If set true, point where ray hit will be rounded.
     * @param [options.enablePhysics = false] - Add to ray physics body. Body will be a circle with radius equal to {@link Raycaster.Ray#collisionRange Ray.collisionRange}. If set true, arcade physics body will be added.
     * @param [raycaster] - Parent raycaster object.
     */
    class Ray {
        constructor(options?: {
            origin?: Phaser.Geom.Point | Point;
            angle?: number;
            angleDeg?: number;
            cone?: number;
            coneDeg?: number;
            range?: number;
            collisionRange?: number;
            detectionRange?: number;
            ignoreNotIntersectedRays?: boolean;
            autoSlice?: boolean;
            round?: boolean;
            enablePhysics?: boolean | 'arcade' | 'matter';
        }, raycaster?: Raycaster);
        /**
         * Set ray's angle (direction) in radians.
         * @param [angle = 0] - Ray's angle in radians.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setAngle(angle?: number): Raycaster.Ray;
        /**
         * Set ray's angle (direction) in degrees.
         * @param [angle = 0] - Ray's angle in degrees.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setAngleDeg(angle?: number): Raycaster.Ray;
        /**
         * Cast ray to find closest intersection with tested mapped objects.
         * @param [options] - options that may include:
         * @param [options.objects = {Raycaster#mappedObjects}] - Array of game objects to test. If not provided test all mapped game objects.
         * @param [options.target] - Ray's target point. Used in other casting methods to determine if ray was targeting mapped objects point.
         * @param [options.internal = false] - Flag determining if method is used by other casting method.
         * @returns Ray's closest intersection with tested objects. Returns false if no intersection has been found. Additionally contains reference to hit mapped object and segment if available.
         */
        cast(options?: {
            objects?: object[];
            target?: Phaser.Geom.Point | Point;
            internal?: boolean;
        }): Phaser.Geom.Point | boolean;
        /**
         * Cast ray in all directions to find closest intersections with tested mapped objects.
         * @param [options] - options that may include:
         * @param [options.objects = Raycaster.mappedObjects] - Array of game objects to test. If not provided test all mapped game objects.
         * @returns Array of points of ray's closest intersections with tested objects. Additionally each point contains reference to hit mapped object and it's segment if available.
         */
        castCircle(options?: {
            objects?: object[];
        }): Phaser.Geom.Point[];
        /**
         * Cast ray in a cone to find closest intersections with tested mapped objects.
         * @param [options] - options that may include:
         * @param [options.objects = Raycaster.mappedObjects] - Array of game objects to test. If not provided test all mapped game objects.
         * @returns Array of points of ray's closest intersections with tested objects. Additionally each point contains reference to hit mapped object and it's segment if available.
         */
        castCone(options?: {
            objects?: object[];
        }): Phaser.Geom.Point[];
        /**
         * Set ray's cone angle (width) in radians.
         * @param [cone = 0] - Ray's cone angle in radians.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setCone(cone?: number): Raycaster.Ray;
        /**
         * Set ray's cone angle (width) in degrees.
         * @param [cone = 0] - Ray's cone angle in degrees.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setConeDeg(cone?: number): Raycaster.Ray;
        /**
         * Configure ray.
         * @param [options] - Ray's congfiguration options. May include:
         * @param [options.origin = {x:0, y:0}] - Ray's position.
         * @param [options.angle = 0] - Ray's angle in radians.
         * @param [options.angleDeg = 0] - Ray's angle in degrees.
         * @param [options.cone = 0] - Ray's cone angle in radians.
         * @param [options.coneDeg = 0] - Ray's cone angle in degrees.
         * @param [options.range = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
         * @param [options.collisionRange = Phaser.Math.MAX_SAFE_INTEGER] - Ray's maximum collision range of ray's field of view.
         * @param [options.detectionRange = Phaser.Math.MAX_SAFE_INTEGER] - Maximum distance between ray's position and tested objects bounding boxes.
         * @param [options.ignoreNotIntersectedRays = true] - If set true, ray returns false when it didn't hit anything. Otherwise returns ray's target position.
         * @param [options.autoSlice = false] - If set true, ray will automatically slice intersections into array of triangles and store it in {@link Raycaster.Ray#slicedIntersections Ray.slicedIntersections}.
         * @param [options.round = false] - If set true, point where ray hit will be rounded.
         * @param [options.enablePhysics = false] - Add to ray physics body. Body will be a circle with radius equal to {@link Raycaster.Ray#collisionRange Ray.collisionRange}. If set true, arcade physics body will be added.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        config(options?: {
            origin?: Phaser.Geom.Point | Point;
            angle?: number;
            angleDeg?: number;
            cone?: number;
            coneDeg?: number;
            range?: number;
            collisionRange?: number;
            detectionRange?: number;
            ignoreNotIntersectedRays?: boolean;
            autoSlice?: boolean;
            round?: boolean;
            enablePhysics?: boolean | 'arcade' | 'matter';
        }): Raycaster.Ray;
        /**
         * Destroy object
         */
        destroy(): void;
        /**
         * Add to ray physics body. Body will be a circle with radius equal to {@link Raycaster.Ray#collisionRange Ray.collisionRange}. Physics body can be added only once.
         * @param [type = 'arcade'] - Physics type
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        enablePhysics(type?: 'arcade' | 'matter'): Raycaster.Ray;
        /**
         * Sets the collision category of this ray's Matter Body. This number must be a power of two between 2^0 (= 1) and 2^31.
         * Two bodies with different collision groups (see {@link #setCollisionGroup}) will only collide if their collision
         * categories are included in their collision masks (see {@link #setCollidesWith}).
         * @param value - Unique category bitfield.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setCollisionCategory(value: number): Raycaster.Ray;
        /**
         * Sets the collision category of this ray's Matter Body. This number must be a power of two between 2^0 (= 1) and 2^31.
         * Two bodies with different collision groups (see {@link #setCollisionGroup}) will only collide if their collision
         * categories are included in their collision masks (see {@link #setCollidesWith}).
         * @param value - Unique category bitfield.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setCollisionCategory(value: number): Raycaster.Ray;
        /**
         * Sets the collision mask for this ray's Matter Body. Two Matter Bodies with different collision groups will only
         * collide if each one includes the other's category in its mask based on a bitwise AND, i.e. `(categoryA & maskB) !== 0`
         * and `(categoryB & maskA) !== 0` are both true.*
         * @param categories - A unique category bitfield, or an array of them.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setCollidesWith(categories: number | number[]): Raycaster.Ray;
        /**
         * The callback is sent a `Phaser.Types.Physics.Matter.MatterCollisionData` object.
         *
         * This does not change the bodies collision category, group or filter. Those must be set in addition
         * to the callback.
         * @param callback - The callback to invoke when this body starts colliding with another.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setOnCollide(callback: (...params: any[]) => any): Raycaster.Ray;
        /**
         * The callback is sent a `Phaser.Types.Physics.Matter.MatterCollisionData` object.
         *
         * This does not change the bodies collision category, group or filter. Those must be set in addition
         * to the callback.
         * @param callback - The callback to invoke when this body stops colliding with another.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setOnCollideEnd(callback: (...params: any[]) => any): Raycaster.Ray;
        /**
         * The callback is sent a `Phaser.Types.Physics.Matter.MatterCollisionData` object.
         *
         * This does not change the bodies collision category, group or filter. Those must be set in addition
         * to the callback.
         * @param callback - The callback to invoke for the duration of this body colliding with another.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setOnCollideActive(callback: (...params: any[]) => any): Raycaster.Ray;
        /**
         * The callback is sent a reference to the other body, along with a `Phaser.Types.Physics.Matter.MatterCollisionData` object.
         *
         * This does not change the bodies collision category, group or filter. Those must be set in addition
         * to the callback.
         * @param body - The body, or an array of bodies, to test for collisions with.
         * @param callback - The callback to invoke when this body collides with the given body or bodies.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setOnCollideWith(body: MatterJS.Body | MatterJS.Body[], callback: (...params: any[]) => any): Raycaster.Ray;
        /**
         * Set ray's source position.
         * @param x - X coordinate.
         * @param y - Y coordinate.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setOrigin(x: number, y: number): Raycaster.Ray;
        /**
         * Get game objects overlaping field of view.
         * @param [objects] - Game object / array off game objects to test.
         * @returns Array of game objects that overlaps with field of view.
         */
        overlap(objects?: any | object[]): object[];
        /**
         * Process callback for physics collider / overlap.
         * @param object1 - Game object or matter body passed by collider / overlap or matter CollisionInfo object.
         * @param object2 - Game object or matter body passed by collider / overlap. Ignored if matter CollisionInfo object was passed as first argument.
         * @returns Return true if game object is overlapping ray's field of view.
         */
        processOverlap(object1: any, object2: any): boolean;
        /**
         * Set ray's range.
         * @param [rayRange = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setRayRange(rayRange?: number): Raycaster.Ray;
        /**
         * Set ray's maximum detection range. Objects outside detection range won't be tested.
         * Ray tests all objects when set to 0.
         * @param [detectionRange = 0] - Maximum distance between ray's position and tested objects bounding boxes.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setDetectionRange(detectionRange?: number): Raycaster.Ray;
        /**
         * Set ray's field of view maximum collision range. Objects outside collision range won't be tested by {@link Raycaster.Ray#overlap Raycaster.Ray.overlap} method.
         * Determines ray's physics body radius.
         * @param [collisionRange = Phaser.Math.MAX_SAFE_INTEGER] - Ray's collision range and physics body radius.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setCollisionRange(collisionRange?: number): Raycaster.Ray;
        /**
         * Test if object's bounding box is in ray's detection range.
         * @param object - Tested object
         * @param [bounds = false] - Tested object's bounds. If not passed bounds will be generated automatically.
         * @returns Information if object is in ray's detection range.
         */
        boundsInRange(object: any, bounds?: Phaser.Geom.Rectangle | boolean): boolean;
        /**
         * Ray's source position.
         */
        origin: Phaser.Geom.Point;
        /**
         * Ray's angle in radians.
         */
        angle: number;
        /**
         * Ray's cone width angle in radians.
         */
        cone: number;
        /**
         * Ray's maximum range
         */
        rayRange: number;
        /**
         * Ray's maximum detection range. Objects outside detection range won't be tested.
         * Ray tests all objects when set to 0.
         */
        detectionRange: number;
        /**
         * Ray's maximum collision range of ray's field of view. Radius of {@link Raycaster.Ray#collisionRangeCircle Ray.body}.
         */
        collisionRange: number;
        /**
         * If set true, ray returns false when it didn't hit anything. Otherwise returns ray's target position.
         */
        ignoreNotIntersectedRays: boolean;
        /**
         * If set true, ray's hit points will be rounded.
         */
        round: boolean;
        /**
         * If set true, ray will automatically slice intersections into array of triangles and store it in {@link Raycaster.Ray#slicedIntersections Ray.slicedIntersections}.
         */
        autoSlice: boolean;
        /**
         * Array of intersections from last raycast representing field of view.
         */
        intersections: object[];
        /**
         * Array of triangles representing slices of field of view from last raycast.
         */
        slicedIntersections: Phaser.Geom.Triangle[];
        /**
         * Physics body for testing field of view collisions.
         */
        body: any;
        /**
         * Physics body type.
         */
        bodyType: boolean | 'arcade' | 'matter';
        /**
         * Set ray's position, direction (angle) and range.
         * @param x - X coordinate.
         * @param y - Y coordinate.
         * @param [angle] - Ray's angle in radians.
         * @param [range = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
         * @returns {@link Raycaster.Ray Raycaster.Ray} instance
         */
        setRay(x: number, y: number, angle?: number, range?: number): Raycaster.Ray;
        /**
         * Slice ray's field of view represented by polygon or array of points into array of triangles.
         * @param [fov = {Ray#fov}] - Array of points or polygon representing field of view. If not passed, filed of view from last raycaste will be used.
         * @param [closed = true|{Ray#fov}] - Define if field of view polygon is closed (first and last vertices sholud be connected). If fov was not passed, value depends of last type of casting.
         * @returns Array of triangles representing slices of field of view.
         */
        slice(fov?: object[] | Phaser.Geom.Polygon, closed?: boolean): Phaser.Geom.Triangle[];
        /**
         * Get ray statistics for last casting. Stats include
        * number of casted rays,
        * number of tested mapped objects,
        * number of tested map segments.
        * casting time
         * @returns Statisticss from last casting.
         */
        getStats(): any;
    }
}

/**
 * Raycaster class responsible for creating ray objects and managing mapped objects.
 * @param [options] - Raycaster's configuration options. May include:
 * @param [options.scene] - Scene in which Raycaster will be used.
 * @param [options.mapSegmentCount = 0] - Number of segments of circle maps. If set to 0, map will be teste
 * @param [options.objects] - Game object or array of game objects to map.
 * @param [options.boundingBox] - Raycaster's bounding box. If not passed, {@link Raycaster Raycaster} will set it's bounding box based on Arcade Physics / Matter physics world bounds.
 * @param [options.autoUpdate = true] - If set true, automatically update dynamic maps on scene update event.
 * @param [options.debug] - Enable debug mode or configure it {@link Raycaster#debugOptions debugOptions}.
 */
declare class Raycaster {
    constructor(options?: {
        scene?: Phaser.Scene;
        mapSegmentCount?: number;
        objects?: any | object[];
        boundingBox?: Phaser.Geom.Rectangle;
        autoUpdate?: boolean;
        debug?: boolean | any;
    });
    /**
     * If set true, map will be automatically updated on scene update event.
     */
    static Map_dynamic: boolean;
    /**
     * Plugin version.
     */
    readonly version: string;
    /**
     * Raycaster's debug config
     * @property [enable = false] - Enable debug mode
     * @property [maps = true] - Enable maps debug
     * @property graphics - Debug graphics options
     * @property [graphics.ray = 0x00ff00] - Debug ray color. Set false to disable.
     * @property [graphics.rayPoint = 0xff00ff] - Debug ray point color. Set false to disable.
     * @property [graphics.mapPoint = 0x00ffff] - debug map point color. Set false to disable.
     * @property [graphics.mapSegment = 0x0000ff] - Debug map segment color. Set false to disable.
     * @property [graphics.mapBoundingBox = 0xff0000] - Debug map bounding box color. Set false to disable.
     */
    debugOptions: {
        enable?: boolean;
        maps?: boolean;
        graphics: {
            ray?: boolean | number;
            rayPoint?: boolean | number;
            mapPoint?: boolean | number;
            mapSegment?: boolean | number;
            mapBoundingBox?: boolean | number;
        };
    };
    /**
     * Array of mapped game objects.
     */
    mappedObjects: object[];
    /**
     * Array of dynamic mapped game objects.
     */
    dynamicMappedObjects: object[];
    /**
     * Number of segments of circle maps.
     */
    mapSegmentCount: number;
    /**
     * Configure raycaster.
     * @param [options] - Raycaster's congfiguration options. May include:
     * @param [options.scene] - Scene in which Raycaster will be used.
     * @param [options.mapSegmentCount = 0] - Number of segments of circle maps.
     * @param [options.objects] - Game object or array of game objects to map.
     * @param [options.boundingBox] - Raycaster's bounding box.
     * @param [options.debug] - Enable debug mode or cofigure {@link Raycaster#debugOptions debugOptions}.
     * @returns {@link Raycaster Raycaster} instance
     */
    setOptions(options?: {
        scene?: Phaser.Scene;
        mapSegmentCount?: number;
        objects?: any | object[];
        boundingBox?: Phaser.Geom.Rectangle;
        debug?: boolean | any;
    }): Raycaster;
    /**
     * Set Raycaster's bounding box.
     * @param x - The X coordinate of the top left corner of bounding box.
     * @param y - The Y coordinate of the top left corner of bounding box.
     * @param width - The width of bounding box.
     * @param height - The height of bounding box.
     * @returns {@link Raycaster Raycaster} instance
     */
    setBoundingBox(x: number, y: number, width: number, height: number): Raycaster;
    /**
     * Map game objects
     * @param objects - Game object / matter body or array of game objects / matter bodies to map.
     * @param [dynamic = false] - {@link Raycaster.Map Raycaster.Map} dynamic flag (determines map will be updated automatically).
     * @param [options] - Additional options for {@link Raycaster.Map Raycaster.Map}
     * @returns {@link Raycaster Raycaster} instance
     */
    mapGameObjects(objects: any | object[], dynamic?: boolean, options?: any): Raycaster;
    /**
     * Remove game object's {@link Raycaster.Map Raycaster.Map} maps.
     * @param objects - Game object or array of game objects which maps will be removed.
     * @returns {@link Raycaster Raycaster} instance
     */
    removeMappedObjects(objects: any | object[]): Raycaster;
    /**
     * Enable game object's {@link Raycaster.Map Raycaster.Map} maps.
     * @param objects - Game object or array of game objects which maps will be enabled.
     * @returns {@link Raycaster Raycaster} instance
     */
    enableMaps(objects: any | object[]): Raycaster;
    /**
     * Disable game object's {@link Raycaster.Map Raycaster.Map} maps.
     * @param objects - Game object or array of game objects which maps will be disabled.
     * @returns {@link Raycaster Raycaster} instance
     */
    disableMaps(objects: any | object[]): Raycaster;
    /**
     * Updates all {@link Raycaster.Map Raycaster.Map} dynamic maps. Fired on Phaser.Scene update event.
     * @returns {@link Raycaster Raycaster} instance
     */
    update(): Raycaster;
    /**
     * Create {@link Raycaster.Ray Raycaster.Ray} object.
     * @param [options] - Ray's congfiguration options. May include:
     * @param [options.origin = {x:0, y:0}] - Ray's position.
     * @param [options.angle = 0] - Ray's angle in radians.
     * @param [options.angleDeg = 0] - Ray's angle in degrees.
     * @param [options.cone = 0] - Ray's cone angle in radians.
     * @param [options.coneDeg = 0] - Ray's cone angle in degrees.
     * @param [options.range = Phaser.Math.MAX_SAFE_INTEGER] - Ray's range.
     * @param [options.collisionRange = Phaser.Math.MAX_SAFE_INTEGER] - Ray's maximum collision range of ray's field of view.
     * @param [options.detectionRange = Phaser.Math.MAX_SAFE_INTEGER] - Maximum distance between ray's position and tested objects bounding boxes.
     * @param [options.ignoreNotIntersectedRays = true] - If set true, ray returns false when it didn't hit anything. Otherwise returns ray's target position.
     * @param [options.autoSlice = false] - If set true, ray will automatically slice intersections into array of triangles and store it in {@link Raycaster.Ray#slicedIntersections Ray.slicedIntersections}.
     * @param [options.round = false] - If set true, point where ray hit will be rounded.
     * @param [options.enablePhysics = false] - Add to ray physics body. Body will be a circle with radius equal to {@link Raycaster.Ray#collisionRange Ray.collisionRange}. If set true, arcade physics body will be added.
     * @returns {@link Raycaster.Ray Raycaster.Ray} instance
     */
    createRay(options?: {
        origin?: Phaser.Geom.Point | Point;
        angle?: number;
        angleDeg?: number;
        cone?: number;
        coneDeg?: number;
        range?: number;
        collisionRange?: number;
        detectionRange?: number;
        ignoreNotIntersectedRays?: boolean;
        autoSlice?: boolean;
        round?: boolean;
        enablePhysics?: boolean | 'arcade' | 'matter';
    }): Raycaster.Ray;
    /**
     * Get raycaster statistics.
     * @returns Raycaster statistics.
     */
    getStats(): any;
    /**
     * Destroy object and all mapped objects.
     */
    destroy(): void;
}


declare module 'phaser-raycaster' {
    export = PhaserRaycaster;
}