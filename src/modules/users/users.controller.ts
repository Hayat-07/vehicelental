
import {Request,Response} from 'express';
import { usersServices } from './users.service';



const getAllUsers=async (req:Request,res:Response)=>{
   try{
    const result= await usersServices.getAllUsers();

    res.status(200).json({
        success:true,
        message:"Users retrieved successfully",
        data:result
    });
    
   } catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to retrieve users",
        errors: (error as Error).message,
    });
   }
};





const updateUser=async (req:Request,res:Response)=>{
    const {userId}=req.params;
   try{
    const {name,email,phone,role}=req.body;
    const result= await usersServices.updateUser(name, email, phone, role, userId as string);

    res.status(200).json({
        success:true,
        message:"User updated successfully",
        data:result
    });

   } catch (error) {
    res.status(500).json({
        success: false,
        message: "User update failed",
        errors: (error as Error).message,
    });
   }
};




const deleteUser=async (req:Request,res:Response)=>{
    const {userId}=req.params;
   try{
    const result= await usersServices.deleteUser(userId as string);

    res.status(200).json({
        success:true,
        message:"User deleted successfully",
        
    });

   } catch (error) {
    res.status(500).json({
        success: false,
        message: "User deletion failed",
        errors: (error as Error).message,
    });
   }
}






export const usersController= {
 getAllUsers,
 updateUser,
 deleteUser
};