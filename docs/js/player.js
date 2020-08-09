// player.js
function player_init() {
	var SCREEN_JOIN = document.getElementById( "joinRoom" ),
		SCREEN_WAIT = document.getElementById( "waitRoom" ),
		SCREEN_GAME = document.getElementById( "gameRoom" );

	var TWIDTH_DG = 200,
		THEIGHT_DG = 112,
		SIZE_DG_TILE = 16,
		WIDTH_DG = ( TWIDTH_DG + 2 ) * SIZE_DG_TILE,
		HEIGHT_DG = ( THEIGHT_DG + 6 ) * SIZE_DG_TILE,
		WIDTH_CREATE_TILE = ( window.screen.width / TWIDTH_DG ) | 0,
		HEIGHT_CREATE_TILE = ( window.screen.height / THEIGHT_DG ) | 0,
		SIZE_CREATE_TILE = Math.min( WIDTH_CREATE_TILE, HEIGHT_CREATE_TILE ),
		WIDTH_CREATE_CANVAS = SIZE_CREATE_TILE * TWIDTH_DG,
		HEIGHT_CREATE_CANVAS = SIZE_CREATE_TILE * THEIGHT_DG;

	window.init_canvas_dg( WIDTH_DG, HEIGHT_DG );

	var CANVAS_GAME = document.getElementById( "game" );

	window.init_canvas_game( CANVAS_GAME );

	var INPUT_ROOM = document.getElementById( "roomInput" );

	var BUTTON_JOIN = document.getElementById( "submitRoom" );

	var joined = false,
		game_data = null,
		i,
		j;

	var down_backspace = false,
		down_r = false,
		down_c = false
		down_enter = false,
		down_left = false,
		down_right = false,
		down_up = false,
		down_down = false,
		down_w = false,
		down_a = false,
		down_s = false,
		down_d = false,
		typing = true;

	function keyblade( code, pressed ) {
		console.log( code );
		var k = null;
		switch( code ) {
			case 8: //BACKSPACE
				down_backspace = ( k = pressed );
				break;
			case 13: // ENTER
				down_enter = ( k = pressed );
				break;
			case 82: // R
				down_r = ( k = pressed );
				break;
			case 67: // C
				down_c = ( k = pressed );
				break;
			case 37: // LEFT
				down_left = ( k = pressed );
				break;
			case 38: // UP
				down_up = ( k = pressed );
				break;
			case 39: // RIGHT
				down_right = ( k = pressed );
				break;
			case 40: // DOWN
				down_down = ( k = pressed );
				break;
			case 87: // W
				down_w = ( k = pressed );
				break;
			case 65: // A
				down_a = ( k = pressed );
				break;
			case 68: // D
				down_d = ( k = pressed );
				break;
			case 83: // S
				down_s = ( k = pressed );
				break;
		}
		if( k != null ) {
			return true;
		} else {
			return false;
		}
	}

	function handle_keyup( evt ) {
		if( !typing && keyblade( evt.keyCode, false ) ) evt.preventDefault();
	}

	function handle_keydown( evt ) {
		if( !typing && keyblade( evt.keyCode, true ) ) evt.preventDefault();
	}

	document.addEventListener( "keyup", handle_keyup );
	document.addEventListener( "keydown", handle_keydown );

	var tiles = [], rooms, cooridors, row, room, cooridor;

	for( i = 0; i < THEIGHT_DG; ++i ) {
		row = [];
		for( j = 0; j < TWIDTH_DG; ++j ) {
			row.push( 0 );
		}
		tiles.push( row );
	}

	function parse_data( obj_data ) {
		window.render_dg_rooms( rooms = game_data.rooms );
		window.render_dg_cooridors( cooridors = game_data.cooridors );
		for( i = 0; i < rooms.length; ++i ) {
			room = rooms[ i ];
		}
		for( i = 0; i < cooridors.length; ++i ) {
			cooridor = cooridors[ i ];
		}
	}

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
						parse_data( obj_data );
						break;
					case 's':
						SCREEN_WAIT.setAttribute( "class", "hide" );
						SCREEN_GAME.setAttribute( "class", "show" );
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
						SCREEN_JOIN.setAttribute( "class", "hide" );
						typing = false;
						SCREEN_WAIT.setAttribute( "class", "show" );
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