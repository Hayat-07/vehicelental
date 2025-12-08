import { Request, Response } from 'express';
import { authServices } from './auth.services';

const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone, role } = req.body;
        const result = await authServices.signup(name, email, password, phone, role );
        // console.log("result :::", result);


        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });

    } catch (err) {
        console.log("Signup error:", err);
        res.status(500).json({
            success: false,
            message: "Unexpected server errors",
            errors: "Internal Server Error"
        })
    }
};
const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await authServices.signin(email, password);
        // console.log("result :::", result);


        res.status(201).json({
            success: true,
            message: "Login successful",
            data: result,
        });

    } catch (err) {
        console.log("Signin error::", err);
        res.status(500).json({
            success: false,
            message: "Unexpected server errors",
            errors: "Internal Server Error"
        })
    }
};




export const authControllers = {
    signup,
    signin,
};