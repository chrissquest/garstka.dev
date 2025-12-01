// Credit Brandon Jones, Colin MacKenzie IV.
// gl-matrix.js
// https://glmatrix.net/
// Essentially made it class based



/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

// Degrees to radians
function deg_to_rad(degrees) {
    return degrees * (Math.PI/180);
}

class Vector3 {

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */ 
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Add another vector to @this_
     * @param {Vector3} v Vector to add
     * @returns 
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    /**
     * Multiply @this_ by a scalar
     * @param {number} s
     * @returns {Vector3}
     */
    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }

    /**
     * Calculate the magniture, or length of @this_ vector
     * @returns {number}
     */
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /**
     * Normalizes @this_ vector
     * Quite an expensive operation for what it does, keep in mind
     * @returns {Vector3}
     */
    normalize() {
        var len = this.magnitude();
        this.x /= len;
        this.y /= len;
        this.z /= len;
        return this;
    }

}

class Quaternion4 {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}



class Matrix4 extends Float32Array {

    // A matrix is a Float32Array in memory, with nice functions to help
    constructor() {
        super(16);
    }

    // Applies to rotation matrices
    // get the columns returns as vectors
    getRotationRight() {
        return new Vector3(this[0], this[1], this[2]);
    }

    getRotationUp() {
        return new Vector3(this[4], this[5], this[6]);
    }

    getRotationForward() {
        return new Vector3(this[8], this[9], this[10]);
    }

    // Zero'd out Y axis, so movement across the XZ plane
    // Why does z need to be negative here but not when moving forward?
    // These vectors don't really seems to be adding up correctly?
    getMoveLeft() {
        return (new Vector3(this[0], 0, -this[2])).normalize();
    }

    getMoveForward() {
        return (new Vector3(-this[8], 0, this[10])).normalize();
    }


    // Maybe do it like Three.js where there is only 
    // multiply(a) and 
    // multiplyMatrices(a, b) both modifying this
    /**
     * Multiplies @this_ matrix by another matrix
     * @param {Matrix4} other Matrix to multiply by
     * @return {Matrix4} Returns @new matrix
     */ 
    multiplyNew(other) {
        var a00 = this[0],
        a01 = this[1],
        a02 = this[2],
        a03 = this[3];
        var a10 = this[4],
        a11 = this[5],
        a12 = this[6],
        a13 = this[7];
        var a20 = this[8],
        a21 = this[9],
        a22 = this[10],
        a23 = this[11];
        var a30 = this[12],
        a31 = this[13],
        a32 = this[14],
        a33 = this[15];

        var out = new Matrix4();

        var b0 = other[0],
        b1 = other[1],
        b2 = other[2],
        b3 = other[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = other[4];
        b1 = other[5];
        b2 = other[6];
        b3 = other[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = other[8];
        b1 = other[9];
        b2 = other[10];
        b3 = other[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = other[12];
        b1 = other[13];
        b2 = other[14];
        b3 = other[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
    }

    /**
     * Multiplies @this_ matrix by another matrix
     * @param {Matrix4} other Matrix to multiply by
     * @return {Matrix4} Returns modified matrix
     */ 
    multiply(other) {
        var a00 = this[0],
        a01 = this[1],
        a02 = this[2],
        a03 = this[3];
        var a10 = this[4],
        a11 = this[5],
        a12 = this[6],
        a13 = this[7];
        var a20 = this[8],
        a21 = this[9],
        a22 = this[10],
        a23 = this[11];
        var a30 = this[12],
        a31 = this[13],
        a32 = this[14],
        a33 = this[15];

        var b0 = other[0],
        b1 = other[1],
        b2 = other[2],
        b3 = other[3];
        this[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = other[4];
        b1 = other[5];
        b2 = other[6];
        b3 = other[7];
        this[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = other[8];
        b1 = other[9];
        b2 = other[10];
        b3 = other[11];
        this[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = other[12];
        b1 = other[13];
        b2 = other[14];
        b3 = other[15];
        this[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    }

    /**
     * Creates an identity matrix
     * @return {Matrix4} Returns modified matrix
     */ 
    identity() {
        this[0] = 1;
        this[1] = 0;
        this[2] = 0;
        this[3] = 0;
        this[4] = 0;
        this[5] = 1;
        this[6] = 0;
        this[7] = 0;
        this[8] = 0;
        this[9] = 0;
        this[10] = 1;
        this[11] = 0;
        this[12] = 0;
        this[13] = 0;
        this[14] = 0;
        this[15] = 1;
        return this;
    }

    /**
     * Creates a translation matrix
     * @param {number} x translation
     * @param {number} y translation
     * @param {number} z translation
     * @return {Matrix4} Returns modified matrix
     */
    translation(x, y, z) {
        this[0] = 1;
        this[1] = 0;
        this[2] = 0;
        this[3] = 0;
        this[4] = 0;
        this[5] = 1;
        this[6] = 0;
        this[7] = 0;
        this[8] = 0;
        this[9] = 0;
        this[10] = 1;
        this[11] = 0;
        this[12] = x;
        this[13] = y;
        this[14] = z;
        this[15] = 1;
        return this;
    }

    /**
     * Creates a translation matrix
     * @param {Vector3} v Vector to translate by
     * @return {Matrix4} Returns modified matrix
     */
    translation(v) {
        this[0] = 1;
        this[1] = 0;
        this[2] = 0;
        this[3] = 0;
        this[4] = 0;
        this[5] = 1;
        this[6] = 0;
        this[7] = 0;
        this[8] = 0;
        this[9] = 0;
        this[10] = 1;
        this[11] = 0;
        this[12] = v.x;
        this[13] = v.y;
        this[14] = v.z;
        this[15] = 1;
        return this;
    }

    /**
     * Translates @this_ matrix by coordinates x, y, z
     * @param {number} x 
     * @param {number} y
     * @param {number} z
     * @return {Matrix4} Returns modified matrix
     */
    translate(x, y, z) {
        this[12] += x;
        this[13] += y;
        this[14] += z;
        return this;
    }

    /**
     * Translates @this_ matrix by vector v
     * @param {Vector3} v Vector to translate by
     * @return {Matrix4} Returns modified matrix
     */
    translate(v) {
        this[12] += v.x;
        this[13] += v.y;
        this[14] += v.z;
        return this;
    }

    // THIS MIGHT NOT BE WORKING AS THOUGHT, needs testing
    /**
     * Creates a matrix that performs rotation around an arbitrary axis
     * @param {Vector3} axis Normalized vector to act as the axis which to rotate around
     * @param {number} rad Radians to rotate by
     * @return {Matrix4} Returns modified matrix
     */
    axisAngleRot(axis, rad) {
        var x = axis.x;
        var y = axis.y;
        var z = axis.z;

        var s, c, t;

        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;

        this[0] = x * x * t + c;
        this[1] = y * x * t + z * s;
        this[2] = z * x * t - y * s;
        this[3] = 0;
        this[4] = x * y * t - z * s;
        this[5] = y * y * t + c;
        this[6] = z * y * t + x * s;
        this[7] = 0;
        this[8] = x * z * t + y * s;
        this[9] = y * z * t - x * s;
        this[10] = z * z * t + c;
        this[11] = 0;
        this[12] = 0;
        this[13] = 0;
        this[14] = 0;
        this[15] = 1;
        return this;
    }


    /**
     * Rotates @this_ matrix around the x axis
     * @param {number} rad Radians to rotate by
     * @return {Matrix4} Returns modified matrix
     */
    rotateX(rad) {
        var s = Math.sin(rad);
        var c = Math.cos(rad);
        var a10 = this[4];
        var a11 = this[5];
        var a12 = this[6];
        var a13 = this[7];
        var a20 = this[8];
        var a21 = this[9];
        var a22 = this[10];
        var a23 = this[11];
    
        this[4] = a10 * c + a20 * s;
        this[5] = a11 * c + a21 * s;
        this[6] = a12 * c + a22 * s;
        this[7] = a13 * c + a23 * s;
        this[8] = a20 * c - a10 * s;
        this[9] = a21 * c - a11 * s;
        this[10] = a22 * c - a12 * s;
        this[11] = a23 * c - a13 * s;
        return this;
    }

    /**
     * Rotates @this_ matrix around the y axis
     * @param {number} rad Radians to rotate by
     * @return {Matrix4} Returns modified matrix
     */
    rotateY(rad) {
        var s = Math.sin(rad);
        var c = Math.cos(rad);
        var a00 = this[0];
        var a01 = this[1];
        var a02 = this[2];
        var a03 = this[3];
        var a20 = this[8];
        var a21 = this[9];
        var a22 = this[10];
        var a23 = this[11];

        this[0] = a00 * c - a20 * s;
        this[1] = a01 * c - a21 * s;
        this[2] = a02 * c - a22 * s;
        this[3] = a03 * c - a23 * s;
        this[8] = a00 * s + a20 * c;
        this[9] = a01 * s + a21 * c;
        this[10] = a02 * s + a22 * c;
        this[11] = a03 * s + a23 * c;
    }

    /**
     * Creates a perspective matrix
     * Returned matrix is from -1 to 1 (webGL standard)
     * @param {number} fovy Field of view in radians in the y axis
     * @param {number} aspect Aspect ratio of x / y
     * @param {number} near Near clip plane z depth
     * @param {number} far Far clip plane z depth
     * @return {Matrix4} Returns modified matrix
     */
    perspectiveNO(fovy, aspect, near, far) {
        var f = 1.0 / Math.tan(fovy / 2);
        this[0] = f / aspect;
        this[1] = 0;
        this[2] = 0;
        this[3] = 0;
        this[4] = 0;
        this[5] = f;
        this[6] = 0;
        this[7] = 0;
        this[8] = 0;
        this[9] = 0;
        this[11] = -1;
        this[12] = 0;
        this[13] = 0;
        this[15] = 0;
    
        if (far != null && far !== Infinity) {
            var nf = 1 / (near - far);
            this[10] = (far + near) * nf;
            this[14] = 2 * far * near * nf;
        } else {
            this[10] = -1;
            this[14] = -2 * near;
        }

        return this;
    }

}









