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
import { OrbitControls, TrackballControls } from "../dependencies/three-def";



export default class ZViewPortController {
    constructor(core) {

        // Add OrbitControls
        this.orbControls = new OrbitControls(core.camera, core.renderer.domElement);
        this.orbControls.enableDamping = true;
        this.orbControls.dampingFactor = 0.12;
        this.orbControls.enableZoom = false;
        this.orbControls.update();

        // Add TrackballControls
        this.trballControls = new TrackballControls(core.camera, core.renderer.domElement);
        this.trballControls.noRotate = true;
        this.trballControls.noPan = true;
        this.trballControls.noZoom = false;
        this.trballControls.zoomSpeed = 1.5;
    }

    eventTick(deltaSeconds) {
        const orbControllerTarget = this.orbControls.target;
        this.orbControls.update();
        this.trballControls.target.set(orbControllerTarget.x, 
            orbControllerTarget.y, orbControllerTarget.z);
        this.trballControls.update();
    }
}