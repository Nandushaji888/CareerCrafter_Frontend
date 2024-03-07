import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "../slices/userSlice";
import storage from "redux-persist/lib/storage";
import jobPostSlice from "../slices/jobPostSlice";
import recruiterSlice from "../slices/recruiterSlice";

const persistConfig = {
  key: "root",
  whitelist: ["user", "postData","recruiter"],
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  postData: jobPostSlice,
  recruiter:recruiterSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: {
    persisted: persistedReducer,
  },
});

const persistor = persistStore(Store);

export { Store, persistor };
