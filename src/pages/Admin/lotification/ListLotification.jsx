import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getDocs, collection, deleteDoc,doc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../components/Loading";
import { db } from "../../../db/firebase-config";

const ListLotification = () => {
	const [lotifications, setLotifications] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { idDepartment, idCity } = useParams();

	const handleDelete = async (id) => {
		try {
			await deleteDoc(doc(db, "prueba",`${idDepartment}`,"ciudades",`${idCity}`,"lotificaciones", id))
			const listItems = lotifications.filter((item) => item.id !== id);
			setLotifications(listItems);
			toast.success("Se elimino la lotificación correctamente");
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(async () => {
		try {
			let isMounted = true;
			let departmentsArr = [];
			const querySnapshot = await getDocs(
				collection(
					db,
					"prueba",
					`${idDepartment}`,
					"ciudades",
					`${idCity}`,
					"lotificaciones"
				)
			);
			querySnapshot.forEach((doc) => {
				departmentsArr.push({ id: doc.id, data: doc.data() });
			});
			setIsLoading(false);
			setLotifications(departmentsArr);
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
					<h2 className="mb-8 font-bold text-2xl">Lista de Lotificaciones</h2>
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
								{lotifications.length ? lotifications.map(({ id, data }) => (
									<tr
										key={id}
										className="text-center border-b odd:bg-white even:bg-gray-50 "
									>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
										>
											{data.name}
										</th>
										<td className="px-6 py-4">
											<Link
												to={`edit/${id}`}
												className="font-medium bg-blue-600 text-white rounded-sm p-2 mr-3"
											>
												<FontAwesomeIcon icon={faPencil} className="" />
											</Link>
											<button
												type="button"
												onClick={() => handleDelete(id)}
												className="font-medium bg-red-600 text-white rounded-sm p-2"
											>
												<FontAwesomeIcon icon={faTrash} />
											</button>
										</td>
									</tr>
								)) 
								:
								<tr>
									<td className="p-3 text-center" colSpan={2}>No tiene lotificaciones</td>
								</tr>
								}
							</tbody>
						</table>
						<Toaster position="top-right" reverseOrder={false} />
					</div>
				</div>
			)}
		</>
	);
};

export default ListLotification;
