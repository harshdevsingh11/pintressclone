var express = require('express');
var router = express.Router();
const postModel=require("./post");
const userModel=require("./users");
const passport=require('passport');
const upload=require('./multer')
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
router.get("/",function(req,res,next){
   res.render('index');
});
router.get("/login",function(req,res,next){
  res.render('login', {error:req.flash("error")});
});



router.get('/profile',isLoggedIn, async function(req,res,next){
  const user = await userModel.findOne({
    username:req.session.passport.user
  })
  .populate("posts")
  res.render("profile",{user})
});
router.post("/register",function(req,res){
  const userData = new userModel({
      username:req.body.username,
      email:req.body.email,
      fullname: req.body.fullname,
     });
     userModel.register(userData, req.body.password)
     .then(function() {
      passport.authenticate("local")(req,res, function(){
        res.redirect("/profile");
      })
     })
})
router.post("/login", passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash:true
  }),function(req, res){

   });


  router.get('/logout', function(req, res ){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
       })
  function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();
    req.redirect("/");
  }
  router.get("/feed",isLoggedIn,async function(req,res,next){
    const user = await userModel.findOne({username: req.session.passport.user})
   const posts = await postModel.find()
    .populate("user")

    res.render("pint",{user,posts,nav:true});
  });
  router.post("/upload",isLoggedIn,upload.single("file"), async function(req,res,next){
    if(!req.file){
      return res.status(404).send("no file were uploaded.");
    }
    const user = await userModel.findOne({username:req.session.passport.user});
    const post= await postModel.create({
      image:req.file.filename,
      postText:req.body.filecaption,
      user: user._id
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
  });
  router.get("/contact",function(req,res){
    res.render("contact")
  })



module.exports = router;
