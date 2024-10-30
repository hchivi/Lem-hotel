import { RegisterFormData } from './pages/Register';
import { SignInFormData } from './pages/SignIn';
import { HotelSearchResponse, HotelType } from '../../backend/src/models/hotel';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
//Đăng ký   
export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    const responseBody = await response.json();
    if (!response.ok)
        throw new Error(responseBody.message);
}
//Đăng nhập
export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }
    return body;
}
//Xác minh 
export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    })

    if (!response.ok) throw new Error("Chưa xác thực");

    return response.json();
}
//Đăng xuất
export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    })
    if (!response.ok)
        throw new Error("Đã xảy ra lỗi khi đăng xuất");
}
//Thêm khách sạn
export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });

    if (!response.ok) {
        throw new Error("Thêm khách sạn thất bại");
    }

    return response.json();
};
//Lấy danh sách khách sạn
export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("Lỗi lấy danh sách khách sạn");
    }
    return response.json();
}
//Lấy thông tin khách sạn theo id
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching Hotels");
    }

    return response.json();
};
//Câp nhật thông tin khách sạn theo id
export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(
        `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
        {
            method: "PUT",
            body: hotelFormData,
            credentials: "include",
        })
    if (!response.ok) {
        throw new Error("Error fetching Hotels");
    }
    return response.json();
}

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
};

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility) =>
        queryParams.append("facilities", facility)
    );

    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));

    const response = await fetch(
        `${API_BASE_URL}/api/hotels/search?${queryParams}`
    );
    if (!response.ok) {
        throw new Error("Lỗi");
    }

    return response.json();
}