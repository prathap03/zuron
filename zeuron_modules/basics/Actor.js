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
import { THREE } from "../dependencies/three-def";
import ZObject from "./Object";



/**
 * ZActor class extends ZObject and provides methods to manage the location, rotation, and scale of an actor in a 3D scene.
 */
export default class ZActor extends ZObject {
    constructor(scene, src, position, rotation) {
        super(scene, src, position, rotation);
    }

    setActorLocation(x, y, z) {
        if (this.mesh) {
            const position = new THREE.Vector3(x, y, z);
            this.mesh.position.copy(position);
        }
    }

    getActorLocation() {
        if (this.mesh) {
            return this.mesh.position.clone();
        } else {
            return null;
        }
    }

    setActorRotation(rotation) {
        if (this.mesh) {
            this.mesh.rotation.copy(rotation);
        }
    }

    getActorRotation() {
        if (this.mesh) {
            return this.mesh.rotation.clone();
        } else {
            return null;
        }
    }

    setActorScale(scale) {
        if (this.mesh) {
            this.mesh.scale.copy(scale);
        }
    }

    getActorScale() {
        if (this.mesh) {
            return this.mesh.scale.clone();
        } else {
            return null;
        }
    }
}