import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
const MyHotels = () => {
    const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
        onError: () => {

        }
    });
    if (!hotelData) {
        return <span>Không tìm thấy khách sạn</span>;
    }
    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">Các khách sạn</h1>
                <Link
                    style={{
                        backgroundColor: "#ffac9e", borderRadius: 10, cursor: "pointer", // Thêm con trỏ chuột
                        transition: "background-color 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.backgroundColor = "#f08080";
                    }}

                    onMouseLeave={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.backgroundColor = "#ffac9e";
                    }}
                    to="/add-hotel"

                    className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                >
                    Thêm khách sạn
                </Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {hotelData.map((hotel) => (
                    <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
                        <h2 className="text-2xl font-bold">{hotel.name}</h2>
                        <div className="whitespace-pre-line">{hotel.description}</div>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsMap className="mr-1" />
                                {hotel.city}, {hotel.country}
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsBuilding className="mr-1" />
                                {hotel.type}
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiMoney className="mr-1" /> {hotel.pricePerNight}VND/đêm
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiHotel className="mr-1" />
                                {hotel.adultCount} người lớn, {hotel.childCount} trẻ em
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiStar className="mr-1" />
                                {hotel.starRating} Sao
                            </div>
                        </div>
                        <span className="flex justify-end">
                            <Link
                                style={{
                                    backgroundColor: "#ffac9e", borderRadius: 10, cursor: "pointer", // Thêm con trỏ chuột
                                    transition: "background-color 0.3s ease"
                                }}
                                onMouseEnter={(e) => {
                                    const target = e.target as HTMLElement;
                                    target.style.backgroundColor = "#f08080";
                                }}

                                onMouseLeave={(e) => {
                                    const target = e.target as HTMLElement;
                                    target.style.backgroundColor = "#ffac9e";
                                }}
                                to={`/edit-hotel/${hotel._id}`}
                                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                            >
                                Xem chi tiết
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default MyHotels;