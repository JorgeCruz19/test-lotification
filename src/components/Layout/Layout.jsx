import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<div>
			<Navbar />
			<div className="h-5/6">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
