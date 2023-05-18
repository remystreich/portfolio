const mongoose = require('mongoose')

const projectShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "le titre est requis"],
        validate: {
            validator: function(v){
                return /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(v)
            }
        }
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
        validate: {
            validator: function(v){
                return /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð : ?!  ,.'-]+$/u.test(v)
            }
        }
    },
    image:{
        type: String,
    }
})

const projectsModel = mongoose.model("project", projectShema);
module.exports= projectsModel