import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

//Thêm khách sạn
router.post("/",
    verifyToken, [
    body("name").notEmpty().withMessage("Tên không được để trống"),
    body("city").notEmpty().withMessage("Thành phố không được để trống"),
    body("country").notEmpty().withMessage("Tên quốc gia không được để trống"),
    body("description").notEmpty().withMessage("Miêu tả không được để trống"),
    body("type").notEmpty().withMessage("Loại khách sạn không được để trống"),
    body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Giá không được để trống và phải là số"),
    body("facilities").notEmpty().isArray().withMessage("CSVC không được để trống"),
],
    upload.array("imageFiles", 6), async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;
            const uploadPromises = imageFiles.map(async (image) => {
                const b64 = Buffer.from(image.buffer).toString("base64")
                let dataURI = "data:" + image.mimetype + ";base64," + b64;
                const res = await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
            })
            const imageUrls = await Promise.all(uploadPromises);
            newHotel.imageUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;
            const hotel = new Hotel(newHotel);
            await hotel.save();
            res.status(201).send(hotel);
        } catch (e) {
            console.log("Lỗi tạo khách sạn: ", e);
            res.status(500).json({ message: "Có lỗi xảy ra khi tạo khách sạn" });
        }
    })
//Lấy danh sách khách sạn
router.get("/", verifyToken, async (req: Request, res: Response) => {

    try {
        const hotels = await Hotel.find({ userId: req.userId });
        res.json(hotels)
    } catch (error) {
        res.status(500).json({ message: "Có lỗi xảy ra khi lấy danh sách khách sạn" })
    }
});
//Sửa thông tin khách sạn
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({
            _id: id,
            userId: req.userId,
        });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Lỗi" });
    }
});

//Cap nhat khach san
router.put(
    "/:hotelId",
    verifyToken,
    upload.array("imageFiles"),
    async (req: Request, res: Response) => {
        try {
            const updatedHotel: HotelType = req.body;
            updatedHotel.lastUpdated = new Date();

            const hotel = await Hotel.findOneAndUpdate(
                {
                    _id: req.params.hotelId,
                    userId: req.userId,
                },
                updatedHotel,
                { new: true }
            );

            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found" });
            }

            const files = req.files as Express.Multer.File[];
            const updatedImageUrls = await uploadImages(files);

            hotel.imageUrls = [
                ...updatedImageUrls,
                ...(updatedHotel.imageUrls || []),
            ];

            await hotel.save();
            res.status(201).json(hotel);
        } catch (error) {
            res.status(500).json({ message: "Something went throw" });
        }
    }

);

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;