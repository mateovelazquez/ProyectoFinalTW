const express = require('express')
const Post = require('../models/post')
const router = express.Router();
// const cloudinary = require('../utils/cloudinary')
// const upload = require('../utils/multer')
const path = require('path')

router.get('/newPost', (req, res)=>{
    res.render("newPost", {post: new Post()})
})

// router.get('/edit/:id', async(req, res)=>{
//     const post = await Post.findById(req.params.id)
//     res.render('editPost', {post: post})
// })

// router.get('/:slug', (req, res)=>{
//     Post.findOne({slug: req.params.slug})
//     .then((post)=>{
//         if(post){
//             res.render("show", {post: post})
//         }else{
//             res.redirect('/')
//         }
//     })
// })

router.post('/newPost', async(req, res)=>{
    try{
        let posteo = new Post({
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown
        })
        console.log(posteo)
        //GUARDAMOS EN DB
        posteo.save();
        res.redirect('/')
    }catch(err){
        console.log(err)
    }
})

// router.put('/edit/:id', async(req, res, next)=>{
//     try{
//         req.post = await Post.findById(req.params.id)
//         next();
//     }catch(err){
//         console.log(err)
//     }
// },
// savePostAndRedirect("editPost")
// )

// router.delete('/:id', async(req, res)=>{
//     try{
//         let post = await Post.findById(req.params.id)

//         await post.deleteOne();

//         res.redirect('/')
//     }catch(err){
//         console.log(err)
//     }
// })


// function savePostAndRedirect(path){
//     return async(req, res)=>{
//         let post = req.post;
//         post.title = req.body.title
//         post.markdown = req.body.markdown

//         try{
//             post = await post.save();
//             res.redirect(`/${post.slug}`)
//         }catch(e){
//             res.render(`/${path}`, {post: post})
//         }
//     }
// }




module.exports = router;