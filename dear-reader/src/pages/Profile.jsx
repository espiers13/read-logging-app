import ProfileTabs from "../components/ProfileTabs";
import { useState, useEffect } from "react";
import { getReadJournal, getBookByIsbn } from "../api/api";
import RecentActivity from "../components/RecentActivity";
import Loading from "../components/Loading";

function Profile({ currentUser }) {
  const [favourites, setFavourites] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRecentActivity([]);
    setIsLoading(true);
    getReadJournal(currentUser.username).then((journalData) => {
      const recentBooks = journalData.slice(0, 3);
      const promises = recentBooks.map((book) => {
        return getBookByIsbn(book.isbn).then(({ items }) => {
          const newBook = {
            thumbnail: items[0].volumeInfo.imageLinks.thumbnail,
            title: book.title,
            rating: book.rating,
            date_read: book.date_read,
          };
          return newBook;
        });
      });
      Promise.all(promises).then((newBooks) => {
        setRecentActivity((prevActivity) => [...prevActivity, ...newBooks]);
        setIsLoading(false);
      });
    });
  }, [currentUser.id]);

  const { avatar } = currentUser;

  return (
    <main>
      <ProfileTabs page="profile" currentUser={currentUser} />

      <div className="flex items-center justify-center flex-col mt-4">
        <img src={avatar} className="w-24 h-24 rounded-full" />

        <hr className="bar border-0 clear-both w-full h-0.5 mt-2 mb-2" />

        <h1 className="text-left w-full pl-4">FAVOURITES</h1>

        <hr className="bar border-0 clear-both w-full h-0.5 mt-2 mb-2" />

        <h1 className="text-left w-full pl-4">RECENT ACTIVITY</h1>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-cols-3 justify-start w-full">
            {recentActivity.map((book, index) => {
              return <RecentActivity book={book} key={index} />;
            })}
          </div>
        )}
        <hr className="bar border-0 clear-both w-full h-0.5 mt-2 mb-2" />
      </div>
    </main>
  );
}

export default Profile;
