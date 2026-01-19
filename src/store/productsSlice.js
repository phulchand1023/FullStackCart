import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [
      { id: 1, name: 'Laptop', price: 45000, category: 'Electronics' },
      { id: 2, name: 'Phone', price: 25000, category: 'Electronics' },
      { id: 3, name: 'Book', price: 500, category: 'Education' }
    ]
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: Date.now(),
        ...action.payload
      };
      state.items.push(newProduct);
    },
    updateProduct: (state, action) => {
      const { id, ...updates } = action.payload;
      const productIndex = state.items.findIndex(product => product.id === id);
      if (productIndex !== -1) {
        state.items[productIndex] = { ...state.items[productIndex], ...updates };
      }
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    }
  }
});

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;