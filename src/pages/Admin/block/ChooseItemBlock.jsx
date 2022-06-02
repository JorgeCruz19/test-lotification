import { useState } from "react";
import SelectList from "../SelectList";
import { Link } from "react-router-dom";

const ChooseItemBlock = () => {
	const [department, setDepartment] = useState("");
	const [city, setCity] = useState("");
	const [lotification, setLotification] = useState("");
	return (
		<>
			<div className="w-full md:w-2/3 mx-auto">
				<h2 className="mb-8 font-bold text-2xl">
					Elije el departamento, ciudad y lotificacion
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
					<SelectList
						title="lotificación"
						url={`prueba/${department}/ciudades/${city}/lotificaciones`}
						handleChange={(e) => {
							setLotification(e.target.value);
						}}
					/>
				)}
				{lotification && (
					<>
						<Link
							to={`${department}/${city}/${lotification}`}
							className={`text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center`}
						>
							Ver bloques
						</Link>
					</>
				)}
			</div>
		</>
	);
};

export default ChooseItemBlock;
