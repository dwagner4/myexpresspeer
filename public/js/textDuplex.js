"use strict";
// https://medium.com/@rsylvian/webrtc-peer-to-peer-data-video-and-audio-calls-with-peer-js-24f79a09f67d


// Define peer connections, streams and video elements.
let peer1 = null;
let peer1id = null;
let remoteID = null;
let conn = null;
let stunIP = null;


function doStart () {
	// peer1 = new Peer();
	stunIP = document.getElementById('stunip').value || "/";
	peer1 = new Peer({host: stunIP, port: 9000, path: "peerjs", debug: 3});
	peer1.on('open', function(id) {
	  peer1id = id;
	  console.log('I\'m peer1id and my id is: ' + peer1id);
		document.getElementById('localid').innerHTML = peer1id;
	});
	peer1.on('connection', function(connc) {

		conn = connc;
		conn.on('open', function() {
			console.log("connection is open after recving offer");
	  // Receive messages
		  conn.on('data', function(data) {
		    console.log('Received', data);
				makeMessage("Remote", data);
		  });
		});
	});
	peer1.on('error', function (error) {
		console.log(error);
	});
};

// call peer2
function doConnect () {
	let peer2id = document.getElementById('remoteid').value;
	conn = peer1.connect(peer2id);
	conn.on('open', () => {
		console.log("connection is open from this peer")
	  // Receive messages
	  conn.on('data', function(data) {
	    console.log('Received', data);
			makeMessage("Remote", data);
	  });
		conn.send('Hello!');
		makeMessage("Local", "Hello!")
	});
}

function doSend () {
	var newtext = document.getElementById('textinput').value;
	conn.send(newtext);
	makeMessage("Local", newtext);
}

function makeMessage (peer, msgtext) {
	var newP = document.createElement("p");
	newP.innerHTML = peer + ":  " + msgtext;
	document.getElementById('conversation').append(newP);
}
