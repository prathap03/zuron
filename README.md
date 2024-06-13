
# Zeuron Engine

A lightweight game engine or game template that you can use to easily develop WebGL games.
## Getting Started

To get started, simply clone this repository and run the following to install all dependencies:
```
npm install
```
Then, run this to open a host a local server and see the things that you make
```
npx vite
```
or
```
npm run dev
```
This will run the demo. You can find the working files in the src folder, including:

* `index.html`
* `style.css`
* `game.js` (which contains demo code to help you understand how it works)

### Prerequisites

To use this engine or template, you'll need to have the following dependencies installed:

* Three.js
* Electron.js
* vite

Don't worry about installing them manually - just run `npm install` to take care of the hard work for you! :)

## Usages

Here's a list of classes in the game engine or template:

__📁 core >__
* ZCore
* ZObject
* ZActor  *<= ZObject*
* ZCharacter  *<= ZActor*

__📁 controllers >__
* ZPlayerController
* ZViewPortController

__📁 managers >__
* ZInputManager
* ZLoadingManager
* ZCameraManager

__📁 utils/extras >__
* ZFoliage
* ZMath

`ZClassA  *<=ZClassB*` indicates that `ZClassA` is the child of `ZClassB`


As it is still in development, this list items may be modified or deprecated during the process

## ZCore

#### Introduction
As you have noticed in the `game.js` file the very first thing that was called is `ZCore`. Yes the core is everything. Without it, we can't run use this engine or template because it is the core.

The `ZCore` class is the core of the Zeuron game engine or game template. It provides the basic functionality required to run the engine, including the default `THREE.Scene`, `THREE.PerspectiveCamera`, and `THREE.WebGLRenderer`. It also includes a unified loader, a clock, and a list of `ZObjects`.

#### Constructor

* __`ZCore()`__

  Creates a new instance of the ZCore class.

#### Properties

* __`projectSettings: ProjectSettings`__

  The project settings that are set externally.

* __`scene: THREE.Scene`__

  The default THREE.Scene used by the engine.

* __`camera: THREE.PerspectiveCamera`__

  The default THREE.PerspectiveCamera used by the engine.

* __`renderer: THREE.WebGLRenderer`__

  The default THREE.WebGLRenderer used by the engine.

* __`devMode: boolean`__

  A flag indicating whether dev mode is enabled or not.

* __`loader: ZLoadingManager`__

  The unified loader used by the engine.

* __`clock: THREE.Clock`__

  The THREE.Clock used by the engine.

* __`deltaTime: number`__

  The time passed since the last frame.

* __`lastFrameTime: number`__

  The time of the last frame.

* __`objects: Set<ZObject>`__

  The list of ZObjects that the engine has.

#### Methods

* __`#init(): void`__

  Initializes the engine.

* __`#onWindowResize(): void`__

  Handles window resize events.

* __`#renderLoop(): void`__

  The main game loop.

* __`#eventTick(deltaSeconds: number): void`__

  The basic event tick for all the sub ticks.

* __`addObject(obj: ZObject): void`__

  Adds an object to the main game loop.

* __`enableDevMode(): void`__

  Enables dev mode and provides access to the ZViewPortController.

#### Example
Here's an example of how to use the ZCore class:

```
import ZCore from '../zeuron_modules/core/ZCore';

const core = new ZCore();
core.enableDevMode();
```

## ZObject

#### Introduction
Just like how the cell is a basic structural unit of a life. The `ZObject` is the basic structural unit of Zeuron engine.

The `ZObject` class is a basic 3D object that can be placed anywhere in the 3D space. It has a mesh that can be set during initialization or later using the `setMesh` method. The class is designed to work with the `ZCore` object, which provides the core functionality for loading and managing 3D objects.

#### Constructor

* __`ZObject(core, src)` or `ZObject(core, src, position, rotation)`__

  Creates a new `ZObject` instance with the provided `core` object and mesh source (`src`).

#### Parameters

* `core` (ZCore): The core object to initialize the `ZActor` with.
* `src` (string | THREE.Mesh | { model }): The source of the mesh or the mesh to be attached. It can be a string representing the path to the mesh, a `THREE.Mesh` object, or an object containing a `model` property.
* `position` (THREE.Vector3): The initial position of the actor in the scene.
* `rotation` (THREE.Vector3): The initial rotation of the actor in the scene.

#### Properties

* __`core: ZCore`__

  The main `ZCore` reference passed during initialization.

* __`enableTick: boolean`__

  Determines whether the `eventTick` function should be called every frame. Default is `true`.

* __`mesh: THREE.Mesh | null`__

  The `THREE.Mesh` object associated with the `ZObject`. It is set during initialization or later using the `setMesh` method.

#### Methods

* __`#init(): void`__

  Initializes the `ZObject` instance. This method is called automatically during construction.

* __`eventTick(deltaSeconds): void`__

  Called every frame if `enableTick` is `true`. Override this method to perform custom actions every frame.
  `deltaSeconds` (float): The time delta since the last frame.

* __`setMesh(src): void`__

  Sets the mesh for the `ZObject` instance. `src` (string | THREE.Mesh | { model }): The mesh or src of mesh which you want to set.

#### Example
Here's an example of how to use the ZObject class:

```
import ZObject from "../zeuron_modules/core/Object"

const core = new ZCore();

const position = new THREE.Vector3(x1, y1, z1);
const rotation = new THREE.Vector3(x2, y2, z2);
const obj = new ZObject(core, 'path/to/mesh.gltf OR fbx', position, rotation);
```
or
```
import ZObject from "../zeuron_modules/core/Object"

const core = new ZCore();

const mesh = new THREE.Mesh(geo, mat);
const obj = new ZObject(core, mesh);
```

## ZActor

#### Introduction
The actor class which we can use to attach components and everything so that it will have multiple functionalities as you want. `ZActor` is also the child class of `ZObject`, so anything in that will also be accessible.

The `ZActor` class extends `ZObject` and provides methods to manage the location, rotation, and scale of an actor in a 3D scene.

#### Constructor

* __`ZActor(core, src, position, rotation)`__

  Creates a new `ZActor` instance with the provided `core`, `src`, `position` and `rotation`.

#### Parameters

* `core` (ZCore): The core object to initialize the `ZActor` with.
* `src` (string | THREE.Mesh | { model }): The source of the mesh or the mesh to be attached. It can be a string representing the path to the mesh, a `THREE.Mesh` object, or an object containing a `model` property.
* `position` (THREE.Vector3): The intial position of the actor in the scene.
* `rotation` (THREE.Vector3): The initial rotation of the actor in the scene.

#### Properties

* __`enableTick: boolean`__

  Determines whether the `eventTick` function should be called every frame. Default is `true`.

* __`components: Set`__

  The set of components which the actor will have.

#### Methods

* __`#init(): void`__

  Initializes the `ZActor` instance. This method is called automatically during construction.

* __`eventTick(deltaSeconds): void`__

  Called every frame if `enableTick` is `true`. Override this method to perform custom actions every frame.
  `deltaSeconds` (float): The time delta since the last frame.

* __`setMesh(src): void`__

  Sets the mesh for the `ZActor` instance. `src` (string | THREE.Mesh | { model }): The mesh or src of mesh which you want to set.

* __`setActorLocation(x, y, z): void`__

  Sets the location of the actor in the scene.

  `x` (number): The x-coordinate of the new location.

  `y` (number): The y-coordinate of the new location.

  `z` (number): The z-coordinate of the new location.

* __`getActorLocation(): THREE.Vector3 | null`__

  Gets the current location of the actor in the scene.

  Returns: `THREE.Vector3 | null` The location of the actor, or null if the actor has no mesh.

* __`setActorRotation(rotation): void`__

  Sets the rotation of the actor in the scene.

  `rotation (THREE.Vector3)`: The new rotation of the actor.

* __`getActorRotation(): THREE.Vector3 | null`__

  Gets the current rotation of the actor in the scene.

  Returns: `THREE.Euler | null` The rotation of the actor, or null if the actor has no mesh.

* __`setActorScale(scale): void`__

  Sets the scale of the actor in the scene.

  scale `(THREE.Vector3)`: The new scale of the actor.

* __`getActorScale(): THREE.Vector3 | null`__

  Gets the current scale of the actor in the scene.

  Returns: `THREE.Vector3 | null` The scale of the actor, or null if the actor has no mesh.

#### Example
Here's an example of how to use the ZActor class:

```
import ZActor from "../zeuron_modules/core/Actor"

const core = new ZCore();

const actor = new ZActor(core, 'path/to/mesh.gltf OR fbx', position, rotation);
actor.setActorLocation(new THREE.Vector3(2, 0, 2));
```
or
```
import ZActor from "../zeuron_modules/core/Actor"

const core = new ZCore();

const actor = new ZActor(core, 'path/to/mesh.gltf OR fbx', position, rotation);
actor.setActorLocation(2, 0, 2);
```



## Math

#### Introduction
Have you ever tried to do some complex mathematic calculation and later forgot how to do the same. Then, this is for you. A lot of functions to do those complex math.

The `Math` module provides a set of utility functions for performing mathematical operations, including random number generation, interpolation, and clamping.

#### Methods

* __`rand_range(a, b): number`__

  Generates a random floating-point number between `a` and `b`.

* __`rand_normalish(): number`__

  Generates a random number with a normal-ish distribution.

* __`rand_int(a, b): number`__

  Generates a random integer between `a` and `b`.

* __`lerp(x, a, b): number`__

  Linearly interpolates between `a` and `b` by `x`.

* __`smoothstep(x, a, b): number`__

  Applies a smoothstep function to `x` between `a` and `b`.

* __`smootherstep(x, a, b): number`__

  Applies a smootherstep function to `x` between `a` and `b`.

* __`clamp(x, a, b): number`__

  Clamps `x` between `a` and `b`.

* __`sat(x): number`__

  Saturates `x` between 0 and 1.

* __`in_range(x, a, b): boolean`__

  Checks if `x` is between `a` and `b`.

#### Example
Here's an example of how to use this module:

```
import { rand_range, lerp, clamp } from "../zeuron_modules/core/ZMath";

const randomValue = rand_range(0, 10);
const interpolatedValue = lerp(0.5, 0, 10);
const clampedValue = clamp(15, 0, 10);
```

Note: The Math module is a collection of static functions, so you don't need to create an instance to use its functions.

## Built With

Here's a list of major frameworks, libraries, and tools used in the game engine or game template.

* [Three.js](https://threejs.org/) - A JavaScript library for 3D graphics, providing a powerful toolset for creating immersive experiences.

* [Electron.js](https://www.electronjs.org/) - An open-source framework for building cross-platform desktop applications using web technologies such as HTML, CSS, and JavaScript.

* [Vite](https://vitejs.dev/) - A modern development server that provides fast and efficient building, development, and deployment of web applications.

To be increased...

## Authors

* **XDreamist** - [GitHub](https://github.com/XDreamist)

* **Jyothi** - [Sorry! Don't know his github]()

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

#### Code and Inspiration

Hat tip to anyone who's code was used (don't worry, it's our little secret).

If you're getting stuck on Three.js, don't worry! Here are some helpful resources:

* [Youtube Tutorial](https://www.youtube.com/watch?v=xJAfLdUgdc4&list=PLjcjAqAnHd1EIxV4FSZIiJZvsdrBc1Xho) covering from beginner to ~~my~~ expert level.
* [simonDev](https://www.youtube.com/@simondev758) has some god level creations (you can steal code from his github but I didn't steal anything).
* [Three.js Editor](https://threejs.org/editor/) to check if your 3D model works on three js.

If you have any good examples or suggestions, please reach out! I'll update this list with more resources as I find them.

#### Development Status

This game engine or template is still in development. So if you find any bugs don't mind it, they'll fly off. Sorry! Please contact me ASAP! [XDreamist](mailto:umesh@zeuron.ai?Found_Bugs_Come_Fast!&body=This%20is%20the%20bug:). You can also contact me if you have any suggestions, recomendation to improve this engine, template and any error in the documentation. Pretty much anything!
