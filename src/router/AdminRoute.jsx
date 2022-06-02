import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import Dashboard from "../pages/Admin/Dashboard";
import CreateDepartment from "../pages/Admin/deparment/CreateDepartment";
import ListDepartment from "../pages/Admin/deparment/ListDepartment";
import EditDepartment from "../pages/Admin/deparment/EditDepartment";
import CreateCity from "../pages/Admin/city/CreateCity";
import ListDepartments from "../pages/Admin/city/ListDepartments";
import EditCity from "../pages/Admin/city/EditCity";
import ListCities from "../pages/Admin/city/ListCities";
import CreateUser from "../pages/Admin/user/CreateUser";
import LotificationCreate from "../pages/Admin/lotification/LotificationCreate";
import ChooseItem from "../pages/Admin/lotification/ChooseItem";
import ListLotification from "../pages/Admin/lotification/ListLotification";
import EditLotification from "../pages/Admin/lotification/EditLotification";
import BlockCreate from "../pages/Admin/block/BlockCreate";
import ChooseItemBlock from "../pages/Admin/block/ChooseItemBlock";
import ListBlocks from "../pages/Admin/block/ListBlocks";
import EditBlock from "../pages/Admin/block/EditBlock";

const AdminRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Admin />}>
				{/* Department */}
				<Route index path="dashboard" element={<Dashboard />} />
				<Route path="deparment" element={<ListDepartment />} />
				<Route path="deparment/create" element={<CreateDepartment />} />
				<Route path="deparment/edit/:deparment" element={<EditDepartment />} />
				{/* City */}
				<Route path="city" element={<ListDepartments />} />
				<Route path="city/:idDepartment" element={<ListCities />} />
				<Route path="city/create" element={<CreateCity />} />
				<Route path="city/:idDepartment/edit/:city" element={<EditCity />} />
				{/* Lotification */}
				<Route path="lotification" element={<ChooseItem />} />
				<Route
					path="lotification/:idDepartment/:idCity"
					element={<ListLotification />}
				/>
				<Route
					path="lotification/:idDepartment/:idCity/edit/:idLotification"
					element={<EditLotification />}
				/>
				<Route path="lotification/create" element={<LotificationCreate />} />
				{/* Blocks */}
				<Route path="block" element={<ChooseItemBlock />} />
				<Route path="block/create" element={<BlockCreate />} />
				<Route
					path="block/:idDepartment/:idCity/:idLotification"
					element={<ListBlocks />}
				/>
				<Route
					path="block/:idDepartment/:idCity/:idLotification/edit/:idBlock"
					element={<EditBlock />}
				/>

				<Route path="user/create" element={<CreateUser />} />
			</Route>
		</Routes>
	);
};

export default AdminRoutes;
