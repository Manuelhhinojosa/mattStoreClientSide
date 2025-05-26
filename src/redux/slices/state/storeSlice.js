import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "storeSlice",
  initialState: {
    artPieces: [
      {
        id: 1,
        inStock: true,
        recentWork: false,
        title: `"Do You Think This Is A Game?"`,
        shortDesc: "9in x 12in Acrylic on Canvas Paper",
        largeDesc: "",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275640/MattMarottiClientSide/Do_You_Think_This_Is_A_Game_db63l3.jpg",
        cost: "$200.00 CAD",
        nationwideDelivery: 0,
        internationalDelivery: 0,
      },
      {
        id: 2,
        inStock: true,
        recentWork: false,
        title: `"Give And Take"`,
        shortDesc: "12in x 16in Acrylic on Canvas Paper",
        largeDesc: "",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275652/MattMarottiClientSide/Give_And_Take_vxkbmq.jpg",
        cost: "$225.00 CAD",
        nationwideDelivery: 0,
        internationalDelivery: 0,
      },
      {
        id: 3,
        inStock: true,
        recentWork: false,
        title: `"God, Just Let Her Have The Apple" `,
        shortDesc: "12in x 16in Acrylic on Canvas Paper",
        largeDesc: "",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275676/MattMarottiClientSide/God_Just_Let_Her_Have_The_Apple_o048za.jpg",
        cost: "$225.00 CAD",
        nationwideDelivery: 0,
        internationalDelivery: 0,
      },
      {
        id: 4,
        inStock: true,
        recentWork: false,
        title: `"I'm Thinking About Letting Him Into My China Shop" `,
        shortDesc: "11in x 16in Acrylic on Canvas Paper",
        largeDesc: "",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275689/MattMarottiClientSide/I_m_Thinking_About_Letting_Him_Into_My_China_Shop_u8mrur.jpg",
        cost: "$250.00 CAD",
        nationwideDelivery: 0,
        internationalDelivery: 0,
      },
      {
        id: 5,
        inStock: true,
        recentWork: false,
        title: `"Like A Bee To A Bonnet"`,
        shortDesc: "9in x 12in Acrylic on Canvas Paper",
        largeDesc: "",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275646/MattMarottiClientSide/Like_A_Bee_To_A_Bonnet_esc6l4.jpg",
        cost: "$200.00 CAD",
        nationwideDelivery: 0,
        internationalDelivery: 0,
      },
      {
        id: 6,
        inStock: true,
        recentWork: false,
        title: `"Maybe A Bit Much, But That Is My Bread And Butter"`,
        shortDesc: "9in x 12in Acrylic on Canvas Paper",
        largeDesc: "",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275658/MattMarottiClientSide/Maybe_A_Bit_Much_But_That_Is_My_Bread_And_Butter_eifdrk.jpg",
        cost: "$200.00 CAD",
        nationwideDelivery: 0,
        internationalDelivery: 0,
      },
      {
        id: 7,
        inStock: true,
        recentWork: false,
        title: `"Okay Everybody Get Together, Let Me Take A Picture" `,
        shortDesc: "12in x 16 Acrylic on Canvas Paper",
        largeDesc: "",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275682/MattMarottiClientSide/Okay_Everybody_Get_Together_Let_Me_Take_A_Picture_xppwbl.jpg",
        cost: "$250.00 CAD",
        nationwideDelivery: 0,
        internationalDelivery: 0,
      },
      {
        id: 8,
        inStock: true,
        recentWork: false,
        title: `"Partir, C'est Mourir Un Peu" `,
        shortDesc: "12in x 9in Acrylic on Canvas Paper",
        largeDesc: "",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275695/MattMarottiClientSide/Partir_C_est_Mourir_Un_Peu_yxqgmu.jpg",
        cost: "$200.00 CAD",
        nationwideDelivery: 0,
        internationalDelivery: 0,
      },
      {
        id: 9,
        inStock: true,
        recentWork: false,
        title: `"Venus In Surf"`,
        shortDesc: "12in x 16in Acrylic on Canvas Paper",
        largeDesc: "",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275664/MattMarottiClientSide/Venus_In_Surf_pbfdg4.jpg",
        cost: "$250.00 CAD",
        nationwideDelivery: 0,
        internationalDelivery: 0,
      },
      {
        id: 10,
        inStock: true,
        recentWork: false,
        title: `"When The Gravy Train Stops, Cold Turkey"`,
        shortDesc: "9in x 12in Acrylic on Canvas Paper",
        largeDesc: "",
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748275670/MattMarottiClientSide/When_The_Gravy_Train_Stops_Cold_Turkey_jt408e.jpg",
        cost: "$200.00 CAD",
        nationwideDelivery: 0,
        internationalDelivery: 0,
      },
    ],
  },
  reducers: {},
});

export default storeSlice.reducer;
