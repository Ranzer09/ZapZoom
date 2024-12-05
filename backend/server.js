const express = require('express')
const mongoose = require('mongoose')
const userRoutes= require('./routes/user')
const productRoutes= require('./routes/products')
const cors = require('cors');
const cartRoutes= require('./routes/cart')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:3000', 'https://zapzoom.onrender.com'];
app.use(cors({
    origin: allowedOrigins, // Restrict to allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
}));

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 
  })
  .catch((error)=>{
    console.log(error)
  })

app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use('/api/user/',userRoutes)
app.use('/api/products/',productRoutes)
app.use('/api/cart/',cartRoutes)
  