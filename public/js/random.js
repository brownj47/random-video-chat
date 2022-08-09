const videoDisplay = document.getElementById("video-grid");
const socket = io("");
const form = document.getElementById("form");
const cardBody = document.getElementById("card-body");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const randomRoom = document.getElementById('random-room')
//here we are grabbing the users name that was attached to the element via handle bars
const userName = messages.getAttribute('data-name')


//when user clicks send then it grabs the value of input and emits it
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    //Sending the message AND the name of the User to the server
    socket.emit("chat message", ({ msg: input.value, name: userName }));
    input.value = "";
  }
});

socket.on("chat message", function (msg) {
  //sets new date object
  const date = new Date();
  const pm = date.getHours() >= 12;
  let hour12 = date.getHours() % 12;
  if (!hour12)
    hour12 += 12;
  //if minute is less than 10 it will add 0 in front, other wise it looks weird ex. 2:1 pm now looks like 2:01pm
  const minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  //creates document that will hold user message
  const item = document.createElement("li");
  //setting text content to the name and msg using object key pairs
  item.textContent = (`${msg.name} ${hour12}:${minute} ${pm ? 'pm' : 'am'}: ${msg.msg}`);
  messages.appendChild(item);
  cardBody.scrollTop = cardBody.scrollHeight
});


const myPeer = new Peer(undefined, {
  secure: true,
  host: "0.peerjs.com",
  port: "443",
});

//creating video element and muting audio
const myVideo = document.createElement("video");
const videoName = document.createElement('h1')
videoName.textContent = userName
myVideo.muted = true;
const peers = {};
//collecting the users video and audio and then passing it to the addstream function
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    // current user add stream
    addStream(myVideo, stream);
    myPeer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      // when a new user joins, add stream and reload()
      call.on("stream", (userVideoStream) => {
        addStream(video, userVideoStream);
        window.reload();
        // console.log("hello")
      });
    });

    socket.on("user-connected", (userId, userName) => {
      setTimeout(() => {
        const item = document.createElement("li");
        item.textContent = (`${userName} has joined the chat room...`)
        messages.appendChild(item)
        connectToNewUser(userId, stream);
      }, 2000);
    });

    socket.on("user-disconnected", (userId) => {
      if (peers[userId]) peers[userId].close();
      location.reload()
    });

  });



myPeer.on("open", (id) => {
  let url = window.location.href
  const urlSplit = url.split('/')
  url = urlSplit[urlSplit.length - 1]
  socket.emit("join-room", `/random/chat/${url}`, `${id}`, `${userName}`);
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
async function logout() {
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

randomRoom.addEventListener('click', (e) => {
  e.preventDefault()
  fetch('/random')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      document.location.replace(`/random/chat/${data.id}`)
    });
})

//event listener
document.getElementById('logout-btn').addEventListener("click", logout);