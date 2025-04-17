import React, { useState } from "react";
import { Rating } from "@mui/material";
import {
  addToBookshelf,
  deleteFromBookshelf,
  deleteFromReadJournal,
  markBookAsRead,
  updateJournal,
} from "../api/api";
import ShareButton from "./ShareButton";

function BookMenu({
  isOnBookshelf,
  setIsRead,
  setIsOnBookshelf,
  isRead,
  setPopup,
  currentUser,
  setRating,
  rating,
  title,
  isbn,
}) {
  const { username, id } = currentUser;
  const [isExiting, setIsExiting] = useState(false);
  const [backdropExiting, setBackdropExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [value, setValue] = useState(0);

  const handleRead = (e) => {
    setIsLoading(true);
    if (isRead) {
      deleteFromReadJournal(id, isbn).then((data) => {
        setIsRead(false);

        setIsLoading(false);
      });
    }
    if (!isRead) {
      markBookAsRead(isbn, rating, review, id).then((data) => {
        setIsRead(true);
        setIsOnBookshelf(false);
        setIsLoading(false);
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

  const handleClose = () => {
    setIsExiting(true);
    setBackdropExiting(true);

    setTimeout(() => {
      setPopup(false);
    }, 700);
  };

  return (
    <div>
      <div
        className={`fixed inset-0 z-10 ${
          backdropExiting
            ? "animate__animated animate__fadeOut"
            : "animate__animated animate__fadeIn"
        } backdrop-brightness-50`}
      >
        <div className="items-start place-content-center p-4 text-center">
          <div
            className={`relative transform overflow-hidden rounded-lg book-menu text-left shadow-xl transition-all animate__animated ${
              isExiting ? "animate__slideOutUp" : "animate__slideInDown"
            }`}
          >
            <div className="flex justify-between items-center space-x-4 ml-10 mt-3 mr-10">
              <button
                className="flex flex-col items-center"
                onClick={handleRead}
                disabled={isLoading}
              >
                {isRead ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-12 w-12 text-slate-200"
                  >
                    <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                  </svg>
                ) : (
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-12 w-12 text-slate-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                )}
                Read
              </button>
              <button
                className="flex flex-col items-center"
                onClick={handleBookshelf}
                disabled={isLoading}
              >
                {isOnBookshelf ? (
                  <svg
                    className="h-12 w-12 text-slate-200"
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
                    className="h-12 w-12 text-slate-200"
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
                <p className="ml-1">Bookshelf</p>
              </button>
              <div>
                <ShareButton />
                <p className="ml-1">Share</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <hr className="bg-gray-100 border-0 clear-both w-9/10 h-0.5 mt-2 mb-2" />

              <div className="flex flex-col items-center">
                <h2 className="mb-1">{rating ? "Your Rating" : "Rate"}</h2>
                <Rating
                  value={rating ? rating : value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onClick={handleRating}
                />
              </div>
              <hr className="bg-gray-100 border-0 clear-both w-9/10 h-0.5 mt-2 mb-2" />
              {isRead && review === "" ? (
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
              <button className="mb-2" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookMenu;
