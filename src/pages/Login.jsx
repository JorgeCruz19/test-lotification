import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../auth/authContext";
import { types } from "../types/types";

import Fondo from "../assets/fondo.jpg";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Ingrese un email válido")
		.required("El campo correo electrónico es obligatorio"),
	password: yup.string().required("El campo contraseña es obligatorio"),
});

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const navigate = useNavigate();
	const { dispatch } = useContext(AuthContext);

	const onSubmit = async (data) => {
		try {
			const { email, password } = data;
			const authentication = getAuth();
			const res = await signInWithEmailAndPassword(
				authentication,
				email,
				password
			);
			const { email: userEmail } = res.user;
			const action = {
				type: types.login,
				payload: { AuthToken: res._tokenResponse.refreshToken, userEmail },
			};
			dispatch(action);
			navigate("/admin/dashboard");
			sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
		} catch (error) {
			if (error.code == "auth/wrong-password") {
				toast.error("Contraseña incorrecta");
			}
			if (error.code === "auth/user-not-found") {
				toast.error("Correo eléctronico no válido");
			}
		}
	};

	return (
		<section className="flex flex-col md:flex-row h-screen items-center">
			<div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
				<img src={Fondo} alt="" className="w-full h-full object-cover" />
			</div>

			<div
				className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
			>
				<div className="w-full h-100">
					<h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
						Iniciar Sesión
					</h1>

					<form onSubmit={handleSubmit(onSubmit)} className="mt-6">
						<div>
							<label htmlFor="email" className="block text-gray-700">
								Correo Electrónico
							</label>
							<input
								{...register("email")}
								id="email"
								type="email"
								name="email"
								placeholder="Ingresa un correo electrónico"
								className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none ${
									errors.email &&
									"bg-red-50 border border-red-500 outline-none text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
								}`}
								autoFocus
								autoComplete="true"
							/>
							{errors.email && (
								<p className="mt-2 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>

						<div className="mt-4">
							<label htmlFor="password" className="block text-gray-700">
								Contraseña
							</label>
							<input
								{...register("password")}
								id="password"
								type="password"
								name="password"
								placeholder="Ingresa la contraseña"
								minLength="6"
								className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none ${
									errors.password &&
									"bg-red-50 border border-red-500 outline-none text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
								}`}
							/>
							{errors.password && (
								<p className="mt-2 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
						>
							Iniciar sesión
						</button>
						<Toaster position="top-right" reverseOrder={false} />
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
