#ifndef BMW_H
#define BMW_H

#include <iostream>
#include <string>
#include <cstdlib>

#include "App.h"

#define ROOM_COUNT 512
#define MAX_PLAYERS 5

struct BMWRoom {
	BMWRoom* next;
	void** clients;
	void* host;
	int players;
	std::string name;
};

struct BMWClient {
	BMWRoom* room;
	bool host;
	uWS::WebSocket<false, true>* ws;
};

#endif
