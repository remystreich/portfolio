const mongoose = require('mongoose')

const projectShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "le titre est requis"],
        
    },
    url:{
        type: String,
        validate: {
            validator: function(v){
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
            }
        }
    },
    gitUrl:{
        type: String,
        validate: {
            validator: function(v){
                return/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
            }
        }
    },
    description:{
        type: String,
        required: [true, "une description est requise"],
        
    },
    image:{
        type: String,
    },
    date:{
        type: Date,
    }
})

const projectsModel = mongoose.model("project", projectShema);
module.exports= projectsModel