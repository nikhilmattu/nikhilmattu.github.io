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
          // triggers rerender of component
          setSearchTerm(e.target.value);
          // debugger
          // does not run until after rerender is done
          // but will reference previous search term instead of new value
          onSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
