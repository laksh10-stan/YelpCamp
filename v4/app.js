var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    Comment      = require("./models/comment"),
    seedDB       = require("./seeds")

mongoose.connect("mongodb://localhost:27017/yelp_camp_v4-5", { useUnifiedTopology: true,  useNewUrlParser: true  });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//seedDB();
app.get("/", function(req, res){
    //res.send("This will be the landing page");
    res.render("landing");
});
//INDEX
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});
//CREATE
app.post("/campgrounds", function(req, res){
    //get data from forms and add to campgrounds array
    //redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });   
});
//NEW
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});
//SHOW
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }   
        else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });   
});

///=====================================
// COMMENTS ROUTE
//=======================================
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
            // console.log(req.body.comment);
        }
    });

});

app.listen(3000, function(){
    console.log("YelpCamp Started at port 3000");
});