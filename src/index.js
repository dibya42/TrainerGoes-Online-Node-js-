const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb+srv://dibya:Zoomhtml1@cluster0.r6e0m.mongodb.net/dibya?retryWrites=true&w=majority",{useNewUrlParser: true
})
.then( () => console.log("MongoDB is connected"))
.catch( err => console.log(err) )

app.use('/',route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});