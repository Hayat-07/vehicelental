import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";





const createBooking = async (
    customer_id: number,
    vehicle_id: number,
    rent_start_date: string,
    rent_end_date: string
) => {

   
    const vehicleResult = await pool.query(
        `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1`,
        [vehicle_id]
    );

    if (vehicleResult.rowCount === 0) {
        throw new Error("Vehicle not found");
    }

    const vehicle = vehicleResult.rows[0];

    
    const startDate = new Date(rent_start_date);
    const endDate = new Date(rent_end_date);
    const days = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
        throw new Error("rent_end_date must be after rent_start_date");
    }

    const total_price = days * Number(vehicle.daily_rent_price);

 
    const result = await pool.query(
        `
    WITH new_booking AS (
      INSERT INTO bookings (
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price,
        status
      )
      VALUES ($1, $2, $3, $4, $5, 'active')
      RETURNING *
    )
    SELECT
      nb.id,
      nb.customer_id,
      nb.vehicle_id,
      nb.rent_start_date,
      nb.rent_end_date,
      nb.total_price,
      nb.status,
      json_build_object(
        'vehicle_name', v.vehicle_name,
        'daily_rent_price', v.daily_rent_price
      ) AS vehicle
    FROM new_booking nb
    JOIN vehicles v ON nb.vehicle_id = v.id;
    `,
        [
            customer_id,
            vehicle_id,
            rent_start_date,
            rent_end_date,
            total_price,
        ]
    );

    return result.rows[0];
};









const getAllBookings = async (user: JwtPayload) => {
    let query = `
        SELECT 
            b.id,
            b.customer_id,
            b.vehicle_id,
            b.rent_start_date,
            b.rent_end_date,
            b.total_price,
            b.status,
            json_build_object(
                'vehicle_name', v.vehicle_name,
                'registration_number', v.registration_number,
                'type', v.vehicle_type
            ) AS vehicle
            ${user.role === "admin" ? `,
            json_build_object(
                'name', c.name,
                'email', c.email
            ) AS customer` : ""}
        FROM bookings b
        JOIN vehicles v ON b.vehicle_id = v.id
        ${user.role === "admin" ? "JOIN customers c ON b.customer_id = c.id" : ""}
        ${user.role === "customer" ? "WHERE b.customer_id = $1" : ""}
        ORDER BY b.id DESC
    `;

    const params = user.role === "customer" ? [user.id] : [];

    const result = await pool.query(query, params);

    return result.rows;
};






const updateBooking = async (bookingId: number, status: string, user: JwtPayload) => {

    const getUserById = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);
    // console.log(getUserById);
    if (getUserById.rowCount === 0) {
        throw new Error('Booking not found');
    }
    const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [status, bookingId]);
    
    
    
    // console.log(result);
    if (status === "returned") {
        const newResult = { ...result.rows[0], "vehicle": { "availability_status": "available" } };
        return newResult;
    }
    return result.rows[0];
};






export const bookingServices = {
    createBooking,
    getAllBookings,
    updateBooking,
};
