import mongoose from "mongoose";



const voitureSchema = mongoose.Schema(
    {
        titre: { type: String, required: true },
        marque: { type: String, required: true },
        modele: { type: String, required: true, },
        photo: { type: String, required: true },
        description: { type: String, required: true },
        photo: { type: String, required: true },
        prix_journalier: { type: String, required: true },
    },
    { timestamps: { createdAt: true }}
)



export default mongoose.model('voiture', voitureSchema)