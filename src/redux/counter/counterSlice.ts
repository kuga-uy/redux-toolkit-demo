import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchCount } from "../../api/CounterApi";

const ACTION_TYPE = {
  INCREMENT_COUNT: "INCREMENT_COUNT",
};

export const REQUEST_STATUS = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS", //FULFILLED
  FAILED: "FAILED", //REJECTED
};

interface ICounter {
  value: number;
  status: string;
}

const initialState: ICounter = {
  value: 0,
  status: REQUEST_STATUS.IDLE, //inactivo
};

// ACTION
/* Las actions internamente cuentan con 4 estados principales: idle, pending, fullfiled, rejected
los cuales podemos manejar con las funciones addCase para, dependiendo del resultado
ejecutar determinada funcionalidad, como por ejemplo, mostrar un mensaje o alerta al usuario */
export const incrementAsync = createAsyncThunk<number, number>(
  ACTION_TYPE.INCREMENT_COUNT, //description for the action
  async (amount: number) => {
    const response = await fetchCount(amount);
    //El valor que retorna es 'fulfilled' action payload cuando no hay errores
    return response;
  }
);

/* createSlice es una función que se importa desde redux toolkit
 recibe un objeto o Slice que es una porción de store, que recibe 3 propiedades:
  name, initial state y reducers */

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //los reducers dentro de los slice estan mezclados con actions
    increment(state) {
      state.value += 10;
    },
    /* En cada uno de estos cambios parece que estamos "mutando el estado", cuando en
        redux generalmente se hace una copia del mismo {...state,} y luego se modifica, pero
        redux toolkit no muta el estado sino que detecta cambios a través de la librería IMMER 
        produce un nuevo estado.*/

    decrement(state) {
      state.value -= 10;
    },

    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },

  /* Extra reducers, son los que manejan acciones asíncronas según su estado, para esto se usan las
funciones addCase y addMacher */

  extraReducers: (builder) => {
    // pending, fulfilled, rejected? son propiedades de createAsyncThunk
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = REQUEST_STATUS.PENDING;
      })
      .addCase(
        incrementAsync.fulfilled,
        (state, { payload }: PayloadAction<number>) => {
          state.status = REQUEST_STATUS.IDLE;
          state.value += payload;
        }
      )
      .addMatcher(isFulfilled, (state, action) => {
        // cualquier fulfilled
        console.log(action.payload);
      });
  },
});

// hacer accesibles los elementos del slice (actions y reducer) en nuestro proyecto

export default counterSlice.reducer;
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
