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



export default class ZInputManager {
    constructor(inputType) {
        this.inputType = null;

        this.activeInputs = new Set();

        this.switchInputType(inputType);
    }

    switchInputType(inputType) {
        if (this.inputType == inputType) {
            return;
        }

        if (this.inputType != null) {
            switch (this.inputType) {
                case 'keyboard':
                    // Listen for keydown and keyup events
                    document.removeEventListener('keydown', (e) => this.addKey(e), false);
                    document.removeEventListener('keyup', (e) => this.removeKey(e), false);
                    break;
                case 'mediapipe':
                    // Initialize joystick input (e.g., using a joystick library)
                    break;
                case 'sensor':
                    // Initialize sensor input (e.g., using a sensor library)
                    break;
                case 'touch':
                    // Initialize touch input (e.g., using a touch library)
                    break;
                default:
                    console.error(`Unsupported input type: ${inputType}`);
                    break;
            }
        }
    
        // Switch to new input type
        this.inputType = inputType;
    
        switch (inputType) {
            case 'keyboard':
                // Listen for keydown and keyup events
                document.addEventListener('keydown', (e) => this.addKey(e), false);
                document.addEventListener('keyup', (e) => this.removeKey(e), false);
                break;
            case 'mediapipe':
                // Initialize joystick input (e.g., using a joystick library)
                break;
            case 'sensor':
                // Initialize sensor input (e.g., using a sensor library)
                break;
            case 'touch':
                // Initialize touch input (e.g., using a touch library)
                break;
            default:
                console.error(`Unsupported input type: ${inputType}`);
                break;
        }
    }

    addKey(event) {
        this.activeInputs.add(event.code);
    }

    removeKey(event) {
        this.activeInputs.delete(event.code);
    }
    // addKey(event) {
    //     this.activeInputs.add(event.code);
    //     // Check for left or right arrow keys and set a flag
    //     if (event.code === 'ArrowLeft') {
    //         this.moveLeft = true;
    //     } else if (event.code === 'ArrowRight') {
    //         this.moveRight = true;
    //     }
    // }
    
    // removeKey(event) {
    //     this.activeInputs.delete(event.code);
    //     // Check for left or right arrow keys and unset the flag
    //     if (event.code === 'ArrowLeft') {
    //         this.moveLeft = false;
    //     } else if (event.code === 'ArrowRight') {
    //         this.moveRight = false;
    //     }
    //}
}