import { createSlice } from "@reduxjs/toolkit";
import { productData } from "../../assets";

const initialState = {
  products: productData,
  filteredProducts: [],
  productDetails: null,
  categoryFlag: false,
  searchbox: false
};

const productsSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    searchItems: (state, action) => {
      const searchQuery = action.payload;
      state.searchbox = true;
      if (action.payload.length > 0) {
        const filteredItems = state.products.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        state.filteredProducts = filteredItems;
      } else {
        state.filteredProducts = [];
      }
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload
    },
    cancelProductDetails: (state, action) => {
      state.productDetails = null
      state.searchbox=false
    },
    setCatagory: (state, action) => {
      state.filteredProducts = state.products.filter((item)=> item.category===action.payload)
      state.categoryFlag=true
    },
    resetCatagory: (state, action) => {
      state.filteredProducts = state.products;
      state.categoryFlag = false
    }
  },
});

export const productReducer = productsSlice.reducer;
export const { searchItems, setProductDetails, cancelProductDetails, setCatagory, resetCatagory } = productsSlice.actions;
export const productSelector = (state) => state.products;
