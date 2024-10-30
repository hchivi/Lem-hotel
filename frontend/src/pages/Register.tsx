import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const { register, watch, handleSubmit, formState: { errors }, } = useForm<RegisterFormData>();
    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message: "Đăng ký thành công", type: "SUCCESS" })
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Tạo tài khoản</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Họ
                    <input className="border rounded w-full py-1 px-2 font-normal"
                        {...register("lastName", { required: "Không được để trống" })}></input>
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}   </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Tên
                    <input className="border rounded w-full py-1 px-2 font-normal"
                        {...register("firstName", { required: "Không được để trống" })}></input>
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}   </span>
                    )}
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    type="email"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email", { required: "Không được để trống" })}
                    autoComplete="username"
                ></input>
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}   </span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Mật khẩu
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password", {
                        required: "Không được để trống", minLength: {
                            value: 6,
                            message: "Mật khẩu phải có ít nhất 6 kí tự trở lên"
                        }
                    })}
                    autoComplete="new-password"
                ></input>
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}   </span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Nhập lại mật khẩu
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) {
                                return "Không được để trống";
                            } else if (watch("password") !== val) {
                                return "Mật khẩu không khớp";
                            }
                        }
                    })}
                    autoComplete="new-password"
                ></input>
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}   </span>
                )}
            </label>
            <span>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#ffac9e", borderRadius: 10, cursor: "pointer", // Thêm con trỏ chuột
                        transition: "background-color 0.3s ease"
                    }}

                    className="text-white p-2 font-bold text-xl"
                    onMouseEnter={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.backgroundColor = "#f08080";
                    }}

                    onMouseLeave={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.backgroundColor = "#ffac9e";
                    }}
                >
                    Đăng ký
                </button>
            </span>
        </form>
    )
}

export default Register;