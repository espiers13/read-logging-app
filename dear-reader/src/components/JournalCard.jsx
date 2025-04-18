import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { deleteFromReadJournal } from "../api/api";
import { useState } from "react";
import DeletePopup from "./DeletePopup";

function JournalCard({ book, currentUser }) {
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
  const [popup, setPopup] = useState(false);

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
            <p className="mb-0.5 text-xs">by {authors[0].name} et al.</p>
          ) : (
            <p className="mb-0.5 text-xs">by {authors[0].name}</p>
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
        <button
          className="button text-sm p-1 rounded-lg"
          onClick={() => {
            setPopup(true);
          }}
        >
          <svg
            className="h-4 w-4 text-slate-50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />{" "}
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />{" "}
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
      {popup ? (
        <DeletePopup setPopup={setPopup} handleDelete={handleDelete} />
      ) : (
        <></>
      )}
    </main>
  );
}

export default JournalCard;
