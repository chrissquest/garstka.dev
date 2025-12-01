
// This is for inputs that we poll on update, so movement
// Action inputs can be called directly from keydown

class Input {
	static up = false;
	static down = false;
	static left = false;
	static right = false;
	static forward = false;
	static backward = false;
	static lookUp = false;
	static lookDown = false;
	static lookLeft = false;
	static lookRight = false;
}


// Not sure if there is a cleaner way to do this, seems like it needs to be duplicated
document.addEventListener('keydown', function(event) {
	if (event.repeat) return;
	switch (event.key) {
		case " ":
			Input.up = true;
		break;
		case "Shift":
			Input.down = true;
		break;
		case "a":
			Input.left = true;
		break;
		case "d":
			Input.right = true;
		break;
		case "w":
			Input.forward = true;
		break;
		case "s":
			Input.backward = true;
		break;
		case "ArrowUp":
			Input.lookUp = true;
		break;
		case "ArrowDown":
			Input.lookDown = true;
		break;
		case "ArrowLeft":
			Input.lookLeft = true;
		break;
		case "ArrowRight":
			Input.lookRight = true;
		break;
	}
});

document.addEventListener('keyup', function(event) {
	if (event.repeat) return;
	switch (event.key) {
		case " ":
			Input.up = false;
		break;
		case "Shift":
			Input.down = false;
		break;
		case "a":
			Input.left = false;
		break;
		case "d":
			Input.right = false;
		break;
		case "w":
			Input.forward = false;
		break;
		case "s":
			Input.backward = false;
		break;
		case "ArrowUp":
			Input.lookUp = false;
		break;
		case "ArrowDown":
			Input.lookDown = false;
		break;
		case "ArrowLeft":
			Input.lookLeft = false;
		break;
		case "ArrowRight":
			Input.lookRight = false;
		break;
	}
});















