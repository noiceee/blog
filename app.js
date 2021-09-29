const express = require("express");

const homeStartingContent = "jnrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehbjknrljnflehehb";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];

app.post("/compose", (req, res)=>{
  posts.push({
    title: req.body.postTitle,
    content: req.body.newPost
  });
  res.redirect("/");
});
app.post("/delete", (req, res)=>{
  const toDelete = req.body.post;
  const index = posts.indexOf(toDelete);
  posts.splice(index, 1);
  res.redirect("/");
})
app.get("/", (req, res)=>{
  res.render('home.ejs', {homeStartingContent, aboutContent, contactContent, posts});
})
app.get("/about", (req, res)=>{
  res.render('about.ejs', {homeStartingContent, aboutContent, contactContent});
})
app.get("/contact", (req, res)=>{
  res.render('contact.ejs', {homeStartingContent, aboutContent, contactContent});
})
app.get("/compose", (req, res)=>{
  res.render('compose.ejs');
})
app.get("/posts/:post", (req, res)=>{
  let flag = 1;
  for(let i=0; i<posts.length; i++){
    if(posts[i].title.toLowerCase() == req.params.post.replace("-", " ").toLowerCase()){
      flag = 0;
      res.render('post.ejs', {post:posts[i]});
      break;
    }
  };
  if(flag){
    res.render('404.ejs');
  }
});

app.listen(5500, ()=>{
  console.log("Server started on port 5500");
});
