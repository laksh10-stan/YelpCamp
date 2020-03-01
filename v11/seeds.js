var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem nemo dolorem perspiciatis quis officia recusandae sapiente praesentium eos vitae magni ab aliquid repellendus dolor error similique, rem ipsa quasi consequuntur expedita ad placeat veniam! Ratione, nemo delectus magni, maxime sint possimus animi reprehenderit expedita voluptatem consequuntur vitae doloribus perspiciatis. Consectetur quod id explicabo eaque commodi quasi nihil ratione numquam fugit facere, necessitatibus labore eius modi nesciunt itaque error debitis, minima nostrum accusantium. Aut, exercitationem recusandae iure dicta aperiam tenetur sed?"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem nemo dolorem perspiciatis quis officia recusandae sapiente praesentium eos vitae magni ab aliquid repellendus dolor error similique, rem ipsa quasi consequuntur expedita ad placeat veniam! Ratione, nemo delectus magni, maxime sint possimus animi reprehenderit expedita voluptatem consequuntur vitae doloribus perspiciatis. Consectetur quod id explicabo eaque commodi quasi nihil ratione numquam fugit facere, necessitatibus labore eius modi nesciunt itaque error debitis, minima nostrum accusantium. Aut, exercitationem recusandae iure dicta aperiam tenetur sed?"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem nemo dolorem perspiciatis quis officia recusandae sapiente praesentium eos vitae magni ab aliquid repellendus dolor error similique, rem ipsa quasi consequuntur expedita ad placeat veniam! Ratione, nemo delectus magni, maxime sint possimus animi reprehenderit expedita voluptatem consequuntur vitae doloribus perspiciatis. Consectetur quod id explicabo eaque commodi quasi nihil ratione numquam fugit facere, necessitatibus labore eius modi nesciunt itaque error debitis, minima nostrum accusantium. Aut, exercitationem recusandae iure dicta aperiam tenetur sed?"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        // Comment.remove({}, function(err) {
        //     if(err){
        //         console.log(err);
        //     }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        //});
    }); 
    //add a few comments
}
 
module.exports = seedDB;