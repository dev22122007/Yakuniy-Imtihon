import { createSlice } from "@reduxjs/toolkit";

const CriptoCurrencySlice = createSlice({
  name: "currency",
  initialState: {
    currency: "usd",
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});
export const { setCurrency } = CriptoCurrencySlice.actions;

export default CriptoCurrencySlice.reducer;