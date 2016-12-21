'user strict';

const Hapi = require('hapi');

//this creates the server with a host and port
const server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000
});

//Adding a route
server.route({
	method: 'GET',
	path:'/test',
	handler: function(request, reply) {
		return reply('Hello World');
	}
});

server.register(require('inert'), (err) => {
	if (err) {
		throw err;
	}
	server.route({
		method: 'GET',
	 	path: '/hello',
		handler: function(request, reply) {
			reply.file('./public/hello.html');
		}
	});
});
		

//Starts the server
server.start((err) => {
	if (err) {
		throw err;
	}
	console.log('Server running at:', server.info.uri);
});