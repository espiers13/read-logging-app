import { useNavigate } from "react-router-dom";

function ProfileTabs({ page, currentUser }) {
  const navigate = useNavigate();
  const { id } = currentUser;

  return (
    <main className="flex items-center justify-center w-full overflow-hidden">
      <div
        className="flex w-full max-w-md rounded-md shadow-xs overflow-hidden"
        role="group"
      >
        <button
          type="button"
          className={`flex-1 px-2 py-2 text-sm font-medium text-gray-900 border rounded-l-lg ${
            page === "profile" ? "active-button" : "profile-tabs"
          }`}
          onClick={() => {
            navigate(`/${id}/profile`);
          }}
        >
          Profile
        </button>
        <button
          type="button"
          className={`flex-1 px-2 py-2 text-sm font-medium text-gray-900 border-t border-b ${
            page === "journal" ? "active-button" : "profile-tabs"
          }`}
          onClick={() => {
            navigate(`/${id}/journal`);
          }}
        >
          Journal
        </button>
        <button
          type="button"
          className={`flex-1 px-2 py-2 text-sm font-medium text-gray-900 border-t border-b border-l ${
            page === "stats" ? "active-button" : "profile-tabs"
          }`}
          onClick={() => {
            navigate(`/${id}/stats`);
          }}
        >
          Statistics
        </button>
        <button
          type="button"
          className={`flex-1 px-2 py-2 text-sm font-medium text-gray-900 border-t border-b border-l ${
            page === "bookshelf" ? "active-button" : "profile-tabs"
          }`}
          onClick={() => {
            navigate(`/${id}/bookshelf`);
          }}
        >
          Bookshelf
        </button>
        <button
          type="button"
          className={`flex-1 px-2 py-2 text-sm font-medium text-gray-900 border rounded-r-lg ${
            page === "friends" ? "active-button" : "profile-tabs"
          }`}
          onClick={() => {
            navigate(`/${id}/friends`);
          }}
        >
          Friends
        </button>
      </div>
    </main>
  );
}

export default ProfileTabs;
