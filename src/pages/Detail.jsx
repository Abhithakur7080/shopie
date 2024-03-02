import Product from "../components/details/Product";

const Detail = ({ products, setProducts, handleCatagory }) => {
  return (
    <>
      <Product products={products} setProducts={setProducts} handleCatagory={handleCatagory} />
    </>
  );
};

export default Detail;
