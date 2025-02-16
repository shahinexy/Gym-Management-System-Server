import { TUserRegister } from "./auth.interface"
import { UsersModle } from "./auth.model"



const userRegisterIntoDB = async (payload: TUserRegister) =>{
    const result = await UsersModle.create(payload)
    return result
}


export const AuthServices = {
    userRegisterIntoDB,
}