import { useState, useEffect } from "react";
import {
  getBestSellers,
  getRandomQuote,
  getBookshelf,
  getBookByIsbn,
} from "../api/api";
import BestSellers from "../components/BestSellersCard";
import Loading from "../components/Loading";
import RandomQuote from "../components/RandomQuote";

function Homepage({ currentUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [trendingList, setTrendingList] = useState([]);
  const [bookQuote, setBookQuote] = useState({});
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getBestSellers().then((data) => {
      setTrendingList(data.results.books);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getRandomQuote().then((data) => {
      setBookQuote(data);
      setIsLoading(false);
    });
  }, []);

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
      <p className="font-roboto tracking-widest mt-8">Trending this week</p>

      <div className="flex overflow-x-scroll hide-scroll-bar mt-5 shadow-2xl">
        <div className="flex flex-nowrap ">
          {trendingList.map((book) => {
            return <BestSellers book={book} key={book.rank} />;
          })}
        </div>
      </div>
      <p className="font-roboto tracking-widest mt-8">New from friends</p>
      <div className="flex overflow-x-scroll hide-scroll-bar mt-5 shadow-2xl">
        <div className="flex flex-nowrap ">
          {trendingList.map((book) => {
            return <BestSellers book={book} key={book.rank} />;
          })}
        </div>
      </div>
      <p className="font-roboto tracking-widest mt-8">On your bookshelf</p>
      <div className="flex overflow-x-scroll hide-scroll-bar mt-5 shadow-2xl">
        <div className="flex flex-nowrap ">
          {bookshelf.map((book) => {
            return (
              <div key={book.isbn}>
                <BestSellers book={book} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Homepage;
