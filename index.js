//Express packages
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

//routes and sequelize
const allRoutes = require("./controllers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

//importing socket io requirements
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
//initiliaze new instance of socket by passing in express http server
const io = socketio(server)

//start listening so that on the front end whenever the connection event is triggered it will console log


// io.on('connection', (socket) => {

//   socket.on('join-room', (roomId, userId)=>{
//     // user join roomID
//     socket.join(roomId)
//     // send an emit to the roomId
//     socket.to(roomId).emit('user-connected', userId)
//   })

//   socket.on('disconnect', () => {
//     socket.to(roomId).emit('user-disconnected', userId)
//   });


// });
io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
    })
  })
})

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Static directory
app.use(express.static("public"));

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use("/", allRoutes);

sequelize.sync({ force: false }).then(function () {
  server.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
