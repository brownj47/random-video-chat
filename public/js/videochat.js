const socket = io('')

const id = ''

const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})

myPeer.on('open', id => {

    socket.emit('join-room', '/videochat', `${id}`)
})


//eventually the id will be passed in from the session object



// have a console of userconnected
socket.on('user-connected', userId => {
    console.log('User connected ' + userId)
})