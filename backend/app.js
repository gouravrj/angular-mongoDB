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
  post.save();
  console.log(post)
  res.status(201).json({
    message: 'Post Added Successfully'
  });
});

app.get('/api/posts',(req,res,next)=>{
  Post.find().then(documents =>{
    res.status(200).json({
      message: 'Posts fetched Successfully .....',
      posts: documents
    })
  })

});


module.exports = app;
