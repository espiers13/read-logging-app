import ProfileTabs from "../components/ProfileTabs";
import { useState, useEffect } from "react";
import { getReadJournal, getBookByIsbn, fetchBookByISBN } from "../api/api";
import RecentActivity from "../components/RecentActivity";
import Loading from "../components/Loading";
import Favourites from "../components/Favourites";
import { getFavourites } from "../api/api";

function Profile({ currentUser }) {
  const [favourites, setFavourites] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [recentActivityLoading, setRecentActivityLoading] = useState(false);
  const [favouritesLoading, setFavouritesLoading] = useState(false);

  useEffect(() => {
    setRecentActivity([]);
    setRecentActivityLoading(true);
    getReadJournal(currentUser.username).then((journalData) => {
      const recentBooks = journalData.slice(0, 3);
      const promises = recentBooks.map((book) => {
        return fetchBookByISBN(book.isbn).then((data) => {
          const newBook = {
            thumbnail:
              data.cover?.large ||
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
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
  }, [currentUser.id]);

  useEffect(() => {
    setFavourites([]);
    setFavouritesLoading(true);
    getFavourites(currentUser.id).then((favouritesData) => {
      const promises = favouritesData.map((favourite) => {
        return fetchBookByISBN(favourite.isbn).then((data) => {
          const newBook = {
            thumbnail:
              data.cover?.large ||
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
            title: data.title,
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
  }, [currentUser.id]);

  const { avatar } = currentUser;

  return (
    <main>
      <ProfileTabs page="profile" currentUser={currentUser} />

      <div className="flex items-center justify-center flex-col mt-4">
        <img src={avatar} className="w-24 h-24 rounded-full" />

        <hr className="bar border-0 clear-both w-full h-0.5 mt-2 mb-2" />

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
    </main>
  );
}

export default Profile;
