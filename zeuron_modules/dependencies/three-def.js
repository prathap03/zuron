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
import * as THREE from 'three';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js';
import { ACESFilmicToneMappingShader } from 'three/addons/shaders/ACESFilmicToneMappingShader.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';

import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

import { CSM } from 'three/addons/csm/CSM.js';
import { CSMShader } from 'three/addons/csm/CSMShader.js';

import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';


/**
 * The main dependencies of three js lies here
 */
export {
    THREE, 
    EffectComposer, ShaderPass, RenderPass, UnrealBloomPass,
    GammaCorrectionShader, ACESFilmicToneMappingShader, FXAAShader, 
    FBXLoader, GLTFLoader, DRACOLoader,
    OrbitControls, TrackballControls,
    SkeletonUtils, BufferGeometryUtils,
    CSM, CSMShader,
  };