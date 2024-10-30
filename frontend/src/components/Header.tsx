import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-pink-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">LemBookings.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? <>
                        <Link className="flex items-center text-white px-3 font-bold hover:bg-black rounded-lg"
                            to="/my-bookings">Đặt phòng của tôi</Link>
                        <Link className="flex items-center text-white px-3 font-bold hover:bg-black rounded-lg"
                            to="/my-hotels">Khách sạn của tôi</Link>
                        <SignOutButton />
                    </> : <Link to="/sign-in" className="flex items-center text-white px-3 font-bold hover:bg-black rounded-lg"
                    >Đăng nhập</Link>}

                </span>
            </div>
        </div>
    )
}
export default Header;