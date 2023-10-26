import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { env } from '../config/index.js';

// MODEL
import Model from '../models/Agence.js';

export const signup = async (req, res, next) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        

        //..requete mongo
        await Model.create({ 
            ...req.body,
            password: hashedPassword
             
        });

        res.status(201).json('Agence has been created! ');
    }catch(error){
        next(error);
    }
};

export const sign = async (req, res) => {
    try{
        //Recherche le joueur dans la base de donnée par son email
        const agence = await Model.findOne({ email: req.body.email })
        // si le joueur n'est pas trouvé, renvoie une erreur 404.
        if(!agence) return res.status(404).json('Email not found! ');

        // Compare le mot de passe fourni dans la requete avec le mot de passe du joueur (qui est dans la bdd)
        const comparePassword = await bcrypt.compare(
            req.body.password,
            agence.password
        )
        if(!comparePassword)return res.status(400).json('Wrong Credentials! ') // si le mot de passe est incorrect, renvoie une erreur 400.

        // creer un jeton JWT pour le joueur avec son ID, expire après 24 heures

        const token = jwt.sign({ id: agence._id}, env.token, { expiresIn:'24h'})
        // supprime le mot de passe du joueur
        const { password, ...others} = agence._doc
        
        // envoie le jeton (token) JWT sous forme de cookie HTTPOnly
        res.cookie('access_token', token,{ httpOnly: true }).status(200).json(others)
        // .json renvoi les donnees du joueur en reponse (à l'exception du password)

    }catch(error){
        next(error)
    }
};


export const allAgences = async (req, res, next) =>{
    try{
        const agences = await Model.find()
        res.status(200).json(agences)

    }catch(error){

    }
};
export const oneAgence = async (req, res, next) => {
    try{
        const {id} = req.params

        const agences = await Model.findById(id);
        
        res.status(200).json(agences);
    }catch (error) {
        next (error);
    }
};

export const deleteAgence = async (req, res, next) => {
    try{
        const {id} = req.params
        const agence = await Model.findById(id)
        if (!agence) return res.status(404).json('Agence not found. ')
        
        await Model.findByIdAndRemove(id)    
        res.status(200).json('Agence has been deleted. ')
    }catch(error){
        next(error);
    }
};

export const putAgence = async (req, res, next) => {
    try{
        const agence = await Model.findById(req.params.id);
        if (!agence) return res.status(404).json('Agence not found. ');

       const updateAgence = await Model.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true}
       )

       res.status(200).json({
        message: 'Agence updated.',
        updateAgence
       }) 
       
    }catch(error){
        next(error)
    }
}