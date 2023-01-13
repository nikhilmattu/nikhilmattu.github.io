import React from "react";

type Props = {
  responses: string[];
};

const SearchResponses: React.FC<Props> = ({ responses }) => {
  const responseElements = responses.map((response, index) => {
    return <div key={`${index}_${response}`}>{response}</div>;
  });
  return <>{responseElements}</>;
};

export default SearchResponses;
