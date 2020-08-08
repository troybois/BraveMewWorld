#include "server.h"

using namespace std;

us_listen_socket_t* listener;

int main() {
	uWS::App().ws<BMWClient>( "/*", {
		.compression = uWS::SHARED_COMPRESSOR,
		.maxPayloadLength = 16 * 1024 * 1024,
		.idleTimeout = 10,
		.maxBackpressure = 1 * 1024 * 1024,
		.open = []( auto* ws ) {
		
		},
		.message = []( auto* ws, string_view msg, uWS::OpCode oc ) {
		
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
	return 0;
}
