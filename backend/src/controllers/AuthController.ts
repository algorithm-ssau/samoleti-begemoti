import { Request, Response } from "express";
import { UserController } from "../controllers/index";
import { User } from "../types/user_type";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwt_access, ACCESS_EXPIRES_IN } from "../config";

export class AuthController{
    async register(req: Request, res: Response){
        try{
            const email = req.body.login;
            const password = req.body.password;

            if(await UserController.getOneByKey("email", email)){
                return res.status(403).json({
                    message: "Пользователь с такой почтой уже существует"
                })
            }
            else{
                const passwordHash = bcrypt.hashSync(password, 7);
                await UserController.create_({email: email, passwordHash: passwordHash});
                let user = await UserController.getOneByKey("email", email);
                res.status(200).json({
                    token: jwt.sign({
                        user_id: (user as User)._id,
                        email: (user as User).email
                    },
                    jwt_access,
                    {expiresIn: ACCESS_EXPIRES_IN}
                    )
                });
                
            };

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Что-то пошло не так..."
            });
        }
    }

    async login(req: Request, res: Response){
        try {
            const email = req.body.login;
            const password = req.body.password;
            let user = await UserController.getOneByKey("email", email);
            if(!user || !bcrypt.compareSync(password, user.passwordHash)){
                return res.status(401).json({
                    message: "Неверный логин и/или пароль"
                });
            }
            res.status(200).json({
                token: jwt.sign({
                    user_id: (user as User)._id,
                    email: (user as User).email
                },
                jwt_access,
                {expiresIn: ACCESS_EXPIRES_IN}
                )
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Что-то пошло не так..."
            });
        }
    }

    async logout(req: Request, res: Response){
        try {
                res.status(200).send();
        } catch (error){
            console.log(error)
            res.status(500).json({
                message: "Что-то пошло не так..."
            });
        }
    }
}