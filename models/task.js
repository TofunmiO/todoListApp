const mongoose = require("mongoose");

const schema = mongoose.Schema({

    content: String,
    dateCompleted: Date,
    deadline: Date

});


module.exports = mongoose.model("Task", schema);
