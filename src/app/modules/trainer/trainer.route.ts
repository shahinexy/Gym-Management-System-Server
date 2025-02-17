import express from 'express'
import { TrainerController } from './trainer.controller';


const router = express.Router();

router.post('/create', TrainerController.createTrainer)

// router.get('/', DemoController.getDemos)

// router.get('/:productId', DemoController.getSingleDemo)

// router.put('/:productId', DemoController.updateSingleDemo)

// router.delete('/:productId', DemoController.deleteSingleDemo)


export const TrainerRouters = router;