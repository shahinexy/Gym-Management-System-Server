/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllUserFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User are retrieved Successfully",
    data: result,
  });
});

// const getSingleDemo = catchAsync(async (req: Request, res: Response) => {
//   const { productId } = req.params;

//   const result = await DemoService.getSingleDemoFromDB(productId);

//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: "Get The Demo Successfully",
//     data: result,
//   });
// });

// const updateSingleDemo = catchAsync(
//   async (req: Request, res: Response): Promise<any> => {
//     const { productId } = req.params;

//     const result = await DemoService.getSingleDemoFromDB(productId);

//     sendResponse(res, {
//       statusCode: status.OK,
//       success: true,
//       message: "Demo updated successfully",
//       data: result,
//     });
//   }
// );

// const deleteSingleDemo = catchAsync(async (req: Request, res: Response) => {
//   const { productId } = req.params;

//   const result = await DemoService.deleteSingleDemoFromDB(productId);

//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: "Demo deleted successfully",
//     data: result,
//   });
// });

export const AdminController = {
  getAllUsers,
};
