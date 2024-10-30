import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ message: "Đăng nhập thành công", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken")
            navigate("/")
        }, onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold"></h2>
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
            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Bạn chưa có tài khoản? <Link className="underline" to="/register">Đăng ký tài khoản</Link>
                </span>
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
                    Đăng nhập
                </button>
            </span>
        </form>
    )
}

export default SignIn;