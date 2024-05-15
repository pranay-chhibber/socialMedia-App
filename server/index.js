import express from 'express'
import bodyParser from 'body-parser'
import  mongoose  from 'mongoose'
import cors from 'cors'
import postRouter from './routes/posts.js'

const app = express()


app.use(bodyParser.json({limit: "30mb" , extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}));
app.use(cors());

app.use('/posts', postRouter)

const  CONNECTION_URL ="mongodb+srv://pranaychhibber:kanu123@cluster0.gr0grsa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const PORT = process.env.PORT || 5000;

//@mongodb cloud atlas
mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`)) )
.catch((error)=> console.log(error.message) )

