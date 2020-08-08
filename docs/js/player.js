// player.js
function handle_open( evt ) {
	console.log( "opened" );
}

function handle_msg( evt ) {
	console.log( evt.data );
}

window.init_conn( false, handle_open, handle_msg );