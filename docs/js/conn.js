// conn.js
function init_conn( isDM, msg_handler ) {
	var URL = "ws://34.209.226.143:25565";
	
	var player = !isDM,
		ws = new WebSocket( URL );;

	function on_reopen() {

	}

	function on_open() {
		if( !player ) {
			ws.send( "host" );
		}
	}

	function on_msg( evt ) {
		msg_handler( evt );
	}

	function on_close( evt ) {

	}

	function send( msg ) {
		ws.send( msg );
	}

	ws.addEventListener( "open", on_open );
	//ws.addEventListener( "open", ws_reopen );
	ws.addEventListener( "message", on_msg );
	ws.addEventListener( "close", on_close );

	window.send = send;
}