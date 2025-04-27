import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { deleteFromReadJournal } from "../api/api";
import { useState } from "react";
import DeletePopup from "./DeletePopup";
import JournalSettings from "./JournalSettings";
import JournalDelete from "./JournalDelete";
import JournalUpdatePopup from "./JournalUpdatePopup";

function JournalCard({ book, currentUser, setJournalUpdated }) {
  const { id } = currentUser;
  const navigate = useNavigate();
  const {
    date_read,
    title,
    thumbnail,
    review,
    rating,
    authors,
    published,
    isbn,
  } = book;
  const [deletePopup, setDeletePopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);

  const handleDelete = (e) => {
    deleteFromReadJournal(id, isbn).then(() => {
      window.location.reload();
    });
  };

  const date = new Date(date_read);
  const dateRead = date.getDate();

  return (
    <main className="mt-2.5 mb-2.5">
      <div className="flex items-center space-x-4">
        <h4 className="text-4xl">{dateRead}</h4>
        <button
          onClick={() => {
            navigate(`/book/${isbn}`);
          }}
          className="shrink-0"
        >
          <img src={thumbnail} alt={title} className="w-24" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="mb-0.5">{title}</p>
          {authors.length > 1 ? (
            <p className="mb-0.5 text-xs">by {authors[0]} et al.</p>
          ) : (
            <p className="mb-0.5 text-xs">by {authors[0]}</p>
          )}

          <p className="text-sm text-gray-500 mb-0.5">{published}</p>
          {rating && (
            <Rating
              name="read-only"
              value={rating}
              readOnly
              size="small"
              sx={{ color: "#a1afbf" }}
              precision={0.5}
            />
          )}
          {review && <p className="text-xs italic mb-1">"{review}"</p>}
        </div>
        <div className="flex flex-col ml-auto items-end gap-3">
          <JournalDelete setPopup={setDeletePopup} />
          <JournalSettings
            book={book}
            setPopup={setUpdatePopup}
            setJournalUpdated={setJournalUpdated}
          />
        </div>
      </div>

      {deletePopup ? (
        <DeletePopup setPopup={setDeletePopup} handleDelete={handleDelete} />
      ) : (
        <></>
      )}
      {updatePopup ? (
        <JournalUpdatePopup
          currentUser={currentUser}
          setPopup={setUpdatePopup}
          book={book}
          setJournalUpdated={setJournalUpdated}
        />
      ) : (
        <></>
      )}
    </main>
  );
}

export default JournalCard;
