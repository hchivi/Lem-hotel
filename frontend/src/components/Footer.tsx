const Footer = () => {
    return (
        <div className="bg-pink-800 py-10">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    LemBookings.com
                </span>
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer">Chính sách bảo mật</p>
                    <p className="cursor-pointer">Điều khoản dịch vụ</p>
                </span>
            </div>
        </div>
    )
}

export default Footer;