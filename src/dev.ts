import * as tonal from "./index.js";

var el = document.querySelector("pre");
var data = tonal.Key.majorKey("Cb");
el!.textContent = JSON.stringify(data, null, 2);
