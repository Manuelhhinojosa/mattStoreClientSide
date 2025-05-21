import { createSlice } from "@reduxjs/toolkit";

export const staticTextSlice = createSlice({
  name: "staticTextSlice",
  initialState: {
    links: [
      { text: "Home", id: 1 },
      { text: "About", id: 2 },
      { text: "Recent work", id: 3 },
      { text: "Contact", id: 4 },
      { text: "Store", id: 5 },
      { text: "Cart", id: 6 },
    ],
  },
  reducers: {},
});

export default staticTextSlice.reducer;
