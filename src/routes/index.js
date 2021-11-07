import express from 'express';
import authRoutes from "./api/authRoutes"

const routes = express.Router();


routes.use('/auth', authRoutes);


export default routes;