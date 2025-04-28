import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { sendFriendRequest, getFriendRequestsByUserId } from "../api/api";

function ProfileCard({ user, currentUser }) {
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState("");

  useEffect(() => {
    getFriendRequestsByUserId(user.id).then((data) => {
      const hasRequest = data.some(
        (obj) =>
          obj.username === currentUser.username && obj.status === "pending"
      );
      const isFriend = data.some(
        (obj) =>
          obj.username === currentUser.username && obj.status === "accepted"
      );
      if (hasRequest) {
        setRequestSent("Friendship pending...");
      }
      if (isFriend) {
        setRequestSent("You're already friends!");
      }
    });
  }, [user.id]);

  const manageAddFriend = (e) => {
    sendFriendRequest(user.id, currentUser.id).then((request) => {
      setRequestSent(request);
    });
  };

  return (
    <div className="flex items-center space-x-4 mt-2">
      <div className="shrink-0">
        <button
          onClick={() => {
            navigate(`/user/${user.username}/${user.id}`);
          }}
        >
          <img
            className="w-8 h-8 rounded-full"
            src={user.avatar}
            alt={user.username}
          />
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{user.username}</p>
        {requestSent ? (
          <p className="text-sm text-gray-500">{requestSent}</p>
        ) : (
          <button
            onClick={manageAddFriend}
            type="button"
            className="text-sm text-white bg-gray-500 px-1 rounded-lg"
          >
            Add friend
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
