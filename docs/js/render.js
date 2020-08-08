// render.js
function init_renderer() {
	var DELAY_PING = 1000;

	var game_started = false,
		loop = null;

	var time_last_ping = -1;

	function set_loop( f ) {
		loop = f;
	}

	function render_loop( time ) {
		if( time_last_ping == -1 ) time_last_ping = time;
		if( time - time_last_ping > DELAY_PING ) {
			time_last_ping = time;
			window.send( "ping" );
		}
		if( loop != null ) {
			loop();
		}
		window.requestAnimationFrame( render_loop );
	}

	window.requestAnimationFrame( render_loop );

	window.set_loop = set_loop;
}

init_renderer();