import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../db/firebase-config";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListCities = () => {
	const [departments, setDepartments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { idDepartment } = useParams();
	useEffect(async () => {
		try {
			let isMounted = true;
			let departmentsArr = [];
			const querySnapshot = await getDocs(
				collection(db, "prueba", `${idDepartment}`, "ciudades")
			);
			querySnapshot.forEach((doc) => {
				departmentsArr.push({ id: doc.id, data: doc.data() });
			});
			setIsLoading(false);
			setDepartments(departmentsArr);
			return () => {
				isMounted = false;
			};
		} catch (error) {
			console.log(error);
		}
	}, []);
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="w-full md:w-2/3 mx-auto">
					<h2 className="mb-8 font-bold text-2xl">Lista de Ciudades</h2>
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left text-gray-500 ">
							<thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 ">
								<tr>
									<th scope="col" className="px-6 py-3">
										Nombre
									</th>
									<th scope="col" className="px-6 py-3">
										Opciones
									</th>
								</tr>
							</thead>
							<tbody>
								{departments.map(({ id, data }) => (
									<tr
										key={id}
										className="text-center border-b odd:bg-white even:bg-gray-50 "
									>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
										>
											{data.city}
										</th>
										<td className="px-6 py-4">
											<Link
												to={`edit/${id}`}
												className="font-medium bg-blue-600 text-white rounded-sm p-2 mr-3"
											>
												<FontAwesomeIcon icon={faPencil} className="" />
											</Link>
											<Link
												to="/"
												className="font-medium bg-red-600 text-white rounded-sm p-2"
											>
												<FontAwesomeIcon icon={faTrash} />
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
};

export default ListCities;
