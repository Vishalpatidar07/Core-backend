const app=require('./src/app.js');
require('dotenv').config();
const connectDB=require('./src/db/db.connect.js');

const PORT=process.env.PORT||5000;
connectDB();

app.listen(PORT,()=>{
    console.log(`server runing on port ${PORT}`);
})

