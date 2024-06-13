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



/**
 * Just a basic class for basic lighting
 */
class ZBasicLighting {
    constructor(core) {
        this.scene = core.scene;
        
        this.directionalLight = new ZDirectionalLight(0xffffff, 1);
        this.directionalLight.position.set(5, 10, 7.5);
        this.directionalLight.shadow.mapSize.width = 1024;
        this.directionalLight.shadow.mapSize.height = 1024;
        this.scene.add(this.directionalLight);

        this.ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(this.ambientLight);

        core.camera.position.z = 5;
    }
}


/**
 * A THREE.DirectionalLight where you can access it's helpers from it
 */
class ZDirectionalLight extends THREE.DirectionalLight {
    constructor(color, intensity) {
        super(color, intensity);

        this.castShadow = true;
        
        this.shadow.camera.top = 25;
        this.shadow.camera.bottom = -25;
        this.shadow.camera.right = 25;
        this.shadow.camera.left = -25;

        this.helper = new THREE.DirectionalLightHelper(this, 5);
        this.shadowHelper = new THREE.CameraHelper(this.shadow.camera);

    }
}

export { ZBasicLighting, ZDirectionalLight };