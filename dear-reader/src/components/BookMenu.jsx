import React, { useState } from "react";
import { Rating } from "@mui/material";
import {
  addToBookshelf,
  deleteFromBookshelf,
  deleteFromReadJournal,
  markBookAsRead,
  updateJournal,
  resetCurrentlyReading,
  updateCurrentlyReading,
} from "../api/api";
import ShareButton from "./ShareButton";
import BookReadPopup from "./BookReadPopup";

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
  book,
  currentlyReading,
  setCurrentlyReading,
  logPopup,
  setLogPopup,
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
        setCurrentlyReading(false);
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

  const handleRating = (e) => {
    const update = { rating: e.target.value, isbn };
    updateJournal(update, id).then((data) => {
      setRating(data.rating);
    });
  };

  const handleCurrentlyReading = (e) => {
    setIsLoading(true);
    updateCurrentlyReading(currentUser.id, isbn).then((data) => {
      setCurrentlyReading(true);
      handleClose();
    });
  };

  const handleResetCurrentlyReading = (e) => {
    resetCurrentlyReading(currentUser.id).then(() => {
      setCurrentlyReading(false);
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
      {logPopup && (
        <BookReadPopup
          book={book}
          currentUser={currentUser}
          setPopup={setLogPopup}
          setIsRead={setIsRead}
          isRead={isRead}
          currentlyReading={currentlyReading}
          setCurrentlyReading={setCurrentlyReading}
        />
      )}

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
              <ul>
                <li className="mx-5 text-sm w-80 my-2">
                  <hr className="border-0 h-px mt-2 bar" />
                </li>

                <li className="mx-5 text-sm w-80 my-2">
                  <div className="flex flex-col items-center ">
                    <h2 className="mb-1">{rating ? "Your Rating" : "Rate"}</h2>
                    <Rating
                      value={rating ? rating : value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      onClick={handleRating}
                    />
                  </div>
                  <hr className="border-0 h-px mt-2 bar" />
                </li>
                <li className="mx-5 text-sm w-80">
                  <div className="flex flex-col items-center mb-2">
                    <button
                      onClick={() => {
                        setLogPopup(true);
                      }}
                    >
                      Review or Log
                    </button>
                  </div>
                  <hr className="border-0 h-px mt-2 bar" />
                </li>
                {!isRead && (
                  <div className="mx-5 text-sm w-80 mt-2">
                    <div className="flex flex-col items-center mb-2">
                      {currentlyReading ? (
                        <div className="mx-5 text-sm w-80">
                          <li className="flex flex-col items-center">
                            <button
                              onClick={() => {
                                setLogPopup(true);
                              }}
                            >
                              Mark as finished
                            </button>
                          </li>
                          <hr className="border-0 h-px mt-2 bar mb-2" />
                          <li className="flex flex-col items-center">
                            <button onClick={handleResetCurrentlyReading}>
                              Remove from currently reading
                            </button>
                          </li>
                        </div>
                      ) : (
                        <li>
                          <div>
                            <button onClick={handleCurrentlyReading}>
                              Set currently reading
                            </button>
                          </div>
                        </li>
                      )}
                    </div>
                    <hr className="border-0 h-px mt-2 bar" />
                  </div>
                )}
              </ul>
              <button className="mb-3 mt-2 text-gray-300" onClick={handleClose}>
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
