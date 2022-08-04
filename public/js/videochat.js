const socket = io('/')

socket.emit('join-room', '/videochat', 10)

socket.on('user-connected', userId => {
    console.log('User connected' + userId)
})