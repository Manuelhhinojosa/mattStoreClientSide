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

    // orders
    // orders: [],
    orders: [
      {
        _id: 1,
        status: "Processing",
        user: {
          isAdmin: false,
          isActive: true,
          name: "TestName",
          lastname: "TestLastName",
          username: "testname.testlastname@gmail.com",
          password: "userPassword",
          contactPhoneNumber: "6472874494",
          address: "87 Address test Avenue",
          addressUnit: "456",
          country: "Canada",
          provinceOrState: "Ontario",
          city: "Toronto",
          postalCode: "M6R3C2",
          contactEqualShipping: false,
          shippingPhoneNumber: "6472874494",
          shippingAddress: "376 Address test Road",
          shippingAddressUnit: "",
          shippingCountry: "USA",
          shippingProviceOrState: "California",
          shippingCity: "San Francisco",
          shippingPostalCode: "123456",
        },
        products: [
          {
            id: 19,
            inStock: true,
            added: false,
            recentWork: true,
            title: `"To A Sphinx With A Riddle, Everything Is A Complex"`,
            shortDesc: "Pending",
            largeDesc: "Pending",
            imgSrcHref:
              "https://res.cloudinary.com/mangud/image/upload/v1748265574/MattMarottiClientSide/To_A_Sphinx_With_A_Riddle_Everything_Is_A_Complex_o3azkm.jpg",
            cost: 200,
            nationwideDelivery: "$0.00 CAD",
            internationalDelivery: "$0.00 CAD",
          },
          {
            id: 20,
            inStock: true,
            added: false,
            recentWork: true,
            title: `"They Don't Make Men Like They Used To"`,
            shortDesc: "Pending",
            largeDesc: "Pending",
            imgSrcHref:
              "https://res.cloudinary.com/mangud/image/upload/v1748265570/MattMarottiClientSide/They_Don_t_Make_Men_Like_They_Used_To_fe4gao.jpg",
            cost: 200,
            nationwideDelivery: "$0.00 CAD",
            internationalDelivery: "$0.00 CAD",
          },
        ],
        date: "this is the date",
      },
      {
        _id: 2,
        status: "Processing",
        user: {
          isAdmin: false,
          isActive: true,
          name: "TestName",
          lastname: "TestLastName",
          username: "testname.testlastname@gmail.com",
          password: "userPassword",
          contactPhoneNumber: "6472874494",
          address: "87 Address test Avenue",
          addressUnit: "456",
          country: "Canada",
          provinceOrState: "Ontario",
          city: "Toronto",
          postalCode: "M6R3C2",
          contactEqualShipping: false,
          shippingPhoneNumber: "6472874494",
          shippingAddress: "376 Address test Road",
          shippingAddressUnit: "",
          shippingCountry: "USA",
          shippingProviceOrState: "California",
          shippingCity: "San Francisco",
          shippingPostalCode: "123456",
        },
        products: [
          {
            id: 18,
            inStock: true,
            added: false,
            recentWork: true,
            title: `"Sorry, Didn't Mean To Cut You Off"`,
            shortDesc: "Pending",
            largeDesc: "Pending",
            imgSrcHref:
              "https://res.cloudinary.com/mangud/image/upload/v1748265583/MattMarottiClientSide/Sorry_Didn_t_Mean_To_Cut_You_Off_gotsme.jpg",
            cost: 200,
            nationwideDelivery: "$0.00 CAD",
            internationalDelivery: "$0.00 CAD",
          },
        ],
        date: "this is the date",
      },
    ],
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
} = storeSlice.actions;

export default storeSlice.reducer;
