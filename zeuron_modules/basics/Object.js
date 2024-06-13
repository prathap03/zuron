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
import { THREE, SkeletonUtils } from "../dependencies/three-def"



/**
 * The basic 3D object which has a mesh where we can place anywhere
 */
export default class ZObject extends THREE.Object3D {
    /**
     * Creates a new ZObject instance.
     * 
     * @param {ZCore} core - The core object to initialize the ZObject with.
     * 
     * @param {string | THREE.Mesh} src - The source of the mesh or the mesh to be attached.
     */
    constructor(core, src, position, rotation) {
        super();

        /**
         * The main Core reference is passed here
         */
        this.core = core;

        /* Whether this eventTick function should be called.
        *  Set it to 'false' if you are not using it.
        *  Warning! eventTick function runs every frame. 
        *  Use it at your own risk */
        this.enableTick = true;

        if (position) this._initPosition = position;
        if (rotation) this._initRotation = rotation;

        /**
         * If this object uses a THREE.Mesh, assign it here.
         */
        this.mesh = null;

        this.setMesh(src);

        this.init();
    }

    /**
     * Initializes the object.
     */
    init() {}

    onMeshInit() {}

    /**
     * Called every frame if enableTick is true.
     *
     * @param {float} deltaSeconds - The time delta since the last frame.
     */
    eventTick(deltaSeconds) {}

    get initPosition() {
        return this._initPosition;
    }

    get initRotation() {
        return this._initRotation;
    }

    #initPosnRot() {
        if (this.initPosition) {
            this.mesh.position.copy(this.initPosition);
        }
        if (this.initRotation) {
            this.mesh.rotation.set(this.initRotation.x, this.initRotation.y, this.initRotation.z);
        }
        this.core.addObject(this);
        this.onMeshInit();
    }

    /**
     * Set the Mesh which this object has
     * 
     * @param {string, THREE.Mesh} mesh - The mesh or src of mesh which you want to set
     */
    setMesh(src) {
        if (src && typeof src === 'string') {
            this.core.loader.loadModel(src, (mesh) => {
                this.mesh = SkeletonUtils.clone(mesh);
                this.mesh.model = mesh.model;
                this.#initPosnRot();
            });
        }
        else if (src && src instanceof THREE.Mesh) {
            this.mesh = src;
            // If any problem occurs while assigning external mesh,
            // use the below method instead of above.
            // this.mesh = SkeletonUtils.clone(src); 
            this.mesh.castShadow = true;
            this.mesh.receiveShadow = true;
            this.#initPosnRot();
        }
        else if (src && typeof src === 'object' && src.model) {
            this.mesh = SkeletonUtils.clone(src);
            this.mesh.model = src.model;
            this.#initPosnRot();
        }
        else {
            console.error('Invalid mesh source: ' + this.mesh);
        }
    }
}