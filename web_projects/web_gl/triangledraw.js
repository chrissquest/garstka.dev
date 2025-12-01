// Clear frame to black
function clearFrame(){
	gl.clearColor(0, 0, 0, 1.0);  // Clear color
	gl.clearDepth(1.0);                 // Clear depth  
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Send to buffer?
}

/**
 * Draws a model with color pattern
 * @param {Model} model 
 */
function testDrawModel(model) {
	// basic color pattern to see models more easily
	
	drawModelColor(model.vertices, model.indices, model.colors);
}

/** 
 * Draws a single triangle in 3d space
 * @param {Float32Array} vertices 
 * @param {Uint16Array} indices 
 * @param {Float32Array} colors 
 */ 
function drawModelColor(vertices, indices, colors){
	// Bind buffers, the the cpu based variable is linked to the gpu variable

	// index buffer data
	var index_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


	// put in vertex buffer data
	var vertex_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	// Attributes tell the gpu what format the vertex buffer is in
	var coord = gl.getAttribLocation(defaultShadersProgram, "vertPosition");
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 
	gl.enableVertexAttribArray(coord);


	// seperate color buffer seems like a cleaner way to do it actually
	var color_Buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, color_Buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	var color = gl.getAttribLocation(defaultShadersProgram, "vertColor");
	gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0); 
	gl.enableVertexAttribArray(color);
	
	// Final draw call using all information in gpu now
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

// Draw a single triangle in 2d space, z is zero'd out, uses array of length 2 for simple vector2
function draw2DTriangle(vec2_a, vec2_b, vec2_c, vec3_color) {
	const vertices = [
		vec2_a[0], vec2_a[1], -3,
		vec2_b[0], vec2_b[1], -3,
		vec2_c[0], vec2_c[1], -3
	];
	
	const colors = [
		vec3_color[0], vec3_color[1], vec3_color[2],
		vec3_color[0], vec3_color[1], vec3_color[2],
		vec3_color[0], vec3_color[1], vec3_color[2]
	]

	const indices = [0,1,2]; 

	drawModelColor(vertices, indices, colors);
}