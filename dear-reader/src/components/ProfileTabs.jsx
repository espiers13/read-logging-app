import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProfileTabs({ page, currentUser }) {
  const navigate = useNavigate();
  const { id } = currentUser;

  return (
    <main className="flex items-center justify-center w-full">
      <div className="inline-flex w-full rounded-md shadow-xs" role="group">
        <button
          type="button"
          className={`w-full px-4 py-2 text-sm font-medium text-gray-900 border rounded-l-lg ${
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
          className={`w-full px-4 py-2 text-sm font-medium text-gray-900 border-t border-b ${
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
          className={`w-full px-4 py-2 text-sm font-medium text-gray-900 border-t border-b border-l ${
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
          className={`w-full px-4 py-2 text-sm font-medium text-gray-900 border rounded-r-lg ${
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
