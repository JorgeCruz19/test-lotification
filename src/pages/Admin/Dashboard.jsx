import { useEffect, useState } from "react";
import getCount from "../../utils/getCount";

function Dashboard() {
	const [countLotifications, setCountLotifications] = useState(0)

	const countDocs = async () => {
		try {
			const count = await getCount("prueba")
			setCountLotifications(count)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		countDocs()
	}, [])
	


	return (
		<div className="grid grid-cols-12 gap-6">
			<div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200 border-l-8 border-l-slate-900">
				<div className="px-5 pt-5">
					<h2 className="text-lg font-semibold text-slate-800 mb-2">Departamentos</h2>
					<div className="text-xs font-semibold text-slate-400 uppercase mb-1">Cantidad</div>
					<div className="flex items-start">
						<div className="text-4xl font-bold text-slate-800 mr-2">{countLotifications}</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200 border-l-8 border-l-slate-900">
				<div className="px-5 pt-5">
					<h2 className="text-lg font-semibold text-slate-800 mb-2">Usuarios</h2>
					<div className="text-xs font-semibold text-slate-400 uppercase mb-1">Cantidad</div>
					<div className="flex items-start">
						<div className="text-4xl font-bold text-slate-800 mr-2">2</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
