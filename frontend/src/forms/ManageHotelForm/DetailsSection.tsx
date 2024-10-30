import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Thêm khách sạn</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Tên khách sạn
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("name", { required: "Không được để trống" })}
                ></input>
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                )}
            </label>
            <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Thành phố
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("city", { required: "Không được để trống" })}
                    ></input>
                    {errors.city && (
                        <span className="text-red-500">{errors.city.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Quốc gia
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("country", { required: "Không được để trống" })}
                    ></input>
                    {errors.country && (
                        <span className="text-red-500">{errors.country.message}</span>
                    )}
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Mô tả
                <textarea
                    rows={10}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("description", { required: "Không được để trống" })}
                ></textarea>
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Giá mỗi đêm
                <input
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("pricePerNight", { required: "Không được để trống" })}
                ></input>
                {errors.pricePerNight && (
                    <span className="text-red-500">{errors.pricePerNight.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Đánh giá
                <select
                    {...register("starRating", {
                        required: "Không được để trống",
                    })}
                    className="border rounded w-full p-2 text-gray-700 font-normal"
                >
                    <option value="" className="text-sm font-bold">
                        Tùy chọn đánh giá
                    </option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                {errors.starRating && (
                    <span className="text-red-500">{errors.starRating.message}</span>
                )}
            </label>
        </div>

    )
}
export default DetailsSection;