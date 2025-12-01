// Load model files
//const source_link = "./models/";
const source_link = "/web_projects/webGL/models/";
const model_names = [
"basic/tetrahedron.obj",
"basic/cube.obj",
"basic/cube_indented.obj",
"basic/level4.obj",
"basic/bean.obj",

"animals/cat.obj",

"maps/beavercreek/beavercreek.obj",

"raptin/Raptin.obj"

];

var model_promises = [];
var LOADED_MODELS = [];

// model_promises becomes the promises from fetching all the urls
model_promises = model_names.map(name =>
  fetch(source_link + name)
);

// Load all the models here
Promise.all(model_promises).then(promise_outputs => {
  // model_outputs from the promise returns a "Result" instead of the raw text, so we need to grab the .text() from each result and use that
  // but .text is itself a promise so... we have to have two calls for .all
  Promise.all(promise_outputs.map(m => m.text())).then(model_outputs => {
    LOADED_MODELS = model_outputs;
    // Start the program
    initMain();
  });
});
