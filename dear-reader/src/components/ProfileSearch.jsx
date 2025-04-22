import { useState } from "react";
import { searchUsers } from "../api/api";
import ProfileCard from "./ProfileCard";

function ProfileSearch({ currentUser }) {
  const [searchUsername, setSearchUsername] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [users, setUsers] = useState([]);

  const handleUsername = (e) => {
    const value = e.target.value;
    setSearchUsername(value);

    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      setUsers([]);
      if (value.trim() !== "") {
        searchUsers(value).then((data) => {
          const filteredUsers = data.filter(
            (user) => user.username !== currentUser.username
          );
          setUsers(filteredUsers);
        });
      }
    }, 500);

    setTypingTimeout(timeout);
  };

  return (
    <form className="max-w-md mt-2 ml-2 mr-2 ">
      <div className="w-full max-w-sm min-w-[200px] flex flex-col items-center">
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
            value={searchUsername}
            required
          />
        </div>
      </div>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <ProfileCard user={user} currentUser={currentUser} />
            <hr className="bar border-0 clear-both w-full h-0.5 mt-2 mb-2" />
          </div>
        );
      })}
    </form>
  );
}

export default ProfileSearch;
