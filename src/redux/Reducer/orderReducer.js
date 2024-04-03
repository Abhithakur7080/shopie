import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useFirestore } from "../../config/firebaseinit";
import toast from "react-hot-toast";
const initialState = {
  orders: [],
  totalPrice: 0,
};
export const fetchAllorders = createAsyncThunk(
  "order/fetchAllorders",
  async (uid, thunkAPI) => {
    try {
      const { getADocsFromFirestore } = useFirestore();
      const { orders } = await getADocsFromFirestore("orders", uid);
      thunkAPI.dispatch(setToOrders(orders));
      thunkAPI.dispatch(setTotalPrice());
    } catch (error) {
      console.log(error);
    }
  }
);
export const checkoutOrders = createAsyncThunk(
  "order/checkoutOrders",
  async (uid, thunkAPI) => {
    try {
      if (uid) {
        const { getADocsFromFirestore, setDataToFirestoreRef } = useFirestore();
        const getCarts = await getADocsFromFirestore("carts", uid);
        const previousOrder = thunkAPI.getState().order.orders;
        await setDataToFirestoreRef("orders", uid, {
          orders: [
            ...previousOrder,
            {
              order: getCarts.carts,
              createdAt: new Date().toDateString(),
            },
          ],
        });
        await setDataToFirestoreRef("carts", uid, {
          carts: [],
          updatedAt: new Date().toDateString(),
        });
        thunkAPI.dispatch(fetchAllorders(uid));
        toast.success("Order placed successfully");
      } else {
        toast.error("Please login to place order");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setToOrders: (state, action) => {
      state.orders = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = state.orders
        .reduce(
          (acc, curr) =>
            acc +
            curr.order
              .map((item) => item.price)
              .reduce((sum, price) => sum + price, 0),
          0
        )
        .toLocaleString("en-IN");
    },
  },
});
export const orderReducer = orderSlice.reducer;
export const { setToOrders, setTotalPrice } = orderSlice.actions;
export const orderSelector = (state) => state.order;
