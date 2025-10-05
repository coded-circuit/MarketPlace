const express = require('express');
const {connectDB} = require('./connection');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const wishlistRouter = require('./routes/wishlist');
const cors = require('cors');
const app = express();
const PORT = 8010;
const LINK = 'mongodb://localhost:27017/miniOLX';
const CLIENT_ORIGIN = 'http://localhost:3000';

//connection to db
connectDB(LINK)
.then(()=>{
    console.log('Connected to DB');
})
.catch((err)=>{
    console.log('Error connecting to DB',err);
});

//Parse JSON and form bodies through Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//CORS Operation- always before routes
const corsOperation ={
    origin: CLIENT_ORIGIN,
    methods: ['GET','POST' ,'PATCH','DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], //Access-control-allowed-origin
}
app.use(cors(corsOperation));
//handling preflight requests
app.use((req,res,next)=>{
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Origin', CLIENT_ORIGIN);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.status(204).send(); 
    }
    next();
})

//Routes
app.use('/user',userRouter);
app.use('/product', productRouter);
app.use('/wishlist', wishlistRouter);

app.listen(PORT,()=>{
    console.log('Server is running on port :',PORT);
})