const initialState = {
  token: null,
  name: null,
  email: null,
};

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_NAME":
      return {
        ...state,
        name: payload.name,
      };
    default:
      return state;
  }
};

export default usersReducer;
