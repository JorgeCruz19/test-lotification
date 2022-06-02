import { useState } from "react";
import SelectList from "../SelectList";
import { Link } from "react-router-dom";

const ChooseItem = () => {
	const [department, setDepartment] = useState("");
	const [city, setCity] = useState("");
	return (
		<>
			<div className="w-full md:w-2/3 mx-auto">
				<h2 className="mb-8 font-bold text-2xl">
					Elije el departamento y ciudad para ver el listado de lotificaciones
				</h2>

				<SelectList
					title="departamento"
					url="prueba"
					handleChange={(e) => {
						setDepartment(e.target.value);
					}}
				/>
				{department && (
					<SelectList
						title="ciudad"
						url={`prueba/${department}/ciudades`}
						handleChange={(e) => {
							setCity(e.target.value);
						}}
					/>
				)}
				{city && (
					<>
						<Link
							to={`${department}/${city}`}
							className={`text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center`}
						>
							Ver lotificaciones
						</Link>
					</>
				)}
			</div>
		</>
	);
};

export default ChooseItem;
