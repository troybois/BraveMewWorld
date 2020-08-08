#include "server.h"

using namespace std;

us_listen_socket_t* listener;

BMWRoom** rooms = ( BMWRoom** ) malloc( sizeof( BMWRoom* ) * ROOM_COUNT );

void init_rooms() {
	for( int i = 0; i < ROOM_COUNT; ++i ) {
		rooms[ i ] = 0;
	}
}

BMWRoom* get_room( BMWRoom** room, string name, bool host ) {
	BMWRoom* n;
	if( host ) {
	        n = ( BMWRoom* ) malloc( sizeof( BMWRoom ) );
		n->name = name;
		n->clients = malloc( sizeof( BMWRoom ) * 5 );
		n->next = 0;
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

}

void on_message( uWS::WebSocket<false, true>* ws, string_view msg, uWS::OpCode oc ) {
	BMWClient* client = ( BMWClient* ) ( ws->getUserData() );
	if( client->room ) {
	
	} else {
		if( msg == "host" ) {
			client->host = true;
		} else if( msg == "ping" ) {
			send( ws, "pong" );
		} else {
			if( client->room ) {
			} else {
				string name( msg );
				BMWRoom* room = get_room( rooms + hash_room( name ), name, client->host );
				if( room ) {
					client->room = room;
					if( client->host ) {
						send( ws, "0|Successfully created room!" );
					} else {
						send( ws, "0|Successfully joined room!" );
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
			client->active = true;
			client->host = false;
			client->room = 0;
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
