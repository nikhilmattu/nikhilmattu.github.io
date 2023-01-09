import React from "react";

type Props = {};

const crypto = ['bitcoin', 'litecoin', 'dogecoin', 'ethereum']
const currency = ['dollars', 'euros', 'pesos', 'rupees']


const delayedResponse = () => {
    setTimeout(() => {
        return [...crypto]
    }, 3000)
}

const immediateResponse = () => {
    return [...currency]
}

const Search: React.FC<Props> = () => {
  return <div>search</div>;
};

export default Search;
