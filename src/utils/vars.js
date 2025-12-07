// dependencies
// redux
import store from "../redux/store";

// functions
// functions
// functions

// provides headers
// provides headers
// provides headers
export const getHeadersConfig = () => {
  const state = store.getState();
  const userToken = state.logicSlice.userToken;

  return {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
};
