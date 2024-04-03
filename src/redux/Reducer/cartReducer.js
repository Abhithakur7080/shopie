import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useFirestore } from "../../config/firebaseinit";
import toast from "react-hot-toast";
const initialState = {
  carts: [],
  total: 0,
};
export const fetchAllcarts = createAsyncThunk(
  "cart/fetchAllcarts",
  async (uid, thunkAPI) => {
    try {
      const { getADocsFromFirestore } = useFirestore();
      const { carts } = await getADocsFromFirestore("carts", uid);
      thunkAPI.dispatch(setTocart(carts));
      thunkAPI.dispatch(setTotal());
    } catch (error) {
      console.log(error);
    }
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, thunkAPI) => {
    try {
      const { uid, item } = data;

      if (uid) {
        let userCarts = thunkAPI.getState().cart.carts;
        let itemExists = userCarts.find((product) => product.id === item.id);
        if (!itemExists) {
          const updatedcart = [...userCarts, { ...item, qty: 1 }];
          thunkAPI.dispatch(updateTodatabse({ uid, updatedcart }));
          toast.success("1X item added to cart successfully.");
        } else {
          thunkAPI.dispatch(increaseQTY({ uid, item }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const increaseQTY = createAsyncThunk(
  "cart/increaseQTY",
  async (data, thunkAPI) => {
    try {
      const { uid, item } = data;
      if (uid) {
        let userCarts = thunkAPI.getState().cart.carts;
        let itemExists = userCarts.find((product) => product.id === item.id);
        const updatedItem = { ...itemExists, qty: itemExists.qty + 1 };
        const updatedcart = userCarts.map((product) =>
          product.id === item.id ? updatedItem : product
        );
        toast.success(`${updatedItem.qty}X item added successfully.`);
        thunkAPI.dispatch(updateTodatabse({ uid, updatedcart }));
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const decreaseQTY = createAsyncThunk(
  "cart/decreaseQTY",
  async (data, thunkAPI) => {
    try {
      const { uid, item } = data;
      if (uid) {
        let userCarts = thunkAPI.getState().cart.carts;
        const findItem = userCarts.find((product) => product.id === item.id);
        if (findItem.qty > 1) {
          const updatedItem = { ...findItem, qty: findItem.qty - 1 };
          const updatedcart = userCarts.map((product) =>
            product.id === updatedItem.id ? updatedItem : product
          );
          thunkAPI.dispatch(updateTodatabse({ uid, updatedcart }));
        } else {
          thunkAPI.dispatch(deleteFromCart({ uid, item }));
          thunkAPI.dispatch(fetchAllcarts(uid));
          
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async (data, thunkAPI) => {
    try {
      const { uid, item } = data;
      if (uid) {
        let userCarts = thunkAPI.getState().cart.carts;
        const updatedcart = userCarts.filter(
          (product) => product.id !== item.id
        );
        thunkAPI.dispatch(updateTodatabse({ uid, updatedcart }));
        toast.error(`${item.qty} items removed from your cart`);
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateTodatabse = createAsyncThunk(
  "cart/updateTodatabase",
  async (data, thunkAPI) => {
    const { uid, updatedcart } = data;
    const { setDataToFirestoreRef } = useFirestore();
    await setDataToFirestoreRef("carts", uid, {
      carts: updatedcart,
      updatedCart: new Date().toLocaleDateString(),
    });
    thunkAPI.dispatch(fetchAllcarts(uid));
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTocart: (state, action) => {
      state.carts = action.payload;
    },
    setTotal: (state, action) => {
      state.total = state.carts
        .reduce((price, item) => price + item.qty * item.price, 0)
        .toLocaleString('en-IN');
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { setTocart, setTotal, setSubTotal } = cartSlice.actions;
export const cartSelector = (state) => state.cart;
