import { useState } from "react";
import { useNavigate } from "react-router";
import { getIdByUsername } from "../api/api";

function ProfileSearch() {
  const [searchUsername, setSearchUsername] = useState("");
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setSearchUsername(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getIdByUsername(searchUsername).then((user) => {
      navigate(`/user/${user.username}/${user.id}`);
    });
    // navigate(`/user/${username}`);
  };

  return (
    <form className="max-w-md mt-2 ml-2 mr-2 ">
      <div className="w-full max-w-sm min-w-[200px] flex flex-col items-center">
        {/* Search Input */}
        <div className="relative w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            type="text"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease shadow-sm"
            placeholder="Search username..."
            onChange={handleUsername}
            required
          />
        </div>

        {/* Search Button placed underneath and centered */}
        <div className="mt-4 w-full text-center">
          <button
            className="rounded-md button py-1 px-3 border border-transparent text-sm text-white transition-all shadow-md"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProfileSearch;
