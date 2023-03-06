const express = require('express')
const bodyParser = require("body-parser");

const Post = require('./models/post')

const app = express(); //acts like middleware

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
  console.log(post)
  res.status(201).json({
    message: 'Post Added Successfully'
  });
});

app.get('/api/posts',(req,res,next)=>{
  const posts = [
    {
      id:'f421231',
      title:'First-Server-side-Post',
      content:"This is coming from the server"
    },
    {
      id:'g421231',
      title:'Second-Server-side-Post',
      content:"This is coming from the server"
    },

  ]
  res.status(200).json({
    message: 'Posts fetched Successfully .....',
    posts: posts
  })
});


module.exports = app;
