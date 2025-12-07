// redux
import { createSlice } from "@reduxjs/toolkit";

// state and reducers (Slice)
// state and reducers (Slice)
// state and reducers (Slice)
export const staticTextSlice = createSlice({
  name: "staticTextSlice",
  initialState: {
    // navbar component
    links: [
      { text: "home", id: 1, to: "/" },
      { text: "about", id: 2, to: "about" },
      { text: "recent work", id: 3, to: "recent" },
      { text: "contact", id: 4, to: "contact" },
      { text: "store", id: 5, to: "store" },
      { text: "cart", id: 6, to: "cart" },
      { text: "login", id: 7, to: "login" },
      { text: "profile", id: 9, to: "profile" },
      { text: "admin", id: 8, to: "admin" },
    ],
    navbar: {
      logoSrcHref:
        "https://res.cloudinary.com/mangud/image/upload/v1748264405/MattMarottiClientSide/Watching_Paint_Dry_f0ou8x.png",
    },
    // home component
    home: {
      homeMainTitle: "Matt Marotti",
      homeSecondaryTitle: "",
      homeImgSrcHref:
        "https://res.cloudinary.com/mangud/image/upload/v1748262333/MattMarottiClientSide/BlueRuin_gccdil.jpg",
    },
    // about component
    about: {
      aboutImgSrcHref:
        "https://res.cloudinary.com/mangud/image/upload/v1748262616/MattMarottiClientSide/Matt_Marotti_ubqp5k.jpg",
      aboutText:
        "Matt Marotti is a painter whose work oscillates between witticism and dissidence. With agitated brushstrokes and a caustic sensibility, Marotti transforms familiar images into something more unnerving. Tongue in cheek, but layered with emotional nuance, his paintings walk a fine line between nonchalant absurdity and pointed critique, evoking discomfort and consolation in equal measure. Based in Toronto, Marotti continues to hone his skills and develop his provocative body of work.",
      cvSrcHref: "https://mattmarotticv.netlify.app/cv.pdf",
    },
    // contact component
    contact: {
      email: "matt.marotti@gmail.com",
      IGlink: "https://www.instagram.com/martysville/",
    },
  },
  reducers: {},
});

export default staticTextSlice.reducer;
