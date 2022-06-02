import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Admin = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	let navigate = useNavigate();

	useEffect(() => {
		let authToken = sessionStorage.getItem("user");
		if (authToken) {
			navigate("/admin/dashboard");
		}

		if (!authToken) {
			navigate("/login");
		}
	}, []);
	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<main>
					<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default Admin;
