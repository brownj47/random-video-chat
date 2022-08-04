const socket = io('')

//creating video element and muting audio
const video = document.createElement('video')
video.muted = true



//creates new peer object giving current host and setting id to undefined.
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})

// As soon as we connect to the server and get back the id, we going to run this code and pass
myPeer.on('open', id => {
    socket.emit('join-room', '/videochat', `${id}`)
})


//eventually the id will be passed in from the session object



// have a console of userconnected
socket.on('user-connected', userId => {
    console.log('User connected ' + userId)
})