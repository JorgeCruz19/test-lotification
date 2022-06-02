import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Login from "../pages/Login"
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import DetailLotification from "../components/DetailLotification";
import ListCities from "../components/ListCities";
import ListLotifications from "../components/ListLotifications";
import Error404 from "../pages/Error404";

const PagesRoute = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/department/:department" element={<ListCities />} />
        <Route
          path="/department/:department/city/:city"
          element={<ListLotifications />}
        />
        <Route
          path="/department/:department/city/:city/:lotification/:nameLotification"
          element={<DetailLotification />}
        />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
};

export default PagesRoute;
