import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import counterSlice from "../redux/counter/counterSlice";

const reducers = combineReducers({
  counter: counterSlice,
});

/* se deja de lado createStore() , el setup manual de las devtools con una extension extra
 redux-toolkit evita que instalemos redux-thunk para uso de middlewares en comunicaciones asíncronas con las API
*/
export const store = configureStore({
  reducer: {
    reducers,
  },
});

// inferir el tipo de dispatch segun el store
export type AppDispatch = typeof store.dispatch;
// crear dispatch tipado
export const useAppDispatch = () => useDispatch<AppDispatch>();
// inferir tipo para selectores
export type RootState = ReturnType<typeof store.getState>;
export default store;
