
class Camera {
	// Static class
	// Should this be static?
	// I dont really see a reason why not, will make it better when changing camera properties later
	// Only reason would be swapping in cameras, but storing the pos and rotation should be easy enough
	static moveSpeed = 0.05;
	static rotSpeed = 0.015;
	static pos = new Vector3(0, 0, -6);
	static rotation = {x: 0, y: 0};
	static worldMatrix = new Matrix4();
	static rotMatrix = new Matrix4();
	static posMatrix = new Matrix4();
	// rot and pos make the view matrix
	static viewMatrix = new Matrix4();
	static projMatrix = new Matrix4();

	static init() {
		this.worldMatrix.identity();
		this.viewMatrix.identity();
		this.projMatrix.perspectiveNO(deg_to_rad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 5000.0);

		// Grab gpu variable locations
		var matWorldUniformLocation = gl.getUniformLocation(defaultShadersProgram, 'mWorld');
		var matViewUniformLocation = gl.getUniformLocation(defaultShadersProgram, 'mView');
		var matProjUniformLocation = gl.getUniformLocation(defaultShadersProgram, 'mProj');
		// Set gpu variables to matrices
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, this.worldMatrix);
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, this.projMatrix);
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, this.viewMatrix);
	}

	static update() {
		// We don't have to update proj matrix unless we change fov in game
		var matWorldUniformLocation = gl.getUniformLocation(defaultShadersProgram, 'mWorld');
		var matViewUniformLocation = gl.getUniformLocation(defaultShadersProgram, 'mView');
		
		// I think im doing this wrong and it's rotating the camera left vector vertically
		// Only works if we ignore y value when moving forward
		// And coulddd be why we have to inverse x and z values when getting left and forwards vectors from the matrice? not sure tho
		// Rotation matrix

		// I think I should use 
		// fromRotationTranslation$1 to create a matrix from a quat and vector
		
		this.rotMatrix.identity();
		this.rotMatrix.rotateX(this.rotation.y);
		this.rotMatrix.rotateY(this.rotation.x);
		// Translation matrix
		this.posMatrix.translation(this.pos);

		// Apply to viewMatrix to combine
		this.viewMatrix = this.rotMatrix;
		this.viewMatrix.multiply(this.posMatrix);

		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, this.worldMatrix);
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, this.viewMatrix);
	}

	static moveUp(){
		this.pos.y -= this.moveSpeed;
	}
	static moveDown(){
		this.pos.y += this.moveSpeed;
	}

	// getMoveLeft and getMoveForward should not be necessary if the matrices didnt break
	static moveLeft(){
		this.pos.add(this.rotMatrix.getMoveLeft().multiplyScalar(this.moveSpeed));
	}
	static moveRight(){
		this.pos.add(this.rotMatrix.getMoveLeft().multiplyScalar(-this.moveSpeed));
	}
	static moveForward(){
		this.pos.add(this.rotMatrix.getMoveForward().multiplyScalar(this.moveSpeed));
	}
	static moveBackward(){
		this.pos.add(this.rotMatrix.getMoveForward().multiplyScalar(-this.moveSpeed));
	}

	// Change camera angles which recalc the view matrix on update
	static lookUp(){
		this.rotation.y -= this.rotSpeed;
	}
	static lookDown(){
		this.rotation.y += this.rotSpeed;
	}
	static lookLeft(){
		this.rotation.x -= this.rotSpeed;
	}
	static lookRight(){
		this.rotation.x += this.rotSpeed;
	}

}
