import { useNavigate } from "react-router-dom";
import { acceptFriendRequest } from "../api/api";

function FriendRequestCard({ friend, currentUser }) {
  const navigate = useNavigate();
  const { avatar, username, status } = friend;

  const handleConfirm = (e) => {
    acceptFriendRequest(friend.id, currentUser.id).then((results) => {
      window.location.reload();
    });
  };

  const handleRemove = (e) => {
    console.log("remove");
  };

  return (
    <div className="flex items-center space-x-4 mt-2 ml-3">
      <div className="shrink-0">
        <button
          onClick={() => {
            navigate(`/user/${friend.username}/${friend.id}`);
          }}
        >
          <img className="w-8 h-8 rounded-full" src={avatar} alt={username} />
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{friend.username}</p>
        <div className="flex justify-start items-start space-x-4 mt-1">
          <button
            className="button text-sm px-1 py-0.5 mt-1 rounded-lg"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-500 text-sm px-1 py-0.5 mt-1 rounded-lg"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendRequestCard;
