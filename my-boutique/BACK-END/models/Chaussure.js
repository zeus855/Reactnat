import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const chaussureSchema = mongoose.Schema({
    nom: {type: String, require: true},
    prix: {type: Number, require: true},
    description: {type: String},
    image: {type: String},
    likes: {type: Number}
},
{
    timestamps: {createdAt: true}
});

chaussureSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Chaussure', chaussureSchema);