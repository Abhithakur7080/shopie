import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Detail from "../pages/Detail";

const Rout = ({ products, setProducts, handleCatagory }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/products"
          element={
            <Detail
              products={products}
              setProducts={setProducts}
              handleCatagory={handleCatagory}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Rout;
