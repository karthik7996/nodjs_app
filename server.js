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
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const messageModel = require("./models/messageModel");
const searchRoutes = require("./routes/search");
io.on("connection", function (socket) {
  console.log(socket.id, " connected!");

  socket.on("sent-message", async (data) => {
    console.log(data.message, data.senderId, data.sentTo);

    let mesmodel = await messageModel.findOne({
      userA: data.senderId,
      userB: data.sentTo,
    });
    if (!mesmodel) {
      mesmodel = await messageModel.findOne({
        userA: data.sentTo,
        userB: data.senderId,
      });
    }

    mesmodel.messages.push({
      userIdSent: data.senderId,
      message: data.message,
    });
    await mesmodel.save();
    mesmodel.populate({ path: "messages", populate: { path: "userIdSent" } });
    console.log(mesmodel);
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
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});



const port  = process.env.PORT || 5000;
httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
