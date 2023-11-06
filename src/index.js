const express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require('cors')
const methodOverride = require('method-override')

const postRouter = require('../routes/post')
const Post = require('../models/post')

app.set('view engine', 'ejs')


// Middleware
app.use(express.json());
app.use('/public', express.static('./public'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/', postRouter)
app.use(cors());

app.get('/', async(req, res)=>{
    const posts = await Post.find().sort({createAt: "desc"})
    res.render("index", {posts: posts})
})

// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log("Conectado a Base de Datos MongoDB"))
    .catch((err)=> console.log(err))



//Listen

app.listen(port, ()=>console.log(`Prueba de servidor escuchando en puerto ${port}`))