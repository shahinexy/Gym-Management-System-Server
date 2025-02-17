
import { UserModle } from "../user/user.model";


const getAllUserFromDB = async () =>{
    const result = await UserModle.find()
    return result;
}

const getSingleUserFromDB = async (id: string) =>{
    const result = await UserModle.findById(id)
    return result;
}

export const AdminServices = {
  getAllUserFromDB,
  getSingleUserFromDB
};
