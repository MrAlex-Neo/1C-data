import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import  UserModel from '../models/User.js';



export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ login: req.body.login });
        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден"
            });
        }

        if (req.body.password !== user.password) {
            return res.status(400).json({
                message: "Неверный пользователь или пароль"
            });
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', { expiresIn: '24h' });

        const {password, ...userData } = user._doc;

        res.json({ ...userData, token });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться",
        });
    }
};

