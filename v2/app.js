var app         = require("express")(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");      // connect with yelp_camp database
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
//         name: "Granite Hill",
//         image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6354eedc19ac4f3d9080c74963489da4&auto=format&fit=crop&w=500&q=60",
//         description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly Created Campground");
//             console.log(campground);
//         }
//     }
// );


// var campgrounds = [
//     {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1473713984581-b8918cc3652e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d0b711da885120b59a94bce6d3163d35&auto=format&fit=crop&w=500&q=60"},   
//     {name: "Granite Hill", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6354eedc19ac4f3d9080c74963489da4&auto=format&fit=crop&w=500&q=60"},  
//     {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1c8cc988efddbda8746281871c0c8bf&auto=format&fit=crop&w=500&q=60"},
// ]

//ROUTES

app.get("/", function(req, res){
    res.render("landing");
})

// INDEX ROUTE - show all campgrounds
app.get("/campgrounds", function(req, res){
    
    //List of all the campgrounds and their photos
    // get all campgrounds from DB
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds})
        }
    })
});

// NEW ROUTE - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

// CREATE ROUTE - add new campground to DB
app.post("/campgrounds", function(req,res) {
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description
   var newCampground = {name: name, image: image, description: desc};
   //create new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   })
//   campgrounds.push(newCampground);
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // find campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           res.render("show", {campground: foundCampground});
       }
    });
});

app.listen(process.env.PORT || 3000, process.env.IP || "LOCALHOST", function(){
    console.log("Yelpcamp has started");
});