/**
 * Copyright 2024 Zeuron.ai
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Imports
 */
import { THREE } from "../dependencies/three-def"
import ZActor from "./Actor";
import ZAnimManager from "../managers/AnimManager";

export default class ZCharacter extends ZActor {
    constructor(core, src, position, rotation) {
        super(core, src, position, rotation);

        this.walkSpeed = 0.1;
        this.velocity = 5;

        this.moveDirection = new THREE.Vector3();
        this.rotateAngle = new THREE.Vector3(0, 1, 0);
        this.rotateQuaternion = new THREE.Quaternion();
        this.cameraTarget = new THREE.Vector3();

        // Start run animation by default
       // this.animManager.playAnimation('Run');
    }
    
    onMeshInit() {
        if (this.mesh.model && this.mesh.model.animations.length > 0) {
            this.animManager = new ZAnimManager(this.mesh.model, this.mesh);
            this.onAnimInit();
        }
    }

    onAnimInit() {

    }

    moveForward(value) {
        if (this.mesh) {
            const currentPos = this.getActorLocation();
            this.setActorLocation(currentPos.x, currentPos.y, currentPos.z + value * this.walkSpeed);
           
        }
    }

    moveRight(value) {
        if (this.mesh) {
            const currentPos = this.getActorLocation();
            this.setActorLocation(currentPos.x + value * this.walkSpeed, currentPos.y, currentPos.z);
        }
    }
  

}
