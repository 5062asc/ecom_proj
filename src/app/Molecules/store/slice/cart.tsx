import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckoutState {
  cartItems: any[];
  orderDetails: any[];
}

const initialState: CheckoutState = {
  cartItems: [],
  orderDetails: [],
};

const checkoutCartSlice = createSlice({
  name: "checkoutCart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any[]>) => {
      console.log(action);
      //   state.cartItems.push(action.payload);
      state.cartItems.push(...action.payload);
    },
    removeFromCart: (state, action: PayloadAction<any[]>) => {
      console.log(action);
      const productIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productIdToRemove
      );
    },

    orderDetails: (state, action: PayloadAction<any[]>) => {
      console.log(action);
      const orders = action.payload;
      state.orderDetails = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, orderDetails } =
  checkoutCartSlice.actions;

export const cartItemsAvailable = (state: { checkoutCart: CheckoutState }) =>
  state.checkoutCart.cartItems;

export const orderDetailsExp = (state: { checkoutCart: CheckoutState }) => {
  console.log(state.checkoutCart.orderDetails);
  state.checkoutCart.orderDetails;
};

export const selectOrderDetails = (state: { checkoutCart: CheckoutState }) =>
  state.checkoutCart.orderDetails;

export default checkoutCartSlice.reducer;
