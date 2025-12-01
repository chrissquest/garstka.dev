var defaultShadersProgram;

// Initialize GL one time settings (shaders, initial cam)
function initGL() {
	if(!gl) alert("WebGL not supported by your browser.");

	//GL Settings
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	//gl.frontFace(gl.CCW);
	// Performance
	//gl.enable(gl.CULL_FACE);
	//gl.cullFace(gl.BACK);

    //Create shaders
	var glVertexShader = gl.createShader(gl.VERTEX_SHADER);
	var glFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	// Choose shader source, eg. which string to use in shaders.js
	// vertexShader, fragmentShaderCol need to be declared in shaders.js first
	gl.shaderSource(glVertexShader, vertexShader);
	gl.shaderSource(glFragmentShader, fragmentShaderCol);
	
	// Compile shaders
	gl.compileShader(glVertexShader);
	// error check
	if (!gl.getShaderParameter(glVertexShader, gl.COMPILE_STATUS)) console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(glVertexShader));

	gl.compileShader(glFragmentShader);
	// error check
	if (!gl.getShaderParameter(glFragmentShader, gl.COMPILE_STATUS)) console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(glFragmentShader));


	// Create the webgl "program", links the shaders to be used on the canvas
    // Global bc we need it for drawing
    // Can make multiple for different shaders it seems?
	defaultShadersProgram = gl.createProgram();
	gl.attachShader(defaultShadersProgram, glVertexShader);
	gl.attachShader(defaultShadersProgram, glFragmentShader);
	gl.linkProgram(defaultShadersProgram);
	gl.validateProgram(defaultShadersProgram);
	gl.useProgram(defaultShadersProgram);
	// Removed error checking bc only really the shaders can fail compiling, this shouldn't really fail?
}