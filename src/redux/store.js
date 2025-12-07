import { configureStore } from "@reduxjs/toolkit";

// slices
// slices
// slices

// static text
import staticTextSlice from "./slices/staticState/staticTextSlice";
// logic
import logicSlice from "./slices/staticState/logicSlice";
// store state
import storeSlice from "./slices/state/storeSlice";

export default configureStore({
  reducer: { staticTextSlice, logicSlice, storeSlice },
});
