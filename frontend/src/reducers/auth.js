const initialState = {
  accessToken: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SAVE_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: payload,
      };
    default:
      return state;
  }
};

export default auth;
