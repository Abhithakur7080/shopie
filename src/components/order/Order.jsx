import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllorders,
  orderSelector,
} from "../../redux/Reducer/orderReducer";
import { useAuthContext } from "../../redux/AuthProvider";
import { Link } from "react-router-dom";
import { icons, sold } from "../../assets";

const Order = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const { orders, totalPrice } = useSelector(orderSelector);
  //increase quantity
  useEffect(() => {
    dispatch(fetchAllorders(user.uid));
  }, [dispatch, user]);
  return (
    <div className="md:px-14 md:py-10 w-full">
      {orders.length === 0 && (
        <div className="w-full flex items-center flex-col py-5">
          <h1 className="text-9xl text-neutral-500 rotate-180">
            <icons.FaTruck />
          </h1>
          <h2 className="text-lg font-normal">Your aren't any order yet.</h2>
          <Link
            className="mt-5 flex items-center gap-2 text-lg px-5 py-3 bg-black text-white rounded-md hover:bg-blue-500"
            to={"/products"}
          >
            Shop Now <icons.BsArrowRight />
          </Link>
        </div>
      )}
      <div className="max-w-full md:px-8 py-5 flex gap-3 flex-col">
        {orders.length !== 0 && (
          <h2 className="text-blue-500 uppercase mb-4 text-xl md:text-4xl font-bold flex justify-center gap-3">
            <icons.FaTruck className="transform scale-x-[-1] text-2xl md:text-5xl" />{" "}
            Your Orders
          </h2>
        )}
        {orders.map((orders, index) => {
          return (
            <div
              key={index}
              className="w-full bg-blue-100 px-6 py-4 border-l-[12px] border-r-[12px] border-dotted border-white"
            >
              <h2 className="text-center font-semibold border-b-2 border-black py-2">
                Order on:- {orders.createdAt}
              </h2>
              <table className="w-full relative">
                <thead className="border-b-2 border-black">
                  <tr>
                    <th className="border-r-2 border-black">Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.order.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className="border-r-2 border-black">
                          {item.title}
                        </td>
                        <td className="text-center">
                          &#x20B9; {Number(item.price).toFixed(2)}
                        </td>
                        <td className="text-center">{item.qty}</td>
                        <td className="text-center">
                          &#x20B9; {Number(item.price * item.qty).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="border-t-2 border-black">
                  <tr className="border-b-2 border-black">
                    <td colSpan={2}></td>
                    <td>Total:-</td>
                    <td className="text-center">
                      {" "}
                      <h3 className="font-semibold">&#x20B9; {totalPrice}/-</h3>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <p className="text-2xl text-center">
                        Thank you for your purchasing for more purchase{" "}
                        <Link
                          to={"/products"}
                          className="text-blue-500 underline"
                        >
                          visit
                        </Link>{" "}
                        again
                      </p>
                    </td>
                    <td>
                      <img src={sold} alt="sold" className="w-28 -rotate-45" />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
