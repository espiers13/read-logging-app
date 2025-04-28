import { useParams } from "react-router";
import {
  getUserById,
  getReadJournal,
  getBookByIsbn,
  getFavourites,
  getFriendsByUserId,
  sendFriendRequest,
  getFriendRequestsByUserId,
  deleteFriend,
  getCurrentlyReading,
} from "../api/api";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Favourites from "../components/Favourites";
import RecentActivity from "../components/RecentActivity";
import LoadingButton from "../components/LoadingButton";

function FriendProfile({ currentUser }) {
  const { friend_username, friend_id } = useParams();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [favouritesLoading, setFavouritesLoading] = useState(false);
  const [recentActivityLoading, setRecentActivityLoading] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [requestSent, setRequestSent] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [currentlyReading, setCurrentlyReading] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUserById(friend_id).then((user) => {
      setUserData(user);
      setIsLoading(false);
    });
  }, [friend_id]);

  useEffect(() => {
    setIsLoading(true);
    getFriendsByUserId(currentUser.id).then((friends) => {
      setIsFriend(friends.some((friend) => friend.id === Number(friend_id)));
      setIsLoading(false);
    });
  }, [currentUser.id]);

  useEffect(() => {
    setRecentActivity([]);
    setRecentActivityLoading(true);
    getReadJournal(friend_username).then((journalData) => {
      const recentBooks = journalData.slice(0, 3);
      const promises = recentBooks.map((book) => {
        return getBookByIsbn(book.isbn).then(({ items }) => {
          const newBook = {
            thumbnail: items[0].volumeInfo.imageLinks.thumbnail,
            title: book.title,
            rating: book.rating,
            date_read: book.date_read,
            isbn: book.isbn,
          };
          return newBook;
        });
      });
      Promise.all(promises).then((newBooks) => {
        setRecentActivity((prevActivity) => [...prevActivity, ...newBooks]);
        setRecentActivityLoading(false);
      });
    });
  }, [friend_username]);

  useEffect(() => {
    setFavourites([]);
    setFavouritesLoading(true);
    getFavourites(friend_id).then((favouritesData) => {
      const promises = favouritesData.map((favourite) => {
        return getBookByIsbn(favourite.isbn).then(({ items }) => {
          const newBook = {
            thumbnail: items[0].volumeInfo.imageLinks.thumbnail,
            title: items[0].volumeInfo.title,
            isbn: favourite.isbn,
          };
          return newBook;
        });
      });
      Promise.all(promises).then((newBooks) => {
        setFavourites((prevFavourites) => [...prevFavourites, ...newBooks]);
        setFavouritesLoading(false);
      });
    });
  }, [friend_id]);

  useEffect(() => {
    getCurrentlyReading(friend_id).then((bookData) => {
      if (bookData) {
        getBookByIsbn(bookData.isbn).then(({ items }) => {
          const currentBook = items[0].volumeInfo;
          const newBook = {
            thumbnail:
              currentBook.imageLinks?.thumbnail ||
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
            title: currentBook.title,
            isbn: currentBook.industryIdentifiers[0].identifier,
          };
          setCurrentlyReading(newBook);
        });
      }
    });
  }, [currentUser.id]);

  useEffect(() => {
    getFriendRequestsByUserId(friend_id).then((data) => {
      setIsPending(
        data.some(
          (obj) =>
            obj.username === currentUser.username && obj.status === "pending"
        )
      );
    });
  }, [friend_id]);

  const handleAddFriend = (e) => {
    setButtonLoading(true);
    sendFriendRequest(friend_id, currentUser.id).then((request) => {
      setRequestSent(request);
      setIsPending(true);
      setButtonLoading(false);
    });
  };

  const handleRemoveFriend = (e) => {
    setButtonLoading(true);
    deleteFriend(friend_id, currentUser.id).then(() => {
      setIsPending(false)(window.location.reload());
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="w-full mb-10">
      <div className="flex items-center justify-center flex-col mt-1">
        <img src={userData.avatar} className="w-24 h-24 rounded-full" />
        {userData.pronouns && <p className="text-sm">{userData.pronouns}</p>}
        <hr className="bar border-0 clear-both w-full h-0.5 mt-5 mb-2" />

        {currentlyReading && (
          <div className="w-full">
            <div className="flex items-center justify-center flex-col">
              <h1 className="text-center">CURRENTLY READING</h1>
              <Favourites favourite={currentlyReading} />
            </div>
            <hr className="bar border-0 clear-both w-full h-0.5 mt-5 mb-2" />
          </div>
        )}

        {favourites.length > 0 ? (
          <div>
            <h1 className="text-left w-full pl-4">FAVOURITES</h1>

            {favouritesLoading ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-3 gap-0 w-full">
                {favourites.map((favourite, index) => {
                  return <Favourites favourite={favourite} key={index} />;
                })}
              </div>
            )}

            <hr className="bar border-0 clear-both w-full h-0.5 mt-2 mb-2" />
          </div>
        ) : (
          <></>
        )}
        {recentActivity.length > 0 ? (
          <div>
            <h1 className="text-left w-full pl-4">RECENT ACTIVITY</h1>

            {recentActivityLoading ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-3 gap-0 w-full">
                {recentActivity.map((book, index) => {
                  return <RecentActivity book={book} key={index} />;
                })}
              </div>
            )}
            <hr className="bar border-0 clear-both w-full h-0.5 mt-2 mb-2" />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-center mt-2">
        {isFriend ? (
          <button
            className="button px-2 py-0.5 rounded-lg"
            onClick={handleRemoveFriend}
          >
            {buttonLoading ? <LoadingButton /> : <p>Remove Friend</p>}
          </button>
        ) : isPending ? (
          <button
            className="button px-2 py-0.5 rounded-lg"
            onClick={handleRemoveFriend}
          >
            {buttonLoading ? <LoadingButton /> : <p>Cancel Friend Request</p>}
          </button>
        ) : (
          <button
            className="button px-2 py-0.5 rounded-lg"
            onClick={handleAddFriend}
          >
            {buttonLoading ? <LoadingButton /> : <p>Add Friend</p>}
          </button>
        )}
      </div>
      <div className="flex justify-center mt-2">
        <p>{requestSent}</p>
      </div>
    </main>
  );
}

export default FriendProfile;
