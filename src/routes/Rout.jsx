import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Detail from "../pages/Detail";
import Cartpage from '../pages/Cartpage'
import Contactpage from '../pages/Contactpage'
import Aboutpage from "../pages/Aboutpage";
import Loginpage from "../pages/Loginpage";
import Signuppage from "../pages/Signuppage";

const Rout = ({
  products,
  setProducts,
  handleCatagory,
  open,
  setOpen,
  detail,
  setDetail,
  viewDetail,
  cart,
  setCart,
  addToCart,
}) => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              open={open}
              setOpen={setOpen}
              detail={detail}
              setDetail={setDetail}
              viewDetail={viewDetail}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/products"
          element={
            <Detail
              products={products}
              setProducts={setProducts}
              handleCatagory={handleCatagory}
              open={open}
              setOpen={setOpen}
              detail={detail}
              setDetail={setDetail}
              viewDetail={viewDetail}
              addToCart={addToCart}
            />
          }
        />
        <Route path={'/cart'} element={<Cartpage cart={cart} setCart={setCart}/>}/>
        <Route path={'/contact'} element={<Contactpage/>}/>
        <Route path={'/about'} element={<Aboutpage/>}/>
        <Route path={'/login'} element={<Loginpage/>}/>
        <Route path={'/signup'} element={<Signuppage/>}/>
      </Routes>
    </>
  );
};

export default Rout;
