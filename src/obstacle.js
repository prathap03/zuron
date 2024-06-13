import { THREE } from "../zeuron_modules/dependencies/three-def";
import ZObject from "../zeuron_modules/basics/Object";

export default class Obstacle {
    constructor(core, modelPath, stoneLanes, stoneGap) {
        this.core = core;
        this.modelPath = modelPath;
        this.stoneLanes = stoneLanes;
        this.stoneGap = stoneGap;
        this.colliders = []; // Array to store obstacle colliders

        // Initialize obstacle collision sound
        this.obstacleCollisionSound = null;
        this.audioLoader = new THREE.AudioLoader();
        this.listener = new THREE.AudioListener();
        this.core.camera.add(this.listener);

        // Load the obstacle collision sound
        this.audioLoader.load('sound/endsound.ogg', (buffer) => {
            this.obstacleCollisionSound = new THREE.Audio(this.listener);
            this.obstacleCollisionSound.setBuffer(buffer);
            this.obstacleCollisionSound.setVolume(0.5);
        });
    }

    createObstacles(stoneCount) {
        for (let i = 0; i < stoneCount; i++) {
            const laneIndex = Math.floor(Math.random() * this.stoneLanes.length);
            const positionX = this.stoneLanes[laneIndex];

            this.core.loader.loadModel(this.modelPath, (mesh) => {
                const stone = new ZObject(this.core, mesh);
                stone.mesh.position.set(positionX, -1.5, -17 - i * this.stoneGap);
                stone.mesh.scale.set(0.3, 0.3, 0.3);

                const boxCollider = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
                boxCollider.setFromObject(stone.mesh);
                this.colliders.push(boxCollider); // Store collider in the array

                let direction = 1;
                const animationSpeed = 0.01;

                animateStone();

                function animateStone() {
                    stone.mesh.position.x += direction * animationSpeed;

                    if (stone.mesh.position.x < -2) {
                        stone.mesh.position.x = -2;
                        direction *= -1;
                    } else if (stone.mesh.position.x > 2) {
                        stone.mesh.position.x = 2;
                        direction *= -1;
                    }

                    boxCollider.setFromObject(stone.mesh);

                    requestAnimationFrame(animateStone);
                }
            });
        }
    }

    // Method to get the array of obstacle colliders
    getColliders() {
        return this.colliders;
    }

    // Method to play obstacle collision sound
    playObstacleCollisionSound() {
        if (this.obstacleCollisionSound && !this.obstacleCollisionSound.isPlaying) {
            this.obstacleCollisionSound.play();
        }
    }
}
