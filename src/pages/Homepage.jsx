import {
  Banner1,
  Banner,
  About,
  ProductType,
  Products,
} from "../components/home";

const Homepage = ({ open, setOpen, detail, setDetail, viewDetail, addToCart }) => {
  return (
    <>
      <Banner />
      <ProductType />
      <About />
      <Products
        open={open}
        setOpen={setOpen}
        detail={detail}
        setDetail={setDetail}
        viewDetail={viewDetail}
        addToCart={addToCart}
      />
      <Banner1 />
    </>
  );
};

export default Homepage;
