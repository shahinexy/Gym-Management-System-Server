import express from 'express'
import { DemoController } from './admin.controller';


const router = express.Router();

router.post('/', DemoController.createDemo)

router.get('/', DemoController.getDemos)

router.get('/:productId', DemoController.getSingleDemo)

router.put('/:productId', DemoController.updateSingleDemo)

router.delete('/:productId', DemoController.deleteSingleDemo)


export const DemoRouter = router;