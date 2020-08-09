// player.js
function player_init() {
	var SCREEN_JOIN = document.getElementById( "joinRoom" ),
		SCREEN_WAIT = document.getElementById( "waitRoom" );

	var INPUT_ROOM = document.getElementById( "roomInput" );

	var BUTTON_JOIN = document.getElementById( "submitRoom" );

	var joined = false,
		game_data = null;

	var down_backspace = false,
		down_r = false,
		down_c = false
		down_enter = false;

	function keyblade( code, pressed ) {
		console.log( code );
		switch( code ) {
			case 8: //BACKSPACE
				down_backspace = pressed;
				break;
			case 13: // ENTER
				down_enter = pressed;
				break;
			case 82: //R
				down_r = pressed;
				break;
			case 67: //C
				down_c = pressed;
				break;
		}
	}

	function handle_keyup( evt ) {
		keyblade( evt.keyCode, false );
	}

	function handle_keydown( evt ) {
		keyblade( evt.keyCode, true );
	}

	document.addEventListener( "keyup", handle_keyup );
	document.addEventListener( "keydown", handle_keydown );

	function handle_open( evt ) {
		console.log( "opened" );
	}

	function handle_msg( evt ) {
		var msg = evt.data, 
			obj_data,
			num;
		if( joined ) {
			if( msg.charAt( 0 ) == '{' ) {
				obj_data = JSON.parse( msg );
				switch( obj_data.action ) {
					case 'd':
						game_data = obj_data;
						break;
				}
			}
		} else {
			num = msg.charAt( 0 );
			if( num >= '0' && num <= '9' ) {
				num = num - '0';
				switch( num ) {
					case 0:
						joined = true;
						window.send( JSON.stringify( { action : "j" } ) );
						break;
				}
			}
		}
		console.log( msg );
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
}

player_init();