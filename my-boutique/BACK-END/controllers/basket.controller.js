import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { env } from '../config/index.js';

// MODEL
import Model from '../models/Basket.js';

export const signup = async (req, res, next) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        

        //..requete mongo
        await Model.create({ 
            ...req.body,
            password: hashedPassword
             
        });

        res.status(201).json('Basket has been created! ');
    }catch(error){
        next(error);
    }
};

export const sign = async (req, res) => {
    try{
        //Recherche le joueur dans la base de donnée par son email
        const basket = await Model.findOne({ email: req.body.email })
        // si le joueur n'est pas trouvé, renvoie une erreur 404.
        if(!basket) return res.status(404).json('Email not found! ');

        // Compare le mot de passe fourni dans la requete avec le mot de passe du joueur (qui est dans la bdd)
        const comparePassword = await bcrypt.compare(
            req.body.password,
            player.password
        )
        if(!comparePassword)return res.status(400).json('Wrong Credentials! ') // si le mot de passe est incorrect, renvoie une erreur 400.

        // creer un jeton JWT pour le joueur avec son ID, expire après 24 heures

        const token = jwt.sign({ id: player._id}, env.token, { expiresIn:'24h'})
        // supprime le mot de passe du joueur
        const { password, ...others} = player._doc
        
        // envoie le jeton (token) JWT sous forme de cookie HTTPOnly
        res.cookie('access_token', token,{ httpOnly: true }).status(200).json(others)
        // .json renvoi les donnees du joueur en reponse (à l'exception du password)

    }catch(error){
        next(error)
    }
};


export const addBaskets = async (req, res, next) => {

    data.push({
        name: 'adidas homme Courtbeat',
        price: 55,
        content: 'sport',
        stars: 4,
        image: '../images/chaussure.png'

    })
    res.status(200).json(data)

}




export const allBaskets = async (req, res, next) =>{
    try{
        const baskets = await Model.find()
        res.status(200).json(baskets)

    }catch(error){

    }
};
export const oneBasket = async (req, res, next) => {
    try{
        const {id} = req.params

        const baskets = await Model.findById(id);
        
        res.status(200).json(baskets);
    }catch (error) {
        next (error);
    }
};

export const deleteBasket = async (req, res, next) => {
    try{
        
        const basket = await Model.findById(req.params.id)
        if (!basket) return res.status(404).json('Basket not found. ')
        
        await Model.findByIdAndRemove(req.params.id)    
        res.status(200).json('Basket has been deleted. ')
    }catch(error){
        next(error);
    }
};

export const putBasket = async (req, res, next) => {
    try{
        const basket = await Model.findById(req.params.id);
        if (!basket) return res.status(404).json('Basket not found. ');

       await Model.findByIdAndUpdate(
        req.params.id, req.body
       )

       res.status(200).json({
        message: 'Basket updated.',
        updateBasket
       }) 
       
    }catch(error){
        next(error)
    }
}