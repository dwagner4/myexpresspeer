"use strict";
// https://medium.com/@rsylvian/webrtc-peer-to-peer-data-video-and-audio-calls-with-peer-js-24f79a09f67d


// Define peer connections, streams and video elements.
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
let localStream = null;
let remoteStream = null;
let peer1 = null;
let peer1id = null;
let remoteID = null;
let callback = null;
let stunIP = null;


function doStart () {
	navigator.getUserMedia({audio: false, video: true}, function(stream){
		localStream = stream;
	  localVideo.srcObject = localStream;
	}, function(){
		alert("Error! Make sure to click allow when asked for permission by the browser");
	});
	// peer1 = new Peer();
	stunIP = document.getElementById('stunip').value || "/";
	peer1 = new Peer({host: stunIP, port: 9000, path: "peerjs", debug: 3});
	peer1.on('open', function(id) {
	  peer1id = id;
	  console.log('I\'m peer1id and my id is: ' + peer1id);
		document.getElementById('localid').innerHTML = peer1id;
	});
	// answer call from peer1
	peer1.on('call', function(call) {
		console.log("just awnsered call")
	  call.answer(localStream);
		call.on('stream',function(stream){
			console.log("got the stream");
			remoteStream = stream;
			remoteVideo.srcObject = remoteStream;
		});
	});
	peer1.on('error', function (error) {
		console.log(error);
	});
}

// call peer2
function doCall () {
	let peer2id = document.getElementById('remoteid').value;
	callback = peer1.call(peer2id, localStream);
	console.log("call to remote " + peer2id);
	callback.on('stream',function(stream){
		console.log("got the stream");
		remoteStream = stream;
		remoteVideo.srcObject = remoteStream;
	});
}
