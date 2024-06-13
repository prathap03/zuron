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



export default class ZAnimManager {
    constructor(model, mesh) {
        this.clips = model.animations;
        this.currentClip = null;
        this.targetClip = null;
        this.blendTime = 0.4;

        this.defaultSpeed = 1.0;

        this.animMixer = new THREE.AnimationMixer(mesh);

        this.animationsMap = new Map();
        this.onCompleteCallbacks = new Map();

        this.clips.filter(clip => clip.name !== "TPose").forEach(clip => {
            const action = this.animMixer.clipAction(clip);
            action.clampWhenFinished = true;
            action.loop = THREE.LoopOnce;
            action.enabled = true;
            action.setEffectiveTimeScale(this.defaultSpeed);
            this.animationsMap.set(clip.name, action);
        });

        this.animMixer.addEventListener('finished', (event) => {
            const clipName = event.action.getClip().name;
            const callback = this.onCompleteCallbacks.get(clipName);
            if (callback) {
                callback();
            }
        });

        const firstAnimationName = this.clips[0]?.name;
        if (firstAnimationName) {
            this.playAnimation(firstAnimationName);
        }
    }

    updateAnimation(deltaSeconds) {
        this.animMixer.update(deltaSeconds);

        if (this.currentClip !== this.targetClip) {
            if (this.currentClip) {
                this.currentClip.fadeOut(this.blendTime);
            }
            if (this.targetClip) {
                this.targetClip.reset().fadeIn(this.blendTime).play();
            }
            this.currentClip = this.targetClip;
        }
    }

    playAnimation(animationName, onComplete) {
        const animClip = this.animationsMap.get(animationName);
        if (animClip && animClip !== this.currentClip) {
            this.targetClip = animClip;

            if (onComplete) {
                this.onCompleteCallbacks.set(animationName, onComplete);
            }
        }
    }

    stopCurrentAnimation() {
        if (this.currentClip) {
            this.currentClip.stop();
            this.currentClip = null;
        }
    }

    setAnimationTime(animationName, time) {
        const action = this.animationsMap.get(animationName);
        if (action) {
            action.time = time;
        }
    }

    setAnimationPlayRate(animationName, playRate) {
        const action = this.animationsMap.get(animationName);
        if (action) {
            action.setEffectiveTimeScale(playRate);
        }
    }

    setAnimationLooping(animationName, loop) {
        const action = this.animationsMap.get(animationName);
        if (action) {
            action.loop = loop ? THREE.LoopRepeat : THREE.LoopOnce;
            action.clampWhenFinished = !loop;
        }
    }
}