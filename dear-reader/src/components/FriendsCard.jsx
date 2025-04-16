import { useNavigate } from "react-router-dom";
import { useState } from "react";

function FriendsCard({ friend }) {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  const manageRemoveFriend = (e) => {
    setPopup(!popup);
    console.log(popup);
  };

  return (
    <div className="flex items-center space-x-4 mt-2 ml-3">
      <div className="shrink-0">
        <button
          onClick={() => {
            navigate(`/user/${friend.username}/${friend.id}`);
          }}
        >
          <img
            className="w-8 h-8 rounded-full"
            src={friend.avatar}
            alt={friend.username}
          />
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{friend.username}</p>
        <button onClick={manageRemoveFriend} className="text-sm text-gray-500">
          remove friend
        </button>
      </div>
    </div>
  );
}

export default FriendsCard;
