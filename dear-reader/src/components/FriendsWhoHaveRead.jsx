import { useEffect, useState } from "react";
import { getFriendsByUserId, getReadJournal } from "../api/api";
import FriendsBookCard from "./FriendsBookCard";

function FriendsWhoHaveRead({ currentUser, isbn, myReview }) {
  const { id } = currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [friendsWhoHaveRead, setFriendsWhoHaveRead] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    if (!id) return;

    getFriendsByUserId(id)
      .then((friends) => {
        return Promise.all(
          friends.map((friend) =>
            getReadJournal(friend.username).then((journal) => {
              const matchedEntry = journal.find((entry) => entry.isbn === isbn);
              if (matchedEntry) {
                return {
                  username: friend.username,
                  avatar: friend.avatar,
                  date_read: matchedEntry.date_read,
                  rating: matchedEntry.rating,
                  review: matchedEntry.review,
                };
              }
              return null;
            })
          )
        );
      })
      .then((results) => {
        const detailedFriends = results.filter(Boolean); // remove nulls
        setFriendsWhoHaveRead(detailedFriends);
      })
      .catch((error) => {
        console.error("Error fetching read journals:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, isbn]);

  if (friendsWhoHaveRead.length === 0) {
    return <></>;
  }

  return (
    <div className="mt-3">
      {myReview ? <></> : <hr className="border-0 h-px bg-gray-300 my-2" />}

      <h2 className="text-sm mb-2">Friends who have read this book:</h2>

      {friendsWhoHaveRead.map((friend, index) => {
        return <FriendsBookCard friend={friend} key={index} />;
      })}
      <hr className="border-0 h-px bg-gray-300 my-3" />
    </div>
  );
}

export default FriendsWhoHaveRead;
