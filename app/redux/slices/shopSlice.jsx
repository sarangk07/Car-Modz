import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  shop_name: '',
  description: '',
  created_at: '',
  is_verified: false,
  rating: null,
  shop_bg_img: null,
  shop_image: null,
  user: null,
  products: [],
  
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShop: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearShop: (state) => {
      return initialState;
    },
    updateShopField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
  },
});

export const { 
  setShop, 
  clearShop, 
  updateShopField, 
  addProduct, 
  removeProduct, 
  updateProduct 
} = shopSlice.actions;

export default shopSlice.reducer;