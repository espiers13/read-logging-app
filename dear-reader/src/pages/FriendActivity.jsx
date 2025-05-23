import { getFriendsByUserId, getReadJournal } from "../api/api";
import { useState, useEffect } from "react";
import FriendActivityCard from "../components/FriendActivityCard";
import ProfileSearch from "../components/ProfileSearch";
import SearchBar from "../components/SearchBar";

function FriendActivity({ currentUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [friendsActivity, setFriendsActivity] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setFriendsActivity([]);
    getFriendsByUserId(currentUser.id).then((friends) => {
      setFriends(friends);
      friends.forEach((friend) => {
        getReadJournal(friend.username).then((journal) => {
          journal.forEach((book) => {
            const bookRead = {
              id: book.id,
              isbn: book.isbn,
              date_read: book.date_read,
              friend_username: friend.username,
              friend_id: book.user_id,
              avatar: friend.avatar,
              rating: book.rating,
              review: book.review,
            };
            setFriendsActivity((prevFriendsActivity) => [
              ...prevFriendsActivity,
              bookRead,
            ]);
          });
        });
      });
    });
  }, []);

  const groupedBooks = friendsActivity
    .sort((a, b) => new Date(b.date_read) - new Date(a.date_read))
    .reduce((acc, book) => {
      const monthYear = new Date(book.date_read).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }

      acc[monthYear].push(book);
      return acc;
    }, {});

  return (
    <main className="w-full mb-10">
      {friends.length > 0 && friendsActivity.length === 0 && (
        <div className="text-sm text-center">
          <p>Your friends haven't logged any books yet!</p>
          <p className="mb-4">
            Search for some books to send them reccomendations:
          </p>
          <SearchBar />
        </div>
      )}
      <div>
        {friends.length > 0 ? (
          <ul>
            {Object.keys(groupedBooks).map((monthYear) => (
              <li key={monthYear}>
                <div className="bar w-screen p-1 mb-4">
                  <p className="ml-2 font-semibold text-lg">{monthYear}</p>
                </div>

                <ul className="mb-5">
                  {groupedBooks[monthYear].map((book, bookIndex) => {
                    const isLastBook =
                      bookIndex === groupedBooks[monthYear].length - 1;
                    return (
                      <li key={book.id || `${book.isbn}-${bookIndex}`}>
                        <FriendActivityCard
                          book={book}
                          currentUser={currentUser}
                        />
                        {!isLastBook && (
                          <hr className="bar border-0 clear-both w-full h-0.5 mt-2 mb-2" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <ProfileSearch />
        )}
      </div>
    </main>
  );
}

export default FriendActivity;
