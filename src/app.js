const express=require('express');
const cookieParser=require('cookie-parser');
const dns=require('dns');
const authRoute=require('./routes/auth.route.js');
const musicRoute=require('./routes/music.route.js');

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

const app=express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoute);
app.use('/api/music',musicRoute);


module.exports=app;