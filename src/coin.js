import ZObject from "../zeuron_modules/basics/Object";
import * as THREE from 'three';

export default class CoinManager {
    constructor(core) {
        this.core = core;
        this.coins = [];
        this.coinSound = null; // Store the sound object
        this.audioLoader = new THREE.AudioLoader();
        this.listener = new THREE.AudioListener();
        this.core.camera.add(this.listener);

        // Load the coin collision sound
        this.audioLoader.load('sound/coin1.ogg', (buffer) => {
            this.coinSound = new THREE.Audio(this.listener);
            this.coinSound.setBuffer(buffer);
            this.coinSound.setVolume(1);
        });
        
    }

    createCoins(coinCount, gap, repetitions, collectionGap, lanes) {
        for (let j = 0; j < repetitions; j++) {
            const laneIndex = j % lanes.length;
            const positionX = lanes[laneIndex];

            for (let i = 0; i < coinCount; i++) {
                this.core.loader.loadModel("./Character/coin1.glb", (mesh) => {
                    const pl = new ZObject(this.core, mesh);

                    const positionZ = -5 - i * gap - j * collectionGap;
                    pl.mesh.position.set(positionX, -1, positionZ);
                    pl.mesh.scale.set(0.01, 0.01, 0.01);
                    pl.mesh.rotation.set(-55, 0, 0);

                    this.core.scene.add(pl.mesh);

                    const boxCollider = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
                    boxCollider.setFromObject(pl.mesh);

                    pl.boxCollider = boxCollider;

                    this.coins.push(pl);
                });
            }
        }
    }

    getCoins() {
        return this.coins;
    }

    removeCoin(coin) {
        if (coin) {
            this.core.scene.remove(coin.mesh);
            const index = this.coins.indexOf(coin);
            if (index !== -1) {
                this.coins.splice(index, 1);
            }
        }
    }

    playCoinSound() {
        if (this.coinSound && !this.coinSound.isPlaying) {
            this.coinSound.play();
        }
    }
    rotateCoins(delta) {
        for (const coin of this.coins) {
            coin.mesh.rotation.z += delta * 0.001; // Adjust rotation speed as needed
        }
    }
}
