#include "server.h"

using namespace std;

us_listen_socket_t* listener;

BMWRoom** rooms = ( BMWRoom** ) malloc( sizeof( BMWRoom* ) * ROOM_COUNT );

void init_rooms() {
	for( int i = 0; i < ROOM_COUNT; ++i ) {
		*( rooms + i ) = 0;
	}
}

BMWRoom* get_room( BMWRoom** room, string name, bool host ) {
	BMWRoom* n;
	if( host ) {
	        n = new BMWRoom;
		if( !n ) return 0;
		n->name = name;
		n->clients = ( void** ) malloc( sizeof( BMWClient* ) * MAX_PLAYERS );
		if( !n->clients ) return 0;
		for( int i = 0; i < MAX_PLAYERS; ++i ) {
			*( n->clients + i ) = 0;
		}
		n->host = 0;
		n->next = 0;
		n->players = 0;
		if( !n || !( n->clients ) ) return 0;
	} else {
		n = 0;	
	}
	if( ( *room ) ) {
		BMWRoom* p = *room;
		if( p->name == name ) {
			if( n ) {
				free( n->clients );
				n->clients = 0;
				free( n );
			}
			return p;
		}
		while( p->next ) {
			cout << p->name << endl;
			p = p->next;
			if( p->name == name ) {
				if( n ) {
					free( n->clients );
					n->clients = 0;
					free( n );
				}
				return p;
			}
		}
		return p->next = n;
	} else {
		return *room = n;
	}
}

void join_room( BMWRoom* room, BMWClient* client ) {
	void* c;
	for( int i = 0; i < MAX_PLAYERS; ++i ) {
		c = *( room->clients + i );
		if( c ) {
		} else {
			*( room->clients + i ) = client;
			break;
		}
	}
	++( room->players );
}

int hash_room( string name ) {
	int sum = 0;
	for( int i = 0; i < name.size(); i++ ) {
		sum += name[ i ];
	}
	cout << ( sum % ROOM_COUNT ) << " " << name << endl;
	return sum % ROOM_COUNT;
}

void send( uWS::WebSocket<false, true>* ws, string msg ) {
	ws->send( msg, uWS::OpCode::TEXT );
}

void broadcast( uWS::WebSocket<false, true>* ws, string msg ) {
	BMWClient* client = ( BMWClient* ) ( ws->getUserData() );
	BMWClient* c;
	BMWRoom* room = client->room;
	for( int i = 0; i < MAX_PLAYERS; ++i ) {
		c = ( BMWClient* ) *( room->clients + i );
		if( c != client ) {
			send( c->ws, msg );
		}
	}
}

void on_message( uWS::WebSocket<false, true>* ws, string_view msg, uWS::OpCode oc ) {
	BMWClient* client = ( BMWClient* ) ( ws->getUserData() );
	if( client->room ) {
		if( msg == "ping" ) {
			send( ws, "pong" );
		} else {
			broadcast( ws, string( msg ) );
		}
	} else {
		if( msg == "host" ) {
			client->host = true;
		} else if( msg == "ping" ) {
			send( ws, "pong" );
		} else {
			string name( msg );
			BMWRoom* room = get_room( rooms + hash_room( name ), name, client->host );
			if( room ) {
				client->room = room;
				if( client->host ) {
					if( room->host ) {
						send( ws, "3|Room already exists." );
					} else {
						send( ws, "0|Successfully created room!" );
						room->host = client;
					}
				} else {
					if( room->players < MAX_PLAYERS ) {
						send( ws, "0|Successfully joined room!" );
						join_room( room, client );
					} else {
						send( ws, "3|Room is already full." );
					}
				}
			} else {
				if( client->host ) {
					send( ws, "2|Cannot create room." );
				} else {
					send( ws, "1|Room does not exist." );
				}
			}
		}
	}
}

int main() {
	init_rooms();
	uWS::App().ws<BMWClient>( "/*", {
		.compression = uWS::SHARED_COMPRESSOR,
		.maxPayloadLength = 16 * 1024 * 1024,
		.idleTimeout = 10,
		.maxBackpressure = 1 * 1024 * 1024,
		.open = []( auto* ws ) {
			BMWClient* client = ( BMWClient* ) ( ws->getUserData() );
			client->host = false;
			client->room = 0;
			client->ws = ws;
		},
		.message = []( auto* ws, string_view msg, uWS::OpCode oc ) {
			on_message( ws, msg, oc );
		},
		.drain = []( auto* ws ) {
		},
		.ping = []( auto* ws ) {
		},
		.pong = []( auto *ws ) {
		},
		.close = []( auto* ws, int code, string_view message ) {
		}
	} ).listen( 25565, []( auto* token ) {
		listener = token;
		if( token ) {
			cout << "Listening on port " << 25565 << endl;
		}
	} ).run();
	free( rooms );
	return 0;
}
