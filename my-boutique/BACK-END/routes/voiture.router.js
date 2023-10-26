import express from 'express'


import { signup, allVoitures, oneVoiture, deleteVoiture, putVoiture, sign} from '../controllers/voiture.controller.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/sign', sign)
router.get('/all', allVoitures)
router.get('/findById/:id', oneVoiture)
router.delete('/delete/:id', deleteVoiture)
router.put('/update/:id', putVoiture)

export default router;