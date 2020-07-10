import { Core } from 'fc-premium-core'
import $ from 'jquery'
import mousetrap from 'mousetrap'

export const lib = new Core.Module({
	"name": "jquery-lib",
	"description": "Autocomplete icons",
	"author": "pytness",
	"version": "1.0.1",
	isLibrary: true,

	"matches": ["*"]
});

lib.onload = function() {
	Core.libraries.declare('jquery', $);
	Core.libraries.declare('mousetrap', mousetrap);
}

export { lib as module };
