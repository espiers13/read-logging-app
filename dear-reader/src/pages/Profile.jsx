import ProfileTabs from "../components/ProfileTabs";
import { useState, useEffect, useRef } from "react";
import {
  getReadJournal,
  getBookByIsbn,
  getCurrentlyReading,
  fetchBookByISBN,
} from "../api/api";
import RecentActivity from "../components/RecentActivity";
import Loading from "../components/Loading";
import Favourites from "../components/Favourites";
import { getFavourites } from "../api/api";

function Profile({ currentUser }) {
  const [favourites, setFavourites] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentlyReading, setCurrentlyReading] = useState(null);

  const bookCache = useRef(new Map());

  const fetchBook = (isbn) => {
    if (bookCache.current.has(isbn)) {
      return Promise.resolve(bookCache.current.get(isbn));
    }

    return getBookByIsbn(isbn)
      .then(({ items }) => {
        const currentBook = items[0].volumeInfo;
        const bookData = {
          thumbnail:
            currentBook.imageLinks?.thumbnail ||
            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
          title: currentBook.title,
          isbn: currentBook.industryIdentifiers[0].identifier,
        };
        bookCache.current.set(isbn, bookData);
        return bookData;
      })
      .catch((error) => {
        console.error("Error fetching book:", isbn, error);
        return null;
      });
  };

  useEffect(() => {
    const loadRecentActivity = () => {
      setRecentActivity([]);
      setIsLoading(true);
      getReadJournal(currentUser.username)
        .then((journalData) => {
          const sortedData = journalData.sort(
            (a, b) => new Date(b.date_read) - new Date(a.date_read)
          );
          const recentBooks = sortedData.slice(0, 3);
          return Promise.all(
            recentBooks.map((book) => {
              return fetchBook(book.isbn).then((bookInfo) => {
                if (bookInfo) {
                  return {
                    ...bookInfo,
                    rating: book.rating,
                    date_read: book.date_read,
                  };
                }
                return null;
              });
            })
          );
        })
        .then((books) => {
          setRecentActivity(books.filter(Boolean));
        });
    };

    const loadCurrentlyReading = () => {
      getCurrentlyReading(currentUser.id).then((bookData) => {
        if (bookData) {
          return fetchBook(bookData.isbn).then((bookInfo) => {
            setCurrentlyReading(bookInfo);
          });
        }
      });
    };

    const loadFavourites = () => {
      setFavourites([]);
      getFavourites(currentUser.id)
        .then((favouritesData) => {
          return Promise.all(
            favouritesData.map((fav) => {
              return fetchBook(fav.isbn);
            })
          );
        })
        .then((books) => {
          setFavourites(books.filter(Boolean));
          setIsLoading(false);
        });
    };

    loadRecentActivity();
    loadCurrentlyReading();
    loadFavourites();
  }, [currentUser.id]);

  const { avatar } = currentUser;

  return (
    <main className="w-full mb-10">
      <ProfileTabs page="profile" currentUser={currentUser} />

      <div className="flex items-center justify-center flex-col mt-1 w-full">
        <img src={avatar} className="w-20 h-20 rounded-full" />
        {currentUser.pronouns && (
          <p className="text-sm">{currentUser.pronouns}</p>
        )}
      </div>
      <div>
        <hr className="bar border-0 clear-both w-full h-0.5 mt-1 mb-1" />
        {isLoading ? (
          <div className="text-center">
            Loading your account details...
            <Loading />
          </div>
        ) : (
          <div>
            {currentlyReading && (
              <div className="flex items-center justify-center flex-col">
                <h1 className="text-center">CURRENTLY READING</h1>
                <Favourites favourite={currentlyReading} />
              </div>
            )}

            <hr className="bar border-0 clear-both w-full h-0.5 mt-1 mb-1" />
            <h1 className="text-left w-full pl-4">FAVOURITES</h1>

            <div className="grid grid-cols-3 gap-0 w-full">
              {favourites.map((favourite, index) => {
                return <Favourites favourite={favourite} key={index} />;
              })}
            </div>

            <hr className="bar border-0 clear-both w-full h-0.5 mt-1 mb-1" />

            <h1 className="text-left w-full pl-4">RECENT ACTIVITY</h1>

            <div className="grid grid-cols-3 gap-0 w-full">
              {recentActivity.map((book, index) => {
                return <RecentActivity book={book} key={index} />;
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Profile;
