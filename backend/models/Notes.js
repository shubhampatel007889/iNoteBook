const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'user'
    },
    title:{
        type : String,
        require : true
    },
    description:{
        type : String,
        require : true,
        
    },
    tag:{
        type : String,
        default : "general"
    },
    date:{
        type : Date,
        default : Date.now
    },

});
const User= mongoose.model('notes',NotesSchema)
module.exports = User