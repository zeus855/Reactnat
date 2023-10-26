import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { env } from '../config/index.js';

// MODEL
import Model from '../models/Voiture.js';

export const signup = async (req, res, next) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        

        //..requete mongo
        await Model.create({ 
            ...req.body,
            password: hashedPassword
             
        });

        res.status(201).json('Voiture has been created! ');
    }catch(error){
        next(error);
    }
};

export const sign = async (req, res) => {
    try{
        //Recherche le joueur dans la base de donnée par son email
        const voiture = await Model.findOne({ email: req.body.email })
        // si le joueur n'est pas trouvé, renvoie une erreur 404.
        if(!voiture) return res.status(404).json('Email not found! ');

        // Compare le mot de passe fourni dans la requete avec le mot de passe du joueur (qui est dans la bdd)
        const comparePassword = await bcrypt.compare(
            req.body.password,
            voiture.password
        )
        if(!comparePassword)return res.status(400).json('Wrong Credentials! ') // si le mot de passe est incorrect, renvoie une erreur 400.

        // creer un jeton JWT pour le joueur avec son ID, expire après 24 heures

        const token = jwt.sign({ id: voiture._id}, env.token, { expiresIn:'24h'})
        // supprime le mot de passe du joueur
        const { password, ...others} = voiture._doc
        
        // envoie le jeton (token) JWT sous forme de cookie HTTPOnly
        res.cookie('access_token', token,{ httpOnly: true }).status(200).json(others)
        // .json renvoi les donnees du joueur en reponse (à l'exception du password)

    }catch(error){
        next(error)
    }
};


export const allVoitures = async (req, res, next) =>{
    try{
        const voitures = await Model.find()
        res.status(200).json(voitures)

    }catch(error){

    }
};
export const oneVoiture = async (req, res, next) => {
    try{
        const {id} = req.params

        const voitures = await Model.findById(id);
        
        res.status(200).json(voitures);
    }catch (error) {
        next (error);
    }
};

export const deleteVoiture = async (req, res, next) => {
    try{
        const {id} = req.params
        const voiture = await Model.findById(id)
        if (!voiture) return res.status(404).json('Voiture not found. ')
        
        await Model.findByIdAndRemove(id)    
        res.status(200).json('Voiture has been deleted. ')
    }catch(error){
        next(error);
    }
};

export const putVoiture = async (req, res, next) => {
    try{
        const voiture = await Model.findById(req.params.id);
        if (!voiture) return res.status(404).json('Voiture not found. ');

       const updateVoiture = await Model.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true}
       )

       res.status(200).json({
        message: 'Voiture updated.',
        updateVoiture
       }) 
       
    }catch(error){
        next(error)
    }
}