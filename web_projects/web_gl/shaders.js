// More proper way could be to load these in using fetch as well but... it's not like there's shader debugging anyways

// Vertex shader
// With support for color and texture
var vertexShader = `
    precision mediump float;
    attribute vec3 vertPosition;
	attribute vec2 vertTexCoord;
	attribute vec3 vertColor;
    varying vec2 fragTexCoord;
	varying vec3 fragColor;
    uniform mat4 mView;
    uniform mat4 mProj;
	uniform mat4 mWorld;

    void main(void) {
    	gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
    	fragTexCoord = vertTexCoord; 
		fragColor = vertColor;
    }
  `;
  
// Fragment shader (using textures)
var fragmentShaderTex = `
	precision mediump float;
	uniform sampler2D img;
	varying vec2 fragTexCoord;
	
	void main(void) {
		vec4 color = texture2D(img, fragTexCoord);
    	gl_FragColor = color;
	}
  `;

 // Fragment shader (vertex colors only)
 var fragmentShaderCol = `
	precision mediump float;
	varying vec3 fragColor;
	void main(void) {
        gl_FragColor = vec4(fragColor, 1.0);
        //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
	}
  `;