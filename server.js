require("dotenv").config();
const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
const cors = require('cors'); 
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const profileRoutes = require('./routes/profile');
const bidRoutes = require('./routes/bid');
const chatRoutes = require("./routes/chatRoutes");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");

const searchRoutes = require("./routes/search");
io.on("connection", function (socket) {

  socket.on("setup", (userId) => {
    socket.join(userId);
  });
  socket.on("join chat", (room) => {
    socket.join(room);
  });
  socket.on("new message", (newMessage) => {
    var chat = newMessage.chatId;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user === newMessage.sender._id) return;
      socket.in(user).emit("message received", newMessage);
    });
  });
 

  socket.on("disconnect", function () {
    console.log(socket.id, " disconnected!");
  });
});
app.use(
  cors({
      credentials: true,
      origin: "http://localhost:3000",
  })
);
//new code
cloudinary.config({
  cloud_name: "dz7rszpfi",
  api_key: "337929436899277",
  api_secret: "Us__uRp1mGUf9QynZVmUdBKjrwY",
  secure: true,
});
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));


app.use(
  express.urlencoded({ extended: true })
);

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
// app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/bid', bidRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/search', searchRoutes)
app.use("/api/chat", chatRoutes);
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});



const port  = process.env.PORT || 5000;
httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
