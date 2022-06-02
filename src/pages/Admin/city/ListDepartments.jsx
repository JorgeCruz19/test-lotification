import { useEffect, useState, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../db/firebase-config";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
const ListDepartments = () => {
	const [departments, setDepartments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(async () => {
		try {
			let isMounted = true;
			let departmentsArr = [];
			const querySnapshot = await getDocs(collection(db, "prueba"));
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
					<h2 className="mb-8 font-bold text-2xl">
						Elige el departamento para ver las ciudades
					</h2>
					<div className="flex items-center justify-evenly flex-wrap">
						{departments.map(({ id, data }) => (
							<Link
								to={`${id}`}
								key={id}
								className="mr-3 px-4 mb-6 py-2 rounded-full text-white bg-slate-800 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease hover:scale-90 hover:text-white"
							>
								<h3>{data.deparment}</h3>
							</Link>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default ListDepartments;
