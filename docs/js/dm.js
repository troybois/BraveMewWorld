// dm.js
function dm_init() {
	var SCREEN_CREATE = document.getElementById( "dungeonRoom" ),
		SCREEN_JOIN = document.getElementById( "joinRoom" );

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

	window.init_canvas_game( CANVAS_GAME, WIDTH_DG, HEIGHT_DG );

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
		this.doors = [];
	}

	var cooridors = [],
		rooms = [],
		tiles = [],
		row,
		room,
		cooridor,
		start_room,
		end_room;

	for( i = 0; i < THEIGHT_DG; ++i ) {
		row = [];
		for( j = 0; j < TWIDTH_DG; ++j ) {
			row.push( 0 );
		}
		tiles.push( row );
	}

	function parse_actions() {
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
		console.log( tiles );
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
		SCREEN_JOIN.setAttribute( "class", "show" );
		BUTTON_JOIN.addEventListener( "click", handle_button_join );
	}

	var INPUT_ROOM = document.getElementById( "roomInput" );

	var BUTTON_JOIN = document.getElementById( "submitRoom" );

	function handle_open( evt ) {
		window.send( "host" );
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
	}

	window.init_conn( handle_open, handle_msg );
}

dm_init();