import express from 'express';

import {add, findChaussureById, allChaussures, updateChaussure, deleteChaussure, likeChaussure, allChaussureLike 
} from '../controllers/chaussure.controller.js';

const router = express.Router();

router.post("/add", add);

router.get("/all", allChaussures);

router.get("/detail/:id", findChaussureById);

router.put("/update/:id", updateChaussure);

router.delete("/delete/:id", deleteChaussure);

router.post("/like/:id", likeChaussure);

router.get("/alllike", allChaussureLike);

export default router;