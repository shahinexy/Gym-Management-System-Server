import { TTrainer } from "../trainer/trainer.interface"
import { TrainerModle } from "../trainer/trainer.model"




const createTrainerInDB = async (payload: TTrainer) =>{
    const result = await TrainerModle.create(payload)
    return result
}

export const userService = {
    createTrainerInDB,
}