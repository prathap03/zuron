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
import { 
    THREE, 
    GLTFLoader, FBXLoader, DRACOLoader
} from "../dependencies/three-def";



/**
 * The single unified Loader which loads every thing
 */
export default class ZLoadingManager extends THREE.LoadingManager {
    constructor() {
        super();
        this.cache = {};

        this.textureLoader = new THREE.TextureLoader(this);

        this.gltfLoader = new GLTFLoader(this);

        this.dracoLoader = new DRACOLoader(this);
        this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
        
        this.gltfLoader.setDRACOLoader(this.dracoLoader);
        
        this.fbxLoader = new FBXLoader(this);

        this.loadingCount = 0;
    }

    /**
     * Loads Textures
     * 
     * @param {string} url - The src when the file is located
     * 
     * @param {(texture: THREE.Texture) => void} callback - The callback function for callback
     */
    loadTexture(url, callback) {
        this.textureLoader.load(url, callback);
    }

    /**
     * Loads 3D Models
     * 
     * @param {string} url - The src when the file is located
     * 
     * @param {(mesh: THREE.Mesh) => void} callback - The callback function for callback
     */
    loadModel(url, callback) {
        if (typeof url!== 'string') {
            console.error('Invalid URL provided:', url);
            return;
        }
        else if (this.cache[url]) {
            callback(this.cache[url]);
            return;
        }

        this.loadingCount ++;
    
        if (url.endsWith('.fbx')) {
            // Use FBXLoader for .fbx files
                
            this.fbxLoader.load(
                url,
                (fbx) => {
                    fbx.scale.setScalar(0.01); // Reduced the scale to make it match with glb

                    const mesh = this.#processMesh(fbx);
                    mesh.model = fbx;

                    this.cache[url] = mesh;

                    callback(mesh);
                },
                undefined,
                (error) => {
                    console.error('Error while loading fbx model:', error);
                }
            );
        } else {
            // Use GLTFLoader for other file types (e.g., .glb, .gltf)

            this.gltfLoader.load(
                url,
                (gltf) => {
                    const mesh = this.#processMesh(gltf.scene);
                    mesh.model = gltf;

                    this.cache[url] = mesh;

                    callback(mesh);
                },
                undefined,
                (error) => {
                    console.error('Error while loading glTF model:', error);
                }
            );
        }
    }

    #processMesh(mesh) {
        mesh.traverse(node => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
                node.material.side = THREE.FrontSide;
            }
        });
        return mesh;
    }
}