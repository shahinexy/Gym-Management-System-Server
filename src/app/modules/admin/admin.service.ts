
import { TDemo } from "./admin.interface";
import { DemoModle } from "./admin.model";


const createDemoInDB = async (DemoData: TDemo) =>{
    const result = await DemoModle.create(DemoData)
    return result
}

const getAllDemosFromDB = async () =>{
    const result = await DemoModle.find()
    return result;
}

const getSingleDemoFromDB = async (productId: string) =>{
    const result = await DemoModle.findOne({_id: productId})
    return result;
}

const updateSingleDemoFromDB = async (productId: string, updateData: TDemo) =>{
    const result = await DemoModle.updateOne({_id: productId}, {$set: updateData});
    return result;
}

const deleteSingleDemoFromDB = async (productId: string) =>{
    const result = await DemoModle.findByIdAndDelete({_id: productId})
    return result;
}

// const searchDemoFromDB = async (searchTerm: string) =>{

//     const regexSearchTerm = new RegExp(searchTerm as string, 'i')

//     const result = await DemoModle.find({
//         $or: [
//             {title: regexSearchTerm},
//             {author: regexSearchTerm},
//             {category: regexSearchTerm},
//         ]
//     })

//     return result
// }

export const DemoService = {
    createDemoInDB,
    getAllDemosFromDB,
    getSingleDemoFromDB,
    updateSingleDemoFromDB,
    deleteSingleDemoFromDB,
}