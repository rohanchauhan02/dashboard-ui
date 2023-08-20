const initialState = {
  resp: null,
};

const AssesmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_AMOUNT":
      return {
        ...state,
        resp: action.payload.resp,
      };
    default:
      return state;
  }
};

export default AssesmentReducer;
