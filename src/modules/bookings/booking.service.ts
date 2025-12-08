import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";





const createBooking = async (customer_id: number, vehicle_id: number, rent_start_date: string, rent_end_date: string) => {

    const vehicleResult = await pool.query(`SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1`, [vehicle_id]);
    //  console.log(vehicleResult);
    // return vehicleResult;
    if (vehicleResult.rowCount === 0) {
        throw new Error('Vehicle not found');
    }

    const daily_rent_price = vehicleResult.rows[0].daily_rent_price;


    const startDate = new Date(rent_start_date);
    const endDate = new Date(rent_end_date);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
        throw new Error('rent_end_date must be after rent_start_date');
    }

    const total_price = days * Number(daily_rent_price);

    const result = await pool.query(`
            INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`
        , [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]);
     
    const finalResult = {
    ...result.rows[0],
    vehicle: {
      vehicle_name: vehicleResult.rows[0].vehicle_name,
      daily_rent_price: vehicleResult.rows[0].daily_rent_price,
    },
  };

  return finalResult;
};






const getAllBookings = async (user: JwtPayload) => {
    const result = await pool.query(`SELECT * FROM bookings`);
    // console.log(result);
     



    if (user.role === "customer") {
        return result.rows.filter(booking => booking.customer_id === user.id);
    }


    return result.rows;
};

const updateBooking = async (bookingId: number, status: string, user: JwtPayload) => {

    const getUserById = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);
    // console.log(getUserById);
    if (getUserById.rowCount === 0) {
        throw new Error('Booking not found');
    }
    const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [status, bookingId]);
    console.log(result);
    if (status === "returned") {
        const newResult ={...result.rows[0],"vehicle":{"availability_status": "available"}};
        return newResult;
    }
    return result.rows[0];
};






export const bookingServices = {
    createBooking,
    getAllBookings,
    updateBooking,
};
