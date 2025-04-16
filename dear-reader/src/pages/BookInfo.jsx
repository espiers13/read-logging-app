import { getBookByIsbn } from "../api/api";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import BookMenu from "../components/BookMenu";
import Rating from "@mui/material/Rating";
import { getReadJournal, getBookshelf } from "../api/api";

function BookInfo({ currentUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [popup, setPopup] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isOnBookshelf, setIsOnBookshelf] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  let image =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
  const { username } = currentUser;
  const { book_id } = useParams();
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setIsLoading(true);
    getBookByIsbn(book_id).then(({ items }) => {
      setCurrentBook(items[0].volumeInfo), setIsLoading(false);
    });
  }, [book_id]);

  useEffect(() => {
    setIsLoading(true);
    getReadJournal(username).then((books) => {
      setIsRead(books.some((book) => book.isbn === book_id));
      const list = books.find((book) => book.isbn === book_id);
      setRating(list ? list.rating : null);
      setIsLoading(false);
    });
  }, [book_id]);

  useEffect(() => {
    setIsLoading(true);
    getBookshelf(username).then((books) => {
      setIsOnBookshelf(books.some((book) => book.isbn === book_id));
      setIsLoading(false);
    });
  }, [book_id]);

  if (!currentBook) {
    return <Loading />;
  }

  image = currentBook.imageLinks?.thumbnail || image;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="">
      {popup ? (
        <BookMenu
          isOnBookshelf={isOnBookshelf}
          setPopup={setPopup}
          isRead={isRead}
          currentUser={currentUser}
          rating={rating}
          setRating={setRating}
          title={currentBook.title}
          isbn={book_id}
          setIsRead={setIsRead}
          setIsOnBookshelf={setIsOnBookshelf}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-between items-center space-x-4 ml-1 mr-4 ">
        <div>
          <button onClick={handleGoBack}>
            <svg
              className="h-8 w-8 mt-2 ml-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>
        </div>
        <div className="justify-end">
          <button onClick={() => setPopup(true)}>
            <svg
              className="h-8 w-8 mt-2 ml-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="5" cy="12" r="1" /> <circle cx="12" cy="12" r="1" />{" "}
              <circle cx="19" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col shadow-sm rounded-lg w-96">
        <div className=" overflow-hidden rounded-md h-60 flex justify-center items-center">
          <img
            className="w-40 h-auto object-cover"
            src={image}
            alt={currentBook.title}
          />
        </div>
        <div className="p-6 text-center">
          {rating ? (
            <div>
              <h4 className="text-base text-slate-600 mt-4 font-roboto justify-center mb-2">
                Your rating:
              </h4>{" "}
              <Rating defaultValue={rating} precision={0.5} />
            </div>
          ) : (
            <></>
          )}
          <p className="mb-1 text-xl font-semibold text-slate-800 font-serif">
            {currentBook.title}
          </p>
          {currentBook.authors.map((author, index) => {
            return (
              <p
                className="text-sm font-roboto text-slate-500 uppercase"
                key={index}
              >
                by {author}
              </p>
            );
          })}
          {currentBook.categories.map((category, index) => {
            return (
              <p
                className="inline-flex items-center mt-3 bg-gray-400 rounded-sm px-3 py-1 text-sm font-semibold"
                key={index}
              >
                {category}
              </p>
            );
          })}

          {
            <p
              className={
                "text-sm mt-3 font-roboto overflow-hidden line-clamp-4"
              }
            >
              {currentBook.description}
            </p>
          }

          <h4 className="text-base text-slate-600 mt-4 font-roboto ">
            Friends who have read this book:
          </h4>
        </div>
        <div className="flex justify-center p-6 pt-2 gap-7"></div>
      </div>
    </main>
  );
}

export default BookInfo;
