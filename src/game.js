import { THREE } from "../zeuron_modules/dependencies/three-def";
import ZObject from "../zeuron_modules/basics/Object";
import Obstacle from './obstacle.js';
import CoinManager from './coin.js';
import { Playanim } from "./playeranim";
import ZInputManager from "../zeuron_modules/managers/InputManager";
import ZPlayerController from "../zeuron_modules/controllers/PlayerController";
import ZCore from "../zeuron_modules/basics/Core";
import { ZBasicLighting } from "../zeuron_modules/visuals/Lights";
import ZSkySphere from "../zeuron_modules/visuals/SkySphere";

document.addEventListener("DOMContentLoaded", function() {
  var goFS = document.getElementById("goFS");
  goFS.addEventListener("click", function() {
    document.documentElement.requestFullscreen();
  }, false);

  document.addEventListener("webkitfullscreenchange", function(e) {
    var buttonState = document.getElementById("goFS").style.display;
    if (buttonState == "block" || buttonState == "undefined") {
      document.getElementById("goFS").style.display = "none";
    }
    if (buttonState == "none") {
      document.getElementById("goFS").style.display = "block";
    }
  });

  if (navigator.getVRDisplays) {
    navigator.getVRDisplays().then(function(displays) {
      if (displays.length > 0) {
        vrDisplay = displays[0];
        vrDisplay.requestPresent([{ source: renderer.domElement }]);
      }
    });
  } else {
    console.log("WebXR API not supported by this browser or device.");
  }

  function animate() {
    // Your existing render loop code here
    if (vrDisplay.isPresenting) {
      vrDisplay.requestAnimationFrame(animate);
    } else {
      requestAnimationFrame(animate);
    }
  }

  const core = new ZCore();
  new ZBasicLighting(core);
  // core.enableDevMode();

  const skyboxTextures = [
    './Sky/right.png',  // Positive X
    './Sky/left.png',   // Negative X
    './Sky/top.png',    // Positive Y
    './Sky/bottom.png', // Negative Y
    './Sky/front.png',  // Positive Z
    './Sky/back.png'    // Negative Z
  ];
  new ZSkySphere(core, skyboxTextures);

  let planeGeometry = new THREE.PlaneGeometry(5, 3300);
  let planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.y = -2;
  plane.rotation.x = -Math.PI / 2;
  let planeObj = new ZObject(core, plane);

  const stoneLanes = [-1.5, 0, 1.5];
  const stoneGap = 18;
  const stoneCount = 20;
  const modelPath = "./Character/astroid.glb";

  const obstacle = new Obstacle(core, modelPath, stoneLanes, stoneGap);
  obstacle.createObstacles(stoneCount);

  const coinManager = new CoinManager(core);
  const coinCount = 7;
  const gapCoin = 2;
  const repetitions = 20;
  const collectionGap = 37;
  const lanes = [-1.5, 0, 1.5];
  coinManager.createCoins(coinCount, gapCoin, repetitions, collectionGap, lanes);

  const initialPosition = new THREE.Vector3(0, -2, -1);
  const initialRotation = new THREE.Vector3(0, -Math.PI, 0);
  const playerCharacter = new Playanim(core, "./Character/Character1.glb", initialPosition, initialRotation);

  const inputManager = new ZInputManager("keyboard");
  new ZPlayerController(playerCharacter, inputManager);

  const camera = core.camera;
  let count = 0;

  function updateCoinCount() {
    const coinCountElement = document.getElementById('coin-count-value');
    count++;
    coinCountElement.textContent = count;
  }

  let score = 0;
  let scoreIncrementTimer = null;

  if(Playanim.dead) {
    console.log("hello world");
  }

  function updateScore() {
    const scoreElement = document.getElementById('score-value');
    if (!scoreIncrementTimer) {
      score++;
      scoreElement.textContent = score;
      scoreIncrementTimer = setTimeout(() => {
        scoreIncrementTimer = null;
      }, 100); // 1 second delay between score increments
    }
  }

  function updateCamera() {
    if (playerCharacter && playerCharacter.mesh) {
      const playerPosition = playerCharacter.mesh.position;
      const offset = new THREE.Vector3(0, 2.5, 5.5);
      const cameraPosition = playerPosition.clone().add(offset);
      camera.position.copy(cameraPosition);
      camera.lookAt(playerPosition);
    }
  }

  let hasCollided = false;
 let endScreenTimer = null;

  function hasCollidedWithObstacle() {
    if (hasCollided) {
      return false; // Return false if collision has already been detected
    }

    const obstacleColliders = obstacle.getColliders();

    for (const obstacleCollider of obstacleColliders) {
      if (playerCharacter.boxCollider.intersectsBox(obstacleCollider)) {
        hasCollided = true;
        obstacle.playObstacleCollisionSound(); // Set the flag to true
        playerCharacter.slide(() => {});
        endScreenTimer = setTimeout(displayEndScreen, 2000);
        return true; // Collision detected
      }
    }

    return false; // No collision detected
  }

  let previousTime = 0;

  function mainLoop(currentTime) {
    const delta = currentTime - previousTime; // Calculate the time difference between frames
    previousTime = currentTime; // Update the previous time

    updateCamera();
    updateScore();

    if (hasCollidedWithObstacle()) {
      playerCharacter.slide(() => {});
      return; // Exit the loop if collision has been detected
    }

    if (!hasCollided && playerCharacter.boxCollider) {
      for (const coin of coinManager.getCoins()) {
        const coinCollider = coin.boxCollider;
        if (coinCollider && playerCharacter.boxCollider.intersectsBox(coinCollider)) {
          coinManager.playCoinSound();
          coinManager.removeCoin(coin);
          updateCoinCount();
        }
      }
    }

    coinManager.rotateCoins(delta); // Rotate the coins

    // Use renderer.setAnimationLoop instead of requestAnimationFrame
    renderer.setAnimationLoop(mainLoop);
  }

  // Set up VR
  const renderer = core.renderer;

  // Plane spawning logic
  let pMesh1;
  const planes = [];
  const planeLifespan = 13000; // lifespan of each plane in milliseconds
  const planeDelay = 7000; // delay between each plane spawn in milliseconds

  core.loader.loadModel("./Character/plane5.glb", (mesh) => {
    pMesh1 = mesh;
    for (let i = 0; i < 10000; i++) {
      setTimeout(() => {
        const pl = new ZObject(core, pMesh1, new THREE.Vector3(0, -3, -(i * 83) - 40));
        pl.mesh.rotation.y = -Math.PI;
        planes.push(pl);
        console.log(`Plane ${i + 1} created at ${Date.now()}`);
        // Schedule removal of the plane after its lifespan
        setTimeout(() => {
          core.scene.remove(pl.mesh);
          const index = planes.indexOf(pl);
          if (index > -1) {
            planes.splice(index, 1);
          }
          console.log(`Plane ${i + 1} removed at ${Date.now()}`);
        }, planeLifespan + (1 * planeDelay));
      }, i * planeDelay); // Delay each plane spawn
    }
  });

  let pMesh3;
  core.loader.loadModel("./Character/plane5.glb", (mesh) => {
    pMesh3 = mesh;
    const pl = new ZObject(core, mesh, new THREE.Vector3(0, -3, 0));
  });

  function waitForPlayerCharacter() {
    if (playerCharacter && playerCharacter.mesh) {
      renderer.setAnimationLoop(mainLoop); // Start the animation loop with renderer.setAnimationLoop
    } else {
      setTimeout(waitForPlayerCharacter, 100);
    }
  }

  waitForPlayerCharacter();
});