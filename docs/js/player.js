// player.js
var INPUT_ROOM = document.getElementById( "roomInput" );

var BUTTON_JOIN = document.getElementById( "submitRoom" );

function handle_open( evt ) {
	console.log( "opened" );
}

function handle_msg( evt ) {
	console.log( evt.data );
}

function handle_button_join() {
	if( INPUT_ROOM.value == null ) {
		
	} else {
		var value = INPUT_ROOM.value.trim();
		if( value == "" ) {
			
		} else if( value == "ping" || value == "host" ) {
			//alert( "" );
		} else {
			window.send( value );
		}
	}
	console.log( INPUT_ROOM );
}

window.init_conn( handle_open, handle_msg );

BUTTON_JOIN.addEventListener( "click", handle_button_join );