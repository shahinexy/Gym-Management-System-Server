/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { DemoService } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

const createDemo = async (req: Request, res: Response) => {
  const result = await DemoService.createDemoInDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Demo created successfully",
    data: result,
  });
};

const getDemos = catchAsync(async (req: Request, res: Response) => {
  const result = await DemoService.getAllDemosFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Gert All Demos Successfully",
    data: result,
  });
});

const getSingleDemo = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const result = await DemoService.getSingleDemoFromDB(productId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Get The Demo Successfully",
    data: result,
  });
});

const updateSingleDemo = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { productId } = req.params;

    const result = await DemoService.getSingleDemoFromDB(productId);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Demo updated successfully",
      data: result,
    });
  }
);

const deleteSingleDemo = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const result = await DemoService.deleteSingleDemoFromDB(productId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Demo deleted successfully",
    data: result,
  });
});

// const searchDemo = async (req: Request, res: Response, next: NextFunction): Promise<any> =>{
//     try {
//         const {searchTerm} = req.query;

//         if(!searchTerm || typeof searchTerm !== 'string'){
//             return res.status(400).json({message: 'Search term is required'})
//         }

//         const result = await DemoService.searchDemoFromDB(searchTerm)

//         if (result.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: `No Demos found for the search term: "${searchTerm}"`,
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Searched Demos get successfully',
//             data: result
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Something went wrong',
//             data: error
//         })
//         next(error)
//     }
// }

export const DemoController = {
  createDemo,
  getDemos,
  getSingleDemo,
  updateSingleDemo,
  deleteSingleDemo,
};
