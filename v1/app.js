var app = require("express")();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1473713984581-b8918cc3652e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d0b711da885120b59a94bce6d3163d35&auto=format&fit=crop&w=500&q=60"},   
    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6354eedc19ac4f3d9080c74963489da4&auto=format&fit=crop&w=500&q=60"},  
    {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1c8cc988efddbda8746281871c0c8bf&auto=format&fit=crop&w=500&q=60"},
]
                                                    //ROUTES!
app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    
    //List of all the campgrounds and their photos

    
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.post("/campgrounds", function(req,res) {
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   // redirect back to campgrounds page
//   res.redirect("/campgrounds");                // when redirecting, the default is to be redirected to a get request
});

app.listen(process.env.PORT || 3000, process.env.IP || "LOCALHOST", function(){
    console.log("Yelpcamp has started");
});