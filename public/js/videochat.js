const socket = io('')


//getting a users id from the session object to pass in below
const id = 'gabe'

socket.emit('join-room', '/videochat', `${id}`)

socket.on('user-connected', userId => {
    console.log('User connected' + userId)
})