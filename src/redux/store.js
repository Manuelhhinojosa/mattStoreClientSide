import { configureStore } from "@reduxjs/toolkit";

// slices
import staticTextSlice from "./slices/staticState/staticTextSlice";
import logicSlice from "./slices/staticState/logicSlice";
import storeSlice from "./slices/state/storeSlice";

export default configureStore({
  reducer: { staticTextSlice, logicSlice, storeSlice },
});
