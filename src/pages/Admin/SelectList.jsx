import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../db/firebase-config";
import Loading from "../../components/Loading";

const SelectList = ({ title, url, handleChange }) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	let id = `select-${title}`;
	let label = title.charAt(0).toUpperCase() + title.slice(1);

	useEffect(async () => {
		try {
			let isMounted = true;
			let dataArr = [];
			const querySnapshot = await getDocs(collection(db, url));
			querySnapshot.forEach((doc) => {
				dataArr.push({ id: doc.id, data: doc.data() });
			});
			setData(dataArr);
			setIsLoading(false);
			return () => {
				isMounted = false;
			};
		} catch (error) {
			console.log(error);
		}
	}, [url]);

	return (
		<>
			<div className="mb-6">
				<label
					htmlFor="countries"
					className="block mb-2 text-sm font-medium text-gray-900"
				>
					{label}:
				</label>
				{isLoading ? (
					<Loading />
				) : (
					<select
						name={id}
						id={id}
						onChange={handleChange}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
					>
						<option value="">
							Elige un{`${title == "ciudad" ? "a" : ""}`} {title}
						</option>
						{data &&
							data.map(({ id, data }) => (
								<option key={id} value={id}>
									{data.deparment || data.city || data.name}
								</option>
							))}
					</select>
				)}
			</div>
		</>
	);
};

export default SelectList;
