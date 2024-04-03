import { Routes, Route } from "react-router-dom";
//all pages
import Homepage from "../pages/Homepage";
import Detail from "../pages/Detail";
import Cartpage from "../pages/Cartpage";
import Contactpage from "../pages/Contactpage";
import Aboutpage from "../pages/Aboutpage";
import Loginpage from "../pages/Loginpage";
import Signuppage from "../pages/Signuppage";
import Orderpage from "../pages/Orderpage";
import Errorpage from "../pages/Errorpage";
//protected routes
import ProtectedRoute from "../components/ProtectedRoute";

const Rout = () => {
  return (
    <div className="mt-60 md:mt-52 relative">
      {/* all the routes defined for the app */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Detail />} />
        {/* here two protected routes */}
        <Route
          path={"/cart"}
          element={
            <ProtectedRoute>
              <Cartpage />
            </ProtectedRoute>
          }
          errorElement={<Errorpage />}
        />
        <Route
          path={"/order"}
          element={
            <ProtectedRoute>
              <Orderpage />
            </ProtectedRoute>
          }
          errorElement={<Errorpage />}
        />
        {/* about or some information */}
        <Route path={"/contact"} element={<Contactpage />} />
        <Route path={"/about"} element={<Aboutpage />} />
        <Route path={"/login"} element={<Loginpage />} />
        <Route path={"/signup"} element={<Signuppage />} />
        {/* error handling */}
        <Route
          path={"*"}
          errorElement={<Errorpage />}
          element={<Errorpage />}
        />
      </Routes>
    </div>
  );
};

export default Rout;
