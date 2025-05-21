import { configureStore } from "@reduxjs/toolkit";

// slices
import staticTextSlice from "./slices/staticState/staticTextSlice";
import logicSlice from "./slices/staticState/logicSlice";

export default configureStore({
  reducer: { staticTextSlice, logicSlice },
});
