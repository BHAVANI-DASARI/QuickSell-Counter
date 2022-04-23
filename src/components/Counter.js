import { useState, useEffect, useCallback, useImperativeHandle } from "react";
import axios from "axios";
export function Counter() {
  const [state, setState] = useState(1);
  const [Load, SetLoad] = useState(false);
  const MAX_VALUE = 1000 || Number.MAX_VALUE;
  useEffect(() => {
    getdata();
  }, []);
  var getdata = () => {
    axios
      .get(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json"
      )
      .then((res) => {
        // console.log(res);
        if (res.data == null) {
          res.data = 1;
        }
        setState(res.data);
      });
  };
  const Counter1 = useCallback((el) => put(el) || []);
  const countValue = (el) => {
    SetLoad(true);
    var count = state;
    count = count + el;
    count = count > MAX_VALUE ? MAX_VALUE : count;
    setState(count);

    Counter1(count);
    setTimeout(() => {
      SetLoad(false);
    }, 1000);
  };
  const handle = (e) => {
    var x = +e.target.value;
    SetLoad(true);
    setState(x);
    Counter1(x);
    setTimeout(() => {
      SetLoad(false);
    }, 1000);
  };
  const put = (item) => {
    axios
      .put(
        " https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",
        { Bhavani: item }
      )
      .then((res) => {
        console.log(res.data.Bhavani);
        setState(res.data.Bhavani);
      });
  };
  return (
    <div>
      <div className={Load ? "non" : "Nonloader"}>
        <span className={Load ? "Loader" : ""}></span>
        Saving Counter Value
      </div>
      <div className="parent">
        <button className="sub" onClick={() => countValue(-1)}>
          -
        </button>
        <input
          type="Number"
          className="count"
          value={state}
          onChange={handle}
        />
        <button className="add" onClick={() => countValue(1)}>
          +
        </button>
      </div>
      <div> Counter Value:{state}</div>
    </div>
  );
}
