import { createSlice } from "@reduxjs/toolkit";

export const staticTextSlice = createSlice({
  name: "staticTextSlice",
  initialState: {
    links: [
      { text: "/", id: 1 },
      { text: "about", id: 2 },
      { text: "recent", id: 3 },
      { text: "contact", id: 4 },
      { text: "store", id: 5 },
      { text: "cart", id: 6 },
      { text: "admin", id: 7 },
    ],
  },
  reducers: {},
});

export default staticTextSlice.reducer;
