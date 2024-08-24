const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()
const dataRoutes=require('./routes/data')

const app=express();
app.use(express.json())
app.use(cors())
app.use('/api/data',dataRoutes)

const PORT=process.env.PORT || 5000
const MONGO_URI=process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err))

app.listen(PORT,() =>{
    console.log('Server running')
})