import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import {
  getReadJournal,
  getBookshelf,
  deleteFromBookshelf,
  markBookAsRead,
  deleteFromReadJournal,
  updateJournal,
  addToBookshelf,
} from "../api/api";

function BookPopup({ setPopup, book, currentUser }) {
  const navigate = useNavigate();
  const { thumbnail, title, isbn, authors, description } = book;
  const [readPopup, setReadPopup] = useState(false);
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState(null);
  const [isRead, setIsRead] = useState(false);
  const [isOnBookshelf, setIsOnBookshelf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);

  const { id, username } = currentUser;

  let image =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

  image = thumbnail || image;

  useEffect(() => {
    setIsLoading(true);
    getReadJournal(username).then((books) => {
      setIsRead(books.some((book) => book.isbn === isbn));
    });
  }, [isbn]);

  useEffect(() => {
    setIsLoading(true);
    getBookshelf(username).then((books) => {
      setIsOnBookshelf(books.some((book) => book.isbn === isbn));
    });
  }, [isbn]);

  const decodedText =
    new DOMParser().parseFromString(description, "text/html").body
      .textContent || "";

  const handleMarkAsRead = (e) => {
    setIsLoading(true);
    setReadPopup(true);
    setIsRead(true);
    markBookAsRead(isbn, rating, review, id).then((data) => {
      setIsRead(true);
      setIsOnBookshelf(false);
      setIsLoading(false);
    });
  };

  const handleDelete = (e) => {
    setIsLoading(true);
    setRating(null);
    setValue(0);
    deleteFromBookshelf(id, isbn).then(() => {
      window.location.reload();
    });
  };

  const handleSetReview = (e) => {
    setReview(e.target.value);
  };

  const handleReview = (e) => {
    e.preventDefault();
    const update = { review, isbn };
    updateJournal(update, id).then((data) => {
      console.log(data);
      setMyReview(data.review);
    });
  };

  const handleRating = (e) => {
    const update = { rating: e.target.value, isbn };
    updateJournal(update, id).then((data) => {
      setRating(data.rating);
    });
  };

  const handleRemoveFromJournal = (e) => {
    setIsLoading(true);
    deleteFromReadJournal(id, isbn).then((data) => {
      setIsRead(false);
      addToBookshelf(id, isbn, title).then((data) => {
        setIsOnBookshelf(true);
        setIsLoading(false);
      });
    });
  };

  return (
    <div className="fixed inset-0 w-screen flex justify-center items-center">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="transform overflow-hidden rounded-lg bg-white text-left shadow-xl">
          <div className="bg-white p-4">
            <div className="flex items-start justify-center">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-green-700"
                  onClick={() => setPopup(false)}
                >
                  <svg
                    className="h-8 w-8 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />{" "}
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="h-60 w-80 flex justify-center items-center mt-2">
                  <img className="w-40 object-cover" src={image} alt={title} />
                </div>
                <h2
                  className="font-serif font-bold text-gray-900 mt-5"
                  id="modal-title"
                >
                  {book.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1 italic">
                  by {authors}
                </p>
                <p className="text-sm text-gray-500 mt-2">{decodedText}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-5 mb-5">
            <button
              type="button"
              className="text-blue-700"
              onClick={() => navigate(`/book/${isbn}`)}
            >
              Read More
            </button>
            <div className="flex justify-between items-center space-x-4 ml-2 mr-2">
              <button
                className="text-red-600 text-sm p-1 rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
              {isRead ? (
                <button
                  className="text-blue-600 text-sm p-1 rounded-lg"
                  onClick={handleRemoveFromJournal}
                >
                  Remove from Read
                </button>
              ) : (
                <button
                  className="text-blue-600 text-sm p-1 rounded-lg"
                  onClick={handleMarkAsRead}
                >
                  Mark as read
                </button>
              )}
            </div>
            <div className="flex flex-col items-center">
              <h4 className="mb-1">{rating ? "Your Rating" : "Rate"}</h4>
              <Rating
                value={rating ? rating : value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onClick={handleRating}
              />
            </div>
            {isRead ? (
              <form
                className="mb-1 flex flex-col items-center"
                onSubmit={handleReview}
              >
                <div className="py-1 px-2 mb-2 w-80 bg-white rounded-lg rounded-t-lg border border-gray-200">
                  <textarea
                    id="review"
                    rows="3"
                    className="px-0 w-full text-sm text-gray-900 border-0"
                    placeholder="Write a review..."
                    required
                    onChange={handleSetReview}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white button rounded-lg"
                >
                  Post review
                </button>
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPopup;
