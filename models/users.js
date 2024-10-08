const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://prakashsaurav932004:Saurav@airbnb.cmgrx.mongodb.net/?retryWrites=true&w=majority&appName=airbnb`)

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number
});


module.exports = mongoose.model('user', userSchema);


