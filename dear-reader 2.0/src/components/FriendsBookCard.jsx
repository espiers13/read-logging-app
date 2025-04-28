import { Rating } from "@mui/material";

function FriendsBookCard({ friend }) {
  const { username, avatar, date_read, rating, review } = friend;
  const date = date_read.slice(0, 10);

  return (
    <div className="p-1.5 button rounded-xl shadow-sm text-sm w-40">
      <div className="flex items-center gap-3">
        <img
          className="w-8 h-8 rounded-full ml-1"
          src={avatar}
          alt={username}
        />
        <div>
          <p className="font-medium">{username}</p>
          <Rating
            name="read-only"
            value={rating}
            readOnly
            size="small"
            sx={{ color: "#a1afbf" }}
            precision={0.5}
          />
          <p className="text-xs">{date}</p>
        </div>
      </div>
      <p className="mt-2 text-xs italic">"{review}"</p>
    </div>
  );
}

export default FriendsBookCard;
