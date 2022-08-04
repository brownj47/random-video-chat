const socket = io('')


//eventually the id will be passed in from the session object
const id = 'gabe'

socket.emit('join-room', '/videochat', `${id}`)

socket.on('user-connected', userId => {
    console.log('User connected' + userId)
})