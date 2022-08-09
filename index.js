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
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
//initialize new instance of socket by passing in express http server
const io = socketio(server);



// });
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId, userName);

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId);
    });
    socket.on("chat message", async(msg) => {
      console.log("message: " + msg);
      io.to(roomId).emit("chat message", (msg));
    });
  });
  //when the server receives a chat message event it emits the msg object to everyone
});

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sess = {
  // secret: process.env.SESSION_SECRET,
  secret: "secret",
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

sequelize.sync({ force: true }).then(function () {
  server.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
