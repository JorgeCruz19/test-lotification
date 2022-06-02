import { useEffect, useState, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { getDocs, doc, collection } from "firebase/firestore";
import { db } from "../db/firebase-config";
import Loading from "./Loading";

function loadComponent(name) {
	const Component = lazy(() => import(`./svg/${name}.jsx`));
	return Component;
}

const DetailLotification = () => {
	const { department, city, lotification, nameLotification } = useParams();
	const [lote, setLotes] = useState([]);
	const [name, setName] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const Component = loadComponent(name);

	useEffect(async () => {
		try {
			let blocksArr = [];
			const querySnapshot = await getDocs(
				collection(
					db,
					"prueba",
					`${department}`,
					"ciudades",
					`${city}`,
					"lotificaciones",
					`${lotification}`,
					"blocks"
				)
			);
			querySnapshot.forEach((doc) => {
				blocksArr.push(doc.data());
			});

			const result = blocksArr.reduce(
				(obj, cur) => ({ ...obj, [cur.code]: cur.status }),
				{}
			);
			setLotes(result);
			setIsLoading(false);
			const words = nameLotification.split(" ");
			for (let i = 0; i < words.length; i++) {
				words[i] = words[i][0].toUpperCase() + words[i].substring(1);
			}
			const newNameLotification = words.join(" ").replace(/ /g, "");
			setName(newNameLotification);
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div
			className="w-full max-w-screen-xl mx-auto px-6 py-7"
			style={{ minHeight: "calc(100vh - 146px)" }}
		>
			<h2 className="font-bold text-center mb-5 text-2xl md:text-5xl capitalize">
				Lotificación {nameLotification}
			</h2>
			<div className="flex flex-wrap items-start gap-3">
				<div className="grow-[3] order-2 lg:order-1 bg-white p-4">
					{isLoading ? (
						<Loading />
					) : (
						<div className="py-3 text-sm">
							<Suspense fallback={<Loading />}>
								<p className="font-semibold">Plano:</p>
								<Component lote={lote} />
							</Suspense>
						</div>
					)}
				</div>
				<div className="grow-1 w-full lg:w-auto order-1 lg:order-2 bg-white p-4 rounded  border">
					<div className="">
						<p className="font-semibold">Información de los lotes</p>
						<div className="flex justify-start items-center text-gray-700 rounded-md px-2 py-2 my-2">
							<span className="bg-white border-2 shadow-sm h-3 w-3 m-2 rounded-full"></span>
							<p className="flex-grow font-semibold px-2 capitalize">
								Disponible
							</p>
						</div>
						<div className="flex justify-start items-center text-gray-700 rounded-md px-2 py-2 my-2">
							<span className="bg-green-500 shadow-sm h-3 w-3 m-2 rounded-full"></span>
							<p className="flex-grow font-semibold px-2 capitalize">Vendido</p>
						</div>
						<div className="flex justify-start items-center text-gray-700 rounded-md px-2 py-2 my-2">
							<span className="bg-red-500 shadow-sm h-3 w-3 m-2 rounded-full"></span>
							<p className="flex-grow font-semibold px-2 capitalize">
								Cancelado
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailLotification;
