import { useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  REQUEST_STATUS,
} from "../redux/counter/counterSlice";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { selectCount, selectCountStatus } from "../redux/counter/selectors";
import endava from "../assets/endava.png";
import { useAppDispatch } from "../redux/store";
import "./Counter.css";
import { TailSpin } from "react-loader-spinner";

const Counter = () => {
  const count = useSelector(selectCount);
  const countStatus = useSelector(selectCountStatus);
  const loading = countStatus === REQUEST_STATUS.PENDING;
  const dispatch = useAppDispatch();

  return (
    <div className="counter-container">
      <img className="img" src={endava} />

      <h1>Redux Toolkit Counter</h1>

      <span className="counter-value">
        {loading ? <TailSpin color="#f05c24" height={80} width={80} /> : count}
      </span>
      <div className="buttons-container">
        <button className="button" onClick={() => dispatch(increment())}>
          +10
        </button>
        <button className="button" onClick={() => dispatch(decrement())}>
          -10
        </button>
        <button
          className="button"
          onClick={() => dispatch(incrementByAmount(count))}
        >
          Increment by count value
        </button>
        <button
          className="button"
          onClick={() => dispatch(incrementAsync(count))}
        >
          Async + count value
        </button>
      </div>
    </div>
  );
};

export default Counter;
