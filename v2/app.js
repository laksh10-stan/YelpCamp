var express      = require("express");
    app          = express();
    bodyParser   = require("body-parser"); 
    mongoose     = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useUnifiedTopology: true,  useNewUrlParser: true  });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Salmon Creek", 
//         image: "https://images.unsplash.com/photo-1517807289433-f0282e362596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1007&q=80",
//         description: "This is really clean creek. No bathrooms/toilets. It is a rainfall heavy Campsite"
//     }, function(err, campground){
//         if(err){
//             console.log(err);

//         }
//         else{
//             console.log("Newly Created Campground");
//             console.log(campground);
//         }
//     });
app.listen(3000, function(){
    console.log("YelpCamp Started at port 3000");
});
app.get("/", function(req, res){
    //res.send("This will be the landing page");
    res.render("landing");
});
//INDEX
app.get("/campgrounds", function(req, res){
    
    //res.send("This will be the landing page");
    //res.render("campgrounds",{campgrounds: campgrounds});
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {campgrounds: allCampgrounds})
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
    res.render("new.ejs");
});
//SHOW
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }   
        else{
            res.render("show", {campground: foundCampground});
        }
    });
    
    
});