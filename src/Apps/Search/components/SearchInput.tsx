import React from "react";

type Props = {
  onSearch: (value: string) => void;
};

const SearchInput: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
