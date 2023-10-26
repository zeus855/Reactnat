import express from 'express'


import { signup, allAgences, oneAgence, deleteAgence, putAgence, sign} from '../controllers/agence.controller.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/sign', sign)
router.get('/all', allAgences)
router.get('/findById/:id', oneAgence)
router.delete('/delete/:id', deleteAgence)
router.put('/update/:id', putAgence)

export default router;