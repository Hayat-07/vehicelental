
import { pool } from '../../config/db';

const getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    if (result.rowCount === 0) {
        throw new Error('No users found');
    }
    return result.rows;
};

const updateUser = async (name:string,email:string,phone:string,role:string,userId: string) => {
    const getUserById = await pool.query(`SELECT * FROM users WHERE id=$1`, [userId]);
    if (getUserById.rowCount === 0) {
        throw new Error('User not found');
    }
    const result = await pool.query(`UPDATE users SET name=$1,email=$2,phone=$3,role=$4 WHERE id=$5 RETURNING *`, [name, email, phone, role, userId]);
    return result.rows[0];
};

const deleteUser = async (userId: string) => {
    const getUserById = await pool.query(`SELECT * FROM users WHERE id=$1`, [userId]);
    if (getUserById.rowCount === 0) {
        throw new Error('User not found to delete');
    }
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [userId]);
    return result.rows[0];
};





export const usersServices = {
    getAllUsers,
    updateUser,
    deleteUser
};