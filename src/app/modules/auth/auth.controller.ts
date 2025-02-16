import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

const loginUser = catchAsync(async(req,res)=>{
  const result = await AuthServices.loginUser(req.body)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User loged in successfully",
    data: result,
  });
})

export const AuthController = {
  loginUser
};
