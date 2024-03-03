import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();

import { loginValidation, CollectCreateValidation } from "./validations.js";
import { UserController, CollectController } from "./controllers/index.js";
import checkAuth from "./utils/checkAuth.js";


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express()

const port = process.env.PORT || 4444;

app.use(express.json());
app.use(cors());

app.post('/auth/login', loginValidation, UserController.login)
app.get('/auth/me', checkAuth , UserController.getMe)

app.post('/collect', CollectCreateValidation, CollectController.create)
app.delete('/collect/:id', CollectController.remove)
app.patch('/collect/:id', CollectCreateValidation, CollectController.update)
app.get('/collect', CollectController.getAll)
app.get('/collect/:id', CollectController.getOne)


app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    };
    console.log(`The server is running on the port: ${port}`);
})



