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

	var tiles = [], 
		rooms, 
		cooridors, 
		row, 
		room, 
		cooridor,
		start_room;

	for( i = 0; i < THEIGHT_DG; ++i ) {
		row = [];
		for( j = 0; j < TWIDTH_DG; ++j ) {
			row.push( 0 );
		}
		tiles.push( row );
	}

	function Entity( x, y ) {
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 0;
		this.room = -1;
	}

	var DM_VELOCITY = .1,
		DM_DIAG_VELOCITY = DM_VELOCITY / Math.sqrt( 2 );

	var me = new Entity( 0, 0 ),
		last_update = -1,
		ticks,
		entities = [],
		game_started = false;

	entities.push( me );

	function get_tile( ent_x, ent_y ) {
		var tx = ( ent_x / SIZE_DG_TILE ) | 0,
			ty = ( ent_y / SIZE_DG_TILE	) | 0;

		if( tx < 0 || tx >= TWIDTH_DG || ty < 0 || ty >= THEIGHT_DG ) {
			return -1;
		}

		return tiles[ ty ][ tx ];
	}

	function is_room( tile ) {
		return ( tile - 1 ) >= 0 && ( tile - 1 ) < rooms.length;
	}

	function update( time ) {
		if( last_update == -1 ) last_update = time;
		ticks = time - last_update;
		me.dy = me.dx = 0;
		if( down_up && !down_down ) {
			me.dy = -DM_VELOCITY;
		} else if( down_down && !down_up ) {
			me.dy = DM_VELOCITY;
		}
		if( down_left && !down_right ) {
			me.dx = -DM_VELOCITY;
		} else if( down_right && !down_left ) {
			me.dx = DM_VELOCITY;
		}
		if( me.dx != 0 && me.dy != 0 ) {
			if( me.dx < 0 ) {
				me.dx = -DM_DIAG_VELOCITY;
			} else {
				me.dx = DM_DIAG_VELOCITY;
			}
			if( me.dy < 0 ) {
				me.dy = -DM_DIAG_VELOCITY;
			} else {
				me.dy = DM_DIAG_VELOCITY;
			}
		}
		var ent, next_x, next_y, tile;
		for( i = 0; i < entities.length; ++i ) {
			ent = entities[ i ];
			next_x = ent.x + ent.dx * ticks;
			next_y = ent.y + ent.dy * ticks;
			tile = get_tile( next_x, next_y );
			if( tile > 0 ) {
				ent.x = next_x;
				ent.y = next_y;
				if( tile != ent.room ) {
					ent.room = tile;
					if( ent == me ) {
						if( is_room( tile ) ) {
							window.set_render_room( rooms[ tile - 1 ] );
						} else {
							window.set_render_cooridor( cooridors[ tile - 1 - rooms.length ] );
						}
					}
				}
			}
		}
		window.set_viewpoint( me.x, me.y );
		last_update	= time;
	}

	function parse_data( obj_data ) {
		window.render_dg_rooms( rooms = game_data.rooms );
		window.render_dg_cooridors( cooridors = game_data.cooridors );
		var x, y;
		for( i = 0; i < rooms.length; ++i ) {
			room = rooms[ i ];
			if( room.x1 == game_data.start_x1 && room.x2 == game_data.start_x2 &&
				room.y1 == game_data.start_y1 && room.y2 == game_data.start_y2 ) {
				start_room = room;
			}
			for( y = room.y1; y <= room.y2; ++y ) {
				for( x = room.x1; x <= room.x2; ++x ) {
					tiles[ y ][ x ] = i + 1;
				}
			}
		}
		for( i = 0; i < cooridors.length; ++i ) {
			cooridor = cooridors[ i ];
			for( y = cooridor.y1; y <= cooridor.y2; ++y ) {
				for( x = cooridor.x1; x <= cooridor.x2; ++x ) {
					tiles[ y ][ x ] = rooms.length + i + 1;
				}
			}
		}
		me.x = start_room.x1 * SIZE_DG_TILE + ( ( Math.random() * ( start_room.x2 - start_room.x1 ) ) | 0 ) * SIZE_DG_TILE;
		me.y = start_room.y1 * SIZE_DG_TILE + ( ( Math.random() * ( start_room.y2 - start_room.y1 ) ) | 0 ) * SIZE_DG_TILE;
		window.set_render_room( start_room );
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
						window.enable_view();
						window.set_loop( update );
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