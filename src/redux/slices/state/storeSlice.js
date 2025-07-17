import { createSlice } from "@reduxjs/toolkit";
// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../../tostifyStyle";

export const storeSlice = createSlice({
  name: "storeSlice",
  initialState: {
    artPieces: [
      {
        id: 1,
        inStock: true,
        added: false,
        recentWork: false,
        title: `"Do You Think This Is A Game?"`,
        shortDesc: "9in x 12in Acrylic on Canvas Paper",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275640/MattMarottiClientSide/Do_You_Think_This_Is_A_Game_db63l3.jpg",
        cost: 200,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 2,
        inStock: true,
        added: false,
        recentWork: false,
        title: `"Give And Take"`,
        shortDesc: "12in x 16in Acrylic on Canvas Paper",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275652/MattMarottiClientSide/Give_And_Take_vxkbmq.jpg",
        cost: 225,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 3,
        inStock: true,
        added: false,
        recentWork: false,
        title: `"God, Just Let Her Have The Apple" `,
        shortDesc: "12in x 16in Acrylic on Canvas Paper",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275676/MattMarottiClientSide/God_Just_Let_Her_Have_The_Apple_o048za.jpg",
        cost: 225,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 4,
        inStock: true,
        added: false,
        recentWork: false,
        title: `"I'm Thinking About Letting Him Into My China Shop" `,
        shortDesc: "11in x 16in Acrylic on Canvas Paper",
        largeDesc: "",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275689/MattMarottiClientSide/I_m_Thinking_About_Letting_Him_Into_My_China_Shop_u8mrur.jpg",
        cost: 250,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 5,
        inStock: true,
        added: false,
        recentWork: false,
        title: `"Like A Bee To A Bonnet"`,
        shortDesc: "9in x 12in Acrylic on Canvas Paper",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275646/MattMarottiClientSide/Like_A_Bee_To_A_Bonnet_esc6l4.jpg",
        cost: 200,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 6,
        inStock: true,
        added: false,
        recentWork: false,
        title: `"Maybe A Bit Much, But That Is My Bread And Butter"`,
        shortDesc: "9in x 12in Acrylic on Canvas Paper",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275658/MattMarottiClientSide/Maybe_A_Bit_Much_But_That_Is_My_Bread_And_Butter_eifdrk.jpg",
        cost: 200,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 7,
        inStock: true,
        added: false,
        recentWork: false,
        title: `"Okay Everybody Get Together, Let Me Take A Picture" `,
        shortDesc: "12in x 16 Acrylic on Canvas Paper",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275682/MattMarottiClientSide/Okay_Everybody_Get_Together_Let_Me_Take_A_Picture_xppwbl.jpg",
        cost: 250,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 8,
        inStock: true,
        added: false,
        recentWork: false,
        title: `"Partir, C'est Mourir Un Peu" `,
        shortDesc: "12in x 9in Acrylic on Canvas Paper",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275695/MattMarottiClientSide/Partir_C_est_Mourir_Un_Peu_yxqgmu.jpg",
        cost: 200,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 9,
        inStock: true,
        added: false,
        recentWork: false,
        title: `"Venus In Surf"`,
        shortDesc: "12in x 16in Acrylic on Canvas Paper",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275664/MattMarottiClientSide/Venus_In_Surf_pbfdg4.jpg",
        cost: 250,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 10,
        inStock: true,
        added: false,
        recentWork: false,
        title: `"When The Gravy Train Stops, Cold Turkey"`,
        shortDesc: "9in x 12in Acrylic on Canvas Paper",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275670/MattMarottiClientSide/When_The_Gravy_Train_Stops_Cold_Turkey_jt408e.jpg",
        cost: 200,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 11,
        inStock: true,
        added: false,
        recentWork: true,
        title: `"Blue Ruin"`,
        shortDesc: "Pending",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265612/MattMarottiClientSide/Blue_Ruin_x9ea8j.jpg",
        cost: 475,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 12,
        inStock: true,
        added: false,
        recentWork: true,
        title: `"Tossed Salads And Scambled Eggs"`,
        shortDesc: "Pending",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265607/MattMarottiClientSide/Tossed_Salads_and_Scrambled_Eggs_ozk294.jpg",
        cost: 200,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 13,
        inStock: true,
        added: false,
        recentWork: true,
        title: `"Meditations In An Emergency"`,
        shortDesc: "Pending",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265603/MattMarottiClientSide/Meditations_In_An_Emergency_aeukgr.jpg",
        cost: 250,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 14,
        inStock: false,
        added: false,
        recentWork: true,
        title: `"Jolene Is Looking Beautiful Beyond Compare"`,
        shortDesc: "Pending",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265599/MattMarottiClientSide/Jolene_Is_Looking_Beautiful_Beyond_Compare_gfcrb6.jpg",
        cost: 250,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 15,
        inStock: true,
        added: false,
        recentWork: true,
        title: `"Getting Ahead Of Yourself"`,
        shortDesc: "Pending",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265595/MattMarottiClientSide/Getting_Ahead_Of_Yourself_q4ramr.jpg",
        cost: 200,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 16,
        inStock: true,
        added: false,
        recentWork: true,
        title: `"Can You Fix My Hair?"`,
        shortDesc: "Pending",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265590/MattMarottiClientSide/Can_You_Fix_My_Hair_ziatk4.jpg",
        cost: 225,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
      {
        id: 17,
        inStock: false,
        added: false,
        recentWork: true,
        title: `"When Your Body Is A Wonderland"`,
        shortDesc: "Pending",
        largeDesc: "Pending",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265586/MattMarottiClientSide/When_Your_Body_Is_A_Wonderland_bzldnj.jpg",
        cost: 250,
        nationwideDelivery: "$0.00 CAD",
        internationalDelivery: "$0.00 CAD",
      },
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
    shoppingCart: [],
    // orders: [],
    orders: [
      {
        orderId: 1,
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
        orderId: 2,
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
  reducers: {
    addProdShoppingCart: (state, action) => {
      let prod = state.artPieces.find((piece) => piece.id == action.payload);
      state.shoppingCart.push(prod);
      prod.added = true;
      toast("Item added to your shopping cart", toastStyleObject());
    },
    removeProdShoppingCart: (state, action) => {
      const idToRemove = action.payload;
      state.shoppingCart = state.shoppingCart.filter(
        (item) => item.id !== idToRemove
      );

      const prod = state.artPieces.find((piece) => piece.id === idToRemove);
      if (prod) {
        prod.added = false;
      }

      toast("Item removed from your shopping cart", toastStyleObject());
    },
    emptyShoppingCart: (state, action) => {
      state.shoppingCart = [];
    },
  },
});

export const {
  addProdShoppingCart,
  removeProdShoppingCart,
  emptyShoppingCart,
} = storeSlice.actions;

export default storeSlice.reducer;
