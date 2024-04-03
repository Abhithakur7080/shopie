import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "./Reducer/ProductReducer";
import { cartReducer } from "./Reducer/cartReducer";
import { orderReducer } from "./Reducer/orderReducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
