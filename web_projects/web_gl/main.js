// Main loop lives here
const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl2");

// Can initialize GL at any time, light call
initGL();



var cube_model = new Model();

/**
 * @param {any} model 
 * @param {Matrix4} matrix 
 */
function multiplyModel(model, matrix){
	//  multiply each of the model's vertex by the matrix
	// for each Vector3 v .. v *= matrix
}

// Called when models are all loaded in
function initMain() {

	// parse cube model
	cube_model.parseOBJ(LOADED_MODELS[7]);

	// Apply matrix to model
	//multiplyModel(cube_model, );

	Camera.init();

	// Start loop
    mainLoop();
}



// Main loop
function mainLoop() {
	// could be useful
	//performance.now()

	//mainCamera.pos = [mainCamera.pos[0] += 0.005, mainCamera.pos[1], mainCamera.pos[2]]
	if(Input.up) Camera.moveUp();
	if(Input.down) Camera.moveDown();
	if(Input.left) Camera.moveLeft();
	if(Input.right) Camera.moveRight();
	if(Input.forward) Camera.moveForward();
	if(Input.backward) Camera.moveBackward();
	if(Input.lookUp) Camera.lookUp();
	if(Input.lookDown) Camera.lookDown();
	if(Input.lookLeft) Camera.lookLeft();
	if(Input.lookRight) Camera.lookRight();
	Camera.update();


	// Draw scene
	clearFrame();

	// To do this more like expected would need a 2d camera, Would need to be last call
	//draw2DTriangle([0, 1], [-0.5, 0], [0.5, 0], [1.0, 0, 1.0]);
	//drawModelColor(cube_model.vertices, cube_model.indices, colors);
	testDrawModel(cube_model);

  	//Loops after drawn
	requestAnimationFrame(mainLoop);
}





