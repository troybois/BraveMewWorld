// render.js
function init_renderer() {
	var DELAY_PING = 1000,
		ASSET_CORNER_E = new Image(),
		ASSET_CORNER_W = new Image(),
		ASSET_DOOR_CLOSED = new Image(),
		ASSET_DOOR_OPEN = new Image(),
		ASSET_EXIT_E = new Image(),
		ASSET_EXIT_W = new Image(),
		ASSET_FLOOR_1 = new Image(),
		ASSET_FLOOR_2 = new Image(),
		ASSET_LIGHT_E = new Image(),
		ASSET_LIGHT_N = new Image(),
		ASSET_LIGHT_S = new Image(),
		ASSET_LIGHT_W = new Image(),
		ASSET_SHADOW_E = new Image(),
		ASSET_SHADOW_N = new Image(),
		ASSET_SHADOW_W = new Image(),
		ASSET_WALL_1 = new Image(),
		ASSET_WALL_2 = new Image(),
		ASSET_WALL_CORNER_E = new Image(),
		ASSET_WALL_CORNER_W = new Image(),
		ASSET_WALL_E = new Image(),
		ASSET_WALL_S = new Image(),
		ASSET_WALL_W = new Image(),
		CANVAS_DG = document.createElement( "canvas" ),
		CANVAS_ROOM = document.createElement( "canvas" ),
		SIZE_DG_TILE = 16,
		OFFSET_DG_X = 1 * SIZE_DG_TILE,
		OFFSET_DG_Y = 5 * SIZE_DG_TILE,
		TWIDTH_VIEWPORT = 32,
		WIDTH_VIEWPORT = SIZE_DG_TILE * TWIDTH_VIEWPORT,
		HEIGHT_VIEWPORT = ( window.screen.height * ( WIDTH_VIEWPORT / window.screen.width ) ) | 0;

	var assets = [ ASSET_CORNER_E, ASSET_CORNER_W, ASSET_DOOR_CLOSED, ASSET_DOOR_OPEN, ASSET_EXIT_E, ASSET_EXIT_W, ASSET_FLOOR_1, ASSET_FLOOR_2, ASSET_LIGHT_E, ASSET_LIGHT_N, ASSET_LIGHT_S, ASSET_LIGHT_W, ASSET_SHADOW_E, ASSET_SHADOW_N, ASSET_SHADOW_W, ASSET_WALL_1, ASSET_WALL_2, ASSET_WALL_CORNER_E, ASSET_WALL_CORNER_W, ASSET_WALL_E, ASSET_WALL_S, ASSET_WALL_W ];

	ASSET_CORNER_E.src = "assets/corner_e.png";
	ASSET_CORNER_W.src = "assets/corner_w.png";
	ASSET_DOOR_CLOSED.src = "assets/door_closed.png";
	ASSET_DOOR_OPEN.src = "assets/door_open.png";
	ASSET_EXIT_E.src = "assets/exit_e.png";
	ASSET_EXIT_W.src = "assets/exit_w.png";
	ASSET_FLOOR_1.src = "assets/floor_1.png";
	ASSET_FLOOR_2.src = "assets/floor_2.png";
	ASSET_LIGHT_E.src = "assets/light_e.png";
	ASSET_LIGHT_N.src = "assets/light_n.png";
	ASSET_LIGHT_S.src = "assets/light_s.png";
	ASSET_LIGHT_W.src = "assets/light_w.png";
	ASSET_SHADOW_E.src = "assets/shadow_e.png";
	ASSET_SHADOW_N.src = "assets/shadow_n.png";
	ASSET_SHADOW_W.src = "assets/shadow_w.png";
	ASSET_WALL_1.src = "assets/wall_1.png";
	ASSET_WALL_2.src = "assets/wall_2.png";
	ASSET_WALL_CORNER_E.src = "assets/wall_corner_e.png";
	ASSET_WALL_CORNER_W.src = "assets/wall_corner_w.png";
	ASSET_WALL_E.src = "assets/wall_e.png";
	ASSET_WALL_S.src = "assets/wall_s.png";
	ASSET_WALL_W.src = "assets/wall_w.png";

	var game_started = false,
		ctx_dg,
		ctx_game,
		ctx_room,
		canvas_game,
		loop = null,
		width_dg,
		height_dg,
		view_x,
		view_y,
		x,
		y,
		i,
		j;

	function init_canvas_dg( width, height ) {
		CANVAS_DG.width = width;
		CANVAS_DG.height = height;
		ctx_dg = CANVAS_DG.getContext( "2d" );
		ctx_dg.fillStyle = "#000000";
		ctx_dg.fillRect( 0, 0, width, height );

		width_dg = width;
		height_dg = height;

		CANVAS_ROOM.width = width;
		CANVAS_ROOM.height = height;
		ctx_room = CANVAS_ROOM.getContext( "2d" );
	}

	function init_canvas_game( game ) {
		canvas_game = game;
		canvas_game.width = WIDTH_VIEWPORT;
		canvas_game.height = HEIGHT_VIEWPORT;
		ctx_game = canvas_game.getContext( "2d" );
	}

	function set_render_room( room ) {
		ctx_room.drawImage( CANVAS_DG, 0, 0 );
		ctx_room.fillStyle = "#000000";
		ctx_room.fillRect( 0, 0, width_dg, OFFSET_DG_Y + room.y1 * SIZE_DG_TILE );
		ctx_room.fillRect( 0, 0, OFFSET_DG_X + room.x1 * SIZE_DG_TILE, height_dg );
		ctx_room.fillRect( 0, OFFSET_DG_Y + ( room.y2 + 1 ) * SIZE_DG_TILE, width_dg, height_dg - ( ( room.y2 + 1 ) * SIZE_DG_TILE ) );
		ctx_room.fillRect( OFFSET_DG_X + ( room.x2 + 1 ) * SIZE_DG_TILE, 0, width_dg - ( ( room.x2 + 1 ) * SIZE_DG_TILE ), height_dg );
		for( y = room.y1 - 4; y <= room.y2; ++y ) {
			if( y == room.y1 - 4 ) {
				for( x = room.x1; x <= room.x2; ++x ) {
					ctx_room.drawImage( ASSET_WALL_1, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
				}
			} else if( y == room.y2 ) {
				for( x = room.x1; x <= room.x2; ++x ) {
					ctx_room.drawImage( ASSET_WALL_S, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + ( y + 1 ) * SIZE_DG_TILE );
				}
				ctx_room.drawImage( ASSET_CORNER_W, OFFSET_DG_X + ( room.x1 - 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + ( y + 1 ) * SIZE_DG_TILE );
				ctx_room.drawImage( ASSET_CORNER_E, OFFSET_DG_X + ( room.x2 + 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + ( y + 1 ) * SIZE_DG_TILE );
			}
			ctx_room.drawImage( ASSET_WALL_W, OFFSET_DG_X + ( room.x1 - 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
			ctx_room.drawImage( ASSET_WALL_E, OFFSET_DG_X + ( room.x2 + 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
		}
	}

	function set_render_cooridor( cooridor	) {
		ctx_room.drawImage( CANVAS_DG, 0, 0 );
	}

	function get_canvas_dg() {
		return CANVAS_ROOM;
	}

	function render_dg_rooms( rooms ) {
		var room, door, asset;
		for( i = 0; i < rooms.length; ++i ) {
			room = rooms[ i ];
			for( y = room.y1; y <= room.y2; ++y ) {
				for( x = room.x1; x <= room.x2; ++x ) {
					ctx_dg.globalCompositeOperation = "source-over";
					ctx_dg.drawImage( ( ( ( Math.random() * 20 ) | 0 ) == 0 ) ? ASSET_FLOOR_1 : ASSET_FLOOR_2, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
					if( x == room.x1 ) {
						ctx_dg.drawImage( ASSET_WALL_W, OFFSET_DG_X + ( x - 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
						ctx_dg.globalCompositeOperation = "multiply";
						ctx_dg.drawImage( ASSET_SHADOW_W, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
					} else if( x == room.x2 ) {
						ctx_dg.drawImage( ASSET_WALL_E, OFFSET_DG_X + ( x + 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
						ctx_dg.globalCompositeOperation = "multiply";
						ctx_dg.drawImage( ASSET_SHADOW_E, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
					}
					if( y == room.y1 ) {
						ctx_dg.globalCompositeOperation = "multiply";
						ctx_dg.drawImage( ASSET_SHADOW_N, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
					} else if( y == room.y2 ) {
						ctx_dg.globalCompositeOperation = "source-over";
						if( x == room.x1 ) {
							ctx_dg.drawImage( ASSET_CORNER_W, OFFSET_DG_X + ( x - 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + ( y + 1 ) * SIZE_DG_TILE );
						} else if( x == room.x2 ) {
							ctx_dg.drawImage( ASSET_CORNER_E, OFFSET_DG_X + ( x + 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + ( y + 1 ) * SIZE_DG_TILE );
						}
						ctx_dg.drawImage( ASSET_WALL_S, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + ( y + 1 ) * SIZE_DG_TILE );
					}
				}
			}
			ctx_dg.globalCompositeOperation = "source-over";
			for( j = 0; j < room.doors.length; ++j ) {
				door = room.doors[ j ];
				switch( door.direction ) {
					case 'n':
						y = room.y1;
						x = door.offset;
						asset = ASSET_LIGHT_N;
						break;
					case 's':
						y = room.y2;
						x = door.offset;
						asset = ASSET_LIGHT_S;
						break;
					case 'w':
						x = room.x1;
						y = door.offset;
						asset = ASSET_LIGHT_W;
						break;
					case 'e':
						x = room.x2;
						y = door.offset;
						asset = ASSET_LIGHT_E;
						break;
				}
				ctx_dg.drawImage( asset, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
			}
		}
	}

	function render_dg_cooridors( cooridors ) {
		var cooridor;
		for( i = 0; i < cooridors.length; ++i ) {
			cooridor = cooridors[ i ];
			for( y = cooridor.y1; y <= cooridor.y2; ++y ) {
				for( x = cooridor.x1; x <= cooridor.x2; ++x ) {
					ctx_dg.globalCompositeOperation = "source-over";
					ctx_dg.drawImage( ( ( ( Math.random() * 20 ) | 0 ) == 0 ) ? ASSET_FLOOR_1 : ASSET_FLOOR_2, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
					if( x == cooridor.x1 ) {
						if( cooridor.vertical ) ctx_dg.drawImage( ASSET_WALL_W, OFFSET_DG_X + ( x - 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
						ctx_dg.globalCompositeOperation = "multiply";
						ctx_dg.drawImage( ASSET_SHADOW_W, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
					} else if( x == cooridor.x2 ) {
						if( cooridor.vertical ) ctx_dg.drawImage( ASSET_WALL_E, OFFSET_DG_X + ( x + 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
						ctx_dg.globalCompositeOperation = "multiply";
						ctx_dg.drawImage( ASSET_SHADOW_E, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
					}
					if( y == cooridor.y1 ) {
						ctx_dg.globalCompositeOperation = "multiply";
						ctx_dg.drawImage( ASSET_SHADOW_N, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
					} else if( y == cooridor.y2 ) {
						ctx_dg.globalCompositeOperation = "source-over";
						if( !cooridor.vertical ) ctx_dg.drawImage( ASSET_WALL_S, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + ( y + 1 ) * SIZE_DG_TILE );
					}
				}
			}
		}
		ctx_dg.globalCompositeOperation = "source-over";
		if( cooridor.vertical ) {
			ctx_dg.drawImage( ASSET_LIGHT_N, OFFSET_DG_X + ( cooridor.x1 + 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + cooridor.y1 * SIZE_DG_TILE );
			ctx_dg.drawImage( ASSET_LIGHT_S, OFFSET_DG_X + ( cooridor.x1 + 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + cooridor.y2 * SIZE_DG_TILE );
		} else {
			ctx_dg.drawImage( ASSET_LIGHT_W, OFFSET_DG_X + cooridor.x1 * SIZE_DG_TILE, OFFSET_DG_Y + ( cooridor.y1 + 1 ) * SIZE_DG_TILE );
			ctx_dg.drawImage( ASSET_LIGHT_E, OFFSET_DG_X + cooridor.x2 * SIZE_DG_TILE, OFFSET_DG_Y + ( cooridor.y1 + 1 ) * SIZE_DG_TILE );
		}
	}

	var time_last_ping = -1;

	function set_loop( f ) {
		loop = f;
	}

	function render_loop( time ) {
		if( time_last_ping == -1 ) time_last_ping = time;
		if( time - time_last_ping > DELAY_PING ) {
			time_last_ping = time;
			window.send( "ping" );
		}
		if( loop != null ) {
			loop();
		}
		window.requestAnimationFrame( render_loop );
	}

	window.requestAnimationFrame( render_loop );

	window.set_loop = set_loop;
	window.init_canvas_dg = init_canvas_dg;
	window.init_canvas_game = init_canvas_game;
	window.get_canvas_dg = get_canvas_dg;
	window.render_dg_rooms = render_dg_rooms;
	window.render_dg_cooridors = render_dg_cooridors;
	window.set_render_room = set_render_room;
	window.set_render_cooridor = set_render_cooridor;
}

init_renderer();