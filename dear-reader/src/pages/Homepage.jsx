import { useState, useEffect } from "react";
import {
  getBestSellers,
  getRandomQuote,
  getBookshelf,
  getBookByIsbn,
  getFriendsByUserId,
  getReadJournal,
} from "../api/api";
import BookCard from "../components/BookCard.jsx";
import Loading from "../components/Loading";
import RandomQuote from "../components/RandomQuote";
import FriendsActivityCard from "../components/FriendsActivityCard.jsx";

function Homepage({ currentUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [trendingList, setTrendingList] = useState([]);
  const [bookQuote, setBookQuote] = useState({});
  const [bookshelf, setBookshelf] = useState([]);
  const [friendsActivity, setFriendsActivity] = useState([]);
  const [hasFriends, setHasFriends] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getRandomQuote().then((data) => {
      setBookQuote(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getBestSellers().then((data) => {
      setTrendingList(data.results.books);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!currentUser?.id) return;

    setIsLoading(true);

    getFriendsByUserId(currentUser.id)
      .then((friends) => {
        if (friends.length > 0) {
          setHasFriends(true);
        }
        const activityPromises = friends.map(({ username, avatar }) => {
          return getReadJournal(username).then((books) => {
            if (!books.length) return null;
            const mostRecentBook = books.sort(
              (a, b) => new Date(b.date_read) - new Date(a.date_read)
            )[0];

            return getBookByIsbn(mostRecentBook.isbn).then((bookData) => {
              return {
                username,
                avatar,
                book_image: bookData.items[0].volumeInfo.imageLinks.thumbnail,
                title: mostRecentBook.title,
                isbn: mostRecentBook.isbn,
                rating: mostRecentBook.rating,
              };
            });
          });
        });

        return Promise.all(activityPromises);
      })
      .then((activities) => {
        const filtered = activities.filter(Boolean);
        setFriendsActivity(filtered);
      })
      .catch((error) => {
        console.error("Error fetching friends activity:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser.id]);

  useEffect(() => {
    setBookshelf([]);
    setIsLoading(true);
    getBookshelf(currentUser.username).then((bookshelfData) => {
      const promises = bookshelfData.map((book) => {
        return getBookByIsbn(book.isbn).then(({ items }) => {
          const newBook = {
            book_image: items[0].volumeInfo.imageLinks.thumbnail,
            title: book.title,
            primary_isbn10: book.isbn,
          };
          return newBook;
        });
      });
      Promise.all(promises).then((newBooks) => {
        setBookshelf((prevBookshelf) => [...prevBookshelf, ...newBooks]);
        setIsLoading(false);
      });
    });
  }, [currentUser.id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      {!bookQuote ? (
        <></>
      ) : (
        <div className="mb-8">
          <RandomQuote bookQuote={bookQuote} />
        </div>
      )}
      <p className="font-roboto tracking-widest mt-4">Trending this week</p>

      <div className="flex overflow-x-scroll hide-scroll-bar mt-4 shadow-2xl">
        <div className="flex flex-nowrap ">
          {trendingList.map((book) => {
            return <BookCard book={book} key={book.rank} />;
          })}
        </div>
      </div>
      {hasFriends ? (
        <div>
          {" "}
          <p className="font-roboto tracking-widest mt-4">New from friends</p>
          <div className="flex overflow-x-scroll hide-scroll-bar mt-4 shadow-2xl">
            <div className="flex flex-nowrap ">
              {friendsActivity.map((book, index) => {
                return <FriendsActivityCard book={book} key={index} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <p className="font-roboto tracking-widest mt-4">On your bookshelf</p>
      <div className="flex overflow-x-scroll hide-scroll-bar mt-4 shadow-2xl">
        <div className="flex flex-nowrap ">
          {bookshelf.map((book, index) => {
            return <BookCard book={book} key={index} />;
          })}
        </div>
      </div>
    </main>
  );
}

export default Homepage;
