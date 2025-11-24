// dependencies
// redux
import store from "../redux/store";

export const getHeadersConfig = () => {
  const state = store.getState();
  const userToken = state.logicSlice.userToken;

  return {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
};
