var express    = require("express");
var router     = express.Router();
var User       = require("../models/user");
var passport   = require("passport");

//ROOT
router.get("/", function(req, res){
    //res.send("This will be the landing page");
    res.render("landing");
});

//REGISTER FORM
router.get("/register", function(req, res){
    res.render("register");
});

//SIGN UP LOGIC
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelpcamp " + user.username);
            res.redirect("./campgrounds");
        });
    });
});

//SHOW LOGIN FORM
router.get("/login", function(req, res){
    res.render("login");
});


//HANDLING LOGIN LOGIC
router.post("/login", passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully Logged you out");
    res.redirect("/campgrounds");
});

module.exports = router;