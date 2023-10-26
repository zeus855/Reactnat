import Model from '../models/Chaussure.js';

export const add = async (req, res, next) => {
    try{
        await Model.create(req.body)
        res.status(201).json({
            message: 'Chaussure ajoutée'
        })
    }
    catch(error){
        next(error)
    }
}

export const allChaussures = async (req, res, next) => {
    try{
        const chaussures = await Model.find()
        res.status(200).json(chaussures)
    }
    catch(error){
        next(error)
    }
}

export const findChaussureById = async (req, res, next) => {
    try{
        const chaussure = await Model.findById(req.params.id)
        res.status(200).json(chaussure)
    }
    catch(error){
        next(error)
    }
}

export const updateChaussure = async (req, res, next) => {
    try{
      const chaussure = await Model.findById(req.params.id);
      if(!chaussure) return res.status(404).json("chaussure not found !");
  
      const updateChaussure = await Model.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )
  
      res.status(200).json({
        message: "chaussure updated",
        updateChaussure
      })
  
    }catch(error){
      next(error)
    }
  }



export const deleteChaussure = async (req, res, next) => {
    try{
        const chaussure = await Model.findById(req.params.id);
        if (chaussure){
            await Model.findByIdAndRemove(req.params.id)
            res.status(200).json({message:'Supprimé'})
        }
        else{
            return res.status(404).json({message:'Non trouvée'})
        }
    }
    catch(error){
        next(error)
    }
}

// Ajout de like
export const likeChaussure = async (req, res, next) => {
    const { id } = req.params;
    try{
        const chaussure = await Model.findById(id);
        if(chaussure) {
            chaussure.likes = chaussure.likes +1;
            await chaussure.save();
            res.status(200).json({
                likes: chaussure.likes,
                message: 'Like ajouté'
            })
        }
        if(!chaussure) res.status(404).json({message: 'Non trouvé'})
    }
    catch(error){
        next(error)
    }
}

// Tri par like
export const allChaussureLike = async (req, res, next) => {
    try{
        const chaussures = await Model.find().sort({like: -1})
        res.status(200).json(chaussures)
    }
    catch(error){
        next(error)
    }
}