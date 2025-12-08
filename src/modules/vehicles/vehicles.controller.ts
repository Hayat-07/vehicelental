import { Request, Response } from 'express';
import { vehiclesServices } from './vehicles.service';

export const createVehicle = async (req: Request, res: Response) => {
    try {
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
        const result = await vehiclesServices.createVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status);

        res.status(200).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add new vehicle",
            errors: (error as Error).message,
        });
    }
};






const getAllVehicles = async (req: Request, res: Response) => {

    try {
        const result = await vehiclesServices.getAllVehicles();
        if (result.rowCount === 0) {
            return res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: []
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get  all vehicles",
            errors: (error as Error).message,
        });
    }
};



export const getVehicleById = async (req: Request, res: Response) => {

    try {
        const { vehicleId } = req.params;
        const result = await vehiclesServices.getVehicleById(Number(vehicleId));;

        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get vehicle by id",
            errors: (error as Error).message,
        });
    }
};


export const updateVehicle = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
        const result = await vehiclesServices.updateVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId as string);

        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update vehicle",
            errors: (error as Error).message,
        });
    }
};


export const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const result = await vehiclesServices.deleteVehicle(vehicleId as string);

        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete vehicle",
            errors: (error as Error).message,
        });
    }
};



export const vehiclesController = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
}