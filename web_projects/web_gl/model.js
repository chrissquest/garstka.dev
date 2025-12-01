
class Model {
	constructor() {
		this.vertices = [];
		this.indices = [];
		this.colors = [];
	}

	/**
	 * Parses an OBJ text input and converts it to engine model format
	 * @param {String} obj 
	 * @return {Model}
	 */
	parseOBJ(obj) {
		const split = obj.split("\n");
		// Parse line by line
		for (var line of split) {
			// Vertices
			if(line.substring(0, 1) == "v") {
				const coords = line.substring(2).split(" ");
				const x = parseFloat(coords[0]);
				const y = parseFloat(coords[1]);
				const z = parseFloat(coords[2]);
				this.vertices.push(x);
				this.vertices.push(y);
				this.vertices.push(z);
			}
			// Indices for the faces
			else if(line.substring(0, 1) == "f") {
				const face = line.substring(2).split(" ");
				if(face.length == 3) {
					const v1 = parseInt(face[0]) - 1;
					const v2 = parseInt(face[1]) - 1;
					const v3 = parseInt(face[2]) - 1;
					this.indices.push(v1);
					this.indices.push(v2);
					this.indices.push(v3);
				} else if (face.length == 4) {
					const v1 = parseInt(face[0]) - 1;
					const v2 = parseInt(face[1]) - 1;
					const v3 = parseInt(face[2]) - 1;
					const v4 = parseInt(face[3]) - 1;
					this.indices.push(v1);
					this.indices.push(v2);
					this.indices.push(v3);
					this.indices.push(v1);
					this.indices.push(v3);
					this.indices.push(v4);
				}

			}
		}

		// Fill with colors
		for (let i = 0; i < this.vertices.length / 9; i++) {
			this.colors.push(
				1.0, 0.0, 0.0, // Red
				1.0, 1.0, 0.0, // Yellow
				1.0, 1.0, 1.0);// White
		}
		return this;
	}
}

