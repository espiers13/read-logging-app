import { useEffect, useState } from "react";
import BookPopup from "./BookPopup";

function BookshelfCard({ book, currentUser }) {
  const [popup, setPopup] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setPopup(true);
        }}
      >
        <img className="h-36" src={book.thumbnail} alt={book.title} />
      </button>

      {popup ? (
        <BookPopup setPopup={setPopup} book={book} currentUser={currentUser} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default BookshelfCard;
