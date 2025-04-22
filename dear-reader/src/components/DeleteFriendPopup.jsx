import { deleteFriend } from "../api/api";
import { useState } from "react";

function DeleteFriendPopup({ friend, setPopup, popup, user_id }) {
  const friend_id = friend.id;
  const [isLoading, setIsLoading] = useState(false);
  const [friendDeleted, setFriendDeleted] = useState(false);

  const handleDeleteFriend = (e) => {
    setIsLoading(true);
    deleteFriend(friend_id, user_id);
    setFriendDeleted(true).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {friendDeleted ? (
          <p>{friend.username} has been removed as a friend!</p>
        ) : (
          <div>
            <div className="text-center">
              Are you sure you would like to delete
              <em className="italic"> {friend.username} </em> as a friend? You
              will have to send a new request to reconnect with them.
            </div>
            <hr className="bg-gray-300 border-0 clear-both w-full h-0.5 mt-2 mb-2" />
            <div className="flex justify-center items-center space-x-10 mt-2">
              <button className="" onClick={() => setPopup(!popup)}>
                Close
              </button>
              <button
                className="bg-red-500 px-1 rounded-lg"
                onClick={handleDeleteFriend}
              >
                Remove friend
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteFriendPopup;
