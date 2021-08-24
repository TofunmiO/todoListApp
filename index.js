const express = require('express');
const path = require('path');
// const bodyParser = require("body-parser");
const app = express();

const config = require('./configs/database.config'); 
const mongoose = require('mongoose');
const api = require("./routes/api");



const port = 8000;


// parse requests of content-type - application/json
// app.use(bodyParser.urlencoded({extended: true }))
// app.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
 useNewUrlParser: true,
 useUnifiedTopology: true
}).then (() => {
    console.log("Succesfully connected to the database");
}).catch(err => { 
    console.log("Could not connect to database. Exiting now...", err);
    process.exit();
});


// app.route('/') 
//     .get ((req,res) => {
//     //res.send("IN GET /");
//     res.sendFile(path.join(__dirname,'index.html'));
// })
//     .post((req,res) => {
//     res.send("IN POST /");
// });

app.use("/api", api);

// require routes
// require('./routes/api.js')(app)
app.listen(port, () => {
    console.log(`Started on port: ${port}`)
})