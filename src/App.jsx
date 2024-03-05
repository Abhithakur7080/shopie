import "./App.css";
import { productData } from "./assets";
import Rout from "./routes/Rout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'

const App = () => {
  const [products, setProducts] = useState(productData);

  //product details
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState([]);

  //cart
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();
  const sortedProduct = (product) => {
    const searchedProduct = productData.filter(
      (item) =>
        item.title.toLowerCase().includes(product.toLowerCase()) ||
        item.category === product.toLowerCase()
    );
    if (product === "") {
      setProducts(productData);
      return;
    }
    setProducts(searchedProduct);
    navigate("/products");
  };

  const viewDetail = (product) => {
    setDetail([{ ...product }]);
    setOpen(true);
  };
  const addToCart = (product)=>{
    const exist = cart.find((item)=> item.id===product.id)
    if(exist){
      toast.error("Item already in cart")
    } else {
      setCart([...cart, {...product, qty: 1}]);
      toast.success("Item added to cart successfully")
    }
  }
  
  return (
    <>
      <Navbar handleSearch={sortedProduct} />
      <Rout
        products={products}
        setProducts={setProducts}
        handleCatagory={sortedProduct}
        open={open}
        setOpen={setOpen}
        detail={detail}
        setDetail={setDetail}
        viewDetail={viewDetail}
        cart={cart}
        setCart={setCart}
        addToCart={addToCart}
      />
      <Footer />
    </>
  );
};

export default App;
