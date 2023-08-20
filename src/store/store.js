import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";

// import storage from "redux-persist/lib/storage";
// // import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
// import { persistReducer, persistStore } from "redux-persist";
// import thunk from "redux-thunk";

// import AuthReducer from "./reducer/authReducer";

// const persistConfig = {
//   key: "root",
//   storage,
// };
// const persistConfig = {
//   key: "root",
//   storageSession,
// };

// const persistedReducer = persistReducer(persistConfig, AuthReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== "production",
//   middleware: [thunk],
// });

// export const persistor = persistStore(store);

const store = configureStore(
  {
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
