const mongoose = require('mongoose')

const contactShema = new mongoose.Schema({
    mail :{
        type : String,
        validate: {
            validator: function(v){
                return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            }
        }
    },
    name : {
        type : String,
        validate: {
            validator: function(v){
                return /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(v)
            }
        }
    },
    objet : {
        type : String,
        validate: {
            validator: function(v){
                return /[^A-Za-z0-9 .'?!,@$#-_]/u.test(v)
            }
        }
    },
    description : {
        type : String,
        validate: {
            validator: function(v){
                return /[^A-Za-z0-9 .'?!,@$#-_]/u.test(v)
            }
        }
    }
})

const contactModel = mongoose.model("contacts", contactShema);
module.exports= contactModel