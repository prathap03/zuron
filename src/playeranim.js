import ZCharacter from "../zeuron_modules/basics/Character";
import * as THREE from 'three';

export class Playanim extends ZCharacter {
    constructor(core, src, position, rotation) {
        super(core, src, position, rotation);
        this.walkSpeed = 0.08;
        this.velocityY = 10;
        this.gravity = 0.1;
        this.onGround = true;
        this.dead=false;
        this.boxCollider = null;
        this.boxHelper = null;

        // Initialize jump audio and flag
        this.jumpAudio = null;
        this.isJumping = false; // Flag to track if jump audio is currently playing
        this.audioLoader = new THREE.AudioLoader();
        this.listener = new THREE.AudioListener();
        this.core.camera.add(this.listener);

        // Load the jump sound
        this.audioLoader.load('sound/jumpT.wav', (buffer) => {
            this.jumpAudio = new THREE.Audio(this.listener);
            this.jumpAudio.setBuffer(buffer);
            this.jumpAudio.setVolume(0.5);
        });
    }

    onMeshInit() {
        super.onMeshInit();

        const characterColliderGeometry = new THREE.BoxGeometry(0.5, 2.7, 0.2);
        const characterColliderMaterial = new THREE.MeshBasicMaterial({ visible: false });
        this.characterCollider = new THREE.Mesh(characterColliderGeometry, characterColliderMaterial);
        this.mesh.add(this.characterCollider);
        this.boxCollider = new THREE.Box3(new THREE.Vector3(0,0,0,), new THREE.Vector3(5,5,5));
        boxCollider.setFromObject(this.characterCollider);

        this.boxHelper = new THREE.BoxHelper(this.characterCollider, 0xff0000);
    }

    eventTick(deltaSeconds) {
        if(!this.dead){
        this.moveForward(-1);
        }
        
        if (this.boxCollider) this.boxCollider.setFromObject(this.characterCollider);
        if (this.boxHelper)  this.boxHelper.update();
    }

    moveRight(direction) {
        const movement = this.walkSpeed * direction;

        const newPosition = this.mesh.position.clone();
        newPosition.x += movement;

        const planeWidth = 5;
        const playerHalfWidth = 0.5;
        if (newPosition.x < -planeWidth / 2 + playerHalfWidth) {
            newPosition.x = -planeWidth / 2 + playerHalfWidth;
        } else if (newPosition.x > planeWidth / 2 - playerHalfWidth) {
            newPosition.x = planeWidth / 2 - playerHalfWidth;
        }

        this.mesh.position.copy(newPosition);
    }

    onAnimInit() {
        if(!this.dead)
            {
        this.animManager.setAnimationLooping("Run", true);
        this.animManager.playAnimation("Run");
            }
    }

    jump() {
        if (!this.isJumping && this.jumpAudio) { // Check if jump audio is not already playing
            this.isJumping = true; // Set the flag to true to indicate jump audio is playing
            this.jumpAudio.play();
        }
if(!this.dead){
        this.animManager.playAnimation('Jump', () => {
            this.animManager.playAnimation('Run');
            this.isJumping = false; // Reset the flag when jump animation finishes
        });
    }
    }
    slide(callback) {
        this.dead=true;
        this.animManager.playAnimation('Roll', () => {
         //   this.stopRunning(); 
            this.displayGameOverScreen();
        });
    }

    jumpLeft() {
        if(!this.dead){
        this.moveRight(-0.3);
    }
}

    jumpRight() {
        if(!this.dead){
        this.moveRight(0.3);
        }
    }

    getPosition() {
        return this.mesh.position;
    }

    // stopRunning() {
    //     this.walkSpeed = 0;
    // }

    displayGameOverScreen() {
        const gameOverElement = document.getElementById('game-over-screen');
        if (gameOverElement) {
            gameOverElement.style.display = 'block';
        }
    }

    
    
}
