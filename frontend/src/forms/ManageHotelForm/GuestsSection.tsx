import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Khách hàng</h2>
            <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
                <label className="text-gray-700 text-sm font-semibold">
                    Người lớn
                    <input
                        className="border rounded w-full py-2 px-3 font-normal"
                        type="number"
                        min={1}
                        {...register("adultCount", {
                            required: "Không được để trống",
                        })}
                    />
                    {errors.adultCount?.message && (
                        <span className="text-red-500 text-sm fold-bold">
                            {errors.adultCount?.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-semibold">
                    Trẻ em
                    <input
                        className="border rounded w-full py-2 px-3 font-normal"
                        type="number"
                        min={0}
                        {...register("childCount", {
                            required: "Không được để trống",
                        })}
                    />
                    {errors.childCount?.message && (
                        <span className="text-red-500 text-sm fold-bold">
                            {errors.childCount?.message}
                        </span>
                    )}
                </label>
            </div>
        </div>
    );
};

export default GuestsSection;
