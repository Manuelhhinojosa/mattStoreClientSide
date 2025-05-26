import { createSlice } from "@reduxjs/toolkit";

export const staticTextSlice = createSlice({
  name: "staticTextSlice",
  initialState: {
    links: [
      { text: "home", id: 1, to: "/" },
      { text: "about", id: 2, to: "about" },
      { text: "recent work", id: 3, to: "recent" },
      { text: "contact", id: 4, to: "contact" },
      { text: "store", id: 5, to: "store" },
      { text: "cart", id: 6, to: "cart" },
      { text: "admin", id: 7, to: "admin" },
    ],
    navbar: {
      logoSrcHref:
        "https://res.cloudinary.com/mangud/image/upload/v1748264405/MattMarottiClientSide/Watching_Paint_Dry_f0ou8x.png",
    },
    home: {
      homeMainTitle: "Matt Marotti",
      homeSecondaryTitle: "",
      homeImgSrcHref:
        "https://res.cloudinary.com/mangud/image/upload/v1748262333/MattMarottiClientSide/BlueRuin_gccdil.jpg",
    },
    about: {
      aboutImgSrcHref:
        "https://res.cloudinary.com/mangud/image/upload/v1748262616/MattMarottiClientSide/Matt_Marotti_ubqp5k.jpg",
      aboutText:
        "Matt Marotti is a painter whose work oscillates between witticism and dissidence. With agitated brushstrokes and a caustic sensibility, Marotti transforms familiar images into something more unnerving. Tongue in cheek, but layered with emotional nuance, his paintings walk a fine line between nonchalant absurdity and pointed critique, evoking discomfort and consolation in equal measure. Based in Toronto, Marotti continues to hone his skills and develop his provocative body of work.",
      cvSrcHref: "https://mattmarotticv.netlify.app/cv.pdf",
    },
    recentWork: [
      {
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265612/MattMarottiClientSide/Blue_Ruin_x9ea8j.jpg",
        title: "Blue Ruin",
      },
      {
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265607/MattMarottiClientSide/Tossed_Salads_and_Scrambled_Eggs_ozk294.jpg",
        title: "Tossed Salads And Scambled Eggs",
      },
      {
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265603/MattMarottiClientSide/Meditations_In_An_Emergency_aeukgr.jpg",
        title: "Meditations In An Emergency",
      },
      {
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265599/MattMarottiClientSide/Jolene_Is_Looking_Beautiful_Beyond_Compare_gfcrb6.jpg",
        title: "Jolene Is Looking Beautiful Beyond Compare",
      },
      {
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265595/MattMarottiClientSide/Getting_Ahead_Of_Yourself_q4ramr.jpg",
        title: "Getting Ahead Of Yourself",
      },
      {
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265590/MattMarottiClientSide/Can_You_Fix_My_Hair_ziatk4.jpg",
        title: "Can You Fix My Hair?",
      },
      {
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265586/MattMarottiClientSide/When_Your_Body_Is_A_Wonderland_bzldnj.jpg",
        title: "When Your Body Is A Wonderland",
      },
      {
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265583/MattMarottiClientSide/Sorry_Didn_t_Mean_To_Cut_You_Off_gotsme.jpg",
        title: "Sorry, Didn't Mean To Cut You Off",
      },
      {
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265574/MattMarottiClientSide/To_A_Sphinx_With_A_Riddle_Everything_Is_A_Complex_o3azkm.jpg",
        title: "To A Sphinx With A Riddle, Everything Is A Complex",
      },
      {
        imgSrcHref:
          "https://res.cloudinary.com/mangud/image/upload/v1748265570/MattMarottiClientSide/They_Don_t_Make_Men_Like_They_Used_To_fe4gao.jpg",
        title: "They Don't Make Men Like They Used To",
      },
    ],
  },
  reducers: {},
});

export default staticTextSlice.reducer;
