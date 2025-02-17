
import { TrainerModle } from "./trainer.model"



const getAllTrainerFromDB = async () =>{
    const result = await TrainerModle.find()
    return result
}

const getSingleTrainerFromDB = async (id: string) =>{
    const result = await TrainerModle.findById(id)
    return result
}


export const TrainerServices = {
    getAllTrainerFromDB,
    getSingleTrainerFromDB,
}