import { pool } from "../../config/db";




const createVehicle = async (vehicle_name: string, type: string, registration_number: string, daily_rent_price: number, availability_status: string) => {

    const result = await pool.query(`
            INSERT INTO vehicles (vehicle_name,type,registration_number ,daily_rent_price,availability_status) VALUES ($1,$2,$3,$4,$5) RETURNING *`
        , [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

    return result;
};



const getAllVehicles = async () => {

    const result = await pool.query(`SELECT * FROM vehicles`);
    console.log(result);
    return result ;
};





const getVehicleById = async (vehicleId:string) => {

    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);
    console.log(result.rows[0]);
    return result;
};






const updateVehicle = async (vehicle_name:string,type:string,registration_number:string,daily_rent_price:number,availability_status:string,vehicleId: string) => {

    const getUserById = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicleId]);
    if (getUserById.rowCount === 0) {
        throw new Error('vehicle not found to update');
    }
    const result = await pool.query(`UPDATE vehicles SET vehicle_name=$1,type=$2,registration_number=$3,daily_rent_price=$4,availability_status=$5 WHERE id=$6 RETURNING *`, [vehicle_name,type,registration_number ,daily_rent_price,availability_status,vehicleId]);
    return result;
};


const deleteVehicle = async (vehicleId: string) => {

    const getUserById = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicleId]);
    if (getUserById.rowCount === 0) {
        throw new Error('Vehicle not found to delete');
    }
    const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [vehicleId]);
    return result.rows[0];
};





export const vehiclesServices = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
}