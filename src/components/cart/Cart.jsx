import { Link, Navigate } from "react-router-dom";
import { icons } from "../../assets";
import { useFirebase } from "../../config/firebaseinit";

const Cart = ({ cart, setCart }) => {
  const { user } = useFirebase();
  if(!user){
    return <Navigate to={"/login"} replace/>
  }
  //increase quantity
  const increment = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
      )
    );
  };
  const remove = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    console.log(exist, exist.qty);
    if (exist.qty > 0) {
      setCart(cart.filter((item) => item.id !== product.id));
    }
  };
  const decrement = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    setCart(
      cart.map((item) => {
        if (item.id === product.id) {
          return { ...exist, qty: exist.qty > 1 ? exist.qty - 1 : exist.qty };
        } else {
          return item;
        }
      })
    );
  };
  const TotalPrice = cart
    .reduce((price, item) => price + item.qty * item.price, 0)
    .toFixed(2);
  return (
    <div className="md:px-14 md:py-10 w-full">
      {cart.length === 0 && (
        <div className="w-full flex items-center flex-col py-5">
          <h1 className="text-9xl text-neutral-500">
            <icons.GiShoppingCart />
          </h1>
          <h2 className="text-lg font-normal">Your Cart is Empty.</h2>
          <Link
            className="mt-5 flex items-center gap-2 text-lg px-5 py-3 bg-black text-white rounded-md hover:bg-blue-500"
            to={"/products"}
          >
            Shop Now <icons.BsArrowRight />
          </Link>
        </div>
      )}
      <div className="max-w-full md:px-8 py-5 flex gap-3 flex-col">
        {cart.length !== 0 && (
          <h2 className="text-blue-500 uppercase mb-4 text-xl md:text-4xl font-bold flex justify-center gap-3">
            <icons.GiShoppingCart /> Your cart
          </h2>
        )}
        {cart.map((item) => (
          <div
            key={item.id}
            className="md:px-8 px-3 py-5 flex bg-blue-50 gap-3 md:gap-16 rounded-md relative"
          >
            <div className="md:px-8 py-5 bg-white rounded-md md:max-w-52 md:max-h-52 max-w-24 max-h-24 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="max-w-full max-h-full"
              />
            </div>
            <div className="flex mt-4 md:mt-8 md:px-8 md:py-5">
              <div>
                <h4 className="uppercase text-neutral-500 font-normal text-sm md:text-lg">
                  {item.category}
                </h4>
                <h3 className="mt-3 text-black text-lg md:text-2xl">{item.title}</h3>
                <p className="mt-2 text-blue-500 text-lg">
                  Price: ${item.price}
                </p>
                <div className="mt-3 flex">
                  <button
                    className="px-3 py-3 text-blue-500"
                    onClick={() => increment(item)}
                  >
                    <icons.FaPlus />
                  </button>
                  <input
                    type="text"
                    value={item.qty}
                    className="border-none outline-none w-10 bg-transparent h-10 text-center"
                  />
                  <button
                    className="px-3 py-3 text-blue-500"
                    onClick={() => decrement(item)}
                  >
                    <icons.FaMinus />
                  </button>
                </div>
                <h4 className="mt-3 text-neutral-700 text-lg md:text-2xl uppercase">
                  sub total: ${(item.price * item.qty).toFixed(2)}
                </h4>
              </div>
              <div className="absolute top-5 right-5">
                <button
                  className="text-neutral-900 hover:text-red-700 font-bold"
                  onClick={() => remove(item)}
                >
                  <icons.RxCross1 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="flex flex-col items-center md:mb-0 mb-5">
          <h2 className="mt-8 text-center font-bold uppercase text-2xl text-neutral-700">
            Total Price: ${TotalPrice}
          </h2>
          <button className="mt-10 px-16 py-5 bg-black hover:bg-blue-500 text-white text-xl font-semibold rounded-md">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
