import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="search-container w-100">
      <input
        type="text"
        placeholder="Search for spliwisers..."
        value={input}
        onChange={handleInputChange}
        className="w-100 py-2 px-3 search-input"
      />
      <FontAwesomeIcon className="search-icon" icon={faSearch} />
    </div>
  );
};

export default SearchBar;
