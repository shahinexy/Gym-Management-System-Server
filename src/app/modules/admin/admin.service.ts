
import { UserModle } from "../auth/auth.model";
import { TDemo } from "./admin.interface";
import { DemoModle } from "./admin.model";



const getAllUserFromDB = async () =>{
    const result = await UserModle.find()
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

export const AdminService = {
    getAllUserFromDB,
    getSingleDemoFromDB,
    updateSingleDemoFromDB,
    deleteSingleDemoFromDB,
}