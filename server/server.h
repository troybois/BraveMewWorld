#ifndef BMW_H
#define BMW_H

#include <iostream>
#include <string>
#include <cstdlib>

#include "App.h"

#define ROOM_COUNT 512

struct BMWRoom {
	BMWRoom* next;
	void* clients;
	std::string name;
};

struct BMWClient {
	BMWRoom* room;
	bool host;
	bool active;
};

#endif
