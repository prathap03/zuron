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



/**
 * Generates a random floating-point number between `a` and `b`.
 *
 * @param {number} a - The lower bound of the range.
 * @param {number} b - The upper bound of the range.
 * @return {number} A random floating-point number between `a` and `b`.
 */
export function rand_range(a, b) {
    return Math.random() * (b - a) + a;
}


/**
 * Generates a random number with a normal-ish distribution.
 *
 * This function generates four random numbers between 0 and 1, adds them together,
 * and then scales and shifts the result to be between -1 and 1.
 *
 * @return {number} A random number with a normal-ish distribution.
 */
export function rand_normalish() {
    const r = Math.random() + Math.random() + Math.random() + Math.random();
    return (r / 4.0) * 2.0 - 1;
}


/**
 * Generates a random integer between `a` and `b`.
 *
 * @param {number} a - The lower bound of the range.
 * @param {number} b - The upper bound of the range.
 * @return {number} A random integer between `a` and `b`.
 */
export function rand_int(a, b) {
    return Math.round(Math.random() * (b - a) + a);
}


/**
 * Linearly interpolates between `a` and `b` by `x`.
 *
 * @param {number} x - The interpolation factor.
 * @param {number} a - The starting value.
 * @param {number} b - The ending value.
 * @return {number} The interpolated value.
 */
export function lerp(x, a, b) {
    return x * (b - a) + a;
}


/**
 * Applies a smoothstep function to `x` between `a` and `b`.
 *
 * The smoothstep function is a sigmoidal curve that starts at 0, increases
 * smoothly to 1, and then decreases smoothly back to 0. It is useful for
 * creating smooth transitions between values.
 *
 * @param {number} x - The input value.
 * @param {number} a - The lower bound of the range.
 * @param {number} b - The upper bound of the range.
 * @return {number} The smoothed value.
 */
export function smoothstep(x, a, b) {
    x = x * x * (3.0 - 2.0 * x);
    return x * (b - a) + a;
}


/**
 * Applies a smootherstep function to `x` between `a` and `b`.
 *
 * The smootherstep function is a smoother version of the smoothstep function.
 * It starts at 0, increases smoothly to 1, and then decreases smoothly back to 0.
 * It is useful for creating very smooth transitions between values.
 *
 * @param {number} x - The input value.
 * @param {number} a - The lower bound of the range.
 * @param {number} b - The upper bound of the range.
 * @return {number} The smoothed value.
 */
export function smootherstep(x, a, b) {
    x = x * x * x * (x * (x * 6 - 15) + 10);
    return x * (b - a) + a;
}


/**
 * Clamps `x` between `a` and `b`.
 *
 * @param {number} x - The value to clamp.
 * @param {number} a - The lower bound of the range.
 * @param {number} b - The upper bound of the range.
 * @return {number} The clamped value.
 */
export function clamp(x, a, b) {
    return Math.min(Math.max(x, a), b);
}


/**
 * Saturates `x` between 0 and 1.
 *
 * @param {number} x - The value to saturate.
 * @return {number} The saturated value.
 */
export function sat(x) {
    return Math.min(Math.max(x, 0.0), 1.0);
}


/**
 * Checks if `x` is between `a` and `b`.
 *
 * @param {number} x - The value to check.
 * @param {number} a - The lower bound of the range.
 * @param {number} b - The upper bound of the range.
 * @return {boolean} True if `x` is between `a` and `b`, false otherwise.
 */
export function in_range(x, a, b) {
    return x >= a && x <= b;
}