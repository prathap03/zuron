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



/**
 * The Mesh where we can assign 3D objects
 */
export default class ZMesh extends THREE.Mesh {
    /**
     * Creates a new ZMesh instance.
     *
     * @param {THREE.Geometry} geometry - The geometry of the mesh.
     * @param {THREE.Material} material - The material of the mesh.
     */
    constructor(geometry, material) {
        super(geometry, material);

        /**
         * The model associated with this mesh.
         */
        this.model = null;
    }
}