import { combineReducers } from "redux";

import AuthReducer from "./authReducer";
import AssesmentReducer from "./assesmentReducer";
import completeAssesmentReducer from "./completeAssesmentReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  assesment: AssesmentReducer,
  completeAssesment: completeAssesmentReducer,
});

export default rootReducer;
