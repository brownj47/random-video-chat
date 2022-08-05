const videoDisplay = document.getElementById('grid')
const socket = io('')

//creates new peer object giving current host and setting id to undefined.
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})

//creating video element and muting audio
const video = document.createElement('video')
video.muted = true
const peers = {}
//collecting the users video and audio and then passing it to the addstream function
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream=>{
    addStream(video, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createAttribute('video')
        call.on('stream', userVideoStream => {
            addStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        setTimeout(()=>{
            connectToNewUser(userId, stream)
        }, 1000)
    })
})

// As soon as we connect to the server and get back the id, we going to run this code and pass
myPeer.on('open', id => {
    socket.emit('join-room', '/videochat', `${id}`)
})




//eventually the id will be passed in from the session object



// // have a console of userconnected
// socket.on('user-connected', userId => {
//     console.log('User connected ' + userId)
// })

//takes the video element we created AND the stream object we get from the getUserMediaFunction
const addStream = (video, stream) => {
    //setting video element to the stream we created 
    video.srcObject = stream
    //event listener to start video when a stream is added to it
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    //appends video to html
    videoDisplay.append(video)
}

//connects the new user into this call
const connectToNewUser = (userId, stream) => {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addStream(video,userVideoStream)
    })
    // close video when user leaves the call
    call.on('close', () => {
        video.remove()
    })
}