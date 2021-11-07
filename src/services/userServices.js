import {User} from "../models";
import ApplicationError from "../utls/Errors/applicationError"


export const getUser= async (body)=>{
    const {email} = body;
    try {
        const emailExist = await User.findOne({where:{email}})
        if(emailExist) return {exist:true,message:"Email already exist"}
        return false
    } catch (error) {
        throw new ApplicationError((''), 500);
    }
}


export const getUserByEmail =  async (email)=>{
    try{
        const users = await User.findOne({where:{email}});
        return users
    }catch(error){
        throw new ApplicationError((''), 500);
    }
    
}