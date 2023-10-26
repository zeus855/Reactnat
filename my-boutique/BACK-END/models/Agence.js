import mongoose from "mongoose";



const agenceSchema = mongoose.Schema(
    {
        titre: { type: String, required: true },
        adresse: { type: String, required: true },
        ville: { type: String, required: true, },
        cp: { type: Number, required: true },
        description: { type: String, required: true },
        photo: { type: String, required: true },
    },
    { timestamps: { createdAt: true }}
)



export default mongoose.model('Agence', agenceSchema)