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
import { ProjectSettings } from "../project-settings";
import ZLoadingManager from "../managers/LoadingManager";
import ZViewPortController from "../controllers/ViewPortController"



/**
 * The Core of Zeuron Engine. 
 * Without this the engine won't run.
 */
export default class ZCore {
    constructor() {
        /**
         * The project settings that we setup externally
         */
        this.projectSettings = ProjectSettings;
        const gameRenderer = document.getElementById(this.projectSettings.engine.rendering.gameRendererElement);

        /**
         * The default THREE.Scene
         */
        this.scene = new THREE.Scene();

        /**
         * The default THREE.PerspectiveCamera
         */
       
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
    
        /**
         * The default THREE.WebGLRenderer
         */
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        gameRenderer.appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => this.#onWindowResize(), false);

        /**
         * Whether devMode is enabled or not
         */
        this.devMode = false;

        /**
         * The unified single loader which can load everything
         */
        this.loader = new ZLoadingManager();
        
        /**
         * The deault THREE.Clock
         */
        this.clock = new THREE.Clock();

        /**
         * Get the seconds passed since the time .oldTime was set and sets .oldTime to the current time.
         */
        this.deltaTime = 0;
        this.lastFrameTime = 0;
        
        /**
         * The list of ZObjects which the core has
         */
        this.objects = new Set();
        this.#init();
    }

    /**
     * The init()
     */
    #init() {
        this.#renderLoop();
    }

    /**
     * Whenever the window resizes this is called
     */
    #onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * The sub game loop where it all starts
     */
    #renderLoop() {
        requestAnimationFrame(() => this.#renderLoop());

        this.deltaSeconds = this.clock.getDelta();
        this.#eventTick(this.deltaSeconds);

        if (this.viewPortController) this.viewPortController.eventTick(this.deltaSeconds);

        this.renderer.render(this.scene, this.camera);
    }

    /**
     * The basic eventTick for all the sub ticks
     * 
     * @param {float} deltaSeconds - Get the seconds passed since the time .oldTime was set and sets .oldTime to the current time.
     */
    #eventTick(deltaSeconds) {
        for (const obj of this.objects) {
            if (obj.enableTick && obj.eventTick) obj.eventTick(deltaSeconds);
            if (obj.animManager && obj.animManager.updateAnimation) {
                obj.animManager.updateAnimation(deltaSeconds);
            }
            if (obj.components) {
                for (const component of obj.components) {
                    if (component.enableTick && component.eventTick) component.eventTick(deltaSeconds);
                }
            }
        }
    }

    /**
     * Adds the object to the main game loop and let it function
     * 
     * @param {ZObject} obj - The object that you want to add
     */
    addObject(obj) {
        this.objects.add(obj);
        if (obj.mesh) this.scene.add(obj.mesh);
    }

    /**
     * Enables the devMode. It has access to the dev things like the ViewPortController
     */
    enableDevMode() {
        this.devMode = true;
        this.viewPortController = new ZViewPortController(this);
    }
}