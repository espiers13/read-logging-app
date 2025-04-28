import { useState, useEffect } from "react";
import {
  addToBookshelf,
  deleteFromBookshelf,
  deleteFromReadJournal,
  markBookAsRead,
  getReadJournal,
  getBookshelf,
} from "../api/api";

function FooterSearchCard({ book, currentUser }) {
  const { id, username } = currentUser;
  const currentBook = book.volumeInfo;
  const isbn = currentBook?.industryIdentifiers?.[0]?.identifier || null;
  const { title, publishedDate } = currentBook;
  const [isRead, setIsRead] = useState(false);
  const [isOnBookshelf, setIsOnBookshelf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(null);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    if (currentBook.authors) {
      setAuthors(currentBook.authors);
    } else setAuthors(["Unknown"]);
  }, [book]);

  useEffect(() => {
    setIsLoading(true);
    getReadJournal(username).then((books) => {
      setIsRead(books.some((book) => book.isbn === isbn));
      const list = books.find((book) => book.isbn === isbn);
    });
  }, [isbn]);

  useEffect(() => {
    setIsLoading(true);
    getBookshelf(username).then((books) => {
      setIsOnBookshelf(books.some((book) => book.isbn === isbn));
      setIsLoading(false);
    });
  }, [isbn]);

  const handleRead = (e) => {
    setIsLoading(true);
    if (isRead) {
      deleteFromReadJournal(id, isbn)
        .then((data) => {
          setIsRead(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!isRead) {
      markBookAsRead(isbn, rating, review, id)
        .then((data) => {
          setIsRead(true);
          setIsOnBookshelf(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleBookshelf = (e) => {
    setIsLoading(true);
    if (isOnBookshelf) {
      deleteFromBookshelf(id, isbn).then((data) => {
        setIsOnBookshelf(false);
        setIsLoading(false);
      });
    }
    if (!isOnBookshelf) {
      addToBookshelf(id, isbn, title).then((data) => {
        setIsOnBookshelf(true);
        setIsLoading(false);
      });
    }
  };

  const image =
    currentBook?.imageLinks?.thumbnail ||
    "https://www.press.uillinois.edu/books/images/no_cover.jpg";

  return (
    <main>
      <div className="flex items-center  p-2 rounded-sm shadow-lg">
        <div className="w-full flex items-center gap-3 text-left">
          <img className="w-12 ml-1" src={image} alt={title} />
          <div className="flex flex-col">
            <p className="font-medium">{title}</p>
            <p className="text-xs">{publishedDate}</p>
            {authors.length > 1 ? (
              <p className="text-xs">by {authors[0]} et al.</p>
            ) : (
              <p className="text-xs">by {authors[0]}</p>
            )}
          </div>
          <div className="ml-auto text-right">
            <button
              className="flex flex-col items-center"
              onClick={handleRead}
              disabled={isLoading}
            >
              {isRead ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-slate-200"
                >
                  <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                </svg>
              ) : (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-8 w-8 text-slate-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              )}
            </button>
            <button
              className="flex flex-col items-center"
              onClick={handleBookshelf}
              disabled={isLoading}
            >
              {isOnBookshelf ? (
                <svg
                  className="h-8 w-8 text-slate-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8 text-slate-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default FooterSearchCard;
