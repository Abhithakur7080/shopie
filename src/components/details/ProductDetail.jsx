import { useDispatch, useSelector } from "react-redux";
import { titleCase, icons } from "../../assets";
import {
  cancelProductDetails,
  productSelector,
} from "../../redux/Reducer/ProductReducer";

const ProductDetail = () => {
  const { productDetails } = useSelector(productSelector);
  const dispatch = useDispatch();
  return (
    <div className="w-screen h-screen md:w-full md:h-full z-50 top-0 left-0 fixed bg-black bg-opacity-30 flex items-center justify-center overflow-scroll">
      <div className="mt-[27rem] scale-up-center md:px-10 py-8 w-screen h-fit md:w-4/5 md:h-4/5 overflow-scroll bg-white rounded-md shadow-lg relative">
        <button
          className="ml-[99%] text-2xl absolute top-2 right-2 cursor-pointer z-50 mt-4 md:mt-0"
          onClick={() => dispatch(cancelProductDetails())}
        >
          <icons.RxCross1 />
        </button>
        <div className="max-w-full flex flex-col md:flex-row gap-8 px-8 py-5 mt-5">
          <div className="mt-3 px-5 py-5 min-w-72 max-w-96 max-h-96 bg-neutral-200 flex justify-center rounded-md">
            <img
              src={productDetails.image}
              alt={productDetails.title}
              className="max-w-full max-h-full"
            />
          </div>
          <div className="mt-3">
            <h4 className="uppercase text-neutral-500 font-extralight">
              {titleCase(productDetails.category)}
            </h4>
            <h2 className="mt-5 text-3xl capitalize font-semibold">
              {productDetails.title}
            </h2>
            <p className="mt-5 text-neutral-700">
              {productDetails.description}
            </p>
            <h3 className="mt-3 text-4xl text-blue-500 font-semibold">
              ${productDetails.price}
            </h3>
            <button className="mt-8 px-14 py-4 bg-black rounded-sm text-white hover:bg-blue-500">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductDetail };
