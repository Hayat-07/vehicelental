
import { Request, Response } from "express";
import { bookingServices } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";



const createBooking = async (req: Request, res: Response) => {
    try {
        const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;
        const result = await bookingServices.createBooking(customer_id, vehicle_id, rent_start_date, rent_end_date);
      
        res.status(200).json({
            success: true,
            message:"Booking created successfully",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create new booking",
            errors: (error as Error).message,
        });
    }
};


const getAllBookings = async (req: Request, res: Response) => {
    try {

        const result = await bookingServices.getAllBookings(req.user as JwtPayload);

        res.status(200).json({
            success: true,
            message: (req.user as JwtPayload).role === "customer" ? "Your bookings retrieved successfully" : "Bookings retrieved successfully",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get bookings",
            errors: (error as Error).message,
        });
    }
};


const updateBooking = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const { bookingId } = req.params;
        const result = await bookingServices.updateBooking(Number(bookingId), status,req.user as JwtPayload);
        
        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update booking",
            errors: (error as Error).message,
        });
    }
};







export const bookingController = {
    createBooking,
    getAllBookings,
    updateBooking
};