// Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Axios
import axios from "axios";

// Toastify
// for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastStyleObject } from "../../../tostifyStyle";

// functions
// functions
// functions

// Fetching products function
// Fetching products function
// Fetching products function
export const fetchArtPieces = createAsyncThunk(
  "store/fetchArtPieces",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_POSTS_URL}/allposts`
      );
      console.log("result to call fetch all products:", response);
      console.log("art pieces info loaded successfully:", {
        config: response.config,
        data: response.data,
        status: response.status,
        headers: response.headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch art pieces"
      );
    }
  }
);

// state and reducers (Slice)
// state and reducers (Slice)
// state and reducers (Slice)
export const storeSlice = createSlice({
  name: "storeSlice",
  initialState: {
    // admin page state
    // add product initial state
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

    // delivery fees
    nationalDeliveryFee: 50,
    internationalDeliveryFee: 100,

    // products array state
    artPieces: [],

    // shopping cart array (products)
    shoppingCart: [],

    // users array
    users: [],

    // orders array
    orders: [],
  },

  // functions
  // functions
  // functions

  reducers: {
    // shopping cart
    // add product to shopping cart
    addProdShoppingCart: (state, action) => {
      const { id, silent } =
        typeof action.payload === "object"
          ? action.payload
          : { id: action.payload, silent: false };

      const prod = state.artPieces.find((piece) => piece._id == id);
      if (!prod) return;

      state.shoppingCart.push(prod);
      prod.added = true;

      if (!silent) {
        toast("Item added to your shopping cart", toastStyleObject());
      }
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
      localStorage.removeItem("shoppingCart");
    },

    // admin page
    // add a product
    // setting inital state for creating new product
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

    // setting array of users
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    // setting array of orders
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },

  // extra reducers
  // loading products
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

// functions exports
// functions exports
// functions exports
export const {
  // shopping cart related
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
  // seeting users
  setUsers,
  // setting ordders
  setOrders,
} = storeSlice.actions;

export default storeSlice.reducer;
