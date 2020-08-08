// player.js
function handle_msg( evt ) {
	console.log( evt.data );
}

window.init_conn( false, handle_msg );