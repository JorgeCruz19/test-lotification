import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoute";
import PagesRoute from "./PagesRoute";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/*"
					element={
						<PublicRoute>
							<PagesRoute />
						</PublicRoute>
					}
				></Route>

				<Route
					path="/admin/*"
					element={
						<PrivateRoute>
							<AdminRoutes />
						</PrivateRoute>
					}
				></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
