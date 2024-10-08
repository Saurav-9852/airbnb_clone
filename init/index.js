const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://prakashsaurav932004:Saurav@airbnb.cmgrx.mongodb.net/?retryWrites=true&w=majority&appName=airbnb";

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was Intialized");
}

initDB();