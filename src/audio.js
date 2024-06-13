import * as THREE from 'three';

export default class GameAudio {
    constructor(camera) {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);

        this.sound = new THREE.Audio(this.listener);

        this.audioLoader = new THREE.AudioLoader();
        this.audioBuffer = null;
    }

    loadAudio(filePath) {
        return new Promise((resolve, reject) => {
            this.audioLoader.load(filePath, (buffer) => {
                this.audioBuffer = buffer;
                resolve();
            }, undefined, (error) => {
                reject(error);
            });
        });
    }

    startAudio() {
        if (this.audioBuffer) {
            this.sound.setBuffer(this.audioBuffer);
            this.sound.setLoop(true);
            this.sound.setVolume(0.5);
            this.sound.play();
        }
    }

    stopAudio() {
        this.sound.stop();
    }
}
