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
 * A class which you can call to set a basic skysphere
 */
// export default class ZSkySphere extends THREE.Mesh {
//     /**
//      * 
//      * @param {ZCore} core - The core of the engine
//      * 
//      * @param {string} texturePath - The specific sky texture which you want the sky to be assigned 
//      */
//     constructor(core, texturePath) {
//         super(new THREE.SphereGeometry(100000, 32, 32), 
//          new THREE.MeshBasicMaterial({ color: 0xff03 }));

//         core.loader.loadTexture(texturePath, (texture) => {    
//             const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });

//             this.material = material;

//             core.scene.add(this);
//         });


//     }
// }
export default class ZSkySphere extends THREE.Mesh {
    /**
     * 
     * @param {ZCore} core - The core of the engine
     * 
     * @param {string} texturePath - The specific sky texture which you want the sky to be assigned 
     */
    constructor(core, texturePaths) {
        // Sphere geometry with the back side material
        const geometry = new THREE.SphereGeometry(100000, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xff03 });

        super(geometry, material);

        // Load the skybox texture
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load(texturePaths, () => {
            const material = new THREE.MeshBasicMaterial({
                envMap: texture,
                side: THREE.BackSide
            });

            this.material = material;
            core.scene.add(this);
        });
    }
}