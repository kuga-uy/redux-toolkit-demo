import { RootState } from "../store";

export const selectCount = (state: RootState) => state.reducers.counter.value;
export const selectCountStatus = (state: RootState) =>
  state.reducers.counter.status;
