const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./models/post')

const app = express(); //acts like middleware

mongoose.connect("mongodb+srv://gourav_rj:Gourav2001@cluster0.dqg4x.mongodb.net/?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Successfully Connected to the Database ...")
  })
  .catch(()=>{
    console.log('Connection Failed :( ')
  })

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended:false}))

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts",(req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  // post.save();  -------> Only to save post See the video to see the Difference b/w these TWO (16.Last Video)
  post.save().then(createdPost =>{
    res.status(201).json({
      message: 'Post Added Successfully',
      postId: createdPost._id
    });
  })
});

app.get('/api/posts',(req,res,next)=>{
  Post.find().then(documents =>{
    res.status(200).json({
      message: 'Posts fetched Successfully .....',
      posts: documents
    })
  })

});

app.delete("/api/posts/:id", (req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post Deleted !"
    })
  })

})


module.exports = app;
