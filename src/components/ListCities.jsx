import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../db/firebase-config";
import Loading from "./Loading";
import List from "./List";
const ListCities = () => {
	const { department } = useParams();
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(async () => {
		try {
			let cities = [];
			const querySnapshot = await getDocs(
				collection(db, "prueba", `${department}`, "ciudades")
			);
			querySnapshot.forEach((doc) => {
				cities.push({id:doc.id, data:doc.data()});
			});
			setIsLoading(false);
			setCities(cities);
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
			<div className="w-full max-w-screen-xl mx-auto px-6">
				<div
					className="flex justify-center items-center p-4 px-3 py-10"
					style={{ minHeight: "calc(100vh - 146px)" }}
				>
					<div className="w-full max-w-2xl">
						<div className="bg-white shadow-lg rounded-lg px-3 py-2 mb-4">
							<h2 className="block text-gray-700 text-3xl font-semibold py-3 px-2 text-center">
								Elige la ciudad
							</h2>
							{isLoading ? (
								<Loading />
							) : (
								<div className="py-3 text-base flex flex-wrap justify-around">
									{cities.map(({id, data}) => (
										<List
											key={id}
											name={data.city}
											uri={`/department/${department}/city/${id}`}
										/>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ListCities;
