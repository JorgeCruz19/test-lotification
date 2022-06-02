import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../db/firebase-config";
import Loading from "../components/Loading";
import MapaHonduras from "../components/svg/MapaHonduras.jsx";

const Home = () => {
	const [departments, setDepartments] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(async () => {
		try {
			let departments = [];
			const querySnapshot = await getDocs(collection(db, "prueba"));
			querySnapshot.forEach((doc) => {
				departments.push({ id: doc.id, data: doc.data() });
			});
			const result = departments.reduce(
				(obj, cur) => ({
					...obj,
					[cur.data.deparment.replace(/\s/g, "")]: {
						id: cur.id,
						name: cur.data.deparment,
					},
				}),
				{}
			);
			setIsLoading(false);
			setDepartments(result);
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div className="w-full max-w-screen-xl mx-auto px-6">
			<div
				className="flex justify-center items-center py-10"
				style={{ minHeight: "calc(100vh - 146px)" }}
			>
				<div className="w-full max-w-full">
					<div className="py-2 mb-4">
						<h2 className="block text-gray-700 text-3xl md:text-4xl font-bold pt-3 px-2 text-center">
							Selecciona el departamento
						</h2>
						{isLoading ? (
							<Loading />
						) : (
							<>
								<MapaHonduras data={departments} />
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
