import React, { useEffect } from "react";
import SearchInput from "./components/SearchInput";
import SearchResponses from "./components/SearchResponses";

type Props = {};

const crypto = ["bitcoin", "litecoin", "dogecoin", "ethereum"];
const currency = ["dollars", "euros", "pesos", "rupees", "aud"];

const delayedResponse = (() => {
  let counter = 0;
  let current: NodeJS.Timeout | null = null;

  function getNext(cb: (output: string[]) => void) {
    if (current) {
      clearTimeout(current);
    }
    current = setTimeout(() => {
      if (counter % 2 === 0) {
        counter++;
        cb([...crypto]);
      } else {
        counter++;
        cb([...currency]);
      }
    }, 3000);
  }

  function getCounter() {
    return counter;
  }

  return {
    getCounter,
    getNext,
  };
})();

const Search: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searching, setSearching] = React.useState<NodeJS.Timeout>();
  const [searchResponse, setSearchResponse] = React.useState<string[]>([]);

  const updateSearch = (value: string) => {
    if (searching) {
      clearTimeout(searching);
    }

    const search = setTimeout(() => {
      setSearchTerm(value);
    }, 500);

    setSearching(search);
  };

  useEffect(() => {
    delayedResponse.getNext(setSearchResponse);
  }, [searchTerm]);

  return (
    <div>
      <SearchInput onSearch={(value) => updateSearch(value)} />
      <SearchResponses responses={searchResponse} />
    </div>
  );
};

export default Search;
