import { useCallback, useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";

import { getUsers } from "../api/apiCalls";
import fakeUsers from "../data/users";

const SearchBar = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(true);
  const [users, setUsers] = useState(fakeUsers);

  const fetchUsers = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const result = await getUsers(token);
      // setUsers(result);
    } catch (err) {
      setUsers([]);
    }
  }, [getAccessTokenSilently]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="search-container w-100">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for spliwisers..."
          value={input}
          onChange={handleInputChange}
          onClick={() => setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
          className="w-100 py-2 px-3 search-input"
        />
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
      </div>

      {showDropdown && (
        <div className="dropdown-container">
          {users.length > 0 ? (
            users.map((user) => (
              <div className="dropdown-item" key={user.id}>
                <Gravatar email={user.email} className="profile-pic" />
                <span className="user-name">{user.name}</span>
              </div>
            ))
          ) : (
            <div className="dropdown-item">No users found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
