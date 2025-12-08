
import { pool } from "../../config/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "../../config/index"
const signup = async (name: string, email: string, password: string, phone: string, role: string ) => {
    
   


        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(`
        INSERT INTO users (name,email,password ,phone,role) VALUES ($1,$2,$3,$4,$5) RETURNING *`
            , [name, email, hashedPassword, phone, role]);

        return result.rows[0];

    
};


const signin = async (email: string, password: string) => {

    try {
        const emailExists = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (emailExists.rows.length === 0) {
            throw new Error("User not found with this email.");
        }
        const user = emailExists.rows[0];

        const isPasswordMatch= await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Invalid password.");
        }
        const mySecrete= config.jwtSecret;
        const token=jwt.sign({email:user.email,id:user.id},mySecrete as string,{expiresIn:'7d'});

        return {token,user};


    } catch (error) {
        console.error("SignIn service error::", error);
        throw error;
    }
};






export const authServices = {
    signup,
    signin,
};