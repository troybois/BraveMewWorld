// dm.js
function dm_init() {
	var SCREEN_CREATE = document.getElementById( "dungeonRoom" ),
		SCREEN_JOIN = document.getElementById( "joinRoom" ),
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

	var CANVAS_CREATE = document.getElementById( "creator" ),
		CANVAS_GAME = document.getElementById( "game" );

	window.init_canvas_game( CANVAS_GAME );

	CANVAS_CREATE.width = WIDTH_CREATE_CANVAS;
	CANVAS_CREATE.height = HEIGHT_CREATE_CANVAS;
	CANVAS_CREATE.style.marginTop = ( -( ( HEIGHT_CREATE_CANVAS / 2 ) | 0 ) ).toString() + "px";
	CANVAS_CREATE.style.marginLeft = ( -( ( WIDTH_CREATE_CANVAS / 2 ) | 0 ) ).toString() + "px";

	var i, j;

	function Action( x, y, type, x2, y2 ) {
		this.x = x;
		this.y = y;
		if( x2 == null || x2 == undefined ) {
			this.x2 = -1;
		} else {
			this.x2 = x2;
		}
		if( y2 == null || y2 == undefined ) {
			this.y2 = -1;
		} else {
			this.y2 = y2;
		}
		this.type = type;
	}

	var ctx_create = CANVAS_CREATE.getContext( "2d" ), 
		tile_create_x = -1,
		tile_create_y = -1,
		start_x1 = -1,
		start_x2 = -1,
		start_y1 = -1,
		start_y2 = -1,
		end_x1 = -1,
		end_x2 = -1,
		end_y1 = -1,
		end_y2 = -1,
		dungeon_actions = [],
		up_backspace = 0,
		up_r = 0,
		up_c = 0;

	function handle_mousemove_create( evt ) {
		var rect = CANVAS_CREATE.getBoundingClientRect();
		var top, left, width, height;
		top = rect.top;
        left = rect.left;
        width = rect.right - left;
        height = rect.bottom - top;
        tile_create_x = ( ( evt.clientX - left ) / width * TWIDTH_DG ) | 0;
        tile_create_y = ( ( evt.clientY - top ) / height * THEIGHT_DG ) | 0;
	}

	function handle_mouseout_create( evt ) {
		tile_create_y = -1;
		tile_create_x = -1;
	}

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
		typing = false;

	function keyblade( code, pressed ) {
		console.log( code );
		var k = null;
		switch( code ) {
			case 8: //BACKSPACE
				down_backspace = ( k = pressed );
				break;
			case 13: // ENTER
				down_enter = ( k = pressed );
				console.log( pressed );
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
		if( keyblade( evt.keyCode, false ) && !typing ) evt.preventDefault();
	}

	function handle_keydown( evt ) {
		if( keyblade( evt.keyCode, true ) && !typing ) evt.preventDefault();
	}

	function create_loop( time ) {
		ctx_create.clearRect( 0, 0, WIDTH_CREATE_CANVAS, HEIGHT_CREATE_CANVAS );
		if( down_enter ) {
			SCREEN_CREATE.setAttribute( "class", "hide" );
			CANVAS_CREATE.removeEventListener( "mousemove", handle_mousemove_create );
			CANVAS_CREATE.removeEventListener( "mouseout", handle_mouseout_create );
			window.set_loop( null );
			parse_actions();
		}
		if( down_backspace && up_r == 0 && up_c == 0 ) up_backspace = 1;
		else if( up_backspace == 1 ) up_backspace = 2;
		else {
			if( down_r && up_backspace == 0 && up_c == 0 ) up_r = 1;
			else if( up_r == 1 ) up_r = 2;
			else {
				if( down_c && up_backspace == 0 && up_r == 0 ) up_c = 1;
				else if( up_c == 1 ) up_c = 2;
			}
		}
		var last_action;
		if( up_backspace == 2 ) {
			up_backspace = 0;
			if( dungeon_actions.length > 0 ) {
				dungeon_actions.pop();
			}
		} else if( up_r == 2 ) {
			up_r = 0;
			if( tile_create_x != -1 && tile_create_y != -1 ) {
				if( dungeon_actions.length > 0 ) {
					last_action = dungeon_actions.pop();
				} else {
					last_action = null;
				}
				if( last_action == null || last_action.type != 'c'  ) {
					if( last_action != null && last_action.type == 'r' ) {
						dungeon_actions.push( new Action( last_action.x, last_action.y, 'R', tile_create_x, tile_create_y ) );
						end_x1 = Math.min( last_action.x, tile_create_x );
						end_y1 = Math.min( last_action.y, tile_create_y );
						end_x2 = Math.max( last_action.x, tile_create_x );
						end_y2 = Math.max( last_action.y, tile_create_y );
						if( start_x1 == -1 ) {
							start_x1 = end_x1;
							start_y1 = end_y1;
							start_x2 = end_x2;
							start_y2 = end_y2;
						}
					} else {
						if( last_action != null ) dungeon_actions.push( last_action );
						dungeon_actions.push( new Action( tile_create_x, tile_create_y, 'r' ) );
					}
				} else {
					if( last_action != null ) dungeon_actions.push( last_action );
				}
			}
		} else if( up_c == 2 ) {
			up_c = 0;
			if( tile_create_x != -1 && tile_create_y != -1 ) {
				if( dungeon_actions.length > 0 ) {
					last_action = dungeon_actions.pop();
				} else {
					last_action = null;
				}
				if( last_action == null || last_action.type != 'r' ) {
					if( last_action != null && last_action.type == 'c' ) {
						dungeon_actions.push( new Action( last_action.x, last_action.y, 'C', tile_create_x, tile_create_y ) );
					} else {
						if( last_action != null ) dungeon_actions.push( last_action );
						dungeon_actions.push( new Action( tile_create_x, tile_create_y, 'c' ) );
					}
				} else {
					if( last_action != null ) dungeon_actions.push( last_action );
				}
			}
		}
		var x1, y1, x2, y2;
		for( i = 0; i < dungeon_actions.length; ++i ) {
			last_action = dungeon_actions[ i ];
			switch( last_action.type ) {
				case 'C':
					ctx_create.fillStyle = "#00FF00";
					x1 = Math.min( last_action.x, last_action.x2 );
					y1 = Math.min( last_action.y, last_action.y2 );
					x2 = Math.max( last_action.x, last_action.x2 );
					y2 = Math.max( last_action.y, last_action.y2 );
					ctx_create.fillRect( x1 * SIZE_CREATE_TILE, y1 * SIZE_CREATE_TILE, SIZE_CREATE_TILE * ( x2 - x1 + 1 ), SIZE_CREATE_TILE * ( y2 - y1 + 1 ) ); 
					break;
				case 'R':
					ctx_create.fillStyle = "#0000FF";
					x1 = Math.min( last_action.x, last_action.x2 );
					y1 = Math.min( last_action.y, last_action.y2 );
					x2 = Math.max( last_action.x, last_action.x2 );
					y2 = Math.max( last_action.y, last_action.y2 );
					ctx_create.fillRect( x1 * SIZE_CREATE_TILE, y1 * SIZE_CREATE_TILE, SIZE_CREATE_TILE * ( x2 - x1 + 1 ), SIZE_CREATE_TILE * ( y2 - y1 + 1 ) ); 
					break;
				case 'c':
					ctx_create.fillStyle = "#00FF00";
					ctx_create.fillRect( last_action.x * SIZE_CREATE_TILE, last_action.y * SIZE_CREATE_TILE, SIZE_CREATE_TILE, SIZE_CREATE_TILE ); 
					break;
				case 'r':
					ctx_create.fillStyle = "#0000FF";
					ctx_create.fillRect( last_action.x * SIZE_CREATE_TILE, last_action.y * SIZE_CREATE_TILE, SIZE_CREATE_TILE, SIZE_CREATE_TILE ); 
					break;
			}
		}
		if( tile_create_x != -1 && tile_create_y != -1 ) {
			ctx_create.fillStyle = "#FFFFFF";
			ctx_create.globalAlpha = 0.5;
			ctx_create.fillRect( tile_create_x * SIZE_CREATE_TILE, tile_create_y * SIZE_CREATE_TILE, SIZE_CREATE_TILE, SIZE_CREATE_TILE ); 
			ctx_create.globalAlpha = 1;
		}
	}

	CANVAS_CREATE.addEventListener( "mousemove", handle_mousemove_create );
	CANVAS_CREATE.addEventListener( "mouseout", handle_mouseout_create );

	document.addEventListener( "keyup", handle_keyup );
	document.addEventListener( "keydown", handle_keydown );

	window.set_loop( create_loop );

	function Door( direction, offset ) {
		this.direction = direction;
		this.offset = offset;
	}

	function Cooridor( x1, y1, x2, y2 ) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.vertical = null;
		if( ( ( x2 - x1 ) == 2 ) && ( ( y2 - y1 ) != 2 ) ) {
			this.vertical = true;
		} else if( ( ( x2 - x1 ) != 2 ) && ( ( y2 - y1 ) == 2 ) ) {
			this.vertical = false;
		}
	}

	function Room( x1, y1, x2, y2 ) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.cleared = false;
		this.active = false;
		this.doors = [];
	}

	var cooridors = [],
		rooms = [],
		tiles = [],
		row,
		room,
		cooridor,
		start_room,
		end_room,
		game_data = {cooridors:cooridors, rooms:rooms};
			

	for( i = 0; i < THEIGHT_DG; ++i ) {
		row = [];
		for( j = 0; j < TWIDTH_DG; ++j ) {
			row.push( 0 );
		}
		tiles.push( row );
	}

	function parse_actions() {
		game_data[ "action" ] = 'd';
		game_data[ "start_x1" ] = start_x1; 
		game_data[ "start_x2" ] = start_x2; 
		game_data[ "start_y1" ] = start_y1; 
		game_data[ "start_y2" ] = start_y2;
		game_data[ "end_x1" ] = end_x1; 
		game_data[ "end_x2" ] = end_x2; 
		game_data[ "end_y1" ] = end_y1; 
		game_data[ "end_y2" ] = end_y2;
		var action, x1, y1, x2, y2;
		while( dungeon_actions.length > 0 ) {
			action = dungeon_actions.pop();
			switch( action.type ) {
				case 'R':
					x1 = Math.min( action.x, action.x2 );
					y1 = Math.min( action.y, action.y2 );
					x2 = Math.max( action.x, action.x2 );
					y2 = Math.max( action.y, action.y2 );
					room = new Room( x1, y1, x2, y2 );
					if( ( start_x1 == x1 && start_x2 == x2 ) && ( start_y1 == y1 && start_y2 == y2 ) ) {
						start_room = room;
					} else if( ( end_x1 == x1 && end_x2 == x2 ) && ( end_y1 == y1 && end_y2 == y2 ) ) {
						end_room = room;
					}
					rooms.push( room );
					break;
				case 'C':
					x1 = Math.min( action.x, action.x2 );
					y1 = Math.min( action.y, action.y2 );
					x2 = Math.max( action.x, action.x2 );
					y2 = Math.max( action.y, action.y2 );
					cooridors.push( new Cooridor( x1, y1, x2, y2 ) );
					break;
			}
		}
		var x, y;
		for( i = 0; i < rooms.length; ++i ) {
			room = rooms[ i ];
			for( y = room.y1; y <= room.y2; ++y ) {
				for( x = room.x1; x <= room.x2; ++x ) {
					tiles[ y ][ x ] = i + 1;
				}
			}
		}
		for( i = 0; i < cooridors.length; ++i ) {
			cooridor = cooridors[ i ];
			if( cooridor.vertical == null ) {
				if( cooridor.y1 - 1 >= 0 && tiles[ cooridor.y1 - 1 ][ cooridor.x1 + 1 ] != 0 ) {
					cooridor.vertical = true;
				} else if( cooridor.x1 - 1 >= 0 && tiles[ cooridor.y1 - 1 ][ cooridor.x1 + 1 ] != 0 ) {
					cooridor.vertical = false;
				} 
			}
			if( cooridor.vertical ) {
				room = rooms[ tiles[ cooridor.y1 - 1 ][ cooridor.x1 + 1 ] - 1 ];
				room.doors.push( new Door( 's', cooridor.x1 + 1 ) );
				room = rooms[ tiles[ cooridor.y2 + 1 ][ cooridor.x1 + 1 ] - 1 ];
				room.doors.push( new Door( 'n', cooridor.x1 + 1 ) );
			} else {
				room = rooms[ tiles[ cooridor.y1 + 1 ][ cooridor.x1 - 1 ] - 1 ];
				room.doors.push( new Door( 'e', cooridor.y1 + 1 ) );
				room = rooms[ tiles[ cooridor.y1 + 1 ][ cooridor.x2 + 1 ] - 1 ];
				room.doors.push( new Door( 'w', cooridor.y1 + 1 ) );
			}
			for( y = cooridor.y1; y <= cooridor.y2; ++y ) {
				for( x = cooridor.x1; x <= cooridor.x2; ++x ) {
					tiles[ y ][ x ] = rooms.length + i + 1;
				}
			}
		}
		window.render_dg_rooms( rooms );
		window.render_dg_cooridors( cooridors );
		window.set_render_room( start_room );
		me.x = start_room.x1 * SIZE_DG_TILE + ( ( Math.random() * ( start_room.x2 - start_room.x1 ) ) | 0 ) * SIZE_DG_TILE;
		me.y = start_room.y1 * SIZE_DG_TILE + ( ( Math.random() * ( start_room.y2 - start_room.y1 ) ) | 0 ) * SIZE_DG_TILE;
		SCREEN_JOIN.setAttribute( "class", "show" );
		typing = true;
		BUTTON_JOIN.addEventListener( "click", handle_button_join );
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
		if( down_enter ) {
			if( !game_started ) {
				window.send( JSON.stringify( { action: 's' } ) );
				console.log( "whoops" )
				game_started = true;
			}
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

	var INPUT_ROOM = document.getElementById( "roomInput" );

	var BUTTON_JOIN = document.getElementById( "submitRoom" );

	var joined = false;

	function handle_open( evt ) {
		window.send( "host" );
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
					case 'j':
						window.send( JSON.stringify( game_data ) );
						break;
				}
			}
		} else {
			num = msg.charAt( 0 );
			if( num >= '0' && num <= '9' ) {
				num = num - '0';
				switch( num ) {
					case 0:
						window.set_loop( update );
						joined = true;
						SCREEN_JOIN.setAttribute( "class", "hide" );
						typing = false;
						SCREEN_GAME.setAttribute( "class", "show" );
						window.enable_view();
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
	}

	window.init_conn( handle_open, handle_msg );
}

dm_init();