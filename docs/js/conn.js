// conn.js
function init_conn( isDM, open_handler, msg_handler ) {
	var URL = "ws://34.209.226.143:25565";
	
	var player = !isDM,
		ws = new WebSocket( URL ),
		open = false;

	function on_reopen() {

	}

	function on_open() {
		open = true;
		open_handler();
	}

	function on_msg( evt ) {
		msg_handler( evt );
	}

	function on_close( evt ) {
		open = false;
	}

	function send( msg ) {
		if( open ) {
			ws.send( msg );
		}
	}

	ws.addEventListener( "open", on_open );
	//ws.addEventListener( "open", ws_reopen );
	ws.addEventListener( "message", on_msg );
	ws.addEventListener( "close", on_close );

	window.send = send;
}