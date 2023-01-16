import { request } from "http";
import React, { useEffect } from "react";
import SearchInput from "./components/SearchInput";
import SearchResponses from "./components/SearchResponses";

type Props = {};

const crypto = ["bitcoin", "litecoin", "dogecoin", "ethereum"];
const currency = ["dollars", "euros", "pesos", "rupees", "aud"];

const api = (() => {
  let counter = 0;
  let currentTimeout: NodeJS.Timeout | null = null;
  let currentInterval: NodeJS.Timeout | null = null;

  const clear = () => {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    if (currentInterval) {
      clearInterval(currentInterval);
    }
  };

  function getNext(cb: (output: string[]) => void, time: number) {
    clear();
    currentTimeout = setTimeout(() => {
      if (counter % 2 === 0) {
        cb([...crypto]);
      } else {
        cb([...currency]);
      }
      counter++;
    }, time);
  }

  function repeatGetNext(cb: (output: string[]) => void, time: number) {
    clear();
    currentInterval = setInterval(() => {
      if (counter % 2 === 0) {
        cb([...crypto]);
      } else {
        cb([...currency]);
      }
      counter++;
    }, time);
  }

  return {
    repeatGetNext,
    getNext,
  };
})();

// write a function that returns
// debounce waits a certain amount of time and then calls fn
// first time a function is called, should make the call
// after first call debounce function

// const customDebounce = (fn: () => any, waitTime: number) => {
//   let calledOnce = false;
//   let timeout: null | NodeJS.Timeout;
  
//   return (...args: []) => {
//     if(calledOnce) {
//       timeout && clearTimeout(timeout)
//       timeout = setTimeout(() => {
//         return fn.apply(this, args)
//       }, waitTime)
//     } else {
//       calledOnce = true
//       return fn.apply(this, args)
//     }
//   }
// }

const throttle = function (fn: Function, waitTime: number) {
  let isWaiting = false;
  
  return function(this: any) {
    if(!isWaiting) {
      isWaiting = true
      setTimeout(() => {
        isWaiting = false
      }, waitTime)
      return fn.apply(this, arguments)
      // inside then, update the wait condition, maybe no need for wait time
    }
  }
}

// write a function called call if not pending
// fn takes input asyncFn which is async fn
// callifnotpendingfn outputs a function that will call the inputted asyncfn only if the last call has completed
const callIfNotPending = (asyncFn: () => any) => {
  let lastCallCompleted = true;
  return async (...args: []) => {
    if (lastCallCompleted) {
      lastCallCompleted = false;
      return asyncFn.apply(this, args).then((res: any) => {
        lastCallCompleted = true;
        return res
      });
    }
  };
};
callIfNotPending(async () => {});

const Search: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout>();
  const [searchResponse, setSearchResponse] = React.useState<string[]>([]);
  const [repeatCalls, setRepeatCalls] = React.useState(false);

  const updateSearch = (value: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const s = setTimeout(() => {
      // can be a function that searches and does something more
      setSearchTerm(value);
    }, 500);

    setSearchTimeout(s);
  };

  useEffect(() => {
    // initial state should not fetch calls
    if (!searchTerm) {
      return;
    }

    if (repeatCalls) {
      api.repeatGetNext(setSearchResponse, 2000);
    } else {
      api.getNext(setSearchResponse, 1000);
    }
  }, [searchTerm, repeatCalls]);

  const toggleRepeat = () => {
    setRepeatCalls(true);
  };

  return (
    <div>
      <button onClick={() => toggleRepeat()}>repeat fetching</button>
      <SearchInput onSearch={(value) => updateSearch(value)} />
      <SearchResponses responses={searchResponse} />
    </div>
  );
};

export default Search;
