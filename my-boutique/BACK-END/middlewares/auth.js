
import jwt from 'jsonwebtoken'
import { env } from '../config/index.js'
import { createError } from './error.js'

export const verifieToken = (req, res, next) => {
  // Récupère le jeton (token) JWT à partir des cookies de la requête
  const token = req.cookies.access_token;
  // Vérifie si le jeton n'est présent
  // Si le jeton (token) n'est pas présent, renvoie une erreur 401 (accès refusé)
  if(!token) return next(createError(401, "Acces Denied"))

  // Vérifier la validité du jeton en utilisant jwt.verify
  jwt.verify(token, env.token, (err, player) => {
    // si une erreur se produit lors de la vérification du jeton
    if(err) {
      // Renvoie une erreur 403 (interdit) car le jeton (token) n'est pas valide
      return next(createError(403, "Token non valide !"))
    }
    // si la vérification réussit, ajoute les information du joueur dans l'objet req
    req.player = player

    next();
  })
}
