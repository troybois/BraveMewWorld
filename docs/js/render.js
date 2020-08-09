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
		ASSET_B_N = new Image(),
		ASSET_B_NE = new Image(),
		ASSET_B_E = new Image(),
		ASSET_B_SE = new Image(),
		ASSET_B_S = new Image(),
		ASSET_B_SW = new Image(),
		ASSET_B_W = new Image(),
		ASSET_B_NW = new Image(),
		ASSET_B_IDLE_R = new Image(),
		ASSET_B_IDLE_L = new Image(),
		ASSET_B_MOVE_R = new Image(),
		ASSET_B_MOVE_L = new Image(),
		ASSET_G_N = new Image(),
		ASSET_G_NE = new Image(),
		ASSET_G_E = new Image(),
		ASSET_G_SE = new Image(),
		ASSET_G_S = new Image(),
		ASSET_G_SW = new Image(),
		ASSET_G_W = new Image(),
		ASSET_G_NW = new Image(),
		ASSET_G_IDLE_R = new Image(),
		ASSET_G_IDLE_L = new Image(),
		ASSET_G_MOVE_R = new Image(),
		ASSET_G_MOVE_L = new Image(),
		ASSET_P_N = new Image(),
		ASSET_P_NE = new Image(),
		ASSET_P_E = new Image(),
		ASSET_P_SE = new Image(),
		ASSET_P_S = new Image(),
		ASSET_P_SW = new Image(),
		ASSET_P_W = new Image(),
		ASSET_P_NW = new Image(),
		ASSET_P_IDLE_R = new Image(),
		ASSET_P_IDLE_L = new Image(),
		ASSET_P_MOVE_R = new Image(),
		ASSET_P_MOVE_L = new Image(),
		ASSET_R_N = new Image(),
		ASSET_R_NE = new Image(),
		ASSET_R_E = new Image(),
		ASSET_R_SE = new Image(),
		ASSET_R_S = new Image(),
		ASSET_R_SW = new Image(),
		ASSET_R_W = new Image(),
		ASSET_R_NW = new Image(),
		ASSET_R_IDLE_R = new Image(),
		ASSET_R_IDLE_L = new Image(),
		ASSET_R_MOVE_R = new Image(),
		ASSET_R_MOVE_L = new Image(),
		ASSET_Y_N = new Image(),
		ASSET_Y_NE = new Image(),
		ASSET_Y_E = new Image(),
		ASSET_Y_SE = new Image(),
		ASSET_Y_S = new Image(),
		ASSET_Y_SW = new Image(),
		ASSET_Y_W = new Image(),
		ASSET_Y_NW = new Image(),
		ASSET_Y_IDLE_R = new Image(),
		ASSET_Y_IDLE_L = new Image(),
		ASSET_Y_MOVE_R = new Image(),
		ASSET_Y_MOVE_L = new Image(),
		ASSET_DEERMONGER_L = new Image(),
		ASSET_DEERMONGER_R = new Image(),
		CANVAS_DG = document.createElement( "canvas" ),
		CANVAS_ROOM = document.createElement( "canvas" ),
		SIZE_DG_TILE = 16,
		OFFSET_DG_X = 1 * SIZE_DG_TILE,
		OFFSET_DG_Y = 5 * SIZE_DG_TILE,
		TWIDTH_VIEWPORT = 32,
		WIDTH_VIEWPORT = SIZE_DG_TILE * TWIDTH_VIEWPORT,
		HWIDTH_VIEWPORT = ( WIDTH_VIEWPORT >> 1 ) | 0;
		HEIGHT_VIEWPORT = ( window.screen.height * ( WIDTH_VIEWPORT / window.screen.width ) ) | 0,
		HHEIGHT_VIEWPORT = ( HEIGHT_VIEWPORT >> 1 ) | 0,
		TICKS_IDLE = 200;

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

	ASSET_B_N.src = "assets/fireball_n_b.png";
	ASSET_B_NE.src = "assets/fireball_ne_b.png";
	ASSET_B_E.src = "assets/fireball_e_b.png";
	ASSET_B_SE.src = "assets/fireball_se_b.png";
	ASSET_B_S.src = "assets/fireball_s_b.png";
	ASSET_B_SW.src = "assets/fireball_sw_b.png";
	ASSET_B_W.src = "assets/fireball_w_b.png";
	ASSET_B_NW.src = "assets/fireball_nw_b.png";
	ASSET_B_IDLE_R.src = "assets/pib_idle_b_right.png";
	ASSET_B_IDLE_L.src = "assets/pib_idle_b.png";
	ASSET_B_MOVE_R.src = "assets/pib_move_b_right.png";
	ASSET_B_MOVE_L.src = "assets/pib_move_b.png";

	ASSET_G_N.src = "assets/fireball_n_g.png";
	ASSET_G_NE.src = "assets/fireball_ne_g.png";
	ASSET_G_E.src = "assets/fireball_e_g.png";
	ASSET_G_SE.src = "assets/fireball_se_g.png";
	ASSET_G_S.src = "assets/fireball_s_g.png";
	ASSET_G_SW.src = "assets/fireball_sw_g.png";
	ASSET_G_W.src = "assets/fireball_w_g.png";
	ASSET_G_NW.src = "assets/fireball_nw_g.png";
	ASSET_G_IDLE_R.src = "assets/pib_idle_g_right.png";
	ASSET_G_IDLE_L.src = "assets/pib_idle_g.png";
	ASSET_G_MOVE_R.src = "assets/pib_move_g_right.png";
	ASSET_G_MOVE_L.src = "assets/pib_move_g.png";

	ASSET_P_N.src = "assets/fireball_n_p.png";
	ASSET_P_NE.src = "assets/fireball_ne_p.png";
	ASSET_P_E.src = "assets/fireball_e_p.png";
	ASSET_P_SE.src = "assets/fireball_se_p.png";
	ASSET_P_S.src = "assets/fireball_s_p.png";
	ASSET_P_SW.src = "assets/fireball_sw_p.png";
	ASSET_P_W.src = "assets/fireball_w_p.png";
	ASSET_P_NW.src = "assets/fireball_nw_p.png";
	ASSET_P_IDLE_R.src = "assets/pib_idle_p_right.png";
	ASSET_P_IDLE_L.src = "assets/pib_idle_p.png";
	ASSET_P_MOVE_R.src = "assets/pib_move_p_right.png";
	ASSET_P_MOVE_L.src = "assets/pib_move_p.png";

	ASSET_R_N.src = "assets/fireball_n_r.png";
	ASSET_R_NE.src = "assets/fireball_ne_r.png";
	ASSET_R_E.src = "assets/fireball_e_r.png";
	ASSET_R_SE.src = "assets/fireball_se_r.png";
	ASSET_R_S.src = "assets/fireball_s_r.png";
	ASSET_R_SW.src = "assets/fireball_sw_r.png";
	ASSET_R_W.src = "assets/fireball_w_r.png";
	ASSET_R_NW.src = "assets/fireball_nw_r.png";
	ASSET_R_IDLE_R.src = "assets/pib_idle_r_right.png";
	ASSET_R_IDLE_L.src = "assets/pib_idle_r.png";
	ASSET_R_MOVE_R.src = "assets/pib_move_r_right.png";
	ASSET_R_MOVE_L.src = "assets/pib_move_r.png";

	ASSET_Y_N.src = "assets/fireball_n_y.png";
	ASSET_Y_NE.src = "assets/fireball_ne_y.png";
	ASSET_Y_E.src = "assets/fireball_e_y.png";
	ASSET_Y_SE.src = "assets/fireball_se_y.png";
	ASSET_Y_S.src = "assets/fireball_s_y.png";
	ASSET_Y_SW.src = "assets/fireball_sw_y.png";
	ASSET_Y_W.src = "assets/fireball_w_y.png";
	ASSET_Y_NW.src = "assets/fireball_nw_y.png";
	ASSET_Y_IDLE_R.src = "assets/pib_idle_y_right.png";
	ASSET_Y_IDLE_L.src = "assets/pib_idle_y.png";
	ASSET_Y_MOVE_R.src = "assets/pib_move_y_right.png";
	ASSET_Y_MOVE_L.src = "assets/pib_move_y.png";

	ASSET_DEERMONGER_R.src = "assets/deermonger_right.png";
	ASSET_DEERMONGER_L.src = "assets/deermonger_left.png";

	var game_started = false,
		ctx_dg,
		ctx_game,
		ctx_room,
		canvas_game,
		canvas_b,
		canvas_g,
		canvas_p,
		canvas_r,
		canvas_y,
		ctx_b,
		ctx_g,
		ctx_p,
		ctx_r,
		ctx_y,
		bgpry_mode = false,
		running = -1,
		loop = null,
		width_dg,
		height_dg,
		view_x = 0,
		view_y = 0,
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

	function init_canvases( b, g, p, r, y ) {
		canvas_b = b;
		canvas_g = g;
		canvas_p = p;
		canvas_r = r;
		canvas_y = y;
		canvas_b.width = 32;
		canvas_b.height = 32;
		canvas_g.width = 32;
		canvas_g.height = 32;
		canvas_p.width = 32;
		canvas_p.height = 32;
		canvas_r.width = 32;
		canvas_r.height = 32;
		canvas_y.width = 32;
		canvas_y.height = 32;
		ctx_b = canvas_b.getContext( "2d" );
		ctx_g = canvas_g.getContext( "2d" );
		ctx_p = canvas_p.getContext( "2d" );
		ctx_r = canvas_r.getContext( "2d" );
		ctx_y = canvas_y.getContext( "2d" );
	}

	function set_bgpry( mode, sel ) {
		bgpry_mode = mode;
		running = sel;
	}

	function render_room_doors( room ) {
		var door;
		for( i = 0; i < room.doors.length; ++i ) {
			door = room.doors[ i ];
			if( door.direction == 'n' ) {
				ctx_room.drawImage( ASSET_DOOR_CLOSED, OFFSET_DG_X + door.offset * SIZE_DG_TILE, OFFSET_DG_Y + ( room.y1 - 2 ) * SIZE_DG_TILE );
			}
		}
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
		render_room_doors( room );
	}

	function set_render_cooridor( cooridor ) {
		ctx_room.drawImage( CANVAS_DG, 0, 0 );
		ctx_room.fillStyle = "#000000";
		ctx_room.fillRect( 0, 0, width_dg, OFFSET_DG_Y + cooridor.y1 * SIZE_DG_TILE );
		ctx_room.fillRect( 0, 0, OFFSET_DG_X + cooridor.x1 * SIZE_DG_TILE, height_dg );
		ctx_room.fillRect( 0, OFFSET_DG_Y + ( cooridor.y2 + 1 ) * SIZE_DG_TILE, width_dg, height_dg - ( ( cooridor.y2 + 1 ) * SIZE_DG_TILE ) );
		ctx_room.fillRect( OFFSET_DG_X + ( cooridor.x2 + 1 ) * SIZE_DG_TILE, 0, width_dg - ( ( cooridor.x2 + 1 ) * SIZE_DG_TILE ), height_dg );
		for( y = cooridor.y1 - 4; y <= cooridor.y2; ++y ) {
			if( y == cooridor.y1 - 4 ) {
				for( x = cooridor.x1; x <= cooridor.x2; ++x ) {
					ctx_room.drawImage( ASSET_WALL_1, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
				}
			} else if( y == cooridor.y2 ) {
				for( x = cooridor.x1; x <= cooridor.x2; ++x ) {
					ctx_room.drawImage( ASSET_WALL_S, OFFSET_DG_X + x * SIZE_DG_TILE, OFFSET_DG_Y + ( y + 1 ) * SIZE_DG_TILE );
				}
				ctx_room.drawImage( ASSET_CORNER_W, OFFSET_DG_X + ( cooridor.x1 - 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + ( y + 1 ) * SIZE_DG_TILE );
				ctx_room.drawImage( ASSET_CORNER_E, OFFSET_DG_X + ( cooridor.x2 + 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + ( y + 1 ) * SIZE_DG_TILE );
			}
			ctx_room.drawImage( ASSET_WALL_W, OFFSET_DG_X + ( cooridor.x1 - 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
			ctx_room.drawImage( ASSET_WALL_E, OFFSET_DG_X + ( cooridor.x2 + 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + y * SIZE_DG_TILE );
		}
		if( cooridor.vertical ) {
			ctx_room.drawImage( ASSET_DOOR_OPEN, OFFSET_DG_X + ( cooridor.x1 + 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + ( cooridor.y1 - 2 ) * SIZE_DG_TILE );
		}
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
			ctx_dg.globalCompositeOperation = "source-over";
			if( cooridor.vertical ) {
				ctx_dg.drawImage( ASSET_LIGHT_N, OFFSET_DG_X + ( cooridor.x1 + 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + cooridor.y1 * SIZE_DG_TILE );
				ctx_dg.drawImage( ASSET_LIGHT_S, OFFSET_DG_X + ( cooridor.x1 + 1 ) * SIZE_DG_TILE, OFFSET_DG_Y + cooridor.y2 * SIZE_DG_TILE );
			} else {
				ctx_dg.drawImage( ASSET_LIGHT_W, OFFSET_DG_X + cooridor.x1 * SIZE_DG_TILE, OFFSET_DG_Y + ( cooridor.y1 + 1 ) * SIZE_DG_TILE );
				ctx_dg.drawImage( ASSET_LIGHT_E, OFFSET_DG_X + cooridor.x2 * SIZE_DG_TILE, OFFSET_DG_Y + ( cooridor.y1 + 1 ) * SIZE_DG_TILE );
			}
		}
	}

	var time_last_ping = -1,
		time_last_b = -1,
		time_last_g = -1,
		time_last_p = -1,
		time_last_r = -1,
		time_last_y = -1,
		frame_b = 0,
		frame_g = 0,
		frame_p = 0,
		frame_r = 0,
		frame_y = 0;
	var view_update = false;

	function set_loop( f ) {
		loop = f;
	}

	function enable_view() {
		view_update	= true;
	}

	function render_loop( time ) {
		if( time_last_ping == -1 ) time_last_ping = time;
		if( time - time_last_ping > DELAY_PING ) {
			time_last_ping = time;
			window.send( "ping" );
		}
		if( loop != null ) {
			loop( time );
		}
		if( bgpry_mode ) {
			var bgpry_ticks;
			if( time_last_b == -1 ) time_last_b = time;
			if( time_last_g == -1 ) time_last_g = time;
			if( time_last_p == -1 ) time_last_p = time;
			if( time_last_r == -1 ) time_last_r = time;
			if( time_last_y == -1 ) time_last_y = time;
			if( time - time_last_b > TICKS_IDLE ) {
				ctx_b.clearRect( 0, 0, 32, 32 );
				frame_b = ( frame_b + 1 ) % 4;
				ctx_b.drawImage( ASSET_B_IDLE_R, frame_b * 32, 0, 32, 32, 0, 0, 32, 32 );
				time_last_b = time;
			}
			if( time - time_last_g > TICKS_IDLE ) {
				ctx_g.clearRect( 0, 0, 32, 32 );
				frame_g = ( frame_g + 1 ) % 4;
				ctx_g.drawImage( ASSET_G_IDLE_R, frame_g * 32, 0, 32, 32, 0, 0, 32, 32 );
				time_last_g = time;
			}
			if( time - time_last_p > TICKS_IDLE ) {
				ctx_p.clearRect( 0, 0, 32, 32 );
				frame_p = ( frame_p + 1 ) % 4;
				ctx_p.drawImage( ASSET_P_IDLE_R, frame_p * 32, 0, 32, 32, 0, 0, 32, 32 );
				time_last_p = time;
			}
			if( time - time_last_r > TICKS_IDLE ) {
				ctx_r.clearRect( 0, 0, 32, 32 );
				frame_r = ( frame_r + 1 ) % 4;
				ctx_r.drawImage( ASSET_R_IDLE_R, frame_r * 32, 0, 32, 32, 0, 0, 32, 32 );
				time_last_r = time;
			}
			if( time - time_last_y > TICKS_IDLE ) {
				ctx_y.clearRect( 0, 0, 32, 32 );
				frame_y = ( frame_y + 1 ) % 4;
				ctx_y.drawImage( ASSET_Y_IDLE_R, frame_y * 32, 0, 32, 32, 0, 0, 32, 32 );
				time_last_y = time;
			}
		}
		if( view_update ) {
			ctx_game.clearRect( 0, 0, WIDTH_VIEWPORT, HEIGHT_VIEWPORT );
			ctx_game.drawImage( CANVAS_ROOM, OFFSET_DG_X + view_x - HWIDTH_VIEWPORT, OFFSET_DG_Y + view_y - HHEIGHT_VIEWPORT, WIDTH_VIEWPORT, HEIGHT_VIEWPORT, 0, 0, WIDTH_VIEWPORT, HEIGHT_VIEWPORT );
		}
		window.requestAnimationFrame( render_loop );
	}

	function set_viewpoint( vx, vy ) {
		view_x = vx | 0;
		view_y = vy | 0;
	}

	window.requestAnimationFrame( render_loop );

	window.set_loop = set_loop;
	window.init_canvas_dg = init_canvas_dg;
	window.init_canvas_game = init_canvas_game;
	window.init_canvases = init_canvases;
	window.set_bgpry = set_bgpry;
	window.get_canvas_dg = get_canvas_dg;
	window.render_dg_rooms = render_dg_rooms;
	window.render_dg_cooridors = render_dg_cooridors;
	window.set_render_room = set_render_room;
	window.set_render_cooridor = set_render_cooridor;
	window.enable_view = enable_view;
	window.set_viewpoint = set_viewpoint;
}

init_renderer();