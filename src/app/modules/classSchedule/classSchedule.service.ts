
import { TClassSchedule } from "./classSchedule.interface";
import { ClassScheduleModle } from "./classSchedule.model";


const createClassScheduleIntoDB = async (payload: TClassSchedule) =>{
    const result = await ClassScheduleModle.create(payload)
    return result;
}

export const ClassScheduleServices = {
  createClassScheduleIntoDB,
};
