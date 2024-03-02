import "./App.css";
import { productData } from "./assets";
import Rout from "./routes/Rout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState(productData);
  const navigate = useNavigate()
  const sortedProduct = (product) => {
    const searchedProduct = productData.filter((item) => item.title.toLowerCase().includes(product.toLowerCase()) || item.category === product.toLowerCase());
    if (product === "") {
      setProducts(productData);
      return;
    }
    setProducts(searchedProduct)
    navigate('/products')
  };
  return (
    <>
      <Navbar handleSearch={sortedProduct}/>
      <Rout products={products} setProducts={setProducts} handleCatagory={sortedProduct}/>
      <Footer />
    </>
  );
};

export default App;
