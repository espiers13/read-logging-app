import { useState } from "react";
import { Rating } from "@mui/material";
import Loading from "./Loading";
import { markBookAsRead, updateJournal } from "../api/api";

function BookReadPopup({
  currentUser,
  setPopup,
  book,
  setIsRead,
  isRead,
  currentlyReading,
  setCurrentlyReading,
}) {
  const { isbn } = book;
  let image =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
  const today = new Date().toISOString().split("T")[0];
  const [closing, setClosing] = useState(false);
  const [rating, setRating] = useState(null);
  const [date, setDate] = useState(today);
  const [review, setReview] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  if (book.thumbnail) {
    image = book.thumbnail;
  }
  if (book.image) {
    image = book.image;
  }

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleReview = (e) => {
    setReview(e.target.value);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setPopup(false);
      setClosing(false);
    }, 900);
  };

  const handleMarkAsRead = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const finalReview = review?.trim() === "" ? null : review;
    if (isRead) {
      const update = { review, rating, date_read: date, isbn };
      updateJournal(update, currentUser.id).then((data) => {
        setIsRead(true);
        setIsLoading(false);
        handleClose();
      });
    }
    if (!isRead) {
      markBookAsRead(isbn, rating, finalReview, currentUser.id)
        .then((data) => {
          setIsRead(true);
          setIsLoading(false);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  return (
    <div
      className={`modal-overlay animate__animated ${
        closing ? "animate__fadeOut" : "animate__fadeIn"
      }`}
    >
      <div
        className={`modal-content animate__animated ${
          closing ? "animate__slideOutDown" : "animate__slideInUp"
        }`}
      >
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Loading />
          </div>
        )}
        <div className="flex justify-between items-center space-x-4">
          <button onClick={handleClose}>Cancel</button>
          <p className="font-serif">I Read...</p>
          <button onClick={handleMarkAsRead}>Save</button>
        </div>
        <div className="mt-2 px-2 py-2 bar flex items-start space-x-4">
          <img src={image} className="h-24" />
          <div className="flex flex-col mt-3.5">
            <p className="text-left font-serif">{book.title}</p>
            <p className="text-left text-sm">by {book.authors}</p>
            <p className="text-left text-xs italic">{book.published}</p>
          </div>
        </div>

        <div className="modal-scroll-area">
          <form
            className="transition-all duration-500 ease-in-out max-h-[500px] opacity-100 transform scale-y-100 origin-top overflow-hidden"
            onSubmit={handleMarkAsRead}
          >
            <ul>
              <li className="ml-1 mr-3 text-sm">
                <div className="flex justify-between items-center">
                  Date
                  <input
                    type="date"
                    value={date}
                    onChange={handleDate}
                    className="py-0.5 px-2 bg-transparent w-auto input rounded-full"
                    required
                    max={today}
                  />
                </div>
                <hr className="border-0 h-px mt-0.5 bg-gray-600" />
              </li>
              <li className="ml-1 mr-3 mt-2 text-sm">
                <div className="flex justify-between items-center">
                  Rate
                  <Rating
                    value={rating}
                    onChange={(event, newRating) => {
                      setRating(newRating);
                    }}
                  />
                </div>
                <hr className="border-0 h-px mt-0.5 bg-gray-600" />
              </li>
              <li className="ml-1 mr-3 mt-2 text-sm">
                <div className="flex justify-between items-center">
                  <textarea
                    value={review}
                    onChange={handleReview}
                    className="py-1 px-2 rounded-lg review w-full h-20 resize-none mb-0.5"
                    placeholder="Add review..."
                  />
                </div>
                <hr className="border-0 h-px mt-0.5 bg-gray-600" />
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookReadPopup;
