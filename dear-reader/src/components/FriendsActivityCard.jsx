import { useNavigate } from "react-router";
import Rating from "@mui/material/Rating";

function FriendsActivityCard({ book }) {
  const navigate = useNavigate();
  const { book_image, title, isbn, username, rating, avatar } = book;

  const handleClick = (e) => {
    navigate(`/book/${isbn}`);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <button className="object-cover w-24 p-1" onClick={handleClick}>
        <img src={book_image} alt={title} aria-valuetext={isbn} />
      </button>
      <div className="flex items-center gap-1">
        <img className="w-7 h-7 rounded-full" src={avatar} alt={username} />
        <div className="text-xs">
          <p>{username}</p>
          <Rating
            name="read-only"
            value={rating}
            readOnly
            size="small"
            sx={{ color: "#a1afbf", size: "small" }}
            precision={0.5}
          />
        </div>
      </div>
    </div>
  );
}

export default FriendsActivityCard;
