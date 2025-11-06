// Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Axios
import axios from "axios";

// Toastify
// for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../../tostifyStyle";

// Fetching products
export const fetchArtPieces = createAsyncThunk(
  "store/fetchArtPieces",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/posts/allposts");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch art pieces"
      );
    }
  }
);

// state and reducers
export const storeSlice = createSlice({
  name: "storeSlice",
  initialState: {
    // new product initial state
    reference: Math.floor(Math.random() * 10000000000).toString(),
    inStock: true,
    added: false,
    recentWork: true,
    title: "",
    shortDesc: "",
    largeDesc: "N/A",
    media: "",
    cost: 0,
    nationwideDelivery: 0,
    internationalDelivery: 0,

    // products state
    artPieces: [],

    // shopping cart
    shoppingCart: [],

    // users
    users: [],

    // orders
    orders: [],
  },
  // functions
  reducers: {
    // add product to shopping cart
    addProdShoppingCart: (state, action) => {
      let prod = state.artPieces.find((piece) => piece._id == action.payload);
      state.shoppingCart.push(prod);
      prod.added = true;
      toast("Item added to your shopping cart", toastStyleObject());
    },

    // remove product from shopping cart
    removeProdShoppingCart: (state, action) => {
      const idToRemove = action.payload;
      state.shoppingCart = state.shoppingCart.filter(
        (item) => item._id !== idToRemove
      );

      const prod = state.artPieces.find((piece) => piece._id === idToRemove);
      if (prod) {
        prod.added = false;
      }

      toast("Item removed from your shopping cart", toastStyleObject());
    },

    // empty shopping cart
    emptyShoppingCart: (state, action) => {
      state.shoppingCart = [];
    },

    // setting state for creating new product
    setInStock: (state, action) => {
      state.inStock = action.payload;
    },
    setRecentWork: (state, action) => {
      state.recentWork = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setShortDesc: (state, action) => {
      state.shortDesc = action.payload;
    },
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    setCost: (state, action) => {
      state.cost = action.payload;
    },
    setNationwideDelivery: (state, action) => {
      state.nationwideDelivery = action.payload;
    },
    setInternationalDelivery: (state, action) => {
      state.internationalDelivery = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
  // extra reducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtPieces.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArtPieces.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.artPieces = action.payload;
      })
      .addCase(fetchArtPieces.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  addProdShoppingCart,
  removeProdShoppingCart,
  emptyShoppingCart,
  // functions for setting state for creating a new post (product)
  setInStock,
  setRecentWork,
  setTitle,
  setShortDesc,
  setMedia,
  setCost,
  setNationwideDelivery,
  setInternationalDelivery,
  setUsers,
  setOrders,
} = storeSlice.actions;

export default storeSlice.reducer;
