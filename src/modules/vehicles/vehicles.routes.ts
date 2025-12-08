import { Router } from 'express';
import { vehiclesController } from './vehicles.controller';
import auth from '../../middleware/auth';

const router = Router();

router.post('/',auth(), vehiclesController.createVehicle);
router.get('/',auth(), vehiclesController.getAllVehicles);

router.get('/:vehicleId',auth(), vehiclesController.getVehicleById);
router.put('/:vehicleId',auth(), vehiclesController.updateVehicle);
router.delete('/:vehicleId',auth(), vehiclesController.deleteVehicle);



export const vehiclesRoutes = router;