import {User} from "../models"
import 'express-async-errors';
import notFoundError from '../utls/Errors/NotfoundError';
import badRequestError from '../utls/Errors/badRequestError';
import ApplicationError from "../utls/Errors/applicationError";
import AuthorizationError from "../utls/Errors/authorizationError"
import {
    hashPassword,
    generateToken,
    verifyToken,
    comparePassword
}from "../utls/auth"
import {
  getUser,
  getUserByEmail
} from '../services/userServices';
import sendEmail from "../helper/sendEmail";

export const signUpManager = async (req, res) => {
  
  try {
    const userExist = await getUser(req.body);
    if(userExist.exist){
       throw new badRequestError((userExist.message))
    }
    const password = hashPassword(req.body.password);
    const user = await User.create({...req.body,password});
    res.status(201).json({ User,message:"Acount Created"});
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
};

export const signUpWithGoogle = async (req, res) => {
  try {
    const userExist = await getUser(req.body);
    if(userExist.exist){
       throw new badRequestError((userExist.message))
    }
    const user = await User.create(req.body);
    res.status(201).json({ user,message:"Acount Created"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error:error.message });
  }
};


export const login = async (req,res,next)=>{
    
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (user === null) {
        throw new notFoundError((`You don't have an account with this email: ${email}`), 404);
    }

    const result = comparePassword(password, user.password);

    if (!result) throw new badRequestError(('Incorrect credentials'), 400);

    try {

        const userToken = await generateToken({email:user.email,userName:user.userName});

        res.cookie('Login_Token', userToken,{
            httpOnly: true, 
            path: '/',
            sameSite: "strict"
        });

        return res.status(200).json({
            status: 200,
            message: 'login successful',
            token: userToken
        });
    } catch (err) {
      
        next(err);
    }
}

export const logout = async (req, res, next) => {
    try {
      res.clearCookie('Login_Token', { path: '/' });
  
      res.status(200).json({ status: 200, message: ('Logout successful!') });

    } catch (error) {
        next(error)
    }
};


export const sendResetPasswordEmail = async (req, res, next) => {

    try {
      const { email } = req.body;
      const user = await getUserByEmail(email);
      if (!user) return res.status(404).json({ status: 404, error: 'User not found' });
     
      const resetToken = generateToken({email:user.email,userName:user.userName});
  
      const userInfo = {
        email: email,
        subject: 'Reset your password',
        body: `<p>Hi, you requested to reset your password on AMALITECH COVID APP, Click on the link below to enter new password.</p> <br> <a href=${process.env.FRONT_END}/rest_password?token=${resetToken}><b>Reset password Link</b></a>`
      };
  
      const sentEmail = await sendEmail(userInfo)
  
      if(sentEmail){
        return res.status(200).json({ status: 200, message: 'Please check your email to reset your password' });
  
      }else{
        throw new ApplicationError("Failed to send the reset email, please try again!", 500);
      }
  
    } catch (error) {
      next(error);
    }
  };


export const verifyResetPassword = async (req, res, next) => {
    try {
        const { token } = req.query;

        const { password, confirmPassword } = req.body;
    
        const decodedToken = await verifyToken(token);
        if (decodedToken.email === undefined) throw new AuthorizationError(('Invalid Token'));
        
        if (password !== confirmPassword) throw new badRequestError(('Passwords do not match'));

        const record = await getUserByEmail(decodedToken.email);
        
        if (!record) throw new notFoundError(('Account does not exist'));
        const newPassword = hashPassword(password);
        
        const updatePassword = await User.update( {password:newPassword},{ where: { email:decodedToken.email} });
        return res.status(200).json({ status: 200, message: ('Password reset successfully') });
      
    } catch (err) { 
        next(err)
     }
  };

