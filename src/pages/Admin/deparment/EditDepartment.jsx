import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../db/firebase-config";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
	name: yup
		.string()
		.matches(/^[a-z A-Z áãâäàéêëèíîïìóõôöòúûüùçñ]+$/, {
			message: "Ingresa un nombre válido",
			excludeEmptyString: true,
		})
		.required("El campo nombre es obligatorio"),
});

const EditDepartment = () => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { deparment: departmentParams } = useParams();
	const [loading, setLoading] = useState(false);

	useEffect(async () => {
		const fields = ["name"];
		const docRef = doc(db, "prueba", `${departmentParams}`);
		const docSnap = await getDoc(docRef);
		const { deparment } = docSnap.data();
		fields.forEach((field) => setValue(field, deparment));
	}, []);

	const onSubmit = async (data) => {
		const { name } = data;
		setLoading(true);
		await updateDoc(doc(db, "prueba", `${departmentParams}`), {
			deparment: name,
		});
		setLoading(false);
		toast.success("Se actualizó el departamento correctamente");
	};

	return (
		<div className="w-full md:w-2/3 mx-auto">
			<h2 className="mb-8 font-bold text-2xl">Editar Departamento</h2>
			<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
				<div className="mb-6">
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-gray-900 "
					>
						Deparmento:{" "}
						<span className="text-red-600 font-bold text-base">*</span>
					</label>
					<input
						{...register("name")}
						id="name"
						name="name"
						className={`bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
							errors.name &&
							"bg-red-50 border border-red-500 outline-none text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
						}`}
						placeholder="Ingresa el nombre del departamento"
					/>
					{errors.name && (
						<p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
					)}
				</div>
				<button
					type="submit"
					className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ${
						loading && "bg-blue-400 cursor-not-allowed"
					}`}
					disabled={loading ? true : false}
				>
					{loading ? (
						<>
							<svg
								role="status"
								className="inline w-4 h-4 mr-3 text-white animate-spin"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="#E5E7EB"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentColor"
								/>
							</svg>
							Loading...
						</>
					) : (
						"Actualizar"
					)}
				</button>
				<Toaster position="top-right" reverseOrder={false} />
			</form>
		</div>
	);
};

export default EditDepartment;
