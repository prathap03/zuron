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



export default class ZPlayerController {
    constructor(player, manager) {
        this.player = player;
        this.manager = manager;

        // Define key Codes 
        // This have to be later implemented in project-settings or 
        // in a separate file for better maintainability
        this.keyMaps = {
            KeyW: "jump",
            KeyA: "jumpLeft",
          //  KeyS: "slide",
            KeyD: "jumpRight",
            Space: "jump",
            ShiftLeft: "slide",
        };

        this.update();
    }

    update() {
        const activeKeys = this.manager.activeInputs.values();
        const firstKey = activeKeys.next().value;
        if (firstKey) {
            const action = this.keyMaps[firstKey];
            if (action && typeof this.player[action] === 'function') {
                this.player[action]();
                this.player.currentAction = action;
            }
        }

        requestAnimationFrame(() => this.update());
    }
}