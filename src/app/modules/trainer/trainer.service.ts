import { TTrainer } from "./trainer.interface"
import { TrainerModle } from "./trainer.model"



const createTrainerIntoDB = async (payload: TTrainer) =>{
    const result = await TrainerModle.create(payload)
    return result
}

// const getAllDemosFromDB = async () =>{
//     const result = await DemoModle.find()
//     return result;
// }

// const getSingleDemoFromDB = async (productId: string) =>{
//     const result = await DemoModle.findOne({_id: productId})
//     return result;
// }

// const updateSingleDemoFromDB = async (productId: string, updateData: TDemo) =>{
//     const result = await DemoModle.updateOne({_id: productId}, {$set: updateData});
//     return result;
// }

// const deleteSingleDemoFromDB = async (productId: string) =>{
//     const result = await DemoModle.findByIdAndDelete({_id: productId})
//     return result;
// }


export const TrainerService = {
    createTrainerIntoDB,
}