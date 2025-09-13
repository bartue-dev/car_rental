import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducers from "./feature/auth/auth-slice"
import userReducers from "./feature/user/user-slice"

//combine all reducers
const rootReducers = combineReducers({
  auth: authReducers,
  user: userReducers
})

//set up the persist slice in localStorage
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
}

const persistedReducer = persistReducer(persistConfig, rootReducers); 

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
      },
    }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducers>
export type AppDispatch = typeof store.dispatch;