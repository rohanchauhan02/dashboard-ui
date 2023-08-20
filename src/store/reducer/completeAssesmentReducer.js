const initialState = {
  amount: null,
};

const completeAssesmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "THANKS":
      return {
        ...state,
        amount: action.payload.amount,
      };
    default:
      return state;
  }
};

export default completeAssesmentReducer;
