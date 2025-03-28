import React, { useState } from "react";

function BookMenu({ currentBook, setPopup }) {
  const [isExiting, setIsExiting] = useState(false);
  const [backdropExiting, setBackdropExiting] = useState(false);

  const handleRead = (e) => {
    console.log("read");
  };

  const handleBookshelf = (e) => {
    console.log("bookshelf");
  };

  const handleShare = (e) => {
    console.log("share");
  };

  const handleReview = (e) => {
    console.log("review");
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
              >
                <svg
                  className="h-12 w-12 text-slate-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Read
              </button>
              <button
                className="flex flex-col items-center"
                onClick={handleBookshelf}
              >
                <svg
                  className="h-12 w-12 text-slate-200"
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
                  <circle cx="12" cy="12" r="9" />{" "}
                  <polyline points="12 7 12 12 15 15" />
                </svg>
                Bookshelf
              </button>
              <button
                className="flex flex-col items-center"
                onClick={handleShare}
              >
                <svg
                  className="h-12 w-12 text-slate-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  {" "}
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />{" "}
                  <polyline points="16 6 12 2 8 6" />{" "}
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share
              </button>
            </div>

            <div className="flex flex-col items-center">
              <hr className="bg-gray-400 border-0 clear-both w-9/10 h-0.5 mt-2 mb-2" />
              <button onClick={handleReview}>Write a Review</button>
              <hr className="bg-gray-400 border-0 clear-both w-9/10 h-0.5 mt-2 mb-2" />
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
