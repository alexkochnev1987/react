import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
const ITEMS_API_URL = "http://data.fixer.io/api/latest";
const access_key = "2df9ab7f9e13a75b5c13e11995550c1d";

const DEBOUNCE_DELAY = 500;
const options = {
  url: ITEMS_API_URL,
  method: "get",
  params: {
    access_key: access_key,
    base: "EUR",
  },
};

// the exported component can be either a function or a class

export default function Autocomplete() {
  const [response, setResponse] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {};

  // const debounce = (fn: Function, ms: number) => {
  //   let timeout: NodeJS.Timeout;
  //   return function (this: any, ...args: any[]) {
  //     const fnCall = () => fn.apply(this, args);
  //     clearTimeout(timeout);
  //     timeout = setTimeout(fnCall, ms);
  //   };
  // };

  const getData = async (value: string) => {
    try {
      setLoading(true);
      const { data } = await axios(options);
      // .get(ITEMS_API_URL, {
      //   params: { access_key: access_key, base: "EUR" },
      // });

      // const data = [value];
      console.log(data);

      setResponse(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const debounce = (fn: Function, ms: number) => {
    let timer: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
      const callFn = () => fn.apply(this, args);
      clearTimeout(timer);
      timer = setTimeout(callFn, ms);
    };
  };

  const debouncedGetData = useMemo(() => debounce(getData, DEBOUNCE_DELAY), []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
    debouncedGetData(value);
  };

  return (
    <div style={{ background: loading ? "red" : "none" }}>
      <input onChange={handleChange} value={value} />
    </div>
  );
}
