import express from 'express'
import { DemoController } from './user.controller';


const router = express.Router();

router.post('/create-admin', DemoController.createDemo)



export const DemoRouter = router;