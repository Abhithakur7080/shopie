import Product from "../components/details/Product";

const Detail = ({
  products,
  setProducts,
  handleCatagory,
  viewDetail,
  open,
  setOpen,
  detail,
  setDetail,
  addToCart
}) => {
  return (
    <>
      <Product
        products={products}
        setProducts={setProducts}
        handleCatagory={handleCatagory}
        viewDetail={viewDetail}
        open={open}
        setOpen={setOpen}
        detail={detail}
        setDetail={setDetail}
        addToCart={addToCart}
      />
    </>
  );
};

export default Detail;
