require("dotenv").config();
const express = require('express');
const app = express();
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
  secure: true,
});
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));


app.use(
  express.urlencoded({ extended: true })
);

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/bid', bidRoutes);
app.use('/uploads', express.static('uploads'));

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});



const port  = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
