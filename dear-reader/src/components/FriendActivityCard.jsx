import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { getBookByIsbn } from "../api/api";
import { useEffect, useState } from "react";

function FriendActivityCard({ book }) {
  const navigate = useNavigate();
  const {
    date_read,
    isbn,
    friend_username,
    rating,
    review,
    avatar,
    friend_id,
  } = book;
  const [currentBook, setCurrentBook] = useState({});

  const date = new Date(date_read);
  const dateRead = date.getDate();

  function extractYear(dateStr) {
    if (/^\d{4}$/.test(dateStr)) {
      return dateStr;
    }
    const match = dateStr.match(/(\d{4})/);
    return match ? match[1] : null;
  }

  useEffect(() => {
    getBookByIsbn(isbn).then(({ items }) => {
      const book = items[0].volumeInfo;

      const currentBook = {
        title: book.title,
        thumbnail: book.imageLinks.thumbnail,
        authors: book.authors,
        published: extractYear(book.publishedDate),
      };
      setCurrentBook(currentBook);
    });
  }, [isbn]);

  const handleUser = (e) => {
    navigate(`/user/${friend_username}/${friend_id}`);
  };

  const { title, authors, published, thumbnail } = currentBook;

  let datePublished = published;

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
          <div className="flex items-center gap-1">
            <button onClick={handleUser}>
              <img
                className="w-7 h-7 rounded-full mr-1"
                src={avatar}
                alt={friend_username}
              />
            </button>

            <p className="text-sm">
              <button onClick={handleUser} className="underline">
                {friend_username}
              </button>{" "}
              finished reading:
            </p>
          </div>
          <p className="mb-0.5 mt-1">{title}</p>
          <p className="text-sm text-gray-500">
            by {authors} {datePublished}
          </p>

          <div className="flex items-center gap-1">
            <div className="mt-2">
              {rating && (
                <Rating
                  name="read-only"
                  value={rating}
                  readOnly
                  size="small"
                  sx={{ color: "#a1afbf", size: "small" }}
                  precision={0.5}
                />
              )}
            </div>
          </div>
          {review && <p className="text-xs italic mb-1">"{review}"</p>}
        </div>
      </div>
    </main>
  );
}

export default FriendActivityCard;
