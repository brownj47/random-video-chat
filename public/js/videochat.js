const videoDisplay = document.getElementById("video-grid");
const socket = io("");
const form = document.getElementById("form");
const cardBody = document.getElementById("card-body");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
//here we are grabbing the users name that was attached to the element via handle bars
const userName = messages.getAttribute('data-name')

//when user clicks send then it grabs the value of input and emits it
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    //Sending the message AND the name of the User to the server
    socket.emit("chat message", ({msg:input.value, name:userName}));
    input.value = "";
  }
});

socket.on("chat message", function (msg) {
  //creates document that will hold user message
  const item = document.createElement("li");
  //setting text content to the name and msg using object key pairs
  item.textContent =(`${msg.name}: ${msg.msg}`);
  messages.appendChild(item);
  cardBody.scrollTop = cardBody.scrollHeight
});

//creates new peer object giving current host and setting id to undefined.
// const myPeer = new Peer(undefined, {
//     secure: true,
//     host: 'testrandomvideog10.herokuapp.com',
//     port: '3001'
// })
const myPeer = new Peer(undefined, {
  secure: true,
  host: "0.peerjs.com",
  port: "443",
});

//creating video element and muting audio
const myVideo = document.createElement("video");
myVideo.muted = true;
const peers = {};
//collecting the users video and audio and then passing it to the addstream function
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addStream(myVideo, stream);
    myPeer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addStream(video, userVideoStream);
        windows.reload();
      });
    });

    socket.on("user-connected", (userId) => {
      setTimeout(() => {
        connectToNewUser(userId, stream);
      }, 2000);
    });
  });

socket.on("user-disconnected", (userId) => {
  if (peers[userId]) peers[userId].close();
});

//TODO:
// As soon as we connect to the server and get back the id, we going to run this code and pass
// '/videochat' set to 'videochat/:${roomID}'
myPeer.on("open", (id) => {
  socket.emit("join-room", "/videochat", `${id}`);
});

//takes the video element we created AND the stream object we get from the getUserMediaFunction
const addStream = (video, stream) => {
  //setting video element to the stream we created
  video.srcObject = stream;
  //event listener to start video when a stream is added to it
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  //appends video to html
  videoDisplay.append(video);
};

//connects the new user into this call
const connectToNewUser = (userId, stream) => {
  const call = myPeer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addStream(video, userVideoStream);
  });
  // close video when user leaves the call
  call.on("close", () => {
    video.remove();
  });
  peers[userId] = call;
};



//logout function
async function logout(){
  const response = await fetch('/logout', {
    method: 'POST'
  });

  if (response.ok) {
    // If successful, redirect the browser to the profile page
    document.location.replace('/'); 
  } else {
    alert(response.statusText);
  };

};

//event listener
document.getElementById('logout-btn').addEventListener("click", logout);