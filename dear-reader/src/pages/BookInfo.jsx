import { getBookByIsbn } from "../api/api";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import BookMenu from "../components/BookMenu";

function BookInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  let image =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

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

  if (!currentBook) {
    return <Loading />;
  }

  image = currentBook.imageLinks?.thumbnail || image;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <div className="grid grid-cols-2">
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
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <circle cx="5" cy="12" r="1" /> <circle cx="12" cy="12" r="1" />{" "}
              <circle cx="19" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>

      <div className="card flex flex-col shadow-sm border rounded-lg my-6 w-96">
        <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
          <img
            className="w-40 h-auto object-cover"
            src={image}
            alt={currentBook.title}
          />
        </div>
        <div className="p-6 text-center">
          <h3 className="mb-1 text-xl font-semibold text-slate-800 font-serif">
            {currentBook.title}
          </h3>
          {currentBook.authors.map((author, index) => {
            return (
              <h3
                className="text-sm font-roboto text-slate-500 uppercase"
                key={index}
              >
                by {author}
              </h3>
            );
          })}

          <h3 className="text-base text-slate-600 mt-4 font-roboto ">
            {currentBook.description}
          </h3>
          <h3 className="text-base text-slate-600 mt-4 font-roboto ">
            Friends who have read this book:
          </h3>
          <h3 className="text-base text-slate-600 mt-4 font-roboto ">
            Your rating:
          </h3>
        </div>
        <div className="flex justify-center p-6 pt-2 gap-7"></div>
      </div>

      {popup ? (
        <BookMenu currentBook={currentBook} setPopup={setPopup} />
      ) : (
        <></>
      )}
    </main>
  );
}

export default BookInfo;
