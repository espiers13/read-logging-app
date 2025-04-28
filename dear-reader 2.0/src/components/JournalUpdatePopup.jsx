import { useState } from "react";
import { Rating } from "@mui/material";
import { updateJournal } from "../api/api";

function JournalUpdatePopup({
  currentUser,
  setPopup,
  book,
  setJournalUpdated,
}) {
  const date = new Date(book.date_read).toISOString().split("T")[0];
  const [closing, setClosing] = useState(false);
  const [review, setReview] = useState(book.review);
  const [rating, setRating] = useState(book.rating);
  const [dateRead, setDateRead] = useState(date);
  const [value, setValue] = useState(0);

  const { isbn } = book;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setPopup(false);
      setClosing(false);
    }, 900);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const update = { review, rating, date_read: dateRead, isbn };
    updateJournal(update, currentUser.id).then((updatedBook) => {
      setJournalUpdated(updatedBook);
      handleClose();
    });
  };

  const handleSetReview = (e) => {
    setReview(e.target.value);
  };

  const handleSetRating = (e) => {
    setRating(e.target.value);
  };

  const handleSetReadDate = (e) => {
    setDateRead(e.target.value);
  };

  return (
    <div
      className={`footer-modal-overlay animate__animated ${
        closing ? "animate__fadeOut" : "animate__fadeIn"
      }`}
    >
      <div
        className={`footer-modal-content animate__animated ${
          closing ? "animate__slideOutDown" : "animate__slideInUp"
        }`}
      >
        {/* Header (sticky) */}
        <div className="flex justify-between items-center space-x-4 ml-2 mr-2">
          <button onClick={handleClose}>Cancel</button>
          <p className="font-serif">{book.title}</p>
          <img src={currentUser.avatar} className="w-8 rounded-full" />
        </div>

        {/* Scrollable body */}
        <div className="modal-scroll-area">
          <form
            className="mb-1 flex flex-col items-center"
            onSubmit={handleUpdate}
          >
            <div className="text-center">
              <p>Date you finshed this book:</p>
              <input
                type="date"
                value={dateRead}
                onChange={handleSetReadDate}
              />
            </div>
            <div className="text-center">
              <p className="mt-5">Rating:</p>
              <Rating
                value={rating ? rating : value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onClick={handleSetRating}
              />
            </div>
            <p className="mt-5">Review:</p>
            <div className="py-1 px-2 mb-2 mt-1 w-80 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
              <textarea
                id="review"
                rows="3"
                className="px-0 w-full text-sm text-gray-900 border-0"
                placeholder={review ? { review } : "Write a review..."}
                onChange={handleSetReview}
              ></textarea>
            </div>
            <button type="submit" className="button px-2 rounded-lg mt-3">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JournalUpdatePopup;
