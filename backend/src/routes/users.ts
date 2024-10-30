import express, { Request, Response } from "express";
import User from "../models/user"
import jwt from "jsonwebtoken";
const router = express.Router()
import { check, validationResult } from "express-validator";
// /api/users/register
router.post("/register", [
    check("firstName", "Vui lòng nhập tên").isString(),
    check("lastName", "Vui lòng nhập họ").isString(),
    check("email", "Vui lòng nhập email").isEmail(),
    check("password", "Yêu cầu mật khẩu có 6 kí tự trở lên").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }
    try {
        let user = await User.findOne({
            email: req.body.email,
        })
        if (user) {
            return res.status(400).json({ message: "Tài khoản đã tồn tại" })
        }
        user = new User(req.body)
        await user.save();
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        }
        );
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        return res.status(200).send({ message: "OK" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Đã xảy ra lỗi" })
    }
})
export default router;