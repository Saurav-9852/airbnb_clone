const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Listing = require("./models/listing.js")
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { wrap } = require('module');

// const userModel = require('./models/users');
// const cookieParser = require('cookie-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


const MONGO_URL = "mongodb://127.0.0.1:27017/wander";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


//Index Route
app.get("/listings", wrapAsync( async (req, res) => {
    try {
        const allListing = await Listing.find({});
        res.render("listings/index", { allListing });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching listings");
    }
}));

// Create Route
app.post("/listings", wrapAsync(async (req,res,next)=>{
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    })
);


// Edit Route
app.get("/listings/:id/edit", wrapAsync( async (req,res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

// New Route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
})

//Show Route
app.get("/listings/:id", wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
}));



// Update route
app.put("/listings/:id", wrapAsync( async (req,res)=>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));


// Delete Route
app.delete("/listings/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"Page Not Found!"));
// });

//Error Handler
app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "Something Went Wrong"} = err;
    res.status(statusCode).send(message);
});


app.get("/login",(req,res)=>{
    res.render("listings/login.ejs");
})

app.get("/create",(req,res)=>{
    res.render("listings/create.ejs");
})

app.listen(3000,()=>{
    console.log("Server is running at port 3000");
});














// let {title, description, image, price, country, location} = req.body;
// let listing = req.body.listing;
// console.log(listing);

// app.get("/listing/:id", async (req,res)=>{
    //     let {id} = req.params;
    //     const listing =  await Listing.findById(id);
    //     res.render("listings/show.ejs", { listing });
    // })
    
    // app.get("/listings", async (req,res)=>{
        //     const allListing = await Listing.find({}).then(res =>{});
        //     res.render("listings/index.ejs", { allListing } );
        // })
        
        // app.get("/testListing", async (req,res)=>{
            //     let sampleListing = new Listing({
                //         title: "My New Villa",
                //         descreption: "By the beach",
                //         price: 1200,
                //         location:"Calangute, Goa",
                //         country: "India",
                //     });
                //     await sampleListing.save();
                //     console.log("Sample was saved");
                //     res.send("Successful testing");
                // })
                
                // app.post("/create",(req,res)=>{
                //     let {username,email,password,age} = req.body;
                //     const saltRounds = 10;
                //     bcrypt.genSalt(saltRounds,(err,salt) => {
                //         bcrypt.hash(password,salt,async (err,hash)=>{
                //             let userCreated = await userModel.create({
                //                 username,
                //                 email,
                //                 password: hash,
                //                 age
                //             })
                //             let token = jwt.sign({email},"secretKey")
                //             // res.cookie('token',token);
                //             console.log(userCreated);
                //             res.redirect("/");
                //         })
                //     })
                // });